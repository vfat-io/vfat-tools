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
const SWEEP_STRATEGY  = "0x266ebC589d5BFCB815c40e7C30112f8d4B74e012";

// ethcall builds its multicall payload from JSON fragments; it cannot parse
// ethers human-readable signatures, and silently yields a contract with no
// methods if given them.
const view = (name, inputs, outputs) => ({
  name, type: "function", stateMutability: "view", inputs, outputs
});
const FACTORY_ABI = [
  view("sickles", [{ name: "admin", type: "address" }], [{ name: "", type: "address" }])
];
const VOTER_ABI = [
  view("votingActive", [], [{ name: "", type: "bool" }]),
  view("epochVoteStart", [], [{ name: "", type: "uint256" }])
];
const ESCROW_ABI = [
  view("ownedTokens", [{ name: "owner", type: "address" }], [{ name: "", type: "uint256[]" }])
];
const LOCKED_ABI = [
  view("locked", [{ name: "tokenId", type: "uint256" }],
       [{ name: "amount", type: "uint256" }, { name: "start", type: "uint256" }])
];
const VAULT_ABI = [
  view("convertToShares", [{ name: "assets", type: "uint256" }], [{ name: "", type: "uint256" }]),
  view("balanceOf", [{ name: "account", type: "address" }], [{ name: "", type: "uint256" }])
];
const SWEEP_ABI = ["function sweepTokens(address[] tokens)"];
const PAYOUT_ABI = [
  // Cumulative amount already claimed, not a flag. The distributor allows a
  // further claim whenever that total is below the allocation in the proof,
  // so an increased allocation leaves a claimable remainder.
  view("claimed", [{ name: "campaignId", type: "uint256" }, { name: "user", type: "address" }],
       [{ name: "", type: "uint256" }])
];
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

