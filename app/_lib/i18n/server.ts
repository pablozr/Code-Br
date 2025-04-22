import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { defaultLanguage, languages } from './settings';
import fs from 'fs';
import path from 'path';

// Função para carregar as traduções do servidor
const loadLocales = (language: string, namespace: string) => {
  try {
    const filePath = path.join(process.cwd(), 'public', 'locales', language, `${namespace}.json`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error loading locale file for ${language}/${namespace}:`, error);
    return {};
  }
};

export const initI18next = async (lang: string, ns: string | string[] = 'common') => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend((language: string, namespace: string) => {
        return Promise.resolve(loadLocales(language, namespace));
      })
    )
    .init({
      lng: lang,
      fallbackLng: defaultLanguage,
      supportedLngs: Object.keys(languages),
      defaultNS: 'common',
      fallbackNS: 'common',
      ns: Array.isArray(ns) ? ns : [ns],
      preload: Object.keys(languages),
      interpolation: {
        escapeValue: false,
      },
    });

  return i18nInstance;
};

// Função para traduzir no lado do servidor
export async function getTranslations(lang: string, ns: string | string[] = 'common') {
  const i18nextInstance = await initI18next(lang, ns);
  
  return {
    t: i18nextInstance.getFixedT(lang, Array.isArray(ns) ? ns[0] : ns),
    i18n: i18nextInstance,
  };
}
