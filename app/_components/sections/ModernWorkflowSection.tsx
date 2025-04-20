'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Title,
  Text,
  Container,
  ThemeIcon,
  rem,
  Flex,
  Grid,
  Card,
  Group,
  Badge,
  SimpleGrid,
  Transition,
  Paper,
  Button,
} from '@mantine/core';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  IconBulb,
  IconCode,
  IconDeviceDesktop,
  IconRocket,
  IconHeartHandshake,
  IconChartLine,
  IconArrowRight,
  IconCircleCheck,
} from '@tabler/icons-react';

// Componentes com motion
const MotionBox = motion.div;
const MotionFlex = motion.div;
const MotionCard = motion.div;

// Dados do processo de trabalho
const workflowSteps = [
  {
    title: 'Descoberta e Planejamento',
    description: 'Entendemos suas necessidades, objetivos e público-alvo para criar um plano estratégico personalizado.',
    icon: <IconBulb size={rem(24)} stroke={1.5} />,
    details: [
      'Análise de requisitos',
      'Definição de objetivos',
      'Pesquisa de mercado',
      'Planejamento estratégico'
    ],
    color: 'rgba(153, 105, 229, 1)',
    badge: '01',
    image: '/images/workflow/discovery.webp'
  },
  {
    title: 'Design e Prototipagem',
    description: 'Criamos wireframes e protótipos interativos para visualizar a estrutura e o fluxo do seu projeto.',
    icon: <IconDeviceDesktop size={rem(24)} stroke={1.5} />,
    details: [
      'Wireframes e mockups',
      'Design de interface',
      'Experiência do usuário',
      'Protótipos interativos'
    ],
    color: 'rgba(153, 105, 229, 0.9)',
    badge: '02',
    image: '/images/workflow/design.webp'
  },
  {
    title: 'Desenvolvimento',
    description: 'Transformamos os designs em código, utilizando as tecnologias mais modernas e eficientes do mercado.',
    icon: <IconCode size={rem(24)} stroke={1.5} />,
    details: [
      'Codificação front-end',
      'Desenvolvimento back-end',
      'Integração de APIs',
      'Testes de qualidade'
    ],
    color: 'rgba(153, 105, 229, 0.8)',
    badge: '03',
    image: '/images/workflow/development.webp'
  },
  {
    title: 'Lançamento',
    description: 'Realizamos testes rigorosos e preparamos tudo para o lançamento do seu projeto com segurança.',
    icon: <IconRocket size={rem(24)} stroke={1.5} />,
    details: [
      'Testes finais',
      'Otimização de performance',
      'Configuração de servidores',
      'Lançamento controlado'
    ],
    color: 'rgba(153, 105, 229, 0.7)',
    badge: '04',
    image: '/images/workflow/launch.webp'
  },
  {
    title: 'Suporte Contínuo',
    description: 'Oferecemos suporte técnico, manutenção e atualizações para garantir o sucesso contínuo do seu projeto.',
    icon: <IconHeartHandshake size={rem(24)} stroke={1.5} />,
    details: [
      'Suporte técnico',
      'Manutenção preventiva',
      'Atualizações de segurança',
      'Melhorias contínuas'
    ],
    color: 'rgba(153, 105, 229, 0.6)',
    badge: '05',
    image: '/images/workflow/support.webp'
  },
  {
    title: 'Crescimento e Evolução',
    description: 'Analisamos métricas e feedback para implementar melhorias e novas funcionalidades que impulsionam seu negócio.',
    icon: <IconChartLine size={rem(24)} stroke={1.5} />,
    details: [
      'Análise de métricas',
      'Otimização de conversão',
      'Novas funcionalidades',
      'Escalabilidade'
    ],
    color: 'rgba(153, 105, 229, 0.5)',
    badge: '06',
    image: '/images/workflow/growth.webp'
  }
];

