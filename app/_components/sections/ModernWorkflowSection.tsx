'use client';

import { useState, useRef, useEffect } from 'react';
import { useSafePathname, getLocaleFromPathname } from '@/app/_lib/utils/pathname';
import {
  Box,
  Title,
  Text,
  Container,
  ThemeIcon,
  rem,
  Flex,
  Grid,
  Group,
  SimpleGrid,
  Progress,
  ActionIcon,
} from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconBulb,
  IconCode,
  IconRocket,
  IconChartBar,
  IconBrandFigma,
  IconBrandReact,
  IconBrandNextjs,
  IconBrandVercel,
  IconBrandGoogle,
  IconBrandTypescript,
  IconBrandNodejs,
  IconDeviceAnalytics,
  IconUsers,
  IconInfoCircle,
  IconPlayerPlay,
  IconPlayerPause,
  IconArrowNarrowRight,
  IconArrowNarrowLeft,
  IconCircleCheck,
  IconServer,
  IconArrowsShuffle,
} from '@tabler/icons-react';

const MotionBox = motion.div;

// Traduções simplificadas
const texts = {
  'pt-BR': {
    title: 'Nosso Processo de Trabalho',
    description: 'Desenvolvemos websites com um processo estruturado e transparente, garantindo resultados excepcionais.',
    processDetails: 'Detalhes do Processo',
    toolsTech: 'Ferramentas & Tecnologias',
    successMetrics: 'Métricas de Sucesso',
    steps: {
    discovery: {
      title: 'Descoberta e Estratégia',
        description: 'Mergulhamos profundamente no seu negócio para entender objetivos e oportunidades.'
    },
    design: {
      title: 'Design e Prototipagem',
        description: 'Transformamos conceitos em experiências visuais que encantam usuários.'
    },
    development: {
      title: 'Desenvolvimento',
        description: 'Codificamos com tecnologias avançadas, garantindo performance e segurança.'
    },
    launch: {
      title: 'Lançamento',
        description: 'Implementamos em produção com monitoramento contínuo.'
    },
    growth: {
        title: 'Crescimento',
        description: 'Analisamos dados e implementamos melhorias contínuas.'
      }
    }
  },
  'en': {
    title: 'Our Work Process',
    description: 'We develop websites with a structured and transparent process, ensuring exceptional results.',
    processDetails: 'Process Details',
    toolsTech: 'Tools & Technologies', 
    successMetrics: 'Success Metrics',
    steps: {
    discovery: {
      title: 'Discovery & Strategy',
        description: 'We dive deep into your business to understand goals and opportunities.'
    },
    design: {
      title: 'Design & Prototyping',
        description: 'We transform concepts into visual experiences that delight users.'
    },
    development: {
      title: 'Development',
        description: 'We code with advanced technologies, ensuring performance and security.'
    },
    launch: {
      title: 'Launch',
        description: 'We implement in production with continuous monitoring.'
    },
    growth: {
        title: 'Growth',
        description: 'We analyze data and implement continuous improvements.'
      }
    }
  }
}

