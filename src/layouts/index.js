import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';

import './index.css';


const TemplateWrapper = ({ children, location }) => {
  let header;
  let rootPath = '/';
  if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
    rootPath = __PATH_PREFIX__ + `/`
  }

  if (location.pathname === rootPath) {
    header = (
      <div
        style={{
          background: 'rebeccapurple',
          marginBottom: '1.45rem',
        }}
      >
      <div
        style={{
          margin: '0 auto',
          maxWidth: 960,
          padding: '1.45rem 1.0875rem',
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
          >
            Daniel Matthew
            </Link>
        </h1>
      </div>
      </div>
    );
  } else {
    header = (
      <div
        style={{
          background: 'rebeccapurple',
          marginBottom: '1.45rem',
        }}
      >
      <div
        style={{
          margin: '0 auto',
          maxWidth: 960,
          padding: '1.45rem 1.0875rem',
        }}
      >
        <span style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
          >
            Daniel Matthew
            </Link>
        </span>
      </div>
      </div>
    );
  }

  return (
    <div>
      <Helmet
        htmlAttributes={
          {lang: 'en'}
        }
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
      {header}
      <div
        style={{
          margin: '0 auto',
          maxWidth: 960,
          padding: '0px 1.0875rem 1.45rem',
          paddingTop: 0,
        }}
      >
        {children()}
      </div>
    </div>
  );
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;
