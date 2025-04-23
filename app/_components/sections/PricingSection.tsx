import { useState, useEffect } from 'react';
import { Box, Container, Group, Text, ThemeIcon, SimpleGrid, Title, Flex, Badge, Button, Switch, Card, List } from '@mantine/core';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ParticlesWrapper } from '@/app/_components/effects/ParticlesWrapper';
import {
  IconCheck,
  IconX,
  IconCode,
  IconRocket,
  IconShieldCheck,
  IconClockHour4,
  IconCertificate,
  IconArrowRight,
  IconCrown,
  IconStar,
  IconStarFilled,
  IconDeviceDesktop,
  IconBrandSpotify,
  IconBrandReact,
  IconBrandNextjs,
  IconBrandTypescript,
  IconServer,
  IconHeadset,
  IconBolt,
  IconTrophy,
  IconSettings,
} from '@tabler/icons-react';

// Componentes com motion
const MotionBox = motion.div;
const MotionFlex = motion.div;
const MotionBadge = motion.div;
const MotionButton = motion.button;
const MotionCard = motion.div;

// Componentes com partículas foram movidos para ClientParticles.tsx

// Tipos para os serviços
interface ServiceFeature {
  title: string;
  included: boolean;
  highlight?: boolean;
}

interface Service {
  title: string;
  description: string;
  badge?: string;
  features: ServiceFeature[];
  cta: string;
  popular?: boolean;
  icon: React.ReactNode;
  color: string;
}

