'use client';

import { HeroSection } from '@/components/HeroSection';
import { TrustSignals } from '@/components/TrustSignals';
import { ServicesSection } from '@/components/ServicesSection';
import { ModernWorkflowSection } from '@/components/ModernWorkflowSection';
import { PricingSection } from '@/components/PricingSection';
import { CtaSection } from '@/components/CtaSection';

export function HomeUI() {
  return (
    <main>
      <HeroSection />
      <TrustSignals />
      <ServicesSection />
      <PricingSection />
      <ModernWorkflowSection />
      <CtaSection />
    </main>
  );
}
