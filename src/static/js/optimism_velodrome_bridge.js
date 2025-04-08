$(function() {
  consoleInit(main)
  });

const LOCKBOX_ABI = [{"inputs":[{"internalType":"address","name":"_xerc20","type":"address"},{"internalType":"address","name":"_erc20","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"target","type":"address"}],"name":"AddressEmptyCode","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"AddressInsufficientBalance","type":"error"},{"inputs":[],"name":"FailedInnerCall","type":"error"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"SafeERC20FailedOperation","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"ERC20","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"XERC20","outputs":[{"internalType":"contract IXERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const BRIDGE_ABI = [{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_xerc20","type":"address"},{"internalType":"address","name":"_mailbox","type":"address"},{"internalType":"address","name":"_ism","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AlreadyRegistered","type":"error"},{"inputs":[],"name":"InsufficientBalance","type":"error"},{"inputs":[],"name":"InvalidChain","type":"error"},{"inputs":[],"name":"InvalidCommand","type":"error"},{"inputs":[],"name":"NotBridge","type":"error"},{"inputs":[],"name":"NotMailbox","type":"error"},{"inputs":[],"name":"NotRegistered","type":"error"},{"inputs":[],"name":"NotRoot","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"inputs":[],"name":"ZeroAddress","type":"error"},{"inputs":[],"name":"ZeroAmount","type":"error"},{"inputs":[],"name":"ZeroTokenId","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_chainid","type":"uint256"}],"name":"ChainDeregistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_chainid","type":"uint256"}],"name":"ChainRegistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_newHook","type":"address"}],"name":"HookSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_new","type":"address"}],"name":"InterchainSecurityModuleSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint32","name":"_origin","type":"uint32"},{"indexed":true,"internalType":"bytes32","name":"_sender","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"},{"indexed":false,"internalType":"string","name":"_message","type":"string"}],"name":"ReceivedMessage","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint32","name":"_destination","type":"uint32"},{"indexed":true,"internalType":"bytes32","name":"_recipient","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"},{"indexed":false,"internalType":"string","name":"_message","type":"string"},{"indexed":false,"internalType":"string","name":"_metadata","type":"string"}],"name":"SentMessage","type":"event"},{"inputs":[],"name":"GAS_LIMIT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"GAS_LIMIT_LOCK","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"ROOT_CHAINID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"chainids","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_chainid","type":"uint256"}],"name":"contains","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_chainid","type":"uint256"}],"name":"deregisterChain","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_origin","type":"uint32"},{"internalType":"bytes32","name":"_sender","type":"bytes32"},{"internalType":"bytes","name":"_message","type":"bytes"}],"name":"handle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"hook","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"interchainSecurityModule","outputs":[{"internalType":"contract IInterchainSecurityModule","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mailbox","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_chainid","type":"uint256"}],"name":"registerChain","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"securityModule","outputs":[{"internalType":"contract IInterchainSecurityModule","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_chainid","type":"uint256"}],"name":"sendToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"sendTokenAndLock","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_hook","type":"address"}],"name":"setHook","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_ism","type":"address"}],"name":"setInterchainSecurityModule","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"xerc20","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]

