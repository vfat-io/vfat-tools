
$(function() {
  consoleInit(main)
  });

//const MATIC_ADAMANT_VAULT_TOKEN_ABI = [{"inputs":[{"internalType":"contract IStrategy","name":"_strategy","type":"address"},{"internalType":"address","name":"_minter","type":"address"},{"internalType":"address","name":"_ercFund","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposited","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"reward","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newReward","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalAllocation","type":"uint256"}],"name":"RewardAllocated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[],"name":"accRewardPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"ercFund","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getLastDepositTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getPendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRatio","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRewardMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getTokensStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newReward","type":"uint256"}],"name":"increaseRewardAllocation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"keepMax","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_reward","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"notifyReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardAllocation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IMinter","name":"newMinter","type":"address"}],"name":"setMinter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_depositFee","type":"uint256"}],"name":"setPoolDepositFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardMultiplier","type":"uint256"}],"name":"setRewardMultiplier","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_withdrawPenalty","type":"uint256"}],"name":"setWithdrawPenalty","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_withdrawPenaltyTime","type":"uint256"}],"name":"setWithdrawPenaltyTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"strategy","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalPendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"lastDepositTime","type":"uint256"},{"internalType":"uint256","name":"tokensStaked","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawPenalty","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawPenaltyTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

