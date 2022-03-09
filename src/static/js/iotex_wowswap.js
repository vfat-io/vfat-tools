$(function() {
    consoleInit(main)
});

const WOW_CHAIN_PARAMETERS = {
    CHAIN: "iotex",
    PAIR_FACTORY_ADDRESS: "0xA95f470fb554eC18e68AA1B2562A99b0079601C9",
    RESERVE_FACTORY_ADDRESS: "0xa0d680dbe9965b77FD42015646Bc2C0F5F461Aa3",
    PARAM_PROVIDER_FACTORY_ADDRESS: "0x1a95eb76816a4AAf1387c15a60BcD7263379A5cD",
    WOW: "0xD67de0e0a0Fd7b15dC8348Bb9BE742F3c5850454",
    xWOW: "0x3E67b7c3026721C2E5E8Df9bcaAD06c36141B072",
    WOWLP: "0x8AcC588B08F5A839e6F3db17597986cFd92e20b4",
    WRAPPED_NATIVE_TOKEN_ADDRESS: "0xa00744882684c3e4747faefd68d283ea44099d03",
    NATIVE_TOKEN_SYMBOL: "IOTX"
}

const WOW_CONSTANTS = {
    RAY: ethers.BigNumber.from(10).pow(27),
    YEAR: ethers.BigNumber.from(31536e3),
    ADDRESS_ZERO: "0x0000000000000000000000000000000000000000",
    RESERVES_CHUNK_SIZE: 10,
    PAIR_FACTORY_ABI: [{inputs:[],name:"getAllShortables",outputs:[{internalType:"bytes32[]",name:"",type:"bytes32[]"}],stateMutability:"view",type:"function"}],
    RESERVE_FACTORY_ABI: [{inputs:[],name:"getAllLendables",outputs:[{internalType:"bytes32[]",name:"",type:"bytes32[]"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"lendable",type:"address"}],name:"getReserve",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"}],
    RESERVE_ABI: [{inputs:[],name:"getTotalLiquidity",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"getReserveDebt",outputs:[{internalType:"uint256",name:"liquidity",type:"uint256"},{internalType:"uint256",name:"principalDebt",type:"uint256"},{internalType:"uint256",name:"currentDebt",type:"uint256"},{internalType:"uint256",name:"averageRate",type:"uint256"},{internalType:"uint256",name:"lastUpdate",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"getLiquidityRate",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"}],
    PARAM_PROVIDER_FACTORY_ABI: [{inputs:[{internalType:"address",name:"lendable",type:"address"}],name:"getReserveParamProvider",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"}],
    PARAM_PROVIDER_ABI: [{inputs:[],name:"treasureFactor",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"}],
    PAIR_ABI: [{inputs:[],name:"token0",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[],name:"token1",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[],name:"getReserves",outputs:[{internalType:"uint112",name:"_reserve0",type:"uint112"},{internalType:"uint112",name:"_reserve1",type:"uint112"},{internalType:"uint32",name:"_blockTimestampLast",type:"uint32"}],stateMutability:"view",type:"function"}]
};

const WOWswap = {
    async getTokenPrices(id_array, chain = WOW_CHAIN_PARAMETERS.CHAIN) {
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
            const deposited = reserveDebt.liquidity.add(reserveDebt.currentDebt) / 10 ** token.decimals
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

    async getStakes(App, prices) {
        const wow = new ethcall.Contract(WOW_CHAIN_PARAMETERS.WOW, ERC20_ABI, App.provider)
        const lpPair = new ethcall.Contract(WOW_CHAIN_PARAMETERS.WOWLP, WOW_CONSTANTS.PAIR_ABI, App.provider)
        const lpToken = new ethcall.Contract(WOW_CHAIN_PARAMETERS.WOWLP, ERC20_ABI, App.provider)
        const [stakedWOW, stakedLP, token0address, token1address, reserves, lpTotalSupply] = await App.ethcallProvider.all(
            [wow.balanceOf(WOW_CHAIN_PARAMETERS.xWOW), lpToken.balanceOf(WOW_CHAIN_PARAMETERS.xWOW), lpPair.token0(), lpPair.token1(), lpPair.getReserves(), lpToken.totalSupply()])
        const {_reserve0: reserve0, _reserve1: reserve1} = reserves

        const token0 = await this.getToken(App, token0address, getParameterCaseInsensitive(prices, token0address)?.usd)
        const token1 = await this.getToken(App, token1address, getParameterCaseInsensitive(prices, token1address)?.usd)
        const wowToken = await this.getToken(App, wow.address, getParameterCaseInsensitive(prices, wow.address)?.usd)

        const token0Balance = reserve0.mul(stakedLP).div(lpTotalSupply) / 10 ** token0.decimals
        const token1Balance = reserve1.mul(stakedLP).div(lpTotalSupply) / 10 ** token1.decimals
        const wowBalance = stakedWOW / 10 ** wowToken.decimals

        return token0.address.toLowerCase() === wow.address.toLowerCase()
            ? [{token: wowToken, staked: wowBalance + token0Balance}, {token: token1, staked: token1Balance}]
            : [{token: wowToken, staked: wowBalance + token1Balance}, {token: token0, staked: token0Balance}]
    },

    tvl(reserves, stakes) {
        let result = 0
        for (const reserve of reserves) {
            result += reserve ? reserve.deposited * (reserve.token.price || 0) : 0
        }
        for (const stake of stakes) {
            result += stake.staked * (stake.token.price || 0)
        }
        return result
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

    printStake(stake) {
        const price = stake.token.price;
        _print_bold(`${stake.token.symbol} ($${formatMoney(price)})`);
        _print(`Staked : ${formatMoney(stake.staked)} ($${formatMoney(stake.staked * price)})`)
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

    const prices = await WOWswap.getTokenPrices([WOW_CHAIN_PARAMETERS.WOW, ...tokens])
    const reserves = []
    for (const tokensChunk of chunk(tokens, WOW_CONSTANTS.RESERVES_CHUNK_SIZE)) {
        reserves.push(...await Promise.all(tokensChunk.map(token => WOWswap.getReserve(App, reserveFactory, paramProviderFactory, token, getParameterCaseInsensitive(prices, token)?.usd))))
        await sleep(1000)
    }
    _print_bold("RESERVES: ")
    _print("")
    reserves.filter(reserve => reserve !== undefined)
        .sort((a, b) => a.token.symbol > b.token.symbol ? 1 : -1)
        .forEach(WOWswap.printReserve)

    _print_bold("STAKES: ")
    _print("")
    const stakes = await WOWswap.getStakes(App, prices)
    stakes.forEach(WOWswap.printStake)

    _print_bold(`Total Value Locked: $${formatMoney(WOWswap.tvl(reserves, stakes))}`)

    hideLoading();
}
