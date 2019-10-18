import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

export default ({ data }) => (
  <div>
    <Img fixed="data.file.childImageSharp.fixed" />
  </div>
);
