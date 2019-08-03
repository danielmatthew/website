import React from 'react';
import Helmet from 'react-helmet';

import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import About from '../components/About';

import 'prismjs-okaidia-theme/prism-okaidia.css';

export default ({ data }) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout>
      <article>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />

        <header>
          <h1 className="mb0">{post.frontmatter.title}</h1>
          <time dateTime={post.fields.timestamp}>
            {post.fields.formattedDate}
          </time>
        </header>

        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <About />
      </article>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
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
