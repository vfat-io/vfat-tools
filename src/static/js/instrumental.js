$(function() {
  consoleInit(main)
})

async function main() {
  const lockStrategy = {
    address: '0x62ae88697782f474b2537b890733cc15d3e01f1d',
    name: 'Locking contract',
    link: 'https://app.instrumental.finance/lock',
    abi: INSTRUMENTAL_ABI,
  }
  const stakingStrategy = {
    address: '0xc5124896459d3c219be821d1a9146cd51e4bc759',
    name: 'Liquidity mining',
    link: 'https://app.instrumental.finance/',
    abi: INSTRUMENTAL_ABI_LP,
  }

  const App = await init_ethers()

  _print(`Initialized ${App.YOUR_ADDRESS}`)
  _print('Reading smart contracts...\n')
  _print(`\n`)

  _print(`------------------ Info ------------------`)
  _print(`<a target="_blank" href="https://app.instrumental.finance">App</a>`)
  _print(`<a target="_blank" href="https://medium.com/@instrumentalfinance">Medium</a>`)
  _print(`<a target="_blank" href="https://twitter.com/InstrumentalFi">Twitter</a>`)
  _print(`<a target="_blank" href="https://discord.com/invite/x26VhqFS">Discord</a>`)
  _print(`\n`)

  _print(`------------------ Contracts ------------------`)

  await loadLocking(App, lockStrategy)
  await loadStaking(App, stakingStrategy)

  hideLoading()
}

async function loadLocking(App, lockStrategy) {
  _print(`<a target="_blank" href="${lockStrategy.link}">${lockStrategy.name}</a>`)

  const strategy = new ethers.Contract(lockStrategy.address, lockStrategy.abi, App.provider)

  const tokenAddress = await strategy.token()
  const tokenName = await strategy.name()
  const tokenSymbol = await strategy.symbol()
  const tokenSupply = (await strategy.supply()) / 10 ** 18
  const epoch = await strategy.epoch()

  _print(`Token address: ${tokenAddress}  (${tokenName} - ${tokenSymbol})`)
  _print(`Token supply: ${tokenSupply}`)
  _print(`Epoch: ${epoch}`)

  _print(`---------- Current APY ----------`)
  _print(`1 month lock-up: >833%`)
  _print(`3 months lock-up: >2500%`)
  _print(`6 months lock-up: >7500%`)
  _print(`12 months lock-up: >9500%`)
  _print(`24 months lock-up: >12500%`)

  _print(`<a target="_blank" href="${lockStrategy.link}">  ---> Participate </a>`)

  _print(`\n`)
}

async function loadStaking(App, stakingStrategy) {
  _print(`<a target="_blank" href="${stakingStrategy.link}">${stakingStrategy.name}</a>`)

  const strategy = new ethers.Contract(stakingStrategy.address, stakingStrategy.abi, App.provider)

  const poolLength = await strategy.poolLength()
  for (var i = 0; i < poolLength; i++) {
    const poolInfo = await strategy.poolInfo(i)
    _print(`---------- Pool ${i + 1} ----------`)
    console.log(`asdasdasdasd `, JSON.stringify(poolInfo))
    _print(`STRM per share: ${poolInfo[0] / 10 ** 18} `)
    _print(`Last reward block: ${poolInfo[1]} `)
    _print(`End timestmap: ${poolInfo[2]} `)
    _print(`Locked: ${poolInfo[3]} `)
    _print(`STRM per block: ${poolInfo[4] / 10 ** 18} `)
    _print(`Supply: ${poolInfo[5] / 10 ** 18} `)
    _print(`\n`)
  }

  _print(`<a target="_blank" href="${stakingStrategy.link}">  ---> Participate </a>`)

  _print(`\n`)
}
