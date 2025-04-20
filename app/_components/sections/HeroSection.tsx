'use client';

import { useRef } from 'react';
import {
  Text,
  Group,
  Stack,
  Box,
  SimpleGrid,
  rem
} from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { ParallaxEffect } from '@/app/_components/effects/ParallaxEffect';
import  GradientText  from '@/app/_components/ui/gradient-text';
import { TechButton } from '@/app/_components/effects/TechButton';
import { HeroNotebookSimulator } from '@/app/_components/ui/HeroNotebookSimulator';
import BlackHoleAnimation from '@/app/_components/effects/BlackHoleAnimation';
import CodeTitle from '@/app/_components/ui/CodeTitle';
import { GradientNebulaBackground } from '@/app/_components/ui/GradientNebulaBackground';

// Define proper types for motion components
const MotionBox = motion(Box) as typeof motion.div;
const MotionText = motion(Text) as typeof motion.div;
const MotionGroup = motion(Group) as typeof motion.div;

export function HeroSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  // Função para lidar com o movimento do mouse (para efeitos interativos)
  const handleMouseMove = () => {
    // Implementação simplificada - apenas para manter a estrutura do componente
  };

  // Removidas as transformações baseadas em scroll para garantir que o título seja sempre visível



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

      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0, overflow: 'hidden' }}>
        <BlackHoleAnimation />
      </div>

      <Stack gap={80} style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <Box>
          <SimpleGrid cols={{ base: 1, md: 1 }} spacing={50}>
            <Stack justify="center" gap="xl" align="center" ref={targetRef}>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <MotionBox
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    width: '100%',
                    maxWidth: '800px',
                    textAlign: 'center'
                    // Removidas as propriedades que dependem do scroll
                  }}
                >
                  {/* Badge removido */}

                  <Box mb="md">
                    <CodeTitle text="CodeBR" fontSize="6.5rem" fontWeight={900} />
                  </Box>

                  <Box mb="md" style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                    <GradientText
                      text="Transformando Ideias em Experiências Digitais"
                      fontSize="2.8rem"
                      fontWeight={800}
                      gradientColors={['#C4A9FF', '#9969E5', '#7641C0', '#5D00FF']}
                      gradientDirection="90deg"
                      textShadowColor="transparent"
                      textShadowBlur="0px"
                      animationDelay={0.4}
                      glowEffect={false}
                      textStroke={false}
                    />
                  </Box>

                  <MotionText
                    size="xl"
                    c="white"
                    maw={600}
                    mt="xl"
                    ta="center"
                    mx="auto"
                    fw={500}
                    style={{
                      textShadow: '0 0 10px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6)',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    Desenvolvemos websites e aplicações web que impulsionam seu negócio.
                    Combinamos design impactante com tecnologia de ponta para criar
                    experiências digitais que convertem visitantes em clientes.
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
                  pulseEffect={false} // Removido o efeito de pulso que causava a box quadrada
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









