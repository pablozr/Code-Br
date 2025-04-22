'use client';

import { HeroSection } from '@/app/_components/sections/home/HeroSection';
import { ServicesSection } from '@/app/_components/sections/ServicesSection';
import { ModernWorkflowSection } from '@/app/_components/sections/ModernWorkflowSection';
import { PricingSection } from '@/app/_components/sections/PricingSection';
import { CtaSection } from '@/app/_components/sections/CtaSection';

export function HomeUI() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <ModernWorkflowSection />
      <PricingSection />
      <CtaSection />
    </main>
  );
}
