$(function() {
    consoleInit();
    start(main);
});

async function main() {  
    const params = Dollars.ZaiFi.Parameters;
    const calcPrice = (twap, totalCoupons, totalRedeemable) => calculateEmptySetChange(params, totalCoupons, totalRedeemable, twap)    
    loadDollar(Dollars.ZaiFi, calcPrice);
}