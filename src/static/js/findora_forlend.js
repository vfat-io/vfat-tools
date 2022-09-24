$(function () {
    consoleInit(main)
});

const FLD_ABI = {
    PoolCtroller: [
        {
            "inputs": [],
            "name": "GetPoolLength",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "pools",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ],
    pToken: [
        {
            "type": "constructor",
            "stateMutability": "nonpayable",
            "payable": false,
            "inputs": [
                { "type": "address", "name": "underlying_", "internalType": "address" },
                { "type": "address", "name": "comptroller_", "internalType": "contract ComptrollerInterface" },
                { "type": "address", "name": "chef_", "internalType": "contract ChefInterface" },
                { "type": "address", "name": "interestRateModel_", "internalType": "contract InterestRateModel" },
                { "type": "uint256", "name": "initialExchangeRateMantissa_", "internalType": "uint256" },
                { "type": "string", "name": "name_", "internalType": "string" },
                { "type": "string", "name": "symbol_", "internalType": "string" },
                { "type": "uint256", "name": "pid_borrow_", "internalType": "uint256" },
                { "type": "uint256", "name": "pid_supply_", "internalType": "uint256" },
                { "type": "uint8", "name": "decimals_", "internalType": "uint8" },
                { "type": "address", "name": "admin_", "internalType": "address payable" },
                { "type": "address", "name": "implementation_", "internalType": "address" },
                { "type": "bytes", "name": "becomeImplementationData", "internalType": "bytes" }
            ]
        },
        {
            "type": "event",
            "name": "AccrueInterest",
            "inputs": [
                { "type": "uint256", "name": "cashPrior", "internalType": "uint256", "indexed": false },
                { "type": "uint256", "name": "interestAccumulated", "internalType": "uint256", "indexed": false },
                { "type": "uint256", "name": "borrowIndex", "internalType": "uint256", "indexed": false },
                { "type": "uint256", "name": "totalBorrows", "internalType": "uint256", "indexed": false }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "Approval",
            "inputs": [
                { "type": "address", "name": "owner", "internalType": "address", "indexed": true },
                { "type": "address", "name": "spender", "internalType": "address", "indexed": true },
                { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "Borrow",
            "inputs": [
                { "type": "address", "name": "borrower", "internalType": "address", "indexed": false },
                { "type": "uint256", "name": "borrowAmount", "internalType": "uint256", "indexed": false },
                { "type": "uint256", "name": "accountBorrows", "internalType": "uint256", "indexed": false },
                { "type": "uint256", "name": "totalBorrows", "internalType": "uint256", "indexed": false }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "Failure",
            "inputs": [
                { "type": "uint256", "name": "error", "internalType": "uint256", "indexed": false },
                { "type": "uint256", "name": "info", "internalType": "uint256", "indexed": false },
                { "type": "uint256", "name": "detail", "internalType": "uint256", "indexed": false }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "LiquidateBorrow",
            "inputs": [
                { "type": "address", "name": "liquidator", "internalType": "address", "indexed": false },
                { "type": "address", "name": "borrower", "internalType": "address", "indexed": false },
                { "type": "uint256", "name": "repayAmount", "internalType": "uint256", "indexed": false },
                { "type": "address", "name": "cTokenCollateral", "internalType": "address", "indexed": false },
                { "type": "uint256", "name": "seizeTokens", "internalType": "uint256", "indexed": false }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "Mint",
            "inputs": [
                { "type": "address", "name": "minter", "internalType": "address", "indexed": true },
                { "type": "uint256", "name": "mintAmount", "internalType": "uint256", "indexed": false },
                { "type": "uint256", "name": "mintTokens", "internalType": "uint256", "indexed": false }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "NewAdmin",
            "inputs": [
                { "type": "address", "name": "oldAdmin", "internalType": "address", "indexed": false },
                { "type": "address", "name": "newAdmin", "internalType": "address", "indexed": false }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "NewComptroller",
            "inputs": [
                { "type": "address", "name": "oldComptroller", "internalType": "contract ComptrollerInterface", "indexed": false },
                { "type": "address", "name": "newComptroller", "internalType": "contract ComptrollerInterface", "indexed": false }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "NewImplementation",
            "inputs": [
                { "type": "address", "name": "oldImplementation", "internalType": "address", "indexed": false },
                { "type": "address", "name": "newImplementation", "internalType": "address", "indexed": false }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "NewMarketInterestRateModel",
            "inputs": [
                { "type": "address", "name": "oldInterestRateModel", "internalType": "contract InterestRateModel", "indexed": false },
                { "type": "address", "name": "newInterestRateModel", "internalType": "contract InterestRateModel", "indexed": false }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "NewPendingAdmin",
            "inputs": [
                { "type": "address", "name": "oldPendingAdmin", "internalType": "address", "indexed": false },
                { "type": "address", "name": "newPendingAdmin", "internalType": "address", "indexed": false }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "NewReserveFactor",
            "inputs": [
                { "type": "uint256", "name": "oldReserveFactorMantissa", "internalType": "uint256", "indexed": false },
                { "type": "uint256", "name": "newReserveFactorMantissa", "internalType": "uint256", "indexed": false }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "Redeem",
            "inputs": [
                { "type": "address", "name": "redeemer", "internalType": "address", "indexed": true },
                { "type": "uint256", "name": "redeemAmount", "internalType": "uint256", "indexed": false },
                { "type": "uint256", "name": "redeemTokens", "internalType": "uint256", "indexed": false }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "RepayBorrow",
            "inputs": [
                { "type": "address", "name": "payer", "internalType": "address", "indexed": false },
                { "type": "address", "name": "borrower", "internalType": "address", "indexed": false },
                { "type": "uint256", "name": "repayAmount", "internalType": "uint256", "indexed": false },
                { "type": "uint256", "name": "accountBorrows", "internalType": "uint256", "indexed": false },
                { "type": "uint256", "name": "totalBorrows", "internalType": "uint256", "indexed": false }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "ReservesAdded",
            "inputs": [
                { "type": "address", "name": "benefactor", "internalType": "address", "indexed": false },
                { "type": "uint256", "name": "addAmount", "internalType": "uint256", "indexed": false },
                { "type": "uint256", "name": "newTotalReserves", "internalType": "uint256", "indexed": false }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "ReservesReduced",
            "inputs": [
                { "type": "address", "name": "admin", "internalType": "address", "indexed": false },
                { "type": "uint256", "name": "reduceAmount", "internalType": "uint256", "indexed": false },
                { "type": "uint256", "name": "newTotalReserves", "internalType": "uint256", "indexed": false }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "Transfer",
            "inputs": [
                { "type": "address", "name": "from", "internalType": "address", "indexed": true },
                { "type": "address", "name": "to", "internalType": "address", "indexed": true },
                { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }
            ],
            "anonymous": false
        },
        { "type": "fallback", "stateMutability": "payable", "payable": true },
        { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "_acceptAdmin", "inputs": [], "constant": false },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "payable": false,
            "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }],
            "name": "_addReserves",
            "inputs": [{ "type": "uint256", "name": "addAmount", "internalType": "uint256" }],
            "constant": false
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "payable": false,
            "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }],
            "name": "_reduceReserves",
            "inputs": [{ "type": "uint256", "name": "reduceAmount", "internalType": "uint256" }],
            "constant": false
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "payable": false,
            "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }],
            "name": "_setComptroller",
            "inputs": [{ "type": "address", "name": "newComptroller", "internalType": "contract ComptrollerInterface" }],
            "constant": false
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "payable": false,
            "outputs": [],
            "name": "_setImplementation",
            "inputs": [
                { "type": "address", "name": "implementation_", "internalType": "address" },
                { "type": "bool", "name": "allowResign", "internalType": "bool" },
                { "type": "bytes", "name": "becomeImplementationData", "internalType": "bytes" }
            ],
            "constant": false
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "payable": false,
            "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }],
            "name": "_setInterestRateModel",
            "inputs": [{ "type": "address", "name": "newInterestRateModel", "internalType": "contract InterestRateModel" }],
            "constant": false
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "payable": false,
            "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }],
            "name": "_setPendingAdmin",
            "inputs": [{ "type": "address", "name": "newPendingAdmin", "internalType": "address payable" }],
            "constant": false
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "payable": false,
            "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }],
            "name": "_setReserveFactor",
            "inputs": [{ "type": "uint256", "name": "newReserveFactorMantissa", "internalType": "uint256" }],
            "constant": false
        },
        { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "accrualBlockNumber", "inputs": [], "constant": true },
        { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "accrueInterest", "inputs": [], "constant": false },
        { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "address", "name": "", "internalType": "address payable" }], "name": "admin", "inputs": [], "constant": true },
        {
            "type": "function",
            "stateMutability": "view",
            "payable": false,
            "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }],
            "name": "allowance",
            "inputs": [
                { "type": "address", "name": "owner", "internalType": "address" },
                { "type": "address", "name": "spender", "internalType": "address" }
            ],
            "constant": true
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "payable": false,
            "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }],
            "name": "approve",
            "inputs": [
                { "type": "address", "name": "spender", "internalType": "address" },
                { "type": "uint256", "name": "amount", "internalType": "uint256" }
            ],
            "constant": false
        },
        {
            "type": "function",
            "stateMutability": "view",
            "payable": false,
            "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }],
            "name": "balanceOf",
            "inputs": [{ "type": "address", "name": "owner", "internalType": "address" }],
            "constant": true
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "payable": false,
            "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }],
            "name": "balanceOfUnderlying",
            "inputs": [{ "type": "address", "name": "owner", "internalType": "address" }],
            "constant": false
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "payable": false,
            "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }],
            "name": "borrow",
            "inputs": [{ "type": "uint256", "name": "borrowAmount", "internalType": "uint256" }],
            "constant": false
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "payable": false,
            "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }],
            "name": "borrowBalanceCurrent",
            "inputs": [{ "type": "address", "name": "account", "internalType": "address" }],
            "constant": false
        },
        {
            "type": "function",
            "stateMutability": "view",
            "payable": false,
            "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }],
            "name": "borrowBalanceStored",
            "inputs": [{ "type": "address", "name": "account", "internalType": "address" }],
            "constant": true
        },
        { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "borrowIndex", "inputs": [], "constant": true },
        { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "borrowRatePerBlock", "inputs": [], "constant": true },
        { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "address", "name": "", "internalType": "contract ChefInterface" }], "name": "chef", "inputs": [], "constant": true },
        { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "address", "name": "", "internalType": "contract ComptrollerInterface" }], "name": "comptroller", "inputs": [], "constant": true },
        { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint8", "name": "", "internalType": "uint8" }], "name": "decimals", "inputs": [], "constant": true },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "payable": false,
            "outputs": [{ "type": "bytes", "name": "", "internalType": "bytes" }],
            "name": "delegateToImplementation",
            "inputs": [{ "type": "bytes", "name": "data", "internalType": "bytes" }],
            "constant": false
        },
        {
            "type": "function",
            "stateMutability": "view",
            "payable": false,
            "outputs": [{ "type": "bytes", "name": "", "internalType": "bytes" }],
            "name": "delegateToViewImplementation",
            "inputs": [{ "type": "bytes", "name": "data", "internalType": "bytes" }],
            "constant": true
        },
        { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "exchangeRateCurrent", "inputs": [], "constant": false },
        { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "exchangeRateStored", "inputs": [], "constant": true },
        {
            "type": "function",
            "stateMutability": "view",
            "payable": false,
            "outputs": [
                { "type": "uint256", "name": "", "internalType": "uint256" },
                { "type": "uint256", "name": "", "internalType": "uint256" },
                { "type": "uint256", "name": "", "internalType": "uint256" },
                { "type": "uint256", "name": "", "internalType": "uint256" }
            ],
            "name": "getAccountSnapshot",
            "inputs": [{ "type": "address", "name": "account", "internalType": "address" }],
            "constant": true
        },
        { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "getCash", "inputs": [], "constant": true },
        { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "implementation", "inputs": [], "constant": true },
        { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "address", "name": "", "internalType": "contract InterestRateModel" }], "name": "interestRateModel", "inputs": [], "constant": true },
        { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "isCToken", "inputs": [], "constant": true },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "payable": false,
            "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }],
            "name": "liquidateBorrow",
            "inputs": [
                { "type": "address", "name": "borrower", "internalType": "address" },
                { "type": "uint256", "name": "repayAmount", "internalType": "uint256" },
                { "type": "address", "name": "cTokenCollateral", "internalType": "contract CTokenInterface" }
            ],
            "constant": false
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "payable": false,
            "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }],
            "name": "mint",
            "inputs": [{ "type": "uint256", "name": "mintAmount", "internalType": "uint256" }],
            "constant": false
        },
        { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "name", "inputs": [], "constant": true },
        { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "address", "name": "", "internalType": "address payable" }], "name": "pendingAdmin", "inputs": [], "constant": true },
        { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "pid_borrow", "inputs": [], "constant": true },
        { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "pid_supply", "inputs": [], "constant": true },
        { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "protocolSeizeShareMantissa", "inputs": [], "constant": true },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "payable": false,
            "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }],
            "name": "redeem",
            "inputs": [{ "type": "uint256", "name": "redeemTokens", "internalType": "uint256" }],
            "constant": false
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "payable": false,
            "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }],
            "name": "redeemUnderlying",
            "inputs": [{ "type": "uint256", "name": "redeemAmount", "internalType": "uint256" }],
            "constant": false
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "payable": false,
            "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }],
            "name": "repayBorrow",
            "inputs": [{ "type": "uint256", "name": "repayAmount", "internalType": "uint256" }],
            "constant": false
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "payable": false,
            "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }],
            "name": "repayBorrowBehalf",
            "inputs": [
                { "type": "address", "name": "borrower", "internalType": "address" },
                { "type": "uint256", "name": "repayAmount", "internalType": "uint256" }
            ],
            "constant": false
        },
        { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "reserveFactorMantissa", "inputs": [], "constant": true },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "payable": false,
            "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }],
            "name": "seize",
            "inputs": [
                { "type": "address", "name": "liquidator", "internalType": "address" },
                { "type": "address", "name": "borrower", "internalType": "address" },
                { "type": "uint256", "name": "seizeTokens", "internalType": "uint256" }
            ],
            "constant": false
        },
        { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "supplyRatePerBlock", "inputs": [], "constant": true },
        { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [], "name": "sweepToken", "inputs": [{ "type": "address", "name": "token", "internalType": "contract EIP20NonStandardInterface" }], "constant": false },
        { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "symbol", "inputs": [], "constant": true },
        { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "totalBorrows", "inputs": [], "constant": true },
        { "type": "function", "stateMutability": "nonpayable", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "totalBorrowsCurrent", "inputs": [], "constant": false },
        { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "totalReserves", "inputs": [], "constant": true },
        { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "totalSupply", "inputs": [], "constant": true },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "payable": false,
            "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }],
            "name": "transfer",
            "inputs": [
                { "type": "address", "name": "dst", "internalType": "address" },
                { "type": "uint256", "name": "amount", "internalType": "uint256" }
            ],
            "constant": false
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "payable": false,
            "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }],
            "name": "transferFrom",
            "inputs": [
                { "type": "address", "name": "src", "internalType": "address" },
                { "type": "address", "name": "dst", "internalType": "address" },
                { "type": "uint256", "name": "amount", "internalType": "uint256" }
            ],
            "constant": false
        },
        { "type": "function", "stateMutability": "view", "payable": false, "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "underlying", "inputs": [], "constant": true }
    ],
    erc20: [
        {
            constant: true,
            inputs: [],
            name: 'symbol',
            outputs: [{ internalType: 'string', name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: true,
            inputs: [],
            name: 'decimals',
            outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
    ],
    oracle: [
        {
            inputs: [{ internalType: 'address', name: '_pToken', type: 'address' }],
            name: 'getUnderlyingPrice',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
    ],
    rate: [
        {
            inputs: [],
            name: 'blocksPerYear',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
    ],
}



const FORLEND_ABI = [
	{
		"inputs": [],
		"name": "harvest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "BONUS_MULTIPLIER",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "depositToken",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "getMultiplier",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "pendingReward",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "pid",
				"type": "uint256"
			}
		],
		"name": "poolInfo",
		"outputs": [
			{
				"components": [
					{
						"internalType": "contract IERC20",
						"name": "lpToken",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "allocPoint",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "lastRewardTimestamp",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "accForlendPerShare",
						"type": "uint256"
					}
				],
				"internalType": "struct PoolInfo",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "rewardPerBlock",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "rewardToken",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalDeposit",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userInfo",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "rewardDebt",
						"type": "uint256"
					}
				],
				"internalType": "struct UserInfo",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const Pools = [
    "0x395Be0A2Dd11a55104C637f33Dd8EAedc76d0097"
].map(a => ({
    address: a,
    abi: FORLEND_ABI,
    stakeTokenFunction: "depositToken"
}))

const contracts = {
    PoolCtroller: '0x40cE0de5fA5AFD6d519f3aa273288e7c6ce54675',
    oracle: '0xdadBe4A286248b83A7dFECcDF67535bA4eC1A49c',
    gas: {
        p_address: '0xBd4EEdA5062605f3C3b86039c5F2c5880F9ecD95',
        symbol: 'FRA',
        decimals: 18,
    },
};

async function main() {
    const App = await init_ethers();
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");    

    var tokens = {};
    const prices = await getFindoraPrices();

   let p = await loadMultipleForlendSynthetixPools(App, tokens, prices, Pools)
    _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
    if (p.totalUserStaked > 0) {
        _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalApr * 100).toFixed(2)}%\n`);
    }

    /* Incomplete, Complete later
    
    _print("");

    const allMarkets = ["0xBd4EEdA5062605f3C3b86039c5F2c5880F9ecD95","0x02eCdC25F412C464A7495Cd91E04A4DbcB188936","0xBf6cB8608DC0Df2fb02F0aF0F21829e7962b691D","0xCC5E4a09F071c4DD24E4d48Fe170C3ba9415cC8F","0x1486d107CdE1F9dA4f6F9e33e47Fa14d9dcA69af"]

//    console.log(allMarkets)

    const data = await Promise.all(allMarkets.map(token => loadData(App, token)));

  //  console.log(data);

    let [totalSupply, totalBorrow, totalCash] = [0, 0, 0];

    for (const market of data) {
        totalSupply += market.totalSupply * market.underlyingPrice;
        totalBorrow += market.totalBorrows * market.underlyingPrice;
        totalCash += market.cash * market.underlyingPrice;
    }
    _print_bold(`Deposit Market Size : $${formatMoney(totalSupply)}`);
    _print_bold(`Borrow Market Size : $${formatMoney(totalBorrow)}`);
    _print_bold(`TVL : $${formatMoney(totalCash)}`);
    _print("");

    for (const market of data) {
        printData(market);
    }
    */

    hideLoading();
}

async function loadMultipleForlendSynthetixPools(App, tokens, prices, pools) {
    let totalStaked = 0,
      totalUserStaked = 0,
      individualAPRs = []
    const infos = await Promise.all(
      pools.map(p =>
        loadForlendSynthetixPoolInfo(App, tokens, prices, p.abi, p.address, p.stakeTokenFunction)
      )
    )
    for (const i of infos) {
      let p = await printSynthetixPool(App, i, 'findora')
      totalStaked += p.staked_tvl || 0
      totalUserStaked += p.userStaked || 0
      if (p.userStaked > 0) {
        individualAPRs.push((p.userStaked * p.apr) / 100)
      }
    }
    let totalApr = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x, y) => x + y, 0) / totalUserStaked
    return {staked_tvl: totalStaked, totalUserStaked, totalApr}
  }

async function loadForlendSynthetixPoolInfo(
  App,
  tokens,
  prices,
  stakingAbi,
  stakingAddress,
  stakeTokenFunction
) {
  const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider)
  const STAKING_MULTI = new ethcall.Contract(stakingAddress, stakingAbi)

  if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
    console.log("Couldn't find stake function ", stakeTokenFunction)
  }
  const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]()

  const rewardTokenAddress = await STAKING_POOL.rewardToken()

  var stakeToken = await getFindoraToken(App, stakeTokenAddress, stakingAddress)
  stakeToken.staked = await STAKING_POOL.totalDeposit() / 10 ** stakeToken.decimals;

  var newPriceAddresses = stakeToken.tokens.filter(x => !getParameterCaseInsensitive(prices, x))
  var newPrices = await lookUpTokenPrices(newPriceAddresses)
  for (const key in newPrices) {
    if (newPrices[key]?.usd) prices[key] = newPrices[key]
  }
  var newTokenAddresses = stakeToken.tokens.filter(x => !getParameterCaseInsensitive(tokens, x))
  for (const address of newTokenAddresses) {
    tokens[address] = await getFindoraToken(App, address, stakingAddress)
  }
  if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
    tokens[rewardTokenAddress] = await getFindoraToken(App, rewardTokenAddress, stakingAddress)
  }
  const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress)

  const rewardTokenTicker = rewardToken.symbol

  const poolPrices = getPoolPrices(tokens, prices, stakeToken, 'findora')

  if (!poolPrices) {
    console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`)
    return null
  }

  const stakeTokenTicker = poolPrices.stakeTokenTicker

  const stakeTokenPrice = prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd
  const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd

    const rewardRate = await STAKING_POOL.rewardPerBlock()
    const balance = await STAKING_POOL.userInfo(App.YOUR_ADDRESS)
    const earned_ = await STAKING_POOL.pendingReward(App.YOUR_ADDRESS)

  const weeklyRewards = rewardRate / 1e18 * 604800 / 17.5

  const usdPerWeek = weeklyRewards * rewardTokenPrice

  const staked_tvl = poolPrices.staked_tvl

  const userStaked = balance.amount / 10 ** stakeToken.decimals

  const userUnstaked = stakeToken.unstaked

  const earned = earned_ / 10 ** rewardToken.decimals

  return {
    stakingAddress,
    poolPrices,
    stakeTokenAddress,
    rewardTokenAddress,
    stakeTokenTicker,
    rewardTokenTicker,
    stakeTokenPrice,
    rewardTokenPrice,
    weeklyRewards,
    usdPerWeek,
    staked_tvl,
    userStaked,
    userUnstaked,
    earned,
  }
}

async function loadData(App, token) {

    const PTOKEN_CONTRACT = new ethers.Contract(token, FLD_ABI.pToken, App.provider);

    const totalReserves_ = await PTOKEN_CONTRACT.totalReserves();
    const totalSupply_ = await PTOKEN_CONTRACT.totalSupply();
    const supply_ = await PTOKEN_CONTRACT.balanceOf(App.YOUR_ADDRESS);
    const exchangeRate_ = await PTOKEN_CONTRACT.exchangeRateStored();
    const supplyRatePerBlock_ = await PTOKEN_CONTRACT.supplyRatePerBlock();
    const totalBorrows_ = await PTOKEN_CONTRACT.totalBorrows();
    const borrowBalanceOf_ = await PTOKEN_CONTRACT.borrowBalanceStored(App.YOUR_ADDRESS);
    const borrowRatePerBlock_ = await PTOKEN_CONTRACT.borrowRatePerBlock();
    const cash_ = await PTOKEN_CONTRACT.getCash();
    const interestRateModel = await PTOKEN_CONTRACT.interestRateModel();

    let underlyingSymbol, underlyingDecimals;

    if (token.toLowerCase() === contracts.gas.p_address.toLowerCase()) {
        underlyingSymbol = contracts.gas.symbol;
        underlyingDecimals = contracts.gas.decimals;
    } else {
        const underlying = await PTOKEN_CONTRACT.underlying();
        const UNDERLYING_CONTRACT = new ethers.Contract(underlying, FLD_ABI.erc20, App.provider);
        underlyingSymbol = await UNDERLYING_CONTRACT.symbol();
        underlyingDecimals = await UNDERLYING_CONTRACT.decimals();
    }

    const ORACLE_CONTRACT = new ethers.Contract(contracts.oracle, FLD_ABI.oracle, App.provider);
    const underlyingPrice_ = await ORACLE_CONTRACT.getUnderlyingPrice(token);
    const underlyingPrice = underlyingPrice_ / 10 ** (18 + 18 - underlyingDecimals);

    const totalReserves = totalReserves_ / 10 ** underlyingDecimals;

    const exchangeRate = exchangeRate_ / 1e18;
    const totalSupply = totalSupply_ * exchangeRate / 10 ** underlyingDecimals;
    const supply = supply_ * exchangeRate / 10 ** underlyingDecimals;
    const supplyPct = supply / totalSupply * 100;

    const totalBorrows = totalBorrows_ / 10 ** underlyingDecimals;
    const borrow = borrowBalanceOf_ / 10 ** underlyingDecimals;
    const borrowPct = borrow / totalBorrows * 100;

    const cash = cash_ / 10 ** underlyingDecimals;

    //const RATE_CONTRACT = new ethers.Contract(interestRateModel, FLD_ABI.rate, App.provider);
    //const blocksPerYear = await RATE_CONTRACT.blocksPerYear();

    const supplyAPY = ((1 + supplyRatePerBlock_ / 1e18) ** 31536000 - 1) * 100;
    const borrowAPY = ((1 + borrowRatePerBlock_ / 1e18) ** 31536000 - 1) * 100;

    const supplyFarmingAPY = 0;
    const borrowFarmingAPY = 0;

    const supplyNetAPY = supplyAPY + supplyFarmingAPY
    const borrowNetAPY = borrowFarmingAPY - borrowAPY

    const supplyUsdPerYear = supply * underlyingPrice * supplyNetAPY / 100;
    const supplyUsdPerWeek = supplyUsdPerYear / 52;
    const supplyUsdPerDay = supplyUsdPerYear / 365;

    const borrowUsdPerYear = borrow * underlyingPrice * borrowNetAPY / 100;
    const borrowUsdPerWeek = borrowUsdPerYear / 52;
    const borrowUsdPerDay = borrowUsdPerYear / 365;


    return {
        underlyingSymbol,
        underlyingPrice,
        totalSupply,
        totalBorrows,
        totalReserves,
        cash,
        supplyAPY,
        borrowAPY,
        supplyFarmingAPY,
        borrowFarmingAPY,
        supplyNetAPY,
        borrowNetAPY,
        supply,
        supplyUsdPerDay,
        supplyUsdPerWeek,
        supplyUsdPerYear,
        borrow,
        borrowUsdPerDay,
        borrowUsdPerWeek,
        borrowUsdPerYear,
        supplyPct,
        borrowPct
    }
}

async function printData(data) {
    _print_bold(`${data.underlyingSymbol} ($${formatMoney(data.underlyingPrice, 4)})`);
    _print(`Supplied : ${formatMoney(data.totalSupply)} ($${formatMoney(data.totalSupply * data.underlyingPrice)}) at ${data.supplyAPY.toFixed(2)}% APY`)
    _print(`Borrowed : ${formatMoney(data.totalBorrows)} ($${formatMoney(data.totalBorrows * data.underlyingPrice)}) at ${data.borrowAPY.toFixed(2)}% APY`)
    _print(`Reserves : ${formatMoney(data.totalReserves)} ($${formatMoney(data.totalReserves * data.underlyingPrice)})`);
    _print(`Farming APY Supply ${data.supplyFarmingAPY.toFixed(2)}% Borrow ${data.borrowFarmingAPY.toFixed(2)}%`);
    _print(`Net APY Supply ${data.supplyNetAPY.toFixed(2)}% Borrow ${data.borrowNetAPY.toFixed(2)}%`);
    if (data.supply > 0) {
        _print(`You are supplying ${formatMoney(data.supply)} ${data.underlyingSymbol} ($${formatMoney(data.supply * data.underlyingPrice)}), ${(data.supplyPct).toFixed(2)}% of the pool.`)
        _print(`Estimated Supply earnings: Day ($${formatMoney(data.supplyUsdPerDay)}) Week ($${formatMoney(data.supplyUsdPerWeek)}) Year: ($${formatMoney(data.supplyUsdPerYear)})`);
    }
    if (data.borrow > 0) {
        _print(`You are borrowing ${formatMoney(data.borrow)} ${data.underlyingSymbol} ($${formatMoney(data.borrow * data.underlyingPrice)}), ${(data.borrowPct).toFixed(2)}% of the pool.`)
        _print(`Estimated Borrow earnings: Day ($${formatMoney(data.borrowUsdPerDay)}) Week ($${formatMoney(data.borrowUsdPerWeek)}) Year: ($${formatMoney(data.borrowUsdPerYear)})`);
    }
    _print("");
}
