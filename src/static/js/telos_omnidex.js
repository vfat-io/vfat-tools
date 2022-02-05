
$(function() {
consoleInit(main)
  });

const OMNIDEX_ZEN_ABI = [{"inputs": [{"internalType": "contract CharmToken","name": "_charm","type": "address"},{"internalType": "contract SpellBar","name": "_xcharm","type": "address"},{"internalType": "address","name": "_devaddr","type": "address"},{"internalType": "uint256","name": "_charmPerBlock","type": "uint256"},{"internalType": "uint256","name": "_startBlock","type": "uint256"}],"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "user","type": "address"},{"indexed": true,"internalType": "uint256","name": "pid","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"}],"name": "Deposit","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "user","type": "address"},{"indexed": true,"internalType": "uint256","name": "pid","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"}],"name": "EmergencyWithdraw","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "previousOwner","type": "address"},{"indexed": true,"internalType": "address","name": "newOwner","type": "address"}],"name": "OwnershipTransferred","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "user","type": "address"},{"indexed": true,"internalType": "uint256","name": "pid","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"}],"name": "Withdraw","type": "event"},{"inputs": [],"name": "BONUS_MULTIPLIER","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_allocPoint","type": "uint256"},{"internalType": "contract IBEP20","name": "_lpToken","type": "address"},{"internalType": "bool","name": "_withUpdate","type": "bool"}],"name": "add","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "charm","outputs": [{"internalType": "contract CharmToken","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "charmPerBlock","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_pid","type": "uint256"},{"internalType": "uint256","name": "_amount","type": "uint256"}],"name": "deposit","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_devaddr","type": "address"}],"name": "dev","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "devaddr","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_pid","type": "uint256"}],"name": "emergencyWithdraw","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_amount","type": "uint256"}],"name": "enterStaking","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_from","type": "uint256"},{"internalType": "uint256","name": "_to","type": "uint256"}],"name": "getMultiplier","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_amount","type": "uint256"}],"name": "leaveStaking","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "massUpdatePools","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_pid","type": "uint256"}],"name": "migrate","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "migrator","outputs": [{"internalType": "contract IMigratorMaster","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "owner","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_pid","type": "uint256"},{"internalType": "address","name": "_user","type": "address"}],"name": "pendingCharm","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"}],"name": "poolInfo","outputs": [{"internalType": "contract IBEP20","name": "lpToken","type": "address"},{"internalType": "uint256","name": "allocPoint","type": "uint256"},{"internalType": "uint256","name": "lastRewardBlock","type": "uint256"},{"internalType": "uint256","name": "accCharmPerShare","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "poolLength","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "renounceOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_pid","type": "uint256"},{"internalType": "uint256","name": "_allocPoint","type": "uint256"},{"internalType": "bool","name": "_withUpdate","type": "bool"}],"name": "set","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "contract IMigratorMaster","name": "_migrator","type": "address"}],"name": "setMigrator","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "startBlock","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "totalAllocPoint","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "newOwner","type": "address"}],"name": "transferOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "multiplierNumber","type": "uint256"}],"name": "updateMultiplier","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_pid","type": "uint256"}],"name": "updatePool","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "address","name": "","type": "address"}],"name": "userInfo","outputs": [{"internalType": "uint256","name": "amount","type": "uint256"},{"internalType": "uint256","name": "rewardDebt","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_pid","type": "uint256"},{"internalType": "uint256","name": "_amount","type": "uint256"}],"name": "withdraw","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "xcharm","outputs": [{"internalType": "contract SpellBar","name": "","type": "address"}],"stateMutability": "view","type": "function"}]
const OMNIDEX_VAULT_ABI = [{"inputs": [{"internalType": "contract IERC20","name": "_token","type": "address"},{"internalType": "contract IERC20","name": "_receiptToken","type": "address"},{"internalType": "contract IZenMaster","name": "_zenmaster","type": "address"},{"internalType": "address","name": "_admin","type": "address"},{"internalType": "address","name": "_treasury","type": "address"}],"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "sender","type": "address"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "shares","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "lastDepositedTime","type": "uint256"}],"name": "Deposit","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "sender","type": "address"},{"indexed": false,"internalType": "uint256","name": "performanceFee","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "callFee","type": "uint256"}],"name": "Harvest","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "previousOwner","type": "address"},{"indexed": true,"internalType": "address","name": "newOwner","type": "address"}],"name": "OwnershipTransferred","type": "event"},{"anonymous": false,"inputs": [],"name": "Pause","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "account","type": "address"}],"name": "Paused","type": "event"},{"anonymous": false,"inputs": [],"name": "Unpause","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "account","type": "address"}],"name": "Unpaused","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "sender","type": "address"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "shares","type": "uint256"}],"name": "Withdraw","type": "event"},{"inputs": [],"name": "MAX_CALL_FEE","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "MAX_PERFORMANCE_FEE","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "MAX_WITHDRAW_FEE","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "MAX_WITHDRAW_FEE_PERIOD","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "admin","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "available","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "balanceOf","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "calculateHarvestCharmRewards","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "calculateTotalPendingCharmRewards","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "callFee","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_amount","type": "uint256"}],"name": "deposit","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "emergencyWithdraw","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "getPricePerFullShare","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "harvest","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_token","type": "address"}],"name": "inCaseTokensGetStuck","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "lastHarvestedTime","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "owner","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "pause","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "paused","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "performanceFee","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "receiptToken","outputs": [{"internalType": "contract IERC20","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "renounceOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_admin","type": "address"}],"name": "setAdmin","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_callFee","type": "uint256"}],"name": "setCallFee","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_performanceFee","type": "uint256"}],"name": "setPerformanceFee","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_treasury","type": "address"}],"name": "setTreasury","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_withdrawFee","type": "uint256"}],"name": "setWithdrawFee","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_withdrawFeePeriod","type": "uint256"}],"name": "setWithdrawFeePeriod","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "token","outputs": [{"internalType": "contract IERC20","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "totalShares","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "newOwner","type": "address"}],"name": "transferOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "treasury","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "unpause","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "userInfo","outputs": [{"internalType": "uint256","name": "shares","type": "uint256"},{"internalType": "uint256","name": "lastDepositedTime","type": "uint256"},{"internalType": "uint256","name": "charmAtLastUserAction","type": "uint256"},{"internalType": "uint256","name": "lastUserActionTime","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_shares","type": "uint256"}],"name": "withdraw","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "withdrawAll","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "withdrawFee","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "withdrawFeePeriod","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "zenmaster","outputs": [{"internalType": "contract IZenMaster","name": "","type": "address"}],"stateMutability": "view","type": "function"}]

const Addresses = [
  "0x1482117c5F3F6962429C40068e22Cf4120bae94b"
]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

   const OMNIDEX_ZEN_ADDR = "0x79f5A8BD0d6a00A41EA62cdA426CEf0115117a61";
   const rewardTokenTicker = "CHARM";
   const OMNIDEX_ZEN = new ethers.Contract(OMNIDEX_ZEN_ADDR, OMNIDEX_ZEN_ABI, App.provider);

   const rewardsPerWeek = await OMNIDEX_ZEN.charmPerBlock() /1e18
        * 604800 / 3;

    const tokens = {};
    const prices = await getTelosPrices();

    await loadTelosChefContract(App, tokens, prices, OMNIDEX_ZEN, OMNIDEX_ZEN_ADDR, OMNIDEX_ZEN_ABI, rewardTokenTicker,
        "charm", null, rewardsPerWeek, "pendingCharm");

    _print("")
    _print("Loading omnidex vaults\n")
    _print("Please check the site for withdrawal fees\n")

    const poolInfos = await Promise.all(Addresses.map(a => loadOmnidexPoolInfo(App, tokens, prices, a)));
    let tvl = 0, userTvl = 0
    for(const p of poolInfos.filter(p => p))
    {
      printOmnidexContract(p);
      if (!isNaN(p.poolPrices.tvl)) tvl += p.poolPrices.tvl;
      if (!isNaN(p.userStaked * p.poolPrices.price)) userTvl += p.userStaked * p.poolPrices.price;
    }
    _print_bold(`\nTotal Value Locked: $${formatMoney(tvl)}`);
    if (userTvl > 0) {
      _print_bold(`You are staking a total of $${formatMoney(userTvl)}`);
    }

    hideLoading();
  }

async function loadOmnidexPoolInfo(App, tokens, prices, contractAddress) {
      try {
        const contract = await new ethers.Contract(contractAddress, OMNIDEX_VAULT_ABI, App.provider);
        const tokenAddress = await contract.token();
        const token = await getTelosToken(App, tokenAddress, App.YOUR_ADDRESS);
        var newTokenAddresses = token.tokens.filter(x => !getParameterCaseInsensitive(tokens, x));
        for (const address of newTokenAddresses) {
            tokens[address] = await getTelosToken(App, address, contractAddress);
        }
        token.staked = await contract.balanceOf() / 10 ** token.decimals;
        const ppfs = await contract.getPricePerFullShare() / 1e18;
        const _userStaked = await contract.userInfo(App.YOUR_ADDRESS);
        const userStaked = _userStaked.shares / 10 ** token.decimals;
        const poolPrices = getPoolPrices(tokens, prices, token, "telos");
        return { token, poolPrices, userStaked, ppfs, contractAddress }
      }
      catch (err) {
        console.log(contractAddress, err);
        return null;
      }
  }
    
async function printOmnidexContract(poolInfo) {
      const poolPrices = poolInfo.poolPrices;
      poolPrices.print_price();
      var userStakedUsd = poolInfo.userStaked * poolPrices.price;
      var userStakedPct = userStakedUsd / poolPrices.tvl * 100;
      _print(`You are staking ${poolInfo.userStaked.toFixed(4)} ${poolInfo.token.name} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
      if (poolInfo.userStaked > 0) {
        _print(`Your stake comprises of ${poolInfo.userStaked * poolInfo.ppfs} ${poolInfo.token.symbol}.`)
      }
      const deposit = async function() {
        return omnidexVaultDeposit(App, poolInfo.token, poolInfo.contractAddress)
      }
      const withdraw = async function() {
        return omnidexVaultWithdraw(App, poolInfo.contractAddress)
      }
      _print_link(`Deposit ${poolInfo.token.unstaked.toFixed(6)} ${poolInfo.token.symbol}`, deposit);
      _print_link(`Withdraw ${poolInfo.userStaked.toFixed(6)} ${poolInfo.token.symbol}`, withdraw)
      _print("");
  }

async function omnidexVaultDeposit(App, token, stakingAddress) {
  const signer = await App.provider.getSigner();

  const STAKING_TOKEN = new ethers.Contract(token.address, ERC20_ABI, signer)
  const VAULT_CONTRACT = new ethers.Contract(stakingAddress, OMNIDEX_VAULT_ABI, signer)

  const balanceToStake = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, vaultToken.token.address)

  const decimals = await STAKING_TOKEN.decimals();
  let allow = Promise.resolve()

  if (allowedTokens / 10 ** decimals < balanceToStake / 10 ** decimals) {
    showLoading()
    allow = STAKING_TOKEN.approve(vaultToken.token.address, ethers.constants.MaxUint256)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
        alert('Try resetting your approval to 0 first')
      })
  }

  if (balanceToStake / 10 ** decimals > 0) {
    showLoading()
    allow
      .then(async function() {
        VAULT_CONTRACT["deposit(uint256)"](balanceToStake, {gasLimit: 500000})
          .then(function(t) {
            App.provider.waitForTransaction(t.hash).then(function() {
              hideLoading()
            })
          })
          .catch(function() {
            hideLoading()
            _print('Something went wrong.\n')
          })
      })
      .catch(function(ex) {
        hideLoading()
        _print('Something went wrong.')
        _print(ex)
      })
  } else {
    alert('You have no tokens to stake!!')
  }
}

async function omnidexVaultWithdraw(App, stakingAddress) {
  const signer = App.provider.getSigner()
  const VAULT_CONTRACT = new ethers.Contract(stakingAddress, OMNIDEX_VAULT_ABI, signer)

  const currentStakedAmount = await VAULT_CONTRACT.userInfo(App.YOUR_ADDRESS).shares

  if (currentStakedAmount / 1e18 > 0) {
    showLoading()
    VAULT_CONTRACT["withdraw(uint256)"](currentStakedAmount, {gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}