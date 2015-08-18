#!/usr/bin/env node
'use strict';

process.title = 'galley';

function fatal(msg, code) {
  console.log('Fatal error: ' + msg);
  console.log('');
  process.exit(code);
}

var findup = require('findup-sync');
var resolve = require('resolve').sync;
var checkDependencies = require('check-dependencies');

var fs = require('fs');
var path = require('path');

var basedir = process.cwd();
var galleyfilePath = findup(['Galleyfile', 'Galleyfile.js']);

if (!galleyfilePath) {
  fatal('Unable to find Galleyfile in this directory or a parent.', 99);
}

var actualGalleyfilePath = fs.realpathSync(galleyfilePath);
var basedir = path.dirname(actualGalleyfilePath);

checkDependencies({
  packageManager: 'npm',
  packageDir: basedir,
  install: true,
  scopeList: ['dependencies'],
  checkGitUrls: true,
}).then(function(output) {
  if (output.status != 0) {
    output.error.map(function(err) {
      console.log(err);
    });
    process.exit(1);
  }

  if (!output.depsWereOk) {
    console.log('Installed missing NPM dependencies');
  }

  var galleyPath;
  try {
    galleyPath = resolve('galley', {basedir: basedir});
  } catch (ex) {
    // ignore, will fatal error below if galleyPath is not set
  }

  if (!galleyPath) {
    fatal('Unable to find local galley in ' + basedir + '.', 99);
  }

  require(galleyPath)(actualGalleyfilePath, process.argv);
});
