
$(function() {
consoleInit(main)
  });

const FIRE_AIRDROP_ABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"enum AirdropSignal.PreferredChain","name":"chain","type":"uint8"},{"indexed":false,"internalType":"string","name":"referralENS","type":"string"}],"name":"ClaimSet","type":"event"},{"inputs":[{"internalType":"enum AirdropSignal.PreferredChain","name":"chain","type":"uint8"},{"internalType":"string","name":"friendENS","type":"string"}],"name":"claimOn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"claimrs","outputs":[{"internalType":"enum AirdropSignal.PreferredChain","name":"chain","type":"uint8"},{"internalType":"string","name":"referralENS","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"enum AirdropSignal.PreferredChain","name":"chain","type":"uint8"}],"name":"setChain","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"friendENS","type":"string"}],"name":"setReferralENS","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
    _print("No given time for claiming your airdrop, it will be random\n");

    let eligible = false;
    function reqListener() {
      const resp = this.responseText;
      const _data = resp.split();
      const data = _data[0].split('\n');
      eligible = data.includes(App.YOUR_ADDRESS);
      console.log(eligible);
    }

    const req = new XMLHttpRequest();
    req.addEventListener("load", reqListener);
    req.open("GET", "https://raw.githubusercontent.com/ltj866/airdrop-0/main/addresses", false);
    req.send();

    const FIRE_AIRDROP_ADDR = "0xC53de7B2248fc2CB3ee0AA1C2FE6EBb80A78c6b8";
    const FIRE_AIRDROP = new ethers.Contract(FIRE_AIRDROP_ADDR, FIRE_AIRDROP_ABI, App.provider);
    const rewardTokenTicker = "FIRE";

    const userData = await FIRE_AIRDROP.claimrs(App.YOUR_ADDRESS);

    if(eligible || userData.chain > 0){

      let log = document.getElementById("log");

      if(userData.chain != 0){
        const chosenNetwork = userData.chain == 1 ? "Arbitrum" : "Optimism";
        _print(`Your chosen network is ${chosenNetwork}\n`);
        _print(`Your referral address is ${userData.referralENS}\n`);

        let node1 = document.createTextNode("You can change your network from here. 1 for Arbitrum, 2 for Optimism ");
        let node2 = document.createTextNode("You can change your referral from here ");
        let br1 = document.createElement("br");
        let br2 = document.createElement("br");
        let br3 = document.createElement("br");
        let chainInput = document.createElement("input");
        chainInput.setAttribute("id", "chainInput");
        let refInput = document.createElement("input");
        refInput.setAttribute("id", "refInput");

        log.appendChild(node1);
        log.appendChild(chainInput);
        log.appendChild(br1);
        const changeChain = async function() {
          return airdropContract_changeChain(FIRE_AIRDROP_ADDR, App)
        }
        _print_link(`Change your chain`, changeChain);

        log.appendChild(br2);

        log.appendChild(node2);
        log.appendChild(refInput);
        log.appendChild(br3);
        const changeRef = async function() {
          return airdropContract_changeRef(FIRE_AIRDROP_ADDR, App)
        }
        _print_link(`Change your referral address`, changeRef);
      }else{
        const node1 = document.createTextNode("Please add 1 to claim your airdrop on Arbitrum or 2 to claim your airdrop on Optimism ");
        log.appendChild(node1);
        let chainInput = document.createElement("input");
        chainInput.setAttribute("id", "chainInput");
        log.appendChild(chainInput);

        const br = document.createElement("br");
        const br2 = document.createElement("br");

        log.appendChild(br2);
        const node2 = document.createTextNode("Add a referral address or ENS. E.g. vfat.eth ");
        log.appendChild(node2);
        let refInput = document.createElement("input");
        refInput.setAttribute("id", "refInput");
        log.appendChild(refInput);

        log.appendChild(br);

        const claim = async function() {
          return airdropContract_claim(FIRE_AIRDROP_ADDR, App)
        }

        _print_link(`Claim ${rewardTokenTicker}`, claim)
      }
    }else{
      _print("You are not eligible, but you can still claim in case you get referred by an eligible address.");
    }

    hideLoading();
  }

const airdropContract_changeChain = async function(airdropAddr, App){
  let _chainIdInput = document.getElementById("chainInput").value;
  const chainIdInput = parseInt(_chainIdInput);

  const signer = App.provider.getSigner();
  const REWARD_POOL = new ethers.Contract(airdropAddr, FIRE_AIRDROP_ABI, signer);

  if(chainIdInput > 2 || chainIdInput <= 0){
    _print("Invalid chain input. Please type 1 for Arbitrum or 2 for Optimism");
  }else{
    showLoading()
    REWARD_POOL.setChain(chainIdInput)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const airdropContract_changeRef = async function(airdropAddr, App) {
  let referalInput = document.getElementById("refInput");

  const signer = App.provider.getSigner();

  const REWARD_POOL = new ethers.Contract(airdropAddr, FIRE_AIRDROP_ABI, signer);

  showLoading()
  REWARD_POOL.setReferralENS(referalInput)
    .then(function(t) {
      return App.provider.waitForTransaction(t.hash)
    })
    .catch(function() {
      hideLoading()
    })
}

const airdropContract_claim = async function(airdropAddr, App) {

  let _chainIdInput = document.getElementById("chainInput").value;
  const chainIdInput = parseInt(_chainIdInput);
  let referalInput = document.getElementById("refInput").value;

  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(airdropAddr, FIRE_AIRDROP_ABI, signer)

  console.log(App.YOUR_ADDRESS)

  if(chainIdInput > 2 || chainIdInput <= 0){
    _print("Invalid chain input. Please type 1 for Arbitrum or 2 for Optimism");
  }else{
    showLoading()
    REWARD_POOL.claimOn(chainIdInput, referalInput)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}