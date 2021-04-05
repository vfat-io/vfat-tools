
$(function() {
    consoleInit();
    start(main);
  });

  const FARM_ABI = [{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"cashout","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"claimYield","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"depositYield","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"setWeeksRewards","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"},{"name":"minNuts","type":"uint256"},{"name":"percentBurnt","type":"uint256"}],"name":"sweepNuts","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[{"name":"newGov","type":"address"}],"name":"updateGovenance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"withdrawAfterSystemClosed","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"farmer","type":"address"}],"name":"dividendsOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastDripTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"farmer","type":"address"}],"name":"nutsDividendsOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"nutsPayoutsTo","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nutsPerEpoch","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nutsProfitPerShare","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"payoutEndTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"payoutsTo","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pendingNutsAlloc","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"profitPerShare","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalDeposits","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];

  const VAULT_ABI = [{"constant":false,"inputs":[{"name":"amount","type":"uint128"}],"name":"cashout","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"claimYield","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"depositYield","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pullOutstandingDivs","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"setWeeksRewards","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"},{"name":"minNuts","type":"uint256"},{"name":"percentBurnt","type":"uint256"}],"name":"sweepNuts","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"name":"farmer","type":"address"}],"name":"cakeBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastDripTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastMooValue","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastTotalCake","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"farmer","type":"address"}],"name":"mooBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nutsCompPerCake","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"farmer","type":"address"}],"name":"nutsDividendsOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"nutsPayoutsTo","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nutsPerEpoch","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nutsProfitPerShare","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"payoutEndTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pendingNutsAlloc","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"players","outputs":[{"name":"balance","type":"uint128"},{"name":"playersCake","type":"uint128"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalCake","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalCakeBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalDeposits","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];

  const TOKEN_ABI = [{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}];

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    await loadSquirrelContracts(App);
    hideLoading();
  }

  async function loadSquirrelContracts(App) {
      _print(`Showing incentivized pools only.\n`);

      const prices = await getBscPrices();
      const tokens = {};
      tokens["0x8893D5fA71389673C5c4b9b3cb4EE1ba71207556"] = await getBscToken(App, "0x8893D5fA71389673C5c4b9b3cb4EE1ba71207556", "0x03d9d14367127d477e6f340c59e57ab088220187");
      tokens["0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"] = await getBscToken(App, "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", "0x03d9d14367127d477e6f340c59e57ab088220187");


      // NUTS-BNB LP FARM
      const lpPool = await getBscToken(App, "0x034c9e6b08c09a6144e0d0e52161338fb105e656", "0x03d9d14367127d477e6f340c59e57ab088220187");
      const lpPrices = await getPoolPrices(tokens, prices, lpPool, "bsc");
      lpPrices.print_price();

      const signer = App.provider.getSigner();
      const NUTS_LP_POOL = new ethers.Contract("0x03d9d14367127d477e6f340c59e57ab088220187", FARM_ABI, signer);
      const userStaked = await NUTS_LP_POOL.balances(App.YOUR_ADDRESS) / 1e18;
      const nutsPrice = prices["0x8893D5fA71389673C5c4b9b3cb4EE1ba71207556"].usd;
      printAPR("NUTS", nutsPrice, 12000, lpPrices.stakeTokenTicker, lpPrices.staked_tvl, userStaked, lpPrices.price);

      const NUTS_LP_TOKEN = new ethers.Contract("0x034c9e6b08c09a6144e0d0e52161338fb105e656", TOKEN_ABI, signer);
      printFarmActions(App, NUTS_LP_POOL, NUTS_LP_TOKEN, userStaked, lpPrices.stakeTokenTicker, nutsPrice, false, false);


      // NUTS FARM
      const nutsPool = await getBscToken(App, "0x8893D5fA71389673C5c4b9b3cb4EE1ba71207556", "0x45c12738c089224f66cd7a1c85301d79c45e2ded");
      const nutsPrices = await getPoolPrices(tokens, prices, nutsPool, "bsc");
      nutsPrices.print_price();
      _print(`Estimated APR: 300% (varies from TVL & NUTS price)`)

      const NUTS_POOL = new ethers.Contract("0x45c12738c089224f66cd7a1c85301d79c45e2ded", FARM_ABI, signer);
      const userNutsStaked = await NUTS_POOL.balances(App.YOUR_ADDRESS) / 1e18;

      const usersPercent = userNutsStaked / nutsPool.staked * 100;
      _print(`You are staking ${userNutsStaked.toFixed(2)} NUTS ($${formatMoney(userNutsStaked*nutsPrice)}), ${usersPercent.toFixed(2)}% of the pool.`)

      const NUTS_TOKEN = new ethers.Contract("0x8893D5fA71389673C5c4b9b3cb4EE1ba71207556", TOKEN_ABI, signer);
      printFarmActions(App, NUTS_POOL, NUTS_TOKEN, userNutsStaked, "NUTS", nutsPrice, true, true);


      // OTHER FARMS
      await outputVault(App, tokens, prices, signer, nutsPrice, "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82", "0xdfd040cd6b1d7f15cad3094e3b49dc542fea77c1", "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",  110, "CAKE", true);
      await outputVault(App, tokens, prices, signer, nutsPrice, "0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95", "0x31fe02b9ea5501bfe8a872e205dfe6b6a79435ed", "0xF397A390f008dbfC0fE995d9754acd8d137AA8dd",  240, "BANANA", true);
      await outputVault(App, tokens, prices, signer, nutsPrice, "0x7979F6C54ebA05E18Ded44C4F986F49a5De551c2", "0x55d1905c72365dcef69f9a7c890a26a2e3fc4c41", "0x25fd42D82d5c238ee7AA277261AA6CA5BDFE5CD4",  160, "KEBAB", true);

      await outputFarm(App, tokens, prices, signer, nutsPrice, "0xa184088a740c695E156F91f5cC086a06bb78b827", "0x968c84d90bd4e1307333c7f98074d1b7caac497b", "0x4d0228EBEB39f6d2f29bA528e2d15Fc9121Ead56", 200, "AUTO", false);
      await outputFarm(App, tokens, prices, signer, nutsPrice, "0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5", "0xa9c72f556c1059500cf514ed10955bceaf227c4c", "0xc2Eed0F5a0dc28cfa895084bC0a9B8B8279aE492", 100, "BAKE", false);

      await outputFarm(App, tokens, prices, signer, nutsPrice, "0xF952Fc3ca7325Cc27D15885d37117676d25BfdA6", "0x7456d4bda37d2aa5177ca1d8a494a318633b1fef", "0xF952Fc3ca7325Cc27D15885d37117676d25BfdA6",  180, "EGG", true);
      await outputFarm(App, tokens, prices, signer, nutsPrice, "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82", "0x4d41a547cce57348e83493be0f4552a924e623a1", "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",  100, "BRY", false);
  }


  async function outputVault(App, tokens, prices, signer, nutsPrice, token, pool, lpToken, nativeAPR, nativeRewardTicker, canCompound) {
      tokens[token] = await getBscToken(App, token, pool);

      if (lpToken != token) { // Load some missing tokens price from LP
          const lpPoolData = await getBscToken(App, lpToken, pool);
          await getPoolPrices(tokens, prices, lpPoolData, "bsc");
      }

      const POOL = new ethers.Contract(pool, VAULT_ABI, signer);
      tokens[token].staked = await POOL.totalCake() / 1e18;

      const tokenPrices = await getPoolPrices(tokens, prices, tokens[token], "bsc");
      tokenPrices.print_price();

      const userStaked = await POOL.cakeBalance(App.YOUR_ADDRESS) / 1e18;
      printCombinedAPR(nutsPrice, 5000, tokenPrices.stakeTokenTicker, tokenPrices.staked_tvl, userStaked, tokenPrices.price, nativeAPR, nativeRewardTicker);

      const TOKEN = new ethers.Contract(token, TOKEN_ABI, signer);
      printFarmActions(App, POOL, TOKEN, userStaked, tokenPrices.stakeTokenTicker, nutsPrice, canCompound, false, true, 2, nativeRewardTicker);
  }


  async function outputFarm(App, tokens, prices, signer, nutsPrice, token, lpPool, lpToken, nativeAPR, nativeRewardTicker, canCompound) {
      tokens[token] = await getBscToken(App, token, lpPool);
      const lpPoolData = await getBscToken(App, lpToken, lpPool);

      const LP_POOL = new ethers.Contract(lpPool, FARM_ABI, signer);
      lpPoolData.staked = await LP_POOL.totalDeposits() / 1e18;

      const lpPrices = await getPoolPrices(tokens, prices, lpPoolData, "bsc");
      lpPrices.print_price();

      const userStaked = await LP_POOL.balances(App.YOUR_ADDRESS) / 1e18;
      printCombinedAPR(nutsPrice, 5000, lpPrices.stakeTokenTicker, lpPrices.staked_tvl, userStaked, lpPrices.price, nativeAPR, nativeRewardTicker);

      const LP_TOKEN = new ethers.Contract(lpToken, TOKEN_ABI, signer);
      printFarmActions(App, LP_POOL, LP_TOKEN, userStaked, lpPrices.stakeTokenTicker, nutsPrice, canCompound, false, false, 1, nativeRewardTicker);
  }


  async function printFarmActions(App, farm, token, userStaked, poolTicker, nutsPrice, canCompound, canApproveAndCall, isVault, rewardStructure, nativeRewardTicker) {
      const usersBalance = await token.balanceOf(App.YOUR_ADDRESS);

      var pendingReward;
      if (rewardStructure == 2) {
          pendingReward = await farm.nutsDividendsOf(App.YOUR_ADDRESS) / 1e18;
      } else {
          pendingReward = await farm.dividendsOf(App.YOUR_ADDRESS) / 1e18;
      }

      const approveAndStake = async function() {
          if (canApproveAndCall) { // Token supports single tx approveAndCall
              return approveAndCall(App, farm, token, usersBalance);
          } else {
              return deposit(App, farm, token, usersBalance, isVault);
          }
      }
      const unstake = async function() {
          return cashout(App, farm, isVault);
      }
      const compound = async function() {
          return depositYield(App, farm);
      }
      const harvest = async function() {
          return claimYield(App, farm);
      }

      _print_link(`Stake ${(usersBalance / 1e18).toFixed(2)} ${poolTicker}`, approveAndStake)
      _print_link(`Unstake ${userStaked.toFixed(2)} ${poolTicker}`, unstake)

      var compoundString = `Compound ${pendingReward.toFixed(2)} NUTS ($${formatMoney(pendingReward*nutsPrice)})`;
      var harvestString = `Harvest ${pendingReward.toFixed(2)} NUTS ($${formatMoney(pendingReward*nutsPrice)})`
      if (rewardStructure == 1) {
          const nutsRewards = await farm.nutsDividendsOf(App.YOUR_ADDRESS) / 1e18;
          compoundString = `Compound ${pendingReward.toFixed(2)} ${nativeRewardTicker} + ${nutsRewards.toFixed(2)} NUTS`;
          harvestString = `Harvest ${pendingReward.toFixed(2)} ${nativeRewardTicker} + ${nutsRewards.toFixed(2)} NUTS`;
      }

      if (canCompound) {
          _print_link(compoundString, compound)
      }
      _print_link(harvestString, harvest)
      _print(`Unstaking also harvests rewards.\n`)
  }


  async function printCombinedAPR(rewardPrice, poolRewardsPerWeek, stakeTokenTicker, staked_tvl, userStaked, poolTokenPrice, nativeAPR, nativeRewardTicker) {
      var usdPerWeek = poolRewardsPerWeek * rewardPrice;
      _print(`NUTS Per Week: ${poolRewardsPerWeek.toFixed(2)} ($${formatMoney(usdPerWeek)})`);
      var yearlyAPR = (usdPerWeek / staked_tvl * 100) * 52;
      _print(`APR: ~${nativeAPR}% ${nativeRewardTicker} + ${yearlyAPR.toFixed(2)}% NUTS`);
      var userStakedUsd = userStaked * poolTokenPrice;
      var userStakedPct = userStakedUsd / staked_tvl * 100;
      _print(`You are staking ${userStaked.toFixed(2)} ${stakeTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
  }


  async function approveAndCall(App, farm, token, unstaked) {
      const userNuts = await token.balanceOf(App.YOUR_ADDRESS);
      let allow = Promise.resolve()
      showLoading()
      allow = token.approveAndCall(farm.address, userNuts, [], {gasLimit: 200000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function(e) {
          console.log(e);
          hideLoading()
          alert('Try resetting your approval to 0 first')
        })
  }


  async function deposit(App, farm, token, unstaked, isVault) {
      const allowedTokens = await token.allowance(App.YOUR_ADDRESS, farm.address)

      let allow = Promise.resolve()

      if (allowedTokens / 1e18 < unstaked) {
        showLoading()
        allow = token.approve(farm.address, ethers.constants.MaxUint256)
          .then(function(t) {
            return App.provider.waitForTransaction(t.hash)
          })
          .catch(function(e) {
              console.log(e);
            hideLoading()
            alert('Try resetting your approval to 0 first')
          })
      }

      var gas = {gasLimit: 540000}
      if (isVault) {
          gas = {gasLimit: 840000}
      }

      if (unstaked / 1e18 > 0) {
        showLoading()
        allow
          .then(async function() {
              farm.deposit(unstaked, gas)
              .then(function(t) {
                App.provider.waitForTransaction(t.hash).then(function() {
                  hideLoading()
                })
              })
              .catch(function(e) {
                   console.log(e);
                hideLoading()
                _print('Something went wrong.')
              })
          })
          .catch(function(e) {
               console.log(e);
            hideLoading()
            _print('Something went wrong.')
          })
      } else {
        alert('You have no tokens to stake!!')
      }
  }


  async function cashout(App, farm, isVault) {
      var userStaked;
      var gas = {gasLimit: 540000}
      if (isVault) {
           gas = {gasLimit: 840000}
           const playerData = await farm.players(App.YOUR_ADDRESS);
           userStaked = playerData[0];
      } else {
          userStaked = await farm.balances(App.YOUR_ADDRESS);
      }
      farm.cashout(userStaked.toString(), gas)
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function(e) {
          hideLoading()
        })
  };


  async function depositYield(App, farm) {
      farm.depositYield()
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function(e) {
          hideLoading()
        })
  };


  async function claimYield(App, farm) {
      farm.claimYield()
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function(e) {
          hideLoading()
        })
  };
