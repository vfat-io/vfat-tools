$(function() {
  consoleInit(main)
})

async function main() {
  const App = await init_ethers()

  _print(`Initialized ${App.YOUR_ADDRESS}\n`)
  _print('Reading smart contracts...\n')

  const [data, tvl] = await Promise.all([
    fetch('https://api.llama.fi/protocol/augmented-finance').then(res => res.json()),
    fetch('https://api.llama.fi/tvl/augmented-finance').then(res => res.json()),
  ])
  const tokens = data.tokens[data.tokens.length - 1].tokens
  const tokensInUsd = data.tokensInUsd[data.tokensInUsd.length - 1].tokens

  _print(`${data.description}\n`)
  data.methodology.split('.').forEach((text) => {
    _print(text.trim());
  })

  _print_bold(`TVL: $${formatMoney(tvl.toFixed(2))}\n`)
  
  _print_bold(`Supplied tokens:\n`)
  Object.keys(tokens)
    .filter(key => Boolean(tokens[key]))
    .forEach(key => {
      _print(`${key}: ${tokens[key].toFixed(4)} / $${tokensInUsd[key].toFixed(2)}`)
    })

  hideLoading()
}
