'use client';

import { useRef, useEffect, useState } from 'react';
import {
  Container,
  Title,
  Text,
  Box,
  SimpleGrid,
  Group,
  Button,
  Badge,
  Card,
  Image,
  Modal,
  Divider,
  Tabs,
  Paper,
  ActionIcon,
  Tooltip
} from '@mantine/core';
import {
  IconArrowRight,
  IconEye,
  IconExternalLink,
  IconDeviceDesktop,
  IconDeviceTablet,
  IconDeviceMobile,
  IconChevronLeft,
  IconChevronRight
} from '@tabler/icons-react';
import './portfolio/portfolio-styles.css';

// Tipos para os templates do portfólio
interface Template {
  id: string;
  title: {
    'pt-BR': string;
    'en': string;
    'fr': string;
  };
  description: {
    'pt-BR': string;
    'en': string;
    'fr': string;
  };
  category: 'landing' | 'ecommerce' | 'corporate' | 'custom';
  image: string;
  // Propriedades adicionais para o modal
  previewImages?: string[]; // Lista de imagens adicionais para a prévia
  demoUrl?: string; // URL opcional para uma demo ao vivo
  features?: {
    'pt-BR': string[];
    'en': string[];
    'fr': string[];
  };
  suitableFor?: {
    'pt-BR': string;
    'en': string;
    'fr': string;
  };
  deliveryTime?: {
    'pt-BR': string;
    'en': string;
    'fr': string;
  };
}

// Textos da seção de portfólio
const portfolioTexts = {
  'pt-BR': {
    badge: 'Nosso Portfólio',
    title: 'Templates',
    titleHighlight: 'recentes',
    description: 'Confira alguns dos nossos templates e designs que podem servir de inspiração para o seu projeto.',
    categories: {
      all: 'Todos',
      landing: 'Landing Pages',
      ecommerce: 'E-commerce',
      corporate: 'Sites Corporativos',
      custom: 'Projetos Personalizados'
    },
    viewDetails: 'Ver Detalhes',
    requestQuote: 'Solicitar',
    moreProjects: 'Ver Mais Templates',
    // Textos para o modal
    features: 'Funcionalidades',
    details: 'Detalhes',
    category: 'Categoria',
    suitableFor: 'Ideal para',
    deliveryTime: 'Tempo de entrega',
    preview: 'Prévia',
    information: 'Informações',

    previous: 'Anterior',
    next: 'Próximo',
    desktop: 'Desktop',
    tablet: 'Tablet',
    mobile: 'Mobile'
  },
  'en': {
    badge: 'Our Portfolio',
    title: 'Recent',
    titleHighlight: 'templates',
    description: 'Check out some of our templates and designs that can serve as inspiration for your project.',
    categories: {
      all: 'All',
      landing: 'Landing Pages',
      ecommerce: 'E-commerce',
      corporate: 'Corporate Sites',
      custom: 'Custom Projects'
    },
    viewDetails: 'View Details',
    requestQuote: 'Request Quote',
    moreProjects: 'View More Templates',
    // Textos para o modal
    features: 'Features',
    details: 'Details',
    category: 'Category',
    suitableFor: 'Suitable for',
    deliveryTime: 'Delivery time',
    preview: 'Preview',
    information: 'Information',

    previous: 'Previous',
    next: 'Next',
    desktop: 'Desktop',
    tablet: 'Tablet',
    mobile: 'Mobile'
  },
  'fr': {
    badge: 'Notre Portfolio',
    title: 'Templates',
    titleHighlight: 'récents',
    description: 'Découvrez certains de nos templates et designs qui peuvent servir d\'inspiration pour votre projet.',
    categories: {
      all: 'Tous',
      landing: 'Pages d\'Atterrissage',
      ecommerce: 'E-commerce',
      corporate: 'Sites Corporatifs',
      custom: 'Projets Personnalisés'
    },
    viewDetails: 'Voir Détails',
    requestQuote: 'Demander',
    moreProjects: 'Voir Plus de Templates',
    // Textos para o modal
    features: 'Fonctionnalités',
    details: 'Détails',
    category: 'Catégorie',
    suitableFor: 'Idéal pour',
    deliveryTime: 'Délai de livraison',
    preview: 'Aperçu',
    information: 'Informations',

    previous: 'Précédent',
    next: 'Suivant',
    desktop: 'Bureau',
    tablet: 'Tablette',
    mobile: 'Mobile'
  }
};

