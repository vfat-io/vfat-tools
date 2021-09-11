$(function() {
    consoleInit(main)
})


const MATER_YAK_ABI = [{
    'type': 'constructor',
    'stateMutability': 'nonpayable',
    'inputs': [{'type': 'address', 'name': '_owner', 'internalType': 'address'}, {
        'type': 'address',
        'name': '_lockManager',
        'internalType': 'address',
    }, {'type': 'uint256', 'name': '_startTimestamp', 'internalType': 'uint256'}, {
        'type': 'uint256',
        'name': '_rewardsPerSecond',
        'internalType': 'uint256',
    }],
}, {
    'type': 'event',
    'name': 'ChangedAddress',
    'inputs': [{'type': 'string', 'name': 'addressType', 'internalType': 'string', 'indexed': true}, {
        'type': 'address',
        'name': 'oldAddress',
        'internalType': 'address',
        'indexed': true,
    }, {'type': 'address', 'name': 'newAddress', 'internalType': 'address', 'indexed': true}],
    'anonymous': false,
}, {
    'type': 'event',
    'name': 'ChangedOwner',
    'inputs': [{'type': 'address', 'name': 'oldOwner', 'internalType': 'address', 'indexed': true}, {
        'type': 'address',
        'name': 'newOwner',
        'internalType': 'address',
        'indexed': true,
    }],
    'anonymous': false,
}, {
    'type': 'event',
    'name': 'ChangedRewardsEndTimestamp',
    'inputs': [{
        'type': 'uint256',
        'name': 'oldEndTimestamp',
        'internalType': 'uint256',
        'indexed': true,
    }, {'type': 'uint256', 'name': 'newEndTimestamp', 'internalType': 'uint256', 'indexed': true}],
    'anonymous': false,
}, {
    'type': 'event',
    'name': 'ChangedRewardsPerSecond',
    'inputs': [{
        'type': 'uint256',
        'name': 'oldRewardsPerSecond',
        'internalType': 'uint256',
        'indexed': true,
    }, {'type': 'uint256', 'name': 'newRewardsPerSecond', 'internalType': 'uint256', 'indexed': true}],
    'anonymous': false,
}, {
    'type': 'event',
    'name': 'Deposit',
    'inputs': [{'type': 'address', 'name': 'user', 'internalType': 'address', 'indexed': true}, {
        'type': 'uint256',
        'name': 'pid',
        'internalType': 'uint256',
        'indexed': true,
    }, {'type': 'uint256', 'name': 'amount', 'internalType': 'uint256', 'indexed': false}],
    'anonymous': false,
}, {
    'type': 'event',
    'name': 'EmergencyWithdraw',
    'inputs': [{'type': 'address', 'name': 'user', 'internalType': 'address', 'indexed': true}, {
        'type': 'uint256',
        'name': 'pid',
        'internalType': 'uint256',
        'indexed': true,
    }, {'type': 'uint256', 'name': 'amount', 'internalType': 'uint256', 'indexed': false}],
    'anonymous': false,
}, {
    'type': 'event',
    'name': 'PoolAdded',
    'inputs': [{'type': 'uint256', 'name': 'pid', 'internalType': 'uint256', 'indexed': true}, {
        'type': 'address',
        'name': 'token',
        'internalType': 'address',
        'indexed': true,
    }, {'type': 'uint256', 'name': 'allocPoints', 'internalType': 'uint256', 'indexed': false}, {
        'type': 'uint256',
        'name': 'totalAllocPoints',
        'internalType': 'uint256',
        'indexed': false,
    }, {
        'type': 'uint256',
        'name': 'rewardStartTimestamp',
        'internalType': 'uint256',
        'indexed': false,
    }, {'type': 'bool', 'name': 'vpForDeposit', 'internalType': 'bool', 'indexed': false}],
    'anonymous': false,
}, {
    'type': 'event',
    'name': 'PoolUpdated',
    'inputs': [{'type': 'uint256', 'name': 'pid', 'internalType': 'uint256', 'indexed': true}, {
        'type': 'uint256',
        'name': 'oldAllocPoints',
        'internalType': 'uint256',
        'indexed': false,
    }, {'type': 'uint256', 'name': 'newAllocPoints', 'internalType': 'uint256', 'indexed': false}, {
        'type': 'uint256',
        'name': 'newTotalAllocPoints',
        'internalType': 'uint256',
        'indexed': false,
    }],
    'anonymous': false,
}, {
    'type': 'event',
    'name': 'SetRewardsStartTimestamp',
    'inputs': [{'type': 'uint256', 'name': 'startTimestamp', 'internalType': 'uint256', 'indexed': true}],
    'anonymous': false,
}, {
    'type': 'event',
    'name': 'Withdraw',
    'inputs': [{'type': 'address', 'name': 'user', 'internalType': 'address', 'indexed': true}, {
        'type': 'uint256',
        'name': 'pid',
        'internalType': 'uint256',
        'indexed': true,
    }, {'type': 'uint256', 'name': 'amount', 'internalType': 'uint256', 'indexed': false}],
    'anonymous': false,
}, {
    'type': 'function',
    'stateMutability': 'nonpayable',
    'outputs': [],
    'name': 'add',
    'inputs': [{'type': 'uint256', 'name': 'allocPoint', 'internalType': 'uint256'}, {
        'type': 'address',
        'name': 'token',
        'internalType': 'address',
    }, {'type': 'bool', 'name': 'withUpdate', 'internalType': 'bool'}, {
        'type': 'bool',
        'name': 'vpForDeposit',
        'internalType': 'bool',
    }],
}, {
    'type': 'function',
    'stateMutability': 'payable',
    'outputs': [],
    'name': 'addRewardsBalance',
    'inputs': [],
}, {
    'type': 'function',
    'stateMutability': 'nonpayable',
    'outputs': [],
    'name': 'changeOwner',
    'inputs': [{'type': 'address', 'name': 'newOwner', 'internalType': 'address'}],
}, {
    'type': 'function',
    'stateMutability': 'nonpayable',
    'outputs': [],
    'name': 'deposit',
    'inputs': [{'type': 'uint256', 'name': 'pid', 'internalType': 'uint256'}, {
        'type': 'uint256',
        'name': 'amount',
        'internalType': 'uint256',
    }],
}, {
    'type': 'function',
    'stateMutability': 'nonpayable',
    'outputs': [],
    'name': 'depositWithPermit',
    'inputs': [{'type': 'uint256', 'name': 'pid', 'internalType': 'uint256'}, {
        'type': 'uint256',
        'name': 'amount',
        'internalType': 'uint256',
    }, {'type': 'uint256', 'name': 'deadline', 'internalType': 'uint256'}, {
        'type': 'uint8',
        'name': 'v',
        'internalType': 'uint8',
    }, {'type': 'bytes32', 'name': 'r', 'internalType': 'bytes32'}, {
        'type': 'bytes32',
        'name': 's',
        'internalType': 'bytes32',
    }],
}, {
    'type': 'function',
    'stateMutability': 'nonpayable',
    'outputs': [],
    'name': 'emergencyWithdraw',
    'inputs': [{'type': 'uint256', 'name': 'pid', 'internalType': 'uint256'}],
}, {
    'type': 'function',
    'stateMutability': 'view',
    'outputs': [{'type': 'uint256', 'name': '', 'internalType': 'uint256'}],
    'name': 'endTimestamp',
    'inputs': [],
}, {
    'type': 'function',
    'stateMutability': 'view',
    'outputs': [{'type': 'uint256', 'name': '', 'internalType': 'uint256'}],
    'name': 'getMultiplier',
    'inputs': [{'type': 'uint256', 'name': 'from', 'internalType': 'uint256'}, {
        'type': 'uint256',
        'name': 'to',
        'internalType': 'uint256',
    }],
}, {
    'type': 'function',
    'stateMutability': 'view',
    'outputs': [{'type': 'address', 'name': '', 'internalType': 'contract ILockManager'}],
    'name': 'lockManager',
    'inputs': [],
}, {
    'type': 'function',
    'stateMutability': 'nonpayable',
    'outputs': [],
    'name': 'massUpdatePools',
    'inputs': [],
}, {
    'type': 'function',
    'stateMutability': 'view',
    'outputs': [{'type': 'address', 'name': '', 'internalType': 'address'}],
    'name': 'owner',
    'inputs': [],
}, {
    'type': 'function',
    'stateMutability': 'view',
    'outputs': [{'type': 'uint256', 'name': '', 'internalType': 'uint256'}],
    'name': 'pendingRewards',
    'inputs': [{'type': 'uint256', 'name': 'pid', 'internalType': 'uint256'}, {
        'type': 'address',
        'name': 'account',
        'internalType': 'address',
    }],
}, {
    'type': 'function',
    'stateMutability': 'view',
    'outputs': [{'type': 'address', 'name': 'token', 'internalType': 'contract IERC20'}, {
        'type': 'uint256',
        'name': 'allocPoint',
        'internalType': 'uint256',
    }, {'type': 'uint256', 'name': 'lastRewardTimestamp', 'internalType': 'uint256'}, {
        'type': 'uint256',
        'name': 'accRewardsPerShare',
        'internalType': 'uint256',
    }, {'type': 'uint256', 'name': 'totalStaked', 'internalType': 'uint256'}, {
        'type': 'bool',
        'name': 'vpForDeposit',
        'internalType': 'bool',
    }],
    'name': 'poolInfo',
    'inputs': [{'type': 'uint256', 'name': '', 'internalType': 'uint256'}],
}, {
    'type': 'function',
    'stateMutability': 'view',
    'outputs': [{'type': 'uint256', 'name': '', 'internalType': 'uint256'}],
    'name': 'poolLength',
    'inputs': [],
}, {
    'type': 'function',
    'stateMutability': 'view',
    'outputs': [{'type': 'bool', 'name': '', 'internalType': 'bool'}],
    'name': 'rewardsActive',
    'inputs': [],
}, {
    'type': 'function',
    'stateMutability': 'view',
    'outputs': [{'type': 'uint256', 'name': '', 'internalType': 'uint256'}],
    'name': 'rewardsPerSecond',
    'inputs': [],
}, {
    'type': 'function',
    'stateMutability': 'nonpayable',
    'outputs': [],
    'name': 'set',
    'inputs': [{'type': 'uint256', 'name': 'pid', 'internalType': 'uint256'}, {
        'type': 'uint256',
        'name': 'allocPoint',
        'internalType': 'uint256',
    }, {'type': 'bool', 'name': 'withUpdate', 'internalType': 'bool'}],
}, {
    'type': 'function',
    'stateMutability': 'nonpayable',
    'outputs': [],
    'name': 'setLockManager',
    'inputs': [{'type': 'address', 'name': 'newAddress', 'internalType': 'address'}],
}, {
    'type': 'function',
    'stateMutability': 'nonpayable',
    'outputs': [],
    'name': 'setRewardsPerSecond',
    'inputs': [{'type': 'uint256', 'name': 'newRewardsPerSecond', 'internalType': 'uint256'}],
}, {
    'type': 'function',
    'stateMutability': 'view',
    'outputs': [{'type': 'uint256', 'name': '', 'internalType': 'uint256'}],
    'name': 'startTimestamp',
    'inputs': [],
}, {
    'type': 'function',
    'stateMutability': 'view',
    'outputs': [{'type': 'uint256', 'name': '', 'internalType': 'uint256'}],
    'name': 'totalAllocPoint',
    'inputs': [],
}, {
    'type': 'function',
    'stateMutability': 'nonpayable',
    'outputs': [],
    'name': 'updatePool',
    'inputs': [{'type': 'uint256', 'name': 'pid', 'internalType': 'uint256'}],
}, {
    'type': 'function',
    'stateMutability': 'view',
    'outputs': [{'type': 'uint256', 'name': 'amount', 'internalType': 'uint256'}, {
        'type': 'uint256',
        'name': 'rewardTokenDebt',
        'internalType': 'uint256',
    }],
    'name': 'userInfo',
    'inputs': [{'type': 'uint256', 'name': '', 'internalType': 'uint256'}, {
        'type': 'address',
        'name': '',
        'internalType': 'address',
    }],
}, {
    'type': 'function',
    'stateMutability': 'nonpayable',
    'outputs': [],
    'name': 'withdraw',
    'inputs': [{'type': 'uint256', 'name': 'pid', 'internalType': 'uint256'}, {
        'type': 'uint256',
        'name': 'amount',
        'internalType': 'uint256',
    }],
}, {'type': 'receive', 'stateMutability': 'payable'}]

