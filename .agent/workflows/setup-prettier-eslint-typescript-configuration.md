---
description: Configure linting and formatting (ESLint 9 Flat Config)
---

# ESLint 9 + Prettier + TypeScript Setup

1. **Install Dependencies**:

- Install ESLint, Prettier, and configs.

```bash
yarn add -D \
  eslint @eslint/js typescript-eslint globals \
  eslint-plugin-react eslint-plugin-react-native eslint-plugin-react-hooks eslint-plugin-react-refresh \
  eslint-plugin-prettier eslint-config-prettier \
  eslint-plugin-import eslint-plugin-reactotron
```

2. **Create eslint.config.js (Flat Config)**:

- The new standard for ESLint 9.

```js
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactNative from 'eslint-plugin-react-native';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactotron from 'eslint-plugin-reactotron';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  // =========================
  // Global ignores
  // =========================
  {
    ignores: [
      'node_modules',
      'ios',
      'android',
      '.expo',
      '.vscode',
      'ignite/ignite.json',
      'package.json',
      '.eslintignore',
      'dist',
      '.next',
    ],
  },

  // =========================
  // Node-only config files
  // Fix: 'process' / 'module' is not defined (no-undef)
  // =========================
  {
    files: ['*.config.{js,cjs,mjs}', '.*.{js,cjs,mjs}'],
    languageOptions: {
      ecmaVersion: 2020,
      // Most of these config files use CommonJS (module.exports)
      sourceType: 'script',
      globals: globals.node,
    },
  },

  // =========================
  // App source files (RN / browser-like runtime)
  // =========================
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, eslintConfigPrettier],
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react,
      'react-native': reactNative,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'import': importPlugin,
      prettier,
      reactotron,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,

      // prettier
      'prettier/prettier': 'error',

      // typescript-eslint
      '@typescript-eslint/array-type': 0,
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-var-requires': 0,
      '@typescript-eslint/no-require-imports': 0,
      '@typescript-eslint/no-empty-object-type': 0,

      // eslint
      // "no-use-before-define": 0,
      'no-empty': 0,
      'no-restricted-imports': [
        'error',
        {
          paths: [
            // Prefer named exports from 'react' instead of importing `React`
            {
              name: 'react',
              importNames: ['default'],
              message: "Import named exports from 'react' instead.",
            },
            {
              name: 'react-native',
              importNames: ['SafeAreaView'],
              message: "Use the SafeAreaView from 'react-native-safe-area-context' instead.",
            },
            {
              name: 'react-native',
              importNames: ['Text', 'Button', 'TextInput'],
              message: "Use the custom wrapper component from '@/components'.",
            },
          ],
        },
      ],

      // react
      'react/prop-types': 0,

      // react-native
      'react-native/no-raw-text': 0,
      'react-native/no-inline-styles': 0,
      'react-native/no-color-literals': 0,

      // react-hooks
      'react-hooks/refs': 0,

      // reactotron
      'reactotron/no-tron-in-production': 'error',

      // eslint-config-standard overrides
      'comma-dangle': 0,
      'no-global-assign': 0,
      'quotes': 0,
      'space-before-function-paren': 0,

      // eslint-import
      'import/order': [
        'error',
        {
          'alphabetize': {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
          'groups': [
            ['builtin', 'external'],
            'internal',
            'unknown',
            ['parent', 'sibling'],
            'index',
          ],
          'distinctGroup': false,
          'pathGroups': [
            { pattern: 'react', group: 'external', position: 'before' },
            { pattern: 'react-native', group: 'external', position: 'before' },
            { pattern: 'expo{,-*}', group: 'external', position: 'before' },
            { pattern: '@/**', group: 'unknown', position: 'after' },
          ],
          'pathGroupsExcludedImportTypes': ['react', 'react-native', 'expo', 'expo-*'],
        },
      ],
      'import/newline-after-import': 1,

      // duplicates / misc
      'no-unused-vars': 0,
      '@typescript-eslint/no-unused-expressions': 0,

      // react-refresh
      'react-refresh/only-export-components': ['off', { allowConstantExport: true }],
    },
  },
);
```

3. **Pro Tips**:

- Install VS Code extensions: ESLint, Prettier.
- Enable "Format on Save" in VS Code settings.
- ESLint 9 is a major change; old .eslintrc files are deprecated.
- DO NOT INCLUDE .vscode/settings.json
- DO NOT EXECUTE "eslint .", "eslint . --fix"
- DO NOT FIX AND CHECK the ESLINT
- DO NOT EDIT "2. **Create eslint.config.js (Flat Config)**"
