const { execSync } = require('child_process')
const package = require('../package.json')

const UNIAPP_VERSION = package['uni-app'].version

execSync(`npx uvm ${UNIAPP_VERSION} --manager=yarn`, {
    stdio: 'inherit'
})
