![Galley](docs/images/galley-red.png)

# galley-cli

CLI frontend for [Galley](https://github.com/twitter-fabric/galley).

**Latest version:** 1.0.1 release!

## Installation

```console
$ npm install -g galley-cli
```

## Use

The `galley` CLI tool will walk up the directory tree looking for a `Galleyfile(.js)` or
symlink to one. The original `Galleyfile` should be in an NPM module that depends on the
`galley` NPM package. This tool will use that `galley` implementation to run commands against
the `Galleyfile`

As a step-saving measure, the `galley` CLI tool will install any missing NPM dependencies before
running Galley.

See the [Galley README](https://github.com/twitter-fabric/galley/blob/master/README.md) for
complete documentation on Galley.
