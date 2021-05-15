$(function() {
consoleInit(main)
  });

  const UNCX_CONTRACT_ABI = [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_farmGenerator","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"contract IFarmFactory","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"farmGenerator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"farmInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"contract IERC20","name":"rewardToken","type":"address"},{"internalType":"uint256","name":"startBlock","type":"uint256"},{"internalType":"uint256","name":"blockReward","type":"uint256"},{"internalType":"uint256","name":"bonusEndBlock","type":"uint256"},{"internalType":"uint256","name":"bonus","type":"uint256"},{"internalType":"uint256","name":"endBlock","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accRewardPerShare","type":"uint256"},{"internalType":"uint256","name":"farmableSupply","type":"uint256"},{"internalType":"uint256","name":"numFarmers","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"farmType","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from_block","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_rewardToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"uint256","name":"_blockReward","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_endBlock","type":"uint256"},{"internalType":"uint256","name":"_bonusEndBlock","type":"uint256"},{"internalType":"uint256","name":"_bonus","type":"uint256"}],"name":"init","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

  async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const Pools = [
      "0x32c51094FB55c2F34Bb129C64CC39F83dC0EBA14",
      "0x8A09Eefa2326b314d404A87c119cf37d722d0a7f",
      "0x92702dcCD53022831edd3FCBfEabbBA31BC29bB6",
      "0xA98c59fE146e351511Fc890598787208D063C8a3",
      "0x3e5E557651213E204Fd9FD99571689c25f31A9bC",
      "0xb8A177d29417ee325953ec388BA2dBD77B02DdF4",
      "0x8F3ba6E63FC058376cfB52b6B973ac4217d088F3",
      "0x6f60fB4a9FEBCba00e363c7140be2FC81C66C432",
      "0xC55C27Fe427282Fc26F0d5B895D52cF5De253758",
      "0xF33EA8472dddc83ac2eFE060352F457E44dCD36D",
      "0x987e6bE23734556C5C9BF50057C40482DcB1b9a9",
      "0x73761807e4846C3312848B1a4a1F5aB77517F821",
      "0x62CA9aE955f4518cDe32700c385C57edB3C1334c",
      "0x0243AB464DFf4968754FC765611b0De1b109f167",
      "0x51ADe0937EA8BB2b4e890fdd8f91f7AAB9af2d22",
      "0x72A725426Bcc0bEFA3567b0d9debaC91Ed816d41",
      "0x4eF15122Ddcd17De0fE19486FbB6452D7914465c",
      "0x378319C0CdC4dCC09800154a47eF9ee7dAE044B8",
      "0x3769B13651e8C1ee022e6Bb493dEfb98972b0609",
      "0xD9a332309E299D95ABD7994F3FA82e8E9CA9d17e",
      "0x325e1f9F0F6CAF37f377Cdb011D19be8Cf58cbF7",
      "0x035fBd62840dD85d712b488AD54a18AB82c0A87e",
      "0x1D00493f5912FaeEe974A8af9c58BdC812254a0b",
      "0xA42730eD85E5f0C3073Ae21b8315569f4A3eA358",
      "0x9ff02b45D66033d03889CA0344d6DBCD67071b0f",
      "0xcbd32d638360E6d73DB5A48976BA997b4C9138AE",
      "0xDb85D7b9225450dfD8aD066D4256FF558e564716",
      "0x4C31C2e681451C21b72a6f7EAaC24556407aea5b",
      "0x95C7679c74478843F576824efe86B1585628e7c4",
      "0x2A37EB4fFf5cbd7C4D6d39B80B7E94e537656A8f",
      "0x172E45E4527484ea184F017898102D5e0E94Dc88",
      "0x49b2E47d2B84564dE70501503B5781CeD548605b",
      "0x2D2c1C78Ad17FD2291b1C075D86641B5634dc3B2",
      "0xf2f53C85dD78CAD4022818aC28EA136A85Bf6Cf4",
      "0x4e47EE44fc1072132a3d98c3f39F7202882AA82c",
      "0xD6A12358C90a8E6Ae99379799C9e17479D170D22",
      "0xcd9cCb2f4d05dC4Bf289237ABb8274b0f523aCf7",
      "0x587a1B927b774a49164921293C38dd926edb1B7a",
      "0x36a971EA445881c42fd936B247c3eDcd6baDC37A",
      "0x86967F8edBE78B778f0ca5211A683B039f96e327",
      "0x4d22b8C3DDa505e4B5209401cFE2249672241f56",
      "0xcFCa36B31F83565FF604524B9c767f50ac49CA9E",
      "0xc7C8D71Cc36e8aaA488E8A7f3F421d0ec5d73190",
      "0x1381cADF926d157486d94055C523D2C1025331A0",
      "0x3C2d3E25d0eb93f44C68D780469b27D0437Ea31A",
      "0x470C4691C3F096c33C109B69ab2d89fC295fb8aA",
      "0x652d3C42A022731983a9c39406F5e3E8B3D1Ef6F",
      "0xaD69A2c1FE50e5F5B3571C9Ae7ed8e03e19Cd7f5",
      "0x3bF1f86b7EA90bb490eeB6f76E6CaeA5E4FE83B1",
      "0xa15AE65Be8aAeF6c6528C579419619068a8113d4",
      "0x191684A26ACC93AA2809482c0f72Dd15c9AE3a49",
      "0x6322C73C62f9f3992D05A5e8Bda2792c4364d63C",
      "0x770c0496bffD1fbE8EC8b5861b5B7f2b8009F117",
      "0xF262dea005EE2ef22d4726f2B60D2139B9F2291b",
      "0x38334a3399E23e330f1017CE2a0D15089c3df71a"
    ].map(a => {
      return {
        address : a,
        abi : UNCX_CONTRACT_ABI
      }
    })

    let tokens = {};
    let prices = {};

    const currentBlockNumber = await App.provider.getBlockNumber();

    await loadMultipleUnicryptPools(App, tokens, prices, Pools, currentBlockNumber);

    hideLoading();
  }

