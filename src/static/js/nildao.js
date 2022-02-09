$(function() {
consoleInit(main)
  });

  const NIL_STAKING_ABI = [{"inputs":[{"internalType":"contract INil","name":"nil_","type":"address"},{"internalType":"address","name":"dao","type":"address"},{"internalType":"address","name":"vNil_","type":"address"},{"internalType":"uint256","name":"rewardRatePerSecond","type":"uint256"},{"internalType":"uint256","name":"votesRatePerSecond","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"minStakingPeriod","type":"uint256"}],"name":"MinStakingPeriodSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"rewards","type":"uint256"}],"name":"Rewarded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"balance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewards","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"votes","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"balance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewards","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"votes","type":"uint256"}],"name":"Unstaked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"spender","type":"address"}],"name":"VotesSpenderSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"votesSpent","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalVotesStored","type":"uint256"}],"name":"VotesSpent","type":"event"},{"inputs":[],"name":"ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"GUARDIAN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balancePerAccount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"calculateCurrentRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"calculateCurrentVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"claimableOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"emergencyShutdown","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastRewardsRateUpdate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastVotesUpdate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minStakingPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mintAndStake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"nil","outputs":[{"internalType":"contract INil","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRatePerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardsByAccount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"emergencyShutdown_","type":"bool"}],"name":"setEmergencyShutdown","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"minStakingPeriod_","type":"uint256"}],"name":"setMinStakingPeriod","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"voteSpender_","type":"address"}],"name":"setVoteSpender","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"spendVotes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakingTimeByAccount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalVotesStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newRate","type":"uint256"}],"name":"updateRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newRate","type":"uint256"}],"name":"updateVotes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userVotesPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vNil","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"voteSpender","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"votesByAccount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"votesPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"votesPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"votesRatePerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

  const N_STAKING_ABI = [{"inputs":[{"internalType":"contract INil","name":"nil_","type":"address"},{"internalType":"contract IN","name":"n_","type":"address"},{"internalType":"address","name":"dao","type":"address"},{"internalType":"uint256","name":"rewardRatePerSecond","type":"uint256"},{"internalType":"uint256","name":"votesRatePerSecond","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"minStakingPeriod","type":"uint256"}],"name":"MinStakingPeriodSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"rewards","type":"uint256"}],"name":"Rewarded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"balance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewards","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"votes","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"balance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewards","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"votes","type":"uint256"}],"name":"Unstaked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"spender","type":"address"}],"name":"VotesSpenderSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"votesSpent","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalVotesStored","type":"uint256"}],"name":"VotesSpent","type":"event"},{"inputs":[],"name":"ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"GUARDIAN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"INVERSE_N_SHARE_OF_NIL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"N_SUPPLY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"N_UNIT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"VOTE_DENOMINATOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balancePerAccount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"calculateCurrentRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"calculateCurrentVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"claimableOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"emergencyShutdown","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getEight","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getFifth","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getFirst","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getFourth","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getSeventh","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getSixth","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getThird","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastRewardsRateUpdate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastVotesUpdate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minStakingPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"n","outputs":[{"internalType":"contract IN","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"nOwned","outputs":[{"internalType":"uint256[]","name":"nids","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nil","outputs":[{"internalType":"contract INil","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"nid","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRatePerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardsByAccount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"emergencyShutdown_","type":"bool"}],"name":"setEmergencyShutdown","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"minStakingPeriod_","type":"uint256"}],"name":"setMinStakingPeriod","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"voteSpender_","type":"address"}],"name":"setVoteSpender","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"spendVotes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"nIds","type":"uint256[]"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakingTimeByAccount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalVotesStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"nIds","type":"uint256[]"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newRate","type":"uint256"}],"name":"updateRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newRate","type":"uint256"}],"name":"updateVotes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userVotesPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"voteSpender","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"votesByAccount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"votesPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"votesPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"votesRatePerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

  async function main() {

    const NilPool = [
      "0xEc504e40Aed023a403aD9B72AF7fdf54126856fa"
    ].map(a => {
      return {
        address: a,
        abi: NIL_STAKING_ABI,
        stakeTokenFunction: "nil",
        rewardTokenFunction: "nil"
      }; }
    )

    const NPool = [
      "0xbE3026082402c7BB344729ce3a51b259bF1e5915"
    ].map(a => {
      return {
        address: a,
        abi: N_STAKING_ABI,
        stakeTokenFunction: "n",
        rewardTokenFunction: "nil"
      }; }
    )

    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");

    var tokens = {};
    var prices = {};

    let p = await loadMultipleNildaoPools(App, tokens, prices, NilPool)
    let p2 = await loadMultipleNildaoPools(App, tokens, prices, NPool)
    _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
    if (p.totalUserStaked > 0) {
      _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
    }

    const SUSHI_CHEF_ADDR = "0xEF0881eC094552b2e128Cf945EF17a6752B4Ec5d";
    const SUSHI_CHEF_ABI = [{"inputs":[{"internalType":"contract IBeverageToken","name":"_sushi","type":"address"},{"internalType":"uint256","name":"_sushiPerBlock","type":"uint256"},{"internalType":"address","name":"_treasuryAddr","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Harvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"},{"indexed":true,"internalType":"contract IERC20","name":"lpToken","type":"address"},{"indexed":true,"internalType":"contract IRewarder","name":"rewarder","type":"address"}],"name":"LogPoolAddition","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"},{"indexed":true,"internalType":"contract IRewarder","name":"rewarder","type":"address"},{"indexed":false,"internalType":"bool","name":"overwrite","type":"bool"}],"name":"LogSetPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"sushiPerBlock","type":"uint256"}],"name":"LogSushiPerBlock","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint64","name":"lastRewardBlock","type":"uint64"},{"indexed":false,"internalType":"uint256","name":"lpSupply","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"accSushiPerShare","type":"uint256"}],"name":"LogUpdatePool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"caller","type":"address"},{"indexed":true,"internalType":"address","name":"oldAddress","type":"address"},{"indexed":true,"internalType":"address","name":"newAddress","type":"address"}],"name":"TreasuryAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"SUSHI","outputs":[{"internalType":"contract IBeverageToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"contract IRewarder","name":"_rewarder","type":"address"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"addedTokens","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"calls","type":"bytes[]"},{"internalType":"bool","name":"revertOnFail","type":"bool"}],"name":"batch","outputs":[{"internalType":"bool[]","name":"successes","type":"bool[]"},{"internalType":"bytes[]","name":"results","type":"bytes[]"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claimOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lpToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"pids","type":"uint256[]"}],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingSushi","outputs":[{"internalType":"uint256","name":"pending","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permitToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"uint128","name":"accSushiPerShare","type":"uint128"},{"internalType":"uint64","name":"lastRewardBlock","type":"uint64"},{"internalType":"uint64","name":"allocPoint","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"pools","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewarder","outputs":[{"internalType":"contract IRewarder","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IRewarder","name":"_rewarder","type":"address"},{"internalType":"bool","name":"overwrite","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_sushiPerBlock","type":"uint256"}],"name":"setSushiPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_treasuryAddr","type":"address"}],"name":"setTreasuryAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sushiPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"},{"internalType":"bool","name":"direct","type":"bool"},{"internalType":"bool","name":"renounce","type":"bool"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasuryAddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"}],"name":"updatePool","outputs":[{"components":[{"internalType":"uint128","name":"accSushiPerShare","type":"uint128"},{"internalType":"uint64","name":"lastRewardBlock","type":"uint64"},{"internalType":"uint64","name":"allocPoint","type":"uint64"}],"internalType":"struct MasterChef.PoolInfo","name":"pool","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"int256","name":"rewardDebt","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"withdrawAndHarvest","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    const SUSHI_CHEF = new ethers.Contract(SUSHI_CHEF_ADDR, SUSHI_CHEF_ABI, App.provider);
    const rewardsPerWeek = await SUSHI_CHEF.sushiPerBlock() / 1e18 * 604800 / 13.5;

    await loadSushiChefContract(App, SUSHI_CHEF, SUSHI_CHEF_ADDR, SUSHI_CHEF_ABI,
      "SUSHI", "SUSHI", null, rewardsPerWeek, "pendingSushi");

  hideLoading();
}

async function loadMultipleNildaoPools(App, tokens, prices, pools) {
  let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
  const infos = await Promise.all(pools.map(p =>
    loadNildaoPoolInfo(App, tokens, prices, p.abi, p.address, p.rewardTokenFunction, p.stakeTokenFunction)));
  for (const i of infos) {
    if(i.stakeTokenAddress.toLowerCase() === "0x05a46f1e545526fb803ff974c790acea34d1f2d6".toLowerCase()){
      let p = await printNPool(App, i);
      totalStaked += p.staked_tvl || 0;
      totalUserStaked += p.userStaked || 0;
      if (p.userStaked > 0) {
        individualAPRs.push(p.userStaked * p.apr / 100);
      }
    }else{
      let p = await printSynthetixPool(App, i);
      totalStaked += p.staked_tvl || 0;
      totalUserStaked += p.userStaked || 0;
      if (p.userStaked > 0) {
        individualAPRs.push(p.userStaked * p.apr / 100);
      }
    }
  }
  let totalAPR = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
  return { staked_tvl : totalStaked, totalUserStaked, totalAPR };
}

async function loadNildaoPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
  rewardTokenFunction, stakeTokenFunction) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
    const STAKING_MULTI = new ethcall.Contract(stakingAddress, stakingAbi);

    if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
      console.log("Couldn't find stake function ", stakeTokenFunction);
    }
    let stakeTokenAddress = ""
    switch(stakeTokenFunction){
      case "nil" : stakeTokenAddress = await STAKING_POOL.nil();
      break;
      case "n" : stakeTokenAddress = await STAKING_POOL.n();
      break;
    }

    const rewardTokenAddress = await STAKING_POOL.callStatic[rewardTokenFunction]();

    var stakeToken = await getToken(App, stakeTokenAddress, stakingAddress);

    if (stakeTokenAddress.toLowerCase() === rewardTokenAddress.toLowerCase()) {
      stakeToken.staked = await STAKING_POOL.totalBalance() / 10 ** stakeToken.decimals;
    }

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

    const calls = [STAKING_MULTI.rewardRatePerSecond(),
      STAKING_MULTI.balancePerAccount(App.YOUR_ADDRESS), STAKING_MULTI.claimableOf(App.YOUR_ADDRESS)]
    const [rewardRate_, balance, earned_] = await App.ethcallProvider.all(calls);
    const rewardRate = rewardRate_ / 1e18;
    const weeklyRewards = rewardRate * 604800;

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
      stakeToken
    }
}

