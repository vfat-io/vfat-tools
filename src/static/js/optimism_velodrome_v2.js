
$(function() {
  consoleInit(main)
  });
  
  const VELO_V2_VOTER_ABI = [{"inputs":[{"internalType":"address","name":"_forwarder","type":"address"},{"internalType":"address","name":"_ve","type":"address"},{"internalType":"address","name":"_factoryRegistry","type":"address"},{"internalType":"address","name":"_v1Factory","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AlreadyVotedOrDeposited","type":"error"},{"inputs":[],"name":"DistributeWindow","type":"error"},{"inputs":[],"name":"FactoryPathNotApproved","type":"error"},{"inputs":[],"name":"GaugeAlreadyKilled","type":"error"},{"inputs":[],"name":"GaugeAlreadyRevived","type":"error"},{"inputs":[{"internalType":"address","name":"_pool","type":"address"}],"name":"GaugeDoesNotExist","type":"error"},{"inputs":[],"name":"GaugeExists","type":"error"},{"inputs":[{"internalType":"address","name":"_gauge","type":"address"}],"name":"GaugeNotAlive","type":"error"},{"inputs":[],"name":"InactiveManagedNFT","type":"error"},{"inputs":[],"name":"MaximumVotingNumberTooLow","type":"error"},{"inputs":[],"name":"NonZeroVotes","type":"error"},{"inputs":[],"name":"NotAPool","type":"error"},{"inputs":[],"name":"NotApprovedOrOwner","type":"error"},{"inputs":[],"name":"NotEmergencyCouncil","type":"error"},{"inputs":[],"name":"NotGovernor","type":"error"},{"inputs":[],"name":"NotMinter","type":"error"},{"inputs":[],"name":"NotWhitelistedNFT","type":"error"},{"inputs":[],"name":"NotWhitelistedToken","type":"error"},{"inputs":[],"name":"SameValue","type":"error"},{"inputs":[],"name":"SpecialVotingWindow","type":"error"},{"inputs":[],"name":"TooManyPools","type":"error"},{"inputs":[],"name":"UnequalLengths","type":"error"},{"inputs":[],"name":"ZeroAddress","type":"error"},{"inputs":[],"name":"ZeroBalance","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"voter","type":"address"},{"indexed":true,"internalType":"address","name":"pool","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"weight","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalWeight","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"Abstained","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"gauge","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DistributeReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"poolFactory","type":"address"},{"indexed":true,"internalType":"address","name":"votingRewardsFactory","type":"address"},{"indexed":true,"internalType":"address","name":"gaugeFactory","type":"address"},{"indexed":false,"internalType":"address","name":"pool","type":"address"},{"indexed":false,"internalType":"address","name":"bribeVotingReward","type":"address"},{"indexed":false,"internalType":"address","name":"feeVotingReward","type":"address"},{"indexed":false,"internalType":"address","name":"gauge","type":"address"},{"indexed":false,"internalType":"address","name":"creator","type":"address"}],"name":"GaugeCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"gauge","type":"address"}],"name":"GaugeKilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"gauge","type":"address"}],"name":"GaugeRevived","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"reward","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"NotifyReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"voter","type":"address"},{"indexed":true,"internalType":"address","name":"pool","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"weight","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalWeight","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"Voted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"whitelister","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"bool","name":"_bool","type":"bool"}],"name":"WhitelistNFT","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"whitelister","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":true,"internalType":"bool","name":"_bool","type":"bool"}],"name":"WhitelistToken","type":"event"},{"inputs":[{"internalType":"address[]","name":"_bribes","type":"address[]"},{"internalType":"address[][]","name":"_tokens","type":"address[][]"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"claimBribes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_fees","type":"address[]"},{"internalType":"address[][]","name":"_tokens","type":"address[][]"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"claimFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_gauges","type":"address[]"}],"name":"claimRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"claimable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_poolFactory","type":"address"},{"internalType":"address","name":"_pool","type":"address"}],"name":"createGauge","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_mTokenId","type":"uint256"}],"name":"depositManaged","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_gauges","type":"address[]"}],"name":"distribute","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_start","type":"uint256"},{"internalType":"uint256","name":"_finish","type":"uint256"}],"name":"distribute","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyCouncil","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"epochGovernor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"epochNext","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"epochStart","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"epochVoteEnd","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"epochVoteStart","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"factoryRegistry","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"forwarder","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"gaugeToBribe","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"gaugeToFees","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"gauges","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"governor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"_tokens","type":"address[]"},{"internalType":"address","name":"_minter","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isAlive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isGauge","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"forwarder","type":"address"}],"name":"isTrustedForwarder","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"isWhitelistedNFT","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isWhitelistedToken","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_gauge","type":"address"}],"name":"killGauge","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lastVoted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"length","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxVotingNum","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"poke","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"poolForGauge","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolVote","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"pools","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"reset","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_gauge","type":"address"}],"name":"reviveGauge","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_council","type":"address"}],"name":"setEmergencyCouncil","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_epochGovernor","type":"address"}],"name":"setEpochGovernor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_governor","type":"address"}],"name":"setGovernor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxVotingNum","type":"uint256"}],"name":"setMaxVotingNum","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalWeight","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_gauge","type":"address"}],"name":"updateFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"end","type":"uint256"}],"name":"updateFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_gauges","type":"address[]"}],"name":"updateFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"usedWeights","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"v1Factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ve","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"address[]","name":"_poolVote","type":"address[]"},{"internalType":"uint256[]","name":"_weights","type":"uint256[]"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"votes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"weights","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"bool","name":"_bool","type":"bool"}],"name":"whitelistNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"bool","name":"_bool","type":"bool"}],"name":"whitelistToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"withdrawManaged","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  
  const VELO_V2_GAUGE_ABI = [{"inputs":[{"internalType":"address","name":"_forwarder","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"address","name":"_feesVotingReward","type":"address"},{"internalType":"address","name":"_rewardToken","type":"address"},{"internalType":"address","name":"_voter","type":"address"},{"internalType":"bool","name":"_isPool","type":"bool"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"NotAlive","type":"error"},{"inputs":[],"name":"NotAuthorized","type":"error"},{"inputs":[],"name":"NotVoter","type":"error"},{"inputs":[],"name":"RewardRateTooHigh","type":"error"},{"inputs":[],"name":"ZeroAmount","type":"error"},{"inputs":[],"name":"ZeroRewardRate","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"claimed0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"claimed1","type":"uint256"}],"name":"ClaimFees","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ClaimRewards","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"NotifyReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_recipient","type":"address"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fees0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fees1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feesVotingReward","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isPool","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"forwarder","type":"address"}],"name":"isTrustedForwarder","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"left","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardRateByEpoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakingToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"voter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  
  async function main() {
    const App = await init_ethers();
  
    let clicked = false;
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
    _print("This may take few minutes...\n");
  
    const tokens = {};
    const prices = await getOptimisticPrices();
  
    const VELO_V2_VOTER_ADDR = "0x41C914ee0c7E1A5edCD0295623e6dC557B5aBf3C"
    const VELO_V2_VOTER_CONTRACT = new ethcall.Contract(VELO_V2_VOTER_ADDR, VELO_V2_VOTER_ABI);
    const VELO_V2_TOKEN_ADDR = "0x9560e827af36c94d2ac33a39bce1fe78631088db"
    const [_poolLength] = await App.ethcallProvider.all([VELO_V2_VOTER_CONTRACT.length()]);
    const poolLength = _poolLength / 1;
    const calls = [...Array(poolLength).keys()].map(i => VELO_V2_VOTER_CONTRACT.pools(i));
    const lpTokens = await App.ethcallProvider.all(calls);
    const calls2 = lpTokens.map(a => VELO_V2_VOTER_CONTRACT.gauges(a));
    const gaugesWithDublicates = await App.ethcallProvider.all(calls2);
    //const _gauges = removeDuplicates(gaugesWithDublicates);
    const _gauges = [
      "0x91f2e5c009D3742188FA77619582402681d73f98",
      "0xeC9df85F362D3EBc4b9CA0eD7d7fDecF8Cfbdeb8",
      "0x84195De69B8B131ddAa4Be4F75633fCD7F430b7c",
      "0xbcD875fADEd3D2b9458EA6b86Bd5283075D78a06",
      "0x8329c9c93B63dB8a56a3b9a0c44c2edAbD6572A8",
      "0xFc0B9A9C2b63E6ACACa91A77A80bfa83C615e6C5",
      "0x8D2653DC52E123D653011A335a5C37cDc268f2Af",
      "0xDBf3FBF3f7a1b7142Da0cdD45F6E35366AaAA35F",
      "0x06Ee90A75E58F1161EC4721A13B767b10A234679",
      "0xBdE7CD53B9080bfbae738024440C9C8b4c1401CD",
      "0xd717c012BCf1bE61e4472Dc8Bf7d2411558AD9A6",
      "0x7D11F320fC9f5e35E0345db598CFDa8B40DCEe2a",
      "0x261725c82e93b4Ce6892e42C5b06501a3db36046",
      "0xBAc89e3d69A28bE4B3E436d590a7C921a6b19D81",
      "0x121DE0e978D117590588CB37533ef121C8826a8a",
      "0xbDFbB54957262b19A32825AA70D67e55e116CB45",
      "0x6998089F6bDd9c74C7D8d01b99d7e379ccCcb02D",
      "0xA688080CA069231C6D5713CD009662Ea54437A02",
      "0x53F31a40570dAb360a16f8A7f913DbE84F5D1C5c",
      "0x7DcA0f3023B80E8C724b11ddcCac788940275f41",
      "0x89913088Bf483c65325FbD43Ce15051b78D762D4",
      "0x18A492ad4E4f6B3ED1C16D78322c6c2800c954b6",
      "0x36691b39Ec8fa915204ba1e1A4A3596994515639",
      "0x38Df8144d6a533be637c1100E043107fE9980f0c",
      "0xE7630c9560C59CCBf5EEd8f33dd0ccA2E67a3981",
      "0x66459b9F0BB8Bf529F6018e16d4872221AF54684",
      "0x54A80dd7d56388A69dab04f92df5098f71F01fEA",
      "0xa2f27d183A4E409c734367712f9344328f8EC98D",
      "0x74CcA7219cDc57CC054ACB61bE4D7231a3D0f107",
      "0x4Bc0547661F40e712A9793C3b99A14A68049A836",
      "0x779A13049ECd4105EC9dC397778ba734c553d69A",
      "0x172a58D5E8c11Ee554B09D924D5e2c3aFADd44C0",
      "0xBba74cBDDC1C316A32559881989DF7CF7e965D6f",
      "0xE9BB6746D2c1A8D4E943be85434D89516fF223C0",
      "0xa1034Ed2C9eb616d6F7f318614316e64682e7923",
      "0x876101FC03B37FD7C621e093aE9a47F6A2527191",
      "0x93e1152951CcfB02b1Ad4D8a4afC68B28cac0614",
      "0x04B39d8777bCBBD3b2f428A616Aa20835C19a918",
      "0xd2d304C2CdbF74bE9cDcC6F7a4eB94C5a9B4F488",
      "0xd3bad64aDfA4E442fdF21556E1f8eb7298282Ef5",
      "0xdfE0eea4b7Ca157cB1fAF73fAc2135164B375Fb0",
      "0x90715A670B9117E5a956af808061AdBDe073741F",
      "0x6e4b10dD7950c5dc8a084aC16F5De5ca7EE9e334",
      "0xd0E434831a765839051DA9C0B9B99C6b0Fb87201",
      "0xC9FA5eFA02852D57DD13D90D8835f9378b530a03",
      "0x6A38Cdef57A9d3aA0A7F9295778ffdC0B4350117",
      "0x9f82A8b19804141161C582CfEa1b84853340A246",
      "0xB3381D38e872D31cD87122a2cE66AFB9A3E6CD7b",
      "0xa288791DE22d1F1aFad9807acdFDCE5caa22d10e",
      "0xCC53CD0a8EC812D46F0E2c7CC5AADd869b6F0292",
      "0x31DcAC3F0Ca9B8192e45C7b73F697714039eb9cD",
      "0x3aE58F00450d4d8CAA63e30e44ab49E48E301114",
      "0x325c9CbbF46aaeCD4354b9Ee793197AA78ebf682",
      "0xc16adBf2d01d6524B79CbB610cE31d5db80eee3C",
      "0xA8E0754dd8Ef3700Ac8478Fdb8d4B8473de3817C",
      "0xd85A08e8f475F8b6276c7d6bDf17d45736FEa621",
      "0x21CdA2b68318651dcc2C1006Ea815e528BFe6Db4",
      "0xb4d10F151D79A35B953D97e912C8332c946499F3",
      "0x749Fa76454dBFb528532578512DEB1F512D3e804",
      "0xCE4F1e466a8e320c39c798907e84884616615Af8",
      "0x5f3Dd9DC23E1eEB97b8fB2339038f1882230465a",
      "0x8166f06D50a65F82850878c951fcA29Af5Ea7Db2",
      "0x55a272304456355242F6690863B5c8D5c512fF71",
      "0x95Aab5E4525B93A84D7B1B9a028dcFd84a411E4a",
      "0x790B716A4CCd256cB8EdE4d638a103E130dA5b19",
      "0x8893ED5dF577cB880619c426CFAc2Fcb98Fb0691",
      "0xD7560bcbc244083076Dac3D1EF7ae07d049035A3",
      "0xfb4a05DFf68B28CFe1dC6CEef35E2185b2023820",
      "0x5C391434354fF8c32F041824e966d317fFd5FBD4",
      "0xA876c69ec3A99347B00635c60Bd32Ae3B4a02758",
      "0xD3dAD08b8778f2fe2d0940D72fb3A4ca853c9362",
      "0x1d89868a4d52c4A1A4b9D449B0e06ef447e2Df8A",
      "0x09CEBb82d64FdB0649B3C2020259B86BD7Ff0A5A",
      "0x6b4e8FF96e0C0b3d655a3E52DDe607a36FBBEe4a",
      "0xa904cDc7C135DCB03e8f96eaa11Ea2bcb9E065a5",
      "0x04b739f3488e4ca48a1638d945d41B9Ae33424e5",
      "0xC263655114CdE848C73B899846FE7A2D219c10a8",
      "0x065B2613aE8E182112f2519B58BB842889596FC7",
      "0xccBf041920316bA20D16010b386c323237626FB7",
      "0xE6b6e3806Bb939BD7c6980bFd816B69816Dade7B",
      "0x0F30716960F0618983Ac42bE2982FfEC181AF265",
      "0x768417Ac8Cb5292CeF42132B68daF4C216Ef70ce",
      "0x9B9D4F18C9b1A1eE1F55708134fdeA926760d459",
      "0xa63313951A375D5cF684AC457e7C9F5B5cd0AC6d",
      "0x39457e6F1e8C46B7b50b82E7a479dC9dBa73A6A3",
      "0x85c243F71c5c6dB1bC25Db9FB01DB242FC6c6345",
      "0x742b11F785D21A67d16d9EA2ae60667AeAd2dDD1",
      "0xeF306720E388E139281e4b77F454638F14E26184",
      "0x601827Ae1D4D11A84521007e21cfb39C964D5dB8",
      "0xEDA74E1C6Ec8Bf477C87719FFDf8B8C173154deA",
      "0xbE700B2252a56FfdCb4132dA6f8bc8Ea15AaE777",
      "0x691758a7aDA860b2ED1E744E34A0A1Aa2B150A15",
      "0xda6B1b1b2Cc458A50E5CD5d0e875580688b8ab78",
      "0x622cbf843F75b60E7c804462219019233247415b",
      "0x0f2743016AE7D9dC8b627b211cd0f5d98d5bB430",
      "0x6e8d7a8a0AC71F37a44d5D663e96E986E9978FE9",
      "0xeDB6C14423b4A097Cd44f9f845705504d55049d6",
      "0xcaFd32c363573118F1346516035D681062487aA4",
      "0x08f9757C2CA7dea13cA17B53dC5A9dba97FF2Eda",
      "0xC6e3f1041A967F61dE29c709C980F89050341ce2",
      "0xd27ceE42fF4bF5c4f1208A1c0427310B177e1796",
      "0x5b2219eF3dc0f85dC9b548592AEE6173D3a7D1Ab",
      "0x666F5B0bB2AF8CbA35E561a654753334A3D9a902",
      "0x9f7Dc808aE9C08afF2bf71cb846B52236403e9A9",
      "0x80e79722F75e08d4D3EC5D138c03d9A59465b975",
      "0x613137e8F8083D262055a34a73Dc19a652833106",
      "0x6671938e6C71d9652065d42a0Bd8a06E334EF0aD",
      "0xe16a33dF116B7BC0a75DfcE5249C7dCD69BA368F",
      "0x80B8b9CC4df28fa49b4E58e887E34Ed59B6dc8C0",
      "0x6101236Fd0E04427952799323D89B99BE0eab52f",
      "0xB715D27CCe97e869Cff840072ce1Eab1d982791E",
      "0xA74859536D4AE7DF3D0654e93Ea6960eE0501988",
      "0xE4D1B24F2DaefE980966b25c06331835f68C2A56",
      "0x7CC9Ff062d396e6d1669C068C87Fd58FA03d5103",
      "0x10c9a929C02B6DccC0373d7869f0165E4952bdaB",
      "0x2f7B55509978762e76440aa318b9a5DdA48A2654",
      "0xC94A0ecE8637192608ae452fdAa34f2E362D94A3",
      "0xAa23c8a876BB875B81D05E4887C89CeA3536185E",
      "0x019A88098e078D1ffA0503d7d7721A8c93B853C5",
      "0x191a495f6d3481797C189ed14e88C205f20d69c0",
      "0x5BcA1D006cD356CC1Af72183dcEDF093A3eb56D7",
      "0x1a36ee668E69bCeB3aAC0B40b434df8fC7CA52d0",
      "0x2b82B4B3D90c5BA857C2662777Cb1505aEe727B0",
      "0xd282d2c6D00d1a152b791C2C797e1F3bAeE7b9cC",
      "0x2637bc0468C6948C7F7d6984a5072F9E2bD66f38",
      "0x2Ce61D0fC3D7c05fd7f0910Bf3E62e1d712c15CA",
      "0x659df4377873b6ac75187cE96368C7bC2C016cc8",
      "0x7A686682fF5d7B5deFeD5A25346059087bC7d2c6",
      "0xD396ecAF56058D2f5a0E4f90742c5e0D522E2da2",
      "0xE3fBb66f3891bf49fAA56F577Aa28f5566359632",
      "0x8C61Ebd8f40BF920e9065Db80d194541D895Aa80",
      "0x0B09767bA62084Ad6db640D9fC7e5e9BADaA1BbE",
      "0x54A383Edae87C0342a8c42a273069648D7616B85",
      "0x1E10A1aF8d6d46CC10d2B87DDC4e554d924c840a",
      "0x8024D776F1013e140244ea5907A1BB27162bc0A2",
      "0xfB46E2B7BAD4BeE44c8F13C018e92F0557BAd059",
      "0x627A80452eCa8bf863bABcd0DA184976999461B7",
      "0x6Bf9B9C779CD56e42CCff916955B6352b51166B8",
      "0xe06c4B83430e9ba514621F8277547Ed70534903F",
      "0xbc8E6E4EA64E1B1Da50B8FFc27F7395034e978AB",
      "0x89Af7F95f8532F32eA82b43ABaDf41A50B57d907",
      "0xAc714570F267569E409057df17b9f49E7efaDdA5",
      "0x3c1367b0B1F63704124858E9DfA7f1a1A66aa152",
      "0x5AE3a1D8fA88785adF7c9a43d2E60b63BE3d4892",
      "0xF2c23b14217f139bd45873Cc86eB6294ac4cb155",
      "0xbdde21F13F2DB51AC94f000515c4132D53b3C962",
      "0xe035eA2333792A1499EedF3C59575e0e2B4caff6",
      "0x674D945627fb2eF3CBc3551dd6E4557013315feC",
      "0xBfD8583b46CF82e1f7B23435762A58b2116a8037",
      "0x3EdC1FeD916096fb58C4112C4aaC5d53Bf63484f",
      "0xC8683C81f7cE20b1a2878586a069086682D43972",
      "0xcC1a390EE7FdeC5F7a89E706c2235C8037F779Ee",
      "0x2c91fCfcf4d6F218ca8FE0D70F7f851a4b41140B",
      "0x33a33B50282B1C940b55871614a09cA7AbFda2B5",
      "0x732D9eeBB9288d5B7605829321F859a7A7dfdfD0",
      "0x239E26393e3E1B8865F9E829B83A210d1fA91F0D",
      "0x5c5a8B5F31350A73382736604b0a76e2Df18196A",
      "0x89852bC6C7cC61243307ea820dCf00c451926DF2",
      "0x236593E0139A542afEd346F5D8De7F52034Ef9Ab",
      "0x407B9db29beE2580D46f2d20d6303C732068C968",
      "0x31D553E63a92D5dc89FcE8c2e753ba422fAA2b93",
      "0xCC141AABB6C05b025118eDec0dbcD34F2193425b",
      "0x335d1f79cCDF4dA1AFAaC92228d15230dd5be9CB",
      "0xe8144D9Ede7E0a70dD41220512D7a16592CeD209",
      "0xA8013d60e6183B253E40F93aFE6A7EBE5CeB9Ea8",
      "0xeC01e371bcF57452Aa47C285Caae95e45CcB33d3",
      "0x76ec1eF8c0F72ccdFbB661664C6cB0Ac187D2fB5",
      "0xb91F873D3fed53B21ac348Ee86DEaf924D1f3818",
      "0xae00D05F0e252BC00F9cCe9b3ec6CA3Bdadbc150",
      "0x670704294a37F698E4cf921474eeefCaea06ff21",
      "0xdabD22f74cB002a6609dC9560e8b71b7e950C2d6",
      "0xAE537a5e73e56DF2DB26a6384F53edb443EAFCf0",
      "0xd5999E5c95f586341A91A9E4398d20187De67ba0",
      "0x038FB458E8bE919fBA3E3F82400fFb73B6736263",
      "0x4956B64cdC939C1e04344066078C85aaE83560e5",
      "0x7c116fa3B3dc90a990837002830790112bB1C950",
      "0x0b077441f4Eb1A11F03B7B7409e6951A446C7459",
      "0xACd75e1A505959ACD2320B5256D0d2566a7567Ad",
      "0xF686424d4F3572E4624BdDF8A00Fb77Fe748237c",
      "0x1239c54D9fd91e6EcEC8eAAd80dF0FEd43c47673",
      "0x2712c1D8FF9Da721EA82c748fda14C908A615582",
      "0xeD6f12a699F20690D8930De58eF923d528f1A456",
      "0x917a64CF946c7eA5594bdC153393D28134b035Bb",
      "0x5B97B8a28bD16E3a46E2baF85a25d946f2bc36CD",
      "0x5dB64E8050534eE0b41b5295Bf5fcBb402b3CaFA",
      "0x34632B0B9F8f8E5c911aB2679d38fD4aD08C59C9",
      "0x43D1bCc808229a4b2d98099C47cc3C61DA7D065A",
      "0xd58aF62f08E44Da76201d365d20668940e8b4CA0",
      "0xd29665Ed03Fa4c1cDa470E6EF2A77FAB2291bB26",
      "0x8d2723Fe2bfc3E9C2515a8789dADF8C82f58F04f",
      "0x0E9E97308Ef8e35211a21aEf9708dCC80F3D79ef",
      "0x74C97b9aeB2f5b1841Ba99bca6991E8531715E0C",
      "0x564f2b232B88F236bD29bC1Db539bdE89C3013A7",
      "0xc23f518F2630fbBC302ccC480222Ca20c153De06",
      "0xCdDCe16cb23716C29150AA25A871B4c230E53c9C",
      "0xAfC326D739944b93600cfE4C28CfB96B6790D34a",
      "0x2F434CAD1525c38FF21AA60DD55E8a2C924fE1BF",
      "0x9E3E0D960641d664c4f7d4A94aD3C76BdaB1aA53",
      "0xe8b26D5e46a58e7B4de7E37576BBe919D8C823Ad",
      "0x8cc252a212a42E381B0774EbF936C8615d9D3b44",
      "0x6E76d2929b490cB651A48420B730f4A9937F7d15",
      "0x57E13E46401dA3cC1dd5ABAD73d72F71a2C2c2EC",
      "0x3838cAbE4021B5b3426C177300BB3b0dD39DD8D8",
      "0xc543C32dFC85Da41E1Be2f45343a42c77b5074C3",
      "0x7C07703B1f470b7673bF65aE6d49883AF2cA341e",
      "0x0193b726f29D7E12c8B1778298F888c546D0543F",
      "0x80803E48Bc711073683b632A059680aF3602f874",
      "0x71646840824dD0cB7D2c3E7f4E5D1D49810Cd121",
      "0x5D517b3025e0C502a1b3c73Fcb87210eba994a96",
      "0xDf89869a044C9ca690c17eE1EbFaf86a29E17FC8",
      "0x684f8bbc0544B5366e49FE1AF5a5cCF0BdAc656B",
      "0x0e9a70551E121aaE0c2BAfA056Fc60CACA465A1D",
      "0x47e5b9AF0bf7Bb445110946F6211790E1261B973",
      "0xc3d704D0CFc93Ab1aC56BeD5aaA25E5e4dA844A4",
      "0x413003a8f15AA90A54B610fD7A4f32a0616f62e0",
      "0x97c60BCc7B401b9DD474a1B02eD484976c112fE2",
      "0x1dc44eC6C01A85A7016500c7FEd26fe8c3203442",
      "0xa79445a509499ADd42ef514D821562A602bEf904",
      "0x8Fd8a76d97cC9F6A5Fb2846121b80b0A6f11Feb6",
      "0xE1b6573D7750f6AF38393c2D8Cd33aAbd9Bf4c78",
      "0x71B6aBB3D88dF6922DCb2659FB5049b417bEaEb8",
      "0x771Ef0171514F9FDD67c71f1D801Fa095Bb7c484",
      "0x5aB6fAf49f9132510FF1e355BBa32Fa3EB2d0f9b",
      "0x9C3670f125278936f5d2D80c3D975Bc0d8C7C721",
      "0x7E20D03b5ec34c8A3014e07670E10077ea57Be2E",
      "0xE5A9d62615D7946FBF4FcBa9aA6C90dCFB5AC432",
      "0x2dA005b32EFC42B8911d5841709339dFA8A2d2dA",
      "0xf9ddd38A4e0C3237563DBB651D1a155551e54ad6",
      "0x255E21F207888b6cA4400524c75Cc70dEDe6B968",
      "0x89fD348da74C781Ee15333E098C123b4953A13A6",
      "0x9f79f5E3D260810281D9B1C67c2A0b7f8DdC2423",
      "0x7D21F6712aB6e910DB8FED5B7c8D5911fDa82572",
      "0x588Db2B2AA417e07d2BC474eD29917c3d8C9f0aE",
      "0xF3f42583A7e2B2720C8D5e6f534D973EA4f63524",
      "0x8350A053488d8c5aF3eF6724BF1cAb03E8A53d58",
      "0x598631B5F55499C3dE1Ee0B39afb240b53123cd5",
      "0xfeF349f94df1b96Fd256378417925924874482bd",
      "0x789B62E08bD6c71b81b9716Aa170FBc6bECb1e87",
      "0xb69802bA1e79D0bd9EbD02F0fAc935886342f455",
      "0x1EA333626e421345e02e13d6Dda97C11e3Fe38B8",
      "0x8F5f352f93284bD9F89E30CB93777FC2663a6877",
      "0x1EEB549206218c39Fd9Bb46fd00E92026933Df21",
      "0x5b71A982EbC2609c78aFD96D56BCeEBE14B3bC99",
      "0xe3FCC4575860349A998Fb2d35D025670CbD81437",
      "0x2220Bd99a52458E60d45030E1E3F41C5f043Fc90",
      "0x3578e7e02cFf00c6f014Fe0533277D27aa49c2D7",
      "0xf4f906DAb74Fd2337EACe6972816527F440D491C",
      "0xfe6d661be877D024B0d7E8799133648eee2a707a",
      "0xf4aA7A958D823b4314f0235e2d0AbD74225266d3",
      "0xd441b2C2c371C34f7A942972c180512Df70D6008",
      "0xb0D9BF706fC3d79e62f7015414770238a7b29434",
      "0x1DD1ACAFDC97257DeAC9A620127cED997a56AeDc",
      "0x0e87b279251bD339b0fe05e199633265f4Fe22AC",
      "0xB230575c629F9ac3E795FEfb5eeAE51a3ED941ab",
      "0xE560A8f55746a80435BaF4556109D457C7b25Ca1",
      "0xa3Fa965306b7935c18D1e834FfEdCd7Dd42a0B50",
      "0x8a74c3C63f7b51C7f8e61b2CDEE9Ee06946F1C37",
      "0x5625F486762bA84C67E0cf85205D623d9bFcf7CE",
      "0xe93F228cC0da7C9F600b607f40C120C47F0DDD84",
      "0x68950E787B9Ded31D4E2B2418D7C09fDDf4d32BB",
      "0x6dd083cEe9638E0827Dc86805C9891c493f34C56",
      "0x7c2D2C6ba512e5dDCEE2769a842072b0733a8F1C",
      "0xfAc0Cf9e487356DDc72443061DFDB109885B04fD",
      "0x2D807BDfF7124487b90E50fA1A79e0a3d3da98A3",
      "0x1b9CA1C47A3aAAD8d094C224204076D36333D87e",
      "0x5702BD68Ec1cad5FC007E19cE75E74a662539733",
      "0x32dB7766465c0689bE3c6506582ec163F1770237",
      "0x956964Ba40e3772A320c4204d8489066F4A08EB7",
      "0x60861f228AF12461a6D42C970b3eFF5648504b13",
      "0x06145EF79CfAd7F057bC8aE68eC8c8C41E4D13E1",
      "0x324D5B0c7c054EAEa91cf7411478Ff317611EfB2",
      "0xd1cfB06fD0a8C055688362D01f938283DcA5862C",
      "0xEa76589e16066cfD1b17499d6c8d3776EfD385D3",
      "0x9A4f24307241729e35F9F648e1bdAbf60a528B4a",
      "0x307f5b38d49bB1004762108f062E937Ec55d16B1",
      "0x9668Be1A67697aC2eDAe86cE3AB9f022b58391fb",
      "0x43C6819e9a45aa83cc3FE7a54c8089BEe0761Fa5",
      "0x1e1bA18384b4A610Cc868dce2f6576048328e28B",
      "0x7cee16Be90652bF4063d929F4AE31165c1f2053E",
      "0x49A45B6b1D12640B5f32f11Bce93d4bb494c736E",
      "0xB4728965C79Ef7Ae437d37b1459fFA0130f725BE",
      "0x9bE8f84D59E56bc00c23FA937eAce81904D843Bf",
      "0x83C512f48DF3719DE890932Dfb32bf71Bd58FCf4",
      "0xD41f160d3692888FC1AE33727D7416B62d521B0F",
      "0x8dce693130c57B4960a0D682b7A418D31c4912A2",
      "0x975ECABdd145ddCF31f81c02dC2Ce402B029118B",
      "0x68c0cdDA2699998BE3ea942b94acD61b2f82e470",
      "0xF168D36d526c75be671e6CC197013De35d44087b",
      "0x83f14EdafbdF658990e65FE188eD6F0C90533726",
      "0xcFa050836C3E5dfA98D065d2f365Cfd78a9011F9",
      "0x3272946B6244d29458579d6182eAa8Aa7402F729",
      "0x9647BC2cD383deC17D2a0b154c48c7a24dB72640",
      "0x0E4c56B4a766968b12c286f67aE341b11eDD8b8d",
      "0x5591a4a04629AA0cC0Dd281E8EC5a692ee68F8Cb",
      "0xbd46CBAD033b3FfAF33A4d7766c590c26F1F7575",
      "0x328665A957f61A6EDa630216759E216b229f9821",
      "0xB7610606584f2Ad7293101F3Dd89c794313d61dF",
      "0x4446772Da0E835B986E3861fc6a96c61637c3aF6",
      "0xe473B42E6ebD9048E80aa8ed0ceD9fF5a6b040d8",
      "0x45384653c3fc622d32c4269D5BB76D7b4E34aF05",
      "0x57e53e14a2655F6D350Ea3f3CB6Eb95247b85cEc",
      "0xF5F10Ee71df6FE1EA33c780Ab7857a412ca7Fb24",
      "0xac1a02fB37f29cb5B1f5ABB5C9E45470f3122975",
      "0x67563688D0Fe7C0db3FF8Adb5B165d62EB9F3Ee0",
      "0x0597171C22D70c545889179bBFdC6a9c65D8fbE0",
      "0x6843823b4BDEDd8a85134D6D0d59D88830EF9F00",
      "0xF38F7603023f6dbe7B514Ef364DD88D4c936A470",
      "0xFf6b058484517BF58450DfC4a6eb53F1A2171775",
      "0x6C9242CF71e4EfEE76E795c02aaad441ac88D419",
      "0x52f5810EB42fb24a8F8147666006BD3612902B49",
      "0x870c3e8CB17c6d93d18611483f10f72069b0273D",
      "0x4c3616b21007Cd64e4674bB7BEb4ec2986DA66d0",
      "0xfd57C6720Ce95B85A3d686a41D3746dcE9322Dd7",
      "0xBd093b8eF7B6F9d9AA964bD9DEf8A8969cF9217b",
      "0xCF98de1c8aFf44388FB7c3bc829B59456F8eA0e4",
      "0x73d5C2f4EB0E4EB15B3234f8B880A10c553DA1ea",
      "0x93EF61EE54bf217aD1BE909b97D4B645151d35f0",
      "0xe7e9775dDA64dF7c8B1a7916F657A238559c3C31",
      "0xBde5E1592AEb3D8396b90c4B4ba274E5Ae31e552",
      "0xAc6377626a6aD32E7cd7c34E1b2A2B128b1d096b",
      "0xe5E38b78E61B0Ab102B9a67D52843188F7456339",
      "0x2556235512706895579d9a48a6534d85418Cd9AB",
      "0x78945Dd016A0e767529351D859B923A8C2D634Ea",
      "0xA99D4c96a2470b19e4dcb2Cd1f2bc2AAAcCAc53F",
      "0x158B52cd6D1B907EB90866eb32E7904A3324BFdA",
      "0xDb9211E83e32d470D7AD6157228DbB1656b8847F",
      "0x69f7d7893Ace538296f9285BaE70631D481D0fDB",
      "0x43b417344aD268Fc22853dB99ea27DB4cbdd6362",
      "0x2ED91B84e67774416ad331454c254dBeABE01400",
      "0xC617c8f3a2B607234AA07B5598847Bae4B58Af13",
      "0x6b8242e74Bb0EF58e20414A93c8C69265E85Ef6C",
      "0xCd90d4B8c11D58c16515D044F60b4ED7C11CDB66",
      "0x4d679b4151533A4a26924091e3101ca2c26bFBbF",
      "0xC20e47F58b7ca4DFD4D5F8d5380472e0f4f4b521",
      "0xcEe86F120323b56d60a5e5d1A7861fc5cd9C0627",
      "0x75281897ab2C4f2498d7e36219D85f953E359cB2",
      "0x3FF12F77DAB6c2BB3b5a252DeCbC348bcC18142B",
      "0x697246F95Ec9C5Fa7879dFd03Dc7adfBB4b2f98F",
      "0x61CC70Db4cEB62a5221Afd0c2b96c28F17024be8",
      "0x1f8303Fa3DfD6bD009dB95798Ad0eA645de443b3",
      "0x6F58c7C3F8de57d7D0D97e8b3Ed2D05D17ED62c7",
      "0xc29fFA491A55e2187D3845Fad1B26A2288B8AC4D",
      "0xA4F9CC79ce76B8d14cB9bb4c85CA7e246E8EB8c3",
      "0xF2c441C314Fb5337D63984Dbec96AaB3DD6BDED4",
      "0x6eC9071957f29969f42c8F08Abe9026accae6FDF",
      "0x2C83fE5FB20a8E7cC562F3C521D845B1eDe48D85",
      "0x35288d64387BaD6EF0AbB8382C8E775b8Fb90619",
      "0x5a8A27b77d1D85F86DE917E912112b44B8596FC9",
      "0xD3869E5227ae9Af81933bd663A6012530c15BE49",
      "0x56aF9C2872771Cd2d0E401D699eAB736c91b456A",
      "0x853CAcEc83e4183eF78d6b64ccca3de365861CaF",
      "0x62678a3aAe21A3Fd6c1d471105abe695974F8Cce",
      "0x7F65A0652Ac8Dec220aB8990Eba1753ce5862a21",
      "0x7916f9c19d16456DDe5e57f42757C7d85fCee656",
      "0x4fa2C1845C46817F0A359dB65443fBB85983BCF3",
      "0x62D9e4e99482aF8D573d5ce1ed527C96783153ad",
      "0xCD8967c37daa5205B25177c8F72f25B9c1F5B80b",
      "0x20d1a052Dc4194342765D4d97A863a29A369dA12",
      "0xA1ea60095386b0792D8a502DF3CF75D8814Aaf71",
      "0x661b82D574a72ee82dE95E5Ed854441d8202cb7F",
      "0xE8b219c285e4e4ec28ac80Fdc4b9739b18cB8890",
      "0x7b3f9Ae95D8852078E49168505d6C897E4B11B6E",
      "0x727f8087a19c0074262fB20Be2f0C650516C7108",
      "0xd5e295C9D1a810a69A37177928c3E2d571c7d3eD",
      "0x6c749542676A376B8eD5A7564da7c1E4F210c610",
      "0x5FBa15454647FeCbCaf1134B2cfC2C62FDAD808E",
      "0x98648E6127C1ef3B83cFA76653bb6330aEb3C112",
      // "0x3914e354979e6bc63782512Bddb24C224E81a1bD", v3
      // "0x1DFAb7699121fEF702d07932a447868dCcCFb029", v3
      // "0xb634f40D77600Db4a61458Af9312C7925A2D65d1", v3
      // "0x8d8d1CdDD5960276A1CDE360e7b5D210C3387948", v3
      // "0xEFBA2550E43565925Ca3182D0583942b29498212", v3
      // "0xB55A8d2A2775D72BC204049C598d1aCd19ECbBCe", v3
      "0x92396Ac9fA799C68e3651fD33C3061661D785f45",
      "0xDaaA1681Fe853EcA38Ba5F12b04004841d543C99",
      "0x719274487726990998924A1A6e3624a84BD80c99",
      "0xdEa6730B789EE799DbA9fe20f5B473c60Ce41284",
      "0x90be118bB4eb350e9f133978Cc19d5d11656eE8d",
      "0x13bAeC9C12544066a7918efc3D8b626dBbFE1615",
      "0x51af8516b058e0dC9eE0896FDa8EAABd28ba1394",
      "0x599257fD4f669f3CbFBB72E4a61860FE5513fF76",
      "0x4d41d9Cb911A213B676d03a7b0e40f3a16FaC0d0"
    ]
  
    await loadVeloSynthetixPoolInfoPrice(App, tokens, prices, App.YOUR_ADDRESS, "0x8134a2fdc127549480865fb8e5a9e8a8a95a54c5");
  
    const gauges = _gauges.filter(g => g != "0x0000000000000000000000000000000000000000").map(a => {
      return {
        address: a,
        abi: VELO_V2_GAUGE_ABI,
        stakeTokenFunction: "stakingToken"
      }
    });
  
    let p = await loadVeloV2SynthetixPools(App, tokens, prices, gauges, clicked)
    _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}\n`);
    if (p.totalUserStaked > 0) {
      _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalApr * 100).toFixed(2)}%\n`);
      _print(`Estimated VELO earnings:`
              + ` Day ${p.totalUserDailyRewards.toFixed(2)} ($${formatMoney(p.totalUserDailyRewardsUSD)})`
              + ` Week ${p.totalUserWeeklyRewards.toFixed(2)} ($${formatMoney(p.totalUserWeeklyRewardsUSD)})`
              + ` Year ${p.totalUserYearlyRewards.toFixed(2)} ($${formatMoney(p.totalUserYearlyRewardsUSD)})`);
      _print("");
    }
  
    const claimAll = async function() {
      const rewardTokenAddresses = p.gaugeAddresses.map((g) => [VELO_V2_TOKEN_ADDR]);
      return veloV2Contract_claimAll(p.gaugeAddresses, rewardTokenAddresses, VELO_V2_VOTER_ADDR, App)
    }
    const reload = async function(){
      _print("Reading smart contracts...\n");
      _print("This may take few minutes...\n");
      const App = await init_ethers();
      return reloadFun(App, p.tokens, p.prices, p.pools, p.clicked);
    }
    _print_link(`Claim All ${p.earnings.toFixed(6)} VELO ($${formatMoney(p.earningsUSD)})\n`, claimAll)
    _print("");
    _print_link(`\nClick here to see just your staked pools`, reload);
    _print("");
  
    hideLoading();
  }
  
  const veloV2Contract_claimAll = async function(gaugeAddresses, rewardTokenAddresses, voterAddress, App) {
    const signer = App.provider.getSigner()
  
    const REWARD_POOL = new ethers.Contract(voterAddress, VELO_V2_VOTER_ABI, signer)
  
    console.log(App.YOUR_ADDRESS)
  
    showLoading();
    REWARD_POOL.claimRewards(gaugeAddresses, rewardTokenAddresses, { gasLimit: 5000000 })
    .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function(ex) {
          console.log(ex);
      }
    )
    hideLoading();
  }
  
  const reloadFun = async function (App, tokens, prices, pools, clicked){
    if(clicked == false){
      clicked = true;
      let p = await loadVeloV2SynthetixPools(App, tokens, prices, pools, clicked)
      if (p.totalUserStaked > 0) {
        _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalApr * 100).toFixed(2)}%\n`);
        _print(`Estimated VELO earnings:`
                + ` Day ${p.totalUserDailyRewards.toFixed(2)} ($${formatMoney(p.totalUserDailyRewardsUSD)})`
                + ` Week ${p.totalUserWeeklyRewards.toFixed(2)} ($${formatMoney(p.totalUserWeeklyRewardsUSD)})`
                + ` Year ${p.totalUserYearlyRewards.toFixed(2)} ($${formatMoney(p.totalUserYearlyRewardsUSD)})`);
        _print("");
      }
    }else{
      clicked = false;
      let p = await loadVeloV2SynthetixPools(App, tokens, prices, pools, clicked)
      if (p.totalUserStaked > 0) {
        _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalApr * 100).toFixed(2)}%\n`);
        _print(`Estimated VELO earnings:`
                + ` Day ${p.totalUserDailyRewards.toFixed(2)} ($${formatMoney(p.totalUserDailyRewardsUSD)})`
                + ` Week ${p.totalUserWeeklyRewards.toFixed(2)} ($${formatMoney(p.totalUserWeeklyRewardsUSD)})`
                + ` Year ${p.totalUserYearlyRewards.toFixed(2)} ($${formatMoney(p.totalUserYearlyRewardsUSD)})`);
        _print("");
      }
    }
  }
  
  async function loadVeloV2SynthetixPools(App, tokens, prices, pools, clicked) {
    let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
    let totalUserDailyRewards = 0, totalUserWeeklyRewards = 0, totalUserYearlyRewards = 0, totalUserDailyRewardsUSD = 0, totalUserWeeklyRewardsUSD = 0, totalUserYearlyRewardsUSD = 0
    let gaugeAddresses = [], earnings = 0, earningsUSD = 0;
    const infos = await Promise.all(pools.map(p =>
        loadVeloV2SynthetixPoolInfo(App, tokens, prices, p.abi, p.address, p.stakeTokenFunction)));
    for (const i of infos) {
      let p = await printVeloV2SynthetixPool(App, i, "optimism", clicked);
      totalStaked += p.staked_tvl || 0;
      totalUserStaked += p.userStaked || 0;
      if (p.userStaked > 0) {
        individualAPRs.push(p.userStaked * p.apr / 100);
        totalUserDailyRewards += p.userDailyRewards;
        totalUserWeeklyRewards += p.userWeeklyRewards;
        totalUserYearlyRewards += p.userYearlyRewards;
        totalUserDailyRewardsUSD += p.userDailyRewardsUSD;
        totalUserWeeklyRewardsUSD += p.userWeeklyRewardsUSD;
        totalUserYearlyRewardsUSD += p.userYearlyRewardsUSD;
        gaugeAddresses.push(p.stakingAddress);
        earnings += p.earned;
        earningsUSD += p.earningsUSD;
      }
    }
    let totalApr = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
    return { staked_tvl : totalStaked, totalUserStaked, totalApr, totalUserDailyRewards,  totalUserWeeklyRewards,
             totalUserYearlyRewards, totalUserDailyRewardsUSD, totalUserWeeklyRewardsUSD, totalUserYearlyRewardsUSD,
             gaugeAddresses, earnings, earningsUSD, tokens, prices, pools, clicked};
  }
  
  async function loadVeloV2SynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
    stakeTokenFunction) {
      const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
  
      const periodFinish = await STAKING_POOL.periodFinish()
      const rewardRate = await STAKING_POOL.rewardRate()
      const weeklyReward = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate / 1e18 * 604800;
      if(weeklyReward <= 500){
        return {
          stakingAddress: "",
          poolPrices: 0,
          stakeTokenAddress: "",
          rewardTokenAddresses: "",
          stakeTokenTicker: "",
          rewardTokenTickers: "",
          stakeTokenPrice: 0,
          rewardTokenPrices: 0,
          weeklyRewards: [0],
          usdCoinsPerWeek: 0,
          staked_tvl: 0,
          userStaked: 0,
          userUnstaked: 0,
          earnings: 0
        }
      }
  
  
      if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
        console.log("Couldn't find stake function ", stakeTokenFunction);
      }
      const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();
  
      let rewardTokenAddresses = [], rewardTokens = [], rewardTokenTickers = [], rewardTokenPrices = [], weeklyRewards = [], earnings = [], usdCoinsPerWeek = [];
      const rewardTokenAddress = "0x9560e827af36c94d2ac33a39bce1fe78631088db";
      rewardTokenAddresses.push(rewardTokenAddress);
      if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
        tokens[rewardTokenAddress] = await getGeneralEthcallToken(App, rewardTokenAddress, stakingAddress);
      }
      const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
      const rewardTokenTicker = rewardToken.symbol;
      const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
      const earned_ = await STAKING_POOL.earned(App.YOUR_ADDRESS)
      const usdPerWeek = weeklyReward * rewardTokenPrice;
      const earned = earned_ / 10 ** rewardToken.decimals;
      rewardTokens.push(rewardToken);
      rewardTokenTickers.push(rewardTokenTicker);
      rewardTokenPrices.push(rewardTokenPrice);
      weeklyRewards.push(weeklyReward);
      earnings.push(earned);
      usdCoinsPerWeek.push(usdPerWeek);
  
      var stakeToken = await getGeneralEthcallToken(App, stakeTokenAddress, stakingAddress);
  
      const balance = await STAKING_POOL.balanceOf(App.YOUR_ADDRESS)
  
      var newTokenAddresses = stakeToken.tokens.filter(x =>
        !getParameterCaseInsensitive(tokens,x));
      for (const address of newTokenAddresses) {
          tokens[address] = await getGeneralEthcallToken(App, address, stakingAddress);
      }
  
      const poolPrices = tryGetPoolPrices(tokens, prices, stakeToken, "optimism");
  
      const stakeTokenTicker = poolPrices.stakeTokenTicker;
  
      const stakeTokenPrice =
          prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
  
      const staked_tvl = poolPrices.staked_tvl;
  
      const userStaked = balance / 10 ** stakeToken.decimals;
  
      const userUnstaked = stakeToken.unstaked;
  
      return  {
        stakingAddress,
        poolPrices,
        stakeTokenAddress,
        rewardTokenAddresses,
        stakeTokenTicker,
        rewardTokenTickers,
        stakeTokenPrice,
        rewardTokenPrices,
        weeklyRewards,
        usdCoinsPerWeek,
        staked_tvl,
        userStaked,
        userUnstaked,
        earnings
      }
  }
  
  async function printVeloV2SynthetixPool(App, info, chain="eth", clicked, customURLs) {
    if(clicked == true && info.userStaked == 0 || info.weeklyRewards[0] < 800 || info.staked_tvl < 150){
      return {
        staked_tvl: 0,
        userStaked : 0,
        apr : 0,
        userDailyRewards : 0,
        userWeeklyRewards : 0,
        userYearlyRewards : 0,
        userDailyRewardsUSD : 0,
        userWeeklyRewardsUSD : 0,
        userYearlyRewardsUSD : 0,
        stakingAddress : info.stakingAddress,
        rewardTokenAddress : info.rewardTokenAddresses[0],
        earned : info.earnings[0],
        earningsUSD : 0
      }
    }
    info.poolPrices.print_price(chain, 4, customURLs);
    let totalYearlyAPR = 0, totalWeeklyAPR = 0, totalDailyAPR = 0, totalUSDPerWeek = 0
    for(let i = 0; i < info.rewardTokenTickers.length; i++){
      let weeklyAPR = info.usdCoinsPerWeek[i] / info.staked_tvl * 100;
      let dailyAPR = weeklyAPR / 7;
      yearlyAPR = weeklyAPR * 52;
      totalYearlyAPR += yearlyAPR;
      totalWeeklyAPR += weeklyAPR;
      totalDailyAPR += dailyAPR;
      totalUSDPerWeek += info.usdCoinsPerWeek[i];
      _print(`${info.rewardTokenTickers[i]} Per Week: ${info.weeklyRewards[i].toFixed(2)} ($${formatMoney(info.usdCoinsPerWeek[i])})`);
    }
    _print(`APR: Day ${totalDailyAPR.toFixed(4)}% Week ${totalWeeklyAPR.toFixed(2)}% Year ${totalYearlyAPR.toFixed(2)}%`);
    const userStakedUsd = info.userStaked * info.stakeTokenPrice;
    const userStakedPct = userStakedUsd / info.staked_tvl * 100;
    _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
             `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
    const userWeeklyRewards = userStakedPct * info.weeklyRewards[0] / 100;
    const userDailyRewards = userWeeklyRewards / 7;
    const userYearlyRewards = userWeeklyRewards * 52;
    const userDailyRewardsUSD = userDailyRewards*info.rewardTokenPrices[0]
    const userWeeklyRewardsUSD = userWeeklyRewards*info.rewardTokenPrices[0]
    const userYearlyRewardsUSD = userYearlyRewards*info.rewardTokenPrices[0]
    const earningsUSD = info.earnings[0]*info.rewardTokenPrices[0];
      if (info.userStaked > 0) {
        info.poolPrices.print_contained_price(info.userStaked);
          _print(`Estimated ${info.rewardTokenTicker} earnings:`
              + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewardsUSD)})`
              + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewardsUSD)})`
              + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewardsUSD)})`);
      }
    const claim = async function() {
      return veloV2Contract_claim(info.rewardTokenAddresses[0], info.stakingAddress, App)
    }
    const exit = async function() {
      return rewardsContract_exit(info.stakingAddress, App)
    }
    const revoke = async function() {
      return rewardsContract_resetApprove(info.stakeTokenAddress, info.stakingAddress, App)
    }
    _print(`<a target="_blank" href="https://optimistic.etherscan.io/address/${info.stakingAddress}#code">Optimistic Scan</a>`);
    let claimLink = "";
    for(let i = 0; i < info.earnings.length; i++){
      claimLink += `${info.earnings[i].toFixed(6)} ${info.rewardTokenTickers[i]} ($${formatMoney(info.earnings[i]*info.rewardTokenPrices[i])}) `
    }
    _print_link(`Claim ${claimLink}`, claim);
    if (info.stakeTokenTicker != "ETH") {
      _print_link(`Revoke (set approval to 0)`, revoke)
    }
    _print_link(`Exit`, exit)
    _print("");
  
    return {
        staked_tvl: info.poolPrices.staked_tvl,
        userStaked : userStakedUsd,
        apr : totalYearlyAPR,
        userDailyRewards : userDailyRewards,
        userWeeklyRewards : userWeeklyRewards,
        userYearlyRewards : userYearlyRewards,
        userDailyRewardsUSD : userDailyRewardsUSD,
        userWeeklyRewardsUSD : userWeeklyRewardsUSD,
        userYearlyRewardsUSD : userYearlyRewardsUSD,
        stakingAddress : info.stakingAddress,
        rewardTokenAddress : info.rewardTokenAddresses[0],
        earned : info.earnings[0],
        earningsUSD : earningsUSD
    }
  }
  
  const veloV2Contract_claim = async function(rewardTokenAddress, rewardPoolAddr, App) {
    const signer = App.provider.getSigner()
  
    const REWARD_POOL = new ethers.Contract(rewardPoolAddr, VELO_V2_GAUGE_ABI, signer)
  
    console.log(App.YOUR_ADDRESS)
  
    const earnedYFFI = (await REWARD_POOL.earned(rewardTokenAddress, App.YOUR_ADDRESS)) / 1e18
  
    if (earnedYFFI > 0) {
      showLoading()
      REWARD_POOL.getReward(App.YOUR_ADDRESS, [rewardTokenAddress], {gasLimit: 250000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }
  }
  
  function tryGetPoolPrices(tokens, prices, pool, chain = "optimism"){
    try {
      const poolPrice = getPoolPrices(tokens, prices, pool, chain = "optimism")
      return poolPrice;
    }catch(err){
      console.log(pool.address, err);
      return null;
    }
  }
  
  function removeDuplicates(arr) {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);
  }
  
  async function loadVeloSynthetixPoolInfoPrice(App, tokens, prices, stakingAddress, stakeTokenAddress) {
    var stakeToken = await getGeneralEthcallToken(App, stakeTokenAddress, stakingAddress);
    var newPriceAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(prices, x));
    var newPrices = await lookUpTokenPrices(newPriceAddresses);
    for (const key in newPrices) {
      if (newPrices[key]?.usd)
          prices[key] = newPrices[key];
    }
    var newTokenAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getGeneralEthcallToken(App, address, stakingAddress);
    }
    const poolPrices = getPoolPrices(tokens, prices, stakeToken, "arbitrum");
  
    if (!poolPrices)
    {
      console.log(`Couldn"t calculate prices for pool ${stakeTokenAddress}`);
      return null;
    }
  
    const stakeTokenTicker = poolPrices.stakeTokenTicker;
  
    const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
  
    const staked_tvl = poolPrices.staked_tvl;
  
    return  {
      stakingAddress,
      poolPrices,
      stakeTokenAddress,
      stakeTokenTicker,
      stakeTokenPrice,
      staked_tvl,
    }
  }
  