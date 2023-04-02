$(function() {
  consoleInit(main)
})

const siloLensAddress = '0xf12c3758c1ec393704f0db8537ef7f57368d92ea'
const siloLensAbi = [
  {
    inputs: [
      {
        internalType: 'contract ISilo',
        name: '_silo',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_asset',
        type: 'address',
      },
    ],
    name: 'depositAPY',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

const getDepositApy = async (market, asset) => {
  const App = await init_ethers()
  const SILO_LENS = new ethers.Contract(siloLensAddress, siloLensAbi, App.provider)
  let despositApy = await SILO_LENS.depositAPY(market, asset)
  return despositApy
}

let siloIncentivesControllerAddress = '0x6c1603aB6CecF89DD60C24530DdE23F97DA3C229'
let siloIncentivesControllerAbi = [
  {
    inputs: [],
    name: 'DISTRIBUTION_END',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '', type: 'address'}],
    name: 'assets',
    outputs: [
      {
        internalType: 'uint104',
        name: 'emissionPerSecond',
        type: 'uint104',
      },
      {internalType: 'uint104', name: 'index', type: 'uint104'},
      {
        internalType: 'uint40',
        name: 'lastUpdateTimestamp',
        type: 'uint40',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

const getEmissionPerSecAndDistributionEnd = async address => {
  const App = await init_ethers()
  const SiloIncentivesController = new ethers.Contract(
    siloIncentivesControllerAddress,
    siloIncentivesControllerAbi,
    App.provider
  )
  let data = {
    distributionEnd: await SiloIncentivesController.DISTRIBUTION_END(),
    emissionPerSecond: await SiloIncentivesController.assets(address),
  }
  return data
}

const getSiloPriceFromApi = async () => {
  let url = 'https://api.diadata.org/v1/assetQuotation/Ethereum/0x6f80310ca7f2c654691d1383149fa1a57d8ab1f8'
  const opts = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  }
  const resp = await fetch(url, opts)
  const respJson = await resp.json()
  let price = respJson.Price
  return price
}

let siloPrice = 0
const getSiloPrice = async () => {
  if (siloPrice <= 0) {
    siloPrice = await getSiloPriceFromApi()
    return siloPrice
  } else {
    return siloPrice
  }
}

const calculateSiloInsentiveAPY = async (tvl, sToken) => {
  let siloPrice = await getSiloPrice()
  let distributionEndAndemissionPerSecond = await getEmissionPerSecAndDistributionEnd(sToken)
  let distributionEnd = distributionEndAndemissionPerSecond.distributionEnd
  let emissionPerSecond = distributionEndAndemissionPerSecond.emissionPerSecond.emissionPerSecond
  let timeStamp = Math.floor(new Date().getTime() / 1000)
  let xSecDifferance = distributionEnd.sub(timeStamp)
  let emissionPerXSec = emissionPerSecond.mul(60 * 60 * 24 * 365)
  let apy = (((+ethers.utils.formatEther(emissionPerXSec, 18) * siloPrice) / tvl) * 100).toFixed(5)
  return apy
}

const getAllDepositApy = async data => {
  for (let i = 0; i < data.length; i++) {
    let marketAddress = data[i].id
    for (let j = 0; j < data[i].marketAssets.length; j++) {
      let assetAddress = data[i].marketAssets[j].id
      let sToken = data[i].marketAssets[j].sToken
      let sTokenTotalSupply = data[i].marketAssets[j].sTokenTotalSupply
      let sTokensTokenDerivativeConversion = data[i].marketAssets[j].sTokenDerivativeConversion
      let sTokenDecimals = data[i].marketAssets[j].sTokenDecimals
      let assetLastUsdPrice = data[i].marketAssets[j].assetLastUsd

      let tvl =
        +ethers.utils.formatUnits(sTokenTotalSupply, sTokenDecimals) *
        Number(sTokensTokenDerivativeConversion) *
        assetLastUsdPrice
      let depositApy = await getDepositApy(marketAddress, assetAddress)
      data[i].marketAssets[j]['deposit APY'] = (+ethers.utils.formatEther(depositApy, 18) * 100).toFixed(5)
      data[i].marketAssets[j]['Silo APY'] = await calculateSiloInsentiveAPY(tvl, sToken)
    }
    printSiloData(data[i])
  }
}

const getSiloMarketsData = async function() {
  const url =
    'https://gateway.thegraph.com/api/fbf06f34dad21c4df6a9e1f647ba1d16/deployments/id/QmRMtCkaYsizfmoavcE1ULwc2DkG1GZjXDHTwHjXAAH9sp'

  const query = `
   {
      markets(orderBy: totalValueLockedUSD, orderDirection: desc, where: { inputToken_: { activeOracle_not: "null" } }) {
        id
        name
        totalValueLockedUSD
        marketAssets {
         exchangeRate
         sToken {
           id
           lastPriceUSD
           totalSupply
           derivativeConversion
           decimals
         }
         asset {
           id
           name
           lastPriceUSD
         }
         rates {
           id
         }
        }
      }
   }
   `
  const opts = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({query}),
  }

  const resp = await fetch(url, opts)
  const respJson = await resp.json()
  let marketAssets = []
  for (let i = 0; i < respJson.data.markets.length; i++) {
    let marketAddressId = respJson.data.markets[i].id
    let marketAddressName = respJson.data.markets[i].name
    let tvl = respJson.data.markets[i].totalValueLockedUSD
    let data = {
      id: marketAddressId,
      name: marketAddressName,
      totalValueLockedUSD: tvl,
      marketAssets: [],
    }
    for (let j = 0; j < respJson.data.markets[i].marketAssets.length; j++) {
      let assetData = {
        id: respJson.data.markets[i].marketAssets[j].asset.id,
        name: respJson.data.markets[i].marketAssets[j].asset.name,
        sToken: respJson.data.markets[i].marketAssets[j].sToken.id,
        sTokenTotalSupply: respJson.data.markets[i].marketAssets[j].sToken.totalSupply,
        sTokenDerivativeConversion: respJson.data.markets[i].marketAssets[j].sToken.derivativeConversion,
        sTokenDecimals: respJson.data.markets[i].marketAssets[j].sToken.decimals,
        assetLastUsd: respJson.data.markets[i].marketAssets[j].asset.lastPriceUSD,
      }
      data.marketAssets.push(assetData)
    }
    marketAssets.push(data)
  }
  return marketAssets
}

const getSiloBalancerApy = async () => {
  const url = 'https://api.balancer.fi/graphql'

  const query = `
   {
      query: pools(
        where: {id: {contains: "0x48607651416a943bf5ac71c41be1420538e78f87000200000000000000000327"}}
        chainId: 1
      ){
        pools{
          apr{
            min
            max
            protocolApr
          }
        }
      }
    }
    
   `
  const opts = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({query}),
  }

  const resp = await fetch(url, opts)
  const respJson = await resp.json()
  return Number(respJson.data.query.pools[0].apr.max) / 100
}

const getConvexLPPosition = async function() {
  const url = 'https://api.thegraph.com/subgraphs/name/messari/convex-finance-ethereum'
  const query = `
   {
      vaultHourlySnapshots(
        first: 10
        orderBy: timestamp
        orderDirection: desc
        where: {vault: "0xf403c135812408bfbe8713b5a23a04b3d48aae31-129"}
      ) {
        totalValueLockedUSD
        rewardTokenEmissionsUSD
      }
    }
   `
  const opts = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({query}),
  }

  const resp = await fetch(url, opts)
  const respJson = await resp.json()
  let data = respJson.data.vaultHourlySnapshots
  let filterdData = data.filter(i => {
    return i.totalValueLockedUSD > 0
  })
  return filterdData
}

