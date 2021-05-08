$(function() {
consoleInit(main)
});

const Boardrooms =  [
    { name : "ArthLiquidityBoardroom", address: "0xd5f501C4cDBFca915f04d4aE3853A904C9A35Af5",
      lpt : "0x35b6f9e6300aa6c722ea189e096b0b073025806f", stakeTokenTicker : "ARTH-DAI LP",
      ratio : 0.7 },
    { name : "MahaLiquidityBoardroom", address: "0x677d54d7DEf7Da25addE1827e000b81A65b1F408",
      lpt : "0x35b6f9e6300aa6c722ea189e096b0b073025806f", stakeTokenTicker : "MAHA-ETH LP",
      ratio : 0.1 },
    { name : "ArthBoardroom", address: "0xdEc0b3bD49347c75fe1C44A219aB474a13e68FfD",
      lpt : "0x35b6f9e6300aa6c722ea189e096b0b073025806f", stakeTokenTicker : "ARTH",
      ratio : 0.2 }
]

const ORACLE_ADDRESS = "0x977a86faba6ea1876c94e725a4e88e39dfaf3268";
const ARTH_ADDRESS = "0x0e3cc2c4fb9252d17d07c67135e48536071735d9"
async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");

    var tokens = {};
    var prices = {};

    let totalStaked = 0;
    const c2 = ARTHContracts[1];
    const p2 = await loadSynthetixPool(App, tokens, prices, c2.abi, c2.address, c2.rewardTokenFunction, c2.stakeTokenFunction);
    const p = await loadMultipleSynthetixPools(App, tokens, prices, [ARTHContracts[0], ARTHContracts[2]]);

    if (p.totalUserStaked > 0) {
        _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
    }

    for (const b of Boardrooms)  {
        const bp = await loadBoardroom(App, prices, b.address, ORACLE_ADDRESS,
            b.lpt, ARTH_ADDRESS, b.stakeTokenTicker, "ARTH", 2, 0.3, 2, b.ratio, 0);
        totalStaked += bp.staked_tvl;
    }


    _print_bold(`Total staked: $${formatMoney(p.staked_tvl + p2.staked_tvl + totalStaked)}`)

    hideLoading();
  }
