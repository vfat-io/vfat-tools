const ArbitrumTokens = [
  { "id": "weth","symbol": "WETH", "contract": "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1" },
  { "id": "dodo","symbol": "DODO", "contract": "0x69eb4fa4a2fbd498c257c57ea8b7655a2559a581" },
  { "id": "wrapped-bitcoin","symbol": "WBTC", "contract": "0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f" },
  { "id": "usd-coin","symbol": "USDC", "contract": "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8" },
  { "id": "usd-coin","symbol": "USDC", "contract": "0xaf88d065e77c8cc2239327c5edb3a432268e5831" },
  { "id": "tether","symbol": "USDT", "contract": "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9" },
  { "id": "tether","symbol": "USDT", "contract": "0xEC13336bbd50790a00CDc0fEddF11287eaF92529" },  //this gmUSD and its temporary
  { "id": "dai","symbol": "DAI", "contract": "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1" },
  { "id": "dai","symbol": "DAI", "contract": "0xd85E038593d7A098614721EaE955EC2022B9B91B" },    //this gDAI and its temporary
  { "id": "overnight-dai","symbol": "DAI+", "contract": "0xeb8e93a0c7504bffd8a8ffa56cd754c63aaebfe8" },
  { "id": "arbinyan","symbol": "NYAN", "contract": "0xed3fb761414da74b74f33e5c5a1f78104b188dfc" },
  { "id": "wrapped-ether", "symbol": "WETH", "contract": "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"},
  { "id": "sushi", "symbol": "SUSHI", "contract": "0xd4d42F0b6DEF4CE0383636770eF773390d85c61A"},
  { "id": "badger-dao", "symbol": "BADGER", "contract": "0xBfa641051Ba0a0Ad1b0AcF549a89536A0D76472E"},
  { "id": "mcdex", "symbol": "MCB", "contract": "0x4e352cF164E64ADCBad318C3a1e222E9EBa4Ce42"},
  { "id": "xdollar", "symbol": "XDO", "contract": "0x9ef758ac000a354479e538b8b2f01b917b8e89e7"},
  { "id": "hundred-finance", "symbol": "HND", "contract": "0x10010078a54396f62c96df8532dc2b4847d47ed3"},
  { "id": "chainlink", "symbol": "LINK", "contract": "0xf97f4df75117a78c1A5a0DBb814Af92458539FB4"},
  { "id": "magic-internet-money", "symbol": "MIM", "contract": "0xFEa7a6a0B346362BF88A9e4A88416B77a57D6c2A"},
  { "id": "dopex", "symbol": "DPX", "contract": "0x6C2C06790b3E3E3c38e12Ee22F8183b37a13EE55"},
  { "id": "dopex-rebate-token", "symbol": "RDPX", "contract": "0x32Eb7902D4134bf98A28b963D26de779AF92A212"},
  { "id": "curve-dao-token", "symbol": "CRV", "contract": "0x11cDb42B0EB46D95f990BeDD4695A6e3fA034978"},
  { "id": "synapse-2", "symbol": "SYN", "contract": "0x080F6AEd32Fc474DD5717105Dba5ea57268F46eb"},
  { "id": "pickle-finance", "symbol": "PICKLE", "contract": "0x965772e0E9c84b6f359c8597C891108DcF1c5B1A"},
  { "id": "saddle-finance", "symbol": "SDL", "contract": "0x75c9bc761d88f70156daf83aa010e84680baf131"},
  { "id": "frax", "symbol": "FRAX", "contract": "0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F"},
  { "id": "governance-ohm", "symbol": "gOHM", "contract": "0x8D9bA570D6cb60C7e3e0F31343Efe75AB8E65FB1"},
  { "id": "stargate-finance", "symbol": "STG", "contract": "0x6694340fc020c5E6B96567843da2df01b2CE1eb6"},
  { "id": "jones-dao", "symbol": "JONES", "contract": "0x10393c20975cF177a3513071bC110f7962CD67da" },
  { "id": "impermax", "symbol": "IMX", "contract": "0x9c67ee39e3c4954396b9142010653f17257dd39c" },
  { "id": "hop-protocol", "symbol": "HOP", "contract": "0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc" },
  { "id": "solidlizard", "symbol": "SLIZ", "contract": "0x463913D3a3D3D291667D53B8325c598Eb88D3B0e" },
  { "id": "gmx", "symbol": "GMX", "contract": "0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a" },
  { "id": "vela-token", "symbol": "VELA", "contract": "0x088cd8f5ef3652623c22d48b1605dcfe860cd704" },
  { "id": "stabilize", "symbol": "STBZ", "contract": "0x2C110867CA90e43D372C1C2E92990B00EA32818b" },
  { "id": "gmd-protocol", "symbol": "GMD", "contract": "0x4945970efeec98d393b4b979b9be265a3ae28a8b" },
  { "id": "zyberswap", "symbol": "ZYB", "contract": "0x3b475f6f2f41853706afc9fa6a6b8c5df1a2724c" },
  { "id": "swapfish", "symbol": "FISH", "contract": "0xb348b87b23d5977e2948e6f36ca07e1ec94d7328" },
  { "id": "staked-ether", "symbol": "STETH", "contract": "0x5979D7b546E38E414F7E9822514be443A4800529" },
  { "id": "sterling-finance", "symbol": "STR", "contract": "0x5DB7b150c5F38c5F5db11dCBDB885028fcC51D68" },
  { "id": "ramses-exchange", "symbol": "RAM", "contract": "0xaaa6c1e32c55a7bfa8066a6fae9b42650f262418" },
  { "id": "gains-network", "symbol": "GNS", "contract": "0x18c11FD286C5EC11c3b683Caa813B77f5163A122" },
  { "id": "dola-usd", "symbol": "DOLA", "contract": "0x6a7661795c374c0bfc635934efaddff3a7ee23b6" },
  { "id": "mimatic", "symbol": "MAI", "contract": "0x3F56e0c36d275367b8C502090EDF38289b3dEa0d" },
  { "id": "camelot-token", "symbol": "GRAIL", "contract": "0x3d9907f9a368ad0a51be60f7da3b97cf940982d8" },
  { "id": "liquity-usd", "symbol": "LUSD", "contract": "0x93b346b6bc2548da6a1e7d98e9a421b42541425b" },
  { "id": "dei-token", "symbol": "DEI", "contract": "0xDE1E704dae0B4051e80DAbB26ab6ad6c12262DA0" },
  { "id": "yieldfarming-index", "symbol": "YFX", "contract": "0xaae0c3856e665ff9b3e2872b6d75939d810b7e40" },
  { "id": "liquity", "symbol": "LQTY", "contract": "0xfb9E5D956D889D91a82737B9bFCDaC1DCE3e1449" },
  { "id": "radiant-capital", "symbol": "RDNT", "contract": "0x3082CC23568eA640225c2467653dB90e9250AaA0" },
  { "id": "ibuffer-token", "symbol": "BFR", "contract": "0x1a5b0aaf478bf1fda7b934c76e7692d722982a6d" },
  { "id": "arbitrum", "symbol": "ARB", "contract": "0x912ce59144191c1204e64559fe8253a0e49e6548" },
  { "id": "lodestar", "symbol": "LODE", "contract": "0xf19547f9ed24aa66b03c3a552d181ae334fbb8db" },
  { "id": "the-ennead", "symbol": "NEADRAM", "contract": "0x40301951af3f80b8c1744ca77e55111dd3c1dba1" },
  { "id": "gnd-protocol", "symbol": "GND", "contract": "0xd67a097dce9d4474737e6871684ae3c05460f571" },
  { "id": "chronos-finance", "symbol": "CHR", "contract": "0x15b2fb8f08e4ac1ce019eadae02ee92aedf06851" },
  { "id": "lido-dao", "symbol": "LDO", "contract": "0x13ad51ed4f1b7e9dc168d8a00cb3f4ddd85efa60" },
  { "id": "the-graph", "symbol": "GRT", "contract": "0x9623063377AD1B27544C965cCd7342f7EA7e88C7" },
  { "id": "frax-ether", "symbol": "FRXETH", "contract": "0x178412e79c25968a32e89b11f63B33F733770c2A" },
  { "id": "wombat-exchange", "symbol": "WOM", "contract": "0x7B5EB3940021Ec0e8e463D5dBB4B7B09a89DDF96" },
  { "id": "bob", "symbol": "BOB", "contract": "0xb0b195aefa3650a6908f15cdac7d92f8a5791b0b" },
  { "id": "staked-frax-ether", "symbol": "SFRXETH", "contract": "0x95ab45875cffdba1e5f451b950bc2e42c0053f39" },
  { "id": "jones-usdc", "symbol": "JUSDC", "contract": "0xe66998533a1992ece9ea99cdf47686f4fc8458e0" },
  { "id": "usd", "symbol": "USD+", "contract": "0xe80772eaf6e2e18b651f160bc9158b2a5cafca65" }
];

const ArbitrumNovaTokens = [
  { "id": "arbitrum","symbol": "ARB", "contract": "0xf823C3cD3CeBE0a1fA952ba88Dc9EEf8e0Bf46AD" },
  { "id": "usd-coin","symbol": "USDC", "contract": "0x750ba8b76187092B0D1E87E28daaf484d1b5273b" },
  { "id": "weth","symbol": "WETH", "contract": "0x722E8BdD2ce80A4422E880164f2079488e115365" },
  { "id": "sushi","symbol": "SUSHI", "contract": "0xfe60A48a0bCf4636aFEcC9642a145D2F241A7011" }
];

const AstarTokens = [
  { "id": "tether", "symbol": "USDT", "contract": "0x3795C36e7D12A8c252A20C5a7B455f7c57b60283" },
  { "id": "usd-coin", "symbol": "USDC", "contract": "0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98" },
  { "id": "weth", "symbol": "WETH", "contract": "0x81ECac0D6Be0550A00FF064a4f9dd2400585FE9c" },
  { "id": "astar", "symbol": "ASTR", "contract": "0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720" }
];

const AuroraTokens = [
  { "id": "weth", "symbol": "WETH", "contract": "0xC9BdeEd33CD01541e1eeD10f90519d2C06Fe3feB"},
  { "id": "wrapped-near", "symbol": "WNEAR", "contract": "0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d"},
  { "id": "polaris-token", "symbol": "PLRS", "contract": "0xD93d770C123a419D4c48206F201Ed755dEa3037B"},
  { "id": "terra-luna", "symbol": "LUNA", "contract": "0xC4bdd27c33ec7daa6fcfd8532ddB524Bf4038096"},
  { "id": "frax", "symbol": "FRAX", "contract": "0xDA2585430fEf327aD8ee44Af8F1f989a2A91A3d2"},
  { "id": "rose", "symbol": "ROSE", "contract": "0xdcd6d4e2b3e1d1e1e6fa8c21c8a323dcbecff970"},
  { "id": "nearpad", "symbol": "PAD", "contract": "0x885f8CF6E45bdd3fdcDc644efdcd0AC93880c781"},
  { "id": "usd-coin", "symbol": "USDC", "contract": "0xb12bfca5a55806aaf64e99521918a4bf0fc40802"},
  { "id": "dai", "symbol": "DAI", "contract": "0xe3520349f477a5f6eb06107066048508498a291b"},
  { "id": "dai", "symbol": "DAI", "contract": "0x53810e4c71bc89d39df76754c069680b26b20c3d"},
  { "id": "terrausd", "symbol": "UST", "contract": "0x5ce9F0B6AFb36135b5ddBF11705cEB65E634A9dC"},
  { "id": "mimatic", "symbol": "MIMATIC", "contract": "0xdFA46478F9e5EA86d57387849598dbFB2e964b02"},
  { "id": "tripolar", "symbol": "TRIPOLAR", "contract": "0x60527a2751A827ec0Adf861EfcAcbf111587d748"},
  { "id": "tribar", "symbol": "XTRI", "contract": "0x802119e4e253d5c19aa06a5d567c5a41596d6803"},
  { "id": "wrapped-bitcoin", "symbol": "WBTC", "contract": "0xF4eB217Ba2454613b15dBdea6e5f22276410e89e"}
];

