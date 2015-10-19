#!/usr/bin/env node
'use strict';

process.title = 'galley';

function fatal(msg, code) {
  console.log(chalk.bold(chalk.red('Fatal error: ')) + msg);
  process.exit(code);
}

var chalk = require('chalk');
var findup = require('findup-sync');
var resolve = require('resolve').sync;
var checkDependencies = require('check-dependencies');

var fs = require('fs');
var path = require('path');

var galleyfilePath = findup(['Galleyfile', 'Galleyfile.js']);
if (!galleyfilePath) {
  fatal('Unable to find Galleyfile in this directory or a parent.', 99);
}

var actualGalleyfilePath = fs.realpathSync(galleyfilePath);
var actualGalleyfileDir = path.dirname(actualGalleyfilePath);
var packageJsonPath = findup(['package.json'], {cwd: actualGalleyfileDir})
var basedir = (packageJsonPath) ? path.dirname(packageJsonPath) : actualGalleyfileDir;

checkDependencies({
  packageManager: 'npm',
  packageDir: basedir,
  install: true,
  scopeList: ['dependencies'],
  checkGitUrls: true,
}).then(function(output) {
  if (output.status != 0) {
    output.error.map(function(err) {
      console.log(chalk.magenta('galley-cli:'), chalk.red(err));
    });
    process.exit(1);
  }

  if (!output.depsWereOk) {
    console.log(chalk.magenta('galley-cli:'), chalk.gray('Installed NPM dependencies in ' + chalk.bold(basedir)));
  }

  var galleyPath;
  try {
    galleyPath = resolve('galley', {basedir: basedir});
  } catch (ex) {
    // ignore, will fatal error below if galleyPath is not set
  }

  if (!galleyPath) {
    fatal('Unable to resolve “galley” in ' + chalk.bold(basedir) + '\n' +
      'Make sure you have a package.json file in that directory that lists galley as a dependency.', 99);
  }

  require(galleyPath)(actualGalleyfilePath, process.argv);
});
