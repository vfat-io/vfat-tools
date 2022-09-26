
$(function() {
consoleInit(main)
  });

async function main() {
    const App = await init_ethers();

    _print("Details of your Validators")

    const _validatorsData = await $.ajax({
      url  : `https://beaconcha.in/api/v1/validator/eth1/${App.YOUR_ADDRESS}`,
      type : 'GET'
    });

    let ownedValidators = [];

    //if there is only one Validator return an object and not an array
    const validatorsData = _validatorsData.data;
    if(validatorsData.validatorindex){
      const ownedValidator = validatorsData.validatorindex;
      ownedValidators.push(ownedValidator);
    }else{
      for(const ValidatorData of validatorsData){
        const ownedValidator = ValidatorData.validatorindex;
        ownedValidators.push(ownedValidator);
      }
    }

    _print("")

    if(ownedValidators.length <= 0){
      _print("You do not own any Validators")
    }else{
      _print(`You own ${ownedValidators.length} Validators\n`);

      const ValidatorsToString = ownedValidators.toString();
      const validatorsParameter = ValidatorsToString.replaceAll(',', '%2C');

      const validatorsDetails = await $.ajax({
        url  : `https://beaconcha.in/api/v1/validator/${validatorsParameter}`,
        type : `GET`
      });

      const validatorsBalanceDetails = await $.ajax({
        url  : `https://beaconcha.in/api/v1/validator/${validatorsParameter}/balancehistory`,
        type : `GET`
      });

      const validatorsPerformance = await $.ajax({
        url  : `https://beaconcha.in/api/v1/validator/${validatorsParameter}/performance`,
        type : `GET`
      });

      if(validatorsDetails.data.status){
        const balance = validatorsBalanceDetails.data[0].balance / 1e9;
        const startingBalance = validatorsBalanceDetails.data[0].effectivebalance / 1e9;
        const state = validatorsDetails.data.status;
        const day = validatorsPerformance.data.performance1d / 1e9;
        const month = validatorsPerformance.data.performance31d / 1e9;
        const year = validatorsPerformance.data.performance365d / 1e9;
        const yesterdayBalance = balance - day;
        const oneMonthBeforeBalance = balance - month;
        const oneYearBeforeBalance = balance - year;
        const dailyAPR = day / yesterdayBalance * 100;
        const monthlyAPR = month / oneMonthBeforeBalance * 100;
        const yearlyAPR = year / oneYearBeforeBalance * 100;
        _print_bold(`Validator : ${validatorsDetails.data.validatorindex}`);
        _print(`State : ${state}`);
        _print(`Your Staking Balance : ${startingBalance}`);
        _print(`Your Balance : ${balance}`);
        _print(`Performance: 1 Day ${day} ETH (${dailyAPR.toFixed(4)}%)`);
        _print(`Performance: 1 Month ${month} ETH (${monthlyAPR.toFixed(4)}%)`);
        _print(`Performance: 1 Year ${year} ETH (${yearlyAPR.toFixed(4)}%)`);
      }else{
        for(let i = 0; i < validatorsDetails.data.length; i++){
          const balance = validatorsBalanceDetails.data[i].balance / 1e9;
          const startingBalance = validatorsBalanceDetails.data[i].effectivebalance / 1e9;
          const state = validatorsDetails.data[i].status;
          const day = validatorsPerformance.data[i].performance1d / 1e9;
          const month = validatorsPerformance.data[i].performance31d / 1e9;
          const year = validatorsPerformance.data[i].performance365d / 1e9;
          const yesterdayBalance = balance - day;
          const oneMonthBeforeBalance = balance - month;
          const oneYearBeforeBalance = balance - year;
          const dailyAPR = day / yesterdayBalance * 100;
          const monthlyAPR = month / oneMonthBeforeBalance * 100;
          const yearlyAPR = year / oneYearBeforeBalance * 100;
          _print_bold(`Validator : ${validatorsDetails.data[i].validatorindex}`);
          _print(`State : ${state}`);
          _print(`Your Staking Balance : ${startingBalance}`);
          _print(`Your Balance : ${balance}`);
          _print(`Performance: 1 Day ${day} ETH (${dailyAPR.toFixed(4)}%)`);
          _print(`Performance: 1 Month ${month} ETH (${monthlyAPR.toFixed(4)}%)`);
          _print(`Performance: 1 Year ${year} ETH (${yearlyAPR.toFixed(4)}%)`);
          _print("-------------------------------");
          _print("");
        }
      }
    }

    _print("");

    //adding a button for searching Validators
    _print("Please add up to 100 Validators separated by a comma.");

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
        url  : `https://beaconcha.in/api/v1/validator/${validatorsParameter}`,
        type : `GET`
      });
  
      const validatorsBalanceDetails = await $.ajax({
        url  : `https://beaconcha.in/api/v1/validator/${validatorsParameter}/balancehistory`,
        type : `GET`
      });

      const validatorsPerformance = await $.ajax({
        url  : `https://beaconcha.in/api/v1/validator/${validatorsParameter}/performance`,
        type : `GET`
      });

      if(validatorsDetails.data == null || validatorsBalanceDetails.data == null){
        _print(validatorsDetails.status);
      }else{
        if(validatorsDetails.data.status){
          const balance = validatorsBalanceDetails.data[0].balance / 1e9;
          const startingBalance = validatorsBalanceDetails.data[0].effectivebalance / 1e9;
          const state = validatorsDetails.data.status;
          const day = validatorsPerformance.data.performance1d / 1e9;
          const month = validatorsPerformance.data.performance31d / 1e9;
          const year = validatorsPerformance.data.performance365d / 1e9;
          const yesterdayBalance = balance - day;
          const oneMonthBeforeBalance = balance - month;
          const oneYearBeforeBalance = balance - year;
          const dailyAPR = day / yesterdayBalance * 100;
          const monthlyAPR = month / oneMonthBeforeBalance * 100;
          const yearlyAPR = year / oneYearBeforeBalance * 100;
          _print_bold(`Validator : ${validatorsDetails.data.validatorindex}`);
          _print(`State : ${state}`);
          _print(`Your Staking Balance : ${startingBalance}`);
          _print(`Your Balance : ${balance}`);
          _print(`Performance: 1 Day ${day} ETH (${dailyAPR.toFixed(4)}%)`);
          _print(`Performance: 1 Month ${month} ETH (${monthlyAPR.toFixed(4)}%)`);
          _print(`Performance: 1 Year ${year} ETH (${yearlyAPR.toFixed(4)}%)`);
        }else{
          for(let i = 0; i < validatorsDetails.data.length; i++){
            const balance = validatorsBalanceDetails.data[i].balance / 1e9;
            const startingBalance = validatorsBalanceDetails.data[i].effectivebalance / 1e9;
            const state = validatorsDetails.data[i].status;
            const day = validatorsPerformance.data[i].performance1d / 1e9;
            const month = validatorsPerformance.data[i].performance31d / 1e9;
            const year = validatorsPerformance.data[i].performance365d / 1e9;
            const yesterdayBalance = balance - day;
            const oneMonthBeforeBalance = balance - month;
            const oneYearBeforeBalance = balance - year;
            const dailyAPR = day / yesterdayBalance * 100;
            const monthlyAPR = month / oneMonthBeforeBalance * 100;
            const yearlyAPR = year / oneYearBeforeBalance * 100;
            _print_bold(`Validator : ${validatorsDetails.data[i].validatorindex}`);
            _print(`State : ${state}`);
            _print(`Your Staking Balance : ${startingBalance}`);
            _print(`Your Balance : ${balance}`);
            _print(`Performance: 1 Day ${day} ETH (${dailyAPR.toFixed(4)}%)`);
            _print(`Performance: 1 Month ${month} ETH (${monthlyAPR.toFixed(4)}%)`);
            _print(`Performance: 1 Year ${year} ETH (${yearlyAPR.toFixed(4)}%)`);
            _print("-------------------------------");
            _print("");
          }
        }
      }
    }
    document.body.appendChild(btn);

    hideLoading();
  }
