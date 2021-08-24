$(function () {
	consoleInit(main);
});

const QUOKKA_CHEF_ABI = [
	{
		inputs: [
			{ internalType: 'contract QuokkaToken', name: '_quokka', type: 'address' },
			{ internalType: 'uint256', name: '_startBlock', type: 'uint256' },
			{ internalType: 'uint256', name: '_quokkaPerBlock', type: 'uint256' },
			{ internalType: 'address', name: '_quokkaLockerAddress', type: 'address' },
		],
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'user', type: 'address' },
			{ indexed: true, internalType: 'address', name: 'newAddress', type: 'address' },
		],
		name: 'CharityAddressUpdated',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'user', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'previousAmount', type: 'uint256' },
			{ indexed: false, internalType: 'uint16', name: 'newAmount', type: 'uint16' },
		],
		name: 'CharityFeeRateUpdated',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'user', type: 'address' },
			{ indexed: true, internalType: 'uint256', name: 'pid', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
		],
		name: 'Deposit',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'user', type: 'address' },
			{ indexed: true, internalType: 'address', name: 'newAddress', type: 'address' },
		],
		name: 'DevAddressUpdated',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'user', type: 'address' },
			{ indexed: true, internalType: 'uint256', name: 'pid', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
		],
		name: 'EmergencyWithdraw',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'caller', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'previousAmount', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'newAmount', type: 'uint256' },
		],
		name: 'EmissionRateUpdated',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'user', type: 'address' },
			{ indexed: true, internalType: 'address', name: 'newAddress', type: 'address' },
		],
		name: 'FeeAddressUpdated',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'user', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'previousAmount', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'newAmount', type: 'uint256' },
		],
		name: 'LockerRateUpdated',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'user', type: 'address' },
			{ indexed: true, internalType: 'address', name: 'newAddress', type: 'address' },
		],
		name: 'LotteryAddressUpdated',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'user', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'previousAmount', type: 'uint256' },
			{ indexed: false, internalType: 'uint16', name: 'newAmount', type: 'uint16' },
		],
		name: 'LotteryMintRateUpdated',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
			{ indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
		],
		name: 'OwnershipTransferred',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'user', type: 'address' },
			{ indexed: false, internalType: 'contract ILocker', name: 'newAddress', type: 'address' },
		],
		name: 'QuokkaLockerUpdated',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'user', type: 'address' },
			{ indexed: false, internalType: 'contract IReferral', name: 'newAddress', type: 'address' },
		],
		name: 'QuokkaReferralUpdated',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'user', type: 'address' },
			{ indexed: true, internalType: 'address', name: 'referrer', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'newAmount', type: 'uint256' },
		],
		name: 'ReferralCommissionPaid',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'user', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'previousAmount', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'newAmount', type: 'uint256' },
		],
		name: 'ReferralRateUpdated',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'user', type: 'address' },
			{ indexed: true, internalType: 'uint256', name: 'pid', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'newAmount', type: 'uint256' },
		],
		name: 'RewardLockedUp',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'user', type: 'address' },
			{ indexed: true, internalType: 'uint256', name: 'pid', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
		],
		name: 'Withdraw',
		type: 'event',
	},
	{
		inputs: [],
		name: 'BONUS_MULTIPLIER',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'BURN_ADDRESS',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'MAXIMUM_DEPOSIT_FEE',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'MAXIMUM_HARVEST_INTERVAL',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'MAXIMUM_WITHDRAWAL_FEE',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'MAXIMUM_WITHDRAWFEE_INTERVAL',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'uint256', name: '_allocPoint', type: 'uint256' },
			{ internalType: 'contract IBEP20', name: '_lpToken', type: 'address' },
			{ internalType: 'uint16', name: '_depositFeeBP', type: 'uint16' },
			{ internalType: 'uint256', name: '_harvestInterval', type: 'uint256' },
			{ internalType: 'uint256', name: '_withdrawalFeeInterval', type: 'uint256' },
			{ internalType: 'uint256', name: '_withdrawalFeeBP', type: 'uint256' },
			{ internalType: 'bool', name: '_withUpdate', type: 'bool' },
		],
		name: 'add',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'uint256', name: '_pid', type: 'uint256' },
			{ internalType: 'address', name: '_user', type: 'address' },
		],
		name: 'canHarvest',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'charityAddress',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'charityFeeBP',
		outputs: [{ internalType: 'uint16', name: '', type: 'uint16' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'uint256', name: '_pid', type: 'uint256' },
			{ internalType: 'uint256', name: '_amount', type: 'uint256' },
			{ internalType: 'address', name: '_referrer', type: 'address' },
		],
		name: 'deposit',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'devAddress',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint256', name: '_pid', type: 'uint256' }],
		name: 'emergencyWithdraw',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'feeAddress',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'uint256', name: '_from', type: 'uint256' },
			{ internalType: 'uint256', name: '_to', type: 'uint256' },
		],
		name: 'getMultiplier',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'pure',
		type: 'function',
	},
	{
		inputs: [],
		name: 'lockerRate',
		outputs: [{ internalType: 'uint16', name: '', type: 'uint16' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'lotteryAddress',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'lotteryMintRate',
		outputs: [{ internalType: 'uint16', name: '', type: 'uint16' }],
		stateMutability: 'view',
		type: 'function',
	},
	{ inputs: [], name: 'massUpdatePools', outputs: [], stateMutability: 'nonpayable', type: 'function' },
	{
		inputs: [
			{ internalType: 'uint256', name: '_pid', type: 'uint256' },
			{ internalType: 'address', name: '_user', type: 'address' },
		],
		name: 'noWithdrawFee',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'owner',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'uint256', name: '_pid', type: 'uint256' },
			{ internalType: 'address', name: '_user', type: 'address' },
		],
		name: 'pendingQuokka',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'contract IBEP20', name: '', type: 'address' }],
		name: 'poolExistence',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		name: 'poolInfo',
		outputs: [
			{ internalType: 'contract IBEP20', name: 'lpToken', type: 'address' },
			{ internalType: 'uint256', name: 'allocPoint', type: 'uint256' },
			{ internalType: 'uint256', name: 'lastRewardBlock', type: 'uint256' },
			{ internalType: 'uint256', name: 'accQuokkaPerShare', type: 'uint256' },
			{ internalType: 'uint16', name: 'depositFeeBP', type: 'uint16' },
			{ internalType: 'uint256', name: 'harvestInterval', type: 'uint256' },
			{ internalType: 'uint256', name: 'withdrawalFeeInterval', type: 'uint256' },
			{ internalType: 'uint256', name: 'withdrawalFeeBP', type: 'uint256' },
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'poolLength',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'quokka',
		outputs: [{ internalType: 'contract QuokkaToken', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'quokkaLockerAddress',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'quokkaPerBlock',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'quokkaReferral',
		outputs: [{ internalType: 'contract IReferral', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'referralCommissionRate',
		outputs: [{ internalType: 'uint16', name: '', type: 'uint16' }],
		stateMutability: 'view',
		type: 'function',
	},
	{ inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
	{
		inputs: [
			{ internalType: 'uint256', name: '_pid', type: 'uint256' },
			{ internalType: 'uint256', name: '_allocPoint', type: 'uint256' },
			{ internalType: 'uint16', name: '_depositFeeBP', type: 'uint16' },
			{ internalType: 'uint256', name: '_harvestInterval', type: 'uint256' },
			{ internalType: 'uint256', name: '_withdrawalFeeInterval', type: 'uint256' },
			{ internalType: 'uint256', name: '_withdrawalFeeBP', type: 'uint256' },
			{ internalType: 'bool', name: '_withUpdate', type: 'bool' },
		],
		name: 'set',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'address', name: '_charityAddress', type: 'address' }],
		name: 'setCharityAddress',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint16', name: '_charityFeeBP', type: 'uint16' }],
		name: 'setCharityFeeRate',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'address', name: '_devAddress', type: 'address' }],
		name: 'setDevAddress',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'address', name: '_feeAddress', type: 'address' }],
		name: 'setFeeAddress',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint16', name: '_lockerRate', type: 'uint16' }],
		name: 'setLockerRate',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'address', name: '_lotteryAddress', type: 'address' }],
		name: 'setLotteryAddress',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint16', name: '_lotteryMintRate', type: 'uint16' }],
		name: 'setLotteryMintRate',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'contract ILocker', name: '_quokkaLocker', type: 'address' }],
		name: 'setQuokkaLocker',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'contract IReferral', name: '_quokkaReferral', type: 'address' }],
		name: 'setQuokkaReferral',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint16', name: '_referralCommissionRate', type: 'uint16' }],
		name: 'setReferralCommissionRate',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'startBlock',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'totalAllocPoint',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'totalLockedUpRewards',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
		name: 'transferOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint256', name: '_quokkaPerBlock', type: 'uint256' }],
		name: 'updateEmissionRate',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint256', name: '_pid', type: 'uint256' }],
		name: 'updatePool',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'uint256', name: '', type: 'uint256' },
			{ internalType: 'address', name: '', type: 'address' },
		],
		name: 'userInfo',
		outputs: [
			{ internalType: 'uint256', name: 'amount', type: 'uint256' },
			{ internalType: 'uint256', name: 'rewardDebt', type: 'uint256' },
			{ internalType: 'uint256', name: 'rewardLockedUp', type: 'uint256' },
			{ internalType: 'uint256', name: 'nextHarvestUntil', type: 'uint256' },
			{ internalType: 'uint256', name: 'noWithdrawalFeeAfter', type: 'uint256' },
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'uint256', name: '_pid', type: 'uint256' },
			{ internalType: 'uint256', name: '_amount', type: 'uint256' },
		],
		name: 'withdraw',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
];

