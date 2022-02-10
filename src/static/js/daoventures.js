$(function() {
  consoleInit(main)
})

async function getSlippage(tokensMinInfo, App){
  console.log('Olaaa')
  console.log(tokensMinInfo)
  let minPercentage = 95
  let tokenPrice = []
  for(let i=0;i<tokensMinInfo.length;i++){ 
    const Eth_contract = new ethers.Contract(tokensMinInfo[i].routerAddress, uniswapV2RouterABI, App.provider)
    let result = []
    const tks = tokensMinInfo[i].tokens
    for(let j=0;j<tks.length;j++){
      let param1 = 10 ** tks[j].decimal      
      let param2 = tks[j].pairs
      let value = await Eth_contract.getAmountsOut(param1.toString(), param2)  
      let valueMin = ethers.BigNumber.from(value[1]).mul(minPercentage).div(100); 
      if(valueMin === undefined) {
        console.error(`Price Min is undefined for`, param2);
        valueMin = 0;
      }
      result.push(valueMin);      
    }    
    tokenPrice.push(result)   
  };
  return tokenPrice
}
async function getTotalPool(Contract_Object, Eth_Contract){
  if(Contract_Object.name ==="FAANG"){
    const Total_Pool = await Eth_Contract.getTotalValueInPool()/ 10**Contract_Object.decimals    
    return Total_Pool
  }
  else if(Contract_Object.name === "Citadel"){
    const Total_Pool = await Eth_Contract.getAllPoolInUSD()/ 10**Contract_Object.decimals    
    return Total_Pool
  }
  else{
    const Total_Pool = await Eth_Contract.getAllPoolInUSD()/ 10**Contract_Object.decimals    
    return Total_Pool
  }
}

async function loadDaoVaults(App,  Contract_Object, tokensMinInfo) {
  const Eth_Contract = new ethers.Contract(Contract_Object.address, Contract_Object.abi, App.provider)
  
  const signer = App.provider.getSigner()
  const USDC_Address = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
  const USDC_Contract = new ethers.Contract(USDC_Address, ERC20_ABI, signer)
  const USDC_Balance = await USDC_Contract.balanceOf(App.YOUR_ADDRESS)

  
  const Total_Pool = await getTotalPool(Contract_Object, Eth_Contract)
  const User_Balance = await Eth_Contract.balanceOf(App.YOUR_ADDRESS)
  const stake = async function() {
    return universeContract_stake(Contract_Object, Contract_Object.abi, App)
  }

  const unstake = async function() {
    return universeContract_unstake(Contract_Object, Contract_Object.abi, App, tokensMinInfo)
  }
  
  _print(`${Contract_Object.name} Vault:  ${Contract_Object.address}`)
  _print(`Currently $${formatMoney(Total_Pool)} is staked inside the ${Contract_Object.name} Vault`)
  _print_link(`Stake ${formatMoney(USDC_Balance)} USDC`, stake)
  _print_link(`Unstake ${formatMoney(User_Balance)} USDC\n\n`, unstake)
  _print(`-----------------------------------------------------------------\n\n`)
}

const universeContract_stake = async function(contract, ABI, App) {
  const signer = App.provider.getSigner()

  let contractAddress = contract.address

  const USDC_Address = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
  const USDC_Contract = new ethers.Contract(USDC_Address, ERC20_ABI, signer)
  const balanceOf = await USDC_Contract.balanceOf(App.YOUR_ADDRESS)
  const WEEBTEND_V2_TOKEN = new ethers.Contract(contractAddress, ABI, signer)


  let allow = Promise.resolve()


 if (balanceOf / 1e18 > 0) {
   if(contract.name === "Citadel"){
    showLoading()
    allow
      .then(async function() {
        WEEBTEND_V2_TOKEN.deposit(balanceOf, 1, {gasLimit: 500000})
          .then(function(t) {
            App.provider.waitForTransaction(t.hash).then(function() {
              hideLoading()
            })
          })
          .catch(x => {
            hideLoading()
            console.log(x);
            _print('\nSomething went wrong.')
          })
      })
      .catch(x => {
        hideLoading()
        console.log(x);
        _print('Something went wrong.')
      })
   }
   else{
    showLoading()
    allow
      .then(async function() {
        WEEBTEND_V2_TOKEN.deposit(balanceOf, USDC_Address, {gasLimit: 500000})
          .then(function(t) {
            App.provider.waitForTransaction(t.hash).then(function() {
              hideLoading()
            })
          })
          .catch(x => {
            hideLoading()
            console.log(x);
            _print('\nSomething went wrong.')
          })
      })
      .catch(x => {
        hideLoading()
        console.log(x);
        _print('Something went wrong.')
      })
  }
 } else {
    alert('You have no tokens to stake!!')
  }
}