// Templates de exemplo (apenas os 3 solicitados)
const sampleTemplates: Template[] = [
  {
    id: 'landing-modern',
    title: {
      'pt-BR': 'Modern Landing Page',
      'en': 'Modern Landing Page',
      'fr': 'Page d\'Atterrissage Moderne'
    },
    description: {
      'pt-BR': 'Template moderno para startups e empresas inovadoras. Design responsivo, otimizado para conversões e com animações suaves que capturam a atenção do visitante.',
      'en': 'Modern template for startups and innovative companies. Responsive design, conversion-optimized with smooth animations that capture visitor attention.',
      'fr': 'Modèle moderne pour startups et entreprises innovantes. Design responsive, optimisé pour les conversions avec des animations fluides qui captent l\'attention des visiteurs.'
    },
    category: 'landing',
    image: '/images/portfolio/landingpage1.webp',
    previewImages: [
      '/images/portfolio/landingpage1.webp'
    ],
    demoUrl: 'https://modernlandingpage-demo.vercel.app',
    features: {
      'pt-BR': [
        'Design 100% responsivo para todos os dispositivos',
        'Otimização avançada para SEO e velocidade',
        'Formulários inteligentes de captura de leads',
        'Integração completa com redes sociais',
        'Animações CSS3 modernas e performáticas',
        'Seções de depoimentos e avaliações',
        'Call-to-actions estrategicamente posicionados',
        'Analytics e pixel de conversão integrados'
      ],
      'en': [
        '100% responsive design for all devices',
        'Advanced SEO and speed optimization',
        'Smart lead capture forms',
        'Complete social media integration',
        'Modern and performant CSS3 animations',
        'Testimonials and reviews sections',
        'Strategically positioned call-to-actions',
        'Integrated analytics and conversion pixels'
      ],
      'fr': [
        'Design 100% responsive pour tous les appareils',
        'Optimisation SEO et vitesse avancée',
        'Formulaires intelligents de capture de leads',
        'Intégration complète avec réseaux sociaux',
        'Animations CSS3 modernes et performantes',
        'Sections témoignages et avis',
        'Appels à l\'action positionnés stratégiquement',
        'Analytics et pixels de conversion intégrés'
      ]
    },
    suitableFor: {
      'pt-BR': 'Startups, empresas de tecnologia, SaaS, aplicativos móveis e lançamentos de produtos',
      'en': 'Startups, tech companies, SaaS, mobile apps and product launches',
      'fr': 'Startups, entreprises technologiques, SaaS, applications mobiles et lancements de produits'
    },
    deliveryTime: {
      'pt-BR': '2-3 semanas',
      'en': '2-3 weeks',
      'fr': '2-3 semaines'
    }
  },
  {
    id: 'ecommerce-complete',
    title: {
      'pt-BR': 'Complete E-commerce',
      'en': 'Complete E-commerce',
      'fr': 'E-commerce Complet'
    },
    description: {
      'pt-BR': 'Solução completa de e-commerce com design profissional, carrinho inteligente, checkout otimizado e painel administrativo. Pronto para vender online.',
      'en': 'Complete e-commerce solution with professional design, smart cart, optimized checkout and admin panel. Ready to sell online.',
      'fr': 'Solution e-commerce complète avec design professionnel, panier intelligent, checkout optimisé et panneau d\'administration. Prêt à vendre en ligne.'
    },
    category: 'ecommerce',
    image: '/images/portfolio/ecommerce1.webp',
    previewImages: [
      '/images/portfolio/ecommerce1.webp'
    ],
    demoUrl: 'https://complete-ecommerce-demo.vercel.app',
    features: {
      'pt-BR': [
        'Catálogo de produtos com filtros avançados',
        'Carrinho de compras inteligente',
        'Checkout em uma página otimizado',
        'Integração com gateways de pagamento',
        'Painel administrativo completo',
        'Gestão de estoque em tempo real',
        'Sistema de cupons e promoções',
        'Relatórios de vendas e analytics',
        'Integração com correios para frete',
        'Sistema de avaliações de produtos'
      ],
      'en': [
        'Product catalog with advanced filters',
        'Smart shopping cart',
        'Optimized one-page checkout',
        'Payment gateway integration',
        'Complete admin panel',
        'Real-time inventory management',
        'Coupons and promotions system',
        'Sales reports and analytics',
        'Shipping integration',
        'Product review system'
      ],
      'fr': [
        'Catalogue de produits avec filtres avancés',
        'Panier d\'achat intelligent',
        'Checkout optimisé en une page',
        'Intégration de passerelles de paiement',
        'Panneau d\'administration complet',
        'Gestion d\'inventaire en temps réel',
        'Système de coupons et promotions',
        'Rapports de ventes et analytics',
        'Intégration d\'expédition',
        'Système d\'avis produits'
      ]
    },
    suitableFor: {
      'pt-BR': 'Lojas online, varejo, moda, eletrônicos, artesanato e qualquer negócio que vende produtos',
      'en': 'Online stores, retail, fashion, electronics, crafts and any business that sells products',
      'fr': 'Boutiques en ligne, retail, mode, électronique, artisanat et toute entreprise qui vend des produits'
    },
    deliveryTime: {
      'pt-BR': '3-4 semanas',
      'en': '3-4 weeks',
      'fr': '3-4 semaines'
    }
  },
  {
    id: 'corporate-professional',
    title: {
      'pt-BR': 'Professional Corporate Website',
      'en': 'Professional Corporate Website',
      'fr': 'Site Corporatif Professionnel'
    },
    description: {
      'pt-BR': 'Website corporativo elegante e profissional. Design sofisticado que transmite credibilidade, com seções institucionais completas e integração com sistemas empresariais.',
      'en': 'Elegant and professional corporate website. Sophisticated design that conveys credibility, with complete institutional sections and business systems integration.',
      'fr': 'Site web corporatif élégant et professionnel. Design sophistiqué qui transmet la crédibilité, avec des sections institutionnelles complètes et l\'intégration de systèmes d\'entreprise.'
    },
    category: 'corporate',
    image: '/images/portfolio/institucional1.webp',
    previewImages: [
      '/images/portfolio/institucional1.webp'
    ],
    demoUrl: 'https://corporate-website-demo.vercel.app',
    features: {
      'pt-BR': [
        'Design corporativo elegante e profissional',
        'Seção sobre a empresa completa',
        'Portfólio de produtos e serviços',
        'Página de equipe com perfis detalhados',
        'Blog corporativo integrado',
        'Formulários de contato avançados',
        'Integração com CRM empresarial',
        'Seção de carreiras e vagas',
        'Relatórios anuais e documentos',
        'Certificações e prêmios',
        'Área do cliente/investidor',
        'Múltiplos idiomas disponíveis'
      ],
      'en': [
        'Elegant and professional corporate design',
        'Complete about company section',
        'Products and services portfolio',
        'Team page with detailed profiles',
        'Integrated corporate blog',
        'Advanced contact forms',
        'Business CRM integration',
        'Careers and job openings section',
        'Annual reports and documents',
        'Certifications and awards',
        'Client/investor area',
        'Multiple languages available'
      ],
      'fr': [
        'Design corporatif élégant et professionnel',
        'Section à propos de l\'entreprise complète',
        'Portfolio de produits et services',
        'Page d\'équipe avec profils détaillés',
        'Blog corporatif intégré',
        'Formulaires de contact avancés',
        'Intégration CRM d\'entreprise',
        'Section carrières et offres d\'emploi',
        'Rapports annuels et documents',
        'Certifications et prix',
        'Espace client/investisseur',
        'Plusieurs langues disponibles'
      ]
    },
    suitableFor: {
      'pt-BR': 'Empresas estabelecidas, corporações, escritórios de advocacia, consultorias e instituições',
      'en': 'Established companies, corporations, law firms, consultancies and institutions',
      'fr': 'Entreprises établies, corporations, cabinets d\'avocats, consultants et institutions'
    },
    deliveryTime: {
      'pt-BR': '3-5 semanas',
      'en': '3-5 weeks',
      'fr': '3-5 semaines'
    }
  }
];

