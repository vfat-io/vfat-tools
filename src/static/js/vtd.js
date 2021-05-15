$(function() {
consoleInit(main)
});

async function main() {
    const params = Dollars.VTD.Parameters;

    const calcPrice = twap => Math.min((twap - 1) / params.SupplyChangeDivisor, params.SupplyChangeLimit);

    const getEpochPeriod = async (DAO) => await DAO.nextEpochTimestamp() - await DAO.previousEpochTimestamp();

    loadDollar(Dollars.VTD, calcPrice, getEpochPeriod, getVTDtwap);
}
