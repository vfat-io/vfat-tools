
$(function() {
consoleInit(main)
});

const RAM_VOTER_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"__ve","internalType":"address"},{"type":"address","name":"_factory","internalType":"address"},{"type":"address","name":"_gauges","internalType":"address"},{"type":"address","name":"_bribes","internalType":"address"}]},{"type":"event","name":"Abstained","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256","indexed":false},{"type":"int256","name":"weight","internalType":"int256","indexed":false}],"anonymous":false},{"type":"event","name":"Attach","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"gauge","internalType":"address","indexed":true},{"type":"uint256","name":"tokenId","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Deposit","inputs":[{"type":"address","name":"lp","internalType":"address","indexed":true},{"type":"address","name":"gauge","internalType":"address","indexed":true},{"type":"uint256","name":"tokenId","internalType":"uint256","indexed":false},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Detach","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"gauge","internalType":"address","indexed":true},{"type":"uint256","name":"tokenId","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"DistributeReward","inputs":[{"type":"address","name":"sender","internalType":"address","indexed":true},{"type":"address","name":"gauge","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"GaugeCreated","inputs":[{"type":"address","name":"gauge","internalType":"address","indexed":true},{"type":"address","name":"creator","internalType":"address","indexed":false},{"type":"address","name":"bribe","internalType":"address","indexed":true},{"type":"address","name":"pool","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"NotifyReward","inputs":[{"type":"address","name":"sender","internalType":"address","indexed":true},{"type":"address","name":"reward","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Voted","inputs":[{"type":"address","name":"voter","internalType":"address","indexed":true},{"type":"uint256","name":"tokenId","internalType":"uint256","indexed":false},{"type":"int256","name":"weight","internalType":"int256","indexed":false}],"anonymous":false},{"type":"event","name":"Whitelisted","inputs":[{"type":"address","name":"whitelister","internalType":"address","indexed":true},{"type":"address","name":"token","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Withdraw","inputs":[{"type":"address","name":"lp","internalType":"address","indexed":true},{"type":"address","name":"gauge","internalType":"address","indexed":true},{"type":"uint256","name":"tokenId","internalType":"uint256","indexed":false},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"_ve","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"attachTokenToGauge","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"},{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"bribefactory","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"bribes","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"claimBribes","inputs":[{"type":"address[]","name":"_bribes","internalType":"address[]"},{"type":"address[][]","name":"_tokens","internalType":"address[][]"},{"type":"uint256","name":"_tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"claimFees","inputs":[{"type":"address[]","name":"_fees","internalType":"address[]"},{"type":"address[][]","name":"_tokens","internalType":"address[][]"},{"type":"uint256","name":"_tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"claimRewards","inputs":[{"type":"address[]","name":"_gauges","internalType":"address[]"},{"type":"address[][]","name":"_tokens","internalType":"address[][]"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"claimable","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"createGauge","inputs":[{"type":"address","name":"_pool","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"detachTokenFromGauge","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"},{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"distribute","inputs":[{"type":"address[]","name":"_gauges","internalType":"address[]"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"distribute","inputs":[{"type":"address","name":"_gauge","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"distribute","inputs":[{"type":"uint256","name":"start","internalType":"uint256"},{"type":"uint256","name":"finish","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"distribute","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"distributeFees","inputs":[{"type":"address[]","name":"_gauges","internalType":"address[]"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"distro","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"emitDeposit","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"},{"type":"address","name":"account","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"emitWithdraw","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"},{"type":"address","name":"account","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"factory","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"gaugefactory","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"gauges","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"initialize","inputs":[{"type":"address[]","name":"_tokens","internalType":"address[]"},{"type":"address","name":"_minter","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isGauge","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isWhitelisted","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"length","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"listing_fee","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"minter","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"notifyRewardAmount","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"poke","inputs":[{"type":"uint256","name":"_tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"poolForGauge","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"poolVote","inputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"pools","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"reset","inputs":[{"type":"uint256","name":"_tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalWeight","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateAll","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateFor","inputs":[{"type":"address[]","name":"_gauges","internalType":"address[]"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateForRange","inputs":[{"type":"uint256","name":"start","internalType":"uint256"},{"type":"uint256","name":"end","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateGauge","inputs":[{"type":"address","name":"_gauge","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"usedWeights","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"vote","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"},{"type":"address[]","name":"_poolVote","internalType":"address[]"},{"type":"int256[]","name":"_weights","internalType":"int256[]"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"int256","name":"","internalType":"int256"}],"name":"votes","inputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"int256","name":"","internalType":"int256"}],"name":"weights","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"whitelist","inputs":[{"type":"address","name":"_token","internalType":"address"},{"type":"uint256","name":"_tokenId","internalType":"uint256"}]}]

const RAM_GAUGE_ABI = [{"inputs":[{"internalType":"address","name":"_stake","type":"address"},{"internalType":"address","name":"_bribe","type":"address"},{"internalType":"address","name":"__ve","type":"address"},{"internalType":"address","name":"_voter","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"claimed0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"claimed1","type":"uint256"}],"name":"ClaimFees","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"reward","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ClaimRewards","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"reward","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"NotifyReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"_ve","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"maxRuns","type":"uint256"}],"name":"batchRewardPerToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"bribe","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"checkpoints","outputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"balanceOf","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimFees","outputs":[{"internalType":"uint256","name":"claimed0","type":"uint256"},{"internalType":"uint256","name":"claimed1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"depositAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"derivedBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"derivedBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"derivedSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fees0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fees1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"getPriorBalanceIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"getPriorRewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"getPriorSupplyIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address[]","name":"tokens","type":"address[]"}],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isReward","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"lastEarn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"left","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"numCheckpoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardPerTokenCheckpoints","outputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"rewardPerToken","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardPerTokenNumCheckpoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewards","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsListLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stake","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"supplyCheckpoints","outputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"supply","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"supplyNumCheckpoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"tokenIds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"voter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"withdrawToken","outputs":[],"stateMutability":"nonpayable","type":"function"}]

async function main() {
  const App = await init_ethers();

  let clicked = false;

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");
  _print("This may take few minutes...\n");

  const tokens = {};
  const prices = await getArbitrumPrices();

  const RAM_VOTER_ADDR = "0xAAA2564DEb34763E3d05162ed3f5C2658691f499"
  const RAM_VOTER_CONTRACT = new ethcall.Contract(RAM_VOTER_ADDR, RAM_VOTER_ABI);
  const RAM_TOKEN_ADDR = "0xaaa6c1e32c55a7bfa8066a6fae9b42650f262418"

  const _gauges = [
    '0xafE267681312ED76f0B7aEdFe54C8b200Ec32cFA', //ok
    '0x33d87a938CF5Ec96DE5e918A3cAe33Ccf37111c4', //ok
    '0xE07657b7252F0604Ce8c8a1559181CfDa45B90E8', //ok
    '0x22B6C54dC1cCD6CDF53723BEc88327c908258367', //ok
    '0x3AC64d4Af6734aEf5b95A3f99e2A04F3D2461938', //ok
    '0x4be8305b53362E220f671d77d19DCD8834D3ef12', //ok
    '0x046074d8Bb942B160a598937BD9BB84FB74330B7', //ok
    '0x2aCC06E6E7cE869eE558B3eF7A59072401543D50', //ok
    '0x72FE3525d674034aE22E485f2F2976E9112031d6', //ok
    '0xa2f6e1BF57617bBC9ef0D57F03C0284C72Ef85D2', //ok
    '0x5144556A5c93BCDffa181114Dc7CFaCC7b168f46', //ok
    '0x2fe2ECd5673D3408908827cD413C9dFb89Ce46Ba', //ok
    '0x7D6DAB76a2bd674B5129DBd479B7e3815279483f', //ok
    '0xe5F0383b9C4732Ec8876a25F3249B9CEaDDCc004', //ok
    '0x3e0295a7CBC956545834c9A8B4DFB576E75537f7', //ok
    '0xDBA865F11bb0a9Cd803574eDd782d8B26Ee65767', //ok
    '0x2FeCb78950385fDd62CC8C5E23Ce4F5f71c0944F', //ok
    '0x58CAc217fBd3A6bf72c2B6e5f0b89498bCC71D8A', //ok
    '0x8Dfe29a5Cc5a15021003b2e8aba8EAd02478C2a1', //ok
    '0x43f78a161352ce25C9DfCAA7400602498297F6a5', //ok
    '0x49c48868CF42e0f831efb3786010Ae5E5c4Ecde3', //ok
    '0xe5A9F2c2734bbd5cD968cEf7E00e848eB6439b04', //ok
    '0x7d426063E910Ed5C4427D63D24643BB2e2155Ff6', //ok
    '0x13b01b4008258adB3EbD57477a15244f69f96E95', //ok
    '0x7639A1b0276c4Ba416B9b02bEd68850E1873D6D3', //ok
    '0x8E45C00e12CFf27d4db9F71EDb06a6588f046a35', //ok
    '0x77714B250e988772B0A52EeF1eBeC3836a9BAC1c', //ok
    '0x88d8D2bDC4f12862FbaBEA43cEc08B8FCD2234Da', //ok
    '0xFCEf01aB8c1C232199a074189fCc94d850051539', //ok
    '0xa73aA1bb7B17794651ef652dA33EC79551c4f3c2', //ok
    '0xC4a4689c697bAa8e9613e7E5B31a376488e56Ad2', //ok
    '0xd07b6EB41C2099c4A4aE57FEEA4b79c94c3117cE', //ok
    '0x7A7C0E055d934c6f46322B126B945Ed514e6e79f', //ok
    '0x288ECBAaedC9Cdb15CA96AD35C3f9F1c4D171523', //ok
    '0x2F2Bd4f4ea740BC986E267A61aFb16069dFeafAA', //ok
    '0x9A6631617974E74f0B7B86D4462dA11D503D0E12', //ok
    '0xfB0DE6EA3205AB89Be876D2Ce166D10e57be3553', //ok
    '0x418C848a10e4df3ac70098D6F7D49614eF06FF0e', //ok
    '0xCF64EEf5204C95DB64969D19953Ac79bb33aB371', //ok
    '0xb64542F416066E49A65D0F06E031785A497B5062', //ok
    '0x49f7A557b616c3e32a6d1f16ac6782d9627e0Db8', //ok
    '0xE2B4F5a98aaE13BfE1E12dBca5b01Ef7E919480e', //ok
    '0x41AcEb7E1EF1B9B915A9c6B6e7AE4f1038117DdF', //ok
    '0xE370E2E177B44ec98C45a0a931aB372Daa0e42eF', //ok
    '0xBd5e84D68C744413db97a6DaC8023DB4deE15060', //ok
    '0x2752DC67EC679b88E4733D42Dc3B38324Cf7bfC2', //ok
    '0xB26c98124EA9Dc651F5C05379A1a7Cb88Ca28aE0', //ok
    '0x148Ca200d452AD9F310501ca3fd5C3bD4a5aBe81', //ok
    '0x8ae620e720fbec4278a3aE305f63496Fb333aC6f', //ok
    '0x249544aF1CBD8CE90De8FD5504aD7F929E739aa3', //ok
    '0x26901D5866a9157A5BC2a43136D3c7A6454C567A', //ok
    '0x7f6CbbDA98165A6a9388E582377B254547E18Cf3', //ok
    '0x385E1c3f90C52f5253EaBb015576E95a4886E552', //ok
    '0xad081E764EA534A877507CEA652f97527C7CBe07', //ok
    '0x89ED93D43F507b8D8Ca3c9b5fCD63E3126A523b6', //ok
    '0xf626cf4691C5aC58966CC7B2828f7e752E3EB7a5', //ok
    '0x6383CA3B08bE7F4B93ab85Cf38d1E14c6614630F', //ok
    '0x13bE90A43fBf986dBDEe32D4AE7327e8953A5571', //ok
    '0x7550550E9fA0966509f810eFc6AfaA0079C37c6a', //ok
    '0x96cAf3BC28e1910E775c3D1D8c682fE51520A246', //ok
    '0xcBBB41f93ed0B92a0702EB762ca068765e2775d6', //ok
    '0x912226121f7Ae8B22b179E7EE4F6a14B9148BE66', //ok
    '0xd0cd51b500B93Cf9660220e34FfF075e4b674e16', //ok
    '0xABAB0ed81DF0C3bf5122f578Bfa2064a20bd925F', //ok
    '0x2a73a90c144967cD620bC714CdBA0914936daf8c', //ok
    '0x0495d0D764207ac7743AeccfFb0Ef0E166800e98', //ok
    '0xB9B7430E0495527783fB149356B50332e3eD4014', //ok
    '0xB15c2eC86fb1b6cfcabaf29054883702d9d8e806', //ok
    '0x5ad24B1fa85D457e9Be0e0dd4578096db6EE1bfC', //ok
    '0x45d8E378E2e9Af97ea56437424E13A79cCf3AD84', //ok
    '0x11afdb9C16f296e324095A0E27ACeA3B0C899599', //ok
    '0xa317Fd504E893Cf2edB787bA1c665BD5eD80F707', //ok
    '0x17dFb203F8c3DE52C922be0e475978f9e201E36B', //ok
    '0x1919522888A8Cd838F5b5Bf6660fc716534e4fCB', //ok
    '0x4297afb7985a80572A2F4AFbDcDA87447aB3E965', //ok
    '0xB9Fa04F9fD3c0370F7FC3B3f5d10497BFe14EE9C', //ok
    '0x3A080027B654b5eA57425B2171D33cfBCFcEb90E', //ok
    '0xdCBe3BD452cbb8E79bfb62fF5EdB37Bb18570d3F', //ok
    '0x545cC7B1cAfEe38276c8cCf5B48e9A91050ac4c5', //ok
    '0x33209fF62Dc65e32e9B9B2bAc3808021157803dD', //ok
    '0x2Cd9a0942338d4e500F4D09c4CEe5fdfd1a55cF2', //ok
    '0x89ff096282FCDCF83758FB3d6fA5F76B2D9232f3', //ok
    '0xfc315F415ADc2Ca29167d8648728A0d177dcf49E', //ok
    '0x0d7F37405e1C688d8C02400f8083443551393646', //ok
    '0x69a3dE5F13677fd8d7aAF350A6c65DE50e970262', //ok
    '0x2951ffB9e7D54C9cA547901d482F2896E7D9a0eD', //ok
    '0xEBf119C0e5Fc1D226DefC4bb873aC1a9a232eF3E', //ok
    '0xCaBD6A398CB93338c105B40Df984Da8D91AAFe9b', //ok
    '0xad37624FF284FE2ceC4978220747486868A2e457', //ok
    '0x08D067339ab7db6d8D57cE59B4455A29180ADF9a', //ok
    '0xa562b6C59C4ebeeF35472fa794Bb10846f252c5A', //ok
    '0xF8719BC4a1A81969F00233a8D9409755d4366d28', //ok
    '0xB0C12E082822299c69F20c1496f4f908190a2E68', //ok
    '0x2c460032db5D572Ec8FB164a01Db5d6CeEe5a863', //ok
    '0xdf725A7315d3d246a39C8887870f6cb0Fe73e36d', //ok
    '0xEcb9F7f5993881e55FB3b3592a1E171f54ea1E3e', //ok
    '0x377A2625F81F370fE06f9e6299ae9cebD5BED949', //ok
    '0x50d30A2943513885246B14fCA71F83cc8241C385', //ok
    '0x48c3658A1F4b7577B38A0C054f52793A0Cf42F37', //ok
    '0x5E401f116a9ED2eeB8331e62F667c81916CA2652', //ok
    '0x554C2E937cE664d1D4C399dE90194BCe2c54d31D', //ok
    '0x45a911ed73551Bcc6fAfD11427CD5e75DcfBbb66', //ok
    '0xc303851A896F05bf55926EE4a97c98Fa806505D6', //ok
    '0x21798560D203d5127E2FF443ED0CE388907BE5De', //ok
    '0xde01B1b981f85CEa2FA4e039C96c6e81189d2FBD', //ok
    '0x0C158D91C935F46337bb1c0F448294F21A4FC2d7', //ok
    '0x0A60849B96F726c02aDe7252A2022F2E92D8b1C5', //ok
    '0x27e2d9b1F37bf0F9a8672eBA41EE2AB8470E4A04', //ok
    '0x2D7BcdB0c5936dFC7Db2c4C6F55956D09a308710', //ok
    '0xe0D448042dbBBD65973b97BB4b05412DC275bc90', //ok
    '0xaA5d3134430B7024961dae891463d03f4FB32BDC', //ok
    '0x11C1060e12F3Ec480D47AD867583353496a1B0b8', //ok
    '0x7733a6A411aFe5F11f431FE796F811aeffe6DD51', //ok
    '0x523f31f7108e7f7B5E7194b31cEa8a8D9C6DC6b8', //ok
    '0xC259C80395Fcb9F5a9435f3E55a3Cf44A3ac3b96', //ok
    '0x72dCc134c539f2f03E2796759A0ad4967529848e', //ok
    '0x55A7F83d5cA4e013eFC5c7586805ec6B86138E5A', //ok
    '0xD1A796cec42A9A523a76e70A314b59C470421cF3', //ok
    '0xD05A4174d7d288Eb3e760458D64AE7F56c23Bf83', //ok
    '0x00971c0b720ee91382886AF0808bE08A59D6Fe74', //ok
    '0x25046BEebf2383Ce2b3dcCaaD0B7F1feE780b34D', //ok
    '0x02D2b9c4515734708bC702967a1E86b291489E23', //ok
    '0xC3224241D435D064f65133a4053A45A7D0F8a34B', //ok
    '0x79C16a3a37F21C9cF65472b3F6AdcB60262C5bAE', //ok
    '0x217E2C88910615f6C6F7983d796E7afb49BDE71B', //ok
    '0xCf11c98e03F7949A12C165c9e92798CFFD8DDfCa', //ok
    '0x02D0F4756B34aB7595CD882f0e09aA5e53e8C334', //ok
    '0x96Cfccf1d962E925B176B4FaE516102C9B6276C5', //ok
    '0xd734Bb950c8477CcCf9f4c2096546EbaB6197aa0', //ok
    '0xCeF3A4A32C84DDfA7b8d7E436eC89c61420889e6', //ok
    '0xc08C005c3Fb56a88648712F4e12C289A94b32dA9', //ok
    '0xd3E42aBFEacB0EbB7AF8f4143C1b5A5FB6aA25Cc', //ok
    '0xD11D0b5709f01098A5BDCaacCd456Af84Bf32DD8', //ok
    '0x6e2db8bb3A12F4534dD2998f76c828A682B63c7f', //ok
    '0x238784fE898D686398D215E5b4363Eb078C6Cb56', //ok
    '0x40571D38B059FD2D05b9724F775b67FD494a427e', //ok
    '0xF80C2EB506EB31F98e0B9e34b09B9d67FE2DCfcF', //ok
    '0x4E52f307eCE546d63256cA61751C2a56a50166c7', //ok
    '0x0A923435Eb4C3FC740bbA0c000F16Cb1F6cd7Afb', //ok
    '0x874659b902503B02D2940c281AE732c22F4321C4', //ok
    '0x8f33205C12C2Cab5210D18DFD1D16f01E323596A', //ok
    '0xF278BABB278784dbdA0B16C926c4C3f8b1Cc4483', //ok
    '0x29f516b81D37979a967a99DeBce13850295D8ADc', //ok
    '0x29a646c328a76eb8f923b76a8D2e94F5e45912Be', //ok
    '0xE5c901703a0e731F4a40c764Af232c759e2833c5', //ok
    '0xC0585b9193d9875d8c54d6f03fa5D2Bed4f644a3', //ok
    '0xf97fA1dA6Fc97c3eF0FC57A7f1eEbAcFD9DF6Be6', //ok
    '0x04FF8E00985995c11e97EB73ac8453B124A827a0', //ok
    '0x03af9D725eF4Be8c46F833514E5b7C773Be1282e', //ok
    '0x40eC41909Ef87923679eA52Df7C7DDC40A45bF52', //ok
    '0x858354Bd4Bb452Fa02CD9e18F35B17Ed65F1CBf4', //ok
    '0x53BA21E42FAc41d9CA816cbdd48835C967335567', //ok
    '0x43fbf34df6da5fC66E15E023D3b690Fd0dE33cD7', //ok
    '0x3CD0B6E3450193059E54F5DEd732BF44daf220C9', //ok
    '0xF9D76af010FFF747D1cbFE3C9D6dd5764608560b', //ok
    '0x485904b6BB5Dc5EE8d9cE45Df3E07f38B34fFbA0', //ok
    '0xBAf33A15876b0d2A25d53f790f3590f14A135d06', //ok
    '0xCe831f8152DB79A4ee36cB89B64333188F6801C5', //ok
    '0x760ae710e683504C12A292BC059d3098709AB9B4', //ok
    '0xa74D0E145875AC453222784375FA3Ab626EdF8Cc', //ok
    '0x5Ec0221deab21400E5fa4AE5a314F90d6518d0f8', //ok
    '0x9765cDAeC6395B04737EdC22C5b3E7d85677328A', //ok
    '0xA5CA2e29DFeCC3A6bD699560Cc5aA2496Cb501dD', //ok
    '0xaC9bC6C7B932d83995cD8518a3Fe1a4445071820', //ok
    '0x7c1b5cd293fB09a3e5DDCF022cE00D1EF88BFc92', //ok
    '0x72B6594a0c8D9eE9725ce780f87F9E00615D4b10', //ok
    '0x4E7EeAf7630ACD354780cCd3298cC55ad662c98D', //ok
    '0xbAAD0fA7c22F81f407a416b9bF7E0148e87BFb59', //ok
    '0x1952CEe3E0733E4550D14F37b68068C10fd7D365', //ok
    '0x6425b42cE3a780C9C744FB6b2Ea4c635E3C2095e', //ok
  ]

  const gauges = _gauges.filter(g => g != "0x0000000000000000000000000000000000000000").map(a => {
    return {
      address: a,
      abi: RAM_GAUGE_ABI,
      stakeTokenFunction: "stake"
    }
  });

  //WETH/RAM to receive the price
  await loadRamSynthetixPoolInfoPrice(App, tokens, prices, App.YOUR_ADDRESS, "0x1E50482e9185D9DAC418768D14b2F2AC2b4DAF39")

  let staked_tvl = 0, totalUserStaked = 0, totalUserDailyRewards = 0, totalUserDailyRewardsUSD = 0, totalUserWeeklyRewards = 0, totalUserWeeklyRewardsUSD = 0, totalUserYearlyRewards = 0, totalUserYearlyRewardsUSD = 0;
  let gaugeAddresses = [], earnings = 0, earningsUSD = 0;
  for(const gauge of gauges){
    let p = await loadRamSynthetixPools(App, tokens, prices, [gauge], clicked)
    staked_tvl += p.staked_tvl;
    totalUserStaked += p.totalUserStaked;
    totalUserDailyRewards += p.totalUserDailyRewards;
    totalUserDailyRewardsUSD += p.totalUserDailyRewardsUSD;
    totalUserWeeklyRewards += p.totalUserWeeklyRewards;
    totalUserWeeklyRewardsUSD += p.totalUserWeeklyRewardsUSD;
    totalUserYearlyRewards += p.totalUserYearlyRewards;
    totalUserYearlyRewardsUSD += p.totalUserYearlyRewardsUSD;
    gaugeAddresses += p.gaugeAddresses;
    earnings += p.earnings;
    earningsUSD += p.earningsUSD;
  }
  _print_bold(`Total staked: $${formatMoney(staked_tvl)}\n`);
  if (totalUserStaked > 0) {
    _print(`You are staking a total of $${formatMoney(totalUserStaked)}\n`);
    _print(`Estimated xRAM earnings:`
            + ` Day ${totalUserDailyRewards.toFixed(2)} ($${formatMoney(totalUserDailyRewardsUSD)})`
            + ` Week ${totalUserWeeklyRewards.toFixed(2)} ($${formatMoney(totalUserWeeklyRewardsUSD)})`
            + ` Year ${totalUserYearlyRewards.toFixed(2)} ($${formatMoney(totalUserYearlyRewardsUSD)})`);
    _print("");
  }

  const claimAll = async function() {
    const rewardTokenAddresses = gaugeAddresses.map((g) => [RAM_TOKEN_ADDR]);
    return ramContract_claimAll(gaugeAddresses, rewardTokenAddresses, RAM_VOTER_ADDR, App)
  }
  // const reload = async function(){
  //   _print("Reading smart contracts...\n");
  //   _print("This may take few minutes...\n");
  //   const App = await init_ethers();
  //   return reloadFun(App, p.tokens, p.prices, p.pools, p.clicked);
  // }
  _print_link(`Claim All ${earnings.toFixed(6)} RAM ($${formatMoney(earningsUSD)})\n`, claimAll)
  _print("");
  // _print_link(`\nClick here to see just your staked pools`, reload);
  // _print("");

  hideLoading();
}

const ramContract_claimAll = async function(gaugeAddresses, rewardTokenAddresses, voterAddress, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(voterAddress, RAM_VOTER_ABI, signer)

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
    let p = await loadRamSynthetixPools(App, tokens, prices, pools, clicked)
    if (p.totalUserStaked > 0) {
      _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalApr * 100).toFixed(2)}%\n`);
      _print(`Estimated RAM earnings:`
              + ` Day ${p.totalUserDailyRewards.toFixed(2)} ($${formatMoney(p.totalUserDailyRewardsUSD)})`
              + ` Week ${p.totalUserWeeklyRewards.toFixed(2)} ($${formatMoney(p.totalUserWeeklyRewardsUSD)})`
              + ` Year ${p.totalUserYearlyRewards.toFixed(2)} ($${formatMoney(p.totalUserYearlyRewardsUSD)})`);
      _print("");
    }
  }else{
    clicked = false;
    let p = await loadRamSynthetixPools(App, tokens, prices, pools, clicked)
    if (p.totalUserStaked > 0) {
      _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalApr * 100).toFixed(2)}%\n`);
      _print(`Estimated RAM earnings:`
              + ` Day ${p.totalUserDailyRewards.toFixed(2)} ($${formatMoney(p.totalUserDailyRewardsUSD)})`
              + ` Week ${p.totalUserWeeklyRewards.toFixed(2)} ($${formatMoney(p.totalUserWeeklyRewardsUSD)})`
              + ` Year ${p.totalUserYearlyRewards.toFixed(2)} ($${formatMoney(p.totalUserYearlyRewardsUSD)})`);
      _print("");
    }
  }
}

async function loadRamSynthetixPools(App, tokens, prices, pools, clicked) {
  let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
  let totalUserDailyRewards = 0, totalUserWeeklyRewards = 0, totalUserYearlyRewards = 0, totalUserDailyRewardsUSD = 0, totalUserWeeklyRewardsUSD = 0, totalUserYearlyRewardsUSD = 0
  let gaugeAddresses = [], earnings = 0, earningsUSD = 0;
  const infos = await Promise.all(pools.map(p =>
      loadRamSynthetixPoolInfo(App, tokens, prices, p.abi, p.address, p.stakeTokenFunction)));
  for (const i of infos) {
    let p = await printRamSynthetixPool(App, i, "arbitrum", clicked);
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

async function loadRamSynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
  stakeTokenFunction) {
    const STAKING_POOL_CONTRACT = new ethcall.Contract(stakingAddress, stakingAbi);
    const rewardTokenAddress = "0xAAA1eE8DC1864AE49185C368e8c64Dd780a50Fb7"; //xoRAM

    const calls = [STAKING_POOL_CONTRACT.stake(), STAKING_POOL_CONTRACT.periodFinish(rewardTokenAddress),
                   STAKING_POOL_CONTRACT.rewardRate(rewardTokenAddress), STAKING_POOL_CONTRACT.earned(rewardTokenAddress, App.YOUR_ADDRESS),
                   STAKING_POOL_CONTRACT.balanceOf(App.YOUR_ADDRESS), STAKING_POOL_CONTRACT.derivedSupply(), STAKING_POOL_CONTRACT.derivedBalance(App.YOUR_ADDRESS)]

    const [stakeTokenAddress, periodFinish, rewardRate, earned_, balance, derivedSupply_, derivedBalance_] = await App.ethcallProvider.all(calls);

    let rewardTokenAddresses = [], rewardTokens = [], rewardTokenTickers = [], rewardTokenPrices = [], weeklyRewards = [], earnings = [], usdCoinsPerWeek = [];
    rewardTokenAddresses.push(rewardTokenAddress);
    if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
      tokens[rewardTokenAddress] = await getGeneralEthcallToken(App, rewardTokenAddress, stakingAddress);
    }
    const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
    const rewardTokenTicker = rewardToken.symbol;
    const rewardTokenPrice = getParameterCaseInsensitive(prices, "0xaaa6c1e32c55a7bfa8066a6fae9b42650f262418")?.usd;  //RAM price
    const weeklyReward = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate / 10 ** rewardToken.decimals * 604800;
    const usdPerWeek = weeklyReward * rewardTokenPrice;
    const earned = earned_ / 10 ** rewardToken.decimals;
    rewardTokens.push(rewardToken);
    rewardTokenTickers.push(rewardTokenTicker);
    rewardTokenPrices.push(rewardTokenPrice);
    weeklyRewards.push(weeklyReward);
    earnings.push(earned);
    usdCoinsPerWeek.push(usdPerWeek);

    var stakeToken = await getGeneralEthcallToken(App, stakeTokenAddress, stakingAddress);
    const derivedSupply = derivedSupply_ / 10 ** stakeToken.decimals
    const derivedBalance = derivedBalance_ / 10 ** stakeToken.decimals

    var newTokenAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getGeneralEthcallToken(App, address, stakingAddress);
    }

    const poolPrices = getPoolPrices(tokens, prices, stakeToken, "arbitrum");

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
      earnings,
      derivedSupply,
      derivedBalance
    }
}

async function printRamSynthetixPool(App, info, chain="eth", clicked, customURLs) {
  if(clicked == true && info.userStaked == 0 || /*info.weeklyRewards[0] < 1000 ||*/ info.staked_tvl < 150){
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
  const usersDailyAPR = totalDailyAPR * (info.derivedBalance / info.derivedSupply) / userStakedPct * 100
  const usersWeeklyAPR = totalWeeklyAPR * (info.derivedBalance / info.derivedSupply) / userStakedPct * 100
  const usersYearlyAPR = totalYearlyAPR * (info.derivedBalance / info.derivedSupply) / userStakedPct * 100
  if(info.derivedBalance <= 0){
    _print(`Your APR: Day 0% Week 0% Year 0%`);
  }else{
    _print(`Your APR: Day ${usersDailyAPR.toFixed(4)}% Week ${usersWeeklyAPR.toFixed(2)}% Year ${usersYearlyAPR.toFixed(2)}%`);
  }
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
    return ramContract_claim(info.rewardTokenAddresses[0], info.stakingAddress, App)
  }
  const exit = async function() {
    return rewardsContract_exit(info.stakingAddress, App)
  }
  const revoke = async function() {
    return rewardsContract_resetApprove(info.stakeTokenAddress, info.stakingAddress, App)
  }
  _print(`<a target="_blank" href="https://arbiscan.io/address/${info.stakingAddress}#code">Arbitrum Scan</a>`);
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
      apr : usersYearlyAPR,
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

const ramContract_claim = async function(rewardTokenAddress, rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(rewardPoolAddr, RAM_GAUGE_ABI, signer)

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

async function loadRamSynthetixPoolInfoPrice(App, tokens, prices, stakingAddress, stakeTokenAddress) {
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
    console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
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

    // '0xD82d218FB007e5a5F57C597235cE0B95E3B04C3b',  //no abi
    // '0x287EB5933324a7b945774679C721d82794A6b43a',  //no abi
    // '0x0Be2d40BC7Ba2b8ef6ea7d180cCf7E505951A9B2',  //no abi
    // '0x84329b190eb955Ea71B17Fc2922Cd65a724f8976',  //no abi
    // '0x9A19f7FC82B4A93e6A0a2047f2C22A244deC3509',  //no abi
    // '0xEF2a448Bf3753c8684d2E5e7b103e982284e753C',  //no abi
    // '0x4210E6C000223910eA5D92B425f412251749480e',  //no abi
    // '0x87FcFB400190cE60043F3c87693b8e0B56f9414D',  //no abi
    // '0x724E2F8E2f7aE621D2aBD908F28228465566b801',  //no abi
    // '0x83EDDd21C9504F65514587756dB58778b4Eb8144',  //no abi
    // '0x9f20F50Ba2A5f01822667de62FED214d851C75dB',  //no abi
    // '0xC266c4f6Be244deaC001Df168f283C8b39a3437f',  //no abi
    // '0x0422c10b8483Cc374C9aA3A85baC93F493E556f9',  //no abi
    // '0x36E58805cCf74d744155b4cFE61E4Cd59edf7aB1',  //no abi
    // '0xb682F67e37EbF9aA5a6eE2945a13F0Ee71865916',  //no abi
    // '0x1be8b88cE8d5399A2F79cEa10bDCecac55d0BDA6',  //no abi
    // '0x7ED31B77613107ae67E29d3509c12EF67c554Ef3',  //no abi
    // '0x2391817a00D84Ad79A81eeE18C3cF2a9a9311E34',  //no abi
    // '0xD1B51Ba99bE9293c4f2ed2AbcFE9A42fe51246cD',  //no abi
    // '0xA8814c70a30113DeDC03CF9F2868bA9D1f91221B',  //no abi
    // '0xf80B56ede950B146456A87257b015a5652d8E488',  //no abi
    // '0x22212826C18771c6C0EDf2B236Eb50f2CC0Fe42a',  //no abi
    // '0x6772746c19db003D91EFb3BF048A0b84dA20205a',  //no abi
    // '0xc88b8C156d19F5D664511FCcF0d37298acCeC931',  //no abi
    // '0x07060a0B3910D56e06095669e3325821E67ef652',  //no abi
    // '0xFCf8C7c754Ad58BE086E60eA12Dc185b3fe9F8e7',  //no abi
    // '0x8230077E63db5F8Ddb6C8C7f06eE1926387b2423',  //no abi
    // '0x1A2460F9beEeb6191EA0A420ffC434D6DDbE8d3a',  //no abi
    // '0x59053e31DCe44e030f9E1c733e4d3085d74E033B',  //no abi
    // '0x176F3b1AF3dAF4b53dc13738B371b4c5eDF4c7B9',  //no abi
    // '0x4c57F8166344a9C4eb3F612AF999F42473109761',  //no abi
    // '0x4557878f8f042A056fFA2C6C79cA22b549391433',  //no abi
    // '0x8a844F2E0903F27430Df18F518aefa2B2739c875',  //no abi
    // '0x7aE4A8D4821A96b6c775D4864d4cA994d95E2Ef2',  //no abi
    // '0x72D95B675761F989539D7A14899b33be90BaA97e',  //no abi
    // '0xb687CE1b0BE20eA299DE98c5F6743391F5F2c486',  //no abi
    // '0x2a0942bAcf3f5804547dd514109B63975ea83617',  //no abi
    // '0x9bcfc2CA1ba8Fe2A27CF7DBcf434668Fdef26b22',  //no abi
    // '0xE06a724B1CDb0585bc85Bf80DC628F3b69571664',  //no abi
    // '0x62C375d560Eb6061003078a1D57B4C7d534c7FDD',  //no abi
    // '0xFeF6341daDe4A34E572a5561CCf9CBa876dAC589',  //no abi
    // '0xAa612faaeDe1E66aD83A400b2ec44e9c22B29BAE',  //no abi
    // '0x3e32458cbdC0a589D64A327319953492646E1F2d',  //no abi
    // '0xc2cd8A25D0689f609D09d1dCd615db99f6466b5c',  //no abi
    // '0xFB7aa0Cf1a61cA780C10fD1BD7f63A558E10E99D',  //no abi
    // '0x59b34D3B1400897197d976bb846dFc2F71D98026',  //no abi
    // '0xB7C4b331180a31129A7B029F5b20a4181f2252a1',  //no abi
    // '0x74f041eD1951BFa5A5bf122adA480F6e9EA8C4ed',  //no abi
    // '0x28cf4Fac370D80a3f90B4eFeCCEf2BcD7A4d6c62',  //no abi
    // '0xfAf70ae1408dD1fEB4af2b7005Aa1239220A48f4',  //no abi
    // '0xD1015728EE53858A2af533E9b011b937CF74fF11',  //no abi
    // '0xe783F7d3Fb8517Da73F2Fc5446eaf5eb07124c2b',  //no abi
    // '0xAF115D9c5E0Dc6B2dBF1cA968053F6a1908fE7C6',  //no abi
    // '0x43212940f117cf20d1FF985ab68d238AA47Aa43C',  //no abi
    // '0x3FD7a834A1878275f1e4144A26f1EC9aec34C175',  //no abi
    // '0x5CbEDa5Dc6C35443Bc4010Ce0eA301D87F448E50',  //no abi
    // '0xF6f4894D5545801df10300226AcC9b28BbcC9CF3',  //no abi
    // '0x9A6d5ba38233ea40c183Ac2e6f79f505Ef73157D',  //no abi
    // '0xa72f05eC686480C827f5B4c29AaCAd768a894502',  //no abi
    // '0x8f0Ba7Fcf540410DE5Ce34d3f8Dc155130d85328',  //no abi
    // '0x4C9E1644C10C293496da00667491be5d5E7FC717',  //no abi
    // '0x3324f4b24B84F6bED43657A03da8898B6352EaA2',  //no abi
    // '0xeDD5495C5B7e61C6Af25944D69815a2B153A0a7c',  //no abi
    // '0x23EDDA9084f52412D0A7aeFdA5582D46A950A481',  //no abi
    // '0xBa66336934804Cd7c388774AeF26b3F0fF4DCF26',  //no abi
    // '0xC3f26d2Fa16129a8d4A5A0f94D25F2cdd9005CDb',  //no abi
    // '0xFAe2195Ea002bC9bbf5b03D2B7591e9DCEf9944a',  //no abi
    // '0xc6C38F93d102b61d267122d895Ed7745d6801C05',  //no abi
    // '0x153f78A6a163acA4a92a9F1E6F2C00C95160934a',  //no abi
    // '0xE729EBc404F1b0AC26868036E769424cc0970D69',  //no abi
    // '0xadE6f10F834fefd4675813B5d83f8f6087E605ce',  //no abi
    // '0x154D6F7F764406ccB0d5Ff79e3711E18B707d4AC',  //no abi
    // '0xC1e6C2794F1033F56631C50d2441901Bec214221',  //no abi
    // '0x020450c224Daac9C4Df29e09Fa9b955724f52C69',  //no abi
    // '0x89D7B46a460D0615bf3Bc7144122828d0F6fD819',  //no abi
    // '0xCe9F6E22cc1E6a7163899adF77a6D96aA43c5104',  //no abi
    // '0x06bA3dD13aB5cF6d8c1e8641A2Fc4281762210dA',  //no abi
    // '0x6EAaeD2D20E45703D43A10E35F902eCdf52027c1',  //CL pool
    // '0x2393587371B466d07Cbd1326099027d92Ed2E5F7',  //CL pool
    // '0x2fD7b6C50c35Ee90138175a82406665C49d3f346',  //CL pool
    // '0x66C7432330C510A9dBC71Af1D09485e3F62Da4E0',  //CL pool
    // '0x8De59A8f8aaD3EBb1aDf6C9F49aa7338f0D812D2',  //CL pool
    // '0x87a462c886781eD27D66A95aD392329F7A7B1056',  //CL pool
    // '0x44C8877b663E16c83dfa763Ec1F0231bb3e569c4',  //CL pool
    // '0xD0B322A9F890372dB0a7392ad2Cff33B45362adB',  //CL pool
    // '0x9C11D6b080e1E1A6c8EAA067917f4358f3Cbd253',  //CL pool
    // '0xE42c9F256E699a24A6945e44FF1d87c60a7259F4',  //CL pool
    // '0x3442510698c286449341646D2892e3dC205979e2',  //CL pool
    // '0x0294E1FEF443E2DbC6424A270bdE464460a78bB7',  //CL pool
    // '0xB138a2abCB1bfaD8EE5b47b4196Bb4E92dA0972A',  //CL pool
    // '0x21657599971DDeb2b57424127521e5111a06B823',  //CL pool
    // '0xcCE16B158B9cbE1D0FC8BDe3C8A1E388e5d50405',  //CL pool
    // '0x165dD54EB31F15e5Adc180157f869E501918656C',  //CL pool
    // '0xF94B5Bb9C0374040CC833EB3fbC3a010bE921Ea6',  //CL pool
    // '0x8BDf4c2A78f49C0CDb8A488085F1541bD8CA43C1',  //CL pool
    // '0x371f1b9F2C42151a8448f4b40aB40fbCa353fc57',  //CL pool
    // '0xB502E29164d8Ea78407f2Ff213361E8Bac827857',  //CL pool
    // '0x4F59a1f9949bdBfc0D20Ce8D27b56b8e094c3E33',  //CL pool
    // '0xB11aBCcCF6b97e64e695Ca27fa7383C59fBA9C6c',  //CL pool
    // '0xcBCcC7D0D79e0074B10154eb6E8367A10653b7A3',  //CL pool
    // '0xfaD965bD9e64A211cC38AE9E8F5317cd91155e91',  //CL pool
    // '0x132bA28D12030c74db0FbcD8df1F0BEab07fB81a',  //CL pool
    // '0x9722A09f22148E40514217Ff32F15A0c5Ae3bb5B',  //CL pool
    // '0x6E82aAdBb657EaF8e30083737F2D3E5c10B48132',  //CL pool
    // '0xAd841b66d21d870053d6e013782f40517f638F91',  //CL pool
    // '0xAf1D91438bD5a402b03aB911aD6048e169aD898b',  //CL pool
    // '0xFeA795dD48979599807fC5d079509AeD39714ee6',  //CL pool
    // '0x44cf5bFAE947A534ADb084EC0882BCdbEbA6D4Ea',  //CL pool
    // '0x9cbD3a682dcC3C2174b4C15721d5B1E11a38Bb82',  //CL pool
    // '0x2a1ED3DEc580432A532241FcC6528511775B17bE',  //CL pool
    // '0xcae01235Ed88F25F93cc11B2Ea650333b1bD1926',  //CL pool
    // '0x3c4aD19637980eaCdab6CE8264FeAD89adaa4d5C',  //CL pool
    // '0xA115Fa7c99Eb99210dD7a90F25Cc42C8838643f8',  //CL pool
    // '0x95FA63F5ec1b1E340e1222bAFA67639434A455Ff',  //CL pool
    // '0xa0709C1A3BE757760b9819FecA7078f466000738',  //CL pool
    // '0x24052588934dC7fF9b9595A74b77752003f5d7AA',  //CL pool
    // '0x66c62fBAe918d994A951D46958e51f0177B2d4EC',  //CL pool
    // '0xa680050C49876bd76a89Bc48C78Ac8ab7f078193',  //CL pool
    // '0x8d61E7Bc51564FFfC49A335FBd22bbF6D297b000',  //CL pool
    // '0x15D47eE4CEa13871965A49C53D53991D8f8eF17f',  //CL pool
    // '0x48EabE60Ae7cCEeD66272177eB416356B956890E',  //CL pool
    // '0xda568535742B188f5593Af4d89F8c3EaD48D3400',  //CL pool
    // '0x221D434F0FD9dDAFab0af9E83D5dA2338E56AEa5',  //CL pool
    // '0x5E03eCb23b2Bb4cB48708A7FEA3430E19DD6FF0b',  //CL pool
    // '0x5Df8ABd518f708496C93F2Fa273147625679F7a5',  //CL pool
    // '0xB84dC9e135F4a978A56162bDd892F30DfA22A325',  //CL pool
    // '0xF473D9B832b36f5B1447f08b5d9BF368e5280FB6',  //CL pool
    // '0x8cfBc79E06A80f5931B3F9FCC4BbDfac91D45A50',  //CL pool
    // '0x1CFb9F63a1e2c8C33c06B76AF7e09446f49b0098',  //CL pool
    // '0x1f5249b64e427BF462C0E7fBACfaB2313286Ef14',  //CL pool
    // '0xCD42961fFb4a5a689C534E862C66B92eFA29f3e5',  //CL pool
    // '0x013Cd8E8979C143150D15e306aCDE124618F9a0e',  //CL pool
    // '0x0244a806B565ce5e0170b8a503A3A52B1E2E7daE',  //CL pool
    // '0x5dAe6171a1C7a36b28ccacfece59Cc2F3230558D',  //CL pool
    // '0x9181d6891CF16b6283Fd5ef318a8503f9D868441',  //CL pool
    // '0x74D8bf37D71A50CEC6AD7f555617da3486D74914',  //CL pool
    // '0xE045079F506201b7E12100B3034D0597A6Fc7825',  //CL pool
    // '0xb145230f55BF79891DD91FaFfbCb37cD16B76B2A',  //CL pool
    // '0x90CA810A014Dd9b6Dce4696Ce40FEBAFA114fc2f',  //CL pool
    // '0x1b9628920f0d0f49594BCD5DCBB0F35374E6f095',  //CL pool
    // '0xaff7B86A33754fFF3c9502bBd3f27C598E2b87cc',  //CL pool
    // '0xfBba194585d40a77fF4b471Bbe191378AC9346f2',  //CL pool
    // '0x39f8F89e114CDA9261434ee0104DAd9F54255885',  //CL pool
    // '0x31797545835f2296617637035800936fb825A3a2',  //CL pool
    // '0x83E7465AF687272dC4Ac0b44D3A7B6de997305Fd',  //CL pool
    // '0xC6Ad21FCEF109fD99F866a47bc22805EAE23b221',  //CL pool
    // '0x5C93E1d135690c71E634f5ceeee98a046D377130',  //CL pool
    // '0x2aB104A4d08f998CcC0BA5733F211Db81Cfb1Bf8',  //CL pool
    // '0xA754635638A0e6646882b27dd0125034249d6058',  //CL pool
    // '0x0dcF735f39b672B8B1FdF664b6f2540A13581112',  //CL pool
    // '0xFb4F8300E7CF0f8655994516428CC9b27e420162',  //CL pool
    // '0x49c5CDEAd4084DD6e0B40eEd24e1E4D02463F75a',  //CL pool
    // '0xeAc9Caba46bbC4bbEeAf61961979e229A1946Bd6',  //CL pool
    // '0x01180FCCCeb510410BC850c5028E0951bd28870C',  //CL pool
    // '0x752c65E892F673d38e8A1b26637129b7FDA36865',  //CL pool
    // '0x21151ef70D6D6910339104C540eABE7189bd37c2',  //CL pool
    // '0x5a24558927289dA054A29f0b0E319dFbEA530B00',  //CL pool
    // '0x6A3C452E31AABD23C2263336d3815927d7564b60',  //CL pool
    // '0x7FeFB89D2a00f93726b336121F85601590e74811',  //CL pool
    // '0xeFc09d3122566B7e9C49Bd7F4Ddf215Ce8B90A9f',  //CL pool
    // '0xD8d3603854b91A2a634FEaB9C199b6ce713D0586',  //CL pool
    // '0x460CD3a3cBA903668f101Cf966349AF1ad650e0B',  //CL pool
    // '0x43197Cf89c3b5a2F1E0DE11E395b110D892DAe11',  //CL pool
    // '0xF507D3bcE60c0CAf2fb5CA57892d3A8119027f74',  //CL pool
    // '0x8fCa4Fe15a80CdAa2DE5E9e7B970eD64F3194844',  //CL pool
    // '0x2317598fF6591eFA50d792Ce7ED11138fB6c27b5',  //CL pool
    // '0x85C958f6CB12ff23539363608C7A85ecA1d8f5f0',  //CL pool
    // '0x592Dff1b96EC1Ea56c8C41033550f334F36AE468',  //CL pool
    // '0x22621bEd17af6c11473e8DddfC1c73d817Bf44f5',  //CL pool
    // '0x99e48D00Bf297F6799d0e2707887968f98705eBC',  //CL pool
    // '0xd1363Ab5159568b64324B88c5E7f258039e3FCfc',  //CL pool
    // '0x8ea901e68Ed98b8B4eC52C642b5d350b54491990',  //CL pool
    // '0xA079C48572c80d566DA60Ef923973Ca17435D046',  //CL pool
    // '0xd2745760f93f541b9955516Aa6B3070462200CA0',  //CL pool
    // '0x4fd2b6e8092942Af093051e3B0C262b5580762f7',  //CL pool
    // '0x84E76111c35B46bbC92dC3bc85f510CEcF140FdB',  //CL pool
    // '0x80246Daddb3635341B1AfBd29e436BC46De28f46',  //CL pool
    // '0xeffebB3B19C3157b18c5F4AFf3C61CBc507bdD3A',  //CL pool
    // '0x383177d18Cf1769b915DB484DE6e1883Cfc0dEA9',  //CL pool