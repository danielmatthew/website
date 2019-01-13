import React from 'react';
import './Monogram.css';

const Monogram = () => {
  return (
    <h1 className="monogram">
      <span className="sr-only">Daniel Matthew</span>
      <span role="presentation">D</span>
      <span role="presentation">M</span>
    </h1>
  );
};

export default Monogram;
