$(function() {
    consoleInit();
    start(main);
});

async function loadLP(App, LP,fluidEpochs, epoch) {
    const staged = await LP.balanceOfStaged(App.YOUR_ADDRESS) / 1e18;
    const bonded = await LP.balanceOfBonded(App.YOUR_ADDRESS) / 1e18;
    const rewarded = await LP.balanceOfRewarded(App.YOUR_ADDRESS) / 1e18;
    const claimable = await LP.balanceOfClaimable(App.YOUR_ADDRESS) / 1e18;
    const status = await LP.statusOf(App.YOUR_ADDRESS) ? "Fluid" : "Frozen";
    
    _print(`Your LP status is ${status}`);
    _print(`You have ${staged.toFixed(8)} staged USDC-DSD LP`);
    _print(`You have ${bonded.toFixed(8)} bonded USDC-DSD LP`);
    _print(`You have ${rewarded.toFixed(2)} rewarded DSD`);
    _print(`You have ${claimable.toFixed(2)} claimable DSD`);
    if (status == "Fluid") {
        const unbondFilter = LP.filters.Unbond(App.YOUR_ADDRESS);
        const unbonds = await LP.queryFilter(unbondFilter);
        if (unbonds?.length ?? 0 > 0) {
            const lastUnbond = Math.max(unbonds.map(u => u.args.start / 1));
            _print(`You unbonded at epoch ${lastUnbond}.`)
            _print(`You will become Frozen in ${lastUnbond+fluidEpochs-epoch} epochs.`);
        }
    }
}

async function main() {  
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const DAO = new ethers.Contract(Contracts.DSD.DAO.address, 
        Contracts.DSD.DAO.abi, App.provider);

    const LP = new ethers.Contract(Contracts.DSD.LPIncentivizationPool.address,
        Contracts.DSD.LPIncentivizationPool.abi, App.provider);

    const bonded = await DAO.balanceOfBonded(App.YOUR_ADDRESS) / 1e18;
    const staged = await DAO.balanceOfStaged(App.YOUR_ADDRESS) / 1e18;
    const status = await DAO.statusOf(App.YOUR_ADDRESS) ? "Fluid" : "Frozen";
    const epoch = await DAO.epoch();
    _print(`Current Epoch: ${epoch}\n`);
    
    _print(`Your DAO status is ${status}`);
    _print(`You have ${staged.toFixed(2)} staged DSD`);
    _print(`You have ${bonded.toFixed(2)} bonded DSD`);
    if (status == "Fluid") {
        const unbondFilter = DAO.filters.Unbond(App.YOUR_ADDRESS);
        const unbonds = await DAO.queryFilter(unbondFilter);
        if (unbonds?.length ?? 0 > 0) {
            const lastUnbond = Math.max(unbonds.map(u => u.args.start / 1));
            _print(`You unbonded at epoch ${lastUnbond}.`)
            _print(`You will become Frozen in ${lastUnbond+36-epoch} epochs.`);
        }
    }
    _print('\n');
    await loadLP(App, LP,12,epoch);
    hideLoading();  
}