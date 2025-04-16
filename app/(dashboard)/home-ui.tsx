'use client';

import { HeroSection } from '@/components/HeroSection';
import { TrustSignals } from '@/components/TrustSignals';
import { ServicesSection } from '@/components/ServicesSection';
import { HostingSection } from '@/components/HostingSection';
import { CtaSection } from '@/components/CtaSection';

export function HomeUI() {
  return (
    <main>
      <HeroSection />
      <TrustSignals />
      <ServicesSection />
      <HostingSection />
      <CtaSection />
    </main>
  );
}
