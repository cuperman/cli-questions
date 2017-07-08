#!/usr/bin/env node

// jshint esversion: 6

'use strict';

const pkg = require('./package');
const program = require('commander');
const inquirer = require('inquirer');

program
  .version(pkg.version)
  .option('-s, --sure', 'I\'m sure I want to create a merge request')
  .option('-b, --base [branch]', 'Base branch to target merge request')
  .option('-d, --desc [description]', 'Description of merge request')
  .option('-f, --force', 'Force push')
  .parse(process.argv);

const questions = [{
  type: 'confirm',
  name: 'sure',
  message: 'Are you sure?',
  when: () => !program.sure
}, {
  type: 'list',
  name: 'base',
  message: 'Choose base branch',
  choices: [
    'track/ui',
    'track/sp',
    'track/connect'
  ],
  when: () => !program.base
}, {
  type: 'input',
  name: 'desc',
  message: 'Enter a description',
  when: () => !program.desc
}, {
  type: 'confirm',
  name: 'force',
  message: 'Force push?',
  when: () => !program.force
}];

inquirer.prompt(questions).then(function (answers) {
  let sure  = program.sure || answers.sure;
  let base  = program.base || answers.base;
  let desc  = program.desc || answers.desc;
  let force = program.force || answers.force;

  console.log(`sure:        ${sure}`);
  console.log(`base branch: ${base}`);
  console.log(`description: ${desc}`);
  console.log(`force push:  ${force}`);

  process.exit(0);
});
