const BSC_VAULT_ABI = [{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_controller","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"available","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"balance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"controller","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"depositAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"earn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPricePerFullShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"governance","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"reserve","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"harvest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"max","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"min","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_controller","type":"address"}],"name":"setController","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_governance","type":"address"}],"name":"setGovernance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_min","type":"uint256"}],"name":"setMin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_shares","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
const VALUE_LP_ABI = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"collectedFee0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"collectedFee1","type":"uint112"}],"name":"PaidProtocolFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"formula","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCollectedFees","outputs":[{"internalType":"uint112","name":"_collectedFee0","type":"uint112"},{"internalType":"uint112","name":"_collectedFee1","type":"uint112"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getSwapFee","outputs":[{"internalType":"uint32","name":"_swapFee","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTokenWeights","outputs":[{"internalType":"uint32","name":"_tokenWeight0","type":"uint32"},{"internalType":"uint32","name":"_tokenWeight1","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"},{"internalType":"uint32","name":"_tokenWeight0","type":"uint32"},{"internalType":"uint32","name":"_swapFee","type":"uint32"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sync","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]

async function getBscUniPool(App, pool, poolAddress, stakingAddress) {    
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

async function getValuePool(App, pool, poolAddress, stakingAddress, tokenWeights) {    
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
        w0 : tokenWeights._tokenWeight0,
        token1,
        q1,
        w1 : tokenWeights._tokenWeight1,
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

async function getBep20(App, token, address, stakingAddress) {
    if (address == "0x0000000000000000000000000000000000000000") {
      return {
        address,
        name : "Binance",
        symbol : "BNB",
        totalSupply: 1e8,
        decimals: 18,
        staked: 0,
        unstaked: 0,
        contract: null,
        tokens:[address]
      }
    }
    const decimals = await token.decimals()
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

async function getBscVault(App, vault, address, stakingAddress) {
  const decimals = await vault.decimals();
  const token_ = await vault.token();
  const token = await getBscToken(App, token_, address);
  return {
    address,
    name : await vault.name(),
    symbol : await vault.symbol(),
    totalSupply : await vault.totalSupply(),
    decimals : decimals,
    staked: await vault.balanceOf(stakingAddress) / 10 ** decimals,
    unstaked: await vault.balanceOf(App.YOUR_ADDRESS) / 10 ** decimals,
    token: token,
    balance : await vault.balance(),
    contract: vault,
    tokens : [address].concat(token.tokens),
  }
}

async function getBscSwapPool(App, _3pool, address, stakingAddress, swapAddress) {
  const swap = new ethers.Contract(swapAddress, BSC_SWAP_ABI, App.provider)
  const virtualPrice = await swap.getVirtualPrice();
  const coin0 = await swap.getToken(0);
  const token = await getBscToken(App, coin0, address);
  const decimals = await _3pool.decimals();
  return {
      address,
      name : await _3pool.name(),
      symbol : await _3pool.symbol(),
      totalSupply : await _3pool.totalSupply(),
      decimals : decimals,
      staked:  await _3pool.balanceOf(stakingAddress) / 10 ** decimals,
      unstaked: await _3pool.balanceOf(App.YOUR_ADDRESS)  / 10 ** decimals,
      contract: _3pool,
      tokens : [address, coin0],
      token,
      virtualPrice : virtualPrice / 1e18
  };
}

async function getBscStoredToken(App, tokenAddress, stakingAddress, type) {
  switch (type) {
    case "uniswap": 
      const pool = new ethers.Contract(tokenAddress, UNI_ABI, App.provider);
      return await getBscUniPool(App, pool, tokenAddress, stakingAddress);
    case "swap": 
      const _3pool = new ethers.Contract(tokenAddress, BSC_3POOL_ABI, App.provider);
      const swap = await _3pool.swap();
      return await getBscSwapPool(App, _3pool, tokenAddress, stakingAddress, swap);
    case "value": 
      const valuePool = new ethers.Contract(tokenAddress, VALUE_LP_ABI, App.provider);
      const tokenWeights = await valuePool.getTokenWeights()
      return await getValuePool(App, valuePool, tokenAddress, stakingAddress, tokenWeights);
    case "bep20":
      const bep20 = new ethers.Contract(tokenAddress, ERC20_ABI, App.provider);
      return await getBep20(App, bep20, tokenAddress, stakingAddress);
    case "bscVault":
      const vault = new ethers.Contract(tokenAddress, BSC_VAULT_ABI, App.provider);
      return await getBscVault(App, vault, tokenAddress, stakingAddress);
  }
}

const BSC_3POOL_ABI = [{"inputs":[{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"uint8","name":"decimals_","type":"uint8"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"swap","outputs":[{"internalType":"contract ISwap","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const BSC_SWAP_ABI = [{"inputs":[{"internalType":"contract IERC20[]","name":"_pooledTokens","type":"address[]"},{"internalType":"uint8[]","name":"decimals","type":"uint8[]"},{"internalType":"string","name":"lpTokenName","type":"string"},{"internalType":"string","name":"lpTokenSymbol","type":"string"},{"internalType":"uint256","name":"_a","type":"uint256"},{"internalType":"uint256","name":"_fee","type":"uint256"},{"internalType":"uint256","name":"_adminFee","type":"uint256"},{"internalType":"uint256","name":"_depositFee","type":"uint256"},{"internalType":"uint256","name":"_withdrawFee","type":"uint256"},{"internalType":"address","name":"_devaddr","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"tokenAmounts","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"fees","type":"uint256[]"},{"indexed":false,"internalType":"uint256","name":"invariant","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lpTokenSupply","type":"uint256"}],"name":"AddLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newAdminFee","type":"uint256"}],"name":"NewAdminFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newDepositFee","type":"uint256"}],"name":"NewDepositFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newSwapFee","type":"uint256"}],"name":"NewSwapFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newWithdrawFee","type":"uint256"}],"name":"NewWithdrawFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oldA","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newA","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"initialTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"futureTime","type":"uint256"}],"name":"RampA","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"tokenAmounts","type":"uint256[]"},{"indexed":false,"internalType":"uint256","name":"lpTokenSupply","type":"uint256"}],"name":"RemoveLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"tokenAmounts","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"fees","type":"uint256[]"},{"indexed":false,"internalType":"uint256","name":"invariant","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lpTokenSupply","type":"uint256"}],"name":"RemoveLiquidityImbalance","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256","name":"lpTokenAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lpTokenSupply","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"boughtId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensBought","type":"uint256"}],"name":"RemoveLiquidityOne","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"currentA","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"StopRampA","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokensSold","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensBought","type":"uint256"},{"indexed":false,"internalType":"uint128","name":"soldId","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"boughtId","type":"uint128"}],"name":"TokenSwap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"uint256","name":"minToMint","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"calculateCurrentWithdrawFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"calculateRemoveLiquidity","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"},{"internalType":"uint8","name":"tokenIndex","type":"uint8"}],"name":"calculateRemoveLiquidityOneToken","outputs":[{"internalType":"uint256","name":"availableTokenAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"tokenIndexFrom","type":"uint8"},{"internalType":"uint8","name":"tokenIndexTo","type":"uint8"},{"internalType":"uint256","name":"dx","type":"uint256"}],"name":"calculateSwap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"bool","name":"deposit","type":"bool"}],"name":"calculateTokenAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getA","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAPrecise","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getAdminBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getDepositTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"index","type":"uint8"}],"name":"getToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"index","type":"uint8"}],"name":"getTokenBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"}],"name":"getTokenIndex","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVirtualPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"futureA","type":"uint256"},{"internalType":"uint256","name":"futureTime","type":"uint256"}],"name":"rampA","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256[]","name":"minAmounts","type":"uint256[]"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"uint256","name":"maxBurnAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityImbalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenAmount","type":"uint256"},{"internalType":"uint8","name":"tokenIndex","type":"uint8"},{"internalType":"uint256","name":"minAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityOneToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newAdminFee","type":"uint256"}],"name":"setAdminFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newDepositFee","type":"uint256"}],"name":"setDefaultDepositFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newWithdrawFee","type":"uint256"}],"name":"setDefaultWithdrawFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_devaddr","type":"address"}],"name":"setDevAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newSwapFee","type":"uint256"}],"name":"setSwapFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stopRampA","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"tokenIndexFrom","type":"uint8"},{"internalType":"uint8","name":"tokenIndexTo","type":"uint8"},{"internalType":"uint256","name":"dx","type":"uint256"},{"internalType":"uint256","name":"minDy","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"swapStorage","outputs":[{"internalType":"uint256","name":"initialA","type":"uint256"},{"internalType":"uint256","name":"futureA","type":"uint256"},{"internalType":"uint256","name":"initialATime","type":"uint256"},{"internalType":"uint256","name":"futureATime","type":"uint256"},{"internalType":"uint256","name":"swapFee","type":"uint256"},{"internalType":"uint256","name":"adminFee","type":"uint256"},{"internalType":"uint256","name":"defaultDepositFee","type":"uint256"},{"internalType":"uint256","name":"defaultWithdrawFee","type":"uint256"},{"internalType":"address","name":"devaddr","type":"address"},{"internalType":"contract LPToken","name":"lpToken","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"transferAmount","type":"uint256"}],"name":"updateUserWithdrawFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAdminFees","outputs":[],"stateMutability":"nonpayable","type":"function"}]

async function getBscToken(App, tokenAddress, stakingAddress) {
    if (tokenAddress == "0x0000000000000000000000000000000000000000") {
      return getBep20(App, null, tokenAddress, "")
    }
    const type = window.localStorage.getItem(tokenAddress);
    if (type) return getBscStoredToken(App, tokenAddress, stakingAddress, type);
    try {
      const vpool = new ethers.Contract(tokenAddress, VALUE_LP_ABI, App.provider);
      const tokenWeights = await vpool.getTokenWeights()
      const valuePool = await getValuePool(App, vpool, tokenAddress, stakingAddress, tokenWeights);
      window.localStorage.setItem(tokenAddress, "value");
      return valuePool;
    }
    catch(err) {
    }
    try {
      const pool = new ethers.Contract(tokenAddress, UNI_ABI, App.provider);
      const _token0 = await pool.token0();
      const uniPool = await getBscUniPool(App, pool, tokenAddress, stakingAddress);
      window.localStorage.setItem(tokenAddress, "uniswap");
      return uniPool;
    }
    catch(err) {
    }
    try {
      const _3pool = new ethers.Contract(tokenAddress, BSC_3POOL_ABI, App.provider);
      const swap = await _3pool.swap();
      const res = await getBscSwapPool(App, _3pool, tokenAddress, stakingAddress, swap);
      window.localStorage.setItem(tokenAddress, "swap");
      return res;
    }
    catch(err) {
      console.log(err)
    }
    try {
      const VAULT = new ethers.Contract(tokenAddress, BSC_VAULT_ABI, App.provider);
      const _token = await VAULT.token();
      const vault = await getBscVault(App, VAULT, tokenAddress, stakingAddress);
      window.localStorage.setItem(tokenAddress, "bscVault");
      return vault;
    }
    catch(err) {
    }
    try {
      const bep20 = new ethers.Contract(tokenAddress, ERC20_ABI, App.provider);
      const _name = await bep20.name();
      const bep20tok = await getBep20(App, bep20, tokenAddress, stakingAddress);
      window.localStorage.setItem(tokenAddress, "bep20");
      return bep20tok;
    }
    catch(err) {
      console.log(`Couldn't match ${tokenAddress} to any known token type.`);
    }
  }

async function loadBscSynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
    rewardTokenFunction, stakeTokenFunction) {
      const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
  
      if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
        console.log("Couldn't find stake function ", stakeTokenFunction);
      }
      const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();
  
      const rewardTokenAddress = await STAKING_POOL.callStatic[rewardTokenFunction]();
  
      var stakeToken = await getBscToken(App, stakeTokenAddress, stakingAddress);
  
      if (stakeTokenAddress.toLowerCase() === rewardTokenAddress.toLowerCase()) {
        stakeToken.staked = await STAKING_POOL.totalSupply() / 10 ** stakeToken.decimals;
      }
  
      var newPriceAddresses = stakeToken.tokens.filter(x =>
        x.toLowerCase() !=  "0xb34ab2f65c6e4f764ffe740ab83f982021faed6d" && //BSG can't be retrieved from Coingecko
        !getParameterCaseInsensitive(prices, x));
      var newPrices = await lookUpTokenPrices(newPriceAddresses);
      for (const key in newPrices) {
        if (newPrices[key]?.usd)
            prices[key] = newPrices[key];
      }
      var newTokenAddresses = stakeToken.tokens.filter(x =>
        !getParameterCaseInsensitive(tokens,x));
      for (const address of newTokenAddresses) {
          tokens[address] = await getBscToken(App, address, stakingAddress);
      }
      if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
          tokens[rewardTokenAddress] = await getBscToken(App, rewardTokenAddress, stakingAddress);
      }
      const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
  
      const rewardTokenTicker = rewardToken.symbol;
  
      const poolPrices = getPoolPrices(tokens, prices, stakeToken, "bsc");
  
      const stakeTokenTicker = poolPrices.stakeTokenTicker;
  
      const stakeTokenPrice =
          prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
      const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  
      const periodFinish = await STAKING_POOL.periodFinish();
      const rewardRate = await STAKING_POOL.rewardRate();
      const weeklyRewards = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate / 1e18 * 604800;
  
      const usdPerWeek = weeklyRewards * rewardTokenPrice;
  
      const staked_tvl = poolPrices.staked_tvl;
  
      const userStaked = await STAKING_POOL.balanceOf(App.YOUR_ADDRESS) / 10 ** stakeToken.decimals;
  
      const userUnstaked = stakeToken.unstaked;
  
      const earned = await STAKING_POOL.earned(App.YOUR_ADDRESS) / 10 ** rewardToken.decimals;
  
      return  {
        stakingAddress,
        poolPrices,
        stakeTokenAddress,
        rewardTokenAddress,
        stakeTokenTicker,
        rewardTokenTicker,
        stakeTokenPrice,
        rewardTokenPrice,
        weeklyRewards,
        usdPerWeek,
        staked_tvl,
        userStaked,
        userUnstaked,
        earned
      }
}