// Traduções para a seção de preços
const pricingTexts = {
  'pt-BR': {
    sectionTitle: 'Nossas soluções',
    mainTitle: 'Soluções personalizadas para seu projeto',
    mainDescription: 'Desenvolvemos websites e aplicações web de alta qualidade, utilizando as tecnologias mais modernas do mercado.',
    // Landing Page
    landingPageTitle: 'Landing Page',
    landingPageDescription: 'Página única de alta conversão para apresentar seu produto ou serviço',
    landingPageFeatures: [
      'Design responsivo e moderno',
      'Otimização para SEO',
      'Formulário de contato',
      'Integração com Analytics',
      'Entrega em até 7 dias'
    ],
    // Site Institucional
    corporateSiteTitle: 'Site Institucional',
    corporateSiteDescription: 'Site completo para empresas que desejam uma presença online profissional',
    corporateSiteBadge: 'Mais Popular',
    corporateSiteFeatures: [
      'Até 5 páginas personalizadas',
      'Design exclusivo para sua marca',
      'Otimização para SEO',
      'Blog integrado (opcional)',
      'Painel administrativo'
    ],
    // E-commerce
    ecommerceTitle: 'E-commerce',
    ecommerceDescription: 'Loja online completa para vender seus produtos ou serviços',
    ecommerceFeatures: [
      'Catálogo de produtos ilimitado',
      'Integração com meios de pagamento',
      'Gestão de estoque e pedidos',
      'Design personalizado',
      'Painel administrativo completo'
    ],
    // Textos comuns
    requestQuote: 'Solicitar Orçamento',
    startingFrom: 'A partir de',
    customPrice: 'Preço personalizado de acordo com as necessidades específicas do seu projeto.',
    includes: 'Inclui:',
    // Disclaimer e garantia
    important: 'Importante',
    disclaimerText: 'Os valores não incluem custos de domínio, hospedagem, banco de dados e assinaturas de serviços de terceiros (como Shopify). Estes custos serão de responsabilidade do cliente. Nosso serviço é focado em criar o site com a melhor qualidade e infraestrutura possível.',
    qualityGuarantee: 'Garantia de Qualidade',
    guaranteeText: 'Oferecemos 30 dias de garantia após a entrega do projeto para ajustes e correções, garantindo sua total satisfação com o resultado final.',
    // CTA final
    projectInMind: 'Tem um projeto em mente?',
    contactUs: 'Entre em contato',
    freeConsultation: 'para uma consulta gratuita.',
    // Manutenção
    monthlyMaintenance: 'Manutenção Mensal',
    maintenanceText: 'Oferecemos planos de manutenção mensal que incluem atualizações de segurança, backup, monitoramento de performance, correções de bugs e pequenas alterações de conteúdo. O valor da manutenção é calculado de acordo com a complexidade do projeto e será apresentado junto com o orçamento final.'
  },
  'en': {
    sectionTitle: 'Our solutions',
    mainTitle: 'Custom solutions for your project',
    mainDescription: 'We develop high-quality websites and web applications using the most modern technologies on the market.',
    // Landing Page
    landingPageTitle: 'Landing Page',
    landingPageDescription: 'High-conversion single page to showcase your product or service',
    landingPageFeatures: [
      'Responsive and modern design',
      'SEO optimization',
      'Contact form',
      'Analytics integration',
      'Delivery in up to 7 days'
    ],
    // Site Institucional
    corporateSiteTitle: 'Corporate Website',
    corporateSiteDescription: 'Complete website for companies that want a professional online presence',
    corporateSiteBadge: 'Most Popular',
    corporateSiteFeatures: [
      'Up to 5 custom pages',
      'Exclusive design for your brand',
      'SEO optimization',
      'Integrated blog (optional)',
      'Admin panel'
    ],
    // E-commerce
    ecommerceTitle: 'E-commerce',
    ecommerceDescription: 'Complete online store to sell your products or services',
    ecommerceFeatures: [
      'Unlimited product catalog',
      'Payment gateway integration',
      'Inventory and order management',
      'Custom design',
      'Complete admin panel'
    ],
    // Textos comuns
    requestQuote: 'Request Quote',
    startingFrom: 'Starting from',
    customPrice: 'Custom price according to the specific needs of your project.',
    includes: 'Includes:',
    // Disclaimer e garantia
    important: 'Important',
    disclaimerText: 'Prices do not include costs for domain, hosting, database, and third-party service subscriptions (such as Shopify). These costs will be the responsibility of the client. Our service is focused on creating the website with the best possible quality and infrastructure.',
    qualityGuarantee: 'Quality Guarantee',
    guaranteeText: 'We offer a 30-day guarantee after project delivery for adjustments and corrections, ensuring your complete satisfaction with the final result.',
    // CTA final
    projectInMind: 'Have a project in mind?',
    contactUs: 'Contact us',
    freeConsultation: 'for a free consultation.',
    // Manutenção
    monthlyMaintenance: 'Monthly Maintenance',
    maintenanceText: 'We offer monthly maintenance plans that include security updates, backup, performance monitoring, bug fixes, and minor content changes. The maintenance cost is calculated according to the complexity of the project and will be presented along with the final quote.'
  },
  'fr': {
    sectionTitle: 'Nos solutions',
    mainTitle: 'Solutions personnalisées pour votre projet',
    mainDescription: 'Nous développons des sites web et des applications web de haute qualité, en utilisant les technologies les plus modernes du marché.',
    // Landing Page
    landingPageTitle: 'Landing Page',
    landingPageDescription: 'Page unique à haute conversion pour présenter votre produit ou service',
    landingPageFeatures: [
      'Design responsive et moderne',
      'Optimisation SEO',
      'Formulaire de contact',
      'Intégration Analytics',
      'Livraison sous 7 jours'
    ],
    // Site Institucional
    corporateSiteTitle: 'Site Institutionnel',
    corporateSiteDescription: 'Site complet pour les entreprises qui souhaitent une présence en ligne professionnelle',
    corporateSiteBadge: 'Plus Populaire',
    corporateSiteFeatures: [
      'Jusqu\'à 5 pages personnalisées',
      'Design exclusif pour votre marque',
      'Optimisation SEO',
      'Blog intégré (optionnel)',
      'Panneau d\'administration'
    ],
    // E-commerce
    ecommerceTitle: 'E-commerce',
    ecommerceDescription: 'Boutique en ligne complète pour vendre vos produits ou services',
    ecommerceFeatures: [
      'Catalogue de produits illimité',
      'Intégration des moyens de paiement',
      'Gestion des stocks et des commandes',
      'Design personnalisé',
      'Panneau d\'administration complet'
    ],
    // Textos comuns
    requestQuote: 'Demander un Devis',
    startingFrom: 'À partir de',
    customPrice: 'Prix personnalisé selon les besoins spécifiques de votre projet.',
    includes: 'Inclut:',
    // Disclaimer e garantia
    important: 'Important',
    disclaimerText: 'Les prix n\'incluent pas les coûts de domaine, d\'hébergement, de base de données et d\'abonnements à des services tiers (comme Shopify). Ces coûts seront à la charge du client. Notre service est axé sur la création du site avec la meilleure qualité et infrastructure possible.',
    qualityGuarantee: 'Garantie de Qualité',
    guaranteeText: 'Nous offrons une garantie de 30 jours après la livraison du projet pour les ajustements et corrections, assurant votre entière satisfaction avec le résultat final.',
    // CTA final
    projectInMind: 'Vous avez un projet en tête?',
    contactUs: 'Contactez-nous',
    freeConsultation: 'pour une consultation gratuite.',
    // Manutenção
    monthlyMaintenance: 'Maintenance Mensuelle',
    maintenanceText: 'Nous proposons des plans de maintenance mensuelle qui comprennent des mises à jour de sécurité, des sauvegardes, une surveillance des performances, des corrections de bugs et des modifications mineures du contenu. Le coût de la maintenance est calculé en fonction de la complexité du projet et sera présenté avec le devis final.'
  }
};