async function main() {
	const App = await init_ethers();

	_print(`Initialized ${App.YOUR_ADDRESS}\n`);
	_print('Reading smart contracts...\n');

	const QUOKKA_CHEF_ADDR = '0xD05B53c621497be947b4302e64c19d01EC8dbB56';
	const rewardTokenTicker = 'QUOKK';
	const QUOKKA_CHEF = new ethers.Contract(QUOKKA_CHEF_ADDR, QUOKKA_CHEF_ABI, App.provider);

	const startBlock = await QUOKKA_CHEF.startBlock();
	const currentBlock = await App.provider.getBlockNumber();

	const multiplier = await QUOKKA_CHEF.getMultiplier(currentBlock, currentBlock + 1);

	let rewardsPerWeek = 0;
	if (currentBlock < startBlock) {
		_print(`Rewards start at block <a href="https://polygonscan.com/block/countdown/${startBlock}" target="_blank">${startBlock}</a>\n`);
	} else {
		rewardsPerWeek = (((await QUOKKA_CHEF.quokkaPerBlock()) / 1e18) * 604800 * multiplier) / 2.1;
	}

	const tokens = {};
	const prices = await getMaticPrices();

	await loadMaticChefContract(
		App,
		tokens,
		prices,
		QUOKKA_CHEF,
		QUOKKA_CHEF_ADDR,
		QUOKKA_CHEF_ABI,
		rewardTokenTicker,
		'quokka',
		null,
		rewardsPerWeek,
		'pendingQuokka',
	);

	hideLoading();
}
