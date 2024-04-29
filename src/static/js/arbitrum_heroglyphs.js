
$(function () {
  consoleInit(main);
});

const HEROGLYPHS_ABI = [{ "inputs": [{ "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "string", "name": "_symbol", "type": "string" }, { "internalType": "string", "name": "_displayName", "type": "string" }, { "internalType": "string", "name": "_imageURI", "type": "string" }, { "internalType": "address", "name": "_owner", "type": "address" }, { "internalType": "address", "name": "_localLzEndpoint", "type": "address" }, { "internalType": "uint32", "name": "_lzGasLimit", "type": "uint32" }, { "internalType": "uint256", "name": "_maxSupply", "type": "uint256" }, { "internalType": "uint256", "name": "_cost", "type": "uint256" }, { "internalType": "address", "name": "_inputToken", "type": "address" }, { "internalType": "address", "name": "_treasury", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }], "name": "AddressEmptyCode", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "AddressInsufficientBalance", "type": "error" }, { "inputs": [], "name": "ConversionOutOfBounds", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "address", "name": "owner", "type": "address" }], "name": "ERC721IncorrectOwner", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ERC721InsufficientApproval", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "approver", "type": "address" }], "name": "ERC721InvalidApprover", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }], "name": "ERC721InvalidOperator", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "ERC721InvalidOwner", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "receiver", "type": "address" }], "name": "ERC721InvalidReceiver", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }], "name": "ERC721InvalidSender", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ERC721NonexistentToken", "type": "error" }, { "inputs": [], "name": "FailedInnerCall", "type": "error" }, { "inputs": [], "name": "FailedToSendETH", "type": "error" }, { "inputs": [], "name": "FailedToTransfer", "type": "error" }, { "inputs": [], "name": "GasLimitCannotBeZero", "type": "error" }, { "inputs": [], "name": "InvalidAmount", "type": "error" }, { "inputs": [], "name": "InvalidDelegate", "type": "error" }, { "inputs": [], "name": "InvalidEndpointCall", "type": "error" }, { "inputs": [{ "internalType": "uint16", "name": "optionType", "type": "uint16" }], "name": "InvalidOptionType", "type": "error" }, { "inputs": [], "name": "LzTokenUnavailable", "type": "error" }, { "inputs": [], "name": "MaxSupplyReached", "type": "error" }, { "inputs": [], "name": "NFTOwnerIsNotContract", "type": "error" }, { "inputs": [{ "internalType": "uint32", "name": "eid", "type": "uint32" }], "name": "NoPeer", "type": "error" }, { "inputs": [], "name": "NotEnough", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "msgValue", "type": "uint256" }], "name": "NotEnoughNative", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "addr", "type": "address" }], "name": "OnlyEndpoint", "type": "error" }, { "inputs": [{ "internalType": "uint32", "name": "eid", "type": "uint32" }, { "internalType": "bytes32", "name": "sender", "type": "bytes32" }], "name": "OnlyPeer", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "OwnableInvalidOwner", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "OwnableUnauthorizedAccount", "type": "error" }, { "inputs": [{ "internalType": "uint8", "name": "bits", "type": "uint8" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "SafeCastOverflowedUintDowncast", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }], "name": "SafeERC20FailedOperation", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "amountLD", "type": "uint256" }, { "internalType": "uint256", "name": "minAmountLD", "type": "uint256" }], "name": "SlippageExceeded", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "guid", "type": "bytes32" }, { "indexed": true, "internalType": "uint32", "name": "sourceEndpointId", "type": "uint32" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amountOrId", "type": "uint256" }], "name": "OFTReceived", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "guid", "type": "bytes32" }, { "indexed": true, "internalType": "uint32", "name": "destinationEndpointId", "type": "uint32" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amountOrId", "type": "uint256" }], "name": "OFTSent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint32", "name": "eid", "type": "uint32" }, { "indexed": false, "internalType": "bytes32", "name": "peer", "type": "bytes32" }], "name": "PeerSet", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "components": [{ "internalType": "uint32", "name": "srcEid", "type": "uint32" }, { "internalType": "bytes32", "name": "sender", "type": "bytes32" }, { "internalType": "uint64", "name": "nonce", "type": "uint64" }], "internalType": "struct Origin", "name": "origin", "type": "tuple" }], "name": "allowInitializePath", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "buy", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "claimFund", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "composeMsgSender", "outputs": [{ "internalType": "address", "name": "sender", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "contractURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "cost", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "defaultLzOption", "outputs": [{ "internalType": "bytes", "name": "", "type": "bytes" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "endpoint", "outputs": [{ "internalType": "contract ILayerZeroEndpointV2", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint32", "name": "_dstEid", "type": "uint32" }, { "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_tokenId", "type": "uint256" }], "name": "estimateFee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getCostInWEI", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }], "name": "getPendingToClaim", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "inputToken", "outputs": [{ "internalType": "contract IERC20Metadata", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lzGasLimit", "outputs": [{ "internalType": "uint32", "name": "", "type": "uint32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "uint32", "name": "srcEid", "type": "uint32" }, { "internalType": "bytes32", "name": "sender", "type": "bytes32" }, { "internalType": "uint64", "name": "nonce", "type": "uint64" }], "internalType": "struct Origin", "name": "_origin", "type": "tuple" }, { "internalType": "bytes32", "name": "_guid", "type": "bytes32" }, { "internalType": "bytes", "name": "_message", "type": "bytes" }, { "internalType": "address", "name": "_executor", "type": "address" }, { "internalType": "bytes", "name": "_extraData", "type": "bytes" }], "name": "lzReceive", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "maxSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint32", "name": "", "type": "uint32" }, { "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "nextNonce", "outputs": [{ "internalType": "uint64", "name": "nonce", "type": "uint64" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "oAppVersion", "outputs": [{ "internalType": "uint64", "name": "senderVersion", "type": "uint64" }, { "internalType": "uint64", "name": "receiverVersion", "type": "uint64" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "bytes", "name": "", "type": "bytes" }], "name": "onERC721Received", "outputs": [{ "internalType": "bytes4", "name": "", "type": "bytes4" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint32", "name": "eid", "type": "uint32" }], "name": "peers", "outputs": [{ "internalType": "bytes32", "name": "peer", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint32", "name": "_dstEid", "type": "uint32" }, { "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "_minAmountOut", "type": "uint256" }], "name": "send", "outputs": [{ "components": [{ "internalType": "bytes32", "name": "guid", "type": "bytes32" }, { "internalType": "uint64", "name": "nonce", "type": "uint64" }, { "components": [{ "internalType": "uint256", "name": "nativeFee", "type": "uint256" }, { "internalType": "uint256", "name": "lzTokenFee", "type": "uint256" }], "internalType": "struct MessagingFee", "name": "fee", "type": "tuple" }], "internalType": "struct MessagingReceipt", "name": "msgReceipt", "type": "tuple" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_delegate", "type": "address" }], "name": "setDelegate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint32", "name": "_eid", "type": "uint32" }, { "internalType": "bytes32", "name": "_peer", "type": "bytes32" }], "name": "setPeer", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "treasury", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint32", "name": "_lzGasLimit", "type": "uint32" }], "name": "updateLayerZeroGasLimit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const tokens = {};
  const prices = await getArbitrumPrices();

  const HEROGLYPHS_ADDR = ["0x7d35995ec68bca71849068e0fc91eb75641c9aa8",
    "0xb8F977f9cb94ca72d71eC6466785605319c83F0C",
    "0x84Bc8D2a2c6281F15afC18C896766D64EF93bf02",
    "0xf4E131ba5E4678bd00e8DBd508f5820fE453A51D",
    "0xbc75c6a9021a97c3343DC5c52eA2E13E5F1f852c",
    "0x6F2Ffdd387f01A0573Ca40628EaCF9dBe5240731",
    "0x01d7Ef2ab555C800f0818edfc6A9744B79771DA1",
    "0xbcEDcFf31C68B1fb362FaEBe36917B35643DE471",
    "0x1910bFE60B28b751b19Ba1C266674eB61b7e6D2B",
    "0x518AD4c19FeA481f743B8dE33Ff1ec1796f94023",
    "0x30dA1A8b1673Db2eEE02c72682097290b11325Fd",
    "0xC38F5a1aA46853Be3BfbFcF00562E01856867ba7",
    "0xF5E0DFEf32e0e6dB9882af1750c08e9497459100",
    "0xE077E5f63C34B611a913B3FCBFADAA3b25991733",
    "0x32E707B2Fa13851Ae5A8D5d610B236aB3ad5687f",
    //  "0xD37e64dD683BeDD72259e861D53c29bE51Ee8E04"
  ];

  const inputTokens = [
    "0x498Bf2B1e120FeD3ad3D42EA2165E9b73f99C1e5",
    "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
    "0x1509706a6c66CA549ff0cB464de88231DDBe213B",
    "0xa0b862F60edEf4452F25B4160F177db44DeB6Cf1",
    "0x59D9356E565Ab3A36dD77763Fc0d87fEaf85508C",
    "0x178412e79c25968a32e89b11f63B33F733770c2A",
    "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    "0x4425742F1EC8D98779690b5A3A6276Db85Ddc01A"
  ];

  for (const address of inputTokens) {
    tokens[address] = await getGlyphTokens(App, address, App.YOUR_ADDRESS);
  }

  for (const HEROGLYPH_ADDR of HEROGLYPHS_ADDR) {
    await showGlyphs(App, HEROGLYPH_ADDR, tokens, prices);
  }

  hideLoading();
}

async function showGlyphs(App, contractAddress, tokens, prices) {
  const HEROGLYPHS = new ethcall.Contract(contractAddress, HEROGLYPHS_ABI);

  const calls = [HEROGLYPHS.totalSupply(), HEROGLYPHS.maxSupply(), HEROGLYPHS.balanceOf(App.YOUR_ADDRESS),
  HEROGLYPHS.cost(), HEROGLYPHS.inputToken(), HEROGLYPHS.symbol()];

  const [totalMinted, maxSupply, usersGlyphs, costInWei, inputTokenAddress, nftSymbol_key] = await App.ethcallProvider.all(calls);

  const nftSymbol = nftSymbol_key.replace("_KEY", "");

  const mintNewGlyph_ETH = async function () {
    return mint_New_Glyph_ETH(costInWei, contractAddress, App);
  };

  const mintNewGlyph = async function () {
    return mint_New_Glyph(inputTokenAddress, costInWei, contractAddress, App);
  };

  _print_bold(`Glyph - (${nftSymbol})`);
  _print(`Total Minted: ${totalMinted} of ${maxSupply}`);
  _print(`Owned Glyphs: ${usersGlyphs}`);
  if (+totalMinted !== +maxSupply) {
    if (inputTokenAddress === "0x0000000000000000000000000000000000000000") {
      _print(`Cost to mint: ${costInWei / 1e18} ETH`);
      _print_link(`Mint with ${costInWei / 1e18} ETH`, mintNewGlyph_ETH);
    } else {
      const inputToken = getParameterCaseInsensitive(tokens, inputTokenAddress);
      _print(`Cost to mint: ${costInWei / 10 ** inputToken.decimals} ${inputToken.symbol}`);
      _print_link(`Mint with ${costInWei / 10 ** inputToken.decimals} ${inputToken.symbol}`, mintNewGlyph);
    }
  } else {
    _print("Minted out");
  }
  _print("");
}

const mint_New_Glyph_ETH = async function (costInWei, contractAddress, App) {
  const signer = App.provider.getSigner();

  const GLYPH = new ethers.Contract(contractAddress, HEROGLYPHS_ABI, signer);

  showLoading();
  GLYPH.buy({ value: costInWei })
    .then(function (t) {
      return App.provider.waitForTransaction(t.hash);
    })
    .catch(function () {
      alert("you don't have the appropriate amount to buy a Glyph");
      hideLoading();
    });
};

const mint_New_Glyph = async function (inputTokenAddress, costInWei, contractAddress, App, maxAllowance) {
  const signer = App.provider.getSigner();

  const TEND_TOKEN = new ethers.Contract(inputTokenAddress, ERC20_ABI, signer);
  const WEEBTEND_V2_TOKEN = new ethers.Contract(contractAddress, HEROGLYPHS_ABI, signer);

  const balanceOf = await TEND_TOKEN.balanceOf(App.YOUR_ADDRESS);
  const currentTEND = maxAllowance ? (maxAllowance / 1e18 < balanceOf / 1e18
    ? maxAllowance : balanceOf) : balanceOf;
  const allowedTEND = await TEND_TOKEN.allowance(App.YOUR_ADDRESS, contractAddress);

  let allow = Promise.resolve();

  if (allowedTEND / 1e18 < currentTEND / 1e18) {
    showLoading();
    allow = TEND_TOKEN.approve(contractAddress, ethers.constants.MaxUint256)
      .then(function (t) {
        return App.provider.waitForTransaction(t.hash);
      })
      .catch(function () {
        hideLoading();
        alert('Try resetting your approval to 0 first');
      });
  }

  if (currentTEND / 1e18 > 0) {
    showLoading();
    allow
      .then(async function () {
        WEEBTEND_V2_TOKEN.buy(costInWei)
          .then(function (t) {
            App.provider.waitForTransaction(t.hash).then(function () {
              hideLoading();
            });
          })
          .catch(x => {
            hideLoading();
            console.log(x);
            _print('Something went wrong.');
          });
      })
      .catch(x => {
        hideLoading();
        console.log(x);
        _print('Something went wrong.');
      });
  } else {
    alert('You have no tokens to stake!!');
  }
};

async function getGlyphTokens(app, address, stakingAddress) {
  const token = new ethcall.Contract(address, ERC20_ABI);
  const calls = [token.decimals(), token.balanceOf(stakingAddress), token.balanceOf(app.YOUR_ADDRESS),
  token.name(), token.symbol(), token.totalSupply()];
  const [decimals, staked, unstaked, name, symbol, totalSupply] = await app.ethcallProvider.all(calls);
  return {
    address,
    name,
    symbol,
    totalSupply,
    decimals: decimals,
    staked: staked / 10 ** decimals,
    unstaked: unstaked / 10 ** decimals,
    contract: token,
    tokens: [address]
  };
}