const clChefAbi = [
  'function poolLength() view returns(uint256)',
  'function totalAllocPoint() view returns(uint256)',
  'function rewardToken() view returns(address)',
  'function poolInfo(uint256) view returns(uint256,address,address,address,uint256,uint256)',
  'function userPositionInfos(uint256) view returns(uint128,int24,int24,uint256,uint256,address,uint256,uint40)',
  'function pendingReward(uint256) view returns(uint256)',
  'function mevResistanceWindow() view returns(uint256)',
  'function harvest(uint256,address)',
  'function withdraw(uint256,address)'
]

function clPoolIds (count) {
  return Array.from({ length: count }, (_, index) => index + 1)
}

function encodeClAction (iface, kind, tokenId, recipient) {
  const method = kind === 'clHarvest' ? 'harvest' : kind === 'clWithdraw' ? 'withdraw' : null
  if (!method) throw new Error('Unsupported GIGA CL action.')
  return iface.encodeFunctionData(method, [tokenId, recipient])
}

async function assertClClaimUnlocked (provider, iface, chef, tx) {
  if (tx.to.toLowerCase() !== chef.toLowerCase()) return
  const action = iface.parseTransaction({ data: tx.data })
  if (action.name !== 'harvest' && action.name !== 'withdraw') return

  // A successful harvest simulation can still forfeit rewards. Read both
  // protection inputs at one block immediately before requesting a signature.
  const block = await provider.request({ method: 'eth_getBlockByNumber', params: ['latest', false] })
  if (!block || !block.number || !block.timestamp) throw new Error('Unable to check GIGA reward protection. Try again.')
  const read = async (method, args) => {
    const data = iface.encodeFunctionData(method, args)
    const result = await provider.request({ method: 'eth_call', params: [{ to: chef, data }, block.number] })
    return iface.decodeFunctionResult(method, result)
  }
  const window = await read('mevResistanceWindow', [])
  if (BigInt(window[0].toString()) === 0n) return
  const position = await read('userPositionInfos', [action.args[0]])
  const unlock = BigInt(position[7].toString()) + BigInt(window[0].toString())
  const now = BigInt(block.timestamp)
  if (now < unlock) {
    throw new Error('GIGA rewards are protected for another ' + (unlock - now) + ' seconds. Wait before harvesting or withdrawing to avoid forfeiting rewards.')
  }
}

module.exports = { clChefAbi, clPoolIds, encodeClAction, assertClClaimUnlocked }
