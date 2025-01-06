$(function() {
  consoleInit(main)
  });

const LOCKBOX_ABI = [{"inputs":[{"internalType":"address","name":"_xerc20","type":"address"},{"internalType":"address","name":"_erc20","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"target","type":"address"}],"name":"AddressEmptyCode","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"AddressInsufficientBalance","type":"error"},{"inputs":[],"name":"FailedInnerCall","type":"error"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"SafeERC20FailedOperation","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"ERC20","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"XERC20","outputs":[{"internalType":"contract IXERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const BRIDGE_ABI = [{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_xerc20","type":"address"},{"internalType":"address","name":"_mailbox","type":"address"},{"internalType":"address","name":"_ism","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AlreadyRegistered","type":"error"},{"inputs":[],"name":"InsufficientBalance","type":"error"},{"inputs":[],"name":"InvalidChain","type":"error"},{"inputs":[],"name":"NotBridge","type":"error"},{"inputs":[],"name":"NotMailbox","type":"error"},{"inputs":[],"name":"NotRegistered","type":"error"},{"inputs":[],"name":"NotRoot","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"inputs":[],"name":"ZeroAddress","type":"error"},{"inputs":[],"name":"ZeroAmount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_chainid","type":"uint256"}],"name":"ChainDeregistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_chainid","type":"uint256"}],"name":"ChainRegistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_newHook","type":"address"}],"name":"HookSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_new","type":"address"}],"name":"InterchainSecurityModuleSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint32","name":"_origin","type":"uint32"},{"indexed":true,"internalType":"bytes32","name":"_sender","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"},{"indexed":false,"internalType":"string","name":"_message","type":"string"}],"name":"ReceivedMessage","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint32","name":"_destination","type":"uint32"},{"indexed":true,"internalType":"bytes32","name":"_recipient","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"},{"indexed":false,"internalType":"string","name":"_message","type":"string"},{"indexed":false,"internalType":"string","name":"_metadata","type":"string"}],"name":"SentMessage","type":"event"},{"inputs":[],"name":"GAS_LIMIT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"chainids","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_chainid","type":"uint256"}],"name":"contains","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_chainid","type":"uint256"}],"name":"deregisterChain","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_origin","type":"uint32"},{"internalType":"bytes32","name":"_sender","type":"bytes32"},{"internalType":"bytes","name":"_message","type":"bytes"}],"name":"handle","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"hook","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"interchainSecurityModule","outputs":[{"internalType":"contract IInterchainSecurityModule","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mailbox","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_chainid","type":"uint256"}],"name":"registerChain","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"securityModule","outputs":[{"internalType":"contract IInterchainSecurityModule","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_chainid","type":"uint256"}],"name":"sendToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_hook","type":"address"}],"name":"setHook","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_ism","type":"address"}],"name":"setInterchainSecurityModule","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"xerc20","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]

