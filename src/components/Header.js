import React from 'react';
import Link from 'gatsby-link';

const Header = ({ location }) => {
  let header;
  let rootPath = '/';
  if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
    rootPath = __PATH_PREFIX__ + `/`;
  }

  if (location.pathname === rootPath) {
    header = (
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
    );
  } else {
    header = (
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
    );
  }

  return (
    <div
      style={{
        background: 'rebeccapurple',
        marginBottom: '1.45rem',
      }}
    >
      {header}
    </div>
  );
};

export default Header;
