import { HomeUI } from '@/app/(routes)/(marketing)/home-ui';
import { getTranslations } from '@/app/_lib/i18n/server';

export default async function HomePage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const { t } = await getTranslations(lang);
  
  return <HomeUI />;
}
