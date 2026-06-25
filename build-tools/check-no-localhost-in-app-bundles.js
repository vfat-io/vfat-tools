const fs = require('fs')
const path = require('path')

const jsDir = path.join(__dirname, '..', 'dist', 'js')
const localhostPattern = /\b(?:https?|wss?):\/\/(?:localhost|127(?:\.\d{1,3}){3}|0\.0\.0\.0|\[::1\])(?::\d+)?/ig

if (!fs.existsSync(jsDir)) {
  console.error(`Missing JS output directory: ${jsDir}`)
  process.exit(1)
}

const files = fs.readdirSync(jsDir)
  .filter(file => file.endsWith('.js'))
  .filter(file => !/^vendor(?:[.-]|$)/.test(file))

const failures = []

for (const file of files) {
  const fullPath = path.join(jsDir, file)
  const contents = fs.readFileSync(fullPath, 'utf8')
  const matches = [...contents.matchAll(localhostPattern)].map(match => match[0])

  if (matches.length > 0) {
    failures.push({ file, matches: [...new Set(matches)] })
  }
}

if (failures.length > 0) {
  console.error('Production app bundles must not reference local or loopback endpoints.')
  for (const failure of failures) {
    console.error(`${failure.file}: ${failure.matches.join(', ')}`)
  }
  process.exit(1)
}
