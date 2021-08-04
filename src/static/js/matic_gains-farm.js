$(function() {
	consoleInit(main)
});

async function main() {
	const App = await init_ethers();
    const signer = App.provider.getSigner()

	_print(`Initialized ${App.YOUR_ADDRESS}\n`);
	_print("Reading smart contract...\n");

	const POOL_ADDR = "0x780BEDfcE47AD1C665c270616da09230E7036116";
	const NFTS_ADDR = [
		"0x3378AD81D09DE23725Ee9B9270635c97Ed601921",
		"0x02e2c5825C1a3b69C0417706DbE1327C2Af3e6C2",
		"0x2D266A94469d05C9e06D52A4D0d9C23b157767c2"
	];
	const LP_ADDR = "0x0c7ad41d3e0dbc1cfdcdd717afb0a72a65cdf069";

	const POOL_ABI = [{"inputs":[{"internalType":"address","name":"_gov","type":"address"},{"internalType":"address","name":"_trading","type":"address"},{"internalType":"contract NftInterfacePoolV4[5]","name":"_nft","type":"address[5]"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"address","name":"value","type":"address"}],"name":"AddressUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"decimals","type":"uint256"}],"name":"NumberUpdated","type":"event"},{"inputs":[],"name":"accTokensPerLp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"c","type":"address"}],"name":"addAllowedContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"allowedContracts","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"apy","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"boostsP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"govFund","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"increaseAccTokensPerLp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lp","outputs":[{"internalType":"contract IUniswapV2Pair","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxNftsStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"nft","outputs":[{"internalType":"contract NftInterfacePoolV4","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"referralP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"c","type":"address"}],"name":"removeAllowedContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_gold","type":"uint256"},{"internalType":"uint256","name":"_plat","type":"uint256"},{"internalType":"uint256","name":"_dia","type":"uint256"}],"name":"setBoostsP","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_gov","type":"address"}],"name":"setGovFund","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lp","type":"address"}],"name":"setLp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxNftsStaked","type":"uint256"}],"name":"setMaxNftsStaked","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_referralP","type":"uint256"}],"name":"setReferralP","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"setToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"referral","type":"address"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"nftType","type":"uint256"},{"internalType":"uint256","name":"nftId","type":"uint256"}],"name":"stakeNft","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract TokenInterfacePoolV4","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tvl","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tvlWithBoosts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"nftIndex","type":"uint256"}],"name":"unstakeNft","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userNfts","outputs":[{"internalType":"uint256","name":"nftId","type":"uint256"},{"internalType":"uint256","name":"nftType","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"provided","type":"uint256"},{"internalType":"address","name":"referral","type":"address"},{"internalType":"uint256","name":"referralRewardsTotal","type":"uint256"},{"internalType":"uint256","name":"totalBoost","type":"uint256"},{"internalType":"uint256","name":"debt","type":"uint256"},{"internalType":"uint256","name":"stakedNftsCount","type":"uint256"}],"stateMutability":"view","type":"function"}];
	const NFT_ABI = [{"inputs":[{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"address","name":"childChainManager","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"userAddress","type":"address"},{"indexed":false,"internalType":"addresspayable","name":"relayerAddress","type":"address"},{"indexed":false,"internalType":"bytes","name":"functionSignature","type":"bytes"}],"name":"MetaTransactionExecuted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"WithdrawnBatch","type":"event"},{"inputs":[],"name":"BATCH_LIMIT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEPOSITOR_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ERC712_VERSION","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"bytes","name":"functionSignature","type":"bytes"},{"internalType":"bytes32","name":"sigR","type":"bytes32"},{"internalType":"bytes32","name":"sigS","type":"bytes32"},{"internalType":"uint8","name":"sigV","type":"uint8"}],"name":"executeMetaTransaction","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getChainId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getDomainSeperator","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getNonce","outputs":[{"internalType":"uint256","name":"nonce","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRoleMember","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleMemberCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"bytes","name":"depositData","type":"bytes"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"withdrawBatch","outputs":[],"stateMutability":"nonpayable","type":"function"}];
	const LP_ABI = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sync","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];

	const POOL_CONTRACT = new ethers.Contract(POOL_ADDR, POOL_ABI, signer);
	let NFT_CONTRACTS = [];
	for(let i = 0; i < 3; i++){ NFT_CONTRACTS.push(new ethers.Contract(NFTS_ADDR[i], NFT_ABI, signer)); }
	const LP_CONTRACT = new ethers.Contract(LP_ADDR, LP_ABI, signer);

	await loadGlobalPoolInfo(App, POOL_CONTRACT, POOL_ADDR, NFT_CONTRACTS, LP_CONTRACT);

	hideLoading();
}

