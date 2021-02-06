$(function() {
    consoleInit();
    start(main);
});

async function main() {  
    const params = Dollars.QSD.Parameters;
    const calcPrice = twap => Math.min(twap - 1, params.SupplyChangeLimit);
    loadDollar(Dollars.QSD, calcPrice);
}