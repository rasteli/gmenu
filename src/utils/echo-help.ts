export function echoHelp() {
  console.log(`
  ____ __  __ _____ _   _ _   _
 / ___|  \\/  | ____| \\ | | | | |
| |  _| |\\/| |  _| |  \\| | | | |
| |_| | |  | | |___| |\\  | |_| |
 \\____|_|  |_|_____|_| \\_|\\___/

  Usage
    gmenu [options]

  Open files in user's home directory

  Options
    --tui, -t        Open with terminal user interface
    --type, -y       Type of file to open
    --basename, -b   Basename of the directory to open
    --open-with, -o  Open with specific program
    --help, -h       Show this help screen
  `)
}
