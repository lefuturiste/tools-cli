#!/usr/bin/env node

'use strict';
const app = require('commander')
const colors = require('colors')

if (process.argv.length == 2) {
  console.log("show help with --help");
}

app
  .version('1.0.0')

app
  .command('clipboard')
  .alias('clip')
  .alias('clipd')
  .alias('c')
  .description("Pipe and copy the content into the clipboard")
  .action(require('./src/clipboard'))

app
  .command('random')
  .alias('rand')
  .alias('r')
  .option('-l, --length <n>', 'The length of the random data')
  .option('-c, --clipboard', 'Copy or not in the clipboard')
  .option('-b, --lowercase', 'If the string should contain lowercase')
  .option('-u, --uppercase', 'If the string should contain uppercase')
  .option('-n, --numeric', 'If the string should contain numeric')
  .option('-s, --special', 'If the string should contain special chars')
  .option('-a, --all', 'If the string should contain all kind of chars')
  .option('-p, --patern <pat>', 'A custom patern')
  .description("Generate random data")
  .action(require('./src/random.js'))

app
  .command('hash <algo> [content]')
  .alias('h')
  .option('-c, --clipboard', 'Copy or not in the clipboard')
  .description("Hash data")
  .action(require('./src/hash'))

app
  .command('now')
  .alias('n')
  .option('-e, --epoch', 'Show in epoch format')
  .option('-d, --datetime', 'Show in datetime format')
  .option('-l, --locale <locale>', 'Set i18n locale')
  .option('-f, --format <format>', 'Custom format')
  .option('-c, --clipboard', 'Copy or not in the clipboard')
  .description("Get the datetime")
  .action(require('./src/now'))

app.parse(process.argv)