async function printNPool(App, info, chain="eth", customURLs) {
    _print(`Staked Token : ${info.stakeTokenTicker} Total Supply (${info.stakeToken.totalSupply})`);
    _print(`${info.rewardTokenTicker} Per Week: ${info.weeklyRewards.toFixed(2)} ($${formatMoney(info.usdPerWeek)})`);
    const weeklyAPR = info.usdPerWeek / info.staked_tvl * 100;
    const dailyAPR = weeklyAPR / 7;
    const yearlyAPR = weeklyAPR * 52;
    //_print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
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
      return rewardsContract_stake(info.stakeTokenAddress, info.stakingAddress, App)
    }
    const unstake = async function() {
      return rewardsContract_unstake(info.stakingAddress, App)
    }
    const claim = async function() {
      return rewardsContract_claim(info.stakingAddress, App)
    }
    const exit = async function() {
      return rewardsContract_exit(info.stakingAddress, App)
    }
    const revoke = async function() {
      return rewardsContract_resetApprove(info.stakeTokenAddress, info.stakingAddress, App)
    }
    _print(`<a target="_blank" href="https://etherscan.io/address/${info.stakingAddress}#code">Etherscan</a>`);
    _print_link(`Stake ${info.userUnstaked.toFixed(6)} ${info.stakeTokenTicker}`, approveTENDAndStake)
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

