$(function () {
    consoleInit(main)
});

const WEPIGGY_ABI = {
    comptroller: [
        {
            inputs: [],
            name: 'getAllMarkets',
            outputs: [{ internalType: 'contract PToken[]', name: '', type: 'address[]' }],
            stateMutability: 'view',
            type: 'function',
        },
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
            name: 'supplyRatePerTimestamp',
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
            name: 'borrowRatePerTimestamp',
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

const contracts = {
    comptroller: '0x6a82a17b48ef6be278bbc56138f35d04594587e3',
    oracle: '0x0c99e05cd2dcb52a583a3694f4d91813efb5b071',
    gas: {
        p_address: '0x34b9aa82d89ae04f0f546ca5ec9c93efe1288940',
        symbol: 'ONE',
        decimals: 18,
    },
};

const TRANQ_ABI = [
    {
        "type": "constructor",
        "payable": false,
        "stateMutability": "nonpayable",
        "inputs": []
    },
    {
        "stateMutability": "payable",
        "payable": true,
        "type": "fallback"
    },
    {
        "name": "accrualBlockTimestamp",
        "inputs": [],
        "type": "function",
        "payable": false,
        "outputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view",
        "constant": true
    },
    {
        "payable": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view",
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "constant": true,
        "type": "function",
        "name": "accruedReward"
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
        "payable": false,
        "constant": true,
        "type": "function",
        "name": "admin",
        "stateMutability": "view"
    },
    {
        "inputs": [],
        "payable": false,
        "outputs": [
            {
                "internalType": "address",
                "type": "address",
                "name": ""
            }
        ],
        "type": "function",
        "name": "implementation",
        "constant": true,
        "stateMutability": "view"
    },
    {
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "inputs": [],
        "constant": true,
        "type": "function",
        "name": "pendingAdmin",
        "payable": false,
        "stateMutability": "view"
    },
    {
        "payable": false,
        "outputs": [
            {
                "type": "address",
                "internalType": "address",
                "name": ""
            }
        ],
        "stateMutability": "view",
        "name": "pendingImplementation",
        "constant": true,
        "inputs": [],
        "type": "function"
    },
    {
        "constant": true,
        "stateMutability": "view",
        "name": "rewardIndex",
        "payable": false,
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "inputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "type": "function"
    },
    {
        "name": "rewardSpeeds",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ],
        "type": "function",
        "outputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ],
        "constant": true,
        "stateMutability": "view"
    },
    {
        "payable": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "constant": true,
        "type": "function",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "rewardTokenAddresses",
        "stateMutability": "view"
    },
    {
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "constant": true,
        "inputs": [],
        "stateMutability": "view",
        "name": "stakedTokenAddress",
        "type": "function",
        "payable": false
    },
    {
        "stateMutability": "view",
        "name": "supplierRewardIndex",
        "payable": false,
        "type": "function",
        "inputs": [
            {
                "type": "address",
                "name": "",
                "internalType": "address"
            },
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "constant": true,
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ]
    },
    {
        "stateMutability": "view",
        "constant": true,
        "outputs": [
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": ""
            }
        ],
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "type": "function",
        "name": "supplyAmount"
    },
    {
        "payable": false,
        "outputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "name": "totalSupplies",
        "inputs": [],
        "constant": true
    },
    {
        "name": "deposit",
        "outputs": [],
        "inputs": [
            {
                "name": "amount",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "payable": false,
        "constant": false,
        "type": "function"
    },
    {
        "stateMutability": "nonpayable",
        "payable": false,
        "inputs": [
            {
                "name": "amount",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "type": "function",
        "name": "redeem",
        "constant": false,
        "outputs": []
    },
    {
        "payable": false,
        "constant": false,
        "name": "claimRewards",
        "stateMutability": "nonpayable",
        "type": "function",
        "inputs": [],
        "outputs": []
    },
    {
        "inputs": [
            {
                "type": "uint256",
                "name": "rewardToken",
                "internalType": "uint256"
            }
        ],
        "name": "getClaimableRewards",
        "payable": false,
        "type": "function",
        "constant": true,
        "stateMutability": "view",
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "name": "setRewardSpeed",
        "outputs": [],
        "constant": false,
        "type": "function",
        "stateMutability": "nonpayable",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": "rewardToken"
            },
            {
                "type": "uint256",
                "name": "speed",
                "internalType": "uint256"
            }
        ]
    },
    {
        "name": "setRewardTokenAddress",
        "constant": false,
        "type": "function",
        "outputs": [],
        "inputs": [
            {
                "name": "rewardToken",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "rewardTokenAddress",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "payable": false
    },
    {
        "outputs": [],
        "type": "function",
        "payable": false,
        "constant": false,
        "name": "setStakedTokenAddress",
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "name": "newStakedTokenAddress",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "function",
        "inputs": [
            {
                "type": "address",
                "internalType": "contract TranquilStakingProxy",
                "name": "proxy"
            }
        ],
        "constant": false,
        "stateMutability": "nonpayable",
        "outputs": [],
        "name": "becomeImplementation",
        "payable": false
    }
]

const Pools = [
    "0x40e73d483412dbb1cacafc04a87ae1544c9571a9"
].map(a => ({
    address: a,
    abi: TRANQ_ABI,
    stakeTokenFunction: "stakedTokenAddress"
}))

async function main() {
    const App = await init_ethers();
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");    

    var tokens = {};
    const prices = await getHarmonyPrices();

    let p = await loadMultipleTranqSynthetixPools(App, tokens, prices, Pools)
    _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
    if (p.totalUserStaked > 0) {
        _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalApr * 100).toFixed(2)}%\n`);
    }
    _print("");

    const COMPTROLLER = new ethers.Contract(contracts.comptroller, WEPIGGY_ABI.comptroller, App.provider);

    const allMarkets = await COMPTROLLER.getAllMarkets();

    // console.log(allMarkets);

    const data = await Promise.all(allMarkets.map(token => loadData(App, token)));

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

    hideLoading();
}

async function loadMultipleTranqSynthetixPools(App, tokens, prices, pools) {
    let totalStaked = 0,
      totalUserStaked = 0,
      individualAPRs = []
    const infos = await Promise.all(
      pools.map(p =>
        loadTranqSynthetixPoolInfo(App, tokens, prices, p.abi, p.address, p.stakeTokenFunction)
      )
    )
    for (const i of infos) {
      let p = await printSynthetixPool(App, i, 'harmony')
      totalStaked += p.staked_tvl || 0
      totalUserStaked += p.userStaked || 0
      if (p.userStaked > 0) {
        individualAPRs.push((p.userStaked * p.apr) / 100)
      }
    }
    let totalApr = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x, y) => x + y, 0) / totalUserStaked
    return {staked_tvl: totalStaked, totalUserStaked, totalApr}
  }

async function loadTranqSynthetixPoolInfo(
  App,
  tokens,
  prices,
  stakingAbi,
  stakingAddress,
  stakeTokenFunction
) {
  const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider)
  const STAKING_MULTI = new ethcall.Contract(stakingAddress, stakingAbi)

  if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
    console.log("Couldn't find stake function ", stakeTokenFunction)
  }
  const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]()

  const rewardTokenAddress = await STAKING_POOL.rewardTokenAddresses(0)

  var stakeToken = await getHarmonyToken(App, stakeTokenAddress, stakingAddress)
  stakeToken.staked = await STAKING_POOL.totalSupplies() / 10 ** stakeToken.decimals;

  var newPriceAddresses = stakeToken.tokens.filter(x => !getParameterCaseInsensitive(prices, x))
  var newPrices = await lookUpTokenPrices(newPriceAddresses)
  for (const key in newPrices) {
    if (newPrices[key]?.usd) prices[key] = newPrices[key]
  }
  var newTokenAddresses = stakeToken.tokens.filter(x => !getParameterCaseInsensitive(tokens, x))
  for (const address of newTokenAddresses) {
    tokens[address] = await getHarmonyToken(App, address, stakingAddress)
  }
  if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
    tokens[rewardTokenAddress] = await getHarmonyToken(App, rewardTokenAddress, stakingAddress)
  }
  const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress)

  const rewardTokenTicker = rewardToken.symbol

  const poolPrices = getPoolPrices(tokens, prices, stakeToken, 'harmony')

  if (!poolPrices) {
    console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`)
    return null
  }

  const stakeTokenTicker = poolPrices.stakeTokenTicker

  const stakeTokenPrice = prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd
  const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd

  const calls = [
    STAKING_MULTI.rewardSpeeds(0),
    STAKING_MULTI.supplyAmount(App.YOUR_ADDRESS),
    STAKING_MULTI.accruedReward(App.YOUR_ADDRESS, 0)
  ]
  const [rewardRate, balance, earned_] = await App.ethcallProvider.all(calls)

  const weeklyRewards = (rewardRate / 10 ** rewardToken.decimals) * 604800

  const usdPerWeek = weeklyRewards * rewardTokenPrice

  const staked_tvl = poolPrices.staked_tvl

  const userStaked = balance / 10 ** stakeToken.decimals

  const userUnstaked = stakeToken.unstaked

  const earned = earned_ / 10 ** rewardToken.decimals

  return {
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
  }
}

async function loadData(App, token) {

    const PTOKEN_CONTRACT = new ethers.Contract(token, WEPIGGY_ABI.pToken, App.provider);

    const totalReserves_ = await PTOKEN_CONTRACT.totalReserves();
    const totalSupply_ = await PTOKEN_CONTRACT.totalSupply();
    const supply_ = await PTOKEN_CONTRACT.balanceOf(App.YOUR_ADDRESS);
    const exchangeRate_ = await PTOKEN_CONTRACT.exchangeRateStored();
    const supplyRatePerBlock_ = await PTOKEN_CONTRACT.supplyRatePerTimestamp();
    const totalBorrows_ = await PTOKEN_CONTRACT.totalBorrows();
    const borrowBalanceOf_ = await PTOKEN_CONTRACT.borrowBalanceStored(App.YOUR_ADDRESS);
    const borrowRatePerBlock_ = await PTOKEN_CONTRACT.borrowRatePerTimestamp();
    const cash_ = await PTOKEN_CONTRACT.getCash();
    const interestRateModel = await PTOKEN_CONTRACT.interestRateModel();

    let underlyingSymbol, underlyingDecimals;

    if (token.toLowerCase() === contracts.gas.p_address.toLowerCase()) {
        underlyingSymbol = contracts.gas.symbol;
        underlyingDecimals = contracts.gas.decimals;
    } else {
        const underlying = await PTOKEN_CONTRACT.underlying();
        const UNDERLYING_CONTRACT = new ethers.Contract(underlying, WEPIGGY_ABI.erc20, App.provider);
        underlyingSymbol = await UNDERLYING_CONTRACT.symbol();
        underlyingDecimals = await UNDERLYING_CONTRACT.decimals();
    }

    const ORACLE_CONTRACT = new ethers.Contract(contracts.oracle, WEPIGGY_ABI.oracle, App.provider);
    const underlyingPrice_ = await ORACLE_CONTRACT.getUnderlyingPrice(token);
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

    //const RATE_CONTRACT = new ethers.Contract(interestRateModel, WEPIGGY_ABI.rate, App.provider);
    //const blocksPerYear = await RATE_CONTRACT.blocksPerYear();

    const supplyAPY = ((1 + supplyRatePerBlock_ / 1e18) ** 31536000 - 1) * 100;
    const borrowAPY = ((1 + borrowRatePerBlock_ / 1e18) ** 31536000 - 1) * 100;

    const supplyFarmingAPY = 0;
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
    _print(`Farming APY Supply ${data.supplyFarmingAPY.toFixed(2)}% Borrow ${data.borrowFarmingAPY.toFixed(2)}%`);
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
