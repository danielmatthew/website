---
title: Automating Github Releases With Lerna
tags:
 - circleci
 - lerna
 - monorepo
 - github
syndicate: true
published: true
date: 2020-08-03
---

## Lerna
Lerna is a tool to manage a monorepo. It can automate releases on Github when the version of a package changes, which is one less task to perform manually.

## Circle CI
Circle is a continuous integration solution. In this scenario, Circle is configured to run the test suite for each component after a commit. Once the tests pass, Lerna will increment the version number of the component, using the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/)

## Creating a release

### Circle Config
Here is a workflow definition with two discrete jobs. The first runs the tests; the second runs `lerna version` against the desired components.

```yaml
version: 2.1
orbs:
  node: circleci/node@1.1.6
jobs:
  build-and-test:
    executor:
      name: node/default
    docker:
      - image: circleci/node:latest-browsers
    resource_class: small
    steps:
      - checkout
      - node/with-cache:
          steps:
            - run: npm install
            - run: npm test

release:
    docker:
      - image: circleci/node
    resource_class: small
    steps:
      - checkout
      - node/with-cache:
          steps:
            - add_ssh_keys:
                fingerprints:
                  - "F1:NG:3R:PR:1N:T"
            - run: npx lerna bootstrap --hoist --ci
            - run: npx lerna version --no-private --conventional-commits --create-release github --yes

workflows:
    build-and-test:
      jobs:
        - build-and-test
        - release:
            filters:
              branches:
                only: main
            requires:
              - build-and-test
```

All the interesting work is contained within this instruction:

```
npx lerna version --no-private --conventional-commits --create-release github --yes
```

Lerna will increment the version of public packages using the Conventional Commits spec, before creating a Github release, and it won't need any prompting to do so.

### Creating a deploy key

In order to modify the project repository, Circle will need an SSH key with write access: a "deploy key". The public key is added from the project's `settings/keys` screen on Github; the private half is added to Circle via Project Settings -> SSH Keys. You'll know if you got it right, because you'll avoid the following:

```
lerna ERR! lerna ERROR: The key you are authenticating with has been marked as read only.
lerna ERR! lerna fatal: Could not read from remote repository.
lerna ERR! lerna
lerna ERR! lerna Please make sure you have the correct access rights
lerna ERR! lerna and the repository exists.
lerna ERR! lerna
```

### Adding an access token
While the machine might be authenticated, Lerna will need to identify itself as working with the correct permissions. Thus the addition of `GH_TOKEN` available to it. A new access token can be created from within [Github](https://github.com/settings/tokens/)

## Publishing the release
When a build goes green on the main branch, a [new release will appear automatically on Github](https://github.com/danielmatthew/accessible-web-components/releases). The release notes will be filled automatically, and the changelog for each package will have been updated at the same time. There does appear to be a slight bug with the version number. My understanding is that `fix` commits will increment the patch number when using semantic versioning, but the component has increased from `0.2.0` to `0.2.1` with a single `chore` commit…

## Next steps
Lerna's `publish` command works the same as `version`, but automates publishing to NPM.

