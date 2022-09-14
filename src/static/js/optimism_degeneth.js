$(function() {
    consoleInit(main)
      });
    
    const BANDIT_CHEF_ABI = [{"inputs":[{"internalType":"address","name":"_router","type":"address"},{"internalType":"address","name":"_devAddress","type":"address"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_endBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_user","type":"address"},{"indexed":true,"internalType":"uint256","name":"_pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"_pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_user","type":"address"},{"indexed":true,"internalType":"uint256","name":"_pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"DAI","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"USDC","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"USDT","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"devAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"endBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"native","outputs":[{"internalType":"contract PolyTreasureToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nativePerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accNativePerShare","type":"uint256"},{"internalType":"uint16","name":"depositFeeBP","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"contract Treasury","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingNative","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    const LOOTBAGS_ABI = [{"inputs":[{"internalType":"address","name":"_native","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"WBTC","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"native","outputs":[{"internalType":"contract PolyTreasureToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"claimETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"claimBTC","outputs":[],"stateMutability":"nonpayable","type":"function"}];
    
    async function main() {
       const App = await init_ethers();
       
       _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    
       const BANDIT_ADDR = "0xa53E8f867EF3FBA91090F1547A68983c350f6502";
       const LOOTBAGS_ADDR = "0x23E2806A524d25543321b46084021A23540D5f01";
       const WBTC_ADDR = "0x68f180fcCe6836688e9084f035309E29Bf0A2095";   
       const WETH_ADDR = "0x4200000000000000000000000000000000000006";
       const wethContract = new ethers.Contract(WETH_ADDR, ERC20_ABI, App.provider);
       const wbtcContract = new ethers.Contract(WBTC_ADDR, ERC20_ABI, App.provider);
       const eth = ethers.utils.formatUnits(await wethContract.balanceOf(LOOTBAGS_ADDR), 18);
       const btc = ethers.utils.formatUnits(await wbtcContract.balanceOf(LOOTBAGS_ADDR), 8);
    
       _print_link("Claim ETH", async() => {
         const signer = App.provider.getSigner();
         const treasuryContract = new ethers.Contract(LOOTBAGS_ADDR, LOOTBAGS_ABI, signer);
         const tokenContract = new ethers.Contract(BANDIT_ADDR, ERC20_ABI, signer);
         
         const currentTokens = await tokenContract.balanceOf(App.YOUR_ADDRESS)
         const allowedTokens = await tokenContract.allowance(App.YOUR_ADDRESS, LOOTBAGS_ADDR)
    
      let allow = Promise.resolve()
    
      if (allowedTokens / 1e18 < currentTokens / 1e18) {
        showLoading()
        allow = tokenContract.approve(LOOTBAGS_ADDR, ethers.constants.MaxUint256)
          .then(function(t) {
            return App.provider.waitForTransaction(t.hash)
          })
          .catch(function() {
            hideLoading()
            alert('Try resetting your approval to 0 first')
          })
      }
    
      if (currentTokens / 1e18 >= 1) {
        showLoading()
        allow
          .then(async function() {
              treasuryContract.claimETH(ethers.utils.parseUnits("1", 18), {gasLimit: 500000})
              .then(function(t) {
                App.provider.waitForTransaction(t.hash).then(function() {
                  hideLoading()
                })
              })
              .catch(function() {
                hideLoading()
                _print('Something went wrong.')
              })
          })
          .catch(function() {
            hideLoading()
            _print('Something went wrong.')
          })
      } else {
        alert('Not enough tokens to claim (needs 250 BANDIT)!!')
      }
       });
       
       const BANDIT_CHEF_ADDR = "0xF4FdAcaA85cD04d9fa961f032D2A4cF3A58A5050";
       const rewardTokenTicker = "BANDIT";
       const BANDIT_CHEF = new ethers.Contract(BANDIT_CHEF_ADDR, BANDIT_CHEF_ABI, App.provider);
       const rewardsPerWeek = await BANDIT_CHEF.nativePerBlock() / 1e18 * 604800 / 2;
    
        const tokens = {};
        const prices = await getOptimisticPrices();
    
        await loadMaticTrzChefContract(App, tokens, prices, BANDIT_CHEF, BANDIT_CHEF_ADDR, BANDIT_CHEF_ABI, rewardTokenTicker, "native", null, rewardsPerWeek, "pendingNative");
    
        hideLoading();
      }
    
    async function depositLP(signer, userBalance) {
      const BANDIT_CHEF_ADDR = "0xF4FdAcaA85cD04d9fa961f032D2A4cF3A58A5050";
      const masterChef = new ethers.Contract(BANDIT_CHEF_ADDR, BANDIT_CHEF_ABI, signer);
      await masterChef.deposit(0, userBalance);
    }
    
    async function withdrawLP(signer, userBalance) {
      const BANDIT_CHEF_ADDR = "0xF4FdAcaA85cD04d9fa961f032D2A4cF3A58A5050";
      const masterChef = new ethers.Contract(BANDIT_CHEF_ADDR, BANDIT_CHEF_ABI, signer);
      await masterChef.withdraw(0, userBalance);
    }
    
    async function claimLP(signer) {
      const BANDIT_CHEF_ADDR = "0xF4FdAcaA85cD04d9fa961f032D2A4cF3A58A5050";
      const masterChef = new ethers.Contract(BANDIT_CHEF_ADDR, BANDIT_CHEF_ABI, signer);
      await masterChef.withdraw(0, 0);
    }
    
    async function depositDETH(signer, userBalance) {
      const BANDIT_CHEF_ADDR = "0xF4FdAcaA85cD04d9fa961f032D2A4cF3A58A5050";
      const masterChef = new ethers.Contract(BANDIT_CHEF_ADDR, BANDIT_CHEF_ABI, signer);
      await masterChef.deposit(4, userBalance);
    }
    
    async function withdrawDETH(signer, userBalance) {
      const BANDIT_CHEF_ADDR = "0xF4FdAcaA85cD04d9fa961f032D2A4cF3A58A5050";
      const masterChef = new ethers.Contract(BANDIT_CHEF_ADDR, BANDIT_CHEF_ABI, signer);
      await masterChef.withdraw(4, userBalance);
    }
    
    async function claimDETH(signer) {
      const BANDIT_CHEF_ADDR = "0xF4FdAcaA85cD04d9fa961f032D2A4cF3A58A5050";
      const masterChef = new ethers.Contract(BANDIT_CHEF_ADDR, BANDIT_CHEF_ABI, signer);
      await masterChef.withdraw(4, 0);
    }
    
    async function depositBandit(signer, userBalance) {
      const BANDIT_CHEF_ADDR = "0xF4FdAcaA85cD04d9fa961f032D2A4cF3A58A5050";
      const masterChef = new ethers.Contract(BANDIT_CHEF_ADDR, BANDIT_CHEF_ABI, signer);
      await masterChef.deposit(1, userBalance);
    }
    
    async function withdrawBandit(signer, userBalance) {
      const BANDIT_CHEF_ADDR = "0xF4FdAcaA85cD04d9fa961f032D2A4cF3A58A5050";
      const masterChef = new ethers.Contract(BANDIT_CHEF_ADDR, BANDIT_CHEF_ABI, signer);
      await masterChef.withdraw(1, userBalance);
    }
    
    async function claimBandit(signer) {
      const BANDIT_CHEF_ADDR = "0xF4FdAcaA85cD04d9fa961f032D2A4cF3A58A5050";
      const masterChef = new ethers.Contract(BANDIT_CHEF_ADDR, BANDIT_CHEF_ABI, signer);
      await masterChef.withdraw(1, 0);
    }
    
    async function depositWETH(signer, userBalance) {
      const BANDIT_CHEF_ADDR = "0xF4FdAcaA85cD04d9fa961f032D2A4cF3A58A5050";
      const masterChef = new ethers.Contract(BANDIT_CHEF_ADDR, BANDIT_CHEF_ABI, signer);
      await masterChef.deposit(2, userBalance);
    }
    
    async function withdrawWETH(signer, userBalance) {
      const BANDIT_CHEF_ADDR = "0xF4FdAcaA85cD04d9fa961f032D2A4cF3A58A5050";
      const masterChef = new ethers.Contract(BANDIT_CHEF_ADDR, BANDIT_CHEF_ABI, signer);
      await masterChef.withdraw(2, userBalance);
    }
    
    async function claimWETH(signer) {
      const BANDIT_CHEF_ADDR = "0xF4FdAcaA85cD04d9fa961f032D2A4cF3A58A5050";
      const masterChef = new ethers.Contract(BANDIT_CHEF_ADDR, BANDIT_CHEF_ABI, signer);
      await masterChef.withdraw(2, 0);
    }
    
    async function depositWBTC(signer, userBalance) {
      const BANDIT_CHEF_ADDR = "0xF4FdAcaA85cD04d9fa961f032D2A4cF3A58A5050";
      const masterChef = new ethers.Contract(BANDIT_CHEF_ADDR, BANDIT_CHEF_ABI, signer);
      await masterChef.deposit(3, userBalance);
    }
    
    async function withdrawWBTC(signer, userBalance) {
      const BANDIT_CHEF_ADDR = "0xF4FdAcaA85cD04d9fa961f032D2A4cF3A58A5050";
      const masterChef = new ethers.Contract(BANDIT_CHEF_ADDR, BANDIT_CHEF_ABI, signer);
      await masterChef.withdraw(3, userBalance);
    }
    
    async function claimWBTC(signer) {
      const BANDIT_CHEF_ADDR = "0xF4FdAcaA85cD04d9fa961f032D2A4cF3A58A5050";
      const masterChef = new ethers.Contract(BANDIT_CHEF_ADDR, BANDIT_CHEF_ABI, signer);
      await masterChef.withdraw(3, 0);
    }
    
    async function approve(signer, address) {
      const abi = ['function approve(address spender, uint256 amount) external returns (bool)', 'function balanceOf(address _owner) public view returns (uint256)'];
      const max = ethers.constants.MaxUint256;
      const erc20Contract = new ethers.Contract(address, abi, signer);
      await erc20Contract.approve('0xF4FdAcaA85cD04d9fa961f032D2A4cF3A58A5050', max);
    }
    
    async function loadMaticTrzChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
      rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction) {
      const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider); 
      const poolCount = parseInt(await chefContract.poolLength(), 10);
      const totalAllocPoints = await chefContract.totalAllocPoint();
      const signer = App.provider.getSigner();
    
      const LP_ADDRESS = "0x2F69C59A033Cdf3977274eF14260C83Ac2c87ad2";
      const DETH_ADDRESS = "0x39d36cF934aAE9Fcf4c5112648a016B8A7127B35";
      const WETH_ADDRESS = "0x4200000000000000000000000000000000000006";
      const WBTC_ADDRESS = "0x68f180fcCe6836688e9084f035309E29Bf0A2095";
      const BANDIT_ADDRESS = "0xa53E8f867EF3FBA91090F1547A68983c350f6502";
      const BANDIT_CHEF_ADDR = "0xF4FdAcaA85cD04d9fa961f032D2A4cF3A58A5050";
    
      const lpContract = new ethers.Contract(LP_ADDRESS, ERC20_ABI, signer);
      const dethContract = new ethers.Contract(DETH_ADDRESS, ERC20_ABI, signer);
      const wethContract = new ethers.Contract(WETH_ADDRESS, ERC20_ABI, signer);
      const wbtcContract = new ethers.Contract(WBTC_ADDRESS, ERC20_ABI, signer);
      const banditContract = new ethers.Contract(BANDIT_ADDRESS, ERC20_ABI, signer);
      const masterChef = new ethers.Contract(BANDIT_CHEF_ADDR, BANDIT_CHEF_ABI, signer);
    
      const userLPBalance = await lpContract.balanceOf(App.YOUR_ADDRESS);
      const userLPInfo = await masterChef.userInfo(0, App.YOUR_ADDRESS);
      const userStakedLP = userLPInfo[0];
      // const userPendingLP = userLPInfo[1];
      const userPendingLP = await masterChef.pendingNative(0, App.YOUR_ADDRESS);
    
    
      const userDETHBalance = await dethContract.balanceOf(App.YOUR_ADDRESS);
      const userDETHInfo = await masterChef.userInfo(4, App.YOUR_ADDRESS);
      const userStakedDETH = userDETHInfo[0];
      // const userPendingDETH = userDETHInfo[1];
      const userPendingDETH = await masterChef.pendingNative(4, App.YOUR_ADDRESS);
    
    
      const userBanditBalance = await banditContract.balanceOf(App.YOUR_ADDRESS);
      const userBanditInfo = await masterChef.userInfo(1, App.YOUR_ADDRESS);
      const userStakedBandit = userBanditInfo[0];
      // const userPendingBandit = userBanditInfo[1];
      const userPendingBandit = await masterChef.pendingNative(1, App.YOUR_ADDRESS);
    
    
      const userWETHBalance = await wethContract.balanceOf(App.YOUR_ADDRESS);
      const userWETHInfo = await masterChef.userInfo(2, App.YOUR_ADDRESS);
      const userStakedWETH = userWETHInfo[0];
      // const userPendingWETH = userWETHInfo[1];
      const userPendingWETH = await masterChef.pendingNative(2, App.YOUR_ADDRESS);
    
    
      const userWBTCBalance = await wbtcContract.balanceOf(App.YOUR_ADDRESS);
      const userWBTCInfo = await masterChef.userInfo(3, App.YOUR_ADDRESS);
      const userStakedWBTC = userWBTCInfo[0];
      // const userPendingWBTC = userWBTCInfo[1];
      const userPendingWBTC = await masterChef.pendingNative(3, App.YOUR_ADDRESS);
    
    
      const totalBandit = await banditContract.balanceOf(BANDIT_CHEF_ADDR);
      const totalLP = await lpContract.balanceOf(BANDIT_CHEF_ADDR);
      const totalDETH = await dethContract.balanceOf(BANDIT_CHEF_ADDR);
      const totalWETH = await wethContract.balanceOf(BANDIT_CHEF_ADDR);
      const erc20WBTC = await wbtcContract.balanceOf(BANDIT_CHEF_ADDR);
      const totalWBTC = erc20WBTC * 10000000000; // Convert to 8 decimal
  
      const wethPrice = prices["0x4200000000000000000000000000000000000006"]["usd"];
      const wbtcPrice = prices["0x68f180fcCe6836688e9084f035309E29Bf0A2095"]["usd"];
      
     
      // const dETHRatio = await ratioContract.price0CumulativeLast();
      const ratioABI = ['function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)','function price0CumulativeLast() external view returns (uint)', 'function totalSupply() external view returns (uint)'];
      const ratioContract = new ethers.Contract(LP_ADDRESS, ratioABI, App.provider);
      //reserve0 = dETH
      const reserves = await ratioContract.getReserves();
      const reserve0 = reserves.reserve0;
      const Bigreserve0 = Number(reserve0);
      const Numreserve0 = Bigreserve0 / 10**18;
  
      //reserve1 = WETH
      const reserve1 = reserves.reserve1;
      const Bigreserve1 = Number(reserve1);
      const Numreserve1 = Bigreserve1 / 10**18;
  
      const WETHLPvalue = wethPrice*Numreserve1;
      const dETHvalue = WETHLPvalue/Numreserve0;
  
      const lpSupply = await ratioContract.totalSupply();
      const LPSupply = ethers.utils.formatEther(lpSupply);
      const lpTokenValue = WETHLPvalue/LPSupply;
  
      //Get total value of staked WETH
      const stakedWETHValue = wethPrice * ethers.utils.formatEther(totalWETH);
      //Get total value of staked DETH
      const stakedDETHValue = dETHvalue * ethers.utils.formatEther(totalDETH);
      //Get total value of WBTC
      const stakedWBTCValue = wbtcPrice * (totalWBTC / 10**18);
      //Get total value of LP staked
      const stakedLPValue = lpTokenValue * ethers.utils.formatEther(totalLP);
  
      const BLP_ADDRESS = "0x02079677C3EAd82DfD72A56e7931600e92AB86BB";
      const banditLP = new ethers.Contract(BLP_ADDRESS, ratioABI, App.provider);
      const banditLPReserves = await banditLP.getReserves();
  
      const banditLPSupply = banditLPReserves.reserve0;
      const BigBanditLPSupply = Number(banditLPSupply);
      const NumBanditLPSupply = BigBanditLPSupply / 10**18
  
      const banditSupply = banditLPReserves.reserve1;
      const BigBanditSupply = Number(banditSupply);
      const NumBanditSupply = BigBanditSupply / 10**18;
  
      const banditRatio = NumBanditLPSupply / NumBanditSupply;
      const banditPrice = banditRatio * lpTokenValue;
  
      const stakedBANDITValue = banditPrice * ethers.utils.formatEther(totalBandit);
  
      const convertWBTC = totalWBTC / 10**18;
      const banditAPY = ((banditPrice * 28470) / (ethers.utils.formatEther(totalBandit) * banditPrice)) * 10; //10% allocation
      const lpAPY = ((banditPrice * 28470) / (ethers.utils.formatEther(totalLP) * lpTokenValue)) * 50; //50% allocation
      const dethAPY = ((banditPrice * 28470) / (ethers.utils.formatEther(totalDETH) * dETHvalue)) * 30; //30% allocation
      const wethAPY = ((banditPrice * 28470) / (ethers.utils.formatEther(totalWETH) * wethPrice)) * 5; //5% allocation
      const wbtcAPY = ((banditPrice * 28470) / (convertWBTC * wbtcPrice)) * 5; //5% allocation
  
      _print('            _....._    ');
      _print('            ;-.-- ;     ');
      _print('             }===={       _.---.._      ');
      _print('           .        .     ;-..-- ;    ');
      _print('          /::        \    `}===={      ');
      _print('         |::          |  .:       .    ');
      _print('         \::.         /_;:_        \    ');
      _print('           ::_     _-; --.- ;       |    ');
      _print('              `````  }====={        /    ');
      _print('                   .         .   _.     ');
      _print('                  /::         \``    ');
      _print('                 |::           |    ');
      _print('                 \::.          /    ');
      _print('                   ::_      _.     ');
      _print('                      ``````       ');
      _print_link("Claim BTC", async() => {
        const signer = App.provider.getSigner();
        const treasuryContract = new ethers.Contract(LOOTBAGS_ADDR, LOOTBAGS_ABI, signer);
        const tokenContract = new ethers.Contract(BANDIT_ADDR, ERC20_ABI, signer);
        
        const currentTokens = await tokenContract.balanceOf(App.YOUR_ADDRESS)
     const allowedTokens = await tokenContract.allowance(App.YOUR_ADDRESS, LOOTBAGS_ADDR)
   
     let allow = Promise.resolve()
   
     if (allowedTokens / 1e18 < currentTokens / 1e18) {
       showLoading()
       allow = tokenContract.approve(LOOTBAGS_ADDR, ethers.constants.MaxUint256)
         .then(function(t) {
           return App.provider.waitForTransaction(t.hash)
         })
         .catch(function() {
           hideLoading()
           alert('Try resetting your approval to 0 first')
         })
     }
   
     if (currentTokens / 1e18 >= 10) {
       showLoading()
       allow
         .then(async function() {
             treasuryContract.claimBTC(ethers.utils.parseUnits("10", 18), {gasLimit: 500000})
             .then(function(t) {
               App.provider.waitForTransaction(t.hash).then(function() {
                 hideLoading()
               })
             })
             .catch(function() {
               hideLoading()
               _print('Something went wrong.')
             })
         })
         .catch(function() {
           hideLoading()
           _print('Something went wrong.')
         })
     } else {
       alert('Not enough tokens to claim (needs 450 BANDIT)!!')
     }
      });   
      _print('');
  
  
  
  
    
      _print(`                     BANDIT Pool - 1% Deposit Fee                    `);
      _print(`        Contract - 0xa53E8f867EF3FBA91090F1547A68983c350f6502         `);
      _print(`  ════════════════════════════════════════════════════════════════════`);
      _print(`Total BANDIT Deposited in Pool: ` + ethers.utils.formatEther(totalBandit));
      _print('BANDIT PRICE: $' + banditPrice.toFixed(2));
      _print('Total USD Value of BANDIT Deposits: $' + stakedBANDITValue.toFixed(2));
      _print(`Rewards ` + banditAPY.toFixed(2) + '% APY');
  
    
      _print_link("\nApprove BANDIT", () => approve(signer, BANDIT_ADDRESS));
      _print_link("\nDeposit " + ethers.utils.formatEther(userBanditBalance) + " BANDIT", () => depositBandit(signer, userBanditBalance));
      _print_link("\nWithdraw " + ethers.utils.formatEther(userStakedBandit) + " BANDIT", () => withdrawBandit(signer, userStakedBandit));
      _print_link("\nClaim " + ethers.utils.formatEther(userPendingBandit) + " BANDIT", () => claimBandit(signer));
    
      _print(`\n                  dETH/WETH Pool - No Deposit Fee                   `);
      _print(`        Contract - 0x2F69C59A033Cdf3977274eF14260C83Ac2c87ad2         `);
      _print(`  ════════════════════════════════════════════════════════════════════`);
      _print(`Total LP Deposited in Pool: ` + ethers.utils.formatEther(totalLP));
      _print('dETH/WETH PRICE: $' + lpTokenValue.toFixed(2));
      _print('Total USD Value of LP Deposits: $' + stakedLPValue.toFixed(2));
      _print(`Rewards ` + lpAPY.toFixed(2) + '% APY');
  
    
      _print_link("\nApprove LP", () => approve(signer, LP_ADDRESS));
      _print_link("\nDeposit " + ethers.utils.formatEther(userLPBalance) + " LP", () => depositLP(signer, userLPBalance));
      _print_link("\nWithdraw " + ethers.utils.formatEther(userStakedLP) + " LP", () => withdrawLP(signer, userStakedLP));
      _print_link("\nClaim " + ethers.utils.formatEther(userPendingLP) + " BANDIT", () => claimLP(signer));
    
      _print(`\n                    dETH Pool - No Deposit Fee                     `)
      _print(`        Contract - 0x39d36cF934aAE9Fcf4c5112648a016B8A7127B35         `)
      _print(`  ════════════════════════════════════════════════════════════════════`);
      _print(`Total dETH Deposited in Pool: ` + ethers.utils.formatEther(totalDETH));
      _print('dETH Price: $' + dETHvalue.toFixed(5));
      _print('Total USD Value of DETH Deposits: $' + stakedDETHValue.toFixed(2));
      _print(`Rewards: ` + dethAPY.toFixed(2) + '% APY');
    
      _print_link("\nApprove dETH", () => approve(signer, DETH_ADDRESS));
      _print_link("\nDeposit " + ethers.utils.formatEther(userDETHBalance) + " dETH", () => depositDETH(signer, userDETHBalance));
      _print_link("\nWithdraw " + ethers.utils.formatEther(userStakedDETH) + " dETH", () => withdrawDETH(signer, userStakedDETH));
      _print_link("\nClaim " + ethers.utils.formatEther(userPendingDETH) + " BANDIT", () => claimDETH(signer));
    
      _print(`\n                    WETH Pool - 3% Deposit Fee                     `)
      _print(`        Contract - 0x4200000000000000000000000000000000000006         `)
      _print(`  ════════════════════════════════════════════════════════════════════`);
      _print(`Total WETH Deposited in Pool: ` + ethers.utils.formatEther(totalWETH));
      _print('WETH Price: $' + wethPrice.toFixed(2));
      _print('Total USD Value of WETH Deposits: $' + stakedWETHValue.toFixed(2));
      _print(`Rewards: ` + wethAPY.toFixed(2) + '% APY');
  
    
      _print_link("\nApprove WETH", () => approve(signer, WETH_ADDRESS));
      _print_link("\nDeposit " + ethers.utils.formatEther(userWETHBalance) + " WETH", () => depositWETH(signer, userWETHBalance));
      _print_link("\nWithdraw " + ethers.utils.formatEther(userStakedWETH) + " WETH", () => withdrawWETH(signer, userStakedWETH));
      _print_link("\nClaim " + ethers.utils.formatEther(userPendingWETH) + " BANDIT", () => claimWETH(signer));
    
      _print(`\n                    WBTC Pool - 3% Deposit Fee                     `)
      _print(`        Contract - 0x68f180fcCe6836688e9084f035309E29Bf0A2095         `)
      _print(`  ════════════════════════════════════════════════════════════════════`);
      _print(`Total WBTC Deposited in Pool: ` + totalWBTC / 10**18);
      _print('WBTC Price: $' + wbtcPrice.toFixed(2));
      _print('Total USD Value of WBTC Deposits: $' + stakedWBTCValue.toFixed(2));
      _print(`Rewards: ` + wbtcAPY.toFixed(2) + '% APY');
    
      _print_link("\nApprove WBTC", () => approve(signer, WBTC_ADDRESS));
      _print_link("\nDeposit " + ethers.utils.formatEther(userWBTCBalance) + " WBTC", () => depositWBTC(signer, userWBTCBalance));
      _print_link("\nWithdraw " + ethers.utils.formatEther(userStakedWBTC) + " WBTC", () => withdrawWBTC(signer, userStakedWBTC));
      _print_link("\nClaim " + ethers.utils.formatEther(userPendingWBTC) + " BANDIT", () => claimWBTC(signer));
    
    
    
    
    
    //   var tokens = {};
    
    //   const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
    //   _print('Reward Token Address ' + rewardTokenAddress);
    //   const rewardToken = await getOptimisticToken(App, rewardTokenAddress, chefAddress);
    //   const rewardsPerWeek = rewardsPerWeekFixed ?? await chefContract.callStatic[rewardsPerBlockFunction]() / 10 ** rewardToken.decimals * 604800 / 2;
    
    //   const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) => await getMaticTrzPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));
    
    //   var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));
    
    //   await Promise.all(tokenAddresses.map(async (address) => { tokens[address] = await getOptimisticToken(App, address, chefAddress); }));
    
    //   const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "optimism") : undefined);
    
    //   let aprs = []
    //   for (i = 0; i < poolCount; i++) {
    //     if (poolPrices[i]) {
    //       const apr = printTrzPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
    //         totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
    //         pendingRewardsFunction, 8, null, "optimism", poolInfos[i].depositFee, poolInfos[i].withdrawFee)
    //       aprs.push(apr);
    //     }
    //   }
    //   let totalUserStaked=0, totalStaked=0, averageApr=0;
    //   for (const a of aprs) {
    //     if (!isNaN(a.totalStakedUsd)) {
    //       totalStaked += a.totalStakedUsd;
    //     }
    //     if (a.userStakedUsd > 0) {
    //       totalUserStaked += a.userStakedUsd;
    //       averageApr += a.userStakedUsd * a.yearlyAPR / 100;
    //     }
    //   }
    //   averageApr = averageApr / totalUserStaked;
    //   _print_bold(`Total Staked: $${formatMoney(totalStaked)}`);
    //   if (totalUserStaked > 0) {
    //     _print_bold(`\nYou are staking a total of $${formatMoney(totalUserStaked)} at an average APR of ${(averageApr * 100).toFixed(2)}%`)
    //     _print(`Estimated earnings:`
    //         + ` Day $${formatMoney(totalUserStaked*averageApr/365)}`
    //         + ` Week $${formatMoney(totalUserStaked*averageApr/52)}`
    //         + ` Year $${formatMoney(totalUserStaked*averageApr)}\n`);
    //   }
    //   return { prices, totalUserStaked, totalStaked, averageApr }
    // }
    
    // async function getMaticTrzPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {  
    //   const poolInfo = await chefContract.poolInfo(poolIndex);
    //   if (poolInfo.allocPoint == 0) {
    //     return {
    //       address: poolInfo.lpToken,
    //       allocPoints: poolInfo.allocPoint ?? 1,
    //       poolToken: null,
    //       userStaked : 0,
    //       pendingRewardTokens : 0,
    //     };
    //   }
    //   const poolToken = await getOptimisticToken(app, poolInfo.lpToken, chefAddress);
    //   const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
    //   const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS);
    //   const staked = userInfo.amount / 10 ** poolToken.decimals;
    //   return {
    //       address: poolInfo.lpToken,
    //       allocPoints: poolInfo.allocPoint ?? 1,
    //       poolToken: poolToken,
    //       userStaked : staked,
    //       pendingRewardTokens : pendingRewardTokens / 10 ** 18,
    //       depositFee : (poolInfo.depositFeeBP ?? 0) / 10
    //   };
    // }
    
    // function printTrzPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
    //                        totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
    //                        pendingRewardsFunction, fixedDecimals, claimFunction, chain="eth", depositFee=0, withdrawFee=0) {
    //   fixedDecimals = fixedDecimals ?? 2;
    //   const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
    //   var poolRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek;
    //   if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
    //   const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
    //   const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
    //   const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
    //   _print_inline(`${poolIndex} - `);
    //   poolPrices.print_price(chain);
    //   sp?.print_price(chain);
    //   const apr = printTrzAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
    //     staked_tvl, userStaked, poolPrices.price, fixedDecimals);
    //   if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
    //   if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
    //   printTrzContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
    //     rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
    //     poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, claimFunction, rewardPrice, chain, depositFee, withdrawFee);
    //   return apr;
    // }
    
    // function printTrzAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek,
    //                   stakeTokenTicker, staked_tvl, userStaked, poolTokenPrice,
    //                   fixedDecimals) {
    //   var usdPerWeek = poolRewardsPerWeek * rewardPrice;
    //   fixedDecimals = fixedDecimals ?? 2;
    //   _print(`${rewardTokenTicker} Per Week: ${poolRewardsPerWeek.toFixed(fixedDecimals)} ($${formatMoney(usdPerWeek)})`);
    //   var weeklyAPR = usdPerWeek / staked_tvl * 100;
    //   var dailyAPR = weeklyAPR / 7;
    //   var yearlyAPR = weeklyAPR * 52;
    //   _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
    //   var userStakedUsd = userStaked * poolTokenPrice;
    //   var userStakedPct = userStakedUsd / staked_tvl * 100;
    //   _print(`You are staking ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
    //   var userWeeklyRewards = userStakedPct * poolRewardsPerWeek / 100;
    //   var userDailyRewards = userWeeklyRewards / 7;
    //   var userYearlyRewards = userWeeklyRewards * 52;
    //   if (userStaked > 0) {
    //     _print(`Estimated ${rewardTokenTicker} earnings:`
    //         + ` Day ${userDailyRewards.toFixed(fixedDecimals)} ($${formatMoney(userDailyRewards*rewardPrice)})`
    //         + ` Week ${userWeeklyRewards.toFixed(fixedDecimals)} ($${formatMoney(userWeeklyRewards*rewardPrice)})`
    //         + ` Year ${userYearlyRewards.toFixed(fixedDecimals)} ($${formatMoney(userYearlyRewards*rewardPrice)})`);
    //   }
    //   return {
    //     userStakedUsd,
    //     totalStakedUsd : staked_tvl,
    //     userStakedPct,
    //     yearlyAPR,
    //     userYearlyUsd : userYearlyRewards * rewardPrice
    //   }
    // }
    
    // function printTrzContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, pendingRewardsFunction,
    //     rewardTokenTicker, stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, fixedDecimals,
    //     claimFunction, rewardTokenPrice, chain, depositFee, withdrawFee) {
    //   fixedDecimals = fixedDecimals ?? 2;
    //   const approveAndStake = async function() {
    //     return chefContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
    //   }
    //   const unstake = async function() {
    //     return trzContract_unstake(chefAbi, chefAddr, poolIndex, App)
    //   }
    //   const claim = async function() {
    //     return chefContract_claim(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction, claimFunction)
    //   }
    //   if(depositFee > 0){
    //     _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${depositFee}%`, approveAndStake)
    //   }else{
    //     _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
    //   }
    //   if(withdrawFee > 0){
    //     _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${withdrawFee}%`, unstake)
    //   }else{
    //     _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
    //   }
    //   _print_link(`Claim ${pendingRewardTokens.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(pendingRewardTokens*rewardTokenPrice)})`, claim)
    //   _print(`Staking or unstaking also claims rewards.`)
    //   _print("");
    // }
    
    // const trzContract_unstake = async function(chefAbi, chefAddress, poolIndex, App) {
    //   const signer = App.provider.getSigner()
    //   const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
    
    //   const currentStakedAmount = (await CHEF_CONTRACT.userInfo(poolIndex, App.YOUR_ADDRESS)).amount
    
    //   if (currentStakedAmount > 0) {
    //     showLoading()
    //     CHEF_CONTRACT.withdraw(poolIndex, currentStakedAmount, {gasLimit: 500000})
    //       .then(function(t) {
    //         return App.provider.waitForTransaction(t.hash)
    //       })
    //       .catch(function() {
    //         hideLoading()
    //       })
    //   }
    }