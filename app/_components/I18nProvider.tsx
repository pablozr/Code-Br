'use client';

import { ReactNode, useEffect } from 'react';
import i18next from '../_lib/i18n/client';
import { I18nextProvider } from 'react-i18next';

interface I18nProviderProps {
  children: ReactNode;
  locale: string;
}

export function I18nProvider({ children, locale }: I18nProviderProps) {
  // Debug
  console.log('I18nProvider rendering with locale:', locale, 'current i18next language:', i18next.language);

  useEffect(() => {
    // Mudar o idioma quando o locale mudar
    if (i18next.language !== locale) {
      console.log('Changing language to:', locale);
      i18next.changeLanguage(locale);
    }
  }, [locale]);

  return (
    <I18nextProvider i18n={i18next}>
      {children}
    </I18nextProvider>
  );
}
