'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  ThemeIcon,
  Box,
  Group,
  Badge,
  Flex,
  Button,
  Tabs
} from '@mantine/core';
import {
  IconGlobe,
  IconShoppingCart,
  IconCode,
  IconArrowUpRight,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconBrandReact,
  IconBrandNextjs,
  IconBrandTypescript,
  IconSeo,
  IconPalette,
  IconRocket,
  IconChartBar,
  IconBuildingStore,
  IconShoppingBag,
  IconCreditCard,
  IconTruck,
  IconFileDescription,
  IconForms,
  IconMail,
  IconMessageChatbot,
  IconSettings,
  IconDatabase,
  IconCloudComputing,
  IconDeviceAnalytics,
  IconCircuitDiode,
  IconCircuitCapacitor,
  IconCircuitResistor,
  IconCircuitCell,
  IconCircuitBattery,
  IconCircuitBulb,
  IconCircuitSwitchOpen,
  IconCircuitSwitchClosed,
  IconCircuitGround,
  IconCircuitPushbutton,
  IconBulb,
  IconSparkles,
  IconStars,
  IconBolt,
  IconBrandGithub,
  IconBrandVercel,
  IconBrandAws,
  IconServer,
  IconDevicesPc,
  IconDeviceLaptop,
  IconDeviceTablet,
  IconDeviceMobileMessage,
  IconBrandGoogle,
  IconBrandFigma,
  IconBrandSketch,
  IconBrandAdobe,
  IconBrandStripe,
  IconBrandPaypal
} from '@tabler/icons-react';
import { motion } from 'framer-motion';

// Componentes com motion
const MotionBox = motion.div;

// Componente para o efeito de circuit board
function CircuitBackground({ color = 'rgba(153, 105, 229, 0.15)' }: { color?: string }) {
  return (
    <Box
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.1,
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        {/* Linhas horizontais */}
        <line x1="0" y1="20" x2="100" y2="20" stroke={color} strokeWidth="0.2" />
        <line x1="0" y1="40" x2="100" y2="40" stroke={color} strokeWidth="0.2" />
        <line x1="0" y1="60" x2="100" y2="60" stroke={color} strokeWidth="0.2" />
        <line x1="0" y1="80" x2="100" y2="80" stroke={color} strokeWidth="0.2" />

        {/* Linhas verticais */}
        <line x1="20" y1="0" x2="20" y2="100" stroke={color} strokeWidth="0.2" />
        <line x1="40" y1="0" x2="40" y2="100" stroke={color} strokeWidth="0.2" />
        <line x1="60" y1="0" x2="60" y2="100" stroke={color} strokeWidth="0.2" />
        <line x1="80" y1="0" x2="80" y2="100" stroke={color} strokeWidth="0.2" />

        {/* Pontos de conexão */}
        <circle cx="20" cy="20" r="0.8" fill={color} />
        <circle cx="40" cy="20" r="0.8" fill={color} />
        <circle cx="60" cy="20" r="0.8" fill={color} />
        <circle cx="80" cy="20" r="0.8" fill={color} />

        <circle cx="20" cy="40" r="0.8" fill={color} />
        <circle cx="40" cy="40" r="0.8" fill={color} />
        <circle cx="60" cy="40" r="0.8" fill={color} />
        <circle cx="80" cy="40" r="0.8" fill={color} />

        <circle cx="20" cy="60" r="0.8" fill={color} />
        <circle cx="40" cy="60" r="0.8" fill={color} />
        <circle cx="60" cy="60" r="0.8" fill={color} />
        <circle cx="80" cy="60" r="0.8" fill={color} />

        <circle cx="20" cy="80" r="0.8" fill={color} />
        <circle cx="40" cy="80" r="0.8" fill={color} />
        <circle cx="60" cy="80" r="0.8" fill={color} />
        <circle cx="80" cy="80" r="0.8" fill={color} />

        {/* Linhas diagonais */}
        <line x1="20" y1="20" x2="40" y2="40" stroke={color} strokeWidth="0.2" />
        <line x1="60" y1="20" x2="80" y2="40" stroke={color} strokeWidth="0.2" />
        <line x1="20" y1="60" x2="40" y2="80" stroke={color} strokeWidth="0.2" />
        <line x1="60" y1="60" x2="80" y2="80" stroke={color} strokeWidth="0.2" />
      </svg>
    </Box>
  );
}



