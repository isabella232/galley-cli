# galley-cli

CLI frontend for Galley.

## Installation

`npm install -g`

## Use

The `galley` CLI tool will walk up the directory tree looking for a `Galleyfile{.js|.coffee}` or
symlink to one. The original `Galleyfile` should be in an NPM module that depends on the
`galley` NPM package. It will run Galley with the `Galleyfile` and package that it finds.

As a step-saving measure, the `galley` CLI tool will install any missing NPM dependencies before
running Galley.
