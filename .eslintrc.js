module.exports = {
  env: {
    browser: true,
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
      experimentalObjectRestSpread: true,
      jsx: true,
    },
  },
};
