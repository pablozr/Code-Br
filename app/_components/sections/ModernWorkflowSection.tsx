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
  Divider,
  Progress,
  Tooltip,
  ActionIcon,
} from '@mantine/core';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  IconBulb,
  IconCode,
  IconDeviceDesktop,
  IconRocket,
  IconHeartHandshake,
  IconChartLine,
  IconArrowRight,
  IconBrandFigma,
  IconBrandGithub,
  IconServer,
  IconCloudUpload,
  IconChartBar,
  IconArrowsShuffle,
  IconBrandReact,
  IconBrandNextjs,
  IconBrandVercel,
  IconBrandAws,
  IconBrandGoogle,
  IconBrandStripe,
  IconBrandTailwind,
  IconBrandMantine,
  IconBrandTypescript,
  IconBrandJavascript,
  IconBrandNodejs,
  IconBrandPrisma,
  IconDatabase,
  IconDeviceAnalytics,
  IconSettings,
  IconUsers,
  IconInfoCircle,
  IconPlus,
  IconMinus,
  IconPlayerPlay,
  IconPlayerPause,
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconArrowNarrowRight,
  IconArrowNarrowLeft,
  IconArrowNarrowUp,
  IconArrowNarrowDown,
  IconCircleDot,
  IconCircle,
  IconCircleFilled,
  IconCircleCheck,
  IconCircleX,
  IconCirclePlus,
  IconCircleMinus,
  IconCircleOff,
  IconCircleHalf,
  IconCircleHalf2,
  IconCircleDashed,
  IconCircleDotted,
  IconCircleRectangle,
  IconCircleTriangle,
  IconCircleSquare,
  IconCirclePlus2,
  IconCircleMinus2,
} from '@tabler/icons-react';

// Componentes com motion
const MotionBox = motion.create(Box);
const MotionFlex = motion.create(Flex);
const MotionCard = motion.create(Card);
const MotionText = motion.create(Text);
const MotionTitle = motion.create(Title);
const MotionBadge = motion.create(Badge);
const MotionGroup = motion.create(Group);
const MotionThemeIcon = motion.create(ThemeIcon);
const MotionActionIcon = motion.create(ActionIcon);
const MotionDivider = motion.create(Divider);
const MotionProgress = motion.create(Progress);

