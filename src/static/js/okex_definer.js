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
  ],
}
const CONFIG = {
  global: '0xAdD7b91FA4DC452A9C105F218236B28F17562555',
  fin_address: '0x8d3573f24c0aa3819a2f5b02b2985dd82b487715',
  network: 'OEC',
  platform: {
    address: '0x000000000000000000000000000000000000000E',
    symbol: 'OKT',
    decimals: 18,
  },
  YEAR_BLOCKS: 10512000,
}
let finPricePlatform

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

  // token registry
  const COMPTROLLER = new ethers.Contract(tokenRegistryAddress, DEFINER_ABI.tokenRegistry, App.provider)
  let allMarkets = await COMPTROLLER.getTokens()

  // bank
  const accountsContract = new ethers.Contract(accountsAddress, DEFINER_ABI.accounts, App.provider)
  const getBorrowPower = await accountsContract.getBorrowPower(App.YOUR_ADDRESS)
  const getBorrowETH = await accountsContract.getBorrowETH(App.YOUR_ADDRESS)

  _print_bold(`*************** 👨‍🌾 YOUR ADDRESS AREA 👨‍🌾 ***************`)
  _print(`Total   loan  : ${formatMoney(getBorrowETH / 10 ** 18)} (Unit:${CONFIG.platform.symbol})`)
  _print(`Borrow  power : ${formatMoney(getBorrowPower / 10 ** 18)} (Unit:${CONFIG.platform.symbol})`)
  _print_bold(`******************************************************\n`)

  const tokens = await Promise.all(
    allMarkets.map(token =>
      loadTokenData(App, bankAddress, accountsAddress, tokenRegistryAddress, token, App.YOUR_ADDRESS)
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
    printData(market)
  }
  _print_bold(`******************************************************`)

  hideLoading()
}

async function getApr(ratePerBlock, yearBlocks) {
  let apr = (ratePerBlock / Math.pow(10, 18)) * yearBlocks * 100
  return apr
}

async function loadTokenData(App, bank_address, accounts_address, registry_address, token_address, user_address) {
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
  if (token_address.toLowerCase() === CONFIG.platform.address.toLowerCase()) {
    tokenSymbol = CONFIG.platform.symbol
    tokenDecimals = CONFIG.platform.decimals
  } else {
    const erc20Contract = new ethers.Contract(token_address, DEFINER_ABI.erc20, App.provider)
    tokenSymbol = await erc20Contract.symbol()
    tokenDecimals = await erc20Contract.decimals()
  }

  // Fin
  if (CONFIG.fin_address === token_address.toLowerCase()) {
    finPricePlatform = priceRate / 10 ** 18
  }

  // user info
  const depositBalanceCurrent = await accountsContract.getDepositBalanceCurrent(token_address, user_address)
  const borrowBalanceCurrent = await accountsContract.getBorrowBalanceCurrent(token_address, user_address)

  return {
    tokenSymbol: tokenSymbol,
    tokenDecimals: tokenDecimals,

    deposits: currentStatus.deposits,
    depositsPlatform: (currentStatus.deposits / 10 ** 18) * (priceRate / 10 ** 18).toFixed(18),
    depositRatePerBlock: depositRatePerBlock,
    depositApr: depositApr,
    depositeMiningSpeeds: depositeMiningSpeeds,
    depositMiningFin: depositMiningFin,
    depositByUser: depositBalanceCurrent,
    depositUserPct: depositBalanceCurrent / currentStatus.deposits,

    borrows: currentStatus.loans,
    borrowsPlatform: (currentStatus.loans / 10 ** 18) * (priceRate / 10 ** 18).toFixed(18),
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
  }
}

async function printData(data) {
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
