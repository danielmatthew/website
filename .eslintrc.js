module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['plugin:jsx-a11y/recommended'],
  plugins: ['react', 'jsx-a11y'],
  globals: {
    graphql: false,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      ecmaVersion: 2018,
      experimentalObjectRestSpread: true,
      jsx: true,
    },
  },
};
