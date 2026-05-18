$(function() {
  consoleInit(main)
})

const SWEEP_ABI = [
  {
    inputs: [
      {internalType: 'contract SickleFactory', name: 'factory', type: 'address'},
      {internalType: 'contract NftTransferLib', name: 'nftTransferLib_', type: 'address'},
      {internalType: 'contract TransferLib', name: 'transferLib_', type: 'address'},
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {inputs: [], name: 'InvalidInputLength', type: 'error'},
  {inputs: [], name: 'NotApproved', type: 'error'},
  {inputs: [{internalType: 'address', name: 'sender', type: 'address'}], name: 'NotOwner', type: 'error'},
  {inputs: [], name: 'NotRegisteredSickle', type: 'error'},
  {inputs: [], name: 'SickleNotDeployed', type: 'error'},
  {
    inputs: [],
    name: 'connectorRegistry',
    outputs: [{internalType: 'contract ConnectorRegistry', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'factory',
    outputs: [{internalType: 'contract SickleFactory', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'owner', type: 'address'},
      {internalType: 'address', name: 'approved', type: 'address'},
      {internalType: 'bytes32', name: 'referralCode', type: 'bytes32'},
    ],
    name: 'getOrDeploySickle',
    outputs: [{internalType: 'contract Sickle', name: '', type: 'address'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'owner', type: 'address'}],
    name: 'getSickle',
    outputs: [{internalType: 'contract Sickle', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nftTransferLib',
    outputs: [{internalType: 'contract NftTransferLib', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'contract IERC1155[]', name: 'tokens', type: 'address[]'},
      {internalType: 'uint256[]', name: 'tokenIds', type: 'uint256[]'},
      {internalType: 'uint256[]', name: 'amounts', type: 'uint256[]'},
    ],
    name: 'sweepErc1155',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'contract IERC721[]', name: 'tokens', type: 'address[]'},
      {internalType: 'uint256[]', name: 'tokenIds', type: 'uint256[]'},
    ],
    name: 'sweepErc721',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address[]', name: 'tokens', type: 'address[]'}],
    name: 'sweepTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'transferLib',
    outputs: [{internalType: 'contract TransferLib', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
]

const SICKLE_FACTORY_ABI = [
  {
    inputs: [{internalType: 'address', name: 'admin', type: 'address'}],
    name: 'sickles',
    outputs: [{internalType: 'address', name: 'sickle', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
]

const UNISWAP_POSITION_MANAGER_V4 = [
  {
    inputs: [{internalType: 'uint256', name: 'tokenId', type: 'uint256'}],
    name: 'getPositionLiquidity',
    outputs: [{internalType: 'uint128', name: 'liquidity', type: 'uint128'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: 'tokenId', type: 'uint256'}],
    name: 'getPoolAndPositionInfo',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'currency0', type: 'address' },
          { internalType: 'address', name: 'currency1', type: 'address' },
          { internalType: 'uint24', name: 'fee', type: 'uint24' },
          { internalType: 'int24', name: 'tickSpacing', type: 'int24' },
          { internalType: 'address', name: 'hooks', type: 'address' },
        ],
        internalType: 'struct PoolKey',
        name: 'poolKey',
        type: 'tuple',
      },
      { internalType: 'uint256', name: 'info', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

const UNISWAP_STATE_VIEW_V4 = [
  {
    inputs: [
      { internalType: 'bytes32', name: 'poolId', type: 'bytes32' },
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'int24', name: 'tickLower', type: 'int24' },
      { internalType: 'int24', name: 'tickUpper', type: 'int24' },
      { internalType: 'bytes32', name: 'salt', type: 'bytes32' },
    ],
    name: 'getPositionInfo',
    outputs: [
      { internalType: 'uint128', name: 'liquidity', type: 'uint128' },
      { internalType: 'uint256', name: 'feeGrowthInside0LastX128', type: 'uint256' },
      { internalType: 'uint256', name: 'feeGrowthInside1LastX128', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'poolId', type: 'bytes32' },
      { internalType: 'int24', name: 'tickLower', type: 'int24' },
      { internalType: 'int24', name: 'tickUpper', type: 'int24' },
    ],
    name: 'getFeeGrowthInside',
    outputs: [
      { internalType: 'uint256', name: 'feeGrowthInside0X128', type: 'uint256' },
      { internalType: 'uint256', name: 'feeGrowthInside1X128', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

const nft_manager_address_v4 = '0x7A4a5c919aE2541AeD11041A1AEeE68f1287f95b'
// Uniswap v4 BNB Smart Chain deployments (56): https://docs.uniswap.org/contracts/v4/deployments
const pool_manager_address_v4 = '0x28e2ea090877bf75740558f6bfb36a5ffee9e9df'
// Reading current tick/sqrtPrice is done via StateView, not PoolManager.
const state_view_address_v4 = '0xd13dd3d6e93f276fafc9db9e6bb47c1180aee0c4'
const sickle_factory_address = '0x53d9780DbD3831E3A797Fd215be4131636cD5FDf'
const sweep_address = '0x869e37e67bAa9f1022B71EC5e9423D12ed884850'

const BSC_CHAIN_ID = 56

function uniswapV4Helpers() {
  const h = window?.protocols?.uniswapV4
  if (!h) throw new Error('Uniswap v4 helpers not loaded (window.Sickle.protocols.uniswapV4)')
  return h
}

async function getOwnedErc721TokenIdsViaProxy({ chainId, contractAddress, ownerAddress }) {
  return uniswapV4Helpers().getOwnedErc721TokenIdsViaProxy({ chainId, contractAddress, ownerAddress })
}

function normalizePoolKey(poolKey) {
  return uniswapV4Helpers().normalizePoolKey(poolKey)
}

function decodePositionInfo(infoU256) {
  return uniswapV4Helpers().decodePositionInfo(infoU256)
}

function computeV4PoolIdBytes32(poolKey) {
  return uniswapV4Helpers().computeV4PoolIdBytes32(poolKey)
}

function computeUnclaimedFeesFromGrowth(args) {
  return uniswapV4Helpers().computeUnclaimedFeesFromGrowth(args)
}

function formatTokenAmountHtmlFromRaw(rawAmount, tokenDecimals) {
  return uniswapV4Helpers().formatTokenAmountHtmlFromRaw(rawAmount, tokenDecimals)
}

async function getErc20MetaCached(App, cache, tokenAddress, chainId) {
  return uniswapV4Helpers().getErc20MetaCached(App, cache, tokenAddress, chainId, { nativeSymbol: 'BNB', nativeDecimals: 18 })
}

async function getV4PoolSlot0(App, poolIdBytes32) {
  return uniswapV4Helpers().getV4PoolSlot0(App, poolIdBytes32, state_view_address_v4)
}

async function main() {
  const App = await init_ethers()

  _print(`Initialized ${App.YOUR_ADDRESS}\n`)
  _print('Reading smart contracts...\n')

  const sickle_factory = new ethcall.Contract(sickle_factory_address, SICKLE_FACTORY_ABI)
  const nft_manager_v4 = new ethcall.Contract(nft_manager_address_v4, UNISWAP_POSITION_MANAGER_V4)

  const [sickleAddress] = await App.ethcallProvider.all([sickle_factory.sickles(App.YOUR_ADDRESS)])
  if (sickleAddress === '0x0000000000000000000000000000000000000000') {
    _print_bold('You dont have a sickle account')
  } else {
    _print_bold(`Your Sickle Address: ${sickleAddress}`)
    _print('')

    try {
      await withdraw_nfts(App, nft_manager_v4, nft_manager_address_v4, sickleAddress)
    } catch (err) {
      console.log('Error fetching NFTs via proxy, falling back to manual input', err)
      await fallback_withdraw(App, nft_manager_address_v4, sickleAddress)
    }
  }

  hideLoading()
}

const withdraw_nfts = async function(App, nft_manager_v4, nft_manager_address_v4, sickleAddress) {
  // Prefer the Sickle address because that's where positions usually live.
  const nft_ids = await getOwnedErc721TokenIdsViaProxy({
    chainId: BSC_CHAIN_ID,
    contractAddress: nft_manager_address_v4,
    ownerAddress: sickleAddress,
  })

  let active_nfts = []

  if (nft_ids.length === 0) {
    _print('No NFTs found via proxy')
    throw new Error('No NFTs found via proxy')
  }

  const liquidity_calls = nft_ids.map(nft => nft_manager_v4.getPositionLiquidity(nft))
  const liquidities = await App.ethcallProvider.all(liquidity_calls)

  for (let i = 0; i < nft_ids.length; i++) {
    if (liquidities[i] > 0) {
      active_nfts.push(nft_ids[i])
    }
  }

  if (active_nfts.length > 0) {
    let token_ids = ''

    let nft_manager_addresses = []
    for (let i = 0; i < active_nfts.length; i++) {
      nft_manager_addresses.push(nft_manager_address_v4)
    }

    const sweepErc721 = async function() {
      return sweep_nfts_721(App, active_nfts, nft_manager_addresses)
    }

    _print_bold('Uniswap-V4 nfts')
    _print('')

    // Build map tokenId -> liquidity
    const tokenIdToLiquidity = new Map()
    for (let i = 0; i < nft_ids.length; i++) {
      tokenIdToLiquidity.set(nft_ids[i].toString(), liquidities[i])
    }

    // Fetch poolKey + packed info for each active NFT.
    // If multicall fails for any reason, fall back to sequential calls.
    let poolAndInfo = []
    try {
      const calls = active_nfts.map(nft => nft_manager_v4.getPoolAndPositionInfo(nft))
      poolAndInfo = await App.ethcallProvider.all(calls)
    } catch (e) {
      const contract = new ethers.Contract(nft_manager_address_v4, UNISWAP_POSITION_MANAGER_V4, App.provider)
      poolAndInfo = []
      for (const nft of active_nfts) {
        poolAndInfo.push(await contract.getPoolAndPositionInfo(nft))
      }
    }

    // Derive per-position info
    const tokenMetaCache = new Map()
    const poolCache = new Map() // poolId32 -> { slot0, poolKey, token0Meta, token1Meta }
    const positions = []

    for (let i = 0; i < active_nfts.length; i++) {
      const nft = active_nfts[i]
      const liq = tokenIdToLiquidity.get(nft.toString())
      const raw = poolAndInfo[i]
      const poolKey = normalizePoolKey(raw?.poolKey ?? raw?.[0])
      const info = raw?.info ?? raw?.[1]
      if (!poolKey || info == null) continue

      const decoded = decodePositionInfo(info)
      const poolId32 = computeV4PoolIdBytes32(poolKey)

      const salt = ethers.utils.hexZeroPad(ethers.utils.hexlify(ethers.BigNumber.from(nft.toString())), 32)

      positions.push({
        nftId: nft,
        liquidity: liq,
        poolKey,
        poolId32,
        tickLower: decoded.tickLower,
        tickUpper: decoded.tickUpper,
        salt,
      })
    }

    if (positions.length === 0) {
      _print('No active NFTs')
      throw new Error('No active NFTs found via proxy')
    }

    // Fetch slot0 per distinct pool and token metadata.
    for (const p of positions) {
      if (poolCache.has(p.poolId32)) continue

      const slot0 = await getV4PoolSlot0(App, p.poolId32)

      const token0Meta = await getErc20MetaCached(App, tokenMetaCache, p.poolKey.currency0, BSC_CHAIN_ID)
      const token1Meta = await getErc20MetaCached(App, tokenMetaCache, p.poolKey.currency1, BSC_CHAIN_ID)

      poolCache.set(p.poolId32, {
        slot0,
        poolKey: p.poolKey,
        token0Meta,
        token1Meta,
      })
    }

    // Compute per-position earned fees (unclaimed) to show next to Compound.
    // Uniswap v4 positions are owned in PoolManager by the PositionManager contract itself, with salt = tokenId.
    // We can reconstruct fees owed off-chain from fee growth values.
    const earnedFeesByTokenId = new Map() // tokenId(string) -> { fees0Raw, fees1Raw }
    try {
      const stateView = new ethcall.Contract(state_view_address_v4, UNISWAP_STATE_VIEW_V4)

      const posInfoCalls = positions.map(p =>
        stateView.getPositionInfo(p.poolId32, nft_manager_address_v4, p.tickLower, p.tickUpper, p.salt)
      )
      const feeGrowthCalls = positions.map(p => stateView.getFeeGrowthInside(p.poolId32, p.tickLower, p.tickUpper))

      const posInfos = await App.ethcallProvider.all(posInfoCalls)
      const feeGrowthInsides = await App.ethcallProvider.all(feeGrowthCalls)

      for (let i = 0; i < positions.length; i++) {
        const p = positions[i]
        const pi = posInfos[i]
        const fg = feeGrowthInsides[i]

        const liquidity = pi?.liquidity ?? pi?.[0]
        const feeGrowthInside0LastX128 = pi?.feeGrowthInside0LastX128 ?? pi?.[1]
        const feeGrowthInside1LastX128 = pi?.feeGrowthInside1LastX128 ?? pi?.[2]
        const feeGrowthInside0X128 = fg?.feeGrowthInside0X128 ?? fg?.[0]
        const feeGrowthInside1X128 = fg?.feeGrowthInside1X128 ?? fg?.[1]

        const { fees0Raw, fees1Raw } = computeUnclaimedFeesFromGrowth({
          liquidity,
          feeGrowthInside0X128,
          feeGrowthInside1X128,
          feeGrowthInside0LastX128,
          feeGrowthInside1LastX128,
        })

        earnedFeesByTokenId.set(p.nftId.toString(), { fees0Raw, fees1Raw })
      }
    } catch (e) {
      console.log('Failed to compute earned fees for v4 positions:', e)
    }

    // Group by poolId32
    const groups = new Map()
    for (const p of positions) {
      const key = p.poolId32
      if (!groups.has(key)) groups.set(key, [])
      groups.get(key).push(p)
    }

    for (const [poolId32, infos] of groups.entries()) {
      const poolInfo = poolCache.get(poolId32)
      const t0 = poolInfo?.token0Meta
      const t1 = poolInfo?.token1Meta
      const pk = poolInfo?.poolKey

      const tickSpacingNum = pk?.tickSpacing != null ? Number(pk.tickSpacing) : null
      const label = `${t0?.symbol || '?'} - ${t1?.symbol || '?'}`
      _print(`Pool: ${label}`)

      for (const [idx, info] of infos.entries()) {
        const slot0 = poolInfo?.slot0
        const currentTick = slot0?.tick

        let amount0Raw = null
        let amount1Raw = null
        if (slot0?.sqrtPriceX96 != null && info?.liquidity != null && window.UniswapV3?.calculateUserLiquidity) {
          try {
            const { liquidity0, liquidity1 } = window.UniswapV3.calculateUserLiquidity(slot0.sqrtPriceX96, {
              tickLow: info.tickLower,
              tickUp: info.tickUpper,
              liquidity: info.liquidity,
            })

            amount0Raw = liquidity0
            amount1Raw = liquidity1
          } catch (e) {
            console.log('Error calculating token amounts:', e)
          }
        }

        const isInRange = typeof currentTick === 'number' ? currentTick >= info.tickLower && currentTick < info.tickUpper : null
        const rangeStatus = isInRange === null ? '' : isInRange ? '✅ In Range' : '⚠️ Out of Range'

        const singleSweepErc721 = async function() {
          return single_sweep_nfts_721(App, info.nftId, nft_manager_address_v4)
        }

        const poolData = {
          stakingAddress: pool_manager_address_v4,
          poolAddress: pool_manager_address_v4,
          nftManagerAddress: nft_manager_address_v4,
          poolId: poolId32,
          tickSpacing: tickSpacingNum != null && !Number.isNaN(tickSpacingNum) ? tickSpacingNum : 1,
        }

        const exitToUnderlying = async function() {
          return window.Sickle.withdraw.withdrawToUnderlying(poolData, info.nftId)
        }

        const exitToBnb = async function() {
          return window.Sickle.withdraw.withdrawToToken(poolData, info.nftId)
        }

        const rebalance = async function() {
          if (typeof currentTick !== 'number') {
            alert('Unable to read current pool tick for this v4 pool; cannot rebalance.')
            return
          }
          return window.Sickle.rebalance.rebalance(poolData, info.nftId, info.tickLower, info.tickUpper, currentTick)
        }

        const compound = async function() {
          return window.Sickle.compound.compound(poolData, info.nftId)
        }

        _print(`|    `)

        const a0 = formatTokenAmountHtmlFromRaw(amount0Raw, t0?.decimals)
        const a1 = formatTokenAmountHtmlFromRaw(amount1Raw, t1?.decimals)
        _print(`|-Nft ID: ${info.nftId} (${a0} ${t0?.symbol || '?'} + ${a1} ${t1?.symbol || '?'})`)

        const earned = earnedFeesByTokenId.get(info.nftId.toString())

        idx < infos.length - 1 ? _print_inline(`|    `) : _print_inline(`     `)
        _print_link(`Withdraw NFT`, singleSweepErc721)

        if(window.Sickle){
          idx < infos.length - 1 ? _print_inline(`|    `) : _print_inline(`     `)
          _print_link(`Exit to Underlying`, exitToUnderlying)
          
          idx < infos.length - 1 ? _print_inline(`|    `) : _print_inline(`     `)
          _print_link(`Exit to BNB`, exitToBnb)
          
          idx < infos.length - 1 ? _print_inline(`|    `) : _print_inline(`     `)
          _print_link(`Rebalance ${rangeStatus}`, rebalance)
          
          if (earned && (earned.fees0Raw > 0n || earned.fees1Raw > 0n)) {
            const e0 = formatTokenAmountHtmlFromRaw(earned.fees0Raw, t0?.decimals)
            const e1 = formatTokenAmountHtmlFromRaw(earned.fees1Raw, t1?.decimals)
            idx < infos.length - 1 ? _print_inline(`|    `) : _print_inline(`     `)
            _print_link(`Compound (${e0} ${t0?.symbol || '?'} + ${e1} ${t1?.symbol || '?'})`, compound)
          }
        }
      }

      _print('')
    }

    for (const nft of active_nfts) {
      token_ids += `${nft} - `
    }

    _print_link(`Withdraw all Uniswap erc721 tokens: ${token_ids}`, sweepErc721)
    _print('')
  } else {
    _print('No active NFTs')
    throw new Error('No active NFTs found via proxy')
  }
}

const fallback_withdraw = async function(App, nft_manager_address_v4, sickleAddress) {
  _print_bold('Please enter the NFT-ID that you want to withdraw')
  _print('')
  _print('You could check your nfts on the nft position manager contract below')
  _print(
    `<a target="_blank" href="https://bscscan.com/token/${nft_manager_address_v4}?a=${sickleAddress}#inventory">Nft Position Manager</a>`
  )
  _print('')
  let log = document.getElementById('log')

  let nft_input = document.createElement('input')
  nft_input.setAttribute('id', 'nft_id')
  nft_input.setAttribute('type', 'text')
  nft_input.setAttribute('size', '22')
  log.appendChild(nft_input)

  let nft_btn = document.createElement('button')
  nft_btn.innerHTML = 'Withdraw'
  nft_btn.setAttribute('id', 'nft_withdraw_click')
  log.appendChild(nft_btn)

  nft_btn.addEventListener('click', async () => {
    const nft_id_input = document.getElementById('nft_id').value
    const nft_id = BigInt(nft_id_input)

    try {
      await single_sweep_nfts_721(App, nft_id, nft_manager_address_v4)
    } catch (err) {
      _print('error ocured')
    }
  })
}

const sweep_nfts_721 = async function(App, nfts, tokens) {
  const signer = App.provider.getSigner()
  const SWEEP = new ethers.Contract(sweep_address, SWEEP_ABI, signer)

  showLoading()
  SWEEP.sweepErc721(tokens, nfts)
    .then(function(t) {
      return App.provider.waitForTransaction(t.hash)
    })
    .catch(function() {})
  hideLoading()
}

const single_sweep_nfts_721 = async function(App, nft, token) {
  const signer = App.provider.getSigner()
  const SWEEP = new ethers.Contract(sweep_address, SWEEP_ABI, signer)

  showLoading()
  SWEEP.sweepErc721([token], [nft])
    .then(function(t) {
      return App.provider.waitForTransaction(t.hash)
    })
    .catch(function() {
      _print('invalid input')
    })
  hideLoading()
}
