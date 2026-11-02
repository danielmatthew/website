import eslintPluginAstro from 'eslint-plugin-astro';
import prettierConfig from 'eslint-config-prettier';

export default [
  ...eslintPluginAstro.configs.recommended,
  prettierConfig,
  {
    ignores: ['dist/', '.tina/__generated__/', 'node_modules/'],
  },
];
