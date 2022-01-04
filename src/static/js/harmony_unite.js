
$(function() {
consoleInit(main)
  });

const USHARE_CHEF_ABI = [
    {
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "name": "_bshare",
                "internalType": "address",
                "type": "address"
            },
            {
                "name": "_poolStartTime",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "type": "constructor"
    },
    {
        "type": "event",
        "name": "Deposit",
        "inputs": [
            {
                "indexed": true,
                "type": "address",
                "name": "user",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "pid",
                "internalType": "uint256",
                "indexed": true
            },
            {
                "name": "amount",
                "indexed": false,
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "EmergencyWithdraw",
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "indexed": true,
                "type": "address"
            },
            {
                "name": "pid",
                "indexed": true,
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "amount",
                "internalType": "uint256",
                "type": "uint256",
                "indexed": false
            }
        ]
    },
    {
        "anonymous": false,
        "type": "event",
        "name": "RewardPaid",
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "type": "address",
                "name": "user"
            },
            {
                "type": "uint256",
                "name": "amount",
                "internalType": "uint256",
                "indexed": false
            }
        ]
    },
    {
        "anonymous": false,
        "type": "event",
        "name": "Withdraw",
        "inputs": [
            {
                "name": "user",
                "indexed": true,
                "type": "address",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "indexed": true,
                "name": "pid",
                "internalType": "uint256"
            },
            {
                "internalType": "uint256",
                "indexed": false,
                "name": "amount",
                "type": "uint256"
            }
        ]
    },
    {
        "name": "TOTAL_REWARDS",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "constant": true,
        "signature": "0x09cf6091"
    },
    {
        "stateMutability": "view",
        "outputs": [
            {
                "type": "address",
                "internalType": "contract IERC20",
                "name": ""
            }
        ],
        "inputs": [],
        "name": "bshare",
        "type": "function",
        "constant": true,
        "signature": "0x9beb31df"
    },
    {
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "name": "operator",
        "stateMutability": "view",
        "type": "function",
        "constant": true,
        "signature": "0x570ca735"
    },
    {
        "outputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ],
        "inputs": [],
        "stateMutability": "view",
        "name": "poolEndTime",
        "type": "function",
        "constant": true,
        "signature": "0x6e271dd5"
    },
    {
        "name": "poolInfo",
        "stateMutability": "view",
        "inputs": [
            {
                "internalType": "uint256",
                "type": "uint256",
                "name": ""
            }
        ],
        "outputs": [
            {
                "type": "address",
                "name": "token",
                "internalType": "contract IERC20"
            },
            {
                "name": "allocPoint",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "type": "uint256",
                "name": "lastRewardTime",
                "internalType": "uint256"
            },
            {
                "name": "accUSharePerShare",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "type": "bool",
                "internalType": "bool",
                "name": "isStarted"
            }
        ],
        "type": "function"
    },
    {
        "name": "poolStartTime",
        "inputs": [],
        "type": "function",
        "outputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view",
        "constant": true,
        "signature": "0x5f96dc11"
    },
    {
        "stateMutability": "view",
        "type": "function",
        "name": "runningTime",
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": ""
            }
        ],
        "constant": true,
        "signature": "0x943f013d"
    },
    {
        "type": "function",
        "outputs": [
            {
                "internalType": "uint256",
                "type": "uint256",
                "name": ""
            }
        ],
        "stateMutability": "view",
        "name": "tSharePerSecond",
        "inputs": [],
        "constant": true,
        "signature": "0x9e63d261"
    },
    {
        "name": "totalAllocPoint",
        "inputs": [],
        "stateMutability": "view",
        "type": "function",
        "outputs": [
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": ""
            }
        ],
        "constant": true,
        "signature": "0x17caf6f1"
    },
    {
        "name": "userInfo",
        "type": "function",
        "stateMutability": "view",
        "outputs": [
            {
                "internalType": "uint256",
                "type": "uint256",
                "name": "amount"
            },
            {
                "name": "rewardDebt",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "inputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "type": "address",
                "name": "",
                "internalType": "address"
            }
        ]
    },
    {
        "stateMutability": "nonpayable",
        "name": "add",
        "type": "function",
        "outputs": [],
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_allocPoint",
                "type": "uint256"
            },
            {
                "type": "address",
                "name": "_token",
                "internalType": "contract IERC20"
            },
            {
                "name": "_withUpdate",
                "type": "bool",
                "internalType": "bool"
            },
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": "_lastRewardTime"
            }
        ]
    },
    {
        "name": "set",
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "type": "uint256",
                "name": "_pid",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "_allocPoint",
                "internalType": "uint256"
            }
        ],
        "type": "function",
        "outputs": []
    },
    {
        "inputs": [
            {
                "type": "uint256",
                "name": "_fromTime",
                "internalType": "uint256"
            },
            {
                "name": "_toTime",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "getGeneratedReward",
        "type": "function",
        "stateMutability": "view"
    },
    {
        "stateMutability": "view",
        "outputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ],
        "name": "pendingShare",
        "type": "function",
        "inputs": [
            {
                "name": "_pid",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_user",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
        "name": "massUpdatePools",
        "inputs": []
    },
    {
        "name": "updatePool",
        "outputs": [],
        "type": "function",
        "inputs": [
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": "_pid"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "name": "deposit",
        "type": "function",
        "outputs": [],
        "inputs": [
            {
                "name": "_pid",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_amount",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "name": "_pid",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "name": "_amount",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "name": "withdraw",
        "type": "function",
        "outputs": []
    },
    {
        "type": "function",
        "name": "emergencyWithdraw",
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "type": "uint256",
                "name": "_pid",
                "internalType": "uint256"
            }
        ],
        "outputs": []
    },
    {
        "name": "setOperator",
        "outputs": [],
        "type": "function",
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "type": "address",
                "internalType": "address",
                "name": "_operator"
            }
        ]
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "name": "governanceRecoverUnsupported",
        "inputs": [
            {
                "name": "_token",
                "type": "address",
                "internalType": "contract IERC20"
            },
            {
                "type": "uint256",
                "name": "amount",
                "internalType": "uint256"
            },
            {
                "type": "address",
                "name": "to",
                "internalType": "address"
            }
        ],
        "outputs": []
    }
]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

   const USHARE_CHEF_ADDR = "0xe3f4e2936f0ac4104bd6a58bebd29e49437710fe";
   const rewardTokenTicker = "USHARE";
   const USHARE_CHEF = new ethers.Contract(USHARE_CHEF_ADDR, USHARE_CHEF_ABI, App.provider);
   const rewardsPerWeek = await USHARE_CHEF.tSharePerSecond() / 1e18 * 604800;

    const tokens = {};
    const prices = await getHarmonyPrices();

    await loadBshareChefContract(App, tokens, prices, USHARE_CHEF, USHARE_CHEF_ADDR, USHARE_CHEF_ABI, rewardTokenTicker,
        "bshare", null, rewardsPerWeek, "pendingShare");

    hideLoading();
  }

async function loadBshareChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
  rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
  deathPoolIndices, hideFooter) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = 2;
  const totalAllocPoints = await chefContract.totalAllocPoint();

  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  var tokens = {};

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getHarmonyToken(App, rewardTokenAddress, chefAddress);
  const rewardsPerWeek = rewardsPerWeekFixed ??
    await chefContract.callStatic[rewardsPerBlockFunction]()
    / 10 ** rewardToken.decimals * 604800 / 3

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getHarmonyPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getHarmonyToken(App, address, chefAddress);
  }));

  if (deathPoolIndices) {   //load prices for the deathpool assets
    deathPoolIndices.map(i => poolInfos[i])
                     .map(poolInfo =>
      poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "harmony") : undefined);
  }

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "harmony") : undefined);


  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
        pendingRewardsFunction, null, null, "harmony", poolInfos[i].depositFee, poolInfos[i].withdrawFee)
      aprs.push(apr);
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

  if (!hideFooter) {
    _print_bold(`Total Staked: $${formatMoney(totalStaked)}`);
    if (totalUserStaked > 0) {
      _print_bold(`\nYou are staking a total of $${formatMoney(totalUserStaked)} at an average APR of ${(averageApr * 100).toFixed(2)}%`)
      _print(`Estimated earnings:`
          + ` Day $${formatMoney(totalUserStaked*averageApr/365)}`
          + ` Week $${formatMoney(totalUserStaked*averageApr/52)}`
          + ` Year $${formatMoney(totalUserStaked*averageApr)}\n`);
    }
  }

  return { prices, totalUserStaked, totalStaked, averageApr }
}