// Dados dos passos do workflow
const workflowSteps = [
  {
    id: 'discovery',
    icon: <IconBulb size={rem(24)} />,
    color: '#7641C0',
    gradient: 'linear-gradient(135deg, #7641C0, #9969E5)',
    badge: '01',
    details: [
      { title: 'Análise de Requisitos', progress: 100 },
      { title: 'Definição de Objetivos', progress: 100 },
      { title: 'Pesquisa de Mercado', progress: 100 },
      { title: 'Planejamento Estratégico', progress: 100 }
    ],
    tools: [
      { name: 'Figma', icon: <IconBrandFigma size={18} /> },
      { name: 'Notion', icon: <IconInfoCircle size={18} /> }
    ],
    metrics: [
      { label: 'Precisão', value: 98 },
      { label: 'Eficiência', value: 95 },
      { label: 'Satisfação', value: 100 }
    ]
  },
  {
    id: 'design',
    icon: <IconBrandFigma size={rem(24)} />,
    color: '#9969E5',
    gradient: 'linear-gradient(135deg, #9969E5, #B490FF)',
    badge: '02',
    details: [
      { title: 'Design System', progress: 100 },
      { title: 'UI/UX Design', progress: 100 },
      { title: 'Protótipos Interativos', progress: 100 },
      { title: 'Testes de Usabilidade', progress: 100 }
    ],
    tools: [
      { name: 'Figma', icon: <IconBrandFigma size={18} /> },
      { name: 'Framer', icon: <IconArrowsShuffle size={18} /> }
    ],
    metrics: [
      { label: 'Inovação', value: 95 },
      { label: 'Usabilidade', value: 98 },
      { label: 'Conversão', value: 92 }
    ]
  },
  {
    id: 'development',
    icon: <IconCode size={rem(24)} />,
    color: '#6030A0',
    gradient: 'linear-gradient(135deg, #6030A0, #7641C0)',
    badge: '03',
    details: [
      { title: 'Arquitetura', progress: 100 },
      { title: 'Frontend', progress: 100 },
      { title: 'Backend', progress: 100 },
      { title: 'Testes Automatizados', progress: 100 }
    ],
    tools: [
      { name: 'React', icon: <IconBrandReact size={18} /> },
      { name: 'Next.js', icon: <IconBrandNextjs size={18} /> },
      { name: 'TypeScript', icon: <IconBrandTypescript size={18} /> },
      { name: 'Node.js', icon: <IconBrandNodejs size={18} /> }
    ],
    metrics: [
      { label: 'Performance', value: 96 },
      { label: 'Qualidade', value: 98 },
      { label: 'Segurança', value: 99 }
    ]
  },
  {
    id: 'launch',
    icon: <IconRocket size={rem(24)} />,
    color: '#B490FF',
    gradient: 'linear-gradient(135deg, #B490FF, #9969E5)',
    badge: '04',
    details: [
      { title: 'CI/CD Pipeline', progress: 100 },
      { title: 'Infraestrutura', progress: 100 },
      { title: 'Monitoramento', progress: 100 },
      { title: 'Otimização', progress: 100 }
    ],
    tools: [
      { name: 'Vercel', icon: <IconBrandVercel size={18} /> },
      { name: 'GitHub', icon: <IconServer size={18} /> }
    ],
    metrics: [
      { label: 'Uptime', value: 99.9 },
      { label: 'Velocidade', value: 97 },
      { label: 'Segurança', value: 100 }
    ]
  },
  {
    id: 'growth',
    icon: <IconChartBar size={rem(24)} />,
    color: '#9461FF',
    gradient: 'linear-gradient(135deg, #9461FF, #B490FF)',
    badge: '05',
    details: [
      { title: 'Análise de Dados', progress: 100 },
      { title: 'SEO Avançado', progress: 100 },
      { title: 'Otimização de Conversão', progress: 100 },
      { title: 'Escalabilidade', progress: 100 }
    ],
    tools: [
      { name: 'Google Analytics', icon: <IconBrandGoogle size={18} /> },
      { name: 'Analytics', icon: <IconDeviceAnalytics size={18} /> }
    ],
    metrics: [
      { label: 'Crescimento', value: 35 },
      { label: 'Retenção', value: 92 },
      { label: 'ROI', value: 320 }
    ]
  }
]

function ToolsDisplay({ tools }: { tools: { name: string, icon: React.ReactNode }[] }) {
  return (
    <SimpleGrid cols={2} spacing="xs" mb={20}>
      {tools.map((tool, index) => (
        <Flex key={index} align="center" gap="xs" p="xs" style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <Box style={{ color: '#9969E5' }}>
            {tool.icon}
          </Box>
          <Text size="sm" c="white" fw={500}>
            {tool.name}
            </Text>
        </Flex>
      ))}
    </SimpleGrid>
  )
}

