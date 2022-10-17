$(function() {
  consoleToolsInit(main)
  });

async function main() {
    const App = await init_ethers();

    let connectedNetwork = await App.provider.getNetwork();
    let connectedNetworkName = networkNameFromId(connectedNetwork.chainId);

    _print_bold("Please add the LP address that you want to break")

    let log = document.getElementById("log");

    let lptAddressInput = document.createElement("input");
    lptAddressInput.setAttribute("id", "lptAddress");
    lptAddressInput.setAttribute("type", "text");
    lptAddressInput.setAttribute("size", "45");
    log.appendChild(lptAddressInput);

    let lptAddressBtn = document.createElement("button")
    lptAddressBtn.innerHTML = "Search";
    lptAddressBtn.setAttribute("id", "lptAddressClick")
    log.appendChild(lptAddressBtn);
    document.getElementById("lptAddressClick").addEventListener("click", async function() {
      showLoading()
      const signer = App.provider.getSigner();
      const lp_token_address = document.getElementById("lptAddress").value;

      const lp_contract = new ethcall.Contract(lp_token_address, GENERAL_V2_LP_TOKEN_ABI);
      let calls;
      try{
        calls = [lp_contract.factory(), lp_contract.token0(), lp_contract.token1(),
          lp_contract.balanceOf(App.YOUR_ADDRESS), lp_contract.getReserves(),
          lp_contract.totalSupply()]
        const [factory, tokenA, tokenB, _liquidity, reserves, _totalSupply] = await App.ethcallProvider.all(calls);
        const router = LpFactories.find(f => f.factoryAddress.toLowerCase() === factory.toLowerCase());
        const router_contract = new ethers.Contract(router.routerAddress, router.abi, signer);
        const lpToken = await getToken(App, lp_token_address, App.YOUR_ADDRESS);
        const token0 = await getToken(App, tokenA, App.YOUR_ADDRESS);
        const token1 = await getToken(App, tokenB, App.YOUR_ADDRESS);
        const q0 = reserves._reserve0 / 10 ** token0.decimals;
        const q1 = reserves._reserve1 / 10 ** token1.decimals;
        const liquidity = _liquidity / 10 ** lpToken.decimals;
        const totalSupply = _totalSupply / 10 ** lpToken.decimals;
        const userPct = liquidity / totalSupply;
        const q0user = userPct * q0;
        const q1user = userPct * q1;
        _print("");
        _print(`\nLP Token Address : ${lp_token_address} (${router.name}) => Token 0 Address : ${tokenA} (${token0.symbol}) - Token 1 Address : ${tokenB} (${token1.symbol})`);
        _print("");
        if(liquidity < 0.01){
          _print("Your balance is < 0.01");
        }else{
          _print(`Your LP token balance is : ${liquidity}`);
        }
        _print("");
        _print(`Your LP tokens comprise of ${q0user.toFixed(4)} ${token0.symbol} + ${q1user.toFixed(4)} ${token1.symbol}\n`);
        _print("------------------------------------------------------------------------------------------------------------");
        _print("");
        hideLoading()

        const addressToGo = App.YOUR_ADDRESS;
        const amountAMin = 0;
        const amountBMin = 0;
        const currentTime = Date.now() / 1000;
        const _deadline = currentTime + 1000;
        const deadline = Math.round(_deadline);
        let breakButton = document.createElement("button");
        breakButton.innerHTML = "Break";
        breakButton.onclick = async function() {
          showLoading()
          router_contract.removeLiquidity(tokenA, tokenB, _liquidity, amountAMin, amountBMin, addressToGo, deadline, {gasLimit: 500000})
            .then(function(t) {
              return App.provider.waitForTransaction(t.hash)
                .then(t => refresh(t))
                .catch(err => transactionFailed(err));
            })
            .catch(function(ex) {
              console.log(ex);
              hideLoading()
              transactionFailed(ex);
            })
        }
        log.appendChild(breakButton);
      }catch(err){
        console.log(err);
        _print("");
        _print(`\nCannot find this token. Please check your connected netwrok and try again.`);
        _print(`The page will be refreshed in 15 seconds.`);
        transactionFailedWithoutErrorMessage();
      }
    })

    hideLoading();
  }