// Efeito de partículas para o fundo
function ParticlesEffect() {
  // Gerar valores determinísticos baseados no índice para evitar problemas de hidratação
  const generateParticles = () => {
    const particles = [];
    for (let i = 0; i < 50; i++) {
      // Usar valores determinísticos baseados no índice
      const size = (i % 3) + 1.5;
      const left = (i * 2) % 100;
      const top = (i * 1.7) % 100;
      const yMove = -((i % 10) * 10 + 50);
      const xMove = ((i % 6) - 2.5) * 10;
      const duration = (i % 5) * 3 + 15;
      const delay = (i % 5) * 1;

      particles.push({
        id: i,
        size,
        left,
        top,
        yMove,
        xMove,
        duration,
        delay
      });
    }
    return particles;
  };

  // Gerar partículas uma vez
  const particles = generateParticles();

  return (
    <Box
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0,
        opacity: 0.4,
      }}
    >
      {particles.map((particle) => (
        <MotionBox
          key={particle.id}
          style={{
            position: 'absolute',
            width: particle.size,
            height: particle.size,
            borderRadius: '50%',
            background: 'rgba(153, 105, 229, 0.8)',
            boxShadow: '0 0 10px rgba(153, 105, 229, 0.5)',
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            zIndex: 1,
          }}
          animate={{
            y: [0, particle.yMove],
            x: [0, particle.xMove],
            opacity: [0.8, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </Box>
  );
}

// Componente para o ícone animado
function AnimatedIcon({ icon, color }: { icon: React.ReactNode, color: string }) {
  return (
    <MotionBox
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ThemeIcon
        size={60}
        radius="md"
        style={{
          background: `linear-gradient(135deg, ${color}, rgba(30,30,30,0.5))`,
          border: '1px solid rgba(153,105,229,0.2)',
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
          color: 'white',
        }}
      >
        {icon}
      </ThemeIcon>

      {/* Efeito de brilho pulsante */}
      <MotionBox
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color}40 0%, ${color}00 70%)`,
          filter: 'blur(10px)',
          zIndex: -1,
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </MotionBox>
  );
}

// Estilos CSS para os efeitos de hover
const hoverStyles = `
  .step-card {
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  .step-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  }

  .step-card:hover .step-arrow {
    transform: translateX(5px);
    opacity: 1;
  }

  .step-arrow {
    transition: all 0.3s ease;
    opacity: 0.7;
  }

  .active-step {
    border: 1px solid rgba(153,105,229,0.5);
    box-shadow: 0 10px 30px rgba(153,105,229,0.2);
  }
`;

export function ModernWorkflowSection() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Função para alternar entre os passos
  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  // Efeito para alternar automaticamente entre os passos com transição suave
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % workflowSteps.length);
    }, 15000); // Tempo muito maior para cada passo (15 segundos)

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      py={120}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, rgba(15,15,15,1) 0%, rgba(20,20,20,1) 100%)',
        borderTop: '1px solid rgba(153,105,229,0.1)',
        borderBottom: '1px solid rgba(153,105,229,0.1)',
      }}
      ref={containerRef}
    >
      {/* Adiciona os estilos CSS para hover */}
      <style dangerouslySetInnerHTML={{ __html: hoverStyles }} />

      {/* Efeito de partículas */}
      <ParticlesEffect />

      {/* Efeito de gradiente sutil */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 50% 30%, rgba(153,105,229,0.05) 0%, rgba(20,20,20,0) 70%)',
          zIndex: 0,
        }}
      />

      <Container size="lg" style={{ position: 'relative', zIndex: 1 }}>
        {/* Cabeçalho da seção */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <div
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, rgba(118,65,192,0.15), rgba(153,105,229,0.1))',
              border: '1px solid rgba(153,105,229,0.2)',
              backdropFilter: 'blur(10px)',
              padding: '8px 16px',
              borderRadius: '4px',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'white',
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Metodologia
          </div>

          <Title
            order={2}
            size="3.5rem"
            fw={800}
            c="white"
            mb="md"
            style={{
              letterSpacing: '-0.5px',
              lineHeight: 1.2,
            }}
          >
            Nosso <Text span style={{
              background: 'linear-gradient(135deg, #9969E5, #7641C0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }} inherit>Processo</Text> de Trabalho
          </Title>

          <Text
            size="xl"
            c="gray.3"
            maw={700}
            mx="auto"
            lh={1.7}
            mb={60}
          >
            Desenvolvemos seu projeto com metodologia ágil e transparente, focando em resultados
            que impulsionam seu negócio. Conheça nosso processo de trabalho inovador:
          </Text>
        </MotionBox>

        {/* Navegação horizontal dos passos */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          mb={60}
        >
          <SimpleGrid cols={{ base: 2, sm: 3, md: 6 }} spacing="md">
            {workflowSteps.map((step, index) => (
              <MotionBox
                key={index}
                onClick={() => handleStepClick(index)}
                style={{ cursor: 'pointer' }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Paper
                  p="md"
                  radius="md"
                  style={{
                    background: activeStep === index
                      ? 'linear-gradient(135deg, rgba(30,30,30,0.9), rgba(40,40,40,0.9))'
                      : 'linear-gradient(135deg, rgba(25,25,25,0.5), rgba(30,30,30,0.5))',
                    border: activeStep === index
                      ? '1px solid rgba(153,105,229,0.3)'
                      : '1px solid rgba(255,255,255,0.05)',
                    transition: 'all 0.3s ease',
                    height: '100%',
                  }}
                >
                  <Flex direction="column" align="center" justify="center">
                    <Badge
                      size="lg"
                      radius="sm"
                      mb="sm"
                      style={{
                        background: activeStep === index
                          ? 'linear-gradient(135deg, rgba(153,105,229,0.3), rgba(118,65,192,0.3))'
                          : 'rgba(40,40,40,0.5)',
                        border: activeStep === index
                          ? '1px solid rgba(153,105,229,0.3)'
                          : '1px solid rgba(255,255,255,0.05)',
                        color: 'white',
                        fontWeight: 700,
                        minWidth: '36px',
                      }}
                    >
                      {step.badge}
                    </Badge>
                    <Text
                      size="sm"
                      fw={600}
                      c={activeStep === index ? 'white' : 'gray.5'}
                      ta="center"
                      lh={1.3}
                    >
                      {step.title}
                    </Text>
                  </Flex>
                </Paper>
              </MotionBox>
            ))}
          </SimpleGrid>
        </MotionBox>

        {/* Conteúdo detalhado do passo ativo */}
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ minHeight: '400px', marginTop: '60px' }}
        >
          {workflowSteps.map((step, index) => (
            <Transition
              key={index}
              mounted={activeStep === index}
              transition={{
                in: { opacity: 1, transform: 'translateX(0)' },
                out: { opacity: 0, transform: 'translateX(-5px)' },
                common: { transformOrigin: 'center center' },
                transitionProperty: 'opacity, transform',
              }}
              duration={1000}
              timingFunction="cubic-bezier(0.16, 1, 0.3, 1)"
              exitDuration={500}
            >
              {(styles) => (
                <Grid gutter={40} style={styles}>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <MotionBox
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    >
                      <Flex gap="md" mb="md" align="center">
                        <AnimatedIcon icon={step.icon} color={step.color} />
                        <div>
                          <Badge
                            size="sm"
                            radius="sm"
                            mb="xs"
                            style={{
                              background: 'linear-gradient(135deg, rgba(153,105,229,0.2), rgba(118,65,192,0.2))',
                              border: '1px solid rgba(153,105,229,0.2)',
                              color: 'white',
                            }}
                          >
                            {step.badge}
                          </Badge>
                          <Title order={3} size="2rem" fw={700} c="white" style={{ letterSpacing: '-0.5px' }}>
                            {step.title}
                          </Title>
                        </div>
                      </Flex>

                      <Text size="lg" c="gray.3" lh={1.7} mb="xl">
                        {step.description}
                      </Text>

                      <Box mb="xl">
                        <Text fw={600} size="md" c="white" mb="sm">
                          O que inclui:
                        </Text>
                        {step.details.map((detail, i) => (
                          <Flex key={i} align="center" gap="sm" mb="sm">
                            <ThemeIcon
                              size={24}
                              radius="xl"
                              style={{
                                background: 'linear-gradient(135deg, rgba(153,105,229,0.2), rgba(118,65,192,0.2))',
                                border: '1px solid rgba(153,105,229,0.2)',
                              }}
                            >
                              <IconCircleCheck size={16} stroke={1.5} />
                            </ThemeIcon>
                            <Text c="gray.3">{detail}</Text>
                          </Flex>
                        ))}
                      </Box>

                      {/* Removido o botão "Saiba mais" */}
                    </MotionBox>
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <MotionBox
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                      style={{
                        height: '100%',
                        minHeight: '450px',
                        position: 'relative',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {/* Mockup ilustrativo */}
                      <Box
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: `linear-gradient(135deg, ${step.color}20, rgba(20,20,20,0.8))`,
                          borderRadius: '16px',
                          border: '1px solid rgba(153,105,229,0.1)',
                          overflow: 'hidden',
                        }}
                      >
                        {/* Fundo com gradiente */}
                        <Box
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: `radial-gradient(circle at 50% 50%, ${step.color}20, rgba(20,20,20,0.9))`,
                            zIndex: 1,
                          }}
                        />

                        {/* Grade de linhas */}
                        <Box
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundImage: `
                              linear-gradient(rgba(153,105,229,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(153,105,229,0.1) 1px, transparent 1px)
                            `,
                            backgroundSize: '30px 30px',
                            zIndex: 2,
                          }}
                        />

                        {/* Mockup baseado no tipo de etapa */}
                        <MotionBox
                          style={{
                            position: 'relative',
                            width: '90%',
                            maxWidth: '500px',
                            zIndex: 3,
                            margin: '0 auto',
                          }}
                          initial={{ opacity: 0, y: 3 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                        >
                          {/* Mockup para Descoberta e Planejamento */}
                          {step.title === 'Descoberta e Planejamento' && (
                            <Box
                              style={{
                                background: 'rgba(25,25,25,0.95)',
                                borderRadius: '12px',
                                border: '1px solid rgba(153,105,229,0.3)',
                                padding: '25px',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(153,105,229,0.1)',
                                backdropFilter: 'blur(10px)',
                              }}
                            >
                              <Flex align="center" mb="lg">
                                <ThemeIcon
                                  size={40}
                                  radius="md"
                                  style={{
                                    background: 'linear-gradient(135deg, rgba(153,105,229,0.8), rgba(118,65,192,0.8))',
                                    marginRight: '15px',
                                  }}
                                >
                                  <IconBulb size={22} />
                                </ThemeIcon>
                                <div>
                                  <Text fw={700} size="lg" c="white" style={{ letterSpacing: '-0.3px' }}>Plano Estratégico</Text>
                                  <Text size="xs" c="gray.5">Projeto: Website Corporativo</Text>
                                </div>
                              </Flex>

                              <Box
                                mb="lg"
                                style={{
                                  background: 'rgba(35,35,35,0.7)',
                                  borderRadius: '8px',
                                  border: '1px solid rgba(153,105,229,0.15)',
                                  padding: '15px',
                                }}
                              >
                                <Flex justify="space-between" mb="xs">
                                  <Text size="sm" fw={600} c="white">Análise de Requisitos</Text>
                                  <Badge
                                    style={{
                                      background: 'rgba(153,105,229,0.2)',
                                      color: '#9969E5',
                                      border: '1px solid rgba(153,105,229,0.2)',
                                    }}
                                  >
                                    Completo
                                  </Badge>
                                </Flex>
                                <Box mb="sm" style={{ height: '6px', width: '100%', background: 'rgba(40,40,40,0.8)', borderRadius: '3px', overflow: 'hidden' }}>
                                  <Box style={{ height: '100%', width: '100%', background: 'linear-gradient(90deg, rgba(153,105,229,0.8), rgba(118,65,192,0.8))', borderRadius: '3px' }} />
                                </Box>

                                <Flex justify="space-between" mb="xs" mt="md">
                                  <Text size="sm" fw={600} c="white">Definição de Objetivos</Text>
                                  <Badge
                                    style={{
                                      background: 'rgba(153,105,229,0.2)',
                                      color: '#9969E5',
                                      border: '1px solid rgba(153,105,229,0.2)',
                                    }}
                                  >
                                    Completo
                                  </Badge>
                                </Flex>
                                <Box mb="sm" style={{ height: '6px', width: '100%', background: 'rgba(40,40,40,0.8)', borderRadius: '3px', overflow: 'hidden' }}>
                                  <Box style={{ height: '100%', width: '100%', background: 'linear-gradient(90deg, rgba(153,105,229,0.8), rgba(118,65,192,0.8))', borderRadius: '3px' }} />
                                </Box>

                                <Flex justify="space-between" mb="xs" mt="md">
                                  <Text size="sm" fw={600} c="white">Pesquisa de Mercado</Text>
                                  <Badge
                                    style={{
                                      background: 'rgba(153,105,229,0.15)',
                                      color: '#9969E5',
                                      border: '1px solid rgba(153,105,229,0.2)',
                                    }}
                                  >
                                    Em progresso
                                  </Badge>
                                </Flex>
                                <Box mb="sm" style={{ height: '6px', width: '100%', background: 'rgba(40,40,40,0.8)', borderRadius: '3px', overflow: 'hidden' }}>
                                  <Box style={{ height: '100%', width: '75%', background: 'linear-gradient(90deg, rgba(153,105,229,0.8), rgba(118,65,192,0.8))', borderRadius: '3px' }} />
                                </Box>
                              </Box>

                              <Flex gap="md" justify="space-between">
                                <Box
                                  style={{
                                    flex: 1,
                                    background: 'rgba(35,35,35,0.7)',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(153,105,229,0.15)',
                                    padding: '12px',
                                    textAlign: 'center',
                                  }}
                                >
                                  <Text size="xs" c="gray.5" mb="xs">Prazo</Text>
                                  <Text fw={700} size="md" c="white">2 semanas</Text>
                                </Box>
                                <Box
                                  style={{
                                    flex: 1,
                                    background: 'rgba(35,35,35,0.7)',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(153,105,229,0.15)',
                                    padding: '12px',
                                    textAlign: 'center',
                                  }}
                                >
                                  <Text size="xs" c="gray.5" mb="xs">Progresso</Text>
                                  <Text fw={700} size="md" c="#9969E5">85%</Text>
                                </Box>
                                <Box
                                  style={{
                                    flex: 1,
                                    background: 'rgba(35,35,35,0.7)',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(153,105,229,0.15)',
                                    padding: '12px',
                                    textAlign: 'center',
                                  }}
                                >
                                  <Text size="xs" c="gray.5" mb="xs">Status</Text>
                                  <Text fw={700} size="md" c="#1dd1a1">Ativo</Text>
                                </Box>
                              </Flex>
                            </Box>
                          )}

                          {/* Mockup para Design e Prototipagem */}
                          {step.title === 'Design e Prototipagem' && (
                            <Box
                              style={{
                                background: 'rgba(25,25,25,0.95)',
                                borderRadius: '12px',
                                border: '1px solid rgba(153,105,229,0.3)',
                                overflow: 'hidden',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(153,105,229,0.1)',
                              }}
                            >
                              {/* Barra de ferramentas do software de design */}
                              <Box
                                style={{
                                  height: '36px',
                                  background: 'rgba(30,30,30,0.95)',
                                  borderBottom: '1px solid rgba(153,105,229,0.2)',
                                  padding: '0 15px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                }}
                              >
                                <Flex align="center">
                                  <Box style={{ height: '10px', width: '10px', borderRadius: '50%', background: '#ff6b6b', marginRight: '6px' }} />
                                  <Box style={{ height: '10px', width: '10px', borderRadius: '50%', background: '#feca57', marginRight: '6px' }} />
                                  <Box style={{ height: '10px', width: '10px', borderRadius: '50%', background: '#1dd1a1' }} />
                                </Flex>
                                <Text size="xs" c="gray.5">Figma - Website Corporativo.fig</Text>
                                <Flex align="center" gap={8}>
                                  <Box style={{ height: '18px', width: '18px', borderRadius: '4px', background: 'rgba(153,105,229,0.2)' }} />
                                  <Box style={{ height: '18px', width: '18px', borderRadius: '4px', background: 'rgba(153,105,229,0.2)' }} />
                                  <Box style={{ height: '18px', width: '18px', borderRadius: '4px', background: 'rgba(153,105,229,0.2)' }} />
                                </Flex>
                              </Box>

                              {/* Área de trabalho do design */}
                              <Box p="md" style={{ background: 'rgba(22,22,22,0.95)' }}>
                                {/* Barra lateral de ferramentas */}
                                <Flex>
                                  <Box style={{ width: '40px', marginRight: '15px' }}>
                                    <Flex direction="column" gap={10} align="center">
                                      <Box style={{ height: '24px', width: '24px', borderRadius: '6px', background: 'rgba(153,105,229,0.8)' }} />
                                      <Box style={{ height: '24px', width: '24px', borderRadius: '6px', background: 'rgba(153,105,229,0.3)' }} />
                                      <Box style={{ height: '24px', width: '24px', borderRadius: '6px', background: 'rgba(153,105,229,0.3)' }} />
                                      <Box style={{ height: '24px', width: '24px', borderRadius: '6px', background: 'rgba(153,105,229,0.3)' }} />
                                      <Box style={{ height: '24px', width: '24px', borderRadius: '6px', background: 'rgba(153,105,229,0.3)' }} />
                                      <Box style={{ height: '24px', width: '24px', borderRadius: '6px', background: 'rgba(153,105,229,0.3)' }} />
                                    </Flex>
                                  </Box>

                                  {/* Área principal do design */}
                                  <Box style={{ flex: 1 }}>
                                    {/* Wireframe da página */}
                                    <Box
                                      style={{
                                        background: 'rgba(30,30,30,0.7)',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(153,105,229,0.2)',
                                        padding: '15px',
                                        marginBottom: '15px',
                                      }}
                                    >
                                      {/* Header do wireframe */}
                                      <Box
                                        style={{
                                          height: '40px',
                                          background: 'rgba(153,105,229,0.1)',
                                          borderRadius: '4px',
                                          marginBottom: '15px',
                                          padding: '0 10px',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'space-between',
                                        }}
                                      >
                                        <Box style={{ height: '20px', width: '80px', background: 'rgba(153,105,229,0.3)', borderRadius: '4px' }} />
                                        <Flex gap={10}>
                                          <Box style={{ height: '10px', width: '40px', background: 'rgba(153,105,229,0.2)', borderRadius: '2px' }} />
                                          <Box style={{ height: '10px', width: '40px', background: 'rgba(153,105,229,0.2)', borderRadius: '2px' }} />
                                          <Box style={{ height: '10px', width: '40px', background: 'rgba(153,105,229,0.2)', borderRadius: '2px' }} />
                                          <Box style={{ height: '10px', width: '40px', background: 'rgba(153,105,229,0.2)', borderRadius: '2px' }} />
                                        </Flex>
                                      </Box>

                                      {/* Hero section do wireframe */}
                                      <Box
                                        style={{
                                          height: '120px',
                                          background: 'rgba(153,105,229,0.15)',
                                          borderRadius: '4px',
                                          marginBottom: '15px',
                                          padding: '15px',
                                          display: 'flex',
                                          flexDirection: 'column',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                        }}
                                      >
                                        <Box style={{ height: '14px', width: '60%', background: 'rgba(153,105,229,0.4)', borderRadius: '2px', marginBottom: '10px' }} />
                                        <Box style={{ height: '8px', width: '40%', background: 'rgba(153,105,229,0.3)', borderRadius: '2px', marginBottom: '15px' }} />
                                        <Box style={{ height: '24px', width: '120px', background: 'rgba(153,105,229,0.6)', borderRadius: '4px' }} />
                                      </Box>

                                      {/* Conteúdo do wireframe */}
                                      <Flex gap={10}>
                                        <Box style={{ flex: 1, height: '80px', background: 'rgba(153,105,229,0.1)', borderRadius: '4px', padding: '8px' }}>
                                          <Box style={{ height: '10px', width: '70%', background: 'rgba(153,105,229,0.3)', borderRadius: '2px', marginBottom: '8px' }} />
                                          <Box style={{ height: '6px', width: '90%', background: 'rgba(153,105,229,0.2)', borderRadius: '2px', marginBottom: '4px' }} />
                                          <Box style={{ height: '6px', width: '80%', background: 'rgba(153,105,229,0.2)', borderRadius: '2px', marginBottom: '4px' }} />
                                          <Box style={{ height: '6px', width: '60%', background: 'rgba(153,105,229,0.2)', borderRadius: '2px' }} />
                                        </Box>
                                        <Box style={{ flex: 1, height: '80px', background: 'rgba(153,105,229,0.1)', borderRadius: '4px', padding: '8px' }}>
                                          <Box style={{ height: '10px', width: '70%', background: 'rgba(153,105,229,0.3)', borderRadius: '2px', marginBottom: '8px' }} />
                                          <Box style={{ height: '6px', width: '90%', background: 'rgba(153,105,229,0.2)', borderRadius: '2px', marginBottom: '4px' }} />
                                          <Box style={{ height: '6px', width: '80%', background: 'rgba(153,105,229,0.2)', borderRadius: '2px', marginBottom: '4px' }} />
                                          <Box style={{ height: '6px', width: '60%', background: 'rgba(153,105,229,0.2)', borderRadius: '2px' }} />
                                        </Box>
                                        <Box style={{ flex: 1, height: '80px', background: 'rgba(153,105,229,0.1)', borderRadius: '4px', padding: '8px' }}>
                                          <Box style={{ height: '10px', width: '70%', background: 'rgba(153,105,229,0.3)', borderRadius: '2px', marginBottom: '8px' }} />
                                          <Box style={{ height: '6px', width: '90%', background: 'rgba(153,105,229,0.2)', borderRadius: '2px', marginBottom: '4px' }} />
                                          <Box style={{ height: '6px', width: '80%', background: 'rgba(153,105,229,0.2)', borderRadius: '2px', marginBottom: '4px' }} />
                                          <Box style={{ height: '6px', width: '60%', background: 'rgba(153,105,229,0.2)', borderRadius: '2px' }} />
                                        </Box>
                                      </Flex>
                                    </Box>

                                    {/* Barra de status e informações */}
                                    <Flex justify="space-between" align="center">
                                      <Badge
                                        style={{
                                          background: 'rgba(153,105,229,0.2)',
                                          color: '#9969E5',
                                          border: '1px solid rgba(153,105,229,0.2)',
                                        }}
                                      >
                                        Wireframe v2
                                      </Badge>

                                      <Flex align="center" gap={15}>
                                        <Text size="xs" c="gray.5">Zoom: 75%</Text>
                                        <Text size="xs" c="gray.5">Página 1/3</Text>
                                      </Flex>
                                    </Flex>
                                  </Box>
                                </Flex>
                              </Box>

                              {/* Barra de status inferior */}
                              <Box
                                style={{
                                  height: '30px',
                                  background: 'rgba(30,30,30,0.95)',
                                  borderTop: '1px solid rgba(153,105,229,0.2)',
                                  padding: '0 15px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                }}
                              >
                                <Text size="xs" c="gray.5">Projeto: Website Corporativo</Text>
                                <Flex align="center" gap={15}>
                                  <Text size="xs" c="#9969E5">Wireframes</Text>
                                  <Text size="xs" c="gray.5">Protótipos</Text>
                                  <Text size="xs" c="gray.5">Design Final</Text>
                                </Flex>
                              </Box>
                            </Box>
                          )}

                          {/* Mockup para Desenvolvimento */}
                          {step.title === 'Desenvolvimento' && (
                            <Box
                              style={{
                                background: 'rgba(20,20,20,0.9)',
                                borderRadius: '8px',
                                border: '1px solid rgba(153,105,229,0.3)',
                                padding: '15px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                                fontFamily: 'monospace',
                              }}
                            >
                              <Text size="sm" c="gray.5" mb="xs">// Componente React</Text>
                              <Text size="sm" c="#9969E5" mb="xs">function <Text span c="#61dafb">AppComponent</Text>() {'{'}</Text>
                              <Text size="sm" c="gray.3" ml="md" mb="xs">const [data, setData] = useState([]);</Text>
                              <Text size="sm" c="#9969E5" ml="md" mb="xs">useEffect<Text span c="white">(() => {'{'}</Text></Text>
                              <Text size="sm" c="#61dafb" ml="xl" mb="xs">fetchData()<Text span c="white">;</Text></Text>
                              <Text size="sm" c="white" ml="md" mb="xs">{'}'})</Text>
                              <Text size="sm" c="#9969E5" ml="md" mb="xs">return <Text span c="#61dafb">{'('}</Text></Text>
                              <Text size="sm" c="#ff6b6b" ml="xl" mb="xs">{'<'}<Text span c="#ff9f43">Container</Text>{'>'}</Text>
                              <Text size="sm" c="#ff6b6b" ml="xl" mb="xs">{'  <'}<Text span c="#ff9f43">Header</Text> <Text span c="#1dd1a1">title</Text>=<Text span c="#00d2d3">"Dashboard"</Text>{'>'}</Text>
                              <Text size="sm" c="#ff6b6b" ml="xl" mb="xs">{'  </'}Header{'>'}</Text>
                              <Text size="sm" c="#ff6b6b" ml="xl" mb="xs">{'</'}Container{'>'}</Text>
                              <Text size="sm" c="#61dafb" ml="md" mb="xs">)</Text>
                              <Text size="sm" c="white" mb="xs">{'}'}</Text>
                            </Box>
                          )}

                          {/* Mockup para Lançamento */}
                          {step.title === 'Lançamento' && (
                            <Box
                              style={{
                                background: 'rgba(25,25,25,0.95)',
                                borderRadius: '12px',
                                border: '1px solid rgba(153,105,229,0.3)',
                                padding: '20px',
                                boxShadow: '0 15px 30px rgba(0,0,0,0.4), 0 0 20px rgba(153,105,229,0.1)',
                                backdropFilter: 'blur(10px)',
                              }}
                            >
                              <Flex align="center" justify="center" direction="column">
                                <ThemeIcon
                                  size={60}
                                  radius="xl"
                                  mb="md"
                                  style={{
                                    background: 'linear-gradient(135deg, rgba(153,105,229,0.8), rgba(118,65,192,0.8))',
                                    boxShadow: '0 0 20px rgba(153,105,229,0.5)',
                                  }}
                                >
                                  <IconRocket size={30} />
                                </ThemeIcon>
                                <Text fw={700} size="lg" c="white" mb="sm" ta="center">Site lançado com sucesso!</Text>
                                <Text c="gray.4" size="sm" ta="center" mb="md">Todos os testes foram concluídos e o site está no ar.</Text>

                                <Box
                                  style={{
                                    width: '100%',
                                    background: 'rgba(35,35,35,0.7)',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(153,105,229,0.15)',
                                    padding: '15px',
                                    marginBottom: '15px',
                                  }}
                                >
                                  <Flex justify="space-between" mb="xs">
                                    <Text size="sm" fw={600} c="white">Status do Deployment</Text>
                                    <Badge
                                      style={{
                                        background: 'rgba(29,209,161,0.2)',
                                        color: '#1dd1a1',
                                        border: '1px solid rgba(29,209,161,0.2)',
                                      }}
                                    >
                                      Completo
                                    </Badge>
                                  </Flex>
                                  <Box
                                    style={{
                                      width: '100%',
                                      height: '8px',
                                      background: 'rgba(40,40,40,0.8)',
                                      borderRadius: '4px',
                                      overflow: 'hidden',
                                      marginBottom: '15px',
                                    }}
                                  >
                                    <Box
                                      style={{
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(90deg, rgba(29,209,161,0.8), rgba(29,209,161,0.6))',
                                        borderRadius: '4px',
                                      }}
                                    />
                                  </Box>

                                  <Flex gap="md" justify="space-between">
                                    <Box
                                      style={{
                                        flex: 1,
                                        background: 'rgba(40,40,40,0.5)',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(153,105,229,0.15)',
                                        padding: '8px',
                                        textAlign: 'center',
                                      }}
                                    >
                                      <Text size="xs" c="gray.5" mb="xs">Testes</Text>
                                      <Text fw={700} size="sm" c="#1dd1a1">Aprovados</Text>
                                    </Box>
                                    <Box
                                      style={{
                                        flex: 1,
                                        background: 'rgba(40,40,40,0.5)',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(153,105,229,0.15)',
                                        padding: '8px',
                                        textAlign: 'center',
                                      }}
                                    >
                                      <Text size="xs" c="gray.5" mb="xs">Uptime</Text>
                                      <Text fw={700} size="sm" c="#1dd1a1">100%</Text>
                                    </Box>
                                    <Box
                                      style={{
                                        flex: 1,
                                        background: 'rgba(40,40,40,0.5)',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(153,105,229,0.15)',
                                        padding: '8px',
                                        textAlign: 'center',
                                      }}
                                    >
                                      <Text size="xs" c="gray.5" mb="xs">Status</Text>
                                      <Text fw={700} size="sm" c="#1dd1a1">Online</Text>
                                    </Box>
                                  </Flex>
                                </Box>

                                <Button
                                  variant="gradient"
                                  gradient={{ from: 'rgba(153,105,229,0.8)', to: 'rgba(118,65,192,0.8)', deg: 90 }}
                                  size="sm"
                                  radius="md"
                                  style={{ width: '100%' }}
                                >
                                  Acessar o Site
                                </Button>
                              </Flex>
                            </Box>
                          )}

                          {/* Mockup para Suporte Contínuo */}
                          {step.title === 'Suporte Contínuo' && (
                            <Box
                              style={{
                                background: 'rgba(30,30,30,0.8)',
                                borderRadius: '8px',
                                border: '1px solid rgba(153,105,229,0.3)',
                                padding: '20px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                              }}
                            >
                              <Text fw={700} size="lg" c="white" mb="md">Painel de Suporte</Text>
                              <Flex mb="md" gap="md">
                                <Box style={{ flex: 1, padding: '10px', background: 'rgba(153,105,229,0.1)', borderRadius: '4px', border: '1px solid rgba(153,105,229,0.2)' }}>
                                  <Text fw={600} size="sm" c="white" mb="xs">Uptime</Text>
                                  <Text fw={700} size="lg" c="#9969E5">99.9%</Text>
                                </Box>
                                <Box style={{ flex: 1, padding: '10px', background: 'rgba(153,105,229,0.1)', borderRadius: '4px', border: '1px solid rgba(153,105,229,0.2)' }}>
                                  <Text fw={600} size="sm" c="white" mb="xs">Tickets</Text>
                                  <Text fw={700} size="lg" c="#9969E5">0</Text>
                                </Box>
                              </Flex>
                              <Box mb="md" style={{ padding: '10px', background: 'rgba(153,105,229,0.1)', borderRadius: '4px', border: '1px solid rgba(153,105,229,0.2)' }}>
                                <Text fw={600} size="sm" c="white" mb="xs">Próxima Manutenção</Text>
                                <Text fw={500} size="sm" c="gray.3">15/06/2024 - Atualização de segurança</Text>
                              </Box>
                              <Box style={{ height: '8px', width: '100%', background: 'rgba(40,40,40,0.9)', borderRadius: '4px', marginBottom: '5px' }}>
                                <Box style={{ height: '100%', width: '85%', background: 'linear-gradient(90deg, rgba(153,105,229,0.8), rgba(118,65,192,0.8))', borderRadius: '4px' }} />
                              </Box>
                              <Text size="xs" c="gray.5" ta="right">Próximo backup: 85%</Text>
                            </Box>
                          )}

                          {/* Mockup para Crescimento e Evolução */}
                          {step.title === 'Crescimento e Evolução' && (
                            <Box
                              style={{
                                background: 'rgba(30,30,30,0.8)',
                                borderRadius: '8px',
                                border: '1px solid rgba(153,105,229,0.3)',
                                padding: '20px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                              }}
                            >
                              <Text fw={700} size="lg" c="white" mb="md">Analytics</Text>
                              <Box mb="xl" style={{ height: '120px', position: 'relative' }}>
                                {/* Gráfico simulado */}
                                <Box style={{ position: 'absolute', bottom: 0, left: 0, width: '15%', height: '30%', background: 'rgba(153,105,229,0.3)', borderTopLeftRadius: '3px', borderTopRightRadius: '3px' }} />
                                <Box style={{ position: 'absolute', bottom: 0, left: '17%', width: '15%', height: '45%', background: 'rgba(153,105,229,0.4)', borderTopLeftRadius: '3px', borderTopRightRadius: '3px' }} />
                                <Box style={{ position: 'absolute', bottom: 0, left: '34%', width: '15%', height: '60%', background: 'rgba(153,105,229,0.5)', borderTopLeftRadius: '3px', borderTopRightRadius: '3px' }} />
                                <Box style={{ position: 'absolute', bottom: 0, left: '51%', width: '15%', height: '75%', background: 'rgba(153,105,229,0.6)', borderTopLeftRadius: '3px', borderTopRightRadius: '3px' }} />
                                <Box style={{ position: 'absolute', bottom: 0, left: '68%', width: '15%', height: '90%', background: 'rgba(153,105,229,0.7)', borderTopLeftRadius: '3px', borderTopRightRadius: '3px' }} />
                                <Box style={{ position: 'absolute', bottom: 0, left: '85%', width: '15%', height: '100%', background: 'rgba(153,105,229,0.8)', borderTopLeftRadius: '3px', borderTopRightRadius: '3px' }} />
                                {/* Linha de tendência */}
                                <Box style={{ position: 'absolute', bottom: '30%', left: 0, width: '15%', height: '2px', background: 'rgba(255,255,255,0.5)' }} />
                                <Box style={{ position: 'absolute', bottom: '45%', left: '15%', width: '19%', height: '2px', background: 'rgba(255,255,255,0.5)', transform: 'rotate(-15deg)', transformOrigin: 'left center' }} />
                                <Box style={{ position: 'absolute', bottom: '60%', left: '34%', width: '17%', height: '2px', background: 'rgba(255,255,255,0.5)', transform: 'rotate(-15deg)', transformOrigin: 'left center' }} />
                                <Box style={{ position: 'absolute', bottom: '75%', left: '51%', width: '17%', height: '2px', background: 'rgba(255,255,255,0.5)', transform: 'rotate(-15deg)', transformOrigin: 'left center' }} />
                                <Box style={{ position: 'absolute', bottom: '90%', left: '68%', width: '17%', height: '2px', background: 'rgba(255,255,255,0.5)', transform: 'rotate(-15deg)', transformOrigin: 'left center' }} />
                              </Box>
                              <Flex gap="md">
                                <Box style={{ flex: 1, padding: '10px', background: 'rgba(153,105,229,0.1)', borderRadius: '4px', border: '1px solid rgba(153,105,229,0.2)' }}>
                                  <Text fw={600} size="sm" c="white" mb="xs">Visitantes</Text>
                                  <Text fw={700} size="md" c="#9969E5">+127%</Text>
                                </Box>
                                <Box style={{ flex: 1, padding: '10px', background: 'rgba(153,105,229,0.1)', borderRadius: '4px', border: '1px solid rgba(153,105,229,0.2)' }}>
                                  <Text fw={600} size="sm" c="white" mb="xs">Conversões</Text>
                                  <Text fw={700} size="md" c="#9969E5">+85%</Text>
                                </Box>
                              </Flex>
                            </Box>
                          )}
                        </MotionBox>

                        {/* Efeito de brilho */}
                        <MotionBox
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: '200px',
                            height: '200px',
                            borderRadius: '50%',
                            background: `radial-gradient(circle, ${step.color}30 0%, ${step.color}00 70%)`,
                            transform: 'translate(-50%, -50%)',
                            filter: 'blur(30px)',
                            zIndex: 0,
                          }}
                          animate={{
                            opacity: [0.3, 0.6, 0.3],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                      </Box>
                    </MotionBox>
                  </Grid.Col>
                </Grid>
              )}
            </Transition>
          ))}
        </MotionBox>
      </Container>
    </Box>
  );
}
