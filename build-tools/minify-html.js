/* eslint-disable no-console */
import fs from 'fs'
import {resolve} from 'path'
import {minify} from 'html-minifier' // eslint-disable-line import/no-extraneous-dependencies

import {Dir} from '../globals'
import transformFiles from './transform-files'

transformFiles({
  sourcePath: resolve(Dir.dist),
  fileTransformer
})

function fileTransformer({
  filename,
  sourcePath,
  destinationPath
}) {
  const filePath = resolve(sourcePath, filename)

  if (/\.html$/.test(filename) === false) {
    return
  }

  fs.readFile(filePath, 'utf-8', (readFileError, html) => {
    if (readFileError) {
      throw Error(readFileError)
    }

    const minified = minify(html, {
      removeAttributeQuotes: true,
      caseSensitive: true,
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      conservativeCollapse: true,
      minifyCSS: true,
      minifyJS: true,
      minifyURLs: true,
      removeRedundantAttributes: true,
    })

    fs.writeFile(resolve(destinationPath, filename), minified, (writeFileError) => {
      if (writeFileError) {
        throw Error(writeFileError)
      }
    })
  })
}
