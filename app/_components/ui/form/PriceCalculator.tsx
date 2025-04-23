'use client';

import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { Box, Title, Text, Paper, Slider, Group, Badge, Checkbox, Divider, Stack, ThemeIcon, SimpleGrid, Select } from '@mantine/core';
import { IconCalculator, IconCoin, IconDeviceDesktop, IconPlus, IconMinus, IconInfoCircle } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { usePriceContext } from './PriceContext';
import PriceDisplay from './PriceDisplay';

const MotionPaper = motion(Paper);
const MotionBox = motion.div;

// Preços base por tipo de site (em BRL)
const BASE_PRICES = {
  landing: 3000,
  corporate: 6000,
  ecommerce: 12000,
  custom: 8000,
};

// Multiplicadores para diferentes moedas
const CURRENCY_MULTIPLIERS = {
  'pt-BR': { symbol: 'R$', multiplier: 1 },
  'en': { symbol: '$', multiplier: 1/5 }, // Convertendo de BRL para USD (aproximado)
  'fr': { symbol: 'CHF', multiplier: 1/5 }, // Convertendo de BRL para CHF (aproximado)
};

// Preços de funcionalidades adicionais (em BRL)
const FEATURE_PRICES = {
  // Essenciais
  seo: 800,                // Otimização para SEO
  responsive: 1200,        // Design Responsivo
  forms: 1000,             // Formulários Avançados
  analytics: 800,          // Analytics Avançado

  // Conteúdo & Interação
  blog: 2500,              // Blog Integrado
  gallery: 1000,           // Galeria de imagens/vídeos
  search: 1200,            // Sistema de busca avançado
  chat: 1500,              // Chat ao vivo
  newsletter: 800,         // Sistema de newsletter

  // Funcionalidades Avançadas
  admin: 3000,             // Painel Administrativo
  multilanguage: 2000,     // Múltiplos Idiomas
  payment: 2500,           // Integração de Pagamentos
  membership: 3500,        // Área de membros/login
  booking: 2800,           // Sistema de reservas/agendamento

  // Integrações & Segurança
  social: 1200,            // Integração com redes sociais
  maps: 600,               // Integração com mapas
  security: 1500,          // Segurança Reforçada
  maintenance: 1000,       // Plano de Manutenção

  // Novas funcionalidades
  animation: 1800,         // Animações e efeitos visuais
  video: 2200,             // Integração de vídeo/streaming
  crm: 3500,               // Integração com CRM
  inventory: 2800,         // Gerenciamento de estoque
  subscription: 3200,      // Sistema de assinaturas
  reviews: 1500,           // Sistema de avaliações/reviews
  wishlist: 1200,          // Lista de desejos
  comparison: 1800,        // Comparação de produtos
  affiliate: 2500,         // Programa de afiliados
  sms: 1200,               // Notificações por SMS
  pwa: 3000,               // Progressive Web App
  api: 3500,               // API para integrações externas
  ai: 4500,                // Recursos de IA/recomendações
  ar: 5000,                // Realidade aumentada
  analytics_advanced: 2200, // Analytics avançado com dashboards
  ab_testing: 2800,        // Testes A/B
  heatmaps: 1800,          // Mapas de calor e análise de comportamento
};

// Multiplicadores de complexidade
const COMPLEXITY_MULTIPLIERS = {
  low: 0.8,
  medium: 1.0,
  high: 1.3,
  enterprise: 1.6,
};

// Multiplicadores de prazo
const TIMELINE_MULTIPLIERS = {
  urgent: 1.3, // 1-2 semanas
  normal: 1.0, // 3-4 semanas
  relaxed: 0.9, // 1-2 meses
  flexible: 0.85, // Flexível
};

