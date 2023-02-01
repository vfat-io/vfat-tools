$(function() {
    consoleInit(main)
      });

const VAULT_ABI = [{"inputs":[{"internalType":"uint256","name":"_liveTime","type":"uint256"},{"internalType":"uint256","name":"_protocolFee","type":"uint256"},{"internalType":"address","name":"_feeWallet","type":"address"},{"internalType":"address","name":"_derivativeSpecification","type":"address"},{"internalType":"address","name":"_collateralToken","type":"address"},{"internalType":"address[]","name":"_oracles","type":"address[]"},{"internalType":"address[]","name":"_oracleIterators","type":"address[]"},{"internalType":"address","name":"_collateralSplit","type":"address"},{"internalType":"address","name":"_tokenBuilder","type":"address"},{"internalType":"address","name":"_feeLogger","type":"address"},{"internalType":"uint256","name":"_authorFeeLimit","type":"uint256"},{"internalType":"uint256","name":"_settlementDelay","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"primaryToken","type":"address"},{"indexed":false,"internalType":"address","name":"complementToken","type":"address"}],"name":"LiveStateSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"minted","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"collateral","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"fee","type":"uint256"}],"name":"Minted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"address","name":"tokenAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"conversion","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"collateral","type":"uint256"}],"name":"Redeemed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"collateral","type":"uint256"}],"name":"Refunded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"int256[]","name":"underlyingStarts","type":"int256[]"},{"indexed":false,"internalType":"int256[]","name":"underlyingEnds","type":"int256[]"},{"indexed":false,"internalType":"uint256","name":"primaryConversion","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"complementConversion","type":"uint256"}],"name":"SettledStateSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"enum Vault.State","name":"oldState","type":"uint8"},{"indexed":false,"internalType":"enum Vault.State","name":"newState","type":"uint8"}],"name":"StateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"FRACTION_MULTIPLIER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"authorFeeLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"collateralSplit","outputs":[{"internalType":"contract ICollateralSplit","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"collateralToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"complementConversion","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"complementToken","outputs":[{"internalType":"contract IERC20MintedBurnable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"derivativeSpecification","outputs":[{"internalType":"contract IDerivativeSpecification","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeLogger","outputs":[{"internalType":"contract IFeeLogger","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"int256[]","name":"_underlyingStarts","type":"int256[]"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"liveTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_collateralAmount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_collateralAmount","type":"uint256"}],"name":"mintTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"oracleIterators","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"oracles","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"primaryConversion","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"primaryToken","outputs":[{"internalType":"contract IERC20MintedBurnable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"protocolFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_split","type":"uint256"}],"name":"range","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"_primaryTokenAmount","type":"uint256"},{"internalType":"uint256","name":"_complementTokenAmount","type":"uint256"},{"internalType":"uint256[]","name":"_underlyingEndRoundHints","type":"uint256[]"}],"name":"redeem","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_primaryTokenAmount","type":"uint256"},{"internalType":"uint256","name":"_complementTokenAmount","type":"uint256"},{"internalType":"uint256[]","name":"_underlyingEndRoundHints","type":"uint256[]"}],"name":"redeemTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenAmount","type":"uint256"}],"name":"refund","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_tokenAmount","type":"uint256"}],"name":"refundTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_underlyingEndRoundHints","type":"uint256[]"}],"name":"settle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"settleTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"settlementDelay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"state","outputs":[{"internalType":"enum Vault.State","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenBuilder","outputs":[{"internalType":"contract ITokenBuilder","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"underlyingEnds","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"underlyingStarts","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const ERC20Json = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];

const vaults = [
  '0xd4C10158e9B7832e0Dd7C121Ce9eAe0856E7F6D9',
  '0x37F14Bcd72076C4F7DdD7fd29DcC519fABc935F7',
  '0xac72F4Ec02EdF994C18b208B99C2ffBE505418c7',
  '0x2E17509724dbE94D9cB03c3ecDaB6a49bC78AF94',
  '0x817e30fD53b2fE30F87A4Dc450811029961bAbF9',
  '0xc8D05aC9bE57779b0F46AC12313567f7359A8495',
  '0xD6f361320E61D0A912AcF10c53e2D5C43aa79dc2',
  '0xea5b9650f6c47D112Bb008132a86388B594Eb849',
  '0x4eba099F97ffeD8de47a14f835820815f141Ea08',
  '0xd498bF281262e04b0Dc8A1c6D14877Cee46AAAAE'
];

async function main(){
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);

    for(const vaultAddress of vaults){
        await showVault(App, vaultAddress)
    }

    hideLoading();
}

async function showVault(App, vaultAddress){
    const COMPLI_CONTRACT = new ethers.Contract(vaultAddress, VAULT_ABI, App.provider);

    const collateralTokenAddress = await COMPLI_CONTRACT.collateralToken();
    const primaryTokenAddress = await COMPLI_CONTRACT.primaryToken();
    const complementTokenAddress = await COMPLI_CONTRACT.complementToken();

    const COLLATERAL_TOKEN_CONTRACT = new ethers.Contract(collateralTokenAddress, ERC20Json, App.provider);
    console.log("collateralTokenAddress ", collateralTokenAddress);

    const PRIMARY_TOKEN_CONTRACT = new ethers.Contract(primaryTokenAddress, ERC20Json, App.provider);
    console.log("primaryTokenAddress ", primaryTokenAddress);

    const COMPLEMENT_TOKEN_CONTRACT = new ethers.Contract(complementTokenAddress, ERC20Json, App.provider);
    console.log("complementTokenAddress ", complementTokenAddress);

    const primaryAmount = await PRIMARY_TOKEN_CONTRACT.balanceOf(App.YOUR_ADDRESS);
    _print(`primaryAmount: ${primaryAmount}`);

    const complementAmount = await COMPLEMENT_TOKEN_CONTRACT.balanceOf(App.YOUR_ADDRESS);
    _print(`complementAmount: ${complementAmount}`);

    const redeem = async function() {
        return compliVaults_redeem(App, primaryTokenAddress, complementTokenAddress, collateralTokenAddress, vaultAddress, primaryAmount, complementAmount)
      }
    _print_link(`Redeem derivatives`, redeem)
    _print("")
}

const compliVaults_redeem = async function(App, primaryTokenAddress, complementTokenAddress, collateralTokenAddress, vaultAddress, primaryAmount, complementAmount) {
    const signer = App.provider.getSigner();

    const PRIMARY = new ethers.Contract(primaryTokenAddress, ERC20Json, signer);
    const COMPLEMENT = new ethers.Contract(complementTokenAddress, ERC20Json, signer);
    const COLLATERAL = new ethers.Contract(collateralTokenAddress, ERC20Json, signer);
    const VAULT = new ethers.Contract(vaultAddress, VAULT_ABI, signer);

    // await PRIMARY.approve(vaultAddress, ethers.constants.MaxUint256);
    // console.log("PRIMARY token Approved to vault");

    // await COMPLEMENT.approve(vaultAddress, ethers.constants.MaxUint256);
    // console.log("COMPLEMENT token Approved to vault");

    const collateralAmountBefore = await COLLATERAL.balanceOf(App.YOUR_ADDRESS);
    _print(`Collateral amount before: ${collateralAmountBefore}`);

    await VAULT.redeem(primaryAmount, complementAmount, [], {gasLimit: 500000});
    _print("Redeeming derivatives...");

    const collateralAmountAfter = await COLLATERAL.balanceOf(App.YOUR_ADDRESS);
    _print(`Collateral amount after: ${collateralAmountAfter}`);
}