
$(function() {
consoleInit(main)
});

const NETT_STAKING_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_owner","internalType":"address"},{"type":"address","name":"_rewardsToken","internalType":"address"},{"type":"address","name":"_stakingToken","internalType":"address"}]},{"type":"event","name":"OwnerChanged","inputs":[{"type":"address","name":"oldOwner","internalType":"address","indexed":false},{"type":"address","name":"newOwner","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"OwnerNominated","inputs":[{"type":"address","name":"newOwner","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"PauseChanged","inputs":[{"type":"bool","name":"isPaused","internalType":"bool","indexed":false}],"anonymous":false},{"type":"event","name":"Recovered","inputs":[{"type":"address","name":"token","internalType":"address","indexed":false},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardAdded","inputs":[{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardPaid","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardsDurationUpdated","inputs":[{"type":"uint256","name":"newDuration","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Staked","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Withdrawn","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"acceptOwnership","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"earned","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"exit","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"getReward","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getRewardForDuration","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastPauseTime","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastTimeRewardApplicable","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastUpdateTime","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"nominateNewOwner","inputs":[{"type":"address","name":"_owner","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"nominatedOwner","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"notifyRewardAmount","inputs":[{"type":"uint256","name":"reward","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"paused","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"periodFinish","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"recoverERC20","inputs":[{"type":"address","name":"tokenAddress","internalType":"address"},{"type":"uint256","name":"tokenAmount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerTokenStored","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardRate","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewards","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardsDuration","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"rewardsToken","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setPaused","inputs":[{"type":"bool","name":"_paused","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setRewardsDuration","inputs":[{"type":"uint256","name":"_rewardsDuration","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"stake","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"stakingToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"userRewardPerTokenPaid","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]}]

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const tokens = {};
  const prices = await getMetisPrices();

  const pool0 = {
    address : "0x4d2F0f5409B51172dc229b3c8dCaa1365a9C9C27",
    abi: NETT_STAKING_ABI,
    stakeTokenFunction: "stakingToken",
    rewardTokenFunction: "rewardsToken"
  }

  await loadNettSynthetixPoolInfo(App, tokens, prices, pool0.abi, pool0.address, "0x60312d4EbBF3617d3D33841906b5868A86931Cbd")

  let p0 = await loadMetisSynthetixPool(App, tokens, prices, pool0.abi, pool0.address, pool0.rewardTokenFunction, pool0.stakeTokenFunction)

  _print_bold(`Total staked: $${formatMoney(p0.staked_tvl )}`);
  if (p0.totalUserStaked > 0) {
    _print(`You are staking a total of $${formatMoney(p0.totalUserStaked)} at an APR of ${(p0.totalAPR * 100).toFixed(2)}%\n`);
  }

  hideLoading();
}

async function loadNettSynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
  stakeTokenAddress) {
        const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);

        var stakeToken = await getMetisToken(App, stakeTokenAddress, stakingAddress);

        var newPriceAddresses = stakeToken.tokens.filter(x =>
          !getParameterCaseInsensitive(prices, x));
        var newPrices = await lookUpTokenPrices(newPriceAddresses);
        for (const key in newPrices) {
          if (newPrices[key]?.usd)
              prices[key] = newPrices[key];
        }
        var newTokenAddresses = stakeToken.tokens.filter(x =>
          !getParameterCaseInsensitive(tokens,x));
        for (const address of newTokenAddresses) {
            tokens[address] = await getMetisToken(App, address, stakingAddress);
        }

        const poolPrices = getPoolPrices(tokens, prices, stakeToken, "metis");

        if (!poolPrices)
        {
          console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
          return null;
        }

        const stakeTokenTicker = poolPrices.stakeTokenTicker;

        const stakeTokenPrice =
            prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;

        const staked_tvl = poolPrices.staked_tvl;

        const userUnstaked = stakeToken.unstaked;

        return  {
          stakingAddress,
          poolPrices,
          stakeTokenAddress,
          stakeTokenTicker,
          stakeTokenPrice,
          staked_tvl,
          userUnstaked,
        }
  }