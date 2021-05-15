$(function() {
consoleInit(main)
});

async function main() {
    const params = Contracts.FSD.Parameters;

    const calcPrice = twap => Math.min((twap - 1) / params.SupplyChangeDivisor, params.SupplyChangeLimit);

    loadDollar(Contracts.FSD, calcPrice);
}
