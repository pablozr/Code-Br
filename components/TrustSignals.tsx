'use client';

import { Box, Container, Group, Text, ThemeIcon, SimpleGrid, useMantineTheme, Divider } from '@mantine/core';
import {
  IconShieldCheck,
  IconRocket,
  IconCertificate,
  IconClockHour4,
  IconServer
} from '@tabler/icons-react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionThemeIcon = motion(ThemeIcon);

export function TrustSignals() {
  const theme = useMantineTheme();

  const trustItems = [
    {
      icon: <IconShieldCheck size={24} stroke={1.5} />,
      title: 'Segurança Garantida',
      description: 'Proteção de dados de nível bancário com servidores na Suíça'
    },
    {
      icon: <IconRocket size={24} stroke={1.5} />,
      title: 'Performance Superior',
      description: 'Sites otimizados para velocidade e experiência do usuário'
    },
    {
      icon: <IconCertificate size={24} stroke={1.5} />,
      title: 'Qualidade Certificada',
      description: 'Padrões suíços de excelência em cada projeto'
    },
    {
      icon: <IconServer size={24} stroke={1.5} />,
      title: 'Hospedagem Premium',
      description: 'Servidores de alta performance localizados na Suíça'
    },
    {
      icon: <IconClockHour4 size={24} stroke={1.5} />,
      title: 'Suporte 24/7',
      description: 'Assistência técnica disponível a qualquer momento'
    }
  ];

  return (
    <Box
      py={60}
      style={{
        background: 'linear-gradient(to bottom, rgba(10,10,10,0.8) 0%, rgba(15,15,15,0.8) 100%)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
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
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          mb={40}
          ta="center"
        >
          <MotionText
            c="purple.4"
            fw={600}
            tt="uppercase"
            mb="xs"
            size="sm"
          >
            Por que nos escolher
          </MotionText>
          <MotionText
            size="xl"
            fw={600}
            c="white"
            mb="md"
          >
            Qualidade e precisão suíça em cada detalhe
          </MotionText>
        </MotionBox>

        <SimpleGrid cols={{ base: 1, xs: 2, md: 5 }} spacing="xl">
          {trustItems.map((item, index) => (
            <MotionBox
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              style={{ zIndex: 1 }}
              ta="center"
            >
              <MotionThemeIcon
                size={60}
                radius="xl"
                variant="light"
                color="purple.5"
                mb="md"
                mx="auto"
                style={{
                  backgroundColor: 'rgba(118,65,192,0.15)',
                  backdropFilter: 'blur(10px)',
                }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'rgba(118,65,192,0.2)',
                }}
              >
                {item.icon}
              </MotionThemeIcon>
              <Text fw={600} size="md" c="white" mb="xs">{item.title}</Text>
              <Text size="sm" c="gray.5" lh={1.5}>{item.description}</Text>
            </MotionBox>
          ))}
        </SimpleGrid>

        <Divider
          my={60}
          color="dark.7"
          style={{
            width: '40%',
            margin: '60px auto',
            opacity: 0.5,
          }}
        />

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          ta="center"
          maw={800}
          mx="auto"
        >
          <Text size="lg" c="gray.4" fw={500} lh={1.6}>
            "Nosso compromisso é oferecer soluções web de alta qualidade, combinando design moderno com tecnologia avançada e a tradicional precisão suíça."
          </Text>
        </MotionBox>
      </Container>
    </Box>
  );
}
