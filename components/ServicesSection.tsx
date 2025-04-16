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
    <Box py={100} bg="dark.9">
      <Container size="xl">
        <Stack spacing={80}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            ta="center"
          >
            <Badge 
              variant="gradient" 
              gradient={{ from: 'purple.7', to: 'purple.5' }}
              size="lg"
              mb="md"
            >
              Nossos Serviços
            </Badge>
            <MotionTitle
              order={2}
              ta="center"
              size="2.5rem"
              fw={700}
              mb="lg"
              style={{
                background: 'linear-gradient(90deg, #fff 0%, #a9a9a9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
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

          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
            {services.map((service, index) => (
              <MotionCard
                key={index}
                shadow="md"
                radius="md"
                padding="xl"
                withBorder
                style={{
                  borderColor: theme.colors.dark[6],
                  background: 'linear-gradient(145deg, rgba(26,26,26,0.8) 0%, rgba(13,13,13,0.8) 100%)',
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
                  boxShadow: '0 20px 30px -10px rgba(0,0,0,0.4)'
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

                <Stack spacing="md" style={{ position: 'relative', zIndex: 1 }}>
                  <MotionThemeIcon
                    size={60}
                    radius="md"
                    variant="gradient"
                    gradient={{ from: 'purple.7', to: 'purple.5', deg: 45 }}
                    mb="md"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 0 20px rgba(118,65,192,0.5)'
                    }}
                  >
                    {service.icon}
                  </MotionThemeIcon>

                  <Title order={3} fw={600} size="h3" mb="xs" c="white">{service.title}</Title>

                  <Text c="gray.3" size="md" mb="md">
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
                            backgroundColor: theme.colors.purple[5] 
                          }} 
                        />
                        <Text size="sm" c="gray.4">{feature}</Text>
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
