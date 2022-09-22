
$(function() {
consoleInit(main)
  });

async function main() {
    const App = await init_ethers();

    _print("details of your validators")
    _print("");

    const _ownedValidators = await $.ajax({
      url  : `https://beaconcha.in/api/v1/validator/eth1/${App.YOUR_ADDRESS}`,
      type : 'GET'
    });

    //const ownedValidators = _ownedValidators.data;
    const ownedValidators = ["128460", "128461", "128462", "128463"];

    _print("")

    //_print(validatorsData);

    if(ownedValidators.length <= 0){
      _print("You do not owned any validators")
    }else{
      _print(`You owned ${ownedValidators.length} validators\n`);

      const validatorsToString = ownedValidators.toString();
      const validatorsParameter = validatorsToString.replaceAll(',', '%2C');

      const validatorsData = await $.ajax({
        url  : `https://beaconcha.in/api/v1/validator/${validatorsParameter}`,
        type : `GET`
      });

      for(const validator of validatorsData.data){
        const state = validator.status == "active_online" ? "Online" : "Offline";
        _print(`Vlidator : ${validator.validatorindex}, State : ${state}`);
        _print("");
      }
    }

    hideLoading();
  }
