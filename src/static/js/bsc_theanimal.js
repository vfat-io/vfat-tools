
$(function() {
consoleInit(main)
  });

const PIGS_CHEF_ABI = [{"inputs":[{"internalType":"contract PigsToken","name":"_pigsToken","type":"address"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"address","name":"_founder1","type":"address"},{"internalType":"address","name":"_founder2","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"},{"indexed":false,"internalType":"address","name":"lpToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"depositFeeBP","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"harvestInterval","type":"uint256"}],"name":"AddPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"govAddress","type":"address"}],"name":"GovUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountLockedUp","type":"uint256"}],"name":"RewardLockedUp","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"endBlock","type":"uint256"}],"name":"SetFarmEndBlock","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"startBlock","type":"uint256"}],"name":"SetFarmStartBlock","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"founder1","type":"address"},{"indexed":false,"internalType":"address","name":"founder2","type":"address"}],"name":"SetFounders","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"ownerReward","type":"uint256"}],"name":"SetOwnersRewards","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newAddress","type":"address"}],"name":"SetPlatformAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"depositFeeBP","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"harvestInterval","type":"uint256"}],"name":"SetPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"topPrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bottomPrice","type":"uint256"}],"name":"UpdateDDSCAPriceRange","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"maxEmissionRate","type":"uint256"}],"name":"updatedDDSCAMaxEmissionRate","type":"event"},{"inputs":[],"name":"ActiveEmissionIndex","outputs":[{"internalType":"enum DDSCA.EmissionRate","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"FOUNDER1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"FOUNDER2","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAXIMUM_HARVEST_INTERVAL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PLATFORM_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"uint256","name":"_depositFeeBP","type":"uint256"},{"internalType":"uint256","name":"_harvestInterval","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"bottomPriceInCents","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"busdRewardCurrency","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"canHarvest","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emissionEndBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"emissionStartBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"currentPriceCents","type":"uint256"}],"name":"getEmissionStage","outputs":[{"internalType":"enum DDSCA.EmissionRate","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getPigsMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"govAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_tokenAddress","type":"address"},{"internalType":"uint256","name":"_tokenPerBlock","type":"uint256"},{"internalType":"uint256","name":"_maxTokenPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isInitialized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"maxEmissionRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ownerPigsReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingPigs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pigsToken","outputs":[{"internalType":"contract PigsToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"name":"poolExistence","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accPigsPerShare","type":"uint256"},{"internalType":"uint256","name":"lpSupply","type":"uint256"},{"internalType":"uint256","name":"harvestInterval","type":"uint256"},{"internalType":"uint256","name":"depositFeeBP","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"uint256","name":"_depositFeeBP","type":"uint256"},{"internalType":"uint256","name":"_harvestInterval","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newEndBlock","type":"uint256"}],"name":"setFarmEndBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newStartBlock","type":"uint256"}],"name":"setFarmStartBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_founder1","type":"address"},{"internalType":"address","name":"_founder2","type":"address"}],"name":"setFoundersAddresses","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newRewardsAmount","type":"uint256"}],"name":"setFoundersRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_govAddress","type":"address"}],"name":"setGov","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_platformAddress","type":"address"}],"name":"setPlatformAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"topPriceInCents","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalLockedUpRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxEmissionRate","type":"uint256"}],"name":"updateDDSCAMaxEmissionRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_topPrice","type":"uint256"},{"internalType":"uint256","name":"_bottomPrice","type":"uint256"}],"name":"updateDDSCAPriceRange","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"priceInCents","type":"uint256"}],"name":"updateEmissions","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"pigsRewardDebt","type":"uint256"},{"internalType":"uint256","name":"rewardLockedUp","type":"uint256"},{"internalType":"uint256","name":"nextHarvestUntil","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const DOGS_CHEF_ABI = [{"inputs":[{"internalType":"contract PigsToken","name":"_pigsToken","type":"address"},{"internalType":"contract DogsToken","name":"_dogsToken","type":"address"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"address","name":"_rewardsVaultAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"bool","name":"isLPToken","type":"bool"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"},{"indexed":false,"internalType":"address","name":"lpToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"depositFeeBP","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"harvestInterval","type":"uint256"}],"name":"AddPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"govAddress","type":"address"}],"name":"GovUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountLockedUp","type":"uint256"}],"name":"RewardLockedUp","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"dogsAddress","type":"address"}],"name":"SetDogsReferral","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"endBlock","type":"uint256"}],"name":"SetFarmEndBlock","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"startBlock","type":"uint256"}],"name":"SetFarmStartBlock","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newAddress","type":"address"}],"name":"SetPlatformAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"depositFeeBP","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"harvestInterval","type":"uint256"}],"name":"SetPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"topPrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bottomPrice","type":"uint256"}],"name":"UpdateDDSCAPriceRange","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"maxEmissionRate","type":"uint256"}],"name":"updatedDDSCAMaxEmissionRate","type":"event"},{"inputs":[],"name":"ActiveEmissionIndex","outputs":[{"internalType":"enum DDSCA.EmissionRate","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAXIMUM_HARVEST_INTERVAL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PLATFORM_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_isLPToken","type":"bool"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"contract IStrategy","name":"_strategy","type":"address"},{"internalType":"uint256","name":"_depositFeeBP","type":"uint256"},{"internalType":"uint256","name":"_harvestInterval","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"bottomPriceInCents","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"busdRewardCurrency","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"canHarvest","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_referrer","type":"address"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"dogsToken","outputs":[{"internalType":"contract DogsToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emissionEndBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"emissionStartBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getDogsMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"currentPriceCents","type":"uint256"}],"name":"getEmissionStage","outputs":[{"internalType":"enum DDSCA.EmissionRate","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"govAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_tokenAddress","type":"address"},{"internalType":"uint256","name":"_tokenPerBlock","type":"uint256"},{"internalType":"uint256","name":"_maxTokenPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isInitialized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"maxEmissionRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"pendingBUSD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingDogs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pigsPID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pigsToken","outputs":[{"internalType":"contract PigsToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"name":"poolExistence","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"contract IStrategy","name":"strategy","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accDogsPerShare","type":"uint256"},{"internalType":"uint256","name":"lpSupply","type":"uint256"},{"internalType":"uint256","name":"harvestInterval","type":"uint256"},{"internalType":"uint256","name":"depositFeeBP","type":"uint256"},{"internalType":"bool","name":"isLPToken","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"referralCommissionRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardsVault","outputs":[{"internalType":"contract IRewardsVault","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"uint256","name":"_depositFeeBP","type":"uint256"},{"internalType":"uint256","name":"_harvestInterval","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newEndBlock","type":"uint256"}],"name":"setFarmEndBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newStartBlock","type":"uint256"}],"name":"setFarmStartBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_govAddress","type":"address"}],"name":"setGov","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_platformAddress","type":"address"}],"name":"setPlatformAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IReferralSystem","name":"_dogsReferral","type":"address"}],"name":"setReferral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"topPriceInCents","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBUSDCollected","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalLockedUpRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxEmissionRate","type":"uint256"}],"name":"updateDDSCAMaxEmissionRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_topPrice","type":"uint256"},{"internalType":"uint256","name":"_bottomPrice","type":"uint256"}],"name":"updateDDSCAPriceRange","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"priceInCents","type":"uint256"}],"name":"updateEmissions","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"dogsRewardDebt","type":"uint256"},{"internalType":"uint256","name":"rewardLockedUp","type":"uint256"},{"internalType":"uint256","name":"nextHarvestUntil","type":"uint256"},{"internalType":"uint256","name":"busdRewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

   const PIGS_CHEF_ADDR = "0xe5d9c56b271bc7820eee01bcc99e593e3e7bad44";
   const DOGS_CHEF_ADDR = "0x932C5E1709a6895Bc455E799B03F43D3a8FfbD9A";
   const rewardTokenTicker = "PIGS";
   const rewardTokenTicker2 = "DOGS";
   const PIGS_CHEF = new ethers.Contract(PIGS_CHEF_ADDR, PIGS_CHEF_ABI, App.provider);
   const DOGS_CHEF = new ethers.Contract(DOGS_CHEF_ADDR, DOGS_CHEF_ABI, App.provider);
   const rewardsPerWeek = await PIGS_CHEF.tokenPerBlock() /1e18
      * 604800 / 3;
   const rewardsPerWeek2 = await DOGS_CHEF.tokenPerBlock() /1e18
      * 604800 / 3;

    const tokens = {};
    const prices = await getBscPrices();

    //to receive the price from LP PIGS/WBNB
    await loadAnimalsSynthetixPoolInfo(App, tokens, prices, "0x7aaad708ea6ce3acae4c02aa51cef89a5b359eef");

    await loadAnimalsContract(App, tokens, prices, PIGS_CHEF, PIGS_CHEF_ADDR, PIGS_CHEF_ABI, rewardTokenTicker,
      "token", null, rewardsPerWeek, "pendingPigs");
    _print("");
    await loadAnimalsContract(App, tokens, prices, DOGS_CHEF, DOGS_CHEF_ADDR, DOGS_CHEF_ABI, rewardTokenTicker2,
      "token", null, rewardsPerWeek2, "pendingDogs");

    hideLoading();
  }

