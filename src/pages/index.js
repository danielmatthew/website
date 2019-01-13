import React from 'react';
import { graphql, Link } from 'gatsby';
import Helmet from 'react-helmet';

import Layout from '../components/Layout';
import Monogram from '../components/Monogram';
import About from '../components/About';
import ContactForm from '../components/ContactForm';

export default ({data}) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
      <Layout>
        <Helmet titleTemplate={ `${siteTitle}` } defaultTitle={siteTitle} />
        <main className="grid-container">
          <Monogram />
          <ContactForm></ContactForm>
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