const ADAMANT_STRATEGY_ABI = [{"inputs":[{"internalType":"address","name":"_lpPair","type":"address"},{"internalType":"uint8","name":"_poolId","type":"uint8"},{"internalType":"address","name":"_vault","type":"address"},{"internalType":"address","name":"_unirouter","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"harvester","type":"address"}],"name":"StratHarvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"CALL_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"HYPER_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WITHDRAWAL_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WITHDRAWAL_MAX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"alloy","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"alloyToLp0Route","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"alloyToLp1Route","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"alloyToWbnbRoute","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOfLpPair","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOfPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"hypercity","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hyperdao","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hypr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpPair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpToken0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpToken1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"panic","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolId","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"retireStrat","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unirouter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"vault","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wbnb","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"wbnbToHyprRoute","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const Address = [
    //"0x0a2ad1e60bcf5f812a2c74ec519822da36f86617",
    "0x45f9fEbda01894a627cD58F69308C1200f326Df2",
    "0x37702ce44bef87236f9cC1802481ddA66E372838",
    "0xE519980e4D898c9e3C9e0AE8f936F8807684681F",
    "0xb15eC9d06F0dafc9b3e4E474A91c1aa13A8cDA73",
    "0x539f41633a450Fc22074db3aD75f43D3110346A7",
    "0x84c77e4Ba85D981f1AFB0ea786364bE3Af352078",
    "0x80cA65F68bFe3DD2Ee4B4481993ef91C23a5a798",
    "0x62E774a618309C2B86DA82f78FcC09544588111E",
    "0x5dcd84D5E3E1f3b488254eb3ACf234f0DF6e1eB1",
    "0xfF78E0c60a214b6cC0132BFF493bF68Ac8c307d8",
    "0xAd1ba859815bbbB9DD490A92aF292430991FE534",
    "0x508d91e7Be1B2240E0229762a88a31b211657d1F",
    "0xCeE91fa1DcAaf32DCdeb11A736E9B832AB2031fE",
    "0x181c5A03a4CCd80f98411192bA6b53A4B5F50B90",
    "0x1f50A7e0e48D9f5445Ba0292A0aCEe6240DF6294",
    "0x5076599aFD68dB3419770fC6eFc7BFAd861C1413",
    "0xD3E7f9247b3464Da1AC6b32F4f10af1Bab6631c8",
    "0xD1fffF86A5Dbb5A2bC7ff465f070A08bc1CD7B8A",
    "0xE01cBa33530C95f096991C07c82D6F68576F2cc1",
    "0x2424a2B091B6ed96cE78D3f13007C9Fec9D178e6",
    "0x8286cD090a6Fd2D70Ea7EA0bC0b3f58b7f1C5906",
    "0x1682D900969eD147a8200d4B4cBBbb1aD9b39Ad1",
    "0x8b8a20340FD48A4801f18306D81DBF4930aB53F9",
    "0x98446232F92eaa07aa9048351d83Bb35b42b3Bb0",
    "0x90482530C55CF2ce14fCF4eeAD75cb80CF26AC74",
    "0x24Dd7239C5Cfa19f189F8D55f318a1519310EE21",
    "0x42c916Cd80AA597268Ab2950A65B7F563cB152Fd",
    "0x6Ed5325d887aD8E8ca14A498c5B5133E40093e67",
    "0x778c1660B8B2761aa62e030E2fc72fce2645465C",
    "0xb0f2617F72365DDaE799c22B73542Fa69CE415EF",
    "0xa25E70b42dE5885e7f97fe375F467F691c811bC8",
    "0x0648578Af7e4740026Dc8042F2758A4afe4E9bC6",
    "0x132939025bB90F0dD6B0Ae78C4ed2BF29648d322",
    "0x3dF910e5bf769F3Ed4464c23091530BD284b7522",
    "0x50fC91FA423eD1F23B5CF20Bf14E82Fe7C865a19",
    "0xD531061e1353B6EEce6817b14382d3aCD401552a",
    "0x15FDffaB432c72e12200F02bb2f6d2Ee54e521BF",
    "0xe7eB754A26afaC3938A65944c822aec3Fb7188cF",
    "0xD43738bdD20e44f318AF6A7d81179993ED9fe9A0",
    "0xaef9124599bee0cfb1c6f3634ed72f969dba21a2",
    "0xF60a6F63BDdCF89E8bc0b092EE13A71214a3a7a2",
    "0x4EEcEc650450a927262e37F5bc07FEc3e8dF0DAf",
    "0x35B5dD993269EEfAE1657B0b01A63E1e94457499",
    "0x4DDD04b8383a51F4223dDFB8227E73087aa8c6c0",
    "0x4acefDA5c5910B04F898443D94537BeAEf1a65cC",
    "0x731a23Fb283D38264DdE358a64Bf4ddb397a4894",
    "0x9E9f73F18612B91326BD9E7560aD2FE94eE87CA0",
    "0xa48e241421d845e8cc87c4920547632ee0238220",
    "0xd443405fc139d831bd9187ee6d461d572e71d023",
    "0x44f11BbE1A4B1BCE2DE83270f18C3478fe4397Cc",
    "0xBa11D4FC630641C6E7309d69F6048d46bEa2f75a",
    "0x5253983ec434E0ff53C0145Dd1E4d75cE2D6B9CB",
    "0x4a3D0B1915FF9D39b1af26E32e6d8A7A863B26a1",
    "0x9A4f349f879e72fdf4779B4C163B982FFDBa1c45",
    "0x69606f7D44547a8b13f47BC0B06618598B85B328",
    "0x57AC3C504b79a5eaeA09B671E5e491F66094Ea54",
    "0x399228e8095661Ca0A3b15470B6f8f63c8278a1d",
    "0xAC6af11F569b33e6CB831a7412531e711FB58908",
    "0x0f35571dC4B28035Ae8B9575bcA6e97Dc5959725",
    "0x967a0EA7164F1E85C428D7000d71Ae9411Ab4Ba0",
    "0xd60c6306CAC1b97161f9E148FDC6035beC54878b",
    "0xde457a1BB167A33dC268D85c4860cbE9EaD8D308",
    "0xdFe4Ba33B702586ed58cEeB0c4F7b5853E62dcd6",
    "0xE006d5D2A7af89bAB888507C11339441e3997CD8",
    "0x0Dd6Bd5AEe58EF5fcCa3dECcAC8aDF1358956D63",
    "0x57fC77d948c0C903CA231d7B9C8153F6479a3055",
    "0x5EE0C9ed5f8ADB6d546381Fb832B1947C8182639",
    "0x7A15F200352BAF8c612dCEcbB43DdeCf4134AA08",
    "0x4d1056d5bC27BA4C09D1527a4F013C1D0C5D6DBa",
    "0xA40a00314608d82E61EE2c1e4061c1a04F66c713",
    "0xe715cf329e6fC51Df1784129396AB66D2382B219",
    "0x851BcF074A767F2cb4535FD24CE38fCAE00285CB",
    "0x89B7bE1572a4DA94ec9d94627FD7eDEEc7C2d6a4",
    "0x0EDdbD2D149a327158D0fF57c4C9290ec8C9e5EE",
    "0xa9C6F2FE6C727D8CBd9FFc16edca72C567507cCD",
    "0x252fc8544D44A4D6fA0E3617f34d34CF2A5840D2",
    "0x8Ce46b7c6ED5295A325DcC0098FfeCf7E691eAD7",
    "0x200A59496fF44032C070d38fea174DFA6D05D119",
    "0xDB116097b7b62F799716B46bcf8AE4F0959D1574",
    "0x0c1bD674c36440DB8d230E94a56EF3A8B5319d1a",
    "0x80E0378911D3f2E9EF9bBe782b4c2556c79D7fD3",
    "0xD07374b0962aA0D514355932B17CD79Dede5aaEc",
    "0x571634dcbB32fC6F562f507B436bB9a1f0DeC949",
    "0x6d6035A4456921DFc55f8A9760e68744c96511b7",
    "0x0f939AFC1C2871d22c5E72CC6452FC3F9357525A",
    "0x7dcaaa24a25111e3fd0a2b5cf60ec64162184abc",
    "0x1075f379293b8db9eafb140e0e7046f2b3098a69",
    "0x8E78379d32cB5d8A408D646e42a38d6B1a1F6d45",
    "0xb42c25793cf287ec886806df2784ae4bea75bd02",
    "0xc76de6e8c1bdff125222418bdaeb61cd52f3515b",
    "0x465fcf6b7422a825ccde48fc34f42e096c892677",
    "0xe2a0468d499010d73e7bff825c2e4de54998d3a5",
    "0xe0a6b1d6892e273a749e6ec45d027f2b5b6e2163",
    "0x2773f5e7430803e8faa80bf485b20e81ecf919eb",
    "0xf1f321444f0c44076df32d1071c9f9c2af97eaaa",
    "0x74c03ebc2e460ac8b011efc528bdc1570f09aabd",
    "0x15653b9616241857c3a0e3e44fd995ca021bc4e4",
    "0x437fb5d452ba67970317460a27051bbbe3574585",
    "0x3e5b24234fe6d37b10f21cd148ef9013d1edb487",
    "0x9ec2f659c5e66696f4667428e4b64547a57c8b11",
    "0xba2860b491515d9c8aea4790e34f59263df16c07",
    "0x3dbf005920cdfc3233fb0aafc56af658521a35e8",
    "0x7da631577adf1032c05775163d4bd6e12bebad77",
    "0x89B932a579b04Fd86925CEa373Ad63Ee7a847417",
    "0x5c40Cd282c6c80Ab0D80Bfb9367a4AD877Fd2a44",
    "0x4c7a1AA6ce36efB506e644A6Eb08845694862929",
    "0x51bA0B65462A5Daa314E4B3A3A84f48e6492Cf5B",
    "0x01600bB2a91Ae2754889f2724d15b7cfE6331cF6",
    "0x22056D0c8e5D83c6ffeFa6F363056833CE92Cf09",
    "0x486a0b56D40bDd4180177E7308f2F23fe6b5B8B5",
    "0x4d108C7CD636f59975ce107506ABa50fab2eAe19",
    "0x871B58708A353ac15577099c01B2828F44646025",
    "0xdCafA2e253EAdE5A9FA10905cd0C3d0c1E733fa5",
    "0x320b56B17289EDF0bAf913217e400e59a3E3DA4e",
    "0xe035346e6ED79e60325f43f61038Ac0AaD582161",
    "0xab2510aa06cc90d6ca9766609bc764178399cffa",
    "0x97b41b6f38b0c88dbe881046486f2fd6a9542315",
    "0x410b2090b12148a7ccea8f71c5a5da0711a681ce",
    "0x69fe295071e83e3bb9d05ca036b1f7e0f21c8438",
    "0x639867d57f5e1f0a7693db3b5ffac1c405383ef4",
    "0xe214fbe50e4b6eaecab0a143ddb5fec7860ab493",
    "0x507c92d9de182a6125ff2de4b46abffdabb23328",
    "0x0db44839682177b388849d9f968a5d3f8cc46742",
    "0xe9e779Cef3Ce8aF2eF26f30dA58cc618FB4EE8f5",
    "0x46583A32f0C7B6B6DE904eD6D2198DF4501b864c",
    "0xD6332751F43E722f82ea5Ff2Ed9Ff750C44464A5",
    "0x0e4Faf51995500F50e3150591237Dd3d11E5a7fa",
    "0x60eFA2B0234a70AD7f03A51a67AD93F1f11622eA",
    "0x2842d8Ae8A7Dd89c0107F02f1e0e1db50103Ca2e",
    "0x876801319ee837DbC494f6B1D87B73fF2fb80C25",
    "0x00041Fdf9923B0A51Af2aDdd0079A2b698917423",
    "0xa20F37746c03721395Cec3002b14ccBAA8a35944",
    "0xb021e46581e6685B214edD04487924EcBE39f288",
    "0xCeBc5e810f9b3b0581a29B35b0173aF86F7E11f6",
    "0xF7A9bc76E280A8dAcC1C965cADA79dC9DD9Bf209",
    "0x7638F7d904B6af3BF25917D306C7A52CC22d949c",
    "0x59143cfE852970341267B5A24F4A74521c26bD22",
    "0xAe049D38183C3A53543E1CF5AD2032366742080f",
    "0x7f8c46a165E87aeb244f0205E3Dae572907588B5",
    "0xd49394c7442c499382976fd2b524c787d6a2b167",
    "0xeeb570cCd8c17bc38988C04a0678Ea85593219d4"
  ]
  
async function main() {
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
  
    const prices = await getMaticPrices();
    const tokens = {};
    const poolInfos = await Promise.all(Address.map(a => loadAdamantPoolInfo(App, tokens, prices, a)));
    let tvl = 0, userTvl = 0
    for(const p of poolInfos.filter(p => p))
    {
      printAdamantContract(p);
      if (!isNaN(p.poolPrices.tvl)) tvl += p.poolPrices.tvl;
      if (!isNaN(p.userStaked * p.poolPrices.price)) userTvl += p.userStaked * p.poolPrices.price;
    }
    _print_bold(`\nTotal Value Locked: $${formatMoney(tvl)}`);
    if (userTvl > 0) {
      _print_bold(`You are staking a total of $${formatMoney(userTvl)}`);
    }
  
    hideLoading();
  }
  
  async function loadAdamantPoolInfo(App, tokens, prices, contractAddress) {
    try {
      const contract = await new ethers.Contract(contractAddress, MATIC_ADAMANT_VAULT_TOKEN_ABI, App.provider);
      const vault = await getMaticToken(App, contractAddress, contractAddress);
      var newTokenAddresses = vault.tokens.filter(x => !getParameterCaseInsensitive(tokens, x));
      for (const address of newTokenAddresses) {
          tokens[address] = await getMaticToken(App, address, contractAddress);
      }
      const balance = await contract.balance() / 1e18;
      const totalSupply = await contract.totalShares() / 1e18;
      const ppfs = await contract.getRatio() / 1e18;
      const userStaked = await contract.balanceOf(App.YOUR_ADDRESS) / 1e18;
      const poolPrices = getPoolPrices(tokens, prices, vault, "matic");
      return { vault, poolPrices, userStaked, ppfs, totalSupply }
    }
    catch (err) {
      console.log(contractAddress, err);
      return null;
    }
  }
  
  async function printAdamantContract(poolInfo) {
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
  