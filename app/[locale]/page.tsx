import { HomeUI } from './(marketing)/components/home-ui';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  return <HomeUI locale={resolvedParams?.locale || 'pt-BR'} />;
}
