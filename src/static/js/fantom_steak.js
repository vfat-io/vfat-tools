$(function() {
    consoleInit(main)
  })

  const STEAK_CHEF_ABI = [{"inputs":[{"internalType":"contract IERC20","name":"_steak","type":"address"},{"internalType":"contract IERC20","name":"_ifusd","type":"address"},{"internalType":"uint256","name":"_steakPerSecond","type":"uint256"},{"internalType":"uint32","name":"_startTime","type":"uint32"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"FeeCollected","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"uint16","name":"_allocPoint","type":"uint16"},{"internalType":"contract IERC20","name":"_stakingToken","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"addSeconds","type":"uint32"}],"name":"changeEndTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"collect","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endTime","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeReceiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"harvestFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ifusd","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingSteak","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"stakingToken","type":"address"},{"internalType":"uint256","name":"stakingTokenTotalAmount","type":"uint256"},{"internalType":"uint256","name":"accSteakPerShare","type":"uint256"},{"internalType":"uint32","name":"lastRewardTime","type":"uint32"},{"internalType":"uint16","name":"allocPoint","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint16","name":"_allocPoint","type":"uint16"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_feeReceiver","type":"address"}],"name":"setFeeReceiver","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_harvestFee","type":"uint256"}],"name":"setHarvestFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_steakPerSecond","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"setSteakPerSecond","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_withdrawFee","type":"uint256"}],"name":"setWithdrawFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startTime","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"steak","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"steakPerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"remainingSteakTokenReward","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
  const IFUSD_ABI = [{"inputs":[{"internalType":"contract IERC20","name":"_fusd","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"_steak","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"},{"indexed":false,"internalType":"uint256","name":"_shares","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_steak","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_token","type":"address"}],"name":"collect","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"components":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"internalType":"struct IiFUSD.Permit","name":"permit","type":"tuple"}],"name":"depositWithPermit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"fusd","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getShareValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_share","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  const XSTEAK_ABI = [{"inputs":[{"internalType":"contract IERC20","name":"_steak","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"_steak","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"},{"indexed":false,"internalType":"uint256","name":"_shares","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_steak","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_token","type":"address"}],"name":"collect","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"components":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"internalType":"struct IxSTEAK.Permit","name":"permit","type":"tuple"}],"name":"depositWithPermit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getShareValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"steak","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_share","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  const USDC_ADDR = '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75'
  const FUSD_ADDR = '0xAd84341756Bf337f5a0164515b1f6F993D194E1f'
  const IFUSD_ADDR = '0x9fC071cE771c7B27b7d9A57C32c0a84c18200F8a'
  const USDC_FUSD_LP_ADDR = '0x679449a920087828776aeEF4074549410D5c8065'
  const STEAK_ADDR = '0x05848B832E872d9eDd84AC5718D58f21fD9c9649'
  const XSTEAK_ADDR = '0xb632c5d42BD4a44a617608Ad1c7d38f597E22E3C'

  const xSteak_deposit = async function(xSteakAbi, xSteakAddress, steakAddress, App) {
      const signer = App.provider.getSigner()

      const STEAK = new ethers.Contract(steakAddress, ERC20_ABI, signer)
      const XSTEAK = new ethers.Contract(xSteakAddress, xSteakAbi, signer)

      const currentTokens = await STEAK.balanceOf(App.YOUR_ADDRESS)
      const allowedTokens = await XSTEAK.allowance(App.YOUR_ADDRESS, xSteakAddress)

      let allow = Promise.resolve()

      if (allowedTokens / 1e18 < currentTokens / 1e18) {
        showLoading()
        allow = STEAK.approve(xSteakAddress, ethers.constants.MaxUint256)
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
            XSTEAK.deposit(currentTokens, {gasLimit: 500000})
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

    const xSteak_withdraw = async function(xSteakAbi, xSteakAddress, App) {
      const signer = App.provider.getSigner()
      const XSTEAK = new ethers.Contract(xSteakAddress, xSteakAbi, signer)

      const balance = await XSTEAK.balanceOf(App.YOUR_ADDRESS)

      if (balance / 1e18 > 0) {
        showLoading()
        const t = await XSTEAK.withdraw(balance, {gasLimit: 500000});
        return App.provider.waitForTransaction(t.hash);
      }
    }

    async function loadXSteak(App, tokens, prices) {
      const signer = App.provider.getSigner()
      const XSTEAK = new ethers.Contract(XSTEAK_ADDR, XSTEAK_ABI, signer)
      const userBalance = (await XSTEAK.balanceOf(App.YOUR_ADDRESS)).toString();

      const steak = await getFantomToken(App, STEAK_ADDR, XSTEAK_ADDR)
      const poolPrices = getPoolPrices(tokens, prices, steak, "fantom");
      const weeklyRewards =  2000 * 7 //Fees are sent manually and vary day-by-day
      const steakPrice = getParameterCaseInsensitive(prices, STEAK_ADDR).usd
      poolPrices.print_price();
      const userStaked = userBalance / 10 ** steak.decimals
      printAPR("STEAK", steakPrice, weeklyRewards, "STEAK", poolPrices.staked_tvl, userStaked, poolPrices.price, 2);
      const ftmscanUrl = `<a href='https://ftmscan.com/address/${XSTEAK_ADDR}' target='_blank'>iFUSD Contract</a>`
      _print(ftmscanUrl)
      const approveAndDeposit = async function() {
        return iFusd_deposit(XSTEAK_ABI, XSTEAK_ADDR, STEAK_ADDR, App)
      }
      const withdraw = async function() {
        return iFusd_withdraw(XSTEAK_ABI, XSTEAK_ADDR, App)
      }
      _print_link(`Deposit ${steak.unstaked.toFixed(2)} STEAK`, approveAndDeposit)
      _print_link(`Withdraw ${(userBalance / 1e18).toFixed(2)} xSTEAK`, withdraw)
      _print(`\n`)
    }

  const iFusd_deposit = async function(iFusdAbi, iFusdAddress, fusdAddress, App) {
    const signer = App.provider.getSigner()

    const FUSD = new ethers.Contract(fusdAddress, ERC20_ABI, signer)
    const IFUSD = new ethers.Contract(iFusdAddress, iFusdAbi, signer)

    const currentTokens = await FUSD.balanceOf(App.YOUR_ADDRESS)
    const allowedTokens = await IFUSD.allowance(App.YOUR_ADDRESS, iFusdAddress)

    let allow = Promise.resolve()

    if (allowedTokens / 1e18 < currentTokens / 1e18) {
      showLoading()
      allow = FUSD.approve(iFusdAddress, ethers.constants.MaxUint256)
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
          IFUSD.deposit(currentTokens, {gasLimit: 500000})
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

  const iFusd_withdraw = async function(iFusdAbi, iFusdAddress, App) {
    const signer = App.provider.getSigner()
    const IFUSD = new ethers.Contract(iFusdAddress, iFusdAbi, signer)

    const balance = await IFUSD.balanceOf(App.YOUR_ADDRESS)

    if (balance / 1e18 > 0) {
      showLoading()
      const t = await IFUSD.withdraw(balance, {gasLimit: 500000})
      return App.provider.waitForTransaction(t.hash)
    }
  }

  async function loadIFusd(App, tokens, prices) {
    const signer = App.provider.getSigner()
    const IFUSD = new ethers.Contract(IFUSD_ADDR, IFUSD_ABI, signer)
    const userBalance = (await IFUSD.balanceOf(App.YOUR_ADDRESS)).toString();

    const fusd = await getFantomToken(App, FUSD_ADDR, IFUSD_ADDR)
    const poolPrices = getPoolPrices(tokens, prices, fusd, "fantom");
    const weeklyRewards =  2000 * 7 //Fees are sent manually and vary day-by-day
    const fusdPrice = getParameterCaseInsensitive(prices, FUSD_ADDR).usd
    poolPrices.print_price();
    const userStaked = userBalance / 10 ** fusd.decimals
    printAPR("FUSD", fusdPrice, weeklyRewards, "FUSD", poolPrices.staked_tvl, userStaked, poolPrices.price, 2);
    const ftmscanUrl = `<a href='https://ftmscan.com/address/${IFUSD_ADDR}' target='_blank'>iFUSD Contract</a>`
    _print(ftmscanUrl)
    const approveAndDeposit = async function() {
      return iFusd_deposit(IFUSD_ABI, IFUSD_ADDR, FUSD_ADDR, App)
    }
    const withdraw = async function() {
      return iFusd_withdraw(IFUSD_ABI, IFUSD_ADDR, App)
    }
    _print_link(`Deposit ${fusd.unstaked.toFixed(2)} FUSD`, approveAndDeposit)
    _print_link(`Withdraw ${(userBalance / 1e18).toFixed(2)} iFUSD`, withdraw)
    _print(`\n`)
  }

  async function main() {
    const App = await init_ethers()

    _print(`Initialized ${App.YOUR_ADDRESS}\n`)
    _print('Reading smart contracts...\n')

    const STEAK_CHEF_ADDR = '0x59cC5f5F9309448Fe4a7Bd2dB8eB2DaC0F8fCEA7'

    const rewardTokenTicker = 'STEAK'
    const STEAK_CHEF = new ethers.Contract(STEAK_CHEF_ADDR, STEAK_CHEF_ABI, App.provider)
    const rewardsPerWeek = ((await STEAK_CHEF.steakPerSecond()) / 1e18) * 604800

    let tokens = {}
    let prices = await getFantomPrices()

    tokens[STEAK_ADDR] = await getFantomToken(App, STEAK_ADDR, STEAK_CHEF_ADDR);
    tokens[FUSD_ADDR] = await getFantomToken(App, FUSD_ADDR, STEAK_CHEF_ADDR);
    tokens[USDC_ADDR] = await getFantomToken(App, USDC_ADDR, STEAK_CHEF_ADDR);

    const USDC_FUSD = await getFantomToken(App, USDC_FUSD_LP_ADDR, STEAK_CHEF_ADDR);
    getPoolPrices(tokens, prices, USDC_FUSD, 'fantom');

    // get iFUSD price from FUSD price
    const IFUSD = new ethers.Contract(IFUSD_ADDR, IFUSD_ABI, App.provider);
    const ifusd_price = await IFUSD.getShareValue() / 1e18 * getParameterCaseInsensitive(prices, FUSD_ADDR)?.usd;
    prices[IFUSD_ADDR] = {'usd': ifusd_price};

    const steakhouse = await loadSteakChefContract(
      App,
      tokens,
      prices,
      STEAK_CHEF,
      STEAK_CHEF_ADDR,
      STEAK_CHEF_ABI,
      rewardTokenTicker,
      'steak',
      null,
      rewardsPerWeek,
      'pendingSteak',
      [3, 4, 5, 6, 7, 8, 9, 1],
      'collect'
    )

    prices = steakhouse.prices

    /* TODO: add xSTEAK */
    await loadIFusd(App, tokens, prices)
    await loadXSteak(App, tokens, prices)

    hideLoading()
  }
