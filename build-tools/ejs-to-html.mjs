/* eslint-disable no-console */

import {resolve} from 'path'
import fs from 'fs'
import watch from 'node-watch'
import ejs from 'ejs' // eslint-disable-line import/no-extraneous-dependencies

import pkg from "../globals.js";
const {
  Dir,
  PP,
  SITE_TITLE,
  SITE_URL,
  DESCRIPTION,
  DEVELOPER_NAME,
  DEVELOPER_URL,
  GOOGLE_ANALYTICS_ID
} = pkg;

import transformFiles from './transform-files.mjs'

// filenameMap used in views/partials with if statements to check if it exists
let filenameMap
if (fs.existsSync(resolve(Dir.dist, 'filename-map.json'))) {
  filenameMap = JSON.parse(fs.readFileSync(resolve(Dir.dist, 'filename-map.json'), 'utf-8'))
}

function transformer({
  filename,
  sourcePath,
  destinationPath
}) {
  const filePath = resolve(sourcePath, filename)
  const ejsTemplate = fs.readFileSync(filePath, 'utf-8')
  const html = ejs.render(ejsTemplate, {
    delimiter: '%',
    filename: filePath,
    partials: Dir.partials,
    PP,
    SITE_TITLE,
    SITE_URL,
    DESCRIPTION,
    DEVELOPER_NAME,
    DEVELOPER_URL,
    GOOGLE_ANALYTICS_ID,
    CARD_IMAGE: '',
    NODE_ENV: process.env.NODE_ENV,
    filenameMap,
  })
  const filenamePlain = filename.split('.ejs')[0]
  const newFilePath = resolve(destinationPath, `${filenamePlain}.html`)

  fs.writeFile(newFilePath, html, (writeFileError) => {
    if (writeFileError) {
      throw Error(writeFileError)
    }
  })
}

// transform only the pages, not the partials
transformFiles({
  sourcePath: Dir.pages,
  options: {destination: Dir.dist},
  fileTransformer: transformer
})

// watch ejs changes
const args = process.argv

for (let i = 0; i < args.length; i += 1) {
  if (args[i] === '--watch') {
    // watch the entire views folder, including pages and partials
    watch(Dir.views, {
      recursive: true
    }, () => {
      transformFiles({
        sourcePath: Dir.pages,
        options: {destination: Dir.dist},
        fileTransformer: transformer
      })
      console.log('Compiled EJS to HTML')
    })
    break
  }
}
