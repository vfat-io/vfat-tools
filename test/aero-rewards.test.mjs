import { test } from 'node:test'
import assert from 'node:assert/strict'
import { ethers } from 'ethers'
import { resolveAeroRewardToken, clRewards } from '../src/js/aero_rewards.mjs'

const address = number => ethers.utils.getAddress(ethers.utils.hexZeroPad(ethers.utils.hexlify(number), 20))
const [leaf, leafOrchestrator, adapter, rootOrchestrator, rootVoter, receipt, reward] = [1, 2, 3, 4, 5, 6, 7].map(address)

function deployment (rootChainId = 8453, changes = {}) {
  const values = new Map([
    [leaf + ':ORCHESTRATOR', leafOrchestrator],
    [leafOrchestrator + ':ROOT_CHAIN_ID', ethers.BigNumber.from(rootChainId)],
    [leafOrchestrator + ':adapter', adapter],
    [adapter + ':ROOT_MESSAGE_ORCHESTRATOR', rootOrchestrator],
    [adapter + ':LEAF_MESSAGE_ORCHESTRATOR', leafOrchestrator],
    [rootOrchestrator + ':VOTER', rootVoter],
    [rootVoter + ':TOKEN', reward],
    ...Object.entries(changes)
  ])
  const reads = []
  const batch = async calls => calls.map(call => {
    reads.push(call.target + ':' + call.method)
    const value = values.get(call.target + ':' + call.method)
    if (value == null) return call.fallback
    // Exercise ABI return decoding, including the uint256 root chain ID.
    return call.iface.decodeFunctionResult(call.method, call.iface.encodeFunctionResult(call.method, [value]))[0]
  })
  return { batch, reads }
}

for (const chainId of [1, 10, 57073, 4663, 42161, 5042]) {
  test('leaf chain ' + chainId + ' keeps its local receipt token', async () => {
    const { batch, reads } = deployment()
    assert.equal(await resolveAeroRewardToken(batch, chainId, leaf, receipt), receipt)
    assert(!reads.includes(rootVoter + ':TOKEN'))
  })
}

test('root claims use the redeemed token rather than the burned receipt', async () => {
  const { batch } = deployment()
  assert.equal(await resolveAeroRewardToken(batch, 8453, leaf, receipt), reward)
  const movedRoot = deployment(123)
  assert.equal(await resolveAeroRewardToken(movedRoot.batch, 123, leaf, receipt), reward)
})

for (const key of [
  leaf + ':ORCHESTRATOR',
  leafOrchestrator + ':ROOT_CHAIN_ID',
  leafOrchestrator + ':adapter',
  adapter + ':ROOT_MESSAGE_ORCHESTRATOR',
  adapter + ':LEAF_MESSAGE_ORCHESTRATOR',
  rootOrchestrator + ':VOTER',
  rootVoter + ':TOKEN'
]) {
  test('missing ' + key.split(':')[1] + ' leaves the root reward unknown', async () => {
    const { batch } = deployment(8453, { [key]: null })
    assert.equal(await resolveAeroRewardToken(batch, 8453, leaf, receipt), null)
  })
}

test('an adapter bound to a different leaf cannot select a sweep token', async () => {
  const { batch } = deployment(8453, { [adapter + ':LEAF_MESSAGE_ORCHESTRATOR']: address(9) })
  assert.equal(await resolveAeroRewardToken(batch, 8453, leaf, receipt), null)
})

test('invalid token addresses and transport failures cannot select a sweep token', async () => {
  assert.equal(await resolveAeroRewardToken(deployment().batch, 8453, leaf, ethers.constants.AddressZero), null)
  assert.equal(await resolveAeroRewardToken(deployment(8453, { [rootVoter + ':TOKEN']: ethers.constants.AddressZero }).batch, 8453, leaf, receipt), null)
  await assert.rejects(resolveAeroRewardToken(async () => { throw new Error('RPC unavailable') }, 8453, leaf, receipt), /RPC unavailable/)
})

test('CL reward reads select one NFT using the deployed array overload', () => {
  const deployed = new ethers.utils.Interface(['function earned(address,uint256[]) view returns(uint256)'])
  for (const id of ['1', '9007199254740993']) {
    const call = deployed.parseTransaction({ data: clRewards.encodeFunctionData('earned', [leaf, [id]]) })
    assert.equal(call.signature, 'earned(address,uint256[])')
    assert.equal(call.args[0], leaf)
    assert.deepEqual(call.args[1].map(String), [id])
  }
})