async function loadGlobalPoolInfo(App, pool, poolAddress, nfts, lp) {
	const harvest = async function() {
		showLoading();
		pool.harvest().then((t) => App.provider.waitForTransaction(t.hash).then(() => hideLoading()).catch(() => hideLoading()))
		.catch(() => hideLoading());
	}
	const approveLps = async function() {
		showLoading();
		lp.approve(poolAddress, "115792089237316195423570985008687907853269984665640564039457584007913129639935")
		.then((t) => App.provider.waitForTransaction(t.hash).then(() => hideLoading()).catch(() => hideLoading()))
		.catch(() => hideLoading());
	}
	const stakeLps = async function(balance) {
		showLoading();
		const referral = new URLSearchParams(window.location.search).get("a");
		const address = referral !== null && ethers.utils.isAddress(referral) ? referral : "0x0000000000000000000000000000000000000000";
		pool.stake(balance.toString(), address)
		.then((t) => App.provider.waitForTransaction(t.hash).then(() => hideLoading()).catch(() => hideLoading()))
		.catch(() => hideLoading());
	}
	const unstakeLps = async function(amount) {
		showLoading();
		pool.unstake(amount.toString())
		.then((t) => App.provider.waitForTransaction(t.hash).then(() => hideLoading()).catch(() => hideLoading()))
		.catch(() => hideLoading());
	}
	const approveNft = async function(type) {
		showLoading();
		nfts[type].setApprovalForAll(poolAddress, true)
		.then((t) => App.provider.waitForTransaction(t.hash).then(() => hideLoading()).catch(() => hideLoading()))
		.catch(() => hideLoading());
	}
	const stakeNft = async function(type, id) {
		showLoading();
		pool.stakeNft(type.toString(), id.toString())
		.then((t) => App.provider.waitForTransaction(t.hash).then(() => hideLoading()).catch(() => hideLoading()))
		.catch(() => hideLoading());
	}
	const unstakeNft = async function(index) {
		showLoading();
		pool.unstakeNft(index.toString())
		.then((t) => App.provider.waitForTransaction(t.hash).then(() => hideLoading()).catch(() => hideLoading()))
		.catch(() => hideLoading());
	}
	const copyLink = function (link){
        navigator.clipboard.writeText(link);
	}

	_print(`<a href='https://polygonscan.com/address/${poolAddress}' target='_blank'>Pool Contract</a>`);
	
	await fetch("https://gains-farm.herokuapp.com/apr").then(r => r.json()).then(async r => {
		const tvl = await pool.tvl();
		const baseApr = r.baseApr;
		const averageApr = r.apr;
		const addr = App.YOUR_ADDRESS;

		_print("Finished reading smart contracts.\n");

		_print_bold(`Global pool info:\n`);
  		_print(`TVL: $${formatMoney(Math.round(tvl/1e5))}`);
  		_print(`APR (without NFT): ${Number(baseApr).toFixed(2)}%`);
  		_print(`APR (average): ${Number(averageApr).toFixed(2)}%\n`);

  		const user = await pool.users(addr);
		const userApr = user.provided > 0 ? (user.totalBoost/user.provided+1)*baseApr : 0;
		const pendingReward = await pool.pendingReward({from: addr});

		_print_bold(`Your pool info:\n`);
		_print(`Your APR (including boost): ${Number(userApr).toFixed(5)}%`);
		_print(`LPs Staked: ${Number(user.provided/1e18).toFixed(5)} GFARM2/DAI`);
		_print(`LP Boost: ${Number(user.totalBoost/1e18).toFixed(5)} GFARM2/DAI\n`);

		_print_bold(`Your pool actions:\n`);
		const lpAllowance = await lp.allowance(addr, poolAddress);
		const lpBalance = await lp.balanceOf(addr);
		_print_link(`Harvest ${Number(pendingReward/1e18).toFixed(5)} GFARM2`, harvest);

		if(lpAllowance > 0){
			_print_link(`Stake ${Number(lpBalance/1e18).toFixed(5)} LPs`, () => {stakeLps(lpBalance)});
		}else{
			_print_link(`Approve GFARM2`, approveLps);
		}

		_print_link(`Unstake ${Number(user.provided/1e18).toFixed(5)} LPs`, () => {unstakeLps(user.provided)});

		let stakedNftsMatic = [], stakedNftsPromises = [];
		for(let i = 0; i < user.stakedNftsCount; i++){
			stakedNftsPromises.push(pool.userNfts(addr, i));
		}
		await Promise.all(stakedNftsPromises).then(async r => {
			const nftNames = ["", "", "", "Golden Key", "Platinum Key", "Diamond Key"];
			for(let i = 0; i < r.length; i++){
				_print_link(`Unstake NFT #${r[i].nftId} (${nftNames[r[i].nftType]})`, () => {unstakeNft(i)});
			}

			let nftsCount = [], nftsAllowances = [];

			_print_bold(`\nYour stakable NFTs:\n`);
			if(user.stakedNftsCount < 5){
				nftsCount[0] = await nfts[0].balanceOf(addr);
				nftsAllowances[0] = await nfts[0].isApprovedForAll(addr, poolAddress);
				if(nftsAllowances[0].toString() === "false"){
					_print_link(`Approve ${nftNames[3]}s`, () => { approveNft(0) })
				}else{
					for(let n = 0; n < nftsCount[0]; n++){
						const id = await nfts[0].tokenOfOwnerByIndex(addr, n);
						_print_link(`Stake ${nftNames[3]} #${id}`, () => {stakeNft(3, id)})
					}
				}
				
				nftsCount[1] = await nfts[1].balanceOf(addr);
				nftsAllowances[1] = await nfts[1].isApprovedForAll(addr, poolAddress);
				if(nftsAllowances[1].toString() === "false"){
					_print_link(`Approve ${nftNames[4]}s`, () => { approveNft(1) })
				}else{
					for(let o = 0; o < nftsCount[1]; o++){
						const id = await nfts[1].tokenOfOwnerByIndex(addr, o);
						_print_link(`Stake ${nftNames[4]} #${id}`, () => {stakeNft(4, id)})
					}
				}

				nftsCount[2] = await nfts[2].balanceOf(addr);
				nftsAllowances[2] = await nfts[2].isApprovedForAll(addr, poolAddress);
				if(nftsAllowances[2].toString() === "false"){
					_print_link(`Approve ${nftNames[5]}s`, () => { approveNft(2) })
				}else{
					for(let p = 0; p < nftsCount[2]; p++){
						const id = await nfts[2].tokenOfOwnerByIndex(addr, p);
						_print_link(`Stake ${nftNames[5]} #${id}`, () => {stakeNft(5, id)})
					}
				}
			}else{
				_print(`Max NFTs already staked (5)`);
			}

			_print_bold(`\nReferrals:\n`);
			_print(`Rewards: ${Number(user.referralRewardsTotal/1e18).toFixed(5)} GFARM2`);
			_print(`\nShare your links:`);
			_print_link(`https://gains.farm/farm?a=${addr}`, () => { copyLink(`https://gains.farm/farm?a=${addr}`) });
			_print_link(`https://vfat.tools/polygon/gains-farm?a=${addr}`, () => { copyLink(`https://vfat.tools/polygon/gains-farm?a=${addr}`) });
		});
	});
}