// eslint-disable-next-line no-restricted-imports
import dayjs, { PluginFunc } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/en';
import 'dayjs/locale/ms-my';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/vi';
import 'dayjs/locale/th';
import i18next from 'i18next';

/**
 * ===========================
 * Plugin: custom locale date format
 * ===========================
 */
type LocaleFormats = Record<string, Record<string, string>>;

const customFormatsByLocale: LocaleFormats = {
  'en': {
    DATE_WEEK: 'DD MMM YYYY, dddd',
  },
  'ms-my': {
    DATE_WEEK: 'DD MMM YYYY, dddd',
  },
};

const customFormatPlugin: PluginFunc = (_, dayjsClass, _dayjsFactory) => {
  const oldFormat = dayjsClass.prototype.format;

  dayjsClass.prototype.format = function (formatStr?: string) {
    if (formatStr) {
      const locale = this.locale(); // get current instance locale
      const localeFormats = customFormatsByLocale[locale] || {};
      if (localeFormats[formatStr]) {
        formatStr = localeFormats[formatStr];
      }
    }
    return oldFormat.call(this, formatStr);
  };
};

/**
 * ===========================
 * MAIN
 * ===========================
 */
dayjs.extend(localizedFormat);
dayjs.extend(localeData);
dayjs.extend(updateLocale);
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.extend(customFormatPlugin);

dayjs.updateLocale('en', {
  formats: {
    ll: 'DD-MM-YYYY',
    lll: 'DD-MM-YYYY [at] hh:mmA',
  },
});

dayjs.locale('en');

export const setDayjsLocale = (lang: string) => {
  switch (lang) {
    case 'bm':
      return dayjs.locale('ms-my');

    case 'zh':
      return dayjs.locale('zh-cn');

    case 'vi':
      return dayjs.locale('vi');

    case 'th':
      return dayjs.locale('th');

    case 'en':
    default:
      return dayjs.locale('en');
  }
};

i18next.on('languageChanged', (lng) => {
  // Change Day.js locale to match i18next
  setDayjsLocale(lng);
});

/**
 * ===========================
 * FUNCTIONS
 * ===========================
 */
export const formatTime = (time: any) => {
  return dayjs(time).format('hh:mmA');
};

export { dayjs };
export default dayjs;
