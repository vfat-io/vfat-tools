$(function() {
  consoleInit(main)
})

const DEFINER_ABI = {
  global: [
    {
      constant: true,
      inputs: [],
      name: 'tokenInfoRegistry',
      outputs: [
        {
          internalType: 'contract TokenRegistry',
          name: '',
          type: 'address',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'bank',
      outputs: [
        {
          internalType: 'contract Bank',
          name: '',
          type: 'address',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'accounts',
      outputs: [
        {
          internalType: 'contract Accounts',
          name: '',
          type: 'address',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'savingAccount',
      outputs: [
        {
          internalType: 'contract SavingAccount',
          name: '',
          type: 'address',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
  ],
  tokenRegistry: [
    {
      constant: true,
      inputs: [],
      name: 'getTokens',
      outputs: [
        {
          internalType: 'address[]',
          name: '',
          type: 'address[]',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: 'tokenAddress',
          type: 'address',
        },
      ],
      name: 'priceFromAddress',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'depositeMiningSpeeds',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'borrowMiningSpeeds',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
  ],
  bank: [
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: '_token',
          type: 'address',
        },
      ],
      name: 'getBorrowRatePerBlock',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: '_token',
          type: 'address',
        },
      ],
      name: 'getDepositRatePerBlock',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: '_token',
          type: 'address',
        },
      ],
      name: 'getTokenState',
      outputs: [
        {
          internalType: 'uint256',
          name: 'deposits',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'loans',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'collateral',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
  ],
  accounts: [
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: '_token',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_accountAddr',
          type: 'address',
        },
      ],
      name: 'getDepositBalanceCurrent',
      outputs: [
        {
          internalType: 'uint256',
          name: 'depositBalance',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: '_token',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_accountAddr',
          type: 'address',
        },
      ],
      name: 'getBorrowBalanceCurrent',
      outputs: [
        {
          internalType: 'uint256',
          name: 'borrowBalance',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: '_borrower',
          type: 'address',
        },
      ],
      name: 'getBorrowPower',
      outputs: [
        {
          internalType: 'uint256',
          name: 'power',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: '_accountAddr',
          type: 'address',
        },
      ],
      name: 'getBorrowETH',
      outputs: [
        {
          internalType: 'uint256',
          name: 'borrowETH',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
  ],
  erc20: [
    {
      constant: true,
      inputs: [],
      name: 'symbol',
      outputs: [{internalType: 'string', name: '', type: 'string'}],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'decimals',
      outputs: [{internalType: 'uint8', name: '', type: 'uint8'}],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          name: '',
          type: 'address',
        },
        {
          name: '',
          type: 'address',
        },
      ],
      name: 'allowance',
      outputs: [
        {
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          name: '',
          type: 'address',
        },
      ],
      name: 'balanceOf',
      outputs: [
        {
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          name: '_spender',
          type: 'address',
        },
        {
          name: '_value',
          type: 'uint256',
        },
      ],
      name: 'approve',
      outputs: [
        {
          name: 'success',
          type: 'bool',
        },
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
  savingAccounts: [
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: '_token',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '_amount',
          type: 'uint256',
        },
      ],
      name: 'deposit',
      outputs: [],
      payable: true,
      stateMutability: 'payable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: '_token',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '_amount',
          type: 'uint256',
        },
      ],
      name: 'withdraw',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: '_token',
          type: 'address',
        },
      ],
      name: 'withdrawAll',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
}
const CONFIG = {
  global: '0x8dceE8E1555e1881fB16a546E86310aB573a6808',
  fin_address: '0x576c990a8a3e7217122e9973b2230a3be9678e94',
  network: 'Polygon',
  platform: {
    address: '0x000000000000000000000000000000000000000E',
    symbol: 'MATIC',
    decimals: 18,
  },
  YEAR_BLOCKS: 15768000,
  minGas: 10 ** 18,
  MAX_VAL: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
}
let finPricePlatform
let savingAccountsAddress
let borrowETH
let borrowPower

async function main() {
  const App = await init_ethers()
  _print(`Initialized your address (${App.YOUR_ADDRESS}) on ${CONFIG.network}\n`)
  _print('Reading smart contracts...\n')

  // 获取全部的市场Tokens
  const global = new ethers.Contract(CONFIG.global, DEFINER_ABI.global, App.provider)

  // get contract address
  const tokenRegistryAddress = await global.tokenInfoRegistry()
  const bankAddress = await global.bank()
  const accountsAddress = await global.accounts()
  const savingAccountAddress = await global.savingAccount()
  savingAccountsAddress = savingAccountAddress

  // token registry
  const COMPTROLLER = new ethers.Contract(tokenRegistryAddress, DEFINER_ABI.tokenRegistry, App.provider)
  let allMarkets = await COMPTROLLER.getTokens()

  // bank
  const accountsContract = new ethers.Contract(accountsAddress, DEFINER_ABI.accounts, App.provider)
  borrowPower = await accountsContract.getBorrowPower(App.YOUR_ADDRESS)
  borrowETH = await accountsContract.getBorrowETH(App.YOUR_ADDRESS)
  _print_bold(`*************** 👨‍🌾 YOUR ADDRESS AREA 👨‍🌾 ***************`)
  _print(`Total   loan  : ${formatMoney(borrowETH / 10 ** 18)} (Unit:${CONFIG.platform.symbol})`)
  _print(`Borrow  power : ${formatMoney(borrowPower / 10 ** 18)} (Unit:${CONFIG.platform.symbol})`)
  _print_bold(`******************************************************\n`)

  const tokens = await Promise.all(
    allMarkets.map(token =>
      loadTokenData(App, bankAddress, accountsAddress, savingAccountAddress, tokenRegistryAddress, token)
    )
  )

  tokens.forEach(element => {
    element.depositMiningApr =
      element.depositsPlatform === 0
        ? 0
        : ((element.depositMiningFin * finPricePlatform) / element.depositsPlatform) * 100
    element.borrowMiningApr =
      element.borrowsPlatform === 0 ? 0 : ((element.borrowMiningFin * finPricePlatform) / element.borrowsPlatform) * 100
  })

  // 合计的值
  let [totalSupply, totalBorrow, totalCash] = [0, 0, 0]

  for (const market of tokens) {
    totalSupply += market.depositsPlatform
    totalBorrow += market.borrowsPlatform
    totalCash += market.collateralPlatform
  }

  _print_bold(`***************** 👨‍🌾 MARKET AREA 👨‍🌾 *****************`)
  _print_bold(`Deposit  Market  Size    : ${formatMoney(totalSupply)} ${CONFIG.platform.symbol}`)
  _print_bold(`Borrow   Market  Size    : ${formatMoney(totalBorrow)} ${CONFIG.platform.symbol}`)
  _print_bold(`Total    Value   Locked  : ${formatMoney(totalCash)} ${CONFIG.platform.symbol}`)
  _print('')

  for (const market of tokens) {
    printData(market, App)
  }
  _print_bold(`******************************************************`)

  hideLoading()
}

async function getApr(ratePerBlock, yearBlocks) {
  let apr = (ratePerBlock / Math.pow(10, 18)) * yearBlocks * 100
  return apr
}

async function loadTokenData(
  App,
  bank_address,
  accounts_address,
  saving_accounts_address,
  registry_address,
  token_address
) {
  // Contract
  const bankContract = new ethers.Contract(bank_address, DEFINER_ABI.bank, App.provider)
  const accountsContract = new ethers.Contract(accounts_address, DEFINER_ABI.accounts, App.provider)
  const tokenRegistryContract = new ethers.Contract(registry_address, DEFINER_ABI.tokenRegistry, App.provider)

  // token APR
  const depositRatePerBlock = await bankContract.getDepositRatePerBlock(token_address)
  const borrowRatePerBlock = await bankContract.getBorrowRatePerBlock(token_address)
  const depositApr = await getApr(depositRatePerBlock, CONFIG.YEAR_BLOCKS)
  const borrowApr = await getApr(borrowRatePerBlock, CONFIG.YEAR_BLOCKS)

  // Mining
  const depositeMiningSpeeds = await tokenRegistryContract.depositeMiningSpeeds(token_address)
  const borrowMiningSpeeds = await tokenRegistryContract.borrowMiningSpeeds(token_address)
  const priceRate = await tokenRegistryContract.priceFromAddress(token_address)
  const depositMiningFin = (depositeMiningSpeeds * CONFIG.YEAR_BLOCKS) / 10 ** 18
  const borrowMiningFin = (borrowMiningSpeeds * CONFIG.YEAR_BLOCKS) / 10 ** 18

  // token status
  const currentStatus = await bankContract.getTokenState(token_address)

  // token info
  let tokenSymbol, tokenDecimals
  let isApprove = false
  let addressBalance, addressAvailableBalance
  if (token_address.toLowerCase() === CONFIG.platform.address.toLowerCase()) {
    tokenSymbol = CONFIG.platform.symbol
    tokenDecimals = CONFIG.platform.decimals
    addressBalance = await App.provider.getBalance(App.YOUR_ADDRESS)
    addressAvailableBalance = addressBalance - CONFIG.minGas > 0 ? (addressBalance - CONFIG.minGas).toFixed(0) : 0
    isApprove = true
  } else {
    const erc20Contract = new ethers.Contract(token_address, DEFINER_ABI.erc20, App.provider)
    tokenSymbol = await erc20Contract.symbol()
    tokenDecimals = await erc20Contract.decimals()
    addressBalance = await erc20Contract.balanceOf(App.YOUR_ADDRESS)
    addressAvailableBalance = addressBalance

    const approveValue = await erc20Contract.allowance(App.YOUR_ADDRESS, saving_accounts_address)
    isApprove = approveValue - addressBalance > 0
  }
  // Fin
  if (CONFIG.fin_address === token_address.toLowerCase()) {
    finPricePlatform = priceRate / 10 ** 18
  }

  // user info
  const depositBalanceCurrent = await accountsContract.getDepositBalanceCurrent(token_address, App.YOUR_ADDRESS)
  const borrowBalanceCurrent = await accountsContract.getBorrowBalanceCurrent(token_address, App.YOUR_ADDRESS)

  return {
    tokenAddress: token_address,
    tokenSymbol: tokenSymbol,
    tokenDecimals: tokenDecimals,

    deposits: currentStatus.deposits,
    depositsPlatform: (currentStatus.deposits / 10 ** tokenDecimals) * (priceRate / 10 ** 18).toFixed(18),
    depositRatePerBlock: depositRatePerBlock,
    depositApr: depositApr,
    depositeMiningSpeeds: depositeMiningSpeeds,
    depositMiningFin: depositMiningFin,
    depositByUser: depositBalanceCurrent,
    depositUserPct: depositBalanceCurrent / currentStatus.deposits,

    borrows: currentStatus.loans,
    borrowsPlatform: (currentStatus.loans / 10 ** tokenDecimals) * (priceRate / 10 ** 18).toFixed(18),
    borrowRatePerBlock: borrowRatePerBlock,
    borrowApr: borrowApr,
    borrowMiningSpeeds: borrowMiningSpeeds,
    borrowMiningFin: borrowMiningFin,
    borrowByUser: borrowBalanceCurrent,
    borrowUserPct: borrowBalanceCurrent / currentStatus.loans,

    priceRate: priceRate,
    pricePlatform: (priceRate / 10 ** 18).toFixed(18),
    collateral: currentStatus.collateral,
    collateralPlatform: (currentStatus.collateral / 10 ** 18) * (priceRate / 10 ** 18).toFixed(18),

    isApprove: isApprove,
    userBalance: addressBalance,
    userAvailableBalance: addressAvailableBalance,
  }
}

// Approve
async function approve(App, token_address) {
  // showLoading()
  const signer = App.provider.getSigner()
  const erc20Contract = new ethers.Contract(token_address, DEFINER_ABI.erc20, signer)
  erc20Contract
    .approve(savingAccountsAddress, CONFIG.MAX_VAL)
    .then(function(t) {
      return App.provider.waitForTransaction(t.hash)
    })
    .catch(function(err) {
      console.error(err)
      hideLoading()
      alert('Error! Please try again.')
    })
}

// deposit
async function deposit(App, data) {
  // showLoading()
  if (data.userAvailableBalance <= 0) {
    return alert('Insufficient balance')
  }
  const signer = App.provider.getSigner()
  const savingAccountContract = new ethers.Contract(savingAccountsAddress, DEFINER_ABI.savingAccounts, signer)
  console.log(data, data.userAvailableBalance)
  savingAccountContract
    .deposit(data.tokenAddress, data.userAvailableBalance, {
      value:
        data.tokenAddress.toLowerCase() === CONFIG.platform.address.toLowerCase() ? data.userAvailableBalance : '0',
    })
    .then(function(t) {
      return App.provider.waitForTransaction(t.hash)
    })
    .catch(function(err) {
      console.error(err)
      hideLoading()
      alert('Error! Please try again.')
    })
}

async function withdraw(App, data) {
  // showLoading()
  if (data.depositByUser <= 0) {
    return alert('Insufficient balance')
  }
  const signer = App.provider.getSigner()
  const savingAccountContract = new ethers.Contract(savingAccountsAddress, DEFINER_ABI.savingAccounts, signer)

  if (borrowETH <= 0) {
    savingAccountContract
      .withdrawAll(data.tokenAddress)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function(err) {
        console.error(err)
        hideLoading()
        alert('Error! Please try again.')
      })
  } else {
    let activeAmount = (borrowPower - borrowETH) / data.priceRate
    savingAccountContract
      .withdraw(data.tokenAddress, (activeAmount * 10 ** data.tokenDecimals).toFixed(0))
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function(err) {
        console.error(err)
        hideLoading()
        alert('Error! Please try again.')
      })
  }
}

