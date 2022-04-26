$(function() {
consoleInit(main)
  });

  async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const BNT_CHEF_ADDR = "0xb0B958398ABB0b5DB4ce4d7598Fb868f5A00f372";
    const BNT_CHEF_ABI = [{"inputs":[{"internalType":"contract IBancorNetwork","name":"initNetwork","type":"address"},{"internalType":"contract INetworkSettings","name":"initNetworkSettings","type":"address"},{"internalType":"contract ITokenGovernance","name":"initBNTGovernance","type":"address"},{"internalType":"contract IBNTPool","name":"initBNTPool","type":"address"},{"internalType":"contract IExternalRewardsVault","name":"initExternalRewardsVault","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AccessDenied","type":"error"},{"inputs":[],"name":"AlreadyExists","type":"error"},{"inputs":[],"name":"AlreadyInitialized","type":"error"},{"inputs":[],"name":"ArrayNotUnique","type":"error"},{"inputs":[],"name":"DoesNotExist","type":"error"},{"inputs":[],"name":"InsufficientFunds","type":"error"},{"inputs":[],"name":"InvalidAddress","type":"error"},{"inputs":[],"name":"InvalidParam","type":"error"},{"inputs":[],"name":"NativeTokenAmountMismatch","type":"error"},{"inputs":[],"name":"NotWhitelisted","type":"error"},{"inputs":[],"name":"PermitUnsupported","type":"error"},{"inputs":[],"name":"PoolMismatch","type":"error"},{"inputs":[],"name":"ProgramDisabled","type":"error"},{"inputs":[],"name":"ProgramInactive","type":"error"},{"inputs":[],"name":"RewardsTokenMismatch","type":"error"},{"inputs":[],"name":"RewardsTooHigh","type":"error"},{"inputs":[],"name":"ZeroValue","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract Token","name":"pool","type":"address"},{"indexed":true,"internalType":"uint256","name":"programId","type":"uint256"},{"indexed":true,"internalType":"contract Token","name":"rewardsToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"totalRewards","type":"uint256"},{"indexed":false,"internalType":"uint32","name":"startTime","type":"uint32"},{"indexed":false,"internalType":"uint32","name":"endTime","type":"uint32"}],"name":"ProgramCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract Token","name":"pool","type":"address"},{"indexed":true,"internalType":"uint256","name":"programId","type":"uint256"},{"indexed":false,"internalType":"bool","name":"status","type":"bool"},{"indexed":false,"internalType":"uint256","name":"remainingRewards","type":"uint256"}],"name":"ProgramEnabled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract Token","name":"pool","type":"address"},{"indexed":true,"internalType":"uint256","name":"programId","type":"uint256"},{"indexed":false,"internalType":"uint32","name":"endTime","type":"uint32"},{"indexed":false,"internalType":"uint256","name":"remainingRewards","type":"uint256"}],"name":"ProgramTerminated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract Token","name":"pool","type":"address"},{"indexed":true,"internalType":"uint256","name":"programId","type":"uint256"},{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256","name":"poolTokenAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"prevStake","type":"uint256"}],"name":"ProviderJoined","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract Token","name":"pool","type":"address"},{"indexed":true,"internalType":"uint256","name":"programId","type":"uint256"},{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256","name":"poolTokenAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"remainingStake","type":"uint256"}],"name":"ProviderLeft","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract Token","name":"pool","type":"address"},{"indexed":true,"internalType":"uint256","name":"programId","type":"uint256"},{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RewardsClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract Token","name":"pool","type":"address"},{"indexed":true,"internalType":"uint256","name":"programId","type":"uint256"},{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RewardsStaked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"name":"claimRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract Token","name":"pool","type":"address"},{"internalType":"contract Token","name":"rewardsToken","type":"address"},{"internalType":"uint256","name":"totalRewards","type":"uint256"},{"internalType":"uint32","name":"startTime","type":"uint32"},{"internalType":"uint32","name":"endTime","type":"uint32"}],"name":"createProgram","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"depositAndJoin","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"depositAndJoinPermitted","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"bool","name":"status","type":"bool"}],"name":"enableProgram","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRoleMember","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleMemberCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"isProgramActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"isProgramEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"poolTokenAmount","type":"uint256"}],"name":"join","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"poolTokenAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"joinPermitted","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract Token","name":"pool","type":"address"}],"name":"latestProgramId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"poolTokenAmount","type":"uint256"}],"name":"leave","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"provider","type":"address"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"name":"pendingRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"data","type":"bytes"}],"name":"postUpgrade","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"programIds","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"programRewards","outputs":[{"components":[{"internalType":"uint32","name":"lastUpdateTime","type":"uint32"},{"internalType":"uint256","name":"rewardPerToken","type":"uint256"}],"internalType":"struct Rewards","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"programStake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"name":"programs","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"contract Token","name":"pool","type":"address"},{"internalType":"contract IPoolToken","name":"poolToken","type":"address"},{"internalType":"contract Token","name":"rewardsToken","type":"address"},{"internalType":"bool","name":"isEnabled","type":"bool"},{"internalType":"uint32","name":"startTime","type":"uint32"},{"internalType":"uint32","name":"endTime","type":"uint32"},{"internalType":"uint256","name":"rewardRate","type":"uint256"},{"internalType":"uint256","name":"remainingRewards","type":"uint256"}],"internalType":"struct ProgramData[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"provider","type":"address"}],"name":"providerProgramIds","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"provider","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"providerRewards","outputs":[{"components":[{"internalType":"uint256","name":"rewardPerTokenPaid","type":"uint256"},{"internalType":"uint256","name":"pendingRewards","type":"uint256"},{"internalType":"uint256","name":"reserved0","type":"uint256"},{"internalType":"uint256","name":"stakedAmount","type":"uint256"}],"internalType":"struct ProviderRewards","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"provider","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"providerStake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address[]","name":"providers","type":"address[]"}],"name":"resetProgram","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"roleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"name":"stakeRewards","outputs":[{"components":[{"internalType":"uint256","name":"stakedRewardAmount","type":"uint256"},{"internalType":"uint256","name":"poolTokenAmount","type":"uint256"}],"internalType":"struct StakeAmounts","name":"","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"terminateProgram","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"pure","type":"function"},{"stateMutability":"payable","type":"receive"}]

    const BNT_CHEF = new ethers.Contract(BNT_CHEF_ADDR, BNT_CHEF_ABI, App.provider);
    const rewardTokenAddress = "0x1F573D6Fb3F13d689FF844B4cE37794d79a7FF1C";

    await loadBntContract(App, BNT_CHEF, BNT_CHEF_ADDR, BNT_CHEF_ABI, "BNT", rewardTokenAddress, [0]);

    hideLoading();
  }

