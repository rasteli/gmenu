import 'dotenv/config'

import os from 'node:os'
import fs from 'node:fs'
import inquirer from 'inquirer'
import { select } from './services/select'
import { echoHelp } from './utils/echo-help'
import { minimistArgs } from './utils/minimist-args'

inquirer.registerPrompt('search-list', require('inquirer-search-list'))

async function main() {
  const args = minimistArgs(process.argv.slice(2))

  const { help, type, tui, basename, 'open-with': openWith } = args

  if (help) {
    echoHelp()
    process.exit(0)
  }

  const defaultDir = `${os.homedir()}/${basename}`

  if (!fs.existsSync(defaultDir)) {
    fs.mkdirSync(defaultDir)
  }

  await select(defaultDir, {
    tui,
    type,
    openWith
  })
}

;(async () => await main())()
