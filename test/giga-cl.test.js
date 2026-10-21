const { test } = require('node:test')
const assert = require('node:assert/strict')
const { ethers } = require('ethers')
const { clChefAbi, clPoolIds, encodeClAction, assertClClaimUnlocked } = require('../src/js/giga_cl')

const iface = new ethers.utils.Interface(clChefAbi)
const chef = '0x60380925A8b1007F70f60A6A42bffE391374B09a'
const owner = '0x0000000000000000000000000000000000000001'
// An independently declared deployed signature catches mistakes in the page ABI.
const deployed = new ethers.utils.Interface(['function withdraw(uint256,address)', 'function harvest(uint256,address)'])

function provider (timestamp, lastChange = 1000, window = 120) {
  const reads = []
  return {
    reads,
    async request ({ method, params }) {
      if (method === 'eth_getBlockByNumber') return { number: '0x123', timestamp: '0x' + timestamp.toString(16) }
      assert.equal(method, 'eth_call')
      reads.push(params[1])
      const call = iface.parseTransaction({ data: params[0].data })
      if (call.name === 'mevResistanceWindow') return iface.encodeFunctionResult(call.name, [window])
      assert.equal(call.name, 'userPositionInfos')
      assert.equal(call.args[0].toString(), '15867')
      return iface.encodeFunctionResult(call.name, [1, -10, 10, 0, 50, owner, 3, lastChange])
    }
  }
}

test('CL discovery includes the newest one-based pool and handles an empty chef', () => {
  assert.deepEqual(clPoolIds(3), [1, 2, 3])
  assert.deepEqual(clPoolIds(0), [])
})

for (const kind of ['clHarvest', 'clWithdraw']) {
  const tx = { to: chef, data: encodeClAction(iface, kind, '15867', owner) }
  test(kind + ' encodes the deployed recipient-bearing ABI', () => {
    const call = deployed.parseTransaction({ data: tx.data })
    assert.equal(call.name, kind === 'clHarvest' ? 'harvest' : 'withdraw')
    assert.equal(call.args[0].toString(), '15867')
    assert.equal(call.args[1], owner)
  })
  test(kind + ' blocks forfeiture despite an otherwise successful transaction', async () => {
    const rpc = provider(1119)
    await assert.rejects(assertClClaimUnlocked(rpc, iface, chef, tx), /another 1 seconds/)
    assert.deepEqual(rpc.reads, ['0x123', '0x123'])
  })
  test(kind + ' allows the exact unlock boundary and rechecks changed liquidity', async () => {
    await assertClClaimUnlocked(provider(1120), iface, chef, tx)
    await assert.rejects(assertClClaimUnlocked(provider(1120, 1100), iface, chef, tx), /another 100 seconds/)
    await assertClClaimUnlocked(provider(1000, 1000, 0), iface, chef, tx)
    const disabled = provider(1000, 2000, 0)
    await assertClClaimUnlocked(disabled, iface, chef, tx)
    assert.deepEqual(disabled.reads, ['0x123'])
  })
  test(kind + ' propagates unreadable protection instead of allowing the call', async () => {
    await assert.rejects(assertClClaimUnlocked({ request: async () => { throw new Error('RPC failed') } }, iface, chef, tx), /RPC failed/)
  })
}

test('classic transactions need no CL protection reads', async () => {
  await assertClClaimUnlocked({ request: () => { throw new Error('unexpected read') } }, iface, chef, { to: owner, data: '0x' })
})
