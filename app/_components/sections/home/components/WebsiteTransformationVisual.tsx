'use client';

import { useEffect, useState } from 'react';
import { Box, Text, Group, Badge, Button, Card, Image, Stack, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconArrowRight, IconDeviceDesktop, IconCode, IconRocket } from '@tabler/icons-react';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

export function WebsiteTransformationVisual() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play through the steps
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Stop auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const steps = [
    {
      title: "Conceito",
      description: "Entendemos suas necessidades e criamos um conceito personalizado",
      icon: <IconDeviceDesktop size={24} />,
      color: "#7641C0"
    },
    {
      title: "Desenvolvimento",
      description: "Transformamos o conceito em um site funcional e responsivo",
      icon: <IconCode size={24} />,
      color: "#9969E5"
    },
    {
      title: "Lançamento",
      description: "Seu site pronto para conquistar clientes e impulsionar seu negócio",
      icon: <IconRocket size={24} />,
      color: "#5D00FF"
    }
  ];

  return (
    <MotionBox
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        perspective: '1000px',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Browser Frame */}
      <MotionBox
        style={{
          width: '100%',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 30px rgba(118, 65, 192, 0.3)',
          background: '#0A0A0A',
          border: '1px solid rgba(118, 65, 192, 0.3)',
          position: 'relative',
          zIndex: 2,
        }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {/* Browser Header */}
        <Box
          style={{
            background: 'linear-gradient(90deg, rgba(20, 20, 20, 1), rgba(30, 30, 30, 1))',
            padding: '12px 16px',
            borderBottom: '1px solid rgba(118, 65, 192, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {/* Browser Controls */}
          <Group gap="6px">
            <Box style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F56' }} />
            <Box style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFBD2E' }} />
            <Box style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27C93F' }} />
          </Group>

          {/* URL Bar */}
          <Box
            style={{
              flex: 1,
              background: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '4px',
              padding: '6px 12px',
              marginLeft: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text size="xs" c="gray.5">www.seusite.com.br</Text>
          </Box>
        </Box>

        {/* Browser Content */}
        <Box
          style={{
            height: '350px',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #0A0A0A, #111111)',
          }}
        >
          {/* Step 1: Concept */}
          <MotionBox
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: activeStep === 0 ? 1 : 0,
              zIndex: activeStep === 0 ? 2 : 1
            }}
            transition={{ duration: 0.5 }}
          >
            <Box
              style={{
                width: '80%',
                height: '80%',
                border: '2px dashed rgba(118, 65, 192, 0.5)',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20px',
                padding: '20px',
              }}
            >
              <IconDeviceDesktop size={60} color="#7641C0" />
              <Text ta="center" fw={700} size="xl" c="white">Conceito do Site</Text>
              <Text ta="center" c="gray.4" size="sm">
                Wireframes e protótipos que definem a estrutura e funcionalidades do seu site
              </Text>
              <Group>
                <Box
                  style={{
                    width: '60px',
                    height: '40px',
                    background: 'rgba(118, 65, 192, 0.2)',
                    borderRadius: '4px',
                  }}
                />
                <Box
                  style={{
                    width: '60px',
                    height: '40px',
                    background: 'rgba(118, 65, 192, 0.2)',
                    borderRadius: '4px',
                  }}
                />
                <Box
                  style={{
                    width: '60px',
                    height: '40px',
                    background: 'rgba(118, 65, 192, 0.2)',
                    borderRadius: '4px',
                  }}
                />
              </Group>
            </Box>
          </MotionBox>

          {/* Step 2: Development */}
          <MotionBox
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              padding: '20px',
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: activeStep === 1 ? 1 : 0,
              zIndex: activeStep === 1 ? 2 : 1
            }}
            transition={{ duration: 0.5 }}
          >
            <Box
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
              }}
            >
              {/* Header */}
              <Box
                style={{
                  height: '60px',
                  background: 'rgba(118, 65, 192, 0.2)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 20px',
                  justifyContent: 'space-between',
                }}
              >
                <Box
                  style={{
                    width: '100px',
                    height: '20px',
                    background: 'rgba(118, 65, 192, 0.4)',
                    borderRadius: '4px',
                  }}
                />
                <Group gap="10px">
                  {[1, 2, 3, 4].map((i) => (
                    <Box
                      key={i}
                      style={{
                        width: '40px',
                        height: '10px',
                        background: 'rgba(118, 65, 192, 0.3)',
                        borderRadius: '2px',
                      }}
                    />
                  ))}
                </Group>
              </Box>

              {/* Hero */}
              <Box
                style={{
                  height: '120px',
                  background: 'rgba(118, 65, 192, 0.15)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 20px',
                }}
              >
                <Box style={{ width: '50%' }}>
                  <Box
                    style={{
                      width: '80%',
                      height: '20px',
                      background: 'rgba(118, 65, 192, 0.4)',
                      borderRadius: '4px',
                      marginBottom: '10px',
                    }}
                  />
                  <Box
                    style={{
                      width: '60%',
                      height: '10px',
                      background: 'rgba(118, 65, 192, 0.3)',
                      borderRadius: '2px',
                      marginBottom: '5px',
                    }}
                  />
                  <Box
                    style={{
                      width: '70%',
                      height: '10px',
                      background: 'rgba(118, 65, 192, 0.3)',
                      borderRadius: '2px',
                      marginBottom: '10px',
                    }}
                  />
                  <Box
                    style={{
                      width: '40%',
                      height: '15px',
                      background: 'rgba(118, 65, 192, 0.5)',
                      borderRadius: '4px',
                    }}
                  />
                </Box>
                <Box
                  style={{
                    width: '40%',
                    height: '80px',
                    background: 'rgba(118, 65, 192, 0.25)',
                    borderRadius: '8px',
                  }}
                />
              </Box>

              {/* Content Blocks */}
              <Group grow style={{ flex: 1 }}>
                {[1, 2, 3].map((i) => (
                  <Box
                    key={i}
                    style={{
                      height: '100%',
                      background: 'rgba(118, 65, 192, 0.1)',
                      borderRadius: '8px',
                      padding: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    <Box
                      style={{
                        width: '40px',
                        height: '40px',
                        background: 'rgba(118, 65, 192, 0.3)',
                        borderRadius: '4px',
                      }}
                    />
                    <Box
                      style={{
                        width: '80%',
                        height: '15px',
                        background: 'rgba(118, 65, 192, 0.3)',
                        borderRadius: '2px',
                      }}
                    />
                    <Box
                      style={{
                        width: '60%',
                        height: '10px',
                        background: 'rgba(118, 65, 192, 0.2)',
                        borderRadius: '2px',
                      }}
                    />
                    <Box
                      style={{
                        width: '70%',
                        height: '10px',
                        background: 'rgba(118, 65, 192, 0.2)',
                        borderRadius: '2px',
                      }}
                    />
                  </Box>
                ))}
              </Group>
            </Box>
          </MotionBox>

          {/* Step 3: Launch */}
          <MotionBox
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              padding: '20px',
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: activeStep === 2 ? 1 : 0,
              zIndex: activeStep === 2 ? 2 : 1
            }}
            transition={{ duration: 0.5 }}
          >
            <Box
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                background: 'linear-gradient(135deg, rgba(118, 65, 192, 0.1), rgba(93, 0, 255, 0.05))',
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Animated particles */}
              <Box
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0.4,
                  background: 'radial-gradient(circle at 50% 50%, rgba(118, 65, 192, 0.2), transparent 70%)',
                  zIndex: 0,
                }}
              />

              {/* Header */}
              <Box
                style={{
                  height: '60px',
                  background: 'rgba(118, 65, 192, 0.2)',
                  backdropFilter: 'blur(5px)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 20px',
                  justifyContent: 'space-between',
                  zIndex: 1,
                }}
              >
                <Group align="center" gap="md">
                  <Box
                    style={{
                      width: '30px',
                      height: '30px',
                      background: 'linear-gradient(135deg, #7641C0, #9969E5)',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text size="xs" fw={700} c="white">
                      S
                    </Text>
                  </Box>
                  <Text fw={700} c="white" size="sm">
                    SeuSite.com.br
                  </Text>
                </Group>
                <Group gap="20px">
                  {['Início', 'Serviços', 'Sobre', 'Contato'].map((item) => (
                    <Text key={item} size="xs" c="white" fw={500}>
                      {item}
                    </Text>
                  ))}
                  <Button
                    size="xs"
                    variant="gradient"
                    gradient={{ from: '#7641C0', to: '#9969E5' }}
                    radius="md"
                  >
                    Contato
                  </Button>
                </Group>
              </Box>

              {/* Hero */}
              <Box
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 40px',
                  zIndex: 1,
                }}
              >
                <Box style={{ width: '50%' }}>
                  <Badge
                    variant="gradient"
                    gradient={{ from: '#7641C0', to: '#9969E5' }}
                    mb="md"
                  >
                    Bem-vindo
                  </Badge>
                  <Title order={1} c="white" mb="xs">
                    Seu Site Profissional
                  </Title>
                  <Text c="gray.3" mb="md">
                    Pronto para impulsionar seu negócio e conquistar novos clientes
                  </Text>
                  <Button
                    variant="gradient"
                    gradient={{ from: '#7641C0', to: '#9969E5' }}
                    rightSection={<IconArrowRight size={16} />}
                  >
                    Saiba Mais
                  </Button>
                </Box>
                <Box
                  style={{
                    width: '40%',
                    height: '200px',
                    background: 'linear-gradient(135deg, rgba(118, 65, 192, 0.3), rgba(93, 0, 255, 0.2))',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2), 0 0 10px rgba(118, 65, 192, 0.3)',
                  }}
                >
                  <IconRocket size={60} color="#9969E5" />
                </Box>
              </Box>
            </Box>
          </MotionBox>
        </Box>
      </MotionBox>

      {/* Step Indicators */}
      <Group position="center" mt="xl">
        {steps.map((step, index) => (
          <MotionCard
            key={index}
            p="md"
            radius="md"
            onClick={() => setActiveStep(index)}
            style={{
              cursor: 'pointer',
              background: activeStep === index
                ? 'linear-gradient(135deg, rgba(118, 65, 192, 0.2), rgba(153, 105, 229, 0.1))'
                : 'rgba(255, 255, 255, 0.03)',
              border: activeStep === index
                ? '1px solid rgba(118, 65, 192, 0.4)'
                : '1px solid rgba(255, 255, 255, 0.05)',
              width: '150px',
              transition: 'all 0.3s ease',
            }}
            whileHover={{
              y: -5,
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(118, 65, 192, 0.3)',
            }}
          >
            <Stack align="center" spacing="xs">
              <Box
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: activeStep === index
                    ? `linear-gradient(135deg, ${step.color}, rgba(153, 105, 229, 0.8))`
                    : 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                }}
              >
                {step.icon}
              </Box>
              <Text fw={600} c={activeStep === index ? 'white' : 'gray.5'} ta="center">
                {step.title}
              </Text>
              <Text size="xs" c="gray.5" ta="center" style={{ minHeight: '40px' }}>
                {step.description}
              </Text>
            </Stack>
          </MotionCard>
        ))}
      </Group>

      {/* Ícones flutuantes removidos */}
    </MotionBox>
  );
}
