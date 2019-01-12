import React from 'react';
import Helmet from 'react-helmet';


// import Header from '../components/Header';

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

      { children }

  </div>
);

export default TemplateWrapper;
