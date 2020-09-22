/* eslint-disable no-console */

import fs from 'fs'
import {
  resolve
} from 'path'
import transformFiles from './transform-files'
import {
  SITE_TITLE,
  DESCRIPTION,
  SITE_URL,
  DEVELOPER_NAME,
  DEVELOPER_URL,
  Dir,
} from '../globals'

function transformer({
  filename,
  sourcePath
}) {
  const filePath = resolve(sourcePath, filename)
  let fileContents = fs.readFileSync(filePath, 'utf-8')

  fileContents = `${'/*!\n' +
        `* ${SITE_TITLE}\n` +
        `* ${DESCRIPTION}\n` +
        `* ${SITE_URL}\n` +
        `* @author ${DEVELOPER_NAME} -- ${DEVELOPER_URL}\n` +
        `* Copyright ${(new Date()).getFullYear()}. MIT Licensed.\n` +
        '*/\n\n'}${fileContents}`

  fs.writeFile(filePath, fileContents, (writeFileError) => {
    if (writeFileError) {
      throw Error(writeFileError)
    }
  })
}

// transform only the pages, not the partials
transformFiles({
  sourcePath: resolve(Dir.dist, 'js'),
  fileTransformer: transformer
})
transformFiles({
  sourcePath: resolve(Dir.dist, 'css'),
  fileTransformer: transformer
})
