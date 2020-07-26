---
title: Using continuous integration to build, test, and publish a Netlify site
metaDesc: In which I document using Travis CI to build, test, and publish an eleventy-generated static site to Netlify
published: true
tags:
  - netlify
  - eleventy
  - travis-ci
  - cypress
---

Last week, Chris Coyier [published a post on CSS Tricks which covered an approach to the simplest of testing set-ups](https://css-tricks.com/develop-preview-test/): ensuring the website loads and displays some content. A "smoke test".

> Just one super basic integration goes a long way. If your site spins up, returns a page, and renders stuff on it that you expect, a lot is going right.

I've been meaning to add some level of test coverage to this website for a while now. I'd been wanting to run builds against Lighthouse CI to ensure that anything that breaks the performance budget or fails one of the automated accessibility tests doesn't make it into production.

Thanks to [some well-written documentation](https://docs.cypress.io/guides/getting-started/writing-your-first-test.html#Step-1-Visit-a-page), it was easy to get Cypress installed and configured to test against my local development server.

## The test
Per the docs:

```js
/// <reference types="Cypress" />

describe('Home page', () => {
  it('successfully loads', () => {
    cy.visit('/');

    cy.get('h1').should('contain', 'Dan Matthew');
  });
});
```

Cypress will look for a configuration file in the directory, and it's in this `cypress.json` where a `baseUrl` can be defined:

```json
{
  "baseUrl": "http://localhost:8080",
  "ignoreTestFiles": "cypress/integration/examples/*.js"
}
```

Each call to `.visit()` will use the `baseUrl` as its root. While it's set to `localhost` here, we'll want to change it later on, for reasons that will become apparent.


## Testing against a local web server

Netlify expects tests to be run elsewhere, since every commit to the linked VCS causes a build and publish. I'd [used Travis CI previously](/notes/deploying-with-travis/), so thought I'd pick up where I left off. I wanted it to operate like my local devlopment flow, where I'd run `npx eleventy serve`, then spawn Cypress in the background: `npm run serve:ci && npm test`

This [did not work as anticipated](https://travis-ci.com/github/danielmatthew/website/builds/176151683). `serve` was never going to end, and Cypress was never going to be started 😂. The Cypress docs even warned against this, and do [cover a number of solutions](https://docs.cypress.io/guides/guides/continuous-integration.html#Solutions), but pig-headedly I didn't want to install yet another package.

Time to rethink.


## Building a Deploy Preview with the Netlify CLI

When Netlify builds the site, I've configured it to use a couple of [Build Plugins](https://docs.netlify.com/configure-builds/build-plugins/) to hash and rename static files and create a sitemap. I didn't realise that these can be installed locally as devDependencies and they'll operate on the generated site just as they do on live. This meant using the CLI became a plausible alternative, once automatic builds were turned off.

This setting can be found at https://app.netlify.com/sites/{YOUR_SITE_NAME}/settings/deploys. Look for "Build Settings", and then "Stop builds". The following warning is displayed:

> Netlify will never build your site. You can build locally via the CLI and then publish new deploys manually via the CLI or the API.

Now the onus is on the developer 😬. In this case, we'll get Travis to perform this task for us. With the simplest of configurations each commit will build the site, but only those pushed to `main` will trigger a deploy:


```yml
language: node_js
node_js:
  - "node"
cache: npm
script:
  - npx netlify build
deploy:
  cleanup: false
  provider: script
  script: npx netlify deploy
  on:
    branch: main
```

The boffins out there will know that this implementation is naive: it doesn't run any tests; and it's going to give me a green build each time, which is nice for the ego, less so for confirming that the site renders. That `build` script might have only succeeded in pumping out a broken site if something's gone screwy in development.

## Testing a Deploy Preview with Cypress

One of the neat things about Netlify is that each branch will get built and published with a unique URL. This makes it easy to visit the preview in a browser and ensure it works as expected. How can we access that URL and provide it to Cypress?

The [documentation for `deploy`](https://cli.netlify.com/commands/deploy) offers a hint:

> - alias (option) - Specifies the alias for deployment. Useful for creating predictable deployment URL's

Very useful indeed, Netlify. But what to use as our alias? I don't know how long branch deploys exist, so it didn't seem sensible to use a hard-coded string. It turns out that Travis surfaces a number of environment variables: I opted for `$TRAVIS_JOB_ID` because it seemed like it's probably going to be unique…

First off however, the branch build is going to have to be deployed: `npx netlify deploy --alias $TRAVIS_JOB_ID`. Then Cypress is invoked: `npx cypress run --env host=$TRAVIS_JOB_ID--danmatthew.netlify.app --spec \"cypress/integration/home_page.spec.js\" --headless`

The `--env` flag in the `cypress run` command overrides the `baseUrl` from `cypress.json` and ensures we are testing the latest deploy.

In the logs of previous builds I'd seen:

> If everything looks good on your draft URL, deploy it to your main site URL with the --prod flag.

Alrighty, then!

🚨 Uh-oh. Cypress crashed: [apparently the spec flag doesn't play nicely with CI environments](https://github.com/cypress-io/cypress/issues/3957). Ah well, don't have to worry about running all the tests if there's only one test…

With that resolved, the build failed again. `--env host` is completely the wrong flag, and to set the baseUrl from the environment is done thusly:
`CYPRESS_BASE_URL=https://$TRAVIS_JOB_ID--danmatthew.netlify.app npx cypress run --headless --config-file false`

With that done, our config looks like:

```yml
os: linux
dist: xenial
language: node_js
node_js:
  - "node"
cache:
  npm: true
  directories:
    - ~/.cache
script:
  - npx netlify build
  - npx netlify deploy --alias $TRAVIS_JOB_ID
  - CYPRESS_BASE_URL=https://$TRAVIS_JOB_ID--danmatthew.netlify.app npx cypress run --headless --config-file false
deploy:
  cleanup: false
  provider: script
  script: npx netlify deploy --prod
  on:
    branch: main
```

…and we get a succesful build.

## Use the Netlify provider, stupid
There's me, using multiple steps under the `script` phase, when Travis provides its own deploy step for Netlify projects.

Perhaps the [documentation needs to be clearer](https://docs.travis-ci.com/user/deployment-v2/#supported-providers) because it references [Netlify Drop](https://app.netlify.com/drop), which at first glance looks like a different mechanism entirely. When I looked closer at the required arguments, I realised they were identical to the CLI commands I was using earlier.

Using the provider means the deploy stage of our `travis.yml` takes this form:

```yml
deploy:
  cleanup: false
  provider: netlify
  site: $NETLIFY_SITE_ID
  auth: $NETLIFY_AUTH_TOKEN
  prod: true
  edge: true
  on:
    branch: main
```

There we go: we've got a CI tool taking care of testing our builds. If the tests pass, the site will be set live. If not, we can go visit the deploy preview and see what's gone wrong.

## Bonus: Automating Github releases
Doing this isn't strictly necessary, but I wanted to play with the [semantic-release](https://semantic-release.gitbook.io/semantic-release/) package and see what it could do. I had intended to incorporate it into the Accessible Web Components project, but I discovered Lerna could perform both actions for me, which rendered it superfluous.

To [publish a new release on Github](https://github.com/danielmatthew/website/releases), we can add a `run` property to the deploy stage, or make it a little more obvious with the `after_deploy` stage:

```yml
if tag IS blank
after_deploy:
  - npx semantic-release
```

The conditional there is to prevent yet another build when semantic-release creates the tag. It took me a while to figure out why I was seeing three builds…

Like many other tools, semantic-release supports many configuration options. In this case, I didn't want the package being pushed to npm, so it was necessary to override the default plugins with the following in my `releaserc` file:

```json
{
  "branches": "main",
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/github"
  ]
}
```

