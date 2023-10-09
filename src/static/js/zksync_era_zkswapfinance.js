
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

async function getZksyncEraUniPool(App, pool, poolAddress, stakingAddress) {
    let q0, q1;
    const reserves = await pool.getReserves();
    q0 = reserves._reserve0;
    q1 = reserves._reserve1;
    const decimals = await pool.decimals();
    const token0 = await pool.token0();
    const token1 = await pool.token1();
    return {
        symbol : await pool.symbol(),
        name : await pool.name(),
        address: poolAddress,
        token0,
        q0,
        token1,
        q1,
        totalSupply: await pool.totalSupply() / 10 ** decimals,
        stakingAddress: stakingAddress,
        staked: await pool.balanceOf(stakingAddress) / 10 ** decimals,
        decimals: decimals,
        unstaked: await pool.balanceOf(App.YOUR_ADDRESS) / 10 ** decimals,
        contract: pool,
        tokens : [token0, token1],
        is1inch : false
    };
}

async function getZksyncEra20(App, token, address, stakingAddress) {
    if (address == "0x0000000000000000000000000000000000000000") {
      return {
        address,
        name : "Ethereum",
        symbol : "ETH",
        totalSupply: 1e8,
        decimals: 18,
        staked: 0,
        unstaked: 0,
        contract: null,
        tokens:[address]
      }
    }
    const decimals = await token.decimals();
    if (address === "0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91") {
      return {
        address,
        name : "Wrapped ETH",
        symbol : "WETH",
        totalSupply : await token.totalSupply(),
        decimals : decimals,
        staked:  await token.balanceOf(stakingAddress) / 10 ** decimals,
        unstaked: await token.balanceOf(App.YOUR_ADDRESS)  / 10 ** decimals,
        contract: token,
        tokens : [address]
      }
    }
    return {
        address,
        name : await token.name(),
        symbol : await token.symbol(),
        totalSupply : await token.totalSupply(),
        decimals : decimals,
        staked:  await token.balanceOf(stakingAddress) / 10 ** decimals,
        unstaked: await token.balanceOf(App.YOUR_ADDRESS)  / 10 ** decimals,
        contract: token,
        tokens : [address]
    };
}

async function getZksyncEraStoredToken(App, tokenAddress, stakingAddress, type) {
  switch (type) {
    case "uniswap":
      const pool = new ethers.Contract(tokenAddress, UNI_ABI, App.provider);
      return await getZksyncEraUniPool(App, pool, tokenAddress, stakingAddress);
    case "erc20":
      const erc20 = new ethers.Contract(tokenAddress, ERC20_ABI, App.provider);
      return await getZksyncEra20(App, erc20, tokenAddress, stakingAddress);
  }
}

async function getZksyncEraToken(App, tokenAddress, stakingAddress) {
    if (tokenAddress == "0x0000000000000000000000000000000000000000") {
      return getZksyncEra20(App, null, tokenAddress, "")
    }
    const type = window.localStorage.getItem(tokenAddress);
    if (type) return getZksyncEraStoredToken(App, tokenAddress, stakingAddress, type);
    try {
      const pool = new ethers.Contract(tokenAddress, UNI_ABI, App.provider);
      const _token0 = await pool.token0();
      const uniPool = await getZksyncEraUniPool(App, pool, tokenAddress, stakingAddress);
      window.localStorage.setItem(tokenAddress, "uniswap");
      return uniPool;
    }
    catch(err) {
    }

    try {
      const erc20 = new ethers.Contract(tokenAddress, ERC20_ABI, App.provider);
      const _name = await erc20.name();
      const erc20tok = await getZksyncEra20(App, erc20, tokenAddress, stakingAddress);
      window.localStorage.setItem(tokenAddress, "erc20");
      return erc20tok;
    }
    catch(err) {
      console.log(err);
      console.log(`Couldn't match ${tokenAddress} to any known token type.`);
    }
  }