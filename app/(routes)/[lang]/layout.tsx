import { ReactNode } from 'react';
import { getTranslations } from '@/app/_lib/i18n/server';
import { languages } from '@/app/_lib/i18n/settings';

// Gerar rotas estáticas para cada idioma
export async function generateStaticParams() {
  return Object.keys(languages).map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params: { lang },
}: {
  children: ReactNode;
  params: { lang: string };
}) {
  // Inicializar as traduções no servidor
  await getTranslations(lang);
  
  return <>{children}</>;
}