// Componente para indicador de nível técnico
function TechLevelIndicator({ level = 3, maxLevel = 5 }: { level?: number, maxLevel?: number }) {
  return (
    <Flex gap={4} align="center">
      {Array.from({ length: maxLevel }).map((_, index) => (
        <Box
          key={index}
          style={{
            width: '6px',
            height: '12px',
            borderRadius: '2px',
            background: index < level
              ? `rgba(153, 105, 229, ${0.5 + (index / maxLevel) * 0.5})`
              : 'rgba(60, 60, 60, 0.3)',
            transition: 'all 0.3s ease',
          }}
        />
      ))}
    </Flex>
  );
}

// Interface para os tipos de serviços
interface ServiceFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  techLevel?: number;
}

interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  features: ServiceFeature[];
}

export function ServicesSection() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'pt-BR';

  // Textos da seção de serviços
  const servicesTexts = {
    'pt-BR': {
      badge: 'Nossos Serviços',
      title: 'Soluções',
      titleHighlight: 'completas',
      titleEnd: 'para sua presença online',
      description: 'Criamos soluções digitais que geram resultados reais para o seu negócio. Nosso foco é desenvolver projetos que não apenas impressionam visualmente, mas também impulsionam seu crescimento e conversões.',
      techStack: 'Desenvolvido com tecnologias modernas:',
      cta: 'Solicitar Orçamento',
      techNote: 'Todos os nossos serviços são desenvolvidos com as tecnologias mais modernas do mercado'
    },
    'en': {
      badge: 'Our Services',
      title: 'Complete',
      titleHighlight: 'solutions',
      titleEnd: 'for your online presence',
      description: 'We create digital solutions that generate real results for your business. Our focus is to develop projects that not only impress visually, but also drive your growth and conversions.',
      techStack: 'Developed with modern technologies:',
      cta: 'Request Quote',
      techNote: 'All our services are developed with the most modern technologies on the market'
    },
    'fr': {
      badge: 'Nos Services',
      title: 'Solutions',
      titleHighlight: 'complètes',
      titleEnd: 'pour votre présence en ligne',
      description: 'Nous créons des solutions numériques qui génèrent des résultats réels pour votre entreprise. Notre objectif est de développer des projets qui non seulement impressionnent visuellement, mais qui stimulent également votre croissance et vos conversions.',
      techStack: 'Développé avec des technologies modernes:',
      cta: 'Demander un Devis',
      techNote: 'Tous nos services sont développés avec les technologies les plus modernes du marché'
    }
  };

  const t = servicesTexts[locale as keyof typeof servicesTexts] || servicesTexts['pt-BR'];

  // Traduções para as categorias de serviços
  const categoryTexts = {
    'pt-BR': {
      landingPages: {
        title: 'Landing Pages',
        description: 'Páginas de destino atraentes e otimizadas para conversão, perfeitas para campanhas de marketing e apresentação de produtos ou serviços.'
      },
      ecommerce: {
        title: 'E-commerce',
        description: 'Lojas online completas com gestão de produtos, carrinho de compras, pagamentos seguros e experiência de compra otimizada para seus clientes.'
      },
      customProjects: {
        title: 'Projetos Personalizados',
        description: 'Soluções web sob medida para necessidades específicas do seu negócio, com desenvolvimento personalizado e consultoria especializada.'
      }
    },
    'en': {
      landingPages: {
        title: 'Landing Pages',
        description: 'Attractive and conversion-optimized landing pages, perfect for marketing campaigns and product or service presentation.'
      },
      ecommerce: {
        title: 'E-commerce',
        description: 'Complete online stores with product management, shopping cart, secure payments, and optimized shopping experience for your customers.'
      },
      customProjects: {
        title: 'Custom Projects',
        description: 'Tailored web solutions for your business\'s specific needs, with custom development and specialized consulting.'
      }
    },
    'fr': {
      landingPages: {
        title: 'Pages d\'Atterrissage',
        description: 'Pages d\'atterrissage attrayantes et optimisées pour la conversion, parfaites pour les campagnes marketing et la présentation de produits ou services.'
      },
      ecommerce: {
        title: 'E-commerce',
        description: 'Boutiques en ligne complètes avec gestion de produits, panier d\'achat, paiements sécurisés et expérience d\'achat optimisée pour vos clients.'
      },
      customProjects: {
        title: 'Projets Personnalisés',
        description: 'Solutions web sur mesure pour les besoins spécifiques de votre entreprise, avec développement personnalisé et conseil spécialisé.'
      }
    }
  };

  const ct = categoryTexts[locale as keyof typeof categoryTexts] || categoryTexts['pt-BR'];

  // Traduções para as características (features) de cada serviço
  const featureTexts = {
    'pt-BR': {
      landingPages: {
        responsiveDesign: {
          title: 'Design Responsivo',
          description: 'Layouts que se adaptam perfeitamente a qualquer dispositivo, garantindo uma experiência consistente em desktops, tablets e smartphones.'
        },
        seo: {
          title: 'Otimização para SEO',
          description: 'Estrutura otimizada para mecanismos de busca, melhorando o posicionamento nos resultados de pesquisa e aumentando a visibilidade online.'
        },
        forms: {
          title: 'Formulários Inteligentes',
          description: 'Formulários de captura de leads otimizados para conversão, com validação em tempo real e integração com suas ferramentas de marketing.'
        },
        performance: {
          title: 'Alta Performance',
          description: 'Carregamento rápido e otimizado, garantindo uma experiência fluida para seus visitantes e melhorando as taxas de conversão.'
        },
        analytics: {
          title: 'Analytics Integrado',
          description: 'Acompanhe o desempenho da sua página com métricas detalhadas sobre visitantes, conversões e comportamento dos usuários.'
        },
        design: {
          title: 'Design Personalizado',
          description: 'Design exclusivo alinhado com a identidade visual da sua marca, criando uma experiência única para seus visitantes.'
        }
      },
      ecommerce: {
        catalog: {
          title: 'Catálogo de Produtos',
          description: 'Exiba seus produtos de forma atraente com categorias, filtros, variações e galerias de imagens de alta qualidade.'
        },
        cart: {
          title: 'Carrinho de Compras',
          description: 'Processo de compra simplificado e intuitivo, com carrinho persistente e recuperação de carrinhos abandonados.'
        },
        payments: {
          title: 'Pagamentos Seguros',
          description: 'Integração com as principais gateways de pagamento, oferecendo múltiplas opções de pagamento com total segurança.'
        },
        shipping: {
          title: 'Gestão de Entregas',
          description: 'Cálculo automático de frete, rastreamento de pedidos e integração com transportadoras e Correios.'
        },
        inventory: {
          title: 'Gestão de Estoque',
          description: 'Controle de estoque em tempo real, alertas de baixo estoque e sincronização com sistemas de gestão.'
        },
        admin: {
          title: 'Painel Administrativo',
          description: 'Interface intuitiva para gerenciar produtos, pedidos, clientes e relatórios de vendas.'
        }
      },
      customProjects: {
        consulting: {
          title: 'Consultoria Técnica',
          description: 'Análise detalhada das necessidades do seu negócio para desenvolver a solução ideal, com planejamento estratégico e roadmap de desenvolvimento.'
        },
        development: {
          title: 'Desenvolvimento Sob Medida',
          description: 'Criação de aplicações web personalizadas utilizando as tecnologias mais modernas como React, Next.js e TypeScript.'
        },
        support: {
          title: 'Suporte Premium',
          description: 'Atendimento prioritário e suporte técnico especializado para garantir o funcionamento contínuo da sua solução.'
        },
        integration: {
          title: 'Integração com APIs',
          description: 'Conexão com sistemas externos, serviços de terceiros e APIs para ampliar as funcionalidades da sua aplicação.'
        },
        maintenance: {
          title: 'Manutenção Contínua',
          description: 'Atualizações regulares, monitoramento de performance e implementação de melhorias para manter sua aplicação sempre atualizada.'
        },
        training: {
          title: 'Treinamento e Documentação',
          description: 'Capacitação da sua equipe para utilizar a solução desenvolvida e documentação completa para referência futura.'
        }
      }
    },
    'en': {
      landingPages: {
        responsiveDesign: {
          title: 'Responsive Design',
          description: 'Layouts that adapt perfectly to any device, ensuring a consistent experience on desktops, tablets, and smartphones.'
        },
        seo: {
          title: 'SEO Optimization',
          description: 'Optimized structure for search engines, improving positioning in search results and increasing online visibility.'
        },
        forms: {
          title: 'Smart Forms',
          description: 'Lead capture forms optimized for conversion, with real-time validation and integration with your marketing tools.'
        },
        performance: {
          title: 'High Performance',
          description: 'Fast and optimized loading, ensuring a smooth experience for your visitors and improving conversion rates.'
        },
        analytics: {
          title: 'Integrated Analytics',
          description: 'Track your page performance with detailed metrics on visitors, conversions, and user behavior.'
        },
        design: {
          title: 'Custom Design',
          description: 'Exclusive design aligned with your brand\'s visual identity, creating a unique experience for your visitors.'
        }
      },
      ecommerce: {
        catalog: {
          title: 'Product Catalog',
          description: 'Display your products attractively with categories, filters, variations, and high-quality image galleries.'
        },
        cart: {
          title: 'Shopping Cart',
          description: 'Simplified and intuitive purchase process, with persistent cart and abandoned cart recovery.'
        },
        payments: {
          title: 'Secure Payments',
          description: 'Integration with major payment gateways, offering multiple payment options with total security.'
        },
        shipping: {
          title: 'Delivery Management',
          description: 'Automatic shipping calculation, order tracking, and integration with carriers.'
        },
        inventory: {
          title: 'Inventory Management',
          description: 'Real-time inventory control, low stock alerts, and synchronization with management systems.'
        },
        admin: {
          title: 'Admin Dashboard',
          description: 'Intuitive interface for managing products, orders, customers, and sales reports.'
        }
      },
      customProjects: {
        consulting: {
          title: 'Technical Consulting',
          description: 'Detailed analysis of your business needs to develop the ideal solution, with strategic planning and development roadmap.'
        },
        development: {
          title: 'Custom Development',
          description: 'Creation of custom web applications using the most modern technologies such as React, Next.js, and TypeScript.'
        },
        support: {
          title: 'Premium Support',
          description: 'Priority service and specialized technical support to ensure the continuous operation of your solution.'
        },
        integration: {
          title: 'API Integration',
          description: 'Connection with external systems, third-party services, and APIs to expand the functionality of your application.'
        },
        maintenance: {
          title: 'Continuous Maintenance',
          description: 'Regular updates, performance monitoring, and implementation of improvements to keep your application always up to date.'
        },
        training: {
          title: 'Training and Documentation',
          description: 'Training your team to use the developed solution and complete documentation for future reference.'
        }
      }
    },
    'fr': {
      landingPages: {
        responsiveDesign: {
          title: 'Design Responsive',
          description: 'Mises en page qui s\'adaptent parfaitement à n\'importe quel appareil, garantissant une expérience cohérente sur les ordinateurs de bureau, tablettes et smartphones.'
        },
        seo: {
          title: 'Optimisation SEO',
          description: 'Structure optimisée pour les moteurs de recherche, améliorant le positionnement dans les résultats de recherche et augmentant la visibilité en ligne.'
        },
        forms: {
          title: 'Formulaires Intelligents',
          description: 'Formulaires de capture de leads optimisés pour la conversion, avec validation en temps réel et intégration avec vos outils marketing.'
        },
        performance: {
          title: 'Haute Performance',
          description: 'Chargement rapide et optimisé, garantissant une expérience fluide pour vos visiteurs et améliorant les taux de conversion.'
        },
        analytics: {
          title: 'Analytics Intégré',
          description: 'Suivez les performances de votre page avec des métriques détaillées sur les visiteurs, les conversions et le comportement des utilisateurs.'
        },
        design: {
          title: 'Design Personnalisé',
          description: 'Design exclusif aligné sur l\'identité visuelle de votre marque, créant une expérience unique pour vos visiteurs.'
        }
      },
      ecommerce: {
        catalog: {
          title: 'Catalogue de Produits',
          description: 'Présentez vos produits de manière attrayante avec des catégories, des filtres, des variations et des galeries d\'images de haute qualité.'
        },
        cart: {
          title: 'Panier d\'Achat',
          description: 'Processus d\'achat simplifié et intuitif, avec panier persistant et récupération des paniers abandonnés.'
        },
        payments: {
          title: 'Paiements Sécurisés',
          description: 'Intégration avec les principales passerelles de paiement, offrant plusieurs options de paiement avec une sécurité totale.'
        },
        shipping: {
          title: 'Gestion des Livraisons',
          description: 'Calcul automatique des frais d\'expédition, suivi des commandes et intégration avec les transporteurs.'
        },
        inventory: {
          title: 'Gestion des Stocks',
          description: 'Contrôle des stocks en temps réel, alertes de stock bas et synchronisation avec les systèmes de gestion.'
        },
        admin: {
          title: 'Tableau de Bord Admin',
          description: 'Interface intuitive pour gérer les produits, les commandes, les clients et les rapports de vente.'
        }
      },
      customProjects: {
        consulting: {
          title: 'Conseil Technique',
          description: 'Analyse détaillée des besoins de votre entreprise pour développer la solution idéale, avec planification stratégique et feuille de route de développement.'
        },
        development: {
          title: 'Développement Sur Mesure',
          description: 'Création d\'applications web personnalisées utilisant les technologies les plus modernes comme React, Next.js et TypeScript.'
        },
        support: {
          title: 'Support Premium',
          description: 'Service prioritaire et support technique spécialisé pour assurer le fonctionnement continu de votre solution.'
        },
        integration: {
          title: 'Intégration API',
          description: 'Connexion avec des systèmes externes, des services tiers et des API pour étendre les fonctionnalités de votre application.'
        },
        maintenance: {
          title: 'Maintenance Continue',
          description: 'Mises à jour régulières, surveillance des performances et mise en œuvre d\'améliorations pour maintenir votre application toujours à jour.'
        },
        training: {
          title: 'Formation et Documentation',
          description: 'Formation de votre équipe à l\'utilisation de la solution développée et documentation complète pour référence future.'
        }
      }
    }
  };

  const ft = featureTexts[locale as keyof typeof featureTexts] || featureTexts['pt-BR'];

  // Remover referência ao useMantineTheme que não é mais usado
  // Categorias de serviços
  const serviceCategories: ServiceCategory[] = [
    {
      id: 'landing-pages',
      title: ct.landingPages.title,
      description: ct.landingPages.description,
      icon: <IconDeviceDesktop size={24} />,
      color: 'rgba(118, 65, 192, 0.8)',
      gradient: 'linear-gradient(135deg, rgba(118, 65, 192, 0.2), rgba(153, 105, 229, 0.1))',
      features: [
        {
          icon: <IconDevicesPc size={20} stroke={1.5} />,
          title: ft.landingPages.responsiveDesign.title,
          description: ft.landingPages.responsiveDesign.description,
          techLevel: 3
        },
        {
          icon: <IconBrandGoogle size={20} stroke={1.5} />,
          title: ft.landingPages.seo.title,
          description: ft.landingPages.seo.description,
          techLevel: 4
        },
        {
          icon: <IconForms size={20} stroke={1.5} />,
          title: ft.landingPages.forms.title,
          description: ft.landingPages.forms.description,
          techLevel: 3
        },
        {
          icon: <IconRocket size={20} stroke={1.5} />,
          title: ft.landingPages.performance.title,
          description: ft.landingPages.performance.description,
          techLevel: 5
        },
        {
          icon: <IconChartBar size={20} stroke={1.5} />,
          title: ft.landingPages.analytics.title,
          description: ft.landingPages.analytics.description,
          techLevel: 4
        },
        {
          icon: <IconBrandFigma size={20} stroke={1.5} />,
          title: ft.landingPages.design.title,
          description: ft.landingPages.design.description,
          techLevel: 4
        }
      ]
    },
    {
      id: 'e-commerce',
      title: ct.ecommerce.title,
      description: ct.ecommerce.description,
      icon: <IconShoppingCart size={24} />,
      color: 'rgba(153, 105, 229, 0.8)',
      gradient: 'linear-gradient(135deg, rgba(153, 105, 229, 0.2), rgba(118, 65, 192, 0.1))',
      features: [
        {
          icon: <IconBuildingStore size={20} stroke={1.5} />,
          title: ft.ecommerce.catalog.title,
          description: ft.ecommerce.catalog.description,
          techLevel: 3
        },
        {
          icon: <IconShoppingBag size={20} stroke={1.5} />,
          title: ft.ecommerce.cart.title,
          description: ft.ecommerce.cart.description,
          techLevel: 4
        },
        {
          icon: <IconBrandStripe size={20} stroke={1.5} />,
          title: ft.ecommerce.payments.title,
          description: ft.ecommerce.payments.description,
          techLevel: 5
        },
        {
          icon: <IconTruck size={20} stroke={1.5} />,
          title: ft.ecommerce.shipping.title,
          description: ft.ecommerce.shipping.description,
          techLevel: 4
        },
        {
          icon: <IconDatabase size={20} stroke={1.5} />,
          title: ft.ecommerce.inventory.title,
          description: ft.ecommerce.inventory.description,
          techLevel: 4
        },
        {
          icon: <IconDeviceAnalytics size={20} stroke={1.5} />,
          title: ft.ecommerce.admin.title,
          description: ft.ecommerce.admin.description,
          techLevel: 5
        }
      ]
    },
    {
      id: 'custom-projects',
      title: ct.customProjects.title,
      description: ct.customProjects.description,
      icon: <IconCode size={24} />,
      color: 'rgba(212, 175, 55, 0.8)',
      gradient: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(153, 105, 229, 0.1))',
      features: [
        {
          icon: <IconCircuitDiode size={20} stroke={1.5} />,
          title: ft.customProjects.consulting.title,
          description: ft.customProjects.consulting.description,
          techLevel: 5
        },
        {
          icon: <IconBrandReact size={20} stroke={1.5} />,
          title: ft.customProjects.development.title,
          description: ft.customProjects.development.description,
          techLevel: 5
        },
        {
          icon: <IconMessageChatbot size={20} stroke={1.5} />,
          title: ft.customProjects.support.title,
          description: ft.customProjects.support.description,
          techLevel: 4
        },
        {
          icon: <IconBrandVercel size={20} stroke={1.5} />,
          title: ft.customProjects.integration.title,
          description: ft.customProjects.integration.description,
          techLevel: 5
        },
        {
          icon: <IconCircuitSwitchClosed size={20} stroke={1.5} />,
          title: ft.customProjects.maintenance.title,
          description: ft.customProjects.maintenance.description,
          techLevel: 4
        },
        {
          icon: <IconBrandGithub size={20} stroke={1.5} />,
          title: ft.customProjects.training.title,
          description: ft.customProjects.training.description,
          techLevel: 3
        }
      ]
    }
  ];

  // Estado para controlar a categoria selecionada
  const [activeCategory, setActiveCategory] = useState<string>(serviceCategories[0].id);

  // Obter a categoria ativa
  const activeService = serviceCategories.find(category => category.id === activeCategory) || serviceCategories[0];

  return (
    <Box
      py={80}
      style={{
        background: 'linear-gradient(to bottom, rgba(10,10,10,0.9) 0%, rgba(15,15,15,0.9) 100%)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background effect */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(118,65,192,0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(118,65,192,0.05) 0%, transparent 50%)',
          zIndex: 0,
        }}
      />

      <Container size="xl" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header Section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ marginBottom: '60px', textAlign: 'center' }}
        >
          <Badge
            variant="light"
            color="purple.5"
            size="lg"
            radius="sm"
            style={{
              background: 'linear-gradient(135deg, rgba(118,65,192,0.1), rgba(153,105,229,0.2))',
              border: '1px solid rgba(153,105,229,0.3)',
              backdropFilter: 'blur(10px)',
              marginBottom: '1rem',
            }}
            component={motion.div}
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            {t.badge}
          </Badge>

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
            {t.title} <Text span c="purple.4" inherit>{t.titleHighlight}</Text> {t.titleEnd}
          </Title>

          <Text
            size="lg"
            c="gray.4"
            maw={700}
            mx="auto"
            lh={1.6}
            mb={40}
          >
            {t.description}
          </Text>

          {/* Category Tabs */}
          <Tabs
            value={activeCategory}
            onChange={(value) => setActiveCategory(value || serviceCategories[0].id)}
            variant="pills"
            radius="xl"
            mb={40}
            styles={{
              root: {
                display: 'flex',
                justifyContent: 'center',
              },
              list: {
                gap: '10px',
                border: 'none',
                padding: '5px',
                background: 'rgba(30,30,30,0.5)',
                borderRadius: '30px',
                backdropFilter: 'blur(10px)',
                display: 'inline-flex',
              },
              tab: {
                color: 'white',
                fontWeight: 500,
                padding: '8px 20px',
                borderRadius: '30px',
                transition: 'all 0.3s ease',
              },

            }}
          >
            <Tabs.List>
              {serviceCategories.map((category) => (
                <Tabs.Tab
                  key={category.id}
                  value={category.id}
                  leftSection={category.icon}
                >
                  {category.title}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs>
        </MotionBox>

        {/* Service Details Section */}
        <MotionBox
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '60px' }}
        >
          <Flex gap="xl" direction={{ base: 'column', md: 'row' }}>
            {/* Service Overview */}
            <Box style={{ flex: '1' }}>
              <Flex
                align="center"
                gap="md"
                style={{ marginBottom: '1.5rem' }}
                component={motion.div}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <ThemeIcon
                  size={60}
                  radius="md"
                  variant="light"
                  style={{
                    background: activeService.gradient,
                    border: '1px solid rgba(153,105,229,0.2)',
                    boxShadow: '0 5px 15px rgba(118,65,192,0.1)',
                  }}
                >
                  {activeService.icon}
                </ThemeIcon>
                <Box>
                  <Title order={3} fw={700} size="h3" c="white">{activeService.title}</Title>
                  <Text size="md" c="gray.4">{activeService.description}</Text>
                </Box>
              </Flex>

              {/* Tech Stack */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ marginBottom: '2rem' }}
              >
                <Text fw={600} size="sm" c="white" mb="sm">{t.techStack}</Text>
                <Flex gap="md" wrap="wrap">
                  <Badge
                    size="lg"
                    radius="md"
                    variant="light"
                    leftSection={<IconBrandTypescript size={14} />}
                    style={{
                      background: 'rgba(49, 120, 198, 0.1)',
                      border: '1px solid rgba(49, 120, 198, 0.2)',
                    }}
                  >
                    TypeScript
                  </Badge>
                  <Badge
                    size="lg"
                    radius="md"
                    variant="light"
                    leftSection={<IconBrandReact size={14} />}
                    style={{
                      background: 'rgba(97, 218, 251, 0.1)',
                      border: '1px solid rgba(97, 218, 251, 0.2)',
                    }}
                  >
                    React
                  </Badge>
                  <Badge
                    size="lg"
                    radius="md"
                    variant="light"
                    leftSection={<IconBrandNextjs size={14} />}
                    style={{
                      background: 'rgba(60, 60, 60, 0.1)',
                      border: '1px solid rgba(60, 60, 60, 0.2)',
                    }}
                  >
                    Next.js
                  </Badge>
                </Flex>
              </MotionBox>

              {/* CTA Button */}
              <Button
                component={motion.a}
                href={`/${locale}/orcamento?type=${activeCategory}`}
                size="lg"
                radius="md"
                variant="gradient"
                gradient={{ from: 'rgba(118,65,192,0.9)', to: 'rgba(153,105,229,0.9)', deg: 135 }}
                rightSection={<IconArrowUpRight size={18} />}
                style={{ marginTop: '2rem' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 5px 15px rgba(118,65,192,0.3)',
                }}
                whileTap={{ scale: 0.98 }}
              >
                {t.cta}
              </Button>
            </Box>

            {/* Features Grid */}
            <Box style={{ flex: '1.2' }}>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                {activeService.features.map((feature, index) => (
                  <Card
                    key={index}
                    p="md"
                    radius="md"
                    style={{
                      background: 'linear-gradient(145deg, rgba(30,30,30,0.5), rgba(20,20,20,0.5))',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      height: '100%',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + (index * 0.05) }}
                    whileHover={{
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                      border: '1px solid rgba(153,105,229,0.2)',
                    }}
                  >
                    {/* Circuit board background */}
                    <CircuitBackground color={activeService.color} />

                    {/* Subtle gradient overlay */}
                    <Box
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, rgba(153,105,229,0.05) 0%, transparent 50%)',
                        zIndex: 0,
                      }}
                    />

                    <Flex gap="md" style={{ position: 'relative', zIndex: 1 }}>
                      <motion.div
                        whileHover={{
                          scale: 1.1,
                          rotate: 5,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ThemeIcon
                          size={40}
                          radius="md"
                          variant="light"
                          color="purple.5"
                          style={{
                            background: 'linear-gradient(135deg, rgba(118,65,192,0.2), rgba(153,105,229,0.1))',
                            border: '1px solid rgba(153,105,229,0.2)',
                            boxShadow: '0 5px 15px rgba(118,65,192,0.1)',
                          }}
                        >
                          {feature.icon}
                        </ThemeIcon>
                      </motion.div>
                      <Box style={{ flex: 1 }}>
                        <Flex justify="space-between" align="center" mb="xs">
                          <Text fw={600} size="md" c="white">{feature.title}</Text>
                          <TechLevelIndicator level={feature.techLevel || 3} />
                        </Flex>
                        <Text size="sm" c="gray.5" lh={1.6}>{feature.description}</Text>
                      </Box>
                    </Flex>
                  </Card>
                ))}
              </SimpleGrid>
            </Box>
          </Flex>
        </MotionBox>

        {/* Tech Stack Section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ marginTop: '40px', textAlign: 'center' }}
        >
          <Text fw={600} size="sm" c="gray.5" mb="xs">
            {t.techNote}
          </Text>
        </MotionBox>
      </Container>
    </Box>
  );
}

export default ServicesSection;
