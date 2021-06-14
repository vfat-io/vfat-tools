const ttTokens = [
  { "id": "thunder-token","symbol": "TT","contract": "0x0000000000000000000000000000000000000000" },
  { "id": "usd-coin","symbol": "USDC","contract": "0x22e89898A04eaf43379BeB70bf4E38b1faf8A31e" },
  { "id": "tether", "symbol": "USDT", "contract": "0x4f3C8E20942461e2c3Bdd8311AC57B0c222f2b82"},
  { "id":"binance-usd", "symbol": "BUSD", "contract": "0xBEB0131D95AC3F03fd15894D0aDE5DBf7451d171" }
]

async function getTTPrices() {
  const idPrices = await lookUpPrices(ttTokens.map(x => x.id));
  const prices = {}
  for (const bt of ttTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function geterc20(App, token, address, stakingAddress) {
  if (address == "0x0000000000000000000000000000000000000000") {
    return {
      address,
      name : "Thunder Token",
      symbol : "TT",
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