const LOCKBOX_ADDR = "0x12b64df29590b4f0934070fac96e82e580d60232";
const VELO_ADDR = "0x9560e827aF36c94D2Ac33a39bCE1Fe78631088Db";
const XVELO_ADDR = "0x7f9AdFbd38b669F03d1d11000Bc76b9AaEA28A81";
const BRIDGE_ADDR = "0xA7287a56C01ac8Baaf8e7B662bDB41b10889C7A6";

  async function main() {
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print(`Connected to RPC: ${App.rpcProvider.connection.url}\n`);

    let log = document.getElementById("log");

    const veloBalance = await getVeloBalance(App);
    const xVeloBalance = await getXveloBalance(App);

    const deposit = async function() {
      return velo_deposit(App, veloBalance)
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
    // const deposit_metalL2 = async function() {
    //   return velo_deposit_metalL2(App, veloBalance)
    // }
    const bridge_mode = async function() {
      return xvelo_bridge_mode(App, xVeloBalance)
    }
    const bridge_fraxtal = async function() {
      return xvelo_bridge_fraxtal(App, xVeloBalance)
    }
    const bridge_lisk = async function() {
      return xvelo_bridge_lisk(App, xVeloBalance)
    }
    // const bridge_metalL2 = async function() {
    //   return xvelo_bridge_metalL2(App, xVeloBalance)
    // }

    _print_bold("Bridge your VELO and convert them to XVELO on Mode");
    _print_link(`Deposit ${(veloBalance / 1e18).toFixed(2)} VELO`, deposit);
    _print("");
    _print_bold("Bridge your VELO and convert them to XVELO on Fraxtal");
    _print_link(`Deposit ${(veloBalance / 1e18).toFixed(2)} VELO`, deposit_fraxtal);
    _print("");
    _print_bold("Bridge your VELO and convert them to XVELO on Lisk");
    _print_link(`Deposit ${(veloBalance / 1e18).toFixed(2)} VELO`, deposit_lisk);
    // _print("");
    // _print_bold("Bridge your VELO and convert them to XVELO on Metal-L2");
    // _print_link(`Deposit ${(veloBalance / 1e18).toFixed(2)} VELO`, deposit_metalL2);
    _print("");
    _print("");
    _print_bold("Bridge your XVELO on Mode");
    _print_link(`Bridge ${(xVeloBalance / 1e18).toFixed(2)} XVELO`, bridge_mode);
    _print("");
    _print_bold("Bridge your XVELO on Fraxtal");
    _print_link(`Bridge ${(xVeloBalance / 1e18).toFixed(2)} XVELO`, bridge_fraxtal);
    _print("");
    _print_bold("Bridge your XVELO on Lisk");
    _print_link(`Bridge ${(xVeloBalance / 1e18).toFixed(2)} XVELO`, bridge_lisk);
    // _print("");
    // _print_bold("Bridge your XVELO on Metal-L2");
    // _print_link(`Bridge ${(xVeloBalance / 1e18).toFixed(2)} XVELO`, bridge_metalL2);
    _print("");
    _print("");
    _print_bold("Convert your XVELO to VELO");
    _print_link(`Convert ${(xVeloBalance / 1e18).toFixed(2)} XVELO`, convert);

    hideLoading();
  }

  const xvelo_bridge_mode = async function(App, xVeloBalance){
    showLoading();
  
    const signer = App.provider.getSigner();
  
    const xVeloTokenContract = new ethers.Contract(XVELO_ADDR, ERC20_ABI, signer);
    const bridgeContract = new ethers.Contract(BRIDGE_ADDR, BRIDGE_ABI, signer);
  
    xVeloTokenContract.approve(BRIDGE_ADDR, xVeloBalance).then(function(t){
      showLoading();
      return App.provider.waitForTransaction(t.hash)
    }).catch(function(){
      hideLoading()
      alert('Try resetting your approval to 0 first');
      transactionFailedWithoutErrorMessage2();
    }).then(async function(){
      bridgeContract.sendToken(App.YOUR_ADDRESS, xVeloBalance, 34443, {value: ethers.utils.parseEther("0.001")})
      hideLoading();
      _print_bold(`Available XVELO balance on Mode ${(xVeloBalance / 1e18).toFixed(2)}`);
      _print(`The page will be refreshed in 25 seconds.`);
      transactionFailedWithoutErrorMessage2();
    }).catch(function(e){
      _print(`Error ${e} The page will be refreshed in 25 seconds.`);
      transactionFailedWithoutErrorMessage2();
    })
  }

  const xvelo_bridge_fraxtal = async function(App, xVeloBalance){
    showLoading();
  
    const signer = App.provider.getSigner();
  
    const xVeloTokenContract = new ethers.Contract(XVELO_ADDR, ERC20_ABI, signer);
    const bridgeContract = new ethers.Contract(BRIDGE_ADDR, BRIDGE_ABI, signer);
  
    xVeloTokenContract.approve(BRIDGE_ADDR, xVeloBalance).then(function(t){
      showLoading();
      return App.provider.waitForTransaction(t.hash)
    }).catch(function(){
      hideLoading()
      alert('Try resetting your approval to 0 first');
      transactionFailedWithoutErrorMessage2();
    }).then(async function(){
      bridgeContract.sendToken(App.YOUR_ADDRESS, xVeloBalance, 252, {value: ethers.utils.parseEther("0.001")})
      hideLoading();
      _print_bold(`Available XVELO balance on Fraxtal ${(xVeloBalance / 1e18).toFixed(2)}`);
      _print(`The page will be refreshed in 25 seconds.`);
      transactionFailedWithoutErrorMessage2();
    }).catch(function(e){
      _print(`Error ${e} The page will be refreshed in 25 seconds.`);
      transactionFailedWithoutErrorMessage2();
    })
  }

  const xvelo_bridge_lisk = async function(App, xVeloBalance){
    showLoading();
  
    const signer = App.provider.getSigner();
  
    const xVeloTokenContract = new ethers.Contract(XVELO_ADDR, ERC20_ABI, signer);
    const bridgeContract = new ethers.Contract(BRIDGE_ADDR, BRIDGE_ABI, signer);
  
    xVeloTokenContract.approve(BRIDGE_ADDR, xVeloBalance).then(function(t){
      showLoading();
      return App.provider.waitForTransaction(t.hash)
    }).catch(function(){
      hideLoading()
      alert('Try resetting your approval to 0 first');
      transactionFailedWithoutErrorMessage2();
    }).then(async function(){
      bridgeContract.sendToken(App.YOUR_ADDRESS, xVeloBalance, 1135, {value: ethers.utils.parseEther("0.001")})
      hideLoading();
      _print_bold(`Available XVELO balance on Lisk ${(xVeloBalance / 1e18).toFixed(2)}`);
      _print(`The page will be refreshed in 25 seconds.`);
      transactionFailedWithoutErrorMessage2();
    }).catch(function(e){
      _print(`Error ${e} The page will be refreshed in 25 seconds.`);
      transactionFailedWithoutErrorMessage2();
    })
  }

  const xvelo_bridge_metalL2 = async function(App, xVeloBalance){
    showLoading();
  
    const signer = App.provider.getSigner();
  
    const xVeloTokenContract = new ethers.Contract(XVELO_ADDR, ERC20_ABI, signer);
    const bridgeContract = new ethers.Contract(BRIDGE_ADDR, BRIDGE_ABI, signer);
  
    xVeloTokenContract.approve(BRIDGE_ADDR, xVeloBalance).then(function(t){
      showLoading();
      return App.provider.waitForTransaction(t.hash)
    }).catch(function(){
      hideLoading()
      alert('Try resetting your approval to 0 first');
      transactionFailedWithoutErrorMessage2();
    }).then(async function(){
      bridgeContract.sendToken(App.YOUR_ADDRESS, xVeloBalance, 1750, {value: ethers.utils.parseEther("0.001")})
      hideLoading();
      _print_bold(`Available XVELO balance on Metal-L2 ${(xVeloBalance / 1e18).toFixed(2)}`);
      _print(`The page will be refreshed in 25 seconds.`);
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
  
const velo_deposit = async function (App, veloBalance){
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
              bridgeContract.sendToken(App.YOUR_ADDRESS, xvb, 34443, {value: ethers.utils.parseEther("0.001")})
              hideLoading();
              _print_bold(`Available XVELO balance on Mode ${(xvb / 1e18).toFixed(2)}`);
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

const velo_deposit_fraxtal = async function (App, veloBalance){
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

const velo_deposit_lisk = async function (App, veloBalance){
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

const velo_deposit_metalL2 = async function (App, veloBalance){
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
              bridgeContract.sendToken(App.YOUR_ADDRESS, xvb, 1750, {value: ethers.utils.parseEther("0.001")})
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