## vfat.tools

_It ain't much, but it's honest work_

App : https://vfat.tools

Original work: https://yieldfarming.info

## vfat.tools listing + review service in partnership with MCN Ventures ##

Please seee https://mcn.ventures/review for more details on this service.

## How to run locally

Fork the repo and clone it to your PC, or just clone the original.
Run `npm install` (once) and `npm run dev`

This should bring up the interface at localhost:3000 after a minute or two.

## How to submit a new project, or any changes

- Fork the project
- Clone your forked copy onto your PC
- Create a new branch, make the required changes, *test it locally* using the above method
- Commit to your branch and push to your repo
- Go to your repo's github page and click Submit a pull request

This article is also a good explainer on the pull request system: https://opensource.com/article/19/7/create-pull-request-github

If you need help with the above process you can contact me on twitter, or telegram, vfat0 on both.

If you are unable to submit a new project this way, you can open a new Issue https://github.com/vfat-tools/vfat-tools/issues. Please include your project's URL and farming contracts (Masterchef, Synthetix Staking, Vaults), in the form of links to etherscan/bscscan/etc. Contracts need to be verified. After submitting an issue, please be patient for it to be processed by one of the contributors. Please note that projects with non-standard farming have to be submitted via pull request.

## Typical changes required

For most new pages you will need three things:
1) A new folder in src/views/pages and an index.ejs file in there for the view
2) A js file with the logic in src/static/js
3) Adding the project to the index for that chain, e.g. src/static/js/bsc.js * **

\* Please note project are added chronologically, newest at the bottom.

** Please do not add any projects to the front page index, if on ETH use all.js
