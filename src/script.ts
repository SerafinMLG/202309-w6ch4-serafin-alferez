import { program } from 'commander';

program.option('-v, --version');
program.option('-h, --help');
program.option('-u, --user <value>');

program.parse();
const options = program.opts();

if (options.version) {
  console.log('Version 1.0.0');
  process.exit(0);
}

if (options.help) {
  console.log('--version (v) -> version');
  console.log('--help (h) -> help');
  console.log('--user (u) -> add user name');
  process.exit(0);
}

console.log('options;', options);
