$(function () {
   consoleInit(main)
});

const siloLensAddress = "0x2dd3fb3d8aabdeca8571bf5d5cc2969cb563a6e9";
const siloLensAbi = [{
   "inputs": [
      {
         "internalType": "contract ISilo",
         "name": "_silo",
         "type": "address"
      },
      {
         "internalType": "address",
         "name": "_asset",
         "type": "address"
      }
   ],
   "name": "depositAPY",
   "outputs": [
      {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
      }
   ],
   "stateMutability": "view",
   "type": "function"
}]

const getDepositApy = async (
   market,
   asset
) => {
   const App = await init_ethers();
   const SILO_LENS = new ethers.Contract(siloLensAddress, siloLensAbi, App.provider);
   let despositApy = await SILO_LENS.depositAPY(market, asset);
   return despositApy
}

const getAllDepositApy = async (data) => {
   for (let i = 0; i < data.length; i++) {
      let marketAddress = data[i].id;
      for (let j = 0; j < data[i].marketAssets.length; j++) {
         let assetAddress = data[i].marketAssets[j].id
         let depositApy = await getDepositApy(marketAddress, assetAddress)
         data[i].marketAssets[j]["deposit APY"] = (+ethers.utils.formatEther(depositApy, 18) * 100).toFixed(2)
      }
      printSiloData(data[i])
   }
}

const getSiloMarketsData = async function () {
   const url = "https://api.thegraph.com/subgraphs/name/siros-ena/silo-finance-arbitrum-alt"

   const query = `
   {
      markets(orderBy: totalValueLockedUSD, orderDirection: desc, where: { inputToken_: { activeOracle_not: "null" } }) {
        id
        name
        marketAssets {
          asset {
            id
            name
          }
          rates {
            id
          }
        }
      }
   }
   `
   const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
   };

   const resp = await fetch(url, opts);
   const respJson = await resp.json();
   let marketAssets = []
   for (let i = 0; i < respJson.data.markets.length; i++) {
      let marketAddressId = respJson.data.markets[i].id
      let marketAddressName = respJson.data.markets[i].name
      let data = {
         id: marketAddressId,
         name: marketAddressName,
         marketAssets: []
      }
      for (let j = 0; j < respJson.data.markets[i].marketAssets.length; j++) {
         let assetData = {
            id: respJson.data.markets[i].marketAssets[j].asset.id,
            name: respJson.data.markets[i].marketAssets[j].asset.name
         }
         data.marketAssets.push(assetData)
      }
      marketAssets.push(data)
   }
   return marketAssets
}

const getSiloEthApySushi = async function () {
   let query = {
      chainIds: 42161,
      isWhitelisted: true,
      orderBy: "liquidityUSD",
      orderDir: "desc",
      poolTypes: "CONSTANT_PRODUCT_POOL,STABLE_POOL",
      poolVersions: "LEGACY,TRIDENT",
      tokenSymbols: "silo"
   }

   const url = "https://pools-git-feature-swap.sushi.com/api/v0?&"
   const param = new URLSearchParams(query)
   const opts = {
      method: "GET",
      headers: { "Content-Type": "application/json" }
   };
   const urlWithParams = url + param.toString();
   const corsProxy = "https://corsproxy.io/?" + encodeURIComponent(urlWithParams)
   const resp = await fetch(corsProxy, opts)
   const respJson = await resp.json();
   return respJson[0]["totalApr"]
}

async function main() {
   const App = await init_ethers();
   let data = await getSiloMarketsData();

   _print(`Initialized ${App.YOUR_ADDRESS}\n`);
   _print("Reading smart contracts...\n");

   await getAllDepositApy(data)

   _print_bold("SILO / ETH sushi")
   let siloEthApy = await getSiloEthApySushi();
   _print(`APY :- ${(Number(siloEthApy) * 100).toFixed(4)}%`)

   hideLoading();
}

async function printSiloData(data) {
   for (let i = 0; i < data.marketAssets.length; i++) {
      _print_bold(`${data.name} - ${data.marketAssets[i].name}`);
      _print(`Deposit APY :- ${data.marketAssets[i]["deposit APY"]}%`);
      _print(``)
   }
}
