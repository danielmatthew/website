---
title: Automating the Build Process with Travis-CI
layout: post
published: true
---

Before I ported this site over to [Gatsby](https://www.gatsbyjs.org), it was powered by good old [Jekyll](). I'd make an edit, run `jekyll build`, then push the output to S3 with [`s3_website`](). Not exactly onerous, but I noticed that I'd be drafting posts, or updating the structure of the site and then not pushing them live in a timely manner. _(And lo, it's happened again! – Ed., December 2nd)_

Cue a Continuous Integration (CI) solution – although it took me many attempts to get it right. And by right, I mean:
- it builds the site
- deploys to S3
- invalidates the CloudFront distribution.

## Attempt #1: Use the default S3 provider
[Travis'](https://docs.travis-ci.com) documentation is pretty, pretty, pretty good. I think you could just about get away with this, if you're happy to serve straight from the S3 bucket:

```yml
language: node_js
node_js: 
 - "8"
script:
 - yarn build
deploy:
  provider: s3
  access_key_id: $AWS_ACCESS_KEY_ID
  secret_access_key: $AWS_SECRET_ACCESS_KEY
  bucket: danmatthew.co.uk
  region: $AWS_DEFAULT_REGION
  # Prevent Travis from deleting your built site so it can be uploaded.
  skip_cleanup: true
  # Path to a directory containing your built site.
  local_dir: public
  on:
    branch: master
```
Because I have both `package.json` and `yarn.lock` in my repository, Travis is smart enough to figure I want to use Yarn to run during the `install` phase. I like this implementation, but I have a Cloudfront distribution sat in front of this bucket in the hope of saving a few pence and making the site feel snappy. Sure, I could log in to AWS and invalidate the distribution, or do so via the command line, but y'know: let's automate it.

## Attempt #2: Use AWS CLI to invalidate the Cloudfront distribution
- Need Python/Pip to install AWS CLI…
- How do I run the node tasks _and_ python?
- Change project type from Node to Python
- Don't forget to install node
- Install NVM
- Install Yarn
- `after_deploy` build

This is where it feels messy, and there are a bunch of extra steps to mess up. AWS CLI is installed via Pip, so this implementation needs to be driven by Python. 

```yml
language: python
python: 3.6
sudo: required
dist: trusty
env:
 - TRAVIS_NODE_VERSION="8"
```
I had to explicitly specify the version of Python, because the default appeared to be 2.4 and I ran into issues… Java-related, IIRC.

This is where it starts to be a blend of different tasks, and I'm piecing together instructions from various sources. I need to install Node and NPM in order to install my site's tooling and then go on and build it. To this end, NVM seems a reasonable approach:

```yml
install:
 - rm -rf ~/.nvm && git clone https://github.com/creationix/nvm.git ~/.nvm && (cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`) && source ~/.nvm/nvm.sh && nvm install $TRAVIS_NODE_VERSION
 - pip install awscli
```
I discover afterwards that the ugly `$TRAVIS_NODE_VERSION` environment variable could have been avoided by [specifying the version in an `.nvmrc` file](https://docs.travis-ci.com/user/languages/javascript-with-nodejs/).

As the Travis cycle goes `install`, `script`, `deploy`, next up is:

```yml
before_script:
  npm install
script:
  npm run build
```

_(Travis experts – could those commands just have been listed sequentially in the `script` block?)_.

We use the same `deploy` block as before:

```yml
deploy:
  provider: s3
  access_key_id: $AWS_ACCESS_KEY_ID
  secret_access_key: $AWS_SECRET_ACCESS_KEY
  bucket: danmatthew.co.uk
  region: $AWS_DEFAULT_REGION
  # Prevent Travis from deleting your built site so it can be uploaded.
  skip_cleanup: true
  # Path to a directory containing your built site.
  local_dir: public
  on:
    branch: master
```

When this succeeds, we can now use the AWS CLI to ensure that Cloudfront serves the latest version of these files:

```yml
after_deploy:
 # Allow `awscli` to make requests to CloudFront.
 - aws configure set preview.cloudfront true
 # Invalidate every object in the targeted distribution.
 - test $TRAVIS_BRANCH = "master" && aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"
```

Inspecting the bucket, I notice that Travis doesn't doesn't sync the files – i.e. only new files are added; old ones are deleted. It might not be an issue in practice, but I quite like keeping my buckets tidy… 😒

### Install Yarn
```yml
before_install:
  - curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
  - echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
  - sudo apt-get -qq update
  - sudo apt-get -y install yarn
```

### Install NVM
```bash
`rm -rf ~/.nvm && git clone https://github.com/creationix/nvm.git ~/.nvm && (cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`) && source ~/.nvm/nvm.sh && nvm install $TRAVIS_NODE_VERSION`
```

^^ Seems overkill!

### Configure S3 bucket

```yml
deploy:
  provider: s3
  access_key_id: $AWS_ACCESS_KEY_ID
  secret_access_key: $AWS_SECRET_ACCESS_KEY
  bucket: danmatthew.co.uk
  region: $AWS_DEFAULT_REGION
  # Prevent Travis from deleting your built site so it can be uploaded.
  skip_cleanup: true
  # Path to a directory containing your built site.
  local_dir: public
  on:
    branch: master
```

### Cloudfront?
- Oh. Doesn't invalidate Cloudfront distribution by default; could add this task to a `after_deploy` block and use AWS CLI again?




## Attempt #3: Travis solution doesn't sync files, use s3_website
- Noticed the same files were being uploaded again and again
- Change project type from Python to Ruby
- `gem install s3_website` - uses `s3_website.yml` file in project
- Use `script` block to `yarn build`
- Call `s3_website push` in `after_script`
- Can I do all of this in one block? Is `script` the right block?

## Attempt #4: Use AWS CLI for everything
