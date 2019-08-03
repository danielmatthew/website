import React from 'react';
import './Monogram.css';

const Monogram = () => {
  return (
    <h1 className="monogram">
      <span className="sr-only">
        Daniel Matthew: Web Accessibility Consultant
      </span>
      <span role="presentation" aria-hidden="true">
        D
      </span>
      <span role="presentation" aria-hidden="true">
        M
      </span>
    </h1>
  );
};

export default Monogram;
