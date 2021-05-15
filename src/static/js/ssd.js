$(function() {
consoleInit(main)
});

async function main() {
    const params = Dollars.SSD.Parameters;

    const calcPrice = twap => Math.min((twap - 1) / params.SupplyChangeDivisor, params.SupplyChangeLimit);

    loadDollar(Dollars.SSD, calcPrice);
}
