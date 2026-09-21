#!/usr/bin/env node
/**
 * Capture the McDAO Genesis og:image (1200×630) from a local dist server.
 * Usage: node build-tools/capture-robinhood-mcdao-social.mjs [baseUrl]
 */
import { spawn } from 'node:child_process'
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const out = path.join(root, 'src/static/img/robinhood-mcdao-social.png')
const base = process.argv[2] || 'http://127.0.0.1:8765'
const url = `${base.replace(/\/$/, '')}/robinhood/mcdao/?social=1`
const tmp = path.join(root, 'dist/img/.mcdao-social-raw.png')

async function waitForServer (port, ms = 15000) {
  const start = Date.now()
  while (Date.now() - start < ms) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/robinhood/mcdao/`)
      if (res.ok) return
    } catch (_) { /* retry */ }
    await new Promise(r => setTimeout(r, 200))
  }
  throw new Error(`Server on :${port} did not respond`)
}

let server
const port = 8765
if (!process.argv[2]) {
  server = spawn('python3', ['-m', 'http.server', String(port)], { cwd: path.join(root, 'dist'), stdio: 'ignore' })
  await waitForServer(port)
}

try {
  execFileSync('npx', ['--yes', 'playwright', 'screenshot', url, tmp,
    '--viewport-size=1200,1400',
    '--wait-for-selector=main.mcdao-page #mcdao-farms table tr:nth-child(8)',
    '--wait-for-timeout=5000',
    '--timeout=120000'
  ], { stdio: 'inherit', cwd: root })

  execFileSync('python3', ['-c', `
from PIL import Image
raw, out = "${tmp}", "${out}"
img = Image.open(raw).convert('RGB')
w, h = img.size
target_w, target_h = 1200, 630
scale = target_w / w
nh = int(h * scale)
img = img.resize((target_w, nh), Image.Resampling.LANCZOS)
bg = img.getpixel((8, 8))
if nh >= target_h:
    img = img.crop((0, 0, target_w, target_h))
else:
    canvas = Image.new('RGB', (target_w, target_h), bg)
    canvas.paste(img, (0, 0))
    img = canvas
img.save(out, optimize=True)
print('wrote', out)
`], { stdio: 'inherit' })
} finally {
  if (fs.existsSync(tmp)) fs.unlinkSync(tmp)
  if (server) server.kill('SIGTERM')
}
