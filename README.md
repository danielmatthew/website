# danmatthew.co.uk

## Development
- Uses [Gatsbyjs](https://www.gatsbyjs.org/) to generate the static site.

## Deployment
- ~~On succesful Travis build, pushed to S3 and CloudFront distribution invalidated using AWS CLI~~ Travis manually configured to use s3_website gem so that files can be synced, rather than continually added to. It also invalidates the CF distro at the same time, which is nice. I'm not sure if the steps are in the right place, but it works…


## Plans
- [ ] Code for implementing a service worker to add all assets to local cache exists, but my implementation was buggy. Google released [sw-toolbox](https://github.com/GoogleChromeLabs/sw-toolbox) (now [Workbox](https://workboxjs.org/))
- [x] ~~Improve build process so that static assets are versioned for indefinite caching.~~ Gatsby takes care of the versioning for me – I just stick a massive `max-age` on each static resource.
- [x] Port to Gatsby.
