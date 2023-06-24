import fs from 'node:fs'
import inquirer from 'inquirer'
import { spawn } from 'node:child_process'

interface SelectOptions {
  tui?: boolean
  type: string
  openWith: string
}

export async function select(
  defaultDir: string,
  { type, openWith, tui }: SelectOptions
) {
  const content = fs.readdirSync(defaultDir).map(path => {
    const absolutePath = `${defaultDir}/${path}`

    return {
      path,
      isDirectory: fs.lstatSync(absolutePath).isDirectory()
    }
  })

  const answer = await inquirer.prompt<{
    path: string
  }>([
    {
      type: 'search-list',
      name: 'path',
      message: `Select ${type}`,
      choices: content.map(value => value.path)
    }
  ])

  const answerContent = content.find(value => value.path === answer.path)

  if (answerContent?.isDirectory) {
    defaultDir = `${defaultDir}/${answer.path}`

    await select(defaultDir, {
      tui,
      type,
      openWith
    })

    return
  }

  const typePath = `${defaultDir}/${answer.path}`

  if (tui) {
    const terminal = 'alacritty'
    const child = spawn(terminal, ['-e', openWith, typePath], {
      stdio: 'inherit',
      shell: true,
      detached: true
    })

    child.unref()
  } else {
    const child = spawn(openWith, [typePath], {
      stdio: 'inherit',
      shell: true,
      detached: true
    })

    child.unref()
  }
}
