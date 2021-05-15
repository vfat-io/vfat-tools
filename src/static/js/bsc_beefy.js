
$(function() {
consoleInit(main)
});

const BEEFY_VAULT_ABI = [{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_strategy","type":"address"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"uint256","name":"_approvalDelay","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"implementation","type":"address"}],"name":"NewStratCandidate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"implementation","type":"address"}],"name":"UpgradeStrat","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"approvalDelay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"available","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getPricePerFullShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_implementation","type":"address"}],"name":"proposeStrat","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stratCandidate","outputs":[{"internalType":"address","name":"implementation","type":"address"},{"internalType":"uint256","name":"proposedTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"strategy","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"upgradeStrat","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_shares","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const BEEFY_STRATEGY_ABI = [{"inputs":[{"internalType":"address","name":"_vault","type":"address"},{"internalType":"address","name":"_strategist","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"harvester","type":"address"}],"name":"StratHarvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"CALL_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REWARDS_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"STRATEGIST_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TREASURY_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WITHDRAWAL_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WITHDRAWAL_MAX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOfLpPair","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOfPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bifi","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bnb","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"inch","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpPair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"panic","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"retireStrat","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPool","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewards","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_strategist","type":"address"}],"name":"setStrategist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"strategist","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unirouter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"vault","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wbnb","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"wbnbToBifiRoute","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

const Address = [
  "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  "0x8893D5fA71389673C5c4b9b3cb4EE1ba71207556",
  "0xa9eA4b786ee5b7A733c035564Bfd9341A4c9FC1e",
  "0x4fCfA6cC8914ab455B5b33Df916d90BFe70b6AB1",
  "0x790Be81C3cA0e53974bE2688cDb954732C9862e1",
  "0x4F47A0d15c1E53F3d94c069C7D16977c29F9CB6B",
  "0x2849b1aE7E04A3D9Bc288673A92477CF63F28aF4",
  "0xcc2E12a9b5b75360c6FBf23B584c275D52cDdb0E",
  "0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95",
  "0x69F27E70E820197A6e495219D9aC34C8C6dA7EeE",
  "0xf7069e41C57EcC5F122093811d8c75bdB5f7c14e",
  "0x9fBa2fc7505CE6801ADCF23146310187CecfcE47",
  "0x2c1a0950aC426f920f260C9647BCD3AFD0482f4e",
  "0xE929d65cBf543cC3cA6b18Fe7872fccC6abBf480",
  "0x3B5332A476AbCdb80Cde6645e9e5563435e97772",
  "0x7091E04422d1D9Be48C211cf2F818a7E88EFd736",
  "0x621Ab9A2EF4256A43dEFeB37F0a1eACb276BbF97",
  "0x57e6f78a7e644b8532d8c4f3A354c921709Aa897",
  "0x1EdfEc6849C54Ee9187539516C6a67ADAcBf9704",
  "0x580b899D8d856DFe3da7895466F779F1A509D2Fd",
  "0xA9936272065e6DDAc9D2453C9a2712B581e9aE1B",
  "0x0DA3EB14c8d07a87A366D029d7f2341Ac0eca775",
  "0xb35Dc0b5eFd7c75590a9da55BE46d968c5804e24",
  "0x4BeE93b29e1b3fd90bb3e6EdE9539Fe92E9836Cd",
  "0x61B51dc9AEb46403628930ef5F527168941E639b",
  "0x8AA0635A4719e665A08BaDe38b13F4a6d278165A",
  "0xB1C9A27394dBa451Bfc4a5dce8Fc829f8a3E9278",
  "0x2D40beB0122aBcAD0E6b49934d47adac6Dddd97B",
  "0x92E586d7dB14483C103c2e0FE6A596F8b55DA752",
  "0xbA67606DFE07387D20d9A324eF91732954688D77",
  "0x94d75413A29287Dde5766E5595dc61e668965170",
  "0xd7987DB14509FACb9CC44c0b82CC86c188f5cEEF",
  "0x62d7eC40A1a3f0AB5D1fCC0D8bd3dCb015aFe6a3",
  "0x0C098a54FeE7EC15a59587E69cD340BBd9d22077",
  "0xF3C1EB01E40c47fd32D0397e56569809aae0e9c7",
  "0x5B06aA1ebd2e15bC6001076355E5B4C39Cbc83F3",
  "0xfc01F7a17eEb5DABc97312E13954444b00217621",
  "0x96F66Dcf58fe5D276d64AC43095E2910AD4DBfD1",
  "0xD307e7CC6a302046b7D91D83aa4B8324cFB7a786",
  "0xee43C2D11Bc6DF95dcECd9be05ae648863D6f9dC",
  "0x32FDaa004C1d9cFCf9B8044D6015DD7bb3a7Ec5a",
  "0xFa7767Cf402a6D198cC136FED32550ABA70C3e02",
  "0xd9fe7Ff89C5303E439a14a5155F7F48E34F28518",
  "0xa640E017Fc01dD39F6b7B07b0460B04E218c0a01",
  "0x48cc86214C58d7EaA78C100156c55DD45A676Ed1",
  "0x6Cb6D451e7E7ca5d5F73715D6B5dfc55EfbC1f82",
  "0xe0B473c0dD6D7Fea5B395c3Ce7ffd4FEF0ab4373",
  "0x907b3848593df20243eCb5D954b06a028092b0D6",
  "0x8f210015B2BbDd39e6d62278992136aCAfd09691",
  "0x00dD62424A79C971D6F6a10bac531F33185E6d5b",
  "0xCa0294b89ee367ADaEDC8cdA684648dC1c5D8FEe",
  "0xb01e3C7789858beD3b142c8f2499F21Ab3ea3f0f",
  "0xcf2D6e0030e24F01e4750cAE376E2126e728E0c2",
  "0x5DA77c7DBF6dBa1155CF343db06a7D79aaaad9Ee",
  "0x7255Ae13BA4484eD33fB48c4b833000dC12888B4",
  "0xfEDB3855761B9e356671Fb1eC95593e99b153EfD",
  "0x6a3fF116a10349BB40B22FD7687871d5D560d715",
  "0xcB8c4416cD10836ff7A35F4b2AfD5BE0257Cc9DB",
  "0x53c0CE2EBdA0c2A39327bE0B58a3c28A8Dcde420",
  "0x7C001B962029C0a59b148293838dc780d7E5d24C",
  "0x6b4971b8dAfc3c426EdE7E629394f31B0BdF3c16",
  "0x31b4d6D89531BB32307737C441a8cD7d82224B91",
  "0x9De53755e913913dEcA7360a19C0634F2214FB6d",
  "0xDB89f01094c6e882d06aBC724aEBc7d15036fe14",
  "0xe698edcC279f68c2c37f5c122a26faBd5f6D98A3",
  "0x15396D3BD9338A14AE90613Fc2b85c5F7b5621CF",
  "0x651b496bCe2C184282a2B9AeF3f8BaDBAC36Dd7f",
  "0xE7DCEFacf1c9c523c1ccCc3Fc1Ae3EB654a4e805",
  "0x2EA1175f7189BeAdd6D8A7687B0a311C6785a7a3",
  "0x847c5748A280d800690F7D3A62574603b57Cd0b7",
  "0x2139E4CaDA8438a41F4009ff07D09Db29A62De04",
  "0x8a27f380626CAc25DF8D3Ea50Ed1fd7Db882e653",
  "0x310DF4c1DD93337A165AeF8e3d45A770CaaDe3b6",
  "0x0666bDF7187307890D2ACF092493cCEA51A8CD0b",
  "0xE372825C7b436244Cd5fA79cAa16e4Cc3091D4B0",
  "0x04D0bE0169694ca083996899a14752c82A953D22",
  "0x62ad4253FB38265Da05eb389ac547F1B2c09a689",
  "0x57e07d6958fd38AA2f46699744e322d3fB3db60f",
  "0x07622B8cF9130934643522E7c9D621707EF1d34F",
  "0x39C803716F67D6d4b190E633a961bF3503b8444E",
  "0xbd701bc24485ebfd3680285fb152509637ab8ad4",
  "0x42b41189e9B371B7952b77aE791FE25E78D22681",
  "0x605d96De6068f08489392a35E9DBE90201574bbC",
  "0x10120b5550214ab9451b9b00e4f78e82c02d6482",
  "0xEE24B014422a53dA2190a64C0477a300590677f2",
  "0x8afc0f9BdC5DcA9f0408Df03A03520bFa98A15aF",
  "0x578C066b5c7289f8Ba7c4DB43c110F19D7c51E03",
  "0x29C4C22eC7dF7e936Cb3e6C4A7E5eAE751C7d86B",
  "0x12e09a13f5e2d95b3B8db8741dFeBa453784d1DC",
  "0x646C536865603cFEB51dd35C36FD90296FB8DF26",
  "0x00AeC34489A7ADE91A0507B6b9dBb0a50938B7c0",
  "0xc1C1eB984218B9570beA53C0Dad14283a6E9E81C",
  "0x9dc7d9c4488223c0Ad50F0AE742D80AE1abEc859",
  "0x70CBc8B3a74A857056a6acE7e994229A24D4ab94",
  "0x1d9a453FCe2AC7b92FBe7b33BdC40F6e7aE14F47",
  "0x0F88Ce20f8af6D4c51b635BFBd8DFa03f2a36ACa",
  "0x6b40106ebEDaA719B14cfbA606b89954EaeeaE9D",
  "0x0D3837E00C47353e68680C39e6DA6B5b08fE6897",
  "0xFf750EE63F1E428De1D6C8D9d92676b5FC8376A8",
  "0x0a406FCBEA86aC57ACcc812E8F1B509acE5E054c",
  "0x559C88946e1958812dCfD8edd4f89B0C7d811F74",
  "0x58327471A57EE89Aa4b91753fF9E09f7291236C7",
  "0x7E45e8E3404a2C142d7E8eAE94EaEB8641607857",
  "0x02a77B01BE5BB6a73b70E2b5615694F71a2c4F41",
  "0xed324b068e31c6fB7C7921e79E54d95B1Ca9d759",
  "0x747f66e2Ab1b887a2207e15ADb7f9dAB79D9EAcf",
  "0xc41BB9dEF52Dd7ceD10c27fF2cCEC3299603299B",
  "0x9c1630eA66310fA03D756FBd92B68a1f08c487b6",
  "0x8FF55869e05492c127cEEc6A400D7e3803fC44E1",
  "0x895CF1E805cBd86355caC101aE9B252c806Dc59b",
  "0x8136C5EE816fD80b80C9679e785F37EBdf2199eE",
  "0xBd198f5132631e597518529268000A0199f07492",
  "0x1B3564F698988804b5D05a2C10B1d71bE051662F",
  "0xE035Dce0E345Cbd46F3c0dCBf602f96c5F741813",
  "0xCa38d57755f29c9ad17AbB1A6ae059DdAD913A0e",
  "0x5ee82A50D1C7a1B599a5d4DA2f54AdB0d7a497a6",
  "0x3B6C7bC3BE5C60c875cF415A97e6539cC28ECa32",
  "0x90d8AB2731f937f9ec98d0bbe6D4CBD4D95473db",
  "0x48Cb3540CB0BB4C6dDF638209e0631Ec85c1a477",
  "0xE2231D4ca4921Cb35680bac714C9d40C8d217494",
  "0xF0A7626eCcBee00aF144BB1f77CD187AF85BBf41",
  "0x2Eb92E2882030B8e153370d208462D4dDf7041d2",
  "0x3d0bd3C73eF66C8b487A49f50410173C44261285",
  "0x69009287479805E7372284835627564bad02107D",
  "0xfBa61aC24B46c5B7298De02FBa8F577C1c5005e9",
  "0x7185017145ea364163cCd708E0c78AC0297D6A94",
  "0x42BeB2855aa620C5c9dD073FA888c43c8a65c34f",
  "0x5B6c3432B724Ce198B93769970f1dF36Ac5552F8",
  "0x1Ae7E76e2Eb74070774bbd9EAC75585452f24C23",
  "0xfC083Cb104b48924AB44C69537b1450B2e78eBD6",
  "0x56E899E56F6B8635B4A01b724db23674a64A7231",
  "0xFAE4a35305a1dcED8303029ac05e51386f667ED8",
  "0x4D6294D36aD4201De1D93Af18A61453B8865d008",
  "0x1d23ecC0645B07791b7D99349e253ECEbe43f614",
  "0xb8b7CAF72D75Ac8b71bB208b2D98a9dac9d5c90B",
  "0x23293B8A7c65aF396Bda8Ff75E02c62f6db8f202",
  "0x00EcbB8f9853dbC621b39ab205a148A26eAC3B11",
  "0x9355af5ABD030E8BC2Dc63a38F1C956F1e150308",
  "0x2B19461954cCBa9e1b60bD0bC6453FeaC8aa1a17",
  "0x9327029cf20B78e445397dAf0c4e9c19a931D62e",
  "0x0fA31301EaA9633b3e4F7dF22F7543115759cf5a",
  "0xB38D32336538559Ce6680952B0Be4917ed015c39",
  "0x813aDbc7b9a9822FA37510F52aD14bDBc45aA306",
  "0x8B80E58328aEF3796D70D29F65d516d29ACD944d",
  "0x3040387C46e21B453e4a8f648528368b9066628B",
  "0xc2c792807A32fB9F9f985749Ef90673D8e1Bad44",
  "0xb5f0ff997bec850b11792ed07b2b5abdea869b84",
  "0xeD4ea30c755676C07d3e0e0f74Ff84C0193B4551",
  "0x7EED74dacB305C03A8f624282d6AEF15f1CD3777",
  "0x34199dc9ad1bD3D4A6EC70c120B8780e3A2Ca6C7",
  "0x03090F5E40934E0F1AAe73b2F1cFD240DBD7Af5E",
  "0x6E0F2e199FC10B3F354C6825fCbC24a5de96B4bF",
  "0xB194bcA26660abC93042fd6b475F2dD0b5175ED7",
  "0xFaa95d27A91eb2305bD1B4b12a9cE564874eE349",
  "0x5f640a217026FeFD0C4F1E581b44794c3d5F4638",
  "0x8AE31751A226B0C5357a377E53B6DB12bDF5e64d",
  "0xE7408598DB157Cd4A24Bc26B579910AF36a72fad",
  "0x40e39743dBcb30c7Fc4152F57F29Cd22D9fc7932",
  "0xda643fBC5faA4FB3a95c62dBF729fE2B0Ff4F577",
  "0x9d3Aa54172D49659Ee9948d1b7D602989d39Ffa6",
  "0xfb62a8d9d162632C5AaD94f6bf353a19AeCd2855",
  "0x25Fb99cf1DCe844cD823bD1e8FB0c1DCc85dAD0E",
  "0xC0766D0F482c7174274bE653dcB0B80c0436dFCc",
  "0xD96c8527d20acfa7D5D2054Bfb375fd0cB428322",
  "0x73fA0bbAb2e3288123674200553fBfCb94037Fcb",
  "0x8af2D7289A093CF1019D9e20554F6c7aD5791A94",
  "0x629C4ca0F3492476FAe31dE6FD456D7da1dfCEb7",
  "0xB0BDBB9E507dBF55f4aC1ef6ADa3E216202e06FD",
  "0xf19878DE084C3c9753bB0DAD8aC5b9070fb7813c",
  "0x2211191ff72505ED54Aa6aD3F6Fcc72c87CAb338",
  "0x8da7167860EDfc2bFfd790f217AB5e398803Bbc8",
  "0x23f81b26e7dfB44832f627Ee533399285a11e711",
  "0x0F5ef847595236Bb70833825FC9Bf0ef982CDD4C",
  "0x7ca3761D9886D5Ac233E58d5B2E60174B3A94b82",
  "0x1061c2962fccD794C4131b3c13058302618329E9",
  "0xcB00A85dbb29Ab9e2581660031BF56EfC819a559",
  "0xc119408BDa86C12F1c6BD276e68ab9f558292119",
  "0xA74b54B24106B008881e627EC57D9629C2fdA5e2",
  "0x9368165eCB0BB16d214fc63fDFcd07fbBa21AbBB",
  "0x4884cD2C9F11Dc9e8f90d177576c46fdbd1b7641",
  "0xa40488536B1BAeECA9D2277Fde28394D3c04aD73",
  "0x4CcF7dC91389396801ec1f4A5E6cC675549f39E6",
  "0x6BE4741AB0aD233e4315a10bc783a7B923386b71",
  "0x6BE4741AB0aD233e4315a10bc783a7B923386b71",
  "0x9aaD247bAc2AFc3027256aD0Cc09A27551069bd6",
  "0x07D478b679C6c7F4222388856f53F8dca7E7b378",
  "0x1997D7cF0A63A374A853ca9d5b1dAcCFeCa5cEb8",
  "0x2d3d152b3b94c0E0B217AC5bc1115E3D8b8018F9",
  "0xd61420f20e945d0B617fEdA5971f692A3DCE711c",
  "0x3eb560209B438d4e23833aFf6751fcf0B810F60b",
  "0xB1B91AA761F552FEF29A50643D0F93690082960F",
  "0xD16Aef70403f1Fbf710C6A73EBb7c4FaA983d59a",
  "0x3b2c93f9455786e74C68648EaaB09B20ce557537",
  "0xbB63c8858b64a856d79A80575Df60867622E4782",
  "0x179701FD814F17838605c1990EDA96C1EbeC984e",
  "0xCa6e313C535B6C355bEeAae296B58a194C3D6044",
  "0xaC112E7744C129ae54E65F5D2cb4eA472E08eA0B",
  "0x3e1B60EB79b17d41F8E268936d853A43BEA24259",
  "0x1bcc82ce9b387E16fC383af563fd400074E3f060",
  "0x06fb2e27155c2a551aF34E80aE67f569673dDD73",
  "0x29C36e5fcB1dC4a3D4B46C00F82b2cee39c5540e",
  "0x9D729179E429153a6aca26389e6a9b625431C79B",
  "0xe789711992020575e07381fdb3dFDc251Ec4d027",
  "0x0adc208151e6b7AE1D884b64fDA662d10B4F6174",
  "0x68aE2aB6448884714DDf11C8d55ea7578C65D502",
  "0x2091b25f02275a4D791075f83c904Fa5Fb96B5A7",
  "0x7A99078ba8960871233377C7aE6B5d2A61229A43",
  "0x3CAd2fF669865359b80a2d948A10e1810f7486D7",
  "0x390f28E3919D2c4d9624Ae9AeBe6da25322ED56D",
  "0x84d95337c83B84688DFE678117e1539786f8c4Cb",
  "0xd4572009c7580DEfa0251FFD811b04386Dd41570",
  "0xa4aB709f5eB75f3213734fC227D9e27352d1DB6c",
  "0xA2bcB1D7955AEa2F5B93C308E199337a77E7bAd4",
  "0xc713ca7cb8edfE238ea652D772d41dde47A9a62d",
  "0x260879777DB293541DbC9a27c3C2fAD9c9bb48D3",
  "0x4B4e5F2CeEdfF00D2DD13874714C1Ef6Ea1Cd8a7",
  "0x502AB55Cf22f38c4fd8663dEE041A96B72264c53",
  "0xaB9C4a0fD179315b005a5f6D3793cb30Af718152",
  "0x72F758cb79cA71CE9010dc9c0fA0155431435B72",
  "0x0c36Bee5cF5E5b1BE5371574cEBF9A5f01DE5Fc4",
  "0x348039C69B5fD7b333CE0a17E8361E501D2e3fa8",
  "0x1CfEAef83Bb688Ac5926df1feEB8F05244054C07",
  "0xd9542B833C6B0D9E4f882d2c4F01d5b5bd005Ac7",
  "0x5Bea18aBa4825bbE6450c280fBE8c22B1489cDd4",
  "0xD6fca61Edb1cD0259320A6E0899E8aD1044BBCda",
  "0x7bF55acDe006C398Bb605Ae564A8F832F80000ee",
  "0x63a2CEF28904956552714ddb226ceE96c3F0C9EF",
  "0xc16187F3eb15aEE949e7d784906d53fd7E364B26",
  "0x6F0Df0858542fC4A1c7f82c14fAA490d7763592F",
  "0x2fd5f579e2cF9e3cb8127BBAd1B52c25750b1aCE",
  "0x214e640c638fbe68Fb24e11BfBd8Cd7d6cb8E37b",
  "0x78d60Da18c09bdE41397010198F454021Ec810Ad",
  "0xFDafEA4529d609901E6E6CC65b3e2C1C822e223d",
  "0x07AD2C13a0D735FA4F8788DC0B6355AaaB2f3407",
  "0xe6CcE165Aa3e52B2cC55F17b1dBC6A8fe5D66610",
  "0x41D44B276904561Ac51855159516FD4cB2c90968",
  "0xdf68Bf80D427A5827Ff2c06A9c70D407e17DC041",
  "0x2a30C5e0d577108F694d2A96179cd73611Ee069b",
  "0x1433c4a55449c8B96cf5Ac0cF395cBd8dc8e5f60",
  "0x7a670e849DB824364d1031DEAfB4cD603144F23D",
  "0x945b2379E29F503a78dBcaB2feEFFE74a6c31E2b",
  "0x6169551074826724CAcd8Deb452BF133403c2036",
  "0x8B1Ca7f3F0838dCd23DA8CFe223eA313739193cb",
  "0x044e87f30bd9bD961c04028aC69155493E1b9eD0",
  "0x666c0b9D37A20235C232081C1C6B2edc70ecC7F3",
  "0xbF7421bd2f79643a671b70d1DDE57D452C110CF8",
  "0xC422261EdC5dB679CAd9BC403e886351De540e77",
  "0x5c2197149ce7CAb038aB09C45087a09070E32C73",
  "0xd93A86BbF40454A7BCD339614fB46C67bE31B908",
  "0x2f536faCbC780B9ccA02545d2aA71021d7308c5E",
  "0x3492eF16b2ACb5b5240436d5D2B657fDc2b0b1eB",
  "0x1Ff05E1Fb13931eBE19363441bF10f8c5dCc963E",
  "0x56Fb7dA3025f76d2128Ef1b0D2EEA47Dd45e7C2a",
  "0x14d07853560436aEe38BE12DD66d944B07D5E59F",
  "0x0c89Ca08b6831e6b81f9f969F37A966a2C44d3d1",
  "0x7076a33b6525132fF77F0FeE2daB2a1e79688DA0",
  "0x114c5f7f42fB75b7960aa3e4c327f53288360F58",
  "0xA43d8f6Db69610C8260B953658553cabF01D77c6",
  "0xB5F0fF997BEc850b11792ed07b2B5AbDEa869B84",
  "0x3094Ab4Af54f5208B867125B5CCeCc94Bc17cbB6",
  "0xd5ab3Fac6200B0D8e8d76daED62793026118A78c",
  "0x6571052b2FB67DF6DD003ED6ed371098A030Eb0d",
  "0x17657955D954bD7F7315C388D7099af7B0b851FA",
  "0x044e87f30bd9bD961c04028aC69155493E1b9eD0",
  "0xDA875A511860f2752B891677489d08CaEDac00EA",
  "0x7a670e849DB824364d1031DEAfB4cD603144F23D",
  "0x71b5852857b85D5096d4288AD6d293F217d8e162",
]

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const prices = await getBscPrices();
  const tokens = {};
  const poolInfos = await Promise.all(Address.map(a => loadBeefyPoolInfo(App, tokens, prices, a)));
  let tvl = 0, userTvl = 0
  for(const p of poolInfos.filter(p => p))
  {
    printBeefyContract(p);
    if (!isNaN(p.poolPrices.tvl)) tvl += p.poolPrices.tvl;
    if (!isNaN(p.userStaked * p.poolPrices.price)) userTvl += p.userStaked * p.poolPrices.price;
  }
  _print_bold(`\nTotal Value Locked: $${formatMoney(tvl)}`);
  if (userTvl > 0) {
    _print_bold(`You are staking a total of $${formatMoney(userTvl)}`);
  }

  hideLoading();
}

async function loadBeefyPoolInfo(App, tokens, prices, contractAddress) {
  try {
    const contract = await new ethers.Contract(contractAddress, BEEFY_VAULT_ABI, App.provider);
    const vault = await getBscToken(App, contractAddress, App.YOUR_ADDRESS);
    var newTokenAddresses = vault.tokens.filter(x => !getParameterCaseInsensitive(tokens, x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getBscToken(App, address, contractAddress);
    }
    const totalSupply = await contract.totalSupply() / 1e18;
    const ppfs = await contract.getPricePerFullShare() / 1e18;
    const userStaked = await contract.balanceOf(App.YOUR_ADDRESS) / 1e18;
    const poolPrices = getPoolPrices(tokens, prices, vault, "bsc");
    return { vault, poolPrices, userStaked, ppfs, totalSupply }
  }
  catch (err) {
    console.log(contractAddress, err);
    return null;
  }
}

async function printBeefyContract(poolInfo) {
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
