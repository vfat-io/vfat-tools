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

