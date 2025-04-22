import { ReactNode } from 'react';
import { Header } from '@/app/_components/layout/Header';
import { Footer } from '@/app/_components/layout/Footer';

export default function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <main style={{ marginTop: '60px' }}>{children}</main>
      <Footer />
    </>
  );
}
