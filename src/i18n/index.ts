import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Các ngôn ngữ hỗ trợ
export enum LocaleEnum {
  English = 'en',
  Vietnamese = 'vi'
}

export type LocaleType = `${LocaleEnum}`;

export const LocaleValues: Record<LocaleType, string> = {
  [LocaleEnum.English]: 'LANGUAGE.ENGLISH',
  [LocaleEnum.Vietnamese]: 'LANGUAGE.VIETNAMESE'
};

export const DEFAULT_LOCALE: LocaleType = LocaleEnum.English;

// Các bản dịch
const resources = {
  en: {
    translation: {
      'GLOBAL.CONNECT_WALLET': 'Connect Wallet',
      'LANGUAGE.ENGLISH': 'English',
      'LANGUAGE.VIETNAMESE': 'Vietnamese'
    }
  },
  vi: {
    translation: {
      'GLOBAL.CONNECT_WALLET': 'Kết nối ví',
      'LANGUAGE.ENGLISH': 'Tiếng Anh',
      'LANGUAGE.VIETNAMESE': 'Tiếng Việt'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: DEFAULT_LOCALE,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 