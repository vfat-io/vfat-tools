$(function() {
  consoleInit(main)
})

const YOLO_CHEF_ABI = [
    'function getMaxYoloTxAmount() external view returns (uint256)',

    'function getNextDrawBlock() external view returns (uint)',

    'function getTotalDivParticipants() external view returns (uint)',

    'function getTotalDrawParticipants() external view returns (uint)',

    'function getFomoFund() external view returns (uint256)',

    'function getFomoFundRaw() external view returns (uint256)',

    'function getMetrics() external view returns (uint256[] memory)',

    'function getPairAdd() external view returns (address)',

    'function getLockerAddresses() external view returns (address[] memory)',

    'function getProfitStats() external view returns (uint256[] memory)',

    'function tokensInCirculations() external view returns(uint256)',

    'function getDivParticipantAt(uint index) public view returns (address)',

    'function getParticipantAt(uint index) public view returns (address)',

    'function getDivParticipantMinReq(address id) public view returns (uint)',
]

const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

async function main() {
    const App = await init_ethers()

    _print(`Initialized ${App.YOUR_ADDRESS}\n`)
    _print('Reading smart contracts...\n')

    const YOLO_CHEF_ADDR = '0xf19a0a7bdabd710fa2c33df432760c9bec195011'
    const rewardTokenTicker = 'YoloDraw'
    const YoloChef = new ethers.Contract(YOLO_CHEF_ADDR, YOLO_CHEF_ABI, App.provider)

    const profitStats = await YoloChef.getProfitStats()
    const metrics = await YoloChef.getMetrics()

    const bootedInXRounds = 4 - (+metrics[5])
    const isBoosted = bootedInXRounds === 0

    const divRеwardInBNB = profitStats[1] / 1e18

    const d = (((divRеwardInBNB / (isBoosted ? 2 : 1) * 1.2 * 48) / 4.3) * 100)
    const d10 = (((divRеwardInBNB / (isBoosted ? 2 : 1) * 1.2 * 48) / 10) * 100)
    const APY = formatNumber((d * 365).toFixed(2))
    const APY10 = formatNumber((d10 * 365).toFixed(2))

    const tokens = {}
    const prices = await getBscPrices()

    _print(`APY:  +  Daily ${d.toFixed(2)} % +  Yearly $${APY}\n`)

    // await loadBscChefContract(App, tokens, prices, YoloChef, YOLO_CHEF_ADDR, YOLO_CHEF_ABI, rewardTokenTicker,
    //     'yolo', null, rewardsPerWeek, 'pendingCake')

    hideLoading()
}

