$(function() {
    consoleInit();
    start(main);
});

async function main() {  
    const params = Contracts.TSD.Parameters;

    const calcPrice = twap => Math.min((twap - 1) / params.SupplyChangeDivisor, params.SupplyChangeLimit);
    
    loadDollar(Contracts.TSD, calcPrice);
}