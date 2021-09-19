$(function() {
    consoleInit(main)
});

const BORROWABLE_ABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"interestAccumulated","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"borrowIndex","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalBorrows","type":"uint256"}],"name":"AccrueInterest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"borrower","type":"address"},{"indexed":true,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"borrowAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"repayAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"accountBorrowsPrior","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"accountBorrows","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalBorrows","type":"uint256"}],"name":"Borrow","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"BorrowApproval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"borrowRate","type":"uint256"}],"name":"CalculateBorrowRate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"kinkRate","type":"uint256"}],"name":"CalculateKink","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"borrower","type":"address"},{"indexed":true,"internalType":"address","name":"liquidator","type":"address"},{"indexed":false,"internalType":"uint256","name":"seizeTokens","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"repayAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"accountBorrowsPrior","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"accountBorrows","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalBorrows","type":"uint256"}],"name":"Liquidate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"minter","type":"address"},{"indexed":false,"internalType":"uint256","name":"mintAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"mintTokens","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newAdjustSpeed","type":"uint256"}],"name":"NewAdjustSpeed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newBorrowTracker","type":"address"}],"name":"NewBorrowTracker","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newKinkUtilizationRate","type":"uint256"}],"name":"NewKinkUtilizationRate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newReserveFactor","type":"uint256"}],"name":"NewReserveFactor","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"redeemer","type":"address"},{"indexed":false,"internalType":"uint256","name":"redeemAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"redeemTokens","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"totalBalance","type":"uint256"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"underlying","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"exchangeRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"minter","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"mintTokens","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"redeemer","type":"address"}],"name":"redeem","outputs":[{"internalType":"uint256","name":"redeemAmount","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sync","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"_setFactory","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"BORROW_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"collateral","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reserveFactor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exchangeRateLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"borrowIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBorrows","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"borrowAllowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"}],"name":"borrowBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"borrowTracker","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"BORROW_PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"borrowApprove","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"borrowPermit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"borrowAmount","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"borrow","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"},{"internalType":"address","name":"liquidator","type":"address"}],"name":"liquidate","outputs":[{"internalType":"uint256","name":"seizeTokens","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"}],"name":"trackBorrow","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"KINK_BORROW_RATE_MAX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"KINK_BORROW_RATE_MIN","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"KINK_MULTIPLIER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"borrowRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"kinkBorrowRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"kinkUtilizationRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"adjustSpeed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rateUpdateTimestamp","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"accrualTimestamp","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"accrueInterest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"RESERVE_FACTOR_MAX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"KINK_UR_MIN","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"KINK_UR_MAX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"ADJUST_SPEED_MIN","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"ADJUST_SPEED_MAX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"address","name":"_underlying","type":"address"},{"internalType":"address","name":"_collateral","type":"address"}],"name":"_initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newReserveFactor","type":"uint256"}],"name":"_setReserveFactor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newKinkUtilizationRate","type":"uint256"}],"name":"_setKinkUtilizationRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newAdjustSpeed","type":"uint256"}],"name":"_setAdjustSpeed","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newBorrowTracker","type":"address"}],"name":"_setBorrowTracker","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const PAIRS = [
    {
        borrowable0: {
            symbol: "BTC",
            address: "0x5471D65EEE567b393d7cFC0b7f132EfC74cC32f1",
            decimals: 8,
        },
        borrowable1: {
            symbol: "ETH",
            address: "0xB81af0eE6959d437E3A29A94C89ecD04fE76171A",
            decimals: 18,
        },
    },
    {
        borrowable0: {
            symbol: "IMX",
            address: "0x164584419461C30f3d2692fD6a936E28eC282f56",
            decimals: 18,
        },
        borrowable1: {
            symbol: "ETH",
            address: "0x52778dc7916c4810E9a2682E7d1fe674b1Fd65ac",
            decimals: 18,
        },
    },
    {
        borrowable0: {
            symbol: "USDC",
            address: "0x086f1f8799268d0308B81305EA9D5f5e622aAA4d",
            decimals: 6,
        },
        borrowable1: {
            symbol: "ETH",
            address: "0x4E7c57461a23a973C5487F0658C660aa52Dd196D",
            decimals: 18,
        },
    },
    {
        borrowable0: {
            symbol: "USDT",
            address: "0xeb348420558B947E98C32ECa3E0C6DE85Ade0352",
            decimals: 6,
        },
        borrowable1: {
            symbol: "ETH",
            address: "0x0907064c89B4a717AC33caD36318Ae0161E58E9e",
            decimals: 18,
        },
    },
    {
        borrowable0: {
            symbol: "NYAN",
            address: "0x18Ac4f0B24f46C6E060Ac6102d9F9517C493844a",
            decimals: 18,
        },
        borrowable1: {
            symbol: "ETH",
            address: "0xF4EC6DC712E78D948B5aF3BE34E4De8a93f17A23",
            decimals: 18,
        },
    },
    {
        borrowable0: {
            symbol: "SUSHI",
            address: "0x929c2Ad7a4b22E4968ecB6B87c9698CEb20DdB3f",
            decimals: 18,
        },
        borrowable1: {
            symbol: "ETH",
            address: "0x908221669C081a79b13F656f0F814C2c419167f9",
            decimals: 18,
        },
    },
];

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    for (const pair of PAIRS) {
        _print("\n");
        _print(pair.borrowable0.symbol + '-' + pair.borrowable1.symbol + '\n');
        for (const borrowable of [pair.borrowable0, pair.borrowable1]) {
            const borrowableContract = new ethers.Contract(borrowable.address, BORROWABLE_ABI, App.provider);
            const mantissa = 10 ** borrowable.decimals;
            const totalBalance = await borrowableContract.totalBalance() / mantissa;
            const totalBorrowed = await borrowableContract.totalBorrows() / mantissa;
            const borrowRate = await borrowableContract.borrowRate() / 1e18 * 365 * 24 * 3600;
            const reserveFactor = await borrowableContract.reserveFactor() / 1e18;
            const kinkUtilizationRate = await borrowableContract.kinkUtilizationRate() / 1e18;
            const totalSupplied = totalBalance + totalBorrowed;
            const utilizationRate = totalBorrowed / totalSupplied;
            _print(borrowable.symbol);
            _print("Total supplied: " + totalSupplied);
            _print("Total borrowed: " + totalBorrowed);
            _print("Supply APR: " + (borrowRate * utilizationRate * (1 - reserveFactor) * 100) + "%");
            _print("Borrow APR: " + (borrowRate * 100) + "%");
            _print("Utilization Rate: " + (utilizationRate * 100) + "%");
            _print("Kink Utilization Rate: " + (kinkUtilizationRate * 100) + "%\n");
        }
    }

    hideLoading();
}
