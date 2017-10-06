# danmatthew.co.uk

## Development
- Uses Jekyll to generate the static site.
- We use Sass. Somewhere down in the murk of all this is Mdo's Poole theme.

## Deployment
- Uses https://github.com/laurilehmijoki/s3_website to push to S3 and invalidate the CloudFront distribution at the same time.

## Plans
- Code for implementing a service worker to add all assets to local cache exists, but my implementation was buggy. Google released [sw-toolbox](https://github.com/GoogleChromeLabs/sw-toolbox) (now [Workbox](https://workboxjs.org/))
- Improve build process so that static assets are versioned for indefinite caching.
