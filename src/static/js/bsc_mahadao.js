
$(function() {
    consoleInit(main)
  });

const BasicStakingABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_rewardsDistribution",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_rewardsToken",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_stakingToken",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_rewardsDuration",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "DefaultInitialization",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "tokenAddress",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Recovered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "reward",
          "type": "uint256"
        }
      ],
      "name": "RewardAdded",
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
          "name": "reward",
          "type": "uint256"
        }
      ],
      "name": "RewardPaid",
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
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Staked",
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
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Withdrawn",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "lastUpdateTime",
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
      "name": "periodFinish",
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
      "name": "rewardPerTokenStored",
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
      "name": "rewardRate",
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
      "name": "rewards",
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
      "name": "rewardsDistribution",
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
      "name": "rewardsDuration",
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
      "name": "rewardsToken",
      "outputs": [
        {
          "internalType": "contract IPoolToken",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "stakingToken",
      "outputs": [
        {
          "internalType": "contract IERC20",
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
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "userRewardPerTokenPaid",
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
      "name": "initializeDefault",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
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
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
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
      "name": "lastTimeRewardApplicable",
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
      "name": "rewardPerToken",
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
          "name": "account",
          "type": "address"
        }
      ],
      "name": "earned",
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
      "name": "getRewardForDuration",
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
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "stake",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getReward",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getRewardAndDistribute",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "exit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "reward",
          "type": "uint256"
        }
      ],
      "name": "notifyRewardAmount",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenAmount",
          "type": "uint256"
        }
      ],
      "name": "recoverERC20",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
]

const IERC20 = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "totalSupply",
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
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
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
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
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
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
]

async function getCollateralPrices() { 
    let arthprice = await getCoinGeckoPrice('arth')
    let busdPrice = await getCoinGeckoPrice('binance-usd')
    let mahaprice = await getCoinGeckoPrice('mahadao')
    
    console.log(arthprice);
    return {
        ARTH: arthprice,
        BUSD: busdPrice,
        MAHA: mahaprice
    }
}

const bsc = {
    arthBusdStaking: "0xE8b16cab47505708a093085926560a3eB32584B8",
    arthMahaStaking: "0x7699d230Ba47796fc2E13fba1D2D52Ecb0318c33",
    arthMahaLP: "0xb955d5b120ff5b803cdb5a225c11583cd56b7040",
    arthBusdLP: "0x80342bc6125a102a33909d124a6c26CC5D7b8d56",
    busd: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
    arth: "0xb69a424df8c737a122d0e60695382b3eec07ff4b",
    maha: "0xCE86F7fcD3B40791F63B86C3ea3B8B355Ce2685b",
};

const tokenDecimals = {
    ARTH: 18,
    BUSD: 18,
    MAHA: 18,
};
  
const getAPR = async (
    contractTVLinUSD,
    monthlyRewardinMAHA,
    collateralPrices
) => {
    const rewardinUSD = 12 * monthlyRewardinMAHA * collateralPrices.MAHA;
    return (rewardinUSD / contractTVLinUSD) * 100;
};
  
const getLPTokenTVLinUSD = async (
    lpAddress,
    tokenAddresses,
    tokenNames,
    collateralPrices,
    provider
) => {
    const token1 = new ethers.Contract(tokenAddresses[0], IERC20, provider);
    const token2 = new ethers.Contract(tokenAddresses[1], IERC20, provider);
  
    const token1Balance = await token1.balanceOf(lpAddress);
    const token2Balance = await token2.balanceOf(lpAddress);
  
    const token1Decimals = ethers.BigNumber.from(10).pow(tokenDecimals[tokenNames[0]]);
    const token2Decimals = ethers.BigNumber.from(10).pow(tokenDecimals[tokenNames[1]]); 
  
    const token1Amount = token1Balance.div(token1Decimals);
    const token2Amount = token2Balance.div(token2Decimals);
  
    const token1USDValue = token1Amount
      .mul(Math.floor(1000 * collateralPrices[tokenNames[0]]))
      .div(1000);
    const token2USDValue = token2Amount
      .mul(Math.floor(1000 * collateralPrices[tokenNames[1]]))
      .div(1000);
  
    // total usd in the LP token
    return token1USDValue.add(token2USDValue);
};
  
