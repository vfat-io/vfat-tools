
$(function() {
    consoleInit(main)
});

const POOL_ABI = [
    {
        inputs: [],
        name: "REWARD_TOKEN",
        outputs: [
            {
                internalType: "contract IERC20",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "STAKE_TOKEN",
        outputs: [
            {
                internalType: "contract IERC20",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "bonusEndBlock",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "startBlock",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "deposit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "depositFee",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_user",
                type: "address",
            },
        ],
        name: "pendingReward",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "rewardBalance",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "rewardPerBlock",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalStakeTokenBalance",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalStaked",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "userInfo",
        outputs: [
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "rewardDebt",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amountEth",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];

async function getGasStationBscPoolInfo(app, poolContract, poolAddress, rewardToken) {
    const stakeToken = await poolContract.STAKE_TOKEN();
    const depositFee = await poolContract.depositFee();
    const withdrawFee = 0;

    try {
        withdrawFee = await poolContract.withdrawFee();
    } catch (err) {}

    const poolToken = await getBscToken(app, stakeToken, poolAddress);
    const userInfo = await poolContract.userInfo(app.YOUR_ADDRESS);
    const pendingRewardTokens = await poolContract.pendingReward(app.YOUR_ADDRESS);
    const staked = userInfo.amount / 10 ** poolToken.decimals;
    return {
        address: stakeToken,
        poolToken: poolToken,
        userStaked : staked,
        pendingRewardTokens : pendingRewardTokens / 10 ** rewardToken.decimals,
        depositFee : (depositFee ?? 0) / 100,
        withdrawFee : (withdrawFee ?? 0) / 100
    };
}

const poolContract_GasStation_stake = async function(poolAbi, poolAddress, stakeTokenAddr, App) {
    const signer = App.provider.getSigner()

    const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
    const POOL_CONTRACT = new ethers.Contract(poolAddress, poolAbi, signer)

    const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
    const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, poolAddress)

    let allow = Promise.resolve()

    if (allowedTokens / 1e18 < currentTokens / 1e18) {
        showLoading()
        allow = STAKING_TOKEN.approve(poolAddress, ethers.constants.MaxUint256)
        .then(function(t) {
            return App.provider.waitForTransaction(t.hash).then(function() {
                hideLoading()
            })
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
            POOL_CONTRACT.deposit(currentTokens)
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

    const poolContract_GasStation_unstake = async function(poolAbi, poolAddress, App) {
    const signer = App.provider.getSigner()
    const POOL_CONTRACT = new ethers.Contract(poolAddress, poolAbi, signer)

    const currentStakedAmount = (await POOL_CONTRACT.userInfo(App.YOUR_ADDRESS)).amount
    const earnedTokenAmount = await POOL_CONTRACT.pendingReward(App.YOUR_ADDRESS) / 1e18

    if (earnedTokenAmount > 0) {
        showLoading()
        POOL_CONTRACT.withdraw(currentStakedAmount)
        .then(function(t) {
            return App.provider.waitForTransaction(t.hash).then(function() {
                hideLoading()
            })
        })
        .catch(function() {
            hideLoading()
        })
    }
    }

const poolContract_GasStation_claim = async function(poolAbi, poolAddress, App) {
    const signer = App.provider.getSigner()

    const POOL_CONTRACT = new ethers.Contract(poolAddress, poolAbi, signer)

    const earnedTokenAmount = await POOL_CONTRACT.pendingReward(App.YOUR_ADDRESS) / 1e18

    if (earnedTokenAmount > 0) {
        showLoading();

        POOL_CONTRACT.deposit(0)
            .then(function(t) {
                return App.provider.waitForTransaction(t.hash).then(function() {
                    hideLoading()
                })
            })
            .catch(function() {
                hideLoading()
            })
    }
}

const poolContract_GasStation_emergencyWithdraw = async function(poolAbi, poolAddress, App) {
    const signer = App.provider.getSigner()

    const POOL_CONTRACT = new ethers.Contract(poolAddress, poolAbi, signer)

    const currentStakedAmount = (await POOL_CONTRACT.userInfo(App.YOUR_ADDRESS)).amount

    if (currentStakedAmount > 0) {
        showLoading();

        POOL_CONTRACT.emergencyWithdraw()
            .then(function(t) {
                return App.provider.waitForTransaction(t.hash).then(function() {
                    hideLoading()
                })
            })
            .catch(function() {
                hideLoading()
            })
    }
}

function printGasStationBscPoolLinks(App, poolAbi, poolAddr, poolAddress, rewardTokenTicker,
                                        stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, fixedDecimals,
                                        rewardTokenPrice, depositFee, withdrawFee) {
    fixedDecimals = fixedDecimals ?? 2;
    const approveAndStake = async function() {
        return poolContract_GasStation_stake(poolAbi, poolAddr, poolAddress, App)
    }
    const unstake = async function() {
        return poolContract_GasStation_unstake(poolAbi, poolAddr, App)
    }
    const claim = async function() {
        return poolContract_GasStation_claim(poolAbi, poolAddr, App)
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

function printGasStationBscPool(App, poolAbi, poolAddr, prices, tokens, poolInfo, poolPrices,
                                        rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                                        fixedDecimals, depositFee=0, withdrawFee=0) {
    fixedDecimals = fixedDecimals ?? 2;
    const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, "bsc");

    const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
    const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
    const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;

    // _print_inline(`${poolIndex} - `);
    poolPrices.print_price("bsc");
    sp?.print_price("bsc");

    const apr = printAPR(rewardTokenTicker, rewardPrice, rewardsPerWeek, poolPrices.stakeTokenTicker,
                        staked_tvl, userStaked, poolPrices.price, fixedDecimals);

    if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
    if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);

    printGasStationBscPoolLinks(App, poolAbi, poolAddr, poolInfo.address,
                                rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
                                poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, rewardPrice, depositFee, withdrawFee);
    return apr;
}

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Loading Pools...\n");

    const poolsResponse = await fetch(`https://www.gasstationcrypto.com/pools.json`);

    const pools = await poolsResponse.json();

    _print(`${pools['bsc'].length} Pools Found...\n`);
    _print("Reading smart contracts...\n");

    let aprs = [];
    const tokens = {};
    const prices = await getBscPrices();

    const lpToken = await getBscToken(App, "0xfB6f376B990ae3fc3Cfa2Ce1cB1A796c5895AcBa", "0x0000000000000000000000000000000000000000");
    await Promise.all(lpToken.tokens.map(async (address) => {
        tokens[address] = await getBscToken(App, address, "0x0000000000000000000000000000000000000000");
    }));
    getPoolPrices(tokens, prices, lpToken, "bsc");

    for (const pool of pools['bsc']) {
        _print("=========================================================\n");

        _print(`Reading: ${pool.name ?? pool.address}...`);
        if (pool.name) _print(`Contract: ${pool.address}`);

        _print(" ");

        const poolContract = new ethers.Contract(pool.address, POOL_ABI, App.provider);

        const rewardTokenAddress = await poolContract.REWARD_TOKEN();
        const rewardToken = await getBscToken(App, rewardTokenAddress, pool.address);
        const rewardsPerWeek = (await poolContract.rewardPerBlock()) / 10 ** rewardToken.decimals * 604800 / 3

        const poolInfo = await getGasStationBscPoolInfo(App, poolContract, pool.address, rewardToken);

        await Promise.all(poolInfo.poolToken.tokens.map(async (address) => {
            tokens[address] = await getBscToken(App, address, pool.address);
        }));

        const poolPrice = getPoolPrices(tokens, prices, poolInfo.poolToken, "bsc");

        const apr = printGasStationBscPool(App, POOL_ABI, pool.address, prices, tokens, poolInfo, poolPrice,
                                            rewardsPerWeek, rewardToken.symbol, rewardTokenAddress,
                                            null, poolInfo.depositFee, poolInfo.withdrawFee)
        aprs.push(apr);
    }

    _print("=========================================================\n");

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

    hideLoading();
}
