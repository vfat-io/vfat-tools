
$(function() {
consoleInit(main)
  });

const PLTS_CHEF_ABI = [
  {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
  },
  {
      "inputs": [
          {
              "indexed": false,
              "type": "address",
              "name": "to",
              "internalType": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "type": "uint256",
              "name": "requested"
          },
          {
              "name": "amount",
              "internalType": "uint256",
              "indexed": false,
              "type": "uint256"
          }
      ],
      "anonymous": false,
      "type": "event",
      "name": "ApolloTransfer"
  },
  {
      "inputs": [
          {
              "name": "to",
              "internalType": "address",
              "indexed": false,
              "type": "address"
          },
          {
              "name": "multiplier",
              "type": "uint256",
              "internalType": "uint256",
              "indexed": false
          },
          {
              "type": "uint256",
              "internalType": "uint256",
              "indexed": false,
              "name": "bonus"
          }
      ],
      "type": "event",
      "anonymous": false,
      "name": "Bonus"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "user",
              "type": "address",
              "indexed": true
          },
          {
              "type": "uint256",
              "internalType": "uint256",
              "indexed": true,
              "name": "pid"
          },
          {
              "name": "amount",
              "internalType": "uint256",
              "indexed": false,
              "type": "uint256"
          }
      ],
      "anonymous": false,
      "name": "Deposit",
      "type": "event"
  },
  {
      "anonymous": false,
      "type": "event",
      "name": "EmergencyWithdraw",
      "inputs": [
          {
              "name": "user",
              "type": "address",
              "internalType": "address",
              "indexed": true
          },
          {
              "name": "pid",
              "indexed": true,
              "internalType": "uint256",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "indexed": false,
              "type": "uint256",
              "name": "amount"
          }
      ]
  },
  {
      "name": "OwnershipTransferred",
      "anonymous": false,
      "type": "event",
      "inputs": [
          {
              "type": "address",
              "internalType": "address",
              "name": "previousOwner",
              "indexed": true
          },
          {
              "name": "newOwner",
              "internalType": "address",
              "type": "address",
              "indexed": true
          }
      ]
  },
  {
      "anonymous": false,
      "type": "event",
      "name": "PoolAdd",
      "inputs": [
          {
              "internalType": "address",
              "type": "address",
              "indexed": true,
              "name": "user"
          },
          {
              "name": "lpToken",
              "type": "address",
              "indexed": false,
              "internalType": "contract IERC20"
          },
          {
              "internalType": "uint256",
              "indexed": false,
              "type": "uint256",
              "name": "allocPoint"
          },
          {
              "internalType": "uint256",
              "type": "uint256",
              "name": "lastRewardBlock",
              "indexed": false
          },
          {
              "internalType": "uint16",
              "type": "uint16",
              "indexed": false,
              "name": "depositFeeBP"
          }
      ]
  },
  {
      "type": "event",
      "inputs": [
          {
              "internalType": "address",
              "type": "address",
              "name": "user",
              "indexed": true
          },
          {
              "internalType": "contract IERC20",
              "type": "address",
              "indexed": false,
              "name": "lpToken"
          },
          {
              "name": "allocPoint",
              "internalType": "uint256",
              "indexed": false,
              "type": "uint256"
          },
          {
              "name": "lastRewardBlock",
              "indexed": false,
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "type": "uint16",
              "name": "depositFeeBP",
              "internalType": "uint16",
              "indexed": false
          }
      ],
      "anonymous": false,
      "name": "PoolSet"
  },
  {
      "inputs": [
          {
              "indexed": true,
              "name": "user",
              "type": "address",
              "internalType": "address"
          },
          {
              "indexed": true,
              "type": "address",
              "internalType": "address",
              "name": "newAddress"
          }
      ],
      "name": "SetDevAddress",
      "type": "event",
      "anonymous": false
  },
  {
      "name": "SetFeeAddress",
      "inputs": [
          {
              "type": "address",
              "name": "user",
              "internalType": "address",
              "indexed": true
          },
          {
              "name": "newAddress",
              "indexed": true,
              "type": "address",
              "internalType": "address"
          }
      ],
      "anonymous": false,
      "type": "event"
  },
  {
      "type": "event",
      "anonymous": false,
      "inputs": [
          {
              "internalType": "address",
              "name": "user",
              "indexed": true,
              "type": "address"
          },
          {
              "indexed": false,
              "type": "uint256",
              "internalType": "uint256",
              "name": "tokenPerBlock"
          }
      ],
      "name": "UpdateEmissionRate"
  },
  {
      "type": "event",
      "inputs": [
          {
              "type": "address",
              "indexed": true,
              "internalType": "address",
              "name": "user"
          },
          {
              "name": "startBlock",
              "indexed": false,
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "anonymous": false,
      "name": "UpdateStartBlock"
  },
  {
      "inputs": [
          {
              "name": "user",
              "indexed": true,
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "pid",
              "internalType": "uint256",
              "indexed": true,
              "type": "uint256"
          },
          {
              "type": "uint256",
              "internalType": "uint256",
              "name": "amount",
              "indexed": false
          }
      ],
      "anonymous": false,
      "type": "event",
      "name": "Withdraw"
  },
  {
      "type": "function",
      "stateMutability": "view",
      "inputs": [],
      "name": "BONUS_MULTIPLIER",
      "outputs": [
          {
              "type": "uint256",
              "internalType": "uint256",
              "name": ""
          }
      ],
      "constant": true,
      "signature": "0x8aa28550"
  },
  {
      "inputs": [],
      "stateMutability": "view",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "name": "BURN_ADDRESS",
      "type": "function",
      "constant": true,
      "signature": "0xfccc2813"
  },
  {
      "name": "MAXIMUM_EMISSION_RATE",
      "stateMutability": "view",
      "type": "function",
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "inputs": [],
      "constant": true,
      "signature": "0x6eed6a2c"
  },
  {
      "inputs": [],
      "type": "function",
      "outputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "address"
          }
      ],
      "stateMutability": "view",
      "name": "NULL_ADDRESS",
      "constant": true,
      "signature": "0xde0ce17d"
  },
  {
      "outputs": [
          {
              "name": "",
              "internalType": "address",
              "type": "address"
          }
      ],
      "type": "function",
      "inputs": [],
      "name": "devAddress",
      "stateMutability": "view",
      "constant": true,
      "signature": "0x3ad10ef6"
  },
  {
      "name": "feeAddress",
      "outputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "address"
          }
      ],
      "type": "function",
      "inputs": [],
      "stateMutability": "view",
      "constant": true,
      "signature": "0x41275358"
  },
  {
      "inputs": [],
      "stateMutability": "view",
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "type": "function",
      "name": "minNftToBoost",
      "constant": true,
      "signature": "0x3365b50a"
  },
  {
      "inputs": [],
      "name": "nft",
      "type": "function",
      "stateMutability": "view",
      "outputs": [
          {
              "name": "",
              "internalType": "contract IERC721",
              "type": "address"
          }
      ],
      "constant": true,
      "signature": "0x47ccca02"
  },
  {
      "name": "nftBoost",
      "outputs": [
          {
              "name": "",
              "internalType": "uint256",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function",
      "inputs": [],
      "constant": true,
      "signature": "0x9f3e7e42"
  },
  {
      "type": "function",
      "inputs": [],
      "stateMutability": "view",
      "outputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "address"
          }
      ],
      "name": "owner",
      "constant": true,
      "signature": "0x8da5cb5b"
  },
  {
      "type": "function",
      "inputs": [
          {
              "type": "address",
              "internalType": "contract IERC20",
              "name": ""
          }
      ],
      "stateMutability": "view",
      "name": "poolExistence",
      "outputs": [
          {
              "name": "",
              "internalType": "bool",
              "type": "bool"
          }
      ]
  },
  {
      "stateMutability": "view",
      "outputs": [
          {
              "name": "lpToken",
              "type": "address",
              "internalType": "contract IERC20"
          },
          {
              "name": "allocPoint",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "lastRewardBlock",
              "type": "uint256"
          },
          {
              "type": "uint256",
              "name": "accApolloPerShare",
              "internalType": "uint256"
          },
          {
              "internalType": "uint16",
              "name": "depositFeeBP",
              "type": "uint16"
          },
          {
              "name": "lpSupply",
              "internalType": "uint256",
              "type": "uint256"
          }
      ],
      "inputs": [
          {
              "type": "uint256",
              "name": "",
              "internalType": "uint256"
          }
      ],
      "name": "poolInfo",
      "type": "function"
  },
  {
      "type": "function",
      "name": "renounceOwnership",
      "stateMutability": "nonpayable",
      "inputs": [],
      "outputs": []
  },
  {
      "name": "startBlock",
      "outputs": [
          {
              "name": "",
              "internalType": "uint256",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function",
      "inputs": [],
      "constant": true,
      "signature": "0x48cd4cb1"
  },
  {
      "name": "token",
      "outputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "contract Plutus"
          }
      ],
      "type": "function",
      "stateMutability": "view",
      "inputs": [],
      "constant": true,
      "signature": "0xfc0c546a"
  },
  {
      "type": "function",
      "stateMutability": "view",
      "inputs": [],
      "outputs": [
          {
              "type": "uint256",
              "name": "",
              "internalType": "uint256"
          }
      ],
      "name": "tokenPerBlock",
      "constant": true,
      "signature": "0x4198709a"
  },
  {
      "type": "function",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "name": "totalAllocPoint",
      "inputs": [],
      "stateMutability": "view",
      "constant": true,
      "signature": "0x17caf6f1"
  },
  {
      "stateMutability": "nonpayable",
      "inputs": [
          {
              "name": "newOwner",
              "type": "address",
              "internalType": "address"
          }
      ],
      "type": "function",
      "outputs": [],
      "name": "transferOwnership"
  },
  {
      "inputs": [
          {
              "type": "uint256",
              "name": "",
              "internalType": "uint256"
          },
          {
              "type": "address",
              "internalType": "address",
              "name": ""
          }
      ],
      "outputs": [
          {
              "name": "amount",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "type": "uint256",
              "internalType": "uint256",
              "name": "rewardDebt"
          }
      ],
      "name": "userInfo",
      "type": "function",
      "stateMutability": "view"
  },
  {
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "name": "poolLength",
      "type": "function",
      "stateMutability": "view",
      "inputs": [],
      "constant": true,
      "signature": "0x081e3eda"
  },
  {
      "inputs": [
          {
              "type": "uint256",
              "internalType": "uint256",
              "name": "_allocPoint"
          },
          {
              "internalType": "contract IERC20",
              "type": "address",
              "name": "_lpToken"
          },
          {
              "type": "uint16",
              "internalType": "uint16",
              "name": "_depositFeeBP"
          }
      ],
      "type": "function",
      "outputs": [],
      "name": "add",
      "stateMutability": "nonpayable"
  },
  {
      "stateMutability": "nonpayable",
      "type": "function",
      "inputs": [
          {
              "internalType": "uint256",
              "type": "uint256",
              "name": "_pid"
          },
          {
              "name": "_allocPoint",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "_depositFeeBP",
              "type": "uint16",
              "internalType": "uint16"
          }
      ],
      "outputs": [],
      "name": "set"
  },
  {
      "type": "function",
      "stateMutability": "view",
      "outputs": [
          {
              "internalType": "uint256",
              "type": "uint256",
              "name": ""
          }
      ],
      "inputs": [
          {
              "internalType": "uint256",
              "type": "uint256",
              "name": "_from"
          },
          {
              "type": "uint256",
              "name": "_to",
              "internalType": "uint256"
          }
      ],
      "name": "getMultiplier"
  },
  {
      "type": "function",
      "outputs": [
          {
              "name": "",
              "internalType": "uint256",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_pid",
              "type": "uint256"
          },
          {
              "name": "_user",
              "internalType": "address",
              "type": "address"
          }
      ],
      "name": "pendingApollo"
  },
  {
      "name": "massUpdatePools",
      "inputs": [],
      "outputs": [],
      "type": "function",
      "stateMutability": "nonpayable"
  },
  {
      "name": "updatePool",
      "type": "function",
      "inputs": [
          {
              "name": "_pid",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "name": "deposit",
      "stateMutability": "nonpayable",
      "outputs": [],
      "type": "function",
      "inputs": [
          {
              "type": "uint256",
              "internalType": "uint256",
              "name": "_pid"
          },
          {
              "internalType": "uint256",
              "type": "uint256",
              "name": "_amount"
          }
      ]
  },
  {
      "name": "withdraw",
      "stateMutability": "nonpayable",
      "outputs": [],
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_pid",
              "type": "uint256"
          },
          {
              "name": "_amount",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "type": "function"
  },
  {
      "outputs": [],
      "type": "function",
      "inputs": [
          {
              "type": "uint256",
              "internalType": "uint256",
              "name": "_pid"
          }
      ],
      "name": "emergencyWithdraw",
      "stateMutability": "nonpayable"
  },
  {
      "inputs": [
          {
              "name": "_devAddress",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable",
      "name": "setDevAddress",
      "type": "function"
  },
  {
      "name": "setFeeAddress",
      "type": "function",
      "stateMutability": "nonpayable",
      "inputs": [
          {
              "internalType": "address",
              "name": "_feeAddress",
              "type": "address"
          }
      ],
      "outputs": []
  },
  {
      "type": "function",
      "outputs": [],
      "name": "updateEmissionRate",
      "inputs": [
          {
              "type": "uint256",
              "internalType": "uint256",
              "name": "_tokenPerBlock"
          }
      ],
      "stateMutability": "nonpayable"
  },
  {
      "outputs": [],
      "name": "updateStartBlock",
      "type": "function",
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_startBlock",
              "type": "uint256"
          }
      ],
      "stateMutability": "nonpayable"
  },
  {
      "inputs": [
          {
              "type": "uint256",
              "internalType": "uint256",
              "name": "_minNftToBoost"
          }
      ],
      "type": "function",
      "outputs": [],
      "name": "setMinNftBoost",
      "stateMutability": "nonpayable"
  },
  {
      "name": "setNftBoost",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function",
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_nftBoost",
              "type": "uint256"
          }
      ]
  },
  {
      "stateMutability": "nonpayable",
      "inputs": [
          {
              "internalType": "address",
              "name": "_nft",
              "type": "address"
          }
      ],
      "name": "setNftContract",
      "type": "function",
      "outputs": []
  },
  {
      "stateMutability": "view",
      "name": "isNftHolder",
      "inputs": [
          {
              "name": "_address",
              "type": "address",
              "internalType": "address"
          }
      ],
      "type": "function",
      "outputs": [
          {
              "type": "bool",
              "name": "",
              "internalType": "bool"
          }
      ]
  },
  {
      "outputs": [
          {
              "type": "uint256",
              "name": "",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view",
      "inputs": [
          {
              "name": "_user",
              "type": "address",
              "internalType": "address"
          }
      ],
      "name": "calculateBonus",
      "type": "function"
  },
  {
      "name": "setRewardTo4",
      "stateMutability": "nonpayable",
      "type": "function",
      "inputs": [],
      "outputs": []
  },
  {
      "outputs": [],
      "name": "setRewardTo04",
      "type": "function",
      "stateMutability": "nonpayable",
      "inputs": []
  },
  {
      "name": "setRewardTo05",
      "outputs": [],
      "type": "function",
      "stateMutability": "nonpayable",
      "inputs": []
  },
  {
      "outputs": [],
      "inputs": [],
      "name": "setRewardTo06",
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "name": "setMaxSupply",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function",
      "inputs": [
          {
              "internalType": "uint256",
              "name": "val",
              "type": "uint256"
          }
      ]
  }
]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

   const PLTS_CHEF_ADDR = "0x8c8dca27e450d7d93fa951e79ec354dce543629e";
   const rewardTokenTicker = "PLTS";
   const PLTS_CHEF = new ethers.Contract(PLTS_CHEF_ADDR, PLTS_CHEF_ABI, App.provider);


  const blockNumber = await App.provider.getBlockNumber();
  const multiplier = await PLTS_CHEF.getMultiplier(blockNumber, blockNumber+1) / 1;
  const rewardPerBlock = await PLTS_CHEF.tokenPerBlock();
  const rewardsPerWeek = rewardPerBlock / 1e18 * multiplier * 604800 / 2

    const tokens = {};
    const prices = await getHarmonyPrices();

    await loadHermesChefContract(App, tokens, prices, PLTS_CHEF, PLTS_CHEF_ADDR, PLTS_CHEF_ABI, rewardTokenTicker,
        "token", null, rewardsPerWeek, "pendingApollo", [4,5,11]);

    hideLoading();
  }

