'use client';

import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  ThemeIcon,
  rem,
  Box,
  Stack,
  useMantineTheme,
  Group,
  Badge
} from '@mantine/core';
import {
  IconGlobe,
  IconShoppingCart,
  IconCode,
  IconArrowUpRight
} from '@tabler/icons-react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionTitle = motion(Title);
const MotionThemeIcon = motion(ThemeIcon);

export function ServicesSection() {
  const theme = useMantineTheme();

  const services = [
    {
      icon: <IconGlobe size={rem(24)} />,
      title: 'Landing Pages',
      description: 'Páginas de destino atraentes e otimizadas para conversão, perfeitas para campanhas de marketing e apresentação de produtos ou serviços.',
      features: ['Design responsivo', 'Otimização SEO', 'Formulários inteligentes'],
      color: 'purple'
    },
    {
      icon: <IconShoppingCart size={rem(24)} />,
      title: 'E-commerce',
      description: 'Lojas online completas com gestão de produtos, carrinho de compras, pagamentos seguros e experiência de compra otimizada para seus clientes.',
      features: ['Pagamentos seguros', 'Gestão de estoque', 'Painel administrativo'],
      color: 'violet'
    },
    {
      icon: <IconCode size={rem(24)} />,
      title: 'Projetos Personalizados',
      description: 'Soluções web sob medida para necessidades específicas do seu negócio, com desenvolvimento personalizado e consultoria especializada.',
      features: ['Consultoria técnica', 'Desenvolvimento sob medida', 'Suporte premium'],
      color: 'indigo'
    }
  ];

  return (
    <Box py={120} style={{ background: 'linear-gradient(to bottom, #0A0A0A, #111111)' }}>
      <Container size="xl">
        <Stack spacing={80}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            ta="center"
          >
            <Text
              c="purple.4"
              fw={600}
              tt="uppercase"
              mb="xs"
              size="sm"
            >
              Nossos Serviços
            </Text>
            <MotionTitle
              order={2}
              ta="center"
              size="2.5rem"
              fw={700}
              mb="md"
              c="white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Soluções Completas para sua Presença Online
            </MotionTitle>
            <Text size="lg" c="gray.3" maw={700} mx="auto">
              Oferecemos serviços especializados para atender às necessidades específicas do seu negócio,
              com foco em qualidade, segurança e resultados.
            </Text>
          </MotionBox>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={40}>
            {services.map((service, index) => (
              <MotionCard
                key={index}
                shadow="md"
                radius="lg"
                padding="xl"
                withBorder
                style={{
                  borderColor: 'rgba(255,255,255,0.05)',
                  background: 'linear-gradient(145deg, rgba(20,20,20,0.5) 0%, rgba(15,15,15,0.5) 100%)',
                  backdropFilter: 'blur(10px)',
                  height: '100%',
                  overflow: 'hidden',
                  position: 'relative',
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{
                  translateY: -5,
                  boxShadow: '0 20px 30px -10px rgba(0,0,0,0.4)',
                  borderColor: 'rgba(118,65,192,0.2)',
                }}
              >
                {/* Background glow */}
                <Box
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '150px',
                    height: '150px',
                    background: `radial-gradient(circle, rgba(118,65,192,0.1) 0%, rgba(118,65,192,0) 70%)`,
                    zIndex: 0,
                    borderRadius: '50%',
                    transform: 'translate(50%, -50%)',
                  }}
                />

                {/* Gradient overlay */}
                <Box
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: index === 0
                      ? 'linear-gradient(135deg, rgba(118,65,192,0.05) 0%, rgba(118,65,192,0) 60%)'
                      : 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 60%)',
                    zIndex: 0,
                  }}
                />

                <Stack spacing="md" style={{ position: 'relative', zIndex: 1 }}>
                  <MotionThemeIcon
                    size={60}
                    radius="xl"
                    variant="light"
                    color="purple.5"
                    mb="md"
                    style={{
                      backgroundColor: 'rgba(118,65,192,0.15)',
                    }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: 'rgba(118,65,192,0.2)',
                    }}
                  >
                    {service.icon}
                  </MotionThemeIcon>

                  <Title order={3} fw={600} size="h3" mb="xs" c="white">{service.title}</Title>

                  <Text c="gray.4" size="md" mb="md" lh={1.6}>
                    {service.description}
                  </Text>

                  <Box>
                    {service.features.map((feature, i) => (
                      <Group key={i} mb="xs" align="center">
                        <Box
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: '#9969E5'
                          }}
                        />
                        <Text size="sm" c="gray.5">{feature}</Text>
                      </Group>
                    ))}
                  </Box>

                  <Group
                    mt="auto"
                    style={{
                      justifyContent: 'flex-end',
                      marginTop: '20px'
                    }}
                  >
                    <MotionBox
                      component="a"
                      href="/pricing"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: theme.colors.purple[4],
                        fontWeight: 500,
                        cursor: 'pointer',
                      }}
                      whileHover={{ x: 5 }}
                    >
                      <Text size="sm" mr={5}>Saiba mais</Text>
                      <IconArrowUpRight size={16} />
                    </MotionBox>
                  </Group>
                </Stack>
              </MotionCard>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}
