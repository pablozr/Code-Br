import dynamic from 'next/dynamic';
import { Skeleton } from '@mantine/core';
import ClientOnly from '@/app/_components/clientOnly';
// Importar o HeroSection normalmente, pois é crítico para o LCP (Largest Contentful Paint)
import { HeroSection } from '@/app/_components/sections/home/HeroSection';
import PricingSectionClient from '@/app/_components/sections/PricingSectionClient';

// Lazy load para componentes abaixo da dobra
const ServicesSection = dynamic(() => import('@/app/_components/sections/ServicesSection'), {
  loading: () => <Skeleton height={400} radius="md" animate={true} />,
  ssr: true
});

const ModernWorkflowSection = dynamic(() => import('@/app/_components/sections/ModernWorkflowSection').then(mod => ({ default: mod.ModernWorkflowSection })), {
  loading: () => <Skeleton height={400} radius="md" animate={true} />,
  ssr: true
});

const PortfolioSection = dynamic(() => import('@/app/_components/sections/PortfolioSection'), {
  loading: () => <Skeleton height={400} radius="md" animate={true} />,
  ssr: true
}) as React.ComponentType<{ locale: string }>;

const CtaSection = dynamic(() => import('@/app/_components/sections/CtaSection').then(mod => ({ default: mod.CtaSection })), {
  loading: () => <Skeleton height={200} radius="md" animate={true} />,
  ssr: true
});

interface HomeUIProps {
  locale: string;
}

export function HomeUI({ locale }: HomeUIProps) {
  return (
    <main>
      {/* Renderizar o HeroSection imediatamente para melhorar o LCP */}
      <HeroSection />

      {/* Lazy load para os componentes abaixo da dobra */}
      <ServicesSection />
      <ModernWorkflowSection />
      <PortfolioSection locale={locale} />
      <PricingSectionClient />
      <CtaSection />
    </main>
  );
} 