async function loadBscSynthetixPool(App, tokens, prices, abi, address, rewardTokenFunction, stakeTokenFunction) {
    const info = await loadBscSynthetixPoolInfo(App, tokens, prices, abi, address, rewardTokenFunction, stakeTokenFunction);
    return await printSynthetixPool(App, info, "bsc");
}

async function loadBscBasisFork(data) {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");

    var tokens = {};
    var prices = {"0x55d398326f99059ff775485246999027b3197955" : { usd : 1 }};
    var totalStaked = 0;
    
    let p1 = await loadBscSynthetixPool(App, tokens, prices, data.PoolABI, 
        data.SharePool.address, data.SharePool.rewardToken, data.SharePool.stakeToken);
    totalStaked += p1.staked_tvl;
    
    if (data.SharePool2) {
      let p3 = await loadBscSynthetixPool(App, tokens, prices, data.PoolABI, 
          data.SharePool2.address, data.SharePool2.rewardToken, data.SharePool2.stakeToken);
      totalStaked += p3.staked_tvl;
    }

    let p2 = await loadBscSynthetixPool(App, tokens, prices, data.PoolABI, 
        data.CashPool.address, data.CashPool.rewardToken, data.CashPool.stakeToken);
    totalStaked += p2.staked_tvl;

    if (data.SeedBanks) {
      let p = await loadMultipleBscSynthetixPools(App, tokens, prices, data.SeedBanks)
      totalStaked += p.staked_tvl;
      if (p.totalUserStaked > 0) {
        _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
      }
    }

    if (!data.SeedBanks)
    {
      if (data.Boardrooms) {
        for (const boardroom of data.Boardrooms) {
          let br = await loadBoardroom(App, prices, boardroom.address, data.Oracle, data.UniswapLP, data.Cash,
              data.ShareTicker, data.CashTicker, data.ExpansionsPerDay, data.MaximumExpansion, 
              data.Decimals, boardroom.ratio, data.TargetMantissa);
          totalStaked += br.staked_tvl;
        }
      }
      else {
        let br = await loadBoardroom(App, prices, data.Boardroom, data.Oracle, data.UniswapLP, data.Cash,
            data.ShareTicker, data.CashTicker, data.ExpansionsPerDay, data.MaximumExpansion, 
            data.Decimals, 1, data.TargetMantissa);
        totalStaked += br.staked_tvl;
      }
    } 

    _print_bold(`Total staked: $${formatMoney(totalStaked)}`)

    hideLoading();
}


