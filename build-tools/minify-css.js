/* eslint-disable no-console */
import fs from 'fs'
import {resolve} from 'path'
import CleanCss from 'clean-css' // eslint-disable-line import/no-extraneous-dependencies

import {Dir} from '../globals'
import transformFiles from './transform-files'

transformFiles({
  sourcePath: resolve(Dir.dist, 'css'),
  fileTransformer
})

function fileTransformer({
  filename,
  sourcePath,
  destinationPath
}) {
  const filePath = resolve(sourcePath, filename)
  const minified = new CleanCss({
    rebase: false
  }).minify([filePath])

  fs.writeFile(resolve(destinationPath, filename), minified.styles, (writeFileError) => {
    if (writeFileError) {
      throw Error(writeFileError)
    }

    const efficiency = Math.round(Number(minified.stats.efficiency) * 100)

    console.log('\x1b[1m%s\x1b[0m', `${efficiency}%`, `smaller: ${filePath}`)
  })
}
