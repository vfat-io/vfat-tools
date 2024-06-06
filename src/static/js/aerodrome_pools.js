$(function() {
  consoleInit(main)
  });
  
  const FLOW_VOTER_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"__ve","internalType":"address"},{"type":"address","name":"_factory","internalType":"address"},{"type":"address","name":"_gauges","internalType":"address"},{"type":"address","name":"_bribes","internalType":"address"},{"type":"address","name":"_wrappedxbribefactory","internalType":"address"}]},{"type":"event","name":"Abstained","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256","indexed":false},{"type":"uint256","name":"weight","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Attach","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"gauge","internalType":"address","indexed":true},{"type":"uint256","name":"tokenId","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Deposit","inputs":[{"type":"address","name":"lp","internalType":"address","indexed":true},{"type":"address","name":"gauge","internalType":"address","indexed":true},{"type":"uint256","name":"tokenId","internalType":"uint256","indexed":false},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Detach","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"gauge","internalType":"address","indexed":true},{"type":"uint256","name":"tokenId","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"DistributeReward","inputs":[{"type":"address","name":"sender","internalType":"address","indexed":true},{"type":"address","name":"gauge","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"GaugeCreated","inputs":[{"type":"address","name":"gauge","internalType":"address","indexed":true},{"type":"address","name":"creator","internalType":"address","indexed":false},{"type":"address","name":"internal_bribe","internalType":"address","indexed":false},{"type":"address","name":"external_bribe","internalType":"address","indexed":true},{"type":"address","name":"wxbribe","internalType":"address","indexed":false},{"type":"address","name":"pool","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"GaugeKilled","inputs":[{"type":"address","name":"gauge","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"GaugeRevived","inputs":[{"type":"address","name":"gauge","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"NotifyReward","inputs":[{"type":"address","name":"sender","internalType":"address","indexed":true},{"type":"address","name":"reward","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Voted","inputs":[{"type":"address","name":"voter","internalType":"address","indexed":true},{"type":"uint256","name":"tokenId","internalType":"uint256","indexed":false},{"type":"uint256","name":"weight","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Whitelisted","inputs":[{"type":"address","name":"whitelister","internalType":"address","indexed":true},{"type":"address","name":"token","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Withdraw","inputs":[{"type":"address","name":"lp","internalType":"address","indexed":true},{"type":"address","name":"gauge","internalType":"address","indexed":true},{"type":"uint256","name":"tokenId","internalType":"uint256","indexed":false},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"_ve","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"attachTokenToGauge","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"},{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"bribefactory","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"claimBribes","inputs":[{"type":"address[]","name":"_bribes","internalType":"address[]"},{"type":"address[][]","name":"_tokens","internalType":"address[][]"},{"type":"uint256","name":"_tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"claimFees","inputs":[{"type":"address[]","name":"_fees","internalType":"address[]"},{"type":"address[][]","name":"_tokens","internalType":"address[][]"},{"type":"uint256","name":"_tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"claimRewards","inputs":[{"type":"address[]","name":"_gauges","internalType":"address[]"},{"type":"address[][]","name":"_tokens","internalType":"address[][]"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"claimable","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"createGauge","inputs":[{"type":"address","name":"_pool","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"detachTokenFromGauge","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"},{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"distribute","inputs":[{"type":"address[]","name":"_gauges","internalType":"address[]"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"distribute","inputs":[{"type":"address","name":"_gauge","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"distribute","inputs":[{"type":"uint256","name":"start","internalType":"uint256"},{"type":"uint256","name":"finish","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"distribute","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"distributeFees","inputs":[{"type":"address[]","name":"_gauges","internalType":"address[]"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"distro","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"emergencyCouncil","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"emitDeposit","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"},{"type":"address","name":"account","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"emitWithdraw","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"},{"type":"address","name":"account","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"external_bribes","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"factory","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"gaugefactory","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"gauges","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"governor","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"initialize","inputs":[{"type":"address[]","name":"_tokens","internalType":"address[]"},{"type":"address","name":"_minter","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"internal_bribes","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isAlive","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isGauge","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isWhitelisted","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"killGauge","inputs":[{"type":"address","name":"_gauge","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastVoted","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"length","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"minter","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"notifyRewardAmount","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"poke","inputs":[{"type":"uint256","name":"_tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"poolForGauge","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"poolVote","inputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"pools","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"reset","inputs":[{"type":"uint256","name":"_tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"reviveGauge","inputs":[{"type":"address","name":"_gauge","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setEmergencyCouncil","inputs":[{"type":"address","name":"_council","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setGovernor","inputs":[{"type":"address","name":"_governor","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalWeight","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateAll","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateFor","inputs":[{"type":"address[]","name":"_gauges","internalType":"address[]"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateForRange","inputs":[{"type":"uint256","name":"start","internalType":"uint256"},{"type":"uint256","name":"end","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateGauge","inputs":[{"type":"address","name":"_gauge","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"usedWeights","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"vote","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"},{"type":"address[]","name":"_poolVote","internalType":"address[]"},{"type":"uint256[]","name":"_weights","internalType":"uint256[]"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"votes","inputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"weights","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"whitelist","inputs":[{"type":"address","name":"_token","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"wrappedxbribefactory","inputs":[]}]
  
  const FLOW_GAUGE_ABI = [{"inputs":[{"internalType":"address","name":"_forwarder","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"address","name":"_feesVotingReward","type":"address"},{"internalType":"address","name":"_rewardToken","type":"address"},{"internalType":"address","name":"_voter","type":"address"},{"internalType":"bool","name":"_isPool","type":"bool"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"NotAlive","type":"error"},{"inputs":[],"name":"NotAuthorized","type":"error"},{"inputs":[],"name":"NotTeam","type":"error"},{"inputs":[],"name":"NotVoter","type":"error"},{"inputs":[],"name":"RewardRateTooHigh","type":"error"},{"inputs":[],"name":"ZeroAmount","type":"error"},{"inputs":[],"name":"ZeroRewardRate","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"claimed0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"claimed1","type":"uint256"}],"name":"ClaimFees","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ClaimRewards","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"NotifyReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_recipient","type":"address"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fees0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fees1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feesVotingReward","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isPool","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"forwarder","type":"address"}],"name":"isTrustedForwarder","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"left","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"notifyRewardWithoutClaim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardRateByEpoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakingToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ve","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"voter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
   
  const CL_GAUGE_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"claimed0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"claimed1","type":"uint256"}],"name":"ClaimFees","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ClaimRewards","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"uint128","name":"liquidityToStake","type":"uint128"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"NotifyReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"uint128","name":"liquidityToStake","type":"uint128"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"WETH9","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"decreaseStakedLiquidity","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fees0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fees1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feesVotingReward","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"gaugeFactory","outputs":[{"internalType":"contract ICLGaugeFactory","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount0Desired","type":"uint256"},{"internalType":"uint256","name":"amount1Desired","type":"uint256"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"increaseStakedLiquidity","outputs":[{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_pool","type":"address"},{"internalType":"address","name":"_feesVotingReward","type":"address"},{"internalType":"address","name":"_rewardToken","type":"address"},{"internalType":"address","name":"_voter","type":"address"},{"internalType":"address","name":"_nft","type":"address"},{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"},{"internalType":"int24","name":"_tickSpacing","type":"int24"},{"internalType":"bool","name":"_isPool","type":"bool"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isPool","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"left","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nft","outputs":[{"internalType":"contract INonfungiblePositionManager","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"notifyRewardWithoutClaim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pool","outputs":[{"internalType":"contract ICLPool","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardGrowthInside","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardRateByEpoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"stakedByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"stakedContains","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"}],"name":"stakedLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"}],"name":"stakedValues","outputs":[{"internalType":"uint256[]","name":"staked","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"supportsPayable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tickSpacing","outputs":[{"internalType":"int24","name":"","type":"int24"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"voter","outputs":[{"internalType":"contract IVoter","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
  
async function main() {
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
    _print("This may take few minutes, please be patient...\n");
  
    const tokens = {};
    const prices = await getBasePrices();
  
    const FLOW_VOTER_ADDR = "0x16613524e02ad97eDfeF371bC883F2F5d6C480A5"
    const FLOW_VOTER_CONTRACT = new ethcall.Contract(FLOW_VOTER_ADDR, FLOW_VOTER_ABI);
  
    let lpTokens = [], arrayOfGauges = [], calls = [];
  
    const [_poolLength] = await App.ethcallProvider.all([FLOW_VOTER_CONTRACT.length()]);
    const poolLength = _poolLength / 1;
    const _calls = [...Array(poolLength).keys()].map(i => FLOW_VOTER_CONTRACT.pools(i));
    while (_calls.length > 0) {
      calls.push(_calls.splice(0, 100));
    }
    for(const call of calls){
      const _lpTokens = await App.ethcallProvider.all(call);
      lpTokens.push(_lpTokens);
    }
    for(const lpTokenArray of lpTokens){
      const calls2 = lpTokenArray.map(a => FLOW_VOTER_CONTRACT.gauges(a));
      const _gauges = await App.ethcallProvider.all(calls2);
      arrayOfGauges.push(_gauges);
    }
  
    const gauges = arrayOfGauges.flat().map(a => {
      return {
        address: a,
        abi: FLOW_GAUGE_ABI,
        stakeTokenFunction: "stakingToken"
      }
    })
  
    
  //  some CL pools
  
  const clGauges = [
    "0x23E3fF7e1ca9294BC4D9FB3454ce76663E7ce9a4",
    "0x8A07161e21A91D7EEc4Aab9A2073f9672edd6fA6",
    "0x557f885c63a287D0b969BCcEbc1C29c1E02b4eeC",
    "0x9ed29B9518DD807b19d1bC8E3045246094Da81A8",
    "0x1DcC0e87b89FB316BE5C3C13585193244aEbaf05",
    "0x19E4EF08CC826B566b98aAd7e959691b28EeA965",
    "0x18157558c6CEBe6b76764DE1F211321EBBB8CD6A",
    "0xE9a2183aC35768Fb187620672C0CeB9e53381ABa",
    "0x41678d68dea4f6b5EFecA5882406903fE668b527",
    "0xF7E12191EAa4EC540AAfaE1c9289E1F00912c63f",
    "0xC92fA3538bC7075143BaE69850E5394c8d530C88",
    "0x81ec6143F0B65b1576A6F5a34740d8Cc39DB3d3b",
    "0x6F00D370D951742Fb4EC6C5a065ABDbbC612444b",
    "0xAe4ad2d6f5fE6ec886f3492EEd2F7da396f94a09",
    "0x53431b835C4dFf80c0Ac585907dc50251047C6c1",
    "0x67bDce361CDCC671b056Eeec1a97c11d3CD1a1fF",
    "0x154123d7090dC7B712C7bfc0DC0C247d574D7E69",
    "0x4a5B0dc1aB3E195C805E3352cF8cF025d4fD9945",
    "0x025EDE7dafE9E6Ebf6Dd1EF72deD084371cd0e48",
    "0x4ef636E9eF2B07A62fa22Ef5Bc50e0f3F3DBc58A",
    "0xfCfEE5f453728BaA5ffDA151f25A0e53B8C5A01C",
    "0x2A1f7bf46bd975b5004b61c6040597E1B6117040",
    "0x527B83782B2eF0C5506e79333ca709D81644952f",
    "0xF5550F8F0331B8CAA165046667f4E6628E9E3Aac",
    "0xF33a96b5932D9E9B9A0eDA447AbD8C9d48d2e0c8",
    "0x45F8b8eC9c92D09BA8495074436fD97073423041",
    "0x956d84430523fd383E790956eEaAB5b448620cdc",
    "0xe09b0630d255aC51406A6f2C3dFf1428DB573F6A",
    "0x319e23D38d8ee58783Ff5331507b808709bd00b0",
    "0x4a3E1294d7869567B387FC3d5e5Ccf14BE2Bbe0a",
    "0xFd73Ab1100a60Ba64686ef9dcdE36d0209773f6a",
    "0xdF628e37E89486FbeF037FBf73EBC90D1367d786",
    "0xC6B4fe83Fb284bDdE1f1d19F0B5beB31011B280A",
    "0xeA22A3AAdA580bD75Fb6caC35034e09046cbFf72",
    "0xd45eF71ef6a8108F9c8e4b1D9DEDCb77B1F5B96f",
    "0xf00d67799Cd4E1A77D14671149b599A96DcD38eC",
    "0xcC2714BF50F3c7174a868bec8f4D4d284A0b07cc",
    "0x56D0547938948BEAe5ADeF21B0dCf92Bd16B97Ff",
    "0x42d80fdf14f13CA7019FD5A77fd53F1C1f4099a6",
    "0xA9edd05F8d82f4050d4649FEf30bEC9378f499e7",
    "0x4A7212433200428571B069AeC82620573eE2cbc0",
    "0xdE8FF0D3e8ab225110B088a250b546015C567E27",
    "0x3E848AF39c45Cf45c97A622440411C4141dF3e82",
    "0x44e6F4D58A81531338d11aE6374F199A35c787Be",
    "0xdB2A2bdEC6fd19a01a4A8ea9a767e0d8631BE9f7",
    "0xf9f8138150F67a469Fa5437e75ad16EAAab8C09e",
    "0x9d8C4C6558f53Fa24C18936C0015f81a5A1344ae",
    "0x63806fa58774B013458aA4C9a7FDD8a72db5Fe70",
    "0x0b537aC41400433F09d97Cd370C1ea9CE78D8a74",
    "0x601377635D6C852e27CC49633694449B6E9475c8",
    "0x37E1a626b09faDE99E94752942a88f17EA2170fd",
    "0xBF58afee32FFa0Bd24E4c6e43b443aa9679b7c64",
    "0x79eFe300783f448283E54ce7caD08118A52849f6",
    "0xFC9C7A01517F958736c468229D59cFe34F80C83f",
    "0x1e210791d844A37435d0B1aCCeFD1c94013218A7",
    "0xCB4B8aeD321e22B0B87D9e41538408404433Ac70",
    "0x960e492525177420a741dF5f1F9242e419FA4942",
    "0x7E62007c19C9b9D581354B29c57c61C41b50851a",
    "0x1Dd8e44b202fe7D3E85ce7788311374E2E9df950",
    "0xBb9FA2e124dD7fA35621aDe57d42C2d40cB9Ab7A",
    "0x996802075582Af2eE133fb30Cc5A9E8A671d3c3a",
    "0x1B8317D79279a9B31eD171177cAa459c5B012265",
    "0x690cF426613AA9372E6eb5beb62444B87DEBB07B",
    "0x8EdB5Bf70b503621d674D7216248768Fb92b1875",
    "0x958ee1605Aed682Dae998aE47AF7122C641a292C",
    "0xbe806f6D980FE4Ba0Af5D040A045429744C23cb8",
    "0x6c44652cbF0fc9c31149682Eba60aA0D601B6787",
    "0x3D58755a849374341B6D9E9E60C31C84509feB9F",
    "0xE2F3C8c699A1bf30A12118B287B5208e7C6ddFEF",
    "0xa958366701909A39B8229Dfa9eb20FC07dA2d37A",
    "0x6c58AEF50BD08C86b4C191D6D62ebD81D3F1DEF2",
    "0xe994e8611296a64d21Bf6dd8c0D826C6D650593A",
    "0x8c5D5de27801DF39a21c396A07C4Ea02f01325B6",
    "0xCc0AbE95Dc41bD7c05f4b1a2F7585A06D3eB8CD8",
    "0x8680Be5C52416A591445973867E88Cf126f4562B",
    "0x3dF8c1bB17725C699c62c281AE681cd50b0E62FE",
    "0x4368CC0De825e50980d3F3c4Eab4a886ebEEC98A",
    "0x472b62c9A91E39C2F473BC49bF15Bd0195040E43",
    "0x430C09546ae9249AB75B9A4ef7B5FD9a4006D6f3",
    "0x72E51ee5e566d4546a3fB695cb0502A7dc6403cD",
    "0xfbC7060ecd5E78E9e2B970308Bda2c54EdeA5eF3",
    "0x096F5945EcACB37A428a1a28FBBf0196C94A419b",
    "0x1bED19abF408e7f05C0DF7c215A429321A2a171F",
    "0x76de16EDd3e7C15ac6cE2CaD5d9bF082A6f36e94",
    "0xE62Adb491707513EA98B957d9Adb73D8D23e191C",
    "0x3C13F2233354FF2b86f49b6f6CfEf7b6ee99AaaD",
    "0xefB0a009B89AFf818A9ac28f005254B3AFe0eb88",
  ].map(a => {
    return {
      address: a,
      abi: CL_GAUGE_ABI,
      stakeTokenFunction: "pool"
    }
  })

  await loadFlowSynthetixPools(App, tokens, prices, gauges)
  
  await loadClSynthetixPools(App, tokens, prices, clGauges)

  hideLoading();
}
  
  async function loadClSynthetixPools(App, tokens, prices, pools) {
    let totalUserStaked = 0;
    await Promise.all(pools.map(p =>
      loadClSynthetixPoolInfo(App, tokens, prices, p.abi, p.address, p.stakeTokenFunction)));
  }
  
  async function loadClSynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
    stakeTokenFunction) {
      const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.rpcProvider ?? App.provider);
  
      let stakeTokenAddress = "";
      try{
        stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();
      }catch(e){
        console.log(e)
      }
  
      const periodFinish = await STAKING_POOL.periodFinish();
      const rewardRate = await STAKING_POOL.rewardRate();
      const weeklyRewards = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate / 1e18 * 604800;

      if(weeklyRewards > 0){
        console.log(`CL REWARDS`)
        console.log(`"${stakingAddress}",`)
      }
  }
  
  async function loadFlowSynthetixPools(App, tokens, prices, pools, has_sickle_account, customURLs) {
    await Promise.all(pools.map(p =>
      loadFlowSynthetixPoolInfo(App, tokens, prices, p.abi, p.address, p.stakeTokenFunction, has_sickle_account)));
  }
  
  async function loadFlowSynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
    stakeTokenFunction, has_sickle_account) {
      const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.rpcProvider ?? App.provider);
  
      let stakeTokenAddress = "";
      try{
        stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();
      }catch{
        console.log("CL GAUGE")
        console.log(`"${stakingAddress}",`)
      }
  
      const periodFinish = await STAKING_POOL.periodFinish();
      const rewardRate = await STAKING_POOL.rewardRate();
      const weeklyRewards = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate / 1e18 * 604800;

      if(weeklyRewards > 0){
        console.log(`V2 GAUGE WITH REWARDS`)
        console.log(`"${stakingAddress}",`)
      }
  }