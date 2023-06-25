import { spawn } from 'child_process'

export function spawnProcess(cmd: string, args: string[] = []) {
  const child = spawn(cmd, args, {
    stdio: 'inherit',
    shell: true,
    detached: true
  })

  child.unref()
}
