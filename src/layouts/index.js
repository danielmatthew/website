import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';

import Header from '../components/Header';

import './index.css';

const TemplateWrapper = ({ children, location }) => (
  <div>
    <Helmet
      htmlAttributes={{ lang: 'en' }}
      title="Daniel Matthew"
      meta={[
        {
          name: 'description',
          content:
            'Articles on web development, accessibility, and performance by Daniel Matthew.',
        },
        {
          name: 'keywords',
          content:
            'web development, accessibility, performance, javascript, css',
        },
      ]}
    />
    <Header location={ location } />
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0 1.0875rem 1.45rem',
      }}
    >
      {children()}
    </div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;
