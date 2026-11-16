import eslintPluginAstro from 'eslint-plugin-astro';
import prettierConfig from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default [
  ...eslintPluginAstro.configs.recommended,
  prettierConfig,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
    },
  },
  {
    // Parse TypeScript in Astro frontmatter and <script> tags
    files: ['**/*.astro'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    ignores: [
      'dist/',
      '.astro/',
      '.cache/',
      'coverage/',
      'public/',
      'tina/__generated__/',
      'node_modules/',
    ],
  },
];
