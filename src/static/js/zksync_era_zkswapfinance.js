
$(function() {
  consoleInit(main)
    });

  const FACTORY_ABI = [
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "allPairs",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "allPairsLength",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]
  const PAIR_ABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "token0",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "token1",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
  ]

  async function main() {
      const App = await init_ethers();

      _print(`Initialized ${App.YOUR_ADDRESS}\n`);
      _print("Reading smart contracts...\n");

      const contracts = {
        factory: '0x3a76e377ED58c8731F9DF3A36155942438744Ce3',
    };

     _print(`Pairs initializing...`)

    // DEX calculations
    const factory = new ethers.Contract(contracts.factory, FACTORY_ABI, App.provider);
    const pairsLength = await factory.allPairsLength();
    _print(`Total pairs: ${pairsLength}`)
    let pairs = [];

    for (let i = 0; i < pairsLength; i++) {
      try {
        sleep_async(400);
        let pairAddr = await factory.allPairs(i);
        pairs.push(pairAddr);
      }
      catch(err) {
        console.log(`Error loading pair.`)
      }
    }
    _print(`Total pairs found: ${pairs.length}`)
    let balances = 0;

    _print(``)
    _print(`Fetching prices...`)

    const prices = await getZkSyncEraPrices();

    _print(``)
    _print(`Parsing liquidity...`)

    for(let i = 0; i < pairs.length; i++) {
      sleep_async(400);
      try {
        const [token1, token2] = await getPoolTokens(App, pairs[i]);

        const res1 = await getZksyncEraToken(App, token1, pairs[i])
        const res2 = await getZksyncEraToken(App, token2, pairs[i])

        const token1Price = prices[token1] ?? {usd: 0}
        const token2Price = prices[token2] ?? {usd: 0}

        const token1Staked = res1.staked
        const token2Staked = res2.staked

        const pairName = `${res1.symbol}-${res2.symbol} LP`
        const pairBalances = token1Staked*token1Price.usd + token2Staked*token2Price.usd
        balances = balances + pairBalances

        _print(`${pairName}:  $${Math.round(pairBalances)}`)

      }
      catch(err) {
        console.log(err)
        console.log(`Error loading`)
      }
    }

    _print(``)
    _print_bold(`Total DEX liquidity: $${Math.round(balances)}`)
      hideLoading();
    }

    async function  getPoolTokens (App, addr) {
      const pool = new ethers.Contract(addr, PAIR_ABI, App.provider);
      const [token0, token1] = await Promise.all([pool.token0(), pool.token1()]);
      return [token0, token1];
  }

