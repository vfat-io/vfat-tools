$(function() {
consoleInit(main)
  });

  async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const BPT_ADDR = "0x321849c98b28756274443287653607ec5d747b8f"
    const MARK_FAUCET_ADDR = "0x5D9972dD3Ba5602574ABeA6bF9E1713568D49903";

    await loadChefContract(App, null, BPT_ADDR, MARK_FAUCET_ABI, "MARK",
        "MARK", "markPerBlock", null, "pendingMark");

    _print("");

    await loadChefContract(App, null, MARK_FAUCET_ADDR, MARK_FAUCET_ABI, "MARK",
        "MARK", "markPerBlock", null, "pendingMark");

    hideLoading();
  }
