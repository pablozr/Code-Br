'use client';

import { useRef, useState } from 'react';
import {
  Container,
  Text,
  Group,
  Stack,
  Box,
  Badge,
  SimpleGrid,
  rem
} from '@mantine/core';
import { IconArrowRight, IconSparkles } from '@tabler/icons-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AnimatedText } from './effects/AnimatedText';
import { ParallaxEffect } from './effects/ParallaxEffect';
import { GradientNebulaBackground } from './effects/backgrounds/GradientNebulaBackground';
import { GradientText } from './effects/GradientText';
import { TechButton } from './effects/TechButton';
import { HeroNotebookSimulator } from './HeroNotebookSimulator';
import { BlackHoleEffect } from './effects/BlackHoleEffect';

// @ts-ignore - Type issues with motion components
const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionBadge = motion(Badge);
const MotionGroup = motion(Group);

export function HeroSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start']
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePosition({ x, y });
  };

  // Ajustando os valores para garantir que o título esteja visível no carregamento
  const y = useTransform(scrollYProgress, [0, 0.8], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);

  return (
    <Box
      onMouseMove={handleMouseMove}
      style={{
        background: 'linear-gradient(180deg, #0A0A0A 0%, #111111 100%)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Aurora Neon Background */}
      <GradientNebulaBackground />
      
      {/* BlackHoleEffect direto na hero section */}
      <Box style={{ 
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}>
        <BlackHoleEffect />
      </Box>
      
      <Stack gap={80} style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <Box>
          <SimpleGrid cols={{ base: 1, md: 1 }} spacing={50}>
            <Stack justify="center" gap="xl" align="center" ref={targetRef}>
              {/* BlackHoleEffect container */}
              <Box style={{ 
                position: 'absolute', 
                top: '80%', // Mudado de 60% para 80% para posicionar mais abaixo
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%', 
                height: '100%',
                zIndex: 0,
                maxWidth: '1200px',
                maxHeight: '800px',
              }}>
                <BlackHoleEffect />
              </Box>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    width: '100%',
                    maxWidth: '800px',
                    textAlign: 'center',
                    translateY: y,
                    opacity: opacity
                  }}
                >
                  <MotionBadge
                    variant="gradient"
                    gradient={{ from: 'purple.9', to: 'purple.5' }}
                    size="lg"
                    mb="md"
                    style={{
                      display: 'inline-block',
                      margin: '0 auto',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      boxShadow: '0 4px 15px rgba(118,65,192,0.2)',
                    }}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 8px 25px rgba(118,65,192,0.3)',
                    }}
                  >
                    <Group gap={8}>
                      <IconSparkles size={16} />
                      Websites Profissionais
                    </Group>
                  </MotionBadge>

                  <Box mb="md">
                    <GradientText
                      gradient={['#7641C0', '#9969E5', '#7641C0', '#6A5ACD']}
                      animate={true}
                      duration={8}
                      interactive={true}
                      size="5rem"
                      fw={800}
                      lh={1.1}
                      ta="center"
                      style={{
                        letterSpacing: '-0.03em',
                        maxWidth: '900px',
                        textShadow: '0 0 40px rgba(118,65,192,0.3)',
                      }}
                    >
                      Websites Suíços
                    </GradientText>
                  </Box>

                  <Box mb="md">
                    <AnimatedText
                      text="Qualidade e Precisão"
                      type="words"
                      size="2.5rem"
                      fw={500}
                      mt="xs"
                      ta="center"
                      c="purple.3"
                      style={{
                        letterSpacing: '-0.01em',
                      }}
                      delay={0.4}
                    />
                  </Box>

                  <MotionText
                    size="xl"
                    c="gray.4"
                    maw={600}
                    mt="xl"
                    ta="center"
                    mx="auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    Criamos websites profissionais com a precisão suíça. Desde landing pages
                    até lojas online completas, oferecemos soluções personalizadas com
                    hospedagem segura na Suíça.
                  </MotionText>
                </MotionBox>
              </div>

              <MotionGroup
                mt="xl"
                style={{ justifyContent: 'center', gap: '16px' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <TechButton
                  component="a"
                  href="/pricing"
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
                  pulseEffect={true}
                  style={{
                    padding: '0 32px',
                    height: rem(56),
                    fontWeight: 600,
                    letterSpacing: '-0.01em',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  Ver nossos serviços
                </TechButton>

                <TechButton
                  component="a"
                  href="/contact"
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
                  Fale conosco
                </TechButton>
              </MotionGroup>

              <ParallaxEffect
                speed={0.05}
                direction="up"
                style={{ position: 'relative', width: '100%', maxWidth: '1000px', marginTop: '60px', zIndex: 1 }}
              >
                <MotionBox
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  <HeroNotebookSimulator />
                </MotionBox>
              </ParallaxEffect>
            </Stack>
          </SimpleGrid>
        </Box>
      </Stack>
    </Box>
  );
}

