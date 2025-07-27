// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    ignores: ['dist/*'],
    rules: {
      'prettier/prettier': 'error',
      'padding-line-between-statements': [
        'warn',
        { blankLine: 'always', prev: 'directive', next: '*' },
        { blankLine: 'always', prev: '*', next: 'block-like' },
        { blankLine: 'always', prev: 'block-like', next: '*' },
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['singleline-const', 'singleline-let', 'singleline-var'],
          next: ['singleline-const', 'singleline-let', 'singleline-var'],
        },
      ],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-await-in-loop': 'error',
      'no-console': [
        'error',
        {
          allow: ['warn', 'error'],
        },
      ],
      'no-else-return': 'warn',
      'no-implicit-coercion': 'error',
      'no-param-reassign': 'error',
      'no-return-await': 'error',
      'no-self-compare': 'error',
      'no-undef-init': 'warn',
      'no-unneeded-ternary': 'error',
      'no-var': 'error',
      'object-shorthand': 'warn',
      'prefer-const': 'warn',
      'prefer-object-spread': 'warn',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'warn',
      'react/hook-use-state': 'error',
      'react/jsx-boolean-value': 'warn',
      'react/jsx-curly-brace-presence': 'warn',
      'react/jsx-fragments': 'warn',
      'react/jsx-no-target-blank': ['error', { allowReferrer: true }],
      'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
      'react/jsx-sort-props': ['warn', { noSortAlphabetically: false }],
      'react/prop-types': 'off',
      'react/no-array-index-key': 'warn',
      'react/no-unstable-nested-components': 'error',
      'react/self-closing-comp': 'warn',
      'react/function-component-definition': 'warn',
      'import/first': 'error',
      'import/newline-after-import': 'warn',
      'import/no-mutable-exports': 'error',
      'import/no-self-import': 'error',
      'import/no-useless-path-segments': 'error',
      'import/order': [
        'warn',
        {
          alphabetize: { order: 'asc', caseInsensitive: true },
          groups: ['type', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: '{react-native,react,react-dom,react-dom/**}',
              group: 'builtin',
              position: 'before',
            },
            { pattern: '@/**', group: 'internal', position: 'after' },
          ],
          pathGroupsExcludedImportTypes: ['builtin', 'internal'],
          warnOnUnassignedImports: true,
        },
      ],
    },
  },
]);