async function main() {
    const App = await init_ethers()

    _print(`Initialized ${App.YOUR_ADDRESS}\n`)
    _print('Reading smart contracts...\n')

    const MASTER_YAK_ADDRESS = '0x0cf605484A512d3F3435fed77AB5ddC0525Daf5f'
    const rewardTokenTicker = 'AVAX'
    const MASTER_YAK = new ethers.Contract(MASTER_YAK_ADDRESS, MATER_YAK_ABI, App.provider)

    const blocksPerSeconds = await getAverageBlockTime(App)

    const rewardsPerWeek = await MASTER_YAK.rewardsPerSecond() / 1e18 *
        604800 / blocksPerSeconds


    const tokens = {}
    const prices = await getAvaxPrices()

    await loadAvaxChefContractForYakChef(App, tokens, prices, MASTER_YAK, MASTER_YAK_ADDRESS, MATER_YAK_ABI, rewardTokenTicker,
        '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7', null, rewardsPerWeek, 'pendingRewards')

    hideLoading()
}

async function loadAvaxChefContractForYakChef(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
                                          rewardTokenAddress, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
                                          deathPoolIndices, ignoredPools) {
    const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider)

    const poolCount = parseInt(await chefContract.poolLength(), 10)
    const totalAllocPoints = await chefContract.totalAllocPoint()

    _print(`Found ${poolCount} pools.\n`)

    _print(`Showing incentivized pools only.\n`)

    var tokens = {}

    const rewardToken = await getAvaxToken(App, rewardTokenAddress, chefAddress)
    const rewardsPerWeek = rewardsPerWeekFixed ??
        await chefContract.callStatic[rewardsPerSecond]()
        / 10 ** rewardToken.decimals * 604800

    const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
        ignoredPools?.includes(x) ? null :

            await getAvaxPoolInfoForYakChef(App, chefContract, chefAddress, x, pendingRewardsFunction)))

    var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x?.poolToken).map(x => x.poolToken.tokens))

    await Promise.all(tokenAddresses.map(async (token) => {
        tokens[token] = await getAvaxToken(App, token, chefAddress)
    }))

    if (deathPoolIndices) {   //load prices for the deathpool assets
        deathPoolIndices.map(i => poolInfos[i])
            .map(poolInfo =>
                poolInfo?.token ? getPoolPrices(tokens, prices, poolInfo.token, 'avax') : undefined)
    }

    const poolPrices = poolInfos.map(poolInfo => poolInfo?.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, 'avax') : undefined)

    _print('Finished reading smart contracts.\n')

    let aprs = []
    for (i = 0; i < poolCount; i++) {
        if (poolPrices[i]) {
            const apr = printYakChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
                totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                pendingRewardsFunction, null, null, 'avax', poolInfos[i].depositFee, poolInfos[i].withdrawFee)
            aprs.push(apr)
        }
    }
    let totalUserStaked = 0, totalStaked = 0, averageApr = 0
    for (const a of aprs) {
        if (!isNaN(a.totalStakedUsd)) {
            totalStaked += a.totalStakedUsd
        }
        if (a.userStakedUsd > 0) {
            totalUserStaked += a.userStakedUsd
            averageApr += a.userStakedUsd * a.yearlyAPR / 100
        }
    }
    averageApr = averageApr / totalUserStaked
    _print_bold(`Total Staked: $${formatMoney(totalStaked)}`)
    if (totalUserStaked > 0) {
        _print_bold(`\nYou are staking a total of $${formatMoney(totalUserStaked)} at an average APR of ${(averageApr * 100).toFixed(2)}%`)
        _print(`Estimated earnings:`
            + ` Day $${formatMoney(totalUserStaked * averageApr / 365)}`
            + ` Week $${formatMoney(totalUserStaked * averageApr / 52)}`
            + ` Year $${formatMoney(totalUserStaked * averageApr)}\n`)
    }
    return {prices, totalUserStaked, totalStaked, averageApr}
}

