'use client';

import { useRef } from 'react';
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
import { IconArrowRight } from '@tabler/icons-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AnimatedText } from './effects/AnimatedText';
import { ParallaxEffect } from './effects/ParallaxEffect';
import { GradientNebulaBackground } from './effects/backgrounds/GradientNebulaBackground';
import { GradientText } from './effects/GradientText';
import { GlassCard } from './effects/GlassCard';
import { TechButton } from './effects/TechButton';

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

  // Ajustando os valores para garantir que o título esteja visível no carregamento
  const y = useTransform(scrollYProgress, [0, 0.8], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);

  return (
    <Box
      style={{
        background: 'linear-gradient(180deg, #0A0A0A 0%, #111111 100%)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        width: '100vw',
        maxWidth: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Aurora Neon Background */}
      <GradientNebulaBackground />

      <Container size="lg" px={{ base: 20, md: 40, lg: 80 }} style={{ position: 'relative', zIndex: 1 }}>
        <Stack gap={80}>
          <Box>
            <SimpleGrid cols={{ base: 1, md: 1 }} spacing={50}>
              <Stack justify="center" gap="xl" align="center" ref={targetRef}>
                <div>
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
                      variant="light"
                      color="purple.5"
                      size="lg"
                      mb="md"
                      style={{ display: 'inline-block', margin: '0 auto' }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      Websites Profissionais
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
                    size="lg"
                    radius="md"
                    variant="gradient"
                    gradientColors={['#7641C0', '#9969E5']}
                    rightSection={<IconArrowRight size={18} />}
                    glowColor="rgba(118,65,192,0.6)"
                    glowIntensity={0.8}
                    hoverScale={1.05}
                    pulseEffect={true}
                    style={{
                      padding: '0 28px',
                      height: rem(52),
                      fontWeight: 500,
                    }}
                  >
                    Ver nossos serviços
                  </TechButton>

                  <TechButton
                    component="a"
                    href="/contact"
                    size="lg"
                    radius="md"
                    variant="glass"
                    glowColor="rgba(118,65,192,0.4)"
                    style={{
                      padding: '0 28px',
                      height: rem(52),
                      fontWeight: 500,
                    }}
                  >
                    Fale conosco
                  </TechButton>
                </MotionGroup>

                <ParallaxEffect
                  speed={0.05}
                  direction="up"
                  style={{ position: 'relative', width: '100%', maxWidth: '1000px', marginTop: '60px' }}
                >
                  <MotionBox
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                  >
                    {/* Website Builder UI */}
                    <GlassCard
                      glassOpacity={0.1}
                      borderOpacity={0.1}
                      maxTilt={5}
                      glareOpacity={0.15}
                      borderRadius={16}
                      borderWidth={1}
                      glassColor="rgba(13, 13, 13, 0.95)"
                      borderColor="rgba(118, 65, 192, 0.2)"
                      glareColor="rgba(118, 65, 192, 0.3)"
                      interactive={true}
                      style={{
                        width: '100%',
                        height: 0,
                        paddingBottom: '62%', // Aumentando a altura proporcionalmente
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.6), 0 0 1px rgba(255, 255, 255, 0.1), 0 0 0 1px rgba(118, 65, 192, 0.1)',
                      }}
                    >
                      {/* Browser Chrome */}
                      <Box
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '38px',
                          padding: '0 16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                          backgroundColor: 'rgba(25, 25, 25, 0.95)',
                          backdropFilter: 'blur(10px)',
                          borderTopLeftRadius: '15px',
                          borderTopRightRadius: '15px',
                        }}
                      >
                        {/* Browser Controls */}
                        <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {['#FF5F57', '#FEBC2E', '#28C840'].map((color, i) => (
                            <Box
                              key={`control-${i}`}
                              style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                backgroundColor: color,
                              }}
                            />
                          ))}
                        </Box>

                        {/* URL Bar */}
                        <Box
                          style={{
                            flex: 1,
                            height: '24px',
                            margin: '0 16px',
                            backgroundColor: 'rgba(40, 40, 40, 0.8)',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0 10px',
                            fontSize: '12px',
                            color: 'rgba(255, 255, 255, 0.7)',
                          }}
                        >
                          <Box
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                            }}
                          >
                            <Box
                              style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: '#28C840',
                              }}
                            />
                            <Text size="xs" c="dimmed">websitessuicos.com.br/editor</Text>
                          </Box>
                        </Box>

                        {/* Browser Actions */}
                        <Box style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {Array(3).fill(0).map((_, i) => (
                            <Box
                              key={`action-${i}`}
                              style={{
                                width: '16px',
                                height: '16px',
                                borderRadius: '4px',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                              }}
                            />
                          ))}
                        </Box>
                      </Box>

                      {/* Website Builder Header */}
                      <Box
                        style={{
                          position: 'absolute',
                          top: '38px',
                          left: 0,
                          right: 0,
                          height: '60px',
                          padding: '0 20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                          backgroundColor: 'rgba(15, 15, 15, 0.9)',
                          backdropFilter: 'blur(10px)',
                        }}
                      >
                        <Box style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <Box
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '6px',
                              background: 'linear-gradient(135deg, #7641C0, #9969E5)',
                            }}
                          />
                          <Text fw={600} c="white">Construtor de Sites</Text>
                        </Box>

                        <Box style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <Box
                            style={{
                              width: '80px',
                              height: '32px',
                              borderRadius: '6px',
                              backgroundColor: 'rgba(118, 65, 192, 0.2)',
                              border: '1px solid rgba(118, 65, 192, 0.3)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Text size="xs" fw={500} c="purple.3">Publicar</Text>
                          </Box>
                          <Box
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            }}
                          />
                        </Box>
                      </Box>

                      {/* Website Builder Content */}
                      <Box
                        style={{
                          position: 'absolute',
                          top: '98px', // Ajustado para considerar a barra do navegador
                          left: 0,
                          right: 0,
                          bottom: 0,
                          padding: '20px',
                          display: 'flex',
                          gap: '20px',
                          background: 'linear-gradient(180deg, rgba(18,18,18,1) 0%, rgba(22,22,22,1) 100%)',
                        }}
                      >
                        {/* Website Builder Tools */}
                        <Box
                          style={{
                            width: '240px',
                            height: '100%',
                            backgroundColor: 'rgba(25, 25, 25, 0.7)',
                            borderRadius: '10px',
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.02)',
                          }}
                        >
                          <Box
                            style={{
                              marginBottom: '8px',
                            }}
                          >
                            <Text size="xs" fw={600} c="gray.5" tt="uppercase" mb={8}>Elementos</Text>
                          </Box>

                          {/* Element categories */}
                          {['Cabeçalho', 'Texto', 'Imagem', 'Botão', 'Galeria', 'Formulário', 'Vídeo'].map((item, i) => (
                            <Box
                              key={`element-${i}`}
                              style={{
                                height: '42px',
                                borderRadius: '8px',
                                backgroundColor: i === 0 ? 'rgba(118, 65, 192, 0.15)' : i === 1 ? 'rgba(255, 255, 255, 0.03)' : 'transparent',
                                border: i === 0 ? '1px solid rgba(118, 65, 192, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
                                padding: '0 12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                transition: 'all 0.2s ease',
                                cursor: 'pointer',
                                '&:hover': {
                                  backgroundColor: i !== 0 ? 'rgba(255, 255, 255, 0.05)' : 'rgba(118, 65, 192, 0.2)',
                                  transform: 'translateY(-1px)',
                                }
                              }}
                            >
                              <Box
                                style={{
                                  width: '18px',
                                  height: '18px',
                                  borderRadius: '5px',
                                  backgroundColor: i === 0 ? 'rgba(118, 65, 192, 0.6)' : i === 1 ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                {i === 0 && (
                                  <Box
                                    style={{
                                      width: '8px',
                                      height: '8px',
                                      borderRadius: '2px',
                                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                      animation: 'pulse 1.5s infinite',
                                    }}
                                  />
                                )}
                              </Box>
                              <Text size="sm" fw={i === 0 ? 500 : 400} c={i === 0 ? 'purple.3' : i === 1 ? 'gray.3' : 'gray.5'}>{item}</Text>
                            </Box>
                          ))}

                          <Box
                            style={{
                              marginTop: '16px',
                              marginBottom: '8px',
                            }}
                          >
                            <Text size="xs" fw={600} c="gray.5" tt="uppercase" mb={8}>Estilos</Text>
                          </Box>

                          {/* Style options */}
                          {['Cores', 'Fontes', 'Espaçamento', 'Efeitos', 'Responsividade'].map((item, i) => (
                            <Box
                              key={`style-${i}`}
                              style={{
                                height: '42px',
                                borderRadius: '8px',
                                backgroundColor: 'transparent',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                padding: '0 12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                transition: 'all 0.2s ease',
                                cursor: 'pointer',
                                '&:hover': {
                                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                  transform: 'translateY(-1px)',
                                }
                              }}
                            >
                              <Box
                                style={{
                                  width: '16px',
                                  height: '16px',
                                  borderRadius: '4px',
                                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                }}
                              />
                              <Text size="sm" c="gray.5">{item}</Text>
                            </Box>
                          ))}
                        </Box>

                        {/* Website Preview Area */}
                        <Box
                          style={{
                            flex: 1,
                            backgroundColor: 'rgba(25, 25, 25, 0.7)',
                            borderRadius: '10px',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.02), 0 10px 30px -10px rgba(0, 0, 0, 0.3)',
                          }}
                        >
                          {/* Website Canvas */}
                          <Box
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              backgroundColor: '#fff',
                              margin: '12px',
                              borderRadius: '4px',
                              overflow: 'hidden',
                            }}
                          >
                            {/* Website Header */}
                            <Box
                              style={{
                                height: '80px',
                                backgroundColor: '#0A0A0A',
                                padding: '0 24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid rgba(255,255,255,0.1)',
                              }}
                            >
                              {/* Logo */}
                              <Box
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '12px',
                                }}
                              >
                                <Box
                                  style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '6px',
                                    background: 'linear-gradient(135deg, #7641C0, #9969E5)',
                                  }}
                                />
                                <Box
                                  style={{
                                    width: '100px',
                                    height: '16px',
                                    backgroundColor: 'rgba(255,255,255,0.8)',
                                    borderRadius: '4px',
                                  }}
                                />
                              </Box>

                              {/* Navigation */}
                              <Box
                                style={{
                                  display: 'flex',
                                  gap: '24px',
                                }}
                              >
                                {Array(4).fill(0).map((_, i) => (
                                  <Box
                                    key={`nav-${i}`}
                                    style={{
                                      width: i === 0 ? '60px' : '40px',
                                      height: '12px',
                                      backgroundColor: i === 0 ? 'rgba(118,65,192,0.8)' : 'rgba(255,255,255,0.5)',
                                      borderRadius: '4px',
                                    }}
                                  />
                                ))}
                              </Box>
                            </Box>

                            {/* Hero Section */}
                            <Box
                              style={{
                                height: '300px',
                                backgroundColor: '#0D0D0D',
                                padding: '40px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '20px',
                                position: 'relative',
                                overflow: 'hidden',
                              }}
                            >
                              {/* Background gradient */}
                              <Box
                                style={{
                                  position: 'absolute',
                                  top: '20%',
                                  left: '30%',
                                  width: '40%',
                                  height: '40%',
                                  background: 'radial-gradient(circle, rgba(118,65,192,0.15) 0%, rgba(118,65,192,0) 70%)',
                                  filter: 'blur(50px)',
                                }}
                              />

                              {/* Heading */}
                              <Box
                                style={{
                                  width: '70%',
                                  height: '36px',
                                  backgroundColor: 'rgba(255,255,255,0.9)',
                                  borderRadius: '6px',
                                  marginBottom: '8px',
                                  background: 'linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.9) 100%)',
                                  backgroundSize: '200% 100%',
                                  animation: 'shimmer 3s infinite linear',
                                }}
                              />
                              <Box
                                style={{
                                  width: '50%',
                                  height: '24px',
                                  backgroundColor: 'rgba(118,65,192,0.7)',
                                  borderRadius: '4px',
                                  marginBottom: '16px',
                                }}
                              />

                              {/* Description */}
                              <Box
                                style={{
                                  width: '80%',
                                  height: '12px',
                                  backgroundColor: 'rgba(255,255,255,0.5)',
                                  borderRadius: '4px',
                                  marginBottom: '8px',
                                }}
                              />
                              <Box
                                style={{
                                  width: '70%',
                                  height: '12px',
                                  backgroundColor: 'rgba(255,255,255,0.5)',
                                  borderRadius: '4px',
                                  marginBottom: '8px',
                                }}
                              />
                              <Box
                                style={{
                                  width: '60%',
                                  height: '12px',
                                  backgroundColor: 'rgba(255,255,255,0.5)',
                                  borderRadius: '4px',
                                  marginBottom: '24px',
                                }}
                              />

                              {/* Buttons */}
                              <Box
                                style={{
                                  display: 'flex',
                                  gap: '16px',
                                }}
                              >
                                <Box
                                  style={{
                                    width: '120px',
                                    height: '40px',
                                    backgroundColor: 'rgba(118,65,192,1)',
                                    borderRadius: '6px',
                                  }}
                                />
                                <Box
                                  style={{
                                    width: '120px',
                                    height: '40px',
                                    backgroundColor: 'transparent',
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    borderRadius: '6px',
                                  }}
                                />
                              </Box>
                            </Box>

                            {/* Content Section */}
                            <Box
                              style={{
                                padding: '40px',
                                backgroundColor: '#fff',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px',
                              }}
                            >
                              {/* Section Title */}
                              <Box
                                style={{
                                  width: '200px',
                                  height: '24px',
                                  backgroundColor: 'rgba(0,0,0,0.8)',
                                  borderRadius: '4px',
                                  marginBottom: '16px',
                                }}
                              />

                              {/* Feature Cards */}
                              <Box
                                style={{
                                  display: 'flex',
                                  gap: '20px',
                                }}
                              >
                                {Array(3).fill(0).map((_, i) => (
                                  <Box
                                    key={`card-${i}`}
                                    style={{
                                      flex: 1,
                                      height: '180px',
                                      backgroundColor: i === 0 ? 'rgba(118,65,192,0.05)' : 'rgba(0,0,0,0.03)',
                                      borderRadius: '8px',
                                      padding: '16px',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      gap: '12px',
                                      border: i === 0 ? '1px solid rgba(118,65,192,0.2)' : '1px solid rgba(0,0,0,0.05)',
                                    }}
                                  >
                                    <Box
                                      style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '8px',
                                        backgroundColor: i === 0 ? 'rgba(118,65,192,0.2)' : 'rgba(0,0,0,0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                      }}
                                    >
                                      {i === 0 && (
                                        <Box
                                          style={{
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '4px',
                                            background: 'linear-gradient(135deg, #7641C0, #9969E5)',
                                            animation: 'float 3s ease-in-out infinite',
                                          }}
                                        />
                                      )}
                                    </Box>
                                    <Box
                                      style={{
                                        width: '80%',
                                        height: '16px',
                                        backgroundColor: i === 0 ? 'rgba(118,65,192,0.7)' : 'rgba(0,0,0,0.5)',
                                        borderRadius: '4px',
                                      }}
                                    />
                                    <Box
                                      style={{
                                        width: '100%',
                                        height: '8px',
                                        backgroundColor: 'rgba(0,0,0,0.1)',
                                        borderRadius: '4px',
                                        marginBottom: '4px',
                                      }}
                                    />
                                    <Box
                                      style={{
                                        width: '90%',
                                        height: '8px',
                                        backgroundColor: 'rgba(0,0,0,0.1)',
                                        borderRadius: '4px',
                                        marginBottom: '4px',
                                      }}
                                    />
                                    <Box
                                      style={{
                                        width: '80%',
                                        height: '8px',
                                        backgroundColor: 'rgba(0,0,0,0.1)',
                                        borderRadius: '4px',
                                      }}
                                    />
                                  </Box>
                                ))}
                              </Box>
                            </Box>
                          </Box>

                          {/* Toolbar flutuante */}
                          <Box
                            style={{
                              position: 'absolute',
                              top: '50px',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              height: '36px',
                              width: '320px',
                              backgroundColor: 'rgba(30, 30, 30, 0.95)',
                              borderRadius: '8px',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '12px',
                              padding: '0 12px',
                              backdropFilter: 'blur(10px)',
                              zIndex: 10,
                            }}
                          >
                            {['B', 'I', 'U', 'A', '¶'].map((item, i) => (
                              <Box
                                key={`toolbar-${i}`}
                                style={{
                                  width: '28px',
                                  height: '28px',
                                  borderRadius: '4px',
                                  backgroundColor: i === 0 ? 'rgba(118, 65, 192, 0.3)' : 'transparent',
                                  border: i === 0 ? '1px solid rgba(118, 65, 192, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <Text size="xs" fw={500} c={i === 0 ? 'purple.3' : 'gray.4'}>{item}</Text>
                              </Box>
                            ))}
                            <Box style={{ width: '1px', height: '20px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
                            {Array(3).fill(0).map((_, i) => (
                              <Box
                                key={`color-${i}`}
                                style={{
                                  width: '28px',
                                  height: '28px',
                                  borderRadius: '4px',
                                  backgroundColor: 'transparent',
                                  border: '1px solid rgba(255, 255, 255, 0.1)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <Box
                                  style={{
                                    width: '16px',
                                    height: '16px',
                                    borderRadius: '4px',
                                    backgroundColor: i === 0 ? '#9969E5' : i === 1 ? '#FFFFFF' : '#333333',
                                    boxShadow: i === 0 ? '0 0 10px rgba(153, 105, 229, 0.5)' : 'none',
                                    animation: i === 0 ? 'glow 2s infinite' : 'none',
                                  }}
                                />
                              </Box>
                            ))}
                          </Box>

                          {/* Active element indicator */}
                          <Box
                            style={{
                              position: 'absolute',
                              top: '92px',
                              left: '12px',
                              right: '12px',
                              height: '300px',
                              border: '2px dashed rgba(118,65,192,0.7)',
                              borderRadius: '4px',
                              pointerEvents: 'none',
                              animation: 'pulse 2s infinite',
                              boxShadow: '0 0 20px rgba(118,65,192,0.1)',
                            }}
                          >
                            {/* Resize handles */}
                            {['top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', 'right-center', 'bottom-center', 'left-center'].map((pos) => (
                              <Box
                                key={pos}
                                style={{
                                  position: 'absolute',
                                  width: pos.includes('center') ? '10px' : '12px',
                                  height: pos.includes('center') ? '10px' : '12px',
                                  backgroundColor: 'rgba(118,65,192,1)',
                                  border: '2px solid rgba(255,255,255,0.8)',
                                  borderRadius: '50%',
                                  top: pos.includes('top') ? '-6px' : pos === 'right-center' || pos === 'left-center' ? 'calc(50% - 5px)' : 'auto',
                                  bottom: pos.includes('bottom') ? '-6px' : 'auto',
                                  left: pos.includes('left') ? '-6px' : pos === 'top-center' || pos === 'bottom-center' ? 'calc(50% - 5px)' : 'auto',
                                  right: pos.includes('right') ? '-6px' : 'auto',
                                  boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                                  cursor: pos.includes('top-left') || pos.includes('bottom-right') ? 'nwse-resize' :
                                         pos.includes('top-right') || pos.includes('bottom-left') ? 'nesw-resize' :
                                         pos.includes('center') && (pos.includes('left') || pos.includes('right')) ? 'ew-resize' : 'ns-resize',
                                }}
                              />
                            ))}

                            {/* Adicionar botões de ação */}
                            <Box
                              style={{
                                position: 'absolute',
                                top: '-40px',
                                right: '10px',
                                display: 'flex',
                                gap: '8px',
                              }}
                            >
                              {['Duplicar', 'Excluir'].map((action, i) => (
                                <Box
                                  key={`action-${i}`}
                                  style={{
                                    padding: '4px 10px',
                                    borderRadius: '4px',
                                    backgroundColor: i === 0 ? 'rgba(118, 65, 192, 0.2)' : 'rgba(255, 60, 60, 0.2)',
                                    border: `1px solid ${i === 0 ? 'rgba(118, 65, 192, 0.4)' : 'rgba(255, 60, 60, 0.4)'}`,
                                    transition: 'all 0.2s ease',
                                    cursor: 'pointer',
                                    '&:hover': {
                                      backgroundColor: i === 0 ? 'rgba(118, 65, 192, 0.3)' : 'rgba(255, 60, 60, 0.3)',
                                      transform: 'translateY(-1px)',
                                    },
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <Text size="xs" fw={500} c={i === 0 ? 'purple.3' : 'red.3'}>{action}</Text>
                                </Box>
                              ))}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </GlassCard>
                  </MotionBox>
                </ParallaxEffect>
              </Stack>
            </SimpleGrid>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}