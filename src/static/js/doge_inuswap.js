$(function() {
    consoleInit(main)
      });
    
      async function main() {
        const App = await init_ethers();
    
        _print(`Initialized ${App.YOUR_ADDRESS}\n`);
        _print("Reading smart contracts...\n");
    
        const MASTERCHEF_ADDR = "0x4e530537a6c9542AfE6decB819F8080eAe16C5e4";
        const MASTERCHEF_ABI = [
          {
            "inputs": [
              {
                "internalType": "contract IInu",
                "name": "_inu",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "_devaddr",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "_feeAddress",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "_inuPerBlock",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "_startBlock",
                "type": "uint256"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "pid",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "Deposit",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "pid",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "EmergencyWithdraw",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "previousInuPerBlock",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "newInuPerBlock",
                "type": "uint256"
              }
            ],
            "name": "EmissionUpdated",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
              }
            ],
            "name": "OwnerUpdated",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "boostContract",
                "type": "address"
              }
            ],
            "name": "UpdateBoostContract",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "pid",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "oldMultiplier",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "newMultiplier",
                "type": "uint256"
              }
            ],
            "name": "UpdateBoostMultiplier",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "pid",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "Withdraw",
            "type": "event"
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
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_allocPoint",
                "type": "uint256"
              },
              {
                "internalType": "contract IERC20",
                "name": "_lpToken",
                "type": "address"
              },
              {
                "internalType": "uint16",
                "name": "_depositFeeBP",
                "type": "uint16"
              },
              {
                "internalType": "bool",
                "name": "_withUpdate",
                "type": "bool"
              }
            ],
            "name": "add",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_pid",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
              }
            ],
            "name": "deposit",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "devaddr",
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
                "name": "_pid",
                "type": "uint256"
              }
            ],
            "name": "emergencyWithdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "feeAddress",
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
                "name": "_from",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "_to",
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
            "stateMutability": "pure",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "inu",
            "outputs": [
              {
                "internalType": "contract IInu",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "inuPerBlock",
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
            "name": "massUpdatePools",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "owner",
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
                "name": "_pid",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "_user",
                "type": "address"
              }
            ],
            "name": "pendingInu",
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
            "name": "poolInfo",
            "outputs": [
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
                "name": "lastRewardBlock",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "accInuPerShare",
                "type": "uint256"
              },
              {
                "internalType": "uint16",
                "name": "depositFeeBP",
                "type": "uint16"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "poolLength",
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
                "name": "_pid",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "_allocPoint",
                "type": "uint256"
              },
              {
                "internalType": "uint16",
                "name": "_depositFeeBP",
                "type": "uint16"
              },
              {
                "internalType": "bool",
                "name": "_withUpdate",
                "type": "bool"
              }
            ],
            "name": "set",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_devaddr",
                "type": "address"
              }
            ],
            "name": "setDevAddress",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_feeAddress",
                "type": "address"
              }
            ],
            "name": "setFeeAddress",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
              }
            ],
            "name": "setOwner",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_startBlock",
                "type": "uint256"
              }
            ],
            "name": "setStartBlock",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "startBlock",
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
            "name": "startBlockSet",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "totalAllocPoint",
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
                "name": "_inuPerBlock",
                "type": "uint256"
              }
            ],
            "name": "updateEmissionRate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_pid",
                "type": "uint256"
              }
            ],
            "name": "updatePool",
            "outputs": [],
            "stateMutability": "nonpayable",
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
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "name": "userInfo",
            "outputs": [
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
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_pid",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
              }
            ],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ]
    
        const INUCHEF = new ethers.Contract(MASTERCHEF_ADDR, MASTERCHEF_ABI, App.provider);
        const currentBlock = await App.provider.getBlockNumber();
    
        const multiplier = await INUCHEF.getMultiplier(currentBlock, currentBlock + 1);
        const blocksPerSeconds = await getAverageBlockTime(App);
        const rewardsPerWeek = await INUCHEF.inuPerBlock() / 1e18 * multiplier * 604800 / blocksPerSeconds;

        const tokens = {};
        const prices = await getDogePrices();

        await loadGeneralChefContract(App, tokens, prices, INUCHEF, MASTERCHEF_ADDR, MASTERCHEF_ABI, "INU",
          "inu", null, rewardsPerWeek, "pendingInu", [], "doge");
    
        hideLoading();
      }
    
    async function loadFarmContract(App, chef, chefAddress, chefAbi, rewardTokenTicker,
        rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
        extraPrices, deathPoolIndices, showAll) {
      const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);
    
      const poolCount = parseInt(await chefContract.poolLength(), 10);
      const totalAllocPoints = await chefContract.totalAllocPoint();
    
      _print(`<a href='https://explorer.dogechain.dog/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
      _print(`Found ${poolCount} pools.\n`)
    
      _print(`Showing incentivized pools only.\n`);
    
      var tokens = {};
    
      const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
      const rewardToken = await getToken(App, rewardTokenAddress, chefAddress);
      const rewardsPerWeek = rewardsPerWeekFixed ??
        await chefContract.callStatic[rewardsPerBlockFunction]()
        / 10 ** rewardToken.decimals * 604800 / 13.5
    
      const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) => {
        try {
          return await getPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction, showAll);
        }
        catch (ex) {
          console.log(`Error loading pool ${x}: ${ex}`);
          return null;
        }
      }));
    
      var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x?.poolToken).map(x => x.poolToken.tokens));
      var prices = await lookUpTokenPrices(tokenAddresses.filter(a => a.toLowerCase() != rewardTokenAddress.toLowerCase()));
      if (extraPrices) {
        for (const [k,v] of Object.entries(extraPrices)) {
          if (v.usd) {
            prices[k] = v
          }
        }
      }
    
      await Promise.all(tokenAddresses.map(async (address) => {
          tokens[address] = await getToken(App, address, chefAddress);
      }));
    
      if (deathPoolIndices) {   //load prices for the deathpool assets
        deathPoolIndices.map(i => poolInfos[i])
                         .map(poolInfo =>
          poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "eth") : undefined);
      }
    
      const poolPrices = poolInfos.map(poolInfo => poolInfo?.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken) : undefined);
    
      _print("Finished reading smart contracts.\n");
    
      let aprs = []
      for (let i = 0; i < poolCount; i++) {
        if (poolPrices[i]) {
          const apr = printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
            totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
            pendingRewardsFunction)
          aprs.push(apr);
        }
      }
      let totalUserStaked=0, totalStaked=0, averageApr=0;
      for (const a of aprs) {
        if (a && !isNaN(a.totalStakedUsd)) {
          totalStaked += a.totalStakedUsd;
        }
        if (a && a.userStakedUsd > 0) {
          totalUserStaked += a.userStakedUsd;
          averageApr += a.userStakedUsd * a.yearlyAPR / 100;
        }
      }
      averageApr = averageApr / totalUserStaked;
      _print_bold(`Total Staked: $${formatMoney(totalStaked)}`);
      if (totalUserStaked > 0) {
        _print_bold(`\nYou are staking a total of $${formatMoney(totalUserStaked)} at an average APR of ${(averageApr * 100).toFixed(2)}%`)
        _print(`Estimated earnings:`
            + ` Day $${formatMoney(totalUserStaked*averageApr/365)}`
            + ` Week $${formatMoney(totalUserStaked*averageApr/52)}`
            + ` Year $${formatMoney(totalUserStaked*averageApr)}\n`);
      }
      return { prices, totalUserStaked, totalStaked, averageApr }
    }