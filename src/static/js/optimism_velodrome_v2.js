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
  
      // const _pools = [
    //   ["0x91f2e5c009D3742188FA77619582402681d73f98",
    //   "0xeC9df85F362D3EBc4b9CA0eD7d7fDecF8Cfbdeb8",
    //   "0x84195De69B8B131ddAa4Be4F75633fCD7F430b7c",
    //   "0xbcD875fADEd3D2b9458EA6b86Bd5283075D78a06",
    //   "0x8329c9c93B63dB8a56a3b9a0c44c2edAbD6572A8",
    //   "0xFc0B9A9C2b63E6ACACa91A77A80bfa83C615e6C5",
    //   "0x8D2653DC52E123D653011A335a5C37cDc268f2Af",
    //   "0xDBf3FBF3f7a1b7142Da0cdD45F6E35366AaAA35F",
    //   "0x06Ee90A75E58F1161EC4721A13B767b10A234679",
    //   "0xBdE7CD53B9080bfbae738024440C9C8b4c1401CD",
    //   "0xd717c012BCf1bE61e4472Dc8Bf7d2411558AD9A6",
    //   "0x7D11F320fC9f5e35E0345db598CFDa8B40DCEe2a",
    //   "0x261725c82e93b4Ce6892e42C5b06501a3db36046",
    //   "0xBAc89e3d69A28bE4B3E436d590a7C921a6b19D81",
    //   "0x121DE0e978D117590588CB37533ef121C8826a8a",
    //   "0xbDFbB54957262b19A32825AA70D67e55e116CB45",
    //   "0x6998089F6bDd9c74C7D8d01b99d7e379ccCcb02D",
    //   "0xA688080CA069231C6D5713CD009662Ea54437A02",
    //   "0x53F31a40570dAb360a16f8A7f913DbE84F5D1C5c",
    //   "0x7DcA0f3023B80E8C724b11ddcCac788940275f41",
    //   "0x89913088Bf483c65325FbD43Ce15051b78D762D4",
    //   "0x18A492ad4E4f6B3ED1C16D78322c6c2800c954b6",],

    //   ["0x36691b39Ec8fa915204ba1e1A4A3596994515639",
    //   "0x38Df8144d6a533be637c1100E043107fE9980f0c",
    //   "0xE7630c9560C59CCBf5EEd8f33dd0ccA2E67a3981",
    //   "0x66459b9F0BB8Bf529F6018e16d4872221AF54684",
    //   "0x54A80dd7d56388A69dab04f92df5098f71F01fEA",
    //   "0xa2f27d183A4E409c734367712f9344328f8EC98D",
    //   "0x74CcA7219cDc57CC054ACB61bE4D7231a3D0f107",
    //   "0x4Bc0547661F40e712A9793C3b99A14A68049A836",
    //   "0x779A13049ECd4105EC9dC397778ba734c553d69A",
    //   "0x172a58D5E8c11Ee554B09D924D5e2c3aFADd44C0",
    //   "0xBba74cBDDC1C316A32559881989DF7CF7e965D6f",
    //   "0xE9BB6746D2c1A8D4E943be85434D89516fF223C0",
    //   "0xa1034Ed2C9eb616d6F7f318614316e64682e7923",
    //   "0x876101FC03B37FD7C621e093aE9a47F6A2527191",
    //   "0x93e1152951CcfB02b1Ad4D8a4afC68B28cac0614",
    //   "0x04B39d8777bCBBD3b2f428A616Aa20835C19a918",
    //   "0xd2d304C2CdbF74bE9cDcC6F7a4eB94C5a9B4F488",
    //   "0xd3bad64aDfA4E442fdF21556E1f8eb7298282Ef5",
    //   "0xdfE0eea4b7Ca157cB1fAF73fAc2135164B375Fb0",
    //   "0x90715A670B9117E5a956af808061AdBDe073741F",
    //   "0x6e4b10dD7950c5dc8a084aC16F5De5ca7EE9e334",
    //   "0xd0E434831a765839051DA9C0B9B99C6b0Fb87201",
    //   "0xC9FA5eFA02852D57DD13D90D8835f9378b530a03",
    //   "0x6A38Cdef57A9d3aA0A7F9295778ffdC0B4350117",
    //   "0x9f82A8b19804141161C582CfEa1b84853340A246",
    //   "0xB3381D38e872D31cD87122a2cE66AFB9A3E6CD7b",
    //   "0xa288791DE22d1F1aFad9807acdFDCE5caa22d10e",
    //   "0xCC53CD0a8EC812D46F0E2c7CC5AADd869b6F0292",
    //   "0x31DcAC3F0Ca9B8192e45C7b73F697714039eb9cD",],

    //   ["0x3aE58F00450d4d8CAA63e30e44ab49E48E301114",
    //   "0x325c9CbbF46aaeCD4354b9Ee793197AA78ebf682",
    //   "0xc16adBf2d01d6524B79CbB610cE31d5db80eee3C",
    //   "0xA8E0754dd8Ef3700Ac8478Fdb8d4B8473de3817C",
    //   "0xd85A08e8f475F8b6276c7d6bDf17d45736FEa621",
    //   "0x21CdA2b68318651dcc2C1006Ea815e528BFe6Db4",
    //   "0xb4d10F151D79A35B953D97e912C8332c946499F3",
    //   "0x749Fa76454dBFb528532578512DEB1F512D3e804",
    //   "0xCE4F1e466a8e320c39c798907e84884616615Af8",
    //   "0x5f3Dd9DC23E1eEB97b8fB2339038f1882230465a",
    //   "0x8166f06D50a65F82850878c951fcA29Af5Ea7Db2",
    //   "0x55a272304456355242F6690863B5c8D5c512fF71",
    //   "0x95Aab5E4525B93A84D7B1B9a028dcFd84a411E4a",
    //   "0x790B716A4CCd256cB8EdE4d638a103E130dA5b19",
    //   "0x8893ED5dF577cB880619c426CFAc2Fcb98Fb0691",
    //   "0xD7560bcbc244083076Dac3D1EF7ae07d049035A3",
    //   "0xfb4a05DFf68B28CFe1dC6CEef35E2185b2023820",
    //   "0x5C391434354fF8c32F041824e966d317fFd5FBD4",
    //   "0xA876c69ec3A99347B00635c60Bd32Ae3B4a02758",
    //   "0xD3dAD08b8778f2fe2d0940D72fb3A4ca853c9362",
    //   "0x1d89868a4d52c4A1A4b9D449B0e06ef447e2Df8A",
    //   "0x09CEBb82d64FdB0649B3C2020259B86BD7Ff0A5A",
    //   "0x6b4e8FF96e0C0b3d655a3E52DDe607a36FBBEe4a",
    //   "0xa904cDc7C135DCB03e8f96eaa11Ea2bcb9E065a5",
    //   "0x04b739f3488e4ca48a1638d945d41B9Ae33424e5",
    //   "0xC263655114CdE848C73B899846FE7A2D219c10a8",
    //   "0x065B2613aE8E182112f2519B58BB842889596FC7",
    //   "0xccBf041920316bA20D16010b386c323237626FB7",
    //   "0xE6b6e3806Bb939BD7c6980bFd816B69816Dade7B",
    //   "0x0F30716960F0618983Ac42bE2982FfEC181AF265",
    //   "0x768417Ac8Cb5292CeF42132B68daF4C216Ef70ce",
    //   "0x9B9D4F18C9b1A1eE1F55708134fdeA926760d459",
    //   "0xa63313951A375D5cF684AC457e7C9F5B5cd0AC6d",
    //   "0x39457e6F1e8C46B7b50b82E7a479dC9dBa73A6A3",
    //   "0x85c243F71c5c6dB1bC25Db9FB01DB242FC6c6345",
    //   "0x742b11F785D21A67d16d9EA2ae60667AeAd2dDD1",
    //   "0xeF306720E388E139281e4b77F454638F14E26184",],

    //   ["0x601827Ae1D4D11A84521007e21cfb39C964D5dB8",
    //   "0xEDA74E1C6Ec8Bf477C87719FFDf8B8C173154deA",
    //   "0xbE700B2252a56FfdCb4132dA6f8bc8Ea15AaE777",
    //   "0x691758a7aDA860b2ED1E744E34A0A1Aa2B150A15",
    //   "0xda6B1b1b2Cc458A50E5CD5d0e875580688b8ab78",
    //   "0x622cbf843F75b60E7c804462219019233247415b",
    //   "0x0f2743016AE7D9dC8b627b211cd0f5d98d5bB430",
    //   "0x6e8d7a8a0AC71F37a44d5D663e96E986E9978FE9",
    //   "0xeDB6C14423b4A097Cd44f9f845705504d55049d6",
    //   "0xcaFd32c363573118F1346516035D681062487aA4",
    //   "0x08f9757C2CA7dea13cA17B53dC5A9dba97FF2Eda",
    //   "0xC6e3f1041A967F61dE29c709C980F89050341ce2",
    //   "0xd27ceE42fF4bF5c4f1208A1c0427310B177e1796",
    //   "0x5b2219eF3dc0f85dC9b548592AEE6173D3a7D1Ab",
    //   "0x666F5B0bB2AF8CbA35E561a654753334A3D9a902",
    //   "0x9f7Dc808aE9C08afF2bf71cb846B52236403e9A9",
    //   "0x80e79722F75e08d4D3EC5D138c03d9A59465b975",
    //   "0x613137e8F8083D262055a34a73Dc19a652833106",
    //   "0x6671938e6C71d9652065d42a0Bd8a06E334EF0aD",
    //   "0xe16a33dF116B7BC0a75DfcE5249C7dCD69BA368F",
    //   "0x80B8b9CC4df28fa49b4E58e887E34Ed59B6dc8C0",
    //   "0x6101236Fd0E04427952799323D89B99BE0eab52f",
    //   "0xB715D27CCe97e869Cff840072ce1Eab1d982791E",
    //   "0xA74859536D4AE7DF3D0654e93Ea6960eE0501988",
    //   "0xE4D1B24F2DaefE980966b25c06331835f68C2A56",
    //   "0x7CC9Ff062d396e6d1669C068C87Fd58FA03d5103",
    //   "0x10c9a929C02B6DccC0373d7869f0165E4952bdaB",
    //   "0x2f7B55509978762e76440aa318b9a5DdA48A2654",
    //   "0xC94A0ecE8637192608ae452fdAa34f2E362D94A3",
    //   "0xAa23c8a876BB875B81D05E4887C89CeA3536185E",
    //   "0x019A88098e078D1ffA0503d7d7721A8c93B853C5",
    //   "0x191a495f6d3481797C189ed14e88C205f20d69c0",
    //   "0x5BcA1D006cD356CC1Af72183dcEDF093A3eb56D7",
    //   "0x1a36ee668E69bCeB3aAC0B40b434df8fC7CA52d0",
    //   "0x2b82B4B3D90c5BA857C2662777Cb1505aEe727B0",],

    //   ["0xd282d2c6D00d1a152b791C2C797e1F3bAeE7b9cC",
    //   "0x2637bc0468C6948C7F7d6984a5072F9E2bD66f38",
    //   "0x2Ce61D0fC3D7c05fd7f0910Bf3E62e1d712c15CA",
    //   "0x659df4377873b6ac75187cE96368C7bC2C016cc8",
    //   "0x7A686682fF5d7B5deFeD5A25346059087bC7d2c6",
    //   "0xD396ecAF56058D2f5a0E4f90742c5e0D522E2da2",
    //   "0xE3fBb66f3891bf49fAA56F577Aa28f5566359632",
    //   "0x8C61Ebd8f40BF920e9065Db80d194541D895Aa80",
    //   "0x0B09767bA62084Ad6db640D9fC7e5e9BADaA1BbE",
    //   "0x54A383Edae87C0342a8c42a273069648D7616B85",
    //   "0x1E10A1aF8d6d46CC10d2B87DDC4e554d924c840a",
    //   "0x8024D776F1013e140244ea5907A1BB27162bc0A2",
    //   "0xfB46E2B7BAD4BeE44c8F13C018e92F0557BAd059",
    //   "0x627A80452eCa8bf863bABcd0DA184976999461B7",
    //   "0x6Bf9B9C779CD56e42CCff916955B6352b51166B8",
    //   "0xe06c4B83430e9ba514621F8277547Ed70534903F",
    //   "0xbc8E6E4EA64E1B1Da50B8FFc27F7395034e978AB",
    //   "0x89Af7F95f8532F32eA82b43ABaDf41A50B57d907",
    //   "0xAc714570F267569E409057df17b9f49E7efaDdA5",
    //   "0x3c1367b0B1F63704124858E9DfA7f1a1A66aa152",
    //   "0x5AE3a1D8fA88785adF7c9a43d2E60b63BE3d4892",
    //   "0xF2c23b14217f139bd45873Cc86eB6294ac4cb155",
    //   "0xbdde21F13F2DB51AC94f000515c4132D53b3C962",
    //   "0xe035eA2333792A1499EedF3C59575e0e2B4caff6",
    //   "0x674D945627fb2eF3CBc3551dd6E4557013315feC",
    //   "0xBfD8583b46CF82e1f7B23435762A58b2116a8037",
    //   "0x3EdC1FeD916096fb58C4112C4aaC5d53Bf63484f",
    //   "0xC8683C81f7cE20b1a2878586a069086682D43972",
    //   "0xcC1a390EE7FdeC5F7a89E706c2235C8037F779Ee",
    //   "0x2c91fCfcf4d6F218ca8FE0D70F7f851a4b41140B",
    //   "0x33a33B50282B1C940b55871614a09cA7AbFda2B5",
    //   "0x732D9eeBB9288d5B7605829321F859a7A7dfdfD0",
    //   "0x239E26393e3E1B8865F9E829B83A210d1fA91F0D",
    //   "0x5c5a8B5F31350A73382736604b0a76e2Df18196A",
    //   "0x89852bC6C7cC61243307ea820dCf00c451926DF2",
    //   "0x236593E0139A542afEd346F5D8De7F52034Ef9Ab",
    //   "0x407B9db29beE2580D46f2d20d6303C732068C968",
    //   "0x31D553E63a92D5dc89FcE8c2e753ba422fAA2b93",
    //   "0xCC141AABB6C05b025118eDec0dbcD34F2193425b",
    //   "0x335d1f79cCDF4dA1AFAaC92228d15230dd5be9CB",
    //   "0xe8144D9Ede7E0a70dD41220512D7a16592CeD209",
    //   "0xA8013d60e6183B253E40F93aFE6A7EBE5CeB9Ea8",
    //   "0xeC01e371bcF57452Aa47C285Caae95e45CcB33d3",
    //   "0x76ec1eF8c0F72ccdFbB661664C6cB0Ac187D2fB5",
    //   "0xb91F873D3fed53B21ac348Ee86DEaf924D1f3818",
    //   "0xae00D05F0e252BC00F9cCe9b3ec6CA3Bdadbc150",
    //   "0x670704294a37F698E4cf921474eeefCaea06ff21",
    //   "0xdabD22f74cB002a6609dC9560e8b71b7e950C2d6",
    //   "0xAE537a5e73e56DF2DB26a6384F53edb443EAFCf0",],

    //   ["0xd5999E5c95f586341A91A9E4398d20187De67ba0",
    //   "0x038FB458E8bE919fBA3E3F82400fFb73B6736263",
    //   "0x4956B64cdC939C1e04344066078C85aaE83560e5",
    //   "0x7c116fa3B3dc90a990837002830790112bB1C950",
    //   "0x0b077441f4Eb1A11F03B7B7409e6951A446C7459",
    //   "0xACd75e1A505959ACD2320B5256D0d2566a7567Ad",
    //   "0xF686424d4F3572E4624BdDF8A00Fb77Fe748237c",
    //   "0x1239c54D9fd91e6EcEC8eAAd80dF0FEd43c47673",
    //   "0x2712c1D8FF9Da721EA82c748fda14C908A615582",
    //   "0xeD6f12a699F20690D8930De58eF923d528f1A456",
    //   "0x917a64CF946c7eA5594bdC153393D28134b035Bb",
    //   "0x5B97B8a28bD16E3a46E2baF85a25d946f2bc36CD",
    //   "0x5dB64E8050534eE0b41b5295Bf5fcBb402b3CaFA",
    //   "0x34632B0B9F8f8E5c911aB2679d38fD4aD08C59C9",
    //   "0x43D1bCc808229a4b2d98099C47cc3C61DA7D065A",
    //   "0xd58aF62f08E44Da76201d365d20668940e8b4CA0",
    //   "0xd29665Ed03Fa4c1cDa470E6EF2A77FAB2291bB26",
    //   "0x8d2723Fe2bfc3E9C2515a8789dADF8C82f58F04f",
    //   "0x0E9E97308Ef8e35211a21aEf9708dCC80F3D79ef",
    //   "0x74C97b9aeB2f5b1841Ba99bca6991E8531715E0C",
    //   "0x564f2b232B88F236bD29bC1Db539bdE89C3013A7",
    //   "0xc23f518F2630fbBC302ccC480222Ca20c153De06",
    //   "0xCdDCe16cb23716C29150AA25A871B4c230E53c9C",
    //   "0xAfC326D739944b93600cfE4C28CfB96B6790D34a",
    //   "0x2F434CAD1525c38FF21AA60DD55E8a2C924fE1BF",
    //   "0x9E3E0D960641d664c4f7d4A94aD3C76BdaB1aA53",
    //   "0xe8b26D5e46a58e7B4de7E37576BBe919D8C823Ad",
    //   "0x8cc252a212a42E381B0774EbF936C8615d9D3b44",
    //   "0x6E76d2929b490cB651A48420B730f4A9937F7d15",
    //   "0x57E13E46401dA3cC1dd5ABAD73d72F71a2C2c2EC",
    //   "0x3838cAbE4021B5b3426C177300BB3b0dD39DD8D8",
    //   "0xc543C32dFC85Da41E1Be2f45343a42c77b5074C3",
    //   "0x7C07703B1f470b7673bF65aE6d49883AF2cA341e",
    //   "0x0193b726f29D7E12c8B1778298F888c546D0543F",
    //   "0x80803E48Bc711073683b632A059680aF3602f874",
    //   "0x71646840824dD0cB7D2c3E7f4E5D1D49810Cd121",
    //   "0x5D517b3025e0C502a1b3c73Fcb87210eba994a96",
    //   "0xDf89869a044C9ca690c17eE1EbFaf86a29E17FC8",
    //   "0x684f8bbc0544B5366e49FE1AF5a5cCF0BdAc656B",
    //   "0x0e9a70551E121aaE0c2BAfA056Fc60CACA465A1D",
    //   "0x47e5b9AF0bf7Bb445110946F6211790E1261B973",
    //   "0xc3d704D0CFc93Ab1aC56BeD5aaA25E5e4dA844A4",
    //   "0x413003a8f15AA90A54B610fD7A4f32a0616f62e0",
    //   "0x97c60BCc7B401b9DD474a1B02eD484976c112fE2",
    //   "0x1dc44eC6C01A85A7016500c7FEd26fe8c3203442",
    //   "0xa79445a509499ADd42ef514D821562A602bEf904",
    //   "0x8Fd8a76d97cC9F6A5Fb2846121b80b0A6f11Feb6",
    //   "0xE1b6573D7750f6AF38393c2D8Cd33aAbd9Bf4c78",
    //   "0x71B6aBB3D88dF6922DCb2659FB5049b417bEaEb8",],

    //   ["0x771Ef0171514F9FDD67c71f1D801Fa095Bb7c484",
    //   "0x5aB6fAf49f9132510FF1e355BBa32Fa3EB2d0f9b",
    //   "0x9C3670f125278936f5d2D80c3D975Bc0d8C7C721",
    //   "0x7E20D03b5ec34c8A3014e07670E10077ea57Be2E",
    //   "0xE5A9d62615D7946FBF4FcBa9aA6C90dCFB5AC432",
    //   "0x2dA005b32EFC42B8911d5841709339dFA8A2d2dA",
    //   "0xf9ddd38A4e0C3237563DBB651D1a155551e54ad6",
    //   "0x255E21F207888b6cA4400524c75Cc70dEDe6B968",
    //   "0x89fD348da74C781Ee15333E098C123b4953A13A6",
    //   "0x9f79f5E3D260810281D9B1C67c2A0b7f8DdC2423",
    //   "0x7D21F6712aB6e910DB8FED5B7c8D5911fDa82572",
    //   "0x588Db2B2AA417e07d2BC474eD29917c3d8C9f0aE",
    //   "0xF3f42583A7e2B2720C8D5e6f534D973EA4f63524",
    //   "0x8350A053488d8c5aF3eF6724BF1cAb03E8A53d58",
    //   "0x598631B5F55499C3dE1Ee0B39afb240b53123cd5",
    //   "0xfeF349f94df1b96Fd256378417925924874482bd",
    //   "0x789B62E08bD6c71b81b9716Aa170FBc6bECb1e87",
    //   "0xb69802bA1e79D0bd9EbD02F0fAc935886342f455",
    //   "0x1EA333626e421345e02e13d6Dda97C11e3Fe38B8",
    //   "0x8F5f352f93284bD9F89E30CB93777FC2663a6877",
    //   "0x1EEB549206218c39Fd9Bb46fd00E92026933Df21",
    //   "0x5b71A982EbC2609c78aFD96D56BCeEBE14B3bC99",
    //   "0xe3FCC4575860349A998Fb2d35D025670CbD81437",
    //   "0x2220Bd99a52458E60d45030E1E3F41C5f043Fc90",
    //   "0x3578e7e02cFf00c6f014Fe0533277D27aa49c2D7",
    //   "0xf4f906DAb74Fd2337EACe6972816527F440D491C",
    //   "0xfe6d661be877D024B0d7E8799133648eee2a707a",
    //   "0xf4aA7A958D823b4314f0235e2d0AbD74225266d3",
    //   "0xd441b2C2c371C34f7A942972c180512Df70D6008",
    //   "0xb0D9BF706fC3d79e62f7015414770238a7b29434",
    //   "0x1DD1ACAFDC97257DeAC9A620127cED997a56AeDc",
    //   "0x0e87b279251bD339b0fe05e199633265f4Fe22AC",
    //   "0xB230575c629F9ac3E795FEfb5eeAE51a3ED941ab",
    //   "0xE560A8f55746a80435BaF4556109D457C7b25Ca1",
    //   "0xa3Fa965306b7935c18D1e834FfEdCd7Dd42a0B50",
    //   "0x8a74c3C63f7b51C7f8e61b2CDEE9Ee06946F1C37",
    //   "0x5625F486762bA84C67E0cf85205D623d9bFcf7CE",],

    //   ["0xe93F228cC0da7C9F600b607f40C120C47F0DDD84",
    //   "0x68950E787B9Ded31D4E2B2418D7C09fDDf4d32BB",
    //   "0x6dd083cEe9638E0827Dc86805C9891c493f34C56",
    //   "0x7c2D2C6ba512e5dDCEE2769a842072b0733a8F1C",
    //   "0xfAc0Cf9e487356DDc72443061DFDB109885B04fD",
    //   "0x2D807BDfF7124487b90E50fA1A79e0a3d3da98A3",
    //   "0x1b9CA1C47A3aAAD8d094C224204076D36333D87e",
    //   "0x5702BD68Ec1cad5FC007E19cE75E74a662539733",
    //   "0x32dB7766465c0689bE3c6506582ec163F1770237",
    //   "0x956964Ba40e3772A320c4204d8489066F4A08EB7",
    //   "0x60861f228AF12461a6D42C970b3eFF5648504b13",
    //   "0x06145EF79CfAd7F057bC8aE68eC8c8C41E4D13E1",
    //   "0x324D5B0c7c054EAEa91cf7411478Ff317611EfB2",
    //   "0xd1cfB06fD0a8C055688362D01f938283DcA5862C",
    //   "0xEa76589e16066cfD1b17499d6c8d3776EfD385D3",
    //   "0x9A4f24307241729e35F9F648e1bdAbf60a528B4a",
    //   "0x307f5b38d49bB1004762108f062E937Ec55d16B1",
    //   "0x9668Be1A67697aC2eDAe86cE3AB9f022b58391fb",
    //   "0x43C6819e9a45aa83cc3FE7a54c8089BEe0761Fa5",
    //   "0x1e1bA18384b4A610Cc868dce2f6576048328e28B",
    //   "0x7cee16Be90652bF4063d929F4AE31165c1f2053E",
    //   "0x49A45B6b1D12640B5f32f11Bce93d4bb494c736E",
    //   "0xB4728965C79Ef7Ae437d37b1459fFA0130f725BE",
    //   "0x9bE8f84D59E56bc00c23FA937eAce81904D843Bf",
    //   "0x83C512f48DF3719DE890932Dfb32bf71Bd58FCf4",
    //   "0xD41f160d3692888FC1AE33727D7416B62d521B0F",
    //   "0x8dce693130c57B4960a0D682b7A418D31c4912A2",
    //   "0x975ECABdd145ddCF31f81c02dC2Ce402B029118B",
    //   "0x68c0cdDA2699998BE3ea942b94acD61b2f82e470",
    //   "0xF168D36d526c75be671e6CC197013De35d44087b",
    //   "0x83f14EdafbdF658990e65FE188eD6F0C90533726",
    //   "0xcFa050836C3E5dfA98D065d2f365Cfd78a9011F9",
    //   "0x3272946B6244d29458579d6182eAa8Aa7402F729",
    //   "0x9647BC2cD383deC17D2a0b154c48c7a24dB72640",
    //   "0x0E4c56B4a766968b12c286f67aE341b11eDD8b8d",
    //   "0x5591a4a04629AA0cC0Dd281E8EC5a692ee68F8Cb",
    //   "0xbd46CBAD033b3FfAF33A4d7766c590c26F1F7575",
    //   "0x328665A957f61A6EDa630216759E216b229f9821",
    //   "0xB7610606584f2Ad7293101F3Dd89c794313d61dF",
    //   "0x4446772Da0E835B986E3861fc6a96c61637c3aF6",
    //   "0xe473B42E6ebD9048E80aa8ed0ceD9fF5a6b040d8",
    //   "0x45384653c3fc622d32c4269D5BB76D7b4E34aF05",
    //   "0x57e53e14a2655F6D350Ea3f3CB6Eb95247b85cEc",
    //   "0xF5F10Ee71df6FE1EA33c780Ab7857a412ca7Fb24",
    //   "0xac1a02fB37f29cb5B1f5ABB5C9E45470f3122975",
    //   "0x67563688D0Fe7C0db3FF8Adb5B165d62EB9F3Ee0",],

    //   ["0x0597171C22D70c545889179bBFdC6a9c65D8fbE0",
    //   "0x6843823b4BDEDd8a85134D6D0d59D88830EF9F00",
    //   "0xF38F7603023f6dbe7B514Ef364DD88D4c936A470",
    //   "0xFf6b058484517BF58450DfC4a6eb53F1A2171775",
    //   "0x6C9242CF71e4EfEE76E795c02aaad441ac88D419",
    //   "0x52f5810EB42fb24a8F8147666006BD3612902B49",
    //   "0x870c3e8CB17c6d93d18611483f10f72069b0273D",
    //   "0x4c3616b21007Cd64e4674bB7BEb4ec2986DA66d0",
    //   "0xfd57C6720Ce95B85A3d686a41D3746dcE9322Dd7",
    //   "0xBd093b8eF7B6F9d9AA964bD9DEf8A8969cF9217b",
    //   "0xCF98de1c8aFf44388FB7c3bc829B59456F8eA0e4",
    //   "0x73d5C2f4EB0E4EB15B3234f8B880A10c553DA1ea",
    //   "0x93EF61EE54bf217aD1BE909b97D4B645151d35f0",
    //   "0xe7e9775dDA64dF7c8B1a7916F657A238559c3C31",
    //   "0xBde5E1592AEb3D8396b90c4B4ba274E5Ae31e552",
    //   "0xAc6377626a6aD32E7cd7c34E1b2A2B128b1d096b",
    //   "0xe5E38b78E61B0Ab102B9a67D52843188F7456339",
    //   "0x2556235512706895579d9a48a6534d85418Cd9AB",
    //   "0x78945Dd016A0e767529351D859B923A8C2D634Ea",
    //   "0xA99D4c96a2470b19e4dcb2Cd1f2bc2AAAcCAc53F",
    //   "0x158B52cd6D1B907EB90866eb32E7904A3324BFdA",
    //   "0xDb9211E83e32d470D7AD6157228DbB1656b8847F",
    //   "0x69f7d7893Ace538296f9285BaE70631D481D0fDB",
    //   "0x43b417344aD268Fc22853dB99ea27DB4cbdd6362",
    //   "0x2ED91B84e67774416ad331454c254dBeABE01400",
    //   "0xC617c8f3a2B607234AA07B5598847Bae4B58Af13",
    //   "0x6b8242e74Bb0EF58e20414A93c8C69265E85Ef6C",
    //   "0xCd90d4B8c11D58c16515D044F60b4ED7C11CDB66",
    //   "0x4d679b4151533A4a26924091e3101ca2c26bFBbF",
    //   "0xC20e47F58b7ca4DFD4D5F8d5380472e0f4f4b521",
    //   "0xcEe86F120323b56d60a5e5d1A7861fc5cd9C0627",
    //   "0x75281897ab2C4f2498d7e36219D85f953E359cB2",
    //   "0x3FF12F77DAB6c2BB3b5a252DeCbC348bcC18142B",
    //   "0x697246F95Ec9C5Fa7879dFd03Dc7adfBB4b2f98F",
    //   "0x61CC70Db4cEB62a5221Afd0c2b96c28F17024be8",
    //   "0x1f8303Fa3DfD6bD009dB95798Ad0eA645de443b3",
    //   "0x6F58c7C3F8de57d7D0D97e8b3Ed2D05D17ED62c7",
    //   "0xc29fFA491A55e2187D3845Fad1B26A2288B8AC4D",
    //   "0xA4F9CC79ce76B8d14cB9bb4c85CA7e246E8EB8c3",
    //   "0xF2c441C314Fb5337D63984Dbec96AaB3DD6BDED4",
    //   "0x6eC9071957f29969f42c8F08Abe9026accae6FDF",
    //   "0x2C83fE5FB20a8E7cC562F3C521D845B1eDe48D85",],

    //   ["0x35288d64387BaD6EF0AbB8382C8E775b8Fb90619",
    //   "0x5a8A27b77d1D85F86DE917E912112b44B8596FC9",
    //   "0xD3869E5227ae9Af81933bd663A6012530c15BE49",
    //   "0x56aF9C2872771Cd2d0E401D699eAB736c91b456A",
    //   "0x853CAcEc83e4183eF78d6b64ccca3de365861CaF",
    //   "0x62678a3aAe21A3Fd6c1d471105abe695974F8Cce",
    //   "0x7F65A0652Ac8Dec220aB8990Eba1753ce5862a21",
    //   "0x7916f9c19d16456DDe5e57f42757C7d85fCee656",
    //   "0x4fa2C1845C46817F0A359dB65443fBB85983BCF3",
    //   "0x62D9e4e99482aF8D573d5ce1ed527C96783153ad",
    //   "0xCD8967c37daa5205B25177c8F72f25B9c1F5B80b",
    //   "0x20d1a052Dc4194342765D4d97A863a29A369dA12",
    //   "0xA1ea60095386b0792D8a502DF3CF75D8814Aaf71",
    //   "0x661b82D574a72ee82dE95E5Ed854441d8202cb7F",
    //   "0xE8b219c285e4e4ec28ac80Fdc4b9739b18cB8890",
    //   "0x7b3f9Ae95D8852078E49168505d6C897E4B11B6E",
    //   "0x727f8087a19c0074262fB20Be2f0C650516C7108",
    //   "0xd5e295C9D1a810a69A37177928c3E2d571c7d3eD",
    //   "0x6c749542676A376B8eD5A7564da7c1E4F210c610",
    //   "0x5FBa15454647FeCbCaf1134B2cfC2C62FDAD808E",
    //   "0x98648E6127C1ef3B83cFA76653bb6330aEb3C112",
    //   "0x92396Ac9fA799C68e3651fD33C3061661D785f45",
    //   "0xDaaA1681Fe853EcA38Ba5F12b04004841d543C99",
    //   "0x719274487726990998924A1A6e3624a84BD80c99",
    //   "0xdEa6730B789EE799DbA9fe20f5B473c60Ce41284",
    //   "0x90be118bB4eb350e9f133978Cc19d5d11656eE8d",
    //   "0x13bAeC9C12544066a7918efc3D8b626dBbFE1615",
    //   "0x51af8516b058e0dC9eE0896FDa8EAABd28ba1394",
    //   "0x599257fD4f669f3CbFBB72E4a61860FE5513fF76",
    //   "0x4d41d9Cb911A213B676d03a7b0e40f3a16FaC0d0"]
    // ]