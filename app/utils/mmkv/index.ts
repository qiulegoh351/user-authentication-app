import { STORAGE_KEY } from '@app/config/constant';
import { MMKV } from 'react-native-mmkv';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export class Storage extends MMKV {
  setLanguage(lang: string) {
    return this.set(STORAGE_KEY.LANGUAGE, lang ?? '');
  }

  getLanguage() {
    return this.getString(STORAGE_KEY.LANGUAGE);
  }
}

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export const mmkvStorage = new Storage();
