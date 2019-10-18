const path = require('path');
const slugify = require('slug');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' });
    // Get date and title from filename
    console.log(slug);
    const [test, date, title] = slug.match(
      /^\/([\d]{4}-[\d]{2}-[\d]{2})-{1}(.+)\/$/
    );
    const value = `/${slugify([date].join('-'), '/')}/${title}`;

    createNodeField({
      node,
      name: 'slug',
      value,
    });

    // Add date to graph
    createNodeField({
      node,
      name: 'date',
      value: date,
    });
  }
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.map(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/post.js`),
          context: {
            slug: node.fields.slug,
            date: node.fields.date,
          },
        });
      });
      resolve();
    });
  });
};