async function loadSushiChefContract(App, chef, chefAddress, chefAbi, rewardTokenTicker,
      rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
      extraPrices, deathPoolIndices, showAll) {
    const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);
  
    const poolCount = 1;
    const totalAllocPoints = await chefContract.totalAllocPoint();
  
    _print(`<a href='https://etherscan.io/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  
    var tokens = {};
  
    const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
    const rewardToken = await getToken(App, rewardTokenAddress, chefAddress);
    const rewardsPerWeek = rewardsPerWeekFixed ??
      await chefContract.callStatic[rewardsPerBlockFunction]()
      / 10 ** rewardToken.decimals * 604800 / 13.5
  
    const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) => {
      try {
        return await getSushiPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction, showAll);
      }
      catch (ex) {
        console.log(`Error loading pool ${x}: ${ex}`);
        return null;
      }
    }));
  
    var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x?.poolToken).map(x => x.poolToken.tokens).concat([rewardTokenAddress]));
    var prices = await lookUpTokenPrices(tokenAddresses);
    if (extraPrices) {
      for (const [k,v] of Object.entries(extraPrices)) {
        if (v.usd) {
          prices[k] = v
        }
      }
    }
  
    await Promise.all(tokenAddresses.map(async (address) => {
        tokens[address] = await getToken(App, address, chefAddress);
    }));
  
    if (deathPoolIndices) {   //load prices for the deathpool assets
      deathPoolIndices.map(i => poolInfos[i])
                       .map(poolInfo =>
        poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "eth") : undefined);
    }
  
    const poolPrices = poolInfos.map(poolInfo => poolInfo?.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken) : undefined);
  
    _print("Finished reading smart contracts.\n");
  
    let aprs = []
    for (i = 0; i < poolCount; i++) {
      if (poolPrices[i]) {
        if(!poolInfos[i].rewarderRewardsPerWeek){
          const apr = printSushiNormalPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
            totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
            pendingRewardsFunction, null, "eth", poolInfos[i].depositFee, poolInfos[i].withdrawFee)
          aprs.push(apr);
        }else{
          const apr = printRewarderPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
            totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
            pendingRewardsFunction, null, "eth", poolInfos[i].rewarderRewardsPerWeek,
            poolInfos[i].rewarderTicker, poolInfos[i].rewarderTokenAddress, poolInfos[i].pendingRewarderTokens)
          aprs.push(apr);
        }
      }
    }
    let totalUserStaked=0, totalStaked=0, averageApr=0;
    for (const a of aprs) {
      if (a && !isNaN(a.totalStakedUsd)) {
        totalStaked += a.totalStakedUsd;
      }
      if (a && a.userStakedUsd > 0) {
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
  
  async function getSushiPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
      const poolInfo = await chefContract.poolInfo(30);
      const lpToken = await chefContract.lpToken(30);
      const rewarder = await chefContract.rewarder(30);
      const poolToken = await getToken(app, lpToken, chefAddress);
      const userInfo = await chefContract.userInfo(30, app.YOUR_ADDRESS);
      const pendingRewardTokens = await chefContract.pendingSushi(30, app.YOUR_ADDRESS);
      const staked = userInfo.amount / 10 ** poolToken.decimals;
      const REWARDER_SUSHI_CHEF_ABI = [{"inputs":[{"internalType":"contract IERC20","name":"_rewardToken","type":"address"},{"internalType":"uint256","name":"_rewardPerSecond","type":"uint256"},{"internalType":"address","name":"_MASTERCHEF","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[],"name":"LogInit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"LogOnReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"}],"name":"LogPoolAddition","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"rewardPerSecond","type":"uint256"}],"name":"LogRewardPerSecond","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"}],"name":"LogSetPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lastRewardTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lpSupply","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"accRewardTokenPerShare","type":"uint256"}],"name":"LogUpdatePool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"uint256","name":"allocPoint","type":"uint256"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"pids","type":"uint256[]"}],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"masterchefPoolIds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"newLpAmount","type":"uint256"}],"name":"onBeetsReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingToken","outputs":[{"internalType":"uint256","name":"pending","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"pendingTokens","outputs":[{"internalType":"contract IERC20[]","name":"rewardTokens","type":"address[]"},{"internalType":"uint256[]","name":"rewardAmounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"uint256","name":"accRewardTokenPerShare","type":"uint256"},{"internalType":"uint256","name":"lastRewardTime","type":"uint256"},{"internalType":"uint256","name":"allocPoint","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"pools","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"uint256","name":"allocPoint","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardPerSecond","type":"uint256"}],"name":"setRewardPerSecond","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"}],"name":"updatePool","outputs":[{"components":[{"internalType":"uint256","name":"accRewardTokenPerShare","type":"uint256"},{"internalType":"uint256","name":"lastRewardTime","type":"uint256"},{"internalType":"uint256","name":"allocPoint","type":"uint256"}],"internalType":"struct TimeBasedRewarder.PoolInfo","name":"pool","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"}]
      const rewarderContract = new ethers.Contract(rewarder, REWARDER_SUSHI_CHEF_ABI, app.provider);
      const rewarderTokenAddress = await rewarderContract.rewardToken();
      const rewarderToken = await getToken(app, rewarderTokenAddress, chefAddress);
      const pendingRewarderTokens = await rewarderContract.pendingToken(30, app.YOUR_ADDRESS) / 10 ** rewarderToken.decimals;
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
  }

function printRewarderPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
                           totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                           pendingRewardsFunction, fixedDecimals, chain="eth",
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
      return sushiContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
    }
    const unstake = async function() {
      return sushiContract_unstake(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction)
    }
    const claim = async function() {
      return sushiContract_claim(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction)
    }
    _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
    _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
    _print_link(`Claim ${pendingRewardTokens.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(pendingRewardTokens*rewardTokenPrice)}) + ${pendingRewarderTokens.toFixed(fixedDecimals)} ${rewarderTicker} ($${formatMoney(pendingRewarderTokens*rewardRewarderPrice)})`, claim)
    _print(`Staking or unstaking also claims rewards.`)
  }

  const sushiContract_stake = async function(chefAbi, chefAddress, poolIndex, stakeTokenAddr, App) {
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
  
  const sushiContract_unstake = async function(chefAbi, chefAddress, poolIndex, App, pendingRewardsFunction) {
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
  
  const sushiContract_claim = async function(chefAbi, chefAddress, poolIndex, App,
      pendingRewardsFunction) {
    const signer = App.provider.getSigner()
  
    const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  
    const earnedTokenAmount = await CHEF_CONTRACT.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS) / 1e18
  
    if (earnedTokenAmount > 0) {
      showLoading()
      CHEF_CONTRACT.harvest(poolIndex, App.YOUR_ADDRESS, {gasLimit: 500000})
          .then(function(t) {
            return App.provider.waitForTransaction(t.hash)
          })
          .catch(function() {
            hideLoading()
          })
    }
  }