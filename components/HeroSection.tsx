'use client';

import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Box,
  Badge,
  SimpleGrid,
  useMantineTheme
} from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { MacbookSimulator } from './MacbookSimulator';
import { motion } from 'framer-motion';

// @ts-ignore - Type issues with motion components
const MotionBox = motion(Box);
const MotionTitle = motion(Title);
const MotionText = motion(Text);
const MotionBadge = motion(Badge);
const MotionGroup = motion(Group);

export function HeroSection() {

  return (
    <Box
      style={{
        background: 'linear-gradient(135deg, rgba(10,10,10,1) 0%, rgba(20,20,20,1) 100%)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Refined background with subtle grid pattern */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(118,65,192,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(118,65,192,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          opacity: 0.5,
          zIndex: 0,
        }}
      />

      {/* Left vertical line */}
      <Box
        style={{
          position: 'absolute',
          top: '5%',
          left: '50px',
          width: '1px',
          height: '90%',
          background: 'linear-gradient(to bottom, rgba(118,65,192,0), rgba(118,65,192,0.2) 20%, rgba(118,65,192,0.2) 80%, rgba(118,65,192,0))',
          zIndex: 0,
        }}
      />

      {/* Left vertical line 2 */}
      <Box
        style={{
          position: 'absolute',
          top: '15%',
          left: '80px',
          width: '1px',
          height: '70%',
          background: 'linear-gradient(to bottom, rgba(118,65,192,0), rgba(118,65,192,0.1) 20%, rgba(118,65,192,0.1) 80%, rgba(118,65,192,0))',
          zIndex: 0,
        }}
      />

      {/* Right vertical line */}
      <Box
        style={{
          position: 'absolute',
          top: '5%',
          right: '50px',
          width: '1px',
          height: '90%',
          background: 'linear-gradient(to bottom, rgba(118,65,192,0), rgba(118,65,192,0.2) 20%, rgba(118,65,192,0.2) 80%, rgba(118,65,192,0))',
          zIndex: 0,
        }}
      />

      {/* Right vertical line 2 */}
      <Box
        style={{
          position: 'absolute',
          top: '15%',
          right: '80px',
          width: '1px',
          height: '70%',
          background: 'linear-gradient(to bottom, rgba(118,65,192,0), rgba(118,65,192,0.1) 20%, rgba(118,65,192,0.1) 80%, rgba(118,65,192,0))',
          zIndex: 0,
        }}
      />

      {/* Subtle gradient overlay */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(118,65,192,0.1) 0%, rgba(20,20,20,0) 70%)',
          zIndex: 0,
        }}
      />

      {/* Left side gradient */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '150px',
          height: '100%',
          background: 'linear-gradient(90deg, rgba(118,65,192,0.15) 0%, rgba(118,65,192,0) 100%)',
          zIndex: 0,
        }}
      />

      {/* Left side decorative square */}
      <MotionBox
        style={{
          position: 'absolute',
          top: '40%',
          left: '10px',
          width: '15px',
          height: '15px',
          border: '1px solid rgba(118,65,192,0.3)',
          transform: 'rotate(45deg)',
          zIndex: 0,
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          rotate: ['45deg', '135deg', '45deg'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Left side decorative square 2 */}
      <Box
        style={{
          position: 'absolute',
          top: '20%',
          left: '25px',
          width: '8px',
          height: '8px',
          border: '1px solid rgba(118,65,192,0.2)',
          transform: 'rotate(45deg)',
          zIndex: 0,
        }}
      />

      {/* Left side decorative square 3 */}
      <MotionBox
        style={{
          position: 'absolute',
          top: '70%',
          left: '15px',
          width: '10px',
          height: '10px',
          border: '1px solid rgba(118,65,192,0.25)',
          transform: 'rotate(45deg)',
          zIndex: 0,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Right side gradient */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '150px',
          height: '100%',
          background: 'linear-gradient(270deg, rgba(118,65,192,0.15) 0%, rgba(118,65,192,0) 100%)',
          zIndex: 0,
        }}
      />

      {/* Right side decorative square */}
      <MotionBox
        style={{
          position: 'absolute',
          top: '60%',
          right: '10px',
          width: '15px',
          height: '15px',
          border: '1px solid rgba(118,65,192,0.3)',
          transform: 'rotate(45deg)',
          zIndex: 0,
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          rotate: ['45deg', '135deg', '45deg'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5,
        }}
      />

      {/* Right side decorative square 2 */}
      <Box
        style={{
          position: 'absolute',
          top: '30%',
          right: '25px',
          width: '8px',
          height: '8px',
          border: '1px solid rgba(118,65,192,0.2)',
          transform: 'rotate(45deg)',
          zIndex: 0,
        }}
      />

      {/* Right side decorative square 3 */}
      <MotionBox
        style={{
          position: 'absolute',
          top: '80%',
          right: '15px',
          width: '10px',
          height: '10px',
          border: '1px solid rgba(118,65,192,0.25)',
          transform: 'rotate(45deg)',
          zIndex: 0,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Left side parallax lines */}
      {Array.from({ length: 12 }).map((_, i) => (
        <MotionBox
          key={`left-${i}`}
          style={{
            position: 'absolute',
            left: 0,
            top: `${5 + i * 8}%`,
            width: '350px',
            height: '1px',
            background: `linear-gradient(90deg, rgba(118,65,192,${0.2 + i * 0.05}) 0%, rgba(118,65,192,0) 100%)`,
            zIndex: 0,
          }}
          animate={{
            x: ['-10%', '5%', '-10%'],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Right side parallax lines */}
      {Array.from({ length: 12 }).map((_, i) => (
        <MotionBox
          key={`right-${i}`}
          style={{
            position: 'absolute',
            right: 0,
            top: `${10 + i * 8}%`,
            width: '350px',
            height: '1px',
            background: `linear-gradient(270deg, rgba(118,65,192,${0.2 + i * 0.05}) 0%, rgba(118,65,192,0) 100%)`,
            zIndex: 0,
          }}
          animate={{
            x: ['10%', '-5%', '10%'],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 7 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Left side decorative elements */}
      <MotionBox
        style={{
          position: 'absolute',
          left: '5%',
          top: '20%',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          border: '1px solid rgba(118,65,192,0.2)',
          zIndex: 0,
        }}
        animate={{
          y: [0, -15, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Left side vertical decorative elements */}
      {Array.from({ length: 8 }).map((_, i) => (
        <MotionBox
          key={`left-dot-${i}`}
          style={{
            position: 'absolute',
            left: i % 2 === 0 ? '20px' : '35px',
            top: `${10 + i * 12}%`,
            width: i % 3 === 0 ? '6px' : '4px',
            height: i % 3 === 0 ? '6px' : '4px',
            borderRadius: '50%',
            backgroundColor: `rgba(118,65,192,${0.3 + i * 0.1})`,
            zIndex: 0,
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Right side vertical decorative elements */}
      {Array.from({ length: 8 }).map((_, i) => (
        <MotionBox
          key={`right-dot-${i}`}
          style={{
            position: 'absolute',
            right: i % 2 === 0 ? '20px' : '35px',
            top: `${15 + i * 12}%`,
            width: i % 3 === 0 ? '6px' : '4px',
            height: i % 3 === 0 ? '6px' : '4px',
            borderRadius: '50%',
            backgroundColor: `rgba(118,65,192,${0.3 + i * 0.1})`,
            zIndex: 0,
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.7,
          }}
        />
      ))}

      <MotionBox
        style={{
          position: 'absolute',
          left: '10%',
          bottom: '25%',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          border: '1px solid rgba(118,65,192,0.1)',
          zIndex: 0,
        }}
        animate={{
          y: [0, 20, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      <MotionBox
        style={{
          position: 'absolute',
          left: '3%',
          top: '60%',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '1px solid rgba(118,65,192,0.3)',
          zIndex: 0,
        }}
        animate={{
          y: [0, -10, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      <MotionBox
        style={{
          position: 'absolute',
          left: '15%',
          top: '75%',
          width: '15px',
          height: '15px',
          borderRadius: '50%',
          backgroundColor: 'rgba(118,65,192,0.2)',
          zIndex: 0,
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Right side decorative elements */}
      <MotionBox
        style={{
          position: 'absolute',
          right: '8%',
          top: '30%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          border: '1px solid rgba(118,65,192,0.15)',
          zIndex: 0,
        }}
        animate={{
          y: [0, 15, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />

      <MotionBox
        style={{
          position: 'absolute',
          right: '12%',
          bottom: '20%',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          border: '1px solid rgba(118,65,192,0.25)',
          zIndex: 0,
        }}
        animate={{
          y: [0, -10, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5,
        }}
      />

      <MotionBox
        style={{
          position: 'absolute',
          right: '5%',
          top: '65%',
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          border: '1px solid rgba(118,65,192,0.2)',
          zIndex: 0,
        }}
        animate={{
          y: [0, 8, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />

      <MotionBox
        style={{
          position: 'absolute',
          right: '18%',
          top: '80%',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: 'rgba(118,65,192,0.3)',
          zIndex: 0,
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      <Container fluid px={{ base: 20, md: 40, lg: 80 }} style={{ position: 'relative', zIndex: 1 }}>
        <Stack gap={80}>
          <Box>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={50}>
              <Stack justify="center" gap="xl">
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <MotionBadge
                    variant="gradient"
                    gradient={{ from: 'purple.7', to: 'purple.5' }}
                    size="lg"
                    mb="md"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Websites Profissionais
                  </MotionBadge>

                  <MotionTitle
                    order={1}
                    size="3.5rem"
                    fw={800}
                    lh={1.1}
                    style={{
                      background: 'linear-gradient(90deg, #fff 0%, #a9a9a9 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    Websites Suíços
                  </MotionTitle>

                  <MotionTitle
                    order={2}
                    size="2.5rem"
                    fw={800}
                    mt="xs"
                    mb="md"
                    style={{
                      background: 'linear-gradient(90deg, rgba(118,65,192,1) 0%, rgba(142,98,204,1) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    Qualidade e Precisão
                  </MotionTitle>

                  <MotionText
                    size="xl"
                    c="gray.3"
                    maw={500}
                    mt="xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    Criamos websites profissionais com a precisão suíça. Desde landing pages
                    até lojas online completas, oferecemos soluções personalizadas com
                    hospedagem segura na Suíça.
                  </MotionText>
                </MotionBox>

                <MotionGroup
                  mt="xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Button
                    component="a"
                    href="/pricing"
                    size="lg"
                    radius="xl"
                    variant="gradient"
                    gradient={{ from: 'purple.7', to: 'purple.5', deg: 45 }}
                    rightSection={<IconArrowRight size={18} />}
                    style={{
                      boxShadow: '0 10px 20px -10px rgba(118,65,192,0.5)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 15px 25px -10px rgba(118,65,192,0.6)',
                      }
                    }}
                  >
                    Ver nossos serviços
                  </Button>
                  <Button
                    component="a"
                    href="/contact"
                    size="lg"
                    radius="xl"
                    variant="outline"
                    color="gray.0"
                    style={{
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                      }
                    }}
                  >
                    Fale conosco
                  </Button>
                </MotionGroup>
              </Stack>

              <MotionBox
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <MacbookSimulator />
              </MotionBox>
            </SimpleGrid>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