const getTVL = async (
    stakingContractAddress,
    lpAddress,
    tokenAddresses,
    tokenNames,
    collateralPrices,
    provider
) => {
    const stakingContract = new ethers.Contract(
      stakingContractAddress,
      BasicStakingABI,
      provider
    );
    const lpToken = new ethers.Contract(lpAddress, IERC20, provider);
  
    const lpTokenTVLinUSD = await getLPTokenTVLinUSD(
      lpAddress,
      tokenAddresses,
      tokenNames,
      collateralPrices,
      provider
    );
  
    const totalSupply = await lpToken.totalSupply();
    const stakedAmount = await stakingContract.totalSupply();
  
    const percentageStaked = stakedAmount.mul(1000000).div(totalSupply);
    const stakedUSD = percentageStaked.mul(lpTokenTVLinUSD).div(1000000);
    return stakedUSD.toNumber();
};
  
const fetchAPRs = async (bscProvider) => {
    const collateralPrices = await getCollateralPrices();
  
    const arthMahaBscTVL = await getTVL(
      bsc.arthMahaStaking,
      bsc.arthMahaLP,
      [bsc.arth, bsc.maha],
      ["ARTH", "MAHA"],
      collateralPrices,
      bscProvider
    );
  
    const arthBuscBscTVL = await getTVL(
      bsc.arthBusdStaking,
      bsc.arthBusdLP,
      [bsc.arth, bsc.busd],
      ["ARTH", "BUSD"],
      collateralPrices,
      bscProvider
    );
    
    let results = []
    
    await results.push(
        {
            ARTH_BUSD :{
                apr: await getAPR(arthBuscBscTVL, 5000, collateralPrices),
                tvl: arthBuscBscTVL
            }
        },
        {
            ARTH_MAHA: {
                apr: await getAPR(arthMahaBscTVL, 5000, collateralPrices),
                tvl: arthMahaBscTVL
            }
        }
    )

    return results
};

  
async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);

    _print(`Info: <a target="_blank" href="https://mahadao.com/">[+]</a>`)
    _print(`Twitter: <a target="_blank" href="https://twitter.com/TheMahaDAO">[+]</a>`)
    _print(`Telegram: <a target="_blank" href="https://t.me/MahaDAO">[+]</a>`)
    _print("")
    
    _print("Reading smart contracts...\n");
    _print("Result \n");

    const price =  await getCollateralPrices()
    const apr = await fetchAPRs(App.provider)

    for (let i = 0; i < apr.length; i++) {
        let poolName = Object.keys(apr[i])
        let pool = poolName[0].split("_")

        _print_bold(`[${[pool[0]]}]-[${[pool[1]]}] TVL: $${apr[i][poolName]["tvl"]}`)
        _print(`${[pool[0]]} Price: $${price[pool[0]]}`)
        _print(`${[pool[1]]} Price: $${price[pool[1]]}`)
        _print(`Apr: Day ${(((apr[i][poolName]["apr"]).toFixed(2))/365).toFixed(2)}% Week ${(((apr[i][poolName]["apr"]).toFixed(2))/52).toFixed(2)} year ${((apr[i][poolName]["apr"]).toFixed(2))}`)
        _print(`TVL: $${apr[i][poolName]["tvl"]}`)
        _print(`<a target="_blank" href="https://pancakeswap.finance/add/0xB69A424Df8C737a122D0e60695382B3Eec07fF4B/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56">Add Liquidity</a>`)
        _print(`<a target="_blank" href="https://app.arthcoin.com/#/farming">Stake</a>`)
        _print("")
    }

    hideLoading();
}
