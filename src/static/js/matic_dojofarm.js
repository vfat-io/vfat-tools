$(function () {
    consoleInit(main)
    });
    
    
    const DOJO_CHEF_ABI = []

    async function main() {
        const App = await init_ethers();
    
        _print(`Initialized ${App.YOUR_ADDRESS}\n`);
        _print("Reading smart contracts...\n");
    
        const DOJO_CHEF_ADDR = "0xCc7E7c9FC775D25176e9Bfc5A400EdAc212aa81C";
        const rewardTokenTicker = "DOJO";
        const DOJO_CHEF = new ethers.Contract(DOJO_CHEF_ADDR, DOJO_CHEF_ABI, App.provider);
    
        const rewardsPerWeek = await DOJO_CHEF.DojoPerBlock() / 1e18 *
                604800 / 2.1;
        
    
        const tokens = {};
        const prices = await getMaticPrices();
    
        await loadMaticChefContract(App, tokens, prices, DOJO_CHEF, DOJO_CHEF_ADDR, DOJO_CHEF_ABI, rewardTokenTicker,
            "dojo", null, rewardsPerWeek, "pendingDojo");
    
        hideLoading();
    }
    