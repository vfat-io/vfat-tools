$(function() {
    consoleInit();
    start(main);
});

const calculateChange = (params, totalCoupons, totalRedeemable, price) => {
    if (price > 1 + params.CouponSupplychangeLimit && totalCoupons > totalRedeemable) {
        return params.CouponSupplychangeLimit
    } else if (
        1 + params.CouponSupplychangeLimit >= price &&
        price > 1 + params.SupplyChangeLimit &&
        totalCoupons > totalRedeemable
    ) {
        return Math.abs(price - 1)
    } else if (price > 1 + params.SupplyChangeLimit) {
        return params.SupplyChangeLimit
    } else if (price < 1 - params.SupplyChangeLimit) {
        return params.SupplyChangeLimit
    } else {
        return Math.abs(price - 1)
    }
}

async function main() {  
    const params = Contracts.ESG.Parameters;
    const calcPrice = (twap, totalCoupons, totalRedeemable) => calculateChange(params, totalCoupons, totalRedeemable, twap)
    await loadDollar(Contracts.ESG, calcPrice);
}