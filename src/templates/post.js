import React from 'react';
import Helmet from 'react-helmet';

import About from '../components/About';

import 'prismjs-okaidia-theme/prism-okaidia.css';

export default ({ data }) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;

  return (
    <article>
      <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
      
      <header>
        <h1 class="mb0">{post.frontmatter.title}</h1>
        <time dateTime={post.fields.timestamp}>{post.fields.formattedDate}</time>
      </header>

      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <About />
    </article>
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
