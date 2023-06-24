import minimist from 'minimist'
import { echoHelp } from './echo-help'

export function minimistArgs(processArgs: string[]) {
  if (processArgs.length === 0) {
    echoHelp()
    process.exit(1)
  }

  const args = minimist(processArgs, {
    string: ['type', 'open-with', 'basename'],
    boolean: ['tui', 'help'],
    alias: {
      tui: 't',
      help: 'h',
      type: 'y',
      basename: 'b',
      'open-with': 'o'
    },
    unknown: (arg: string) => {
      console.log(`Unknown option: ${arg}`)

      echoHelp()
      process.exit(1)
    }
  })

  return args
}
