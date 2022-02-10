$(function() {
    consoleInit(main)
});

const WOW_CHAIN_PARAMETERS = {
    CHAIN: "ethereum",
    PAIR_FACTORY_ADDRESS: "0x403aD1530de516A99e23dF1B5df926DF4A5e6b8F",
    RESERVE_FACTORY_ADDRESS: "0xe23d0839DC1aA2b92cBb2919A675DA8A981145E6",
    PARAM_PROVIDER_FACTORY_ADDRESS: "0x738e26582E97654084a53E6c1062f30FAFF8C686",
    WRAPPED_NATIVE_TOKEN_ADDRESS: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    NATIVE_TOKEN_SYMBOL: "ETH"
}

const WOW_CONSTANTS = {
    RAY: ethers.BigNumber.from(10).pow(27),
    YEAR: ethers.BigNumber.from(365 * 24 * 60 * 60),
    ADDRESS_ZERO: "0x0000000000000000000000000000000000000000",
    RESERVES_CHUNK_SIZE: 10,

    PAIR_FACTORY_ABI: [{inputs:[],name:"getAllShortables",outputs:[{internalType:"bytes32[]",name:"",type:"bytes32[]"}],stateMutability:"view",type:"function"}],
    RESERVE_FACTORY_ABI: [{inputs:[],name:"getAllLendables",outputs:[{internalType:"bytes32[]",name:"",type:"bytes32[]"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"lendable",type:"address"}],name:"getReserve",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"}],
    RESERVE_ABI: [{inputs:[],name:"getTotalLiquidity",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"getReserveDebt",outputs:[{internalType:"uint256",name:"liquidity",type:"uint256"},{internalType:"uint256",name:"principalDebt",type:"uint256"},{internalType:"uint256",name:"currentDebt",type:"uint256"},{internalType:"uint256",name:"averageRate",type:"uint256"},{internalType:"uint256",name:"lastUpdate",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"getLiquidityRate",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"}],
    PARAM_PROVIDER_FACTORY_ABI: [{"inputs": [{"internalType": "address","name": "lendable","type": "address"}],"name": "getReserveParamProvider","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},],
    PARAM_PROVIDER_ABI: [{"inputs": [],"name": "treasureFactor","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},]
}

const WOWswap = {
    async getTokenPrices (id_array, chain = WOW_CHAIN_PARAMETERS.CHAIN) {
        const prices = {}
        for (const id_chunk of chunk(id_array, 50)) {
            let ids = id_chunk.join('%2C')
            let res = await $.ajax({
                url: `https://api.coingecko.com/api/v3/simple/token_price/${chain}?contract_addresses=${ids}&vs_currencies=usd`,
                type: 'GET',
            })
            for (const [key, v] of Object.entries(res)) {
                if (v.usd) prices[key] = v;
            }
        }
        return prices
    },

    calcAPY(rate) {
        let el = rate.mul(WOW_CONSTANTS.YEAR);
        let result = WOW_CONSTANTS.RAY.add(el);
        for (let i = 1; i < 5; i++) {
            if (WOW_CONSTANTS.YEAR.lte(i)) {
                return result;
            }
            el = el.mul(WOW_CONSTANTS.YEAR.sub(i)).mul(rate).div(WOW_CONSTANTS.RAY).div(i + 1);
            result = result.add(el);
        }
        return (result / 1e27 - 1) * 100;
    },

    async getToken(App, tokenAddress, price) {
        const token = new ethcall.Contract(tokenAddress, ERC20_ABI, App.provider)
        if (tokenAddress === WOW_CHAIN_PARAMETERS.WRAPPED_NATIVE_TOKEN_ADDRESS) {
            const [decimals] = await App.ethcallProvider.all([token.decimals()])
            return {address: token.address, symbol: WOW_CHAIN_PARAMETERS.NATIVE_TOKEN_SYMBOL, decimals, price}
        }
        let [symbol, decimals] = await App.ethcallProvider.all([token.symbol(), token.decimals()])
        return {address: token.address, symbol, decimals, price}
    },

    async getReserve(App, reserveFactory, paramProviderFactory, tokenAddress, price) {
        const [reserveAddress] = await App.ethcallProvider.all([reserveFactory.getReserve(tokenAddress)])
        if (reserveAddress === WOW_CONSTANTS.ADDRESS_ZERO) {
            return undefined;
        }
        const [paramProviderAddress] = await App.ethcallProvider.all([paramProviderFactory.getReserveParamProvider(tokenAddress)])
        const reserve = new ethcall.Contract(reserveAddress, WOW_CONSTANTS.RESERVE_ABI, App.provider)
        const paramProvider = new ethcall.Contract(paramProviderAddress, WOW_CONSTANTS.PARAM_PROVIDER_ABI, App.provider)
        const token = await this.getToken(App, tokenAddress, price)
        try {
            const [reserveDebt, treasureFactor] = await App.ethcallProvider.all([reserve.getReserveDebt(), paramProvider.treasureFactor()])
            const deposited = reserveDebt.liquidity.add(reserveDebt.currentDebt) / 10 ** (await token).decimals
            const borrowed = reserveDebt.currentDebt / 10 ** token.decimals
            const borrowAPY = this.calcAPY(reserveDebt.averageRate)
            const reserves = deposited - borrowed
            const utilization = deposited > 0 ? (borrowed / deposited) : 0
            const depositAPY = borrowAPY * utilization * (1 - treasureFactor / 10_000)
            return {
                token,
                address: reserve.address,
                deposited,
                depositAPY,
                borrowed,
                borrowAPY,
                reserves,
                utilization,
            }
        } catch (e) {
            return {
                token,
                address: reserve.address,
                deposited: 0,
                depositAPY: 0,
                borrowed: 0,
                borrowAPY: 0,
                reserves: 0,
                utilization: 0,
            }
        }
    },

    printReserve(reserve) {
        const price = reserve.token.price;
        _print_bold(`${reserve.token.symbol} ($${formatMoney(price)})`);
        _print(`Deposited   : ${formatMoney(reserve.deposited)} ($${formatMoney(reserve.deposited * price)}) at ${reserve.depositAPY.toFixed(2)}% APY`)
        _print(`Borrowed    : ${formatMoney(reserve.borrowed)} ($${formatMoney(reserve.borrowed * price)}) at ${reserve.borrowAPY.toFixed(2)}% APY`)
        _print(`Reserves    : ${formatMoney(reserve.reserves)} ($${formatMoney(reserve.reserves * price)})`)
        _print(`Utilization : ${(reserve.utilization * 100).toFixed(2)}%`)
        _print("");
    },
}


const main = async () => {
    const App = await init_ethers();
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
    const pairFactory = new ethcall.Contract(WOW_CHAIN_PARAMETERS.PAIR_FACTORY_ADDRESS, WOW_CONSTANTS.PAIR_FACTORY_ABI, App.provider)
    const reserveFactory = new ethcall.Contract(WOW_CHAIN_PARAMETERS.RESERVE_FACTORY_ADDRESS, WOW_CONSTANTS.RESERVE_FACTORY_ABI, App.provider)
    const paramProviderFactory = new ethcall.Contract(WOW_CHAIN_PARAMETERS.PARAM_PROVIDER_FACTORY_ADDRESS, WOW_CONSTANTS.PARAM_PROVIDER_FACTORY_ABI, App.provider)
    const [lendables, shortables] = await App.ethcallProvider.all([reserveFactory.getAllLendables(), pairFactory.getAllShortables()])

    const tokens = [...lendables, ...shortables]
        .filter((value, index, array) => array.indexOf(value) === index)
        .map((bytes32Address) => "0x" + bytes32Address.substr(-40))

    const prices = await WOWswap.getTokenPrices(tokens)

    const reserves = []
    for (const tokensChunk of chunk(tokens, WOW_CONSTANTS.RESERVES_CHUNK_SIZE)) {
        reserves.push(...await Promise.all(tokensChunk.map(token => WOWswap.getReserve(App, reserveFactory, paramProviderFactory, token, getParameterCaseInsensitive(prices, token)?.usd))))
        await sleep(1000)
    }
    reserves.filter(reserve => reserve !== undefined)
        .sort((a, b) => a.token.symbol > b.token.symbol ? 1 : -1)
        .forEach(WOWswap.printReserve)
    hideLoading();
}
