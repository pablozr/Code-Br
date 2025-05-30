import { Header } from '@/app/_components/layout/Header';
import { Footer } from '@/app/_components/layout/Footer';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div style={{ paddingTop: '70px' }}>
        {children}
      </div>
      <Footer />
    </>
  );
}
