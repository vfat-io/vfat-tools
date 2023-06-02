
$(function() {
    consoleInit(main)
  });

const xFIRE_ABI = ""
const FIRE_ABI = ""
const MAIN_FIRE_ABI = ""

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const tokens = {};
    const prices = await getOptimisticPrices();

    await loadXFire(App, prices);

    hideLoading();
  }

async function loadXFire(App, prices){

  let eligible = false;
  function reqListener() {
    const resp = this.responseText;
    const _data = resp.split();
    const data = _data[0].split('\n');
    eligible = data.includes(App.YOUR_ADDRESS);
    console.log(eligible);
  }

  const req = new XMLHttpRequest();
  req.addEventListener("load", reqListener);
  req.open("GET", "https://raw.githubusercontent.com/ltj866/airdrop-0/main/addresses", false);
  req.send();

  const FIRE_ADDR = "";
  const MAIN_CONTRACT_ADDR = "";

  const FIRE_CONTRACT = "";
  const MAIN_CONTRACT = "";

  const startTime = await MAIN_CONTRACT.startTime();  // / 1000???
  const endTime = await MAIN_CONTRACT.endTime();  // / 1000???
  const multiplier = await MAIN_CONTRACT.multiplier();
  const wFireAmount = await MAIN_CONTRACT.userInfo(App.YOUR_ADDRESS);
  const fireAmount = await FIRE_CONTRACT.balanceOf(App.YOUR_ADDRESS);

  const startDate = new Date(startTime);  //??? .toLocaleString()???
  const endDate = new Date(endTime);  //??? .toLocaleString()???

  _print(`Starting date : ${startDate}\n`);
  _print(`Ending date : ${endDate}\n`);

  if(eligible){
    _print("You are a part of the airdrop\n");

    const approveAndStake = async function() {
      return contract_stake(MAIN_CONTRACT_ADDR, App, FIRE_ADDR)
    }
    const unstake = async function() {
      return contract_unstake(MAIN_CONTRACT_ADDR, App)
    }
    if(Date.now() / 1000 < startTime){
      _print_link(`Stake ${totalOwnedFire.toFixed(2)} ${stakeTicker}`, approveAndStake);
    }else{
      _print("Deposit period has closed");
    }
    if(Date.now() / 1000 > endTime){
      _print_link(`Unstake ${totalOwnedXFire.toFixed(2)} ${rewardTicker}`, unstake);
    }else{
      _print(`You can withdraw you FIRE after ${endDate}`);
    }
  }else{
    _print("You are not a part of the airdrop");
  }
}

const contract_stake = async function(contractAddress, App, stakeTokenAddr) {
  const signer = App.provider.getSigner()

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)

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
        MAIN_FIRE_ABI.deposit(currentTokens, {gasLimit: 500000})
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

const contract_unstake = async function(contractAddress, App) {
  const signer = App.provider.getSigner()
  const MAIN_FIRE_WRITE_CONTRACT = new ethers.Contract(contractAddress, MAIN_FIRE_ABI, signer)
  showLoading()
  MAIN_FIRE_WRITE_CONTRACT.withdraw({gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
}