// Estilos CSS para os efeitos de hover
const hoverStyles = `
  .card-hover:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.2);
    border: 1px solid rgba(153,105,229,0.2);
  }

  .button-hover:hover {
    transform: scale(1.02);
    box-shadow: 0 5px 20px rgba(118,65,192,0.4);
  }

  .button-hover:active {
    transform: scale(0.98);
  }
`;

export function PricingSection() {
  // Obter o idioma atual
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'pt-BR';

  // Obter os textos traduzidos
  const t = pricingTexts[locale as keyof typeof pricingTexts] || pricingTexts['pt-BR'];

  // Dados dos serviços com traduções
  const services = [
    {
      title: t.landingPageTitle,
      description: t.landingPageDescription,
      features: t.landingPageFeatures.map(feature => ({ title: feature, included: true, highlight: true })),
      cta: t.requestQuote,
      icon: <IconDeviceDesktop size={24} />,
      color: 'rgba(118, 65, 192, 0.7)'
    },
    {
      title: t.corporateSiteTitle,
      description: t.corporateSiteDescription,
      badge: t.corporateSiteBadge,
      popular: true,
      features: t.corporateSiteFeatures.map(feature => ({ title: feature, included: true, highlight: true })),
      cta: t.requestQuote,
      icon: <IconRocket size={24} />,
      color: 'rgba(153, 105, 229, 0.8)'
    },
    {
      title: t.ecommerceTitle,
      description: t.ecommerceDescription,
      features: t.ecommerceFeatures.map(feature => ({ title: feature, included: true, highlight: true })),
      cta: t.requestQuote,
      icon: <IconCrown size={24} />,
      color: 'rgba(118, 65, 192, 0.9)'
    }
  ];

  return (
    <Box
      py={80}
      style={{
        background: 'linear-gradient(to bottom, rgba(15,15,15,0.9) 0%, rgba(10,10,10,0.9) 100%)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Adiciona os estilos CSS para hover */}
      <style dangerouslySetInnerHTML={{ __html: hoverStyles }} />
      {/* Background effect */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(118,65,192,0.05) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(118,65,192,0.05) 0%, transparent 50%)',
          zIndex: 0,
        }}
      />

      <Container size="xl" style={{ position: 'relative', zIndex: 1 }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            marginBottom: '60px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, rgba(118,65,192,0.1), rgba(153,105,229,0.2))',
              border: '1px solid rgba(153,105,229,0.3)',
              backdropFilter: 'blur(10px)',
              padding: '0.5rem 0.9rem',
              borderRadius: '0.25rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'white',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            {t.sectionTitle}
          </div>

          <Title
            order={2}
            fw={700}
            size="2.5rem"
            c="white"
            mb="sm"
            style={{
              lineHeight: 1.2,
              letterSpacing: '-0.5px',
            }}
          >
            {t.mainTitle.split(' personalizadas ').length > 1 ? (
              <>
                {t.mainTitle.split(' personalizadas ')[0]}{' '}
                <Text span c="purple.4" inherit>personalizadas</Text>
                {' '}{t.mainTitle.split(' personalizadas ')[1]}
              </>
            ) : t.mainTitle}
          </Title>

          <Text
            size="lg"
            c="gray.4"
            maw={700}
            mx="auto"
            lh={1.6}
            mb={60}
          >
            {t.mainDescription}
          </Text>

          {/* Cards de serviços */}
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
            {services.map((service, index) => (
              <MotionCard
                key={index}
                style={{
                  background: 'transparent',
                  overflow: 'visible',
                  height: '100%',
                  position: 'relative',
                  padding: 0,
                  borderRadius: '0.5rem',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Partículas e efeito de calor para o card popular */}
                {service.popular && (
                  <>
                    {/* Efeito de ondas de calor (mais sutil) */}
                    <MotionBox
                      style={{
                        position: 'absolute',
                        top: -15,
                        left: '15%',
                        width: '70%',
                        height: '30px',
                        background: 'transparent',
                        backdropFilter: 'blur(0.5px)',
                        opacity: 0.2,
                        zIndex: 90,
                        pointerEvents: 'none',
                      }}
                      animate={{
                        backdropFilter: ['blur(0.3px)', 'blur(0.8px)', 'blur(0.3px)'],
                        y: [-1, 1, -1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />

                    {/* Segunda camada de ondas de calor (ainda mais sutil) */}
                    <MotionBox
                      style={{
                        position: 'absolute',
                        top: -10,
                        left: '25%',
                        width: '50%',
                        height: '25px',
                        background: 'transparent',
                        backdropFilter: 'blur(0.3px)',
                        opacity: 0.15,
                        zIndex: 89,
                        pointerEvents: 'none',
                      }}
                      animate={{
                        backdropFilter: ['blur(0.2px)', 'blur(0.6px)', 'blur(0.2px)'],
                        y: [0, 2, 0],
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 0.5,
                      }}
                    />

                    {/* Efeito de emanação de calor */}
                    <MotionBox
                      style={{
                        position: 'absolute',
                        top: -2,
                        left: '10%',
                        width: '80%',
                        height: '15px',
                        background: 'linear-gradient(to top, rgba(153, 105, 229, 0.05), transparent)',
                        borderRadius: '50% 50% 0 0',
                        zIndex: 88,
                        pointerEvents: 'none',
                      }}
                      animate={{
                        opacity: [0.1, 0.2, 0.1],
                        height: ['15px', '18px', '15px'],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />

                    {/* Efeito de emanação de calor adicional */}
                    <MotionBox
                      style={{
                        position: 'absolute',
                        top: -1,
                        left: '20%',
                        width: '60%',
                        height: '8px',
                        background: 'linear-gradient(to top, rgba(118, 65, 192, 0.03), transparent)',
                        borderRadius: '50% 50% 0 0',
                        zIndex: 87,
                        pointerEvents: 'none',
                      }}
                      animate={{
                        opacity: [0.05, 0.15, 0.05],
                        height: ['8px', '12px', '8px'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 0.7,
                      }}
                    />

                    {/* Partículas */}
                    <Box
                      style={{
                        position: 'absolute',
                        top: 0, // Alinhado com o topo do card
                        left: 0,
                        right: 0,
                        width: '100%',
                        height: '1px',
                        zIndex: 100, // Valor alto para ficar acima de tudo
                        pointerEvents: 'none',
                      }}
                    >
                      <ParticlesWrapper />
                    </Box>
                  </>
                )}
                <MotionBox
                  style={{
                    background: service.popular
                      ? 'linear-gradient(135deg, rgba(30,30,30,0.6), rgba(40,40,40,0.6))'
                      : 'linear-gradient(135deg, rgba(20,20,20,0.6), rgba(30,30,30,0.6))',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    border: service.popular
                      ? '1px solid rgba(153,105,229,0.3)'
                      : '1px solid rgba(255,255,255,0.05)',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    boxShadow: service.popular
                      ? '0 10px 40px rgba(118,65,192,0.2), 0 0 15px rgba(153,105,229,0.1)'
                      : 'none',
                  }}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="card-hover"
                >
                  {/* Subtle gradient overlay */}
                  <Box
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(135deg, ${service.color} 0%, transparent 70%)`,
                      opacity: 0.1,
                      zIndex: 0,
                    }}
                  />

                  {/* Popular badge */}
                  {service.popular && (
                    <Box
                      style={{
                        position: 'absolute',
                        top: -40,
                        right: 20,
                        zIndex: 5,
                      }}
                    >
                      <Badge
                        variant="filled"
                        color="purple.5"
                        size="lg"
                        radius="sm"
                        style={{
                          background: 'linear-gradient(135deg, rgba(118,65,192,0.9), rgba(153,105,229,0.9))',
                          boxShadow: '0 5px 15px rgba(118,65,192,0.3)',
                          textTransform: 'none',
                          padding: '6px 12px',
                        }}
                      >
                        <Flex align="center" gap={6}>
                          <IconStarFilled size={14} />
                          {service.badge}
                        </Flex>
                      </Badge>
                    </Box>
                  )}

                  <Box p="xl" pt={service.popular ? 50 : 'xl'} style={{ position: 'relative', zIndex: 1 }}>
                    {/* Header */}
                    <Flex align="center" gap="md" mb="md">
                      <ThemeIcon
                        size={50}
                        radius="md"
                        variant="light"
                        color="purple.5"
                        style={{
                          background: `linear-gradient(135deg, ${service.color}, rgba(30,30,30,0.5))`,
                          border: '1px solid rgba(153,105,229,0.2)',
                          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                        }}
                      >
                        {service.icon}
                      </ThemeIcon>
                      <Box>
                        <Text fw={700} size="xl" c="white">{service.title}</Text>
                        <Text size="sm" c="gray.5">{service.description}</Text>
                      </Box>
                    </Flex>

                    {/* Preço e mensagem de orçamento */}
                    <Box mb="xl">
                      <Box
                        mb="md"
                        style={{
                          background: 'linear-gradient(135deg, rgba(153,105,229,0.15), rgba(118,65,192,0.05))',
                          border: '1px solid rgba(153,105,229,0.2)',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          textAlign: 'center',
                          boxShadow: '0 5px 15px rgba(153,105,229,0.1)',
                        }}
                      >
                        <Text size="sm" c="gray.4" mb={4} fw={500}>
                          {t.startingFrom}
                        </Text>
                        <Text fw={800} size="2rem" mb={0} style={{
                          background: 'linear-gradient(135deg, #9969E5, #7641C0)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          lineHeight: 1.2,
                        }}>
                          {(() => {
                            // Preços em diferentes moedas
                            if (locale === 'en') {
                              if (service.title === t.landingPageTitle) return '$800';
                              if (service.title === t.corporateSiteTitle) return '$1,500';
                              if (service.title === t.ecommerceTitle) return '$3,000';
                            } else if (locale === 'fr') {
                              if (service.title === t.landingPageTitle) return 'CHF 800';
                              if (service.title === t.corporateSiteTitle) return 'CHF 1\'500';
                              if (service.title === t.ecommerceTitle) return 'CHF 3\'000';
                            } else {
                              if (service.title === t.landingPageTitle) return 'R$ 3.000';
                              if (service.title === t.corporateSiteTitle) return 'R$ 6.000';
                              if (service.title === t.ecommerceTitle) return 'R$ 12.000';
                            }
                            return '';
                          })()
                          }
                        </Text>
                      </Box>
                      <Text size="sm" c="gray.4" lh={1.6}>
                        {t.customPrice}
                      </Text>
                    </Box>

                    {/* Features */}
                    <Box mb="xl">
                      <Text fw={600} size="sm" c="white" mb="sm">{t.includes}</Text>
                      <List
                        spacing="sm"
                        size="sm"
                        center
                        styles={{
                          itemWrapper: {
                            display: 'flex',
                            alignItems: 'flex-start',
                          }
                        }}
                      >
                        {service.features.map((feature, featureIndex) => (
                          <List.Item
                            key={featureIndex}
                            icon={
                              <ThemeIcon
                                color={feature.highlight ? 'purple.5' : 'gray.7'}
                                size={22}
                                radius="xl"
                                style={{
                                  background: feature.highlight
                                    ? 'linear-gradient(135deg, rgba(118,65,192,0.2), rgba(153,105,229,0.1))'
                                    : 'rgba(60, 60, 60, 0.3)',
                                  border: feature.highlight
                                    ? '1px solid rgba(153,105,229,0.3)'
                                    : 'none',
                                }}
                              >
                                <IconCheck size={14} stroke={2.5} color={feature.highlight ? '#9969E5' : '#909296'} />
                              </ThemeIcon>
                            }
                          >
                            <Text
                              c={feature.highlight ? 'white' : 'gray.5'}
                              fw={feature.highlight ? 600 : 400}
                              style={{
                                textShadow: feature.highlight ? '0 0 10px rgba(153,105,229,0.3)' : 'none',
                              }}
                            >
                              {feature.title}
                            </Text>
                          </List.Item>
                        ))}
                      </List>
                    </Box>

                    {/* CTA Button */}
                    <MotionButton
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        fontSize: '1rem',
                        fontWeight: 500,
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        background: service.popular
                          ? 'linear-gradient(135deg, rgba(118,65,192,0.9), rgba(153,105,229,0.9))'
                          : 'transparent',
                        color: service.popular ? 'white' : '#9969E5',
                        border: service.popular
                          ? 'none'
                          : '1px solid rgba(153,105,229,0.5)',
                        boxShadow: service.popular
                          ? '0 5px 15px rgba(118,65,192,0.3)'
                          : 'none',
                      }}
                      initial={{ scale: 1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="button-hover"
                    >
                      {service.cta}
                      <IconArrowRight size={18} />
                    </MotionButton>
                  </Box>
                </MotionBox>
              </MotionCard>
            ))}
          </SimpleGrid>
        </MotionBox>

        {/* Destacar as observações */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            marginTop: '60px',
            background: 'linear-gradient(135deg, rgba(153,105,229,0.1), rgba(118,65,192,0.05))',
            border: '1px solid rgba(153,105,229,0.2)',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 5px 15px rgba(153,105,229,0.1)',
          }}
        >
          <Flex direction="column" gap="xl">
            {/* Disclaimer */}
            <Box>
              <Text fw={700} size="md" c="white" mb="xs">
                <IconBolt size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
                {t.important}
              </Text>
              <Text size="sm" c="gray.4" lh={1.6}>
                {t.disclaimerText}
              </Text>
            </Box>

            {/* Garantia */}
            <Box>
              <Text fw={700} size="md" c="white" mb="xs">
                <IconTrophy size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
                {t.qualityGuarantee}
              </Text>
              <Text size="sm" c="gray.4" lh={1.6}>
                {t.guaranteeText}
              </Text>
            </Box>

            {/* Manutenção */}
            <Box>
              <Text fw={700} size="md" c="white" mb="xs">
                <IconSettings size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
                {t.monthlyMaintenance}
              </Text>
              <Text size="sm" c="gray.4" lh={1.6}>
                {t.maintenanceText}
              </Text>
            </Box>
          </Flex>
        </MotionBox>

        {/* Call to action */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{
            marginTop: '40px',
            textAlign: 'center',
          }}
        >
          <Text c="gray.5" size="sm">
            {t.projectInMind} <Text component="span" c="purple.4" fw={600} style={{ cursor: 'pointer' }}>{t.contactUs}</Text> {t.freeConsultation}
          </Text>
        </MotionBox>
      </Container>
    </Box>
  );
}
