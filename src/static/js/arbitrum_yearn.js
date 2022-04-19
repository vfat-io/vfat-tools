
$(function() {
  consoleInit(main)
  });

  const YEARN_TOKEN_ABI = [{"name":"Transfer","inputs":[{"type":"address","name":"sender","indexed":true},{"type":"address","name":"receiver","indexed":true},{"type":"uint256","name":"value","indexed":false}],"anonymous":false,"type":"event"},{"name":"Approval","inputs":[{"type":"address","name":"owner","indexed":true},{"type":"address","name":"spender","indexed":true},{"type":"uint256","name":"value","indexed":false}],"anonymous":false,"type":"event"},{"name":"StrategyAdded","inputs":[{"type":"address","name":"strategy","indexed":true},{"type":"uint256","name":"debtRatio","indexed":false},{"type":"uint256","name":"minDebtPerHarvest","indexed":false},{"type":"uint256","name":"maxDebtPerHarvest","indexed":false},{"type":"uint256","name":"performanceFee","indexed":false}],"anonymous":false,"type":"event"},{"name":"StrategyReported","inputs":[{"type":"address","name":"strategy","indexed":true},{"type":"uint256","name":"gain","indexed":false},{"type":"uint256","name":"loss","indexed":false},{"type":"uint256","name":"debtPaid","indexed":false},{"type":"uint256","name":"totalGain","indexed":false},{"type":"uint256","name":"totalLoss","indexed":false},{"type":"uint256","name":"totalDebt","indexed":false},{"type":"uint256","name":"debtAdded","indexed":false},{"type":"uint256","name":"debtRatio","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateGovernance","inputs":[{"type":"address","name":"governance","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateManagement","inputs":[{"type":"address","name":"management","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateGuestList","inputs":[{"type":"address","name":"guestList","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateRewards","inputs":[{"type":"address","name":"rewards","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateDepositLimit","inputs":[{"type":"uint256","name":"depositLimit","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdatePerformanceFee","inputs":[{"type":"uint256","name":"performanceFee","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateManagementFee","inputs":[{"type":"uint256","name":"managementFee","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateGuardian","inputs":[{"type":"address","name":"guardian","indexed":false}],"anonymous":false,"type":"event"},{"name":"EmergencyShutdown","inputs":[{"type":"bool","name":"active","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateWithdrawalQueue","inputs":[{"type":"address[20]","name":"queue","indexed":false}],"anonymous":false,"type":"event"},{"name":"StrategyUpdateDebtRatio","inputs":[{"type":"address","name":"strategy","indexed":true},{"type":"uint256","name":"debtRatio","indexed":false}],"anonymous":false,"type":"event"},{"name":"StrategyUpdateMinDebtPerHarvest","inputs":[{"type":"address","name":"strategy","indexed":true},{"type":"uint256","name":"minDebtPerHarvest","indexed":false}],"anonymous":false,"type":"event"},{"name":"StrategyUpdateMaxDebtPerHarvest","inputs":[{"type":"address","name":"strategy","indexed":true},{"type":"uint256","name":"maxDebtPerHarvest","indexed":false}],"anonymous":false,"type":"event"},{"name":"StrategyUpdatePerformanceFee","inputs":[{"type":"address","name":"strategy","indexed":true},{"type":"uint256","name":"performanceFee","indexed":false}],"anonymous":false,"type":"event"},{"name":"StrategyMigrated","inputs":[{"type":"address","name":"oldVersion","indexed":true},{"type":"address","name":"newVersion","indexed":true}],"anonymous":false,"type":"event"},{"name":"StrategyRevoked","inputs":[{"type":"address","name":"strategy","indexed":true}],"anonymous":false,"type":"event"},{"name":"StrategyRemovedFromQueue","inputs":[{"type":"address","name":"strategy","indexed":true}],"anonymous":false,"type":"event"},{"name":"StrategyAddedToQueue","inputs":[{"type":"address","name":"strategy","indexed":true}],"anonymous":false,"type":"event"},{"name":"initialize","outputs":[],"inputs":[{"type":"address","name":"token"},{"type":"address","name":"governance"},{"type":"address","name":"rewards"},{"type":"string","name":"nameOverride"},{"type":"string","name":"symbolOverride"}],"stateMutability":"nonpayable","type":"function"},{"name":"initialize","outputs":[],"inputs":[{"type":"address","name":"token"},{"type":"address","name":"governance"},{"type":"address","name":"rewards"},{"type":"string","name":"nameOverride"},{"type":"string","name":"symbolOverride"},{"type":"address","name":"guardian"}],"stateMutability":"nonpayable","type":"function"},{"name":"apiVersion","outputs":[{"type":"string","name":""}],"inputs":[],"stateMutability":"pure","type":"function","gas":4519},{"name":"setName","outputs":[],"inputs":[{"type":"string","name":"name"}],"stateMutability":"nonpayable","type":"function","gas":107017},{"name":"setSymbol","outputs":[],"inputs":[{"type":"string","name":"symbol"}],"stateMutability":"nonpayable","type":"function","gas":71867},{"name":"setGovernance","outputs":[],"inputs":[{"type":"address","name":"governance"}],"stateMutability":"nonpayable","type":"function","gas":36338},{"name":"acceptGovernance","outputs":[],"inputs":[],"stateMutability":"nonpayable","type":"function","gas":37610},{"name":"setManagement","outputs":[],"inputs":[{"type":"address","name":"management"}],"stateMutability":"nonpayable","type":"function","gas":37748},{"name":"setGuestList","outputs":[],"inputs":[{"type":"address","name":"guestList"}],"stateMutability":"nonpayable","type":"function","gas":37778},{"name":"setRewards","outputs":[],"inputs":[{"type":"address","name":"rewards"}],"stateMutability":"nonpayable","type":"function","gas":37808},{"name":"setLockedProfitDegration","outputs":[],"inputs":[{"type":"uint256","name":"degration"}],"stateMutability":"nonpayable","type":"function","gas":36516},{"name":"setDepositLimit","outputs":[],"inputs":[{"type":"uint256","name":"limit"}],"stateMutability":"nonpayable","type":"function","gas":37768},{"name":"setPerformanceFee","outputs":[],"inputs":[{"type":"uint256","name":"fee"}],"stateMutability":"nonpayable","type":"function","gas":37902},{"name":"setManagementFee","outputs":[],"inputs":[{"type":"uint256","name":"fee"}],"stateMutability":"nonpayable","type":"function","gas":37932},{"name":"setGuardian","outputs":[],"inputs":[{"type":"address","name":"guardian"}],"stateMutability":"nonpayable","type":"function","gas":39176},{"name":"setEmergencyShutdown","outputs":[],"inputs":[{"type":"bool","name":"active"}],"stateMutability":"nonpayable","type":"function","gas":39247},{"name":"setWithdrawalQueue","outputs":[],"inputs":[{"type":"address[20]","name":"queue"}],"stateMutability":"nonpayable","type":"function","gas":763923},{"name":"transfer","outputs":[{"type":"bool","name":""}],"inputs":[{"type":"address","name":"receiver"},{"type":"uint256","name":"amount"}],"stateMutability":"nonpayable","type":"function","gas":76913},{"name":"transferFrom","outputs":[{"type":"bool","name":""}],"inputs":[{"type":"address","name":"sender"},{"type":"address","name":"receiver"},{"type":"uint256","name":"amount"}],"stateMutability":"nonpayable","type":"function","gas":116676},{"name":"approve","outputs":[{"type":"bool","name":""}],"inputs":[{"type":"address","name":"spender"},{"type":"uint256","name":"amount"}],"stateMutability":"nonpayable","type":"function","gas":38334},{"name":"increaseAllowance","outputs":[{"type":"bool","name":""}],"inputs":[{"type":"address","name":"spender"},{"type":"uint256","name":"amount"}],"stateMutability":"nonpayable","type":"function","gas":40375},{"name":"decreaseAllowance","outputs":[{"type":"bool","name":""}],"inputs":[{"type":"address","name":"spender"},{"type":"uint256","name":"amount"}],"stateMutability":"nonpayable","type":"function","gas":40399},{"name":"permit","outputs":[{"type":"bool","name":""}],"inputs":[{"type":"address","name":"owner"},{"type":"address","name":"spender"},{"type":"uint256","name":"amount"},{"type":"uint256","name":"expiry"},{"type":"bytes","name":"signature"}],"stateMutability":"nonpayable","type":"function","gas":81327},{"name":"totalAssets","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":4303},{"name":"deposit","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"nonpayable","type":"function"},{"name":"deposit","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"uint256","name":"_amount"}],"stateMutability":"nonpayable","type":"function"},{"name":"deposit","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"uint256","name":"_amount"},{"type":"address","name":"recipient"}],"stateMutability":"nonpayable","type":"function"},{"name":"maxAvailableShares","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":379843},{"name":"withdraw","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"nonpayable","type":"function"},{"name":"withdraw","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"uint256","name":"maxShares"}],"stateMutability":"nonpayable","type":"function"},{"name":"withdraw","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"uint256","name":"maxShares"},{"type":"address","name":"recipient"}],"stateMutability":"nonpayable","type":"function"},{"name":"withdraw","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"uint256","name":"maxShares"},{"type":"address","name":"recipient"},{"type":"uint256","name":"maxLoss"}],"stateMutability":"nonpayable","type":"function"},{"name":"pricePerShare","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":17509},{"name":"addStrategy","outputs":[],"inputs":[{"type":"address","name":"strategy"},{"type":"uint256","name":"debtRatio"},{"type":"uint256","name":"minDebtPerHarvest"},{"type":"uint256","name":"maxDebtPerHarvest"},{"type":"uint256","name":"performanceFee"}],"stateMutability":"nonpayable","type":"function","gas":1486241},{"name":"updateStrategyDebtRatio","outputs":[],"inputs":[{"type":"address","name":"strategy"},{"type":"uint256","name":"debtRatio"}],"stateMutability":"nonpayable","type":"function","gas":115406},{"name":"updateStrategyMinDebtPerHarvest","outputs":[],"inputs":[{"type":"address","name":"strategy"},{"type":"uint256","name":"minDebtPerHarvest"}],"stateMutability":"nonpayable","type":"function","gas":42654},{"name":"updateStrategyMaxDebtPerHarvest","outputs":[],"inputs":[{"type":"address","name":"strategy"},{"type":"uint256","name":"maxDebtPerHarvest"}],"stateMutability":"nonpayable","type":"function","gas":42684},{"name":"updateStrategyPerformanceFee","outputs":[],"inputs":[{"type":"address","name":"strategy"},{"type":"uint256","name":"performanceFee"}],"stateMutability":"nonpayable","type":"function","gas":41464},{"name":"migrateStrategy","outputs":[],"inputs":[{"type":"address","name":"oldVersion"},{"type":"address","name":"newVersion"}],"stateMutability":"nonpayable","type":"function","gas":1141973},{"name":"revokeStrategy","outputs":[],"inputs":[],"stateMutability":"nonpayable","type":"function"},{"name":"revokeStrategy","outputs":[],"inputs":[{"type":"address","name":"strategy"}],"stateMutability":"nonpayable","type":"function"},{"name":"addStrategyToQueue","outputs":[],"inputs":[{"type":"address","name":"strategy"}],"stateMutability":"nonpayable","type":"function","gas":1197130},{"name":"removeStrategyFromQueue","outputs":[],"inputs":[{"type":"address","name":"strategy"}],"stateMutability":"nonpayable","type":"function","gas":23093586},{"name":"debtOutstanding","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function"},{"name":"debtOutstanding","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"strategy"}],"stateMutability":"view","type":"function"},{"name":"creditAvailable","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function"},{"name":"creditAvailable","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"strategy"}],"stateMutability":"view","type":"function"},{"name":"availableDepositLimit","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":10108},{"name":"expectedReturn","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function"},{"name":"expectedReturn","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"strategy"}],"stateMutability":"view","type":"function"},{"name":"report","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"uint256","name":"gain"},{"type":"uint256","name":"loss"},{"type":"uint256","name":"_debtPayment"}],"stateMutability":"nonpayable","type":"function","gas":1009335},{"name":"sweep","outputs":[],"inputs":[{"type":"address","name":"token"}],"stateMutability":"nonpayable","type":"function"},{"name":"sweep","outputs":[],"inputs":[{"type":"address","name":"token"},{"type":"uint256","name":"amount"}],"stateMutability":"nonpayable","type":"function"},{"name":"name","outputs":[{"type":"string","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":9143},{"name":"symbol","outputs":[{"type":"string","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":8196},{"name":"decimals","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":2801},{"name":"balanceOf","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"arg0"}],"stateMutability":"view","type":"function","gas":3046},{"name":"allowance","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"arg0"},{"type":"address","name":"arg1"}],"stateMutability":"view","type":"function","gas":3291},{"name":"totalSupply","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":2891},{"name":"token","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":2921},{"name":"governance","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":2951},{"name":"management","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":2981},{"name":"guardian","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":3011},{"name":"guestList","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":3041},{"name":"strategies","outputs":[{"type":"uint256","name":"performanceFee"},{"type":"uint256","name":"activation"},{"type":"uint256","name":"debtRatio"},{"type":"uint256","name":"minDebtPerHarvest"},{"type":"uint256","name":"maxDebtPerHarvest"},{"type":"uint256","name":"lastReport"},{"type":"uint256","name":"totalDebt"},{"type":"uint256","name":"totalGain"},{"type":"uint256","name":"totalLoss"}],"inputs":[{"type":"address","name":"arg0"}],"stateMutability":"view","type":"function","gas":11394},{"name":"withdrawalQueue","outputs":[{"type":"address","name":""}],"inputs":[{"type":"uint256","name":"arg0"}],"stateMutability":"view","type":"function","gas":3210},{"name":"emergencyShutdown","outputs":[{"type":"bool","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":3131},{"name":"depositLimit","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":3161},{"name":"debtRatio","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":3191},{"name":"totalDebt","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":3221},{"name":"lastReport","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":3251},{"name":"activation","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":3281},{"name":"lockedProfit","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":3311},{"name":"lockedProfitDegration","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":3341},{"name":"rewards","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":3371},{"name":"managementFee","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":3401},{"name":"performanceFee","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":3431},{"name":"nonces","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"arg0"}],"stateMutability":"view","type":"function","gas":3676},{"name":"DOMAIN_SEPARATOR","outputs":[{"type":"bytes32","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":3491}]

  async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const vaultAddresses = ["0x239e14A19DFF93a17339DCC444f74406C17f8E67"];

    const tokens = {};
    let prices = await getArbitrumPrices();
    const vaults = await Promise.all(vaultAddresses.map(a => getArbitrumToken(App, a, App.YOUR_ADDRESS)));
    const poolPrices = vaults.map(v => tryGetPoolPrices(tokens, prices, v, "arbitrum"));

    let staked_tvl = 0, userTvl = 0
    for(let i = 0; i < vaults.length; i++){
      if(!poolPrices[i]){
        continue;
      }
      else{
       await printYearnContract(App, vaults[i], poolPrices[i]); 
      }
      if (!isNaN(poolPrices[i].staked_tvl)) staked_tvl += poolPrices[i].staked_tvl;
      if (!isNaN(vaults[i].userStaked * poolPrices[i].price)) userTvl += vaults[i].userStaked * poolPrices[i].price;
    }
    _print_bold(`\nTotal Value Locked: $${formatMoney(staked_tvl)}`);
    if (userTvl > 0) {
      _print_bold(`You are staking a total of $${formatMoney(userTvl)}`);
    }

    hideLoading();
  }

  async function printYearnContract(App, vault, poolPrice) {
    poolPrice.print_price();
    var userStakedUsd = vault.staked * poolPrice.price;
    var userStakedPct = userStakedUsd / poolPrice.tvl * 100;
    _print(`You are staking ${vault.staked.toFixed(4)} ${poolPrice.stakeTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
    if (vault.staked > 0) {
      _print(`Your stake comprises of ${vault.staked * vault.ppfs} ${vault.token.symbol}.`)
    }
    const deposit = async function() {
      return yearnVaultDeposit(App, vault)
    }
    const withdraw = async function() {
      return yearnVaultWithdraw(App, vault)
    }
    _print_link(`Deposit ${vault.token.unstaked.toFixed(6)} ${vault.token.symbol}`, deposit);
    _print_link(`Withdraw ${vault.staked.toFixed(6)} ${vault.token.symbol}`, withdraw)
    _print("");
  }

function tryGetPoolPrices(tokens, prices, pool, chain = "arbitrum"){
  try {
    const poolPrice = getPoolPrices(tokens, prices, pool, chain = "arbitrum")
    return poolPrice;
  }catch(err){
    console.log(pool.address, err);
    return null;
  }
}

async function yearnVaultDeposit(App, vaultToken){
  const signer = await App.provider.getSigner();

  const STAKING_TOKEN = new ethers.Contract(vaultToken.token.address, ERC20_ABI, signer)
  const VAULT_CONTRACT = new ethers.Contract(vaultToken.address, YEARN_TOKEN_ABI, signer)

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

async function yearnVaultWithdraw(App, vaultToken){
  const signer = App.provider.getSigner()
  const VAULT_CONTRACT = new ethers.Contract(vaultToken.address, YEARN_TOKEN_ABI, signer)

  const currentStakedAmount = await VAULT_CONTRACT.balanceOf(App.YOUR_ADDRESS);

  if (currentStakedAmount / 10 ** vaultToken.token.decimals > 0) {
    showLoading()
    VAULT_CONTRACT["withdraw()"]({gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}