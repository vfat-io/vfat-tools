$(function() {
consoleInit(main)
  });

  const MIMO_STAKING_ABI = [{"inputs":[{"internalType":"contract IGovernanceAddressProvider","name":"_addresses","type":"address"},{"internalType":"contract IERC20","name":"_token","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"stake","type":"uint256"}],"name":"StakeDecreased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"stake","type":"uint256"}],"name":"StakeIncreased","type":"event"},{"inputs":[],"name":"a","outputs":[{"internalType":"contract IGovernanceAddressProvider","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"pendingMIMO","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"releaseMIMO","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"stake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"userInfo","outputs":[{"components":[{"internalType":"uint256","name":"stake","type":"uint256"},{"internalType":"uint256","name":"accAmountPerShare","type":"uint256"}],"internalType":"struct IGenericMiner.UserInfo","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

  async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const MIMO_STAKING_ADDR = "0x9DD8C3d3E3ec1569e3eE22C4ef26581619ab4222";
    const MIMO_STAKING_CONTRACT = new ethers.Contract(MIMO_STAKING_ADDR, MIMO_STAKING_ABI, App.provider);

    const MIMO_STAKING_ADDR2 = "0x6a028bbF53cA9a5ff5c58bD49350e47bFe810F43";
    const MIMO_STAKING_CONTRACT2 = new ethers.Contract(MIMO_STAKING_ADDR2, MIMO_STAKING_ABI, App.provider);

    const MIMO_STAKING_ADDR3 = "0x7DCCB36Ba7177154F364Dab07cb57250AbA50b3e";
    const MIMO_STAKING_CONTRACT3 = new ethers.Contract(MIMO_STAKING_ADDR3, MIMO_STAKING_ABI, App.provider);

    const MIMO_STAKING_ADDR4 = "0x6105D733050Fb504460FFF37eA639F0052B12035";
    const MIMO_STAKING_CONTRACT4 = new ethers.Contract(MIMO_STAKING_ADDR4, MIMO_STAKING_ABI, App.provider);

    const MIMO_STAKING_ADDR5 = "0x32385c4B89e16ADCaeF6A280b55EA42a86C3a01e";
    const MIMO_STAKING_CONTRACT5 = new ethers.Contract(MIMO_STAKING_ADDR5, MIMO_STAKING_ABI, App.provider);

    const pendingMimo = await MIMO_STAKING_CONTRACT.pendingMIMO(App.YOUR_ADDRESS);
    const rewardTokenAddr = "0x90B831fa3Bebf58E9744A14D638E25B4eE06f9Bc";
    const stakingTokenAddr = await MIMO_STAKING_CONTRACT.token();
    const userStaked = await MIMO_STAKING_CONTRACT.stake(App.YOUR_ADDRESS) / 1e18;
    const rewardTokenTicker = "MIMO";
    const rewardsPerWeek = 750876.15 * 7;

    const pendingMimo2 = await MIMO_STAKING_CONTRACT2.pendingMIMO(App.YOUR_ADDRESS);
    const stakingTokenAddr2 = await MIMO_STAKING_CONTRACT2.token();
    const userStaked2 = await MIMO_STAKING_CONTRACT2.stake(App.YOUR_ADDRESS) / 1e18;
    const rewardsPerWeek2 = 750876.15 * 7;

    const pendingMimo3 = await MIMO_STAKING_CONTRACT3.pendingMIMO(App.YOUR_ADDRESS);
    const stakingTokenAddr3 = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
    const userStaked3 = await MIMO_STAKING_CONTRACT3.stake(App.YOUR_ADDRESS) / 1e18;
    const rewardsPerWeek3 = 750876.15 * 7;

    const pendingMimo4 = await MIMO_STAKING_CONTRACT4.pendingMIMO(App.YOUR_ADDRESS);
    const stakingTokenAddr4 = "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599";
    const userStaked4 = await MIMO_STAKING_CONTRACT4.stake(App.YOUR_ADDRESS) / 1e18;
    const rewardsPerWeek4 = 600700.92 * 7;

    const pendingMimo5 = await MIMO_STAKING_CONTRACT5.pendingMIMO(App.YOUR_ADDRESS);
    const stakingTokenAddr5 = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
    const userStaked5 = await MIMO_STAKING_CONTRACT5.stake(App.YOUR_ADDRESS) / 1e18;
    const rewardsPerWeek5 = 150175.23 * 7;

    let tokens = {};
    let prices = {};

    const parTokenAddress = "0x68037790a0229e9ce6eaa8a99ea92964106c4703"

    let p1 = await loadMimoContract(App, tokens, prices, MIMO_STAKING_ADDR, MIMO_STAKING_ABI, rewardTokenTicker,
      rewardTokenAddr, stakingTokenAddr, pendingMimo, userStaked, rewardsPerWeek);

    let p2 = await loadMimoContract(App, tokens, prices, MIMO_STAKING_ADDR2, MIMO_STAKING_ABI, rewardTokenTicker,
      rewardTokenAddr, stakingTokenAddr2, pendingMimo2, userStaked2, rewardsPerWeek2);

    let p3 = await loadMimoContract2(App, tokens, prices, MIMO_STAKING_ADDR3, MIMO_STAKING_ABI, rewardTokenTicker,
      rewardTokenAddr, stakingTokenAddr3, pendingMimo3, userStaked3, rewardsPerWeek3, parTokenAddress);

    let p4 = await loadMimoContract2(App, tokens, prices, MIMO_STAKING_ADDR4, MIMO_STAKING_ABI, rewardTokenTicker,
      rewardTokenAddr, stakingTokenAddr4, pendingMimo4, userStaked4, rewardsPerWeek4, parTokenAddress);

    let p5 = await loadMimoContract2(App, tokens, prices, MIMO_STAKING_ADDR5, MIMO_STAKING_ABI, rewardTokenTicker,
      rewardTokenAddr, stakingTokenAddr5, pendingMimo5, userStaked5, rewardsPerWeek5, parTokenAddress);

    _print_bold(`Total Staked: $${formatMoney(p1.totalStakedUsd + p2.totalStakedUsd + p3.totalStakedUsd)}`);

    if (p1.totalUserStaked > 0 || p2.totalUserStaked > 0 || p3.totalUserStaked > 0 || p4.totalUserStaked > 0 || p5.totalUserStaked > 0) {
      _print_bold(`\nYou are staking a total of $${formatMoney(p1.totalUserStaked + p2.totalUserStaked)} at an average APR of ${(p1.averageApr + p2.averageApr * 100).toFixed(2)}%`)
      _print(`Estimated earnings:`
        + ` Day $${formatMoney(p1.totalUserStaked*p1.averageApr/365 +
                               p2.totalUserStaked*p2.averageApr/365 +
                               p3.totalUserStaked*p3.averageApr/365 +
                               p4.totalUserStaked*p4.averageApr/365 +
                               p5.totalUserStaked*p5.averageApr/365)}`
        + ` Week $${formatMoney(p1.totalUserStaked*p1.averageApr/52 +
                                p2.totalUserStaked*p2.averageApr/52 +
                                p3.totalUserStaked*p3.averageApr/52 +
                                p4.totalUserStaked*p4.averageApr/52 +
                                p5.totalUserStaked*p5.averageApr/52)}`
        + ` Year $${formatMoney(p1.totalUserStaked*p1.averageApr +
                                p2.totalUserStaked*p2.averageApr +
                                p3.totalUserStaked*p3.averageApr +
                                p4.totalUserStaked*p4.averageApr +
                                p5.totalUserStaked*p5.averageApr)}\n`);
    }

    hideLoading();
  }

async function loadMimoContract(App, tokens, prices, contractAddress, abi, rewardTokenTicker,
  rewardTokenAddr, stakingTokenAddr, pendingRewards, userStaked, rewardsPerWeek) {

  const rewardToken = await getToken(App, rewardTokenAddr, contractAddress);
  const stakeToken = await getToken(App, stakingTokenAddr, contractAddress);

  const newAddresses = stakeToken.tokens.concat([rewardTokenAddr])

  await getNewPricesAndTokens(App, tokens, prices, newAddresses, contractAddress);

  const poolPrices = getPoolPrices(tokens, prices, stakeToken);

  const apr = printMimoPool(App, abi, contractAddress, prices, tokens, stakingTokenAddr, stakeToken, userStaked,
    poolPrices, rewardsPerWeek, rewardTokenTicker, rewardTokenAddr, pendingRewards, rewardToken);
  return apr;
}

function printMimoPool(App, abi, contractAddress, prices, tokens, stakingTokenAddr, stakeToken, userStaked,
  poolPrices, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress, pendingRewards, rewardToken, chain="eth") {
  const poolRewardsPerWeek = rewardsPerWeek;
  const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  const staked_tvl = poolPrices.staked_tvl;
  const pendingRewardTokens = pendingRewards / 10 ** 18;
  const claimFunction = "releaseMIMO";
  poolPrices.print_price();
  const apr = printAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
    staked_tvl, userStaked, poolPrices.price, 2);
  printMimoContractLinks(App, abi, contractAddress, stakingTokenAddr, pendingRewards,
    rewardTokenTicker, poolPrices.stakeTokenTicker, stakeToken.unstaked,
    userStaked, pendingRewardTokens, 2, claimFunction, rewardPrice, chain);
  return apr;
}

function printMimoContractLinks(App, abi, contractAddress, stakingTokenAddr, pendingRewards,
  rewardTokenTicker, stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, fixedDecimals,
  claimFunction, rewardTokenPrice) {
const approveAndStake = async function() {
  return mimoContract_stake(abi, contractAddress, stakingTokenAddr, App)
}
const unstake = async function() {
  return mimoContract_unstake(abi, contractAddress, App, pendingRewards, userStaked)
}
const claim = async function() {
  return mimoContract_claim(abi, contractAddress, App, pendingRewards, claimFunction)
}
_print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
_print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
_print_link(`Claim ${pendingRewardTokens.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(pendingRewardTokens*rewardTokenPrice)})`, claim)
_print("");
}

const mimoContract_stake = async function(abi, contractAddress, stakeTokenAddr, App) {
  const signer = App.provider.getSigner()

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  const MIMO_CONTRACT = new ethers.Contract(contractAddress, abi, signer)

  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, contractAddress)

  let allow = Promise.resolve()

  if (allowedTokens / 1e18 < currentTokens / 1e18) {
    showLoading()
    allow = STAKING_TOKEN.approve(contractAddress, ethers.constants.MaxUint256)
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
        MIMO_CONTRACT.deposit(currentTokens, {gasLimit: 500000})
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

const mimoContract_unstake = async function(abi, contractAddress, App, pendingRewards, userStaked) {
  const signer = App.provider.getSigner()
  const MIMO_CONTRACT = new ethers.Contract(contractAddress, abi, signer)

  const earnedTokenAmount = pendingRewards / 1e18

  if (earnedTokenAmount > 0) {
    showLoading()
    MIMO_CONTRACT.withdraw(userStaked, {gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const mimoContract_claim = async function(abi, contractAddress, App,
  pendingRewards, claimFunction) {
const signer = App.provider.getSigner()

const MIMO_CONTRACT = new ethers.Contract(contractAddress, abi, signer)

const earnedTokenAmount = pendingRewards / 1e18

if (earnedTokenAmount > 0) {
  showLoading()
  if (claimFunction) {
    claimFunction(App.YOUR_ADDRESS, {gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
  }
  else {
    MIMO_CONTRACT.deposit(0, {gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}
}

async function loadMimoContract2(App, tokens, prices, contractAddress, abi, rewardTokenTicker,
  rewardTokenAddr, stakingTokenAddr, pendingRewards, userStaked, rewardsPerWeek, parTokenAddress) {

  if(contractAddress == "0x7DCCB36Ba7177154F364Dab07cb57250AbA50b3e"){
    _print(`WETH Pool`)
  }else if(contractAddress == "0x6105D733050Fb504460FFF37eA639F0052B12035"){
    _print(`WBTC Pool`)
  }else if(contractAddress == "0x32385c4B89e16ADCaeF6A280b55EA42a86C3a01e"){
    _print(`USDC Pool`)
  }
  const MINER_CONTRACT = new ethers.Contract(contractAddress, abi, App.provider);

  const stakeToken = await getToken(App, parTokenAddress, contractAddress);
  stakeToken.staked = await MINER_CONTRACT.totalStake() / 1e18;

  const newAddresses = stakeToken.tokens.concat([rewardTokenAddr])

  await getNewPricesAndTokens(App, tokens, prices, newAddresses, contractAddress);

  const poolPrices = getPoolPrices(tokens, prices, stakeToken);

  const apr = printMimoPool2(prices, userStaked,
    poolPrices, rewardsPerWeek, rewardTokenTicker, rewardTokenAddr);
  return apr;
}

function printMimoPool2(prices, userStaked,
  poolPrices, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress) {
  const poolRewardsPerWeek = rewardsPerWeek;
  const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  const staked_tvl = poolPrices.staked_tvl;
  poolPrices.print_price();
  const apr = printAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
    staked_tvl, userStaked, poolPrices.price, 2);
    _print(`\n`);
  return apr;
}
