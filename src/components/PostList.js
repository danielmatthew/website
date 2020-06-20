import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

export default () => {
  const data = useStaticQuery(graphql`
    query postTitleQuery {
      allMarkdownRemark(sort: { fields: [fields___date], order: DESC }) {
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
  `);

  const { edges: posts } = data.allMarkdownRemark;

  return (
    <ol className="c-post-list">
      {posts
        .filter(post => post.node.frontmatter.title.length > 0)
        .filter(post => post.node.frontmatter.published === true)
        .map(({ node: post }) => (
          <li key={post.id}>
            <Link to={post.fields.slug}>
              <h2>{post.frontmatter.title}</h2>
            </Link>
          </li>
        ))}
    </ol>
  );
};