async function getBscPoolInfo(App, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {  
  const poolInfo = await chefContract.poolInfo(poolIndex);
  if (poolInfo.allocPoint == 0) {
    return {
      address: poolInfo.lpToken,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: null,
      userStaked : 0,
      pendingRewardTokens : 0,
      stakedToken : null,
      userLPStaked : 0,
      lastRewardBlock : poolInfo.lastRewardBlock
    };
  }
  const poolToken = await getBscToken(App, poolInfo.lpToken, chefAddress);
  const userInfo = await chefContract.userInfo(poolIndex, App.YOUR_ADDRESS);
  const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS);
  const staked = userInfo.amount / 10 ** poolToken.decimals;
  var stakedToken;
  var userLPStaked;
  if (poolInfo.stakedHoldableToken != null && 
    poolInfo.stakedHoldableToken != "0x0000000000000000000000000000000000000000") {
    stakedToken = await getBscToken(App, poolInfo.stakedHoldableToken, chefAddress);
    userLPStaked = userInfo.stakedLPAmount / 10 ** poolToken.decimals
  }
  return {
      address: poolInfo.lpToken,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: poolToken,
      userStaked : staked,
      pendingRewardTokens : pendingRewardTokens / 10 ** 18,
      stakedToken : stakedToken,
      userLPStaked : userLPStaked,
      lastRewardBlock : poolInfo.lastRewardBlock
  };
}