async function loadBntContract(App, chef, chefAddress, chefAbi, rewardTokenTicker,
  rewardTokenAddress, deathPoolIndices) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const pools = await chefContract.programIds();
  const poolCount = pools.length;

  _print(`<a href='https://etherscan.io/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} programs.\n`)

  _print(`Showing incentivized pools only.\n`);

  var tokens = {};

  const rewardToken = await getToken(App, rewardTokenAddress, chefAddress);

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) => {
    try {
      return await getBntPoolInfo(App, chefContract, chefAddress, x);
    }
    catch (ex) {
      console.log(`Error loading pool ${x}: ${ex}`);
      return null;
    }
  }));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x?.poolToken).map(x => x.poolToken.tokens));
  tokenAddresses.push(rewardTokenAddress);  //add the address of the reward Token
  tokenAddresses.push("0x1f573d6fb3f13d689ff844b4ce37794d79a7ff1c");  //add the address of the reward Token
  tokenAddresses.push("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2");  //add the eth for the broken token
  var prices = await lookUpTokenPrices(tokenAddresses);

  prices["0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"] = getParameterCaseInsensitive(prices,  "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2");

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
  for (let i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printBntPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        poolInfos[i].rewardsPerWeek, rewardTokenTicker, rewardTokenAddress)
      aprs.push(apr);
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

function printBntPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
                       rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                       fixedDecimals, claimFunction, chain="eth", depositFee=0, withdrawFee=0) {
  fixedDecimals = fixedDecimals ?? 2;
  const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
  var poolRewardsPerWeek = rewardsPerWeek;
  if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
  const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
  const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
  _print_inline(`Program ID : ${poolIndex+1} - `);
  poolPrices.print_price(chain);
  sp?.print_price(chain);
  const apr = printAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
    staked_tvl, userStaked, poolPrices.price, fixedDecimals);
  if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
  printBntContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.poolAddress,
    rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
    poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, claimFunction, rewardPrice, chain, depositFee, withdrawFee);
  return apr;
}

function printBntContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress,
    rewardTokenTicker, stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, fixedDecimals,
    claimFunction, rewardTokenPrice, chain, depositFee, withdrawFee) {
  fixedDecimals = fixedDecimals ?? 2;
  const approveAndStake = async function() {
    return bntContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
  }
  const unstake = async function() {
    return bntContract_unstake(chefAbi, chefAddr, poolIndex, App)
  }
  const claim = async function() {
    return bntContract_claim(chefAbi, chefAddr, poolIndex, App, claimFunction)
  }
  if(poolAddress == "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"){
    _print("Please use the official site for this deposit");
  }else{
    _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
  }
  _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
  _print_link(`Claim ${pendingRewardTokens.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(pendingRewardTokens*rewardTokenPrice)})`, claim)
  _print("");
}

const bntContract_stake = async function(chefAbi, chefAddress, poolIndex, poolTokenAddr, App) {
  const signer = App.provider.getSigner()

  const STAKING_TOKEN = new ethers.Contract(poolTokenAddr, ERC20_ABI, signer)
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
          CHEF_CONTRACT.depositAndJoin(poolIndex+1, currentTokens, {gasLimit: 500000})
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

const bntContract_unstake = async function(chefAbi, chefAddress, poolIndex, App) {
  const signer = App.provider.getSigner()
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  const currentStakedAmount = await CHEF_CONTRACT.providerStake(App.YOUR_ADDRESS, poolIndex+1) / 10 ** poolToken.decimals;

  if (currentStakedAmount / 1e18 > 0) {
    showLoading()
    CHEF_CONTRACT.leave(poolIndex+1, currentStakedAmount, {gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const bntContract_claim = async function(chefAbi, chefAddress, poolIndex, App) {
  const signer = App.provider.getSigner()

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  CHEF_CONTRACT.claimRewards([poolIndex+1], {gasLimit: 500000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
}

async function getBntPoolInfo(app, chefContract, chefAddress, poolIndex) {
  const poolInfo = await chefContract.programs([poolIndex+1]);
  const poolToken = await getToken(app, poolInfo[0].poolToken, chefAddress);
  const poolAddress = poolInfo[0].pool;
  //poolToken.staked = await chefContract.programStake(poolIndex+1) / 10 ** poolToken.decimals;
  const pendingRewardTokens = await chefContract.pendingRewards(app.YOUR_ADDRESS, [poolIndex+1])
  const staked = await chefContract.providerStake(app.YOUR_ADDRESS, poolIndex+1) / 10 ** poolToken.decimals;
  const rewardsPerWeek = poolInfo[0].rewardRate / 1e18 * 604800;
  return {
      address: poolInfo[0].poolToken,
      poolToken: poolToken,
      userStaked : staked,
      rewardsPerWeek : rewardsPerWeek,
      pendingRewardTokens : pendingRewardTokens / 10 ** 18,
      poolAddress : poolAddress
  };
}