async function getHermesPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
  const poolInfo = await chefContract.poolInfo(poolIndex)
  const poolToken = await getToken(app, poolInfo.lpToken ?? poolInfo.token, chefAddress)
  const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS)
  const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS)
  const staked = userInfo.amount / 10 ** poolToken.decimals
  return {
    address: poolInfo.lpToken ?? poolInfo.token,
    allocPoints: poolInfo.allocPoint ?? 1,
    poolToken: poolToken,
    userStaked: staked,
    pendingRewardTokens: pendingRewardTokens / 10 ** 18,
    depositFee: (poolInfo.depositFeeBP ?? poolInfo.depositFee ?? 0) / 100,
    withdrawFee: (poolInfo.withdrawFeeBP ?? poolInfo.withdrawalFee ?? 0) / 100,
  }
}

async function loadHermesChefContract(
  App,
  tokens,
  prices,
  chef,
  chefAddress,
  chefAbi,
  rewardTokenTicker,
  rewardTokenFunction,
  rewardsPerBlockFunction,
  rewardsPerWeekFixed,
  pendingRewardsFunction,
  deathPoolIndices,
  hideFooter
) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider)

  const poolCount = parseInt(await chefContract.poolLength(), 10)
  const totalAllocPoints = await chefContract.totalAllocPoint()

  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`)

  var tokens = {}

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]()
  const rewardToken = await getToken(App, rewardTokenAddress, chefAddress)
  const rewardsPerWeek =
    rewardsPerWeekFixed ??
    (((await chefContract.callStatic[rewardsPerBlockFunction]()) / 10 ** rewardToken.decimals) * 604800) / 3

  const poolInfos = await Promise.all(
    [...Array(poolCount).keys()].map(
      async x => await getHermesPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)
    )
  )

  var tokenAddresses = [].concat.apply(
    [],
    poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens)
  )

  await Promise.all(
    tokenAddresses.map(async address => {
      tokens[address] = await getToken(App, address, chefAddress)
    })
  )

  if (deathPoolIndices) {
    //load prices for the deathpool assets
    deathPoolIndices
      .map(i => poolInfos[i])
      .map(poolInfo => (poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, 'harmony') : undefined))
  }

  const poolPrices = poolInfos.map(poolInfo =>
    poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, 'harmony') : undefined
  )

  _print('Finished reading smart contracts.\n')

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printHermesChefPool(
        App,
        chefAbi,
        chefAddress,
        prices,
        tokens,
        poolInfos[i],
        i,
        poolPrices[i],
        totalAllocPoints,
        rewardsPerWeek,
        rewardTokenTicker,
        rewardTokenAddress,
        pendingRewardsFunction,
        null,
        null,
        'harmony',
        poolInfos[i].depositFee,
        poolInfos[i].withdrawFee
      )
      aprs.push(apr)
    }
  }
  let totalUserStaked = 0,
    totalStaked = 0,
    averageApr = 0
  for (const a of aprs) {
    if (!isNaN(a.totalStakedUsd)) {
      totalStaked += a.totalStakedUsd
    }
    if (a.userStakedUsd > 0) {
      totalUserStaked += a.userStakedUsd
      averageApr += (a.userStakedUsd * a.yearlyAPR) / 100
    }
  }
  averageApr = averageApr / totalUserStaked

  if (!hideFooter) {
    _print_bold(`Total Staked: $${formatMoney(totalStaked)}`)
    if (totalUserStaked > 0) {
      _print_bold(
        `\nYou are staking a total of $${formatMoney(totalUserStaked)} at an average APR of ${(
          averageApr * 100
        ).toFixed(2)}%`
      )
      _print(
        `Estimated earnings:` +
          ` Day $${formatMoney((totalUserStaked * averageApr) / 365)}` +
          ` Week $${formatMoney((totalUserStaked * averageApr) / 52)}` +
          ` Year $${formatMoney(totalUserStaked * averageApr)}\n`
      )
    }
  }

  return {prices, totalUserStaked, totalStaked, averageApr}
}

function printHermesChefPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
                       totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                       pendingRewardsFunction, fixedDecimals, claimFunction, chain="eth", depositFee=0, withdrawFee=0) {
  fixedDecimals = fixedDecimals ?? 2;
  const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
  var poolRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek;
  //if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
  const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
  const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
  _print_inline(`${poolIndex} - `);
  poolPrices.print_price(chain);
  sp?.print_price(chain);
  let apr = printAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
    staked_tvl, userStaked, poolPrices.price, fixedDecimals);
  if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
  printChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
    rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
    poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, claimFunction, rewardPrice, chain, depositFee, withdrawFee);
  return apr;
}