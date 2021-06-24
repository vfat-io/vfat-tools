$(function() {
  consoleInit(main)
  });
  
  const LEVIN_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_sushi","internalType":"contract SushiToken"},{"type":"uint256","name":"_sushiPerBlock","internalType":"uint256"},{"type":"uint256","name":"_startBlock","internalType":"uint256"},{"type":"uint256","name":"_bonusEndBlock","internalType":"uint256"}]},{"type":"event","name":"Deposit","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"EmergencyWithdraw","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Withdraw","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"BONUS_MULTIPLIER","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"add","inputs":[{"type":"uint256","name":"_allocPoint","internalType":"uint256"},{"type":"address","name":"_lpToken","internalType":"contract IERC20"},{"type":"bool","name":"_withUpdate","internalType":"bool"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"bonusEndBlock","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"emergencyWithdraw","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getMultiplier","inputs":[{"type":"uint256","name":"_from","internalType":"uint256"},{"type":"uint256","name":"_to","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"massUpdatePools","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"pendingSushi","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"address","name":"_user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"lpToken","internalType":"contract IERC20"},{"type":"uint256","name":"allocPoint","internalType":"uint256"},{"type":"uint256","name":"lastRewardBlock","internalType":"uint256"},{"type":"uint256","name":"accSushiPerShare","internalType":"uint256"}],"name":"poolInfo","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"poolLength","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"set","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_allocPoint","internalType":"uint256"},{"type":"bool","name":"_withUpdate","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setMintRate","inputs":[{"type":"uint256","name":"_sushiPerBlock","internalType":"uint256"},{"type":"bool","name":"_withUpdate","internalType":"bool"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"startBlock","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract SushiToken"}],"name":"sushi","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"sushiPerBlock","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalAllocPoint","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updatePool","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"uint256","name":"rewardDebt","internalType":"uint256"}],"name":"userInfo","inputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_amount","internalType":"uint256"}]}]
  
  async function main() {
    const App = await init_ethers();
  
    const LEVIN_ADDR = "0x0f2B0e9DB46C6b538e9276D2cF0C6CE8d515Eca1";
    const LEVIN = new ethers.Contract(LEVIN_ADDR, LEVIN_ABI, App.provider);
  
    const tokens = {};
    const prices = await getXdaiPrices();
  
    await loadXdaiChefContract(App, tokens, prices, LEVIN, LEVIN_ADDR, LEVIN_ABI, "LEVIN",
        "sushi", null, rewardsPerWeek, "pendingSushi");
  
    hideLoading();
  }
    /*
  SwaprStakingAddresses = [
  {
  "id": "0x060b50b5686f09ed87a1e42eebbd14d289530459"
  },
  {
  "id": "0x12cce3dde34b4c2e86136ad35e9d8a5ae32b8a3a"
  },
  {
  "id": "0x20f94f9deee309175fd2fc4eb6b641929e004c0e"
  },
  {
  "id": "0x353cf37178101ffb7a1dfb835bf8a605c76ca2f2"
  },
  {
  "id": "0x426025387dc8409d17e5edd4b9d0dc48dc16dd5a"
  },
  {
  "id": "0x55c2a8b2870548507e9a5089487684d5d5ac248e"
  },
  {
  "id": "0x795af0b98d1e87f5042ee2a1d4ff7ccbdfe6703b"
  },
  {
  "id": "0x7e8cfc46a41dbfd3cc8956ecff74d14e8fe80218"
  },
  {
  "id": "0x8e8c7c029527731075ae404daf49518d1064e552"
  },
  {
  "id": "0x98236e9faccca1740f22a46187b3e062f88d3720"
  },
  {
  "id": "0x9edacc52a9bb7e32ddd12308b817d8e65621bfab"
  },
  {
  "id": "0xae16c58658a38660d606048ee9f8f7c341265054"
  },
  {
  "id": "0xbc217036a149ca04e583f6e301749b8e9164a2f9"
  },
  {
  "id": "0xbde739025ee81371891e9fd994a2a36e20f19c53"
  },
  {
  "id": "0xc0ef25b17ac4012c2961f6c5e16919b994b2d982"
  },
  {
  "id": "0xc4fbfb24983f5ee8314e9f01b0c4b6093e6978aa"
  },
  {
  "id": "0xcfb3c713dd07d2464d538fde811aed32ec1494ee"
  },
  {
  "id": "0xfdd43efb428f07f2c9ee7f0a3d05cc5026016950"
  }]
  
    */