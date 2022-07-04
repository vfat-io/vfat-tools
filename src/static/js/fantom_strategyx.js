
$(function () {
  consoleInit(main)
});

const STRATEGYX_CHEF_ABI = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "buybackAmount", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "EmergencyWithdraw", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Mint", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "buybackAmount", "type": "uint256" }], "name": "Withdraw", "type": "event" }, { "inputs": [], "name": "WETH", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "accounts", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_strategyxPerBlock", "type": "uint256" }, { "internalType": "address", "name": "_lpToken", "type": "address" }, { "internalType": "bool", "name": "_withUpdate", "type": "bool" }, { "internalType": "uint256", "name": "_withdrawFee", "type": "uint256" }], "name": "add", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "bonusEndBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "uint256", "name": "_durationSec", "type": "uint256" }, { "internalType": "uint256", "name": "_leverage", "type": "uint256" }], "name": "deposit", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_devaddr", "type": "address" }], "name": "dev", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "devaddr", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "sec_", "type": "uint256" }], "name": "formatDuration", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_leverage", "type": "uint256" }], "name": "getLeverageMultiplex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_from", "type": "uint256" }, { "internalType": "uint256", "name": "_to", "type": "uint256" }], "name": "getMultiplier", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "sec_", "type": "uint256" }], "name": "getTimeMultiplex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }], "name": "getUserStaked", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "address", "name": "_user", "type": "address" }], "name": "hasLeverage", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "contract IERC20", "name": "_strategyx", "type": "address" }, { "internalType": "address", "name": "_devaddr", "type": "address" }, { "internalType": "address", "name": "_weth", "type": "address" }, { "internalType": "uint256", "name": "_startBlock", "type": "uint256" }, { "internalType": "uint256", "name": "_bonusEndBlock", "type": "uint256" }, { "internalType": "contract IStayDao", "name": "_stayDao", "type": "address" }], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "massUpdatePools", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "onERC721Received", "outputs": [{ "internalType": "bytes4", "name": "", "type": "bytes4" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "address", "name": "_user", "type": "address" }, { "internalType": "bool", "name": "_leverage", "type": "bool" }], "name": "pendingStrategyx", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "poolInfo", "outputs": [{ "internalType": "contract IERC20", "name": "lpToken", "type": "address" }, { "internalType": "uint256", "name": "strategyxPerBlock", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "withdrawFee", "type": "uint256" }, { "internalType": "uint256", "name": "lastRewardBlock", "type": "uint256" }, { "internalType": "uint256", "name": "accStrategyxPerShare", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "poolLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "resetLeverage", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "bool", "name": "_withUpdate", "type": "bool" }, { "internalType": "uint256", "name": "_strategyxPerBlock", "type": "uint256" }, { "internalType": "uint256", "name": "_withdrawFee", "type": "uint256" }], "name": "set", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "startBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "stayDao", "outputs": [{ "internalType": "contract IStayDao", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "strategyx", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalAllocPoint", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "updatePool", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" }], "name": "userInfo", "outputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "boostAmount", "type": "uint256" }, { "internalType": "uint256", "name": "untilLock", "type": "uint256" }, { "internalType": "uint256", "name": "rewardDebt", "type": "uint256" }, { "internalType": "uint256", "name": "leverage", "type": "uint256" }, { "internalType": "uint256", "name": "lastHarvestTime", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "address", "name": "_user", "type": "address" }], "name": "userInterest", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "wethelper", "outputs": [{ "internalType": "contract WETHelper", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "withdrawALL", "outputs": [], "stateMutability": "payable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }]
async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);

  _print("Reading smart contracts...\n");

  const STRATEGYX_CHEF_ADDR = "0xa1d93770f2980d5743b71b0df17b6046ae865195";
  const stay_token_addr = "0xA5365f2E77bCe1cb2D42F5c808012C01b1548d3C"
  const rewardTokenTicker = "Strategyx";
  const STRATEGYX_CHEF = new ethers.Contract(STRATEGYX_CHEF_ADDR, STRATEGYX_CHEF_ABI, App.provider);

  let rewardsPerWeek = 0
  const startBlock = await STRATEGYX_CHEF.startBlock();
  const currentBlock = await App.provider.getBlockNumber();

  const multiplier = await STRATEGYX_CHEF.getMultiplier(currentBlock, currentBlock + 1);
  if (currentBlock < startBlock) {
    _print(`Rewards start at block <a href="https://ftmscan.com/block/countdown/${startBlock}" target="_blank">${startBlock}</a>\n`);
  } else {
    const poolLength = await STRATEGYX_CHEF.poolLength()
    for (let i = 0; i < poolLength; i++) {
      const poolInfo = await STRATEGYX_CHEF.poolInfo(i)
      rewardsPerWeek += poolInfo.strategyxPerBlock / 1e18 * multiplier * 96000 * 7;
    }
  }
  const tokens = {};
  const prices = await getFantomPrices();

  const stay_chefContract_stake = async function (chefAbi, chefAddress, poolIndex, stakeTokenAddr, App) {
    const signer = App.provider.getSigner()

    const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
    const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

    const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
    const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, chefAddress)

    let allow = Promise.resolve()

    if (allowedTokens / 1e18 < currentTokens / 1e18) {
      showLoading()
      allow = STAKING_TOKEN.approve(chefAddress, ethers.constants.MaxUint256)
        .then(function (t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function () {
          hideLoading()
          alert('Try resetting your approval to 0 first')
        })
    }

    if (currentTokens / 1e18 > 0) {
      showLoading()
      allow
        .then(async function () {
          CHEF_CONTRACT.deposit(poolIndex, currentTokens, 0, 0, { gasLimit: 500000 })
            .then(function (t) {
              App.provider.waitForTransaction(t.hash).then(function () {
                hideLoading()
              })
            })
            .catch(function () {
              hideLoading()
              _print('Something went wrong.')
            })
        })
        .catch(function () {
          hideLoading()
          _print('Something went wrong.')
        })
    } else {
      alert('You have no tokens to stake!!')
    }
  }

  const stay_chefContract_unstake = async function (chefAbi, chefAddress, poolIndex, App, pendingRewardsFunction) {
    const signer = App.provider.getSigner()
    const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

    const currentStakedAmount = (await CHEF_CONTRACT.userInfo(poolIndex, App.YOUR_ADDRESS)).amount

    if (currentStakedAmount / 1e18 > 0) {
      showLoading()
      CHEF_CONTRACT.withdraw(poolIndex, currentStakedAmount, { gasLimit: 500000 })
        .then(function (t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function () {
          hideLoading()
        })
    }
  }

  const stay_chefContract_claim = async function (chefAbi, chefAddress, poolIndex, App,
    pendingRewardsFunction, claimFunction) {
    const signer = App.provider.getSigner()

    const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

    const earnedTokenAmount = await CHEF_CONTRACT.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS) / 1e18

    if (earnedTokenAmount > 0) {
      showLoading()
      if (claimFunction) {
        claimFunction(poolIndex, { gasLimit: 500000 })
          .then(function (t) {
            return App.provider.waitForTransaction(t.hash)
          })
      }
      else {
        CHEF_CONTRACT.deposit(poolIndex, 0, 0, 0, { gasLimit: 500000 })
          .then(function (t) {
            return App.provider.waitForTransaction(t.hash)
          })
          .catch(function () {
            hideLoading()
          })
      }
    }
  }


  function printChefContractLinksStay(
    App,
    chefAbi,
    chefAddr,
    poolIndex,
    poolAddress,
    pendingRewardsFunction,
    rewardTokenTicker,
    stakeTokenTicker,
    unstaked,
    userStaked,
    pendingRewardTokens,
    fixedDecimals,
    claimFunction,
    rewardTokenPrice,
    chain,
    depositFee,
    withdrawFee
  ) {
    fixedDecimals = fixedDecimals ?? 2

    const approveAndStake = async function () {
      return stay_chefContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
    }
    const unstake = async function () {
      return stay_chefContract_unstake(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction)
    }
    const claim = async function () {
      return stay_chefContract_claim(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction, claimFunction)
    }
    if (depositFee > 0) {
      _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${depositFee}%`, approveAndStake)
    } else {
      _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
    }
    if (withdrawFee > 0) {
      _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${withdrawFee}%`, unstake)
    } else {
      _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
    }
    _print_link(
      `Claim ${pendingRewardTokens.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(
        pendingRewardTokens * rewardTokenPrice
      )})`,
      claim
    )
    _print(`Staking or unstaking also claims rewards.`)
    _print('')
  }
  const customURLs =
  {
    add: "https://spookyswap.finance/add",
    remove: "https://spookyswap.finance/pool",
    swap: "https://spookyswap.finance/swap",
    info: "https://info.spookyswap.finance/"
  }

  function printChefPoolStay(
    App,
    chefAbi,
    chefAddr,
    prices,
    tokens,
    poolInfo,
    poolIndex,
    poolPrices,
    poolRewardsPerWeek,
    rewardsPerWeek,
    rewardTokenTicker,
    rewardTokenAddress,
    pendingRewardsFunction,
    fixedDecimals,
    claimFunction,
    chain = 'eth',
    depositFee = 0,
    withdrawFee = 0
  ) {
    fixedDecimals = fixedDecimals ?? 2
    const sp = poolInfo.stakedToken == null ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain)
    // var poolRewardsPerWeek = (poolInfo.allocPoints / totalAllocPoints) * rewardsPerWeek
    if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return
    const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked
    const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd

    const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl
    _print_inline(`${poolIndex} - `)
    poolPrices.print_price(chain, 18, customURLs)
    sp?.print_price(chain)

    const apr = printAPR(
      rewardTokenTicker,
      rewardPrice,
      poolRewardsPerWeek,
      poolPrices.stakeTokenTicker,
      staked_tvl,
      userStaked,
      poolPrices.price,
      fixedDecimals
    )
    if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked)
    if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked)
    printChefContractLinksStay(
      App,
      chefAbi,
      chefAddr,
      poolIndex,
      poolInfo.address,
      pendingRewardsFunction,
      rewardTokenTicker,
      poolPrices.stakeTokenTicker,
      poolInfo.poolToken.unstaked,
      poolInfo.userStaked,
      poolInfo.pendingRewardTokens,
      fixedDecimals,
      claimFunction,
      rewardPrice,
      chain,
      depositFee,
      withdrawFee
    )
    return apr
  }

  async function getGeneralEthcallPoolInfoStay(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
    const poolInfo = await chefContract.poolInfo(poolIndex);
    if (poolInfo.allocPoint == 0) {
      return {
        address: poolInfo.lpToken,
        allocPoints: poolInfo.allocPoint ?? 1,
        poolToken: null,
        userStaked: 0,
        pendingRewardTokens: 0,
      };
    }
    const poolToken = await getGeneralEthcallToken(app, poolInfo.lpToken ?? poolInfo.token ?? poolInfo.stakingToken, chefAddress);
    const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
    let pendingRewardTokens = 0;
    try{
      pendingRewardTokens= await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS, false);
    }catch{}
    const staked = userInfo.amount / 10 ** poolToken.decimals;
    return {
      address: poolInfo.lpToken ?? poolInfo.token ?? poolInfo.stakingToken,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: poolToken,
      userStaked: staked,
      pendingRewardTokens: pendingRewardTokens / 10 ** 18,
      depositFee: (poolInfo.depositFeeBP ?? poolInfo.depositFee ?? 0) / 100,
      withdrawFee: (poolInfo.withdrawFeeBP ?? poolInfo.withdrawalFee ?? 0) / 100
    };
  }


  async function loadStayEthcallChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
    rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
    deathPoolIndices, chain, claimFunction) {
    const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

    const poolCount = parseInt(await chefContract.poolLength(), 10);

    switch (chain) {
      case "fantom": _print(`<a href='https://ftmscan.com/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
        break;
      case "aurora": _print(`<a href='https://aurorascan.dev/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
        break;
      case "avax": _print(`<a href='https://cchain.explorer.avax.network/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
        break;
      case "metis": _print(`<a href='http://andromeda-explorer.metis.io/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
        break;
      case "boba": _print(`<a href='https://blockexplorer.boba.network/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
        break;
      case "moonbeam": _print(`<a href='https://moonscan.io/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
        break;
      case "velas": _print(`<a href='https://evmexplorer.velas.com/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
        break;
      case "emerald": _print(`<a href='https://explorer.emerald.oasis.dev/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
        break;
      case "fantom": _print(`<a href='https://ftmscan.com/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
        break;
      case "iotex": _print(`<a href='https://iotexscan.io/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
        break;
      case "cronos": _print(`<a href='https://cronoscan.com/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
        break;
    }
    _print(`Found ${poolCount} pools.\n`)

    _print(`Showing incentivized pools only.\n`);

    const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();

    const rewardToken = await getGeneralEthcallToken(App, rewardTokenAddress, chefAddress);

    const rewardsPerWeek = rewardsPerWeekFixed ??
      await chefContract.callStatic[rewardsPerBlockFunction]()
      / 10 ** rewardToken.decimals * 604800 / 3

    const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
      await getGeneralEthcallPoolInfoStay(App, chefContract, chefAddress, x, pendingRewardsFunction)));
    var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

    await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getGeneralEthcallToken(App, address, chefAddress);
    }));

    if (deathPoolIndices) {   //load prices for the deathpool assets
      deathPoolIndices.map(i => poolInfos[i])
        .map(poolInfo =>
          poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, chain) : undefined);
    }

    const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, chain) : undefined);

    _print("Finished reading smart contracts.\n");

    let aprs = []
    for (i = 0; i < poolCount; i++) {
      if (poolPrices[i]) {
        const poolInfo = await chefContract.poolInfo(i)
        poolRewardsPerWeek = poolInfo.strategyxPerBlock / 1e18 * 96000 * 7
        const apr = printChefPoolStay(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
          poolRewardsPerWeek, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
          pendingRewardsFunction, null, claimFunction, chain, poolInfos[i].depositFee, poolInfos[i].withdrawFee)
        aprs.push(apr);
      }
    }

    let totalUserStaked = 0, totalStaked = 0, averageApr = 0;
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
        + ` Day $${formatMoney(totalUserStaked * averageApr / 365)}`
        + ` Week $${formatMoney(totalUserStaked * averageApr / 52)}`
        + ` Year $${formatMoney(totalUserStaked * averageApr)}\n`);
    }
    return { prices, totalUserStaked, totalStaked, averageApr }
  }


  await loadStayEthcallChefContract(App, tokens, prices, STRATEGYX_CHEF, STRATEGYX_CHEF_ADDR, STRATEGYX_CHEF_ABI, rewardTokenTicker,
    "strategyx", null, rewardsPerWeek, "pendingStrategyx", [], "fantom");

  hideLoading();
}


