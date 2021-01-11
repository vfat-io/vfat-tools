$(function () {
    consoleInit();
    start(main);
});

async function main() {
    const Contracts = {
        Tokens: {
            XUS: "0x875650dD46b60c592d5a69a6719e4e4187A3ca81",
            XUSD: "0x1c9BA9144505aaBa12f4b126Fda9807150b88f80"
        },
        Pools: {
            WETH: "0x7E9320C98389CB43B957Ff2399eA315Bce72fdb4",
            DAI: "0xf13a49Eb6b2F6918500ee5cf8b39bb15a38F5b32", 
            USDC: "0x75aAf03CBF330e2b3F0623c55B7a528CFCAE8d75",
            USDT: "0x7d3fcd3825ae54e8e8ffd3d0ce95882330d54968"
        },
        Staking: {
            XUS_ETH: "0x39d8189306a254120EF88e0A465808BB6532d63B",
            XUS_XUSD: "0x608D8b1511Cb3eB7dbcCb5c626922EBfE7A62583",
            XUSD_DAI: "0x7b24E729aa3a39c0555509A486eA7a415b4Df934",
            XUSD_WETH: "0xdaB209915b683EA3cd338D20B07e3Bd63001b87A",
            LINK_XUSD: "0x5E20B7824f2A7Ba15fda7ECF1a2e6e05219De5aa"
        }
    }
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");

    var tokens = {};
    var prices = {};
    var totalStaked = 0;

    for (const [, address] of Object.entries(Contracts.Staking)) {
        const { staked_tvl } = await loadSynthetixPool(App, tokens, prices, XUSD_STAKING_POOL_ABI, address, 
            "rewardsToken", "stakingToken");
        totalStaked += staked_tvl;
    }
    _print_bold(`Total staked: $${formatMoney(totalStaked)}`)

    hideLoading();
}