// Katana's claimables API is origin-locked: it answers app.katana.network and
// returns 500 to every other origin, so a browser on vfat.tools cannot read it.
// The merkle proofs are fixed for a campaign, so the eligible set is embedded
// here instead. Campaign 9 is the only live campaign; 4, 5, 6 and 7 all expired
// 2026-07-05 while the API still advertises them as claimable.
//
// Refresh this table when Katana opens a new campaign -- an eligible Sickle
// missing from it simply sees nothing to claim, and the on-chain claimed()
// check plus the pre-flight simulation keep a stale entry from doing harm.
const EMBEDDED_CLAIMABLES = {
  "0x072cdf98c02e845919e814e4f7eb6aa31f8eeab0": [
    { campaignId: "9", title: "Topup pre-stakers for 35% yield", amountToBeClaimed: "4565091573254142545101",
      proof: ["0x20ec7a44b600afaceb03927e4ee48bd106fec8bdbd1f09181680245f2436f570", "0xd9289638f4799c728f0064a8c27d949ff91c89ad2a89045bdf22a79b3eee9a3f", "0xf713bca85ee25791bb0a61f7a3c2e71ffad0f7f6518734963ceb61047beb9404", "0x334d2725c54ba01a019c60acb6f049bfea0e548218c53d1038271201d343e5ad", "0x63fe35b3d8f02d7a8e47756c8d41f9f01e2ed5806a4419d36ffabed534ee5582", "0x357bfd9fc52fb947db71b67f9cc53b53380682a290f39eefa0419b9f0c7f9600", "0xf279b823b6015ca4dc233e5497d11060bd3d1bdff96d23de3c76443d995e226c", "0xf0dada072d46f27d547d463ac91181cdd0694cb8a8e534630e386918f05de7a7", "0x4708924ac6a2ea1284aaca53f8876489ed488736efcb36a765dca144491c1a80", "0x732e9d09889d285de112daf4517d98cc4e6103bf93ffc7bea755419c25ba2a78"] }
  ],
  "0xbed260dbfaadd2e24794ec4d848afdd3b0307ac9": [
    { campaignId: "9", title: "Topup pre-stakers for 35% yield", amountToBeClaimed: "1155583655928123609626",
      proof: ["0xed6ecefd76f973bfa275ff3e08045048c6bbe755ae73411bad5ba71073e36452", "0xe628e69b199f2edc6191b25768434cbf60f36792c284be8d5e3ef15440bb4748", "0x588eb061a89880c5612eefc7d82c21784e295dcf370cf19318a000153eeb2a73", "0xc7f6cd433f4f4517388989fcf7a2580573d28990b20740bb942f3746e9c5aef2", "0x15dd2b061e4e69b330fa0f325ceba62f7e25266d4610cd2f3a2d526fbf60419b", "0x1ff3e76bbef6d774bd91bbc1a47405edcddbcfbeab3d5f02235967ff801bda46", "0x851e5aae94aa689388ade2b40350c97766dfaa9344817773cf1f1b0a9454c590", "0x1685cec5e29bf21fe1db5e4248410806ca7d10c4a5c00b0522064efcadd39183", "0xc2bda16568c6ba9523330ecf6116802fb0b35797a9396de45d16f06fd54484ab", "0x17edbd60e8be7cd852db46ffe6fd4178ab4c60c7ece4b2c4de374b2505baf5c6"] }
  ],
  "0x0134705497aaac3d5aa56ebc125be15eee506aef": [
    { campaignId: "9", title: "Topup pre-stakers for 35% yield", amountToBeClaimed: "79853623959698294264",
      proof: ["0x12c043b127e21ce5cc9c17a63f003b2ffcfbbea64a4a3af52afacd79fe1663f1", "0xab17f8bbdbe86ba7139020e5b5f750d9f7344be0540efadad07b7df618311ce1", "0xda6b6cc2630ac3aa550df4241cde7c6b7a6b3e76ea75155aee8fd28f9a9baf9f", "0xa6e49b59f4a25c1eccd37fce6d1e9c47ffcdb44f908205fc9e922fe4afe9d0a0", "0x95761b291460afde4c20318a0e93e7f06fb59fad9e387b0e291ee99800f4b632", "0x357bfd9fc52fb947db71b67f9cc53b53380682a290f39eefa0419b9f0c7f9600", "0xf279b823b6015ca4dc233e5497d11060bd3d1bdff96d23de3c76443d995e226c", "0xf0dada072d46f27d547d463ac91181cdd0694cb8a8e534630e386918f05de7a7", "0x4708924ac6a2ea1284aaca53f8876489ed488736efcb36a765dca144491c1a80", "0x732e9d09889d285de112daf4517d98cc4e6103bf93ffc7bea755419c25ba2a78"] }
  ],
  "0x3388a64dc6e1c0dfe7ec965aaa928dc3d49971aa": [
    { campaignId: "9", title: "Topup pre-stakers for 35% yield", amountToBeClaimed: "74685293810000847588",
      proof: ["0x1465fe59cba121fbcdbdfef39c6dfa56bef802e802393a10db9314db0b07a3bc", "0x6eda3d1dede89001d22ac03b985459e48907b3a04c4375cf6061ea0b36c2f1bb", "0xa592a45e3750009a719f977a8ec2d776bf537b3638e604b19ef3f9642aeaca50", "0x16ce22ee3c97829a0c6ab199eb6799e9e2630c7244d46b598fd4df7ba226621d", "0xb80b641a0c2e6eb40f71aec219dc7cd8f60d1e3d7d45d798387bc5f89d0cb17a", "0xa48c5b22ad1544552826ae928d15d3f38f92b5eb1deacdc805b61571a9eb54e2", "0xbf67f06434b48a25967456fc4bb4dc75b6cabcf0edb4b36a44de0909d75668a0", "0xe678d7169b3fca5c826b989024a54203430ad779c8a16afa46ca17f09fdf1fbd", "0x4708924ac6a2ea1284aaca53f8876489ed488736efcb36a765dca144491c1a80", "0x732e9d09889d285de112daf4517d98cc4e6103bf93ffc7bea755419c25ba2a78"] }
  ],
  "0x5e20d7301669252dd1718fffb129bf5d41ff6a2d": [
    { campaignId: "9", title: "Topup pre-stakers for 35% yield", amountToBeClaimed: "36206760171713044062",
      proof: ["0xc607916464487d9d29f9c1a9d7548c6657859125e4e03f6d019b09fbf9a246a2", "0xcfc9a934842daba30fde1417a99e69d994d3fc338575de192c9499e04bc02626", "0xcd2e71a9b782edc105189571d915061f89932069fa750ab9d814c561e0341e0f", "0x859d4169b80a80a654becdbd9977efb49ae1e099df27e026ce3d1baf7fc09e33", "0x735beba6274c9c23ab9a077de776bbe2002e8d16608aaaa88a7bb0917b355ddc", "0x6f48c14a5af3c5c50391d51731f85577603ab2988d8a7ad6b8a7211a13f169ea", "0xc29007998c9ae0c46f93a0f13e1d3c5663b6b8eabf3581ac470c9db3fd5830c0", "0x47527a268d50a16a74344016cac05416e09db52d854dc711d1900f7aab8c63dc", "0x76d05d0829ad787401770e1d995393a2cf464ea1b6413a3be9158bf6fc3989ca", "0x732e9d09889d285de112daf4517d98cc4e6103bf93ffc7bea755419c25ba2a78"] }
  ],
  "0x40ad7be1a21fe02499f8e2893c85187c71a40c75": [
    { campaignId: "9", title: "Topup pre-stakers for 35% yield", amountToBeClaimed: "26653126566851830971",
      proof: ["0x3ba7329012ede075c7466afb626d3ea29945d1e52e7468fafbf5c1e8d1a54f34", "0x61bc5900c21568e8e8b03d269c4c8882d9a424fa8a50da30ded292e1cacde7f9", "0xdd1a366df3b6d51a8514fc743d57dd82392539dacbc5bb8ff7595ec86ebce48b", "0x87c299e34f6daa557cb26d61dd5ce62921b0b73a402a761d2eeb11b4a48348bd", "0x29ad2f9132e13c8c5bdd5d30c5c235c685be3196422405c123d3f48f70624e34", "0xdd3f41516ff117d5732711bc91901c32ea7a43e82046f2479bf2da849e05a425", "0xbf67f06434b48a25967456fc4bb4dc75b6cabcf0edb4b36a44de0909d75668a0", "0xe678d7169b3fca5c826b989024a54203430ad779c8a16afa46ca17f09fdf1fbd", "0x4708924ac6a2ea1284aaca53f8876489ed488736efcb36a765dca144491c1a80", "0x732e9d09889d285de112daf4517d98cc4e6103bf93ffc7bea755419c25ba2a78"] }
  ],
  "0x03fd5de029a417b50309e05ae56802bd27fdb923": [
    { campaignId: "9", title: "Topup pre-stakers for 35% yield", amountToBeClaimed: "17478392776346322334",
      proof: ["0x0fc69be326bcbbed9c263c902d08fd23f95be6b6b75f7d1953a699543a591b5b", "0x22382e90b2ef2af3ecbec939feadd31d82c236c6c7e795e9712f3de10fcd556f", "0x263321f6c477cb925c719fe3860d0c76872ddd178d1f7ca2809f4910342eb820", "0xdaa83ee015f5499e577bf3aa0b1513792456f20fce68ed94671c31d417fb4417", "0x63fe35b3d8f02d7a8e47756c8d41f9f01e2ed5806a4419d36ffabed534ee5582", "0x357bfd9fc52fb947db71b67f9cc53b53380682a290f39eefa0419b9f0c7f9600", "0xf279b823b6015ca4dc233e5497d11060bd3d1bdff96d23de3c76443d995e226c", "0xf0dada072d46f27d547d463ac91181cdd0694cb8a8e534630e386918f05de7a7", "0x4708924ac6a2ea1284aaca53f8876489ed488736efcb36a765dca144491c1a80", "0x732e9d09889d285de112daf4517d98cc4e6103bf93ffc7bea755419c25ba2a78"] }
  ]
};

