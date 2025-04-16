import { getStripePrices, getStripeProducts } from '@/lib/payments/stripe';
import { PricingUI } from './pricing-ui';

// Prices are fresh for one hour max
export const revalidate = 3600;

export default async function PricingPage() {
  const [prices, products] = await Promise.all([
    getStripePrices(),
    getStripeProducts(),
  ]);

  const pricingData = [
    {
      name: "Landing Page",
      price: 99900,
      interval: "único",
      features: [
        'Design responsivo',
        'Otimização para SEO',
        'Formulário de contato',
        'Integração com redes sociais',
        'Hospedagem na Suíça',
        'Suporte por email',
      ],
      priceId: "landing-page",
      isCustom: false
    },
    {
      name: "E-commerce Básico",
      price: 199900,
      interval: "único",
      features: [
        'Até 50 produtos',
        'Carrinho de compras',
        'Pagamentos online',
        'Painel administrativo',
        'Hospedagem na Suíça',
        'Suporte por email e telefone',
      ],
      priceId: "ecommerce-basic",
      isCustom: false
    },
    {
      name: "E-commerce Avançado",
      price: 299900,
      interval: "único",
      features: [
        'Produtos ilimitados',
        'Gestão de estoque',
        'Múltiplas opções de pagamento',
        'Integração com marketplaces',
        'Hospedagem na Suíça',
        'Suporte prioritário',
      ],
      priceId: "ecommerce-advanced",
      isCustom: false
    },
    {
      name: "Projeto Personalizado",
      price: 0,
      interval: "consultar",
      features: [
        'Desenvolvimento sob medida',
        'Consultoria especializada',
        'Funcionalidades personalizadas',
        'Design exclusivo',
        'Hospedagem na Suíça',
        'Suporte VIP',
      ],
      priceId: "custom-project",
      isCustom: true
    }
  ];

  return <PricingUI pricingData={pricingData} />;
}
