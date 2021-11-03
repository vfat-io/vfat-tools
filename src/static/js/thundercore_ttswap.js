$(function() {
  consoleInit(main)
})

async function main() {
  const App = await init_ethers()

  _print(`Initialized ${App.YOUR_ADDRESS}\n`)

  const TOKEN_PAIRS = INITIAL_TOKENS_CONTEXT[parseInt(window.NETWORKS.THUNDERCORE.chainId)]
  let tokenContracts = {}
  const ttUsdPrice = await getTTUsdFromHuobi()
  let tokenCount = 0
  const statsUrl = `<a href="https://ttswap.space/#/stats" target="_blank">TTSwap Stats</a>`
  const factoryContract = new ethers.Contract(TT_SWAP_FACTORY_ADDRESS, TTSwapFactoryABI, App.provider)

  _print(`For all the information regarding Liquidity / Volume / APR, please visit ${statsUrl}`)
  _print(`TT price: $${ttUsdPrice}`)
  _print(`\n`)
  _print_bold("  Token           ( Circulation supply on ThunderCore / Price )")

  for (const pair of Object.keys(TOKEN_PAIRS)) {
    tokenCount += 1
    tokenContracts[pair] = new ethers.Contract(pair, ERC20_ABI, App.provider)
    const totalSupply = await tokenContracts[pair].totalSupply()
    const rewardToken = new ethers.Contract(pair, ERC20_ABI, App.provider)
    const exchangeAddr = await factoryContract.getExchange(pair)
    const tokenBalance = await rewardToken.balanceOf(exchangeAddr)
    const ttBalance = await App.provider.getBalance(exchangeAddr)
    const rewardTokenPrice = ttBalance
      .mul(ethers.BigNumber.from("10").pow(TOKEN_PAIRS[pair][DECIMALS]))
      .div(tokenBalance)
    const price = ethers.utils
      .parseEther(ttUsdPrice.toString())
      .mul(rewardTokenPrice)
      .div(ethers.BigNumber.from("10").pow(18))
    const formattedPrice = ethers.utils.formatEther(price)
    const spaceCount = 20 - TOKEN_PAIRS[pair][NAME].length - (Math.floor(Math.log10(tokenCount)) - 1)
    let space = ""
    for (let i = 0; i < spaceCount; i++) {
      space += " "
    }

    _print(
      `${tokenCount}. ${TOKEN_PAIRS[pair][NAME]}${space}( ≈ ${formatMoney(
        totalSupply.div(ethers.BigNumber.from("10").pow(TOKEN_PAIRS[pair][DECIMALS]))
      ).replace(/(\.0+|0+)$/, "")} / ${
        formatMoney(formattedPrice) === "0.00" ? "< $0.01" : "$" + formatMoney(formattedPrice).replace(/(\.0+|0+)$/, "")
      } )`
    )
  }

  hideLoading()
}
