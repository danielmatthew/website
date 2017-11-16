# danmatthew.co.uk

## Development
- Uses [Gatsbyjs](https://www.gatsbyjs.org/) to generate the static site.

## Deployment
- On succesful Travis build, pushed to S3 and CloudFront distribution invalidated using AWS CLI

## Plans
- [ ] Code for implementing a service worker to add all assets to local cache exists, but my implementation was buggy. Google released [sw-toolbox](https://github.com/GoogleChromeLabs/sw-toolbox) (now [Workbox](https://workboxjs.org/))
- [ ] Improve build process so that static assets are versioned for indefinite caching.
- [x] Port to Gatsby.
