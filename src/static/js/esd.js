$(function() {
    consoleInit();
    start(main);
});

async function loadPool(App, pool) {
    const bonded = await pool.balanceOfBonded(App.YOUR_ADDRESS) / 1e18;
    const staged = await pool.balacneOfStaged(App.YOUR_ADDRESS) / 1e18;
    const status = await pool.statusOf(App.YOUR_ADDRESS); //true is locked
    const fluidUntil = await pool.fluidUntil(App.YOUR_ADDRESS);
    const epoch = await pool.epoch();
    console.log(`Current Epoch: ${epoch}`);
    console.log(`You have ${staged.toFixed(2)} staged ESD`);
    console.log(`You have ${bonded.toFixed(2)} bonded ESD`);
    if (status) {
        console.log(`You are locked until epoch ${fluidUntil}`);
    }
    else {
        console.log(`You are not locked.`);
    }

}

async function main() {  
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const DAO = new ethers.Contract(Contracts.ESD.DAO.address, 
        Contracts.ESD.DAO.abi, App.provider);

    const LP = new ethers.Contract(Contracts.ESD.LPIncentivizationPool.address,
        Contracts.ESD.LPIncentivizationPool.abi, App.provider);

    await loadPool(App, DAO);
    await loadPool(App, LP);
    hideLoading();  
}