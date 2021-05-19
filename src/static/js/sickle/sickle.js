$(function() {
  consoleInit(main)
});

async function main() {
  const App = await init_ethers();
  let StandardChefs = window.BscChefs.master_chefs

  App.YOUR_ADDRESS = "0x87616fa850c87a78f307878f32d808dad8f4d401"

  _print(`Initialized ${App.YOUR_ADDRESS}\n`)
  _print(`Reading smart ${StandardChefs.length} contracts...\n`)

  let CHEFS = StandardChefs.map(chefAddress => new ethcall.Contract(chefAddress, window.ChefAbi))
  let poolLengths = (await getChefsPoolLength(App, CHEFS)).map(p => p.toNumber())
  let userInfo = await getChefsPoolUserInfo(App, CHEFS, poolLengths)
  let userPositions = userInfo.filter(info => info.userInfo.amount.gt(0))
  _print(`Found ${userPositions.length} staking positions\n`)
  buildUserPositionsTable(userPositions, StandardChefs)

  hideLoading();
}

async function getChefsPoolLength(app, chefs) {
  const calls = chefs.map(chef => chef.poolLength())
  return await app.ethcallProvider.all(calls)
}

async function getChefsPoolUserInfo(app, chefs, poolLengths) {

  let batchSize = 50
  let userInfo = []

  for (let i = 0; i < chefs.length; i += batchSize) {

    let chefsSubset = chefs.slice(i, i + batchSize)

    let chefPools = chefsSubset.flatMap((chef, index) => {
      return [...Array(poolLengths[index]).keys()].map(pid => { return { pid: pid, chef_index: index + i } })
    })

    let calls = chefsSubset.flatMap((chef, index) => {
      return [...Array(poolLengths[index]).keys()].map(pid => chef.userInfo(pid, app.YOUR_ADDRESS))
    })

    let infos = await app.ethcallProvider.all(calls)

    userInfo = userInfo.concat(
      infos.map((info, index) => {
        return { userInfo: info, chef_index: chefPools[index].chef_index, pid: chefPools[index].pid }
      })
    )
  }

  return userInfo
}

function buildUserPositionsTable(positions, chefs) {

  if (positions.length === 0) {
    return 0
  }

  let tableData = {
    "title": "BSC opened positions",
    "heading": [
      "MasterChef contract",
      "Pool id",
      "My stake"
    ],
    "rows": []
  }

  for (let i = 0; i < positions.length; i++) {
    let position = positions[i]
    tableData.rows.push([
      chefs[position.chef_index],
      position.pid,
      position.userInfo.amount.toString()
    ])
  }

  let table = new AsciiTable().fromJSON(tableData);
  table
    .setAlign(1, AsciiTable.RIGHT)
    .setAlign(2, AsciiTable.RIGHT)

  document.getElementById('log').innerHTML += table + '<br />';

}

async function filterStandardChefs(app, chefs) {
  let StandardChefs = []
  for (let i = 0; i < chefs.length; i++) {
    let chef = chefs[i]
    if (await isStandardContract(app, chef)) {
      StandardChefs.push(chef)
    }
  }
  return StandardChefs
}

async function isStandardContract(app, address) {
  const signer = app.provider.getSigner()
  let isStandard = true
  const chef = new ethers.Contract(app.YOUR_ADDRESS, window.ChefAbi, signer)

  try {

    await Promise.all([
        chef.poolLength(),
        chef.userInfo(0, address)
      ]
    )
  } catch (e) {
    isStandard = false
  }

  return isStandard
}