function MetricsDisplay({ metrics }: { metrics: { label: string, value: number }[] }) {
  return (
    <SimpleGrid cols={1} spacing="xs">
      {metrics.map((metric, index) => (
        <Box key={index}>
          <Flex justify="space-between" mb={5}>
            <Text size="sm" c="gray.4">{metric.label}</Text>
            <Text size="sm" c="white" fw={600}>{metric.value}%</Text>
      </Flex>
          <Progress 
            value={metric.value} 
            color="purple" 
            size="xs" 
            radius="xl"
            style={{ marginBottom: '8px' }}
          />
          </Box>
      ))}
    </SimpleGrid>
  )
}

function StepVisual({ step }: { step: typeof workflowSteps[0] }) {
  return (
    <Box
      style={{
        background: 'linear-gradient(135deg, rgba(25,25,25,0.7), rgba(30,30,30,0.8))',
        borderRadius: '16px',
        border: '1px solid rgba(153,105,229,0.2)',
        padding: '40px',
        height: '100%',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            }}
          >
      <MotionBox
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '120px',
          height: '120px',
                borderRadius: '50%',
          background: step.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
          marginBottom: '30px',
          boxShadow: `0 20px 40px ${step.color}40`,
        }}
      >
        <Box style={{ color: 'white', transform: 'scale(2)' }}>
          {step.icon}
        </Box>
      </MotionBox>

      <Text 
        size="xl" 
        fw={700} 
        c="white" 
        ta="center" 
        mb="sm"
      style={{
          background: `linear-gradient(90deg, white, ${step.color})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Passo {step.badge}
      </Text>

      <Text size="lg" c="gray.4" ta="center">
        {step.id === 'discovery' ? 'Análise e Planejamento' :
         step.id === 'design' ? 'Design e Prototipagem' :
         step.id === 'development' ? 'Desenvolvimento' :
         step.id === 'launch' ? 'Lançamento' :
         'Crescimento'}
        </Text>
      </Box>
  )
}

export function ModernWorkflowSection() {
  const [activeStep, setActiveStep] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(false)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  const pathname = useSafePathname()
  const locale = getLocaleFromPathname(pathname)
  const t = texts[locale as keyof typeof texts] || texts['pt-BR']

  const handleStepClick = (index: number) => {
    setActiveStep(index)
    if (isAutoPlay) {
      setIsAutoPlay(false)
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
        autoPlayRef.current = null
      }
    }
  }

  const toggleAutoPlay = () => {
    if (isAutoPlay) {
      setIsAutoPlay(false)
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
        autoPlayRef.current = null
      }
    } else {
      setIsAutoPlay(true)
      autoPlayRef.current = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % workflowSteps.length)
      }, 5000)
    }
  }

  useEffect(() => {
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [])

  const currentStep = workflowSteps[activeStep]

  return (
    <Box
      py={120}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #0A0A0A 0%, #111111 100%)',
      }}
      id="workflow"
    >
      <Container size="xl">
        {/* Cabeçalho */}
        <Box mb={60} ta="center">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Title
            order={1}
            style={{
              fontSize: rem(42),
              fontWeight: 800,
              letterSpacing: -1,
              marginBottom: rem(20),
              background: 'linear-gradient(90deg, #fff, #9969E5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            >
              {t.title}
            </Title>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Text
            c="gray.5"
            size="lg"
            maw={700}
            mx="auto"
          >
              {t.description}
            </Text>
          </MotionBox>
        </Box>

        {/* Controles */}
        <Flex justify="space-between" align="center" mb={30}>
          <Title order={3} c="white" size="xl">
            {t.steps[currentStep.id as keyof typeof t.steps].title}
          </Title>

          <Group gap="sm">
            <ActionIcon
              variant="subtle"
              color="gray"
              radius="xl"
              onClick={() => setActiveStep((prev) => (prev - 1 + workflowSteps.length) % workflowSteps.length)}
            >
              <IconArrowNarrowLeft size={20} />
            </ActionIcon>

            <ActionIcon
              variant="subtle"
              color="gray"
              radius="xl"
              onClick={toggleAutoPlay}
            >
              {isAutoPlay ? <IconPlayerPause size={20} /> : <IconPlayerPlay size={20} />}
            </ActionIcon>

            <ActionIcon
              variant="subtle"
              color="gray"
              radius="xl"
              onClick={() => setActiveStep((prev) => (prev + 1) % workflowSteps.length)}
            >
              <IconArrowNarrowRight size={20} />
            </ActionIcon>
          </Group>
        </Flex>

        {/* Indicadores de passos */}
        <Flex
          gap="md"
          mb={40}
          style={{
            overflowX: 'auto',
            paddingBottom: '10px'
          }}
        >
          {workflowSteps.map((step, index) => (
            <Box
              key={step.id}
              onClick={() => handleStepClick(index)}
              style={{
                minWidth: '200px',
                padding: '15px 20px',
                borderRadius: '12px',
                background: activeStep === index ? step.gradient : 'rgba(30,30,30,0.6)',
                border: `1px solid ${activeStep === index ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)'}`,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: activeStep === index ? 'translateY(-5px)' : 'none',
              }}
            >
              <Flex align="center">
                <Box
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: activeStep === index ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '12px',
                    fontWeight: 700,
                    color: 'white',
                  }}
                >
                  {step.badge}
                </Box>

                  <Text fw={600} c="white" size="sm">
                  {t.steps[step.id as keyof typeof t.steps].title}
                  </Text>
              </Flex>
        </Box>
          ))}
        </Flex>

        {/* Conteúdo principal */}
        <Grid gutter={40}>
          {/* Detalhes do passo */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box
              style={{
                background: 'rgba(25,25,25,0.7)',
                borderRadius: '16px',
                border: '1px solid rgba(153,105,229,0.2)',
                padding: '30px',
                height: '100%',
                minHeight: '400px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Flex align="center" mb={30}>
                <ThemeIcon
                  size={60}
                  radius="md"
                  variant="gradient"
                  gradient={{ from: currentStep.color, to: '#9969E5' }}
                >
                  {currentStep.icon}
                </ThemeIcon>
                <Box ml={20}>
                  <Title order={3} c="white" size="xl" mb={5}>
                    {t.steps[currentStep.id as keyof typeof t.steps].title}
                  </Title>
                </Box>
              </Flex>

              <Text c="gray.4" size="md" mb={30}>
                {t.steps[currentStep.id as keyof typeof t.steps].description}
              </Text>

              <Text fw={600} c="white" mb={15}>
                {t.processDetails}
              </Text>

              <Box mb={30}>
                {currentStep.details.map((detail, index) => (
                  <Flex key={index} align="center" mb={10}>
                    <IconCircleCheck size={16} style={{ color: '#9969E5', marginRight: '10px' }} />
                    <Box style={{ flex: 1 }}>
                      <Text size="sm" fw={500} c="white">
                        {detail.title}
                      </Text>
                      <Progress 
                        value={detail.progress}
                        color="purple"
                        size="xs"
                        radius="xl"
                      />
                    </Box>
                  </Flex>
                ))}
              </Box>

              <Text fw={600} c="white" mb={15}>
                {t.toolsTech}
              </Text>

              <ToolsDisplay tools={currentStep.tools} />

                <Text fw={600} c="white" mb={15}>
                  {t.successMetrics}
                </Text>

              <MetricsDisplay metrics={currentStep.metrics} />
              </Box>
          </Grid.Col>

          {/* Visualização */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                style={{ height: '100%' }}
              >
                <StepVisual step={currentStep} />
              </motion.div>
            </AnimatePresence>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  )
}
