import { Dimensions, Platform } from 'react-native';

/**
 * ===========================
 * CONSTANT
 * ===========================
 */

// API URL
export const API_URL = process.env.API_URL || 'http://localhost:8081';

// Screen Height
export const SCREEN_HEIGHT = Dimensions.get('window').height;

// Screen Width
export const SCREEN_WIDTH = Dimensions.get('window').width;

// iOS
export const IS_IOS = Platform.OS === 'ios';

// Android
export const IS_ANDROID = Platform.OS === 'android';

// APP Storage Key
export enum STORAGE_KEY {
  LANGUAGE = 'lang',
  USERS = 'auth/users',
  SESSION = 'auth/session',
}

// Language Translate Value
export const LANGUAGE_TRANSLATE_VALUE: { [key: string]: string } = {
  'en-US': 'English',
  'en': 'English',
  'bm': 'Bahasa Melayu',
  'cn': '简体中文',
};

// Languages
export const LANGUAGES = [
  {
    label: 'English',
    value: 'en',
    metaData: {
      code: ['en-US', 'en'],
      label: 'English',
      value: 'en',
    },
  },
  {
    label: 'Bahasa Melayu',
    value: 'bm',
    metaData: {
      code: ['bm'],
      label: 'Bahasa Melayu',
      value: 'bm',
    },
  },
  {
    label: 'Simplified Chinese',
    value: 'cn',
    metaData: {
      code: ['cn'],
      label: 'Simplified Chinese',
      value: 'cn',
    },
  },
  // {
  //   label: 'Traditional Chinese',
  //   value: 'tc',
  //   metaData: {
  //     code: ['tc'],
  //     label: 'Traditional Chinese',
  //     value: 'tc',
  //   },
  // },
  // {
  //   label: 'Thai',
  //   value: 'th',
  //   metaData: {
  //     code: ['th'],
  //     label: 'Thai',
  //     value: 'th',
  //   },
  // },
  // {
  //   label: 'Vietnamese',
  //   value: 'vi',
  //   metaData: {
  //     label: 'Vietnamese',
  //     value: 'vi',
  //     code: ['vi'],
  //   },
  // },
];
