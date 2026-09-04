const fs = require('fs')
const path = require('path')

require('dotenv').config()

// The WalletConnect project id is inlined into the app bundle at build time by
// webpack's DefinePlugin. When it is missing, getAppKit() is folded down to an
// unconditional `return null` and every page that connects a wallet through
// AppKit renders "Wallet connector is unavailable" with no connect option at
// all. That failure is invisible in the build log, so assert it here instead.

const projectId = process.env.REOWN_PROJECT_ID

if (!projectId) {
  console.error('REOWN_PROJECT_ID is not set, so the published site would have no wallet connector.')
  console.error('Set it in .env (see the deployment notes) before building for production.')
  process.exit(1)
}

const jsDir = path.join(__dirname, '..', 'dist', 'js')

if (!fs.existsSync(jsDir)) {
  console.error(`Missing JS output directory: ${jsDir}`)
  process.exit(1)
}

const appBundles = fs.readdirSync(jsDir)
  .filter(file => /^app(?:[.-]|$)/.test(file) && file.endsWith('.js'))

if (appBundles.length === 0) {
  console.error(`No app bundle found in ${jsDir}; run the JS build first.`)
  process.exit(1)
}

const configured = appBundles.some(file =>
  fs.readFileSync(path.join(jsDir, file), 'utf8').includes(projectId))

if (!configured) {
  console.error('REOWN_PROJECT_ID is set but did not reach the app bundle.')
  console.error(`Checked: ${appBundles.join(', ')}`)
  process.exit(1)
}