const avaxTokens = [
  { "id": "avalanche-2","symbol": "AVAX","contract": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7" },
  { "id": "pangolin","symbol": "PNG", "contract": "0x60781C2586D68229fde47564546784ab3fACA982" },
  { "id": "weth","symbol": "WETH", "contract": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2" },
  { "id": "weth","symbol": "WETH.e", "contract": "0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab" },
  { "id": "dai","symbol": "DAI", "contract": "0xbA7dEebBFC5fA1100Fb055a87773e1E99Cd3507a" },
  { "id": "dai","symbol": "DAI.e", "contract": "0xd586e7f844cea2f87f50152665bcbc2c279d8d70" },
  { "id": "snowball-token","symbol": "SNOB", "contract": "0xc38f41a296a4493ff429f1238e030924a1542e50" },
  { "id": "sushi","symbol": "SUSHI", "contract": "0x39cf1BD5f15fb22eC3D9Ff86b0727aFc203427cc" },
  { "id": "benqi","symbol": "QI", "contract": "0x8729438eb15e2c8b576fcc6aecda6a148776c0f5" },
  { "id": "joe","symbol": "JOE", "contract": "0x6e84a6216ea6dacc71ee8e6b0a5b7322eebc0fdd" },
  { "id": "tether", "symbol": "USDT.e", "contract": "0xc7198437980c041c805a1edcba50c1ce5db95118" },
  { "id": "tether", "symbol": "USDT.e", "contract": "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7" },
  { "id": 'uniswap', "symbol": 'UNI', "contract": '0x8eBAf22B6F053dFFeaf46f4Dd9eFA95D89ba8580' },
  { "id": 'chainlink', "symbol": 'LINK', "contract": '0x5947BB275c521040051D82396192181b413227A3' },
  { "id": 'aave', "symbol": 'AAVE', "contract": '0x63a72806098Bd3D9520cC43356dD78afe5D386D9' },
  { "id": 'yearn-finance', "symbol": 'YFI', "contract": '0x9eAaC1B23d935365bD7b542Fe22cEEe2922f52dc' },
  { "id": 'usd-coin', "symbol": 'USDC', "contract": '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664' },
  { "id": 'avalaunch', "symbol": 'XAVA', "contract": '0xd1c3f94DE7e5B45fa4eDBBA472491a9f4B166FC4' },
  { "id": 'yield-yak', "symbol": 'YAK', "contract": '0x59414b3089ce2AF0010e7523Dea7E2b35d776ec7' },
  { "id": 'sherpa', "symbol": 'SHERPA', "contract": '0xa5E59761eBD4436fa4d20E1A27cBa29FB2471Fc6' },
  { "id": 'bitcoin', "symbol": 'WBTC', "contract": '0x50b7545627a5162F82A992c33b87aDc75187B218' },
  { "id": 'sushi', "symbol": 'SUSHI.e', "contract": '0x37B608519F91f70F2EeB0e5Ed9AF4061722e4F76' },
  { "id": 'penguin-finance', "symbol": 'PEFI', "contract": '0xe896CDeaAC9615145c0cA09C8Cd5C25bced6384c' },
  { "id": 'xdollar', "symbol": 'XDO', "contract": '0x9ef758ac000a354479e538b8b2f01b917b8e89e7' },
  { "id": 'xdollar-stablecoin', "symbol": 'xUSD', "contract": '0x3509f19581afedeff07c53592bc0ca84e4855475' },
  { "id": 'wrapped-avax', "symbol": 'WAVAX', "contract": '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7' },
  { "id": "galaxy-oberon", "symbol": "OBERON", "contract": "0xc979E70611D997Aa109528c6A9aa73D82Eaa2881"},
  { "id": "frax", "symbol": "FRAX", "contract": "0xDC42728B0eA910349ed3c6e1c9Dc06b5FB591f98"},
  { "id": "zabu-token", "symbol": "ZABU", "contract": "0xDd453dBD253fA4E5e745047d93667Ce9DA93bbCF"},
  { "id": "tundra-token", "symbol": "TUNDRA", "contract": "0x21c5402C3B7d40C89Cc472C9dF5dD7E51BbAb1b1"},
  { "id": "verso", "symbol": "VSO", "contract": "0x846D50248BAf8b7ceAA9d9B53BFd12d7D7FBB25a"},
  { "id": "elk-finance", "symbol": "ELK", "contract": "0xE1C110E1B1b4A1deD0cAf3E42BfBdbB7b5d7cE1C"},
  { "id": "gondola-finance", "symbol": "GDL", "contract": "0xD606199557c8Ab6F4Cc70bD03FaCc96ca576f142"},
  { "id": "lydia-finance", "symbol": "LYD", "contract": "0x4C9B4E1AC6F24CdE3660D5E4Ef1eBF77C710C084"},
  { "id": "canary", "symbol": "CNR", "contract": "0x8D88e48465F30Acfb8daC0b3E35c9D6D7d36abaf"},
  { "id": "magic-internet-money", "symbol": "MIM", "contract": "0x130966628846BFd36ff31a822705796e8cb8C18D"},
  { "id": "wonderland", "symbol": "TIME", "contract": "0xb54f16fB19478766A268F172C9480f8da1a7c9C3"},
  { "id": "eleven-finance", "symbol": "ELE", "contract": "0xAcD7B3D9c10e97d0efA418903C0c7669E702E4C0"},
  { "id": "allianceblock", "symbol": "WALBT", "contract": "0x9E037dE681CaFA6E661e6108eD9c2bd1AA567Ecd"},
  { "id": "avme", "symbol": "AVME", "contract": "0x1ECd47FF4d9598f89721A2866BFEb99505a413Ed"},
  { "id": "yetiswap", "symbol": "YTS", "contract": "0x488F73cddDA1DE3664775fFd91623637383D6404"},
  { "id": "cycle-token", "symbol": "CYCLE", "contract": "0x81440C939f2C1E34fc7048E518a637205A632a74"},
  { "id": "storm-token", "symbol": "STORM", "contract": "0x6AFD5A1ea4b793CC1526d6Dc7e99A608b356eF7b"},
  { "id": "baguette", "symbol": "BAG", "contract": "0xa1144a6A1304bd9cbb16c800F7a867508726566E"},
  { "id": "olivecash", "symbol": "OLIVE", "contract": "0x617724974218A18769020A70162165A539c07E8a"},
  { "id": "yay-games", "symbol": "YAY", "contract": "0x01C2086faCFD7aA38f69A6Bd8C91BEF3BB5adFCa"},
  { "id": "aave", "symbol": "AAVE.e", "contract": "0x63a72806098Bd3D9520cC43356dD78afe5D386D9"},
  { "id": "orcadao", "symbol": "ORCA", "contract": "0x8B1d98A91F853218ddbb066F20b8c63E782e2430"},
  { "id": "orca-avai", "symbol": "AVAI", "contract": "0x346a59146b9b4a77100d369a3d18e8007a9f46a6"},
  { "id": "synapse-2", "symbol": "SYN", "contract": "0x1f1E7c893855525b303f99bDF5c3c05Be09ca251"},
  { "id": "sonic-token", "symbol": "SONIC", "contract": "0x4Aca0ad6357b918e3d06BB1a0BCC403619177523"},
  { "id": "topshelf-finance", "symbol": "LIQR", "contract": "0x33333ee26a7d02e41c33828b42fb1e0889143477"},
  { "id": "gmx", "symbol": "GMX", "contract": "0x62edc0692BD897D2295872a9FFCac5425011c661"},
  { "id": "avaware-usd", "symbol": "AUSD", "contract": "0x783C08b5F26E3daf8C4681F3bf49844e425b6393"},
  { "id": "embr", "symbol": "EMBR", "contract": "0xD81D45E7635400dDD9c028839e9a9eF479006B28"},
  { "id": "avaware", "symbol": "AVE", "contract": "0x78ea17559B3D2CF85a7F9C2C704eda119Db5E6dE"},
  { "id": "usd-coin", "symbol": "USDC", "contract": "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E"},
  { "id": "beefy-finance", "symbol": "BIFI", "contract": "0xd6070ae98b8069de6b494332d1a1a81b6179d960"},
  { "id": "stargate-finance", "symbol": "STG", "contract": "0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590"},
  { "id": "platypus-finance", "symbol": "PTP", "contract": "0x22d4002028f537599be9f666d1c4fa138522f9c8"},
  { "id": "vector-finance", "symbol": "VTX", "contract": "0x5817d4f0b62a59b17f75207da1848c2ce75e7af4"},
  { "id": "yusd-stablecoin", "symbol": "YUSD", "contract": "0x111111111111ed1d73f860f57b2798b683f2d325"}
]

const BaseTokens = [
  { "id": "weth", "symbol": "WETH", "contract": "0x4200000000000000000000000000000000000006"},
  { "id": "bridged-usd-coin-base", "symbol": "USDBC", "contract": "0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca"},
  { "id": "dai", "symbol": "DAI", "contract": "0x50c5725949a6f0c72e6c4a641f24049a917db0cb"},
  { "id": "dai", "symbol": "DAI", "contract": "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb"},
  { "id": "balancer", "symbol": "BAL", "contract": "0x7c6b91d9be155a6db01f749217d76ff02a7227f2"},
  { "id": "ethos-reserve-note", "symbol": "ERN", "contract": "0xa334884bF6b0A066d553D19e507315E839409e62"},
  { "id": "usd", "symbol": "USD+", "contract": "0xB79DD08EA68A908A97220C76d19A6aA9cBDE4376"},
  { "id": "baseswap", "symbol": "BSWAP", "contract": "0x78a087d713be963bf307b18f2ff8122ef9a63ae9"},
  { "id": "basex", "symbol": "BSX", "contract": "0xd5046b976188eb40f6de40fb527f89c05b323385"},
  { "id": "cookiebase", "symbol": "COOKIE", "contract": "0x614747C53CB1636b4b962E15e1D66D3214621100"},
  { "id": "toshi", "symbol": "TOSHI", "contract": "0x8544FE9D190fD7EC52860abBf45088E81Ee24a8c"},
  { "id": "mimatic", "symbol": "MAI", "contract": "0xbf1aeA8670D2528E08334083616dD9C5F3B087aE"},
  { "id": "curve-dao-token", "symbol": "CRV", "contract": "0x8Ee73c484A26e0A5df2Ee2a4960B789967dd0415"},
  { "id": "overnight-dai", "symbol": "DAI+", "contract": "0x65a2508C429a6078a7BC2f7dF81aB575BD9D9275"},
  { "id": "dola-usd", "symbol": "DOLA", "contract": "0x4621b7a9c75199271f773ebd9a499dbd165c3191"},
  { "id": "usd-coin", "symbol": "USDC", "contract": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"},
  { "id": "aerodrome-finance", "symbol": "AERO", "contract": "0x940181a94A35A4569E4529A3CDfB74e38FD98631"},
  { "id": "wrapped-bmx-liquidity-token", "symbol": "WBLT", "contract": "0x4E74D4Db6c0726ccded4656d0BCE448876BB4C7A"},
  { "id": "yearn-finance", "symbol": "YFI", "contract": "0x9EaF8C1E34F05a589EDa6BAfdF391Cf6Ad3CB239"},
  { "id": "bmx", "symbol": "BMX", "contract": "0x548f93779fbc992010c07467cbaf329dd5f059b7"},
  { "id": "friendtech33", "symbol": "FTW", "contract": "0x3347453ced85bd288d783d85cdec9b01ab90f9d8"},
  { "id": "wrapped-bmx-liquidity-token", "symbol": "WBLT", "contract": "0x4e74d4db6c0726ccded4656d0bce448876bb4c7a"},
  { "id": "coinbase-wrapped-staked-eth", "symbol": "CBETH", "contract": "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22"},
  { "id": "wrapped-steth", "symbol": "WSTETH", "contract": "0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452"},
  { "id": "tbtc", "symbol": "tBTC", "contract": "0x236aa50979D5f3De3Bd1Eeb40E81137F22ab794b"},
  { "id": "tether", "symbol": "USDT", "contract": "0x119c8c5fBbD06FcEfAFA4eFa5cb5875D4271F65a"},
  { "id": "ajna-protocol", "symbol": "AJNA", "contract": "0x94d0e14C60E6AE5Ac1267b2fe1cCa2C45D56f836"},
  { "id": "ajna-protocol", "symbol": "AJNA", "contract": "0xf0f326af3b1Ed943ab95C29470730CC8Cf66ae47"},
  { "id": "base-velocimeter", "symbol": "BVM", "contract": "0xd386a121991e51eab5e3433bf5b1cf4c8884b47a"},
  { "id": "havven", "symbol": "SNX", "contract": "0x22e6966B799c4D5B13BE962E1D117b56327FDa66"}
];

const BlastTokens = [
  { "id": "weth", "symbol": "WETH", "contract": "0x4300000000000000000000000000000000000004"}
];

const BobaTokens = [
  { "id": "weth", "symbol": "WETH", "contract": "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000"},
  { "id": "synapse-2", "symbol": "SYN", "contract": "0xb554A55358fF0382Fb21F0a478C3546d1106Be8c"}
];

const bscTokens = [
  { "id": "wbnb", "symbol": "wbnb","contract": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" },
  { "id": "arth", "symbol": "ARTH","contract": "0xB69A424Df8C737a122D0e60695382B3Eec07fF4B" },
  { "id": "mahadao", "symbol": "MAHA","contract": "0xCE86F7fcD3B40791F63B86C3ea3B8B355Ce2685b" },
  { "id": "binance-usd", "symbol": "busd", "contract": "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"  },
  { "id": "pancakeswap-token", "symbol": "CAKE", "contract": "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82"  },
  { "id": "beefy-finance", "symbol": "BIFI", "contract": "0xca3f508b8e4dd382ee878a314789373d80a5190a" },
  { "id": "bdollar-share", "symbol": "sBDO", "contract": "0x0d9319565be7f53cefe84ad201be3f40feae2740"  },
  { "id": "belugaswap","symbol": "BELUGA", "contract": "0x181de8c57c4f25eba9fd27757bbd11cc66a55d31" },
  { "id": "chainlink","symbol": "LINK","contract":"0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd" },
  { "id": "bscex","symbol": "BSCX", "contract": "0x5ac52ee5b2a633895292ff6d8a89bb9190451587" },
  { "id": "binance-eth","symbol": "BETH", "contract": "0x250632378e573c6be1ac2f97fcdf00515d0aa91b" },
  { "id": "tether","symbol": "USDT", "contract": "0x55d398326f99059fF775485246999027B3197955" },
  { "id": "bitcoin-bep2","symbol": "BTCB", "contract": "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c" },
  { "id": "ethereum","symbol": "ETH", "contract": "0x2170Ed0880ac9A755fd29B2688956BD959F933F8" },
  { "id": "bakerytoken","symbol": "BAKE", "contract": "0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5" },
  { "id": "goose-finance","symbol": "EGG", "contract": "0xf952fc3ca7325cc27d15885d37117676d25bfda6" },
  { "id": "dai","symbol": "DAI", "contract": "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3" },
  { "id": "auto","symbol": "AUTO", "contract": "0xa184088a740c695e156f91f5cc086a06bb78b827" },
  { "id": "wault-finance","symbol": "WAULT", "contract": "0x6ff2d9e5891a7a7c554b80e0d1b791483c78bce9" },
  { "id": "swipe","symbol": "SXP", "contract": "0x47BEAd2563dCBf3bF2c9407fEa4dC236fAbA485A" },
  { "id": "vai","symbol": "VAI", "contract": "0x4bd17003473389a42daf6a0a729f6fdb328bbbd7" },
  { "id": "venus","symbol": "XVS", "contract": "0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63" },
  { "id": "terrausd", "symbol": "UST", "contract": "0x23396cf899ca06c4472205fc903bdb4de249d6fc"},
  { "id": "cardano", "symbol": "ADA", "contract": "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47"},
  { "id": "bearn-fi", "symbol": "BFI", "contract": "0x81859801b01764d4f0fa5e64729f5a6c3b91435b"},
  { "id": "polkadot", "symbol": "DOT", "contract": "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402"},
  { "id": "vbswap", "symbol": "VBSWAP", "contract": "0x4f0ed527e8a95ecaa132af214dfd41f30b361600"},
  { "id": "bdollar", "symbol": "BDO", "contract": "0x190b589cf9fb8ddeabbfeae36a813ffb2a702454"},
  { "id": "julswap", "symbol": "JULD", "contract": "0x5a41f637c3f7553dba6ddc2d3ca92641096577ea"},
  { "id": "the-famous-token", "symbol": "TFT", "contract": "0xA9d3fa202b4915c3eca496b0e7dB41567cFA031C"},
  { "id": "shield-protocol", "symbol": "SHIELD", "contract": "0x60b3bc37593853c04410c4f07fe4d6748245bf77"},
  { "id": "lead-token", "symbol": "LEAD", "contract": "0x2ed9e96EDd11A1fF5163599A66fb6f1C77FA9C66"},
  { "id": "sparkpoint", "symbol": "SRK", "contract": "0x3B1eC92288D78D421f97562f8D479e6fF7350a16"},
  { "id": "curate", "symbol": "XCUR", "contract": "0x708C671Aa997da536869B50B6C67FA0C32Ce80B2"},
  { "id": "uniswap", "symbol": "UNI", "contract": "0xBf5140A22578168FD562DCcF235E5D43A02ce9B1"},
  { "id": "tsuki-dao", "symbol": "TSUKI", "contract": "0x3fd9e7041c45622e8026199a46f763c9807f66f3"},
  { "id": "panda-yield", "symbol": "BBOO", "contract": "0xd909840613fcb0fadc6ee7e5ecf30cdef4281a68"},
  { "id": "cryptex", "symbol": "CRX", "contract": "0x97a30C692eCe9C317235d48287d23d358170FC40"},
  { "id": "polis", "symbol": "POLIS", "contract": "0xb5bea8a26d587cf665f2d78f077cca3c7f6341bd"},
  { "id": "tether", "symbol": "USDT", "contract": "0x049d68029688eAbF473097a2fC38ef61633A3C7A"},
  { "id": "swirl-cash", "symbol": "SWIRL", "contract": "0x52d86850bc8207b520340b7e39cdaf22561b9e56"},
  { "id": "squirrel-finance", "symbol": "NUTS", "contract": "0x8893D5fA71389673C5c4b9b3cb4EE1ba71207556"},
  { "id": "usd-coin", "symbol": "USDC", "contract": "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d"},
  { "id": "iron-stablecoin", "symbol": "IRON", "contract": "0x7b65b489fe53fce1f6548db886c08ad73111ddd8" },
  { "id": "midas-dollar", "symbol": "MDO", "contract": "0x35e869b7456462b81cdb5e6e42434bd27f3f788c" },
  { "id": "slime-finance", "symbol": "SLME", "contract": "0x4fcfa6cc8914ab455b5b33df916d90bfe70b6ab1" },
  { "id": "bolt-true-dollar", "symbol": "BTD", "contract": "0xd1102332a213e21faf78b69c03572031f3552c33" },
  { "id": "mdex", "symbol": "MDX", "contract": "0x9C65AB58d8d978DB963e63f2bfB7121627e3a739" },
  { "id": "ice-token", "symbol": "ICE", "contract": "0xf16e81dce15b08f326220742020379b855b87df9"},
  { "id": "alpaca-finance", "symbol": "ALPACA", "contract": "0x8f0528ce5ef7b51152a59745befdd91d97091d2f"},
  { "id": "blue-planetfinance", "symbol": "AQUA", "contract": "0x72B7D61E8fC8cF971960DD9cfA59B8C829D91991"},
  { "id": "dogecoin", "symbol": "DOGE", "contract": "0xbA2aE424d960c26247Dd6c32edC70B295c744C43"},
  { "id": "degen", "symbol": "DGNZ", "contract": "0xb68a67048596502A8B88f1C10ABFF4fA99dfEc71"},
  { "id": "degencomp", "symbol": "aDGNZ", "contract": "0xe8B9b396c59A6BC136cF1f05C4D1A68A0F7C2Dd7"},
  { "id": "gambit", "symbol": "GMT", "contract": "0x99e92123eb77bc8f999316f622e5222498438784"},
  { "id": "alien-worlds-bsc", "symbol": "TLM", "contract": "0x2222227e22102fe3322098e4cbfe18cfebd57c95"},
  { "id": "ten", "symbol": "TENFI", "contract": "0xd15c444f1199ae72795eba15e8c1db44e47abf62"},
  { "id": "pancake-bunny", "symbol": "BUNNY", "contract": "0xc9849e6fdb743d08faee3e34dd2d1bc69ea11a51"},
  { "id": "swampy", "symbol": "SWAMP", "contract": "0xc5A49b4CBe004b6FD55B30Ba1dE6AC360FF9765d"},
  { "id": "ellipsis", "symbol": "EPS", "contract": "0xA7f552078dcC247C2684336020c03648500C6d9F"},
  { "id": "ketchup-finance", "symbol": "KETCHUP", "contract": "0x714a84632ed7edbbbfeb62dacf02db4beb4c69d9"},
  { "id": "bnbc", "symbol": "BNBC", "contract": "0x31b5d91806af3364678715f4c5bf50c1e3bae10a"},
  { "id": "thoreum", "symbol": "THOREUM", "contract": "0x580de58c1bd593a43dadcf0a739d504621817c05"},
  { "id": "ruler-protocol", "symbol": "RULER", "contract": "0x7EA2be2df7BA6E54B1A9C70676f668455E329d29"},
  { "id": "boringdao-old", "symbol": "BOR", "contract": "0x92D7756c60dcfD4c689290E8A9F4d263b3b32241"},
  { "id": "nerve-finance", "symbol": "NRV", "contract": "0x42F6f551ae042cBe50C739158b4f0CAC0Edb9096"},
  { "id": "trident", "symbol": "TRIDENT", "contract": "0x66D7661cdcdF4adA7dA239Af6Fc8C4FE73E79D22"},
  { "id": "apeswap-finance", "symbol": "BANANA", "contract": "0x603c7f932ed1fc6575303d8fb018fdcbb0f39a95"},
  { "id": "matic-network","symbol": "MATIC","contract": "0xCC42724C6683B7E57334c4E856f4c9965ED682bD" },
  { "id": "cosmos","symbol": "ATOM","contract": "0x0Eb3a705fc54725037CC9e008bDede697f62F335" },
  { "id": "reef-finance","symbol": "REEF","contract": "0xF21768cCBC73Ea5B6fd3C687208a7c2def2d966e" },
  { "id": "zcore-finance","symbol": "ZEFI","contract": "0x0288D3E353fE2299F11eA2c2e1696b4A648eCC07" },
  { "id": "binance-peg-litecoin","symbol": "LTC","contract": "0x4338665cbb7b2485a8855a139b75d5e34ab0db94" },
  { "id": "tron-bsc","symbol": "TRX","contract": "0x85EAC5Ac2F758618dFa09bDbe0cf174e7d574D5B" },
  { "id": "binance-peg-xrp","symbol": "XRP","contract": "0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe" },
  { "id": "galaxy-triton", "symbol": "TRITON", "contract": "0x9cf4009e62429Db3F57Aa9e7e8E898427cF6865f" },
  { "id": "biswap", "symbol": "BSW", "contract": "0x965f527d9159dce6288a2219db51fc6eef120dd1"},
  { "id": "krown", "symbol": "KRW", "contract": "0x1446f3cedf4d86a9399e49f7937766e6de2a3aab"},
  { "id": "pancake-hunny", "symbol": "HUNNY", "contract": "0x565b72163f17849832A692A3c5928cc502f46D69"},
  { "id": "dodo", "symbol": "DODO", "contract": "0x67ee3cb086f8a16f34bee3ca72fad36f7db929e2"},
  { "id": "galaxy-oberon", "symbol": "OBERON", "contract": "0xc979E70611D997Aa109528c6A9aa73D82Eaa2881" },
  { "id": "gem", "symbol": "GEM", "contract": "0x9fb4DEF63f8caEC83Cb3EBcC22Ba0795258C988a" },
  { "id": "shell", "symbol": "SHELL", "contract": "0x01c16da6E041Cf203959624Ade1F39652973D0EB" },
  { "id": "token-dforce-usd", "symbol": "USX", "contract": "0xb5102cee1528ce2c760893034a4603663495fd72" },
  { "id": "synapse-2", "symbol": "SYN", "contract": "0xa4080f1778e69467E905B8d6F72f6e441f9e9484" },
  { "id": "mars-ecosystem-token", "symbol": "XMS", "contract": "0x7859b01bbf675d67da8cd128a50d155cd881b576" },
  { "id": "topshelf-finance", "symbol": "LIQR", "contract": "0x33333ee26a7d02e41c33828b42fb1e0889143477" },
  { "id": "blockchain-adventurers-guild", "symbol": "BAG", "contract": "0x7c650f39d777F40120345314Ab8009D11F70c972" },
  { "id": "true-usd", "symbol": "TUSD", "contract": "0x14016e85a25aeb13065688cafb43044c2ef86784" },
  { "id": "ptokens-btc", "symbol": "PBTC", "contract": "0xed28a457a5a76596ac48d87c0f577020f6ea1c4c" },
  { "id": "neutrino", "symbol": "USDN", "contract": "0x03ab98f5dc94996f8c33e15cd4468794d12d41f9" },
  { "id": "greentrust", "symbol": "GNT", "contract": "0xf750a26eb0acf95556e8529e72ed530f3b60f348" },
  { "id": "killswitch", "symbol": "KSW", "contract": "0x270178366a592ba598c2e9d2971da65f7baa7c86" },
  { "id": "xbn", "symbol": "XBN", "contract": "0x547cbe0f0c25085e7015aa6939b28402eb0ccdac" },
  { "id": "lucky-lion", "symbol": "LUCKY", "contract": "0xc3d912863152e1afc935ad0d42d469e7c6b05b77" },
  { "id": "binance-peg-filecoin", "symbol": "FIL", "contract": "0x0d8ce2a99bb6e3b7db580ed848240e4a0f9ae153" },
  { "id": "rabbit-finance", "symbol": "RABBIT", "contract": "0x95a1199eba84ac5f19546519e287d43d2f0e1b41" },
  { "id": "humpback", "symbol": "HUMP", "contract": "0x453939C0270e9405876C7f047aDE3932FD2d7a51" },
  { "id": "ecio-space", "symbol": "ECIO", "contract": "0x327a3e880bf2674ee40b6f872be2050ed406b021" },
  { "id": "gmt-token", "symbol": "GMT", "contract": "0x7Ddc52c4De30e94Be3A6A0A2b259b2850f421989" },
  { "id": "axie-infinity", "symbol": "AXS", "contract": "0x715D400F88C167884bbCc41C5FeA407ed4D2f8A0" },
  { "id": "cryptoskates", "symbol": "CST", "contract": "0x368eb5efdca39126e8e76aae5187166de7c2766c" },
  { "id": "the-killbox-game", "symbol": "KBOX", "contract": "0x3523d58d8036b1c5c9a13493143c97aefc5ad422" },
  { "id": "orakler", "symbol": "ORKL", "contract": "0x36bc1f4d4af21df024398150ad39627fb2c8a847" },
  { "id": "lucky-block", "symbol": "LBLOCK", "contract": "0x2cd96e8c3ff6b5e01169f6e3b61d28204e7810bb" },
  { "id": "luna-rush", "symbol": "LUS", "contract": "0xde301d6a2569aefcfe271b9d98f318baee1d30a4" },
  { "id": "amethyst", "symbol": "AMES", "contract": "0xb9e05b4c168b56f73940980ae6ef366354357009" },
  { "id": "quartz-defi-ashare", "symbol": "ASHARE", "contract": "0xfa4b16b0f63f5a6d0651592620d585d308f749a4" },
  { "id": "stargate-finance", "symbol": "STG", "contract": "0xB0D502E938ed5f4df2E681fE6E419ff29631d62b" },
  { "id": "space-corsair-key", "symbol": "SCK", "contract": "0x227a3ef4d41d0215123f3197faa087bf71d2236a" },
  { "id": "dogs", "symbol": "DOGS", "contract": "0xdbdc73b95cc0d5e7e99dc95523045fc8d075fb9e" },
  { "id": "bamboo-defi", "symbol": "BAMBOO", "contract": "0x198abB2D13fAA2e52e577D59209B5c23c20CD6B3" },
  { "id": "babyswap", "symbol": "BABY", "contract": "0x53e562b9b7e5e94b81f10e96ee70ad06df3d2657" },
  { "id": "infinitypad", "symbol": "INFP", "contract": "0xfe82eff54a58c21ffc9523c4998d5dad84dcbd50" },
  { "id": "dextools", "symbol": "DEXT", "contract": "0xe91a8D2c584Ca93C7405F15c22CdFE53C29896E3" },
  { "id": "babylons", "symbol": "BABI", "contract": "0xec15a508a187e8ddfe572a5423faa82bbdd65120" },
  { "id": "seedify-fund", "symbol": "SFUND", "contract": "0x477bc8d23c634c154061869478bce96be6045d12" },
  { "id": "anonverse", "symbol": "ANON", "contract": "0x9a980a084d8d72b219e1c79d91faf06bec874d51" },
  { "id": "beglobaldao", "symbol": "GLBD", "contract": "0xd177e36377e71775d6f9956b3fdd0f02664c6996" },
  { "id": "pigs-2", "symbol": "PIGS", "contract": "0x9a3321e1acd3b9f6debee5e042dd2411a1742002" },
  { "id": "beglobaldao", "symbol": "GLBD", "contract": "0xd177e36377e71775d6f9956b3fdd0f02664c6996" },
  { "id": "level-governance", "symbol": "LGO", "contract": "0xBe2B6C5E31F292009f495DDBda88e28391C9815E" },
  { "id": "radiant-capital", "symbol": "RDNT", "contract": "0xf7DE7E8A6bd59ED41a4b5fe50278b3B7f31384dF" },
  { "id": "osk", "symbol": "OSK", "contract": "0x04fA9Eb295266d9d4650EDCB879da204887Dc3Da" }
]

const cantoTokens = [
  { "id": "note","symbol": "NOTE","contract": "0x4e71a2e537b7f9d9413d3991d37958c0b5e1e503" },
  { "id": "canto","symbol": "CANTO","contract": "0x826551890Dc65655a0Aceca109aB11AbDbD7a07B" },
  { "id": "weth","symbol": "WETH","contract": "0x5FD55A1B9FC24967C4dB09C513C3BA0DFa7FF687" },
  { "id": "cosmos","symbol": "ATOM","contract": "0xecEEEfCEE421D8062EF8d6b4D814efe4dc898265" },
  { "id": "canto-inu","symbol": "CINU","contract": "0x7264610A66EcA758A8ce95CF11Ff5741E1fd0455" },
  { "id": "usd-coin","symbol": "USDC","contract": "0x80b5a32E4F032B2a058b4F29EC95EEfEEB87aDcd" },
  { "id": "tether","symbol": "USDT","contract": "0xd567B3d7B8FE3C79a1AD8dA978812cfC4Fa05e75" },
  { "id": "velocimeter-flow","symbol": "FLOW","contract": "0xB5b060055F0d1eF5174329913ef861bC3aDdF029" },
]

const celoTokens = [
  { "id": "ubeswap","symbol": "UBE","contract": "0x00be915b9dcf56a3cbe739d9b9c202ca692409ec" },
  { "id": "celo-dollar","symbol": "CUSD","contract": "0x64dEFa3544c695db8c535D289d843a189aa26b98" },
  { "id": "moola-market","symbol": "MOO","contract": "0x17700282592D6917F6A73D0bF8AcCf4D578c131e" },
  { "id": "wrapped-celo","symbol": "WCELO","contract": "0x471ece3750da237f93b8e339c536989b8978a438" },
  { "id": "wrapped-bitcoin","symbol": "WBTC","contract": "0xD629eb00dEced2a080B7EC630eF6aC117e614f1b" },
  { "id": "usd-coin","symbol": "USDC","contract": "0x765DE816845861e75A25fCA122bb6898B8B1282a" },
  { "id": "weth","symbol": "WETH","contract": "0x2DEf4285787d58a2f811AF24755A8150622f4361" },
  { "id": "sushi","symbol": "SUSHI","contract": "0x29dFce9c22003A4999930382Fd00f9Fd6133Acd1" }
]

const coreTokens = [
  { "id": "weth","symbol": "WETH","contract": "0xef6b7bc74c9354bcf2e3f2a068e4b0b5cdf08f29" },
  { "id": "shadowswap-token","symbol": "SHDW","contract": "0xddBa66C1eBA873e26Ac0215Ca44892a07d83aDF5" },
  { "id": "tether","symbol": "USDT","contract": "0x900101d06A7426441Ae63e9AB3B9b0F63Be145F1" },
  { "id": "archerswap-bow","symbol": "BOW","contract": "0x1a639e150d2210a4be4a5f0857a9151b241e7ae4" },
  { "id": "coredaoorg","symbol": "CORE","contract": "0x40375c92d9faf44d2f9db9bd9ba41a3317a2404f" },
  { "id": "weth","symbol": "WETH","contract": "0xeab3ac417c4d6df6b143346a46fee1b847b50296" },
  { "id": "lfgswap-finance-core","symbol": "LFG","contract": "0xF7a0b80681eC935d6dd9f3Af9826E68B99897d6D" }
]

const CronosTokens = [
  { "id": "crypto-com-chain", "symbol": "CRO", "contract": "0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23"},
  { "id": "crypto-com-chain", "symbol": "WCRO", "contract": "0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23"},
  { "id": "weth", "symbol": "WETH", "contract": "0xe44Fd7fCb2b1581822D0c862B68222998a0c299a"},
  { "id": "wrapped-bitcoin", "symbol": "WBTC", "contract": "0x062E66477Faf219F25D27dCED647BF57C3107d52"},
  { "id": "usd-coin", "symbol": "USDC", "contract": "0xc21223249CA28397B4B6541dfFaEcC539BfF0c59"},
  { "id": "tether", "symbol": "USDT", "contract": "0x66e428c3f67a68878562e79A0234c1F83c208770"},
  { "id": "dai", "symbol": "DAI", "contract": "0xF2001B145b43032AAF5Ee2884e456CCd805F677D"},
  { "id": "binance-usd", "symbol": "BUSD", "contract": "0x6aB6d61428fde76768D7b45D8BFeec19c6eF91A8"},
  { "id": "vvs-finance", "symbol": "VVS", "contract": "0x2D03bECE6747ADC00E1a131BBA1469C15fD11e03"},
  { "id": "fantom", "symbol": "FTM", "contract": "0xB44a9B6905aF7c801311e8F4E76932ee959c663C"},
  { "id": "avalanche-2", "symbol": "AVAX", "contract": "0x765277EebeCA2e31912C9946eAe1021199B39C61"},
  { "id": "crow-token", "symbol": "CROW", "contract": "0x285c3329930a3fd3c7c14bc041d3e50e165b1517"},
  { "id": "cronaswap", "symbol": "CRONA", "contract": "0xadbd1231fb360047525bedf962581f3eee7b49fe"},
  { "id": "savanna", "symbol": "SVN", "contract": "0x654bac3ec77d6db497892478f854cf6e8245dca9"},
  { "id": "mmfinance", "symbol": "MMF", "contract": "0x97749c9b61f878a880dfe312d2594ae07aed7656"}
];

const DfkTokens = [
  { "id": "defi-kingdoms","symbol": "JEWEL","contract": "0xCCb93dABD71c8Dad03Fc4CE5559dC3D89F67a260" },
  { "id": "avalanche-2","symbol": "AVAX","contract": "0xB57B60DeBDB0b8172bb6316a9164bd3C695F133a" },
]

const dogeTokens = [
  { "id": "usd-coin","symbol": "USDC","contract": "0x765277EebeCA2e31912C9946eAe1021199B39C61"},
  { "id": "wrapped-bitcoin","symbol": "WBTC","contract": "0xfA9343C3897324496A05fC75abeD6bAC29f8A40f"},
  { "id": "weth","symbol": "WETH","contract": "0xB44a9B6905aF7c801311e8F4E76932ee959c663C"},
  { "id": "binance-usd","symbol": "BUSD","contract": "0x332730a4F6E03D9C55829435f10360E13cfA41Ff"},
  { "id": "binancecoin","symbol": "BNB","contract": "0xA649325Aa7C5093d12D6F98EB4378deAe68CE23F"},
  { "id": "dogecoin", "symbol": "DOGE", "contract": "0xB7ddC6414bf4F5515b52D8BdD69973Ae205ff101"},
  { "id": "tether", "symbol": "USDT", "contract": "0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D"},
  { "id": "dai", "symbol": "DAI", "contract": "0x639A647fbe20b6c8ac19E48E2de44ea792c62c5C"},
  { "id": "dai", "symbol": "DAI", "contract": "0xB3306f03595490e5cC3a1b1704a5a158D3436ffC"}
];

const EmeraldTokens = [
  { "id": "tether", "symbol": "USDT", "contract": "0xdC19A122e268128B5eE20366299fc7b5b199C8e3"},
  { "id": "tether", "symbol": "USDT", "contract": "0x6Cb9750a92643382e020eA9a170AbB83Df05F30B"},
  { "id": "usd-coin", "symbol": "USDC", "contract": "0xE8A638b3B7565Ee7c5eb9755E58552aFc87b94DD"},
  { "id": "oasis-network", "symbol": "ROSE", "contract": "0x5C78A65AD6D0eC6618788b6E8e211F31729111Ca"},
  { "id": "oasis-network", "symbol": "ROSE", "contract": "0x21C718C22D52d0F3a789b752D4c2fD5908a8A733"},
  { "id": "weth", "symbol": "WETH", "contract": "0x3223f17957Ba502cbe71401D55A0DB26E5F7c68F"},
  { "id": "wrapped-bitcoin", "symbol": "WBTC", "contract": "0xd43ce0aa2a29DCb75bDb83085703dc589DE6C7eb"},
];

const EthwTokens = [
  { "id": "uniwswap", "symbol": "UNIW", "contract": "0x2a0cf46ecaaead92487577e9b737ec63b0208a33"},
  { "id": "weth", "symbol": "WETH", "contract": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"},
  { "id": "usd-coin", "symbol": "USDC", "contract": "0x11bbB41B3E8baf7f75773DB7428d5AcEe25FEC75"}
];

const evmosTokens = [
  { "id": "usd-coin","symbol": "USDC", "contract": "0x51e44FfaD5C2B122C8b635671FCC8139dc636E82" },
  { "id": "evmos","symbol": "EVMOS", "contract": "0xD4949664cD82660AaE99bEdc034a0deA8A0bd517" },
  { "id": "weth","symbol": "WETH", "contract": "0x5842C5532b61aCF3227679a8b1BD0242a41752f2" }
]

const FantomTokens = [
  [
    { "id": "tether", "symbol": "USDT", "contract": "0x049d68029688eAbF473097a2fC38ef61633A3C7A" },
    { "id": "usd-coin", "symbol": "USDC", "contract": "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75" },
    { "id": "fantom", "symbol": "FTM", "contract": "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83" },
    { "id": "ethereum", "symbol": "ETH", "contract": "0x74b23882a30290451A17c44f4F05243b6b58C76d" },
    { "id": "yearn-finance", "symbol": "YFI", "contract": "0x29b0Da86e484E1C0029B56e817912d778aC0EC69" },
    { "id": "chainlink", "symbol": "LINK", "contract": "0xb3654dc3D10Ea7645f8319668E8F54d2574FBdC8" },
    { "id": "cream", "symbol": "CREAM", "contract": "0x657A1861c15A3deD9AF0B6799a195a249ebdCbc6" },
    { "id": "dai", "symbol": "DAI", "contract": "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E" },
    { "id": "synthetix-network-token", "symbol": "SNX", "contract": "0x56ee926bD8c72B2d5fa1aF4d9E4Cbb515a1E3Adc" },
    { "id": "sushi", "symbol": "SUSHI", "contract": "0xae75A438b2E0cB8Bb01Ec1E1e376De11D44477CC" },
    { "id": "ice-token", "symbol": "ICE", "contract": "0xf16e81dce15b08f326220742020379b855b87df9" },
    { "id": "spookyswap", "symbol": "BOO", "contract": "0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE" },
    { "id": "binancecoin", "symbol": "BNB", "contract": "0xD67de0e0a0Fd7b15dC8348Bb9BE742F3c5850454" },
    { "id": "tomb-shares", "symbol": "TSHARE", "contract": "0x4cdF39285D7Ca8eB3f090fDA0C069ba5F4145B37" },
    { "id": "tomb", "symbol": "TOMB", "contract": "0x6c021Ae822BEa943b2E66552bDe1D2696a53fbB7" },
    { "id": "frax-share", "symbol": "FXS", "contract": "0x82F8Cb20c14F134fe6Ebf7aC3B903B2117aAfa62" },
    { "id": "frax", "symbol": "FRAX", "contract": "0xaf319E5789945197e365E7f7fbFc56B130523B33" },
    { "id": "spiritswap", "symbol": "SPIRIT", "contract": "0x5cc61a78f164885776aa610fb0fe1257df78e59b" },
    { "id": "grimcoin", "symbol": "GRIM", "contract": "0x7eC94C4327dC757601B4273cD67014d7760Be97E" },
    { "id": "galaxy-triton", "symbol": "TRITON", "contract": "0x9cf4009e62429Db3F57Aa9e7e8E898427cF6865f" },
    { "id": "galaxy-oberon", "symbol": "OBERON", "contract": "0xc979E70611D997Aa109528c6A9aa73D82Eaa2881" },
    { "id": "pumpkins", "symbol": "KINS", "contract": "0x6eced8e16eda61e65292f019b165542a5906ecd6" },
    { "id": "skullswap-exchange", "symbol": "SKULL", "contract": "0xfa5992a8a47af7029e04ec6a95203ad3f301460b" },
  ],
  [
    { "id": "wraithswap", "symbol": "WRA", "contract": "0x4CF098d3775Bd78a4508a13E126798Da5911b6cd" },
    { "id": "geist-finance", "symbol": "GEIST", "contract": "0xd8321aa83fb0a4ecd6348d4577431310a6e0814d" },
    { "id": "bitcoin", "symbol": "BTC", "contract": "0x321162Cd933E2Be498Cd2267a90534A804051b11" },
    { "id": "curve-dao-token", "symbol": "CRV", "contract": "0x1e4f97b9f9f913c46f1632781732927b9019c68b" },
    { "id": "coffin-finance", "symbol": "COFFIN", "contract": "0x593Ab53baFfaF1E821845cf7080428366F030a9c" },
    { "id": "coffin-dollar", "symbol": "CoUSD", "contract": "0x0DeF844ED26409C5C46dda124ec28fb064D90D27" },
    { "id": "beethoven-x", "symbol": "BEETS", "contract": "0xf24bcf4d1e507740041c9cfd2dddb29585adce1e" },
    { "id": "synapse-2", "symbol": "SYN", "contract": "0xE55e19Fb4F2D85af758950957714292DAC1e25B2" },
    { "id": "spell-token", "symbol": "SPELL", "contract": "0x468003B688943977e6130F4F68F23aad939a1040" },
    { "id": "joe", "symbol": "JOE", "contract": "0x9F47F313ACFd4bdC52F4373b493EaE7d5aC5b765" },
    { "id": "true-usd", "symbol": "TUSD", "contract": "0x9879aBDea01a879644185341F7aF7d8343556B7a" },
    { "id": "magic-internet-money", "symbol": "MIM", "contract": "0x82f0B8B456c1A451378467398982d4834b6829c1" },
    { "id": "frax", "symbol": "FRAX", "contract": "0xdc301622e621166BD8E82f2cA0A26c13Ad0BE355" },
    { "id": "hundred-finance", "symbol": "HND", "contract": "0x10010078a54396f62c96df8532dc2b4847d47ed3" },
    { "id": "topshelf-finance", "symbol": "LIQR", "contract": "0x33333ee26a7d02e41c33828b42fb1e0889143477" },
    { "id": "blockchain-adventurers-guild", "symbol": "BAG", "contract":"0xB1d82666384bE5F8C59AA18e650493ABb8A614Ad" },
    { "id": "beluga-fi", "symbol": "BELUGA", "contract":"0x4A13a2cf881f5378DEF61E430139Ed26d843Df9A" },
    { "id": "liquiddriver", "symbol": "LQDR", "contract":"0x10b620b2dbac4faa7d7ffd71da486f5d44cd86f9" },
    { "id": "tarot", "symbol": "TAROT", "contract":"0xc5e2b037d30a390e62180970b3aa4e91868764cd" },
    { "id": "creditum", "symbol": "CREDIT", "contract":"0x77128dfdd0ac859b33f44050c6fa272f34872b5e" },
    { "id": "scream", "symbol": "SCREAM", "contract":"0xe0654c8e6fd4d733349ac7e09f6f23da256bf475" },
    { "id": "governance-ohm", "symbol": "GOHM", "contract":"0x91fa20244Fb509e8289CA630E5db3E9166233FDc" },
  ],
  [
    { "id": "partial-share", "symbol": "PSHARE", "contract": "0x8C64D18E9d4A7b8e8c10C5c5a4b8D6D83cb15002" },
    { "id": "partial", "symbol": "PARTIAL", "contract": "0x9486fDA4C1192db69a08CA7235E2E6bAf31B467B" },
    { "id": "beefy-finance", "symbol": "BIFI", "contract": "0xd6070ae98b8069de6B494332d1A1a81B6179D960" },
    { "id": "linspirit", "symbol": "LINSPIRIT", "contract": "0xc5713b6a0f26bf0fdc1c52b90cd184d950be515c" },
    { "id": "solidsex-tokenized-vesolid", "symbol": "SOLIDSEX", "contract": "0x41adac6c1ff52c5e27568f27998d747f7b69795b" },
    { "id": "pdollar", "symbol": "PDO", "contract": "0xb9D62c829fbF7eAff1EbA4E50F3D0480b66c1748"},
    { "id": "pdollar-share", "symbol": "sPDO", "contract": "0x1D3918043d22de2D799a4d80f72Efd50Db90B5Af"},
    { "id": "solidly", "symbol": "SOLID", "contract": "0x888ef71766ca594ded1f0fa3ae64ed2941740a20"},
    { "id": "mooncoin", "symbol": "MOON", "contract": "0x7FB5c0A098Fbea90D254861979c321493E18da84"},
    { "id": "scarab-finance", "symbol": "SCARAB", "contract": "0x2e79205648b85485731cfe3025d66cf2d3b059c4"},
    { "id": "gscarab", "symbol": "GSCARAB", "contract": "0x6ab5660f0b1f174cfa84e9977c15645e4848f5d6"},
    { "id": "solidex", "symbol": "SEX", "contract": "0xd31fcd1f7ba190dbc75354046f6024a9b86014d7"},
    { "id": "dei-token", "symbol": "DEI", "contract": "0xde12c7959e1a72bbe8a5f7a1dc8f8eef9ab011b3"},
    { "id": "cre8r-dao", "symbol": "CRE8R", "contract": "0x2aD402655243203fcfa7dCB62F8A08cc2BA88ae0"},
    { "id": "fbomb", "symbol": "BOMB", "contract": "0x8503eb4a136bdbeb323e37aa6e0fa0c772228378"},
    { "id": "charm", "symbol": "CHARM", "contract": "0x248cb87dda803028dfead98101c9465a2fbda0d4"},
    { "id": "ginspirit", "symbol": "GINSPIRIT", "contract": "0x2787bea3366335068bf8b4a253044d09ea4e1c96"},
    { "id": "0xdao", "symbol": "OXD", "contract": "0xc165d941481e68696f43ee6e99bfb2b23e0e3114"}, //this is v1
    { "id": "30mb-token", "symbol": "3OMB", "contract": "0x14def7584a6c52f470ca4f4b9671056b22f4ffde"},
    { "id": "vedao", "symbol": "WEVE", "contract": "0x911da02c1232a3c3e1418b834a311921143b04d7"},
    { "id": "terrausd", "symbol": "UST", "contract": "0xe2d27f06f63d98b8e11b38b5b08a75d0c8dd62b9"},
    { "id": "stargate-finance", "symbol": "STG", "contract": "0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590"},
    { "id": "deus-finance-2", "symbol": "DEUS", "contract": "0xde5ed76e7c05ec5e4572cfc88d1acea165109e44"},
    { "id": "strategyx", "symbol": "STAY", "contract": "0xA5365f2E77bCe1cb2D42F5c808012C01b1548d3C" },
    { "id": "fang-token", "symbol": "FANG", "contract": "0x49894fcc07233957c35462cfc3418ef0cc26129f" },
  ]
];

const FindoraTokens = [
  {id: 'findora', symbol: 'FRA', contract: '0x0000000000000000000000000000000000001000'},
  {id: 'fairy', symbol: 'FAIRY', contract: '0xcCC94d78b01D94330F25f7B8e827ef24249132DE'},
  {id: 'forlend', symbol: 'FLD', contract: '0x020cF6c12B08AcbE78544C4F3319A749b0601780'},
  {id: 'usdc-b', symbol: 'USDC.b', contract: '0xdA33eF1A7b48beBbF579eE86DFA735a9529C4950'},
  {id: 'usdc-e', symbol: 'USDC.e', contract: '0x2e8079E0fE49626AF8716fC38aDEa6799065D7f7'},
  {id: 'usdt-b', symbol: 'USDT.b', contract: '0x93EDFa31D7ac69999E964DAC9c25Cd6402c75DB3'},
  {id: 'usdt-e', symbol: 'USDT.e', contract: '0x0632baa26299C9972eD4D9AfFa3FD057A72252Ff'},
  {id: 'wbtc-b', symbol: 'WBTC.b', contract: '0x07EfA82E00E458ca3D53f2CD5B162e520F46d911'},
  {id: 'wbtc-e', symbol: 'WBTC.e', contract: '0x38f9dA0D8A84Ad841281080Ad4a2D9D89Eff3bFf'},
  {id: 'weth-b', symbol: 'WETH.b', contract: '0x008A628826E9470337e0Cd9c0C944143A83F32f3'},
  {id: 'weth-e', symbol: 'WETH.e', contract: '0xaFfAac009Af35d6069E79Ef3763A39A2BA5BF65f'},
  {id: 'wbnb-b', symbol: 'WBNB.b', contract: '0xABc979788c7089B516B8F2f1b5cEaBd2E27Fd78b'},
  {id: 'busd-b', symbol: 'BUSD.b', contract: '0xE80EB4a234f718eDc5B76Bb442653827D20Ebb2d'},
  {id: 'findora', symbol: 'FRA', contract: '0x228b04158c6Eff4F3594B0a7A56eb7A2d6DD8874'}
]

const FuseTokens = [ 
  { "id": "fuse-network-token", "symbol": "FUSE", "contract": "0x0BE9e53fd7EDaC9F859882AfdDa116645287C629"},
  { "id": "usd-coin", "symbol": "USDC", "contract": "0x620fd5fa44BE6af63715Ef4E65DDFA0387aD13F5"},
  { "id": "sushi", "symbol": "SUSHI", "contract": "0x90708b20ccC1eb95a4FA7C8b18Fd2C22a0Ff9E78"},
  { "id": "wrapped-bitcoin", "symbol": "WBTC", "contract": "0x33284f95ccb7B948d9D352e1439561CF83d8d00d"},
  { "id": "weth", "symbol": "WETH", "contract": "0xa722c13135930332Eb3d749B2F0906559D2C5b99"},
  { "id": "terrausd", "symbol": "UST", "contract": "0x0D58a44be3dCA0aB449965dcc2c46932547Fea2f"}
];

const FxTokens = [ 
  { "id": "tether", "symbol": "USDT", "contract": "0xecEEEfCEE421D8062EF8d6b4D814efe4dc898265"},
  { "id": "pundi-x-2", "symbol": "PUNDIX", "contract": "0xd567B3d7B8FE3C79a1AD8dA978812cfC4Fa05e75"},
  { "id": "weth", "symbol": "WETH", "contract": "0x0CE35b0D42608Ca54Eb7bcc8044f7087C18E7717"},
  { "id": "fx-coin", "symbol": "FX", "contract": "0x80b5a32E4F032B2a058b4F29EC95EEfEEB87aDcd"}
];

const GoerliTokens = [ 
  { "id": "tether", "symbol": "USDT", "contract": "0x966289b2c448e189664EC3268766335da7079b6b"}
];

const xdaiTokens = [ 
  { "id": "xdai","symbol": "xDAI","contract": "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d" },
  { "id": "tether","symbol": "USDT","contract": "0x4ECaBa5870353805a9F068101A40E0f32ed605C6" },
  { "id": "usd-coin","symbol": "USDC","contract": "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83" },
  { "id": "weth","symbol": "WETH","contract": "0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1" },
  { "id": "lever-network","symbol": "LEV","contract": "0xaCb954Db4F51558016455cE9b1Ba32a5bd8b529d" },
  { "id": "honey","symbol": "HNY","contract": "0x71850b7e9ee3f13ab46d67167341e4bdc905eef9" },
  { "id": "xdai-native-comb","symbol": "XCOMB","contract": "0x38fb649ad3d6ba1113be5f57b927053e97fc5bf7" },
  { "id": "elk-finance","symbol": "ELK","contract": "0xE1C110E1B1b4A1deD0cAf3E42BfBdbB7b5d7cE1C" },
  { "id": "gnosis","symbol": "GNO","contract": "0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb" },
  { "id": "hop-protocol","symbol": "HOP","contract": "0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC" },
  { "id": "hundred-finance","symbol": "HND","contract": "0x10010078a54396F62c96dF8532dc2B4847d47ED3" }
]

const HarmonyTokens = [
  {id: 'binance-usd', symbol: 'bscBUSD', contract: '0x0aB43550A6915F9f67d0c454C2E90385E6497EaA'},
  {id: 'usd-coin', symbol: '1USDC', contract: '0x985458E523dB3d53125813eD68c274899e9DfAb4'},
  {id: 'tether', symbol: '1USDT', contract: '0x3C2B8Be99c50593081EAA2A724F0B8285F5aba8f'},
  {id: 'harmony', symbol: 'WONE', contract: '0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a'},
  {id: 'sushi', symbol: 'SUSHI', contract: '0xBEC775Cb42AbFa4288dE81F387a9b1A3c4Bc552A'},
  {id: 'dai', symbol: '1DAI', contract: '0xEf977d2f931C1978Db5F6747666fa1eACB0d0339'},
  {id: 'rendoge', symbol: '1renDOGE', contract: '0x6C7bA6c44871655968e2aE85116Becb79c6AC352'},
  {id: 'wrapped-bitcoin', symbol: 'bscBTCB', contract: '0x34224dCF981dA7488FdD01c7fdd64E74Cd55DcF7'},
  {id: 'binance-eth', symbol: 'bscETH', contract: '0x783ee3e955832a3d52ca4050c4c251731c156020'},
  {id: 'terra-luna', symbol: 'LUNA', contract: '0x95ce547d730519a90def30d647f37d9e5359b6ae'},
  {id: 'terrausd', symbol: 'UST', contract: '0x224e64ec1bdce3870a6a6c777edd450454068fec'},
  {id: 'curve-dao-token', symbol: 'CRV', contract: '0x352cd428EFd6F31B5cae636928b7B84149cF369F'},
  {id: 'elk-finance', symbol: 'ELK', contract: '0xe1c110e1b1b4a1ded0caf3e42bfbdbb7b5d7ce1c'},
  {id: 'synapse-2', symbol: 'SYN', contract: '0xE55e19Fb4F2D85af758950957714292DAC1e25B2'},
  {id: 'hundred-finance', symbol: 'HND', contract: '0x10010078a54396f62c96df8532dc2b4847d47ed3'},
  {id: 'harmon-ape', symbol: 'APE', contract: '0xd3a50c0dce15c12fe64941ffd2b864e887c9b9e1'},
  {id: 'defi-kingdoms', symbol: 'JEWEL', contract: '0x72cb10c6bfa5624dd07ef608027e366bd690048f'},
  {id: 'wrapped-bitcoin', symbol: 'WBTC', contract: '0x3095c7557bCb296ccc6e363DE01b760bA031F2d9'},
  {id: 'crypto-royale', symbol: 'ROY', contract: '0xfe1b516A7297eb03229A8B5AfAD80703911E81cB'},
  {id: 'comfy', symbol: 'COMFY', contract: '0x702f78E81Cf3DfaE89648b5a9e2e1aa8db1De546'},
  {id: 'comfy-share', symbol: 'CSHARE', contract: '0x3CB98cacd44Ee77eb35E99EB74Ace91bF550c964'},
  {id: 'tranquil-finance', symbol: 'TRANQ', contract: '0xcf1709ad76a79d5a60210f23e81ce2460542a836'},
]

const hooTokens = [
  { "id": "elk-finance","symbol": "ELK", "contract": "0xeEeEEb57642040bE42185f49C52F7E9B38f8eeeE" },
  { "id": "usd-coin","symbol": "USDC", "contract": "0x92a0bd4584c147d1b0e8f9185db0bda10b05ed7e" },
  { "id": "hoo-token","symbol": "HOO", "contract": "0x3eff9d389d13d6352bfb498bcf616ef9b1beac87" }
]

const hrcTokens = [
  { "id": "huobi-token","symbol": "HT","contract":"0x6f259637dcd74c767781e37bc6133cd6a68aa161" },
  { "id": "mdex","symbol": "MDX","contract":"0x25d2e80cb6b86881fd7e07dd263fb79f4abe033c" },
  { "id": "tether","symbol": "USDT", "contract": "0xa71edc38d189767582c38a3145b5873052c3e47a" },
  { "id": "ethereum","symbol": "ETH", "contract": "0xb55569893b397324c0d048c9709f40c23445540e" },
  { "id": "bitcoin","symbol": "HBTC", "contract": "0x66a79d23e58475d2738179ca52cd0b41d73f0bea" },
  { "id": "ethereum","symbol": "HETH", "contract": "0x64FF637fB478863B7468bc97D30a5bF3A428a1fD" },
  { "id": "hoo-token","symbol": "HOO", "contract": "0xE1d1F66215998786110Ba0102ef558b22224C016" },
  { "id": "gene","symbol": "GENE", "contract": "0x2CFa849e8506910b2564aFE5BdEF33Ba66C730Aa" },
  { "id": "husd","symbol": "HUSD", "contract": "0x0298c2b32eaE4da002a15f36fdf7615BEa3DA047" },
  { "id": "huobi-btc","symbol": "HBTC", "contract": "0x0316eb71485b0ab14103307bf65a021042c6d380" },
  { "id": "wrapped-huobi-token","symbol": "WHT", "contract": "0x105E11915B80dD8aa59aC3d58f10303C75606d46" },
  { "id": "wrapped-huobi-token","symbol": "WHT", "contract": "0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F" },
  { "id": "coinwind","symbol": "COW", "contract": "0x80861a817106665bca173db6ac2ab628a738c737" },
  { "id": "yearn-finance","symbol": "YFI", "contract": "0xB4F019bEAc758AbBEe2F906033AAa2f0F6Dacb35" },
  { "id": "dai","symbol": "DAI", "contract": "0x3D760a45D0887DFD89A2F5385a236B29Cb46ED2a" },
  { "id": "usd-coin","symbol": "USDC", "contract": "0x9362Bbef4B8313A8Aa9f0c9808B80577Aa26B73B" },
  { "id": "galaxy-triton", "symbol": "TRITON", "contract": "0x9cf4009e62429Db3F57Aa9e7e8E898427cF6865f" },
  { "id": "galaxy-oberon", "symbol": "OBERON", "contract": "0xc979E70611D997Aa109528c6A9aa73D82Eaa2881"},
  { "id": "lendhub", "symbol": "LHB", "contract": "0x8f67854497218043e1f72908ffe38d0ed7f24721"},
  { "id": "balancer", "symbol": "BAL", "contract": "0xba100000625a3754423978a60c9317c58a424e3d"},
  { "id": "chainlink", "symbol": "LINK", "contract": "0x514910771af9ca656af840dff83e8264ecf986ca"},
  { "id": "oec-dot", "symbol": "DOTK", "contract": "0xabc732f6f69a519f6d508434481376b6221eb7d5"},
  { "id": "huobi-polkadot", "symbol": "HDOT", "contract": "0x9ffc3bcde7b68c46a6dc34f0718009925c1867cb"},
]

const IotexTokens = [
  { "id": "mcn-ventures","symbol": "MCN", "contract": "0x3FE04320885e6124231254c802004871be681218" },
  { "id": "iotex","symbol": "IOTX", "contract": "0xA00744882684C3e4747faEFD68D283eA44099D03" },
  { "id": "cyclone-protocol","symbol": "CYC", "contract": "0x4D7b88403AA2F502bf289584160db01ca442426c" },
  { "id": "weth","symbol": "WETH", "contract": "0x0258866edAf84D6081df17660357aB20A07d0c80" },
  { "id": "wrapped-bitcoin","symbol": "WBTC", "contract": "0xC7b93720F73b037394cE00f954f849Ed484a3dEA" },
  { "id": "binance-usd","symbol": "BUSD", "contract": "0xacEE9B11CD4B3f57e58880277aC72c8c41ABe4e4" },
  { "id": "binance-usd","symbol": "BUSD", "contract": "0x84ABcb2832bE606341a50128AEB1DB43AA017449" },
  { "id": "usd-coin","symbol": "USDC", "contract": "0x3B2bf2b523f54C4E454F08Aa286D03115aFF326c" },
  { "id": "wmatic","symbol": "WMATIC", "contract": "0x8e66c0d6B70C0B23d39f4B21A1eAC52BBA8eD89a" },
  { "id": "tether","symbol": "USDT", "contract": "0x3CDb7c48E70B854ED2Fa392E21687501D84B3AFc" },
  { "id": "dai","symbol": "DAI", "contract": "0x62a9D987Cbf4C45a550DEEd5B57b200d7a319632" },
  { "id": "imagictoken","symbol": "IMAGIC", "contract": "0x490CfbF9b9C43633DdD1968d062996227ef438A9" }
];

const KavaTokens = [
  { "id": "weth", "symbol": "WETH", "contract": "0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D"},
  { "id": "kava", "symbol": "KAVA", "contract": "0xc86c7C0eFbd6A49B35E8714C5f59D99De09A225b"},
  { "id": "usd-coin","symbol": "USDC", "contract": "0xfA9343C3897324496A05fC75abeD6bAC29f8A40f" },
  { "id": "tether","symbol": "USDT", "contract": "0xB44a9B6905aF7c801311e8F4E76932ee959c663C" },
  { "id": "dai","symbol": "DAI", "contract": "0x765277EebeCA2e31912C9946eAe1021199B39C61" },
  { "id": "equilibre","symbol": "VARA", "contract": "0xe1da44c0da55b075ae8e2e4b6986adc76ac77d73" }
];

const KccTokens = [
  { "id": "kucoin-shares", "symbol": "KCS", "contract": "0x6c021Ae822BEa943b2E66552bDe1D2696a53fbB7"},
  { "id": "kucoin-shares", "symbol": "WKCS", "contract": "0x4446fc4eb47f2f6586f9faab68b3498f86c07521"},
  { "id": "elk-finance", "symbol": "ELK", "contract": "0xE1C110E1B1b4A1deD0cAf3E42BfBdbB7b5d7cE1C"}
];

const KlaytnTokens = [
  { "id": "usd-coin", "symbol": "USDC", "contract": "0x754288077d0ff82af7a5317c7cb8c444d421d103"},
  { "id": "klay-token", "symbol": "KLAY", "contract": "0xe4f05a66ec68b54a58b17c22107b02e0232cc817"},
  { "id": "klay-token", "symbol": "KLAY", "contract": "0xfd844c2fca5e595004b17615f891620d1cb9bbb2"},
  { "id": "weth", "symbol": "WETH", "contract": "0x34d21b1e550d73cee41151c77f3c73359527a396"},
  { "id": "wrapped-bitcoin", "symbol": "WBTC", "contract": "0x16d0e1fbd024c600ca0380a4c5d57ee7a2ecbf9c"},
  { "id": "tether", "symbol": "USDT", "contract": "0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167"}
];

const maticTokens = [
  { "id": "matic-network","symbol": "WMATIC","contract": "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270" },
  { "id": "matic-network","symbol": "MATIC","contract": "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270" },
  { "id": "tether","symbol": "USDT", "contract": "0xc2132D05D31c914a87C6611C10748AEb04B58e8F" },
  { "id": "bitcoin","symbol": "WBTC", "contract": "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6" },
  { "id": "ethereum", "symbol": "WETH", "contract": "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619" },
  { "id": "usd-coin","symbol": "USDC", "contract": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174" },
  { "id": "dai","symbol": "DAI", "contract": "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063" },
  { "id": "quick","symbol": "QUICK", "contract": "0x831753DD7087CaC61aB5644b308642cc1c33Dc13" },
  { "id": "stake-dao", "symbol": "SDT", "contract": "0x361A5a4993493cE00f61C32d4EcCA5512b82CE90" },
  { "id": "yield-app", "symbol": "YLD", "contract": "0x4CEBdBCB286101A17D3eA1f7fe7bbDeD2B2053dd" },
  { "id": "aave", "symbol": "AAVE", "contract": "0xD6DF932A45C0f255f85145f286eA0b292B21C90B" },
  { "id": "polywhale", "symbol": "KRILL", "contract": "0x05089C9EBFFa4F0AcA269e32056b1b36B37ED71b" },
  { "id": "chainlink", "symbol": "LINK", "contract": "0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39" },
  { "id": "sushi", "symbol": "SUSHI", "contract": "0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a" },
  { "id": "dfyn-network", "symbol": "DFYN", "contract": "0xC168E40227E4ebD8C1caE80F7a55a4F0e6D66C97" },
  { "id": "polydoge", "symbol": "POLYDOGE", "contract": "0x8a953cfe442c5e8855cc6c61b1293fa648bae472" },
  { "id": "drax", "symbol": "DRAX", "contract": "0x1Ba3510A9ceEb72E5CdBa8bcdDe9647E1f20fB4b" },
  { "id": "dark-magic", "symbol": "DMAGIC", "contract": "0x61daecab65ee2a1d5b6032df030f3faa3d116aa7" },
  { "id": "nightbane", "symbol": "NIGHT", "contract": "0xEEf10C9Bf17c9d2C9619fd29447B231EA0Fde548" },
  { "id": "xdollar", "symbol": "XDO", "contract": "0x3dc7b06dd0b1f08ef9acbbd2564f8605b4868eea" },
  { "id": "iron-titanium-token", "symbol": "TITAN", "contract": "0xaaa5b9e6c589642f98a1cda99b9d024b8407285a" },
  { "id": "iron-stablecoin", "symbol": "IRON", "contract": "0xd86b5923f3ad7b585ed81b448170ae026c65ae9a" },
  { "id": "bzx-protocol", "symbol": "BZRX", "contract": "0x97dfbEF4eD5a7f63781472Dbc69Ab8e5d7357cB9" },
  { "id": "havven", "symbol": "SNX", "contract": "0x50B728D8D964fd00C2d0AAD81718b71311feF68a" },
  { "id": "curve-dao-token", "symbol": "CRV", "contract": "0x172370d5Cd63279eFa6d502DAB29171933a610AF" },
  { "id": "the-graph", "symbol": "GRT", "contract": "0x5fe2B58c013d7601147DcdD68C143A77499f5531" },
  { "id": "pickle-finance", "symbol": "PICKLE", "contract": "0x2b88aD57897A8b496595925F43048301C37615Da" },
  { "id": "must", "symbol": "MUST", "contract": "0x9C78EE466D6Cb57A4d01Fd887D2b5dFb2D46288f" },
  { "id": "blackswan", "symbol": "SWAN", "contract": "0xab7589de4c581db0fb265e25a8e7809d84ccd7e8" },
  { "id": "galaxy-triton", "symbol": "TRITON", "contract": "0x9cf4009e62429Db3F57Aa9e7e8E898427cF6865f" },
  { "id": "polywave", "symbol": "WAVE", "contract": "0x4de7fea447b837d7e77848a4b6c0662a64a84e14" },
  { "id": "surf", "symbol": "SURF", "contract": "0x1e42edbe5376e717c1b22904c59e406426e8173f" },
  { "id": "towel", "symbol": "TOWEL", "contract": "0x1e946ca17b893ab0f22cf1951137624ee9e689ef" },
  { "id": "uniswap", "symbol": "UNI", "contract": "0xb33eaad8d922b1083446dc23f610c2567fb5180f" },
  { "id": "agar", "symbol": "AGAr", "contract": "0xf84bd51eab957c2e7b7d646a3427c5a50848281d" },
  { "id": "pcomb", "symbol": "pCOMB", "contract": "0x37d1ebc3af809b8fadb45dce7077efc629b2b5bb" },
  { "id": "lmao", "symbol": "LMAO", "contract": "0xda6f81c2426131337b0cf73768b94c2004390b0e" },
  { "id": "titan", "symbol": "TITAN", "contract": "0xaaa5b9e6c589642f98a1cda99b9d024b8407285a" },
  { "id": "wrbt", "symbol": "wRBT", "contract": "0xa5d447757dac8c5faab1858b13da4af701adf4bb" },
  { "id": "wlev", "symbol": "WLEV", "contract": "0xeb7f7955730a7dba1427a6567950eb4a98dfcbdf" },
  { "id": "dragons-quick", "symbol": "DQUICK", "contract": "0xf28164a485b0b2c90639e47b0f377b4a438a16b1" },
  { "id": "polywolf", "symbol": "MOON", "contract": "0xc56d17dd519e5eb43a19c9759b5d5372115220bd" },
  { "id": "candy", "symbol": "CANDY", "contract": "0x710dF6FF5c680b0AcEc713a3D034C2B79D08741E" },
  { "id": "galaxy-oberon", "symbol": "OBERON", "contract": "0xc979E70611D997Aa109528c6A9aa73D82Eaa2881"},
  { "id": "xdollar-stablecoin", "sybmol": "xUSD", "contract": "0x3a3e7650f8b9f667da98f236010fbf44ee4b2975"},
  { "id": "aavegochi", "symbol": "GHST", "contract": "0x385Eeac5cB85A38A9a07A70c73e0a3271CfB54A7"},
  { "id": "kommunitas", "symbol": "KOM", "contract": "0xC004e2318722EA2b15499D6375905d75Ee5390B8"},
  { "id": "polycat", "symbol": "FISH", "contract":"0x3a3Df212b7AA91Aa0402B9035b098891d276572B"},
  { "id": "polly-defi-nest", "symbol": "NDEFI", "contract":"0xd3f07EA86DDf7BAebEfd49731D7Bbd207FedC53B"},
  { "id": "gamee", "symbol": "GMEE", "contract":"0xcf32822ff397Ef82425153a9dcb726E5fF61DCA7"},
  { "id": "polkabridge", "symbol": "PBR", "contract":"0x0D6ae2a429df13e44A07Cd2969E085e4833f64A0"},
  { "id": "phoenix-token", "symbol": "PHX", "contract":"0x9C6BfEdc14b5C23E3900889436Edca7805170f01"},
  { "id": "zerogoki", "symbol": "REI", "contract":"0xB9f9e37c2CdbaFF928C3Da730b02F06fE09aE70E"},
  { "id": "honor-token", "symbol": "HONOR", "contract":"0xb82a20b4522680951f11c94c54b8800c1c237693"},
  { "id": "mantra-dao", "symbol": "OM", "contract":"0xC3Ec80343D2bae2F8E680FDADDe7C17E71E114ea"},
  { "id": "synapse-2", "symbol": "SYN", "contract":"0xf8f9efc0db77d8881500bb06ff5d6abc3070e695"},
  { "id": "blockchain-adventurers-guild", "symbol": "BAG", "contract":"0xB1d82666384bE5F8C59AA18e650493ABb8A614Ad"},
  { "id": "plotx", "symbol": "PLOT", "contract":"0xe82808eaA78339b06a691fd92E1Be79671cAd8D3"},
  { "id": "paraswap", "symbol": "PSP", "contract":"0x42d61D766B85431666B39B89C43011f24451bFf6"},
  { "id": "true-usd", "symbol": "TUSD", "contract":"0x2e1ad108ff1d8c782fcbbb89aad783ac49586756"},
  { "id": "musd", "symbol": "MUSD", "contract":"0xE840B73E5287865EEc17d250bFb1536704B43B21"},
  { "id": "denarius", "symbol": "D", "contract":"0xa286eeDAa5aBbAE98F65b152B5057b8bE9893fbB"},
  { "id": "arth", "symbol": "ARTH","contract": "0xe52509181feb30eb4979e29ec70d50fd5c44d590" },
  { "id": "mahadao", "symbol": "MAHA","contract": "0xedd6ca8a4202d4a36611e2fff109648c4863ae19" },
  { "id": "stargate-finance", "symbol": "STG","contract": "0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590" },
  { "id": "gains-network", "symbol": "GNS","contract": "0xe5417af564e4bfda1c483642db72007871397896" },
  { "id": "frax-share", "symbol": "FXS","contract": "0x1a3acf6D19267E2d3e7f898f42803e90C9219062" },
  { "id": "klima-dao", "symbol": "KLIMA","contract": "0x4e78011ce80ee02d2c3e649fb657e45898257815" },
  { "id": "toucan-protocol-base-carbon-tonne", "symbol": "BCT","contract": "0x2f800db0fdb5223b3c3f354886d907a671414a7f" },
  { "id": "frax", "symbol": "FRAX","contract": "0x45c32fA6DF82ead1e2EF74d17b76547EDdFaFF89" },
  { "id": "hop-protocol", "symbol": "HOP","contract": "0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC" },
  { "id": "dfx-finance", "symbol": "DFX","contract": "0xE7804D91dfCDE7F776c90043E03eAa6Df87E6395" }
]

const MantaTokens = [
  { "id": "weth", "symbol": "WETH", "contract": "0x0Dc808adcE2099A9F62AA87D9670745AbA741746"},
  { "id": "stakestone-ether", "symbol": "STONE", "contract": "0xf447999bb954ae5191bce1181ac3a671edc24673"},
  { "id": "mountain-protocol-usdm", "symbol": "USDM", "contract": "0xbdAd407F77f44F7Da6684B416b1951ECa461FB07"},
  { "id": "quickswap", "symbol": "QUICK", "contract": "0xE22E3D44Ea9Fb0A87Ea3F7a8f41D869C677f0020"}
];

const MantleTokens = [
  { "id": "weth", "symbol": "WETH", "contract": "0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111"},
  { "id": "usd-coin", "symbol": "USDC", "contract": "0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9"},
];

const MeterTokens = [
  //{ "id": "metis", "symbol": "METIS", "contract": "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000"},
];

const MetisTokens = [
  { "id": "metis-token", "symbol": "METIS", "contract": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000"},
  { "id": "tether", "symbol": "USDT", "contract": "0xbb06dca3ae6887fabf931640f67cab3e3a16f4dc"},
  { "id": "weth", "symbol": "WETH", "contract": "0x420000000000000000000000000000000000000a"},
  { "id": "dai", "symbol": "DAI", "contract": "0x4651b38e7ec14bb3db731369bfe5b08f2466bd0a"},
  { "id": "usd-coin", "symbol": "USDC", "contract": "0xea32a96608495e54156ae48931a7c20f0dcc1a21"},
  { "id": "maia", "symbol": "MAIA", "contract": "0x72c232d56542ba082592dee7c77b1c6cfa758bcd"},
  { "id": "tethys-finance", "symbol": "TETHYS", "contract": "0x69fdb77064ec5c84fa2f21072973eb28441f43f3"},
  { "id": "binance-usd", "symbol": "BUSD", "contract": "0x12d84f1cfe870ca9c9df9785f8954341d7fbb249"},
  { "id": "magic-internet-money", "symbol": "MIM", "contract": "0x44dd7c98885cd3086e723b8554a90c9cc4089c4c"},
  { "id": "hummus", "symbol": "HUM", "contract": "0x4aAC94985cD83be30164DfE7e9AF7C054D7d2121"}
];

const milkomedaTokens = [
  { "id": "tether","symbol": "USDT", "contract": "0x80A16016cC4A2E6a2CACA8a4a498b1699fF0f844" },
  { "id": "usd-coin","symbol": "USDC", "contract": "0xB44a9B6905aF7c801311e8F4E76932ee959c663C" },
  { "id": "weth","symbol": "WETH", "contract": "0x5950F9B6EF36f3127Ea66799e64D0ea1f5fdb9D1" },
  { "id": "weth","symbol": "WETH", "contract": "0x81ECac0D6Be0550A00FF064a4f9dd2400585FE9c" },
  { "id": "binance-usd","symbol": "BUSD", "contract": "0x4Bf769b05E832FCdc9053fFFBC78Ca889aCb5E1E" },
  { "id": "milkyswap","symbol": "MILKY", "contract": "0x063a5e4cd5e15ac66ea47134eb60e6b30a51b2bf" },
  { "id": "wrapped-ada","symbol": "WADA", "contract": "0xAE83571000aF4499798d1e3b0fA0070EB3A3E3F9" }
]

const MoonbeamTokens = [
  { "id": "moonbeam", "symbol": "GLMR", "contract": "0xacc15dc74880c9944775448304b263d191c6077f"},
  { "id": "weth", "symbol": "WETH", "contract": "0x30d2a9f5fdf90ace8c17952cbb4ee48a55d916a7"},
  { "id": "tether", "symbol": "USDT", "contract": "0xefaeee334f0fd1712f9a8cc375f427d9cdd40d73"},
  { "id": "tether", "symbol": "USDT", "contract": "0x81ecac0d6be0550a00ff064a4f9dd2400585fe9c"},  //celer usdt
  { "id": "dai", "symbol": "DAI", "contract": "0x765277EebeCA2e31912C9946eAe1021199B39C61"},
  { "id": "dai", "symbol": "DAI", "contract": "0x765277EebeCA2e31912C9946eAe1021199B39C61"},
  { "id": "usd-coin", "symbol": "USDC", "contract": "0x8f552a71efe5eefc207bf75485b356a0b3f01ec9"},
  { "id": "usd-coin", "symbol": "USDC", "contract": "0x818ec0A7Fe18Ff94269904fCED6AE3DaE6d6dC0b"},  //USDC any
  { "id": "wrapped-bitcoin", "symbol": "WBTC", "contract": "0x1dc78acda13a8bc4408b207c9e48cdbc096d95e0"},
  { "id": "celer-network", "symbol": "CELR", "contract": "0x3795C36e7D12A8c252A20C5a7B455f7c57b60283"}
];

const MoonriverTokens = [
  { "id": "moonriver","symbol": "MOVR", "contract": "0x98878B06940aE243284CA214f92Bb71a2b032B8A" },
  { "id": "moonriver","symbol": "MOVR", "contract": "0xf50225a84382c74cbdea10b0c176f71fc3de0c4d" },
  { "id": "weth","symbol": "WETH", "contract": "0x639A647fbe20b6c8ac19E48E2de44ea792c62c5C" },
  { "id": "usd-coin","symbol": "USDC", "contract": "0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D" },
  { "id": "tether","symbol": "USDT", "contract": "0xB44a9B6905aF7c801311e8F4E76932ee959c663C" },
  { "id": "dai","symbol": "DAI", "contract": "0x80A16016cC4A2E6a2CACA8a4a498b1699fF0f844" },
  { "id": "wrapped-bitcoin","symbol": "WBTC", "contract": "0x6aB6d61428fde76768D7b45D8BFeec19c6eF91A8" },
  { "id": "binancecoin","symbol": "BNB", "contract": "0x2bF9b864cdc97b08B6D79ad4663e71B8aB65c45c" },
  { "id": "binance-usd","symbol": "BUSD", "contract": "0x5D9ab5522c64E1F6ef5e3627ECCc093f56167818" },
  { "id": "elk-finance","symbol": "ELK", "contract": "0xE1C110E1B1b4A1deD0cAf3E42BfBdbB7b5d7cE1C" },
  { "id": "sushi","symbol": "SUSHI", "contract": "0xf390830DF829cf22c53c8840554B98eafC5dCBc2" }
];

const OkexTokens = [
  { "id": "tether", "symbol": "USDT", "contract": "0x382bb369d343125bfb2117af9c149795c6c65c50"},
  { "id": "okexchain", "symbol": "OKT", "contract": "0x8F8526dbfd6E38E3D8307702cA8469Bae6C56C15"},
  { "id": "wrapped-bitcoin", "symbol": "WBTC", "contract": "0x54e4622DC504176b3BB432dCCAf504569699a7fF"},
  { "id": "elk-finance", "symbol": "ELK", "contract": "0xE1C110E1B1b4A1deD0cAf3E42BfBdbB7b5d7cE1C"}
];

const optimisticTokens = [
  { "id": "weth","symbol": "WETH", "contract": "0x4200000000000000000000000000000000000006" },
  { "id": "synapse-2","symbol": "SYN", "contract": "0x5a5fff6f753d7c11a56a52fe47a177a87e431655" },
  { "id": "arbinyan","symbol": "NYAN", "contract": "0xA807D4Bc69b050b8D0c99542cf93903C2EFe8b4c" },
  { "id": "usd-coin","symbol": "USDC", "contract": "0x7F5c764cBc14f9669B88837ca1490cCa17c31607" },
  { "id": "usd-coin","symbol": "USDC", "contract": "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85" },
  { "id": "tether","symbol": "USDT", "contract": "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58" },
  { "id": "dai","symbol": "DAI", "contract": "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1" },
  { "id": "havven","symbol": "SNX", "contract": "0x8700dAec35aF8Ff88c16BdF0418774CB3D7599B4" },
  { "id": "wrapped-bitcoin","symbol": "WBTC", "contract": "0x68f180fcCe6836688e9084f035309E29Bf0A2095" },
  { "id": "thales","symbol": "THALES", "contract": "0x217d47011b23bb961eb6d93ca9945b7501a5bb11" },
  { "id": "stargate-finance","symbol": "STG", "contract": "0x296F55F8Fb28E498B858d0BcDA06D955B2Cb3f97" },
  { "id": "hundred-finance","symbol": "HND", "contract": "0x10010078a54396F62c96dF8532dc2B4847d47ED3" },
  { "id": "optimism","symbol": "OP", "contract": "0x4200000000000000000000000000000000000042" },
  { "id": "velodrome-finance","symbol": "VELO", "contract": "0x3c8b650257cfb5f272f799f5e2b4e65093a11a05" },
  { "id": "lyra-finance","symbol": "LYRA", "contract": "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb" },
  { "id": "nusd","symbol": "SUSD", "contract": "0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9" },
  { "id": "liquity-usd","symbol": "LUSD", "contract": "0xc40F949F8a4e094D1b49a23ea9241D289B7b2819" },
  { "id": "frax","symbol": "FRAX", "contract": "0x2E3D870790dC77A83DD1d18184Acc7439A53f475" },
  { "id": "frax-share","symbol": "FXS", "contract": "0x67CCEA5bb16181E7b4109c9c2143c24a1c2205Be" },
  { "id": "alchemix-usd","symbol": "ALUSD", "contract": "0xCB8FA9a76b8e203D8C3797bF438d8FB81Ea3326A" },
  { "id": "dola-usd","symbol": "DOLA", "contract": "0x8aE125E8653821E851F12A49F7765db9a9ce7384" },
  { "id": "perpetual-protocol","symbol": "PERP", "contract": "0x9e1028F5F1D5eDE59748FFceE5532509976840E0" },
  { "id": "seth","symbol": "SETH", "contract": "0xE405de8F52ba7559f9df3C368500B6E6ae6Cee49" },
  { "id": "mindsync","symbol": "MAI", "contract": "0xdFA46478F9e5EA86d57387849598dbFB2e964b02" },
  { "id": "layer2dao","symbol": "L2DAO", "contract": "0xd52f94DF742a6F4B4C8b033369fE13A41782Bf44" },
  { "id": "aelin","symbol": "AELIN", "contract": "0x61BAADcF22d2565B0F471b291C475db5555e0b76" },
  { "id": "renbtc","symbol": "RENBTC", "contract": "0x85f6583762Bc76d775eAB9A7456db344f12409F7" },
  { "id": "dforce-token","symbol": "DF", "contract": "0x9e5AAC1Ba1a2e6aEd6b32689DFcF62A509Ca96f3" },
  { "id": "token-dforce-usd","symbol": "USX", "contract": "0xbfD291DA8A403DAAF7e5E9DC1ec0aCEaCd4848B9" },
  { "id": "ageur","symbol": "AGEUR", "contract": "0x9485aca5bbBE1667AD97c7fE7C4531a624C8b1ED" },
  { "id": "hop-protocol","symbol": "HOP", "contract": "0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc" },
  { "id": "openxswap-gov-token","symbol": "XOPENX", "contract": "0x2513486f18eee1498d7b6281f668b955181dd0d9" },
  { "id": "openx-locked-velo","symbol": "OPXVEVELO", "contract": "0x46f21fda29f1339e0ab543763ff683d399e393ec" },
  { "id": "openxswap","symbol": "OPENX", "contract": "0xc3864f98f2a61a7caeb95b039d031b4e2f55e0e9" },
  { "id": "unidex","symbol": "UNIDX", "contract": "0x5d47bAbA0d66083C52009271faF3F50DCc01023C" },
  { "id": "rocket-pool-eth","symbol": "RETH", "contract": "0x9Bcef72be871e61ED4fBbc7630889beE758eb81D" },
  { "id": "coinbase-wrapped-staked-eth","symbol": "CBETH", "contract": "0xadDb6A0412DE1BA0F936DCaeb8Aaa24578dcF3B2" },
  { "id": "wrapped-steth","symbol": "WSTETH", "contract": "0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb" },
  { "id": "frax-ether","symbol": "FRXETH", "contract": "0x6806411765af15bddd26f8f544a34cc40cb9838b" },
  { "id": "alchemix-eth","symbol": "ALETH", "contract": "0x3e29d3a9316dab217754d13b28646b76607c5f04" },
  { "id": "lido-dao","symbol": "LDO", "contract": "0xFdb794692724153d1488CcdBE0C56c252596735F" },
  { "id": "wrapped-usdr","symbol": "WUSDR", "contract": "0x340fE1D898ECCAad394e2ba0fC1F93d27c7b717A" },
  { "id": "ethos-reserve-note","symbol": "ERN", "contract": "0xc5b001dc33727f8f26880b184090d3e252470d45" },
  { "id": "usd","symbol": "USD+", "contract": "0x73cb180bf0521828d8849bc8CF2B920918e23032" },
  { "id": "beefy-finance","symbol": "BIFI", "contract": "0x4E720DD3Ac5CFe1e1fbDE4935f386Bb1C66F4642" },
  { "id": "oath","symbol": "OATH", "contract": "0x39fde572a18448f8139b7788099f0a0740f51205" },
  { "id": "overnight-dai","symbol": "DAI+", "contract": "0x970d50d09f3a656b43e11b0d45241a84e3a6e011" },
  { "id": "kwenta","symbol": "KWENTA", "contract": "0x920cf626a271321c151d027030d5d08af699456b" },
  { "id": "sonne-finance","symbol": "SONNE", "contract": "0x1DB2466d9F5e10D7090E7152B68d62703a2245F0" },
  { "id": "bob","symbol": "BOB", "contract": "0xB0B195aEFA3650A6908f15CdaC7D92F8a5791B0B" },
  { "id": "tarot","symbol": "TAROT", "contract": "0x375488F097176507e39B9653b88FDc52cDE736Bf" },
  { "id": "jarvis-synthetic-euro","symbol": "JEUR", "contract": "0x79af5dd14e855823fa3e9ecacdf001d99647d043" },
  { "id": "dhedge-dao","symbol": "DHT", "contract": "0xaf9fe3b5ccdae78188b1f8b9a49da7ae9510f151" },
  { "id": "staked-frax-ether","symbol": "SFRXETH", "contract": "0x484c2D6e3cDd945a8B2DF735e079178C1036578c" },
  { "id": "meta","symbol": "MTA", "contract": "0x929b939f8524c3be977af57a4a0ad3fb1e374b50" },
  { "id": "seur","symbol": "SEUR", "contract": "0xFBc4198702E81aE77c06D58f81b629BDf36f0a71" },
  { "id": "reth","symbol": "RETH", "contract": "0x6c2f7b6110a37b3b0fbdd811876be368df02e8b0" },
  { "id": "stafi","symbol": "FIS", "contract": "0xd8737ca46aa6285de7b8777a8e3db232911bad41" },
  { "id": "jarvis-reward-token","symbol": "JRT", "contract": "0x15e770b95edd73fd96b02ece0266247d50895e76" },
  { "id": "pepe","symbol": "PEPE", "contract": "0x12ff4a259e14d4dcd239c447d23c9b00f7781d8f" },
  { "id": "onering","symbol": "RING", "contract": "0xb0ae108669ceb86e9e98e8fe9e40d98b867855fd" },
  { "id": "iron-bank","symbol": "IB", "contract": "0x00a35FD824c717879BF370E70AC6868b95870Dfb" },
  { "id": "granary","symbol": "GRAIN", "contract": "0xfD389Dc9533717239856190F42475d3f263a270d" },
  { "id": "pooltogether","symbol": "POOL", "contract": "0x395ae52bb17aef68c2888d941736a71dc6d4e125" },
  { "id": "tbtc","symbol": "tBTC", "contract": "0x6c84a8f1c29108F47a79964b5Fe888D4f4D0dE40" },
  { "id": "wrapped-optidoge","symbol": "WOPTIDOGE", "contract": "0xc26921b5b9ee80773774d36c84328ccb22c3a819" },
  { "id": "fbomb","symbol": "BOMB", "contract": "0x74ccbe53F77b08632ce0CB91D3A545bF6B8E0979" }
];

const polisTokens = [
  { "id": "polis","symbol": "POLIS","contract": "0x6FC851B8D66116627Fb1137b9D5FE4E2e1BeA978" },
  { "id": "dai","symbol": "DAI","contract": "0x247123e806a27Ea322bFd93e0273D04602dC942D" },
]

const pulseTokens = [
  { "id": "wrapped-pulse-wpls","symbol": "WPLS","contract": "0xa1077a294dde1b09bb078844df40758a5d0f9a27" },
  { "id": "dai","symbol": "DAI","contract": "0xefD766cCb38EaF1dfd701853BFCe31359239F305" },
  { "id": "weth","symbol": "WETH","contract": "0x02DcdD04e3F455D838cd1249292C58f3B79e3C3C" },
  { "id": "hex","symbol": "HEX","contract": "0x57fde0a71132198BBeC939B98976993d8D89D225" },   //HEX FROM ETHEREUM NETWORK
  { "id": "hex-pulsechain","symbol": "HEX","contract": "0x2b591e99afe9f32eaa6214f7b7629768c40eeb39" },    //HEX FROM PULSE NETWORK
  { "id": "wrapped-bitcoin","symbol": "WBTC","contract": "0xb17D901469B9208B17d916112988A3FeD19b5cA1" },
  { "id": "pulsex","symbol": "PLSX","contract": "0x95b303987a60c71504d99aa1b13b4da07b0790ab" },
  { "id": "velocimeter-flow","symbol": "FLOW","contract": "0x39b9d781dad0810d07e24426c876217218ad353d" }
]

const SmartbchTokens = [
  { "id": "bitcoin-cash","symbol": "WBCH", "contract": "0x3743eC0673453E5009310C727Ba4eaF7b3a1cc04" }
];

const ShimmerTokens = [
  { "id": "shimmer","symbol": "SMR", "contract": "0x1074010000000000000000000000000000000000" },
  { "id": "tangleswap-void","symbol": "VOID", "contract": "0xE5f3dCC241Dd008E3c308e57cf4F7880eA9210F8" }
];

const ScrollTokens = [
  { "id": "weth","symbol": "WETH", "contract": "0x5300000000000000000000000000000000000004" },
  { "id": "usd-coin", "symbol": "USDC", "contract": "0x06efdbff2a14a7c8e15944d1f4a48f9f95f663a4" },
  { "id": "tether", "symbol": "USDT", "contract": "0xf55bec9cafdbe8730f096aa55dad6d22d44099df" },
  { "id": "dodo", "symbol": "DODO", "contract": "0x912aB742e1ab30ffa87038C425F9Bc8ED12B3EF4" }
];

const telosTokens = [
  { "id": "telos", "symbol": "WTLOS","contract": "0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E" },
  { "id": "zappy", "symbol": "ZAP","contract": "0x9A271E3748F59222f5581BaE2540dAa5806b3F77" },
  { "id": "charm", "symbol": "CHARM","contract": "0xd2504a02fABd7E546e41aD39597c377cA8B0E1Df" },
  { "id": "charm", "symbol": "xCHARM","contract": "0x65a5f4636233B7B4c4B134BA414c6EaB9fF79594" },
  { "id": "douge", "symbol": "DOUGE", "contract": "0xc6BC7A8dfA0f57Fe7746Ac434c01cD39679b372c"  },
  { "id": "wrapped-bitcoin", "symbol": "WBTC", "contract": "0xf390830df829cf22c53c8840554b98eafc5dcbc2"  },
  { "id": "weth", "symbol": "WETH", "contract": "0xfa9343c3897324496a05fc75abed6bac29f8a40f" },
  { "id": "usd-coin", "symbol": "USDC", "contract": "0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b"  },
  { "id": "tether","symbol": "USDT", "contract": "0xefaeee334f0fd1712f9a8cc375f427d9cdd40d73" },
  { "id": "elk-finance","symbol": "ELK","contract":"0xE1C110E1B1b4A1deD0cAf3E42BfBdbB7b5d7cE1C" },
  { "id": "wrapped-avax","symbol": "AVAX", "contract": "0x7c598c96d02398d89fbcb9d41eab3df0c16f227d" },
  { "id": "wbnb","symbol": "BNB", "contract": "0x2c78f1b70ccf63cdee49f9233e9faa99d43aa07e" },
  { "id": "wrapped-fantom","symbol": "FTM", "contract": "0xc1be9a4d5d45beeacae296a7bd5fadbfc14602c4" },
  { "id": "wmatic","symbol": "MATIC", "contract": "0x332730a4f6e03d9c55829435f10360e13cfa41ff" },
  { "id": "sushi","symbol": "SUSHI", "contract": "0x922d641a426dcffaef11680e5358f34d97d112e1" }
];

const tenetTokens = [
  { "id": "weth", "symbol": "WETH", "contract": "0x40e8140DDb8E5D9FE1AfB8288Ab06259355a6D4B" },
  { "id": "tenet-1b000f7b-59cb-4e06-89ce-d62b32d362b9", "symbol": "TENET", "contract": "0xd6cb8a253e12893b0cF39Ca78F7d858652cCa1fe" }
];

const ttTokens = [
  { "id": "thunder-token","symbol": "TT","contract": "0x0000000000000000000000000000000000000000" },
  { "id": "usd-coin","symbol": "USDC","contract": "0x22e89898A04eaf43379BeB70bf4E38b1faf8A31e" },
  { "id": "tether", "symbol": "USDT", "contract": "0x4f3C8E20942461e2c3Bdd8311AC57B0c222f2b82"},
  { "id":"binance-usd", "symbol": "BUSD", "contract": "0xBEB0131D95AC3F03fd15894D0aDE5DBf7451d171" },
  { "id":"ethereum", "symbol": "ETHER", "contract": "0x6576bb918709906dcbfdceae4bb1e6df7c8a1077" }
]

const VelasTokens = [
  { "id": "velas", "symbol": "VLX", "contract": "0xc579D1f3CF86749E05CD06f7ADe17856c2CE3126"}
];

const zksyncEraTokens = [
  //{ "id": "nexon","symbol": "NXN", "contract": "0xf823C3cD3CeBE0a1fA952ba88Dc9EEf8e0Bf46AD" },
  { "id": "gemswap-2","symbol": "ZGEM", "contract": "0x2b64237277c605d07f17b96f9627712340c32981" },
  { "id": "weth","symbol": "WETH", "contract": "0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91" },
  { "id": "usd-coin","symbol": "USDC","contract": "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4" },
];

const zkevmPolygonTokens = [
  { "id": "weth","symbol": "WETH", "contract": "0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9" },
  { "id": "usd-coin","symbol": "USDC","contract": "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035" },
  { "id": "quickswap","symbol": "QUICK","contract": "0x68286607a1d43602d880d349187c3c48c0fd05e6" },
  { "id": "tether","symbol": "USDT","contract": "0x493257fD37EDB34451f62EDf8D2a0C418852bA4C" },
  { "id": "binance-usd","symbol": "BUSD","contract": "0x2039bb4116B4EFc145Ec4f0e2eA75012D6C0f181" },
  { "id": "matic-network","symbol": "MATIC","contract": "0x28a487240e4D45CfF4A2980D334CC933B7483842" },
  { "id": "avalanche-2","symbol": "AVAX","contract": "0x6A5279E99CA7786fb13F827Fc1Fb4F61684933d6" },
  { "id": "binancecoin","symbol": "BNB","contract": "0x7400793aAd94C8CA801aa036357d10F5Fd0ce08f"}
];

async function getArbitrumPrices() {
  const idPrices = await lookUpPrices(ArbitrumTokens.map(x => x.id));
  const prices = {}
  for (const bt of ArbitrumTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getArbitrumNovaPrices() {
  const idPrices = await lookUpPrices(ArbitrumNovaTokens.map(x => x.id));
  const prices = {}
  for (const bt of ArbitrumNovaTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getAstarPrices() {
  const idPrices = await lookUpPrices(AstarTokens.map(x => x.id));
  const prices = {}
  for (const bt of AstarTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getAuroraPrices() {
  const idPrices = await lookUpPrices(AuroraTokens.map(x => x.id));
  const prices = {}
  for (const bt of AuroraTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getAvaxPrices() {
  const idPrices = await lookUpPrices(avaxTokens.map(x => x.id));
  const prices = {}
  for (const bt of avaxTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getBasePrices() {
  const idPrices = await lookUpPrices(BaseTokens.map(x => x.id));
  const prices = {}
  for (const bt of BaseTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getBlastPrices() {
  const idPrices = await lookUpPrices(BlastTokens.map(x => x.id));
  const prices = {}
  for (const bt of BlastTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getBobaPrices() {
  const idPrices = await lookUpPrices(BobaTokens.map(x => x.id));
  const prices = {}
  for (const bt of BobaTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getBscPrices() {
  const idPrices = await lookUpPrices(bscTokens.map(x => x.id));
  const prices = {}
  for (const bt of bscTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getCantoPrices() {
  const idPrices = await lookUpPrices(cantoTokens.map(x => x.id));
  const prices = {}
  for (const bt of cantoTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getCeloPrices() {
  const idPrices = await lookUpPrices(celoTokens.map(x => x.id));
  const prices = {}
  for (const bt of celoTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getCorePrices() {
  const idPrices = await lookUpPrices(coreTokens.map(x => x.id));
  const prices = {}
  for (const bt of coreTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getCronosPrices() {
  const idPrices = await lookUpPrices(CronosTokens.map(x => x.id));
  const prices = {}
  for (const bt of CronosTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getDfkPrices() {
  const idPrices = await lookUpPrices(DfkTokens.map(x => x.id));
  const prices = {}
  for (const bt of DfkTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getDogePrices() {
  const idPrices = await lookUpPrices(dogeTokens.map(x => x.id));
  const prices = {}
  for (const bt of dogeTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getEmeraldPrices() {
  const idPrices = await lookUpPrices(EmeraldTokens.map(x => x.id));
  const prices = {}
  for (const bt of EmeraldTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getEthwPrices() {
  const idPrices = await lookUpPrices(EthwTokens.map(x => x.id));
  const prices = {}
  for (const bt of EthwTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getFantomPrices() {
  let idPrices = [];
  let _fantomTokens = [];
  for(let i = 0; i < FantomTokens.length; i++){
    const _idPrices = await lookUpPrices(FantomTokens[i].map(x => x.id));
    idPrices.push(_idPrices);
    for(const token of FantomTokens[i]){
      _fantomTokens.push(token);
    }
  }
  const prices = {}
  for(let i = 0; i < FantomTokens.length; i++){
    for (const bt of _fantomTokens)
      if (idPrices[i][bt.id])
          prices[bt.contract] = idPrices[i][bt.id];
  }
  return prices;
}

async function getEvmosPrices() {
  const idPrices = await lookUpPrices(evmosTokens.map(x => x.id));
  const prices = {}
  for (const bt of evmosTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getFindoraPrices() {
  const idPrices = await lookUpPrices(FindoraTokens.map(x => x.id));
  const prices = {}
  for (const bt of FindoraTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getFusePrices() {
  const idPrices = await lookUpPrices(FuseTokens.map(x => x.id));
  const prices = {}
  for (const bt of FuseTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getFxPrices() {
  const idPrices = await lookUpPrices(FxTokens.map(x => x.id));
  const prices = {}
  for (const bt of FxTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getGoerliPrices() {
  const idPrices = await lookUpPrices(GoerliTokens.map(x => x.id));
  const prices = {}
  for (const bt of GoerliTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getXdaiPrices() {
  const idPrices = await lookUpPrices(xdaiTokens.map(x => x.id));
  const prices = {}
  for (const bt of xdaiTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getHarmonyPrices() {
  const idPrices = await lookUpPrices(HarmonyTokens.map(x => x.id))
  const prices = {}
  for (const bt of HarmonyTokens) if (idPrices[bt.id]) prices[bt.contract] = idPrices[bt.id]
  return prices
}

async function getHecoPrices() {
  const idPrices = await lookUpPrices(hrcTokens.map(x => x.id));
  const prices = {}
  for (const bt of hrcTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getHooPrices() {
  const idPrices = await lookUpPrices(hooTokens.map(x => x.id));
  const prices = {}
  for (const bt of hooTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getIotexPrices() {
  const idPrices = await lookUpPrices(IotexTokens.map(x => x.id));
  const prices = {}
  for (const bt of IotexTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getKavaPrices() {
  const idPrices = await lookUpPrices(KavaTokens.map(x => x.id));
  const prices = {}
  for (const bt of KavaTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getKccPrices() {
  const idPrices = await lookUpPrices(KccTokens.map(x => x.id));
  const prices = {}
  for (const bt of KccTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getKlaytnPrices() {
  const idPrices = await lookUpPrices(KlaytnTokens.map(x => x.id));
  const prices = {}
  for (const bt of KlaytnTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getMaticPrices() {
  const idPrices = await lookUpPrices(maticTokens.map(x => x.id));
  const prices = {}
  for (const bt of maticTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getMantaPrices() {
  const idPrices = await lookUpPrices(MantaTokens.map(x => x.id));
  const prices = {}
  for (const bt of MantaTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getMantlePrices() {
  const idPrices = await lookUpPrices(MantleTokens.map(x => x.id));
  const prices = {}
  for (const bt of MantleTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getMeterPrices() {
  const idPrices = await lookUpPrices(MeterTokens.map(x => x.id));
  const prices = {}
  for (const bt of MeterTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getMetisPrices() {
  const idPrices = await lookUpPrices(MetisTokens.map(x => x.id));
  const prices = {}
  for (const bt of MetisTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getMilkomedaPrices() {
  const idPrices = await lookUpPrices(milkomedaTokens.map(x => x.id));
  const prices = {}
  for (const bt of milkomedaTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getMoonbeamPrices() {
  const idPrices = await lookUpPrices(MoonbeamTokens.map(x => x.id));
  const prices = {}
  for (const bt of MoonbeamTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getMoonriverPrices() {
  const idPrices = await lookUpPrices(MoonriverTokens.map(x => x.id));
  const prices = {}
  for (const bt of MoonriverTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getOkexPrices() {
  const idPrices = await lookUpPrices(OkexTokens.map(x => x.id));
  const prices = {}
  for (const bt of OkexTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getOptimisticPrices() {
  const idPrices = await lookUpPrices(optimisticTokens.map(x => x.id));
  const prices = {}
  for (const bt of optimisticTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getPolisPrices() {
  const idPrices = await lookUpPrices(polisTokens.map(x => x.id));
  const prices = {}
  for (const bt of polisTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getPulsePrices() {
  const idPrices = await lookUpPrices(pulseTokens.map(x => x.id));
  const prices = {}
  for (const bt of pulseTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getSmartbchPrices() {
  const idPrices = await lookUpPrices(SmartbchTokens.map(x => x.id));
  const prices = {}
  for (const bt of SmartbchTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getShimmerPrices() {
  const idPrices = await lookUpPrices(ShimmerTokens.map(x => x.id));
  const prices = {}
  for (const bt of ShimmerTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getScrollPrices() {
  const idPrices = await lookUpPrices(ScrollTokens.map(x => x.id));
  const prices = {}
  for (const bt of ScrollTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getTelosPrices() {
  const idPrices = await lookUpPrices(telosTokens.map(x => x.id));
  const prices = {}
  for (const tt of telosTokens)
      if (idPrices[tt.id])
          prices[tt.contract] = idPrices[tt.id];
  return prices;
}

async function getTenetPrices() {
  const idPrices = await lookUpPrices(tenetTokens.map(x => x.id));
  const prices = {}
  for (const tt of tenetTokens)
      if (idPrices[tt.id])
          prices[tt.contract] = idPrices[tt.id];
  return prices;
}

async function getTTPrices() {
  const idPrices = await lookUpPrices(ttTokens.map(x => x.id));
  const prices = {}
  for (const bt of ttTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getVelasPrices() {
  const idPrices = await lookUpPrices(VelasTokens.map(x => x.id));
  const prices = {}
  for (const bt of VelasTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getZkSyncEraPrices() {
  const idPrices = await lookUpPrices(zksyncEraTokens.map(x => x.id));
  const prices = {}
  for (const bt of zksyncEraTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getZkEvmPolygonPrices() {
  const idPrices = await lookUpPrices(zkevmPolygonTokens.map(x => x.id));
  const prices = {}
  for (const bt of zkevmPolygonTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}