// Dados do processo de trabalho
const workflowSteps = [
  {
    id: 'discovery',
    title: 'Descoberta e Estratégia',
    description: 'Mergulhamos profundamente no seu negócio para entender seus objetivos, desafios e oportunidades digitais.',
    icon: <IconBulb size={rem(24)} stroke={1.5} />,
    details: [
      { title: 'Análise de Requisitos', icon: <IconInfoCircle size={16} />, progress: 100 },
      { title: 'Definição de Objetivos', icon: <IconCircleCheck size={16} />, progress: 100 },
      { title: 'Pesquisa de Mercado', icon: <IconUsers size={16} />, progress: 100 },
      { title: 'Planejamento Estratégico', icon: <IconArrowsShuffle size={16} />, progress: 100 }
    ],
    tools: [
      { name: 'Figma', icon: <IconBrandFigma size={18} /> },
      { name: 'Miro', icon: <IconArrowsMaximize size={18} /> },
      { name: 'Notion', icon: <IconCircleSquare size={18} /> }
    ],
    color: '#7641C0',
    gradient: 'linear-gradient(135deg, #7641C0, #9969E5)',
    badge: '01',
    metrics: [
      { label: 'Precisão', value: 98 },
      { label: 'Eficiência', value: 95 },
      { label: 'Satisfação', value: 100 }
    ],
    visual: 'discovery'
  },
  {
    id: 'design',
    title: 'Design e Prototipagem',
    description: 'Transformamos conceitos em experiências visuais interativas que encantam e engajam seus usuários.',
    icon: <IconBrandFigma size={rem(24)} stroke={1.5} />,
    details: [
      { title: 'Design System', icon: <IconCircleSquare size={16} />, progress: 100 },
      { title: 'UI/UX Design', icon: <IconDeviceDesktop size={16} />, progress: 100 },
      { title: 'Protótipos Interativos', icon: <IconArrowsShuffle size={16} />, progress: 100 },
      { title: 'Testes de Usabilidade', icon: <IconUsers size={16} />, progress: 100 }
    ],
    tools: [
      { name: 'Figma', icon: <IconBrandFigma size={18} /> },
      { name: 'Adobe XD', icon: <IconCircleX size={18} /> },
      { name: 'Framer', icon: <IconCircleTriangle size={18} /> }
    ],
    color: '#9969E5',
    gradient: 'linear-gradient(135deg, #9969E5, #B490FF)',
    badge: '02',
    metrics: [
      { label: 'Inovação', value: 95 },
      { label: 'Usabilidade', value: 98 },
      { label: 'Conversão', value: 92 }
    ],
    visual: 'design'
  },
  {
    id: 'development',
    title: 'Desenvolvimento',
    description: 'Codificamos seu projeto com as tecnologias mais avançadas, garantindo performance, segurança e escalabilidade.',
    icon: <IconCode size={rem(24)} stroke={1.5} />,
    details: [
      { title: 'Arquitetura', icon: <IconServer size={16} />, progress: 100 },
      { title: 'Frontend', icon: <IconBrandReact size={16} />, progress: 100 },
      { title: 'Backend', icon: <IconBrandNodejs size={16} />, progress: 100 },
      { title: 'Testes Automatizados', icon: <IconCircleCheck size={16} />, progress: 100 }
    ],
    tools: [
      { name: 'React', icon: <IconBrandReact size={18} /> },
      { name: 'Next.js', icon: <IconBrandNextjs size={18} /> },
      { name: 'TypeScript', icon: <IconBrandTypescript size={18} /> },
      { name: 'Node.js', icon: <IconBrandNodejs size={18} /> },
      { name: 'Prisma', icon: <IconBrandPrisma size={18} /> }
    ],
    color: '#6030A0',
    gradient: 'linear-gradient(135deg, #6030A0, #7641C0)',
    badge: '03',
    metrics: [
      { label: 'Performance', value: 96 },
      { label: 'Qualidade', value: 98 },
      { label: 'Segurança', value: 99 }
    ],
    visual: 'development'
  },
  {
    id: 'launch',
    title: 'Lançamento',
    description: 'Implementamos seu projeto em ambiente de produção com monitoramento contínuo para garantir uma transição suave.',
    icon: <IconRocket size={rem(24)} stroke={1.5} />,
    details: [
      { title: 'CI/CD Pipeline', icon: <IconArrowsShuffle size={16} />, progress: 100 },
      { title: 'Infraestrutura', icon: <IconServer size={16} />, progress: 100 },
      { title: 'Monitoramento', icon: <IconDeviceAnalytics size={16} />, progress: 100 },
      { title: 'Otimização', icon: <IconSettings size={16} />, progress: 100 }
    ],
    tools: [
      { name: 'Vercel', icon: <IconBrandVercel size={18} /> },
      { name: 'AWS', icon: <IconBrandAws size={18} /> },
      { name: 'GitHub', icon: <IconBrandGithub size={18} /> }
    ],
    color: '#B490FF',
    gradient: 'linear-gradient(135deg, #B490FF, #9969E5)',
    badge: '04',
    metrics: [
      { label: 'Uptime', value: 99.9 },
      { label: 'Velocidade', value: 97 },
      { label: 'Segurança', value: 100 }
    ],
    visual: 'launch'
  },
  {
    id: 'growth',
    title: 'Crescimento e Otimização',
    description: 'Analisamos dados e implementamos melhorias contínuas para maximizar o ROI e impulsionar o crescimento do seu negócio.',
    icon: <IconChartBar size={rem(24)} stroke={1.5} />,
    details: [
      { title: 'Análise de Dados', icon: <IconDeviceAnalytics size={16} />, progress: 100 },
      { title: 'SEO Avançado', icon: <IconBrandGoogle size={16} />, progress: 100 },
      { title: 'Otimização de Conversão', icon: <IconArrowsShuffle size={16} />, progress: 100 },
      { title: 'Escalabilidade', icon: <IconArrowsMaximize size={16} />, progress: 100 }
    ],
    tools: [
      { name: 'Google Analytics', icon: <IconBrandGoogle size={18} /> },
      { name: 'Hotjar', icon: <IconCircleDotted size={18} /> },
      { name: 'Mixpanel', icon: <IconChartBar size={18} /> }
    ],
    color: '#9461FF',
    gradient: 'linear-gradient(135deg, #9461FF, #B490FF)',
    badge: '05',
    metrics: [
      { label: 'Crescimento', value: 35 },
      { label: 'Retenção', value: 92 },
      { label: 'ROI', value: 320 }
    ],
    visual: 'growth'
  }
];

