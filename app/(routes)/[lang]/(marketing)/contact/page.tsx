import { getTranslations } from '@/app/_lib/i18n/server';

export default async function ContactPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const { t } = await getTranslations(lang);
  
  // Importar o componente da página de contato original
  const ContactPage = (await import('@/app/(routes)/(marketing)/contact/page')).default;
  
  return <ContactPage />;
}