// Traduções
const calculatorTexts = {
  'pt-BR': {
    title: 'Calculadora de Orçamento',
    subtitle: 'Estime o valor do seu projeto',
    basePrice: 'Preço base',
    features: 'Funcionalidades',
    complexity: 'Complexidade',
    timeline: 'Prazo',
    totalEstimate: 'Estimativa Total',
    disclaimer: 'Esta é apenas uma estimativa. O valor final pode variar conforme requisitos específicos.',
    websiteType: 'Tipo de Website',
    featureCategories: {
      essential: 'Essenciais',
      content: 'Conteúdo & Interação',
      advanced: 'Funcionalidades Avançadas',
      integration: 'Integrações & Segurança',
      ecommerce: 'E-commerce',
      marketing: 'Marketing & Conversão',
      performance: 'Performance & Experiência'
    },
    complexityLevels: {
      low: 'Baixa',
      medium: 'Média',
      high: 'Alta',
      enterprise: 'Empresarial'
    },
    timelineOptions: {
      urgent: '1-2 semanas (urgente)',
      normal: '3-4 semanas',
      relaxed: '1-2 meses',
      flexible: 'Flexível'
    },
    featureLabels: {
      // Essenciais
      seo: 'Otimização para SEO',
      responsive: 'Design Responsivo',
      forms: 'Formulários Avançados',
      analytics: 'Analytics Básico',

      // Conteúdo & Interação
      blog: 'Blog Integrado',
      gallery: 'Galeria de Imagens/Vídeos',
      search: 'Sistema de Busca',
      chat: 'Chat ao Vivo',
      newsletter: 'Sistema de Newsletter',

      // Funcionalidades Avançadas
      admin: 'Painel Administrativo',
      multilanguage: 'Múltiplos Idiomas',
      payment: 'Integração de Pagamentos',
      membership: 'Área de Membros',
      booking: 'Sistema de Reservas',

      // Integrações & Segurança
      social: 'Integração com Redes Sociais',
      maps: 'Integração com Mapas',
      security: 'Segurança Reforçada',
      maintenance: 'Plano de Manutenção',

      // Novas funcionalidades
      animation: 'Animações e Efeitos Visuais',
      video: 'Integração de Vídeo/Streaming',
      crm: 'Integração com CRM',
      inventory: 'Gerenciamento de Estoque',
      subscription: 'Sistema de Assinaturas',
      reviews: 'Sistema de Avaliações',
      wishlist: 'Lista de Desejos',
      comparison: 'Comparação de Produtos',
      affiliate: 'Programa de Afiliados',
      sms: 'Notificações por SMS',
      pwa: 'Progressive Web App',
      api: 'API para Integrações',
      ai: 'Recursos de IA/Recomendações',
      ar: 'Realidade Aumentada',
      analytics_advanced: 'Analytics Avançado com Dashboards',
      ab_testing: 'Testes A/B',
      heatmaps: 'Mapas de Calor e Análise de Comportamento'
    }
  },
  'en': {
    title: 'Budget Calculator',
    subtitle: 'Estimate your project cost',
    basePrice: 'Base Price',
    features: 'Features',
    complexity: 'Complexity',
    timeline: 'Timeline',
    totalEstimate: 'Total Estimate',
    disclaimer: 'This is just an estimate. The final price may vary according to specific requirements.',
    websiteType: 'Website Type',
    featureCategories: {
      essential: 'Essential',
      content: 'Content & Interaction',
      advanced: 'Advanced Features',
      integration: 'Integrations & Security',
      ecommerce: 'E-commerce',
      marketing: 'Marketing & Conversion',
      performance: 'Performance & Experience'
    },
    complexityLevels: {
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      enterprise: 'Enterprise'
    },
    timelineOptions: {
      urgent: '1-2 weeks (urgent)',
      normal: '3-4 weeks',
      relaxed: '1-2 months',
      flexible: 'Flexible'
    },
    featureLabels: {
      // Essential
      seo: 'SEO Optimization',
      responsive: 'Responsive Design',
      forms: 'Advanced Forms',
      analytics: 'Basic Analytics',

      // Content & Interaction
      blog: 'Integrated Blog',
      gallery: 'Image/Video Gallery',
      search: 'Search System',
      chat: 'Live Chat',
      newsletter: 'Newsletter System',

      // Advanced Features
      admin: 'Admin Dashboard',
      multilanguage: 'Multiple Languages',
      payment: 'Payment Integration',
      membership: 'Membership Area',
      booking: 'Booking/Reservation System',

      // Integrations & Security
      social: 'Social Media Integration',
      maps: 'Maps Integration',
      security: 'Enhanced Security',
      maintenance: 'Maintenance Plan',

      // New features
      animation: 'Animations and Visual Effects',
      video: 'Video/Streaming Integration',
      crm: 'CRM Integration',
      inventory: 'Inventory Management',
      subscription: 'Subscription System',
      reviews: 'Reviews System',
      wishlist: 'Wishlist',
      comparison: 'Product Comparison',
      affiliate: 'Affiliate Program',
      sms: 'SMS Notifications',
      pwa: 'Progressive Web App',
      api: 'API for Integrations',
      ai: 'AI/Recommendation Features',
      ar: 'Augmented Reality',
      analytics_advanced: 'Advanced Analytics with Dashboards',
      ab_testing: 'A/B Testing',
      heatmaps: 'Heatmaps and Behavior Analysis'
    }
  },
  'fr': {
    title: 'Calculateur de Budget',
    subtitle: 'Estimez le coût de votre projet',
    basePrice: 'Prix de Base',
    features: 'Fonctionnalités',
    complexity: 'Complexité',
    timeline: 'Délai',
    totalEstimate: 'Estimation Totale',
    disclaimer: 'Ceci est seulement une estimation. Le prix final peut varier selon les exigences spécifiques.',
    websiteType: 'Type de Site Web',
    featureCategories: {
      essential: 'Essentielles',
      content: 'Contenu & Interaction',
      advanced: 'Fonctionnalités Avancées',
      integration: 'Intégrations & Sécurité',
      ecommerce: 'E-commerce',
      marketing: 'Marketing & Conversion',
      performance: 'Performance & Expérience'
    },
    complexityLevels: {
      low: 'Faible',
      medium: 'Moyenne',
      high: 'Élevée',
      enterprise: 'Entreprise'
    },
    timelineOptions: {
      urgent: '1-2 semaines (urgent)',
      normal: '3-4 semaines',
      relaxed: '1-2 mois',
      flexible: 'Flexible'
    },
    featureLabels: {
      // Essentielles
      seo: 'Optimisation SEO',
      responsive: 'Design Responsive',
      forms: 'Formulaires Avancés',
      analytics: 'Analytique de Base',

      // Contenu & Interaction
      blog: 'Blog Intégré',
      gallery: 'Galerie d\'Images/Vidéos',
      search: 'Système de Recherche',
      chat: 'Chat en Direct',
      newsletter: 'Système de Newsletter',

      // Fonctionnalités Avancées
      admin: 'Tableau de Bord Admin',
      multilanguage: 'Langues Multiples',
      payment: 'Intégration de Paiement',
      membership: 'Espace Membres',
      booking: 'Système de Réservation',

      // Intégrations & Sécurité
      social: 'Intégration des Réseaux Sociaux',
      maps: 'Intégration de Cartes',
      security: 'Sécurité Renforcée',
      maintenance: 'Plan de Maintenance',

      // Nouvelles fonctionnalités
      animation: 'Animations et Effets Visuels',
      video: 'Intégration Vidéo/Streaming',
      crm: 'Intégration CRM',
      inventory: 'Gestion des Stocks',
      subscription: 'Système d\'Abonnement',
      reviews: 'Système d\'Avis',
      wishlist: 'Liste de Souhaits',
      comparison: 'Comparaison de Produits',
      affiliate: 'Programme d\'Affiliation',
      sms: 'Notifications SMS',
      pwa: 'Application Web Progressive',
      api: 'API pour Intégrations',
      ai: 'Fonctionnalités IA/Recommandations',
      ar: 'Réalité Augmentée',
      analytics_advanced: 'Analytique Avancée avec Tableaux de Bord',
      ab_testing: 'Tests A/B',
      heatmaps: 'Cartes Thermiques et Analyse de Comportement'
    }
  }
};

