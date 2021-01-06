$(function() {
    consoleInit();
    start(main);
});

async function main() {
    const CONTRACTS = [
        { address: "0x14E33e1D6Cc4D83D7476492C0A52b3d4F869d892", abi : MITH_USDTMIC_ABI, rewardToken: "mithShare", stakeToken: "lpt"},
        { address: "0x9D9418803F042CCd7647209b0fFd617981D5c619", abi : MITH_USDTMIC_ABI, rewardToken: "mithShare", stakeToken: "lpt"},
        /*
        { address: "0xd91121Ba462311626dA546C529b8F07c84805346", abi : MIC_MITH_ABI, rewardToken: "mithCash", stakeToken: "mith"},
        { address: "0xcE0058827e6c89E625e524D2fE6E3EF3d9BB6A0c", abi : MIC_DAI_ABI, rewardToken: "mithCash", stakeToken: "dai"},
        { address: "0xFEf1Bcc7097dD184b2Cdb574068CF01b7B437694", abi : MIC_YFI_ABI, rewardToken: "mithCash", stakeToken: "YFI"},
        { address: "0xFb64597ddA1345317A4f4f5DBA2425384bC5fA7B", abi : MIC_USDT_ABI, rewardToken: "mithCash", stakeToken: "usdt"},
        { address: "0x2F251D32D024938C4F98cFB8B22A2d1aF0d3167A", abi : MIC_ESD_ABI, rewardToken: "mithCash", stakeToken: "esd"},
        { address: "0xa40F333f7f5FA17810C4F98Ed1a4061854f0294d", abi : MIC_BAC_ABI, rewardToken: "mithCash", stakeToken: "bac"},
        { address: "0xdf8752BA251EF13f5A49Dcdd8E9D24809f078E91", abi : MIC_CREAM_ABI, rewardToken: "mithCash", stakeToken: "cream"},
        { address: "0x3B3CE26239Ddc65dC3fd2124D242Ad056338eAF1", abi : MIC_FRAX_ABI, rewardToken: "mithCash", stakeToken: "frax"},
        { address: "0x113690cb0EFa6A3D3F78c0F3BcA97cbCdc720903", abi : MIC_CRV_ABI, rewardToken: "mithCash", stakeToken: "crv"},
        { address: "0x8e861153324024a2F3b26912B498f0c531830198", abi : MIC_BUSD_ABI, rewardToken: "mithCash", stakeToken: "busd"},
        { address: "0x0555EEa5f419e18CFc338dEa66aE84Fa7A2fD2BA", abi : MIC_LINK_ABI, rewardToken: "mithCash", stakeToken: "link"},
        { address: "0x192376b6433164dc4bf64319E6443011a6E84235", abi : MIC_COMP_ABI, rewardToken: "mithCash", stakeToken: "comp"},
        { address: "0x7c0540852E552c2F6b981e89D2388E98935f9f4d", abi : MIC_AAVE_ABI, rewardToken: "mithCash", stakeToken: "aave"},
        { address: "0xd1DE064281745F576eBa9cBff251aB031A0B8e99", abi : MIC_SUSHI_ABI, rewardToken: "mithCash", stakeToken: "sushi"},
        { address: "0x52cC1501f081ba069EEDa35eE91E7bbeEdcca965", abi : MIC_SUSD_ABI, rewardToken: "mithCash", stakeToken: "susd"},
        { address: "0x27392910FC7921aC3B451E6a4568906371941df8", abi : MIC_USDC_ABI, rewardToken: "mithCash", stakeToken: "usdc"},
        */
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
    const BOARDROOM_ADDRESS = "0xb35f89160d1Dc47B6EAC1986D7821505c327AE09";
    const ORACLE_ADDRESS = "0x31f6DA78Fd83f55Eb3823364e4a103Cf9036b9FC";
    const MIC_USDT_SLP_ADDRESS = "0xc9cb53b48a2f3a9e75982685644c1870f1405ccb";
    const MIC_ADDRESS = "0x368b3a58b5f49392e5c9e4c998cb0bb966752e51"
    const boardroomTvl = await loadBoardroom(App, prices, BOARDROOM_ADDRESS, ORACLE_ADDRESS, MIC_USDT_SLP_ADDRESS, MIC_ADDRESS,
        "MIS", "MIC", 1, Infinity, 2, 1, 12);
    totalStaked += boardroomTvl.stakedTvl;
    _print_bold(`Total staked: $${formatMoney(totalStaked)}`)

    hideLoading();
}
