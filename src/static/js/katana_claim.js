$(function() {
  consoleInit(main)
});

// Katana campaign payouts ("vKAT claimables"). A claim locks KAT in the
// VotingEscrow and mints a vKAT lock NFT -- it never pays liquid KAT. The
// connector can claim and convert that lock to avKAT in the same call, so the
// normal path is one transaction. Merkle proofs come from Katana's own API;
// no onchain view returns them.
const CAMPAIGN_PAYOUT = "0x290503854c95Bfa44173d68f2E3e5AaFe073e220";
const SICKLE_FACTORY  = "0x233D9067677dCf1a161954D45B4C965B9d567168";
const FARM_STRATEGY   = "0x2709F2d7cf752d9939971d6e74C028CeB5b1af6b";
const VOTING_ESCROW   = "0x4d6fC15Ca6258b168225D283262743C623c13Ead";
const VOTER           = "0x5e755A3C5dc81A79DE7a7cEF192FFA60964c9352";
const VKAT_LOCK_NFT   = "0x106F7D67Ea25Cb9eFf5064CF604ebf6259Ff296d";
const AVKAT           = "0x7231dbaCdFc968E07656D12389AB20De82FbfCeB";
const KAT             = "0x7F1f4b4b29f5058fA32CC7a97141b8D7e5ABDC2d";
const CLAIMABLES_API  = "https://api.katana.network/v1/portfolio";

const FACTORY_ABI = ["function sickles(address admin) view returns (address)"];
const VOTER_ABI = [
  "function votingActive() view returns (bool)",
  "function epochVoteStart() view returns (uint256)"
];
const ESCROW_ABI = ["function ownedTokens(address owner) view returns (uint256[])"];
const LOCKED_ABI = ["function locked(uint256 tokenId) view returns (uint256 amount, uint256 start)"];
const VAULT_ABI  = ["function convertToShares(uint256 assets) view returns (uint256)"];
const FARM_ABI = [
  "function simpleHarvest((address stakingContract, uint256 poolIndex) farm, (address[] rewardTokens, bytes extraData) params)"
];

// rewardTokens must be non-empty (TransferLib reverts TokenOutRequired), but a
// claim yields an NFT and a conversion yields shares the Sickle should keep.
// KAT is a placeholder the Sickle holds none of, so nothing is swept and the
// 90bp harvest fee applies to nothing. Never put avKAT here: it would sweep the
// entire staked position and charge the fee on all of it.
const REWARD_TOKENS = [KAT];
const EMPTY_ADDITIONAL = ethers.utils.hexZeroPad("0x00", 32);

