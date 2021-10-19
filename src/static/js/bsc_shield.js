$(function () { consoleInit(main) });

const SLD_ADDRESS = "0x1ef6A7e2c966fb7C5403EFEFdE38338b1a95a084";
const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";
const REUSDT_ADDRESS = "0x6ACc136471c3796Db904FBD1329A32F6C11aD051";
const REWARD_CONTRCT_ADDRESS = "0x2d8C927b8e81E409ba7877Ac6641DdBEFf90ea58";
const SLD_USDT_PANCAKE_ADDRESS = "0x86F8C5f9E1CBe5672cEe1ddc82B7a376490eAEd5";

const REWARD_CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "sldUnlocked",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "rewardsPerBlockForLP1",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "stakings",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_reToken",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "stakeForLP1",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_reToken",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "withdrawForLP1",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "queryRewardsForLP1",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
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
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "claimRewardsForLP1",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
];

const REUSDT_ABI = [
  {
    "inputs": [],
    "name": "plAmountInfo",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "plDepositTotal",
        "type": "uint256"
        },
        {
        "internalType": "uint256",
        "name": "pl1lockedAmount",
        "type": "uint256"
        },
        {
        "internalType": "uint256",
        "name": "pl1AvailAmount",
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
    "name": "lpAccount",
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
        "name": "_mintAmount",
        "type": "uint256"
      }
    ],
    "name": "provide",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_reTokenAmount",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "_reAmount",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
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
    "name": "lastProvideTm",
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
    "name": "lockupPeriod",
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
        "name": "_mintAmount",
        "type": "uint256"
      }
    ],
    "name": "getMintReDaiAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "mintOtoken",
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
        "name": "_reTokenAmount",
        "type": "uint256"
      }
    ],
    "name": "getTokenAmountByreToken",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "tokenAmount",
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
]

async function main() {
  const App = await init_ethers();
  const signer = App.provider.getSigner();
  const tokens = {};

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");
  
  _print("\n");
  _print("  ______   __        __            __        __        _______                        __                                    __ ");
  _print(" /      \\ /  |      /  |          /  |      /  |      /       \\                      /  |                                  /  |");
  _print("/$$$$$$  |$$ |____  $$/   ______  $$ |  ____$$ |      $$$$$$$  | ______    ______   _$$ |_     ______    _______   ______  $$ |");
  _print("$$ \\__$$/ $$      \\ /  | /      \\ $$ | /    $$ |      $$ |__$$ |/      \\  /      \\ / $$   |   /      \\  /       | /      \\ $$ |");
  _print("$$      \\ $$$$$$$  |$$ |/$$$$$$  |$$ |/$$$$$$$ |      $$    $$//$$$$$$  |/$$$$$$  |$$$$$$/   /$$$$$$  |/$$$$$$$/ /$$$$$$  |$$ |");
  _print(" $$$$$$  |$$ |  $$ |$$ |$$    $$ |$$ |$$ |  $$ |      $$$$$$$/ $$ |  $$/ $$ |  $$ |  $$ | __ $$ |  $$ |$$ |      $$ |  $$ |$$ |");
  _print("/  \\__$$ |$$ |  $$ |$$ |$$$$$$$$/ $$ |$$ \\__$$ |      $$ |     $$ |      $$ \\__$$ |  $$ |/  |$$ \\__$$ |$$ \\_____ $$ \\__$$ |$$ |");
  _print("$$    $$/ $$ |  $$ |$$ |$$       |$$ |$$    $$ |      $$ |     $$ |      $$    $$/   $$  $$/ $$    $$/ $$       |$$    $$/ $$ |");
  _print(" $$$$$$/  $$/   $$/ $$/  $$$$$$$/ $$/  $$$$$$$/       $$/      $$/        $$$$$$/     $$$$/   $$$$$$/   $$$$$$$/  $$$$$$/  $$/ ");
  _print("\n");

  var tokenAddresses = [SLD_ADDRESS, USDT_ADDRESS, REUSDT_ADDRESS];

  await Promise.all(tokenAddresses.map(async (address) => {
    tokens[address] = await getBscToken(App, address, App.YOUR_ADDRESS);
  }));

  const REWARD_CONTRACT = new ethers.Contract(REWARD_CONTRCT_ADDRESS, REWARD_CONTRACT_ABI, signer)
  const USDT_PUBLIC_POOL_CONTRACT = new ethers.Contract(REUSDT_ADDRESS, REUSDT_ABI, signer)
  _print("Finished reading smart contracts.\n");

  _print("********************* Shield Token(SLD) Info **********************");
  const sld_price = (await getSLDInfo(tokens, REWARD_CONTRACT)).price;
  _print("*******************************************************************");
  _print("\n");

  _print("*********************** Mining Instructions ***********************");
  _print("  - Firstly, provide USDT to get reUSDT via USDT public pool.")
  _print("  - Secondly, lock reUSDT in reward pool to earn SLD token.")
  _print("*******************************************************************");
  _print("\n");

  await getUSDTPublicPool(App, USDT_PUBLIC_POOL_CONTRACT, App.YOUR_ADDRESS, tokens);
  _print("\n");

  await getRewardPool(App, REWARD_CONTRACT, tokens, sld_price);
  _print("\n");

  hideLoading();
};

