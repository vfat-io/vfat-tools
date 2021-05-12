$(function() {
consoleInit(main)
});

async function main() {
    const params = Contracts._1SD.Parameters;
    const calcPrice = (twap, totalCoupons, totalRedeemable) => calculateEmptySetChange(params, totalCoupons, totalRedeemable, twap)
    await loadDollar(Contracts._1SD, calcPrice);
}