// Removido o componente CategoryIcon que não estava sendo usado

// Definir tipos para as props
interface PortfolioSectionProps {
  locale: string;
}

// Componente para o efeito de estrelas estáticas (sem paralaxe para evitar lag)
function StarryBackgroundEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuração das estrelas
    const stars: any[] = [];
    const starCount = 200; // Número de estrelas no fundo

    // Ajustar tamanho do canvas
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;

        // Recriar estrelas quando o tamanho mudar
        createStars();
      }
    };

    // Criar estrelas estáticas
    const createStars = () => {
      stars.length = 0;

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5, // Tamanho variado
          opacity: Math.random() * 0.7 + 0.3, // Opacidade variada
          twinkle: Math.random() * 0.03, // Cintilação leve
          twinkleSpeed: Math.random() * 0.005 + 0.001, // Velocidade de cintilação
        });
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Função de animação (apenas para cintilação suave, sem movimento)
    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Desenhar cada estrela
      stars.forEach((star) => {
        // Cintilação suave
        const twinkle = Math.sin(timestamp * star.twinkleSpeed) * star.twinkle;
        const opacity = star.opacity + twinkle;

        // Desenhar estrela
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Iniciar animação
    animate(performance.now());

    // Limpar ao desmontar
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <Box
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  );
}