const getSLDInfo = async (tokens, reward_contract) => {
  const etherscanUrl = `<a href='https://bscscan.com/token/${SLD_ADDRESS}' target='_blank'>Contract Address</a>`;
  _print(etherscanUrl);

  const [usdtBalance, sldBalance] = await Promise.all([
    tokens[USDT_ADDRESS].contract.balanceOf(SLD_USDT_PANCAKE_ADDRESS),
    tokens[SLD_ADDRESS].contract.balanceOf(SLD_USDT_PANCAKE_ADDRESS),
  ]);

  const sld_price = usdtBalance / sldBalance;
  _print(`SLD Price: $${sld_price.toFixed(4)}`);

  const sld_total_mined = await reward_contract.sldUnlocked();
  _print(`Total Mined: ${(sld_total_mined / 1e18).toFixed(4)} SLD ($${(sld_price * sld_total_mined / 1e18).toFixed(2)})`);

  return {
    price: sld_price,
    mined: sld_total_mined,
  }
};

const getUSDTPublicPool = async (App, pool, user, tokens, price) => {
  const etherscanUrl = `<a href='https://bscscan.com/token/${REUSDT_ADDRESS}' target='_blank'>USDT Public Pool</a>`;
  _print(`${etherscanUrl}`);
  _print("-----------------------");

  const staked_usdt = (await pool.plAmountInfo()).plDepositTotal / 1e18;
  _print(`Total Provided: ${staked_usdt.toFixed(4)} USDT ($${staked_usdt.toFixed(2)})`);
  const user_staked_usdt = (await pool.lpAccount(user)) / 1e18;
  _print(`You are providing: ${user_staked_usdt.toFixed(2)} USDT ($${user_staked_usdt.toFixed(2)})`);
  _print(`<a href='https://bscscan.com/address/${REUSDT_ADDRESS}' target='_blank'>Contract Address</a>`);

  const [user_balance, user_staked] = await Promise.all([
    tokens[USDT_ADDRESS].contract.balanceOf(user),
    tokens[REUSDT_ADDRESS].contract.balanceOf(user),
  ]);

  const reTokenAmount = (user_balance == 0) ? 0 : await pool.getMintReDaiAmount(user_balance);

  const approveAndProvide = async function () {
    return provideUSDT(App, pool, tokens[USDT_ADDRESS]);
  }
  _print_link(`Provide ${(user_balance / 1e18).toFixed(4)} USDT to get ${(reTokenAmount / 1e18).toFixed(4)} reUSDT`, approveAndProvide);

  const fiatTokenAmount = (user_staked == 0) ? 0 : await pool.getTokenAmountByreToken(user_staked);
  const withdraw = async function () {
    if (user_staked > 0) {
      return withdrawUSDT(App, pool);
    } else {
      alert('You have no tokens to withdraw!!');
    }
  }
  _print_link(`Withdraw ${(user_staked / 1e18).toFixed(4)} reUSDT to redeem ${(fiatTokenAmount / 1e18).toFixed(4)} USDT`, withdraw);
  _print("-----------------------");
};

const getRewardPool = async (App, reward_contract, tokens, price) => {
  const etherscanUrl = `<a href='https://bscscan.com/address/${reward_contract.address}' target='_blank'>Reward Pool</a>`;
  _print(`${etherscanUrl}`);
  _print("-----------------------");

  const staked_reusdt = (await tokens[REUSDT_ADDRESS].contract.balanceOf(reward_contract.address)) / 1e18;
  _print(`Total Locked: ${staked_reusdt.toFixed(4)} reUSDT ($${staked_reusdt.toFixed(2)})`);

  const rewardPerBlock = await reward_contract.rewardsPerBlockForLP1();
  const rewardPerDay = 24 * 60 * 60 / 3 * rewardPerBlock / 1e18;
  const rewardPerWeek = 7 * rewardPerDay;
  const rewardPerYear = 365 * rewardPerDay;
  _print(`SLD token Mined Per Week: ${rewardPerWeek.toFixed(4)} ($${(rewardPerWeek * price).toFixed(2)})`);

  const apr_day = rewardPerDay * price / staked_reusdt * 100;
  const apr_week = rewardPerWeek * price / staked_reusdt * 100;
  const apr_year = rewardPerYear * price / staked_reusdt * 100;
  _print(`APR: Day ${apr_day.toFixed(2)}% Week ${apr_week.toFixed(2)}% Year ${apr_year.toFixed(2)}%`);

  const user_staked = await reward_contract.stakings(App.YOUR_ADDRESS) / 1e18;
  const shareOfPool = user_staked / staked_reusdt * 100;
  _print(`You are locking ${user_staked.toFixed(4)} reUSDT ($${user_staked.toFixed(2)}), ${shareOfPool.toFixed(2)}% of the pool.`)

  _print(`<a href='https://bscscan.com/address/${reward_contract.address}' target='_blank'>Contract Address</a>`);

  const user_balance = await tokens[REUSDT_ADDRESS].contract.balanceOf(App.YOUR_ADDRESS);
  const approveAndLock = async function () {
    return lockReUSDT(App, reward_contract, tokens[REUSDT_ADDRESS]);
  }
  _print_link(`Lock ${(user_balance / 1e18).toFixed(4)} reUSDT`, approveAndLock);

  const unlock = async function () {
    if (user_staked > 0) {
      return unlockReUSDT(App, reward_contract, tokens[REUSDT_ADDRESS]);
    } else {
      alert('You have no tokens to unlock!!');
    }
  }
  _print_link(`Unlock ${user_staked.toFixed(4)} reUSDT`, unlock);

  const claimable = (await reward_contract.queryRewardsForLP1(App.YOUR_ADDRESS))[0];
  const claim = async function () {
    if (claimable > 0) {
      return claimSLD(App, reward_contract);
    } else {
      alert('You have no tokens to claim!!');
    }
  };
  _print_link(`Claim ${(claimable / 1e18).toFixed(4)} SLD ($${(claimable * price / 1e18).toFixed(2)}).`, claim);

  _print("Lock or unlock also claims SLD rewards.")
};

