require('dotenv').config();

const sanityClient = require("@sanity/client");

const { sanity } = require('../client-config')

/**
 * Set manually. Find configuration in
 * studio/sanity.json or on manage.sanity.io
 */


// sanity = {
//   projectId: '06f3iyia',
//   dataset: 'production',
//   useCdn: true
// }


module.exports = sanityClient({...sanity, useCdn: !process.env.SANITY_READ_TOKEN, token: process.env.SANITY_READ_TOKEN});
