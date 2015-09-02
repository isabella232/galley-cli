# galley-cli

CLI frontend for Galley.

Full documentation at: (galley)[https://github.com/crashlytics/galley]

## Installation

`npm install -g 'git+ssh://git@github.com:crashlytics/galley-cli#distribution'`

## Use

The `galley` CLI tool will walk up the directory tree looking for a `Galleyfile(.js)` or
symlink to one. The original `Galleyfile` should be in an NPM module that depends on the
`galley` NPM package. This tool will use that `galley` implementation to run commands against
the `Galleyfile`

As a step-saving measure, the `galley` CLI tool will install any missing NPM dependencies before
running Galley.
