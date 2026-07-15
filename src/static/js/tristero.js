$(function() {
  consoleInit(main)
})

const TRISTERO_VAULT = "0xB49781E8c39c75f413C1178f395bF68b0BEE8d00"
const AUSD = "0x00000000eFE302BEAA2b3e6e1b18d08D69a9012a"
const SECONDS_PER_YEAR = 365 * 24 * 60 * 60
const DAYS_PER_YEAR = 365

const TRISTERO_VAULT_ABI = [
  "function getTVOL(address asset) view returns (uint256)",
  "function assets(uint256 assetId) view returns (uint256 ratePerSecond, uint256 index, uint256 lastUpdate)"
]

const ERC20_ABI = [
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)"
]

async function main() {
  const App = await init_ethers()
  const vault = new ethers.Contract(TRISTERO_VAULT, TRISTERO_VAULT_ABI, App.provider)
  const token = new ethers.Contract(AUSD, ERC20_ABI, App.provider)
  const assetId = ethers.BigNumber.from(AUSD)

  _print("*************** TRISTERO AUSD MARGIN VAULT ***************")
  _print_href("Open Tristero app", "https://app.tristero.com")
  _print_href("View vault contract", `https://etherscan.io/address/${TRISTERO_VAULT}`)
  _print("Reading Ethereum contracts...\n")

  const [tvol, assetInfo, decimals, symbol, prices] = await Promise.all([
    vault.getTVOL(AUSD),
    vault.assets(assetId),
    token.decimals(),
    token.symbol(),
    lookUpTokenPrices([AUSD])
  ])

  const tokenPrice = getParameterCaseInsensitive(prices, AUSD)?.usd ?? 0
  const assets = Number(ethers.utils.formatUnits(tvol, decimals))
  const tvl = assets * tokenPrice
  const ratePerSecond = Number((assetInfo.ratePerSecond ?? assetInfo[0]).toString())
  const apr = ratePerSecond * SECONDS_PER_YEAR / 1e18 * 100
  const apy = (Math.pow(1 + apr / 100 / DAYS_PER_YEAR, DAYS_PER_YEAR) - 1) * 100

  _print_bold(`TVL: $${formatMoney(tvl)}`)
  _print(`Assets: ${assets.toFixed(6)} ${symbol}`)
  _print(`Asset price: $${tokenPrice.toFixed(6)}`)
  _print(`Configured lender rate: ${ratePerSecond} per second`)
  _print(`APR: ${apr.toFixed(4)}%`)
  _print(`APY: ${apy.toFixed(4)}% (daily compounding)`)
  _print("\nThis page is read-only. The vault uses custom margin-lending accounting rather than VFAT's standard farming interfaces.")

  hideLoading()
}