async function fetchClaimables(address) {
  const url = `${CLAIMABLES_API}/${address}/vkat-claimables?capitalDistributorAddress=${CAMPAIGN_PAYOUT}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`claimables API returned ${res.status}`);
  const body = await res.json();
  const now = Math.floor(Date.now() / 1000);
  // The API reports expired campaigns as status "claimable" with ended:false.
  // Trusting it offers buttons that revert CampaignOutsideTimeBounds, so the
  // campaign's own endTime is the filter.
  return ((body && body.data && body.data.claimables) || []).filter(c =>
    c.status === "claimable" && !c.isFullyClaimed &&
    ethers.BigNumber.from(c.amountToBeClaimed || "0").gt(0) &&
    (!Number(c.endTime) || Number(c.endTime) > now)
  );
}

const encodePayout = c => ethers.utils.defaultAbiCoder.encode(
  ["bytes32[]", "uint256"], [c.proof, c.amountToBeClaimed]);

// KatanaVKatConvertExtraData{ uint256[] tokenIds; KatanaCampaignClaimExtraData }
// tokenIds empty + campaignClaim set  => claim, then convert what just arrived.
// tokenIds set + campaignClaim empty  => convert locks already held.
function convertExtraData(claims, tokenIds) {
  return ethers.utils.defaultAbiCoder.encode(
    ["tuple(uint256[],tuple(uint256[],bytes[],bytes[]))"],
    [[
      tokenIds,
      [claims.map(c => c.campaignId), claims.map(encodePayout), claims.map(() => EMPTY_ADDITIONAL)]
    ]]
  );
}

const fmt = raw => Number(ethers.utils.formatEther(raw))
  .toLocaleString(undefined, { maximumFractionDigits: 5 });

async function main() {
  const App = await init_ethers();
  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const factory = new ethcall.Contract(SICKLE_FACTORY, FACTORY_ABI);
  const voter = new ethcall.Contract(VOTER, VOTER_ABI);
  const [sickle, votingActive, voteStart] = await App.ethcallProvider.all([
    factory.sickles(App.YOUR_ADDRESS), voter.votingActive(), voter.epochVoteStart()
  ]);

  if (sickle === "0x0000000000000000000000000000000000000000") {
    _print_bold("No sickle account for this wallet.");
    hideLoading();
    return;
  }
  _print_bold(`Your Sickle: ${sickle}`);

  if (!votingActive) {
    _print(`Voting is closed. Converting to avKAT reopens ${new Date(voteStart * 1000).toUTCString()}.`);
  }
  _print("");

  const escrow = new ethcall.Contract(VOTING_ESCROW, ESCROW_ABI);
  const [held] = await App.ethcallProvider.all([escrow.ownedTokens(sickle)]);

  let claims = [];
  try {
    claims = await fetchClaimables(sickle);
  } catch (e) {
    _print(`Could not read claimables: ${e.message}`);
  }

  if (claims.length === 0 && held.length === 0) {
    _print("Nothing to claim and no vKAT locks held.");
    hideLoading();
    return;
  }

  if (claims.length > 0) {
    let total = ethers.BigNumber.from(0);
    claims.forEach(c => { total = total.add(c.amountToBeClaimed); });
    _print_bold("Claimable");
    claims.forEach(c => _print(`  campaign ${c.campaignId} - ${c.title}: ${fmt(c.amountToBeClaimed)} vKAT`));

    if (votingActive) {
      _print_link(`Claim and stake ${fmt(total)} vKAT as avKAT (one transaction)`,
        () => send(App, sickle, convertExtraData(claims, [])));
    } else {
      _print(`  Claim and stake becomes available when voting reopens.`);
      _print_link(`Claim ${fmt(total)} vKAT now and stake later`,
        () => send(App, sickle, claimOnlyExtraData(claims), CAMPAIGN_PAYOUT));
    }
    _print("");
  }

  if (held.length > 0) {
    const locked = new ethcall.Contract(VOTING_ESCROW, LOCKED_ABI);
    const vault = new ethcall.Contract(AVKAT, VAULT_ABI);
    const amounts = await App.ethcallProvider.all(held.map(id => locked.locked(id)));
    let assets = ethers.BigNumber.from(0);
    amounts.forEach(a => { assets = assets.add(a.amount !== undefined ? a.amount : a[0]); });
    const [shares] = await App.ethcallProvider.all([vault.convertToShares(assets)]);

    _print_bold("vKAT locks held by your Sickle");
    held.forEach((id, i) => {
      const amt = amounts[i].amount !== undefined ? amounts[i].amount : amounts[i][0];
      _print(`  lock #${id}: ${fmt(amt)} KAT`);
    });
    if (votingActive) {
      _print_link(`Stake all locks as ${fmt(shares)} avKAT`,
        () => send(App, sickle, convertExtraData([], held.map(id => id.toString()))));
    } else {
      _print(`  Staking as avKAT needs an open voting window.`);
    }
  }

  hideLoading();
}

// Claim without converting, used while voting is closed. Routes through the
// campaign connector so the lock NFT simply lands in the Sickle.
function claimOnlyExtraData(claims) {
  return ethers.utils.defaultAbiCoder.encode(
    ["tuple(uint256[],bytes[],bytes[])"],
    [[claims.map(c => c.campaignId), claims.map(encodePayout), claims.map(() => EMPTY_ADDITIONAL)]]
  );
}

async function send(App, sickle, extraData, stakingContract) {
  const signer = App.provider.getSigner();
  const farm = new ethers.Contract(FARM_STRATEGY, FARM_ABI, signer);
  const data = farm.interface.encodeFunctionData("simpleHarvest", [
    { stakingContract: stakingContract || VKAT_LOCK_NFT, poolIndex: 0 },
    { rewardTokens: REWARD_TOKENS, extraData }
  ]);

  showLoading();
  try {
    // Simulate first: a stale proof, an expired campaign or a shut voting
    // window then reads as text instead of a wallet-side estimate failure.
    await App.provider.call({ from: App.YOUR_ADDRESS, to: FARM_STRATEGY, data });
  } catch (e) {
    hideLoading();
    _print(`Would fail: ${(e && (e.reason || (e.error && e.error.message) || e.message)) || "unknown"}`);
    return;
  }

  try {
    const tx = await signer.sendTransaction({ to: FARM_STRATEGY, data });
    await App.provider.waitForTransaction(tx.hash);
    _print(`Done. Tx: ${tx.hash}`);
    _print(`Your avKAT is held by your Sickle (${sickle}); send it to your wallet from the Sickle page.`);
  } catch (e) {
    _print(`Not sent: ${(e && (e.reason || e.message)) || "rejected"}`);
  }
  hideLoading();
}
