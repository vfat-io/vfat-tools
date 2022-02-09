$(function () {
    consoleInit(main)
    });
    
    const ENERGY8_FARMING_ABI = [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_creationFee",
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
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "farmId",
                    "type": "uint256"
                }
            ],
            "name": "FarmCreated",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "contract IERC20",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "contract IPancakePair",
                    "name": "lpToken",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "startsAt",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "durationInBlocks",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "lpLockTime",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "farmersLimit",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "maxStakePerFarmer",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "lpTotalLimit",
                    "type": "uint256"
                }
            ],
            "name": "createFarm",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "creationFee",
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
                    "name": "farmId",
                    "type": "uint256"
                }
            ],
            "name": "emergencyWithdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "start",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "size",
                    "type": "uint256"
                }
            ],
            "name": "farms",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "creator",
                            "type": "address"
                        },
                        {
                            "internalType": "contract IERC20",
                            "name": "token",
                            "type": "address"
                        },
                        {
                            "internalType": "contract IPancakePair",
                            "name": "lpToken",
                            "type": "address"
                        },
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "startsAt",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "lastRewardedBlock",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "lpLockTime",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "numberOfFarmers",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "lpTotalAmount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "lpTotalLimit",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "farmersLimit",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "maxStakePerFarmer",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "isActive",
                            "type": "bool"
                        }
                    ],
                    "internalType": "struct YieldFarmingWithoutMinting.Farm[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "farmsCount",
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
                    "name": "farmId",
                    "type": "uint256"
                }
            ],
            "name": "harvest",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "farmId",
                    "type": "uint256"
                }
            ],
            "name": "me",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "balance",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "startBlock",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "startTime",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct YieldFarmingWithoutMinting.Farmer",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "farmId",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "value",
                    "type": "bool"
                }
            ],
            "name": "setActive",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_creationFee",
                    "type": "uint256"
                }
            ],
            "name": "setCreationFee",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "farmId",
                    "type": "uint256"
                },
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
                    "name": "farmId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "startsAt",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "blocksDuration",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "lpLockTime",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "farmersLimit",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "maxStakePerFarmer",
                    "type": "uint256"
                }
            ],
            "name": "updateFarm",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "farmId",
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
            "name": "withdrawFee",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "farmId",
                    "type": "uint256"
                }
            ],
            "name": "yield",
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
            "stateMutability": "payable",
            "type": "receive"
        }
    ];

    async function main() {
        const App = await init_ethers();
    
        _print(`Initialized ${App.YOUR_ADDRESS}\n`);
        _print("Reading smart contracts...\n");
    
        const ENERGY8_FARMING_ADDR = "0x392bbDA49a6223AdC26Ae3dA21EF09C726109860";
        const ENERGY8_FARMING = new ethers.Contract(ENERGY8_FARMING_ADDR, ENERGY8_FARMING_ABI, App.provider);

        const BATCH_SIZE = 10

        const farmsCount = await ENERGY8_FARMING.farmsCount()

        const promises = []

        for (let i = -1; i < farmsCount + 1; i += BATCH_SIZE) {
            promises.push(ENERGY8_FARMING.farms(i + 1, Math.min(i + BATCH_SIZE, farmsCount)))
        }

        const farms = await Promise.all(promises).then(result => result.flat())
        const activeFarms = farms.filter(farm => farm.isActive)

        const formattedActiveFarms = activeFarms
            .map(farm => {
                return [
                    `Farm #${farm.id} - ${farm.name}`,
                    '\n',
                    `Creator: <a href='https://polygonscan.com/address/${farm.creator}'>${farm.creator}</a>`,
                    `Staked token: <a href='https://polygonscan.com/token/${farm.token}'>${farm.token}</a>`,
                    `LP token: <a href='https://polygonscan.com/token/${farm.lpToken}'>${farm.lpToken}</a>`,
                    `Starts at: ${new Date(farm.startsAt * 1000).toLocaleString()}`,
                    `Number of stakers: ${farm.numberOfFarmers}`,
                    `Last rewarded block: ${farm.lastRewardedBlock}`,
                    `LP lock time (in seconds): ${farm.lpLockTime}`,
                    `Total staked: ${farm.lpTotalAmount}`,
                    `Total stake limit: ${farm.lpTotalLimit}`,
                    `Stakers limit: ${farm.farmersLimit}`,
                    `Limit per staker: ${farm.maxStakePerFarmer}`,
                ].join('\n')
            })
            .join('\n-------------------------------------------\n\n')

        _print(`Farms: ${farms.length}\n`)
        _print(`Current active farms: ${activeFarms.length}\n`)
        _print(`-------------------------------------------\n`)
        _print(formattedActiveFarms)
    
        hideLoading();
    }
    