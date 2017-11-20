import React from 'react';
import Helmet from 'react-helmet';

import 'prismjs-okaidia-theme/prism-okaidia.css';

export default ({ data }) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;

  return (
    <div>
      <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
      <h1>{post.frontmatter.title}</h1>
      <time dateTime={post.fields.timestamp}>{post.fields.formattedDate}</time>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  );
};

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
      fields {
        formattedDate: date(formatString: "DD MMMM, YYYY")
        timestamp: date
      }
    }
  }
`;
