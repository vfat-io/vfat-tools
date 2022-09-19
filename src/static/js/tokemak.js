$(function() {
  consoleInit(main)
})

async function main() {
  const App = await init_ethers()

  _print(`Initialized ${App.YOUR_ADDRESS}\n`)
  _print('Reading data...\n')

  _print('')

  const resp = await fetch('https://stats.tokemaklabs.com/')
  const data = await resp.json()
  const mainnet = data.chains.find(item => item.chainId === '1')

  mainnet.pools.forEach(item => {
    if (item.liquidityProviderReward !== '0' && item.liquidityDirectorReward !== '0') {
      _print_bold(`******************** ☢️ ${item.name} ☢️ ********************`)
      _print('')
      _print_reward_title()
      _print(`LP reward : ${parseReward(item.liquidityProviderReward)}`)
      _print(`LD reward : ${parseReward(item.liquidityDirectorReward)}`)

      _print('')
      _print_bold('APRS')
      _print(`LP apr : ${parseApr(item.liquidityProviderApr)}%`)
      _print(`LD apr : ${parseApr(item.liquidityDirectorApr)}%`)
      _print('')
    }
  })

  hideLoading()
}

function parseApr(i) {
  return (parseFloat(i) * 100).toFixed(2)
}

function parseReward(i) {
  return (Math.trunc(parseFloat(i)*100)/100).toLocaleString('en-US')
}


const _print_reward_title = function() {
  if (!logger) {
    logger = document.getElementById('log')
  }

  logger.innerHTML += '<b>REWARDS</b> <i>(expected TOKE allocation for next cycle)</i><br />'
}
