import React from 'react';
import Helmet from 'react-helmet';

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
            'Daniel Matthew is an web developer and accessibility consultant. Available for audits and consultancy.',
        },
        {
          name: 'keywords',
          content:
            'web development, accessibility, performance, html, javascript, css',
        },
      ]}
    />

      { children }

  </div>
);

export default TemplateWrapper;
