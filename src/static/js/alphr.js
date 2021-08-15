$(function() {
  consoleInit(main)
})

const ALPHR_API_BASE_URL = 'https://evm-api.alphr.finance'

async function getALPHRPrice(id_array) {
  const prices = {}
  for (const id_chunk of chunk(id_array, 50)) {
    let ids = id_chunk.join('%2C')
    let res = await $.ajax({
      url: 'https://api.coingecko.com/api/v3/simple/price?ids=' + ids + '&vs_currencies=usd',
      type: 'GET',
    })
    for (const [key, v] of Object.entries(res)) {
      if (v.usd) prices[key] = v
    }
  }
  return prices
}

async function getAPY() {
  let res = await $.ajax({
    url: ALPHR_API_BASE_URL + '/resources/apy',
    type: 'GET',
  })
  return res?.payload
}

async function getAllLiquidity() {
  let res = await $.ajax({
    url: ALPHR_API_BASE_URL + '/resources/positions/total-liquidity',
    type: 'GET',
  })
  return res?.payload
}

async function main() {
  const App = await init_ethers()

  _print(`Initialized ${App.YOUR_ADDRESS}`)
  _print('Reading smart contracts...\n')
  _print(`ALPHR Address: 0xaa99199d1e9644b588796F3215089878440D58e0`)
  _print(`Farming Address: 0xD52c937BE8e8c6165Ce9c2C08113F6Cf336a6011\n`)

  _print('Finished reading smart contracts... Looking up prices... \n')

  // Look up prices
  const prices = await lookUpPrices(['alphr', 'ethereum'])
  const {count, list, total_sum} = await getAllLiquidity()
  const {apy} = await getAPY()
  const ALPHRPrice = prices?.alphr?.usd
  const ETHPrice = prices?.ethereum?.usd
  const tvl = list.reduce((acc, {total_liquidity}) => {
    return acc + Number(total_liquidity) * Math.pow(10, -6)
  }, 0)

  const [yourStake] = list.filter(({user_address}) => {
    return user_address.toLowerCase() === App.YOUR_ADDRESS.toLowerCase()
  })

  let yourStakeProcessed = {
    user_address: App.YOUR_ADDRESS,
    total_liquidity: 0,
    total_liquidity_converted: 0,
  }

  if (yourStake) {
    yourStakeProcessed = {...yourStake}
    yourStakeProcessed.total_liquidity_converted = Number(yourStake.total_liquidity) * Math.pow(10, -6)
  }

  _print('========== PRICES ==========')
  _print(`1 ALPHR    = $${ALPHRPrice}`)
  _print(`1 ETH  = $${ETHPrice}\n`)

  _print('========== STAKING =========')
  _print(`There are total   : ${count} people staking ALPHR/ETH Uniswap V3 NFTs in ALPHR's staking pool.`)
  _print(`                  = ${toDollar(tvl)}\n`)
  _print(
    `You are staking   = ${toDollar(
      yourStakeProcessed.total_liquidity_converted,
      8
    )} ALPHR/ETH Uniswap V3 NFTs (${toFixed(yourStakeProcessed.total_liquidity / total_sum, 3)}% of the pool)`
  )

  _print(`======== ALPHR/ETH REWARDS ========`)
  _print(`APY (unstable)    : ${toFixed(apy)}% \n`)

  _print_link(`Stake/Unstake`, () => {
    window.open('https://alpha.alphr.finance/')
  })

  _print_link(`Add/Remove Liquidity`, () => {
    window.open('https://info.uniswap.org/#/pools/0xbbdf8c6f272a65fe0294ef775b463b43327190d9')
  })

  hideLoading()
}
