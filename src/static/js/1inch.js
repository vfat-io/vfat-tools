$(function() {
  consoleInit(main)
});

const _1INCH_STAKING_ABI = [{"inputs":[{"internalType":"contract Mooniswap","name":"_mooniswap","type":"address"},{"internalType":"contract IERC20","name":"_gift","type":"address"},{"internalType":"uint256","name":"_duration","type":"uint256"},{"internalType":"address","name":"_rewardDistribution","type":"address"},{"internalType":"uint256","name":"scale","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"decayPeriod","type":"uint256"},{"indexed":false,"internalType":"bool","name":"isDefault","type":"bool"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DecayPeriodVoteUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"i","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"duration","type":"uint256"}],"name":"DurationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"fee","type":"uint256"},{"indexed":false,"internalType":"bool","name":"isDefault","type":"bool"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"FeeVoteUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"i","type":"uint256"},{"indexed":false,"internalType":"contract IERC20","name":"gift","type":"address"}],"name":"NewGift","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"i","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"i","type":"uint256"},{"indexed":false,"internalType":"address","name":"rewardDistribution","type":"address"}],"name":"RewardDistributionChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"i","type":"uint256"},{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"i","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"scale","type":"uint256"}],"name":"ScaleUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"slippageFee","type":"uint256"},{"indexed":false,"internalType":"bool","name":"isDefault","type":"bool"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"SlippageFeeVoteUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[{"internalType":"contract IERC20","name":"gift","type":"address"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"address","name":"rewardDistribution","type":"address"},{"internalType":"uint256","name":"scale","type":"uint256"}],"name":"addGift","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decayPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"vote","type":"uint256"}],"name":"decayPeriodVote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"decayPeriodVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"discardDecayPeriodVote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"discardFeeVote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"discardSlippageFeeVote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"},{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"fee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"vote","type":"uint256"}],"name":"feeVote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"feeVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAllRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"}],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"}],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mooniswap","outputs":[{"internalType":"contract Mooniswap","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mooniswapFactoryGovernance","outputs":[{"internalType":"contract IMooniswapFactoryGovernance","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"},{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"rescueFunds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"}],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"setDuration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"},{"internalType":"address","name":"_rewardDistribution","type":"address"}],"name":"setRewardDistribution","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"},{"internalType":"uint256","name":"scale","type":"uint256"}],"name":"setScale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"slippageFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"vote","type":"uint256"}],"name":"slippageFeeVote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"slippageFeeVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tokenRewards","outputs":[{"internalType":"contract IERC20","name":"gift","type":"address"},{"internalType":"uint256","name":"scale","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"address","name":"rewardDistribution","type":"address"},{"internalType":"uint256","name":"periodFinish","type":"uint256"},{"internalType":"uint256","name":"rewardRate","type":"uint256"},{"internalType":"uint256","name":"lastUpdateTime","type":"uint256"},{"internalType":"uint256","name":"rewardPerTokenStored","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const _1INCH_STAKING_ABI_2 = [{"inputs":[{"internalType":"contract Mooniswap","name":"_mooniswap","type":"address"},{"internalType":"contract IERC20","name":"_gift","type":"address"},{"internalType":"uint256","name":"_duration","type":"uint256"},{"internalType":"address","name":"_rewardDistribution","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"decayPeriod","type":"uint256"},{"indexed":false,"internalType":"bool","name":"isDefault","type":"bool"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DecayPeriodVoteUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"i","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"duration","type":"uint256"}],"name":"DurationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"fee","type":"uint256"},{"indexed":false,"internalType":"bool","name":"isDefault","type":"bool"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"FeeVoteUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"i","type":"uint256"},{"indexed":false,"internalType":"contract IERC20","name":"gift","type":"address"}],"name":"NewGift","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"i","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"i","type":"uint256"},{"indexed":false,"internalType":"address","name":"rewardDistribution","type":"address"}],"name":"RewardDistributionChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"i","type":"uint256"},{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"slippageFee","type":"uint256"},{"indexed":false,"internalType":"bool","name":"isDefault","type":"bool"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"SlippageFeeVoteUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[{"internalType":"contract IERC20","name":"gift","type":"address"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"address","name":"rewardDistribution","type":"address"}],"name":"addGift","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decayPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"vote","type":"uint256"}],"name":"decayPeriodVote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"decayPeriodVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"discardDecayPeriodVote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"discardFeeVote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"discardSlippageFeeVote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"},{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"fee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"vote","type":"uint256"}],"name":"feeVote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"feeVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAllRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"}],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"}],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mooniswap","outputs":[{"internalType":"contract Mooniswap","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mooniswapFactoryGovernance","outputs":[{"internalType":"contract IMooniswapFactoryGovernance","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"},{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"rescueFunds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"}],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"},{"internalType":"uint256","name":"_duration","type":"uint256"}],"name":"setDuration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"},{"internalType":"address","name":"_rewardDistribution","type":"address"}],"name":"setRewardDistribution","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"slippageFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"vote","type":"uint256"}],"name":"slippageFeeVote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"slippageFeeVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tokenRewards","outputs":[{"internalType":"contract IERC20","name":"gift","type":"address"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"address","name":"rewardDistribution","type":"address"},{"internalType":"uint256","name":"periodFinish","type":"uint256"},{"internalType":"uint256","name":"rewardRate","type":"uint256"},{"internalType":"uint256","name":"lastUpdateTime","type":"uint256"},{"internalType":"uint256","name":"rewardPerTokenStored","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const _1INCH_STAKING_ABI_3 = [{"inputs":[{"internalType":"contract Mooniswap","name":"_mooniswap","type":"address"},{"internalType":"contract IERC20","name":"_gift","type":"address"},{"internalType":"uint256","name":"_duration","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"decayPeriod","type":"uint256"},{"indexed":false,"internalType":"bool","name":"isDefault","type":"bool"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DecayPeriodVoteUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"fee","type":"uint256"},{"indexed":false,"internalType":"bool","name":"isDefault","type":"bool"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"FeeVoteUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"slippageFee","type":"uint256"},{"indexed":false,"internalType":"bool","name":"isDefault","type":"bool"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"SlippageFeeVoteUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decayPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"vote","type":"uint256"}],"name":"decayPeriodVote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"decayPeriodVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"discardDecayPeriodVote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"discardFeeVote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"discardSlippageFeeVote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"duration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"fee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"vote","type":"uint256"}],"name":"feeVote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"feeVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"gift","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mooniswap","outputs":[{"internalType":"contract Mooniswap","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mooniswapFactoryGovernance","outputs":[{"internalType":"contract IMooniswapFactoryGovernance","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"rescueFunds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardDistribution","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardDistribution","type":"address"}],"name":"setRewardDistribution","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"slippageFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"vote","type":"uint256"}],"name":"slippageFeeVote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"slippageFeeVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const ONEINCH = [
  "0xd7012cdebf10d5b352c601563aa3a8d1795a3f52",
  "0xa355b4b904ce09bd1847f4cf133769bc0dfbc51b"
]

const ONEINCH_2 =  [
  "0xe65184b402376703adc27a7d7e0e8d35a264a240",
  "0x1055f60bbf27d233c4e34d2e03e35567427415fa",
  "0x73f5e5260423a2742d9f8ac49dea6cb5eaec465e",
  "0x598032ba8e7acb625ea6854b4696e25afa2ec9f0",
  "0x2cb9e71a5cf989008ba93dad8edb988ec1b4182f",
  "0x950a9414700e8ee8041c1cab5a0c6afddf0e9257",
  "0x48371588e964f1e8939127af68622e32268640fa",
  "0x8b1af1298f5c0ca8a6b4e66626a4bdae0f7521e5",
  "0x7ded1b278d244f707214759c45c1540834890e95",
  "0x8ba0ef03c26fa2a11bde30db4e87c87408b9761b"
]

const ONEINCH_3 = [
  "0xeb7dbc5a64d2d083d774595e560b147c5021eacd",
  "0xc84dcdaff87f9b5639db82f434c8ba1c2023f6eb",
  "0x7cb203834ce6792756541d722d94296f4c1ca356",
  "0x18d410f651289bb978fc32f90d2d7e608f4f4560",
  "0x8acdb3bcc5101b1ba8a5070f003a77a2da376fe8",
  "0x2ede375d73d81dbd19ef58a75ba359dd28d25de8",
  "0xc7c42eccAc0D4Bb790a32Bc86519aC362e01d388",
  "0xCa6E3EBF4Ac8c3E84BCCDF5Cd89aece74D69F2a7",
  "0xE22f6A5dd9e491dFAB49faeFdb32d01AaF99703e",
  "0x9070832cf729a5150bb26825c2927e7d343eabd9",
  "0x4dab1ba9609c1546a0a69a76f00ed935b0b9c45e",
  "0x0da1b305d7101359434d71eceaab71e1ff5437e6",
  "0xa83fcea9229c7f1e02acb46abe8d6889259339e8",
  "0x98484d4259a70b73af58180521f2eb71a3f00ae6"
]

const Pools = ONEINCH.map(a => {
  return {
    address: a,
    abi: _1INCH_STAKING_ABI,
    stakeTokenFunction: "mooniswap"
  }; }
)

const Pools2 = ONEINCH_2.map(a => {
  return {
    address: a,
    abi: _1INCH_STAKING_ABI_2,
    stakeTokenFunction: "mooniswap"
  }; }
)

const Pools3 = ONEINCH_3.map(a => {
  return {
    address: a,
    abi: _1INCH_STAKING_ABI_3,
    stakeTokenFunction: "mooniswap",
    rewardTokenFunction : "gift"
  }; }
)

async function main() {

  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}`);
  _print("Reading smart contracts...\n");

  var tokens = {};
  var prices = {};

  let p = await load1InchSynthetixPools(App, tokens, prices, Pools)
  let p2 = await load1InchSynthetixPools(App, tokens, prices, Pools2)
  let p3 = await loadMultipleSynthetixPools(App, tokens, prices, Pools3)
  _print_bold(`Total staked: $${formatMoney(p.staked_tvl + p2.staked_tvl + p3.staked_tvl)}`);

  hideLoading();
}

async function load1InchSynthetixPools(App, tokens, prices, pools) {
  let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
  const infos = await Promise.all(pools.map(p =>
    load1InchSynthetixPoolInfo(App, tokens, prices, p.abi, p.address, p.stakeTokenFunction)));
  for (const i of infos) {
    let p = await printSynthetixPool(App, i);
    totalStaked += p.staked_tvl || 0;
    totalUserStaked += p.userStaked || 0;
    if (p.userStaked > 0) {
      individualAPRs.push(p.userStaked * p.apr / 100);
    }
  }
  let totalAPR = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
  return { staked_tvl : totalStaked, totalUserStaked, totalAPR };
}

async function load1InchSynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress, stakeTokenFunction) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
    const STAKING_MULTI = new ethcall.Contract(stakingAddress, stakingAbi);

    if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
      console.log("Couldn't find stake function ", stakeTokenFunction);
    }
    const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();

    const rewardsInfo = await STAKING_POOL.tokenRewards(0);

    const rewardTokenAddress = rewardsInfo.gift;
    const periodFinish = rewardsInfo.periodFinish;
    const rewardRate = rewardsInfo.rewardRate;

    var stakeToken = await getToken(App, stakeTokenAddress, stakingAddress);

    if (stakeTokenAddress.toLowerCase() === rewardTokenAddress.toLowerCase()) {
      stakeToken.staked = await STAKING_POOL.totalSupply() / 10 ** stakeToken.decimals;
    }

    var newPriceAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(prices, x));
    newPriceAddresses.push("0x111111111117dC0aa78b770fA6A738034120C302");
    var newPrices = await lookUpTokenPrices(newPriceAddresses);
    for (const key in newPrices) {
      if (newPrices[key]?.usd)
          prices[key] = newPrices[key];
    }
    var newTokenAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getToken(App, address, stakingAddress);
    }
    if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
        tokens[rewardTokenAddress] = await getToken(App, rewardTokenAddress, stakingAddress);
    }
    const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);

    const rewardTokenTicker = rewardToken.symbol;

    const poolPrices = getPoolPrices(tokens, prices, stakeToken);

    const stakeTokenTicker = poolPrices.stakeTokenTicker;

    const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
    const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;

    const calls = [STAKING_MULTI.balanceOf(App.YOUR_ADDRESS), STAKING_MULTI.earned(0, App.YOUR_ADDRESS)]
    const [balance, earned_] = await App.ethcallProvider.all(calls);

    const weeklyRewards = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate / 1e18 * 604800;

    const usdPerWeek = weeklyRewards * rewardTokenPrice;

    const staked_tvl = poolPrices.staked_tvl;

    const userStaked = balance / 10 ** stakeToken.decimals;

    const userUnstaked = stakeToken.unstaked;

    const earned = earned_ / 10 ** rewardToken.decimals;

    return  {
      stakingAddress,
      poolPrices,
      stakeTokenAddress,
      rewardTokenAddress,
      stakeTokenTicker,
      rewardTokenTicker,
      stakeTokenPrice,
      rewardTokenPrice,
      weeklyRewards,
      usdPerWeek,
      staked_tvl,
      userStaked,
      userUnstaked,
      earned
    }
}