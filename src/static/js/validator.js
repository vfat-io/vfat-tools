
$(function() {
consoleInit(main)
  });

async function main() {
    const App = await init_ethers();

    _print("Details of your Validators")
    _print("");

    const _validatorsData = await $.ajax({
      url  : `https://beaconcha.in/api/v1/Validator/eth1/${App.YOUR_ADDRESS}`,
      //dataType: 'jsonp',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      type : 'GET'
    });

    let ownedValidators = [];

    //if there is only one Validator return an object and not an array
    const validatorsData = _validatorsData.data;
    if(validatorsData.Validatorindex){
      const ownedValidator = validatorsData.Validatorindex;
      ownedValidators.push(ownedValidator);
    }else{
      for(const ValidatorData of validatorsData){
        const ownedValidator = ValidatorData.Validatorindex;
        ownedValidators.push(ownedValidator);
      }
    }

    _print("")

    if(ownedValidators.length <= 0){
      _print("You do not own any Validators")
    }else{
      _print(`You owned ${ownedValidators.length} Validators\n`);

      const ValidatorsToString = ownedValidators.toString();
      const validatorsParameter = ValidatorsToString.replaceAll(',', '%2C');

      const validatorsDetails = await $.ajax({
        url  : `https://beaconcha.in/api/v1/Validator/${validatorsParameter}`,
        //dataType: 'jsonp',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        type : `GET`
      });

      const ValidatorsBalanceDetails = await $.ajax({
        url  : `https://beaconcha.in/api/v1/Validator/${validatorsParameter}/balancehistory`,
        //dataType: 'jsonp',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        type : `GET`
      });

      if(validatorsDetails.data.status){
        const balance = ValidatorsBalanceDetails.data[0].balance / 1e9;
        const startingBalance = ValidatorsBalanceDetails.data[0].effectivebalance / 1e9;
        const state = validatorsDetails.data.status == "active_online" ? "Online" : "Offline";
        _print_bold(`Validator : ${validatorsDetails.data.Validatorindex}`);
        _print_bold(`State : ${state}`);
        _print_bold(`Your Staking Balance : ${startingBalance}`);
        _print_bold(`Your Balance : ${balance}`);
      }else{
        for(let i = 0; i < validatorsDetails.data.length; i++){
          const balance = ValidatorsBalanceDetails.data[i].balance / 1e9;
          const startingBalance = ValidatorsBalanceDetails.data[i].effectivebalance / 1e9;
          const state = validatorsDetails.data[i].status == "active_online" ? "Online" : "Offline";
          _print_bold(`Validator : ${validatorsDetails.data[i].Validatorindex}`);
          _print_bold(`State : ${state}`);
          _print_bold(`Your Staking Balance : ${startingBalance}`);
          _print_bold(`Your Balance : ${balance}`);
          _print("-------------------------------");
          _print("");
        }
      }
    }

    _print("");

    //adding a button for searching Validators
    _print("Please add up to 100 Validators separated by a comma");

    let input = document.createElement("input");
    input.setAttribute("id", "chosedValidators"); //with id chosedValidators i can get the values of the input
    input.setAttribute("type", "text");
    document.body.appendChild(input);
    
    let btn = document.createElement("button"); //create the button to the document (page)
    btn.innerHTML = "Search"
    btn.onclick = async function getValidatorsByHand() {
      _print("");
      const chosedValidators = document.getElementById("chosedValidators").value; //getting the value from my input
      const _validatorsParameter = chosedValidators.replaceAll(',', '%2C');
      const validatorsParameter = _validatorsParameter.replaceAll(' ', '');
  
      const validatorsDetails = await $.ajax({
        url  : `https://beaconcha.in/api/v1/Validator/${validatorsParameter}`,
        //dataType: 'jsonp',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        type : `GET`
      });
  
      const ValidatorsBalanceDetails = await $.ajax({
        url  : `https://beaconcha.in/api/v1/Validator/${validatorsParameter}/balancehistory`,
        //dataType: 'jsonp',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        type : `GET`
      });

      if(validatorsDetails.data == null || ValidatorsBalanceDetails.data == null){
        _print(validatorsDetails.status);
      }else{
        if(validatorsDetails.data.status){
          const balance = ValidatorsBalanceDetails.data[0].balance / 1e9;
          const startingBalance = ValidatorsBalanceDetails.data[0].effectivebalance / 1e9;
          const state = validatorsDetails.data.status == "active_online" ? "Online" : "Offline";
          _print_bold(`Validator : ${validatorsDetails.data.Validatorindex}`);
          _print_bold(`State : ${state}`);
          _print_bold(`Your Staking Balance : ${startingBalance}`);
          _print_bold(`Your Balance : ${balance}`);
        }else{
          for(let i = 0; i < validatorsDetails.data.length; i++){
            const balance = ValidatorsBalanceDetails.data[i].balance / 1e9;
            const startingBalance = ValidatorsBalanceDetails.data[i].effectivebalance / 1e9;
            const state = validatorsDetails.data[i].status == "active_online" ? "Online" : "Offline";
            _print_bold(`Validator : ${validatorsDetails.data[i].Validatorindex}`);
            _print_bold(`State : ${state}`);
            _print_bold(`Your Staking Balance : ${startingBalance}`);
            _print_bold(`Your Balance : ${balance}`);
            _print("-------------------------------");
            _print("");
          }
        }
      }
    }
    document.body.appendChild(btn);

    hideLoading();
  }
