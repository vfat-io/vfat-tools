$(function() {
    consoleInit();
    start(main);
});

async function main() {  
    const params = Dollars.eEUR.Parameters;
    const calcPrice = (twap, totalCoupons, totalRedeemable) => calculateEmptySetChange(params, totalCoupons, totalRedeemable, twap)
    
    loadDollar(Dollars.eEUR, calcPrice);
}