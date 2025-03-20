import React, { createContext, useContext, useState } from 'react';
import { LocaleType, DEFAULT_LOCALE } from '../i18n';
import i18n from '../i18n';

interface LocaleContextType {
  locale: LocaleType;
  saveLocale: (locale: LocaleType) => void;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: DEFAULT_LOCALE,
  saveLocale: () => {}
});

export const useLocaleContext = () => useContext(LocaleContext);

export const LocaleProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [locale, setLocale] = useState<LocaleType>(DEFAULT_LOCALE);

  const saveLocale = (newLocale: LocaleType) => {
    setLocale(newLocale);
    i18n.changeLanguage(newLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, saveLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}; 