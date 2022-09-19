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
      _print(`LP reward : ${parse(item.liquidityProviderReward, 3)}`)
      _print(`LD reward : ${parse(item.liquidityDirectorReward, 3)}`)

      _print('')
      _print_bold('APRS')
      _print(`LP apr : ${parse(item.liquidityProviderApr, 2)}%`)
      _print(`LD apr : ${parse(item.liquidityDirectorApr, 2)}%`)
      _print('')
    }
  })

  hideLoading()
}

function parse(i, fractionDigits) {
  return (parseFloat(i) * 100).toFixed(2)
}

const _print_reward_title = function() {
  if (!logger) {
    logger = document.getElementById('log')
  }

  logger.innerHTML += '<b>REWARDS</b> <i>(expected TOKE allocation for next cycle)</i><br />'
}