const universeContract_unstake = async function(contract, ABI, App, tokensMinInfo) {
  const signer = App.provider.getSigner()
  let contractAddress = contract.address


  const REWARD_POOL = new ethers.Contract(contractAddress, ABI, signer)
  const currentStakedAmount = await REWARD_POOL.balanceOf(App.YOUR_ADDRESS)

  const USDC_Address = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"

  
  const tokenPrice = await getSlippage(tokensMinInfo, App)
  console.log('Hello')
  console.log(tokenPrice)
  
  

  if (currentStakedAmount > 0) {
    showLoading()
    if(contractAddress === "0x5b3ae8b672A753906B1592D44741f71FBD05ba8C"){ 
      //Metaverse
    REWARD_POOL.withdraw(currentStakedAmount, USDC_Address, tokenPrice[0], {gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
    }
    else if(contractAddress === "0xCc6C417E991e810477b486d992faACa1b7440E76"){
      //Citadel V2
      REWARD_POOL.withdraw(currentStakedAmount, USDC_Address, tokenPrice[1], {gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
    }
    else if(contractAddress === "0xD0b14644B0F91239075ED8a415769C4E20D37cF9"){
      //Stonks
      REWARD_POOL.withdraw(currentStakedAmount, USDC_Address, tokenPrice[2], {gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
    }
    else if(contractAddress === "0x9ee54014e1E6CF10fD7E9290FdB6101fd0d5D416"){
      //FAANG
      REWARD_POOL.withdraw(currentStakedAmount, USDC_Address, {gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
    }
    else {
      //Citadel
      REWARD_POOL.withdraw(currentStakedAmount, 1, {gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
    }
    
  }else{
    alert('You have nothing staked!')
  }
}

async function main() {
const Dollar = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
// CitadelV2
const WETHAddr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const WBTCAddr = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";
const DPIAddr = "0x1494CA1F11D487c2bBe4543E90080AeBa4BA3C2b";
const DAIAddr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; 

// Metaverse
const AXSAddr = "0xBB0E17EF65F82Ab018d8EDd776e8DD940327B28b";
const SLPAddr = "0xCC8Fa225D80b9c7D42F96e9570156c65D6cAAa25";
const ILVAddr = "0x767FE9EDC9E0dF98E07454847909b5E959D7ca0E";
const GHSTAddr = "0x3F382DbD960E3a9bbCeaE22651E88158d2791550";
const REVVAddr = "0x557B933a7C2c45672B610F8954A3deB39a51A8Ca";
const MVIAddr = "0x72e364F2ABdC788b7E918bc238B21f109Cd634D7";

// DAO Stonks
const USTAddr = "0xa47c8bf37f92abed4a126bda807a7b7498661acd";
const mMSFTAddr = "0x41BbEDd7286dAab5910a1f15d12CBda839852BD7";
const mTWTRAddr = "0xEdb0414627E6f1e3F082DE65cD4F9C693D78CCA9";
const  mTSLAAddr = "0x21cA39943E91d704678F5D00b6616650F066fD63";
const  mGOOGLAddr = "0x59A921Db27Dd6d4d974745B7FfC5c33932653442";
const  mAMZNAddr = "0x0cae9e4d663793c2a2A0b211c1Cf4bBca2B9cAa7";
const  mAAPLAddr = "0xd36932143F6eBDEDD872D5Fb0651f4B72Fd15a84";
const  mNFLXAddr = "0xC8d674114bac90148d11D3C1d33C61835a0F9DCD";

const tokensMinInfo = [
  {
    //Metaverse
    routerAddress: "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F",
    abi: uniswapV2RouterABI,
    tokens: [
        { amount: 1, decimal: 18, pairs:[WETHAddr, Dollar]}, // ETH <-> Stablecoins for withdraw
        { amount: 1, decimal: 18, pairs:[AXSAddr, WETHAddr]},
        { amount: 1, decimal: 0,  pairs:[SLPAddr, WETHAddr]},
        { amount: 1, decimal: 18, pairs:[ILVAddr, WETHAddr]},
        { amount: 1, decimal: 18, pairs:[GHSTAddr, WETHAddr]},
        { amount: 1, decimal: 18, pairs:[REVVAddr, WETHAddr]},
        { amount: 1, decimal: 18, pairs:[MVIAddr, WETHAddr]},
    ]    
  },
  {
    //Citadel V2
    routerAddress: "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F",
    abi: uniswapV2RouterABI,
    tokens: [
        { amount: 1, decimal: 18, routerIndex: 0, pairs:[WETHAddr, Dollar]}, // ETH <-> Stablecoins for withdraw
        { amount: 1, decimal: 8, routerIndex: 0, pairs:[WBTCAddr, WETHAddr]},
        { amount: 1, decimal: 18, routerIndex: 0, pairs:[DPIAddr, WETHAddr]},
        { amount: 1, decimal: 18, routerIndex: 0, pairs:[DAIAddr, WETHAddr]},
    ]    
  },
   {
     //Stonks
    routerAddress: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    abi: uniswapV2RouterABI,
    tokens: [
        { amount: 1, decimal: 18, routerIndex: 0, pairs:[mMSFTAddr, USTAddr]},
        { amount: 1, decimal: 18, routerIndex: 0, pairs:[mTWTRAddr, USTAddr]},
        { amount: 1, decimal: 18, routerIndex: 0, pairs:[mTSLAAddr, USTAddr]},
        { amount: 1, decimal: 18, routerIndex: 0, pairs:[mGOOGLAddr, USTAddr]},
        { amount: 1, decimal: 18, routerIndex: 0, pairs:[mAMZNAddr, USTAddr]},
        { amount: 1, decimal: 18, routerIndex: 0, pairs:[mAAPLAddr, USTAddr]},
        { amount: 1, decimal: 18, routerIndex: 0, pairs:[mNFLXAddr, USTAddr]},
    ]
  }
  ];

  const App = await init_ethers()

  _print(`Initialized ${App.YOUR_ADDRESS}`)
  _print('Reading smart contracts...\n')
  _print('You can only deposit USDC\n')

  

  const Everything_Object = [
    {
      name: 'Citadel', 
      address: '0x8fE826cC1225B03Aa06477Ad5AF745aEd5FE7066', 
      abi: DAO_Citadel_ABI,
      decimals: 6,
    },
    {
      name: 'FAANG', 
      address: '0x9ee54014e1E6CF10fD7E9290FdB6101fd0d5D416', 
      abi: DAO_FAANG_ABI,
      decimals: 18,
    },
    {
      name: 'Citadel V2', 
      address: '0xCc6C417E991e810477b486d992faACa1b7440E76', 
      abi: DAO_CitadelV2_ABI,
      decimals: 18,
    }, 
    {
      name: 'Metaverse', 
      address: '0x5b3ae8b672A753906B1592D44741f71FBD05ba8C', 
      abi: DAO_Metaverse_ABI,
      decimals: 18,
    },
    {
      name: 'Stonks', 
      address: '0xD0b14644B0F91239075ED8a415769C4E20D37cF9', 
      abi: DAO_Stonks_ABI,
      decimals: 18,
    }
  ]

  for(let i=0;i<Everything_Object.length;i++){
    await loadDaoVaults(App, Everything_Object[i], tokensMinInfo)
  }

  hideLoading();

}


// Addresses in mainnet

//import { ethers } from "ethers";