// Componente de galeria aprimorado para o modal
function TemplateGallery({
  images,
  locale,
  localizedTexts
}: {
  images: string[],
  locale: string,
  localizedTexts: any
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Função para navegar para a próxima imagem
  const nextImage = () => {
    setIsLoading(true);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsLoading(false), 300);
  };

  // Função para navegar para a imagem anterior
  const prevImage = () => {
    setIsLoading(true);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsLoading(false), 300);
  };

  // Função para ir para uma imagem específica
  const goToImage = (index: number) => {
    if (index !== currentImageIndex) {
      setIsLoading(true);
      setCurrentImageIndex(index);
      setTimeout(() => setIsLoading(false), 300);
    }
  };

  // Configurar largura com base no modo de visualização
  const getContainerStyle = () => {
    switch (viewMode) {
      case 'desktop':
        return { width: '100%', maxWidth: '100%' };
      case 'tablet':
        return { width: '768px', maxWidth: '80%', margin: '0 auto' };
      case 'mobile':
        return { width: '375px', maxWidth: '60%', margin: '0 auto' };
    }
  };

  // Detectar se é a primeira imagem (original) ou uma das adicionais
  const isOriginalImage = currentImageIndex === 0;

  return (
    <Box>
      {/* Controles de visualização aprimorados */}
      <Group justify="space-between" align="center" mb="md">
        <Group>
          <Tooltip label={localizedTexts.desktop || 'Desktop View'}>
            <ActionIcon
              variant={viewMode === 'desktop' ? 'filled' : 'light'}
              color="purple"
              size="lg"
              onClick={() => setViewMode('desktop')}
            >
              <IconDeviceDesktop size={18} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label={localizedTexts.tablet || 'Tablet View'}>
            <ActionIcon
              variant={viewMode === 'tablet' ? 'filled' : 'light'}
              color="purple"
              size="lg"
              onClick={() => setViewMode('tablet')}
            >
              <IconDeviceTablet size={18} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label={localizedTexts.mobile || 'Mobile View'}>
            <ActionIcon
              variant={viewMode === 'mobile' ? 'filled' : 'light'}
              color="purple"
              size="lg"
              onClick={() => setViewMode('mobile')}
            >
              <IconDeviceMobile size={18} />
            </ActionIcon>
          </Tooltip>
        </Group>

        <Group align="center" gap="md">
          <Badge
            variant="light"
            color={isOriginalImage ? 'green' : 'blue'}
            size="sm"
          >
            {isOriginalImage ? 'Template Original' : 'Exemplo Visual'}
          </Badge>
          <Text size="sm" c="dimmed" fw={500}>
            {currentImageIndex + 1} de {images.length}
          </Text>
        </Group>
      </Group>

      {/* Container da imagem com navegação aprimorada */}
      <Paper
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '12px',
          border: '1px solid rgba(153, 105, 229, 0.2)',
          backgroundColor: '#0a0a0a',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
          ...getContainerStyle()
        }}
      >
        {/* Loading overlay */}
        {isLoading && (
          <Box
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 15,
            }}
          >
            <Box
              style={{
                width: '40px',
                height: '40px',
                border: '3px solid rgba(153, 105, 229, 0.3)',
                borderTop: '3px solid #9969E5',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }}
            />
          </Box>
        )}

        <Box
          style={{
            position: 'relative',
            paddingTop: viewMode === 'mobile' ? '177%' : viewMode === 'tablet' ? '133%' : '56.25%',
            backgroundColor: '#0a0a0a',
          }}
        >
          {/* Frame do dispositivo para mobile/tablet */}
          {viewMode !== 'desktop' && (
            <Box
              style={{
                position: 'absolute',
                top: '5%',
                left: '5%',
                right: '5%',
                bottom: '5%',
                background: 'linear-gradient(145deg, #2a2a2a, #1a1a1a)',
                borderRadius: viewMode === 'mobile' ? '25px' : '15px',
                border: '2px solid rgba(153, 105, 229, 0.3)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                zIndex: 1,
              }}
            />
          )}

          <Image
            src={images[currentImageIndex]}
            alt={`Preview ${currentImageIndex + 1}`}
            style={{
              position: 'absolute',
              top: viewMode !== 'desktop' ? '8%' : 0,
              left: viewMode !== 'desktop' ? '8%' : 0,
              width: viewMode !== 'desktop' ? '84%' : '100%',
              height: viewMode !== 'desktop' ? '84%' : '100%',
              objectFit: 'contain',
              borderRadius: viewMode === 'mobile' ? '20px' : viewMode === 'tablet' ? '8px' : '0',
              transition: 'all 0.3s ease',
              opacity: isLoading ? 0.7 : 1,
              zIndex: 2,
            }}
            onLoad={() => setIsLoading(false)}
          />

          {/* Botões de navegação aprimorados */}
          <ActionIcon
            variant="filled"
            color="purple"
            size="xl"
            style={{
              position: 'absolute',
              left: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              opacity: 0.9,
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
            }}
            onClick={prevImage}
            disabled={isLoading}
          >
            <IconChevronLeft size={24} />
          </ActionIcon>

          <ActionIcon
            variant="filled"
            color="purple"
            size="xl"
            style={{
              position: 'absolute',
              right: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              opacity: 0.9,
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
            }}
            onClick={nextImage}
            disabled={isLoading}
          >
            <IconChevronRight size={24} />
          </ActionIcon>

          {/* Botão fullscreen */}
          <ActionIcon
            variant="filled"
            color="purple"
            size="md"
            style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              zIndex: 10,
              opacity: 0.8,
            }}
            onClick={() => setIsFullscreen(true)}
          >
            <IconExternalLink size={16} />
          </ActionIcon>

          {/* Indicador de dispositivo e progresso */}
          <Box
            style={{
              position: 'absolute',
              bottom: '15px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(0, 0, 0, 0.8)',
              padding: '12px 20px',
              borderRadius: '25px',
              zIndex: 10,
              border: '1px solid rgba(153, 105, 229, 0.3)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Group align="center" gap="md">
              <Text size="sm" c="white" fw={500}>
                {viewMode === 'desktop' ? '🖥️' : viewMode === 'tablet' ? '📱' : '📱'} {viewMode}
              </Text>
              <Text size="sm" c="gray.3">•</Text>
              <Text size="sm" c="white" fw={500}>
                {currentImageIndex + 1} / {images.length}
              </Text>
            </Group>
          </Box>
        </Box>
      </Paper>

      {/* Miniaturas aprimoradas */}
      <Box mt="lg">
        <Text size="sm" c="dimmed" mb="sm" fw={500}>
          Navegação Rápida:
        </Text>
        <SimpleGrid cols={{ base: 2, sm: 4, md: 6 }} spacing="sm">
          {images.map((img, index) => (
            <Box
              key={index}
              style={{
                cursor: 'pointer',
                borderRadius: '8px',
                overflow: 'hidden',
                border: index === currentImageIndex
                  ? '2px solid #9969E5'
                  : '2px solid transparent',
                opacity: index === currentImageIndex ? 1 : 0.7,
                transition: 'all 0.2s ease',
                position: 'relative',
                background: '#1a1a1a',
              }}
              onClick={() => goToImage(index)}
            >
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                height={80}
                style={{ 
                  objectFit: 'cover',
                  transition: 'transform 0.2s ease',
                }}
              />
              
              {/* Overlay de hover */}
              <Box
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(153, 105, 229, 0.2)',
                  opacity: index === currentImageIndex ? 1 : 0,
                  transition: 'opacity 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {index === currentImageIndex && (
                  <IconEye size={20} color="white" />
                )}
              </Box>

              {/* Número da imagem */}
              <Box
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  background: 'rgba(0, 0, 0, 0.8)',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: 600,
                }}
              >
                {index + 1}
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      {/* Modal fullscreen */}
      <Modal
        opened={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        size="95%"
        title="Preview em Tela Cheia"
        styles={{
          content: { backgroundColor: '#0a0a0a' },
          header: { backgroundColor: '#0a0a0a', borderBottom: '1px solid rgba(153, 105, 229, 0.2)' },
          title: { color: 'white', fontWeight: 600 },
          close: { color: 'white' },
        }}
        centered
      >
        <Box style={{ textAlign: 'center' }}>
          <Image
            src={images[currentImageIndex]}
            alt={`Fullscreen preview ${currentImageIndex + 1}`}
            style={{
              maxWidth: '100%',
              maxHeight: '70vh',
              objectFit: 'contain',
              borderRadius: '8px',
            }}
          />
          <Group justify="center" mt="md" gap="md">
            <Button
              variant="light"
              color="purple"
              leftSection={<IconChevronLeft size={16} />}
              onClick={prevImage}
            >
              Anterior
            </Button>
            <Text c="white" fw={500}>
              {currentImageIndex + 1} de {images.length}
            </Text>
            <Button
              variant="light"
              color="purple"
              rightSection={<IconChevronRight size={16} />}
              onClick={nextImage}
            >
              Próxima
            </Button>
          </Group>
        </Box>
      </Modal>
    </Box>
  );
}

