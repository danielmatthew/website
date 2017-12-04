import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

export default ({ data }) => {
  const siteTitle = data.site.siteMetadata.title;
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <div>
      <Helmet title={siteTitle} />
      {posts
        .filter(post => post.node.frontmatter.title.length > 0)
        .map(({ node: post }) => (
          <div key={post.id}>
            <Link to={post.fields.slug}>
              <h3>{post.frontmatter.title}</h3>
              <time dateTime={post.fields.timestamp}>
                {post.fields.formattedDate}
              </time>
              <p>{post.excerpt}</p>
            </Link>
          </div>
        ))}
    </div>
  );
};

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [fields___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
          }
          fields {
            slug
            formattedDate: date(formatString: "DD MMMM, YYYY")
            timestamp: date
          }
        }
      }
    }
  }
`;
