---
title: Automating the Build Process with Travis-CI
layout: post
published: true
---

Before I ported this site over to [Gatsby](), it was powered by good old [Jekyll](). I'd make an edit, run `jekyll build`, then push the output to S3 with [`s3_website`](). Not exactly onerous, but I noticed that I'd be drafting posts and then not publishing them in a timely manner.

Cue a Continuous Integration (CI) solution – although it took me many attempts to get it right. And by right, I mean, at least it builds the site, deploys to S3, and then invalidates the CloudFront distribution.

## Attempt #1: default S3 provider
- Set as Node project
- Figure how to install Yarn

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

- Notice that this option doesn't sync - handy for cleaning up after itself, particularly when versioning files. Maybe not an issue in practice, but I quite like keeping my buckets tidy…

## Attempt #2: Use AWS CLI to perform additional tasks
- Need Python/Pip to install AWS CLI…
- How do I run the node tasks _and_ python?
- Change project type from Node to Python
- Don't forget to install node
- Install NVM
- Install Yarn
- `after_deploy` build

## Attempt #3: Travis solution doesn't sync files, use s3_website
- Noticed the same files were being uploaded again and again
- Change project type from Python to Ruby
- `gem install s3_website` - uses `s3_website.yml` file in project
- Use `script` block to `yarn build`
- Call `s3_website push` in `after_script`
- Can I do all of this in one block? Is `script` the right block?

## Attempt #4: Use AWS CLI for everything
