'use client'
import dynamic from 'next/dynamic'
import { Skeleton } from '@mantine/core'

const PricingSection = dynamic(
  () => import('./PricingSection').then(mod => ({ default: mod.PricingSection })),
  { loading: () => <Skeleton height={400} radius="md" animate={true} />, ssr: false }
)

export default function PricingSectionClient() {
  return <PricingSection />
} 