interface PriceCalculatorProps {
  onPriceChange?: (price: number) => void;
  onFeaturesChange?: (features: string[]) => void;
  onWebsiteTypeChange?: (type: string) => void;
  onComplexityChange?: (complexity: string) => void;
  onTimelineChange?: (timeline: string) => void;
  initialWebsiteType?: string;
  initialFeatures?: string[];
  initialComplexity?: string;
  initialTimeline?: string;
}

function PriceCalculatorComponent({
  onPriceChange,
  onFeaturesChange,
  onWebsiteTypeChange,
  onComplexityChange,
  onTimelineChange,
  initialWebsiteType = '',
  initialFeatures = [],
  initialComplexity = 'medium',
  initialTimeline = 'normal'
}: PriceCalculatorProps) {
  // Obter o idioma atual
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'pt-BR';

  // Obter os textos traduzidos
  const t = calculatorTexts[locale as keyof typeof calculatorTexts] || calculatorTexts['pt-BR'];

  // Usando useRef para armazenar valores anteriores e evitar loops infinitos
  const prevFeatures = useRef<string[]>([]);
  const prevWebsiteType = useRef<string>('');
  const prevComplexity = useRef<string>('medium');
  const prevTimeline = useRef<string>('normal');
  const prevPrice = useRef<number>(0);

  // Estados para os parâmetros de cálculo
  const [websiteType, setWebsiteType] = useState<string>(initialWebsiteType || '');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(initialFeatures || []);
  const [complexity, setComplexity] = useState<string>(initialComplexity || 'medium');
  const [timeline, setTimeline] = useState<string>(initialTimeline || 'normal');
  // Usar o contexto de preço em vez de estado local
  const { updatePrice, formatPrice } = usePriceContext();

  // Inicializar os refs com os valores iniciais
  useEffect(() => {
    prevFeatures.current = [...(initialFeatures || [])];
    prevWebsiteType.current = initialWebsiteType || '';
    prevComplexity.current = initialComplexity || 'medium';
    prevTimeline.current = initialTimeline || 'normal';
  }, [initialFeatures, initialWebsiteType, initialComplexity, initialTimeline]);

  // Removido a função formatPrice, agora fornecida pelo contexto

  // Calcular o preço total

  useEffect(() => {
    if (!websiteType) {
      if (prevPrice.current !== 0) {
        prevPrice.current = 0;
        updatePrice(0);
        if (onPriceChange) {
          onPriceChange(0);
        }
      }
      return;
    }

    // Preço base do tipo de site
    let price = BASE_PRICES[websiteType as keyof typeof BASE_PRICES] || 0;

    // Adicionar preço das funcionalidades selecionadas
    selectedFeatures.forEach(feature => {
      price += FEATURE_PRICES[feature as keyof typeof FEATURE_PRICES] || 0;
    });

    // Aplicar multiplicador de complexidade
    price *= COMPLEXITY_MULTIPLIERS[complexity as keyof typeof COMPLEXITY_MULTIPLIERS] || 1;

    // Aplicar multiplicador de prazo
    price *= TIMELINE_MULTIPLIERS[timeline as keyof typeof TIMELINE_MULTIPLIERS] || 1;

    // Arredondar para o múltiplo de 100 mais próximo
    price = Math.ceil(price / 100) * 100;

    // Verificar se o preço realmente mudou para evitar loops
    if (price !== prevPrice.current) {
      prevPrice.current = price;
      updatePrice(price);

      // Notificar o componente pai sobre a mudança de preço
      if (onPriceChange) {
        onPriceChange(price);
      }
    }
  }, [websiteType, selectedFeatures, complexity, timeline, onPriceChange, updatePrice]);

  // Notificar o componente pai sobre mudanças nos parâmetros

  useEffect(() => {
    // Verificar se os valores realmente mudaram para evitar loops
    if (JSON.stringify(prevFeatures.current) !== JSON.stringify(selectedFeatures)) {
      prevFeatures.current = [...selectedFeatures];
      if (onFeaturesChange) {
        onFeaturesChange(selectedFeatures);
      }
    }
  }, [selectedFeatures, onFeaturesChange]);

  useEffect(() => {
    if (prevWebsiteType.current !== websiteType) {
      prevWebsiteType.current = websiteType;
      if (onWebsiteTypeChange) {
        onWebsiteTypeChange(websiteType);
      }
    }
  }, [websiteType, onWebsiteTypeChange]);

  useEffect(() => {
    if (prevComplexity.current !== complexity) {
      prevComplexity.current = complexity;
      if (onComplexityChange) {
        onComplexityChange(complexity);
      }
    }
  }, [complexity, onComplexityChange]);

  useEffect(() => {
    if (prevTimeline.current !== timeline) {
      prevTimeline.current = timeline;
      if (onTimelineChange) {
        onTimelineChange(timeline);
      }
    }
  }, [timeline, onTimelineChange]);

  // Manipuladores de eventos - usando useCallback para evitar recriação em cada renderização
  const handleFeatureToggle = useCallback((feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  }, []);

  return (
    <MotionPaper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      shadow="md"
      radius="lg"
      p="xl"
      style={{
        background: 'linear-gradient(135deg, rgba(25,25,25,0.8), rgba(15,15,15,0.9))',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(153,105,229,0.2)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2), 0 0 15px rgba(118,65,192,0.1)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle gradient overlay */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(118,65,192,0.1) 0%, transparent 70%)',
          opacity: 0.1,
          zIndex: 0,
        }}
      />

      <Box style={{ position: 'relative', zIndex: 1 }}>
        <Group position="apart" mb="md">
          <Box>
            <Title order={3} fw={700} c="white" mb={5}>
              {t.title}
            </Title>
            <Text size="sm" c="gray.5">
              {t.subtitle}
            </Text>
          </Box>
          <ThemeIcon
            size={50}
            radius="md"
            variant="gradient"
            gradient={{ from: 'rgba(118,65,192,0.8)', to: 'rgba(153,105,229,0.8)' }}
          >
            <IconCalculator size={26} />
          </ThemeIcon>
        </Group>

        <Divider
          my="lg"
          color="rgba(153,105,229,0.3)"
        />

        {/* Tipo de Website */}
        <Box mb="xl">
          <Text fw={600} size="sm" c="white" mb="xs">
            {t.websiteType}
          </Text>
          <Select
            data={[
              { value: 'landing', label: 'Landing Page' },
              { value: 'corporate', label: locale === 'en' ? 'Corporate Website' : (locale === 'fr' ? 'Site Web d\'Entreprise' : 'Site Corporativo') },
              { value: 'ecommerce', label: 'E-commerce' },
              { value: 'custom', label: locale === 'en' ? 'Custom Project' : (locale === 'fr' ? 'Projet Personnalisé' : 'Projeto Personalizado') },
            ]}
            value={websiteType}
            onChange={(value) => setWebsiteType(value || '')}
            placeholder={t.websiteType}
            styles={{
              input: {
                backgroundColor: 'rgba(30, 30, 30, 0.6)',
                borderColor: 'rgba(153, 105, 229, 0.3)',
                color: 'white',
              },
              item: {
                '&[data-selected]': {
                  backgroundColor: 'rgba(118, 65, 192, 0.3)',
                },
                '&[data-hovered]': {
                  backgroundColor: 'rgba(118, 65, 192, 0.2)',
                },
              },
              dropdown: {
                backgroundColor: 'rgba(25, 25, 25, 0.95)',
                borderColor: 'rgba(153, 105, 229, 0.3)',
              },
            }}
          />
        </Box>

        {websiteType && (
          <>
            {/* Funcionalidades */}
            <Box mb="xl">
              <Text fw={600} size="sm" c="white" mb="xs">
                {t.features}
              </Text>

              {/* Categorias de funcionalidades */}
              <Box mb="md">
                <Text fw={500} size="xs" c="gray.5" mb="xs" style={{ textTransform: 'uppercase' }}>
                  {t.featureCategories.essential}
                </Text>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xs">
                  {['seo', 'responsive', 'forms', 'analytics'].map(feature => (
                    <Checkbox
                      key={feature}
                      label={
                        <Group spacing="xs">
                          <Text>{t.featureLabels[feature as keyof typeof t.featureLabels]}</Text>
                          <Badge
                            size="sm"
                            variant="filled"
                            color="purple.5"
                            style={{ opacity: 0.8 }}
                          >
                            +{formatPrice(FEATURE_PRICES[feature as keyof typeof FEATURE_PRICES], locale)}
                          </Badge>
                        </Group>
                      }
                      checked={selectedFeatures.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                      styles={{
                        label: { color: 'white', fontSize: '0.9rem' },
                        input: { cursor: 'pointer' },
                        icon: { color: 'rgba(153,105,229,1)' },
                      }}
                    />
                  ))}
                </SimpleGrid>
              </Box>

              <Box mb="md">
                <Text fw={500} size="xs" c="gray.5" mb="xs" style={{ textTransform: 'uppercase' }}>
                  {t.featureCategories.content}
                </Text>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xs">
                  {['blog', 'gallery', 'search', 'chat', 'newsletter', 'video'].map(feature => (
                    <Checkbox
                      key={feature}
                      label={
                        <Group spacing="xs">
                          <Text>{t.featureLabels[feature as keyof typeof t.featureLabels]}</Text>
                          <Badge
                            size="sm"
                            variant="filled"
                            color="purple.5"
                            style={{ opacity: 0.8 }}
                          >
                            +{formatPrice(FEATURE_PRICES[feature as keyof typeof FEATURE_PRICES], locale)}
                          </Badge>
                        </Group>
                      }
                      checked={selectedFeatures.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                      styles={{
                        label: { color: 'white', fontSize: '0.9rem' },
                        input: { cursor: 'pointer' },
                        icon: { color: 'rgba(153,105,229,1)' },
                      }}
                    />
                  ))}
                </SimpleGrid>
              </Box>

              <Box mb="md">
                <Text fw={500} size="xs" c="gray.5" mb="xs" style={{ textTransform: 'uppercase' }}>
                  {t.featureCategories.advanced}
                </Text>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xs">
                  {['admin', 'multilanguage', 'payment', 'membership', 'booking', 'api'].map(feature => (
                    <Checkbox
                      key={feature}
                      label={
                        <Group spacing="xs">
                          <Text>{t.featureLabels[feature as keyof typeof t.featureLabels]}</Text>
                          <Badge
                            size="sm"
                            variant="filled"
                            color="purple.5"
                            style={{ opacity: 0.8 }}
                          >
                            +{formatPrice(FEATURE_PRICES[feature as keyof typeof FEATURE_PRICES], locale)}
                          </Badge>
                        </Group>
                      }
                      checked={selectedFeatures.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                      styles={{
                        label: { color: 'white', fontSize: '0.9rem' },
                        input: { cursor: 'pointer' },
                        icon: { color: 'rgba(153,105,229,1)' },
                      }}
                    />
                  ))}
                </SimpleGrid>
              </Box>

              <Box mb="md">
                <Text fw={500} size="xs" c="gray.5" mb="xs" style={{ textTransform: 'uppercase' }}>
                  {t.featureCategories.integration}
                </Text>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xs">
                  {['social', 'maps', 'security', 'maintenance', 'crm'].map(feature => (
                    <Checkbox
                      key={feature}
                      label={
                        <Group spacing="xs">
                          <Text>{t.featureLabels[feature as keyof typeof t.featureLabels]}</Text>
                          <Badge
                            size="sm"
                            variant="filled"
                            color="purple.5"
                            style={{ opacity: 0.8 }}
                          >
                            +{formatPrice(FEATURE_PRICES[feature as keyof typeof FEATURE_PRICES], locale)}
                          </Badge>
                        </Group>
                      }
                      checked={selectedFeatures.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                      styles={{
                        label: { color: 'white', fontSize: '0.9rem' },
                        input: { cursor: 'pointer' },
                        icon: { color: 'rgba(153,105,229,1)' },
                      }}
                    />
                  ))}
                </SimpleGrid>
              </Box>

              {/* Categoria: E-commerce - Mostrar apenas para sites de e-commerce ou personalizados */}
              {(websiteType === 'ecommerce' || websiteType === 'custom') && (
                <Box mb="md">
                  <Text fw={500} size="xs" c="gray.5" mb="xs" style={{ textTransform: 'uppercase' }}>
                    {t.featureCategories.ecommerce}
                  </Text>
                  <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xs">
                    {['inventory', 'subscription', 'reviews', 'wishlist', 'comparison', 'affiliate'].map(feature => (
                      <Checkbox
                        key={feature}
                        label={
                          <Group spacing="xs">
                            <Text>{t.featureLabels[feature as keyof typeof t.featureLabels]}</Text>
                            <Badge
                              size="sm"
                              variant="filled"
                              color="purple.5"
                              style={{ opacity: 0.8 }}
                            >
                              +{formatPrice(FEATURE_PRICES[feature as keyof typeof FEATURE_PRICES], locale)}
                            </Badge>
                          </Group>
                        }
                        checked={selectedFeatures.includes(feature)}
                        onChange={() => handleFeatureToggle(feature)}
                        styles={{
                          label: { color: 'white', fontSize: '0.9rem' },
                          input: { cursor: 'pointer' },
                          icon: { color: 'rgba(153,105,229,1)' },
                        }}
                      />
                    ))}
                  </SimpleGrid>
                </Box>
              )}

              {/* Categoria: Marketing & Conversão */}
              <Box mb="md">
                <Text fw={500} size="xs" c="gray.5" mb="xs" style={{ textTransform: 'uppercase' }}>
                  {t.featureCategories.marketing}
                </Text>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xs">
                  {['sms', 'analytics_advanced', 'ab_testing', 'heatmaps'].map(feature => (
                    <Checkbox
                      key={feature}
                      label={
                        <Group spacing="xs">
                          <Text>{t.featureLabels[feature as keyof typeof t.featureLabels]}</Text>
                          <Badge
                            size="sm"
                            variant="filled"
                            color="purple.5"
                            style={{ opacity: 0.8 }}
                          >
                            +{formatPrice(FEATURE_PRICES[feature as keyof typeof FEATURE_PRICES], locale)}
                          </Badge>
                        </Group>
                      }
                      checked={selectedFeatures.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                      styles={{
                        label: { color: 'white', fontSize: '0.9rem' },
                        input: { cursor: 'pointer' },
                        icon: { color: 'rgba(153,105,229,1)' },
                      }}
                    />
                  ))}
                </SimpleGrid>
              </Box>

              {/* Categoria: Performance & Experiência */}
              <Box>
                <Text fw={500} size="xs" c="gray.5" mb="xs" style={{ textTransform: 'uppercase' }}>
                  {t.featureCategories.performance}
                </Text>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xs">
                  {['animation', 'pwa', 'ai'].map(feature => (
                    <Checkbox
                      key={feature}
                      label={
                        <Group spacing="xs">
                          <Text>{t.featureLabels[feature as keyof typeof t.featureLabels]}</Text>
                          <Badge
                            size="sm"
                            variant="filled"
                            color="purple.5"
                            style={{ opacity: 0.8 }}
                          >
                            +{formatPrice(FEATURE_PRICES[feature as keyof typeof FEATURE_PRICES], locale)}
                          </Badge>
                        </Group>
                      }
                      checked={selectedFeatures.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                      styles={{
                        label: { color: 'white', fontSize: '0.9rem' },
                        input: { cursor: 'pointer' },
                        icon: { color: 'rgba(153,105,229,1)' },
                      }}
                    />
                  ))}
                  {/* Mostrar realidade aumentada apenas para e-commerce */}
                  {websiteType === 'ecommerce' && (
                    <Checkbox
                      key="ar"
                      label={
                        <Group spacing="xs">
                          <Text>{t.featureLabels['ar']}</Text>
                          <Badge
                            size="sm"
                            variant="filled"
                            color="purple.5"
                            style={{ opacity: 0.8 }}
                          >
                            +{formatPrice(FEATURE_PRICES['ar'], locale)}
                          </Badge>
                        </Group>
                      }
                      checked={selectedFeatures.includes('ar')}
                      onChange={() => handleFeatureToggle('ar')}
                      styles={{
                        label: { color: 'white', fontSize: '0.9rem' },
                        input: { cursor: 'pointer' },
                        icon: { color: 'rgba(153,105,229,1)' },
                      }}
                    />
                  )}
                </SimpleGrid>
              </Box>
            </Box>

            {/* Complexidade */}
            <Box mb="xl">
              <Group position="apart">
                <Text fw={600} size="sm" c="white">
                  {t.complexity}
                </Text>
                <Badge
                  size="sm"
                  variant="filled"
                  color="purple.5"
                  style={{ opacity: 0.8 }}
                >
                  {complexity === 'low' && 'x0.8'}
                  {complexity === 'medium' && 'x1.0'}
                  {complexity === 'high' && 'x1.3'}
                  {complexity === 'enterprise' && 'x1.6'}
                </Badge>
              </Group>
              <Select
                data={[
                  { value: 'low', label: t.complexityLevels.low },
                  { value: 'medium', label: t.complexityLevels.medium },
                  { value: 'high', label: t.complexityLevels.high },
                  { value: 'enterprise', label: t.complexityLevels.enterprise },
                ]}
                value={complexity}
                onChange={(value) => setComplexity(value || 'medium')}
                styles={{
                  input: {
                    backgroundColor: 'rgba(30, 30, 30, 0.6)',
                    borderColor: 'rgba(153, 105, 229, 0.3)',
                    color: 'white',
                  },
                  item: {
                    '&[data-selected]': {
                      backgroundColor: 'rgba(118, 65, 192, 0.3)',
                    },
                    '&[data-hovered]': {
                      backgroundColor: 'rgba(118, 65, 192, 0.2)',
                    },
                  },
                  dropdown: {
                    backgroundColor: 'rgba(25, 25, 25, 0.95)',
                    borderColor: 'rgba(153, 105, 229, 0.3)',
                  },
                }}
              />
            </Box>

            {/* Prazo */}
            <Box mb="xl">
              <Group position="apart">
                <Text fw={600} size="sm" c="white">
                  {t.timeline}
                </Text>
                <Badge
                  size="sm"
                  variant="filled"
                  color="purple.5"
                  style={{ opacity: 0.8 }}
                >
                  {timeline === 'urgent' && 'x1.3'}
                  {timeline === 'normal' && 'x1.0'}
                  {timeline === 'relaxed' && 'x0.9'}
                  {timeline === 'flexible' && 'x0.85'}
                </Badge>
              </Group>
              <Select
                data={[
                  { value: 'urgent', label: t.timelineOptions.urgent },
                  { value: 'normal', label: t.timelineOptions.normal },
                  { value: 'relaxed', label: t.timelineOptions.relaxed },
                  { value: 'flexible', label: t.timelineOptions.flexible },
                ]}
                value={timeline}
                onChange={(value) => setTimeline(value || 'normal')}
                styles={{
                  input: {
                    backgroundColor: 'rgba(30, 30, 30, 0.6)',
                    borderColor: 'rgba(153, 105, 229, 0.3)',
                    color: 'white',
                  },
                  item: {
                    '&[data-selected]': {
                      backgroundColor: 'rgba(118, 65, 192, 0.3)',
                    },
                    '&[data-hovered]': {
                      backgroundColor: 'rgba(118, 65, 192, 0.2)',
                    },
                  },
                  dropdown: {
                    backgroundColor: 'rgba(25, 25, 25, 0.95)',
                    borderColor: 'rgba(153, 105, 229, 0.3)',
                  },
                }}
              />
            </Box>

            {/* Estimativa Total - Usando o componente isolado */}
            <PriceDisplay label={t.totalEstimate} />

            <Group mt="md" spacing="xs">
              <IconInfoCircle size={16} color="rgba(153,105,229,0.8)" />
              <Text size="xs" c="gray.5" style={{ fontStyle: 'italic' }}>
                {t.disclaimer}
              </Text>
            </Group>
          </>
        )}
      </Box>
    </MotionPaper>
  );
}

// Exportar o componente com memo para evitar re-renderizações desnecessárias
export const PriceCalculator = memo(PriceCalculatorComponent);