const MAILBOX_ABI = [{"inputs":[{"internalType":"uint32","name":"_localDomain","type":"uint32"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"hook","type":"address"}],"name":"DefaultHookSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"module","type":"address"}],"name":"DefaultIsmSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"uint32","name":"destination","type":"uint32"},{"indexed":true,"internalType":"bytes32","name":"recipient","type":"bytes32"},{"indexed":false,"internalType":"bytes","name":"message","type":"bytes"}],"name":"Dispatch","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"messageId","type":"bytes32"}],"name":"DispatchId","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint32","name":"origin","type":"uint32"},{"indexed":true,"internalType":"bytes32","name":"sender","type":"bytes32"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"}],"name":"Process","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"messageId","type":"bytes32"}],"name":"ProcessId","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"hook","type":"address"}],"name":"RequiredHookSet","type":"event"},{"inputs":[],"name":"VERSION","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"defaultHook","outputs":[{"internalType":"contract IPostDispatchHook","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"defaultIsm","outputs":[{"internalType":"contract IInterchainSecurityModule","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_id","type":"bytes32"}],"name":"delivered","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deployedBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"destinationDomain","type":"uint32"},{"internalType":"bytes32","name":"recipientAddress","type":"bytes32"},{"internalType":"bytes","name":"messageBody","type":"bytes"},{"internalType":"bytes","name":"metadata","type":"bytes"},{"internalType":"contract IPostDispatchHook","name":"hook","type":"address"}],"name":"dispatch","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint32","name":"destinationDomain","type":"uint32"},{"internalType":"bytes32","name":"recipientAddress","type":"bytes32"},{"internalType":"bytes","name":"messageBody","type":"bytes"},{"internalType":"bytes","name":"hookMetadata","type":"bytes"}],"name":"dispatch","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_destinationDomain","type":"uint32"},{"internalType":"bytes32","name":"_recipientAddress","type":"bytes32"},{"internalType":"bytes","name":"_messageBody","type":"bytes"}],"name":"dispatch","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_defaultIsm","type":"address"},{"internalType":"address","name":"_defaultHook","type":"address"},{"internalType":"address","name":"_requiredHook","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"latestDispatchedId","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"localDomain","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nonce","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"_metadata","type":"bytes"},{"internalType":"bytes","name":"_message","type":"bytes"}],"name":"process","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_id","type":"bytes32"}],"name":"processedAt","outputs":[{"internalType":"uint48","name":"","type":"uint48"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_id","type":"bytes32"}],"name":"processor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"destinationDomain","type":"uint32"},{"internalType":"bytes32","name":"recipientAddress","type":"bytes32"},{"internalType":"bytes","name":"messageBody","type":"bytes"},{"internalType":"bytes","name":"metadata","type":"bytes"},{"internalType":"contract IPostDispatchHook","name":"hook","type":"address"}],"name":"quoteDispatch","outputs":[{"internalType":"uint256","name":"fee","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"destinationDomain","type":"uint32"},{"internalType":"bytes32","name":"recipientAddress","type":"bytes32"},{"internalType":"bytes","name":"messageBody","type":"bytes"}],"name":"setDefaultHook","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_module","type":"address"}],"name":"setDefaultIsm","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_hook","type":"address"}],"name":"setRequiredHook","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const LOCKBOX_ADDR = "0x12b64df29590b4f0934070fac96e82e580d60232";
const VELO_ADDR = "0x9560e827aF36c94D2Ac33a39bCE1Fe78631088Db";
const XVELO_ADDR = "0x7f9AdFbd38b669F03d1d11000Bc76b9AaEA28A81";
const BRIDGE_ADDR = "0x1A9d17828897d6289C6dff9DC9F5cc3bAEa17814";
const MAILBOX_ADDR = "0xd4C1905BB1D26BC93DAC913e13CaCC278CdCC80D";  // you could take it from BRIDGE contract

  async function main() {
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print(`Connected to RPC: ${App.rpcProvider.connection.url}\n`);

    let log = document.getElementById("log");

    const veloBalance = await getVeloBalance(App);
    const xVeloBalance = await getXveloBalance(App);

    const deposit_mode = async function() {
      return velo_deposit_mode(App, veloBalance)
    }
    const convertVelo = async function() {
      return velo_convert(App, veloBalance)
    }
    const convert = async function() {
      return xvelo_convert(App, xVeloBalance)
    }
    const deposit_fraxtal = async function() {
      return velo_deposit_fraxtal(App, veloBalance)
    }
    const deposit_lisk = async function() {
      return velo_deposit_lisk(App, veloBalance)
    }
    const deposit_ink = async function() {
      return velo_deposit_ink(App, veloBalance)
    }
    const deposit_soneium = async function() {
      return velo_deposit_soneium(App, veloBalance)
    }
    const deposit_metalL2 = async function() {
      return velo_deposit_metalL2(App, veloBalance)
    }
    const deposit_swell = async function() {
      return velo_deposit_swell(App, veloBalance)
    }

    _print_bold("Bridge your VELO on Mode");
    _print_link(`Deposit ${(veloBalance / 1e18).toFixed(2)} VELO`, deposit_mode);
    _print("");
    _print_bold("Bridge your VELO on Fraxtal");
    _print_link(`Deposit ${(veloBalance / 1e18).toFixed(2)} VELO`, deposit_fraxtal);
    _print("");
    _print_bold("Bridge your VELO on Lisk");
    _print_link(`Deposit ${(veloBalance / 1e18).toFixed(2)} VELO`, deposit_lisk);
    _print("");
    _print_bold("Bridge your VELO on Ink");
    _print_link(`Deposit ${(veloBalance / 1e18).toFixed(2)} VELO`, deposit_ink);
    _print("");
    _print_bold("Bridge your VELO on Soneium");
    _print_link(`Deposit ${(veloBalance / 1e18).toFixed(2)} VELO`, deposit_soneium);
    _print("");
    _print_bold("Bridge your VELO on Metal-L2");
    _print_link(`Deposit ${(veloBalance / 1e18).toFixed(2)} VELO`, deposit_metalL2);
    _print("");
    _print_bold("Bridge your VELO on Swell");
    _print_link(`Deposit ${(veloBalance / 1e18).toFixed(2)} VELO`, deposit_swell);
    _print("");
    _print("");
    _print_bold("Convert your VELO to XVELO");
    _print_link(`Convert ${(veloBalance / 1e18).toFixed(2)} VELO`, convertVelo);
    _print("");
    _print_bold("Convert your XVELO to VELO");
    _print_link(`Convert ${(xVeloBalance / 1e18).toFixed(2)} XVELO`, convert);

    hideLoading();
  }

  const velo_convert = async function(App, veloBalance){
    showLoading();
  
    const signer = App.provider.getSigner();
  
    const veloTokenContract = new ethers.Contract(VELO_ADDR, ERC20_ABI, signer);
    const lockboxContract = new ethers.Contract(LOCKBOX_ADDR, LOCKBOX_ABI, signer);
  
    veloTokenContract.approve(LOCKBOX_ADDR, veloBalance).then(function(t){
      showLoading();
      return App.provider.waitForTransaction(t.hash)
    }).catch(function() {
      hideLoading()
      alert('Try resetting your approval to 0 first');
      transactionFailedWithoutErrorMessage2();
    }).then(async function() {
      lockboxContract.deposit(veloBalance)
      hideLoading();
      _print(`Complete, the page will be refreshed in 25 seconds.`);
      transactionFailedWithoutErrorMessage2();
    }).catch(function(e){
      _print(`Error ${e} The page will be refreshed in 25 seconds.`);
      transactionFailedWithoutErrorMessage2();
    })
  }

  const xvelo_convert = async function(App, xVeloBalance){
    showLoading();
  
    const signer = App.provider.getSigner();
  
    const xVeloTokenContract = new ethers.Contract(XVELO_ADDR, ERC20_ABI, signer);
    const lockboxContract = new ethers.Contract(LOCKBOX_ADDR, LOCKBOX_ABI, signer);
  
    xVeloTokenContract.approve(LOCKBOX_ADDR, xVeloBalance).then(function(t){
      showLoading();
      return App.provider.waitForTransaction(t.hash)
    }).catch(function() {
      hideLoading()
      alert('Try resetting your approval to 0 first');
      transactionFailedWithoutErrorMessage2();
    }).then(async function() {
      lockboxContract.withdraw(xVeloBalance)
      hideLoading();
      _print(`Complete, the page will be refreshed in 25 seconds.`);
      transactionFailedWithoutErrorMessage2();
    }).catch(function(e){
      _print(`Error ${e} The page will be refreshed in 25 seconds.`);
      transactionFailedWithoutErrorMessage2();
    })
  }
  
const velo_deposit_mode = async function (App, veloBalance){
  const signer = App.provider.getSigner();

  const veloTokenContract = new ethers.Contract(VELO_ADDR, ERC20_ABI, signer);
  const bridgeContract = new ethers.Contract(BRIDGE_ADDR, BRIDGE_ABI, signer);

  veloTokenContract.approve(BRIDGE_ADDR, veloBalance).then(function(t) {
    showLoading();
    return App.provider.waitForTransaction(t.hash)
  }).catch(function() {
    hideLoading()
    alert('Try resetting your approval to 0 first');
    transactionFailedWithoutErrorMessage();
  }).then(async function(){
    veloTokenContract.allowance(App.YOUR_ADDRESS, BRIDGE_ADDR).then(async function(vb){
    bridgeContract.sendToken(App.YOUR_ADDRESS, vb, 34443, {value: ethers.utils.parseEther("0.001")})
    hideLoading();
    _print(`The page will be refreshed in 15 seconds.`);
    transactionFailedWithoutErrorMessage();
  }).catch(function(e){
    _print(`Error ${e} The page will be refreshed in 15 seconds.`);
    transactionFailedWithoutErrorMessage();
    })
  }).catch(function(e){
    _print(`Error ${e} The page will be refreshed in 15 seconds.`);
    transactionFailedWithoutErrorMessage();
  })
}

const velo_deposit_fraxtal = async function (App, veloBalance){ //252
  showLoading();

  const signer = App.provider.getSigner();

  const veloTokenContract = new ethers.Contract(VELO_ADDR, ERC20_ABI, signer);
  const xVeloTokenContract = new ethers.Contract(XVELO_ADDR, ERC20_ABI, signer);
  const lockboxContract = new ethers.Contract(LOCKBOX_ADDR, LOCKBOX_ABI, signer);
  const bridgeContract = new ethers.Contract(BRIDGE_ADDR, BRIDGE_ABI, signer);


  veloTokenContract.approve(LOCKBOX_ADDR, veloBalance).then(function(t) {
    showLoading();
    return App.provider.waitForTransaction(t.hash)
  }).catch(function() {
    hideLoading()
    alert('Try resetting your approval to 0 first');
    transactionFailedWithoutErrorMessage2();
  }).then(async function() {
    lockboxContract.deposit(veloBalance).then(function(t){
      App.provider.waitForTransaction(t.hash).then(async function (){
      }).catch(function(e){
        _print(`Error ${e} The page will be refreshed in 25 seconds.`);
        transactionFailedWithoutErrorMessage2();
      }).then(async function(){
        xVeloTokenContract.balanceOf(App.YOUR_ADDRESS).then(async function(xvb){
          xVeloTokenContract.approve(BRIDGE_ADDR, xvb).then(async function(){
            xVeloTokenContract.allowance(App.YOUR_ADDRESS, BRIDGE_ADDR).then(async function(xvb){
              bridgeContract.sendToken(App.YOUR_ADDRESS, xvb, 252, {value: ethers.utils.parseEther("0.001")})
              hideLoading();
              _print_bold(`Available XVELO balance on Fraxtal ${(xvb / 1e18).toFixed(2)}`);
              _print(`The page will be refreshed in 25 seconds.`);
              transactionFailedWithoutErrorMessage2();
            }).catch(function(e){
              _print(`Error ${e} The page will be refreshed in 25 seconds.`);
              transactionFailedWithoutErrorMessage2();
            })
          }).catch(function(e){
            _print(`Error ${e} The page will be refreshed in 25 seconds.`);
            transactionFailedWithoutErrorMessage2();
          })
        }).catch(function(e){
          _print(`Error ${e} The page will be refreshed in 25 seconds.`);
          transactionFailedWithoutErrorMessage2();
        })
      }).catch(function(e){
        _print(`Error ${e} The page will be refreshed in 25 seconds.`);
        transactionFailedWithoutErrorMessage2();
      })
    }).catch(function(e){
      _print(`Error ${e} The page will be refreshed in 25 seconds.`);
      transactionFailedWithoutErrorMessage2();
    })
  }).catch(function(e){
    _print(`Error ${e} The page will be refreshed in 25 seconds.`);
    transactionFailedWithoutErrorMessage2();
  })
}

const velo_deposit_lisk = async function (App, veloBalance){ // 1135
  showLoading();

  const signer = App.provider.getSigner();

  const veloTokenContract = new ethers.Contract(VELO_ADDR, ERC20_ABI, signer);
  const xVeloTokenContract = new ethers.Contract(XVELO_ADDR, ERC20_ABI, signer);
  const lockboxContract = new ethers.Contract(LOCKBOX_ADDR, LOCKBOX_ABI, signer);
  const bridgeContract = new ethers.Contract(BRIDGE_ADDR, BRIDGE_ABI, signer);

  // const mailboxContract = new ethers.Contract(MAILBOX_ADDR, MAILBOX_ABI, signer);

  // const fee = await mailboxContract.quoteDispatch(1135, App.YOUR_ADDRESS, "");

  veloTokenContract.approve(LOCKBOX_ADDR, veloBalance).then(function(t) {
    showLoading();
    return App.provider.waitForTransaction(t.hash)
  }).catch(function() {
    hideLoading()
    alert('Try resetting your approval to 0 first');
    transactionFailedWithoutErrorMessage2();
  }).then(async function() {
    lockboxContract.deposit(veloBalance).then(function(t){
      App.provider.waitForTransaction(t.hash).then(async function (){
      }).catch(function(e){
        _print(`Error ${e} The page will be refreshed in 25 seconds.`);
        transactionFailedWithoutErrorMessage2();
      }).then(async function(){
        xVeloTokenContract.balanceOf(App.YOUR_ADDRESS).then(async function(xvb){
          xVeloTokenContract.approve(BRIDGE_ADDR, xvb).then(async function(){
            xVeloTokenContract.allowance(App.YOUR_ADDRESS, BRIDGE_ADDR).then(async function(xvb){
              bridgeContract.sendToken(App.YOUR_ADDRESS, xvb, 1135, {value: ethers.utils.parseEther("0.001")})
              hideLoading();
              _print_bold(`Available XVELO balance on Lisk ${(xvb / 1e18).toFixed(2)}`);
              _print(`The page will be refreshed in 25 seconds.`);
              transactionFailedWithoutErrorMessage2();
            }).catch(function(e){
              _print(`Error ${e} The page will be refreshed in 25 seconds.`);
              transactionFailedWithoutErrorMessage2();
            })
          }).catch(function(e){
            _print(`Error ${e} The page will be refreshed in 25 seconds.`);
            transactionFailedWithoutErrorMessage2();
          })
        }).catch(function(e){
          _print(`Error ${e} The page will be refreshed in 25 seconds.`);
          transactionFailedWithoutErrorMessage2();
        })
      }).catch(function(e){
        _print(`Error ${e} The page will be refreshed in 25 seconds.`);
        transactionFailedWithoutErrorMessage2();
      })
    }).catch(function(e){
      _print(`Error ${e} The page will be refreshed in 25 seconds.`);
      transactionFailedWithoutErrorMessage2();
    })
  }).catch(function(e){
    _print(`Error ${e} The page will be refreshed in 25 seconds.`);
    transactionFailedWithoutErrorMessage2();
  })
}

const velo_deposit_metalL2 = async function (App, veloBalance){ // 1750 ? 1000001750
  showLoading();

  const signer = App.provider.getSigner();

  const veloTokenContract = new ethers.Contract(VELO_ADDR, ERC20_ABI, signer);
  const xVeloTokenContract = new ethers.Contract(XVELO_ADDR, ERC20_ABI, signer);
  const lockboxContract = new ethers.Contract(LOCKBOX_ADDR, LOCKBOX_ABI, signer);
  const bridgeContract = new ethers.Contract(BRIDGE_ADDR, BRIDGE_ABI, signer);

  // const mailboxContract = new ethers.Contract(MAILBOX_ADDR, MAILBOX_ABI, signer);

  // const fee = await mailboxContract.quoteDispatch(1750, App.YOUR_ADDRESS, "");  // 1000001750???

  veloTokenContract.approve(LOCKBOX_ADDR, veloBalance).then(function(t) {
    showLoading();
    return App.provider.waitForTransaction(t.hash)
  }).catch(function() {
    hideLoading()
    alert('Try resetting your approval to 0 first');
    transactionFailedWithoutErrorMessage2();
  }).then(async function() {
    lockboxContract.deposit(veloBalance).then(function(t){
      App.provider.waitForTransaction(t.hash).then(async function (){
      }).catch(function(e){
        _print(`Error ${e} The page will be refreshed in 25 seconds.`);
        transactionFailedWithoutErrorMessage2();
      }).then(async function(){
        xVeloTokenContract.balanceOf(App.YOUR_ADDRESS).then(async function(xvb){
          xVeloTokenContract.approve(BRIDGE_ADDR, xvb).then(async function(){
            xVeloTokenContract.allowance(App.YOUR_ADDRESS, BRIDGE_ADDR).then(async function(xvb){
              bridgeContract.sendToken(App.YOUR_ADDRESS, xvb, 1750, {value: ethers.utils.parseEther("0.001")})  // 1000001750???
              hideLoading();
              _print_bold(`Available XVELO balance on Metal-L2 ${(xvb / 1e18).toFixed(2)}`);
              _print(`The page will be refreshed in 25 seconds.`);
              transactionFailedWithoutErrorMessage2();
            }).catch(function(e){
              _print(`Error ${e} The page will be refreshed in 25 seconds.`);
              transactionFailedWithoutErrorMessage2();
            })
          }).catch(function(e){
            _print(`Error ${e} The page will be refreshed in 25 seconds.`);
            transactionFailedWithoutErrorMessage2();
          })
        }).catch(function(e){
          _print(`Error ${e} The page will be refreshed in 25 seconds.`);
          transactionFailedWithoutErrorMessage2();
        })
      }).catch(function(e){
        _print(`Error ${e} The page will be refreshed in 25 seconds.`);
        transactionFailedWithoutErrorMessage2();
      })
    }).catch(function(e){
      _print(`Error ${e} The page will be refreshed in 25 seconds.`);
      transactionFailedWithoutErrorMessage2();
    })
  }).catch(function(e){
    _print(`Error ${e} The page will be refreshed in 25 seconds.`);
    transactionFailedWithoutErrorMessage2();
  })
}

const velo_deposit_ink = async function (App, veloBalance){ // 57073
  showLoading();

  const signer = App.provider.getSigner();

  const veloTokenContract = new ethers.Contract(VELO_ADDR, ERC20_ABI, signer);
  const xVeloTokenContract = new ethers.Contract(XVELO_ADDR, ERC20_ABI, signer);
  const lockboxContract = new ethers.Contract(LOCKBOX_ADDR, LOCKBOX_ABI, signer);
  const bridgeContract = new ethers.Contract(BRIDGE_ADDR, BRIDGE_ABI, signer);

  // const mailboxContract = new ethers.Contract(MAILBOX_ADDR, MAILBOX_ABI, signer);

  // const fee = await mailboxContract.quoteDispatch(57073, App.YOUR_ADDRESS, "");

  veloTokenContract.approve(LOCKBOX_ADDR, veloBalance).then(function(t) {
    showLoading();
    return App.provider.waitForTransaction(t.hash)
  }).catch(function() {
    hideLoading()
    alert('Try resetting your approval to 0 first');
    transactionFailedWithoutErrorMessage2();
  }).then(async function() {
    lockboxContract.deposit(veloBalance).then(function(t){
      App.provider.waitForTransaction(t.hash).then(async function (){
      }).catch(function(e){
        _print(`Error ${e} The page will be refreshed in 25 seconds.`);
        transactionFailedWithoutErrorMessage2();
      }).then(async function(){
        xVeloTokenContract.balanceOf(App.YOUR_ADDRESS).then(async function(xvb){
          xVeloTokenContract.approve(BRIDGE_ADDR, xvb).then(async function(){
            xVeloTokenContract.allowance(App.YOUR_ADDRESS, BRIDGE_ADDR).then(async function(xvb){
              bridgeContract.sendToken(App.YOUR_ADDRESS, xvb, 57073, {value: ethers.utils.parseEther("0.001")})
              hideLoading();
              _print_bold(`Available XVELO balance on Ink ${(xvb / 1e18).toFixed(2)}`);
              _print(`The page will be refreshed in 25 seconds.`);
              transactionFailedWithoutErrorMessage2();
            }).catch(function(e){
              _print(`Error ${e} The page will be refreshed in 25 seconds.`);
              transactionFailedWithoutErrorMessage2();
            })
          }).catch(function(e){
            _print(`Error ${e} The page will be refreshed in 25 seconds.`);
            transactionFailedWithoutErrorMessage2();
          })
        }).catch(function(e){
          _print(`Error ${e} The page will be refreshed in 25 seconds.`);
          transactionFailedWithoutErrorMessage2();
        })
      }).catch(function(e){
        _print(`Error ${e} The page will be refreshed in 25 seconds.`);
        transactionFailedWithoutErrorMessage2();
      })
    }).catch(function(e){
      _print(`Error ${e} The page will be refreshed in 25 seconds.`);
      transactionFailedWithoutErrorMessage2();
    })
  }).catch(function(e){
    _print(`Error ${e} The page will be refreshed in 25 seconds.`);
    transactionFailedWithoutErrorMessage2();
  })
}

const velo_deposit_soneium = async function (App, veloBalance){ // 1868
  showLoading();

  const signer = App.provider.getSigner();

  const veloTokenContract = new ethers.Contract(VELO_ADDR, ERC20_ABI, signer);
  const xVeloTokenContract = new ethers.Contract(XVELO_ADDR, ERC20_ABI, signer);
  const lockboxContract = new ethers.Contract(LOCKBOX_ADDR, LOCKBOX_ABI, signer);
  const bridgeContract = new ethers.Contract(BRIDGE_ADDR, BRIDGE_ABI, signer);

  // const mailboxContract = new ethers.Contract(MAILBOX_ADDR, MAILBOX_ABI, signer);

  // const fee = await mailboxContract.quoteDispatch(1868, App.YOUR_ADDRESS, "");

  veloTokenContract.approve(LOCKBOX_ADDR, veloBalance).then(function(t) {
    showLoading();
    return App.provider.waitForTransaction(t.hash)
  }).catch(function() {
    hideLoading()
    alert('Try resetting your approval to 0 first');
    transactionFailedWithoutErrorMessage2();
  }).then(async function() {
    lockboxContract.deposit(veloBalance).then(function(t){
      App.provider.waitForTransaction(t.hash).then(async function (){
      }).catch(function(e){
        _print(`Error ${e} The page will be refreshed in 25 seconds.`);
        transactionFailedWithoutErrorMessage2();
      }).then(async function(){
        xVeloTokenContract.balanceOf(App.YOUR_ADDRESS).then(async function(xvb){
          xVeloTokenContract.approve(BRIDGE_ADDR, xvb).then(async function(){
            xVeloTokenContract.allowance(App.YOUR_ADDRESS, BRIDGE_ADDR).then(async function(xvb){
              bridgeContract.sendToken(App.YOUR_ADDRESS, xvb, 1868, {value: ethers.utils.parseEther("0.001")})
              hideLoading();
              _print_bold(`Available XVELO balance on Soneium ${(xvb / 1e18).toFixed(2)}`);
              _print(`The page will be refreshed in 25 seconds.`);
              transactionFailedWithoutErrorMessage2();
            }).catch(function(e){
              _print(`Error ${e} The page will be refreshed in 25 seconds.`);
              transactionFailedWithoutErrorMessage2();
            })
          }).catch(function(e){
            _print(`Error ${e} The page will be refreshed in 25 seconds.`);
            transactionFailedWithoutErrorMessage2();
          })
        }).catch(function(e){
          _print(`Error ${e} The page will be refreshed in 25 seconds.`);
          transactionFailedWithoutErrorMessage2();
        })
      }).catch(function(e){
        _print(`Error ${e} The page will be refreshed in 25 seconds.`);
        transactionFailedWithoutErrorMessage2();
      })
    }).catch(function(e){
      _print(`Error ${e} The page will be refreshed in 25 seconds.`);
      transactionFailedWithoutErrorMessage2();
    })
  }).catch(function(e){
    _print(`Error ${e} The page will be refreshed in 25 seconds.`);
    transactionFailedWithoutErrorMessage2();
  })
}

const velo_deposit_swell = async function (App, veloBalance){ // 1923
  showLoading();

  const signer = App.provider.getSigner();

  const veloTokenContract = new ethers.Contract(VELO_ADDR, ERC20_ABI, signer);
  const xVeloTokenContract = new ethers.Contract(XVELO_ADDR, ERC20_ABI, signer);
  const lockboxContract = new ethers.Contract(LOCKBOX_ADDR, LOCKBOX_ABI, signer);
  const bridgeContract = new ethers.Contract(BRIDGE_ADDR, BRIDGE_ABI, signer);

  // const mailboxContract = new ethers.Contract(MAILBOX_ADDR, MAILBOX_ABI, signer);

  // const fee = await mailboxContract.quoteDispatch(1923, App.YOUR_ADDRESS, "");

  veloTokenContract.approve(LOCKBOX_ADDR, veloBalance).then(function(t) {
    showLoading();
    return App.provider.waitForTransaction(t.hash)
  }).catch(function() {
    hideLoading()
    alert('Try resetting your approval to 0 first');
    transactionFailedWithoutErrorMessage2();
  }).then(async function() {
    lockboxContract.deposit(veloBalance).then(function(t){
      App.provider.waitForTransaction(t.hash).then(async function (){
      }).catch(function(e){
        _print(`Error ${e} The page will be refreshed in 25 seconds.`);
        transactionFailedWithoutErrorMessage2();
      }).then(async function(){
        xVeloTokenContract.balanceOf(App.YOUR_ADDRESS).then(async function(xvb){
          xVeloTokenContract.approve(BRIDGE_ADDR, xvb).then(async function(){
            xVeloTokenContract.allowance(App.YOUR_ADDRESS, BRIDGE_ADDR).then(async function(xvb){
              bridgeContract.sendToken(App.YOUR_ADDRESS, xvb, 1923, {value: ethers.utils.parseEther("0.001")})
              hideLoading();
              _print_bold(`Available XVELO balance on Swell ${(xvb / 1e18).toFixed(2)}`);
              _print(`The page will be refreshed in 25 seconds.`);
              transactionFailedWithoutErrorMessage2();
            }).catch(function(e){
              _print(`Error ${e} The page will be refreshed in 25 seconds.`);
              transactionFailedWithoutErrorMessage2();
            })
          }).catch(function(e){
            _print(`Error ${e} The page will be refreshed in 25 seconds.`);
            transactionFailedWithoutErrorMessage2();
          })
        }).catch(function(e){
          _print(`Error ${e} The page will be refreshed in 25 seconds.`);
          transactionFailedWithoutErrorMessage2();
        })
      }).catch(function(e){
        _print(`Error ${e} The page will be refreshed in 25 seconds.`);
        transactionFailedWithoutErrorMessage2();
      })
    }).catch(function(e){
      _print(`Error ${e} The page will be refreshed in 25 seconds.`);
      transactionFailedWithoutErrorMessage2();
    })
  }).catch(function(e){
    _print(`Error ${e} The page will be refreshed in 25 seconds.`);
    transactionFailedWithoutErrorMessage2();
  })
}

async function getVeloBalance(App){
  const veloTokenAddress = "0x9560e827aF36c94D2Ac33a39bCE1Fe78631088Db";
  const veloTokenContract = new ethers.Contract(veloTokenAddress, ERC20_ABI, App.provider);

  const balance = await veloTokenContract.balanceOf(App.YOUR_ADDRESS);

  return balance;
}

async function getXveloBalance(App){
  const xVeloTokenAddress = "0x7f9AdFbd38b669F03d1d11000Bc76b9AaEA28A81";
  const xVeloTokenContract = new ethers.Contract(xVeloTokenAddress, ERC20_ABI, App.provider);

  const balance = await xVeloTokenContract.balanceOf(App.YOUR_ADDRESS);

  return balance;
}