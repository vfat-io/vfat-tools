## yieldfarming.info

_It ain't much, but it's honest work_

App : https://vfat.tools

Original work: https://yieldfarming.info

## How to run locally

Fork the repo and clone it to your PC, or just clone the original.
Run `npm install` (once) and `npm run dev`

This should bring up the interface at localhost:3000 after a minute or two.

## How to contribute

- Fork the project
- Clone your forked copy onto your PC
- Create a new branch, make the required changes, test it using the above method
- Commit to your branch and push to your repo
- Go to your repo's github page and click Submit a pull request

## Typical changes required

For most new pages you will need three things:
1) A new folder in src/views/pages and an index.ejs file in there for the view
2) A js file with the logic in src/static/js
3) Adding the project to the index for that chain, e.g. src/static/js/bsc.js
