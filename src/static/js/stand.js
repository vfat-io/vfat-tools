$(function() {
    consoleInit();
    start(main);
});

async function main() {

    const CONTRACTS = [      
        { address: "0x05A27c63ADB54faee48DA03D7D10F04DFfF1d5aa", abi : STAND_USDTSAC_ABI, rewardToken: "standShare", stakeToken: "lpt"},
        { address: "0x0F14a4880B7BC3Fc926499Df3AB32c72828eCF0E", abi : STAND_USDTSAC_ABI, rewardToken: "standShare", stakeToken: "lpt"},
        // { address: "0xf9bb984980E8b503cd9f365101C16E071eC86166", abi : STAND_USDT_ABI, rewardToken: "standCash", stakeToken: "usdt"},
        // { address: "0xfDA19204C625dd82B0066a18F218179778C14E56", abi : STAND_USDC_ABI, rewardToken: "standCash", stakeToken: "usdc"},
        // { address: "0xBD3316c31c48a3cD9A014a8315d05356c5723CF4", abi : STAND_DAI_ABI, rewardToken: "standCash", stakeToken: "dai"},
        // { address: "0xeaE9402B0cDd6Ef6a7D8F511F03a655ED6b5f850", abi : STAND_ESD_ABI, rewardToken: "standCash", stakeToken: "esd"},
        // { address: "0x4E4c96b68Dd328eE3aaA4B7320Dd86E21D740332", abi : STAND_BAC_ABI, rewardToken: "standCash", stakeToken: "BAC"},
        // { address: "0xeF185DF44a1a8e94B3E8CE2a7D1e88fD5f97DE90", abi : STAND_FRAX_ABI, rewardToken: "standCash", stakeToken: "frax"},
        // { address: "0x82fb0cff19E2060e912805Fe3496bC878eef17C0", abi : STAND_AETH_ABI, rewardToken: "standCash", stakeToken: "aeth"},
    ];
  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");
  
    var tokens = {};
    var prices = {};
    var totalStaked = 0;
  
    for (const c of CONTRACTS) {
        try {
            const { staked_tvl } = await loadSynthetixPool(App, tokens, prices, c.abi, c.address, c.rewardToken, c.stakeToken);
            totalStaked += staked_tvl;
        }
        catch (ex) {
            console.error(ex);
        }
    }

    const BOARDROOM_ADDRESS = "0x7F28D5a90b3A0BE2e34accDEF255eC13cf695b1e";
    const ORACLE_ADDRESS = "0x2bb43b2e0fea3fa2bbadbf03fbb5c1e5950d293e";
    const REWARD_TOKEN_ADDRESS = "0xaCd8F2523a4613Eee78904354187c81Bb05ae2b8";
    const SAC_USDT_ADDRESS = "0x24A9CeD95BcEBDa453108E9cb1e1D3C21835B29C";
    const boardroomTvl = await loadBoardroom(App, prices, BOARDROOM_ADDRESS, ORACLE_ADDRESS, SAC_USDT_ADDRESS, REWARD_TOKEN_ADDRESS,
        "SAS", "SAC", 1, Infinity, 2, 1, 12);
    totalStaked += boardroomTvl.stakedTvl;

    _print_bold(`Total staked: $${formatMoney(totalStaked)}`)
  
    hideLoading();
  }