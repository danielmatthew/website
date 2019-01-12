import React from 'react';
import { graphql, Link } from 'gatsby';
import Helmet from 'react-helmet';

import Layout from '../components/Layout';
import About from '../components/About';
import ContactForm from '../components/ContactForm';

export default ({data}) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
      <Layout>
        <Helmet titleTemplate={ `%s | ${siteTitle}` } defaultTitle={siteTitle} />
        <section className="grid-container">
          <h1 className="monogram">
            <span>D<span className="sr-only">aniel</span></span>
            <span>M<span className="sr-only">atthew</span></span>
          </h1>
          <ContactForm></ContactForm>
        </section>
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