// Componente para o efeito de partículas flutuantes
function FloatingParticles() {
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
        pointerEvents: 'none',
      }}
    >
      {Array.from({ length: 30 }).map((_, i) => {
        // Valores determinísticos baseados no índice
        const size = (i % 3) + 2;
        const left = (i * 3.33) % 100;
        const top = (i * 3.33) % 100;
        const delay = (i % 5) * 0.5;
        const duration = 15 + (i % 5) * 2;
        const opacity = 0.3 + (i % 3) * 0.1;

        return (
          <MotionBox
            key={i}
            style={{
              position: 'absolute',
              width: size,
              height: size,
              borderRadius: '50%',
              background: i % 3 === 0 ? '#7641C0' : i % 3 === 1 ? '#9969E5' : '#B490FF',
              boxShadow: `0 0 ${size * 2}px ${i % 3 === 0 ? '#7641C0' : i % 3 === 1 ? '#9969E5' : '#B490FF'}`,
              left: `${left}%`,
              top: `${top}%`,
              opacity: opacity,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, i % 2 === 0 ? 20 : -20, 0],
              opacity: [opacity, opacity * 1.5, opacity],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </Box>
  );
}

// Componente para o efeito de grade futurista
function FuturisticGrid() {
  return (
    <Box
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `
          linear-gradient(90deg, rgba(153,105,229,0.03) 1px, transparent 1px),
          linear-gradient(rgba(153,105,229,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        zIndex: 0,
        opacity: 0.5,
        pointerEvents: 'none',
      }}
    />
  );
}

// Componente para o efeito de gradiente dinâmico
function DynamicGradient() {
  return (
    <MotionBox
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 30% 30%, rgba(118,65,192,0.08) 0%, rgba(20,20,20,0) 50%), radial-gradient(circle at 70% 70%, rgba(153,105,229,0.08) 0%, rgba(20,20,20,0) 50%)',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      animate={{
        background: [
          'radial-gradient(circle at 30% 30%, rgba(118,65,192,0.08) 0%, rgba(20,20,20,0) 50%), radial-gradient(circle at 70% 70%, rgba(153,105,229,0.08) 0%, rgba(20,20,20,0) 50%)',
          'radial-gradient(circle at 40% 40%, rgba(118,65,192,0.08) 0%, rgba(20,20,20,0) 50%), radial-gradient(circle at 60% 60%, rgba(153,105,229,0.08) 0%, rgba(20,20,20,0) 50%)',
          'radial-gradient(circle at 30% 30%, rgba(118,65,192,0.08) 0%, rgba(20,20,20,0) 50%), radial-gradient(circle at 70% 70%, rgba(153,105,229,0.08) 0%, rgba(20,20,20,0) 50%)',
        ]
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

// Componente para o ícone animado moderno
function AnimatedIcon({ icon, color, gradient }: { icon: React.ReactNode, color: string, gradient?: string }) {
  return (
    <MotionBox
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <MotionThemeIcon
        size={60}
        radius="xl"
        style={{
          background: gradient || `linear-gradient(135deg, ${color}, rgba(30,30,30,0.5))`,
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: `0 10px 20px rgba(0,0,0,0.2), 0 0 15px ${color}40`,
          color: 'white',
          overflow: 'hidden',
          position: 'relative',
        }}
        initial={{ rotate: 0 }}
        whileHover={{ rotate: [0, -5, 5, 0] }}
        transition={{ duration: 0.5 }}
      >
        {/* Efeito de brilho interno */}
        <Box
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '150%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            transform: 'translateX(-100%) skewX(-15deg)',
            animation: 'shine 3s infinite',
            zIndex: 0,
          }}
        />

        {/* Ícone */}
        <Box style={{ position: 'relative', zIndex: 1 }}>
          {icon}
        </Box>
      </MotionThemeIcon>

      {/* Efeito de brilho pulsante */}
      <MotionBox
        style={{
          position: 'absolute',
          width: '140%',
          height: '140%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color}30 0%, ${color}00 70%)`,
          filter: 'blur(15px)',
          zIndex: -1,
        }}
        animate={{
          opacity: [0.4, 0.8, 0.4],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </MotionBox>
  );
}

// Componente para exibir ferramentas
function ToolsDisplay({ tools }: { tools: { name: string, icon: React.ReactNode }[] }) {
  return (
    <Group gap="xs">
      {tools.map((tool, index) => (
        <Tooltip key={index} label={tool.name} position="top" withArrow arrowSize={6}>
          <MotionActionIcon
            variant="light"
            color="gray"
            radius="xl"
            size="lg"
            style={{
              background: 'rgba(30,30,30,0.6)',
              border: '1px solid rgba(153,105,229,0.2)',
              backdropFilter: 'blur(10px)',
            }}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            {tool.icon}
          </MotionActionIcon>
        </Tooltip>
      ))}
    </Group>
  );
}

// Componente para exibir métricas
function MetricsDisplay({ metrics }: { metrics: { label: string, value: number }[] }) {
  return (
    <SimpleGrid cols={3} spacing="xs">
      {metrics.map((metric, index) => (
        <MotionBox
          key={index}
          style={{
            background: 'rgba(30,30,30,0.4)',
            borderRadius: '12px',
            padding: '10px',
            border: '1px solid rgba(153,105,229,0.1)',
            textAlign: 'center',
          }}
          whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
          <Text size="xl" fw={700} c="white" style={{ lineHeight: 1 }}>
            {metric.value}{metric.label === 'ROI' ? '%' : ''}
          </Text>
          <Text size="xs" c="gray.5">
            {metric.label}
          </Text>
        </MotionBox>
      ))}
    </SimpleGrid>
  );
}

// Componentes de visualização para cada etapa do workflow
function StepVisual({ type }: { type: string }) {
  switch (type) {
    case 'discovery':
      return <DiscoveryVisual />;
    case 'design':
      return <DesignVisual />;
    case 'development':
      return <DevelopmentVisual />;
    case 'launch':
      return <LaunchVisual />;
    case 'growth':
      return <GrowthVisual />;
    default:
      return <DiscoveryVisual />;
  }
}

// Visualização para a etapa de Descoberta
function DiscoveryVisual() {
  return (
    <MotionBox
      style={{
        background: 'rgba(25,25,25,0.7)',
        borderRadius: '16px',
        border: '1px solid rgba(153,105,229,0.2)',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 30px rgba(118,65,192,0.1)',
        backdropFilter: 'blur(10px)',
        padding: '20px',
        height: '100%',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Flex align="center" mb="md">
        <ThemeIcon radius="xl" size="xl" variant="light" color="purple" mr="md">
          <IconBulb size={24} />
        </ThemeIcon>
        <Title order={4}>Análise Estratégica</Title>
      </Flex>

      <Box style={{ flex: 1 }}>
        <SimpleGrid cols={2} spacing="md" mb="md">
          <MotionBox
            style={{
              background: 'rgba(118,65,192,0.1)',
              borderRadius: '12px',
              padding: '15px',
              border: '1px solid rgba(118,65,192,0.2)',
            }}
            whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
          >
            <Text fw={600} mb={5}>Pesquisa de Mercado</Text>
            <Text size="sm" c="gray.5">Análise competitiva e identificação de oportunidades</Text>
          </MotionBox>

          <MotionBox
            style={{
              background: 'rgba(118,65,192,0.1)',
              borderRadius: '12px',
              padding: '15px',
              border: '1px solid rgba(118,65,192,0.2)',
            }}
            whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
          >
            <Text fw={600} mb={5}>Definição de Objetivos</Text>
            <Text size="sm" c="gray.5">Estabelecimento de metas claras e mensuráveis</Text>
          </MotionBox>
        </SimpleGrid>

        <MotionBox
          style={{
            background: 'linear-gradient(135deg, rgba(118,65,192,0.1), rgba(153,105,229,0.1))',
            borderRadius: '12px',
            padding: '15px',
            border: '1px solid rgba(153,105,229,0.2)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(118,65,192,0.1) 0%, transparent 70%)`,
              zIndex: 0,
            }}
          />

          <Box style={{ position: 'relative', zIndex: 1 }}>
            <Text fw={600} mb={5}>Resultado</Text>
            <Text size="sm" c="gray.5" mb={10}>Plano estratégico detalhado com roadmap de implementação</Text>

            <Group>
              <Badge variant="light" color="purple">Estratégia</Badge>
              <Badge variant="light" color="purple">Planejamento</Badge>
              <Badge variant="light" color="purple">Análise</Badge>
            </Group>
          </Box>
        </MotionBox>
      </Box>
    </MotionBox>
  );
}

// Visualização para a etapa de Design
function DesignVisual() {
  return (
    <MotionBox
      style={{
        background: 'rgba(25,25,25,0.7)',
        borderRadius: '16px',
        border: '1px solid rgba(153,105,229,0.2)',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 30px rgba(118,65,192,0.1)',
        backdropFilter: 'blur(10px)',
        padding: '20px',
        height: '100%',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Flex align="center" mb="md">
        <ThemeIcon radius="xl" size="xl" variant="light" color="purple" mr="md">
          <IconBrandFigma size={24} />
        </ThemeIcon>
        <Title order={4}>Design System</Title>
      </Flex>

      <SimpleGrid cols={2} spacing="md" mb="md">
        <MotionBox
          style={{
            background: 'rgba(153,105,229,0.1)',
            borderRadius: '12px',
            padding: '15px',
            border: '1px solid rgba(153,105,229,0.2)',
            height: '150px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
        >
          <Box
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #7641C0, #9969E5)',
              marginBottom: '10px',
            }}
          />
          <Text size="sm" c="gray.5">Cores Primárias</Text>
        </MotionBox>

        <MotionBox
          style={{
            background: 'rgba(153,105,229,0.1)',
            borderRadius: '12px',
            padding: '15px',
            border: '1px solid rgba(153,105,229,0.2)',
            height: '150px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
        >
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              marginBottom: '10px',
            }}
          >
            <Text size="xl" fw={700}>Aa</Text>
            <Text size="md">Aa</Text>
            <Text size="sm">Aa</Text>
          </Box>
          <Text size="sm" c="gray.5">Tipografia</Text>
        </MotionBox>
      </SimpleGrid>

      <MotionBox
        style={{
          background: 'linear-gradient(135deg, rgba(153,105,229,0.1), rgba(180,144,255,0.1))',
          borderRadius: '12px',
          padding: '15px',
          border: '1px solid rgba(153,105,229,0.2)',
          position: 'relative',
          overflow: 'hidden',
          flex: 1,
        }}
      >
        <Box
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(153,105,229,0.1) 0%, transparent 70%)`,
            zIndex: 0,
          }}
        />

        <Box style={{ position: 'relative', zIndex: 1 }}>
          <Text fw={600} mb={5}>Componentes UI</Text>
          <Group mb={15}>
            <Box
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #7641C0, #9969E5)',
                color: 'white',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              Botão
            </Box>

            <Box
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid #9969E5',
                color: '#9969E5',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              Botão Outline
            </Box>

            <Box
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #7641C0, #9969E5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
              }}
            >
              <IconPlus size={14} />
            </Box>
          </Group>

          <Group>
            <Badge variant="filled" color="purple">UI/UX</Badge>
            <Badge variant="filled" color="purple">Design System</Badge>
            <Badge variant="filled" color="purple">Protótipos</Badge>
          </Group>
        </Box>
      </MotionBox>
    </MotionBox>
  );
}

// Visualização para a etapa de Desenvolvimento
function DevelopmentVisual() {
  return (
    <MotionBox
      style={{
        background: 'rgba(25,25,25,0.7)',
        borderRadius: '16px',
        border: '1px solid rgba(153,105,229,0.2)',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 30px rgba(118,65,192,0.1)',
        backdropFilter: 'blur(10px)',
        padding: '20px',
        height: '100%',
        minHeight: '400px',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Flex align="center" mb="md">
        <ThemeIcon radius="xl" size="xl" variant="light" color="purple" mr="md">
          <IconCode size={24} />
        </ThemeIcon>
        <Title order={4}>Desenvolvimento</Title>
      </Flex>

      <Box
        style={{
          background: 'rgba(30,30,30,0.6)',
          borderRadius: '8px',
          padding: '15px',
          border: '1px solid rgba(96,48,160,0.3)',
          fontFamily: 'monospace',
          color: '#B490FF',
          marginBottom: '15px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Text size="sm" style={{ color: '#9969E5' }}>
          <span style={{ color: '#7641C0' }}>import</span> &#123; <span style={{ color: '#B490FF' }}>useState, useEffect</span> &#125; <span style={{ color: '#7641C0' }}>from</span> <span style={{ color: '#9969E5' }}>'react'</span>;
        </Text>
        <Text size="sm" style={{ color: '#9969E5' }}>
          <span style={{ color: '#7641C0' }}>import</span> &#123; <span style={{ color: '#B490FF' }}>motion</span> &#125; <span style={{ color: '#7641C0' }}>from</span> <span style={{ color: '#9969E5' }}>'framer-motion'</span>;
        </Text>
        <Text size="sm" mt={10}>
          <span style={{ color: '#7641C0' }}>function</span> <span style={{ color: '#B490FF' }}>Component</span>() &#123;
        </Text>
        <Text size="sm" ml={20}>
          <span style={{ color: '#7641C0' }}>const</span> [<span style={{ color: '#B490FF' }}>data</span>, <span style={{ color: '#B490FF' }}>setData</span>] = <span style={{ color: '#B490FF' }}>useState</span>(null);
        </Text>
        <Text size="sm" ml={20}>
          <span style={{ color: '#7641C0' }}>return</span> (
        </Text>
        <Text size="sm" ml={40}>
          &lt;<span style={{ color: '#B490FF' }}>motion.div</span> <span style={{ color: '#7641C0' }}>animate</span>="&#123;&#123; opacity: 1 &#125;&#125;"&gt;
        </Text>
        <Text size="sm" ml={60}>
          // Componente React
        </Text>
        <Text size="sm" ml={40}>
          &lt;/<span style={{ color: '#B490FF' }}>motion.div</span>&gt;
        </Text>
        <Text size="sm" ml={20}>
          );
        </Text>
        <Text size="sm">
          &#125;
        </Text>
      </Box>

      <SimpleGrid cols={3} spacing="xs" mb="md">
        <MotionBox
          style={{
            background: 'rgba(96,48,160,0.1)',
            borderRadius: '8px',
            padding: '10px',
            border: '1px solid rgba(96,48,160,0.2)',
            textAlign: 'center',
          }}
          whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
        >
          <IconBrandReact size={24} style={{ color: '#9969E5', marginBottom: '5px' }} />
          <Text size="xs" c="gray.5">Frontend</Text>
        </MotionBox>

        <MotionBox
          style={{
            background: 'rgba(96,48,160,0.1)',
            borderRadius: '8px',
            padding: '10px',
            border: '1px solid rgba(96,48,160,0.2)',
            textAlign: 'center',
          }}
          whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
        >
          <IconBrandNodejs size={24} style={{ color: '#9969E5', marginBottom: '5px' }} />
          <Text size="xs" c="gray.5">Backend</Text>
        </MotionBox>

        <MotionBox
          style={{
            background: 'rgba(96,48,160,0.1)',
            borderRadius: '8px',
            padding: '10px',
            border: '1px solid rgba(96,48,160,0.2)',
            textAlign: 'center',
          }}
          whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
        >
          <IconDatabase size={24} style={{ color: '#9969E5', marginBottom: '5px' }} />
          <Text size="xs" c="gray.5">Database</Text>
        </MotionBox>
      </SimpleGrid>

      <Group>
        <Badge variant="dot" color="purple">Clean Code</Badge>
        <Badge variant="dot" color="purple">Testes</Badge>
        <Badge variant="dot" color="purple">CI/CD</Badge>
        <Badge variant="dot" color="purple">Performance</Badge>
      </Group>
    </MotionBox>
  );
}

// Visualização para a etapa de Lançamento
function LaunchVisual() {
  return (
    <MotionBox
      style={{
        background: 'rgba(25,25,25,0.7)',
        borderRadius: '16px',
        border: '1px solid rgba(153,105,229,0.2)',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 30px rgba(118,65,192,0.1)',
        backdropFilter: 'blur(10px)',
        padding: '20px',
        height: '100%',
        minHeight: '400px',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Flex align="center" mb="md">
        <ThemeIcon radius="xl" size="xl" variant="light" color="purple" mr="md">
          <IconRocket size={24} />
        </ThemeIcon>
        <Title order={4}>Lançamento</Title>
      </Flex>

      <MotionBox
        style={{
          background: 'rgba(180,144,255,0.1)',
          borderRadius: '12px',
          padding: '15px',
          border: '1px solid rgba(180,144,255,0.2)',
          marginBottom: '15px',
        }}
        whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
      >
        <Flex align="center" justify="space-between" mb={10}>
          <Text fw={600}>Infraestrutura</Text>
          <Badge color="green">Online</Badge>
        </Flex>

        <SimpleGrid cols={2} spacing="xs" mb={10}>
          <Box>
            <Text size="xs" c="gray.5">Servidor</Text>
            <Text size="sm">Vercel</Text>
          </Box>

          <Box>
            <Text size="xs" c="gray.5">CDN</Text>
            <Text size="sm">Cloudflare</Text>
          </Box>

          <Box>
            <Text size="xs" c="gray.5">Banco de Dados</Text>
            <Text size="sm">PlanetScale</Text>
          </Box>

          <Box>
            <Text size="xs" c="gray.5">Monitoramento</Text>
            <Text size="sm">Datadog</Text>
          </Box>
        </SimpleGrid>

        <Progress value={100} color="green" size="sm" />
      </MotionBox>

      <SimpleGrid cols={2} spacing="md" mb="md">
        <MotionBox
          style={{
            background: 'rgba(180,144,255,0.1)',
            borderRadius: '12px',
            padding: '15px',
            border: '1px solid rgba(180,144,255,0.2)',
          }}
          whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
        >
          <Flex align="center" mb={10}>
            <IconCircleCheck size={20} style={{ color: '#B490FF', marginRight: '8px' }} />
            <Text fw={600}>Testes Finais</Text>
          </Flex>

          <Group spacing="xs">
            <Badge variant="light" color="green">UI</Badge>
            <Badge variant="light" color="green">Funcionalidade</Badge>
            <Badge variant="light" color="green">Performance</Badge>
            <Badge variant="light" color="green">SEO</Badge>
          </Group>
        </MotionBox>

        <MotionBox
          style={{
            background: 'rgba(180,144,255,0.1)',
            borderRadius: '12px',
            padding: '15px',
            border: '1px solid rgba(180,144,255,0.2)',
          }}
          whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
        >
          <Flex align="center" mb={10}>
            <IconCircleCheck size={20} style={{ color: '#B490FF', marginRight: '8px' }} />
            <Text fw={600}>Segurança</Text>
          </Flex>

          <Group spacing="xs">
            <Badge variant="light" color="green">SSL</Badge>
            <Badge variant="light" color="green">Firewall</Badge>
            <Badge variant="light" color="green">GDPR</Badge>
            <Badge variant="light" color="green">Backups</Badge>
          </Group>
        </MotionBox>
      </SimpleGrid>

      <Button
        variant="gradient"
        gradient={{ from: '#7641C0', to: '#B490FF' }}
        radius="md"
        leftSection={<IconRocket size={16} />}
        fullWidth
      >
        Lançar Projeto
      </Button>
    </MotionBox>
  );
}

// Visualização para a etapa de Crescimento
function GrowthVisual() {
  return (
    <MotionBox
      style={{
        background: 'rgba(25,25,25,0.7)',
        borderRadius: '16px',
        border: '1px solid rgba(153,105,229,0.2)',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 30px rgba(118,65,192,0.1)',
        backdropFilter: 'blur(10px)',
        padding: '20px',
        height: '100%',
        minHeight: '400px',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Flex align="center" mb="md">
        <ThemeIcon radius="xl" size="xl" variant="light" color="purple" mr="md">
          <IconChartBar size={24} />
        </ThemeIcon>
        <Title order={4}>Crescimento e Otimização</Title>
      </Flex>

      <MotionBox
        style={{
          background: 'rgba(148,97,255,0.1)',
          borderRadius: '12px',
          padding: '15px',
          border: '1px solid rgba(148,97,255,0.2)',
          marginBottom: '15px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(148,97,255,0.1) 0%, transparent 70%)`,
            zIndex: 0,
          }}
        />

        <Box style={{ position: 'relative', zIndex: 1 }}>
          <Text fw={600} mb={10}>Métricas de Desempenho</Text>

          <SimpleGrid cols={1} spacing="xs" mb={15}>
            <Box>
              <Flex justify="space-between" align="center" mb={5}>
                <Text size="sm">Tráfego</Text>
                <Text size="sm" fw={600} c="#B490FF">+45%</Text>
              </Flex>
              <Progress value={45} color="purple" size="sm" mb={10} />
            </Box>

            <Box>
              <Flex justify="space-between" align="center" mb={5}>
                <Text size="sm">Conversão</Text>
                <Text size="sm" fw={600} c="#B490FF">+28%</Text>
              </Flex>
              <Progress value={28} color="purple" size="sm" mb={10} />
            </Box>

            <Box>
              <Flex justify="space-between" align="center" mb={5}>
                <Text size="sm">Retenção</Text>
                <Text size="sm" fw={600} c="#B490FF">+92%</Text>
              </Flex>
              <Progress value={92} color="purple" size="sm" />
            </Box>
          </SimpleGrid>
        </Box>
      </MotionBox>

      <SimpleGrid cols={2} spacing="md">
        <MotionBox
          style={{
            background: 'rgba(148,97,255,0.1)',
            borderRadius: '12px',
            padding: '15px',
            border: '1px solid rgba(148,97,255,0.2)',
          }}
          whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
        >
          <Flex align="center" mb={10}>
            <IconBrandGoogle size={20} style={{ color: '#9461FF', marginRight: '8px' }} />
            <Text fw={600}>SEO Avançado</Text>
          </Flex>

          <Text size="sm" c="gray.5" mb={10}>Otimização contínua para melhorar o posicionamento nos mecanismos de busca</Text>

          <Badge variant="light" color="purple">Palavras-chave</Badge>
        </MotionBox>

        <MotionBox
          style={{
            background: 'rgba(148,97,255,0.1)',
            borderRadius: '12px',
            padding: '15px',
            border: '1px solid rgba(148,97,255,0.2)',
          }}
          whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
        >
          <Flex align="center" mb={10}>
            <IconArrowsShuffle size={20} style={{ color: '#9461FF', marginRight: '8px' }} />
            <Text fw={600}>Otimização de Conversão</Text>
          </Flex>

          <Text size="sm" c="gray.5" mb={10}>Testes A/B e melhorias baseadas em dados para aumentar as conversões</Text>

          <Badge variant="light" color="purple">CRO</Badge>
        </MotionBox>
      </SimpleGrid>
    </MotionBox>
  );
}

export function ModernWorkflowSection() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Função para alternar entre os passos
  const handleStepClick = (index: number) => {
    setActiveStep(index);
    // Parar autoplay quando o usuário clica em um passo
    if (isAutoPlay) {
      setIsAutoPlay(false);
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    }
  };

  // Função para iniciar/parar o autoplay
  const toggleAutoPlay = () => {
    if (isAutoPlay) {
      setIsAutoPlay(false);
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    } else {
      setIsAutoPlay(true);
      autoPlayRef.current = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % workflowSteps.length);
      }, 5000);
    }
  };

  // Limpar o intervalo quando o componente for desmontado
  useEffect(() => {
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, []);

  // Efeito para animar o scroll quando o passo ativo muda
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const activeElement = container.querySelector(`[data-step="${activeStep}"]`);

      if (activeElement) {
        const containerRect = container.getBoundingClientRect();
        const activeRect = activeElement.getBoundingClientRect();

        const scrollLeft = activeRect.left - containerRect.left - (containerRect.width / 2) + (activeRect.width / 2);

        container.scrollTo({
          left: container.scrollLeft + scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [activeStep]);

  return (
    <Box
      py={120}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#0A0A0A',
      }}
      id="workflow"
    >
      {/* Efeitos de fundo */}
      <FuturisticGrid />
      <DynamicGradient />
      <FloatingParticles />

      <Container size="xl">
        {/* Cabeçalho da seção */}
        <Box mb={60}>
          <MotionTitle
            order={1}
            ta="center"
            style={{
              fontSize: rem(42),
              fontWeight: 800,
              letterSpacing: -1,
              marginBottom: rem(20),
              background: 'linear-gradient(90deg, #fff, #9969E5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Nosso Processo de Trabalho
          </MotionTitle>

          <MotionText
            c="gray.5"
            ta="center"
            size="lg"
            maw={700}
            mx="auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Desenvolvemos websites com um processo estruturado e transparente, garantindo resultados excepcionais em cada etapa do projeto.
          </MotionText>
        </Box>

        {/* Controles de navegação */}
        <Flex justify="space-between" align="center" mb={30}>
          <MotionTitle
            order={3}
            style={{
              fontSize: rem(24),
              fontWeight: 700,
              color: 'white',
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {workflowSteps[activeStep].title}
          </MotionTitle>

          <Group>
            <MotionActionIcon
              variant="subtle"
              color="gray"
              radius="xl"
              onClick={() => setActiveStep((prev) => (prev - 1 + workflowSteps.length) % workflowSteps.length)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconArrowNarrowLeft size={20} />
            </MotionActionIcon>

            <MotionActionIcon
              variant="subtle"
              color="gray"
              radius="xl"
              onClick={toggleAutoPlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isAutoPlay ? <IconPlayerPause size={20} /> : <IconPlayerPlay size={20} />}
            </MotionActionIcon>

            <MotionActionIcon
              variant="subtle"
              color="gray"
              radius="xl"
              onClick={() => setActiveStep((prev) => (prev + 1) % workflowSteps.length)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconArrowNarrowRight size={20} />
            </MotionActionIcon>
          </Group>
        </Flex>

        {/* Indicadores de passos */}
        <Box
          ref={containerRef}
          style={{
            display: 'flex',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            marginBottom: '30px',
            padding: '10px 0',
          }}
        >
          {workflowSteps.map((step, index) => (
            <MotionBox
              key={step.id}
              data-step={index}
              onClick={() => handleStepClick(index)}
              style={{
                minWidth: '200px',
                padding: '15px 20px',
                borderRadius: '12px',
                marginRight: '15px',
                background: activeStep === index ? step.gradient : 'rgba(30,30,30,0.6)',
                border: `1px solid ${activeStep === index ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)'}`,
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                boxShadow: activeStep === index ? '0 10px 30px rgba(118,65,192,0.2)' : 'none',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              whileHover={{ y: -5 }}
              animate={{
                y: activeStep === index ? -5 : 0,
                scale: activeStep === index ? 1.02 : 1,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              {/* Efeito de brilho para o item ativo */}
              {activeStep === index && (
                <Box
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
                    zIndex: 0,
                  }}
                />
              )}

              <Flex align="center" style={{ position: 'relative', zIndex: 1 }}>
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

                <Box>
                  <Text fw={600} c="white" size="sm">
                    {step.title}
                  </Text>
                  <Text c="gray.5" size="xs">
                    {step.timeframe}
                  </Text>
                </Box>
              </Flex>
            </MotionBox>
          ))}
        </Box>

        {/* Conteúdo principal */}
        <Grid gutter={40}>
          {/* Coluna da esquerda: Detalhes do passo */}
          <Grid.Col span={{ base: 12, md: 5 }}>
            <MotionBox
              style={{
                background: 'rgba(25,25,25,0.7)',
                borderRadius: '16px',
                border: '1px solid rgba(153,105,229,0.2)',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 30px rgba(118,65,192,0.1)',
                backdropFilter: 'blur(10px)',
                padding: '30px',
                height: '100%',
                minHeight: '400px',
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Flex align="center" mb={30}>
                <AnimatedIcon
                  icon={workflowSteps[activeStep].icon}
                  color={workflowSteps[activeStep].color}
                  gradient={workflowSteps[activeStep].gradient}
                />
                <Box ml={20}>
                  <MotionTitle
                    order={3}
                    style={{
                      fontSize: rem(24),
                      fontWeight: 700,
                      color: 'white',
                      marginBottom: rem(5),
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={`title-${activeStep}`}
                  >
                    {workflowSteps[activeStep].title}
                  </MotionTitle>
                  <MotionBadge
                    variant="light"
                    color="purple"
                    size="lg"
                    radius="sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    key={`timeframe-${activeStep}`}
                  >
                    {workflowSteps[activeStep].timeframe}
                  </MotionBadge>
                </Box>
              </Flex>

              <MotionText
                c="gray.4"
                size="md"
                mb={30}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                key={`desc-${activeStep}`}
              >
                {workflowSteps[activeStep].description}
              </MotionText>

              <MotionDivider
                color="dark.5"
                mb={20}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.2 }}
              />

              <Text fw={600} c="white" mb={15}>
                Detalhes do Processo
              </Text>

              <Box mb={30}>
                {workflowSteps[activeStep].details.map((detail, index) => (
                  <MotionFlex
                    key={index}
                    align="center"
                    mb={10}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <Box
                      style={{
                        color: '#9969E5',
                        marginRight: '10px',
                      }}
                    >
                      {detail.icon}
                    </Box>
                    <Box style={{ flex: 1 }}>
                      <Text size="sm" fw={500} c="white">
                        {detail.title}
                      </Text>
                      <MotionProgress
                        value={detail.progress}
                        color="purple"
                        size="xs"
                        radius="xl"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                      />
                    </Box>
                  </MotionFlex>
                ))}
              </Box>

              <Text fw={600} c="white" mb={15}>
                Ferramentas & Tecnologias
              </Text>

              <ToolsDisplay tools={workflowSteps[activeStep].tools} />

              <Box mt={30}>
                <Text fw={600} c="white" mb={15}>
                  Métricas de Sucesso
                </Text>

                <MetricsDisplay metrics={workflowSteps[activeStep].metrics} />
              </Box>
            </MotionBox>
          </Grid.Col>

          {/* Coluna da direita: Visualização */}
          <Grid.Col span={{ base: 12, md: 7 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                style={{ height: '100%' }}
              >
                <StepVisual type={workflowSteps[activeStep].visual} />
              </motion.div>
            </AnimatePresence>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
