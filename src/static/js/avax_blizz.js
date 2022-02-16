$(function () {		
    consoleInit(main)		
});		
    		
    		
const BLIZZ_CHEF_ABI = [{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"}]

async function main() {		
    const App = await init_ethers();		
        
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);		
    _print("Reading smart contracts...\n");		
        
    const BLIZZ_CHEF_ADDR = "0xA712248e20019eC71679772B48fFfBD2AcAf8d7D";
    
    const unstake = async function() {
        return blizzContract_unstake(BLIZZ_CHEF_ABI, BLIZZ_CHEF_ADDR, App)
      }
    _print_link(`Wthdraw All`, unstake)
        
    hideLoading();		
}

async function blizzContract_unstake(chefAbi, chefAddress, App) {
    const signer = App.provider.getSigner()
    const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
    showLoading()
      CHEF_CONTRACT.withdrawAll({gasLimit: 500000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
  }