async function printData(data, App) {
  // _print_bold(`${data.tokenSymbol} ($${formatMoney(data.underlyingPrice)})`)
  _print_bold(`${data.tokenSymbol}`)
  _print(`Deposit Market  Size    : ${formatMoney(data.deposits / 10 ** data.tokenDecimals)} ${data.tokenSymbol}`)
  _print(`Borrow  Market  Size    : ${formatMoney(data.borrows / 10 ** data.tokenDecimals)} ${data.tokenSymbol}`)
  _print(`Total   Value   Locked  : ${formatMoney(data.collateral / 10 ** data.tokenDecimals)} ${data.tokenSymbol}`)
  _print(`Deposit APR             : ${data.depositApr.toFixed(2)}% `)
  _print(`Deposit Mining  APR     : ${data.depositMiningApr.toFixed(2)}% `)
  _print(`Deposit Net  APR        : ${(data.depositApr + data.depositMiningApr).toFixed(2)}% `)
  _print(`Borrow  APR             : ${data.borrowApr.toFixed(2)}%`)
  _print(`Borrow  Mining  APR     : ${data.borrowMiningApr.toFixed(2)}% `)
  _print(`Borrow  Net  APR        : ${(data.borrowApr - data.borrowMiningApr).toFixed(2)}% `)
  if (!data.isApprove) {
    _print_link(`Approve ${data.tokenSymbol}`, () => {
      approve(App, data.tokenAddress)
    })
  }
  const approveDes = data.isApprove ? '' : `(Need Approval)`
  _print_link(
    `Deposit ${formatMoney(data.userAvailableBalance / 10 ** data.tokenDecimals)} ${data.tokenSymbol} ${approveDes}`,
    () => {
      deposit(App, data)
    }
  )
  _print_link(`Withdraw ${formatMoney(data.depositByUser / 10 ** data.tokenDecimals)} ${data.tokenSymbol}`, () => {
    withdraw(App, data)
  })
  if (data.depositByUser > 0) {
    _print(
      `You are Deposit ${formatMoney(data.depositByUser / 10 ** data.tokenDecimals)} ${
        data.tokenSymbol
      }, ${data.depositUserPct.toFixed(4)}% of the pool.`
    )
    _print(`Estimated Deposit earnings : `)
    _print(
      `                              + ${formatMoney(
        (((data.depositByUser / 10 ** data.tokenDecimals) * data.depositApr) / 100).toFixed(6)
      )} ${data.tokenSymbol} / Year`
    )
    _print(
      `                              + ${formatMoney(
        (
          ((((data.depositByUser / 10 ** data.tokenDecimals) * data.depositMiningApr) / 100) * data.pricePlatform) /
          finPricePlatform
        ).toFixed(6)
      )} FIN / Year`
    )
  }
  if (data.borrowByUser > 0) {
    _print(
      `You are borrowing ${formatMoney(data.borrowByUser / 10 ** data.tokenDecimals)} ${
        data.tokenSymbol
      }, ${data.borrowUserPct.toFixed(4)}% of the pool.`
    )
    _print(`Estimated Borrow earnings : `)
    _print(
      `                              - ${formatMoney(
        (((data.borrowByUser / 10 ** data.tokenDecimals) * data.borrowApr) / 100).toFixed(6)
      )} ${data.tokenSymbol} / Year`
    )
    _print(
      `                              + ${formatMoney(
        (
          ((((data.borrowByUser / 10 ** data.tokenDecimals) * data.borrowMiningApr) / 100) * data.pricePlatform) /
          finPricePlatform
        ).toFixed(6)
      )} FIN / Year`
    )
  }
  _print('')
}
