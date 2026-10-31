import { ethers } from 'ethers'

const leaf = new ethers.utils.Interface(['function ORCHESTRATOR() view returns (address)'])
const orchestrator = new ethers.utils.Interface([
  'function ROOT_CHAIN_ID() view returns (uint256)',
  'function adapter() view returns (address)',
  'function VOTER() view returns (address)'
])
const adapter = new ethers.utils.Interface([
  'function ROOT_MESSAGE_ORCHESTRATOR() view returns (address)',
  'function LEAF_MESSAGE_ORCHESTRATOR() view returns (address)'
])
const rootVoter = new ethers.utils.Interface(['function TOKEN() view returns (address)'])
const clRewards = new ethers.utils.Interface(['function earned(address,uint256[]) view returns (uint256)'])

function address (value) {
  try { return value && value.toLowerCase() !== ethers.constants.AddressZero ? ethers.utils.getAddress(value) : null } catch (_) { return null }
}

// Leaf claims pay receipt tokens. On root, the local adapter redeems them into TOKEN in the same transaction.
async function resolveAeroRewardToken (batch, chainId, voter, receipt) {
  if (!address(voter) || !address(receipt)) return null
  const [leafOrchestrator] = await batch([{ target: voter, iface: leaf, method: 'ORCHESTRATOR', fallback: null }])
  if (!address(leafOrchestrator)) return null
  const [rootChainId, localAdapter] = await batch([
    { target: leafOrchestrator, iface: orchestrator, method: 'ROOT_CHAIN_ID', fallback: null },
    { target: leafOrchestrator, iface: orchestrator, method: 'adapter', fallback: null }
  ])
  if (rootChainId == null) return null
  if (Number(rootChainId) !== Number(chainId)) return address(receipt)
  if (!address(localAdapter)) return null
  const [rootOrchestrator, boundLeaf] = await batch([
    { target: localAdapter, iface: adapter, method: 'ROOT_MESSAGE_ORCHESTRATOR', fallback: null },
    { target: localAdapter, iface: adapter, method: 'LEAF_MESSAGE_ORCHESTRATOR', fallback: null }
  ])
  if (!address(rootOrchestrator) || !address(boundLeaf) || boundLeaf.toLowerCase() !== leafOrchestrator.toLowerCase()) return null
  const [voterOnRoot] = await batch([{ target: rootOrchestrator, iface: orchestrator, method: 'VOTER', fallback: null }])
  if (!address(voterOnRoot)) return null
  const [reward] = await batch([{ target: voterOnRoot, iface: rootVoter, method: 'TOKEN', fallback: null }])
  return address(reward)
}

export { resolveAeroRewardToken, clRewards }
