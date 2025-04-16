'use client';

import {
  Container,
  Title,
  Text,
  Button,
  Group,
  ThemeIcon,
  SimpleGrid,
  Card,
  rem,
  Box,
  Stack,
  Divider,
  useMantineTheme
} from '@mantine/core';
import {
  IconArrowRight,
  IconGlobe,
  IconShield,
  IconRocket,
  IconLock,
  IconServer,
  IconCloudLock
} from '@tabler/icons-react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionTitle = motion(Title);
const MotionText = motion(Text);
const MotionCard = motion(Card);
const MotionGroup = motion(Group);

export function HostingSection() {
  const theme = useMantineTheme();

  return (
    <Box
      py={120}
      style={{
        background: 'linear-gradient(to bottom, #111111, #0A0A0A)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background elements */}
      <MotionBox
        style={{
          position: 'absolute',
          bottom: '-30%',
          right: '-10%',
          width: '60%',
          height: '180%',
          background: 'radial-gradient(circle, rgba(118,65,192,0.1) 0%, rgba(118,65,192,0) 70%)',
          zIndex: 0,
        }}
        animate={{
          transform: ['rotate(15deg) scale(1)', 'rotate(20deg) scale(1.05)', 'rotate(15deg) scale(1)'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Server rack illustration */}
      <MotionBox
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '5%',
          width: '300px',
          height: '300px',
          opacity: 0.05,
          zIndex: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='2' y='2' width='20' height='8' rx='2' ry='2'%3E%3C/rect%3E%3Crect x='2' y='14' width='20' height='8' rx='2' ry='2'%3E%3C/rect%3E%3Cline x1='6' y1='6' x2='6.01' y2='6'%3E%3C/line%3E%3Cline x1='6' y1='18' x2='6.01' y2='18'%3E%3C/line%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
        }}
        animate={{
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <Container size="xl" style={{ position: 'relative', zIndex: 1 }}>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={50} align="center">
          <Stack spacing="xl">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <MotionTitle
                order={2}
                size="2.5rem"
                fw={700}
                mb="md"
                c="white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                Hospedagem na Suíça
              </MotionTitle>

              <MotionText
                size="lg"
                c="gray.4"
                maw={600}
                lh={1.7}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                Todos os nossos sites são hospedados em servidores suíços de alta segurança,
                garantindo privacidade de dados, velocidade excepcional e conformidade com
                as mais rigorosas regulamentações de proteção de dados.
              </MotionText>

              <MotionBox
                mt="xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Group mt="xl">
                  <Button
                    component="a"
                    href="/pricing"
                    size="lg"
                    radius="xl"
                    variant="filled"
                    color="purple.5"
                    rightSection={<IconArrowRight size={18} />}
                    style={{
                      boxShadow: '0 4px 15px -3px rgba(118,65,192,0.3)',
                      transition: 'all 0.2s ease',
                      height: rem(52),
                      fontWeight: 500,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 20px -4px rgba(118,65,192,0.4)',
                      }
                    }}
                  >
                    Solicitar orçamento
                  </Button>
                </Group>
              </MotionBox>
            </MotionBox>

            {/* Swiss map outline */}
            <MotionBox
              style={{
                width: '100%',
                maxWidth: '300px',
                height: '200px',
                margin: '0 auto',
                marginTop: '2rem',
                position: 'relative',
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.15 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Box
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23ffffff' d='M500,256c0,135.31-109.69,245-245,245S10,391.31,10,256,119.69,11,255,11,500,120.69,500,256Zm-459.18,0c0,118.3,95.88,214.18,214.18,214.18S469.18,374.3,469.18,256,373.3,41.82,255,41.82,40.82,137.7,40.82,256Z'/%3E%3Cpath fill='%23ffffff' d='M255,274.09c-10,0-18.09-8.09-18.09-18.09s8.09-18.09,18.09-18.09,18.09,8.09,18.09,18.09S265,274.09,255,274.09Zm0-30.18c-6.68,0-12.09,5.41-12.09,12.09s5.41,12.09,12.09,12.09,12.09-5.41,12.09-12.09S261.68,243.91,255,243.91Z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'contain',
                }}
              />

              {/* Pulsing dot for server location */}
              <MotionBox
                style={{
                  position: 'absolute',
                  top: '45%',
                  left: '48%',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: theme.colors.purple[5],
                  zIndex: 2,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  boxShadow: [
                    '0 0 0 0 rgba(118,65,192,0.7)',
                    '0 0 0 10px rgba(118,65,192,0)',
                    '0 0 0 0 rgba(118,65,192,0.7)'
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </MotionBox>
          </Stack>

          <MotionBox
            style={{ position: 'relative', zIndex: 1 }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <MotionCard
              shadow="lg"
              radius="lg"
              padding="xl"
              withBorder
              style={{
                borderColor: 'rgba(255,255,255,0.05)',
                background: 'linear-gradient(145deg, rgba(20,20,20,0.5) 0%, rgba(15,15,15,0.5) 100%)',
                backdropFilter: 'blur(10px)',
                overflow: 'hidden',
              }}
              whileHover={{
                boxShadow: '0 20px 30px -10px rgba(0,0,0,0.4)',
                borderColor: 'rgba(118,65,192,0.2)',
              }}
            >
              {/* Card glow effect */}
              <Box
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, rgba(118,65,192,0.05) 0%, rgba(118,65,192,0) 60%)',
                  zIndex: 0,
                }}
              />

              <Stack spacing="lg" style={{ position: 'relative', zIndex: 1 }}>
                <MotionGroup
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <ThemeIcon
                    size={50}
                    radius="xl"
                    variant="light"
                    color="purple.5"
                    style={{
                      backgroundColor: 'rgba(118,65,192,0.15)',
                    }}
                  >
                    <IconShield size={rem(24)} stroke={1.5} />
                  </ThemeIcon>
                  <div>
                    <Title order={4} fw={600} c="white">Segurança Garantida</Title>
                    <Text c="gray.4" size="sm">Proteção de dados de nível bancário</Text>
                  </div>
                </MotionGroup>

                <Divider color="dark.7" opacity={0.5} />

                <MotionGroup
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <ThemeIcon
                    size={50}
                    radius="xl"
                    variant="light"
                    color="purple.5"
                    style={{
                      backgroundColor: 'rgba(118,65,192,0.15)',
                    }}
                  >
                    <IconRocket size={rem(24)} stroke={1.5} />
                  </ThemeIcon>
                  <div>
                    <Title order={4} fw={600} c="white">Alta Performance</Title>
                    <Text c="gray.4" size="sm">Velocidade e estabilidade excepcionais</Text>
                  </div>
                </MotionGroup>

                <Divider color="dark.7" opacity={0.5} />

                <MotionGroup
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <ThemeIcon
                    size={50}
                    radius="xl"
                    variant="light"
                    color="purple.5"
                    style={{
                      backgroundColor: 'rgba(118,65,192,0.15)',
                    }}
                  >
                    <IconGlobe size={rem(24)} stroke={1.5} />
                  </ThemeIcon>
                  <div>
                    <Title order={4} fw={600} c="white">Conformidade GDPR</Title>
                    <Text c="gray.4" size="sm">Atende às normas europeias de privacidade</Text>
                  </div>
                </MotionGroup>

                <Divider color="dark.7" opacity={0.5} />

                <MotionGroup
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <ThemeIcon
                    size={50}
                    radius="xl"
                    variant="light"
                    color="purple.5"
                    style={{
                      backgroundColor: 'rgba(118,65,192,0.15)',
                    }}
                  >
                    <IconCloudLock size={rem(24)} stroke={1.5} />
                  </ThemeIcon>
                  <div>
                    <Title order={4} fw={600} c="white">Backups Automáticos</Title>
                    <Text c="gray.4" size="sm">Seus dados sempre protegidos e recuperáveis</Text>
                  </div>
                </MotionGroup>
              </Stack>
            </MotionCard>
          </MotionBox>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