const getFraxMaxApy = async function() {
  const url = 'https://api.frax.finance/pools'
  const opts = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  }
  const resp = await fetch(url, opts)
  const respJson = await resp.json()
  //console.log(respJson)
  for (let i = 0; i < respJson.length; i++) {
    if (respJson[i].pair === 'Convex stkcvxXAIFRAXBP') {
      let max_apy = respJson[i].apy_max
      return max_apy
    }
  }
}

async function main() {
  const App = await init_ethers()
  let siloBalancerApy = await getSiloBalancerApy()
  let data = await getSiloMarketsData()

  _print(`Initialized ${App.YOUR_ADDRESS}\n`)
  _print('Reading smart contracts...\n')

  await getAllDepositApy(data)

  let XAI_FRAXBP_Convex_pool = await getConvexLPPosition()
  _print_bold('XAI / FRAXBP Convex Pool')
  let rewardsTokenEmissionsUSD = XAI_FRAXBP_Convex_pool[0].rewardTokenEmissionsUSD
  let rewardsTotal =
    Number(Number(rewardsTokenEmissionsUSD[0]).toFixed(2)) + Number(Number(rewardsTokenEmissionsUSD[1]).toFixed(2))
  let yearlyRewards = Number(rewardsTotal) * 365
  let totalValueLockedUSD = Number(XAI_FRAXBP_Convex_pool[0].totalValueLockedUSD).toFixed(2)
  let crv_Cvx_APY = (yearlyRewards / Number(totalValueLockedUSD)) * 100
  let max_apy = await getFraxMaxApy()
  let fxs_apy = Number(max_apy) - Number(crv_Cvx_APY)
  let fxs_fess_percentage = 0.17
  let apy = fxs_apy * (1 - fxs_fess_percentage)
  _print(`APY :- ${apy.toFixed(5)}%`)
  _print('')

  _print_bold('SILO / Balancer ')
  _print(`APY :- ${siloBalancerApy.toFixed(5)}%`)

  hideLoading()
}

async function printSiloData(data) {
  for (let i = 0; i < data.marketAssets.length; i++) {
    _print_bold(`${data.name} - ${data.marketAssets[i].name}`)
    _print(`Deposit APY :- ${data.marketAssets[i]['deposit APY']}%`)
    let siloApy = Number(data.marketAssets[i][`Silo APY`])
    if (siloApy > 0) {
      _print(`SILO reward APR :- ${siloApy}%`)
    }
    _print(``)
  }
}
