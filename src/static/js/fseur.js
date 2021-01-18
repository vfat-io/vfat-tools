$(function() {
    consoleInit();
    start(main);
});

async function main() {  
    const params = Dollars.FSEUR.Parameters;

    const calcPrice = twap => Math.min((twap - 1) / params.SupplyChangeDivisor, params.SupplyChangeLimit);
    
    loadDollar(Dollars.FSEUR, calcPrice);
}