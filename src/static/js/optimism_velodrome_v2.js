$(function() {
  consoleInit(main)
  });
  
  const VELO_V2_VOTER_ABI = [{"inputs":[{"internalType":"address","name":"_forwarder","type":"address"},{"internalType":"address","name":"_ve","type":"address"},{"internalType":"address","name":"_factoryRegistry","type":"address"},{"internalType":"address","name":"_v1Factory","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AlreadyVotedOrDeposited","type":"error"},{"inputs":[],"name":"DistributeWindow","type":"error"},{"inputs":[],"name":"FactoryPathNotApproved","type":"error"},{"inputs":[],"name":"GaugeAlreadyKilled","type":"error"},{"inputs":[],"name":"GaugeAlreadyRevived","type":"error"},{"inputs":[{"internalType":"address","name":"_pool","type":"address"}],"name":"GaugeDoesNotExist","type":"error"},{"inputs":[],"name":"GaugeExists","type":"error"},{"inputs":[{"internalType":"address","name":"_gauge","type":"address"}],"name":"GaugeNotAlive","type":"error"},{"inputs":[],"name":"InactiveManagedNFT","type":"error"},{"inputs":[],"name":"MaximumVotingNumberTooLow","type":"error"},{"inputs":[],"name":"NonZeroVotes","type":"error"},{"inputs":[],"name":"NotAPool","type":"error"},{"inputs":[],"name":"NotApprovedOrOwner","type":"error"},{"inputs":[],"name":"NotEmergencyCouncil","type":"error"},{"inputs":[],"name":"NotGovernor","type":"error"},{"inputs":[],"name":"NotMinter","type":"error"},{"inputs":[],"name":"NotWhitelistedNFT","type":"error"},{"inputs":[],"name":"NotWhitelistedToken","type":"error"},{"inputs":[],"name":"SameValue","type":"error"},{"inputs":[],"name":"SpecialVotingWindow","type":"error"},{"inputs":[],"name":"TooManyPools","type":"error"},{"inputs":[],"name":"UnequalLengths","type":"error"},{"inputs":[],"name":"ZeroAddress","type":"error"},{"inputs":[],"name":"ZeroBalance","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"voter","type":"address"},{"indexed":true,"internalType":"address","name":"pool","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"weight","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalWeight","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"Abstained","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"gauge","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DistributeReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"poolFactory","type":"address"},{"indexed":true,"internalType":"address","name":"votingRewardsFactory","type":"address"},{"indexed":true,"internalType":"address","name":"gaugeFactory","type":"address"},{"indexed":false,"internalType":"address","name":"pool","type":"address"},{"indexed":false,"internalType":"address","name":"bribeVotingReward","type":"address"},{"indexed":false,"internalType":"address","name":"feeVotingReward","type":"address"},{"indexed":false,"internalType":"address","name":"gauge","type":"address"},{"indexed":false,"internalType":"address","name":"creator","type":"address"}],"name":"GaugeCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"gauge","type":"address"}],"name":"GaugeKilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"gauge","type":"address"}],"name":"GaugeRevived","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"reward","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"NotifyReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"voter","type":"address"},{"indexed":true,"internalType":"address","name":"pool","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"weight","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalWeight","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"Voted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"whitelister","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"bool","name":"_bool","type":"bool"}],"name":"WhitelistNFT","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"whitelister","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":true,"internalType":"bool","name":"_bool","type":"bool"}],"name":"WhitelistToken","type":"event"},{"inputs":[{"internalType":"address[]","name":"_bribes","type":"address[]"},{"internalType":"address[][]","name":"_tokens","type":"address[][]"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"claimBribes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_fees","type":"address[]"},{"internalType":"address[][]","name":"_tokens","type":"address[][]"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"claimFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_gauges","type":"address[]"}],"name":"claimRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"claimable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_poolFactory","type":"address"},{"internalType":"address","name":"_pool","type":"address"}],"name":"createGauge","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_mTokenId","type":"uint256"}],"name":"depositManaged","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_gauges","type":"address[]"}],"name":"distribute","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_start","type":"uint256"},{"internalType":"uint256","name":"_finish","type":"uint256"}],"name":"distribute","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyCouncil","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"epochGovernor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"epochNext","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"epochStart","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"epochVoteEnd","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"epochVoteStart","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"factoryRegistry","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"forwarder","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"gaugeToBribe","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"gaugeToFees","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"gauges","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"governor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"_tokens","type":"address[]"},{"internalType":"address","name":"_minter","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isAlive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isGauge","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"forwarder","type":"address"}],"name":"isTrustedForwarder","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"isWhitelistedNFT","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isWhitelistedToken","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_gauge","type":"address"}],"name":"killGauge","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lastVoted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"length","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxVotingNum","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"poke","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"poolForGauge","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolVote","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"pools","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"reset","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_gauge","type":"address"}],"name":"reviveGauge","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_council","type":"address"}],"name":"setEmergencyCouncil","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_epochGovernor","type":"address"}],"name":"setEpochGovernor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_governor","type":"address"}],"name":"setGovernor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxVotingNum","type":"uint256"}],"name":"setMaxVotingNum","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalWeight","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_gauge","type":"address"}],"name":"updateFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"end","type":"uint256"}],"name":"updateFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_gauges","type":"address[]"}],"name":"updateFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"usedWeights","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"v1Factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ve","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"address[]","name":"_poolVote","type":"address[]"},{"internalType":"uint256[]","name":"_weights","type":"uint256[]"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"votes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"weights","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"bool","name":"_bool","type":"bool"}],"name":"whitelistNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"bool","name":"_bool","type":"bool"}],"name":"whitelistToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"withdrawManaged","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  
  const VELO_V2_GAUGE_ABI = [{"inputs":[{"internalType":"address","name":"_forwarder","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"address","name":"_feesVotingReward","type":"address"},{"internalType":"address","name":"_rewardToken","type":"address"},{"internalType":"address","name":"_voter","type":"address"},{"internalType":"bool","name":"_isPool","type":"bool"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"NotAlive","type":"error"},{"inputs":[],"name":"NotAuthorized","type":"error"},{"inputs":[],"name":"NotVoter","type":"error"},{"inputs":[],"name":"RewardRateTooHigh","type":"error"},{"inputs":[],"name":"ZeroAmount","type":"error"},{"inputs":[],"name":"ZeroRewardRate","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"claimed0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"claimed1","type":"uint256"}],"name":"ClaimFees","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ClaimRewards","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"NotifyReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_recipient","type":"address"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fees0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fees1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feesVotingReward","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isPool","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"forwarder","type":"address"}],"name":"isTrustedForwarder","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"left","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardRateByEpoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakingToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"voter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  
  const SICKLE_FACTORY_ABI = [{"inputs":[{"internalType":"address","name":"admin_","type":"address"},{"internalType":"address","name":"sickleRegistry_","type":"address"},{"internalType":"address","name":"sickleImplementation_","type":"address"},{"internalType":"address","name":"previousFactory_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"caller","type":"address"}],"name":"CallerNotWhitelisted","type":"error"},{"inputs":[],"name":"NotActive","type":"error"},{"inputs":[],"name":"NotAdminError","type":"error"},{"inputs":[],"name":"SickleAlreadyDeployed","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"admin","type":"address"},{"indexed":false,"internalType":"address","name":"sickle","type":"address"}],"name":"Deploy","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_referralCodes","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"sickle","type":"address"}],"name":"admins","outputs":[{"internalType":"address","name":"admin","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"approved","type":"address"},{"internalType":"bytes32","name":"referralCode","type":"bytes32"}],"name":"deploy","outputs":[{"internalType":"address","name":"sickle","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"admin","type":"address"},{"internalType":"address","name":"approved","type":"address"},{"internalType":"bytes32","name":"referralCode","type":"bytes32"}],"name":"getOrDeploy","outputs":[{"internalType":"address","name":"sickle","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"implementation","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"admin","type":"address"}],"name":"predict","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"previousFactory","outputs":[{"internalType":"contract SickleFactory","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"sickle","type":"address"}],"name":"referralCodes","outputs":[{"internalType":"bytes32","name":"referralCode","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"registry","outputs":[{"internalType":"contract SickleRegistry","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"active","type":"bool"}],"name":"setActive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAdmin","type":"address"}],"name":"setAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"admin","type":"address"}],"name":"sickles","outputs":[{"internalType":"address","name":"sickle","type":"address"}],"stateMutability":"view","type":"function"}]
  
  const SICKLE_ABI = [{"inputs":[{"internalType":"address","name":"sickleRegistry_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"caller","type":"address"}],"name":"CallerNotWhitelisted","type":"error"},{"inputs":[],"name":"MulticallParamsMismatchError","type":"error"},{"inputs":[],"name":"NotOwnerError","type":"error"},{"inputs":[],"name":"NotStrategyError","type":"error"},{"inputs":[{"internalType":"address","name":"target","type":"address"}],"name":"TargetNotWhitelisted","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"inputs":[],"name":"approved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"sickleOwner_","type":"address"},{"internalType":"address","name":"approved_","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"caller","type":"address"}],"name":"isOwnerOrApproved","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"targets","type":"address[]"},{"internalType":"bytes[]","name":"data","type":"bytes[]"}],"name":"multicall","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC1155BatchReceived","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC1155Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"registry","outputs":[{"internalType":"contract SickleRegistry","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newApproved","type":"address"}],"name":"setApproved","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
  
  const CL_GAUGE_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"claimed0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"claimed1","type":"uint256"}],"name":"ClaimFees","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ClaimRewards","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"uint128","name":"liquidityToStake","type":"uint128"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"NotifyReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"uint128","name":"liquidityToStake","type":"uint128"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"WETH9","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"decreaseStakedLiquidity","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fees0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fees1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feesVotingReward","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"gaugeFactory","outputs":[{"internalType":"contract ICLGaugeFactory","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount0Desired","type":"uint256"},{"internalType":"uint256","name":"amount1Desired","type":"uint256"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"increaseStakedLiquidity","outputs":[{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_pool","type":"address"},{"internalType":"address","name":"_feesVotingReward","type":"address"},{"internalType":"address","name":"_rewardToken","type":"address"},{"internalType":"address","name":"_voter","type":"address"},{"internalType":"address","name":"_nft","type":"address"},{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"},{"internalType":"int24","name":"_tickSpacing","type":"int24"},{"internalType":"bool","name":"_isPool","type":"bool"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isPool","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"left","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nft","outputs":[{"internalType":"contract INonfungiblePositionManager","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"notifyRewardWithoutClaim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pool","outputs":[{"internalType":"contract ICLPool","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardGrowthInside","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardRateByEpoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"stakedByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"stakedContains","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"}],"name":"stakedLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"}],"name":"stakedValues","outputs":[{"internalType":"uint256[]","name":"staked","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"supportsPayable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tickSpacing","outputs":[{"internalType":"int24","name":"","type":"int24"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"voter","outputs":[{"internalType":"contract IVoter","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
  
  const CL_TOKEN_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"int24","name":"tickLower","type":"int24"},{"indexed":true,"internalType":"int24","name":"tickUpper","type":"int24"},{"indexed":false,"internalType":"uint128","name":"amount","type":"uint128"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"address","name":"recipient","type":"address"},{"indexed":true,"internalType":"int24","name":"tickLower","type":"int24"},{"indexed":true,"internalType":"int24","name":"tickUpper","type":"int24"},{"indexed":false,"internalType":"uint128","name":"amount0","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"amount1","type":"uint128"}],"name":"Collect","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint128","name":"amount0","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"amount1","type":"uint128"}],"name":"CollectFees","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"paid0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"paid1","type":"uint256"}],"name":"Flash","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"observationCardinalityNextOld","type":"uint16"},{"indexed":false,"internalType":"uint16","name":"observationCardinalityNextNew","type":"uint16"}],"name":"IncreaseObservationCardinalityNext","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint160","name":"sqrtPriceX96","type":"uint160"},{"indexed":false,"internalType":"int24","name":"tick","type":"int24"}],"name":"Initialize","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"int24","name":"tickLower","type":"int24"},{"indexed":true,"internalType":"int24","name":"tickUpper","type":"int24"},{"indexed":false,"internalType":"uint128","name":"amount","type":"uint128"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"feeProtocol0Old","type":"uint8"},{"indexed":false,"internalType":"uint8","name":"feeProtocol1Old","type":"uint8"},{"indexed":false,"internalType":"uint8","name":"feeProtocol0New","type":"uint8"},{"indexed":false,"internalType":"uint8","name":"feeProtocol1New","type":"uint8"}],"name":"SetFeeProtocol","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"int256","name":"amount0","type":"int256"},{"indexed":false,"internalType":"int256","name":"amount1","type":"int256"},{"indexed":false,"internalType":"uint160","name":"sqrtPriceX96","type":"uint160"},{"indexed":false,"internalType":"uint128","name":"liquidity","type":"uint128"},{"indexed":false,"internalType":"int24","name":"tick","type":"int24"}],"name":"Swap","type":"event"},{"inputs":[{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint128","name":"amount","type":"uint128"},{"internalType":"address","name":"owner","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint128","name":"amount","type":"uint128"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint128","name":"amount0Requested","type":"uint128"},{"internalType":"uint128","name":"amount1Requested","type":"uint128"},{"internalType":"address","name":"owner","type":"address"}],"name":"collect","outputs":[{"internalType":"uint128","name":"amount0","type":"uint128"},{"internalType":"uint128","name":"amount1","type":"uint128"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint128","name":"amount0Requested","type":"uint128"},{"internalType":"uint128","name":"amount1Requested","type":"uint128"}],"name":"collect","outputs":[{"internalType":"uint128","name":"amount0","type":"uint128"},{"internalType":"uint128","name":"amount1","type":"uint128"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"collectFees","outputs":[{"internalType":"uint128","name":"amount0","type":"uint128"},{"internalType":"uint128","name":"amount1","type":"uint128"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"factoryRegistry","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fee","outputs":[{"internalType":"uint24","name":"","type":"uint24"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeGrowthGlobal0X128","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeGrowthGlobal1X128","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"flash","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"gauge","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"gaugeFees","outputs":[{"internalType":"uint128","name":"token0","type":"uint128"},{"internalType":"uint128","name":"token1","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint256","name":"_rewardGrowthGlobalX128","type":"uint256"}],"name":"getRewardGrowthInside","outputs":[{"internalType":"uint256","name":"rewardGrowthInside","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"observationCardinalityNext","type":"uint16"}],"name":"increaseObservationCardinalityNext","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"},{"internalType":"int24","name":"_tickSpacing","type":"int24"},{"internalType":"address","name":"_factoryRegistry","type":"address"},{"internalType":"uint160","name":"_sqrtPriceX96","type":"uint160"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lastUpdated","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidity","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxLiquidityPerTick","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint128","name":"amount","type":"uint128"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"mint","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"nft","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"observations","outputs":[{"internalType":"uint32","name":"blockTimestamp","type":"uint32"},{"internalType":"int56","name":"tickCumulative","type":"int56"},{"internalType":"uint160","name":"secondsPerLiquidityCumulativeX128","type":"uint160"},{"internalType":"bool","name":"initialized","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32[]","name":"secondsAgos","type":"uint32[]"}],"name":"observe","outputs":[{"internalType":"int56[]","name":"tickCumulatives","type":"int56[]"},{"internalType":"uint160[]","name":"secondsPerLiquidityCumulativeX128s","type":"uint160[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"positions","outputs":[{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"feeGrowthInside0LastX128","type":"uint256"},{"internalType":"uint256","name":"feeGrowthInside1LastX128","type":"uint256"},{"internalType":"uint128","name":"tokensOwed0","type":"uint128"},{"internalType":"uint128","name":"tokensOwed1","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardGrowthGlobalX128","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardReserve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rollover","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_gauge","type":"address"},{"internalType":"address","name":"_nft","type":"address"}],"name":"setGaugeAndPositionManager","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"slot0","outputs":[{"internalType":"uint160","name":"sqrtPriceX96","type":"uint160"},{"internalType":"int24","name":"tick","type":"int24"},{"internalType":"uint16","name":"observationIndex","type":"uint16"},{"internalType":"uint16","name":"observationCardinality","type":"uint16"},{"internalType":"uint16","name":"observationCardinalityNext","type":"uint16"},{"internalType":"bool","name":"unlocked","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"}],"name":"snapshotCumulativesInside","outputs":[{"internalType":"int56","name":"tickCumulativeInside","type":"int56"},{"internalType":"uint160","name":"secondsPerLiquidityInsideX128","type":"uint160"},{"internalType":"uint32","name":"secondsInside","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"int128","name":"stakedLiquidityDelta","type":"int128"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"bool","name":"positionUpdate","type":"bool"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakedLiquidity","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"bool","name":"zeroForOne","type":"bool"},{"internalType":"int256","name":"amountSpecified","type":"int256"},{"internalType":"uint160","name":"sqrtPriceLimitX96","type":"uint160"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[{"internalType":"int256","name":"amount0","type":"int256"},{"internalType":"int256","name":"amount1","type":"int256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardRate","type":"uint256"},{"internalType":"uint256","name":"_rewardReserve","type":"uint256"},{"internalType":"uint256","name":"_periodFinish","type":"uint256"}],"name":"syncReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"int16","name":"","type":"int16"}],"name":"tickBitmap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tickSpacing","outputs":[{"internalType":"int24","name":"","type":"int24"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"int24","name":"","type":"int24"}],"name":"ticks","outputs":[{"internalType":"uint128","name":"liquidityGross","type":"uint128"},{"internalType":"int128","name":"liquidityNet","type":"int128"},{"internalType":"int128","name":"stakedLiquidityNet","type":"int128"},{"internalType":"uint256","name":"feeGrowthOutside0X128","type":"uint256"},{"internalType":"uint256","name":"feeGrowthOutside1X128","type":"uint256"},{"internalType":"uint256","name":"rewardGrowthOutsideX128","type":"uint256"},{"internalType":"int56","name":"tickCumulativeOutside","type":"int56"},{"internalType":"uint160","name":"secondsPerLiquidityOutsideX128","type":"uint160"},{"internalType":"uint32","name":"secondsOutside","type":"uint32"},{"internalType":"bool","name":"initialized","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unstakedFee","outputs":[{"internalType":"uint24","name":"","type":"uint24"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"updateRewardsGrowthGlobal","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  
  const NFT_AERO_ABI = [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WETH9","type":"address"},{"internalType":"address","name":"_tokenDescriptor","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_fromTokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_toTokenId","type":"uint256"}],"name":"BatchMetadataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Collect","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint128","name":"liquidity","type":"uint128"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"DecreaseLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint128","name":"liquidity","type":"uint128"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"IncreaseLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"MetadataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"tokenDescriptor","type":"address"}],"name":"TokenDescriptorChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"}],"name":"TransferOwnership","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WETH9","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint128","name":"amount0Max","type":"uint128"},{"internalType":"uint128","name":"amount1Max","type":"uint128"}],"internalType":"struct INonfungiblePositionManager.CollectParams","name":"params","type":"tuple"}],"name":"collect","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"internalType":"struct INonfungiblePositionManager.DecreaseLiquidityParams","name":"params","type":"tuple"}],"name":"decreaseLiquidity","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount0Desired","type":"uint256"},{"internalType":"uint256","name":"amount1Desired","type":"uint256"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"internalType":"struct INonfungiblePositionManager.IncreaseLiquidityParams","name":"params","type":"tuple"}],"name":"increaseLiquidity","outputs":[{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"token0","type":"address"},{"internalType":"address","name":"token1","type":"address"},{"internalType":"int24","name":"tickSpacing","type":"int24"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint256","name":"amount0Desired","type":"uint256"},{"internalType":"uint256","name":"amount1Desired","type":"uint256"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint160","name":"sqrtPriceX96","type":"uint160"}],"internalType":"struct INonfungiblePositionManager.MintParams","name":"params","type":"tuple"}],"name":"mint","outputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"data","type":"bytes[]"}],"name":"multicall","outputs":[{"internalType":"bytes[]","name":"results","type":"bytes[]"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"positions","outputs":[{"internalType":"uint96","name":"nonce","type":"uint96"},{"internalType":"address","name":"operator","type":"address"},{"internalType":"address","name":"token0","type":"address"},{"internalType":"address","name":"token1","type":"address"},{"internalType":"int24","name":"tickSpacing","type":"int24"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"feeGrowthInside0LastX128","type":"uint256"},{"internalType":"uint256","name":"feeGrowthInside1LastX128","type":"uint256"},{"internalType":"uint128","name":"tokensOwed0","type":"uint128"},{"internalType":"uint128","name":"tokensOwed1","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"refundETH","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermitAllowed","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermitAllowedIfNecessary","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermitIfNecessary","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"setOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenDescriptor","type":"address"}],"name":"setTokenDescriptor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"}],"name":"sweepToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenDescriptor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount0Owed","type":"uint256"},{"internalType":"uint256","name":"amount1Owed","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"uniswapV3MintCallback","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"}],"name":"unwrapWETH9","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]
  
  const NFT_FARM_STRATEGY_ABI = [{"inputs":[{"internalType":"contract SickleFactory","name":"factory_","type":"address"},{"internalType":"contract FeesLib","name":"feesLib_","type":"address"},{"internalType":"contract ConnectorRegistry","name":"connectorRegistry_","type":"address"},{"internalType":"address","name":"wrappedNativeAddress_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ETHTransferFailed","type":"error"},{"inputs":[],"name":"IncorrectMsgValue","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"NotOwner","type":"error"},{"inputs":[],"name":"NotOwnerOrApproved","type":"error"},{"inputs":[],"name":"NotOwnerOrApprovedOrInternal","type":"error"},{"inputs":[],"name":"NotOwnerOrInternal","type":"error"},{"inputs":[],"name":"NotRegisteredSickle","type":"error"},{"inputs":[],"name":"SickleNotDeployed","type":"error"},{"inputs":[],"name":"TransferFailed","type":"error"},{"inputs":[],"name":"TransferFromFailed","type":"error"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"wrappedNative","type":"address"},{"internalType":"uint256","name":"amountToCharge","type":"uint256"}],"name":"_sickle_chargeTransactionCost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"strategy","type":"address"},{"internalType":"bytes4","name":"feeDescriptor","type":"bytes4"},{"internalType":"address","name":"tokenOut","type":"address"}],"name":"_sickle_charge_fees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"nftContractAddress","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"_sickle_transfer_erc1155_from_user","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"nftContractAddress","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"_sickle_transfer_erc1155_to_user","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address","name":"strategy","type":"address"},{"internalType":"bytes4","name":"feeSelector","type":"bytes4"}],"name":"_sickle_transfer_from_user","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"nftContractAddress","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"_sickle_transfer_nft_from_user","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"nftContractAddress","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"_sickle_transfer_nft_to_user","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"tokens","type":"address[]"}],"name":"_sickle_transfer_to_user","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"connectorRegistry","outputs":[{"internalType":"contract ConnectorRegistry","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"nftContractAddress","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"stakingContractAddress","type":"address"},{"internalType":"bytes","name":"extraData","type":"bytes"},{"internalType":"address","name":"approved","type":"address"},{"internalType":"bytes32","name":"referralCode","type":"bytes32"}],"name":"depositErc721","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"contract SickleFactory","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feesLib","outputs":[{"internalType":"contract FeesLib","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"nftContractAddress","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"stakingContractAddress","type":"address"},{"internalType":"bytes","name":"extraData","type":"bytes"},{"internalType":"address[]","name":"sweepTokens","type":"address[]"}],"name":"withdrawErc721","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"wrappedNativeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]
  
  const FARM_STRATEGY_ABI = [{"inputs":[{"internalType":"contract SickleFactory","name":"factory_","type":"address"},{"internalType":"contract FeesLib","name":"feesLib_","type":"address"},{"internalType":"contract ConnectorRegistry","name":"connectorRegistry_","type":"address"},{"internalType":"address","name":"wrappedNativeAddress_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ArrayLengthMismatch","type":"error"},{"inputs":[],"name":"ETHTransferFailed","type":"error"},{"inputs":[],"name":"IncorrectMsgValue","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"NotOwner","type":"error"},{"inputs":[],"name":"NotOwnerOrApproved","type":"error"},{"inputs":[],"name":"NotOwnerOrApprovedOrInternal","type":"error"},{"inputs":[],"name":"NotOwnerOrInternal","type":"error"},{"inputs":[],"name":"NotRegisteredSickle","type":"error"},{"inputs":[],"name":"SickleNotDeployed","type":"error"},{"inputs":[],"name":"TokenInRequired","type":"error"},{"inputs":[],"name":"TransferFailed","type":"error"},{"inputs":[],"name":"TransferFromFailed","type":"error"},{"inputs":[{"internalType":"address","name":"strategy","type":"address"},{"internalType":"bytes4","name":"feeDescriptor","type":"bytes4"},{"internalType":"address","name":"feeToken","type":"address"}],"name":"_sickle_charge_fee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"strategy","type":"address"},{"internalType":"bytes4","name":"feeDescriptor","type":"bytes4"},{"internalType":"address[]","name":"feeTokens","type":"address[]"}],"name":"_sickle_charge_fees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"wrappedNative","type":"address"},{"internalType":"uint256","name":"amountToCharge","type":"uint256"}],"name":"_sickle_charge_transaction_cost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address","name":"strategy","type":"address"},{"internalType":"bytes4","name":"feeSelector","type":"bytes4"}],"name":"_sickle_transfer_token_from_user","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"_sickle_transfer_token_to_user","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address[]","name":"tokensIn","type":"address[]"},{"internalType":"uint256[]","name":"amountsIn","type":"uint256[]"},{"internalType":"address","name":"strategy","type":"address"},{"internalType":"bytes4","name":"feeSelector","type":"bytes4"}],"name":"_sickle_transfer_tokens_from_user","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address[]","name":"tokens","type":"address[]"}],"name":"_sickle_transfer_tokens_to_user","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"lpToken","type":"address"},{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address","name":"stakingContractAddress","type":"address"},{"internalType":"bytes","name":"extraData","type":"bytes"}],"internalType":"struct SimpleFarmStrategy.DepositParams","name":"params","type":"tuple"},{"internalType":"address","name":"approved","type":"address"},{"internalType":"bytes32","name":"referralCode","type":"bytes32"}],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"address[]","name":"tokensOut","type":"address[]"},{"internalType":"address","name":"stakingContractAddress","type":"address"},{"internalType":"bytes","name":"extraData","type":"bytes"}],"internalType":"struct SimpleFarmStrategy.HarvestParams","name":"harvestParams","type":"tuple"},{"components":[{"internalType":"address","name":"lpToken","type":"address"},{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address","name":"stakingContractAddress","type":"address"},{"internalType":"bytes","name":"extraData","type":"bytes"}],"internalType":"struct SimpleFarmStrategy.WithdrawParams","name":"withdrawParams","type":"tuple"}],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"contract SickleFactory","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feesLib","outputs":[{"internalType":"contract FeesLib","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"address[]","name":"tokensOut","type":"address[]"},{"internalType":"address","name":"stakingContractAddress","type":"address"},{"internalType":"bytes","name":"extraData","type":"bytes"}],"internalType":"struct SimpleFarmStrategy.HarvestParams","name":"params","type":"tuple"}],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"lpToken","type":"address"},{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address","name":"stakingContractAddress","type":"address"},{"internalType":"bytes","name":"extraData","type":"bytes"}],"internalType":"struct SimpleFarmStrategy.WithdrawParams","name":"params","type":"tuple"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"wrappedNativeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]
  
  const NFT_TOKEN_ADDRESS = "0xbB5DFE1380333CEE4c2EeBd7202c80dE2256AdF4";
  
  const NFT_FARM_STRATEGY_ADDRESS = "0x84676ee313cd7C7b85869B208D2EfFB7Af136f8a";
  
  const FARM_STRATEGY_ADDRESS = "0x76384443B91A576809dfC2CDc0f7Ae8f3148147a";
  
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

    let lpTokens = [], arrayOfGauges = [], calls = [], calls2 = [];

    const _calls = [...Array(poolLength).keys()].map(i => VELO_V2_VOTER_CONTRACT.pools(i));
    while (_calls.length > 0) {
      calls.push(_calls.splice(0, 40));
    }
    for(const call of calls){
      const _lpTokens = await App.ethcallProvider.all(call);
      lpTokens.push(_lpTokens);
    }
    for(const lpTokenArray of lpTokens){
      const calls2 = lpTokenArray.map(a => VELO_V2_VOTER_CONTRACT.gauges(a));
      const _gauges = await App.ethcallProvider.all(calls2);
      arrayOfGauges.push(_gauges);
    }
  
    const SICKLE_FACTORY_ADDR = "0xB4C31b0f0B76b351395D4aCC94A54dD4e6fbA1E8";
    const SICKLE_FACTORY = new ethers.Contract(SICKLE_FACTORY_ADDR, SICKLE_FACTORY_ABI, App.provider);
  
    const sickle_account_address = await SICKLE_FACTORY.sickles(App.YOUR_ADDRESS);
    const has_sickle_account = sickle_account_address === "0x0000000000000000000000000000000000000000" ? false : true;
    const owner_sickle_address = App.YOUR_ADDRESS;
  
    await loadVeloSynthetixPoolInfoPrice(App, tokens, prices, App.YOUR_ADDRESS, "0x8134a2fdc127549480865fb8e5a9e8a8a95a54c5");

    let _arrayOfGauges = []

    for(const gaugesArray of arrayOfGauges){
      const gauges = gaugesArray.map(a => {
        return {
          address: a,
          abi: VELO_V2_GAUGE_ABI,
          stakeTokenFunction: "stakingToken"
        }
      })

      _arrayOfGauges.push(gauges)
    }

    let staked_tvl = 0, totalUserStaked = 0;
    const delayLoop = ms => new Promise(resolve => setTimeout(resolve, ms));

    if(has_sickle_account){
      _print_bold(`You have connected with your sickle account: ${sickle_account_address}`);
      _print("Your positions are");
      _print("");
      App.YOUR_ADDRESS = sickle_account_address;

      for(const arrayOfGauges of _arrayOfGauges){
        let p = await loadFlowSynthetixPools(App, tokens, prices, arrayOfGauges, has_sickle_account, owner_sickle_address)
        
        staked_tvl+=p.staked_tvl;
        totalUserStaked+=p.totalUserStaked;
        await delayLoop(5000);
      }
      _print_bold(`Total staked: $${formatMoney(staked_tvl)}\n`);
      if (totalUserStaked > 0) {
        _print(`You are staking a total of $${formatMoney(totalUserStaked)}\n`);
        _print("");
      }
    }else{
      for(const arrayOfGauges of _arrayOfGauges){
        let p = await loadFlowSynthetixPools(App, tokens, prices, arrayOfGauges, has_sickle_account)

        staked_tvl+=p.staked_tvl;
        totalUserStaked+=p.totalUserStaked;
        await delayLoop(5000);
      }
      _print_bold(`Total staked: $${formatMoney(staked_tvl)}\n`);
      if (totalUserStaked > 0) {
        _print(`You are staking a total of $${formatMoney(totalUserStaked)}\n`);
        _print("");
      }
    }
  
    await delayLoop(5000);

    const clGauges = [
      "0xdaeA02426662dAAe26c912088DC3FDae05764432",
      "0x56229881EE6eEEAC9ab739F812a086301c91a8c1",
      "0x45DEF76558a038cA3236F3F634c888945c7f925A",
      "0xb634f40D77600Db4a61458Af9312C7925A2D65d1",
      "0x3914e354979e6bc63782512Bddb24C224E81a1bD",
      "0xB55A8d2A2775D72BC204049C598d1aCd19ECbBCe",
      "0xEFBA2550E43565925Ca3182D0583942b29498212",
      "0xB2afdBf04c68989212DE04f9347Ea9bc649aE18b",
      "0xb93d54c8A34FfE669033551Dcc2A6408234E35bC",
      "0x1DFAb7699121fEF702d07932a447868dCcCFb029",
      "0x8150C44429890375F3eF9f87D07ae4bae4803E71",
      "0x8d8d1CdDD5960276A1CDE360e7b5D210C3387948",
      "0x856712AfBEe760072C42b5b16fF54052B853F9d6",
      "0xe0BD3D38f352157e22c85faDFfDf7C215773DbB4",
      "0x6496C0B14A5aFe1bC26A611E7D338B4527e9D59A",
      "0x93E2b13e7D7f610915E842D1c743eCdC847E7c17",
      "0x560b7e9289739cdA821A4c084e087e1a7d3Ef879",
      "0x376f6926Ce16a86cC768076bfea4490D533A185e",
      "0x661760F86a1D819ed0a0cF5D187547E31ce021Bc",
      "0xBe3235e341393e43949aAd6F073982F67BFF412f",
      "0x0e6f5FcFdf85BDC937257BF41cDD24Ed16052aF9",
      "0xd1b68946dBCe0DF9C29d1911272752e67719Da71",
      "0x7484C35176C22e5c203dFe19a15Bb74495D551EE",
      //"0x6c749542676A376B8eD5A7564da7c1E4F210c610", problem
      "0x6456f8f4216CfD5E3bECb4C10b8852aaA2d3ECdF",
      "0x1A5e02366716Fca893f72271180D80CAA27Cd361"
    ].map(a => {
      return {
        address: a,
        abi: CL_GAUGE_ABI,
        stakeTokenFunction: "pool"
      }
    })
  
    if(has_sickle_account) {
      _print_bold(`You have connected with your sickle account: ${sickle_account_address}`);
      _print("Your positions are");
      _print("");
      App.YOUR_ADDRESS = sickle_account_address;
  
      _print_bold(`CL POOLS`)
      _print_bold(`------------------------------------`)
      _print(``)
  
      let cl = await loadClSynthetixPools(App, tokens, prices, clGauges, has_sickle_account, owner_sickle_address)
      if (cl.totalUserStaked > 0) {
        _print(`You are staking a total of ${cl.totalUserStaked} NFTs\n`);
        _print("");
      }
  
      hideLoading();
  
    }else{  
      _print_bold(`CL POOLS`)
      _print_bold(`------------------------------------`)
      _print(``)
  
      let cl = await loadClSynthetixPools(App, tokens, prices, clGauges, has_sickle_account, owner_sickle_address)
      if (cl.totalUserStaked > 0) {
        _print(`You are staking a total of ${cl.totalUserStaked} NFTs\n`);
        _print("");
      }
    }
  
    hideLoading();
  }
  
  async function loadClSynthetixPools(App, tokens, prices, pools, has_sickle_account, owner_sickle_address) {
    let totalUserStaked = 0;
    const infos = await Promise.all(pools.map(p =>
      loadClSynthetixPoolInfo(App, tokens, prices, p.abi, p.address, p.stakeTokenFunction, has_sickle_account, owner_sickle_address)));
    for (const i of infos) {
      let p = await printAerodromeClPool(App, i, "optimism");
      totalUserStaked += p.userStaked || 0;
    }
    return { totalUserStaked };
  }
  
  async function loadClSynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
    stakeTokenFunction, has_sickle_account, owner_sickle_address) {
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
  
      const rewardTokenAddress = "0x9560e827aF36c94D2Ac33a39bCE1Fe78631088Db";
  
      const nftToken = new ethers.Contract(NFT_TOKEN_ADDRESS, NFT_AERO_ABI, App.provider);
      let userOwnedNfts;

    if(has_sickle_account){
      userOwnedNfts = await nftToken.balanceOf(owner_sickle_address) / 1;
    }else{
      userOwnedNfts = await nftToken.balanceOf(App.YOUR_ADDRESS) / 1;
    }
      let userOwnedNftIds = []
  
      if(has_sickle_account){
        for(let i = 0; i < userOwnedNfts; i++){
          const userOwnedNftId = await nftToken.tokenOfOwnerByIndex(owner_sickle_address, i);
          userOwnedNftIds.push(userOwnedNftId);
        }
      }else{
        for(let i = 0; i < userOwnedNfts; i++){
          const userOwnedNftId = await nftToken.tokenOfOwnerByIndex(App.YOUR_ADDRESS, i);
          userOwnedNftIds.push(userOwnedNftId);
        }
      }
  
      const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
  
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
      const sickle_approveTENDAndStake = async function(nftId) {
        return sickle_clContract_stake(info.stakingAddress, nftId, App)
      }
      const sickle_unstake = async function(nftId) {
        return sickle_clContract_withdraw(info.stakingAddress, nftId, App)
      }
      const sickle_claim = async function(nftId) {
        return sickle_clContract_claim(info.stakingAddress, nftId, App)
      }
      _print(`<a target="_blank" href="https://optimistic.etherscan.io/address/${info.stakingAddress}#code">Optimistic Scan</a>`);
      if(info.userOwnedNftIds.length <= 0){
        _print(`You have no NFTs to deposit`);
      }else{
        for(const userOwnedNftId of info.userOwnedNftIds){
          if(info.has_sickle_account){
            _print_link(`Deposit NFT ID: ${userOwnedNftId}`, () => sickle_approveTENDAndStake(userOwnedNftId))
          }else{
            _print_link(`Deposit via Sickle NFT ID: ${userOwnedNftId}`, () => sickle_approveTENDAndStake(userOwnedNftId))
            _print("")
            _print_link(`Deposit directly NFT ID: ${userOwnedNftId}`, () => approveTENDAndStake(userOwnedNftId))
          }
        }
      }
      if(info.userStakedNfts.length <= 0){
        _print(`You have no staked NFTs in order to withdraw`);
      }else{
        for(const userStakedNft of info.userStakedNfts){
          if(info.has_sickle_account){
            _print_link(`Withdraw NFT ID: ${userStakedNft}`, () => sickle_unstake(userStakedNft))
          }else{
            _print_link(`Withdraw NFT ID: ${userStakedNft}`, () => unstake(userStakedNft))
          }
        }
      }
      for(let i = 0; i < info.userStakedNfts.length; i++){
        if(info.has_sickle_account){
          _print_link(`Claim rewards, NFT ID: ${info.userStakedNfts[i]} ${info.earnings[i].toFixed(6)} ($${formatMoney(info.earnings[i]*info.rewardTokenPrice)})`, () => sickle_claim(info.userStakedNfts[i]))
        }else{
          _print_link(`Claim rewards, NFT ID: ${info.userStakedNfts[i]} ${info.earnings[i].toFixed(6)} ($${formatMoney(info.earnings[i]*info.rewardTokenPrice)})`, () => claim(info.userStakedNfts[i]))
        }
      }
      _print("");
  
      return {
          userStaked : info.userStaked
      }
  }
  
  const sickle_clContract_stake = async function(rewardPoolAddr, nftId, App) {
    const signer = App.provider.getSigner()
  
    const NFT_CONTRACT = new ethers.Contract(NFT_TOKEN_ADDRESS, NFT_AERO_ABI, signer)
  
    const REWARD_POOL = new ethers.Contract(NFT_FARM_STRATEGY_ADDRESS, NFT_FARM_STRATEGY_ABI, signer)
  
    const decodedExtraData = {
      tokenId: +nftId,
      maxAmount0: 0,
      maxAmount1: 0,
      isIncrease: false
    }
  
    const extraData = ethers.utils.defaultAbiCoder.encode(["tuple(uint256 tokenId, uint256 maxAmount0, uint256 maxAmount1, bool isIncrease)"], [decodedExtraData]);
  
    await NFT_CONTRACT.approve(App.YOUR_ADDRESS, nftId);
  
      showLoading()
      REWARD_POOL.depositErc721(NFT_TOKEN_ADDRESS, nftId, rewardPoolAddr, extraData, "0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000")
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
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
  
  const sickle_clContract_withdraw = async function(rewardPoolAddr, nftId, App) {
    const signer = App.provider.getSigner()
  
    const REWARD_POOL = new ethers.Contract(NFT_FARM_STRATEGY_ADDRESS, NFT_FARM_STRATEGY_ABI, signer)
  
    const decodedExtraData = {
      tokenId: +nftId,
      maxAmount0: 0,
      maxAmount1: 0,
      isIncrease: false
    }
  
    const extraData = ethers.utils.defaultAbiCoder.encode(["tuple(uint256 tokenId, uint256 maxAmount0, uint256 maxAmount1, bool isIncrease)"], [decodedExtraData]);
  
    const sweepTokens = ["0x9560e827aF36c94D2Ac33a39bCE1Fe78631088Db"];
  
      showLoading()
      REWARD_POOL.withdrawErc721(NFT_TOKEN_ADDRESS, nftId, rewardPoolAddr, extraData, sweepTokens)
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
  
  const sickle_clContract_claim = async function(rewardPoolAddr, nftId, App) {
    const signer = App.provider.getSigner()
  
    const decodedExtraData = {
      tokenId: +nftId,
      maxAmount0: 0,
      maxAmount1: 0,
      isIncrease: false
    }
  
    const extraData = ethers.utils.defaultAbiCoder.encode(["tuple(uint256 tokenId, uint256 maxAmount0, uint256 maxAmount1, bool isIncrease)"], [decodedExtraData]);
  
    const params = {
      tokensOut: ["0x9560e827aF36c94D2Ac33a39bCE1Fe78631088Db"],
      stakingContractAddress: rewardPoolAddr,
      extraData: extraData
    }
  
    const REWARD_POOL = new ethers.Contract(FARM_STRATEGY_ADDRESS, FARM_STRATEGY_ABI, signer)
  
      showLoading()
      REWARD_POOL.harvest(params)
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
      let p = await printAerodromePool(App, i, "optimism", customURLs);
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
      const STAKING_MULTI = new ethcall.Contract(stakingAddress, stakingAbi);
  
      if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
        console.log("Couldn't find stake function ", stakeTokenFunction);
      }
  
      let stakeTokenAddress = "";
      try{
        stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();
      }catch{
        //console.log(stakingAddress);
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
  
      const rewardTokenAddress = "0x9560e827aF36c94D2Ac33a39bCE1Fe78631088Db";

      let stakeToken;
  
      try{
        stakeToken = await getGeneralEthcallToken(App, stakeTokenAddress, stakingAddress);
      }catch(ex){
        console.log(stakeTokenAddress);
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
  
      if (stakeTokenAddress.toLowerCase() === rewardTokenAddress.toLowerCase()) {
        stakeToken.staked = await STAKING_POOL.totalSupply() / 10 ** stakeToken.decimals;
      }
  
      var newTokenAddresses = stakeToken.tokens.filter(x =>
        !getParameterCaseInsensitive(tokens,x));
      for (const address of newTokenAddresses) {
          tokens[address] = await getGeneralEthcallToken(App, address, stakingAddress);
      }
      if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
          tokens[rewardTokenAddress] = await getGeneralEthcallToken(App, rewardTokenAddress, stakingAddress);
      }
      const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
  
      const rewardTokenTicker = rewardToken.symbol;

      let poolPrices;
  
      try{
        poolPrices = getPoolPrices(tokens, prices, stakeToken, "optimism");
      }catch(err){
        console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
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

      const stakeTokenTicker = poolPrices.stakeTokenTicker;
  
      const stakeTokenPrice =
          prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
      const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  
      const calls = [STAKING_MULTI.periodFinish(), STAKING_MULTI.rewardRate(),
        STAKING_MULTI.balanceOf(App.YOUR_ADDRESS), STAKING_MULTI.earned(App.YOUR_ADDRESS)]
      const [periodFinish, rewardRate, balance, earned_] = await App.ethcallProvider.all(calls);

      // const periodFinish = await STAKING_POOL.periodFinish();
      // const rewardRate = await STAKING_POOL.rewardRate();
      const weeklyRewards = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate / 1e18 * 604800;
  
      const usdPerWeek = weeklyRewards * rewardTokenPrice;
  
      const staked_tvl = poolPrices.staked_tvl;
  
      // const userStaked = await STAKING_POOL.balanceOf(App.YOUR_ADDRESS) / 10 ** stakeToken.decimals;
      const userStaked = balance / 10 ** stakeToken.decimals;
  
      const userUnstaked = stakeToken.unstaked;
  
      // const earned = await STAKING_POOL.earned(App.YOUR_ADDRESS) / 10 ** rewardToken.decimals;
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
      _print(`<a target="_blank" href="https://optimistic.etherscan.io/address/${info.stakingAddress}#code">Optimistic Scan</a>`);
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
    let poolPrices;
  
    try{
      poolPrices = getPoolPrices(tokens, prices, stakeToken, "optimism");
    }catch(err){
      console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
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
    const WEEBTEND_V2_TOKEN = new ethers.Contract(rewardPoolAddr, VELO_V2_GAUGE_ABI, signer)
  
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
  
    const REWARD_POOL = new ethers.Contract(rewardPoolAddr, VELO_V2_GAUGE_ABI, signer)
  
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
  
  function removeDuplicates(arr) {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);
  }

  async function loadVeloSynthetixPoolInfoPrice(App, tokens, prices, stakingAddress, stakeTokenAddress) {
    var stakeToken = await getToken(App, stakeTokenAddress, stakingAddress);
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
        tokens[address] = await getToken(App, address, stakingAddress);
    }
    let poolPrices;
  
    try{
      poolPrices = getPoolPrices(tokens, prices, stakeToken, "optimism");
    }catch(err){
      console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
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
  