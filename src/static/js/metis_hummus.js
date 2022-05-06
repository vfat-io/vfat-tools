
$(function() {
consoleInit(main)
  });

const HUM_CHEF_ABI = [{"type":"event","name":"Add","inputs":[{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"baseAllocPoint","internalType":"uint256","indexed":false},{"type":"address","name":"lpToken","internalType":"contract IAsset","indexed":true},{"type":"address","name":"rewarder","internalType":"contract IRewarder","indexed":true}],"anonymous":false},{"type":"event","name":"Deposit","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"DepositFor","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"EmergencyWithdraw","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Harvest","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Paused","inputs":[{"type":"address","name":"account","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"Set","inputs":[{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"baseAllocPoint","internalType":"uint256","indexed":false},{"type":"address","name":"rewarder","internalType":"contract IRewarder","indexed":true},{"type":"bool","name":"overwrite","internalType":"bool","indexed":false}],"anonymous":false},{"type":"event","name":"Unpaused","inputs":[{"type":"address","name":"account","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"UpdateEmissionRate","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"humPerSec","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"UpdateEmissionRepartition","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"dialutingRepartition","internalType":"uint256","indexed":false},{"type":"uint256","name":"nonDialutingRepartition","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"UpdatePool","inputs":[{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"lastRewardTimestamp","internalType":"uint256","indexed":false},{"type":"uint256","name":"lpSupply","internalType":"uint256","indexed":false},{"type":"uint256","name":"accHumPerShare","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"UpdateVeHUM","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"address","name":"oldVeHUM","internalType":"address","indexed":false},{"type":"address","name":"newVeHUM","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"Withdraw","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"acceptOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"add","inputs":[{"type":"uint256","name":"_baseAllocPoint","internalType":"uint256"},{"type":"address","name":"_lpToken","internalType":"contract IAsset"},{"type":"address","name":"_rewarder","internalType":"contract IRewarder"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"claimableHum","inputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"uint256","name":"","internalType":"uint256"}],"name":"deposit","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositFor","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_amount","internalType":"uint256"},{"type":"address","name":"_user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"dialutingRepartition","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"emergencyHumWithdraw","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"emergencyWithdraw","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"hum","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"humPerSec","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"initialize","inputs":[{"type":"address","name":"_hum","internalType":"contract IERC20"},{"type":"address","name":"_veHum","internalType":"contract IVeHum"},{"type":"uint256","name":"_humPerSec","internalType":"uint256"},{"type":"uint256","name":"_dialutingRepartition","internalType":"uint256"},{"type":"uint256","name":"_startTimestamp","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"massUpdatePools","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"maxPoolLength","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"migrate","inputs":[{"type":"uint256[]","name":"_pids","internalType":"uint256[]"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"uint256[]","name":"","internalType":"uint256[]"},{"type":"uint256[]","name":"","internalType":"uint256[]"}],"name":"multiClaim","inputs":[{"type":"uint256[]","name":"_pids","internalType":"uint256[]"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IMasterHummusV2"}],"name":"newMasterHummus","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"nonDialutingRepartition","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"ownerCandidate","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"pause","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"paused","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"pendingHum","internalType":"uint256"},{"type":"address","name":"bonusTokenAddress","internalType":"address"},{"type":"string","name":"bonusTokenSymbol","internalType":"string"},{"type":"uint256","name":"pendingBonusToken","internalType":"uint256"}],"name":"pendingTokens","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"address","name":"_user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"poolAdjustFactor","inputs":[{"type":"uint256","name":"pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"lpToken","internalType":"contract IAsset"},{"type":"uint256","name":"baseAllocPoint","internalType":"uint256"},{"type":"uint256","name":"lastRewardTimestamp","internalType":"uint256"},{"type":"uint256","name":"accHumPerShare","internalType":"uint256"},{"type":"address","name":"rewarder","internalType":"contract IRewarder"},{"type":"uint256","name":"sumOfFactors","internalType":"uint256"},{"type":"uint256","name":"accHumPerFactorShare","internalType":"uint256"},{"type":"uint256","name":"adjustedAllocPoint","internalType":"uint256"}],"name":"poolInfo","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"poolLength","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"proposeOwner","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"bonusTokenAddress","internalType":"address"},{"type":"string","name":"bonusTokenSymbol","internalType":"string"}],"name":"rewarderBonusTokenInfo","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"set","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_baseAllocPoint","internalType":"uint256"},{"type":"address","name":"_rewarder","internalType":"contract IRewarder"},{"type":"bool","name":"overwrite","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setMaxPoolLength","inputs":[{"type":"uint256","name":"_maxPoolLength","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setNewMasterHummus","inputs":[{"type":"address","name":"_newMasterHummus","internalType":"contract IMasterHummusV2"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setVeHum","inputs":[{"type":"address","name":"_newVeHum","internalType":"contract IVeHum"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"startTimestamp","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalAdjustedAllocPoint","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalBaseAllocPoint","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"unpause","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateEmissionRate","inputs":[{"type":"uint256","name":"_humPerSec","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateEmissionRepartition","inputs":[{"type":"uint256","name":"_dialutingRepartition","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateFactor","inputs":[{"type":"address","name":"_user","internalType":"address"},{"type":"uint256","name":"_newVeHumBalance","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updatePool","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"uint256","name":"rewardDebt","internalType":"uint256"},{"type":"uint256","name":"factor","internalType":"uint256"}],"name":"userInfo","inputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IVeHum"}],"name":"veHum","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"uint256","name":"","internalType":"uint256"}],"name":"withdraw","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_amount","internalType":"uint256"}]}]

const veHUM_ABI = [{"type":"event","name":"Burn","inputs":[{"type":"address","name":"account","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Claimed","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":true}],"anonymous":false},{"type":"event","name":"Mint","inputs":[{"type":"address","name":"beneficiary","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Paused","inputs":[{"type":"address","name":"account","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"Staked","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":true}],"anonymous":false},{"type":"event","name":"StakedNft","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"nftId","internalType":"uint256","indexed":true}],"anonymous":false},{"type":"event","name":"Unpaused","inputs":[{"type":"address","name":"account","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"Unstaked","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":true}],"anonymous":false},{"type":"event","name":"UnstakedNft","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"nftId","internalType":"uint256","indexed":true}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"claim","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"claimable","inputs":[{"type":"address","name":"_addr","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"decimals","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"generationRate","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getStakedHum","inputs":[{"type":"address","name":"_addr","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getStakedNft","inputs":[{"type":"address","name":"_addr","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getVotes","inputs":[{"type":"address","name":"_account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"hum","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"initialize","inputs":[{"type":"address","name":"_hum","internalType":"contract IERC20"},{"type":"address","name":"_masterHummus","internalType":"contract IMasterHummus"},{"type":"address","name":"_nft","internalType":"contract IHummusNFT"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"invVoteThreshold","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isUser","inputs":[{"type":"address","name":"_addr","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IMasterHummus"}],"name":"masterHummus","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"maxCap","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IHummusNFT"}],"name":"nft","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bytes4","name":"","internalType":"bytes4"}],"name":"onERC721Received","inputs":[{"type":"address","name":"","internalType":"address"},{"type":"address","name":"_from","internalType":"address"},{"type":"uint256","name":"_tokenId","internalType":"uint256"},{"type":"bytes","name":"","internalType":"bytes"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"pause","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"paused","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setGenerationRate","inputs":[{"type":"uint256","name":"_generationRate","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setInvVoteThreshold","inputs":[{"type":"uint256","name":"_invVoteThreshold","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setMasterHummus","inputs":[{"type":"address","name":"_masterHummus","internalType":"contract IMasterHummus"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setMaxCap","inputs":[{"type":"uint256","name":"_maxCap","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setNftAddress","inputs":[{"type":"address","name":"_nft","internalType":"contract IHummusNFT"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setWhitelist","inputs":[{"type":"address","name":"_whitelist","internalType":"contract Whitelist"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"unpause","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"unstakeNft","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"uint256","name":"lastRelease","internalType":"uint256"},{"type":"uint256","name":"stakedNftId","internalType":"uint256"}],"name":"users","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract Whitelist"}],"name":"whitelist","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"_amount","internalType":"uint256"}]}]

const HUM_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"account","internalType":"address"},{"type":"address","name":"minter_","internalType":"address"},{"type":"uint256","name":"mintingAllowedAfter_","internalType":"uint256"}]},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"spender","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"MinterChanged","inputs":[{"type":"address","name":"minter","internalType":"address","indexed":false},{"type":"address","name":"newMinter","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"DOMAIN_TYPEHASH","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"PERMIT_TYPEHASH","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"allowance","inputs":[{"type":"address","name":"account","internalType":"address"},{"type":"address","name":"spender","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"approve","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"rawAmount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"decimals","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint32","name":"","internalType":"uint32"}],"name":"minimumTimeBetweenMints","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"mint","inputs":[{"type":"address","name":"dst","internalType":"address"},{"type":"uint256","name":"rawAmount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"mintCap","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"minter","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"mintingAllowedAfter","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"nonces","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"permit","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"rawAmount","internalType":"uint256"},{"type":"uint256","name":"deadline","internalType":"uint256"},{"type":"uint8","name":"v","internalType":"uint8"},{"type":"bytes32","name":"r","internalType":"bytes32"},{"type":"bytes32","name":"s","internalType":"bytes32"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setMinter","inputs":[{"type":"address","name":"minter_","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transfer","inputs":[{"type":"address","name":"dst","internalType":"address"},{"type":"uint256","name":"rawAmount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transferFrom","inputs":[{"type":"address","name":"src","internalType":"address"},{"type":"address","name":"dst","internalType":"address"},{"type":"uint256","name":"rawAmount","internalType":"uint256"}]}]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

   const HUM_CHEF_ADDR = "0x9cadd693cDb2B118F00252Bb3be4C6Df6A74d42C";
   const rewardTokenTicker = "HUM";
   const HUM_CHEF = new ethers.Contract(HUM_CHEF_ADDR, HUM_CHEF_ABI, App.provider);

   const rewardsPerWeek = await HUM_CHEF.humPerSec() /1e18 * 604800;

    const tokens = {};
    const prices = await getMetisPrices();

    await loadHumChefContract(App, tokens, prices, HUM_CHEF, HUM_CHEF_ADDR, HUM_CHEF_ABI, rewardTokenTicker,
        "hum", null, rewardsPerWeek, "pendingTokens");

    await loadveHum(App, prices);

    hideLoading();
  }

  async function loadveHum(App, prices){
  const veHUM_ADDR = "0x89351beaa4abba563710864051a8c253e7b3e16d";
  const HUM_ADDR = "0x4aac94985cd83be30164dfe7e9af7c054d7d2121";
  const veHUM_CONTRACT = new ethers.Contract(veHUM_ADDR, veHUM_ABI, App.provider);
  const HUM_CONTRACT = new ethers.Contract(HUM_ADDR, HUM_ABI, App.provider);
  const totalDepositedHums = await HUM_CONTRACT.balanceOf(veHUM_ADDR) / 1e18;
  const totalveHumTokens = await veHUM_CONTRACT.totalSupply() / 1e18;
  const virtualPrice = totalDepositedHums / totalveHumTokens;
  const humPrice = getParameterCaseInsensitive(prices, HUM_ADDR).usd;
  const veHumPrice = humPrice * virtualPrice;
  const rewardTicker = await veHUM_CONTRACT.symbol();
  const stakeTicker = await HUM_CONTRACT.symbol();
  const totalOwnedveHum = await veHUM_CONTRACT.balanceOf(App.YOUR_ADDRESS) / 1e18;
  const totalOwnedHum = totalOwnedveHum * virtualPrice;
  const tvl = totalDepositedHums * humPrice
  const usersPercentage = totalOwnedveHum / totalveHumTokens * 100;
  const usersveHumUsd = totalOwnedveHum * humPrice;
  _print(`\n${rewardTicker} Price: $${toFixed(veHumPrice, 2)} Total Supply: ${toFixed(totalveHumTokens, 4)} TVL: $${formatMoney(tvl)}`);
  _print(`${stakeTicker} Price: $${toFixed(humPrice, 2)}`);
  _print(`There is a total of ${toFixed(totalDepositedHums, 2)} HUM staked in veHUM`);
  _print(`Your balance is ${totalOwnedveHum.toFixed(2)} ${rewardTicker} (${totalOwnedHum.toFixed(2)} ${stakeTicker}), $${formatMoney(usersveHumUsd)}, ${usersPercentage.toFixed(2)}% of the pool`);
  const approveAndStake = async function() {
    return contract_stake(veHUM_ABI, veHUM_ADDR, App, HUM_ADDR)
  }
  const unstake = async function() {
    return contract_unstake(veHUM_ABI, veHUM_ADDR, totalOwnedveHum, App)
  }
  _print_link(`Stake ${totalOwnedHum.toFixed(2)} ${stakeTicker}`, approveAndStake)
  _print_link(`Unstake ${totalOwnedveHum.toFixed(2)} ${rewardTicker}`, unstake)
}

const contract_stake = async function(abi, contractAddress, App, stakeTokenAddr) {
  const signer = App.provider.getSigner()

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  const CHEF_CONTRACT = new ethers.Contract(contractAddress, abi, signer)

  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, contractAddress)

  let allow = Promise.resolve()

  if (allowedTokens / 1e18 < currentTokens / 1e18) {
    showLoading()
    allow = STAKING_TOKEN.approve(contractAddress, ethers.constants.MaxUint256)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
        alert('Try resetting your approval to 0 first')
      })
  }

  if (currentTokens / 1e18 > 0) {
    showLoading()
    allow
      .then(async function() {
          CHEF_CONTRACT.enter(currentTokens, {gasLimit: 500000})
          .then(function(t) {
            App.provider.waitForTransaction(t.hash).then(function() {
              hideLoading()
            })
          })
          .catch(function() {
            hideLoading()
            _print('Something went wrong.')
          })
      })
      .catch(function() {
        hideLoading()
        _print('Something went wrong.')
      })
  } else {
    alert('You have no tokens to stake!!')
  }
}

const contract_unstake = async function(abi, contractAddress, stakedAmount, App) {
  const signer = App.provider.getSigner()
  const veHUM_WRITE_CONTRACT = new ethers.Contract(contractAddress, abi, signer)
  showLoading()
  veHUM_WRITE_CONTRACT.leave(stakedAmount, {gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
}

  async function getHumPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
    const poolInfo = await chefContract.poolInfo(poolIndex);
    if (poolInfo.adjustedAllocPoint == 0) {
      return {
        address: poolInfo.lpToken,
        allocPoints: poolInfo.adjustedAllocPoint ?? 1,
        poolToken: null,
        userStaked : 0,
        pendingRewardTokens : 0,
      };
    }
    const poolToken = await getMetisToken(app, poolInfo.lpToken ?? poolInfo.token ?? poolInfo.stakingToken, chefAddress);
    const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
    const pendingRewards = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS);
    const pendingRewardTokens = pendingRewards.pendingHum;
    const staked = userInfo.amount / 10 ** poolToken.decimals;
    const humPerSec = await chefContract.humPerSec() / 1e18
    const dialutingRepartition = await chefContract.dialutingRepartition()
    const nonDialutingRepartition = await chefContract.nonDialutingRepartition()
    return {
        address : poolInfo.lpToken ?? poolInfo.token ?? poolInfo.stakingToken,
        allocPoints: poolInfo.adjustedAllocPoint ?? 1,
        poolToken: poolToken,
        userStaked : staked,
        pendingRewardTokens : pendingRewardTokens / 10 ** 18,
        depositFee : (poolInfo.depositFeeBP ?? 0) / 100,
        withdrawFee : (poolInfo.withdrawFeeBP ?? 0) / 100,
        humPerSec : humPerSec,
        dialutingRepartition : dialutingRepartition / 1,
        nonDialutingRepartition : nonDialutingRepartition / 1
    };
  }

function printHummusPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
                       totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                       pendingRewardsFunction, fixedDecimals, claimFunction, chain="eth", depositFee=0, withdrawFee=0, humPerSec, dialutingRepartition, poolToken, nonDialutingRepartition) {
  fixedDecimals = fixedDecimals ?? 2;
  const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
  var poolRewardsPerWeekBase = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek * dialutingRepartition / 1000
  var poolRewardsPerWeekMedian = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek * nonDialutingRepartition / 1000 * 0.5
  const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
  const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
  _print_inline(`${poolIndex} - `);
  poolPrices.print_price(chain);
  sp?.print_price(chain);
  const apr = printHummusAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeekBase, poolRewardsPerWeekMedian, poolPrices.stakeTokenTicker,
    staked_tvl, userStaked, poolPrices.price, fixedDecimals, humPerSec, dialutingRepartition, poolToken, poolInfo.allocPoints, totalAllocPoints, nonDialutingRepartition);
  if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
  printChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
    rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
    poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, claimFunction, rewardPrice, chain, depositFee, withdrawFee);
  return apr;
}

function printHummusAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolRewardsPerWeekMedian,
                  stakeTokenTicker, staked_tvl, userStaked, poolTokenPrice,
                  fixedDecimals, humPerSec, dialutingRepartition, poolToken, adjustedAllocPoint, totalAdjustedAllocPoint, nonDialutingRepartition) {
  var usdPerWeek = poolRewardsPerWeek * rewardPrice;
  var usdPerWeekMedian = poolRewardsPerWeekMedian * rewardPrice;
  fixedDecimals = fixedDecimals ?? 2;
  _print(`${rewardTokenTicker} Per Week: ${poolRewardsPerWeek.toFixed(fixedDecimals)} ($${formatMoney(usdPerWeek)})`);
  var weeklyAPR = usdPerWeek / staked_tvl * 100;
  var dailyAPR = weeklyAPR / 7;
  var yearlyAPR = weeklyAPR * 52;
  var weeklyMedianAPR = usdPerWeekMedian / staked_tvl * 100;
  var dailyMedianAPR = weeklyMedianAPR / 7;
  var yearlyMedianAPR = weeklyMedianAPR * 52;
  //Boosted APR: humPerSec * secondsPerYear * (poolInfo.adjustedAllocPoint / totalAdjustedAllocPoint) * (nonDialutingRepartition / 1000) * (userInfo.factor / poolInfo.sumOfFactors) * humPrice / userInfo.amount -> this calculates the boosted APR based on the individual user's stake.
  _print(`Base APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
  _print(`Median Boosted APR: Day ${dailyMedianAPR.toFixed(2)}% Week ${weeklyMedianAPR.toFixed(2)}% Year ${yearlyMedianAPR.toFixed(2)}%`);
  var userStakedUsd = userStaked * poolTokenPrice;
  var userStakedPct = userStakedUsd / staked_tvl * 100;
  _print(`You are staking ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
  var userWeeklyRewards = userStakedPct * poolRewardsPerWeek / 100;
  var userDailyRewards = userWeeklyRewards / 7;
  var userYearlyRewards = userWeeklyRewards * 52;
  if (userStaked > 0) {
    _print(`Estimated ${rewardTokenTicker} earnings:`
        + ` Day ${userDailyRewards.toFixed(fixedDecimals)} ($${formatMoney(userDailyRewards*rewardPrice)})`
        + ` Week ${userWeeklyRewards.toFixed(fixedDecimals)} ($${formatMoney(userWeeklyRewards*rewardPrice)})`
        + ` Year ${userYearlyRewards.toFixed(fixedDecimals)} ($${formatMoney(userYearlyRewards*rewardPrice)})`);
  }
  return {
    userStakedUsd,
    totalStakedUsd : staked_tvl,
    userStakedPct,
    yearlyAPR,
    userYearlyUsd : userYearlyRewards * rewardPrice
  }
}

  async function loadHumChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
    rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
    deathPoolIndices, claimFunction) {
    const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

    const poolCount = parseInt(await chefContract.poolLength(), 10);
    const totalAllocPoints = await chefContract.totalAdjustedAllocPoint();

    _print("*** The below APR calculations may be incorrect ***\n");

    _print(`<a href='http://andromeda-explorer.metis.io/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
    _print(`Found ${poolCount} pools.\n`)

    _print(`Showing incentivized pools only.\n`);

    const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
    const rewardToken = await getMetisToken(App, rewardTokenAddress, chefAddress);

    const rewardsPerWeek = rewardsPerWeekFixed ??
      await chefContract.callStatic[rewardsPerBlockFunction]()
      / 10 ** rewardToken.decimals * 604800 / 3

    const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
      await getHumPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

    var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

    await Promise.all(tokenAddresses.map(async (address) => {
        tokens[address] = await getMetisToken(App, address, chefAddress);
    }));

    if (deathPoolIndices) {   //load prices for the deathpool assets
      deathPoolIndices.map(i => poolInfos[i])
                       .map(poolInfo =>
        poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "metis") : undefined);
    }

    const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "metis") : undefined);


    _print("Finished reading smart contracts.\n");

    let aprs = []
    for (i = 0; i < poolCount; i++) {
      if (poolPrices[i]) {
        const apr = printHummusPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
          totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
          pendingRewardsFunction, null, claimFunction, "metis", poolInfos[i].depositFee, poolInfos[i].withdrawFee, 
          poolInfos[i].humPerSec, poolInfos[i].dialutingRepartition, poolInfos[i].poolToken, poolInfos[i].nonDialutingRepartition)
        aprs.push(apr);
      }
    }

    let totalUserStaked=0, totalStaked=0, averageApr=0;
    for (const a of aprs) {
      if (!isNaN(a.totalStakedUsd)) {
        totalStaked += a.totalStakedUsd;
      }
      if (a.userStakedUsd > 0) {
        totalUserStaked += a.userStakedUsd;
        averageApr += a.userStakedUsd * a.yearlyAPR / 100;
      }
    }
    averageApr = averageApr / totalUserStaked;
    _print_bold(`Total Staked: $${formatMoney(totalStaked)}`);
    if (totalUserStaked > 0) {
      _print_bold(`\nYou are staking a total of $${formatMoney(totalUserStaked)} at an average APR of ${(averageApr * 100).toFixed(2)}%`)
      _print(`Estimated earnings:`
          + ` Day $${formatMoney(totalUserStaked*averageApr/365)}`
          + ` Week $${formatMoney(totalUserStaked*averageApr/52)}`
          + ` Year $${formatMoney(totalUserStaked*averageApr)}\n`);
    }
    return { prices, totalUserStaked, totalStaked, averageApr }
  }