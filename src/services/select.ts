import fs from 'node:fs'
import path from 'node:path'
import inquirer from 'inquirer'
import { spawnProcess } from '../utils/spawn-process'

interface SelectOptions {
  index: number
  tui?: boolean
  type: string
  openWith: string
}

export async function select(
  defaultDir: string,
  { type, openWith, tui, index }: SelectOptions
) {
  const isChild = index > 0

  const content = fs.readdirSync(defaultDir).map(path => {
    const absolutePath = `${defaultDir}/${path}`

    return {
      path,
      isDirectory: fs.lstatSync(absolutePath).isDirectory()
    }
  })

  const choices = content.map(value => value.path)

  const answer = await inquirer.prompt<{
    path: string
  }>([
    {
      type: 'search-list',
      name: 'path',
      message: `Select ${type}`,
      choices: isChild ? ['..', ...choices] : choices,
      pageSize: 20
    }
  ])

  if (isChild && answer.path === '..') {
    defaultDir = path.resolve(defaultDir, '..')

    await select(defaultDir, {
      tui,
      type,
      openWith,
      index: index - 1
    })

    return
  }

  const answerContent = content.find(value => value.path === answer.path)

  if (answerContent?.isDirectory) {
    defaultDir = `${defaultDir}/${answer.path}`

    await select(defaultDir, {
      tui,
      type,
      openWith,
      index: index + 1
    })

    return
  }

  const typePath = `${defaultDir}/${answer.path}`

  if (tui) {
    const terminal = 'alacritty'
    spawnProcess(terminal, ['-e', openWith, typePath])
  } else {
    spawnProcess(openWith, [typePath])
  }
}
