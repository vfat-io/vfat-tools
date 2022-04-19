$(function () {
  consoleInit(main)
});

const REWARDER_BEETS_CHEF_ABI = [{"inputs":[{"internalType":"contract IERC20","name":"_rewardToken","type":"address"},{"internalType":"uint256","name":"_rewardPerSecond","type":"uint256"},{"internalType":"address","name":"_MASTERCHEF","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[],"name":"LogInit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"LogOnReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"}],"name":"LogPoolAddition","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"rewardPerSecond","type":"uint256"}],"name":"LogRewardPerSecond","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"}],"name":"LogSetPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lastRewardTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lpSupply","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"accRewardTokenPerShare","type":"uint256"}],"name":"LogUpdatePool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"uint256","name":"allocPoint","type":"uint256"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"pids","type":"uint256[]"}],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"masterchefPoolIds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"newLpAmount","type":"uint256"}],"name":"onBeetsReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingToken","outputs":[{"internalType":"uint256","name":"pending","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"pendingTokens","outputs":[{"internalType":"contract IERC20[]","name":"rewardTokens","type":"address[]"},{"internalType":"uint256[]","name":"rewardAmounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"uint256","name":"accRewardTokenPerShare","type":"uint256"},{"internalType":"uint256","name":"lastRewardTime","type":"uint256"},{"internalType":"uint256","name":"allocPoint","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"pools","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"uint256","name":"allocPoint","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardPerSecond","type":"uint256"}],"name":"setRewardPerSecond","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"}],"name":"updatePool","outputs":[{"components":[{"internalType":"uint256","name":"accRewardTokenPerShare","type":"uint256"},{"internalType":"uint256","name":"lastRewardTime","type":"uint256"},{"internalType":"uint256","name":"allocPoint","type":"uint256"}],"internalType":"struct TimeBasedRewarder.PoolInfo","name":"pool","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"}]
const HND_GAUGE_ABI = [{"name":"Deposit","inputs":[{"name":"provider","type":"address","indexed":true},{"name":"value","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"Withdraw","inputs":[{"name":"provider","type":"address","indexed":true},{"name":"value","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateLiquidityLimit","inputs":[{"name":"user","type":"address","indexed":false},{"name":"original_balance","type":"uint256","indexed":false},{"name":"original_supply","type":"uint256","indexed":false},{"name":"working_balance","type":"uint256","indexed":false},{"name":"working_supply","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"CommitOwnership","inputs":[{"name":"admin","type":"address","indexed":false}],"anonymous":false,"type":"event"},{"name":"ApplyOwnership","inputs":[{"name":"admin","type":"address","indexed":false}],"anonymous":false,"type":"event"},{"name":"Transfer","inputs":[{"name":"_from","type":"address","indexed":true},{"name":"_to","type":"address","indexed":true},{"name":"_value","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"Approval","inputs":[{"name":"_owner","type":"address","indexed":true},{"name":"_spender","type":"address","indexed":true},{"name":"_value","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"stateMutability":"nonpayable","type":"constructor","inputs":[{"name":"_lp_token","type":"address"},{"name":"_minter","type":"address"},{"name":"_admin","type":"address"},{"name":"_reward_policy_maker","type":"address"}],"outputs":[]},{"stateMutability":"view","type":"function","name":"decimals","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":288},{"stateMutability":"view","type":"function","name":"integrate_checkpoint","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":4624},{"stateMutability":"nonpayable","type":"function","name":"user_checkpoint","inputs":[{"name":"addr","type":"address"}],"outputs":[{"name":"","type":"bool"}],"gas":9161388},{"stateMutability":"view","type":"function","name":"claimable_tokens","inputs":[{"name":"addr","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":9074455},{"stateMutability":"view","type":"function","name":"reward_contract","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":2718},{"stateMutability":"view","type":"function","name":"last_claim","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":2544},{"stateMutability":"view","type":"function","name":"claimed_reward","inputs":[{"name":"_addr","type":"address"},{"name":"_token","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3066},{"stateMutability":"view","type":"function","name":"claimable_reward","inputs":[{"name":"_addr","type":"address"},{"name":"_token","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3034},{"stateMutability":"nonpayable","type":"function","name":"claimable_reward_write","inputs":[{"name":"_addr","type":"address"},{"name":"_token","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":1211018},{"stateMutability":"nonpayable","type":"function","name":"set_rewards_receiver","inputs":[{"name":"_receiver","type":"address"}],"outputs":[],"gas":35733},{"stateMutability":"nonpayable","type":"function","name":"claim_rewards","inputs":[],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"claim_rewards","inputs":[{"name":"_addr","type":"address"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"claim_rewards","inputs":[{"name":"_addr","type":"address"},{"name":"_receiver","type":"address"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"kick","inputs":[{"name":"addr","type":"address"}],"outputs":[],"gas":9175979},{"stateMutability":"nonpayable","type":"function","name":"deposit","inputs":[{"name":"_value","type":"uint256"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"deposit","inputs":[{"name":"_value","type":"uint256"},{"name":"_addr","type":"address"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"deposit","inputs":[{"name":"_value","type":"uint256"},{"name":"_addr","type":"address"},{"name":"_claim_rewards","type":"bool"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"withdraw","inputs":[{"name":"_value","type":"uint256"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"withdraw","inputs":[{"name":"_value","type":"uint256"},{"name":"_claim_rewards","type":"bool"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"transfer","inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":41283316},{"stateMutability":"nonpayable","type":"function","name":"transferFrom","inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":41321266},{"stateMutability":"nonpayable","type":"function","name":"approve","inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":38211},{"stateMutability":"nonpayable","type":"function","name":"increaseAllowance","inputs":[{"name":"_spender","type":"address"},{"name":"_added_value","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":40755},{"stateMutability":"nonpayable","type":"function","name":"decreaseAllowance","inputs":[{"name":"_spender","type":"address"},{"name":"_subtracted_value","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":40779},{"stateMutability":"nonpayable","type":"function","name":"set_rewards","inputs":[{"name":"_reward_contract","type":"address"},{"name":"_sigs","type":"bytes32"},{"name":"_reward_tokens","type":"address[8]"}],"outputs":[],"gas":2743591},{"stateMutability":"nonpayable","type":"function","name":"set_killed","inputs":[{"name":"_is_killed","type":"bool"}],"outputs":[],"gas":38145},{"stateMutability":"nonpayable","type":"function","name":"commit_transfer_ownership","inputs":[{"name":"addr","type":"address"}],"outputs":[],"gas":39525},{"stateMutability":"nonpayable","type":"function","name":"accept_transfer_ownership","inputs":[],"outputs":[],"gas":39470},{"stateMutability":"view","type":"function","name":"minter","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3078},{"stateMutability":"view","type":"function","name":"reward_policy_maker","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3108},{"stateMutability":"view","type":"function","name":"lp_token","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3138},{"stateMutability":"view","type":"function","name":"controller","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3168},{"stateMutability":"view","type":"function","name":"voting_escrow","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3198},{"stateMutability":"view","type":"function","name":"balanceOf","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3443},{"stateMutability":"view","type":"function","name":"totalSupply","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":3258},{"stateMutability":"view","type":"function","name":"allowance","inputs":[{"name":"arg0","type":"address"},{"name":"arg1","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3718},{"stateMutability":"view","type":"function","name":"name","inputs":[],"outputs":[{"name":"","type":"string"}],"gas":13620},{"stateMutability":"view","type":"function","name":"symbol","inputs":[],"outputs":[{"name":"","type":"string"}],"gas":11373},{"stateMutability":"view","type":"function","name":"working_balances","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3593},{"stateMutability":"view","type":"function","name":"working_supply","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":3408},{"stateMutability":"view","type":"function","name":"period","inputs":[],"outputs":[{"name":"","type":"int128"}],"gas":3438},{"stateMutability":"view","type":"function","name":"period_timestamp","inputs":[{"name":"arg0","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":3577},{"stateMutability":"view","type":"function","name":"integrate_inv_supply","inputs":[{"name":"arg0","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":3607},{"stateMutability":"view","type":"function","name":"integrate_inv_supply_of","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3743},{"stateMutability":"view","type":"function","name":"integrate_checkpoint_of","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3773},{"stateMutability":"view","type":"function","name":"integrate_fraction","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3803},{"stateMutability":"view","type":"function","name":"reward_tokens","inputs":[{"name":"arg0","type":"uint256"}],"outputs":[{"name":"","type":"address"}],"gas":3727},{"stateMutability":"view","type":"function","name":"rewards_receiver","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"address"}],"gas":3863},{"stateMutability":"view","type":"function","name":"reward_integral","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3893},{"stateMutability":"view","type":"function","name":"reward_integral_for","inputs":[{"name":"arg0","type":"address"},{"name":"arg1","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":4138},{"stateMutability":"view","type":"function","name":"admin","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3738},{"stateMutability":"view","type":"function","name":"future_admin","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3768},{"stateMutability":"view","type":"function","name":"is_killed","inputs":[],"outputs":[{"name":"","type":"bool"}],"gas":3798}]
const SOLIDLY_GAUGE_ABI = [{"inputs":[{"internalType":"address","name":"_stake","type":"address"},{"internalType":"address","name":"_bribe","type":"address"},{"internalType":"address","name":"__ve","type":"address"},{"internalType":"address","name":"_voter","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"claimed0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"claimed1","type":"uint256"}],"name":"ClaimFees","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"reward","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ClaimRewards","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"reward","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"NotifyReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"_ve","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"maxRuns","type":"uint256"}],"name":"batchRewardPerToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"bribe","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"checkpoints","outputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"balanceOf","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimFees","outputs":[{"internalType":"uint256","name":"claimed0","type":"uint256"},{"internalType":"uint256","name":"claimed1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"depositAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"derivedBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"derivedBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"derivedSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fees0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fees1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"getPriorBalanceIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"getPriorRewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"getPriorSupplyIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address[]","name":"tokens","type":"address[]"}],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isReward","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"lastEarn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"left","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"numCheckpoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardPerTokenCheckpoints","outputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"rewardPerToken","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardPerTokenNumCheckpoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewards","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsListLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stake","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"supplyCheckpoints","outputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"supply","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"supplyNumCheckpoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"tokenIds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"voter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"withdrawToken","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const NFT_SOLIDLY_ABI = [{"inputs":[{"internalType":"address","name":"token_addr","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"locktime","type":"uint256"},{"indexed":false,"internalType":"enum ve.DepositType","name":"deposit_type","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"ts","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"prevSupply","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"supply","type":"uint256"}],"name":"Supply","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"ts","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"abstain","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_approved","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"attach","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"attachments","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_block","type":"uint256"}],"name":"balanceOfAtNFT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"balanceOfNFT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_t","type":"uint256"}],"name":"balanceOfNFTAt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"block_number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"checkpoint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"uint256","name":"_lock_duration","type":"uint256"}],"name":"create_lock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"uint256","name":"_lock_duration","type":"uint256"},{"internalType":"address","name":"_to","type":"address"}],"name":"create_lock_for","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"deposit_for","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"detach","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"epoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"get_last_user_slope","outputs":[{"internalType":"int128","name":"","type":"int128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"increase_amount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_lock_duration","type":"uint256"}],"name":"increase_unlock_time","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"isApprovedOrOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"locked","outputs":[{"internalType":"int128","name":"amount","type":"int128"},{"internalType":"uint256","name":"end","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"locked__end","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"merge","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"ownership_change","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"point_history","outputs":[{"internalType":"int128","name":"bias","type":"int128"},{"internalType":"int128","name":"slope","type":"int128"},{"internalType":"uint256","name":"ts","type":"uint256"},{"internalType":"uint256","name":"blk","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_operator","type":"address"},{"internalType":"bool","name":"_approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_voter","type":"address"}],"name":"setVoter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"slope_changes","outputs":[{"internalType":"int128","name":"","type":"int128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"supply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"_interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"uint256","name":"_tokenIndex","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_block","type":"uint256"}],"name":"totalSupplyAt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"t","type":"uint256"}],"name":"totalSupplyAtT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"user_point_epoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"user_point_history","outputs":[{"internalType":"int128","name":"bias","type":"int128"},{"internalType":"int128","name":"slope","type":"int128"},{"internalType":"uint256","name":"ts","type":"uint256"},{"internalType":"uint256","name":"blk","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_idx","type":"uint256"}],"name":"user_point_history__ts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"voted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"voter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"voting","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const HUNDRED_ABI = {
  comptroller: [
      {
          inputs: [],
          name: 'getAllMarkets',
          outputs: [{ internalType: 'contract PToken[]', name: '', type: 'address[]' }],
          stateMutability: 'view',
          type: 'function',
      },
      {
          inputs: [{"internalType":"address","name":"","type":"address"}],
          name: 'compSpeeds',
          outputs: [{"internalType":"uint256","name":"","type":"uint256"}],
          stateMutability: 'view',
          type: 'function',
      }
  ],
  pToken: [
      {
          inputs: [],
          name: 'totalReserves',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
      },
      {
          inputs: [],
          name: 'totalSupply',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
      },
      {
          inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
          name: 'balanceOf',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
      },
      {
          inputs: [],
          name: 'exchangeRateStored',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
      },
      {
          inputs: [],
          name: 'supplyRatePerBlock',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
      },
      {
          inputs: [],
          name: 'totalBorrows',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
      },
      {
          inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
          name: 'borrowBalanceStored',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
      },
      {
          inputs: [],
          name: 'borrowRatePerBlock',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
      },
      {
          inputs: [],
          name: 'getCash',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
      },
      {
          inputs: [],
          name: 'interestRateModel',
          outputs: [{ internalType: 'contract IInterestRateModel', name: '', type: 'address' }],
          stateMutability: 'view',
          type: 'function',
      },
      {
          inputs: [],
          name: 'underlying',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          stateMutability: 'view',
          type: 'function',
      },
  ],
  erc20: [
      {
          constant: true,
          inputs: [],
          name: 'symbol',
          outputs: [{ internalType: 'string', name: '', type: 'string' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
      },
      {
          constant: true,
          inputs: [],
          name: 'decimals',
          outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
      },
  ],
  oracle: [
      {
          inputs: [{ internalType: 'address', name: '_pToken', type: 'address' }],
          name: 'getUnderlyingPrice',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
      },
  ],
  rate: [
      {
          inputs: [],
          name: 'blocksPerYear',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
      },
  ],
}

const BEETS_CHEF_ABI = [{"inputs":[{"internalType":"contract BeethovenxToken","name":"_beets","type":"address"},{"internalType":"address","name":"_treasuryAddress","type":"address"},{"internalType":"uint256","name":"_beetsPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Harvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"},{"indexed":true,"internalType":"contract IERC20","name":"lpToken","type":"address"},{"indexed":true,"internalType":"contract IRewarder","name":"rewarder","type":"address"}],"name":"LogPoolAddition","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"},{"indexed":true,"internalType":"contract IRewarder","name":"rewarder","type":"address"},{"indexed":false,"internalType":"bool","name":"overwrite","type":"bool"}],"name":"LogSetPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lpSupply","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"accBeetsPerShare","type":"uint256"}],"name":"LogUpdatePool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldAddress","type":"address"},{"indexed":true,"internalType":"address","name":"newAddress","type":"address"}],"name":"SetTreasuryAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"_beetsPerSec","type":"uint256"}],"name":"UpdateEmissionRate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"POOL_PERCENTAGE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TREASURY_PERCENTAGE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"contract IRewarder","name":"_rewarder","type":"address"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"beets","outputs":[{"internalType":"contract BeethovenxToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"beetsPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_to","type":"address"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_to","type":"address"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_to","type":"address"}],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_pids","type":"uint256[]"},{"internalType":"address","name":"_to","type":"address"}],"name":"harvestAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lpTokens","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"pids","type":"uint256[]"}],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingBeets","outputs":[{"internalType":"uint256","name":"pending","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accBeetsPerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewarder","outputs":[{"internalType":"contract IRewarder","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IRewarder","name":"_rewarder","type":"address"},{"internalType":"bool","name":"overwrite","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_treasuryAddress","type":"address"}],"name":"treasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasuryAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_beetsPerBlock","type":"uint256"}],"name":"updateEmissionRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[{"components":[{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accBeetsPerShare","type":"uint256"}],"internalType":"struct BeethovenxMasterChef.PoolInfo","name":"pool","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_to","type":"address"}],"name":"withdrawAndHarvest","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const contracts = {
  comptroller: '0x0f390559f258eb8591c8e31cf0905e97cf36ace2',
  oracle: '0x10010069DE6bD5408A6dEd075Cf6ae2498073c73',
  gas: {
      p_address: '0xfCD8570AD81e6c77b8D252bEbEBA62ed980BD64D',
      symbol: 'FTM',
      decimals: 18,
  },
};

async function main() {
  const App = await init_ethers();
  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const BEETS_CHEF_ADDR = "0x8166994d9ebBe5829EC86Bd81258149B87faCfd3";
  const rewardTokenTicker = "BEETS";
  const BEETS_CHEF = new ethers.Contract(BEETS_CHEF_ADDR, BEETS_CHEF_ABI, App.provider);
  const rewardsPerWeek = await BEETS_CHEF.beetsPerBlock() /1e18 * 604800;

  const pools = ["0x6479352F9086474307b3Fa465eFC6FB550231F12"].map(c => { return {
    address: c,
    abi: SOLIDLY_GAUGE_ABI,
    stakeTokenFunction: "stake",
  }})

  const tokens = {};
  const prices = await getFantomPrices();

  await loadSolidlySynthetixPoolInfoPrice(App, tokens, prices, pools[0].address, "0xc8cc1b89820791665b6f26b00b3111b00e021f19")

  let p = await loadSolidlyFantomSynthetixPools(App, tokens, prices, pools)
  _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}\n`);
  if (p.totalUserStaked > 0) {
    _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalApr * 100).toFixed(2)}%\n`);
  }

  /*================================      GAUGES      ====================================================== */
  const HND_GAUGES_CONTROLLER_ABI = [{"name":"CommitOwnership","inputs":[{"name":"admin","type":"address","indexed":false}],"anonymous":false,"type":"event"},{"name":"ApplyOwnership","inputs":[{"name":"admin","type":"address","indexed":false}],"anonymous":false,"type":"event"},{"name":"AddType","inputs":[{"name":"name","type":"string","indexed":false},{"name":"type_id","type":"int128","indexed":false}],"anonymous":false,"type":"event"},{"name":"NewTypeWeight","inputs":[{"name":"type_id","type":"int128","indexed":false},{"name":"time","type":"uint256","indexed":false},{"name":"weight","type":"uint256","indexed":false},{"name":"total_weight","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"NewGaugeWeight","inputs":[{"name":"gauge_address","type":"address","indexed":false},{"name":"time","type":"uint256","indexed":false},{"name":"weight","type":"uint256","indexed":false},{"name":"total_weight","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"VoteForGauge","inputs":[{"name":"time","type":"uint256","indexed":false},{"name":"user","type":"address","indexed":false},{"name":"gauge_addr","type":"address","indexed":false},{"name":"weight","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"NewGauge","inputs":[{"name":"addr","type":"address","indexed":false},{"name":"gauge_type","type":"int128","indexed":false},{"name":"weight","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"stateMutability":"nonpayable","type":"constructor","inputs":[{"name":"_token","type":"address"},{"name":"_voting_escrow","type":"address"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"commit_transfer_ownership","inputs":[{"name":"addr","type":"address"}],"outputs":[],"gas":38895},{"stateMutability":"nonpayable","type":"function","name":"apply_transfer_ownership","inputs":[],"outputs":[],"gas":41034},{"stateMutability":"view","type":"function","name":"gauge_types","inputs":[{"name":"_addr","type":"address"}],"outputs":[{"name":"","type":"int128"}],"gas":3014},{"stateMutability":"nonpayable","type":"function","name":"add_gauge","inputs":[{"name":"addr","type":"address"},{"name":"gauge_type","type":"int128"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"add_gauge","inputs":[{"name":"addr","type":"address"},{"name":"gauge_type","type":"int128"},{"name":"weight","type":"uint256"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"checkpoint","inputs":[],"outputs":[],"gas":18295064817},{"stateMutability":"nonpayable","type":"function","name":"checkpoint_gauge","inputs":[{"name":"addr","type":"address"}],"outputs":[],"gas":18349612985},{"stateMutability":"view","type":"function","name":"gauge_relative_weight","inputs":[{"name":"addr","type":"address"}],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"view","type":"function","name":"gauge_relative_weight","inputs":[{"name":"addr","type":"address"},{"name":"time","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"nonpayable","type":"function","name":"gauge_relative_weight_write","inputs":[{"name":"addr","type":"address"}],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"nonpayable","type":"function","name":"gauge_relative_weight_write","inputs":[{"name":"addr","type":"address"},{"name":"time","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"nonpayable","type":"function","name":"add_type","inputs":[{"name":"_name","type":"string"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"add_type","inputs":[{"name":"_name","type":"string"},{"name":"weight","type":"uint256"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"change_type_weight","inputs":[{"name":"type_id","type":"int128"},{"name":"weight","type":"uint256"}],"outputs":[],"gas":36770184806},{"stateMutability":"nonpayable","type":"function","name":"change_gauge_weight","inputs":[{"name":"addr","type":"address"},{"name":"weight","type":"uint256"}],"outputs":[],"gas":36879354313},{"stateMutability":"nonpayable","type":"function","name":"vote_for_gauge_weights","inputs":[{"name":"_gauge_addr","type":"address"},{"name":"_user_weight","type":"uint256"}],"outputs":[],"gas":18404662719},{"stateMutability":"view","type":"function","name":"get_gauge_weight","inputs":[{"name":"addr","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":5362},{"stateMutability":"view","type":"function","name":"get_type_weight","inputs":[{"name":"type_id","type":"int128"}],"outputs":[{"name":"","type":"uint256"}],"gas":5395},{"stateMutability":"view","type":"function","name":"get_total_weight","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":5020},{"stateMutability":"view","type":"function","name":"get_weights_sum_per_type","inputs":[{"name":"type_id","type":"int128"}],"outputs":[{"name":"","type":"uint256"}],"gas":5527},{"stateMutability":"view","type":"function","name":"admin","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":2868},{"stateMutability":"view","type":"function","name":"future_admin","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":2898},{"stateMutability":"view","type":"function","name":"token","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":2928},{"stateMutability":"view","type":"function","name":"voting_escrow","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":2958},{"stateMutability":"view","type":"function","name":"n_gauge_types","inputs":[],"outputs":[{"name":"","type":"int128"}],"gas":2988},{"stateMutability":"view","type":"function","name":"n_gauges","inputs":[],"outputs":[{"name":"","type":"int128"}],"gas":3018},{"stateMutability":"view","type":"function","name":"gauge_type_names","inputs":[{"name":"arg0","type":"int128"}],"outputs":[{"name":"","type":"string"}],"gas":13646},{"stateMutability":"view","type":"function","name":"gauges","inputs":[{"name":"arg0","type":"uint256"}],"outputs":[{"name":"","type":"address"}],"gas":3187},{"stateMutability":"view","type":"function","name":"vote_user_slopes","inputs":[{"name":"arg0","type":"address"},{"name":"arg1","type":"address"}],"outputs":[{"name":"slope","type":"uint256"},{"name":"power","type":"uint256"},{"name":"end","type":"uint256"}],"gas":8354},{"stateMutability":"view","type":"function","name":"vote_user_power","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3353},{"stateMutability":"view","type":"function","name":"last_user_vote","inputs":[{"name":"arg0","type":"address"},{"name":"arg1","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3598},{"stateMutability":"view","type":"function","name":"points_weight","inputs":[{"name":"arg0","type":"address"},{"name":"arg1","type":"uint256"}],"outputs":[{"name":"bias","type":"uint256"},{"name":"slope","type":"uint256"}],"gas":6062},{"stateMutability":"view","type":"function","name":"time_weight","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3443},{"stateMutability":"view","type":"function","name":"points_sum","inputs":[{"name":"arg0","type":"int128"},{"name":"arg1","type":"uint256"}],"outputs":[{"name":"bias","type":"uint256"},{"name":"slope","type":"uint256"}],"gas":6203},{"stateMutability":"view","type":"function","name":"time_sum","inputs":[{"name":"arg0","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":3397},{"stateMutability":"view","type":"function","name":"points_total","inputs":[{"name":"arg0","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":3433},{"stateMutability":"view","type":"function","name":"time_total","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":3348},{"stateMutability":"view","type":"function","name":"points_type_weight","inputs":[{"name":"arg0","type":"int128"},{"name":"arg1","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":3789},{"stateMutability":"view","type":"function","name":"time_type_weight","inputs":[{"name":"arg0","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":3517}]
  const HND_GAUGE_ABI = [{"name":"Deposit","inputs":[{"name":"provider","type":"address","indexed":true},{"name":"value","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"Withdraw","inputs":[{"name":"provider","type":"address","indexed":true},{"name":"value","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateLiquidityLimit","inputs":[{"name":"user","type":"address","indexed":false},{"name":"original_balance","type":"uint256","indexed":false},{"name":"original_supply","type":"uint256","indexed":false},{"name":"working_balance","type":"uint256","indexed":false},{"name":"working_supply","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"CommitOwnership","inputs":[{"name":"admin","type":"address","indexed":false}],"anonymous":false,"type":"event"},{"name":"ApplyOwnership","inputs":[{"name":"admin","type":"address","indexed":false}],"anonymous":false,"type":"event"},{"name":"Transfer","inputs":[{"name":"_from","type":"address","indexed":true},{"name":"_to","type":"address","indexed":true},{"name":"_value","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"Approval","inputs":[{"name":"_owner","type":"address","indexed":true},{"name":"_spender","type":"address","indexed":true},{"name":"_value","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"stateMutability":"nonpayable","type":"constructor","inputs":[{"name":"_lp_token","type":"address"},{"name":"_minter","type":"address"},{"name":"_admin","type":"address"},{"name":"_reward_policy_maker","type":"address"}],"outputs":[]},{"stateMutability":"view","type":"function","name":"decimals","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":288},{"stateMutability":"view","type":"function","name":"integrate_checkpoint","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":4624},{"stateMutability":"nonpayable","type":"function","name":"user_checkpoint","inputs":[{"name":"addr","type":"address"}],"outputs":[{"name":"","type":"bool"}],"gas":9161388},{"stateMutability":"view","type":"function","name":"claimable_tokens","inputs":[{"name":"addr","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":9074455},{"stateMutability":"view","type":"function","name":"reward_contract","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":2718},{"stateMutability":"view","type":"function","name":"last_claim","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":2544},{"stateMutability":"view","type":"function","name":"claimed_reward","inputs":[{"name":"_addr","type":"address"},{"name":"_token","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3066},{"stateMutability":"view","type":"function","name":"claimable_reward","inputs":[{"name":"_addr","type":"address"},{"name":"_token","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3034},{"stateMutability":"nonpayable","type":"function","name":"claimable_reward_write","inputs":[{"name":"_addr","type":"address"},{"name":"_token","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":1211018},{"stateMutability":"nonpayable","type":"function","name":"set_rewards_receiver","inputs":[{"name":"_receiver","type":"address"}],"outputs":[],"gas":35733},{"stateMutability":"nonpayable","type":"function","name":"claim_rewards","inputs":[],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"claim_rewards","inputs":[{"name":"_addr","type":"address"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"claim_rewards","inputs":[{"name":"_addr","type":"address"},{"name":"_receiver","type":"address"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"kick","inputs":[{"name":"addr","type":"address"}],"outputs":[],"gas":9175979},{"stateMutability":"nonpayable","type":"function","name":"deposit","inputs":[{"name":"_value","type":"uint256"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"deposit","inputs":[{"name":"_value","type":"uint256"},{"name":"_addr","type":"address"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"deposit","inputs":[{"name":"_value","type":"uint256"},{"name":"_addr","type":"address"},{"name":"_claim_rewards","type":"bool"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"withdraw","inputs":[{"name":"_value","type":"uint256"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"withdraw","inputs":[{"name":"_value","type":"uint256"},{"name":"_claim_rewards","type":"bool"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"transfer","inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":41283316},{"stateMutability":"nonpayable","type":"function","name":"transferFrom","inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":41321266},{"stateMutability":"nonpayable","type":"function","name":"approve","inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":38211},{"stateMutability":"nonpayable","type":"function","name":"increaseAllowance","inputs":[{"name":"_spender","type":"address"},{"name":"_added_value","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":40755},{"stateMutability":"nonpayable","type":"function","name":"decreaseAllowance","inputs":[{"name":"_spender","type":"address"},{"name":"_subtracted_value","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":40779},{"stateMutability":"nonpayable","type":"function","name":"set_rewards","inputs":[{"name":"_reward_contract","type":"address"},{"name":"_sigs","type":"bytes32"},{"name":"_reward_tokens","type":"address[8]"}],"outputs":[],"gas":2743591},{"stateMutability":"nonpayable","type":"function","name":"set_killed","inputs":[{"name":"_is_killed","type":"bool"}],"outputs":[],"gas":38145},{"stateMutability":"nonpayable","type":"function","name":"commit_transfer_ownership","inputs":[{"name":"addr","type":"address"}],"outputs":[],"gas":39525},{"stateMutability":"nonpayable","type":"function","name":"accept_transfer_ownership","inputs":[],"outputs":[],"gas":39470},{"stateMutability":"view","type":"function","name":"minter","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3078},{"stateMutability":"view","type":"function","name":"reward_policy_maker","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3108},{"stateMutability":"view","type":"function","name":"lp_token","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3138},{"stateMutability":"view","type":"function","name":"controller","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3168},{"stateMutability":"view","type":"function","name":"voting_escrow","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3198},{"stateMutability":"view","type":"function","name":"balanceOf","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3443},{"stateMutability":"view","type":"function","name":"totalSupply","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":3258},{"stateMutability":"view","type":"function","name":"allowance","inputs":[{"name":"arg0","type":"address"},{"name":"arg1","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3718},{"stateMutability":"view","type":"function","name":"name","inputs":[],"outputs":[{"name":"","type":"string"}],"gas":13620},{"stateMutability":"view","type":"function","name":"symbol","inputs":[],"outputs":[{"name":"","type":"string"}],"gas":11373},{"stateMutability":"view","type":"function","name":"working_balances","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3593},{"stateMutability":"view","type":"function","name":"working_supply","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":3408},{"stateMutability":"view","type":"function","name":"period","inputs":[],"outputs":[{"name":"","type":"int128"}],"gas":3438},{"stateMutability":"view","type":"function","name":"period_timestamp","inputs":[{"name":"arg0","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":3577},{"stateMutability":"view","type":"function","name":"integrate_inv_supply","inputs":[{"name":"arg0","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":3607},{"stateMutability":"view","type":"function","name":"integrate_inv_supply_of","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3743},{"stateMutability":"view","type":"function","name":"integrate_checkpoint_of","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3773},{"stateMutability":"view","type":"function","name":"integrate_fraction","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3803},{"stateMutability":"view","type":"function","name":"reward_tokens","inputs":[{"name":"arg0","type":"uint256"}],"outputs":[{"name":"","type":"address"}],"gas":3727},{"stateMutability":"view","type":"function","name":"rewards_receiver","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"address"}],"gas":3863},{"stateMutability":"view","type":"function","name":"reward_integral","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3893},{"stateMutability":"view","type":"function","name":"reward_integral_for","inputs":[{"name":"arg0","type":"address"},{"name":"arg1","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":4138},{"stateMutability":"view","type":"function","name":"admin","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3738},{"stateMutability":"view","type":"function","name":"future_admin","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3768},{"stateMutability":"view","type":"function","name":"is_killed","inputs":[],"outputs":[{"name":"","type":"bool"}],"gas":3798}]
  const REWARDS_POLICY_ABI = [{"name":"SetAdmin","inputs":[{"name":"admin","type":"address","indexed":false}],"anonymous":false,"type":"event"},{"stateMutability":"nonpayable","type":"constructor","inputs":[{"name":"_epoch_length","type":"uint256"}],"outputs":[]},{"stateMutability":"view","type":"function","name":"epoch_at","inputs":[{"name":"_timestamp","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":7475},{"stateMutability":"view","type":"function","name":"epoch_start_time","inputs":[{"name":"_epoch","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":4918},{"stateMutability":"view","type":"function","name":"rate_at","inputs":[{"name":"_timestamp","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":14134},{"stateMutability":"view","type":"function","name":"current_epoch","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":14997},{"stateMutability":"view","type":"function","name":"future_epoch_time","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":36854},{"stateMutability":"view","type":"function","name":"future_epoch_rate","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":19623},{"stateMutability":"nonpayable","type":"function","name":"set_admin","inputs":[{"name":"_admin","type":"address"}],"outputs":[],"gas":39075},{"stateMutability":"nonpayable","type":"function","name":"set_rewards_at","inputs":[{"name":"_epoch","type":"uint256"},{"name":"_reward","type":"uint256"}],"outputs":[],"gas":52480},{"stateMutability":"nonpayable","type":"function","name":"set_rewards_starting_at","inputs":[{"name":"_epoch","type":"uint256"},{"name":"_rewards","type":"uint256[10]"}],"outputs":[],"gas":371612},{"stateMutability":"view","type":"function","name":"admin","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":2658},{"stateMutability":"view","type":"function","name":"first_epoch_time","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":2688},{"stateMutability":"view","type":"function","name":"epoch_length","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":2718},{"stateMutability":"view","type":"function","name":"rewards","inputs":[{"name":"arg0","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":2857}]

  const HND_GAUGES_CONTROLLER_ADDR = "0xb1c4426C86082D91a6c097fC588E5D5d8dD1f5a8";
  const HND_GAUGES_CONTROLLER = new ethcall.Contract(HND_GAUGES_CONTROLLER_ADDR, HND_GAUGES_CONTROLLER_ABI);

  const [_gaugesCount] = await App.ethcallProvider.all([HND_GAUGES_CONTROLLER.n_gauges()]);
  const gaugesCount = _gaugesCount / 1;
  const calls = [...Array(gaugesCount).keys()].map(i => HND_GAUGES_CONTROLLER.gauges(i));
  const gaugeAddresses = await App.ethcallProvider.all(calls);

  const gaugeContracts = gaugeAddresses.map(a => new ethcall.Contract(a, HND_GAUGE_ABI));
  const gaugeCalls = gaugeContracts.map(c => [c.lp_token(), c.totalSupply(), c.balanceOf(App.YOUR_ADDRESS), c.reward_policy_maker(), c.working_balances(App.YOUR_ADDRESS), c.working_supply()]).flat();
  const gaugeValues = await App.ethcallProvider.all(gaugeCalls);

  let _gageInfos = []
  for(let i = 0; i < gaugeValues.length; i++){
    const gageInfo = {
      lpTokenAddress   : gaugeValues[i],
      totalSupply      : gaugeValues[i+1],
      balance          : gaugeValues[i+2],
      rewardsAddress   : gaugeValues[i+3],
      working_balances : gaugeValues[i+4],
      working_supply   : gaugeValues[i+5]
    }
    _gageInfos.push(gageInfo);
    i=i+5
  }
  const gageInfos = _gageInfos.filter(g => g.lpTokenAddress.toLowerCase() !== "0xA9AA802429772626Fccd91d9B6A6b955BD811fF3".toLowerCase()).filter(
                                      g => g.lpTokenAddress.toLowerCase() !== "0xA33138a5A6A32d12b2Ac7Fc261378d6C6AB2eF90".toLowerCase())

  //HND reward token
  const rewardToken = await getFantomToken(App, "0x10010078a54396f62c96df8532dc2b4847d47ed3", App.YOUR_ADDRESS);
  const rewardTokenPrice = getParameterCaseInsensitive(prices, "0x10010078a54396f62c96df8532dc2b4847d47ed3")?.usd;

  let staked_tvl = 0;
  let userTvl = 0;
  for(let i = 0; i < gageInfos.length; i++){
    const lpToken = await getFantomToken(App, gageInfos[i].lpTokenAddress, gaugeAddresses[i]);
    const totalSupply = gageInfos[i].totalSupply / 10 ** lpToken.decimals;
    const usersStaked = gageInfos[i].balance / 10 ** lpToken.decimals;
    const working_balances = gageInfos[i].working_balances / 10 ** lpToken.decimals;
    const working_supply = gageInfos[i].working_supply / 10 ** lpToken.decimals;
    const _claimableRewards = await App.ethcallProvider.all([gaugeContracts[i].claimable_tokens(App.YOUR_ADDRESS)]);
    const claimableTokens = _claimableRewards / 10 ** rewardToken.decimals;
    const poolPrice = getPoolPrices(tokens, prices, lpToken, "fantom")
    staked_tvl += totalSupply * poolPrice.price;
    userTvl += usersStaked * poolPrice.price;
    const staked_tvlForCurrentPool = totalSupply * poolPrice.price;
    const timestampNow_ = Date.now() / 1000;
    const timestampNow = parseInt(timestampNow_);
    const rewardsContract = new ethcall.Contract(gageInfos[i].rewardsAddress, REWARDS_POLICY_ABI);
    const rewardsPerWeek_ = await App.ethcallProvider.all([rewardsContract.rate_at(timestampNow)]);
    const rewardsPerWeek = rewardsPerWeek_ / 10 ** rewardToken.decimals * 604800;
    await printHndContract(App, lpToken, poolPrice, gageInfos[i], gaugeAddresses[i], claimableTokens, rewardToken, rewardTokenPrice, rewardsPerWeek, staked_tvlForCurrentPool, working_balances, working_supply);
  }
  _print_bold(`\nTotal Value Staked: $${formatMoney(staked_tvl)}`);
  if (userTvl > 0) {
    _print_bold(`You are staking a total of $${formatMoney(userTvl)}`);
  }
  _print("");

  /*================================      GAUGES      ====================================================== */

  const COMPTROLLER = new ethcall.Contract(contracts.comptroller, HUNDRED_ABI.comptroller, App.provider);

  const [allMarkets] = await App.ethcallProvider.all([COMPTROLLER.getAllMarkets()]);

  // console.log(allMarkets);

  const data = await Promise.all(allMarkets.map(token => loadData(App, token, COMPTROLLER, prices)));

  // console.log(data);

  let [totalSupply, totalBorrow, totalCash] = [0, 0, 0];

  for (const market of data) {
      totalSupply += market.totalSupply * market.underlyingPrice;
      totalBorrow += market.totalBorrows * market.underlyingPrice;
      totalCash += market.cash * market.underlyingPrice;
  }
  _print_bold(`Deposit Market Size : $${formatMoney(totalSupply)}`);
  _print_bold(`Borrow Market Size : $${formatMoney(totalBorrow)}`);
  _print_bold(`TVL : $${formatMoney(totalCash)}`);
  _print("");

  for (const market of data) {
      printData(market);
  }

  _print("");
  _print_bold("Staking Pool");
  await loadBeethovenxChefContract(App, tokens, prices, BEETS_CHEF, BEETS_CHEF_ADDR, BEETS_CHEF_ABI, rewardTokenTicker,
    "beets", null, rewardsPerWeek, "pendingBeets");

  hideLoading();
}

async function loadSolidlyFantomSynthetixPools(App, tokens, prices, pools) {
  let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
  const infos = await Promise.all(pools.map(p =>
      loadSolidlySynthetixPoolInfo(App, tokens, prices, p.abi, p.address, p.stakeTokenFunction)));
  for (const i of infos) {
    let p = await printSolidlySynthetixPool(App, i, "fantom");
    totalStaked += p.staked_tvl || 0;
    totalUserStaked += p.userStaked || 0;
    if (p.userStaked > 0) {
      individualAPRs.push(p.userStaked * p.apr / 100);
    }
  }
  let totalApr = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
  return { staked_tvl : totalStaked, totalUserStaked, totalApr };
}

async function loadSolidlySynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
  stakeTokenFunction) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
    const STAKING_MULTI = new ethcall.Contract(stakingAddress, stakingAbi);

    const NFT_SOLIDLY_ADDR = "0xcbd8fea77c2452255f59743f55a3ea9d83b3c72b";
    const STAKING_MULTI_NFT = new ethcall.Contract(NFT_SOLIDLY_ADDR, NFT_SOLIDLY_ABI);

    if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
      console.log("Couldn't find stake function ", stakeTokenFunction);
    }
    const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();

    const rewardTokenAddress = await STAKING_POOL.rewards(0)  //check for additional reward tokens in the future

    var stakeToken = await getFantomToken(App, stakeTokenAddress, stakingAddress);

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
        tokens[address] = await getFantomToken(App, address, stakingAddress);
    }
    if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
        tokens[rewardTokenAddress] = await getFantomToken(App, rewardTokenAddress, stakingAddress);
    }
    const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);

    const rewardTokenTicker = rewardToken.symbol;

    const poolPrices = getPoolPrices(tokens, prices, stakeToken, "fantom");

    if (!poolPrices)
    {
      console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
      return null;
    }

    const stakeTokenTicker = poolPrices.stakeTokenTicker;

    const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
    const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;

    const calls = [STAKING_MULTI.periodFinish(rewardTokenAddress), STAKING_MULTI.rewardRate(rewardTokenAddress),
      STAKING_MULTI.balanceOf(App.YOUR_ADDRESS), STAKING_MULTI.earned(rewardTokenAddress, App.YOUR_ADDRESS),
      STAKING_MULTI.derivedSupply(), STAKING_MULTI.derivedBalance(App.YOUR_ADDRESS), STAKING_MULTI.tokenIds(App.YOUR_ADDRESS)]
    const [periodFinish, rewardRate, balance, earned_, derivedSupply_, derivedBalance_, tokenId] = await App.ethcallProvider.all(calls);

    const [nftValue] = await App.ethcallProvider.all([STAKING_MULTI_NFT.balanceOfNFT(tokenId)]);
    const derivedSupply = derivedSupply_ / 10 ** stakeToken.decimals
    const derivedBalance = derivedBalance_ / 10 ** stakeToken.decimals

    const weeklyRewards = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate / 10 ** rewardToken.decimals * 604800;

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
      earned,
      derivedSupply,
      derivedBalance,
      tokenId,
      nftValue : nftValue / 1e18
    }
}

async function printSolidlySynthetixPool(App, info, chain="eth", customURLs) {
  info.poolPrices.print_price(chain, 4, customURLs);
  _print(`${info.rewardTokenTicker} Per Week: ${info.weeklyRewards.toFixed(2)} ($${formatMoney(info.usdPerWeek)})`);
  const weeklyAPR = info.usdPerWeek / info.staked_tvl * 100;
  const dailyAPR = weeklyAPR / 7;
  const yearlyAPR = weeklyAPR * 52;
  _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
  const userStakedUsd = info.userStaked * info.stakeTokenPrice;
  const userStakedPct = userStakedUsd / info.staked_tvl * 100;
  const usersDailyAPR = dailyAPR * (info.derivedBalance / info.derivedSupply) / userStakedPct * 100
  const usersWeeklyAPR = weeklyAPR * (info.derivedBalance / info.derivedSupply) / userStakedPct * 100
  const usersYearlyAPR = yearlyAPR * (info.derivedBalance / info.derivedSupply) / userStakedPct * 100
  if(info.derivedBalance <= 0){
    _print(`Your APR: Day 0% Week 0% Year 0%`);
  }else{
    _print(`Your APR: Day ${usersDailyAPR.toFixed(4)}% Week ${usersWeeklyAPR.toFixed(2)}% Year ${usersYearlyAPR.toFixed(2)}%`);
  }
  _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
         `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
  if (info.userStaked > 0) {
    info.poolPrices.print_contained_price(info.userStaked);
    _print(`You are using NFT ID ${info.tokenId} which has a value of ${formatMoney(info.nftValue)} veSOLID.`);
      const userWeeklyRewards = userStakedPct * info.weeklyRewards / 100;
      const userDailyRewards = userWeeklyRewards / 7;
      const userYearlyRewards = userWeeklyRewards * 52;
      _print(`Estimated ${info.rewardTokenTicker} earnings:`
          + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*info.rewardTokenPrice)})`
          + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*info.rewardTokenPrice)})`
          + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*info.rewardTokenPrice)})`);
  }
  const claim = async function() {
    return solidlyContract_claim(info.rewardTokenAddress, info.stakingAddress, App)
  }
  const exit = async function() {
    return rewardsContract_exit(info.stakingAddress, App)
  }
  const revoke = async function() {
    return rewardsContract_resetApprove(info.stakeTokenAddress, info.stakingAddress, App)
  }
  _print(`<a target="_blank" href="https://ftmscan.com/address/${info.stakingAddress}#code">FTM Scan</a>`);
  _print_link(`Claim ${info.earned.toFixed(6)} ${info.rewardTokenTicker} ($${formatMoney(info.earned*info.rewardTokenPrice)})`, claim)
  if (info.stakeTokenTicker != "ETH") {
    _print_link(`Revoke (set approval to 0)`, revoke)
  }
  _print_link(`Exit`, exit)
  _print("");

  return {
      staked_tvl: info.poolPrices.staked_tvl,
      userStaked : userStakedUsd,
      apr : usersYearlyAPR
  }
}

const solidlyContract_claim = async function(rewardTokenAddress, rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(rewardPoolAddr, SOLIDLY_GAUGE_ABI, signer)

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

async function printHndContract(App, lpToken, poolPrice, gaugeResult, gauge, claimableTokens, rewardToken, rewardTokenPrice, rewardsPerWeek, staked_tvl, working_balances, working_supply) {
  poolPrice.print_price();
  const usdPerWeek = rewardsPerWeek * rewardTokenPrice;
  _print(`${rewardToken.symbol} Per Week: ${rewardsPerWeek.toFixed(2)} ($${formatMoney(usdPerWeek)})`);
  const weeklyAPR = usdPerWeek / staked_tvl * 100;
  const dailyAPR = weeklyAPR / 7;
  const yearlyAPR = weeklyAPR * 52;
  _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
  const userStaked = gaugeResult.balance / 10 ** lpToken.decimals;
  var userStakedUsd = userStaked * poolPrice.price;
  var userStakedPct = userStakedUsd / poolPrice.tvl * 100;
  const usersDailyAPR = dailyAPR * (working_balances / working_supply) / userStakedPct * 100
  const usersWeeklyAPR = weeklyAPR * (working_balances / working_supply) / userStakedPct * 100
  const usersYearlyAPR = yearlyAPR * (working_balances / working_supply) / userStakedPct * 100
  if(working_balances <= 0){
    _print(`Your APR: Day 0% Week 0% Year 0%`);
  }else{
    _print(`Your APR: Day ${usersDailyAPR.toFixed(4)}% Week ${usersWeeklyAPR.toFixed(2)}% Year ${usersYearlyAPR.toFixed(2)}%`);
  }
  _print(`You are staking ${userStaked.toFixed(4)} ${poolPrice.stakeTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
  if (userStaked > 0) {
    poolPrice.print_contained_price(userStaked);
      const userWeeklyRewards = userStakedPct * rewardsPerWeek / 100;
      const userDailyRewards = userWeeklyRewards / 7;
      const userYearlyRewards = userWeeklyRewards * 52;
      _print(`Estimated ${rewardToken.symbol} earnings:`
          + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*rewardTokenPrice)})`
          + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*rewardTokenPrice)})`
          + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*rewardTokenPrice)})`);
  }
  const deposit = async function() {
    return hndGaugetDeposit(App, gauge, lpToken)
  }
  const withdraw = async function() {
    return hndGaugeWithdraw(App, gauge, lpToken)
  }
  const claim = async function() {
    return hndGaugeClaim(App, gauge, rewardToken)
  }
  _print_link(`Deposit ${lpToken.unstaked.toFixed(6)} ${lpToken.symbol}`, deposit);
  _print_link(`Withdraw ${userStaked.toFixed(6)} ${lpToken.symbol}`, withdraw);
  _print_link(`Claim ${claimableTokens.toFixed(6)} ${rewardToken.symbol} ($${formatMoney(claimableTokens*rewardTokenPrice)})`, claim);
  _print("");
}

async function hndGaugetDeposit(App, gauge, token){
  const signer = await App.provider.getSigner();

  const STAKING_TOKEN = new ethers.Contract(token.address, ERC20_ABI, signer)
  const GAUGE_CONTRACT = new ethers.Contract(gauge, HND_GAUGE_ABI, signer)

  const balanceToStake = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, gauge)

  const decimals = await STAKING_TOKEN.decimals();
  let allow = Promise.resolve()

  if (allowedTokens / 10 ** decimals < balanceToStake / 10 ** decimals) {
    showLoading()
    allow = STAKING_TOKEN.approve(gauge, ethers.constants.MaxUint256)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
        alert('Try resetting your approval to 0 first')
      })
  }

  if (balanceToStake / 10 ** decimals > 0) {
    showLoading()
    allow
      .then(async function() {
        GAUGE_CONTRACT["deposit(uint256)"](balanceToStake, {gasLimit: 500000})
          .then(function(t) {
            App.provider.waitForTransaction(t.hash).then(function() {
              hideLoading()
            })
          })
          .catch(function() {
            hideLoading()
            _print('Something went wrong.\n')
          })
      })
      .catch(function(ex) {
        hideLoading()
        _print('Something went wrong.')
        _print(ex)
      })
  } else {
    alert('You have no tokens to stake!!')
  }
}

async function hndGaugeWithdraw(App, gauge, token){
  const signer = App.provider.getSigner()
  const GAUGE_CONTRACT = new ethers.Contract(gauge, HND_GAUGE_ABI, signer)

  const currentStakedAmount = await GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS);

  if (currentStakedAmount / 10 ** token.decimals > 0) {
    showLoading()
    GAUGE_CONTRACT["withdraw(uint256,bool)"](currentStakedAmount, true, {gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

async function hndGaugeClaim(App, gauge, rewardToken) {
  const signer = App.provider.getSigner()
  const GAUGE_CONTRACT = new ethers.Contract(gauge, HND_GAUGE_ABI, signer)

  const earnedTokenAmount = await GAUGE_CONTRACT.claimable_reward(App.YOUR_ADDRESS, rewardToken.address) / 1e18

  if (earnedTokenAmount > 0) {
    showLoading()
    GAUGE_CONTRACT["claim_rewards()"]({gasLimit: 500000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
  }
}

async function loadData(App, token, comptroller, prices) {

  const PTOKEN_CONTRACT = new ethcall.Contract(token, HUNDRED_ABI.pToken, App.provider);

  const [
      totalReserves_,
      totalSupply_,
      supply_,
      exchangeRate_,
      supplyRatePerBlock_,
      totalBorrows_,
      borrowBalanceOf_,
      borrowRatePerBlock_,
      cash_,
      interestRateModel,
  ] = await App.ethcallProvider.all([
      PTOKEN_CONTRACT.totalReserves(),
      PTOKEN_CONTRACT.totalSupply(),
      PTOKEN_CONTRACT.balanceOf(App.YOUR_ADDRESS),
      PTOKEN_CONTRACT.exchangeRateStored(),
      PTOKEN_CONTRACT.supplyRatePerBlock(),
      PTOKEN_CONTRACT.totalBorrows(),
      PTOKEN_CONTRACT.borrowBalanceStored(App.YOUR_ADDRESS),
      PTOKEN_CONTRACT.borrowRatePerBlock(),
      PTOKEN_CONTRACT.getCash(),
      PTOKEN_CONTRACT.interestRateModel(),
  ]);

  let underlyingSymbol, underlyingDecimals;

  if (token.toLowerCase() === contracts.gas.p_address.toLowerCase()) {
      underlyingSymbol = contracts.gas.symbol;
      underlyingDecimals = contracts.gas.decimals;
  } else {
      const [underlying] = await App.ethcallProvider.all([PTOKEN_CONTRACT.underlying()]);
      const UNDERLYING_CONTRACT = new ethcall.Contract(underlying, HUNDRED_ABI.erc20, App.provider);
      [underlyingSymbol, underlyingDecimals] = await App.ethcallProvider.all([UNDERLYING_CONTRACT.symbol(), UNDERLYING_CONTRACT.decimals()]);
  }

  const ORACLE_CONTRACT = new ethcall.Contract(contracts.oracle, HUNDRED_ABI.oracle, App.provider);
  const [underlyingPrice_] = await App.ethcallProvider.all([ORACLE_CONTRACT.getUnderlyingPrice(token)]);
  const underlyingPrice = underlyingPrice_ / 10 ** (18 + 18 - underlyingDecimals);

  const totalReserves = totalReserves_ / 10 ** underlyingDecimals;

  const exchangeRate = exchangeRate_ / 1e18;
  const totalSupply = totalSupply_ * exchangeRate / 10 ** underlyingDecimals;
  const supply = supply_ * exchangeRate / 10 ** underlyingDecimals;
  const supplyPct = supply / totalSupply * 100;

  const totalBorrows = totalBorrows_ / 10 ** underlyingDecimals;
  const borrow = borrowBalanceOf_ / 10 ** underlyingDecimals;
  const borrowPct = borrow / totalBorrows * 100;

  const cash = cash_ / 10 ** underlyingDecimals;

  const RATE_CONTRACT = new ethcall.Contract(interestRateModel, HUNDRED_ABI.rate, App.provider);
  const [blocksPerYear] = await App.ethcallProvider.all([RATE_CONTRACT.blocksPerYear()]);

  const supplyAPY = ((1 + supplyRatePerBlock_ / 1e18) ** blocksPerYear - 1) * 100;
  const borrowAPY = ((1 + borrowRatePerBlock_ / 1e18) ** blocksPerYear - 1) * 100;

  let supplyFarmingAPY = 0;
  const [farmingRewards_] = await App.ethcallProvider.all([comptroller.compSpeeds(token)])
  const farmingRewards = farmingRewards_ / 1e18;
  const blocksPerYear_ = blocksPerYear * 1
  const tvl = totalSupply * underlyingPrice;
  const rewardPrice = getParameterCaseInsensitive(prices, "0x10010078a54396f62c96df8532dc2b4847d47ed3")?.usd;
  if(farmingRewards > 0){
    supplyFarmingAPY = farmingRewards * blocksPerYear_ * rewardPrice / tvl * 100
  }
  const borrowFarmingAPY = 0;

  const supplyNetAPY = supplyAPY + supplyFarmingAPY
  const borrowNetAPY = borrowFarmingAPY - borrowAPY

  const supplyUsdPerYear = supply * underlyingPrice * supplyNetAPY / 100;
  const supplyUsdPerWeek = supplyUsdPerYear / 52;
  const supplyUsdPerDay = supplyUsdPerYear / 365;

  const borrowUsdPerYear = borrow * underlyingPrice * borrowNetAPY / 100;
  const borrowUsdPerWeek = borrowUsdPerYear / 52;
  const borrowUsdPerDay = borrowUsdPerYear / 365;


  return {
      underlyingSymbol,
      underlyingPrice,
      totalSupply,
      totalBorrows,
      totalReserves,
      cash,
      supplyAPY,
      borrowAPY,
      supplyFarmingAPY,
      borrowFarmingAPY,
      supplyNetAPY,
      borrowNetAPY,
      supply,
      supplyUsdPerDay,
      supplyUsdPerWeek,
      supplyUsdPerYear,
      borrow,
      borrowUsdPerDay,
      borrowUsdPerWeek,
      borrowUsdPerYear,
      supplyPct,
      borrowPct
  }
}

async function printData(data) {
  _print_bold(`${data.underlyingSymbol} ($${formatMoney(data.underlyingPrice)})`);
  _print(`Supplied : ${formatMoney(data.totalSupply)} ($${formatMoney(data.totalSupply * data.underlyingPrice)}) at ${data.supplyAPY.toFixed(2)}% APY`)
  _print(`Borrowed : ${formatMoney(data.totalBorrows)} ($${formatMoney(data.totalBorrows * data.underlyingPrice)}) at ${data.borrowAPY.toFixed(2)}% APY`)
  _print(`Reserves : ${formatMoney(data.totalReserves)} ($${formatMoney(data.totalReserves * data.underlyingPrice)})`);
  _print(`Farming APR Supply ${data.supplyFarmingAPY.toFixed(2)}% Borrow ${data.borrowFarmingAPY.toFixed(2)}%`);
  _print(`Net APY Supply ${data.supplyNetAPY.toFixed(2)}% Borrow ${data.borrowNetAPY.toFixed(2)}%`);
  if (data.supply > 0) {
      _print(`You are supplying ${formatMoney(data.supply)} ${data.underlyingSymbol} ($${formatMoney(data.supply * data.underlyingPrice)}), ${(data.supplyPct).toFixed(2)}% of the pool.`)
      _print(`Estimated Supply earnings: Day ($${formatMoney(data.supplyUsdPerDay)}) Week ($${formatMoney(data.supplyUsdPerWeek)}) Year: ($${formatMoney(data.supplyUsdPerYear)})`);
  }
  if (data.borrow > 0) {
      _print(`You are borrowing ${formatMoney(data.borrow)} ${data.underlyingSymbol} ($${formatMoney(data.borrow * data.underlyingPrice)}), ${(data.borrowPct).toFixed(2)}% of the pool.`)
      _print(`Estimated Borrow earnings: Day ($${formatMoney(data.borrowUsdPerDay)}) Week ($${formatMoney(data.borrowUsdPerWeek)}) Year: ($${formatMoney(data.borrowUsdPerYear)})`);
  }
  _print("");
}

async function loadBeethovenxChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
  rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
  deathPoolIndices, claimFunction) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.poolLength(), 10);
  const totalAllocPoints = await chefContract.totalAllocPoint();

  _print(`<a href='https://ftmscan.com/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getFantomToken(App, rewardTokenAddress, chefAddress);
  const rewardsPerWeek = rewardsPerWeekFixed ??
    await chefContract.callStatic[rewardsPerBlockFunction]()
    / 10 ** rewardToken.decimals * 604800 / 3

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getBeethovenxPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getFantomToken(App, address, chefAddress);
  }));

  if (deathPoolIndices) {   //load prices for the deathpool assets
    deathPoolIndices.map(i => poolInfos[i])
                     .map(poolInfo =>
      poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "fantom") : undefined);
  }

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "fantom") : undefined);


  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      if(!poolInfos[i].rewarderRewardsPerWeek){
        const apr = printBeetsNormalPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
          totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
          pendingRewardsFunction, null, claimFunction, "fantom", poolInfos[i].depositFee, poolInfos[i].withdrawFee)
        aprs.push(apr);
      }else{
        const apr = printRewarderPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
          totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
          pendingRewardsFunction, null, claimFunction, "fantom", poolInfos[i].rewarderRewardsPerWeek,
          poolInfos[i].rewarderTicker, poolInfos[i].rewarderTokenAddress, poolInfos[i].pendingRewarderTokens)
        aprs.push(apr);
      }
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

async function getBeethovenxPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
  const poolInfo = await chefContract.poolInfo(poolIndex);
  const lpToken = await chefContract.lpTokens(poolIndex);
  if (poolInfo.allocPoint == 0) {
    return {
      address: lpToken,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: null,
      userStaked : 0,
      pendingRewardTokens : 0,
    };
  }
  const rewarder = await chefContract.rewarder(poolIndex);
  if(rewarder != "0x0000000000000000000000000000000000000000"){
    const poolToken = await getFantomToken(app, lpToken, chefAddress);
    const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
    const pendingRewardTokens = await chefContract.pendingBeets(poolIndex, app.YOUR_ADDRESS);
    const staked = userInfo.amount / 10 ** poolToken.decimals;
    const rewarderContract = new ethers.Contract(rewarder, REWARDER_BEETS_CHEF_ABI, app.provider);
    const rewarderTokenAddress = await rewarderContract.rewardToken();
    const rewarderToken = await getFantomToken(app, rewarderTokenAddress, chefAddress);
    const pendingRewarderTokens = await rewarderContract.pendingToken(poolIndex, app.YOUR_ADDRESS) / 10 ** rewarderToken.decimals;
    const rewarderRewardsPerSecond = await rewarderContract.rewardPerSecond() / 10 ** rewarderToken.decimals;
    const rewarderRewardsPerWeek = rewarderRewardsPerSecond * 604800;
    return {
        address : lpToken,
        allocPoints: poolInfo.allocPoint ?? 1,
        poolToken: poolToken,
        userStaked : staked,
        pendingRewardTokens : pendingRewardTokens / 10 ** 18,
        depositFee : (poolInfo.depositFeeBP ?? 0) / 100,
        withdrawFee : (poolInfo.withdrawFeeBP ?? 0) / 100,
        pendingRewarderTokens,
        rewarderTokenAddress,
        rewarderToken,
        rewarderRewardsPerWeek,
        rewarderTicker : rewarderToken.symbol
    };
  }else{
    return {
      address: lpToken,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: null,
      userStaked : 0,
      pendingRewardTokens : 0,
    };
  }
}

function printRewarderPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
                         totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                         pendingRewardsFunction, fixedDecimals, claimFunction, chain="fantom",
                         rewarderRewardsPerWeek, rewardRewarderTicker, rewarderTokenAddress, pendingRewarderTokens) {
    fixedDecimals = fixedDecimals ?? 2;
    const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken);
    var poolRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek;
    let poolRewarderRewardsPerWeek = rewarderRewardsPerWeek;
    if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
    const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
    const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
    const rewardRewarderPrice = getParameterCaseInsensitive(prices, rewarderTokenAddress)?.usd;
    const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
    poolPrices.print_price(chain);
    sp?.print_price(chain);
    const apr = printRewarderAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
      staked_tvl, userStaked, poolPrices.price, fixedDecimals, poolRewarderRewardsPerWeek, rewardRewarderPrice, rewardRewarderTicker);
    if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
    if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
    printRewarderContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
      rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
      poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, rewardPrice, pendingRewarderTokens, rewardRewarderTicker, rewardRewarderPrice);
    _print("");
    return apr;
  }

  function printRewarderAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek,
                    stakeTokenTicker, staked_tvl, userStaked, poolTokenPrice,
                    fixedDecimals, poolRewarderRewardsPerWeek, rewardRewarderPrice, rewarderTicker) {
    var usdPerWeek = poolRewardsPerWeek * rewardPrice;
    var usdRewarderPerWeek = poolRewarderRewardsPerWeek * rewardRewarderPrice;
    fixedDecimals = fixedDecimals ?? 2;
    _print(`${rewardTokenTicker} Per Week: ${poolRewardsPerWeek.toFixed(fixedDecimals)} ($${formatMoney(usdPerWeek)})`);
    _print(`${rewarderTicker} Per Week: ${poolRewarderRewardsPerWeek.toFixed(fixedDecimals)} ($${formatMoney(usdRewarderPerWeek)})`);
    var weeklyAPR = usdPerWeek / staked_tvl * 100;
    var dailyAPR = weeklyAPR / 7;
    var yearlyAPR = weeklyAPR * 52;
    var weeklyRewarderAPR = usdRewarderPerWeek / staked_tvl * 100;
    var dailyRewarderAPR = weeklyRewarderAPR / 7;
    var yearlyRewarderAPR = weeklyRewarderAPR * 52;
    let totalDailyAPR = dailyAPR + dailyRewarderAPR;
    let totalWeeklyAPR = weeklyAPR + weeklyRewarderAPR;
    let totalYearlyAPR = yearlyRewarderAPR + yearlyAPR;
    let totalUSDPerWeek = usdPerWeek + usdRewarderPerWeek;
    _print(`APR ${rewardTokenTicker}: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
    _print(`APR ${rewarderTicker}: Day ${dailyRewarderAPR.toFixed(2)}% Week ${weeklyRewarderAPR.toFixed(2)}% Year ${yearlyRewarderAPR.toFixed(2)}%`);
    var userStakedUsd = userStaked * poolTokenPrice;
    var userStakedPct = userStakedUsd / staked_tvl * 100;
    _print(`Total Per Week: $${formatMoney(totalUSDPerWeek)}`);
    _print(`Total APR: Day ${totalDailyAPR.toFixed(4)}% Week ${totalWeeklyAPR.toFixed(2)}% Year ${totalYearlyAPR.toFixed(2)}%`);
    _print(`You are staking ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
    var userWeeklyRewards = userStakedPct * poolRewardsPerWeek / 100;
    var userRewarderWeeklyRewards = userStakedPct * poolRewarderRewardsPerWeek / 100;
    var userDailyRewards = userWeeklyRewards / 7;
    var userRewarderDailyRewards = userRewarderWeeklyRewards / 7;
    var userYearlyRewards = userWeeklyRewards * 52;
    var userRewarderYearlyRewards = userRewarderWeeklyRewards * 52;
    if (userStaked > 0) {
      _print(`Estimated Total earnings:`
          + ` Day ($${formatMoney(userDailyRewards*rewardPrice+userRewarderDailyRewards*rewardRewarderPrice)})`
          + ` Week ($${formatMoney(userWeeklyRewards*rewardPrice+userRewarderWeeklyRewards*rewardRewarderPrice)})`
          + ` Year ($${formatMoney(userYearlyRewards*rewardPrice+userRewarderYearlyRewards*rewardRewarderPrice)})`);
    }
    return {
      userStakedUsd,
      totalStakedUsd : staked_tvl,
      userStakedPct,
      yearlyAPR : totalYearlyAPR,
      userYearlyUsd : userYearlyRewards * rewardPrice + userRewarderYearlyRewards * rewardRewarderPrice
    }
  }

function printRewarderContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, pendingRewardsFunction,
    rewardTokenTicker, stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, fixedDecimals, rewardTokenPrice, pendingRewarderTokens,
    rewarderTicker, rewardRewarderPrice) {
  fixedDecimals = fixedDecimals ?? 2;
  const approveAndStake = async function() {
    return beethovenContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
  }
  const unstake = async function() {
    return beethovenContract_unstake(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction)
  }
  const claim = async function() {
    return beethovenContract_claim(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction, claimFunction)
  }
  _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
  _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
  _print_link(`Claim ${pendingRewardTokens.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(pendingRewardTokens*rewardTokenPrice)}) + ${pendingRewarderTokens.toFixed(fixedDecimals)} ${rewarderTicker} ($${formatMoney(pendingRewarderTokens*rewardRewarderPrice)})`, claim)
  _print(`Staking or unstaking also claims rewards.`)
}

function printBeetsNormalPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
                       totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                       pendingRewardsFunction, fixedDecimals, claimFunction, chain="eth", depositFee=0, withdrawFee=0) {
  fixedDecimals = fixedDecimals ?? 2;
  const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
  var poolRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek;
  if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
  const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
  const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
  _print_inline(`${poolIndex} - `);
  poolPrices.print_price(chain);
  sp?.print_price(chain);
  const apr = printAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
    staked_tvl, userStaked, poolPrices.price, fixedDecimals);
  if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
  printBeetsNormalContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
    rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
    poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, claimFunction, rewardPrice, chain, depositFee, withdrawFee);
  return apr;
}

function printBeetsNormalContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, pendingRewardsFunction,
    rewardTokenTicker, stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, fixedDecimals,
    claimFunction, rewardTokenPrice, chain, depositFee, withdrawFee) {
  fixedDecimals = fixedDecimals ?? 2;
  const approveAndStake = async function() {
    return beethovenContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
  }
  const unstake = async function() {
    return beethovenContract_unstake(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction)
  }
  const claim = async function() {
    return beethovenContract_claim(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction, claimFunction)
  }
  if(depositFee > 0){
    _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${depositFee}%`, approveAndStake)
  }else{
    _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
  }
  if(withdrawFee > 0){
    _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${withdrawFee}%`, unstake)
  }else{
    _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
  }
  _print_link(`Claim ${pendingRewardTokens.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(pendingRewardTokens*rewardTokenPrice)})`, claim)
  _print(`Staking or unstaking also claims rewards.`)
  _print("");
}

const beethovenContract_stake = async function(chefAbi, chefAddress, poolIndex, stakeTokenAddr, App) {
  const signer = App.provider.getSigner()

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, chefAddress)

  let allow = Promise.resolve()

  if (allowedTokens / 1e18 < currentTokens / 1e18) {
    showLoading()
    allow = STAKING_TOKEN.approve(chefAddress, ethers.constants.MaxUint256)
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
          CHEF_CONTRACT.deposit(poolIndex, currentTokens, App.YOUR_ADDRESS, {gasLimit: 500000})
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

const beethovenContract_unstake = async function(chefAbi, chefAddress, poolIndex, App, pendingRewardsFunction) {
  const signer = App.provider.getSigner()
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const currentStakedAmount = (await CHEF_CONTRACT.userInfo(poolIndex, App.YOUR_ADDRESS)).amount
  const earnedTokenAmount = await CHEF_CONTRACT.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS) / 1e18

  if (earnedTokenAmount > 0) {
    showLoading()
    CHEF_CONTRACT.withdrawAndHarvest(poolIndex, currentStakedAmount, App.YOUR_ADDRESS, {gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const beethovenContract_claim = async function(chefAbi, chefAddress, poolIndex, App,
    pendingRewardsFunction, claimFunction) {
  const signer = App.provider.getSigner()

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const earnedTokenAmount = await CHEF_CONTRACT.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS) / 1e18

  if (earnedTokenAmount > 0) {
    showLoading()
    if (claimFunction) {
      claimFunction(poolIndex, {gasLimit: 500000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
    }
    else {
      CHEF_CONTRACT.harvest(poolIndex, App.YOUR_ADDRESS, {gasLimit: 500000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }
  }
}

async function loadSolidlySynthetixPoolInfoPrice(App, tokens, prices, stakingAddress, stakeTokenAddress) {
    var stakeToken = await getFantomToken(App, stakeTokenAddress, stakingAddress);
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
        tokens[address] = await getFantomToken(App, address, stakingAddress);
    }
    const poolPrices = getPoolPrices(tokens, prices, stakeToken, "fantom");

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
