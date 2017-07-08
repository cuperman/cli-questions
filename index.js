#!/usr/bin/env node

// jshint esversion: 6

const pkg = require('./package');
const program = require('commander');

program
  .version(pkg.version)
  .option('-s, --sure', 'I\'m sure I want to create a merge request')
  .option('-b, --base [branch]', 'Base branch to target merge request')
  .option('-d, --desc [description]', 'Description of merge request')
  .option('-f, --force', 'Force push')
  .parse(process.argv);

console.log(`sure:        ${program.sure}`);
console.log(`base branch: ${program.base}`);
console.log(`description: ${program.desc}`);
console.log(`force push:  ${program.force}`);

process.exit(0);
