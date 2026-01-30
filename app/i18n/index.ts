import { I18nManager } from 'react-native';
import * as Localization from 'expo-localization';
import { mmkvStorage } from '@app/utils';
import i18n from 'i18next';
import { initReactI18next, useTranslation as useTranslationBase } from 'react-i18next';
import 'intl-pluralrules';

import bm from './bm';
import cn from './cn';
import en from './en';
import { GeneratedTxKeyPath } from './tx-key-path';

const fallbackLocale = 'en-US';

const systemLocales = Localization.getLocales();

const resources = { en, bm, cn };
const supportedTags = Object.keys(resources);

// Checks to see if the device locale matches any of the supported locales
// Device locale may be more specific and still match (e.g., en-US matches en)
const systemTagMatchesSupportedTags = (deviceTag: string) => {
  const primaryTag = deviceTag.split('-')[0];
  return supportedTags.includes(primaryTag);
};

const pickSupportedLocale: () => Localization.Locale | undefined = () => {
  return systemLocales.find((locale) => systemTagMatchesSupportedTags(locale.languageTag));
};

const locale = pickSupportedLocale();

export let isRTL = false;

// Need to set RTL ASAP to ensure the app is rendered correctly. Waiting for i18n to init is too late.
if (locale?.languageTag && locale?.textDirection === 'rtl') {
  I18nManager.allowRTL(true);
  isRTL = true;
} else {
  I18nManager.allowRTL(false);
}

export const initI18n = async () => {
  i18n.use(initReactI18next);
  const language = mmkvStorage.getLanguage();
  await i18n.init({
    resources,
    lng: language || (locale?.languageTag ?? fallbackLocale),
    fallbackLng: fallbackLocale,
    interpolation: {
      escapeValue: false,
    },
  });

  return i18n;
};

/**
 * Builds up valid keypaths for translations.
 */

export type TxKeyPath = GeneratedTxKeyPath;

// via: https://stackoverflow.com/a/65333050
// type RecursiveKeyOf<TObj extends object> = {
//   [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
//     TObj[TKey],
//     `${TKey}`,
//     true
//   >;
// }[keyof TObj & (string | number)];

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<TObj[TKey], `${TKey}`, false>;
}[keyof TObj & (string | number)];

type RecursiveKeyOfHandleValue<
  TValue,
  Text extends string,
  IsFirstLevel extends boolean,
> = TValue extends any[]
  ? Text
  : TValue extends object
    ? IsFirstLevel extends true
      ? Text | `${Text}:${RecursiveKeyOfInner<TValue>}`
      : Text | `${Text}.${RecursiveKeyOfInner<TValue>}`
    : Text;

export const useTranslation = () => {
  const { t, i18n } = useTranslationBase();
  return {
    t: (key: TxKeyPath, options?: any) => `${t(key, options)}`,
    i18n,
  };
};

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: GeneratedTxKeyPath;
  }
}
