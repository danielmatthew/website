---
title: Automating the Build Process with Travis-CI
layout: post
published: true
---

Before I ported this site over to [Gatsby](https://www.gatsbyjs.org), it was powered by good old [Jekyll](https://github.com/jekyll/jekyll). I'd make an edit, run `jekyll build`, then push the output to S3 with [`s3_website`](https://github.com/laurilehmijoki/s3_website). Not exactly onerous, but I noticed that I'd be drafting posts, or updating the structure of the site and then not pushing them live in a timely manner. _(And what do you know, it's happened again! – Ed., December 2nd)_

Cue a Continuous Integration (CI) solution – although it took me many attempts to get it right. And by right, I mean it at least:
- builds the site
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
Because I have both `package.json` and `yarn.lock` in my repository, Travis is smart enough to figure I want to use Yarn to run during the `install` phase. 

I like this implementation, but Travis is only concerned with S3 here. I have a Cloudfront distribution sat in front of this bucket in the hope of saving a few pence and making the site feel snappy. Sure, I could manually log in to AWS and invalidate the distribution or do it via the command line, but y'know: let's automate it.

## Attempt #2: Use AWS CLI to invalidate the Cloudfront distribution
This is where it feels messy, and there are a bunch of extra steps to mess up. AWS CLI is installed via Pip, so this implementation needs to be driven by Python. 

```yml
language: python
python: 3.6
sudo: required
dist: trusty
env:
 - TRAVIS_NODE_VERSION="8"
```
I had to explicitly specify the version of Python, because the default appeared to be 2.4 and I ran into issues… Java-related, _possibly?_.

This is where it starts to be a blend of different tasks, and I'm piecing together instructions from various sources. 

### Install Yarn
```yml
before_install:
  - curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
  - echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
  - sudo apt-get -qq update
  - sudo apt-get -y install yarn
```

### Install NVM

As it's not provided by default, I need to install Node and NPM in order to install my site's dependencies and then build it. I figured NVM would be the most sensible approach:

```yml
install:
 - rm -rf ~/.nvm && git clone https://github.com/creationix/nvm.git ~/.nvm && (cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`) && source ~/.nvm/nvm.sh && nvm install $TRAVIS_NODE_VERSION
 - pip install awscli
```

I discover afterwards that the ugly `$TRAVIS_NODE_VERSION` environment variable could have been avoided by [specifying the version in the project's `.nvmrc` file](https://docs.travis-ci.com/user/languages/javascript-with-nodejs/).

As the Travis cycle goes `install`, `script`, `deploy`, next up is…

```yml
before_script:
  npm install
script:
  npm run build
```

_(Travis experts – could those commands just have been listed sequentially in the `script` block?)_.

### Configure S3 bucket

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

### Blow away the old Cloudfront distribution

When this succeeds, we can now use the AWS CLI to ensure that Cloudfront serves the latest version of these files:

```yml
after_deploy:
 # Allow `awscli` to make requests to CloudFront.
 - aws configure set preview.cloudfront true
 # Invalidate every object in the targeted distribution.
 - test $TRAVIS_BRANCH = "master" && aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"
```

Inspecting the bucket, I notice that Travis doesn't doesn't sync the files – i.e. only new files are added; old ones are deleted. It might not be an issue in practice, but I quite like keeping my buckets tidy… 😒

Next!

## Attempt #3: Use s3_website
I mentioned in the intro that when publshing the website from my computer I used the s3_website gem. I know it, it does all the tasks I want it to, and it's straightforward to configure. 

(Although, I fib: since upgrading to Sierra, I've not been ~~able~~ inclined to deploy since it requires a Java installation which I really don't want to do. I know, weaksauce.)

So, we go again! Now, we're sacking off a Python-based deployment pipe in favour of a Ruby powered process:

```yml
language: ruby
rvm: 2.2
sudo: required
dist: trusty
# Again with the redundant env var
env: 
 - TRAVIS_NODE_VERSION="8"
before_install:
  - curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
  - echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
  - sudo apt-get -qq update
  - sudo apt-get -y install yarn
```

### Install s3_website
```yml
install:
  - . $HOME/.nvm/nvm.sh
  - nvm install stable
  - nvm use stable
  - gem install s3_website
```
### Push to S3
```yml
before_script:
 - yarn
script:
 - yarn build
after_script:
 - test $TRAVIS_BRANCH = "master" && s3_website push
```

Boom. All my `s3_website` settings are configured in environment variables and my `s3_website.yml` config, so that one line in the `after_script` block pushes to the correct bucket and invalidates the Cloudfront distribution. 

Looking back over it, I think I'd be quite happy to sack off the yarn installation and reply on NPM. Again I wonder whether the blocks can be consolidated into one and the commands listed sequentially? I'm not experienced enough with Travis to know what benefits I get from splitting the commands into the different stages, especially since this particular deployment process is not exactly complicated. Perhaps so the process can fail earlier if necessary? 

## Proposed attempt #4: Use AWS CLI for everything
I suspect I could probably do all of the above with the AWS CLI, though it will need switching back over to Python again. Woe is me 😩.