async function loadBscChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
  rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
  deathPoolIndices) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.poolLength(), 10);
  const totalAllocPoints = await chefContract.totalAllocPoint();
    
  _print(`<a href='https://bscscan.com/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  var tokens = {};

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getBscToken(App, rewardTokenAddress, chefAddress);
  const rewardsPerWeek = rewardsPerWeekFixed ?? 
    await chefContract.callStatic[rewardsPerBlockFunction]() 
    / 10 ** rewardToken.decimals * 604800 / 3

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getBscPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getBscToken(App, address, chefAddress);
  }));

  if (deathPoolIndices) {   //load prices for the deathpool assets
    deathPoolIndices.map(i => poolInfos[i])
                     .map(poolInfo => 
      poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "bsc") : undefined);
  }

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "bsc") : undefined);


  _print("Finished reading smart contracts.\n");    

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
        pendingRewardsFunction, null, null, "bsc")
      aprs.push(apr);
    }
  }
  let totalUserStaked=0, totalStaked=0, averageApr=0;
  for (const a of aprs) {
    if (!isNaN(a.totalStakedUsd)) {
      totalStaked += a.totalStakedUsd;
    }
    if (a.userStakedUsd > 0) {
      totalUserStaked += a.userStakedUsd;
      averageApr += a.userStakedUsd * a.yearlyAPR / 100;
    }
  }
  averageApr = averageApr / totalUserStaked;
  _print_bold(`Total Staked: $${formatMoney(totalStaked)}`);
  if (totalUserStaked > 0) {
    _print_bold(`\nYou are staking a total of $${formatMoney(totalUserStaked)} at an average APR of ${(averageApr * 100).toFixed(2)}%`)
    _print(`Estimated earnings:`
        + ` Day $${formatMoney(totalUserStaked*averageApr/365)}`
        + ` Week $${formatMoney(totalUserStaked*averageApr/52)}`
        + ` Year $${formatMoney(totalUserStaked*averageApr)}\n`);
  }
  return { prices, totalUserStaked, totalStaked, averageApr }

}


const bscTokens = [ 
  { "id": "wbnb", "symbol": "wbnb","contract": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" }, 
  { "id": "binance-usd", "symbol": "busd", "contract": "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"  }, 
  { "id": "pancakeswap-token", "symbol": "CAKE", "contract": "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82"  }, 
  { "id": "beefy-finance", "symbol": "BIFI", "contract": "0xca3f508b8e4dd382ee878a314789373d80a5190a" }, 
  { "id": "bdollar-share", "symbol": "sBDO", "contract": "0x0d9319565be7f53cefe84ad201be3f40feae2740"  }, 
  { "id": "belugaswap","symbol": "BELUGA", "contract": "0x181de8c57c4f25eba9fd27757bbd11cc66a55d31" }, 
  { "id": "chainlink","symbol": "LINK","contract":"0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd" }, 
  { "id": "bscex","symbol": "BSCX", "contract": "0x5ac52ee5b2a633895292ff6d8a89bb9190451587" },
  { "id": "binance-eth","symbol": "BETH", "contract": "0x250632378e573c6be1ac2f97fcdf00515d0aa91b" },
  { "id": "tether","symbol": "USDT", "contract": "0x55d398326f99059fF775485246999027B3197955" },
  { "id": "bitcoin-bep2","symbol": "BTCB", "contract": "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c" },
  { "id": "ethereum","symbol": "ETH", "contract": "0x2170Ed0880ac9A755fd29B2688956BD959F933F8" },
  { "id": "bakerytoken","symbol": "BAKE", "contract": "0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5" },
  { "id": "goose-finance","symbol": "EGG", "contract": "0xf952fc3ca7325cc27d15885d37117676d25bfda6" },
  { "id": "dai","symbol": "DAI", "contract": "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3" },
  { "id": "auto","symbol": "AUTO", "contract": "0xa184088a740c695e156f91f5cc086a06bb78b827" },
  { "id": "wault-finance","symbol": "WAULT", "contract": "0x6ff2d9e5891a7a7c554b80e0d1b791483c78bce9" },
  { "id": "swipe","symbol": "SXP", "contract": "0x47BEAd2563dCBf3bF2c9407fEa4dC236fAbA485A" },
  { "id": "vai","symbol": "VAI", "contract": "0x4bd17003473389a42daf6a0a729f6fdb328bbbd7" },
  { "id": "venus","symbol": "XVS", "contract": "0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63" },
  { "id": "terrausd", "symbol": "UST", "contract": "0x23396cf899ca06c4472205fc903bdb4de249d6fc"},
  { "id": "cardano", "symbol": "ADA", "contract": "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47"},
  { "id": "bearn-fi", "symbol": "BFI", "contract": "0x81859801b01764d4f0fa5e64729f5a6c3b91435b"},
  { "id": "polkadot", "symbol": "DOT", "contract": "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402"},
  { "id": "vbswap", "symbol": "VBSWAP", "contract": "0x4f0ed527e8a95ecaa132af214dfd41f30b361600"},
  { "id": "bdollar", "symbol": "BDO", "contract": "0x190b589cf9fb8ddeabbfeae36a813ffb2a702454"},
  { "id": "julswap", "symbol": "JULD", "contract": "0x5a41f637c3f7553dba6ddc2d3ca92641096577ea"},
  { "id": "the-famous-token", "symbol": "TFT", "contract": "0xA9d3fa202b4915c3eca496b0e7dB41567cFA031C"},
  { "id": "shield-protocol", "symbol": "SHIELD", "contract": "0x60b3bc37593853c04410c4f07fe4d6748245bf77"},
  { "id": "lead-token", "symbol": "LEAD", "contract": "0x2ed9e96EDd11A1fF5163599A66fb6f1C77FA9C66"},
  { "id": "sparkpoint", "symbol": "SRK", "contract": "0x3B1eC92288D78D421f97562f8D479e6fF7350a16"},
  { "id": "curate", "symbol": "XCUR", "contract": "0x708C671Aa997da536869B50B6C67FA0C32Ce80B2"},
  { "id": "uniswap", "symbol": "UNI", "contract": "0xBf5140A22578168FD562DCcF235E5D43A02ce9B1"},
  { "id": "tsuki-dao", "symbol": "TSUKI", "contract": "0x3fd9e7041c45622e8026199a46f763c9807f66f3"},
  { "id": "panda-yield", "symbol": "BBOO", "contract": "0xd909840613fcb0fadc6ee7e5ecf30cdef4281a68"}
]

async function getBscPrices() {
  const idPrices = await lookUpPrices(bscTokens.map(x => x.id));
  const prices = {}
  for (const bt of bscTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function loadMultipleBscSynthetixPools(App, tokens, prices, pools) {
  let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
  const infos = await Promise.all(pools.map(p => 
    loadBscSynthetixPoolInfo(App, tokens, prices, p.abi, p.address, p.rewardTokenFunction, p.stakeTokenFunction)));
  for (const i of infos) {
    let p = await printSynthetixPool(App, i, "bsc");
    totalStaked += p.staked_tvl || 0;
    totalUserStaked += p.userStaked || 0;
    if (p.userStaked > 0) {
      individualAPRs.push(p.userStaked * p.apr / 100);
    }
  }
  let totalAPR = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
  return { staked_tvl : totalStaked, totalUserStaked, totalAPR };
}