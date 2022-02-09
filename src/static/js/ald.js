$(function() {
  consoleInit(main)
    });
  
    const xALD_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"share","type":"uint256"}],"name":"BurnShare","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"share","type":"uint256"}],"name":"MintShare","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"epoch","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"profit","type":"uint256"}],"name":"Rebase","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_sharesAmount","type":"uint256"}],"name":"getALDByShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_aldAmount","type":"uint256"}],"name":"getSharesByALD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_staking","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"epoch","type":"uint256"},{"internalType":"uint256","name":"profit","type":"uint256"}],"name":"rebase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"sharesOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_aldAmount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"staking","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"totalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_sender","type":"address"},{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"uint256","name":"_xALDAmount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    const ALD_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"governance","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isMinter","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_governance","type":"address"}],"name":"setGovernance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_minter","type":"address"},{"internalType":"bool","name":"_status","type":"bool"}],"name":"setMinter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]
    const xALD_STAKING_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"aldAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"wxALDAmount","type":"uint256"}],"name":"Bond","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"caller","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"vault","type":"address"},{"indexed":false,"internalType":"uint256","name":"aldAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"wxALDAmount","type":"uint256"}],"name":"RewardBond","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"caller","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Stake","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"caller","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Unstake","type":"event"},{"inputs":[],"name":"ALD","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"blacklist","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"bondFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"bondLockingPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"defaultLockingPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"directBondDepositor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"distributor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"enableWhitelist","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"fullyVestedBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"governor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_ALD","type":"address"},{"internalType":"address","name":"_xALD","type":"address"},{"internalType":"address","name":"_wxALD","type":"address"},{"internalType":"address","name":"_rewardBondDepositor","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isWhitelist","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lockingPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"pendingBondXALD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"pendingStakedXALD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"pendingXALD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"address","name":"_vault","type":"address"}],"name":"pendingXALDByVault","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rebase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"bool","name":"__unstake","type":"bool"}],"name":"redeem","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_vault","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"rewardBond","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardBondDepositor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardBondLocks","outputs":[{"internalType":"uint32","name":"lockedBlock","type":"uint32"},{"internalType":"uint32","name":"unlockBlock","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakeAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"stakeFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"unlockedBondXALD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"unlockedStakedXALD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"unlockedXALD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"address","name":"_vault","type":"address"}],"name":"unlockedXALDByVault","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"}],"name":"unstakeAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_users","type":"address[]"},{"internalType":"bool","name":"status","type":"bool"}],"name":"updateBlacklist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_bondLockingPeriod","type":"uint256"}],"name":"updateBongLockingPeriod","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_defaultLockingPeriod","type":"uint256"}],"name":"updateDefaultLockingPeriod","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_directBondDepositor","type":"address"}],"name":"updateDirectBondDepositor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_distributor","type":"address"}],"name":"updateDistributor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_enableWhitelist","type":"bool"}],"name":"updateEnableWhitelist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_governor","type":"address"}],"name":"updateGovernor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_users","type":"address[]"},{"internalType":"uint256[]","name":"_periods","type":"uint256[]"}],"name":"updateLockingPeriod","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_paused","type":"bool"}],"name":"updatePaused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_users","type":"address[]"},{"internalType":"bool","name":"status","type":"bool"}],"name":"updateWhitelist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"wxALD","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"xALD","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]

    async function main() {
      const App = await init_ethers();
  
      _print(`Initialized ${App.YOUR_ADDRESS}\n`);
      _print("Reading smart contracts...\n");
  
      const ALD_CHEF_ADDR = "0xfF4446E9dF1c8281CE1d42610c3bC0342f93E4d7";
      const ALD_CHEF_ABI = [{"inputs":[{"internalType":"contract ALDToken","name":"_ald","type":"address"},{"internalType":"address","name":"_tokenDistributor","type":"address"},{"internalType":"uint256","name":"_aldPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"address","name":"_token","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"ald","outputs":[{"internalType":"contract ALDToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"aldPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingALD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accALDPerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_aldPerBlock","type":"uint256"}],"name":"setALDPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"name":"setStartBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenDistributor","type":"address"}],"name":"setTokenDistributor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenDistributorAllocNume","type":"uint256"}],"name":"setTokenDistributorAllocNume","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenDistributor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenDistributorAllocDenom","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenDistributorAllocNume","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"tokenToPid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"address","name":"_poolToken","type":"address"}],"name":"userBalanceForPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
      const ALD_CHEF = new ethers.Contract(ALD_CHEF_ADDR, ALD_CHEF_ABI, App.provider);
  
      const startBlock = await ALD_CHEF.startBlock();
      const currentBlock = await App.provider.getBlockNumber();
  
      let rewardsPerWeek = 0
      if(currentBlock < startBlock){
       _print(`Rewards start at block <a href="https://etherscan.com/block/countdown/${startBlock}" target="_blank">${startBlock}</a>\n`)
      }else{
       rewardsPerWeek = await ALD_CHEF.aldPerBlock() / 1e18 * 604800 / 13.5 
        * (1 - await ALD_CHEF.tokenDistributorAllocNume() / await ALD_CHEF.tokenDistributorAllocDenom());
      }
  
      let p = await loadAldChefContract(App, ALD_CHEF, ALD_CHEF_ADDR, ALD_CHEF_ABI,
          "ALD", "ald", null, rewardsPerWeek, "pendingALD", null, [5]);
  
      await loadXAld(App, p.prices);
  
      const claimAll = async function() {
        return rewardsAldContract_claimAll(ALD_CHEF_ABI, ALD_CHEF_ADDR, p.totalUserStaked, App)
      }
      if(p.totalUserStaked > 0){
        _print_link(`Claim All`, claimAll);
      }
  
      hideLoading();
    }
  
  async function loadXAld(App, prices){
    const xALD_STAKING_ADDR = "0x71072bd71cc4f83154f1f77b4bd5e2d71bd6aa2c"
    const xALD_STAKING_CONTRACT = new ethers.Contract(xALD_STAKING_ADDR, xALD_STAKING_ABI, App.provider);
    const xALD_ADDR = await xALD_STAKING_CONTRACT.xALD();
    const ALD_ADDR = await xALD_STAKING_CONTRACT.ALD();
    const xALD_CONTRACT = new ethers.Contract(xALD_ADDR, xALD_ABI, App.provider);
    const ALD_CONTRACT = new ethers.Contract(ALD_ADDR, ALD_ABI, App.provider);
    const totalDepositedAlds = await ALD_CONTRACT.balanceOf(xALD_STAKING_ADDR) / 1e18;
    const totalXaldTokens = await xALD_CONTRACT.totalSupply() / 1e18;
    const totalAldTokens = await ALD_CONTRACT.totalSupply() / 1e18;
    const virtualPrice = totalDepositedAlds / totalXaldTokens;
    const aldPrice = getParameterCaseInsensitive(prices, ALD_ADDR).usd;
    const xAldPrice = aldPrice * virtualPrice;
    const rewardTicker = await xALD_CONTRACT.symbol();
    const stakeTicker = await ALD_CONTRACT.symbol();
    const totalOwnedXald = await xALD_CONTRACT.balanceOf(App.YOUR_ADDRESS) / 1e18;
    const totalOwnedAld = totalOwnedXald * virtualPrice;
    const tvl = totalAldTokens * aldPrice
    const totalStakedAldsUsd = totalDepositedAlds * aldPrice;
    const _usersStakedAlds = await xALD_STAKING_CONTRACT.fullyVestedBlock(App.YOUR_ADDRESS)
    const usersStakedAlds = _usersStakedAlds[0] / 1e18;
    const usersStakedAldsUsd = usersStakedAlds * aldPrice;
    const usersEarnings = await xALD_STAKING_CONTRACT.pendingStakedXALD(App.YOUR_ADDRESS) / 1e18;
    const usersEarningsUsd = usersEarnings * xAldPrice;
    _print("")
    _print_bold(`Please use the official site in order to Deposit, Withdraw or Claim`);
    _print(`${stakeTicker} Price: $${toFixed(aldPrice, 2)} Total Supply: ${toFixed(totalAldTokens, 4)}, $${formatMoney(tvl)}`);
    _print(`${rewardTicker} Price: $${toFixed(xAldPrice, 2)}`);
    _print(`There is a total of ${toFixed(totalDepositedAlds, 2)}, $(${formatMoney(totalStakedAldsUsd)}) ALD staked`);
    _print(`You are staking a total of ${usersStakedAlds.toFixed(2)} ${stakeTicker}, $${formatMoney(usersStakedAldsUsd)}`);
    _print(`You have ${totalOwnedAld.toFixed(2)} ${stakeTicker} to stake`);
    _print(`Earnings: ${usersEarnings}, $${formatMoney(usersEarningsUsd)}`);
  }
  
  async function loadAldChefContract(App, chef, chefAddress, chefAbi, rewardTokenTicker,
      rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
      extraPrices, deathPoolIndices, showAll) {
    const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);
  
    const poolCount = parseInt(await chefContract.poolLength(), 10);
    const totalAllocPoints = await chefContract.totalAllocPoint();
  
    _print(`<a href='https://etherscan.io/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
    _print(`Found ${poolCount} pools.\n`)
  
    _print(`Showing incentivized pools only.\n`);
  
    var tokens = {};
  
    const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
    const rewardToken = await getToken(App, rewardTokenAddress, chefAddress);
    const rewardsPerWeek = rewardsPerWeekFixed ??
      await chefContract.callStatic[rewardsPerBlockFunction]()
      / 10 ** rewardToken.decimals * 604800 / 13.5
  
    const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) => {
      try {
        return await getAldInfo(App, chefContract, chefAddress, x, pendingRewardsFunction, showAll);
      }
      catch (ex) {
        console.log(`Error loading pool ${x}: ${ex}`);
        return null;
      }
    }));
  
    var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x?.poolToken).map(x => x.poolToken.tokens));
    tokenAddresses.concat(["0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"]);
    var prices = await lookUpTokenPrices(tokenAddresses);
    if (extraPrices) {
      for (const [k,v] of Object.entries(extraPrices)) {
        if (v.usd) {
          prices[k] = v
        }
      }
    }
  
    prices["0xA3D87FffcE63B53E0d54fAa1cc983B7eB0b74A9c"] = getParameterCaseInsensitive(prices, "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2");
  
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
        const apr = printAldChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
          totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
          pendingRewardsFunction)
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
  
  async function getAldInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction, showAll=false) {
    const poolInfo = await chefContract.poolInfo(poolIndex);
    if (poolInfo.allocPoint == 0 && !showAll) {
      return {
        address: poolInfo.token,
        allocPoints: poolInfo.allocPoint ?? 1,
        poolToken: null,
        userStaked : 0,
        pendingRewardTokens : 0,
        stakedToken : null,
        userLPStaked : 0,
        lastRewardBlock : poolInfo.lastRewardBlock
      };
    }
    const poolToken = await getToken(app, poolInfo.token, chefAddress);
    const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolInfo.token, app.YOUR_ADDRESS);
    const staked = await chefContract.userBalanceForPool(app.YOUR_ADDRESS, poolInfo.token) / 10 ** poolToken.decimals;
    var stakedToken;
    var userLPStaked;
    if (poolInfo.stakedHoldableToken != null &&
      poolInfo.stakedHoldableToken != "0x0000000000000000000000000000000000000000") {
      stakedToken = await getToken(app, poolInfo.stakedHoldableToken, chefAddress);
      userLPStaked = userInfo.stakedLPAmount / 10 ** poolToken.decimals
    }
    return {
        address: poolInfo.token,
        allocPoints: poolInfo.allocPoint ?? 1,
        poolToken: poolToken,
        userStaked : staked,
        pendingRewardTokens : pendingRewardTokens / 10 ** 18,
        stakedToken : stakedToken,
        userLPStaked : userLPStaked,
        lastRewardBlock : poolInfo.lastRewardBlock
    };
  }
  
  function printAldChefPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
                         totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                         pendingRewardsFunction, fixedDecimals, claimFunction, chain="eth", depositFee=0, withdrawFee=0) {
    fixedDecimals = fixedDecimals ?? 2;
    const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
    var poolRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek;
    if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
    const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
    const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
    const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
    _print_inline(`${poolIndex} - `);
    poolPrices.print_price(chain);
    sp?.print_price(chain);
    const apr = printAldAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
      staked_tvl, userStaked, poolPrices.price, fixedDecimals);
    if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
    if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
    printAldChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
      rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
      poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, claimFunction, rewardPrice, chain, depositFee, withdrawFee);
    return apr;
  }
  
  function printAldAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek,
                    stakeTokenTicker, staked_tvl, userStaked, poolTokenPrice,
                    fixedDecimals) {
    var usdPerWeek = poolRewardsPerWeek * rewardPrice;
    fixedDecimals = fixedDecimals ?? 2;
    _print(`${rewardTokenTicker} Per Week: ${poolRewardsPerWeek.toFixed(fixedDecimals)} ($${formatMoney(usdPerWeek)})`);
    var weeklyAPR = usdPerWeek / staked_tvl * 100;
    var dailyAPR = weeklyAPR / 7;
    var yearlyAPR = weeklyAPR * 52;
    _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
    var userStakedUsd = userStaked * poolTokenPrice;
    var userStakedPct = userStakedUsd / staked_tvl * 100;
    _print(`You are staking ${userStaked.toFixed(8)} ${stakeTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
    var userWeeklyRewards = userStakedPct * poolRewardsPerWeek / 100;
    var userDailyRewards = userWeeklyRewards / 7;
    var userYearlyRewards = userWeeklyRewards * 52;
    if (userStaked > 0) {
      _print(`Estimated ${rewardTokenTicker} earnings:`
          + ` Day ${userDailyRewards.toFixed(fixedDecimals)} ($${formatMoney(userDailyRewards*rewardPrice)})`
          + ` Week ${userWeeklyRewards.toFixed(fixedDecimals)} ($${formatMoney(userWeeklyRewards*rewardPrice)})`
          + ` Year ${userYearlyRewards.toFixed(fixedDecimals)} ($${formatMoney(userYearlyRewards*rewardPrice)})`);
    }
    return {
      userStakedUsd,
      totalStakedUsd : staked_tvl,
      userStakedPct,
      yearlyAPR,
      userYearlyUsd : userYearlyRewards * rewardPrice
    }
  }
  
  function printAldChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, pendingRewardsFunction,
      rewardTokenTicker, stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, fixedDecimals,
      claimFunction, rewardTokenPrice, chain, depositFee, withdrawFee) {
    fixedDecimals = fixedDecimals ?? 2;
    const approveAndStake = async function() {
      return chefAldContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
    }
    const unstake = async function() {
      return chefAldContract_unstake(chefAbi, chefAddr, poolAddress, App, pendingRewardsFunction)
    }
    const claim = async function() {
      return chefAldContract_claim(chefAbi, chefAddr, poolAddress, App, pendingRewardsFunction, claimFunction)
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
  
  const chefAldContract_stake = async function(chefAbi, chefAddress, poolIndex, stakeTokenAddr, App) {
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
            CHEF_CONTRACT.deposit(stakeTokenAddr, currentTokens, {gasLimit: 500000})
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
  
  const chefAldContract_unstake = async function(chefAbi, chefAddress, poolAddress, App, pendingRewardsFunction) {
    const signer = App.provider.getSigner()
    const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  
    const currentStakedAmount = await CHEF_CONTRACT.userBalanceForPool(app.YOUR_ADDRESS, poolAddress);
    const earnedTokenAmount = await CHEF_CONTRACT.callStatic[pendingRewardsFunction](poolAddress, App.YOUR_ADDRESS) / 1e18
  
    if (earnedTokenAmount > 0) {
      showLoading()
      CHEF_CONTRACT.withdraw(poolAddress, currentStakedAmount, {gasLimit: 500000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }
  }
  
  const rewardsAldContract_claimAll = async function(chefAbi, chefAddress, userStaked, App) {
    const signer = App.provider.getSigner()
    const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  
    if (userStaked > 0) {
      showLoading()
      CHEF_CONTRACT.claimAll({gasLimit: 500000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }
  }
  
  const chefAldContract_claim = async function(chefAbi, chefAddress, poolAddress, App,
      pendingRewardsFunction, claimFunction) {
    const signer = App.provider.getSigner()
  
    const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  
    const earnedTokenAmount = await CHEF_CONTRACT.callStatic[pendingRewardsFunction](poolAddress, App.YOUR_ADDRESS) / 1e18
  
    if (earnedTokenAmount > 0) {
      showLoading()
      if (claimFunction) {
        claimFunction(poolAddress, {gasLimit: 500000})
          .then(function(t) {
            return App.provider.waitForTransaction(t.hash)
          })
      }
      else {
        CHEF_CONTRACT.deposit(poolAddress, 0, {gasLimit: 500000})
          .then(function(t) {
            return App.provider.waitForTransaction(t.hash)
          })
          .catch(function() {
            hideLoading()
          })
      }
    }
  }