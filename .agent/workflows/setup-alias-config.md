---
description: Expo + React Native + TypeScript Alias Configuration
---

# Antigravity Agent Workflow

## Expo + React Native + TypeScript Alias Configuration

This workflow reproduces the **exact alias and Babel architecture** from your reference project, including:

- `@babel/plugin-proposal-export-namespace-from`
- `babel-plugin-module-resolver` with **regex-based aliases**
- TypeScript `paths` that **mirror Babel**

All dependencies are installed using **yarn**.

---

## What this workflow gives you

You will be able to write:

```ts
import HomeScreen from '@app/screens/Home';
import logo from '@assets/images/logo.png';
export * as api from '@app/services/api';
```

With:

- Babel (Metro) resolving correctly at runtime
- TypeScript resolving correctly at compile-time

---

## Folder assumptions

Your project root contains:

```
app/
assets/
babel.config.js
tsconfig.json
```

---

## Step 1 — Install required Babel plugins

```bash
yarn add -D @babel/plugin-proposal-export-namespace-from babel-plugin-module-resolver
```

---

## Step 2 — Configure Babel aliases

Open `babel.config.js`.

Make sure your `plugins` array contains:

```js
const plugins = [
  '@babel/plugin-proposal-export-namespace-from',
  [
    'module-resolver',
    {
      root: ['.'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        // Must mirror tsconfig.json
        '^@app/(.+)': './app/\\1',
        '^@assets/(.+)': './assets/\\1',
      },
    },
  ],
  // other existing plugins here (dotenv etc remain untouched)
];
```

✅ **Do not remove** any existing plugins.
✅ If `module-resolver` already exists, **merge** aliases carefully instead of duplicating the plugin entry.

---

## Step 3 — Configure TypeScript paths

Open `tsconfig.json` and ensure:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@app/*": ["./app/*"],
      "@assets/*": ["./assets/*"]
    }
  }
}
```

If you already have paths (for example):

```json
"react-native-table-component": ["./app/components/DataTable/index.d.ts"]
```

Keep them — just add the new ones.

---

## Step 4 — Clear Metro cache

```bash
npx expo start -c
```

This is required because Metro caches Babel resolution.

---

## Why `@babel/plugin-proposal-export-namespace-from` matters

Your reference project uses:

```ts
export * as utils from './utils';
```

This syntax **is not supported by default** in Babel for React Native, so this plugin must exist or your bundle will fail.

Keeping this plugin ensures:

- Monorepo-friendly re-export patterns
- Barrel files work correctly
- Design system APIs stay clean

---

## Final sanity check

| Layer      | What must exist                                |
| ---------- | ---------------------------------------------- |
| Babel      | `@babel/plugin-proposal-export-namespace-from` |
| Babel      | `module-resolver` with `^@app` and `^@assets`  |
| TypeScript | matching `paths`                               |
| Runtime    | `npx expo start -c` after change               |

When all four pass, your alias system is production‑grade.

---
