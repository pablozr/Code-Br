'use client';

import { useEffect, useState } from 'react';
import { keyframes } from '@emotion/react';
import { Box, Text, Group, Badge, Button, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconArrowRight, IconDeviceDesktop, IconRocket } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';

// Use motion.div instead of motion(Box) to avoid type errors
const MotionBox = motion.div;

// Keyframes para animações
const pulseAnimation = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 0.6; }
  100% { opacity: 0.3; }
`;

export function WebsiteTransformationVisual() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'pt-BR';

  // Textos de transformação
  const transformationTexts = {
    'pt-BR': {
      wireframe: {
        title: 'Conceito',
        description: 'Entendemos suas necessidades e criamos um conceito personalizado',
        content: 'Conceito do Site',
        details: 'Wireframes e protótipos que definem a estrutura e funcionalidades do seu site'
      },
      development: {
        title: 'Desenvolvimento',
        description: 'Transformamos o conceito em um site funcional e responsivo',
        content: 'Desenvolvimento',
        details: 'Codificação e implementação das funcionalidades do seu site'
      },
      final: {
        title: 'Lançamento',
        description: 'Seu site pronto para conquistar clientes e impulsionar seu negócio',
        content: 'Site Finalizado',
        details: 'Seu site profissional pronto para atrair clientes e expandir seu negócio'
      },
      menu: {
        home: 'Início',
        services: 'Serviços',
        about: 'Sobre',
        contact: 'Contato'
      },
      hero: {
        welcome: 'Bem-vindo',
        title: 'Seu Site Profissional',
        subtitle: 'Pronto para impulsionar seu negócio e conquistar novos clientes',
        cta: 'Saiba Mais'
      }
    },
    'en': {
      wireframe: {
        title: 'Concept',
        description: 'We understand your needs and create a personalized concept',
        content: 'Website Concept',
        details: 'Wireframes and prototypes that define the structure and functionality of your site'
      },
      development: {
        title: 'Development',
        description: 'We transform the concept into a functional and responsive website',
        content: 'Development',
        details: 'Coding and implementation of your website functionalities'
      },
      final: {
        title: 'Launch',
        description: 'Your website ready to win customers and boost your business',
        content: 'Finished Website',
        details: 'Your professional website ready to attract customers and expand your business'
      },
      menu: {
        home: 'Home',
        services: 'Services',
        about: 'About',
        contact: 'Contact'
      },
      hero: {
        welcome: 'Welcome',
        title: 'Your Professional Website',
        subtitle: 'Ready to boost your business and win new customers',
        cta: 'Learn More'
      }
    },
    'fr': {
      wireframe: {
        title: 'Concept',
        description: 'Nous comprenons vos besoins et créons un concept personnalisé',
        content: 'Concept du Site',
        details: 'Wireframes et prototypes qui définissent la structure et les fonctionnalités de votre site'
      },
      development: {
        title: 'Développement',
        description: 'Nous transformons le concept en un site web fonctionnel et réactif',
        content: 'Développement',
        details: 'Codage et implémentation des fonctionnalités de votre site web'
      },
      final: {
        title: 'Lancement',
        description: 'Votre site web prêt à gagner des clients et à booster votre entreprise',
        content: 'Site Web Finalisé',
        details: 'Votre site web professionnel prêt à attirer des clients et à développer votre entreprise'
      },
      menu: {
        home: 'Accueil',
        services: 'Services',
        about: 'À Propos',
        contact: 'Contact'
      },
      hero: {
        welcome: 'Bienvenue',
        title: 'Votre Site Web Professionnel',
        subtitle: 'Prêt à booster votre entreprise et à gagner de nouveaux clients',
        cta: 'En Savoir Plus'
      }
    }
  };

  const t = transformationTexts[locale as keyof typeof transformationTexts] || transformationTexts['pt-BR'];
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play through the steps com transições mais suaves
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 4000); // Tempo maior para apreciar cada etapa

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Stop auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Os passos foram removidos pois não são mais necessários

  return (
    <MotionBox
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        perspective: '1000px',
      }}
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseLeave()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Browser Frame */}
      <MotionBox
        style={{
          width: '100%',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.5), 0 0 40px rgba(118, 65, 192, 0.4), 0 0 100px rgba(93, 0, 255, 0.15)',
          background: '#0A0A0A',
          border: '1px solid rgba(118, 65, 192, 0.4)',
          position: 'relative',
          zIndex: 2,
          transform: 'perspective(1000px) rotateX(2deg)',
        }}
        initial={{ y: 30, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
          delay: 0.2
        }}
      >
        {/* Browser Header */}
        <Box
          style={{
            background: 'linear-gradient(90deg, rgba(15, 15, 15, 1), rgba(25, 25, 25, 1))',
            padding: '14px 18px',
            borderBottom: '1px solid rgba(118, 65, 192, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          {/* Browser Controls */}
          <Group gap="8px">
            <MotionBox
              style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#FF5F56' }}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2 }}
            />
            <MotionBox
              style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#FFBD2E' }}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2 }}
            />
            <MotionBox
              style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#27C93F' }}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2 }}
            />
          </Group>

          {/* URL Bar */}
          <Box
            style={{
              flex: 1,
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '8px',
              padding: '8px 14px',
              marginLeft: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.3)',
            }}
          >
            <MotionBox
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              initial={{ opacity: 0.7 }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
            >
              <Box style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #7641C0, #9969E5)',
                opacity: 0.8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <IconDeviceDesktop size={10} color="white" />
              </Box>
              <Text size="xs" fw={500} c="gray.4">
                {locale === 'en' ? 'www.yoursite.com' : locale === 'fr' ? 'www.votresite.com' : 'www.seusite.com.br'}
              </Text>
            </MotionBox>
          </Box>
        </Box>

        {/* Browser Content */}
        <Box
          style={{
            height: '350px',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #0A0A0A, #111111)',
            boxShadow: 'inset 0 0 50px rgba(118, 65, 192, 0.1)',
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: activeStep === 0 ? 1 : 0,
              scale: activeStep === 0 ? 1 : 0.9,
              zIndex: activeStep === 0 ? 2 : 1
            }}
            transition={{
              duration: 0.8,
              ease: 'easeInOut'
            }}
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
              <Text ta="center" fw={700} size="xl" c="white">{t.wireframe.content}</Text>
              <Text ta="center" c="gray.4" size="sm">
                {t.wireframe.details}
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: activeStep === 1 ? 1 : 0,
              scale: activeStep === 1 ? 1 : 0.9,
              zIndex: activeStep === 1 ? 2 : 1
            }}
            transition={{
              duration: 0.8,
              ease: 'easeInOut'
            }}
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: activeStep === 2 ? 1 : 0,
              scale: activeStep === 2 ? 1 : 0.9,
              zIndex: activeStep === 2 ? 2 : 1
            }}
            transition={{
              duration: 0.8,
              ease: 'easeInOut'
            }}
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
                  background: 'radial-gradient(circle at 50% 50%, rgba(118, 65, 192, 0.3), transparent 70%)',
                animation: `${pulseAnimation} 8s infinite ease-in-out`,
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
                    {locale === 'en' ? 'YourSite.com' : locale === 'fr' ? 'VotreSite.com' : 'SeuSite.com.br'}
                  </Text>
                </Group>
                <Group gap="20px">
                  {[t.menu.home, t.menu.services, t.menu.about, t.menu.contact].map((item) => (
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
                    {t.menu.contact}
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
                    {t.hero.welcome}
                  </Badge>
                  <Title order={1} c="white" mb="xs">
                    {t.hero.title}
                  </Title>
                  <Text c="gray.3" mb="md">
                    {t.hero.subtitle}
                  </Text>
                  <Button
                    variant="gradient"
                    gradient={{ from: '#7641C0', to: '#9969E5' }}
                    rightSection={<IconArrowRight size={16} />}
                  >
                    {t.hero.cta}
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

      {/* Indicadores de progresso */}
      <Group justify="center" mt="md" style={{ zIndex: 3 }}>
        {[0, 1, 2].map((step) => (
          <MotionBox
            key={step}
            style={{
              width: activeStep === step ? '30px' : '10px',
              height: '10px',
              borderRadius: '5px',
              background: activeStep === step
                ? 'linear-gradient(90deg, #7641C0, #9969E5)'
                : 'rgba(255, 255, 255, 0.2)',
              cursor: 'pointer',
              margin: '0 5px',
              boxShadow: activeStep === step ? '0 0 10px rgba(118, 65, 192, 0.5)' : 'none',
            }}
            initial={{ opacity: 0.6 }}
            animate={{
              opacity: activeStep === step ? 1 : 0.6,
              width: activeStep === step ? '30px' : '10px',
            }}
            transition={{ duration: 0.3 }}
            onClick={() => setActiveStep(step)}
            whileHover={{ opacity: 1 }}
          />
        ))}
      </Group>
    </MotionBox>
  );
}
