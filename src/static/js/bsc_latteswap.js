
$(function() {
  consoleInit(main)
    });
  
  const LATTE_CHEF_ABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"stakeToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalAllocPoint","type":"uint256"}],"name":"AddPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"stakeToken","type":"address"},{"indexed":true,"internalType":"address","name":"caller","type":"address"}],"name":"AddStakeTokenCallerContract","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"bonusMultiplier","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bonusEndBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bonusLockUpBps","type":"uint256"}],"name":"BonusChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"funder","type":"address"},{"indexed":true,"internalType":"address","name":"fundee","type":"address"},{"indexed":true,"internalType":"address","name":"stakeToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"stakeToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"caller","type":"address"},{"indexed":true,"internalType":"address","name":"beneficiary","type":"address"},{"indexed":true,"internalType":"address","name":"stakeToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Harvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Migrate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"stakeToken","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"MintExtraReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"pool","type":"address"},{"indexed":false,"internalType":"uint256","name":"allocBps","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"}],"name":"PoolAllocChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"stakeToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalAllocPoint","type":"uint256"}],"name":"RemovePool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"stakeToken","type":"address"},{"indexed":true,"internalType":"address","name":"caller","type":"address"}],"name":"RemoveStakeTokenCallerContract","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"prevLattePerBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"currentLattePerBlock","type":"uint256"}],"name":"SetLattePerBlock","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"stakeToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalAllocPoint","type":"uint256"}],"name":"SetPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"stakeToken","type":"address"},{"indexed":false,"internalType":"bool","name":"isAllowed","type":"bool"}],"name":"SetStakeTokenCallerAllowancePool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"funder","type":"address"},{"indexed":true,"internalType":"address","name":"fundee","type":"address"},{"indexed":true,"internalType":"address","name":"stakeToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"activeBean","outputs":[{"internalType":"contract IBeanBag","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"activeLatte","outputs":[{"internalType":"contract ILATTE","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"}],"name":"addPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"address","name":"_caller","type":"address"}],"name":"addStakeTokenCallerContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"bean","outputs":[{"internalType":"contract IBeanBag","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"beanV2","outputs":[{"internalType":"contract IBeanBag","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bonusEndBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bonusLockUpBps","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bonusMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_for","type":"address"},{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_for","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"depositLatte","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_for","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"depositLatteV2","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devAddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"devFeeBps","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_for","type":"address"},{"internalType":"address","name":"_stakeToken","type":"address"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_for","type":"address"},{"internalType":"address[]","name":"_stakeTokens","type":"address[]"}],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_for","type":"address"},{"internalType":"address","name":"_stakeToken","type":"address"}],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ILATTE","name":"_latte","type":"address"},{"internalType":"contract IBeanBag","name":"_bean","type":"address"},{"internalType":"address","name":"_devAddr","type":"address"},{"internalType":"uint256","name":"_lattePerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"latte","outputs":[{"internalType":"contract ILATTE","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lattePerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latteV2","outputs":[{"internalType":"contract ILATTEV2","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ILATTEV2","name":"_latteV2","type":"address"},{"internalType":"contract IBeanBag","name":"_beanV2","type":"address"}],"name":"migrate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_lastRewardBlock","type":"uint256"}],"name":"mintExtraReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingLatte","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"poolInfo","outputs":[{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accLattePerShare","type":"uint256"},{"internalType":"uint256","name":"accLattePerShareTilBonusEnd","type":"uint256"},{"internalType":"uint256","name":"allocBps","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pools","outputs":[{"internalType":"uint256","name":"llSize","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"}],"name":"removePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"address","name":"_caller","type":"address"}],"name":"removeStakeTokenCallerContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_bonusMultiplier","type":"uint256"},{"internalType":"uint256","name":"_bonusEndBlock","type":"uint256"},{"internalType":"uint256","name":"_bonusLockUpBps","type":"uint256"}],"name":"setBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_devAddr","type":"address"}],"name":"setDev","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_lattePerBlock","type":"uint256"}],"name":"setLattePerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"}],"name":"setPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"uint256","name":"_allocBps","type":"uint256"}],"name":"setPoolAllocBps","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"bool","name":"_isAllowed","type":"bool"}],"name":"setStakeTokenCallerAllowancePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakeTokenCallerAllowancePool","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakeTokenCallerContracts","outputs":[{"internalType":"uint256","name":"llSize","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"bonusDebt","type":"uint256"},{"internalType":"address","name":"fundedBy","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_for","type":"address"},{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_for","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawLatte","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_for","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawLatteV2","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  
  const BEAN_CHEF_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"campaignID","type":"uint256"},{"indexed":false,"internalType":"contract IERC20","name":"stakingToken","type":"address"},{"indexed":false,"internalType":"contract IERC20","name":"rewardToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"startBlock","type":"uint256"}],"name":"AddCampaignInfo","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"campaignID","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"phase","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"endBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardPerBlock","type":"uint256"}],"name":"AddRewardInfo","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"campaign","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beneficiary","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"campaign","type":"uint256"}],"name":"EmergencyRewardWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"campaign","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"rewardHolder","type":"address"}],"name":"SetRewardHolder","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"rewardInfoLimit","type":"uint256"}],"name":"SetRewardInfoLimit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"campaign","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"contract IERC20","name":"_stakingToken","type":"address"},{"internalType":"contract IERC20","name":"_rewardToken","type":"address"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"name":"addCampaignInfo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_campaignID","type":"uint256"},{"internalType":"uint256","name":"_endBlock","type":"uint256"},{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"}],"name":"addRewardInfo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"campaignInfo","outputs":[{"internalType":"contract IERC20","name":"stakingToken","type":"address"},{"internalType":"contract IERC20","name":"rewardToken","type":"address"},{"internalType":"uint256","name":"startBlock","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accRewardPerShare","type":"uint256"},{"internalType":"uint256","name":"totalStaked","type":"uint256"},{"internalType":"uint256","name":"totalRewards","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"campaignInfoLen","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"campaignRewardInfo","outputs":[{"internalType":"uint256","name":"endBlock","type":"uint256"},{"internalType":"uint256","name":"rewardPerBlock","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_campaignID","type":"uint256"}],"name":"currentEndBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_campaignID","type":"uint256"}],"name":"currentRewardPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_campaignID","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_campaignID","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_beneficiary","type":"address"}],"name":"emergencyRewardWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_campaignID","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"},{"internalType":"uint256","name":"_endBlock","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_campaignIDs","type":"uint256[]"}],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardHolder","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"massUpdateCampaigns","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_campaignID","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardHolder","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_campaignID","type":"uint256"}],"name":"rewardInfoLen","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardInfoLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardHolder","type":"address"}],"name":"setRewardHolder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_updatedRewardInfoLimit","type":"uint256"}],"name":"setRewardInfoLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_campaignID","type":"uint256"}],"name":"updateCampaign","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_campaignID","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  
  async function main() {
      const App = await init_ethers();
  
      _print(`Initialized ${App.YOUR_ADDRESS}\n`);
      _print("Reading smart contracts...\n");
  
     const LATTE_CHEF_ADDR = "0xbCeE0d15a4402C9Cc894D52cc5E9982F60C463d6";
     const BEAN_CHEF_ADDR = "0xF4Bb273761E8AFB98E9628D68C5816687150a867";
     const rewardTokenTicker = "LATTE";
     const LATTE_CHEF = new ethers.Contract(LATTE_CHEF_ADDR, LATTE_CHEF_ABI, App.provider);
     const BEAN_CHEF = new ethers.Contract(BEAN_CHEF_ADDR, BEAN_CHEF_ABI, App.provider);
  
     const multiplier = await LATTE_CHEF.bonusMultiplier();
  
     const rewardsPerWeek = await LATTE_CHEF.lattePerBlock() /1e18
          * 604800 * multiplier / 3;
  
      const tokens = {};
      const prices = await getBscPrices();
  
      //missing the flat-busd pool
      const stakingTokens = ["0x1524C3380257eF5D556AFeB6056c35DeFA9db8b6",  //LATTE-BUSD
                             "0x318b894003d0eacfedaa41b8c70ed3ce1fde1450",  //BUSD-USDT
                             "0xbd4284d34b9673fc79aab2c0080c5a19b4282425",  //BTCB-BUSD
                             "0x79666a68ee70c36d5f865e59afd3b2fbdad41a0c",  //BTCB-BNB
                             "0xa82a0b7bacf3fde41802b1ec32065e518958c715",  //PCS LATTE-BUSD
                             "0x1fec7039304a237a8402214488fbfb0f777c08e6",  //BNB-BUSD
                             "0x3dcb13386e0a5353e0b2e5b53858be6ffb888bb5",  //BTCB-ETH
                             "0xee4341dc1a64720c9e7ae776daebf6ec5367a9f0",  //USDC-BUSD
                             "0x937f273568428d7dcacc2fb43330a70d330b641d",  //ETH-BUSD
                             "0xcff09b973f21489d76a9396b1505eab04766d58c",  //ETH-BNB
                             "0xf29df34748694f53e6c7bd1fb159659164cc3e27",  //LUCKY-BUSD
                             "0xa4d38dd8050ac66e4f0101bad1ac62b3995bdafc",  //XBN-BUSD
                             "0x225170b4308ee84627ee29296d014908bab56313",  //KSW-BUSD
                             "0x5Eab4C59a4CabDD93237F55Eb2d89A42f8A5e2b8",  //SCZ-BUSD
                             "0xda2c54de8fbce8a48e6bbe3b4088923b483eebe1",  //SMOY-BUSD
                             "0x3461ab63e417f49c25bb37f372b2fc731e6ae6bc",  //COUPON-BNB
                             "0x0efa34E1ed6184ECfdC739f6dDFB3890fe5e8054",  //CZF-BUSD
                             "0x24734c67cb3a9812772bf289d7898b90ee2859fb",] //DEP-BNB
  
      await loadLatteswapContract(App, tokens, prices, LATTE_CHEF, LATTE_CHEF_ADDR, LATTE_CHEF_ABI, rewardTokenTicker,
          "latteV2", null, rewardsPerWeek, "pendingLatte", stakingTokens);
  
      _print("")
  
      await loadBeanChefContract(App, tokens, prices, BEAN_CHEF, BEAN_CHEF_ADDR, BEAN_CHEF_ABI, "pendingReward");
  
      hideLoading();
    }
  
  async function getBeanPoolInfo(App, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
    const poolInfo = await chefContract.campaignInfo(poolIndex);
    const rewardTokenAddress = poolInfo.rewardToken
    const rewardToken = await getBscToken(App, rewardTokenAddress, chefAddress);
    const rewardInfo = await chefContract.campaignRewardInfo(poolIndex, 0);
    const currentBlock = await App.provider.getBlockNumber();
    const multiplier = await chefContract.getMultiplier(currentBlock, currentBlock + 1, rewardInfo.endBlock);
    const rewardsPerWeek = rewardInfo.rewardPerBlock / 10 ** rewardToken.decimals
      * 604800 * multiplier / 3;
    if (rewardsPerWeek <= 0) {
      return {
        address: poolInfo.stakingToken,
        poolToken: null,
        userStaked : 0,
        pendingRewardTokens : 0,
        stakedToken : null,
        userLPStaked : 0,
      };
    }
    const rewardTokenTicker = rewardToken.symbol;
    const poolToken = await getBscToken(App, poolInfo.stakingToken, chefAddress);
    const userInfo = await chefContract.userInfo(poolIndex, App.YOUR_ADDRESS);
    const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS);
    const staked = userInfo.amount / 10 ** poolToken.decimals;
    return {
        address: poolInfo.stakingToken,
        allocPoints: poolInfo.allocPoint ?? 1,
        poolToken: poolToken,
        userStaked : staked,
        pendingRewardTokens : pendingRewardTokens / 10 ** 18,
        rewardsPerWeek : rewardsPerWeek,
        rewardTokenTicker : rewardTokenTicker,
        rewardTokenAddress : rewardTokenAddress
    };
  }
  
  async function loadBeanChefContract(App, tokens, prices, chef, chefAddress, chefAbi, pendingRewardsFunction) {
    const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);
  
    const poolCount = parseInt(await chefContract.campaignInfoLen(), 10);
  
    _print(`<a href='https://bscscan.com/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
    _print(`Found ${poolCount} pools.\n`)
  
    _print(`Showing incentivized pools only.\n`);
  
    const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
      await getBeanPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));
  
    var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));
  
    await Promise.all(tokenAddresses.map(async (address) => {
        tokens[address] = await getBscToken(App, address, chefAddress);
    }));
  
    const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "bsc") : undefined);
  
  
    _print("Finished reading smart contracts.\n");
  
    let aprs = []
    for (i = 0; i < poolCount; i++) {
      if (poolPrices[i]) {
        const apr = printBeanChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
          poolInfos[i].rewardsPerWeek, poolInfos[i].rewardTokenTicker, poolInfos[i].rewardTokenAddress,
          pendingRewardsFunction, null, null, "bsc")
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
  
  function printBeanChefPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
                         rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                         pendingRewardsFunction, fixedDecimals, claimFunction, chain="eth") {
    fixedDecimals = fixedDecimals ?? 2;
    const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
    var poolRewardsPerWeek = rewardsPerWeek;
    if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
    const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
    const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
    const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
    _print_inline(`${poolIndex} - `);
    poolPrices.print_price(chain);
    sp?.print_price(chain);
    const apr = printAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
      staked_tvl, userStaked, poolPrices.price, fixedDecimals);
    if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
    if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
    printChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
      rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
      poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, claimFunction, rewardPrice, chain, null, null);
    return apr;
  }
  
  async function getLatteswapPoolInfo(App, chefContract, chefAddress, stakingToken, pendingRewardsFunction) {
    const poolInfo = await chefContract.poolInfo(stakingToken);
    if (poolInfo.allocPoint == 0) {
      return {
        address: stakingToken,
        allocPoints: poolInfo.allocPoint ?? 1,
        poolToken: null,
        userStaked : 0,
        pendingRewardTokens : 0,
        stakedToken : null,
        userLPStaked : 0,
        lastRewardBlock : poolInfo.lastRewardBlock
      };
    }
    const poolToken = await getBscToken(App, stakingToken, chefAddress);
    const userInfo = await chefContract.userInfo(stakingToken, App.YOUR_ADDRESS);
    const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](stakingToken, App.YOUR_ADDRESS);
    const staked = userInfo.amount / 10 ** poolToken.decimals;
    return {
        address: stakingToken,
        allocPoints: poolInfo.allocPoint ?? 1,
        poolToken: poolToken,
        userStaked : staked,
        pendingRewardTokens : pendingRewardTokens / 10 ** 18,
        depositFee : (poolInfo.depositFeeBP ?? 0) / 100,
        withdrawFee : (poolInfo.withdrawFeeBP ?? 0) / 100
    };
  }
  
  async function loadLatteswapContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
    rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction, stakingTokens) {
    const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);
  
    const poolCount = stakingTokens.length;
    const totalAllocPoints = await chefContract.totalAllocPoint();
  
    _print(`<a href='https://bscscan.com/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
    _print(`Found ${poolCount} pools.\n`)
  
    _print(`Showing incentivized pools only.\n`);
  
    const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
    const rewardToken = await getBscToken(App, rewardTokenAddress, chefAddress);
    const rewardsPerWeek = rewardsPerWeekFixed ??
      await chefContract.callStatic[rewardsPerBlockFunction]()
      / 10 ** rewardToken.decimals * 604800 / 3
  
    const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
      await getLatteswapPoolInfo(App, chefContract, chefAddress, stakingTokens[x], pendingRewardsFunction)));
  
    var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));
  
    await Promise.all(tokenAddresses.map(async (address) => {
        tokens[address] = await getBscToken(App, address, chefAddress);
    }));
  
    const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "bsc") : undefined);
    _print("Finished reading smart contracts.\n");
  
    let aprs = []
    for (i = 0; i < poolCount; i++) {
      if (poolPrices[i]) {
        const apr = printLatteswapPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], stakingTokens[i], poolPrices[i],
          totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
          pendingRewardsFunction, null, null, "bsc", poolInfos[i].depositFee, poolInfos[i].withdrawFee)
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
  
  function printLatteswapPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, stakingToken, poolPrices,
                         totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                         pendingRewardsFunction, fixedDecimals, claimFunction, chain="eth", depositFee=0, withdrawFee=0) {
    fixedDecimals = fixedDecimals ?? 2;
    const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
    var poolRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek;
    if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
    const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
    const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
    const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
    poolPrices.print_price(chain);
    sp?.print_price(chain);
    const apr = printAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
      staked_tvl, userStaked, poolPrices.price, fixedDecimals);
    if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
    if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
    printLatteswapContractLinks(App, chefAbi, chefAddr, stakingToken, poolInfo.address, pendingRewardsFunction,
      rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
      poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, claimFunction, rewardPrice, chain, depositFee, withdrawFee);
    return apr;
  }
  
  function printLatteswapContractLinks(App, chefAbi, chefAddr, stakingToken, poolAddress, pendingRewardsFunction,
      rewardTokenTicker, stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, fixedDecimals,
      claimFunction, rewardTokenPrice, chain, depositFee, withdrawFee) {
    fixedDecimals = fixedDecimals ?? 2;
    const approveAndStake = async function() {
      return latteswapContract_stake(chefAbi, chefAddr, stakingToken, poolAddress, App)
    }
    const unstake = async function() {
      return latteswapContract_unstake(chefAbi, chefAddr, stakingToken, App, pendingRewardsFunction)
    }
    const claim = async function() {
      return latteswapContract_claim(chefAbi, chefAddr, stakingToken, App, pendingRewardsFunction, claimFunction)
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
  
  const latteswapContract_stake = async function(chefAbi, chefAddress, stakingToken, stakeTokenAddr, App) {
    const signer = App.provider.getSigner()
  
    const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
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
            CHEF_CONTRACT.deposit(App.YOUR_ADDRESS, stakingToken, currentTokens, {gasLimit: 500000})
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
  
  const latteswapContract_unstake = async function(chefAbi, chefAddress, stakingToken, App, pendingRewardsFunction) {
    const signer = App.provider.getSigner()
    const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  
    const currentStakedAmount = (await CHEF_CONTRACT.userInfo(stakingToken, App.YOUR_ADDRESS)).amount
  
    if (currentStakedAmount / 1e18 > 0) {
      showLoading()
      CHEF_CONTRACT.withdraw(App.YOUR_ADDRESS, stakingToken, currentStakedAmount, {gasLimit: 500000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }
  }
  
  const latteswapContract_claim = async function(chefAbi, chefAddress, stakingToken, App,
      pendingRewardsFunction, claimFunction) {
    const signer = App.provider.getSigner()
  
    const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  
    const earnedTokenAmount = await CHEF_CONTRACT.callStatic[pendingRewardsFunction](stakingToken, App.YOUR_ADDRESS) / 1e18
  
    if (earnedTokenAmount > 0) {
      showLoading()
      CHEF_CONTRACT.harvest(App.YOUR_ADDRESS, stakingToken, {gasLimit: 500000})
          .then(function(t) {
            return App.provider.waitForTransaction(t.hash)
          })
          .catch(function() {
            hideLoading()
          })
    }
  }