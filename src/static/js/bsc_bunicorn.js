$(function() {
    consoleInit(main)
});

const PRESTAKING_FACTORY_ABI = [{"inputs":[{"internalType":"address","name":"_rewardToken","type":"address"},{"internalType":"uint256","name":"_stakingRewardGenesis","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"stakingToken","type":"address"},{"internalType":"uint256","name":"rewardAmount","type":"uint256"},{"internalType":"uint256","name":"rewardDuration","type":"uint256"},{"internalType":"uint256","name":"vestingPeriod","type":"uint256"},{"internalType":"uint256","name":"splits","type":"uint256"},{"internalType":"uint256","name":"claimable","type":"uint256"}],"name":"deploy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"stakingToken","type":"address"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"notifyRewardAmounts","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"}],"name":"rescueFactoryFunds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"stakingToken","type":"address"},{"internalType":"address","name":"tokenAddress","type":"address"}],"name":"rescueFunds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakingRewardGenesis","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakingRewardInfosByStakingToken","outputs":[{"internalType":"address","name":"stakingReward","type":"address"},{"internalType":"uint256","name":"rewardAmount","type":"uint256"},{"internalType":"uint256","name":"rewardDuration","type":"uint256"},{"internalType":"uint256","name":"vestingPeriod","type":"uint256"},{"internalType":"uint256","name":"claimable","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"stakingTokens","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
// const ERC20_ABI = [ { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "delegator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "fromDelegate", "type": "address" }, { "indexed": true, "internalType": "address", "name": "toDelegate", "type": "address" } ], "name": "DelegateChanged", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "delegate", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "previousBalance", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newBalance", "type": "uint256" } ], "name": "DelegateVotesChanged", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "DELEGATION_TYPEHASH", "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "DOMAIN_TYPEHASH", "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" } ], "name": "allowance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "approve", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint32", "name": "", "type": "uint32" } ], "name": "checkpoints", "outputs": [ { "internalType": "uint32", "name": "fromBlock", "type": "uint32" }, { "internalType": "uint256", "name": "votes", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [ { "internalType": "uint8", "name": "", "type": "uint8" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" } ], "name": "decreaseAllowance", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "delegatee", "type": "address" } ], "name": "delegate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "delegatee", "type": "address" }, { "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "uint256", "name": "expiry", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" } ], "name": "delegateBySig", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "delegator", "type": "address" } ], "name": "delegates", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "getCurrentVotes", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getOwner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "blockNumber", "type": "uint256" } ], "name": "getPriorVotes", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" } ], "name": "increaseAllowance", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" } ], "name": "mint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "mint", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "nonces", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "numCheckpoints", "outputs": [ { "internalType": "uint32", "name": "", "type": "uint32" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transfer", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ]
const PRESTAKING_FARM_ABI = [ { "inputs": [ { "internalType": "address", "name": "_rewardDistributor", "type": "address" }, { "internalType": "address", "name": "_rewardToken", "type": "address" }, { "internalType": "address", "name": "_stakingToken", "type": "address" }, { "internalType": "uint256", "name": "_rewardDuration", "type": "uint256" }, { "internalType": "uint256", "name": "_vestingPeriod", "type": "uint256" }, { "internalType": "uint256", "name": "_splits", "type": "uint256" }, { "internalType": "uint256", "name": "_claimable", "type": "uint256" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "userAddress", "type": "address" }, { "indexed": false, "internalType": "address payable", "name": "relayerAddress", "type": "address" }, { "indexed": false, "internalType": "bytes", "name": "functionSignature", "type": "bytes" } ], "name": "MetaTransactionExecuted", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "reward", "type": "uint256" } ], "name": "RewardAdded", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "reward", "type": "uint256" } ], "name": "RewardPaid", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "Staked", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "Withdrawn", "type": "event" }, { "inputs": [], "name": "ERC712_VERSION", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "availableReward", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "claimable", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "claimedSplits", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "earned", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "userAddress", "type": "address" }, { "internalType": "bytes", "name": "functionSignature", "type": "bytes" }, { "internalType": "bytes32", "name": "sigR", "type": "bytes32" }, { "internalType": "bytes32", "name": "sigS", "type": "bytes32" }, { "internalType": "uint8", "name": "sigV", "type": "uint8" } ], "name": "executeMetaTransaction", "outputs": [ { "internalType": "bytes", "name": "", "type": "bytes" } ], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "exit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getChainId", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "getDomainSeperator", "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "user", "type": "address" } ], "name": "getNonce", "outputs": [ { "internalType": "uint256", "name": "nonce", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getReward", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getRewardForDuration", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "hasClaimed", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lastTimeRewardApplicable", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lastUpdateTime", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "reward", "type": "uint256" } ], "name": "notifyRewardAmount", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "periodFinish", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "tokenAddress", "type": "address" }, { "internalType": "address", "name": "receiver", "type": "address" } ], "name": "rescueFunds", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "rewardDistributor", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardDuration", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardPerToken", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardPerTokenStored", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardRate", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardToken", "outputs": [ { "internalType": "contract IBEP20", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "rewards", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "splitWindow", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "splits", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "stake", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" } ], "name": "stakeWithPermit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "stakingToken", "outputs": [ { "internalType": "contract IBEP20", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "totalEarnedReward", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "totalVestedRewardForUser", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "userRewardPerTokenPaid", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ]

const graphTokenPoolQuery = gql`
query GET_TOKEN_POOL_PAIR ($id: String){
  pools(first:1000, where: { id: $id}){
    id
    liquidity
    totalShares
  }
}
`;

const graphBuniPriceQuery = gql`
query GET_BUNI_PRICE ($id: String){
  tokenPrices(where: {id: $id}) {
      id
      price
  }
}
`;


const PRESTAKINGS =  [
    {
        "pid": 100,
        "preStakingAddress": "0x08c19bdA7964A5a953765e7CC6E04FEF504C5389",
        "lpAddress": "0x969c59e4aa215f377184cea9ca80a9d68a843959",
        "tokens": ["WBNB", "BUNI"],
        "poolType": "tokens"
    },
    {
        "pid": 99,
        "preStakingAddress": "0xe02877C2914983E16e96418Cd29109e3B027D095",
        "lpAddress": "0x9c8Fd9a60da602F7bE0c95edA1aa5CF48eb67789",
        "tokens": ["BUSD", "BUNI"],
        "poolType": "tokens"
    },
    {
        "pid": 0,
        "preStakingAddress": "0x936ed835E72B7F9B0DD908F46344B89EC4e23058",
        "lpAddress": "0x42612b419E31F6a74b81Ba627C7d8d5e325D6758",
        "tokens": ["USDT", "BUSD"],
        "poolTokens": [
          "0x55d398326f99059ff775485246999027b3197955",
          "0xe9e7cea3dedca5984780bafc599bd69add087d56"
        ],
        "poolType": "stablecoins"
    },
    {
        "pid": 3,
        "preStakingAddress": "0x9f2515135453f9485b2aE91ef48e92e0fEd0D2AE",
        "lpAddress": "0x9131Eef9437Cb2f519273a1e3B92CC8bE33E794E",
        "tokens": ["BUSD", "WBNB"],
        "poolType": "tokens"
    },
    {
        "pid": 1,
        "preStakingAddress": "0x772759eEa5111286B3Fc2c808FB3DE6F73c37050",
        "lpAddress": "0x4a9f3f821590fC22bD682e829656596C29749328",
        "tokens": ["USDC", "BUSD"],
        "poolTokens": [
            "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
            "0xe9e7cea3dedca5984780bafc599bd69add087d56"
        ],
        "poolType": "stablecoins"
    },
    {
        "pid": 5,
        "preStakingAddress": "0x3FD9017D28fDbb6E429bCC6AAeE2a0Fa991159Fc",
        "lpAddress": "0xC1520E2A5dE4b5B8f1bbf6576caB6fa1B8380fCF",
        "tokens": ["WBNB", "ETH"],
        "poolType": "tokens"
    },
    {
        "pid": 2,
        "preStakingAddress": "0x621Cb28f4719AcB815E35dd2BF804A9Be2307548",
        "lpAddress": "0xb05697B07E87e57d96FF9802869a410aD6162777",
        "tokens": ["USDT", "USDC"],
        "poolTokens": [
            "0x55d398326f99059ff775485246999027b3197955",
            "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d"
        ],
        "poolType": "stablecoins"
    },
    {
        "pid": 4,
        "preStakingAddress": "0x71F39E16e3ef8DAf6e85ec30C56CDf0baFD251b2",
        "lpAddress": "0xa437baFC1150015774864178E1b479a64A6c0D83",
        "tokens": ["WBNB", "USDT"],
        "poolType": "tokens"
    },
    {
        "pid": 6,
        "preStakingAddress": "0xc0B6171ccd2Eb5Cf0dfCAABC5e1BE3ab671BE445",
        "lpAddress": "0x688047B695f3746022d2caf129A9DC86A9538Ebf",
        "tokens": ["BTCB", "ETH"],
        "poolType": "tokens"
    },
    {
        "pid": 7,
        "preStakingAddress": "0x9f61780d91F2C125EB3C49fE74df7b40183Fb4df",
        "lpAddress": "0x9E9B36445e42654157dc15Ae7AFC5F98914Fe1c3",
        "tokens": ["WBNB", "DOT"],
        "poolType": "tokens"
    },
    {
        "pid": 8,
        "preStakingAddress": "0xb6c9e17B77257ae7F1cff43D2A02c6bE760A7e9e",
        "lpAddress": "0xb9aB3e5a73986D41278227bCeA4d8C0CaB7488C7",
        "tokens": ["LINK", "WBNB"],
        "poolType": "tokens"
    },
    {
        "pid": 9,
        "preStakingAddress": "0xD0a00bc14C150e6F8F0B0dFfee2e1944C73B8A05",
        "lpAddress": "0x9b7cfb301b38032bA5c25B7f77a9F0a22406a2Bb",
        "tokens": ["WBNB", "BTCB"],
        "poolType": "tokens"
    }
]

async function getLpPriceUsd(farmConfig) {
    if (farmConfig.poolType === 'stablecoins') {
        return 1;
    }
    if (farmConfig.poolType === 'tokens') {
        return await getLpTokenPriceUsd(farmConfig);
    }
    throw new Error('poolType not support:' + farmConfig.poolType);
}

async function getLpTokenPriceUsd(farmConfig) {
    const { pools } = await request(
        'https://graph.bunicorn.exchange/subgraphs/name/bunicorndefi/buni-token',
        graphTokenPoolQuery,
        {
            id: farmConfig.poolAddress.toLowerCase()
        }
    );
    if (!pools || pools.length === 0) {
        return 0;
    }
    const pool = pools[0]

    const { liquidity, totalShares } = pool

    return parseFloat(liquidity) / parseFloat(totalShares)
}

function getPoolLink(pool, type) {
    return `https://www.bunicorn.exchange/#/liquidity/${type}/detail/${pool}?addLiquidity=true`;
}

function getStablePoolLink(pool, type) {
    const combine = `${pool.poolTokens[0]}_${pool.poolTokens[1]}`;
    return `https://www.bunicorn.exchange/#/liquidity/${type}/detail/${combine}/${pool.lpAddress}?addLiquidity=true`;
}

async function getBuniPriceUsd() {
    const { tokenPrices } = await request(
        'https://graph.bunicorn.exchange/subgraphs/name/bunicorndefi/buni-token',
        graphBuniPriceQuery,
        {
            id: '0x0e7beec376099429b85639eb3abe7cf22694ed49'
        }
    );
    if (!tokenPrices || tokenPrices.length === 0) {
        return 0.03;
    }

    return tokenPrices[0] && parseFloat(tokenPrices[0].price);
}

function getFarmApy(rewardAmount, rewardsDuration, buniPriceUsd, poolLiquidityUsd) {
    try {
        const yearlyRewardAllocation = (rewardAmount / 1e18 / rewardsDuration) * (60 * 60 * 24 * 365);

        const apr = (yearlyRewardAllocation * buniPriceUsd / poolLiquidityUsd) * 100;

        return apr;
    } catch (e) {
        console.error(e);
        return 0;
    }
}

async function main() {
    console.log('call main function')
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const PRESTAKING_FACTORY_ADDR = "0x92e2a3764d23De5BaBc3b5ce939DAEDe3F427594";
    console.log('call main function PRESTAKING_FACTORY_ADDR', PRESTAKING_FACTORY_ADDR)
    _print(`<a href='https://bscscan.com/address/${PRESTAKING_FACTORY_ADDR}' target='_blank'>Pre-staking Factory Contract</a>`);
    _print(`Found ${PRESTAKINGS.length} pools prestaking.\n`)


    const buniPriceUsd = await getBuniPriceUsd();

    let totalStaked = 0;
    const data = await Promise.all(
        PRESTAKINGS.map(async prestaking => {
            const preStakingAddress = prestaking.preStakingAddress;
            const lpAddress = prestaking.lpAddress;

            const lpContract = new window.ethers.Contract(lpAddress, ERC20_ABI, App.provider);
            let lpTokenBalanceMC = await lpContract.balanceOf(preStakingAddress);

            const prestakingFarm = new window.ethers.Contract(preStakingAddress, PRESTAKING_FARM_ABI, App.provider);

            let rewardAmount = await prestakingFarm.getRewardForDuration();
            let rewardsDuration = await prestakingFarm.rewardDuration();
            let periodFinish = await prestakingFarm.periodFinish();

            // eslint-disable-next-line prefer-const
            lpTokenBalanceMC = ethers.BigNumber.from(lpTokenBalanceMC).toString();
            rewardAmount = ethers.BigNumber.from(rewardAmount).toString();
            rewardsDuration = ethers.BigNumber.from(rewardsDuration).toString();



            const lpPriceUsd = await getLpPriceUsd({
                lpAddresses: prestaking.preStakingAddress,
                poolAddress: prestaking.lpAddress,
                poolType: prestaking.poolType
            });
            console.log('lpTokenBalanceMC', lpTokenBalanceMC)
            lpTokenBalanceMC = lpTokenBalanceMC / 1e18
            const myStake = lpPriceUsd * lpTokenBalanceMC
            console.log('rewardAmount', rewardAmount, 'rewardsDuration', rewardsDuration, 'buniPriceUsd', buniPriceUsd, 'myStake', myStake);
            const apr = getFarmApy(
                rewardAmount,
                rewardsDuration,
                buniPriceUsd,
                myStake
            );

            const rawStakedBalances = await prestakingFarm.balanceOf(App.YOUR_ADDRESS) || 0

            totalStaked += myStake
            return {
                ...prestaking,
                preStaking: {
                    rewardAmount,
                    rewardsDuration,
                    periodFinish
                },
                apr,
                lpTokenBalanceMC: lpTokenBalanceMC,
                lpPriceUsd: lpPriceUsd,
                myStake: myStake,
                stakedBalance: rawStakedBalances / 1e18
            };
        })
    );

    _print("Finished reading smart contracts.\n");

    data.forEach((item, index) => {
        const pairs = item.tokens.join('-')
        const poolUrl = item.poolType === 'tokens'
            ? getPoolLink(item.lpAddress, item.poolType)
            : getStablePoolLink(item, item.poolType);

        const aprDay = item.apr / 365
        const aprWeek = aprDay * 7

        _print(`<a href="${poolUrl}" target="_blank">${index + 1} - ${pairs} Buni LP [+]</a>[<=>] Price $${item.lpPriceUsd} <a href="https://bscscan.com/address/${item.preStakingAddress}" target="_blank">See contract prestaking</a>`)
        _print(`Staked: ${formatMoney(item.lpTokenBalanceMC)} LP ($${formatMoney(item.myStake)})`)
        _print(`APR: Day ${formatMoney(aprDay)}% Week ${formatMoney(aprWeek)}% Year ${formatMoney(item.apr)}%`)
        _print(`You are staking ${item.stakedBalance} ${pairs} Buni LP ($${formatMoney(item.stakedBalance * item.lpPriceUsd)}), ${formatMoney((item.stakedBalance/item.lpTokenBalanceMC) * 100)}% of the pool.`)
        _print('')
    })

    _print(`Total Staked: $${formatMoney(totalStaked)}`)

    hideLoading();
}
