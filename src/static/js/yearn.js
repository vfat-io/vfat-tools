
$(function() {
  consoleInit(main)
  });

const YEARN_VAULT_ABI = [{"name":"Transfer","inputs":[{"name":"sender","type":"address","indexed":true},{"name":"receiver","type":"address","indexed":true},{"name":"value","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"Approval","inputs":[{"name":"owner","type":"address","indexed":true},{"name":"spender","type":"address","indexed":true},{"name":"value","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"StrategyAdded","inputs":[{"name":"strategy","type":"address","indexed":true},{"name":"debtRatio","type":"uint256","indexed":false},{"name":"minDebtPerHarvest","type":"uint256","indexed":false},{"name":"maxDebtPerHarvest","type":"uint256","indexed":false},{"name":"performanceFee","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"StrategyReported","inputs":[{"name":"strategy","type":"address","indexed":true},{"name":"gain","type":"uint256","indexed":false},{"name":"loss","type":"uint256","indexed":false},{"name":"debtPaid","type":"uint256","indexed":false},{"name":"totalGain","type":"uint256","indexed":false},{"name":"totalLoss","type":"uint256","indexed":false},{"name":"totalDebt","type":"uint256","indexed":false},{"name":"debtAdded","type":"uint256","indexed":false},{"name":"debtRatio","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateGovernance","inputs":[{"name":"governance","type":"address","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateManagement","inputs":[{"name":"management","type":"address","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateRewards","inputs":[{"name":"rewards","type":"address","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateDepositLimit","inputs":[{"name":"depositLimit","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdatePerformanceFee","inputs":[{"name":"performanceFee","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateManagementFee","inputs":[{"name":"managementFee","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateGuardian","inputs":[{"name":"guardian","type":"address","indexed":false}],"anonymous":false,"type":"event"},{"name":"EmergencyShutdown","inputs":[{"name":"active","type":"bool","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateWithdrawalQueue","inputs":[{"name":"queue","type":"address[20]","indexed":false}],"anonymous":false,"type":"event"},{"name":"StrategyUpdateDebtRatio","inputs":[{"name":"strategy","type":"address","indexed":true},{"name":"debtRatio","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"StrategyUpdateMinDebtPerHarvest","inputs":[{"name":"strategy","type":"address","indexed":true},{"name":"minDebtPerHarvest","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"StrategyUpdateMaxDebtPerHarvest","inputs":[{"name":"strategy","type":"address","indexed":true},{"name":"maxDebtPerHarvest","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"StrategyUpdatePerformanceFee","inputs":[{"name":"strategy","type":"address","indexed":true},{"name":"performanceFee","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"StrategyMigrated","inputs":[{"name":"oldVersion","type":"address","indexed":true},{"name":"newVersion","type":"address","indexed":true}],"anonymous":false,"type":"event"},{"name":"StrategyRevoked","inputs":[{"name":"strategy","type":"address","indexed":true}],"anonymous":false,"type":"event"},{"name":"StrategyRemovedFromQueue","inputs":[{"name":"strategy","type":"address","indexed":true}],"anonymous":false,"type":"event"},{"name":"StrategyAddedToQueue","inputs":[{"name":"strategy","type":"address","indexed":true}],"anonymous":false,"type":"event"},{"stateMutability":"nonpayable","type":"function","name":"initialize","inputs":[{"name":"token","type":"address"},{"name":"governance","type":"address"},{"name":"rewards","type":"address"},{"name":"nameOverride","type":"string"},{"name":"symbolOverride","type":"string"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"initialize","inputs":[{"name":"token","type":"address"},{"name":"governance","type":"address"},{"name":"rewards","type":"address"},{"name":"nameOverride","type":"string"},{"name":"symbolOverride","type":"string"},{"name":"guardian","type":"address"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"initialize","inputs":[{"name":"token","type":"address"},{"name":"governance","type":"address"},{"name":"rewards","type":"address"},{"name":"nameOverride","type":"string"},{"name":"symbolOverride","type":"string"},{"name":"guardian","type":"address"},{"name":"management","type":"address"}],"outputs":[]},{"stateMutability":"pure","type":"function","name":"apiVersion","inputs":[],"outputs":[{"name":"","type":"string"}],"gas":5946},{"stateMutability":"nonpayable","type":"function","name":"setName","inputs":[{"name":"name","type":"string"}],"outputs":[],"gas":108344},{"stateMutability":"nonpayable","type":"function","name":"setSymbol","inputs":[{"name":"symbol","type":"string"}],"outputs":[],"gas":73194},{"stateMutability":"nonpayable","type":"function","name":"setGovernance","inputs":[{"name":"governance","type":"address"}],"outputs":[],"gas":37665},{"stateMutability":"nonpayable","type":"function","name":"acceptGovernance","inputs":[],"outputs":[],"gas":38937},{"stateMutability":"nonpayable","type":"function","name":"setManagement","inputs":[{"name":"management","type":"address"}],"outputs":[],"gas":39075},{"stateMutability":"nonpayable","type":"function","name":"setRewards","inputs":[{"name":"rewards","type":"address"}],"outputs":[],"gas":39626},{"stateMutability":"nonpayable","type":"function","name":"setLockedProfitDegradation","inputs":[{"name":"degradation","type":"uint256"}],"outputs":[],"gas":37789},{"stateMutability":"nonpayable","type":"function","name":"setDepositLimit","inputs":[{"name":"limit","type":"uint256"}],"outputs":[],"gas":39065},{"stateMutability":"nonpayable","type":"function","name":"setPerformanceFee","inputs":[{"name":"fee","type":"uint256"}],"outputs":[],"gas":39199},{"stateMutability":"nonpayable","type":"function","name":"setManagementFee","inputs":[{"name":"fee","type":"uint256"}],"outputs":[],"gas":39229},{"stateMutability":"nonpayable","type":"function","name":"setGuardian","inputs":[{"name":"guardian","type":"address"}],"outputs":[],"gas":41773},{"stateMutability":"nonpayable","type":"function","name":"setEmergencyShutdown","inputs":[{"name":"active","type":"bool"}],"outputs":[],"gas":41844},{"stateMutability":"nonpayable","type":"function","name":"setWithdrawalQueue","inputs":[{"name":"queue","type":"address[20]"}],"outputs":[],"gas":1090134},{"stateMutability":"nonpayable","type":"function","name":"transfer","inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":79308},{"stateMutability":"nonpayable","type":"function","name":"transferFrom","inputs":[{"name":"sender","type":"address"},{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":121671},{"stateMutability":"nonpayable","type":"function","name":"approve","inputs":[{"name":"spender","type":"address"},{"name":"amount","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":38241},{"stateMutability":"nonpayable","type":"function","name":"increaseAllowance","inputs":[{"name":"spender","type":"address"},{"name":"amount","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":42882},{"stateMutability":"nonpayable","type":"function","name":"decreaseAllowance","inputs":[{"name":"spender","type":"address"},{"name":"amount","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":42906},{"stateMutability":"nonpayable","type":"function","name":"permit","inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"},{"name":"amount","type":"uint256"},{"name":"expiry","type":"uint256"},{"name":"signature","type":"bytes"}],"outputs":[{"name":"","type":"bool"}],"gas":91494},{"stateMutability":"view","type":"function","name":"totalAssets","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":8698},{"stateMutability":"nonpayable","type":"function","name":"deposit","inputs":[],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"nonpayable","type":"function","name":"deposit","inputs":[{"name":"_amount","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"nonpayable","type":"function","name":"deposit","inputs":[{"name":"_amount","type":"uint256"},{"name":"recipient","type":"address"}],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"view","type":"function","name":"maxAvailableShares","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":1576655},{"stateMutability":"nonpayable","type":"function","name":"withdraw","inputs":[],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"nonpayable","type":"function","name":"withdraw","inputs":[{"name":"maxShares","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"nonpayable","type":"function","name":"withdraw","inputs":[{"name":"maxShares","type":"uint256"},{"name":"recipient","type":"address"}],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"nonpayable","type":"function","name":"withdraw","inputs":[{"name":"maxShares","type":"uint256"},{"name":"recipient","type":"address"},{"name":"maxLoss","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"view","type":"function","name":"pricePerShare","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":77734},{"stateMutability":"nonpayable","type":"function","name":"addStrategy","inputs":[{"name":"strategy","type":"address"},{"name":"debtRatio","type":"uint256"},{"name":"minDebtPerHarvest","type":"uint256"},{"name":"maxDebtPerHarvest","type":"uint256"},{"name":"performanceFee","type":"uint256"}],"outputs":[],"gas":1523989},{"stateMutability":"nonpayable","type":"function","name":"updateStrategyDebtRatio","inputs":[{"name":"strategy","type":"address"},{"name":"debtRatio","type":"uint256"}],"outputs":[],"gas":124263},{"stateMutability":"nonpayable","type":"function","name":"updateStrategyMinDebtPerHarvest","inputs":[{"name":"strategy","type":"address"},{"name":"minDebtPerHarvest","type":"uint256"}],"outputs":[],"gas":47611},{"stateMutability":"nonpayable","type":"function","name":"updateStrategyMaxDebtPerHarvest","inputs":[{"name":"strategy","type":"address"},{"name":"maxDebtPerHarvest","type":"uint256"}],"outputs":[],"gas":47641},{"stateMutability":"nonpayable","type":"function","name":"updateStrategyPerformanceFee","inputs":[{"name":"strategy","type":"address"},{"name":"performanceFee","type":"uint256"}],"outputs":[],"gas":42854},{"stateMutability":"nonpayable","type":"function","name":"migrateStrategy","inputs":[{"name":"oldVersion","type":"address"},{"name":"newVersion","type":"address"}],"outputs":[],"gas":1190208},{"stateMutability":"nonpayable","type":"function","name":"revokeStrategy","inputs":[],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"revokeStrategy","inputs":[{"name":"strategy","type":"address"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"addStrategyToQueue","inputs":[{"name":"strategy","type":"address"}],"outputs":[],"gas":1255644},{"stateMutability":"nonpayable","type":"function","name":"removeStrategyFromQueue","inputs":[{"name":"strategy","type":"address"}],"outputs":[],"gas":23636673},{"stateMutability":"view","type":"function","name":"debtOutstanding","inputs":[],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"view","type":"function","name":"debtOutstanding","inputs":[{"name":"strategy","type":"address"}],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"view","type":"function","name":"creditAvailable","inputs":[],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"view","type":"function","name":"creditAvailable","inputs":[{"name":"strategy","type":"address"}],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"view","type":"function","name":"availableDepositLimit","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":21381},{"stateMutability":"view","type":"function","name":"expectedReturn","inputs":[],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"view","type":"function","name":"expectedReturn","inputs":[{"name":"strategy","type":"address"}],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"nonpayable","type":"function","name":"report","inputs":[{"name":"gain","type":"uint256"},{"name":"loss","type":"uint256"},{"name":"_debtPayment","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":1239256},{"stateMutability":"nonpayable","type":"function","name":"sweep","inputs":[{"name":"token","type":"address"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"sweep","inputs":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"}],"outputs":[]},{"stateMutability":"view","type":"function","name":"name","inputs":[],"outputs":[{"name":"","type":"string"}],"gas":13920},{"stateMutability":"view","type":"function","name":"symbol","inputs":[],"outputs":[{"name":"","type":"string"}],"gas":11673},{"stateMutability":"view","type":"function","name":"decimals","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":3678},{"stateMutability":"view","type":"function","name":"balanceOf","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3923},{"stateMutability":"view","type":"function","name":"allowance","inputs":[{"name":"arg0","type":"address"},{"name":"arg1","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":4168},{"stateMutability":"view","type":"function","name":"totalSupply","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":3768},{"stateMutability":"view","type":"function","name":"token","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3798},{"stateMutability":"view","type":"function","name":"governance","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3828},{"stateMutability":"view","type":"function","name":"management","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3858},{"stateMutability":"view","type":"function","name":"guardian","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3888},{"stateMutability":"view","type":"function","name":"strategies","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"performanceFee","type":"uint256"},{"name":"activation","type":"uint256"},{"name":"debtRatio","type":"uint256"},{"name":"minDebtPerHarvest","type":"uint256"},{"name":"maxDebtPerHarvest","type":"uint256"},{"name":"lastReport","type":"uint256"},{"name":"totalDebt","type":"uint256"},{"name":"totalGain","type":"uint256"},{"name":"totalLoss","type":"uint256"}],"gas":22641},{"stateMutability":"view","type":"function","name":"withdrawalQueue","inputs":[{"name":"arg0","type":"uint256"}],"outputs":[{"name":"","type":"address"}],"gas":4057},{"stateMutability":"view","type":"function","name":"emergencyShutdown","inputs":[],"outputs":[{"name":"","type":"bool"}],"gas":3978},{"stateMutability":"view","type":"function","name":"depositLimit","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":4008},{"stateMutability":"view","type":"function","name":"debtRatio","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":4038},{"stateMutability":"view","type":"function","name":"totalDebt","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":4068},{"stateMutability":"view","type":"function","name":"lastReport","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":4098},{"stateMutability":"view","type":"function","name":"activation","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":4128},{"stateMutability":"view","type":"function","name":"lockedProfit","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":4158},{"stateMutability":"view","type":"function","name":"lockedProfitDegradation","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":4188},{"stateMutability":"view","type":"function","name":"rewards","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":4218},{"stateMutability":"view","type":"function","name":"managementFee","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":4248},{"stateMutability":"view","type":"function","name":"performanceFee","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":4278},{"stateMutability":"view","type":"function","name":"nonces","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":4523},{"stateMutability":"view","type":"function","name":"DOMAIN_SEPARATOR","inputs":[],"outputs":[{"name":"","type":"bytes32"}],"gas":4338}]

const Addresses = [{
  symbol: "YFI",
  token: "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e",
  vaultFrom: "0xBA2E7Fed597fd0E3e70f5130BcDbbFE06bB94fe1",
  vaultTo: "0xE14d13d8B3b85aF791b2AADD661cDBd5E6097Db1",
  apyTooltip: "Please migrate funds to our new vault to continue earning yield.",
  migrationMessage: "This vault is no longer active. Withdraw funds or migrate your balance to the v2 YFI yVault to continue earning yield."
}, {
  symbol: "crvSBTC",
  token: "0x075b1bb99792c9E1041bA13afEf80C91a1e70fB3",
  vaultFrom: "0x7Ff566E1d69DEfF32a7b244aE7276b9f90e9D0f6",
  vaultTo: "0x8414Db07a7F743dEbaFb402070AB01a4E0d2E45e",
  apyTooltip: "Please migrate funds to our new vault to continue earning boosted yield.",
  migrationMessage: "This vault is no longer boosted, but is still earning yield. Withdraw funds or migrate your balance to the v2 Curve sBTC Pool yVault to continue earning boosted yield."
}, {
  symbol: "crvRENBTC",
  token: "0x49849C98ae39Fff122806C06791Fa73784FB3675",
  vaultFrom: "0x5334e150B938dd2b6bd040D9c4a03Cff0cED3765",
  vaultTo: "0x7047F90229a057C13BF847C0744D646CFb6c9E1A",
  apyTooltip: "Please migrate funds to our new vault to continue earning boosted yield.",
  migrationMessage: "This vault is no longer boosted, but is still earning yield. Withdraw funds or migrate your balance to the v2 Curve renBTC Pool yVault to continue earning boosted yield."
}, {
  symbol: "crvHBTC",
  token: "0xb19059ebb43466C323583928285a49f558E572Fd",
  vaultFrom: "0x46AFc2dfBd1ea0c0760CAD8262A5838e803A37e5",
  vaultTo: "0x625b7DF2fa8aBe21B0A976736CDa4775523aeD1E",
  apyTooltip: "Please migrate funds to our new vault to continue earning boosted yield.",
  migrationMessage: "This vault is no longer boosted, but is still earning yield. Migrate your balance to the v2 Curve HBTC Pool yVault to continue earning boosted yield."
}, {
  symbol: "WETH",
  token: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  vaultFrom: "0xe1237aA7f535b0CC33Fd973D66cBf830354D16c7",
  vaultTo: "0xa258C4606Ca8206D8aA700cE2143D7db854D168c",
  apyTooltip: "Please migrate funds to our new vault to continue earning yield.",
  migrationMessage: "This vault is no longer active. Withdraw funds or migrate your balance to the v2 WETH yVault to continue earning yield."
}, {
  symbol: "crvSAAVE",
  token: "0x02d341CcB60fAaf662bC0554d13778015d1b285C",
  vaultFrom: "0xBacB69571323575C6a5A3b4F9EEde1DC7D31FBc1",
  vaultTo: "0xb4D1Be44BfF40ad6e506edf43156577a3f8672eC",
  apyTooltip: "Please migrate funds to our new vault to continue earning boosted yield.",
  migrationMessage: "This vault is no longer boosted, but is still earning yield. Withdraw funds or migrate your balance to the v2 Curve sAave Pool yVault to continue earning boosted yield."
}, {
  symbol: "crvOBTC",
  token: "0x2fE94ea3d5d4a175184081439753DE15AeF9d614",
  vaultFrom: "0x7F83935EcFe4729c4Ea592Ab2bC1A32588409797",
  vaultTo: "0xe9Dc63083c464d6EDcCFf23444fF3CFc6886f6FB",
  apyTooltip: "Please migrate funds to our new vault to continue earning boosted yield.",
  migrationMessage: "This vault is no longer boosted, but is still earning yield. Withdraw funds or migrate your balance to the v2 Curve oBTC Pool yVault to continue earning boosted yield."
}, {
  symbol: "crvTBTC",
  token: "0x64eda51d3Ad40D56b9dFc5554E06F94e1Dd786Fd",
  vaultFrom: "0x07FB4756f67bD46B748b16119E802F1f880fb2CC",
  vaultTo: "0x23D3D0f1c697247d5e0a9efB37d8b0ED0C464f7f",
  apyTooltip: "Please migrate funds to our new vault to continue earning yield.",
  migrationMessage: "This vault is no longer boosted, but is still earning yield. Withdraw funds or migrate your balance to the v2 Curve tBTC Pool yVault to continue earning boosted yield."
}, {
  symbol: "crvBBTC",
  token: "0x410e3E86ef427e30B9235497143881f717d93c2A",
  vaultFrom: "0xA8B1Cb4ed612ee179BDeA16CCa6Ba596321AE52D",
  vaultTo: "0x8fA3A9ecd9EFb07A8CE90A6eb014CF3c0E3B32Ef",
  apyTooltip: "Please migrate funds to our new vault to continue earning boosted yield.",
  migrationMessage: "This vault is no longer boosted, but is still earning yield. Withdraw funds or migrate your balance to the v2 Curve BBTC Pool yVault to continue earning boosted yield."
}, {
  symbol: "crvPBTC",
  token: "0xDE5331AC4B3630f94853Ff322B66407e0D6331E8",
  vaultFrom: "0x123964EbE096A920dae00Fb795FFBfA0c9Ff4675",
  vaultTo: "0x3c5DF3077BcF800640B5DAE8c91106575a4826E6",
  apyTooltip: "Please migrate funds to our new vault to continue earning yield.",
  migrationMessage: "This vault is no longer boosted, but is still earning yield. Withdraw funds or migrate your balance to the v2 Curve pBTC Pool yVault to continue earning boosted yield."
}, {
  symbol: "WBTC",
  token: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
  vaultFrom: "0xcB550A6D4C8e3517A939BC79d0c7093eb7cF56B5",
  vaultTo: "0xA696a63cc78DfFa1a63E9E50587C197387FF6C7E",
  apyTooltip: "Please migrate funds to our new vault to continue earning yield.",
  migrationMessage: "This vault is no longer active. Withdraw funds or migrate your balance to the new v2 WBTC yVault to continue earning yield."
}, {
  symbol: "ETH",
  token: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  vaultFrom: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  vaultTo: "0xa9fE4601811213c340e850ea305481afF02f5b28",
  apyTooltip: "Please migrate funds to our new vault to continue earning yield.",
  migrationMessage: "This vault is no longer active. Withdraw funds or migrate your balance to the new v2 ETH yVault to continue earning yield."
}, {
  symbol: "crvYBUSD",
  token: "0x3B3Ac5386837Dc563660FB6a0937DFAa5924333B",
  vaultFrom: "0x2994529C0652D127b7842094103715ec5299bBed",
  vaultTo: "0x8ee57c05741aA9DB947A744E713C15d4d19D8822",
  apyTooltip: "Please migrate funds to our new vault to continue earning boosted yield.",
  migrationMessage: "This vault is no longer boosted, but is still earning yield. Withdraw funds or migrate your balance to the new v2 Curve yBUSD Pool yVault to continue earning boosted yield."
}, {
  symbol: "crvCOMP",
  token: "0x845838DF265Dcd2c412A1Dc9e959c7d08537f8a2",
  vaultFrom: "0x629c759D1E83eFbF63d84eb3868B564d9521C129",
  vaultTo: "0xD6Ea40597Be05c201845c0bFd2e96A60bACde267",
  apyTooltip: "Please migrate funds to our new vault to continue earning boosted yield.",
  migrationMessage: "This vault is no longer boosted, but is still earning yield. Withdraw funds or migrate your balance to the new v2 Curve Compound Pool yVault to continue earning boosted yield."
}, {
  symbol: "crvGUSD",
  token: "0xD2967f45c4f384DEEa880F807Be904762a3DeA07",
  vaultFrom: "0xcC7E70A958917cCe67B4B87a8C30E6297451aE98",
  vaultTo: "0x2a38B9B0201Ca39B17B460eD2f11e4929559071E",
  apyTooltip: "Please migrate funds to our new vault to continue earning boosted yield.",
  migrationMessage: "This vault is no longer boosted, but is still earning yield. Withdraw funds or migrate your balance to the new v2 Curve GUSD Pool yVault to continue earning boosted yield."
}, {
  symbol: "yCRV",
  token: "0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8",
  vaultFrom: "0x5dbcF33D8c2E976c6b560249878e6F1491Bca25c",
  vaultTo: "0x4B5BfD52124784745c1071dcB244C6688d2533d3",
  apyTooltip: "Please migrate funds to our new vault to continue earning boosted yield.",
  migrationMessage: "This vault is no longer boosted, but is still earning yield. Withdraw funds or migrate your balance to the new v2 Curve Y Pool yVault to continue earning boosted yield."
}, {
  symbol: "3Crv",
  token: "0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490",
  vaultFrom: "0x9cA85572E6A3EbF24dEDd195623F188735A5179f",
  vaultTo: "0x84E13785B5a27879921D6F685f041421C7F482dA",
  apyTooltip: "Please migrate funds to our new vault to continue earning boosted yield.",
  migrationMessage: "This vault is no longer boosted, but is still earning yield. Withdraw funds or migrate your balance to the new v2 Curve 3pool yVault to continue earning boosted yield."
}, {
  symbol: "crvDUSD",
  token: "0x3a664Ab939FD8482048609f652f9a0B0677337B9",
  vaultFrom: "0x8e6741b456a074F0Bc45B8b82A755d4aF7E965dF",
  vaultTo: "0x30FCf7c6cDfC46eC237783D94Fc78553E79d4E9C",
  apyTooltip: "Please migrate funds to our new vault to continue earning boosted yield.",
  migrationMessage: "This vault is no longer boosted, but is still earning yield. Withdraw funds or migrate your balance to the new v2 Curve DUSD yVault to continue earning boosted yield."
}, {
  symbol: "crvMUSD",
  token: "0x1AEf73d49Dedc4b1778d0706583995958Dc862e6",
  vaultFrom: "0x0FCDAeDFb8A7DfDa2e9838564c5A1665d856AFDF",
  vaultTo: "0x8cc94ccd0f3841a468184aCA3Cc478D2148E1757",
  apyTooltip: "Please migrate funds to our new vault to continue earning boosted yield.",
  migrationMessage: "This vault is no longer boosted, but is still earning yield. Withdraw funds or migrate your balance to the new v2 Curve MUSD yVault to continue earning boosted yield."
}, {
  symbol: "crvUST",
  token: "0x94e131324b6054c0D789b190b2dAC504e4361b53",
  vaultFrom: "0xF6C9E9AF314982A4b38366f4AbfAa00595C5A6fC",
  vaultTo: "0x1C6a9783F812b3Af3aBbf7de64c3cD7CC7D1af44",
  apyTooltip: "Please migrate funds to our new vault to continue earning boosted yield.",
  migrationMessage: "This vault is no longer boosted, but is still earning yield. Withdraw funds or migrate your balance to the new v2 Curve UST yVault to continue earning boosted yield."
}, {
  symbol: "crvSUSD",
  token: "0xC25a3A3b969415c80451098fa907EC722572917F",
  vaultFrom: "0x5533ed0a3b83F70c3c4a1f69Ef5546D3D4713E44",
  vaultTo: "0x5a770DbD3Ee6bAF2802D29a901Ef11501C44797A",
  apyTooltip: "Please migrate funds to our new vault to continue earning boosted yield.",
  migrationMessage: "This vault is no longer boosted, but is still earning yield. Withdraw funds or migrate your balance to the new v2 Curve SUSD yVault to continue earning boosted yield."
}, {
  symbol: "crvLINK",
  token: "0xcee60cFa923170e4f8204AE08B4fA6A3F5656F3a",
  vaultFrom: "0x96Ea6AF74Af09522fCB4c28C269C26F59a31ced6",
  vaultTo: "0xf2db9a7c0ACd427A680D640F02d90f6186E71725",
  apyTooltip: "Please migrate funds to our new vault to continue earning boosted yield.",
  migrationMessage: "This vault is no longer boosted, but is still earning yield. Withdraw funds or migrate your balance to the new v2 Curve Link yVault to continue earning boosted yield."
}, {
  symbol: "crvUSDP",
  token: "0x7Eb40E450b9655f4B3cC4259BCC731c63ff55ae6",
  vaultFrom: "0x1B5eb1173D2Bf770e50F10410C9a96F7a8eB6e75",
  vaultTo: "0xC4dAf3b5e2A9e93861c3FBDd25f1e943B8D87417",
  apyTooltip: "Please migrate funds to our new vault to continue earning boosted yield.",
  migrationMessage: "This vault is no longer boosted, but is still earning yield. Withdraw funds or migrate your balance to the new v2 Curve USDP yVault to continue earning boosted yield."
}, {
  symbol: "crvUSDN",
  token: "0x4f3E8F405CF5aFC05D68142F3783bDfE13811522",
  vaultFrom: "0xFe39Ce91437C76178665D64d7a2694B0f6f17fE3",
  vaultTo: "0x3B96d491f067912D18563d56858Ba7d6EC67a6fa",
  apyTooltip: "Please migrate funds to our new vault to continue earning boosted yield.",
  migrationMessage: "This vault is no longer boosted, but is still earning yield. Withdraw funds or migrate your balance to the new v2 Curve USDN yVault to continue earning boosted yield."
}, {
  symbol: "crvAAVE",
  token: "0xFd2a8fA60Abd58Efe3EeE34dd494cD491dC14900",
  vaultFrom: "0x03403154afc09Ce8e44C3B185C82C6aD5f86b9ab",
  vaultTo: "0x39CAF13a104FF567f71fd2A4c68C026FDB6E740B",
  apyTooltip: "Please migrate funds to our new vault to continue earning boosted yield.",
  migrationMessage: "This vault is no longer boosted, but is still earning yield. Withdraw funds or migrate your balance to the new v2 Curve Aave yVault to continue earning boosted yield."
}, {
  symbol: "crvAETH",
  token: "0xaA17A236F2bAdc98DDc0Cf999AbB47D47Fc0A6Cf",
  vaultFrom: "0xE625F5923303f1CE7A43ACFEFd11fd12f30DbcA4",
  vaultTo: "0x132d8D2C76Db3812403431fAcB00F3453Fc42125",
  apyTooltip: "Please migrate funds to our new vault to continue earning boosted yield.",
  migrationMessage: "This vault is no longer boosted, but is still earning yield. Withdraw funds or migrate your balance to the new v2 Curve ankrETH yVault to continue earning boosted yield."
}, {
  symbol: "crvEURS",
  token: "0x194eBd173F6cDacE046C53eACcE9B953F28411d1",
  vaultFrom: "0x98B058b2CBacF5E99bC7012DF757ea7CFEbd35BC",
  vaultTo: "0x25212Df29073FfFA7A67399AcEfC2dd75a831A1A",
  apyTooltip: "Please migrate funds to our new vault to continue earning boosted yield.",
  migrationMessage: "This vault is no longer boosted, but is still earning yield. Withdraw funds or migrate your balance to the new v2 Curve EURS yVault to continue earning boosted yield."
}, {
  symbol: "LINK",
  token: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
  vaultFrom: "0x881b06da56BB5675c54E4Ed311c21E54C5025298",
  vaultTo: "0x671a912C10bba0CFA74Cfc2d6Fba9BA1ed9530B2",
  apyTooltip: "Please migrate funds to our new vault to continue earning yield.",
  migrationMessage: "This vault is no longer active. Withdraw funds or migrate your balance to the v2 LINK yVault to continue earning yield."
}, {
  symbol: "WETH",
  token: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  vaultFrom: "0xa9fE4601811213c340e850ea305481afF02f5b28",
  vaultTo: "0xa258C4606Ca8206D8aA700cE2143D7db854D168c",
  apyTooltip: "Please migrate funds to our new vault to continue earning yield.",
  migrationMessage: "This vault is no longer active. Withdraw funds or migrate your balance to the v2 WETH yVault to continue earning yield."
}, {
  symbol: "DAI",
  token: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  vaultFrom: "0x19D3364A399d251E894aC732651be8B0E4e85001",
  vaultTo: "0xdA816459F1AB5631232FE5e97a05BBBb94970c95",
  apyTooltip: "Please migrate funds to our new vault to continue earning yield.",
  migrationMessage: "This vault is winding down. Withdraw funds or migrate your balance to the new v2 DAI yVault to continue earning yield."
}, {
  symbol: "crvTriCrypto",
  token: "0xcA3d75aC011BF5aD07a98d02f18225F9bD9A6BDF",
  vaultFrom: "0x3D980E50508CFd41a13837A60149927a11c03731",
  vaultTo: "0xE537B5cc158EB71037D4125BDD7538421981E6AA",
  apyTooltip: "Please migrate funds to our new vault to continue earning yield.",
  migrationMessage: "Curve identified an issue with this pool and has deployed a new 3Crypto pool. Please migrate to our new 3Crypto vault to earn higher yield."
}, {
  symbol: "TUSD",
  token: "0x0000000000085d4780B73119b644AE5ecd22b376",
  vaultFrom: "0x37d19d1c4E1fa9DC47bD1eA12f742a0887eDa74a",
  vaultTo: "0xFD0877d9095789cAF24c98F7CCe092fa8E120775",
  apyTooltip: "Please migrate funds to our new vault to continue earning yield.",
  migrationMessage: "This vault is no longer active. Withdraw funds or migrate your balance to the v2 TUSD yVault to continue earning yield."
}, {
  symbol: "DAI",
  token: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  vaultFrom: "0xACd43E627e64355f1861cEC6d3a6688B31a6F952",
  vaultTo: "0xdA816459F1AB5631232FE5e97a05BBBb94970c95",
  apyTooltip: "Please migrate funds to our new vault to continue earning yield.",
  migrationMessage: "This vault is no longer active. Withdraw funds or migrate your balance to the v2 DAI yVault to continue earning yield."
}, {
  symbol: "USDC",
  token: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  vaultFrom: "0x597aD1e0c13Bfe8025993D9e79C69E1c0233522e",
  vaultTo: "0xa354F35829Ae975e850e23e9615b11Da1B3dC4DE",
  apyTooltip: "Please migrate funds to our new vault to continue earning yield.",
  migrationMessage: "This vault is no longer active. Withdraw funds or migrate your balance to the v2 USDC yVault to continue earning yield."
}, {
  symbol: "USDT",
  token: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  vaultFrom: "0x2f08119C6f07c006695E079AAFc638b8789FAf18",
  vaultTo: "0x7Da96a3891Add058AdA2E826306D812C638D87a7",
  apyTooltip: "Please migrate funds to our new vault to continue earning yield.",
  migrationMessage: "This vault is no longer active. Withdraw funds or migrate your balance to the v2 USDT yVault to continue earning yield."
}, {
  symbol: "YFI",
  token: "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e",
  vaultFrom: "0xE14d13d8B3b85aF791b2AADD661cDBd5E6097Db1",
  vaultTo: "0xdb25cA703181E7484a155DD612b06f57E12Be5F0",
  apyTooltip: "Please migrate funds to our new vault to continue earning yield.",
  migrationMessage: "This vault is no longer active. Withdraw funds or migrate your balance to the v2 YFI yVault to continue earning yield."
}, {
  symbol: "USDC",
  token: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  vaultFrom: "0x5f18C75AbDAe578b483E5F43f12a39cF75b973a9",
  vaultTo: "0xa354F35829Ae975e850e23e9615b11Da1B3dC4DE",
  apyTooltip: "Please migrate funds to our new vault to continue earning yield.",
  migrationMessage: "This vault is no longer active. Withdraw funds or migrate your balance to continue earning yield."
}].map(v => 
  v.vaultTo)

  async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const tokens = {};
    const poolInfos = await Promise.all(Addresses.map(a => loadYearnPoolInfo(App, tokens, a)));
    let tvl = 0, userTvl = 0
    for(const p of poolInfos.filter(p => p))
    {
      printYearnContract(p);
      if (!isNaN(p.poolPrices.tvl)) tvl += p.poolPrices.tvl;
      if (!isNaN(p.userStaked * p.poolPrices.price)) userTvl += p.userStaked * p.poolPrices.price;
    }
    _print_bold(`\nTotal Value Locked: $${formatMoney(tvl)}`);
    if (userTvl > 0) {
      _print_bold(`You are staking a total of $${formatMoney(userTvl)}`);
    }

    hideLoading();
  }

  async function loadYearnPoolInfo(App, tokens, contractAddress) {
    try {
      const contract = await new ethers.Contract(contractAddress, YEARN_VAULT_ABI, App.provider);
      const vault = await getToken(App, contractAddress, App.YOUR_ADDRESS);
      var newTokenAddresses = vault.tokens.filter(x => !getParameterCaseInsensitive(tokens, x));
      for (const address of newTokenAddresses) {
          tokens[address] = await getToken(App, address, contractAddress);
      }
      const totalSupply = await contract.totalSupply() / 1e18;
      const ppfs = await contract.pricePerShare() / 1e18;
      const userStaked = await contract.balanceOf(App.YOUR_ADDRESS) / 1e18;
      let prices = {}
      await getNewPricesAndTokens(App, tokens, prices, newTokenAddresses, contractAddress);
      const poolPrices = getPoolPrices(tokens, prices, vault, "eth");
      return { vault, poolPrices, userStaked, ppfs, totalSupply }
    }
    catch (err) {
      console.log(contractAddress, err);
      return null;
    }
  }

  async function printYearnContract(poolInfo) {
    const poolPrices = poolInfo.poolPrices;
    _print(`${poolPrices.name} Price: $${formatMoney(poolPrices.price)} TVL: $${formatMoney(poolPrices.tvl)}`);
    var userStakedUsd = poolInfo.userStaked * poolPrices.price;
    var userStakedPct = userStakedUsd / poolPrices.tvl * 100;
    _print(`You are staking ${poolInfo.userStaked.toFixed(4)} ${poolPrices.name} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
    if (poolInfo.userStaked > 0) {
      _print(`Your stake comprises of ${poolInfo.userStaked * poolInfo.ppfs} ${poolInfo.vault.token.symbol}.`)
    }
    _print("");
  }
