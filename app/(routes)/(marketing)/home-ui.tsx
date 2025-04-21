'use client';

import { HeroSection } from '@/app/_components/sections/home/HeroSection';
import { TrustSignals } from '@/app/_components/sections/home/TrustSignals';
import { ServicesSection } from '@/app/_components/sections/home/ServicesSection';
import { ModernWorkflowSection } from '@/app/_components/sections/home/ModernWorkflowSection';
import { PricingSection } from '@/app/_components/sections/home/PricingSection';
import { CtaSection } from '@/app/_components/sections/home/CtaSection';

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
