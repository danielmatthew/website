import React from 'react';
import graphql from 'gatsby';

export default ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <ol>
      {posts
        .filter(post => post.node.frontmatter.title.length > 0)
        .filter(post => post.node.frontmatter.published === true)
        .map(({ node: post }) => (
          <li key={post.id}>
            <Link to={post.fields.slug}>
              <h3>{post.frontmatter.title}</h3>
            </Link>
          </li>
        ))}
    </ol>
  );
};

export const postQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      limit: 5
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            published
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
