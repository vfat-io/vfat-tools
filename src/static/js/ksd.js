$(function() {
    consoleInit();
    start(main);
});

async function main() {  
    const params = Dollars.KSD.Parameters;
    const calcPrice = (twap, totalCoupons, totalRedeemable) => calculateEmptySetChange(params, totalCoupons, totalRedeemable, twap)
    await loadDollar(Dollars.KSD, calcPrice);
}