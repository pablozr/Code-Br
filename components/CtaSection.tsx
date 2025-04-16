'use client';

import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Box,
  Stack,
  useMantineTheme
} from '@mantine/core';
import { IconArrowRight, IconBrandWhatsapp } from '@tabler/icons-react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionTitle = motion(Title);
const MotionText = motion(Text);
const MotionGroup = motion(Group);

export function CtaSection() {
  const theme = useMantineTheme();
  
  return (
    <Box
      py={100}
      style={{
        background: 'linear-gradient(135deg, rgba(20,20,20,1) 0%, rgba(30,30,30,1) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background elements */}
      <MotionBox
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(118,65,192,0.15) 0%, rgba(118,65,192,0) 50%)',
          zIndex: 0,
        }}
      />
      
      {/* Animated lines */}
      {Array.from({ length: 5 }).map((_, i) => (
        <MotionBox
          key={i}
          style={{
            position: 'absolute',
            height: '1px',
            width: '100%',
            backgroundColor: 'rgba(118,65,192,0.1)',
            top: `${20 * i}%`,
            left: 0,
            zIndex: 0,
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            translateX: ['-10%', '0%', '10%'],
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatType: 'reverse',
          }}
        />
      ))}

      <Container size="md" style={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing="xl" align="center">
          <MotionTitle
            order={2}
            ta="center"
            size="2.5rem"
            fw={700}
            mb="md"
            style={{
              background: 'linear-gradient(90deg, #fff 0%, #a9a9a9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Pronto para Transformar sua Presença Online?
          </MotionTitle>
          
          <MotionText
            size="xl"
            c="gray.3"
            maw={700}
            ta="center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Entre em contato conosco hoje mesmo e descubra como podemos ajudar a criar
            uma presença online de alta qualidade para o seu negócio.
          </MotionText>
          
          <MotionGroup
            mt="xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Button
              component="a"
              href="/contact"
              size="xl"
              radius="xl"
              variant="gradient"
              gradient={{ from: 'purple.7', to: 'purple.5', deg: 45 }}
              rightSection={<IconArrowRight size={20} />}
              sx={{
                boxShadow: '0 10px 20px -10px rgba(118,65,192,0.5)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 15px 25px -10px rgba(118,65,192,0.6)',
                }
              }}
            >
              Solicitar Orçamento Gratuito
            </Button>
            
            <Button
              component="a"
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              size="xl"
              radius="xl"
              variant="outline"
              color="gray.0"
              leftSection={<IconBrandWhatsapp size={20} />}
              sx={{
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                }
              }}
            >
              Fale pelo WhatsApp
            </Button>
          </MotionGroup>
        </Stack>
      </Container>
    </Box>
  );
}
