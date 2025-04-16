'use client';

import { Box, Container, Group, Text, ThemeIcon, SimpleGrid, useMantineTheme } from '@mantine/core';
import { 
  IconShieldCheck, 
  IconRocket, 
  IconCertificate, 
  IconClockHour4 
} from '@tabler/icons-react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export function TrustSignals() {
  const theme = useMantineTheme();
  
  const trustItems = [
    {
      icon: <IconShieldCheck size={24} />,
      title: 'Segurança Garantida',
      description: 'Proteção de dados de nível bancário com servidores na Suíça'
    },
    {
      icon: <IconRocket size={24} />,
      title: 'Performance Superior',
      description: 'Sites otimizados para velocidade e experiência do usuário'
    },
    {
      icon: <IconCertificate size={24} />,
      title: 'Qualidade Certificada',
      description: 'Padrões suíços de excelência em cada projeto'
    },
    {
      icon: <IconClockHour4 size={24} />,
      title: 'Suporte 24/7',
      description: 'Assistência técnica disponível a qualquer momento'
    }
  ];

  return (
    <Box 
      py={40}
      style={{
        background: 'linear-gradient(to bottom, rgba(13,13,13,0.7) 0%, rgba(26,26,26,0.7) 100%)',
        backdropFilter: 'blur(10px)',
        borderTop: `1px solid ${theme.colors.dark[5]}`,
        borderBottom: `1px solid ${theme.colors.dark[5]}`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow effect */}
      <Box
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '80%',
          height: '80%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(118,65,192,0.05) 0%, rgba(118,65,192,0) 70%)',
          zIndex: 0,
        }}
      />
      
      <Container size="xl">
        <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }} spacing="xl">
          {trustItems.map((item, index) => (
            <MotionBox
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              style={{ zIndex: 1 }}
            >
              <Group>
                <ThemeIcon 
                  size={50} 
                  radius="md" 
                  variant="gradient" 
                  gradient={{ from: 'purple.7', to: 'purple.5', deg: 45 }}
                >
                  {item.icon}
                </ThemeIcon>
                <Box>
                  <Text fw={600} size="lg" c="white">{item.title}</Text>
                  <Text size="sm" c="gray.4">{item.description}</Text>
                </Box>
              </Group>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
