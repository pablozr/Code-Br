import { getTranslations } from '@/app/_lib/i18n/server';

export default async function OrcamentoPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const { t } = await getTranslations(lang);
  
  // Importar o componente da página de orçamento original
  const OrcamentoPage = (await import('@/app/(routes)/(marketing)/orcamento/page')).default;
  
  return <OrcamentoPage />;
}
