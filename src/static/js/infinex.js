$(function() {
consoleInit(main)
  });

  async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
    _print_bold("Program End - June 13 2024\n");
    _print("GP / Day 12.593M\n");
    _print("GP / 1 NFT 200,000\n");
    _print("NFTs / Day 63\n");

    const data = await getInfinexData();

    const tvl = 111000000;
    const rewardedTvl = 38920000;
    const totalTvl = tvl - rewardedTvl;
    const nftPrice = 5000;
    const dailyAPR = (68 * nftPrice / totalTvl) * 100;
    const weeklyAPR = dailyAPR * 7;
    const yearlyAPR = weeklyAPR * 52;

    _print(`TVL $${formatMoney(tvl)}`);
    _print(`Reserved TVL $${formatMoney(rewardedTvl)}`);
    _print(`NFT Price Estimate $${formatMoney(nftPrice)}`);
    _print(`Daily APR ${dailyAPR.toFixed(2)}% Weekly APR ${weeklyAPR.toFixed(2)}% Yearly APR ${yearlyAPR.toFixed(2)}%`);

    hideLoading();
  }

  async function getInfinexData() {
    return await $.ajax({
      url: `https://api.app.infinex.xyz/getPlatformStatistics?batch=1&input=%7B%7D`,
      type: 'GET',
     });
  }

  // https://cors-anywhere.herokuapp.com/