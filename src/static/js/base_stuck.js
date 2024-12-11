
$(function() {
    consoleInit(main)
      });
    
    async function main() {
        const App = await init_ethers();
    
        _print(`Initialized ${App.YOUR_ADDRESS}\n`);
        _print("Send 0 ETH to your address in order to cancel a pending transaction.\n");

        const send = async function() {
          return send_eth(App)
        }

        _print_link(`Send 0 ETH to ${App.YOUR_ADDRESS}`, send);
    
        hideLoading();
      }

      const send_eth = async function(App) {
        const signer = App.provider.getSigner();

        const tx = signer.sendTransaction({
          to: App.YOUR_ADDRESS,
          value: ethers.utils.parseUnits('0.0', 'ether'),
          gasPrice: "5000000000"
        });
      }