// The embedded table is a snapshot and cannot know what has been claimed since,
// so entries are reconciled against the payout contract before being offered.
// Without this a claimed allocation is presented as claimable forever and the
// user only discovers otherwise when the pre-flight simulation reverts.
//
// claimed() is a running total, so the test is a comparison and not a flag: an
// allocation raised by updateCampaignMerkleRoot leaves a prior claimant with a
// nonzero total and a real remainder, and treating any nonzero value as "done"
// would suppress that top-up. The proof carries the cumulative allocation, so
// the remainder is that figure minus what has already been taken.
async function rejectAlreadyClaimed(App, address, claims) {
  if (claims.length === 0) return [];
  const payout = new ethcall.Contract(CAMPAIGN_PAYOUT, PAYOUT_ABI);
  const claimed = await App.ethcallProvider.all(
    claims.map(c => payout.claimed(c.campaignId, address))
  );
  const out = [];
  claims.forEach((c, i) => {
    const total = ethers.BigNumber.from(c.amountToBeClaimed);
    const taken = ethers.BigNumber.from(claimed[i]);
    if (taken.gte(total)) return;
    // Show and total the remainder, while the proof keeps the cumulative
    // allocation the contract verifies against.
    out.push(Object.assign({}, c, { remaining: total.sub(taken).toString() }));
  });
  return out;
}