// Componente principal da seção de portfólio
export function PortfolioSection({ locale }: PortfolioSectionProps) {
  // Estado para controlar o modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  // Usar todos os templates sem filtro
  const filteredTemplates = sampleTemplates;

  // Obter textos localizados com fallback para pt-BR
  const localizedTexts = portfolioTexts[locale as keyof typeof portfolioTexts] || portfolioTexts['pt-BR'];

  // Função para abrir o modal com o template selecionado
  const openTemplateModal = (template: Template) => {
    setSelectedTemplate(template);
    setModalOpen(true);
  };

  return (
    <Box
      id="portfolio"
      style={{
        padding: '100px 0',
        background: 'linear-gradient(to bottom, #0a0a0a, #121212, #0a0a0a)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Efeito de estrelas estáticas no fundo */}
      <StarryBackgroundEffect />

      <Container size="xl">
        {/* Cabeçalho da seção com estilo aprimorado */}
        <Box mb={80} style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <Badge
            variant="gradient"
            gradient={{ from: 'rgba(118,65,192,0.8)', to: 'rgba(153,105,229,0.8)', deg: 135 }}
            size="lg"
            radius="sm"
            mb="md"
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              border: '1px solid rgba(153,105,229,0.3)',
              boxShadow: '0 5px 15px rgba(118,65,192,0.2)',
            }}
          >
            {localizedTexts.badge}
          </Badge>

          <Title
            order={2}
            size={48}
            fw={800}
            mb={20}
            style={{
              background: 'linear-gradient(135deg, #7641C0, #9969E5, #B28DFF)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
              textShadow: '0 2px 10px rgba(118, 65, 192, 0.3)',
              letterSpacing: '-0.5px',
            }}
          >
            {localizedTexts.title}{' '}
            <span style={{
              color: 'white',
              WebkitTextFillColor: 'white',
              textShadow: '0 2px 10px rgba(255, 255, 255, 0.2)'
            }}>
              {localizedTexts.titleHighlight}
            </span>
          </Title>

          <Text
            size="xl"
            c="dimmed"
            maw={800}
            mx="auto"
            style={{
              fontSize: '18px',
              lineHeight: 1.7,
              textShadow: '0 1px 2px rgba(0,0,0,0.5)',
              color: 'rgba(255,255,255,0.8)',
            }}
          >
            {localizedTexts.description}
          </Text>
        </Box>

        {/* Grid de templates com cards sólidos */}
        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3 }}
          spacing="xl"
          style={{ position: 'relative', zIndex: 2 }}
        >
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              padding="lg"
              radius="md"
              style={{
                backgroundColor: '#121212',
                border: '1px solid rgba(153, 105, 229, 0.2)',
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              shadow="md"
              withBorder
              className="template-card"
            >
              {/* Imagem do template */}
              <Card.Section>
                <Box style={{ position: 'relative', paddingTop: '60%' }}>
                  <Image
                    src={template.image}
                    alt={template.title[locale as keyof typeof template.title] || template.title['pt-BR']}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      backgroundColor: '#0a0a0a',
                    }}
                  />

                  {/* Badge de categoria */}
                  <Badge
                    variant="filled"
                    radius="sm"
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      background: 'linear-gradient(135deg, rgba(118,65,192,0.8), rgba(153,105,229,0.8))',
                      border: '1px solid rgba(153,105,229,0.3)',
                    }}
                  >
                    {template.category}
                  </Badge>
                </Box>
              </Card.Section>

              {/* Conteúdo do card */}
              <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 8px' }}>
                <Title order={4} mb="xs" style={{ fontSize: '20px' }}>
                  {template.title[locale as keyof typeof template.title] || template.title['pt-BR']}
                </Title>

                <Text size="sm" c="dimmed" mb="md" lineClamp={3} style={{ flex: 1 }}>
                  {template.description[locale as keyof typeof template.description] || template.description['pt-BR']}
                </Text>

                <Group mt="auto" style={{ display: 'flex', gap: '8px' }}>
                  <Button
                    variant="light"
                    color="purple.4"
                    size="sm"
                    style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}
                    onClick={() => openTemplateModal(template)}
                  >
                    <IconEye size={16} />
                    {localizedTexts.viewDetails}
                  </Button>

                  <Button
                    variant="gradient"
                    gradient={{ from: 'rgba(118,65,192,0.9)', to: 'rgba(153,105,229,0.9)', deg: 135 }}
                    size="sm"
                    component="a"
                    href={`/${locale}/orcamento?type=${template.category}`}
                    style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    {localizedTexts.requestQuote}
                    <IconArrowRight size={16} />
                  </Button>
                </Group>
              </Box>
            </Card>
          ))}
        </SimpleGrid>
      </Container>

      {/* Modal de detalhes do template */}
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        size="xl"
        title={
          <Title order={3} style={{
            fontSize: '24px',
            background: 'linear-gradient(135deg, #7641C0, #9969E5)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
          }}>
            {selectedTemplate?.title[locale as keyof typeof selectedTemplate.title] || ''}
          </Title>
        }
        styles={{
          header: {
            backgroundColor: '#121212',
            borderBottom: '1px solid rgba(153, 105, 229, 0.2)',
          },
          content: {
            backgroundColor: '#121212',
          },
          body: {
            padding: '20px',
          },
          close: {
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(153, 105, 229, 0.2)',
            },
          },
        }}
        overlayProps={{
          color: '#000',
          opacity: 0.7,
          blur: 3,
        }}
        centered
      >
        {selectedTemplate && (
          <Box>
            {/* Tabs para alternar entre prévia e informações */}
            <Tabs
              defaultValue="preview"
              style={{
                borderBottom: '1px solid rgba(153, 105, 229, 0.2)',
                marginBottom: '20px',
              }}
            >
              <Tabs.List>
                <Tabs.Tab value="preview">
                  <Box style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <IconEye size={16} />
                    <span>{localizedTexts.preview}</span>
                  </Box>
                </Tabs.Tab>
                <Tabs.Tab value="info">
                  <Box style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <IconDeviceDesktop size={16} />
                    <span>{localizedTexts.information}</span>
                  </Box>
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="preview" pt="md">
                {/* Galeria de imagens */}
                {selectedTemplate.previewImages && selectedTemplate.previewImages.length > 0 ? (
                  <Box>
                    {/* Componente de galeria */}
                    <TemplateGallery
                      images={selectedTemplate.previewImages}
                      locale={locale}
                      localizedTexts={localizedTexts}
                    />


                  </Box>
                ) : (
                  <Box
                    style={{
                      padding: '40px 20px',
                      textAlign: 'center',
                      border: '1px dashed rgba(153, 105, 229, 0.3)',
                      borderRadius: '8px',
                    }}
                  >
                    <Text c="dimmed">
                      Prévia não disponível para este template.
                    </Text>
                  </Box>
                )}
              </Tabs.Panel>

              <Tabs.Panel value="info" pt="md">
                {/* Informações do template */}
                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                  <Box>
                    <Title order={4} mb="md" style={{ color: 'white' }}>
                      {localizedTexts.description}
                    </Title>
                    <Text style={{ lineHeight: 1.7, color: 'rgba(255,255,255,0.8)' }}>
                      {selectedTemplate.description[locale as keyof typeof selectedTemplate.description] || ''}
                    </Text>

                    <Divider my="xl" color="rgba(153, 105, 229, 0.2)" />

                    <Title order={4} mb="md" style={{ color: 'white' }}>
                      {localizedTexts.features}
                    </Title>
                    <Box>
                      {selectedTemplate.features && selectedTemplate.features[locale as keyof typeof selectedTemplate.features]?.map((feature, index) => (
                        <Box
                          key={index}
                          mb="sm"
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '10px'
                          }}
                        >
                          <Box
                            style={{
                              minWidth: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, #7641C0, #9969E5)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              color: 'white',
                              marginTop: '3px',
                            }}
                          >
                            ✓
                          </Box>
                          <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
                            {feature}
                          </Text>
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  <Box>
                    <Title order={4} mb="md" style={{ color: 'white' }}>
                      {localizedTexts.details}
                    </Title>

                    <Box mb="md">
                      <Text fw={600} style={{ color: 'white' }}>
                        {localizedTexts.category}:
                      </Text>
                      <Badge
                        variant="gradient"
                        gradient={{ from: 'rgba(118,65,192,0.8)', to: 'rgba(153,105,229,0.8)', deg: 135 }}
                        size="lg"
                        radius="sm"
                        mt="xs"
                      >
                        {selectedTemplate.category}
                      </Badge>
                    </Box>

                    <Box mb="md">
                      <Text fw={600} style={{ color: 'white' }}>
                        {localizedTexts.suitableFor}:
                      </Text>
                      <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
                        {selectedTemplate.suitableFor && selectedTemplate.suitableFor[locale as keyof typeof selectedTemplate.suitableFor]}
                      </Text>
                    </Box>

                    <Box mb="md">
                      <Text fw={600} style={{ color: 'white' }}>
                        {localizedTexts.deliveryTime}:
                      </Text>
                      <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
                        {selectedTemplate.deliveryTime && selectedTemplate.deliveryTime[locale as keyof typeof selectedTemplate.deliveryTime]}
                      </Text>
                    </Box>

                    <Divider my="xl" color="rgba(153, 105, 229, 0.2)" />

                    <Button
                      fullWidth
                      size="lg"
                      variant="gradient"
                      gradient={{ from: 'rgba(118,65,192,0.9)', to: 'rgba(153,105,229,0.9)', deg: 135 }}
                      component="a"
                      href={`/${locale}/orcamento?type=${selectedTemplate.category}`}
                      style={{
                        marginTop: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}
                    >
                      {localizedTexts.requestQuote}
                      <IconArrowRight size={18} />
                    </Button>
                  </Box>
                </SimpleGrid>
              </Tabs.Panel>
            </Tabs>
          </Box>
        )}
      </Modal>
    </Box>
  );
}

export default PortfolioSection;

