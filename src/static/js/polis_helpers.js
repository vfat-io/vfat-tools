const polisTokens = [
    { "id": "polis","symbol": "POLIS","contract": "0x6FC851B8D66116627Fb1137b9D5FE4E2e1BeA978" },
]

async function getPolisPrices() {
    const idPrices = await lookUpPrices(polisTokens.map(x => x.id));
    const prices = {}
    for (const bt of polisTokens)
        if (idPrices[bt.id])
            prices[bt.contract] = idPrices[bt.id];
    return prices;
}
