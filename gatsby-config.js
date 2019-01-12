module.exports = {
  siteMetadata: {
    title: `Daniel Matthew`,
    author: `Daniel Matthew`
  },
  plugins: [
    // `gatsby-plugin-preact`,
    `gatsby-plugin-react-helmet`,
    // `gatsby-plugin-catch-links`,
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages"
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      // options: {
      //   plugins: [{
      //     resolve: `gatsby-remark-prismjs`
      //   }]
      // }
    }
  ]
};