const provideUSDT = async (App, pool, staked_token) => {
  const currentTokens = await staked_token.contract.balanceOf(App.YOUR_ADDRESS)
  const allowedTokens = await staked_token.contract.allowance(App.YOUR_ADDRESS, pool.address);

  let allow = Promise.resolve()
  if (allowedTokens / 1e18 < currentTokens / 1e18) {
    showLoading();
    const TOKEN = new ethers.Contract(staked_token.address, ERC20_ABI, App.provider.getSigner());
    allow = TOKEN.approve(pool.address, ethers.constants.MaxUint256)
      .then(function (t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function (e) {
        alert(e)
        hideLoading()
        alert('Try resetting your approval to 0 first')
      })
  }

  if (currentTokens / 1e18 > 0) {
    showLoading()
    allow
      .then(async function () {
        pool.provide(currentTokens)
          .then(function (t) {
            App.provider.waitForTransaction(t.hash).then(function () {
              hideLoading();
            })
          })
          .catch(function () {
            hideLoading();
            _print('Something went wrong.');
          })
      })
      .catch(function () {
        hideLoading();
        _print('Something went wrong.');
      })
  } else {
    alert('You have no tokens to deposit!!');
  }
};

const withdrawUSDT = async (App, pool) => {
  const latestProvideTime = await pool.lastProvideTm(App.YOUR_ADDRESS);
  const lockPeriod = await pool.lockupPeriod();

  const currentStakedAmount = await pool.balanceOf(App.YOUR_ADDRESS);

  if (Date.now() >= latestProvideTime + lockPeriod) {
    if (currentStakedAmount / 1e18 > 0) {
      showLoading();
      const t = await pool.withdraw(currentStakedAmount);
      hideLoading();
      return App.provider.waitForTransaction(t.hash);
    }
  } else {
    alert(`Token should be locked for ${parseInt(lockPeriod / (24 * 60 * 60))} days`);
  }
};

const lockReUSDT = async (App, reward_contract, staked_token) => {
  const currentTokens = await staked_token.contract.balanceOf(App.YOUR_ADDRESS)
  const allowedTokens = await staked_token.contract.allowance(App.YOUR_ADDRESS, reward_contract.address);

  let allow = Promise.resolve()
  if (allowedTokens / 1e18 < currentTokens / 1e18) {
    showLoading();
    const TOKEN = new ethers.Contract(staked_token.address, ERC20_ABI, App.provider.getSigner()) 
    allow = TOKEN.approve(reward_contract.address, ethers.constants.MaxUint256)
      .then(function (t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function (e) {
        alert(e)
        hideLoading()
        alert('Try resetting your approval to 0 first')
      })
  };

  if (currentTokens / 1e18 > 0) {
    showLoading()
    allow
      .then(async function () {
        reward_contract.stakeForLP1(staked_token.address, currentTokens)
          .then(function (t) {
            App.provider.waitForTransaction(t.hash).then(function () {
              hideLoading();
            })
          })
          .catch(function () {
            hideLoading();
            _print('Something went wrong.');
          })
      })
      .catch(function () {
        hideLoading();
        _print('Something went wrong.');
      })
  } else {
    alert('You have no tokens to lock!!');
  }
};

const unlockReUSDT = async (App, reward_contract, staked_token) => {
  const currentLockedAmount = await reward_contract.stakings(App.YOUR_ADDRESS);

  if (currentLockedAmount / 1e18 > 0) {
    showLoading();
    const t = await reward_contract.withdrawForLP1(staked_token.address, currentLockedAmount);
    hideLoading();
    return App.provider.waitForTransaction(t.hash);
  } else {
    alert('You have no tokens to unlock!!');
  }
};

const claimSLD = async (App, reward_contract) => {
  showLoading();
  const t = await reward_contract.claimRewardsForLP1();
  hideLoading();
  return App.provider.waitForTransaction(t.hash);
};