$(function() {
    consoleInit();
    start(main);
});

/*
Dynamic Supply Token (DST): 0xfa9C3dC54baA9eefBe9453B1f3B3B93aD2AF0A77
Dynamic Supply Tracker (DSTR): 0x55696EfC7c9779d868Ac34aC6b4a4C5FeD61aC12
Dynamic Supply Note (DSN): 0xc03a5f41a22e970686f980e6669c6a882e20c262
DST-DAI LP Farm: 0x030cF06D8A39d5Ef4b169EAc0D4D5B0c51b42194
DSTR-DAI LP Farm: 0xCdB0c60EA5bF50641A570E25875EAB6c889E949d
Boardroom: 0x4c8C0F47CA9A1888539Bbb59DdeF8550F329f866
Seignoriage Oracle (6h): 0x3a9A1CEC3546b4FB810756Cd3aD072a3d6345A8a
Note Oracle (30m): 0xa709A321b7684A4dBB9B0023f2e50Bc37A258f02
*/

async function main() {

    const CONTRACTS = [      
        { address: "0xCdB0c60EA5bF50641A570E25875EAB6c889E949d", abi : DYNAMIC_FARM_ABI, rewardToken: "dynamicTracker", stakeToken: "lpt"},
        { address: "0x030cF06D8A39d5Ef4b169EAc0D4D5B0c51b42194", abi : DYNAMIC_FARM_ABI, rewardToken: "dynamicTracker", stakeToken: "lpt"}
    ];
  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");
  
    var tokens = {};
    var prices = {};
    let tvl = 0;
  
    for (const c of CONTRACTS) {
        try {
            const { staked_tvl } =await loadSynthetixPool(App, tokens, prices, c.abi, c.address, c.rewardToken, c.stakeToken);
            tvl += staked_tvl;
        }
        catch (ex) {
            console.error(ex);
        }
    }
    const BOARDROOM_ADDRESS = "0x175B1A116028508aC3A4e4B62722b845C3bD1ab3";
    const ORACLE_ADDRESS = "0x3a9a1cec3546b4fb810756cd3ad072a3d6345a8a"
    const DAI_DST_ADDRESS = "0x706b21bf60adb79d2326d39086e4c27766193185"
    const REWARD_TOKEN_ADDRESS = "0xfa9c3dc54baa9eefbe9453b1f3b3b93ad2af0a77";

    const br_tvl = await loadBoardroom(App, prices, BOARDROOM_ADDRESS, ORACLE_ADDRESS, DAI_DST_ADDRESS, REWARD_TOKEN_ADDRESS,
        "DSTR", "DST", 4, 0.1, 2, 1, 24);
    tvl += br_tvl.staked_tvl;
    _print_bold(`Total staked: $${formatMoney(tvl)}`);

    hideLoading();
  }