async function getAnimalsPoolInfo(App, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
  const poolInfo = await chefContract.poolInfo(poolIndex);
  if (poolInfo.allocPoint == 0 || poolIndex == 105) {
    return {
      address: poolInfo.lpToken ?? poolInfo.token,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: null,
      userStaked : 0,
      pendingRewardTokens : 0,
      stakedToken : null,
      userLPStaked : 0,
      lastRewardBlock : poolInfo.lastRewardBlock
    };
  }
  const poolToken = await getBscToken(App, poolInfo.lpToken ?? poolInfo.token, chefAddress);
  poolToken.staked = poolInfo.lpSupply / 10 ** poolToken.decimals;
  const userInfo = await chefContract.userInfo(poolIndex, App.YOUR_ADDRESS);
  const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS);
  const staked = userInfo.amount / 10 ** poolToken.decimals;
  return {
      address: poolInfo.lpToken ?? poolInfo.token,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: poolToken,
      userStaked : staked,
      pendingRewardTokens : pendingRewardTokens / 10 ** 18,
      depositFee : (poolInfo.depositFeeBP ?? 0) / 100,
      withdrawFee : (poolInfo.withdrawFeeBP ?? 0) / 100
  };
}

async function loadAnimalsContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
  rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
  deathPoolIndices) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.poolLength(), 10);
  const totalAllocPoints = await chefContract.totalAllocPoint();

  _print(`<a href='https://bscscan.com/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  var tokens = {};

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getBscToken(App, rewardTokenAddress, chefAddress);
  const rewardsPerWeek = rewardsPerWeekFixed ??
    await chefContract.callStatic[rewardsPerBlockFunction]()
    / 10 ** rewardToken.decimals * 604800 / 3

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getAnimalsPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getBscToken(App, address, chefAddress);
  }));

  if (deathPoolIndices) {   //load prices for the deathpool assets
    deathPoolIndices.map(i => poolInfos[i])
                     .map(poolInfo =>
      poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "bsc") : undefined);
  }

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "bsc") : undefined);


  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
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

async function loadAnimalsSynthetixPoolInfo(App, tokens, prices, stakeTokenAddress) {
  var stakeToken = await getBscToken(App, stakeTokenAddress, stakeTokenAddress);
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
      tokens[address] = await getBscToken(App, address, stakeTokenAddress);
  }
  const poolPrices = getPoolPrices(tokens, prices, stakeToken, "bsc");
  if (!poolPrices)
  {
    console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
    return null;
  }
  const stakeTokenTicker = poolPrices.stakeTokenTicker;

  const stakeTokenPrice =
      prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
  return  {
    poolPrices,
    stakeTokenAddress,
    stakeTokenTicker,
    stakeTokenPrice
  }
}