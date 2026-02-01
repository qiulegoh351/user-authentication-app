# Ignite React Native App (Authentication App)

This project is built using the Ignite Expo Boilerplate from Infinite Red with a modern mobile stack including Expo Dev Client, Tamagui, Context API, MMKV, Async Storage, Gorhom Bottom Sheet, and Google Sheets–driven i18n.

---

## Runtime Environment

- Node.js: 22.13.1
- Yarn: 1.22.22
- Expo SDK: 54
- React Native: 0.81.5
- iOS Deployment Target: 14.0 (Expo SDK 54 default)
- Android Target SDK: 34 (Expo SDK 54 default)

---

## Getting Started

Install dependencies:

```bash
yarn install
```

````

Start the app:

```bash
yarn start
```

Start with environment:

```bash
yarn start:staging
yarn start:prod
```

Run on device:

```bash
yarn ios
yarn android
```

---

## Translation (i18n)

This app uses Google Spreadsheet as the single source of truth for translations.

Spreadsheet:
[https://docs.google.com/spreadsheets/d/13gF0XdYzus_12JI7SM1BYsvsmL-TfygyJFkMEJDcgVI/edit?gid=0#gid=0]

To sync translations into the app:

```bash
yarn generate:i18n
```

This command will:

1. Get translation data from Google Sheets
2. Generate locale JSON files
3. Generate type-safe translation key paths

Script:

```json
"generate:i18n": "node scripts/i18n-script.mjs && ts-node scripts/generateTxKeyPath.ts"
```

Do not edit translation JSON manually.
All translation changes must be done through the Google Spreadsheet.

---

## Running the App

```bash
yarn start
yarn start:staging
yarn start:prod
```

These commands use environment files:

- `.env`
- `.env.staging`
- `.env.production`

---

## Build and Run (Expo Dev Client)

```bash
yarn ios
yarn android
```

Build dev clients:

```bash
yarn build:ios:sim
yarn build:ios:dev
yarn build:ios:prod
```

---

## Assets

```
assets/
├── icons
└── images
```

Usage:

```ts
import { Image } from 'react-native'

<Image source={require('assets/images/my_image.png')} />
```

---

## App Architecture

The app follows a feature-oriented and scalable structure.

```
app/
├── @types        # Global TypeScript types
├── components    # Reusable UI components
├── config        # App configuration and constants
├── context       # React Context providers
├── devtools      # Debug and development tools
├── i18n          # i18next setup and locale files
├── navigators    # React Navigation stacks and tabs
├── screens       # App screens
├── services      # APIs and external integrations
├── stores        # Zustand stores
├── theme         # Design system and tokens
├── utils         # Shared helpers and hooks
└── app.tsx       # App entry point
```

This structure separates UI, state, logic, configuration, and infrastructure cleanly and allows the app to scale without becoming hard to maintain.

---

## Global Import Aliases

This project uses path aliases for cleaner imports.

Configured in `babel.config.js`:

```js
alias: {
  '^@app/(.+)': './app/\\1',
  '^@assets/(.+)': './assets/\\1',
}
```

Usage examples:

```ts
import Button from '@app/components/Button';
import { useAppStore } from '@app/stores';
import HomeIcon from '@assets/icons/home.png';
```

This avoids long relative imports and keeps codebase easy to refactor.

---

## Environment Variables

The app supports multiple environments using `.env` files.

```
.env
.env.staging
.env.production
```

They are loaded via:

```js
path: process.env.ENVFILE || '.env';
```

And accessed in code:

```ts
import { API_URL } from '@env';
```

---

## Tech Stack

- Ignite (Expo)
- TypeScript
- Tamagui
- Context API
- MMKV (local storage)
- Async Storage (local storage)
- Gorhom Bottom Sheet
- React Navigation
- i18next
- Google Sheets (translation source)

---

```

```
````
