$(function() {
  consoleInit(main)
});

async function main() {
  const App = await init_ethers();

    let connectedNetwork = await App.provider.getNetwork();
    let connectedNetworkName = networkNameFromId(connectedNetwork.chainId);

    const targetNetworkNfts = ClpFactories.filter(c => c.network.toLowerCase() === connectedNetworkName.toLowerCase());

    _print_bold(`Your NFTs on ${connectedNetworkName} are`);
    _print_bold(`--------------------------------------------`);
    _print_bold("");

    for(nftObj of targetNetworkNfts){
      const NFT = new ethers.Contract(nftObj.nftAddress, GENERAL_NFT_MANAGER_ABI, App.provider);
      const ownedNfts = await NFT.balanceOf(App.YOUR_ADDRESS) / 1;
      if(ownedNfts <= 0){
        _print(`You dont have (${nftObj.nftAddress}) NFT to break on ${connectedNetworkName} network`);
        _print("");
      }
      for(let i = 0; i < ownedNfts; i++){
        const nftId = await NFT.tokenOfOwnerByIndex(App.YOUR_ADDRESS, i);
        const positions = await NFT.positions(nftId);
        const liquidity = positions[7];
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const nftAddress = nftObj.nftAddress;
        const amount0Max = 340282366920938463463374607431768211455n;
        const amount1Max = 340282366920938463463374607431768211455n;
        const params = {
          tokenId: nftId,
          liquidity: liquidity,
          amount0Min: 0,
          amount1Min: 0,
          deadline: currentTimestamp + 500,
        }
        const collectParams = {
          tokenId: nftId,
          recipient: App.YOUR_ADDRESS,
          amount0Max: amount0Max,
          amount1Max: amount1Max,
        }
        const withdraw = async function() {
          return cl_withdraw(params, collectParams, nftId, nftAddress, App)
        }
        _print(`NFT ID: ${nftId} NFT ADDRESS: ${nftObj.nftAddress}`);
        _print_link(`BREAK NFT`, withdraw);
        _print("");

        await sleepFunc(1000);
      }
    }

    hideLoading();
}

const cl_withdraw = async function(params, collectParams, nftId, nftAddress, App) {
  const signer = App.provider.getSigner()

  const NFT_MANAGER = new ethers.Contract(nftAddress, GENERAL_NFT_MANAGER_ABI, signer);

  const iface = new ethers.utils.Interface(GENERAL_NFT_MANAGER_ABI);

  const decreaseLiquidity = iface.encodeFunctionData("decreaseLiquidity", [params]);
  const collect = iface.encodeFunctionData("collect", [collectParams]);
  const burn = iface.encodeFunctionData("burn", [nftId]);

  const data = [decreaseLiquidity, collect, burn];

    showLoading()
    NFT_MANAGER.multicall(data)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
          .then(t => refresh(t.hash))
          .catch(err => transactionFailed(err));
      })
      .catch(function(err) {
        console.log(err)
        hideLoading()
      })
}