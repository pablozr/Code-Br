import { getRequestConfig } from 'next-intl/server';

export const locales = ['pt-BR', 'en', 'fr'];
export const defaultLocale = 'pt-BR';

export default getRequestConfig(async ({ locale }) => {
  const validLocale = locale || defaultLocale;

  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}.json`)).default
  };
});
