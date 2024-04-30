
$(function() {
consoleInit(main)
});

const FLOW_VOTER_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"__ve","internalType":"address"},{"type":"address","name":"_factory","internalType":"address"},{"type":"address","name":"_gauges","internalType":"address"},{"type":"address","name":"_bribes","internalType":"address"},{"type":"address","name":"_wrappedxbribefactory","internalType":"address"}]},{"type":"event","name":"Abstained","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256","indexed":false},{"type":"uint256","name":"weight","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Attach","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"gauge","internalType":"address","indexed":true},{"type":"uint256","name":"tokenId","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Deposit","inputs":[{"type":"address","name":"lp","internalType":"address","indexed":true},{"type":"address","name":"gauge","internalType":"address","indexed":true},{"type":"uint256","name":"tokenId","internalType":"uint256","indexed":false},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Detach","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"gauge","internalType":"address","indexed":true},{"type":"uint256","name":"tokenId","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"DistributeReward","inputs":[{"type":"address","name":"sender","internalType":"address","indexed":true},{"type":"address","name":"gauge","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"GaugeCreated","inputs":[{"type":"address","name":"gauge","internalType":"address","indexed":true},{"type":"address","name":"creator","internalType":"address","indexed":false},{"type":"address","name":"internal_bribe","internalType":"address","indexed":false},{"type":"address","name":"external_bribe","internalType":"address","indexed":true},{"type":"address","name":"wxbribe","internalType":"address","indexed":false},{"type":"address","name":"pool","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"GaugeKilled","inputs":[{"type":"address","name":"gauge","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"GaugeRevived","inputs":[{"type":"address","name":"gauge","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"NotifyReward","inputs":[{"type":"address","name":"sender","internalType":"address","indexed":true},{"type":"address","name":"reward","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Voted","inputs":[{"type":"address","name":"voter","internalType":"address","indexed":true},{"type":"uint256","name":"tokenId","internalType":"uint256","indexed":false},{"type":"uint256","name":"weight","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Whitelisted","inputs":[{"type":"address","name":"whitelister","internalType":"address","indexed":true},{"type":"address","name":"token","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Withdraw","inputs":[{"type":"address","name":"lp","internalType":"address","indexed":true},{"type":"address","name":"gauge","internalType":"address","indexed":true},{"type":"uint256","name":"tokenId","internalType":"uint256","indexed":false},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"_ve","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"attachTokenToGauge","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"},{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"bribefactory","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"claimBribes","inputs":[{"type":"address[]","name":"_bribes","internalType":"address[]"},{"type":"address[][]","name":"_tokens","internalType":"address[][]"},{"type":"uint256","name":"_tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"claimFees","inputs":[{"type":"address[]","name":"_fees","internalType":"address[]"},{"type":"address[][]","name":"_tokens","internalType":"address[][]"},{"type":"uint256","name":"_tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"claimRewards","inputs":[{"type":"address[]","name":"_gauges","internalType":"address[]"},{"type":"address[][]","name":"_tokens","internalType":"address[][]"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"claimable","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"createGauge","inputs":[{"type":"address","name":"_pool","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"detachTokenFromGauge","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"},{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"distribute","inputs":[{"type":"address[]","name":"_gauges","internalType":"address[]"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"distribute","inputs":[{"type":"address","name":"_gauge","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"distribute","inputs":[{"type":"uint256","name":"start","internalType":"uint256"},{"type":"uint256","name":"finish","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"distribute","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"distributeFees","inputs":[{"type":"address[]","name":"_gauges","internalType":"address[]"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"distro","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"emergencyCouncil","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"emitDeposit","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"},{"type":"address","name":"account","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"emitWithdraw","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"},{"type":"address","name":"account","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"external_bribes","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"factory","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"gaugefactory","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"gauges","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"governor","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"initialize","inputs":[{"type":"address[]","name":"_tokens","internalType":"address[]"},{"type":"address","name":"_minter","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"internal_bribes","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isAlive","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isGauge","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isWhitelisted","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"killGauge","inputs":[{"type":"address","name":"_gauge","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastVoted","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"length","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"minter","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"notifyRewardAmount","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"poke","inputs":[{"type":"uint256","name":"_tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"poolForGauge","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"poolVote","inputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"pools","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"reset","inputs":[{"type":"uint256","name":"_tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"reviveGauge","inputs":[{"type":"address","name":"_gauge","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setEmergencyCouncil","inputs":[{"type":"address","name":"_council","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setGovernor","inputs":[{"type":"address","name":"_governor","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalWeight","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateAll","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateFor","inputs":[{"type":"address[]","name":"_gauges","internalType":"address[]"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateForRange","inputs":[{"type":"uint256","name":"start","internalType":"uint256"},{"type":"uint256","name":"end","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateGauge","inputs":[{"type":"address","name":"_gauge","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"usedWeights","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"vote","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"},{"type":"address[]","name":"_poolVote","internalType":"address[]"},{"type":"uint256[]","name":"_weights","internalType":"uint256[]"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"votes","inputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"weights","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"whitelist","inputs":[{"type":"address","name":"_token","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"wrappedxbribefactory","inputs":[]}]

const FLOW_GAUGE_ABI = [{"inputs":[{"internalType":"address","name":"_forwarder","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"address","name":"_feesVotingReward","type":"address"},{"internalType":"address","name":"_rewardToken","type":"address"},{"internalType":"address","name":"_voter","type":"address"},{"internalType":"bool","name":"_isPool","type":"bool"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"NotAlive","type":"error"},{"inputs":[],"name":"NotAuthorized","type":"error"},{"inputs":[],"name":"NotTeam","type":"error"},{"inputs":[],"name":"NotVoter","type":"error"},{"inputs":[],"name":"RewardRateTooHigh","type":"error"},{"inputs":[],"name":"ZeroAmount","type":"error"},{"inputs":[],"name":"ZeroRewardRate","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"claimed0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"claimed1","type":"uint256"}],"name":"ClaimFees","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ClaimRewards","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"NotifyReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_recipient","type":"address"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fees0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fees1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feesVotingReward","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isPool","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"forwarder","type":"address"}],"name":"isTrustedForwarder","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"left","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"notifyRewardWithoutClaim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardRateByEpoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakingToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ve","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"voter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const SICKLE_FACTORY_ABI = [{"inputs":[{"internalType":"address","name":"admin_","type":"address"},{"internalType":"address","name":"sickleRegistry_","type":"address"},{"internalType":"address","name":"sickleImplementation_","type":"address"},{"internalType":"address","name":"previousFactory_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"caller","type":"address"}],"name":"CallerNotWhitelisted","type":"error"},{"inputs":[],"name":"NotActive","type":"error"},{"inputs":[],"name":"NotAdminError","type":"error"},{"inputs":[],"name":"SickleAlreadyDeployed","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"admin","type":"address"},{"indexed":false,"internalType":"address","name":"sickle","type":"address"}],"name":"Deploy","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_referralCodes","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"sickle","type":"address"}],"name":"admins","outputs":[{"internalType":"address","name":"admin","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"approved","type":"address"},{"internalType":"bytes32","name":"referralCode","type":"bytes32"}],"name":"deploy","outputs":[{"internalType":"address","name":"sickle","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"admin","type":"address"},{"internalType":"address","name":"approved","type":"address"},{"internalType":"bytes32","name":"referralCode","type":"bytes32"}],"name":"getOrDeploy","outputs":[{"internalType":"address","name":"sickle","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"implementation","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"admin","type":"address"}],"name":"predict","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"previousFactory","outputs":[{"internalType":"contract SickleFactory","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"sickle","type":"address"}],"name":"referralCodes","outputs":[{"internalType":"bytes32","name":"referralCode","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"registry","outputs":[{"internalType":"contract SickleRegistry","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"active","type":"bool"}],"name":"setActive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAdmin","type":"address"}],"name":"setAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"admin","type":"address"}],"name":"sickles","outputs":[{"internalType":"address","name":"sickle","type":"address"}],"stateMutability":"view","type":"function"}]

const SICKLE_ABI = [{"inputs":[{"internalType":"address","name":"sickleRegistry_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"caller","type":"address"}],"name":"CallerNotWhitelisted","type":"error"},{"inputs":[],"name":"MulticallParamsMismatchError","type":"error"},{"inputs":[],"name":"NotOwnerError","type":"error"},{"inputs":[],"name":"NotStrategyError","type":"error"},{"inputs":[{"internalType":"address","name":"target","type":"address"}],"name":"TargetNotWhitelisted","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"inputs":[],"name":"approved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"sickleOwner_","type":"address"},{"internalType":"address","name":"approved_","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"caller","type":"address"}],"name":"isOwnerOrApproved","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"targets","type":"address[]"},{"internalType":"bytes[]","name":"data","type":"bytes[]"}],"name":"multicall","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC1155BatchReceived","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC1155Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"registry","outputs":[{"internalType":"contract SickleRegistry","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newApproved","type":"address"}],"name":"setApproved","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

const CL_GAUGE_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"claimed0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"claimed1","type":"uint256"}],"name":"ClaimFees","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ClaimRewards","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"uint128","name":"liquidityToStake","type":"uint128"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"NotifyReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"uint128","name":"liquidityToStake","type":"uint128"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"WETH9","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"decreaseStakedLiquidity","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fees0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fees1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feesVotingReward","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"gaugeFactory","outputs":[{"internalType":"contract ICLGaugeFactory","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount0Desired","type":"uint256"},{"internalType":"uint256","name":"amount1Desired","type":"uint256"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"increaseStakedLiquidity","outputs":[{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_pool","type":"address"},{"internalType":"address","name":"_feesVotingReward","type":"address"},{"internalType":"address","name":"_rewardToken","type":"address"},{"internalType":"address","name":"_voter","type":"address"},{"internalType":"address","name":"_nft","type":"address"},{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"},{"internalType":"int24","name":"_tickSpacing","type":"int24"},{"internalType":"bool","name":"_isPool","type":"bool"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isPool","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"left","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nft","outputs":[{"internalType":"contract INonfungiblePositionManager","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"notifyRewardWithoutClaim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pool","outputs":[{"internalType":"contract ICLPool","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardGrowthInside","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardRateByEpoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"stakedByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"stakedContains","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"}],"name":"stakedLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"}],"name":"stakedValues","outputs":[{"internalType":"uint256[]","name":"staked","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"supportsPayable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tickSpacing","outputs":[{"internalType":"int24","name":"","type":"int24"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"voter","outputs":[{"internalType":"contract IVoter","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

const CL_TOKEN_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"int24","name":"tickLower","type":"int24"},{"indexed":true,"internalType":"int24","name":"tickUpper","type":"int24"},{"indexed":false,"internalType":"uint128","name":"amount","type":"uint128"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"address","name":"recipient","type":"address"},{"indexed":true,"internalType":"int24","name":"tickLower","type":"int24"},{"indexed":true,"internalType":"int24","name":"tickUpper","type":"int24"},{"indexed":false,"internalType":"uint128","name":"amount0","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"amount1","type":"uint128"}],"name":"Collect","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint128","name":"amount0","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"amount1","type":"uint128"}],"name":"CollectFees","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"paid0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"paid1","type":"uint256"}],"name":"Flash","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"observationCardinalityNextOld","type":"uint16"},{"indexed":false,"internalType":"uint16","name":"observationCardinalityNextNew","type":"uint16"}],"name":"IncreaseObservationCardinalityNext","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint160","name":"sqrtPriceX96","type":"uint160"},{"indexed":false,"internalType":"int24","name":"tick","type":"int24"}],"name":"Initialize","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"int24","name":"tickLower","type":"int24"},{"indexed":true,"internalType":"int24","name":"tickUpper","type":"int24"},{"indexed":false,"internalType":"uint128","name":"amount","type":"uint128"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"feeProtocol0Old","type":"uint8"},{"indexed":false,"internalType":"uint8","name":"feeProtocol1Old","type":"uint8"},{"indexed":false,"internalType":"uint8","name":"feeProtocol0New","type":"uint8"},{"indexed":false,"internalType":"uint8","name":"feeProtocol1New","type":"uint8"}],"name":"SetFeeProtocol","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"int256","name":"amount0","type":"int256"},{"indexed":false,"internalType":"int256","name":"amount1","type":"int256"},{"indexed":false,"internalType":"uint160","name":"sqrtPriceX96","type":"uint160"},{"indexed":false,"internalType":"uint128","name":"liquidity","type":"uint128"},{"indexed":false,"internalType":"int24","name":"tick","type":"int24"}],"name":"Swap","type":"event"},{"inputs":[{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint128","name":"amount","type":"uint128"},{"internalType":"address","name":"owner","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint128","name":"amount","type":"uint128"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint128","name":"amount0Requested","type":"uint128"},{"internalType":"uint128","name":"amount1Requested","type":"uint128"},{"internalType":"address","name":"owner","type":"address"}],"name":"collect","outputs":[{"internalType":"uint128","name":"amount0","type":"uint128"},{"internalType":"uint128","name":"amount1","type":"uint128"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint128","name":"amount0Requested","type":"uint128"},{"internalType":"uint128","name":"amount1Requested","type":"uint128"}],"name":"collect","outputs":[{"internalType":"uint128","name":"amount0","type":"uint128"},{"internalType":"uint128","name":"amount1","type":"uint128"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"collectFees","outputs":[{"internalType":"uint128","name":"amount0","type":"uint128"},{"internalType":"uint128","name":"amount1","type":"uint128"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"factoryRegistry","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fee","outputs":[{"internalType":"uint24","name":"","type":"uint24"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeGrowthGlobal0X128","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeGrowthGlobal1X128","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"flash","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"gauge","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"gaugeFees","outputs":[{"internalType":"uint128","name":"token0","type":"uint128"},{"internalType":"uint128","name":"token1","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint256","name":"_rewardGrowthGlobalX128","type":"uint256"}],"name":"getRewardGrowthInside","outputs":[{"internalType":"uint256","name":"rewardGrowthInside","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"observationCardinalityNext","type":"uint16"}],"name":"increaseObservationCardinalityNext","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"},{"internalType":"int24","name":"_tickSpacing","type":"int24"},{"internalType":"address","name":"_factoryRegistry","type":"address"},{"internalType":"uint160","name":"_sqrtPriceX96","type":"uint160"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lastUpdated","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidity","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxLiquidityPerTick","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint128","name":"amount","type":"uint128"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"mint","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"nft","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"observations","outputs":[{"internalType":"uint32","name":"blockTimestamp","type":"uint32"},{"internalType":"int56","name":"tickCumulative","type":"int56"},{"internalType":"uint160","name":"secondsPerLiquidityCumulativeX128","type":"uint160"},{"internalType":"bool","name":"initialized","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32[]","name":"secondsAgos","type":"uint32[]"}],"name":"observe","outputs":[{"internalType":"int56[]","name":"tickCumulatives","type":"int56[]"},{"internalType":"uint160[]","name":"secondsPerLiquidityCumulativeX128s","type":"uint160[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"positions","outputs":[{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"feeGrowthInside0LastX128","type":"uint256"},{"internalType":"uint256","name":"feeGrowthInside1LastX128","type":"uint256"},{"internalType":"uint128","name":"tokensOwed0","type":"uint128"},{"internalType":"uint128","name":"tokensOwed1","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardGrowthGlobalX128","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardReserve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rollover","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_gauge","type":"address"},{"internalType":"address","name":"_nft","type":"address"}],"name":"setGaugeAndPositionManager","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"slot0","outputs":[{"internalType":"uint160","name":"sqrtPriceX96","type":"uint160"},{"internalType":"int24","name":"tick","type":"int24"},{"internalType":"uint16","name":"observationIndex","type":"uint16"},{"internalType":"uint16","name":"observationCardinality","type":"uint16"},{"internalType":"uint16","name":"observationCardinalityNext","type":"uint16"},{"internalType":"bool","name":"unlocked","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"}],"name":"snapshotCumulativesInside","outputs":[{"internalType":"int56","name":"tickCumulativeInside","type":"int56"},{"internalType":"uint160","name":"secondsPerLiquidityInsideX128","type":"uint160"},{"internalType":"uint32","name":"secondsInside","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"int128","name":"stakedLiquidityDelta","type":"int128"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"bool","name":"positionUpdate","type":"bool"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakedLiquidity","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"bool","name":"zeroForOne","type":"bool"},{"internalType":"int256","name":"amountSpecified","type":"int256"},{"internalType":"uint160","name":"sqrtPriceLimitX96","type":"uint160"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[{"internalType":"int256","name":"amount0","type":"int256"},{"internalType":"int256","name":"amount1","type":"int256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardRate","type":"uint256"},{"internalType":"uint256","name":"_rewardReserve","type":"uint256"},{"internalType":"uint256","name":"_periodFinish","type":"uint256"}],"name":"syncReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"int16","name":"","type":"int16"}],"name":"tickBitmap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tickSpacing","outputs":[{"internalType":"int24","name":"","type":"int24"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"int24","name":"","type":"int24"}],"name":"ticks","outputs":[{"internalType":"uint128","name":"liquidityGross","type":"uint128"},{"internalType":"int128","name":"liquidityNet","type":"int128"},{"internalType":"int128","name":"stakedLiquidityNet","type":"int128"},{"internalType":"uint256","name":"feeGrowthOutside0X128","type":"uint256"},{"internalType":"uint256","name":"feeGrowthOutside1X128","type":"uint256"},{"internalType":"uint256","name":"rewardGrowthOutsideX128","type":"uint256"},{"internalType":"int56","name":"tickCumulativeOutside","type":"int56"},{"internalType":"uint160","name":"secondsPerLiquidityOutsideX128","type":"uint160"},{"internalType":"uint32","name":"secondsOutside","type":"uint32"},{"internalType":"bool","name":"initialized","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unstakedFee","outputs":[{"internalType":"uint24","name":"","type":"uint24"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"updateRewardsGrowthGlobal","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const NFT_AERO_ABI = [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WETH9","type":"address"},{"internalType":"address","name":"_tokenDescriptor","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_fromTokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_toTokenId","type":"uint256"}],"name":"BatchMetadataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Collect","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint128","name":"liquidity","type":"uint128"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"DecreaseLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint128","name":"liquidity","type":"uint128"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"IncreaseLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"MetadataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"tokenDescriptor","type":"address"}],"name":"TokenDescriptorChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"}],"name":"TransferOwnership","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WETH9","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint128","name":"amount0Max","type":"uint128"},{"internalType":"uint128","name":"amount1Max","type":"uint128"}],"internalType":"struct INonfungiblePositionManager.CollectParams","name":"params","type":"tuple"}],"name":"collect","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"internalType":"struct INonfungiblePositionManager.DecreaseLiquidityParams","name":"params","type":"tuple"}],"name":"decreaseLiquidity","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount0Desired","type":"uint256"},{"internalType":"uint256","name":"amount1Desired","type":"uint256"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"internalType":"struct INonfungiblePositionManager.IncreaseLiquidityParams","name":"params","type":"tuple"}],"name":"increaseLiquidity","outputs":[{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"token0","type":"address"},{"internalType":"address","name":"token1","type":"address"},{"internalType":"int24","name":"tickSpacing","type":"int24"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint256","name":"amount0Desired","type":"uint256"},{"internalType":"uint256","name":"amount1Desired","type":"uint256"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint160","name":"sqrtPriceX96","type":"uint160"}],"internalType":"struct INonfungiblePositionManager.MintParams","name":"params","type":"tuple"}],"name":"mint","outputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"data","type":"bytes[]"}],"name":"multicall","outputs":[{"internalType":"bytes[]","name":"results","type":"bytes[]"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"positions","outputs":[{"internalType":"uint96","name":"nonce","type":"uint96"},{"internalType":"address","name":"operator","type":"address"},{"internalType":"address","name":"token0","type":"address"},{"internalType":"address","name":"token1","type":"address"},{"internalType":"int24","name":"tickSpacing","type":"int24"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"feeGrowthInside0LastX128","type":"uint256"},{"internalType":"uint256","name":"feeGrowthInside1LastX128","type":"uint256"},{"internalType":"uint128","name":"tokensOwed0","type":"uint128"},{"internalType":"uint128","name":"tokensOwed1","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"refundETH","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermitAllowed","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermitAllowedIfNecessary","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermitIfNecessary","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"setOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenDescriptor","type":"address"}],"name":"setTokenDescriptor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"}],"name":"sweepToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenDescriptor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount0Owed","type":"uint256"},{"internalType":"uint256","name":"amount1Owed","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"uniswapV3MintCallback","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"}],"name":"unwrapWETH9","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]

async function main() {
  const App = await init_ethers();

  let clicked = false;

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");
  _print("This may take few minutes, please be patient...\n");

  const tokens = {};
  const prices = await getBasePrices();

  const FLOW_VOTER_ADDR = "0x16613524e02ad97eDfeF371bC883F2F5d6C480A5"
  const FLOW_VOTER_CONTRACT = new ethcall.Contract(FLOW_VOTER_ADDR, FLOW_VOTER_ABI);
  const FLOW_TOKEN_ADDR = "0x940181a94a35a4569e4529a3cdfb74e38fd98631"

  let lpTokens = [], arrayOfGauges = [], calls = [], calls2 = [];

  const [_poolLength] = await App.ethcallProvider.all([FLOW_VOTER_CONTRACT.length()]);
  const poolLength = _poolLength / 1;
  const _calls = [...Array(poolLength).keys()].map(i => FLOW_VOTER_CONTRACT.pools(i));
  while (_calls.length > 0) {
    calls.push(_calls.splice(0, 60));
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

  const SICKLE_FACTORY_ADDR = "0x71D234A3e1dfC161cc1d081E6496e76627baAc31";
  const SICKLE_FACTORY = new ethers.Contract(SICKLE_FACTORY_ADDR, SICKLE_FACTORY_ABI, App.provider);

  const sickle_account_address = await SICKLE_FACTORY.sickles(App.YOUR_ADDRESS);
  const has_sickle_account = sickle_account_address === "0x0000000000000000000000000000000000000000" ? false : true;
  const owner_sickle_address = App.YOUR_ADDRESS;

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
  "0xF7E12191EAa4EC540AAfaE1c9289E1F00912c63f",
  "0x19E4EF08CC826B566b98aAd7e959691b28EeA965",
  "0x9ed29B9518DD807b19d1bC8E3045246094Da81A8",
  "0x41678d68dea4f6b5EFecA5882406903fE668b527",
  "0x53431b835C4dFf80c0Ac585907dc50251047C6c1",
  "0x154123d7090dC7B712C7bfc0DC0C247d574D7E69",
  "0x6F00D370D951742Fb4EC6C5a065ABDbbC612444b",
  "0xE9a2183aC35768Fb187620672C0CeB9e53381ABa",
  "0xAe4ad2d6f5fE6ec886f3492EEd2F7da396f94a09",
  "0xC92fA3538bC7075143BaE69850E5394c8d530C88",
  "0x1DcC0e87b89FB316BE5C3C13585193244aEbaf05",
  "0x025EDE7dafE9E6Ebf6Dd1EF72deD084371cd0e48",
  "0x18157558c6CEBe6b76764DE1F211321EBBB8CD6A",
  "0x81ec6143F0B65b1576A6F5a34740d8Cc39DB3d3b",
  "0x557f885c63a287D0b969BCcEbc1C29c1E02b4eeC",
  "0x8A07161e21A91D7EEc4Aab9A2073f9672edd6fA6",
  "0x67bDce361CDCC671b056Eeec1a97c11d3CD1a1fF",
  "0x4a5B0dc1aB3E195C805E3352cF8cF025d4fD9945"
].map(a => {
  return {
    address: a,
    abi: CL_GAUGE_ABI,
    stakeTokenFunction: "pool"
  }
})

  await loadFlowSynthetixPoolInfoPrice(App, tokens, prices, "0x2223F9FE624F69Da4D8256A7bCc9104FBA7F8f75", "0x2223F9FE624F69Da4D8256A7bCc9104FBA7F8f75");

  if(has_sickle_account) {
    _print_bold(`You have connected with your sickle account: ${sickle_account_address}`);
    _print("Your positions are");
    _print("");
    App.YOUR_ADDRESS = sickle_account_address;

    let p = await loadFlowSynthetixPools(App, tokens, prices, gauges, has_sickle_account)
    _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}\n`);
    if (p.totalUserStaked > 0) {
      _print(`You are staking a total of $${formatMoney(p.totalUserStaked)}\n`);
      _print("");
    }

    _print_bold(`CL POOLS`)
    _print_bold(`------------------------------------`)
    _print(``)

    let cl = await loadClSynthetixPools(App, tokens, prices, clGauges, has_sickle_account)
    if (cl.totalUserStaked > 0) {
      _print(`You are staking a total of ${cl.totalUserStaked} NFTs\n`);
      _print("");
    }

    hideLoading();

  }else{
    let p = await loadFlowSynthetixPools(App, tokens, prices, gauges, has_sickle_account)
    _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}\n`);
    if (p.totalUserStaked > 0) {
      _print(`You are staking a total of $${formatMoney(p.totalUserStaked)}\n`);
      _print("");
    }

    _print_bold(`CL POOLS`)
    _print_bold(`------------------------------------`)
    _print(``)

    let cl = await loadClSynthetixPools(App, tokens, prices, clGauges, has_sickle_account)
    if (cl.totalUserStaked > 0) {
      _print(`You are staking a total of ${cl.totalUserStaked} NFTs\n`);
      _print("");
    }

    hideLoading();
  }
}

async function loadClSynthetixPools(App, tokens, prices, pools, has_sickle_account, customURLs) {
  let totalUserStaked = 0;
  const infos = await Promise.all(pools.map(p =>
    loadClSynthetixPoolInfo(App, tokens, prices, p.abi, p.address, p.stakeTokenFunction, has_sickle_account)));
  for (const i of infos) {
    let p = await printAerodromeClPool(App, i, "base", customURLs);
    totalUserStaked += p.userStaked || 0;
  }
  return { totalUserStaked };
}

async function loadClSynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
  stakeTokenFunction, has_sickle_account) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);

    let stakeTokenAddress = "";
    try{
      stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();
    }catch{
      return {
        stakingAddress: "",
        stakeTokenAddress: "",
        rewardTokenAddress: "",
        stakeTokenTicker: "",
        rewardTokenTicker: "",
        rewardTokenPrice: 0,
        weeklyRewards: 0,
        usdPerWeek: 0,
        userStaked: 0,
        earnings: 0,
        totalStakedNfts: 0,
        has_sickle_account: false
      }
    }
    
    const clPool = new ethers.Contract(stakeTokenAddress, CL_TOKEN_ABI, App.provider);

    const tokenAddress0 = await clPool.token0();
    const tokenAddress1 = await clPool.token1();

    const token0 = new ethers.Contract(tokenAddress0, ERC20_ABI, App.provider);
    const token1 = new ethers.Contract(tokenAddress1, ERC20_ABI, App.provider);

    const stakeToken = await getClToken(token0, token1, stakingAddress);

    const rewardTokenAddress = "0x940181a94a35a4569e4529a3cdfb74e38fd98631";

    const nftTokenAddress = await STAKING_POOL.nft();
    const nftToken = new ethers.Contract(nftTokenAddress, NFT_AERO_ABI, App.provider);
    let userOwnedNfts = await nftToken.balanceOf(App.YOUR_ADDRESS) / 1;
    let userOwnedNftIds = []

    for(let i = 0; i < userOwnedNfts; i++){
      const userOwnedNftId = await nftToken.tokenOfOwnerByIndex(App.YOUR_ADDRESS, i);
      userOwnedNftIds.push(userOwnedNftId);
    }

    const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);

    // const stakeTokenTicker = await nftToken.name();
    const stakeTokenTicker = stakeToken.symbol0 + '-' + stakeToken.symbol1;
    const rewardTokenTicker = rewardToken.symbol;

    const totalStakedNfts = await nftToken.balanceOf(stakingAddress);

    const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;

    const periodFinish = await STAKING_POOL.periodFinish();
    const rewardRate = await STAKING_POOL.rewardRate();
    const weeklyRewards = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate / 1e18 * 604800;

    const usdPerWeek = weeklyRewards * rewardTokenPrice;

    const userStakedNfts = await STAKING_POOL.stakedValues(App.YOUR_ADDRESS);
    const userStaked = userStakedNfts.length;

    let earnings = [];

    for(const userNft of userStakedNfts){
      const earned = await STAKING_POOL.earned(App.YOUR_ADDRESS, userNft) / 10 ** rewardToken.decimals;
      earnings.push(earned);
    }

    return  {
      stakingAddress,
      stakeTokenAddress,
      rewardTokenAddress,
      stakeTokenTicker,
      rewardTokenTicker,
      rewardTokenPrice,
      weeklyRewards,
      usdPerWeek,
      userStaked,
      earnings,
      totalStakedNfts,
      userOwnedNftIds,
      userStakedNfts,
      has_sickle_account
    }
}

async function printAerodromeClPool(App, info, chain="eth", customURLs) {
  if(info.has_sickle_account && info.userStaked <= 0){
    return {
      userStaked : 0,
    }
  }
    _print(`Pool - ${info.stakeTokenTicker}`)
    _print(`${info.rewardTokenTicker} Per Week: ${info.weeklyRewards.toFixed(2)} ($${formatMoney(info.usdPerWeek)})`);
    _print(`You are staking ${info.userStaked} ${info.stakeTokenTicker}`);
    for(userStakedNft of info.userStakedNfts){
      _print(`Nft ID: ${userStakedNft}`)
    }

    const approveTENDAndStake = async function(nftId) {
      return clContract_stake(info.stakingAddress, nftId, App)
    }
    const unstake = async function(nftId) {
      return clContract_withdraw(info.stakingAddress, nftId, App)
    }
    const claim = async function(nftId) {
      return clContract_claim(info.stakingAddress, nftId, App)
    }
    _print(`<a target="_blank" href="https://basescan.org/address/${info.stakingAddress}#code">Base Scan</a>`);
    if(info.userOwnedNftIds.length <= 0){
      _print(`You have no NFTs to deposit`);
    }else{
      for(const userOwnedNftId of info.userOwnedNftIds){
        _print_link(`Deposit NFT with ID: ${userOwnedNftId}`, () => approveTENDAndStake(userOwnedNftId))
      }
    }
    if(info.userStakedNfts.length <= 0){
      _print(`You have not staked NFTs in order to withdraw`);
    }else{
      for(const userStakedNft of info.userStakedNfts){
        _print_link(`Withdraw NFT with ID: ${userStakedNft}`, () => unstake(userStakedNft))
      }
    }
    for(let i = 0; i < info.userStakedNfts.length; i++){
      _print_link(`Claim rewards, NFT ID: ${info.userStakedNfts[i]} ${info.earnings[i].toFixed(6)} ($${formatMoney(info.earnings[i]*info.rewardTokenPrice)})`, () => claim(info.userStakedNfts[i]))
    }
    _print("");

    return {
        userStaked : info.userStaked
    }
}

const clContract_stake = async function(rewardPoolAddr, nftId, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(rewardPoolAddr, CL_GAUGE_ABI, signer)

    showLoading()
    REWARD_POOL.deposit(nftId, {gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
}

const clContract_withdraw = async function(rewardPoolAddr, nftId, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(rewardPoolAddr, CL_GAUGE_ABI, signer)

    showLoading()
    REWARD_POOL.withdraw(nftId, {gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
}

const clContract_claim = async function(rewardPoolAddr, nftId, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(rewardPoolAddr, CL_GAUGE_ABI, signer)

    showLoading()
    REWARD_POOL.getReward(nftId, {gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
}

async function loadFlowSynthetixPools(App, tokens, prices, pools, has_sickle_account, customURLs) {
  let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
  const infos = await Promise.all(pools.map(p =>
    loadFlowSynthetixPoolInfo(App, tokens, prices, p.abi, p.address, p.stakeTokenFunction, has_sickle_account)));
  for (const i of infos.filter(i => i?.poolPrices)) {
    let p = await printAerodromePool(App, i, "base", customURLs);
    totalStaked += p.staked_tvl || 0;
    totalUserStaked += p.userStaked || 0;
    if (p.userStaked > 0) {
      individualAPRs.push(p.userStaked * p.apr / 100);
    }
  }
  let totalAPR = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
  return { staked_tvl : totalStaked, totalUserStaked, totalAPR };
}

async function loadFlowSynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
  stakeTokenFunction, has_sickle_account) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);

    if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
      console.log("Couldn't find stake function ", stakeTokenFunction);
    }

    let stakeTokenAddress = "";
    try{
      stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();
    }catch{
      console.log(stakingAddress);
      return {
        stakingAddress: "",
        poolPrices: "",
        stakeTokenAddress: "",
        rewardTokenAddress: "",
        stakeTokenTicker: "",
        rewardTokenTicker: "",
        stakeTokenPrice: 0,
        rewardTokenPrice: 0,
        weeklyRewards: 0,
        usdPerWeek: 0,
        staked_tvl: 0,
        userStaked: 0,
        userUnstaked: 0,
        earned: 0,
        has_sickle_account: false
      }
    }

    const rewardTokenAddress = "0x940181a94a35a4569e4529a3cdfb74e38fd98631";

    var stakeToken = await getGeneralToken(App, stakeTokenAddress, stakingAddress);

    if (stakeTokenAddress.toLowerCase() === rewardTokenAddress.toLowerCase()) {
      stakeToken.staked = await STAKING_POOL.totalSupply() / 10 ** stakeToken.decimals;
    }

    var newTokenAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getGeneralToken(App, address, stakingAddress);
    }
    if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
        tokens[rewardTokenAddress] = await getGeneralToken(App, rewardTokenAddress, stakingAddress);
    }
    const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);

    const rewardTokenTicker = rewardToken.symbol;

    const poolPrices = getPoolPrices(tokens, prices, stakeToken, "base");

    if (!poolPrices)
    {
      console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
      return null;
    }

    const stakeTokenTicker = poolPrices.stakeTokenTicker;

    const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
    const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;

    const periodFinish = await STAKING_POOL.periodFinish();
    const rewardRate = await STAKING_POOL.rewardRate();
    const weeklyRewards = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate / 1e18 * 604800;

    const usdPerWeek = weeklyRewards * rewardTokenPrice;

    const staked_tvl = poolPrices.staked_tvl;

    const userStaked = await STAKING_POOL.balanceOf(App.YOUR_ADDRESS) / 10 ** stakeToken.decimals;

    const userUnstaked = stakeToken.unstaked;

    const earned = await STAKING_POOL.earned(App.YOUR_ADDRESS) / 10 ** rewardToken.decimals;

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
      has_sickle_account
    }
}

async function printAerodromePool(App, info, chain="eth", customURLs) {
  if(info.weeklyRewards<= 0){
    return{
      staked_tvl: 0,
      userStaked : 0,
      apr : 0
    }
  }
  if(info.has_sickle_account && info.userStaked <= 0){
    return {
      staked_tvl: 0,
      userStaked : 0,
      apr : 0
    }
  }
    info.poolPrices.print_price(chain, 4, customURLs);
    _print(`${info.rewardTokenTicker} Per Week: ${info.weeklyRewards.toFixed(2)} ($${formatMoney(info.usdPerWeek)})`);
    const weeklyAPR = info.usdPerWeek / info.staked_tvl * 100;
    const dailyAPR = weeklyAPR / 7;
    const yearlyAPR = weeklyAPR * 52;
    _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
    const userStakedUsd = info.userStaked * info.stakeTokenPrice;
    const userStakedPct = userStakedUsd / info.staked_tvl * 100;
    _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
           `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
    if (info.userStaked > 0) {
      info.poolPrices.print_contained_price(info.userStaked);
        const userWeeklyRewards = userStakedPct * info.weeklyRewards / 100;
        const userDailyRewards = userWeeklyRewards / 7;
        const userYearlyRewards = userWeeklyRewards * 52;
        _print(`Estimated ${info.rewardTokenTicker} earnings:`
            + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*info.rewardTokenPrice)})`
            + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*info.rewardTokenPrice)})`
            + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*info.rewardTokenPrice)})`);
    }
    const approveTENDAndStake = async function() {
      return aeroContract_stake(info.stakeTokenAddress, info.stakingAddress, App)
    }
    const unstake = async function() {
      return rewardsContract_unstake(info.stakingAddress, App)
    }
    const claim = async function() {
      return aeroContract_claim(info.stakingAddress, App)
    }
    const exit = async function() {
      return rewardsContract_exit(info.stakingAddress, App)
    }
    const revoke = async function() {
      return rewardsContract_resetApprove(info.stakeTokenAddress, info.stakingAddress, App)
    }
    _print(`<a target="_blank" href="https://basescan.org/address/${info.stakingAddress}#code">Base Scan</a>`);
    if (info.stakeTokenAddress != "0x0000000000000000000000000000000000000000") {
      _print_link(`Stake ${info.userUnstaked.toFixed(6)} ${info.stakeTokenTicker}`, approveTENDAndStake)
    }
    else {
      _print(`Please use the official website to stake ${info.stakeTokenTicker}.`);
    }
    _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, unstake)
    _print_link(`Claim ${info.earned.toFixed(6)} ${info.rewardTokenTicker} ($${formatMoney(info.earned*info.rewardTokenPrice)})`, claim)
    if (info.stakeTokenTicker != "ETH") {
      _print_link(`Revoke (set approval to 0)`, revoke)
    }
    _print_link(`Exit`, exit)
    _print("");

    return {
        staked_tvl: info.poolPrices.staked_tvl,
        userStaked : userStakedUsd,
        apr : yearlyAPR
    }
}

async function loadFlowSynthetixPoolInfoPrice(App, tokens, prices, stakingAddress, stakeTokenAddress) {
  var stakeToken = await getGeneralToken(App, stakeTokenAddress, stakingAddress);
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
      tokens[address] = await getGeneralToken(App, address, stakingAddress);
  }
  const poolPrices = getPoolPrices(tokens, prices, stakeToken, "base");

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

const aeroContract_stake = async function(stakeTokenAddr, rewardPoolAddr, App, maxAllowance) {
  const signer = App.provider.getSigner()

  const TEND_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  const WEEBTEND_V2_TOKEN = new ethers.Contract(rewardPoolAddr, FLOW_GAUGE_ABI, signer)

  const balanceOf = await TEND_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const currentTEND =  maxAllowance ? (maxAllowance / 1e18 < balanceOf / 1e18
    ? maxAllowance : balanceOf) : balanceOf
  const allowedTEND = await TEND_TOKEN.allowance(App.YOUR_ADDRESS, rewardPoolAddr)

  let allow = Promise.resolve()

  if (allowedTEND / 1e18 < currentTEND / 1e18) {
    showLoading()
    allow = TEND_TOKEN.approve(rewardPoolAddr, ethers.constants.MaxUint256)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
        alert('Try resetting your approval to 0 first')
      })
  }

  if (currentTEND / 1e18 > 0) {
    showLoading()
    allow
      .then(async function() {
        WEEBTEND_V2_TOKEN.deposit(currentTEND, {gasLimit: 500000})
          .then(function(t) {
            App.provider.waitForTransaction(t.hash).then(function() {
              hideLoading()
            })
          })
          .catch(x => {
            hideLoading()
            console.log(x);
            _print('Something went wrong.')
          })
      })
      .catch(x => {
        hideLoading()
        console.log(x);
        _print('Something went wrong.')
      })
  } else {
    alert('You have no tokens to stake!!')
  }
}

const aeroContract_claim = async function(rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(rewardPoolAddr, FLOW_GAUGE_ABI, signer)

  console.log(App.YOUR_ADDRESS)

  const earnedYFFI = (await REWARD_POOL.earned(App.YOUR_ADDRESS)) / 1e18

  if (earnedYFFI > 0) {
    showLoading()
    REWARD_POOL.getReward(App.YOUR_ADDRESS, {gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

async function getClToken(contract0, contract1, address) {
  return {
    address,
    name0 : await contract0.name(),
    name1 : await contract1.name(),
    symbol0 : await contract0.symbol(),
    symbol1 : await contract1.symbol(),
  }
}