'use client';

import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'next/navigation';
import {
  Text,
  Group,
  Stack,
  Box,
  SimpleGrid,
  rem,
  Container,
  Badge,
  Flex,
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
const MotionBox = motion.create(Box);
const MotionText = motion.create(Text);
const MotionGroup = motion.create(Group);
const MotionBadge = motion.create(Badge);
const MotionFlex = motion.create(Flex);

export function HeroSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation('common');
  const params = useParams();
  const lang = (params?.lang as string) || 'pt-BR';

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
              variant="gradient"
              gradient={{ from: 'rgba(118,65,192,0.8)', to: 'rgba(153,105,229,0.8)' }}
              size="lg"
              radius="sm"
              style={{ width: 'fit-content' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t('hero.badge') || 'Criação de Sites Profissionais'}
            </MotionBadge>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <GradientText
                text={t('hero.title') || "Sites Profissionais que Convertem Visitantes em Clientes"}
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
              size="xl"
              c="white"
              fw={500}
              style={{
                textShadow: '0 0 10px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t('hero.description') || "Do conceito ao site pronto em semanas, sem complicações. Desenvolvemos websites que impulsionam seu negócio com design impactante e tecnologia de ponta."}
            </MotionText>

            <MotionGroup
              mt="md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <TechButton
                component="a"
                href={`/${lang}/orcamento`}
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
                {t('hero.cta') || 'Solicitar Orçamento'}
              </TechButton>

              <TechButton
                component="a"
                href={`/${lang}/#portfolio`}
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
                {t('hero.examples') || 'Ver Exemplos'}
              </TechButton>
            </MotionGroup>

            {/* Trust Indicators */}
            <MotionFlex
              gap="md"
              mt="xl"
              wrap="wrap"
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
                <Text size="sm" c="gray.3">{t('hero.projects') || '+100 Projetos Entregues'}</Text>
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
                <Text size="sm" c="gray.3">{t('hero.support') || 'Suporte Contínuo'}</Text>
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
                <Text size="sm" c="gray.3">{t('hero.delivery') || 'Entrega em até 4 Semanas'}</Text>
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
          mt={80}
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
              <Text fw={700} size="lg" c="white" mb="xs">{t('services.landing.title') || 'Landing Pages'}</Text>
              <Text c="gray.4" size="sm">
                {t('services.landing.description') || 'Páginas otimizadas para conversão, ideais para campanhas e lançamentos.'}
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
              <Text fw={700} size="lg" c="white" mb="xs">{t('services.ecommerce.title') || 'E-commerce'}</Text>
              <Text c="gray.4" size="sm">
                {t('services.ecommerce.description') || 'Lojas online completas com gestão de produtos e pagamentos integrados.'}
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
              <Text fw={700} size="lg" c="white" mb="xs">{t('services.corporate.title') || 'Sites Institucionais'}</Text>
              <Text c="gray.4" size="sm">
                {t('services.corporate.description') || 'Presença digital profissional para empresas com foco em credibilidade.'}
              </Text>
            </Box>
          </SimpleGrid>
        </MotionBox>
      </Container>
    </Box>
  );
}
