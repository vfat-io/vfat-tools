$(function() {
  consoleInit(main)
});

const HARVEST_KEY = "41e90ced-d559-4433-b390-af424fdc76d6";

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}`);
  _print("Reading smart contracts...\n");

  try {
    let res = await fetch('https://hidden-badlands-22656.herokuapp.com/https://api.harvest.finance/pools?key=' + HARVEST_KEY)
    let data = JSON.parse(await res.text())

    const maticArray = data.matic;
    let i;
    let apy;

    for (i = 0; i < maticArray.length; i++) {
        if (maticArray[i].id == "SUSHI_GENE_ETH") {
            apy = Number(maticArray[i].rewardAPY[0]) + Number(maticArray[i].rewardAPY[1]) + Number(maticArray[i].tradingApy);
            _print("GENE/WETH Staking APY: " + apy + "%");
        }

        if (maticArray[i].id == "SUSHI_GNOME_ETH") {
            apy = Number(maticArray[i].rewardAPY[0]) + Number(maticArray[i].rewardAPY[1]) + Number(maticArray[i].tradingApy);
            _print("GNOME/WETH Staking APY: " + apy + "%");
        }
    }
  } catch (error) {
    _print("Harvest API loading is failed!")
  }

  hideLoading();
}