async function getAvaxPoolInfoForYakChef(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
    const poolInfo = await chefContract.poolInfo(poolIndex);
    if (poolInfo.allocPoint == 0) {
        return {
            address: poolInfo.token,
            allocPoints: poolInfo.allocPoint ?? 1,
            poolToken: null,
            userStaked : 0,
            totalStaked: poolInfo.totalStaked,
            pendingRewardTokens : 0,
        };
    }

    const yrtToken = await getAvaxToken(app, poolInfo.token, chefAddress);
    var poolToken;
    if (yrtToken.depositToken !== undefined) {
        poolToken = await getAvaxToken(app, yrtToken.depositToken, chefAddress);
    } else {
        poolToken = yrtToken
    }

    const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);

    const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS);
    const staked = userInfo.amount / 10 ** poolToken.decimals;
    return {
        address: poolInfo.token,
        allocPoints: poolInfo.allocPoint ?? 1,
        lpToken: poolToken.name !== 'Yak Token',
        poolToken: poolToken,
        userStaked : staked,
        totalStaked: poolInfo.totalStaked,
        pendingRewardTokens : pendingRewardTokens / 10 ** 18,
        depositFee : (poolInfo.depositFeeBP ?? 0) / 100,
        withdrawFee : (poolInfo.withdrawFeeBP ?? 0) / 100
    };
}

function printYakChefPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
                       totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                       pendingRewardsFunction, fixedDecimals, claimFunction, chain="eth", depositFee=0, withdrawFee=0) {
    fixedDecimals = fixedDecimals ?? 2;

    const sp = (poolInfo.lpToken === true) ? null : getPoolPrices(tokens, prices, poolInfo.poolToken, chain);

    var poolRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek;

    if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
    const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
    const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
    const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;

    _print_inline(`${poolIndex} - `);
    sp === null ? poolPrices.print_price(chain) : undefined;
    sp?.print_price(chain);

    const apr = printAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
        staked_tvl, userStaked, poolPrices.price, fixedDecimals);
    if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
    if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
    printChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
        rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
        poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, claimFunction, rewardPrice, chain, depositFee, withdrawFee);
    return apr;
}

