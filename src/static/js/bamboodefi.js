$(function() {
    consoleInit(main)
  });

  async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const ZOOKEEPER_ADDR = "0x5919127587c5a464ea04b050c747d1b2d7a8eae5";
    const ZOOKEEPER_ABI = [{"inputs":[{"internalType":"contract BambooToken","name":"_bamboo","type":"address"},{"internalType":"uint256","name":"_bambooPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"ndays","type":"uint256"}],"name":"BAMBOOBonusWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lockTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"}],"name":"BAMBOODeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BAMBOOWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"TIME_REWARDS_LENGTH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256[12]","name":"_multiplierBonuses","type":"uint256[12]"}],"name":"addStakeMultiplier","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_multiplierBonus","type":"uint256"}],"name":"addYieldMultiplier","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"bamboo","outputs":[{"internalType":"contract BambooToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bambooField","outputs":[{"internalType":"contract BambooField","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bambooPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"bambooUserInfo","outputs":[{"internalType":"uint256","name":"totalAmount","type":"uint256"},{"internalType":"uint256","name":"lastDeposit","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_bamboo","type":"uint256"}],"name":"changeBambooPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_lpToken","type":"address"}],"name":"checkPoolDuplicate","outputs":[],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_lockTime","type":"uint256"}],"name":"depositBamboo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"address","name":"_addr","type":"address"}],"name":"getClaimableBamboo","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"getDepositInfo","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getDeposits","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"getLpAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPoolLength","outputs":[{"internalType":"uint256","name":"count","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_time","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"getStakingMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"getYieldMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isField","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"migrate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"migrator","outputs":[{"internalType":"contract IMigratorKeeper","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minStakeTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_yTime","type":"uint256"},{"internalType":"uint256","name":"_sTime","type":"uint256"}],"name":"minYield","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"minYieldTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingBamboo","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"address","name":"_addr","type":"address"}],"name":"pendingStakeBamboo","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accBambooPerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_proposedOwner","type":"address"}],"name":"proposeOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"removeStakeMultiplier","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"removeYieldMultiplier","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IMigratorKeeper","name":"_migrator","type":"address"}],"name":"setMigrator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"stakeMultipliers","outputs":[{"internalType":"bool","name":"registered","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract BambooField","name":"_bf","type":"address"}],"name":"switchBamboField","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"timeRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"lastLpDeposit","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"validTimeRewards","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_depositId","type":"uint256"}],"name":"withdrawBamboo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_depositId","type":"uint256"}],"name":"withdrawDailyBamboo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"yieldAmounts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"yieldMultipliers","outputs":[{"internalType":"uint256","name":"multiplier","type":"uint256"},{"internalType":"bool","name":"registered","type":"bool"}],"stateMutability":"view","type":"function"}]
    const ZOOKEEPER = new ethers.Contract(ZOOKEEPER_ADDR, ZOOKEEPER_ABI, App.provider);
    const rewardsPerWeek = await ZOOKEEPER.bambooPerBlock() / 1e18 * 604800 / 13.5;

    await printZookeeperContractPoolsTable("Bamboo", App, ZOOKEEPER, ZOOKEEPER_ADDR, ZOOKEEPER_ABI,
        "BAMBOO", "bamboo", null, rewardsPerWeek, "pendingBamboo");

    hideLoading();
  }

async function printZookeeperContractPoolsTable(title, App, chef, chefAddress, chefAbi, rewardTokenTicker,
                                           rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
                                           extraPrices, deathPoolIndices, showAll) {

    let tableData = {
        "title": title,
        "heading": [
            "#",
            "Pair",
            "Total Staked",
            "Total $ Staked",
            "Reward",
            "APR",
            "My Stake",
        ],
        "rows": []
    }

    const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

    const poolCount = parseInt(await chefContract.getPoolLength(), 10);
    const totalAllocPoints = await chefContract.totalAllocPoint();

    _print(`<a href='https://etherscan.io/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
    _print(`Found ${poolCount} pools.\n`)

    _print(`Showing incentivized pools only.\n`);

    var tokens = {};

    const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
    const rewardToken = await getToken(App, rewardTokenAddress, chefAddress);
    const rewardsPerWeek = rewardsPerWeekFixed ??
        await chefContract.callStatic[rewardsPerBlockFunction]()
        / 10 ** rewardToken.decimals * 604800 / 13.5

    const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) => {
        try {
            return await getPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction, showAll);
        }
        catch (ex) {
            console.log(`Error loading pool ${x}: ${ex}`);
            return null;
        }
    }));

    var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x?.poolToken).map(x => x.poolToken.tokens));
    var prices = await lookUpTokenPrices(tokenAddresses);
    if (extraPrices) {
        for (const [k,v] of Object.entries(extraPrices)) {
            if (v.usd) {
                prices[k] = v
            }
        }
    }

    await Promise.all(tokenAddresses.map(async (address) => {
        tokens[address] = await getToken(App, address, chefAddress);
    }));

    if (deathPoolIndices) {
        deathPoolIndices.map(i => poolInfos[i])
            .map(poolInfo =>
                poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "eth") : undefined);
    }

    const poolPrices = poolInfos.map(poolInfo => poolInfo?.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken) : undefined);

    _print("Finished reading smart contracts.\n");

    for (let i = 0; i < poolCount; i++) {
        if (poolPrices[i]) {
            let pool = buildChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
                totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                pendingRewardsFunction)

            if (pool) {
                tableData.rows.push([
                    _build_link(`${i}`, () => {
                        document.getElementById("pool-details-modal").style.display = 'block'

                        let table = new AsciiTable();

                        let tableData = {
                            "title": pool.pair_link,
                            "rows": []
                        }
                        table.addRow(["Pair", pool.pair_link])
                        table.addRow(["TVL", pool.tvl])

                        if (pool.add_liquidity_link) {
                            table.addRow(["Add Liquidity", pool.add_liquidity_link])
                            table.addRow(["Remove Liquidity", pool.remove_liquidity_link])
                            table.addRow(["Swap", pool.swap_link])
                            table.addRow([`${pool.token0} Price`, pool.price0])
                            table.addRow([`${pool.token1} Price`, pool.price1])
                        }

                        table.addRow([`${pool.reward_token} Weekly rewards`, pool.weekly_rewards])
                        table.addRow(["Total staked", `${pool.total_staked} (${pool.total_staked_dollars})`])
                        table.addRow(["My stake", pool.user_stake])
                        table.addRow(["DPR", pool.dpr])
                        table.addRow(["WPR", pool.wpr])
                        table.addRow(["APR", pool.apr])
                        table.addRow(["Stake", pool.stake])
                        table.addRow(["Unstake", pool.unstake])
                        table.addRow(["Claim", pool.claim])

                        document.getElementById('pool-details-content').innerHTML += table + '<br />';

                    }),
                    _truncate_link(pool.pair_link.replace(/\u0000/g,""), 20),
                    pool.total_staked,
                    pool.total_staked_dollars,
                    pool.reward_token,
                    pool.apr,
                    pool.user_stake,
                ])

            }
        }
    }

    let table = new AsciiTable().fromJSON(tableData);
    table
        .setAlign(0, AsciiTable.RIGHT)
        .setAlign(2, AsciiTable.RIGHT)
        .setAlign(3, AsciiTable.RIGHT)
        .setAlign(5, AsciiTable.RIGHT)

    document.getElementById('log').innerHTML += table + '<br />';

}