async function fetchClaimables(App, address) {
  const key = String(address).toLowerCase();
  const embedded = EMBEDDED_CLAIMABLES[key];
  if (embedded) return rejectAlreadyClaimed(App, address, embedded);

  // Kept for the day the API is reachable cross-origin, or a campaign lands
  // before this table is refreshed. Expected to fail from vfat.tools today.
  try {
    const url = `${CLAIMABLES_API}/${address}/vkat-claimables?capitalDistributorAddress=${CAMPAIGN_PAYOUT}`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const body = await res.json();
    const now = Math.floor(Date.now() / 1000);
    return ((body && body.data && body.data.claimables) || []).filter(c =>
      c.status === "claimable" && !c.isFullyClaimed &&
      ethers.BigNumber.from(c.amountToBeClaimed || "0").gt(0) &&
      (!Number(c.endTime) || Number(c.endTime) > now)
    );
  } catch (e) {
    return [];
  }
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
  const vaultBal = new ethcall.Contract(AVKAT, VAULT_ABI);
  // avKAT is read up front: once a claim is converted it is the Sickle's only
  // remaining state, and gating the balance behind the claim/lock test hid the
  // transfer action in exactly that case.
  const [held, avkat] = await App.ethcallProvider.all([
    escrow.ownedTokens(sickle), vaultBal.balanceOf(sickle)
  ]);

  const claims = await fetchClaimables(App, sickle);
  const hasAvKat = ethers.BigNumber.from(avkat).gt(0);

  if (claims.length === 0 && held.length === 0 && !hasAvKat) {
    _print("Nothing to claim, no vKAT locks held, and no avKAT in your Sickle.");
    hideLoading();
    return;
  }

  if (claims.length > 0) {
    let total = ethers.BigNumber.from(0);
    claims.forEach(c => { total = total.add(c.remaining || c.amountToBeClaimed); });
    _print_bold("Claimable");
    claims.forEach(c => _print(`  campaign ${c.campaignId} - ${c.title}: ${fmt(c.remaining || c.amountToBeClaimed)} vKAT`));

    if (votingActive) {
      _print_link(`Claim and stake ${fmt(total)} vKAT as avKAT (one transaction)`,
        () => send(App, sickle, convertExtraData(claims, [])));
    } else {
      _print(`  Claim and stake becomes available when voting reopens.`);
      _print_link(`Claim ${fmt(total)} vKAT now and stake later`,
        () => send(App, sickle, claimOnlyExtraData(claims), CAMPAIGN_PAYOUT, "claim-only"));
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
    _print("");
  }

  // avKAT stays in the Sickle after a claim or a stake. Offer the transfer
  // here rather than sending the user elsewhere: the Katana Sickle page only
  // sweeps ERC-721s and never exposes sweepTokens.
  if (hasAvKat) {
    _print_bold("avKAT held by your Sickle");
    _print(`  ${fmt(avkat)} avKAT`);
    // SweepStrategy moves the full balance with no fee, unlike naming avKAT
    // as a harvest reward token.
    _print_link(`Send ${fmt(avkat)} avKAT to your wallet`, () => sweepAvKat(App));
  }

  hideLoading();
}

async function sweepAvKat(App) {
  const signer = App.provider.getSigner();
  const sweep = new ethers.Contract(SWEEP_STRATEGY, SWEEP_ABI, signer);
  const data = sweep.interface.encodeFunctionData("sweepTokens", [[AVKAT]]);
  showLoading();
  try {
    await App.provider.call({ from: App.YOUR_ADDRESS, to: SWEEP_STRATEGY, data });
  } catch (e) {
    hideLoading();
    _print(`Would fail: ${(e && (e.reason || (e.error && e.error.message) || e.message)) || "unknown"}`);
    return;
  }
  try {
    const tx = await signer.sendTransaction({ to: SWEEP_STRATEGY, data });
    await App.provider.waitForTransaction(tx.hash);
    _print(`Sent to your wallet. Tx: ${tx.hash}`);
  } catch (e) {
    _print(`Not sent: ${(e && (e.reason || e.message)) || "rejected"}`);
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

async function send(App, sickle, extraData, stakingContract, kind) {
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
    if (kind === "claim-only") {
      // This path mints a vKAT lock only. Saying avKAT here would name an
      // asset the transaction did not create.
      _print(`Your Sickle (${sickle}) now holds the vKAT lock. Staking it as avKAT needs an open voting window; reload once voting reopens.`);
    } else {
      _print(`Your avKAT is held by your Sickle (${sickle}). Reload to send it to your wallet.`);
    }
  } catch (e) {
    _print(`Not sent: ${(e && (e.reason || e.message)) || "rejected"}`);
  }
  hideLoading();
}