async function loadMultipleUnicryptPools(App, tokens, prices, pools, currentBlockNumber) {
  let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
  const infos = await Promise.all(pools.map(p =>
    loadUnicryptPoolInfo(App, tokens, prices, p.abi, p.address)));
  let tokenAddresses = [].concat.apply([], infos.filter(x => x.stakeToken).map(x => x.stakeToken.tokens));
  let newPrices = await lookUpTokenPrices(tokenAddresses);
  for (const key in newPrices) {
    if (newPrices[key]?.usd)
        prices[key] = newPrices[key];
  }
  const poolPrices = infos.map(poolInfo => poolInfo.stakeToken ? getPoolPrices(tokens, prices, poolInfo.stakeToken) : undefined);
  for (let i = 0; i < infos.length; i++) {
    if(currentBlockNumber < infos[i].endBlockNumber){
      const rewardTokenPrice = getParameterCaseInsensitive(prices, infos[i].rewardTokenAddress)?.usd;
      const usdPerWeek = infos[i].weeklyRewards * rewardTokenPrice;
      const stakeTokenTicker = poolPrices[i].stakeTokenTicker;
      const staked_tvl = poolPrices[i].staked_tvl;
      const stakeTokenPrice = getParameterCaseInsensitive(prices, infos[i].stakeTokenAddress)?.usd;
      let p = await printUnicryptPool(App, infos[i], poolPrices[i], stakeTokenTicker, staked_tvl, stakeTokenPrice, rewardTokenPrice,
        usdPerWeek);
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

async function loadUnicryptPoolInfo(App, tokens, prices, stakingAbi, stakingAddress) {
  const UNCX_CONTRACT = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
  const farmInfos = await UNCX_CONTRACT.farmInfo();
  const bonus = farmInfos.bonus;
  const weeklyRewards = farmInfos.blockReward / 1e18 * 604800 / 13.5 * bonus;
  const stakeTokenAddress = farmInfos.lpToken;
  const rewardTokenAddress = farmInfos.rewardToken;
  const pendingRewards = await UNCX_CONTRACT.pendingReward(App.YOUR_ADDRESS);
  const userInfo = await UNCX_CONTRACT.userInfo(App.YOUR_ADDRESS);

  let stakeToken = await getToken(App, stakeTokenAddress, stakingAddress);

  if (stakeTokenAddress.toLowerCase() === rewardTokenAddress.toLowerCase()) {
    stakeToken.staked = await UNCX_CONTRACT.totalSupply() / 10 ** stakeToken.decimals;
  }

  let newTokenAddresses = stakeToken.tokens.filter(x =>
    !getParameterCaseInsensitive(tokens,x));
  for (const address of newTokenAddresses) {
      tokens[address] = await getToken(App, address, stakingAddress);
  }
  if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
      tokens[rewardTokenAddress] = await getToken(App, rewardTokenAddress, stakingAddress);
  }

  const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);

  const rewardTokenTicker = rewardToken.symbol;

  const userStaked = userInfo.amount / 10 ** stakeToken.decimals;

  const userUnstaked = stakeToken.unstaked;

  const earned = pendingRewards / 10 ** rewardToken.decimals;

  const endBlockNumber = await farmInfos.endBlock * 1;

  return  {
    stakingAddress,
    stakeTokenAddress,
    rewardTokenAddress,
    rewardTokenTicker,
    weeklyRewards,
    userStaked,
    userUnstaked,
    earned,
    endBlockNumber,
    stakeToken
  }
}

async function printUnicryptPool(App, info, poolPrices, stakeTokenTicker, staked_tvl, stakeTokenPrice, rewardTokenPrice,
  usdPerWeek) {
    poolPrices.print_price("eth", 8);
    _print(`${info.rewardTokenTicker} Per Week: ${info.weeklyRewards.toFixed(2)} ($${formatMoney(info.usdPerWeek)})`);
    const weeklyAPR = usdPerWeek / staked_tvl * 100;
    const dailyAPR = weeklyAPR / 7;
    const yearlyAPR = weeklyAPR * 52;
    _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
    const userStakedUsd = info.userStaked * stakeTokenPrice;
    const userStakedPct = userStakedUsd / staked_tvl * 100;
    _print(`You are staking ${info.userStaked.toFixed(8)} ${stakeTokenTicker} ` +
           `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
    if (info.userStaked > 0) {
      info.poolPrices.print_contained_price(info.userStaked);
        const userWeeklyRewards = userStakedPct * info.weeklyRewards / 100;
        const userDailyRewards = userWeeklyRewards / 7;
        const userYearlyRewards = userWeeklyRewards * 52;
        _print(`Estimated ${info.rewardTokenTicker} earnings:`
            + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*rewardTokenPrice)})`
            + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*rewardTokenPrice)})`
            + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*rewardTokenPrice)})`);
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
    if (stakeTokenTicker != "ETH") {
      _print_link(`Stake ${info.userUnstaked.toFixed(8)} ${stakeTokenTicker}`, approveTENDAndStake)
    }
    else {
      _print("Please use the official website to stake ETH.");
    }
    _print_link(`Unstake ${info.userStaked.toFixed(8)} ${stakeTokenTicker}`, unstake)
    _print_link(`Claim ${info.earned.toFixed(8)} ${info.rewardTokenTicker} ($${formatMoney(info.earned*rewardTokenPrice)})`, claim)
    if (stakeTokenTicker != "ETH") {
      _print_link(`Revoke (set approval to 0)`, revoke)
    }
    _print_link(`Exit`, exit)
    _print("");

    return {
        staked_tvl: poolPrices.staked_tvl,
        userStaked : userStakedUsd,
        apr : yearlyAPR
    }
}
