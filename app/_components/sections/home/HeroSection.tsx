'use client';

import { useRef } from 'react';
import { usePathname } from 'next/navigation';
import {
  Text,
  Stack,
  Box,
  SimpleGrid,
  rem,
  Container,
  ThemeIcon
} from '@mantine/core';
import { IconArrowRight, IconCheck, IconDeviceDesktop, IconShoppingCart, IconArticle } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { ParallaxEffect } from '@/app/_components/effects/ParallaxEffect';
import GradientText from '@/app/_components/ui/gradient-text';
import { TechButton } from '@/app/_components/effects/TechButton';
import { BlackHoleEffect } from '@/app/_components/effects/BlackHoleEffect';
import { WebsiteTransformationVisual } from './components/WebsiteTransformationVisual';

// Define proper types for motion components
const MotionBox = motion.div;
const MotionText = motion.p;
const MotionGroup = motion.div;
const MotionBadge = motion.div;
const MotionFlex = motion.div;

export function HeroSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'pt-BR';

  // Textos do hero
  const heroTexts = {
    'pt-BR': {
      badge: 'Websites Profissionais',
      title: 'Seu Site Profissional, Sem Complicação',
      description: 'Criação de sites sob demanda com agilidade, design moderno e foco no seu negócio.',
      cta: 'Solicitar Orçamento',
      examples: 'Ver Exemplos',
      projects: '+100 Projetos Entregues',
      support: 'Suporte 24/7',
      delivery: 'Entrega Rápida'
    },
    'en': {
      badge: 'Professional Websites',
      title: 'Your Professional Website, Without Complications',
      description: 'On-demand website creation with agility, modern design and focus on your business.',
      cta: 'Request Quote',
      examples: 'See Examples',
      projects: '+100 Delivered Projects',
      support: '24/7 Support',
      delivery: 'Fast Delivery'
    },
    'fr': {
      badge: 'Sites Web Professionnels',
      title: 'Votre Site Web Professionnel, Sans Complications',
      description: 'Création de sites web à la demande avec agilité, design moderne et focus sur votre entreprise.',
      cta: 'Demander un Devis',
      examples: 'Voir Exemples',
      projects: '+100 Projets Livrés',
      support: 'Support 24/7',
      delivery: 'Livraison Rapide'
    }
  };

  // Textos dos serviços
  const servicesTexts = {
    'pt-BR': {
      landing: {
        title: 'Landing Pages',
        description: 'Páginas de alta conversão para captar leads e clientes.'
      },
      ecommerce: {
        title: 'E-commerce',
        description: 'Lojas online completas com pagamento integrado.'
      },
      corporate: {
        title: 'Sites Corporativos',
        description: 'Websites profissionais para empresas de todos os tamanhos.'
      }
    },
    'en': {
      landing: {
        title: 'Landing Pages',
        description: 'High-conversion pages to capture leads and customers.'
      },
      ecommerce: {
        title: 'E-commerce',
        description: 'Complete online stores with integrated payment.'
      },
      corporate: {
        title: 'Corporate Websites',
        description: 'Professional websites for companies of all sizes.'
      }
    },
    'fr': {
      landing: {
        title: 'Pages d\'Atterrissage',
        description: 'Pages à haute conversion pour capturer des leads et des clients.'
      },
      ecommerce: {
        title: 'E-commerce',
        description: 'Boutiques en ligne complètes avec paiement intégré.'
      },
      corporate: {
        title: 'Sites Web d\'Entreprise',
        description: 'Sites web professionnels pour entreprises de toutes tailles.'
      }
    }
  };

  const heroT = heroTexts[locale as keyof typeof heroTexts] || heroTexts['pt-BR'];
  const servicesT = servicesTexts[locale as keyof typeof servicesTexts] || servicesTexts['pt-BR'];

  return (
    <Box
      style={{
        background: 'linear-gradient(180deg, #0A0A0A 0%, #111111 100%)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '100px',
        paddingBottom: '100px',
      }}
    >
      {/* Black Hole Effect Background */}
      <BlackHoleEffect />

      <Container size="xl" style={{ position: 'relative', zIndex: 1 }}>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={50} style={{ alignItems: 'center' }}>
          {/* Left Column - Text Content */}
          <Stack justify="center" gap="xl" ref={targetRef}>
            <MotionBadge
              style={{
                width: 'fit-content',
                background: 'linear-gradient(90deg, rgba(118,65,192,0.8), rgba(153,105,229,0.8))',
                padding: '4px 12px',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 500,
                color: 'white'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {heroT.badge}
            </MotionBadge>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <GradientText
                text={heroT.title}
                fontSize="3.5rem"
                fontWeight={800}
                gradientColors={['#C4A9FF', '#9969E5', '#7641C0', '#5D00FF']}
                gradientDirection="90deg"
                textShadowColor="transparent"
                textShadowBlur="0px"
                animationDelay={0.4}
                glowEffect={false}
                textStroke={false}
              />
            </MotionBox>

            <MotionText
              style={{
                fontSize: '1.25rem',
                color: 'white',
                fontWeight: 500,
                textShadow: '0 0 10px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {heroT.description}
            </MotionText>

            <MotionGroup
              style={{
                marginTop: '1rem',
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <TechButton
                component="a"
                href="/orcamento"
                size="xl"
                radius="xl"
                variant="gradient"
                gradientColors={['#7641C0', '#9969E5']}
                rightSection={
                  <Box style={{ transform: 'translateX(-4px)' }}>
                    <IconArrowRight size={20} />
                  </Box>
                }
                glowColor="rgba(118,65,192,0.6)"
                glowIntensity={0.8}
                hoverScale={1.05}
                pulseEffect={false}
                style={{
                  padding: '0 32px',
                  height: rem(56),
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {heroT.cta}
              </TechButton>

              <TechButton
                component="a"
                href="/#portfolio"
                size="xl"
                radius="xl"
                variant="outline"
                glowColor="rgba(118,65,192,0.4)"
                style={{
                  padding: '0 32px',
                  height: rem(56),
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                  borderColor: 'rgba(255,255,255,0.1)',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderColor: 'rgba(118,65,192,0.5)',
                  }
                }}
              >
                {heroT.examples}
              </TechButton>
            </MotionGroup>

            {/* Trust Indicators */}
            <MotionFlex
              style={{
                display: 'flex',
                gap: '1rem',
                marginTop: '2rem',
                flexWrap: 'wrap'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Box style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.05)',
                padding: '8px 16px',
                borderRadius: '8px'
              }}>
                <ThemeIcon
                  variant="light"
                  color="purple"
                  size="md"
                  radius="xl"
                >
                  <IconCheck size={14} />
                </ThemeIcon>
                <Text size="sm" c="gray.3">{heroT.projects}</Text>
              </Box>

              <Box style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.05)',
                padding: '8px 16px',
                borderRadius: '8px'
              }}>
                <ThemeIcon
                  variant="light"
                  color="purple"
                  size="md"
                  radius="xl"
                >
                  <IconCheck size={14} />
                </ThemeIcon>
                <Text size="sm" c="gray.3">{heroT.support}</Text>
              </Box>

              <Box style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.05)',
                padding: '8px 16px',
                borderRadius: '8px'
              }}>
                <ThemeIcon
                  variant="light"
                  color="purple"
                  size="md"
                  radius="xl"
                >
                  <IconCheck size={14} />
                </ThemeIcon>
                <Text size="sm" c="gray.3">{heroT.delivery}</Text>
              </Box>
            </MotionFlex>
          </Stack>

          {/* Right Column - Visual */}
          <ParallaxEffect
            speed={0.05}
            direction="up"
            style={{ position: 'relative', width: '100%', zIndex: 1 }}
          >
            <MotionBox
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <WebsiteTransformationVisual />
            </MotionBox>
          </ParallaxEffect>
        </SimpleGrid>

        {/* Service Types */}
        <MotionBox
          style={{ marginTop: '80px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl">
            <Box style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(118,65,192,0.2)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 30px rgba(118,65,192,0.2)',
                border: '1px solid rgba(118,65,192,0.4)',
              }
            }}>
              <ThemeIcon
                size={60}
                radius="md"
                variant="gradient"
                gradient={{ from: 'rgba(118,65,192,0.8)', to: 'rgba(153,105,229,0.8)' }}
                mb="md"
              >
                <IconDeviceDesktop size={30} />
              </ThemeIcon>
              <Text fw={700} size="lg" c="white" mb="xs">{servicesT.landing.title}</Text>
              <Text c="gray.4" size="sm">
                {servicesT.landing.description}
              </Text>
            </Box>

            <Box style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(118,65,192,0.2)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 30px rgba(118,65,192,0.2)',
                border: '1px solid rgba(118,65,192,0.4)',
              }
            }}>
              <ThemeIcon
                size={60}
                radius="md"
                variant="gradient"
                gradient={{ from: 'rgba(118,65,192,0.8)', to: 'rgba(153,105,229,0.8)' }}
                mb="md"
              >
                <IconShoppingCart size={30} />
              </ThemeIcon>
              <Text fw={700} size="lg" c="white" mb="xs">{servicesT.ecommerce.title}</Text>
              <Text c="gray.4" size="sm">
                {servicesT.ecommerce.description}
              </Text>
            </Box>

            <Box style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(118,65,192,0.2)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 30px rgba(118,65,192,0.2)',
                border: '1px solid rgba(118,65,192,0.4)',
              }
            }}>
              <ThemeIcon
                size={60}
                radius="md"
                variant="gradient"
                gradient={{ from: 'rgba(118,65,192,0.8)', to: 'rgba(153,105,229,0.8)' }}
                mb="md"
              >
                <IconArticle size={30} />
              </ThemeIcon>
              <Text fw={700} size="lg" c="white" mb="xs">{servicesT.corporate.title}</Text>
              <Text c="gray.4" size="sm">
                {servicesT.corporate.description}
              </Text>
            </Box>
          </SimpleGrid>
        </MotionBox>
      </Container>
    </Box>
  );
}
