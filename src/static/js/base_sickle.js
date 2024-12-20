
$(function() {
consoleInit(main)
  });

const SWEEP_ABI = [{"inputs":[{"internalType":"contract SickleFactory","name":"factory","type":"address"},{"internalType":"contract NftTransferLib","name":"nftTransferLib_","type":"address"},{"internalType":"contract TransferLib","name":"transferLib_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"InvalidInputLength","type":"error"},{"inputs":[],"name":"NotApproved","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"NotOwner","type":"error"},{"inputs":[],"name":"NotRegisteredSickle","type":"error"},{"inputs":[],"name":"SickleNotDeployed","type":"error"},{"inputs":[],"name":"connectorRegistry","outputs":[{"internalType":"contract ConnectorRegistry","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"contract SickleFactory","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"approved","type":"address"},{"internalType":"bytes32","name":"referralCode","type":"bytes32"}],"name":"getOrDeploySickle","outputs":[{"internalType":"contract Sickle","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"getSickle","outputs":[{"internalType":"contract Sickle","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nftTransferLib","outputs":[{"internalType":"contract NftTransferLib","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC1155[]","name":"tokens","type":"address[]"},{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"sweepErc1155","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC721[]","name":"tokens","type":"address[]"},{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"sweepErc721","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"tokens","type":"address[]"}],"name":"sweepTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"transferLib","outputs":[{"internalType":"contract TransferLib","name":"","type":"address"}],"stateMutability":"view","type":"function"}]
const SWEEP_ADDR = "0x917c50722872672628a456F2ab011554f0198bE4";

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

   const addToken = async function() {
    return add_token(App)
  }

  _print_link(`Add ANZ to sweep tokens`, addToken);

    hideLoading();
  }

  const add_token = async function(App) {
    const signer = App.provider.getSigner();
    const SWEEP = new ethers.Contract(SWEEP_ADDR, SWEEP_ABI, signer);

    const ANZ_TOKEN_ADDR = "0xeeC468333ccc16D4BF1cEf497A56cf8C0aAe4Ca3";

    showLoading()
    SWEEP.sweepTokens([ANZ_TOKEN_ADDR], {gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        
      })
      hideLoading()
  }