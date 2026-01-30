---
description: Setup `react-native-dotenv` (Ignite + Expo + TypeScript)
---

# Antigravity Workflow: Setup `react-native-dotenv` (Ignite + Expo + TypeScript)

> Goal: Add `module:react-native-dotenv` support, create `.env` variants, add TypeScript typings, and provide yarn scripts for running dev/staging/prod locally.

## Assumptions

- Project uses **Ignite + Expo** with a `babel.config.js` at repo root.
- App source lives in `app/` (adjust paths if you use `src/`).
- Package manager: **Yarn**.

---

## 0) Pre-flight checks

1. Ensure you are at the project root (where `package.json` lives).
2. Confirm Expo boots normally:
   ```bash
   yarn
   yarn expo start
   ```

---

## 1) Install dependencies (Yarn)

Install `react-native-dotenv` (the Babel plugin) and ensure `babel-plugin-module-resolver` exists if you are using aliases.

```bash
yarn add -D react-native-dotenv
yarn add -D babel-plugin-module-resolver
```

> Note: If you already have `module-resolver` working, you may skip installing it.

---

## 2) Create environment files

Create these files at the repo root:

### 2.1 `.env`

```env
ENV=dev
API_URL=http://localhost:3000
```

### 2.2 `.env.staging`

```env
ENV=staging
API_URL=https://staging.example.com
```

### 2.3 `.env.production`

```env
ENV=prod
API_URL=https://api.example.com
```

✅ Keep only **non-secret** values here (base URLs, feature flags, public keys).  
❌ Do NOT put private secrets (tokens, private keys) in `.env` files in React Native — they get bundled into the app.

---

## 3) Configure Babel (`babel.config.js`)

### 3.1 Add/ensure the plugin

Ensure your `plugins` include:

```js
'module:react-native-dotenv';
```

### 3.2 Recommended minimal env plugin configuration (optional but suggested)

If you want stricter control and clearer behavior, configure it like:

```js
[
  'module:react-native-dotenv',
  {
    moduleName: '@env',
    path: '.env',
    allowUndefined: false,
  },
];
```

### 3.3 If your project already uses `plugins = [...]`

Append the env plugin near the end (order usually not critical, but keep it after syntax plugins).

---

## 4) Add TypeScript typings (`env.d.ts`)

Create a typings file so TS understands `@env`.

✅ Recommended location: `types/env.d.ts` (since your `tsconfig.json` includes `./types` in `typeRoots`).

Create: `types/env.d.ts`

```ts
declare module '@env' {
  export const ENV: 'dev' | 'staging' | 'prod';
  export const API_URL: string;
}
```

> Add additional exports when you add more env vars.

---

## 5) Add local scripts to switch env files

### 5.1 Install `cross-env` (works on macOS/Windows/Linux)

```bash
yarn add -D cross-env
```

### 5.2 Add scripts in `package.json`

```json
{
  "scripts": {
    "start": "expo start --dev-client",
    "start:staging": "cross-env ENVFILE=.env.staging expo start --dev-client",
    "start:prod": "cross-env ENVFILE=.env.production expo start --dev-client",
    "android": "expo run:android",
    "ios": "expo run:ios"
  }
}
```

> `ENVFILE=...` is the common convention many dotenv-based toolchains respect.  
> If your current setup doesn't pick up `ENVFILE`, keep reading: use the fallback in step 5.3.

### 5.3 Fallback if `ENVFILE` is not respected in your setup

Some setups need the Babel plugin to explicitly read from `process.env.ENVFILE`.

Update the env plugin config in `babel.config.js`:

```js
[
  'module:react-native-dotenv',
  {
    moduleName: '@env',
    path: process.env.ENVFILE || '.env',
    allowUndefined: false,
  },
];
```

Now these scripts will definitely work:

```bash
yarn start
yarn start:staging
yarn start:prod
```

---

## 6) Use env vars in code

Example:

```ts
import { ENV, API_URL } from '@env';

console.log('ENV:', ENV);
console.log('API_URL:', API_URL);

export const apiBaseUrl = API_URL;
```

Type safety behavior:

- ✅ `ENV` auto-completes to `dev | staging | prod`
- ❌ `ENV === "production"` will be a TypeScript error

---

## 7) Clear Expo cache and verify

Always clear cache after env / babel changes:

```bash
yarn expo start -c
```

Test quickly:

- Run `yarn start` → should show `ENV=dev`
- Run `yarn start:staging` → should show `ENV=staging`
- Run `yarn start:prod` → should show `ENV=prod`

---

## 8) Troubleshooting

### 8.1 `Cannot find module '@env'`

- Ensure `module:react-native-dotenv` is present in `babel.config.js`
- Ensure `types/env.d.ts` exists and `typeRoots` includes `./types`
- Restart TS server (VSCode: “TypeScript: Restart TS Server”)
- Restart Expo with cache clear: `yarn expo start -c`

### 8.2 Values don’t change when switching `.env.*`

- Ensure you used `-c` (cache clear)
- Ensure step **5.3** is applied (using `process.env.ENVFILE || ".env"`)
- Ensure `.env.*` files are at repo root

---

## 9) Optional: Keep your codebase consistent

✅ Prefer:

```ts
import { API_URL } from '@env';
```

⚠️ Avoid mixing:

```ts
process.env.API_URL;
```

Pick one approach and stay consistent.

---

## Done ✅

You now have:

- `.env`, `.env.staging`, `.env.production`
- Babel configured for `@env`
- TypeScript typings for env vars
- Yarn scripts to run different environments locally
