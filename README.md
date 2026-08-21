# Priesemann Group website

This repository contains the Priesemann Group website. It uses Jekyll and the
[Academic Pages](https://github.com/academicpages/academicpages.github.io)
template and is deployed by GitHub Pages.

## Local preview

`index.html` is now a Jekyll source file. Opening it directly in a browser does
not work because Jekyll must first expand its template and includes.

Install Ruby and Bundler once, then run:

```bash
gem install --user-install bundler
./preview.sh
```

Open <http://127.0.0.1:4000> in a browser. The preview rebuilds automatically
when a source file changes. Stop it with `Ctrl+C`.

The first invocation installs the dependencies from `Gemfile` into
`vendor/bundle`; subsequent starts reuse them.

## Deployment

Push the repository to the configured GitHub Pages publishing branch. GitHub
builds the Jekyll site and publishes the generated pages; Docker is not used.

The Academic Pages template is distributed under the license in `LICENSE`.
