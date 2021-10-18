
$(function() {
  consoleInit(main)
  });
  
  const UBE_STAKING_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_owner","internalType":"address"},{"type":"address","name":"_rewardsDistribution","internalType":"address"},{"type":"address","name":"_rewardsToken","internalType":"address"},{"type":"address","name":"_stakingToken","internalType":"address"}]},{"type":"event","name":"OwnerChanged","inputs":[{"type":"address","name":"oldOwner","internalType":"address","indexed":false},{"type":"address","name":"newOwner","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"OwnerNominated","inputs":[{"type":"address","name":"newOwner","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"Recovered","inputs":[{"type":"address","name":"token","internalType":"address","indexed":false},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardAdded","inputs":[{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardPaid","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardsDurationUpdated","inputs":[{"type":"uint256","name":"newDuration","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Staked","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Withdrawn","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"acceptOwnership","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"earned","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"exit","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"getReward","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getRewardForDuration","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastTimeRewardApplicable","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastUpdateTime","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"nominateNewOwner","inputs":[{"type":"address","name":"_owner","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"nominatedOwner","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"notifyRewardAmount","inputs":[{"type":"uint256","name":"reward","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"periodFinish","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"recoverERC20","inputs":[{"type":"address","name":"tokenAddress","internalType":"address"},{"type":"uint256","name":"tokenAmount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerTokenStored","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardRate","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewards","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"rewardsDistribution","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardsDuration","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"rewardsToken","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setRewardsDistribution","inputs":[{"type":"address","name":"_rewardsDistribution","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setRewardsDuration","inputs":[{"type":"uint256","name":"_rewardsDuration","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"stake","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"stakingToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updatePeriodFinish","inputs":[{"type":"uint256","name":"timestamp","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"userRewardPerTokenPaid","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]}]
  const UBE_MULTI_REWARDS_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_owner","internalType":"address"},{"type":"address","name":"_rewardsDistribution","internalType":"address"},{"type":"address","name":"_rewardsToken","internalType":"contract IERC20"},{"type":"address","name":"_externalStakingRewards","internalType":"contract IStakingRewards"},{"type":"address[]","name":"_externalRewardsTokens","internalType":"contract IERC20[]"}]},{"type":"event","name":"ExternalRewardPaid","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"OwnerChanged","inputs":[{"type":"address","name":"oldOwner","internalType":"address","indexed":false},{"type":"address","name":"newOwner","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"OwnerNominated","inputs":[{"type":"address","name":"newOwner","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"Recovered","inputs":[{"type":"address","name":"token","internalType":"address","indexed":false},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardAdded","inputs":[{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardPaid","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardsDurationUpdated","inputs":[{"type":"uint256","name":"newDuration","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Staked","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Withdrawn","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"acceptOwnership","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"earned","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256[]","name":"result","internalType":"uint256[]"}],"name":"earnedExternal","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"exit","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"externalRewards","inputs":[{"type":"address","name":"","internalType":"address"},{"type":"address","name":"","internalType":"contract IERC20"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"externalRewardsTokens","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IStakingRewards"}],"name":"externalStakingRewards","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"getReward","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getRewardForDuration","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastTimeRewardApplicable","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastUpdateTime","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"nominateNewOwner","inputs":[{"type":"address","name":"_owner","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"nominatedOwner","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"notifyRewardAmount","inputs":[{"type":"uint256","name":"reward","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"periodFinish","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"recoverERC20","inputs":[{"type":"address","name":"tokenAddress","internalType":"address"},{"type":"uint256","name":"tokenAmount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerTokenStored","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardRate","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewards","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"rewardsDistribution","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardsDuration","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"rewardsToken","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setRewardsDistribution","inputs":[{"type":"address","name":"_rewardsDistribution","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setRewardsDuration","inputs":[{"type":"uint256","name":"_rewardsDuration","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"stake","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"stakingToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updatePeriodFinish","inputs":[{"type":"uint256","name":"timestamp","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"userRewardPerTokenPaid","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]}]
  
  const Addresses = [
    "0x295D6f96081fEB1569d9Ce005F7f2710042ec6a1", //UBE-CELO
    "0x76183478939C414801C863222854efcc33791144", //mcUSD-cBTC
    "0x5E37376AEcc2825dfdE04C3981968153c14B669c", //cETH-mcUSD
    "0xC087aEcAC0a4991f9b0e931Ce2aC77a826DDdaf3", //MOO-mCELO
    "0x66bD2eF224318cA5e3A93E165e77fAb6DD986E89", //CELO-mcUSD
    "0xC88B8d622c0322fb59ae4473D7A1798DE60785dD", //POOF-UBE
    "0x9dBfe0aBf21F506525b5bAD0cc467f2FAeBe40a1", //UBE-cMCO2
    "0xd4C9675b0AE1397fC5b2D3356736A02d86347f2d", //sCELO-CELO
    "0xD7D6b5213b9B9DFffbb7ef008b3cF3c677eb2468", //rCELO-CELO
    "0x33F819986FE80A4f4A9032260A24770918511849", //LAPIS-CELO
    "0xD409B7C4F67F5C845c53505b3d3B5aCD44e479AB", //POOF-UBE
    "0x572564B0efEC39Dd325138187F5DD4e75B17251E", //UBE-mcEURLPPool
    "0x342B20b1290a442eFDBEbFD3FE781FE79b3124b7", //UBE-mcUSDLPPool
    "0x66bD2eF224318cA5e3A93E165e77fAb6DD986E89", //mcUSD-CELOLPPool
    "0x08252f2E68826950d31D268DfAE5E691EE8a2426", //mcEUR-CELOLPPool
    "0xaf13437122cd537C5D8942f17787cbDBd787fE94"  //mcEUR-mcUSDLPPool
  ]
  
  const MultiRewardsPools = [
    // mCUSD-mcEUR
    {
      address: '0x2f0ddEAa9DD2A0FB78d41e58AD35373d6A81EbB0',
      underlyingPool: '0xaf13437122cd537C5D8942f17787cbDBd787fE94',
      basePool: '0xaf13437122cd537C5D8942f17787cbDBd787fE94',
      numRewards: 2,
      active: false,
    },
    // MOO-mCELO
    {
      address: '0x84Bb1795b699Bf7a798C0d63e9Aad4c96B0830f4',
      underlyingPool: '0xC087aEcAC0a4991f9b0e931Ce2aC77a826DDdaf3',
      basePool: '0xC087aEcAC0a4991f9b0e931Ce2aC77a826DDdaf3',
      numRewards: 2,
      active: false,
    },
    // mCUSD-mcEUR
    {
      address: '0x3d823f7979bB3af846D8F1a7d98922514eA203fC',
      underlyingPool: '0xb030882bfc44e223fd5e20d8645c961be9b30bb3',
      basePool: '0xaf13437122cd537C5D8942f17787cbDBd787fE94',
      numRewards: 3,
      active: true,
    },
    // MOO-mCELO
    {
      address: '0x3c7beeA32A49D96d72ce45C7DeFb5b287479C2ba',
      underlyingPool: '0x8f309df7527f16dff49065d3338ea3f3c12b5d09',
      basePool: '0xC087aEcAC0a4991f9b0e931Ce2aC77a826DDdaf3',
      numRewards: 3,
      active: true,
    },
    // CELO-MOBI
    {
      address: '0xd930501A0848DC0AA3E301c7B9b8AFE8134D7f5F',
      underlyingPool: '0x19F1A692C77B481C23e9916E3E83Af919eD49765',
      basePool: '0x19F1A692C77B481C23e9916E3E83Af919eD49765',
      numRewards: 2,
      active: true,
    },
    // CELO-mcUSD
    {
      address: '0xbbC8C824c638fd238178a71F5b1E5Ce7e4Ce586B',
      underlyingPool: '0x66bD2eF224318cA5e3A93E165e77fAb6DD986E89',
      basePool: '0x66bD2eF224318cA5e3A93E165e77fAb6DD986E89',
      numRewards: 2,
      active: true,
    },
    // CELO-mcEUR
    {
      address: '0x0F3d01aea89dA0b6AD81712Edb96FA7AF1c17E9B',
      underlyingPool: '0x08252f2E68826950d31D268DfAE5E691EE8a2426',
      basePool: '0x08252f2E68826950d31D268DfAE5E691EE8a2426',
      numRewards: 2,
      active: true,
    },
    // UBE-CELO
    {
      address: '0x9D87c01672A7D02b2Dc0D0eB7A145C7e13793c3B',
      underlyingPool: '0x295D6f96081fEB1569d9Ce005F7f2710042ec6a1',
      basePool: '0x295D6f96081fEB1569d9Ce005F7f2710042ec6a1',
      numRewards: 2,
      active: true,
    },
    // rCELO-CELO
    {
      address: '0x194478Aa91e4D7762c3E51EeE57376ea9ac72761',
      underlyingPool: '0xD7D6b5213b9B9DFffbb7ef008b3cF3c677eb2468',
      basePool: '0xD7D6b5213b9B9DFffbb7ef008b3cF3c677eb2468',
      numRewards: 2,
      active: true,
    }
  ].map(mrp => {
    return {
      address    : mrp.address,
      abi        : UBE_MULTI_REWARDS_ABI,
      numRewards : mrp.numRewards
    }
  })
  
  async function main() {
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
  
    const tokens = {};
    const prices = await getCeloPrices();
  
    const pools = Addresses.map(a => { return {
      address: a,
      abi: UBE_STAKING_ABI,
      stakeTokenFunction: "stakingToken",
      rewardTokenFunction: "rewardsToken"
    }})
  
    _print_bold("Multiple Reward Pools");
    _print("");
    let mrp = await loadMultipleRewardsUbeSynthetixPools(App, tokens, prices, MultiRewardsPools)  
    _print_bold(`Total staked: $${formatMoney(mrp.staked_tvl)}`);
    if (mrp.totalUserStaked > 0) {
      _print(`You are staking a total of $${formatMoney(mrp.totalUserStaked)} at an APR of ${(mrp.totalAPR * 100).toFixed(2)}%\n`);
    }
  
    _print("");
  
    let p = await loadMultipleCeloSynthetixPools(App, tokens, prices, pools)
    _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
    if (p.totalUserStaked > 0) {
      _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
    }
  
    hideLoading();
  }
  
  async function loadMultipleRewardsUbeSynthetixPools(App, tokens, prices, pools) {
    let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
    const infos = await Promise.all(pools.map(p =>
        loadMultipleRewardsUbePoolInfo(App, tokens, prices, p.abi, p.address, p.numRewards)));
    for (const i of infos) {
      let p = await printUbeSynthetixPool(App, i, "celo");
      totalStaked += p.staked_tvl || 0;
      totalUserStaked += p.userStaked || 0;
      if (p.userStaked > 0) {
        individualAPRs.push(p.userStaked * p.apr / 100);
      }
    }
    let totalApr = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
    return { staked_tvl : totalStaked, totalUserStaked, totalApr };
  }
  
  async function loadMultipleRewardsUbePoolInfo(App, tokens, prices, stakingAbi, stakingAddress, rewardsNumber) {
      const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
  
      const stakeTokenAddress = await STAKING_POOL.stakingToken();
      const rewardsNum = rewardsNumber - 1  //you are receiving one address from another function
      const internalRewardTokenAddress = await STAKING_POOL.rewardsToken(); //celo token
  
      let rewardTokenAddresses = []
      for(let i = 0; i < rewardsNum; i++){
        const rewardTokenAddress = await STAKING_POOL.externalRewardsTokens(i); //0 token is UBE, 1 token is MOO
        rewardTokenAddresses.push(rewardTokenAddress);
      }
      rewardTokenAddresses.push(internalRewardTokenAddress);
  
      const stakeToken = await getCeloToken(App, stakeTokenAddress, stakingAddress);
      stakeToken.staked = await STAKING_POOL.totalSupply() / 10 ** stakeToken.decimals;
  
      var newPriceAddresses = stakeToken.tokens.filter(x =>
        !getParameterCaseInsensitive(prices, x));
      var newPrices = await lookUpTokenPrices(newPriceAddresses);
      for (const key in newPrices) {
        if (newPrices[key]?.usd)
            prices[key] = newPrices[key];
      }
      var newTokenAddresses = stakeToken.tokens.filter(x =>
        !getParameterCaseInsensitive(tokens,x));
      for (const address of newTokenAddresses) {
          tokens[address] = await getCeloToken(App, address, stakingAddress);
      }
  
      for(let rewardTokenAddress of rewardTokenAddresses){
        if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
          tokens[rewardTokenAddress] = await getCeloToken(App, rewardTokenAddress, stakingAddress);
        }
      }
  
      let rewardTokens = [];
      for(let rewardTokenAddress of rewardTokenAddresses){
        const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
        rewardTokens.push(rewardToken);
      }
  
      let rewardTokenTickers = [];
      for(let rewardToken of rewardTokens){
        const rewardTokenTicker = rewardToken.symbol;
        rewardTokenTickers.push(rewardTokenTicker);
      }
  
      const poolPrices = getPoolPrices(tokens, prices, stakeToken, "celo");
  
      if (!poolPrices)
      {
        console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
        return null;
      }
  
      const stakeTokenTicker = poolPrices.stakeTokenTicker;
  
      const stakeTokenPrice =
          prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
  
      let rewardTokenPrices = [];
      for(let rewardTokenAddress of rewardTokenAddresses){
        const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
        rewardTokenPrices.push(rewardTokenPrice);
      }
  
      let weeklyRewards = [];
      let usdCoinsPerWeek = [];
  
      let rewardRateA = 0;
      let weeklyRewardA = 0;
      let usdPerWeekA = 0;
  
      if(rewardTokens.length > 2){
        rewardRateA = await STAKING_POOL.rewardRate();
        weeklyRewardA = rewardRateA / 10 ** rewardTokens[2].decimals * 604800;
        usdPerWeekA = weeklyRewardA * rewardTokenPrices[2];
        weeklyRewards.push(weeklyRewardA);
        usdCoinsPerWeek.push(usdPerWeekA);
  
        try{
          const nextRewardAddressB = await STAKING_POOL.externalStakingRewards();
          const nextRewardContractB = new ethers.Contract(nextRewardAddressB, stakingAbi, App.provider);
          const rewardRateB = await nextRewardContractB.rewardRate();
          const weeklyRewardB = rewardRateB / 10 ** rewardTokens[1].decimals * 604800;
          const usdPerWeekB = weeklyRewardB * rewardTokenPrices[1];
          weeklyRewards.push(weeklyRewardB);
          usdCoinsPerWeek.push(usdPerWeekB);
    
          try{
            const nextRewardAddressC = await nextRewardContractB.externalStakingRewards();
            const nextRewardContractC = new ethers.Contract(nextRewardAddressC, stakingAbi, App.provider);
            const rewardRateC = await nextRewardContractC.rewardRate();
            const weeklyRewardC = rewardRateC / 10 ** rewardTokens[0].decimals * 604800;
            const usdPerWeekC = weeklyRewardC * rewardTokenPrices[0];
            weeklyRewards.push(weeklyRewardC);
            usdCoinsPerWeek.push(usdPerWeekC);
          }
          catch(ex){
            console.log("There is no other reward contract");
          }
          
        }catch(ex){
          console.log("There is no other reward contract");
        }
      }else{
        rewardRateA = await STAKING_POOL.rewardRate();
        weeklyRewardA = rewardRateA / 10 ** rewardTokens[1].decimals * 604800;
        usdPerWeekA = weeklyRewardA * rewardTokenPrices[1];
        weeklyRewards.push(weeklyRewardA);
        usdCoinsPerWeek.push(usdPerWeekA);
  
        try{
          const nextRewardAddressB = await STAKING_POOL.externalStakingRewards();
          const nextRewardContractB = new ethers.Contract(nextRewardAddressB, stakingAbi, App.provider);
          const rewardRateB = await nextRewardContractB.rewardRate();
          const weeklyRewardB = rewardRateB / 10 ** rewardTokens[0].decimals * 604800;
          const usdPerWeekB = weeklyRewardB * rewardTokenPrices[0];
          weeklyRewards.push(weeklyRewardB);
          usdCoinsPerWeek.push(usdPerWeekB);        
        }catch(ex){
          console.log("There is no other reward contract");
        }
      }
  
      let earnings = [];
      for(let i = 0; i < 2; i++){
        const earned = await STAKING_POOL.externalRewards(App.YOUR_ADDRESS, rewardTokenAddresses[i]) / 10 ** rewardTokens[i].decimals;
        earnings.push(earned);
      }
      if(rewardTokens.length > 2){
        const earned = await STAKING_POOL.earned(App.YOUR_ADDRESS) / 10 ** rewardTokens[2].decimals;
        earnings.push(earned);
        //usdCoinsPerWeek.swapItems(0, 2);
        rewardTokenTickers.swapItems(0, 2);
      }else{
        //usdCoinsPerWeek.swapItems(0, 1);
        rewardTokenTickers.swapItems(0, 1);
      }
  
      const staked_tvl = poolPrices.staked_tvl;
  
      const userStaked = await STAKING_POOL.balanceOf(App.YOUR_ADDRESS) / 10 ** stakeToken.decimals;
  
      const userUnstaked = stakeToken.unstaked;
  
      return  {
        stakingAddress,
        poolPrices,
        stakeTokenAddress,
        rewardTokenAddresses,
        stakeTokenTicker,
        rewardTokenTickers,
        stakeTokenPrice,
        rewardTokenPrices,
        weeklyRewards,
        usdCoinsPerWeek,
        staked_tvl,
        userStaked,
        userUnstaked,
        earnings
      }
  }
  
  async function printUbeSynthetixPool(App, info, chain="celo", customURLs) {
      info.poolPrices.print_price(chain, 4, customURLs);
      for(let i = 0; i < info.rewardTokenTickers; i++){
        _print(`${info.rewardTokenTickers[i]} Per Week: ${info.weeklyRewards[i].toFixed(2)} ($${formatMoney(info.usdCoinsPerWeek[i])})`);
      }
      let totalYearlyAPR = 0;
      let totalWeeklyAPR = 0;
      let totalDailyAPR = 0;
      let totalusdCoinsPerDay = 0;
      let totalusdCoinsPerWeek = 0;
      let totalusdCoinsPerYear = 0;
      let totalUSDPerWeek = 0;
      for(let i = 0; i < info.rewardTokenTickers.length; i++){
        let weeklyAPR = info.usdCoinsPerWeek[i] / info.staked_tvl * 100;
        let dailyAPR = weeklyAPR / 7;
        yearlyAPR = weeklyAPR * 52;
        totalYearlyAPR += yearlyAPR;
        totalWeeklyAPR += weeklyAPR;
        totalDailyAPR += dailyAPR;
        totalUSDPerWeek += info.usdCoinsPerWeek[i];
        _print(`${info.rewardTokenTickers[i]} Per Week: ${info.weeklyRewards[i].toFixed(2)} ($${formatMoney(info.usdCoinsPerWeek[i])}) APR: Year ${yearlyAPR.toFixed(2)}%`);
      }
      _print(`Total Per Week: $${formatMoney(totalUSDPerWeek)}`);
      _print(`Total APR: Day ${totalDailyAPR.toFixed(4)}% Week ${totalWeeklyAPR.toFixed(2)}% Year ${totalYearlyAPR.toFixed(2)}%`);
      const userStakedUsd = info.userStaked * info.stakeTokenPrice;
      const userStakedPct = userStakedUsd / info.staked_tvl * 100;
      _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
             `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
      if (info.userStaked > 0) {
        info.poolPrices.print_contained_price(info.userStaked);
        for(let i = 0; i < info.rewardTokenTickers.length; i++){
          let userWeeklyRewards = userStakedPct * info.weeklyRewards[i] / 100;
          let userDailyRewards = userWeeklyRewards / 7;
          let userYearlyRewards = userWeeklyRewards * 52;
    
          totalusdCoinsPerDay += userDailyRewards;
          totalusdCoinsPerWeek += userWeeklyRewards;
          totalusdCoinsPerYear += userYearlyRewards;
        }
        _print(`Total Earnings: Day ${totalusdCoinsPerDay.toFixed(4)}% Week ${totalusdCoinsPerWeek.toFixed(2)}% Year ${totalusdCoinsPerYear.toFixed(2)}%`);
      }
      const approveTENDAndStake = async function() {
        return rewardsContract_stake(info.stakeTokenAddress, info.stakingAddress, App)
      }
      const unstake = async function() {
        return rewardsContract_unstake(info.stakingAddress,info.userStakedWei, App)
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
      _print(`<a target="_blank" href="https://explorer.celo.org/address/${info.stakingAddress}/contracts">Celo Explorer</a>`);
      if (info.stakeTokenTicker != "ETH") {
        _print_link(`Stake ${info.userUnstaked.toFixed(6)} ${info.stakeTokenTicker}`, approveTENDAndStake)
      }
      else {
        _print("Please use the official website to stake ETH.");
      }
      _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, unstake)
      if(info.rewardTokenPrices.length > 2){
        _print_link(`Claim ${info.earnings[0].toFixed(6)} ${info.rewardTokenTickers[0]} ($${formatMoney(info.earnings[0]*info.rewardTokenPrices[0])}) + ${info.earnings[1].toFixed(6)} ${info.rewardTokenTickers[1]} ($${formatMoney(info.earnings[1]*info.rewardTokenPrices[1])}) + ${info.earnings[2].toFixed(6)} ${info.rewardTokenTickers[2]} ($${formatMoney(info.earnings[2]*info.rewardTokenPrices[2])})`, claim)
      }else{
        _print_link(`Claim ${info.earnings[0].toFixed(6)} ${info.rewardTokenTickers[0]} ($${formatMoney(info.earnings[0]*info.rewardTokenPrices[0])}) + ${info.earnings[1].toFixed(6)} ${info.rewardTokenTickers[1]} ($${formatMoney(info.earnings[1]*info.rewardTokenPrices[1])})`, claim)
      }
      if (info.stakeTokenTicker != "ETH") {
        _print_link(`Revoke (set approval to 0)`, revoke)
      }
      _print_link(`Exit`, exit)
      _print("");
  
      return {
          staked_tvl: info.poolPrices.staked_tvl,
          userStaked : userStakedUsd,
          apr : yearlyAPR
      }
  }
  
  Array.prototype.swapItems = function(a, b){
    this[a] = this.splice(b, 1, this[a])[0];
    return this;
  }