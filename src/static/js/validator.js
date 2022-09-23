
$(function() {
consoleInit(main)
  });

async function main() {
    const App = await init_ethers();

    _print("details of your validators")
    _print("");

    const _validatorsData = await $.ajax({
      url  : `https://beaconcha.in/api/v1/validator/eth1/${App.YOUR_ADDRESS}`,
      type : 'GET'
    });

    let ownedValidators = [];

    //if there is only one validator return an object and not an array
    const validatorsData = _validatorsData.data;
    if(validatorsData.validatorindex){
      const ownedValidator = validatorsData.validatorindex;
      ownedValidators.push(ownedValidator);
    }else{
      for(const validatorData of validatorsData){
        const ownedValidator = validatorData.validatorindex;
        ownedValidators.push(ownedValidator);
      }
    }

    _print("")

    if(ownedValidators.length <= 0){
      _print("You do not owned any validators")
    }else{
      _print(`You owned ${ownedValidators.length} validators\n`);

      const validatorsToString = ownedValidators.toString();
      const validatorsParameter = validatorsToString.replaceAll(',', '%2C');

      const validatorsDetails = await $.ajax({
        url  : `https://beaconcha.in/api/v1/validator/${validatorsParameter}`,
        type : `GET`
      });

      const validatorsBalanceDetails = await $.ajax({
        url  : `https://beaconcha.in/api/v1/validator/${validatorsParameter}/balancehistory`,
        type : `GET`
      });

      if(validatorsDetails.data.status){
        const balance = validatorsBalanceDetails.data[0].balance / 1e9;
        const startingBalance = validatorsBalanceDetails.data[0].effectivebalance / 1e9;
        const state = validatorsDetails.data.status == "active_online" ? "Online" : "Offline";
        _print_bold(`Vlidator : ${validatorsDetails.data.validatorindex}`);
        _print_bold(`State : ${state}`);
        _print_bold(`Your Staking Balance : ${startingBalance}`);
        _print_bold(`Your Balance : ${balance}`);
      }else{
        for(let i = 0; i < validatorsDetails.data.length; i++){
          const balance = validatorsBalanceDetails.data[i].balance / 1e9;
          const startingBalance = validatorsBalanceDetails.data[i].effectivebalance / 1e9;
          const state = validatorsDetails.data[i].status == "active_online" ? "Online" : "Offline";
          _print_bold(`Vlidator : ${validatorsDetails.data[i].validatorindex}`);
          _print_bold(`State : ${state}`);
          _print_bold(`Your Staking Balance : ${startingBalance}`);
          _print_bold(`Your Balance : ${balance}`);
          _print("-------------------------------");
          _print("");
        }
      }
    }

    hideLoading();
  }
