import React from 'react';
import { graphql, Link } from 'gatsby';
import Helmet from 'react-helmet';

import Layout from '../components/Layout';
import About from '../components/About';
import ContactForm from '../components/ContactForm';
// import PostList from '../components/PostList';
// import Photo from '../components/Photo'

export default ({ data }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout>
      <Helmet titleTemplate={`${siteTitle}`} defaultTitle={siteTitle} />
      <main className="grid-container">
        <h1>Daniel Matthew</h1>
      </main>
    </Layout>
  );
};

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
