'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
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

// Traduções para a seção de workflow
const workflowTexts = {
  'pt-BR': {
    sectionTitle: 'Nosso Processo de Trabalho',
    sectionDescription: 'Desenvolvemos websites com um processo estruturado e transparente, garantindo resultados excepcionais em cada etapa do projeto.',
    processDetails: 'Detalhes do Processo',
    toolsTech: 'Ferramentas & Tecnologias',
    successMetrics: 'Métricas de Sucesso'
  },
  'en': {
    sectionTitle: 'Our Work Process',
    sectionDescription: 'We develop websites with a structured and transparent process, ensuring exceptional results at every stage of the project.',
    processDetails: 'Process Details',
    toolsTech: 'Tools & Technologies',
    successMetrics: 'Success Metrics'
  },
  'fr': {
    sectionTitle: 'Notre Processus de Travail',
    sectionDescription: 'Nous développons des sites web avec un processus structuré et transparent, garantissant des résultats exceptionnels à chaque étape du projet.',
    processDetails: 'Détails du Processus',
    toolsTech: 'Outils & Technologies',
    successMetrics: 'Métriques de Succès'
  }
};

// Traduções para as etapas do workflow
const stepsTexts = {
  'pt-BR': {
    discovery: {
      title: 'Descoberta e Estratégia',
      description: 'Mergulhamos profundamente no seu negócio para entender seus objetivos, desafios e oportunidades digitais.',
      details: [
        { title: 'Análise de Requisitos', icon: <IconInfoCircle size={16} />, progress: 100 },
        { title: 'Definição de Objetivos', icon: <IconCircleCheck size={16} />, progress: 100 },
        { title: 'Pesquisa de Mercado', icon: <IconUsers size={16} />, progress: 100 },
        { title: 'Planejamento Estratégico', icon: <IconArrowsShuffle size={16} />, progress: 100 }
      ],
      visualTitle: 'Análise Estratégica',
      metrics: [
        { label: 'Precisão', value: 98 },
        { label: 'Eficiência', value: 95 },
        { label: 'Satisfação', value: 100 }
      ]
    },
    design: {
      title: 'Design e Prototipagem',
      description: 'Transformamos conceitos em experiências visuais interativas que encantam e engajam seus usuários.',
      details: [
        { title: 'Design System', icon: <IconCircleSquare size={16} />, progress: 100 },
        { title: 'UI/UX Design', icon: <IconDeviceDesktop size={16} />, progress: 100 },
        { title: 'Protótipos Interativos', icon: <IconArrowsShuffle size={16} />, progress: 100 },
        { title: 'Testes de Usabilidade', icon: <IconUsers size={16} />, progress: 100 }
      ],
      visualTitle: 'Design System',
      metrics: [
        { label: 'Inovação', value: 95 },
        { label: 'Usabilidade', value: 98 },
        { label: 'Conversão', value: 92 }
      ]
    },
    development: {
      title: 'Desenvolvimento',
      description: 'Codificamos seu projeto com as tecnologias mais avançadas, garantindo performance, segurança e escalabilidade.',
      details: [
        { title: 'Arquitetura', icon: <IconServer size={16} />, progress: 100 },
        { title: 'Frontend', icon: <IconBrandReact size={16} />, progress: 100 },
        { title: 'Backend', icon: <IconBrandNodejs size={16} />, progress: 100 },
        { title: 'Testes Automatizados', icon: <IconCircleCheck size={16} />, progress: 100 }
      ],
      visualTitle: 'Desenvolvimento',
      metrics: [
        { label: 'Performance', value: 96 },
        { label: 'Qualidade', value: 98 },
        { label: 'Segurança', value: 99 }
      ]
    },
    launch: {
      title: 'Lançamento',
      description: 'Implementamos seu projeto em ambiente de produção com monitoramento contínuo para garantir uma transição suave.',
      details: [
        { title: 'CI/CD Pipeline', icon: <IconArrowsShuffle size={16} />, progress: 100 },
        { title: 'Infraestrutura', icon: <IconServer size={16} />, progress: 100 },
        { title: 'Monitoramento', icon: <IconDeviceAnalytics size={16} />, progress: 100 },
        { title: 'Otimização', icon: <IconSettings size={16} />, progress: 100 }
      ],
      visualTitle: 'Lançamento',
      metrics: [
        { label: 'Uptime', value: 99.9 },
        { label: 'Velocidade', value: 97 },
        { label: 'Segurança', value: 100 }
      ]
    },
    growth: {
      title: 'Crescimento e Otimização',
      description: 'Analisamos dados e implementamos melhorias contínuas para maximizar o ROI e impulsionar o crescimento do seu negócio.',
      details: [
        { title: 'Análise de Dados', icon: <IconDeviceAnalytics size={16} />, progress: 100 },
        { title: 'SEO Avançado', icon: <IconBrandGoogle size={16} />, progress: 100 },
        { title: 'Otimização de Conversão', icon: <IconArrowsShuffle size={16} />, progress: 100 },
        { title: 'Escalabilidade', icon: <IconArrowsMaximize size={16} />, progress: 100 }
      ],
      visualTitle: 'Crescimento',
      metrics: [
        { label: 'Crescimento', value: 35 },
        { label: 'Retenção', value: 92 },
        { label: 'ROI', value: 320 }
      ]
    }
  },
  'en': {
    discovery: {
      title: 'Discovery & Strategy',
      description: 'We dive deep into your business to understand your goals, challenges, and digital opportunities.',
      details: [
        { title: 'Requirements Analysis', icon: <IconInfoCircle size={16} />, progress: 100 },
        { title: 'Goal Definition', icon: <IconCircleCheck size={16} />, progress: 100 },
        { title: 'Market Research', icon: <IconUsers size={16} />, progress: 100 },
        { title: 'Strategic Planning', icon: <IconArrowsShuffle size={16} />, progress: 100 }
      ],
      visualTitle: 'Strategic Analysis',
      metrics: [
        { label: 'Accuracy', value: 98 },
        { label: 'Efficiency', value: 95 },
        { label: 'Satisfaction', value: 100 }
      ]
    },
    design: {
      title: 'Design & Prototyping',
      description: 'We transform concepts into interactive visual experiences that delight and engage your users.',
      details: [
        { title: 'Design System', icon: <IconCircleSquare size={16} />, progress: 100 },
        { title: 'UI/UX Design', icon: <IconDeviceDesktop size={16} />, progress: 100 },
        { title: 'Interactive Prototypes', icon: <IconArrowsShuffle size={16} />, progress: 100 },
        { title: 'Usability Testing', icon: <IconUsers size={16} />, progress: 100 }
      ],
      visualTitle: 'Design System',
      metrics: [
        { label: 'Innovation', value: 95 },
        { label: 'Usability', value: 98 },
        { label: 'Conversion', value: 92 }
      ]
    },
    development: {
      title: 'Development',
      description: 'We code your project with the most advanced technologies, ensuring performance, security, and scalability.',
      details: [
        { title: 'Architecture', icon: <IconServer size={16} />, progress: 100 },
        { title: 'Frontend', icon: <IconBrandReact size={16} />, progress: 100 },
        { title: 'Backend', icon: <IconBrandNodejs size={16} />, progress: 100 },
        { title: 'Automated Tests', icon: <IconCircleCheck size={16} />, progress: 100 }
      ],
      visualTitle: 'Development',
      metrics: [
        { label: 'Performance', value: 96 },
        { label: 'Quality', value: 98 },
        { label: 'Security', value: 99 }
      ]
    },
    launch: {
      title: 'Launch',
      description: 'We implement your project in a production environment with continuous monitoring to ensure a smooth transition.',
      details: [
        { title: 'CI/CD Pipeline', icon: <IconArrowsShuffle size={16} />, progress: 100 },
        { title: 'Infrastructure', icon: <IconServer size={16} />, progress: 100 },
        { title: 'Monitoring', icon: <IconDeviceAnalytics size={16} />, progress: 100 },
        { title: 'Optimization', icon: <IconSettings size={16} />, progress: 100 }
      ],
      visualTitle: 'Launch',
      metrics: [
        { label: 'Uptime', value: 99.9 },
        { label: 'Speed', value: 97 },
        { label: 'Security', value: 100 }
      ]
    },
    growth: {
      title: 'Growth & Optimization',
      description: 'We analyze data and implement continuous improvements to maximize ROI and drive your business growth.',
      details: [
        { title: 'Data Analysis', icon: <IconDeviceAnalytics size={16} />, progress: 100 },
        { title: 'Advanced SEO', icon: <IconBrandGoogle size={16} />, progress: 100 },
        { title: 'Conversion Optimization', icon: <IconArrowsShuffle size={16} />, progress: 100 },
        { title: 'Scalability', icon: <IconArrowsMaximize size={16} />, progress: 100 }
      ],
      visualTitle: 'Growth',
      metrics: [
        { label: 'Growth', value: 35 },
        { label: 'Retention', value: 92 },
        { label: 'ROI', value: 320 }
      ]
    }
  },
  'fr': {
    discovery: {
      title: 'Découverte et Stratégie',
      description: 'Nous plongeons profondément dans votre entreprise pour comprendre vos objectifs, défis et opportunités numériques.',
      details: [
        { title: 'Analyse des Besoins', icon: <IconInfoCircle size={16} />, progress: 100 },
        { title: 'Définition des Objectifs', icon: <IconCircleCheck size={16} />, progress: 100 },
        { title: 'Étude de Marché', icon: <IconUsers size={16} />, progress: 100 },
        { title: 'Planification Stratégique', icon: <IconArrowsShuffle size={16} />, progress: 100 }
      ],
      visualTitle: 'Analyse Stratégique',
      metrics: [
        { label: 'Précision', value: 98 },
        { label: 'Efficacité', value: 95 },
        { label: 'Satisfaction', value: 100 }
      ]
    },
    design: {
      title: 'Design et Prototypage',
      description: 'Nous transformons les concepts en expériences visuelles interactives qui enchantent et engagent vos utilisateurs.',
      details: [
        { title: 'Système de Design', icon: <IconCircleSquare size={16} />, progress: 100 },
        { title: 'Design UI/UX', icon: <IconDeviceDesktop size={16} />, progress: 100 },
        { title: 'Prototypes Interactifs', icon: <IconArrowsShuffle size={16} />, progress: 100 },
        { title: 'Tests d\'Utilisabilité', icon: <IconUsers size={16} />, progress: 100 }
      ],
      visualTitle: 'Système de Design',
      metrics: [
        { label: 'Innovation', value: 95 },
        { label: 'Utilisabilité', value: 98 },
        { label: 'Conversion', value: 92 }
      ]
    },
    development: {
      title: 'Développement',
      description: 'Nous codons votre projet avec les technologies les plus avancées, garantissant performance, sécurité et évolutivité.',
      details: [
        { title: 'Architecture', icon: <IconServer size={16} />, progress: 100 },
        { title: 'Frontend', icon: <IconBrandReact size={16} />, progress: 100 },
        { title: 'Backend', icon: <IconBrandNodejs size={16} />, progress: 100 },
        { title: 'Tests Automatisés', icon: <IconCircleCheck size={16} />, progress: 100 }
      ],
      visualTitle: 'Développement',
      metrics: [
        { label: 'Performance', value: 96 },
        { label: 'Qualité', value: 98 },
        { label: 'Sécurité', value: 99 }
      ]
    },
    launch: {
      title: 'Lancement',
      description: 'Nous implémentons votre projet dans un environnement de production avec une surveillance continue pour assurer une transition en douceur.',
      details: [
        { title: 'Pipeline CI/CD', icon: <IconArrowsShuffle size={16} />, progress: 100 },
        { title: 'Infrastructure', icon: <IconServer size={16} />, progress: 100 },
        { title: 'Surveillance', icon: <IconDeviceAnalytics size={16} />, progress: 100 },
        { title: 'Optimisation', icon: <IconSettings size={16} />, progress: 100 }
      ],
      visualTitle: 'Lancement',
      metrics: [
        { label: 'Disponibilité', value: 99.9 },
        { label: 'Vitesse', value: 97 },
        { label: 'Sécurité', value: 100 }
      ]
    },
    growth: {
      title: 'Croissance et Optimisation',
      description: 'Nous analysons les données et mettons en œuvre des améliorations continues pour maximiser le ROI et stimuler la croissance de votre entreprise.',
      details: [
        { title: 'Analyse de Données', icon: <IconDeviceAnalytics size={16} />, progress: 100 },
        { title: 'SEO Avancé', icon: <IconBrandGoogle size={16} />, progress: 100 },
        { title: 'Optimisation de Conversion', icon: <IconArrowsShuffle size={16} />, progress: 100 },
        { title: 'Évolutivité', icon: <IconArrowsMaximize size={16} />, progress: 100 }
      ],
      visualTitle: 'Croissance',
      metrics: [
        { label: 'Croissance', value: 35 },
        { label: 'Rétention', value: 92 },
        { label: 'ROI', value: 320 }
      ]
    }
  }
};

// Traduções para os componentes visuais
const visualTexts = {
  'pt-BR': {
    // Discovery Visual
    marketResearch: 'Pesquisa de Mercado',
    marketResearchDesc: 'Análise competitiva e identificação de oportunidades',
    objectiveDefinition: 'Definição de Objetivos',
    objectiveDefinitionDesc: 'Estabelecimento de metas claras e mensuráveis',
    result: 'Resultado',
    resultDesc: 'Plano estratégico detalhado com roadmap de implementação',
    strategy: 'Estratégia',
    planning: 'Planejamento',
    analysis: 'Análise',
    // Design Visual
    primaryColors: 'Cores Primárias',
    typography: 'Tipografia',
    uiComponents: 'Componentes UI',
    button: 'Botão',
    outlineButton: 'Botão Outline',
    uiUx: 'UI/UX',
    designSystem: 'Design System',
    prototypes: 'Protótipos',
    // Development Visual
    frontend: 'Frontend',
    backend: 'Backend',
    database: 'Database',
    cleanCode: 'Clean Code',
    tests: 'Testes',
    cicd: 'CI/CD',
    performance: 'Performance',
    // Launch Visual
    infrastructure: 'Infraestrutura',
    online: 'Online',
    server: 'Servidor',
    monitoring: 'Monitoramento',
    finalTests: 'Testes Finais',
    functionality: 'Funcionalidade',
    security: 'Segurança',
    firewall: 'Firewall',
    backups: 'Backups',
    launchProject: 'Lançar Projeto',
    // Growth Visual
    seoAdvanced: 'SEO Avançado',
    conversionOptimization: 'Otimização de Conversão',
    scalability: 'Escalabilidade',
    analytics: 'Analytics',
    metrics: 'Métricas',
    growth: 'Crescimento',
    retention: 'Retenção',
    roi: 'ROI',
    // Process details
    processDetails: 'Detalhes do Processo',
    requirementsAnalysis: 'Análise de Requisitos',
    objectivesDefinition: 'Definição de Objetivos',
    marketResearchProcess: 'Pesquisa de Mercado',
    strategicPlanning: 'Planejamento Estratégico',
    toolsAndTechnologies: 'Ferramentas e Tecnologias',
    successMetrics: 'Métricas de Sucesso',
    precision: 'Precisão',
    efficiency: 'Eficiência',
    satisfaction: 'Satisfação',
    // Other metrics
    innovation: 'Inovação',
    usability: 'Usabilidade',
    conversion: 'Conversão',
    performance: 'Performance',
    quality: 'Qualidade',
    security: 'Segurança',
    uptime: 'Uptime',
    speed: 'Velocidade',
    // Design details
    designSystemDetail: 'Design System',
    uiUxDesign: 'UI/UX Design',
    interactivePrototypes: 'Protótipos Interativos',
    usabilityTests: 'Testes de Usabilidade',
    // Development details
    architecture: 'Arquitetura',
    automatedTests: 'Testes Automatizados',
    // Launch details
    cicdPipeline: 'CI/CD Pipeline',
    infrastructureDetail: 'Infraestrutura',
    optimizationDetail: 'Otimização',
    // Growth details
    dataAnalysis: 'Análise de Dados'
  },
  'en': {
    // Discovery Visual
    marketResearch: 'Market Research',
    marketResearchDesc: 'Competitive analysis and opportunity identification',
    objectiveDefinition: 'Objective Definition',
    objectiveDefinitionDesc: 'Establishment of clear and measurable goals',
    result: 'Result',
    resultDesc: 'Detailed strategic plan with implementation roadmap',
    strategy: 'Strategy',
    planning: 'Planning',
    analysis: 'Analysis',
    // Design Visual
    primaryColors: 'Primary Colors',
    typography: 'Typography',
    uiComponents: 'UI Components',
    button: 'Button',
    outlineButton: 'Outline Button',
    uiUx: 'UI/UX',
    designSystem: 'Design System',
    prototypes: 'Prototypes',
    // Development Visual
    frontend: 'Frontend',
    backend: 'Backend',
    database: 'Database',
    cleanCode: 'Clean Code',
    tests: 'Tests',
    cicd: 'CI/CD',
    performance: 'Performance',
    // Launch Visual
    infrastructure: 'Infrastructure',
    online: 'Online',
    server: 'Server',
    monitoring: 'Monitoring',
    finalTests: 'Final Tests',
    functionality: 'Functionality',
    security: 'Security',
    firewall: 'Firewall',
    backups: 'Backups',
    launchProject: 'Launch Project',
    // Growth Visual
    seoAdvanced: 'Advanced SEO',
    conversionOptimization: 'Conversion Optimization',
    scalability: 'Scalability',
    analytics: 'Analytics',
    metrics: 'Metrics',
    growth: 'Growth',
    retention: 'Retention',
    roi: 'ROI',
    // Process details
    processDetails: 'Process Details',
    requirementsAnalysis: 'Requirements Analysis',
    objectivesDefinition: 'Objectives Definition',
    marketResearchProcess: 'Market Research',
    strategicPlanning: 'Strategic Planning',
    toolsAndTechnologies: 'Tools & Technologies',
    successMetrics: 'Success Metrics',
    precision: 'Precision',
    efficiency: 'Efficiency',
    satisfaction: 'Satisfaction',
    // Other metrics
    innovation: 'Innovation',
    usability: 'Usability',
    conversion: 'Conversion',
    performance: 'Performance',
    quality: 'Quality',
    security: 'Security',
    uptime: 'Uptime',
    speed: 'Speed',
    // Design details
    designSystemDetail: 'Design System',
    uiUxDesign: 'UI/UX Design',
    interactivePrototypes: 'Interactive Prototypes',
    usabilityTests: 'Usability Tests',
    // Development details
    architecture: 'Architecture',
    automatedTests: 'Automated Tests',
    // Launch details
    cicdPipeline: 'CI/CD Pipeline',
    infrastructureDetail: 'Infrastructure',
    optimizationDetail: 'Optimization',
    // Growth details
    dataAnalysis: 'Data Analysis'
  },
  'fr': {
    // Discovery Visual
    marketResearch: 'Étude de Marché',
    marketResearchDesc: 'Analyse concurrentielle et identification des opportunités',
    objectiveDefinition: 'Définition des Objectifs',
    objectiveDefinitionDesc: 'Établissement d\'objectifs clairs et mesurables',
    result: 'Résultat',
    resultDesc: 'Plan stratégique détaillé avec feuille de route de mise en œuvre',
    strategy: 'Stratégie',
    planning: 'Planification',
    analysis: 'Analyse',
    // Design Visual
    primaryColors: 'Couleurs Primaires',
    typography: 'Typographie',
    uiComponents: 'Composants UI',
    button: 'Bouton',
    outlineButton: 'Bouton Contour',
    uiUx: 'UI/UX',
    designSystem: 'Système de Design',
    prototypes: 'Prototypes',
    // Development Visual
    frontend: 'Frontend',
    backend: 'Backend',
    database: 'Base de Données',
    cleanCode: 'Code Propre',
    tests: 'Tests',
    cicd: 'CI/CD',
    performance: 'Performance',
    // Launch Visual
    infrastructure: 'Infrastructure',
    online: 'En Ligne',
    server: 'Serveur',
    monitoring: 'Surveillance',
    finalTests: 'Tests Finaux',
    functionality: 'Fonctionnalité',
    security: 'Sécurité',
    firewall: 'Pare-feu',
    backups: 'Sauvegardes',
    launchProject: 'Lancer le Projet',
    // Growth Visual
    seoAdvanced: 'SEO Avancé',
    conversionOptimization: 'Optimisation de Conversion',
    scalability: 'Évolutivité',
    analytics: 'Analytique',
    metrics: 'Métriques',
    growth: 'Croissance',
    retention: 'Rétention',
    roi: 'ROI',
    // Process details
    processDetails: 'Détails du Processus',
    requirementsAnalysis: 'Analyse de Besoins',
    objectivesDefinition: 'Définition des Objectifs',
    marketResearchProcess: 'Étude de Marché',
    strategicPlanning: 'Planification Stratégique',
    toolsAndTechnologies: 'Outils et Technologies',
    successMetrics: 'Métriques de Succès',
    precision: 'Précision',
    efficiency: 'Efficacité',
    satisfaction: 'Satisfaction',
    // Other metrics
    innovation: 'Innovation',
    usability: 'Utilisabilité',
    conversion: 'Conversion',
    performance: 'Performance',
    quality: 'Qualité',
    security: 'Sécurité',
    uptime: 'Disponibilité',
    speed: 'Vitesse',
    // Design details
    designSystemDetail: 'Système de Design',
    uiUxDesign: 'Design UI/UX',
    interactivePrototypes: 'Prototypes Interactifs',
    usabilityTests: 'Tests d\'Utilisabilité',
    // Development details
    architecture: 'Architecture',
    automatedTests: 'Tests Automatisés',
    // Launch details
    cicdPipeline: 'Pipeline CI/CD',
    infrastructureDetail: 'Infrastructure',
    optimizationDetail: 'Optimisation',
    // Growth details
    dataAnalysis: 'Analyse de Données'
  }
};

// Dados do processo de trabalho
const workflowSteps = [
  {
    id: 'discovery',
    title: 'Descoberta e Estratégia',
    description: 'Mergulhamos profundamente no seu negócio para entender seus objetivos, desafios e oportunidades digitais.',
    icon: <IconBulb size={rem(24)} stroke={1.5} />,
    details: [
      { id: 'requirementsAnalysis', icon: <IconInfoCircle size={16} />, progress: 100 },
      { id: 'objectivesDefinition', icon: <IconCircleCheck size={16} />, progress: 100 },
      { id: 'marketResearchProcess', icon: <IconUsers size={16} />, progress: 100 },
      { id: 'strategicPlanning', icon: <IconArrowsShuffle size={16} />, progress: 100 }
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
      { id: 'precision', value: 98 },
      { id: 'efficiency', value: 95 },
      { id: 'satisfaction', value: 100 }
    ],
    visual: 'discovery'
  },
  {
    id: 'design',
    title: 'Design e Prototipagem',
    description: 'Transformamos conceitos em experiências visuais interativas que encantam e engajam seus usuários.',
    icon: <IconBrandFigma size={rem(24)} stroke={1.5} />,
    details: [
      { id: 'designSystemDetail', icon: <IconCircleSquare size={16} />, progress: 100 },
      { id: 'uiUxDesign', icon: <IconDeviceDesktop size={16} />, progress: 100 },
      { id: 'interactivePrototypes', icon: <IconArrowsShuffle size={16} />, progress: 100 },
      { id: 'usabilityTests', icon: <IconUsers size={16} />, progress: 100 }
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
      { id: 'innovation', value: 95 },
      { id: 'usability', value: 98 },
      { id: 'conversion', value: 92 }
    ],
    visual: 'design'
  },
  {
    id: 'development',
    title: 'Desenvolvimento',
    description: 'Codificamos seu projeto com as tecnologias mais avançadas, garantindo performance, segurança e escalabilidade.',
    icon: <IconCode size={rem(24)} stroke={1.5} />,
    details: [
      { id: 'architecture', icon: <IconServer size={16} />, progress: 100 },
      { id: 'frontend', icon: <IconBrandReact size={16} />, progress: 100 },
      { id: 'backend', icon: <IconBrandNodejs size={16} />, progress: 100 },
      { id: 'automatedTests', icon: <IconCircleCheck size={16} />, progress: 100 }
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
      { id: 'performance', value: 96 },
      { id: 'quality', value: 98 },
      { id: 'security', value: 99 }
    ],
    visual: 'development'
  },
  {
    id: 'launch',
    title: 'Lançamento',
    description: 'Implementamos seu projeto em ambiente de produção com monitoramento contínuo para garantir uma transição suave.',
    icon: <IconRocket size={rem(24)} stroke={1.5} />,
    details: [
      { id: 'cicdPipeline', icon: <IconArrowsShuffle size={16} />, progress: 100 },
      { id: 'infrastructureDetail', icon: <IconServer size={16} />, progress: 100 },
      { id: 'monitoring', icon: <IconDeviceAnalytics size={16} />, progress: 100 },
      { id: 'optimizationDetail', icon: <IconSettings size={16} />, progress: 100 }
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
      { id: 'uptime', value: 99.9 },
      { id: 'speed', value: 97 },
      { id: 'security', value: 100 }
    ],
    visual: 'launch'
  },
  {
    id: 'growth',
    title: 'Crescimento e Otimização',
    description: 'Analisamos dados e implementamos melhorias contínuas para maximizar o ROI e impulsionar o crescimento do seu negócio.',
    icon: <IconChartBar size={rem(24)} stroke={1.5} />,
    details: [
      { id: 'dataAnalysis', icon: <IconDeviceAnalytics size={16} />, progress: 100 },
      { id: 'seoAdvanced', icon: <IconBrandGoogle size={16} />, progress: 100 },
      { id: 'conversionOptimization', icon: <IconArrowsShuffle size={16} />, progress: 100 },
      { id: 'scalability', icon: <IconArrowsMaximize size={16} />, progress: 100 }
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
      { id: 'growth', value: 35 },
      { id: 'retention', value: 92 },
      { id: 'roi', value: 320 }
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
function MetricsDisplay({ metrics }: { metrics: { id?: string, label?: string, value: number }[] }) {
  // Obter o idioma atual
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'pt-BR';

  // Obter os textos traduzidos
  const vt = visualTexts[locale as keyof typeof visualTexts] || visualTexts['pt-BR'];

  return (
    <SimpleGrid cols={3} spacing="xs">
      {metrics.map((metric, index) => {
        // Determinar o rótulo a ser exibido
        const label = metric.id ? vt[metric.id as keyof typeof vt] || metric.id : metric.label || '';
        const isROI = metric.id === 'roi' || label === 'ROI';

        return (
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
              {metric.value}{isROI ? '%' : ''}
            </Text>
            <Text size="xs" c="gray.5">
              {label}
            </Text>
          </MotionBox>
        );
      })}
    </SimpleGrid>
  );
}

// Componentes de visualização para cada etapa do workflow
function StepVisual({ type }: { type: string }) {
  // Obter o idioma atual
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'pt-BR';

  // Obter os textos traduzidos
  const st = stepsTexts[locale as keyof typeof stepsTexts] || stepsTexts['pt-BR'];

  switch (type) {
    case 'discovery':
      return <DiscoveryVisual title={st.discovery.visualTitle} />;
    case 'design':
      return <DesignVisual title={st.design.visualTitle} />;
    case 'development':
      return <DevelopmentVisual title={st.development.visualTitle} />;
    case 'launch':
      return <LaunchVisual title={st.launch.visualTitle} />;
    case 'growth':
      return <GrowthVisual title={st.growth.visualTitle} />;
    default:
      return <DiscoveryVisual title={st.discovery.visualTitle} />;
  }
}

// Visualização para a etapa de Descoberta
function DiscoveryVisual({ title }: { title: string }) {
  // Obter o idioma atual
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'pt-BR';

  // Obter os textos traduzidos
  const vt = visualTexts[locale as keyof typeof visualTexts] || visualTexts['pt-BR'];

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
        <Title order={4}>{title}</Title>
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
            <Text fw={600} mb={5}>{vt.marketResearch}</Text>
            <Text size="sm" c="gray.5">{vt.marketResearchDesc}</Text>
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
            <Text fw={600} mb={5}>{vt.objectiveDefinition}</Text>
            <Text size="sm" c="gray.5">{vt.objectiveDefinitionDesc}</Text>
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
            <Text fw={600} mb={5}>{vt.result}</Text>
            <Text size="sm" c="gray.5" mb={10}>{vt.resultDesc}</Text>

            <Group>
              <Badge variant="light" color="purple">{vt.strategy}</Badge>
              <Badge variant="light" color="purple">{vt.planning}</Badge>
              <Badge variant="light" color="purple">{vt.analysis}</Badge>
            </Group>
          </Box>
        </MotionBox>
      </Box>
    </MotionBox>
  );
}

// Visualização para a etapa de Design
function DesignVisual({ title }: { title: string }) {
  // Obter o idioma atual
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'pt-BR';

  // Obter os textos traduzidos
  const vt = visualTexts[locale as keyof typeof visualTexts] || visualTexts['pt-BR'];

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
        <Title order={4}>{title}</Title>
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
          <Text size="sm" c="gray.5">{vt.primaryColors}</Text>
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
          <Text size="sm" c="gray.5">{vt.typography}</Text>
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
          <Text fw={600} mb={5}>{vt.uiComponents}</Text>
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
              {vt.button}
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
              {vt.outlineButton}
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
            <Badge variant="filled" color="purple">{vt.uiUx}</Badge>
            <Badge variant="filled" color="purple">{vt.designSystem}</Badge>
            <Badge variant="filled" color="purple">{vt.prototypes}</Badge>
          </Group>
        </Box>
      </MotionBox>
    </MotionBox>
  );
}

// Visualização para a etapa de Desenvolvimento
function DevelopmentVisual({ title }: { title: string }) {
  // Obter o idioma atual
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'pt-BR';

  // Obter os textos traduzidos
  const vt = visualTexts[locale as keyof typeof visualTexts] || visualTexts['pt-BR'];

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
        <Title order={4}>{title}</Title>
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
          <Text size="xs" c="gray.5">{vt.frontend}</Text>
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
          <Text size="xs" c="gray.5">{vt.backend}</Text>
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
          <Text size="xs" c="gray.5">{vt.database}</Text>
        </MotionBox>
      </SimpleGrid>

      <Group>
        <Badge variant="dot" color="purple">{vt.cleanCode}</Badge>
        <Badge variant="dot" color="purple">{vt.tests}</Badge>
        <Badge variant="dot" color="purple">{vt.cicd}</Badge>
        <Badge variant="dot" color="purple">{vt.performance}</Badge>
      </Group>
    </MotionBox>
  );
}

// Visualização para a etapa de Lançamento
function LaunchVisual({ title }: { title: string }) {
  // Obter o idioma atual
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'pt-BR';

  // Obter os textos traduzidos
  const vt = visualTexts[locale as keyof typeof visualTexts] || visualTexts['pt-BR'];

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
        <Title order={4}>{title}</Title>
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
          <Text fw={600}>{vt.infrastructure}</Text>
          <Badge color="green">{vt.online}</Badge>
        </Flex>

        <SimpleGrid cols={2} spacing="xs" mb={10}>
          <Box>
            <Text size="xs" c="gray.5">{vt.server}</Text>
            <Text size="sm">Vercel</Text>
          </Box>

          <Box>
            <Text size="xs" c="gray.5">CDN</Text>
            <Text size="sm">Cloudflare</Text>
          </Box>

          <Box>
            <Text size="xs" c="gray.5">{vt.database}</Text>
            <Text size="sm">PlanetScale</Text>
          </Box>

          <Box>
            <Text size="xs" c="gray.5">{vt.monitoring}</Text>
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
            <Text fw={600}>{vt.finalTests}</Text>
          </Flex>

          <Group gap="xs">
            <Badge variant="light" color="green">UI</Badge>
            <Badge variant="light" color="green">{vt.functionality}</Badge>
            <Badge variant="light" color="green">{vt.performance}</Badge>
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
            <Text fw={600}>{vt.security}</Text>
          </Flex>

          <Group gap="xs">
            <Badge variant="light" color="green">SSL</Badge>
            <Badge variant="light" color="green">{vt.firewall}</Badge>
            <Badge variant="light" color="green">GDPR</Badge>
            <Badge variant="light" color="green">{vt.backups}</Badge>
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
        {vt.launchProject}
      </Button>
    </MotionBox>
  );
}

// Visualização para a etapa de Crescimento
function GrowthVisual({ title }: { title: string }) {
  // Obter o idioma atual
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'pt-BR';

  // Obter os textos traduzidos
  const vt = visualTexts[locale as keyof typeof visualTexts] || visualTexts['pt-BR'];

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
        <Title order={4}>{title}</Title>
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
          <Text fw={600} mb={10}>{vt.metrics}</Text>

          <SimpleGrid cols={1} spacing="xs" mb={15}>
            <Box>
              <Flex justify="space-between" align="center" mb={5}>
                <Text size="sm">{vt.analytics}</Text>
                <Text size="sm" fw={600} c="#B490FF">+45%</Text>
              </Flex>
              <Progress value={45} color="purple" size="sm" mb={10} />
            </Box>

            <Box>
              <Flex justify="space-between" align="center" mb={5}>
                <Text size="sm">{vt.conversionOptimization}</Text>
                <Text size="sm" fw={600} c="#B490FF">+28%</Text>
              </Flex>
              <Progress value={28} color="purple" size="sm" mb={10} />
            </Box>

            <Box>
              <Flex justify="space-between" align="center" mb={5}>
                <Text size="sm">{vt.retention}</Text>
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
            <Text fw={600}>{vt.seoAdvanced}</Text>
          </Flex>

          <Text size="sm" c="gray.5" mb={10}>{locale === 'en' ? 'Continuous optimization to improve search engine positioning' : locale === 'fr' ? 'Optimisation continue pour améliorer le positionnement dans les moteurs de recherche' : 'Otimização contínua para melhorar o posicionamento nos mecanismos de busca'}</Text>

          <Badge variant="light" color="purple">{locale === 'en' ? 'Keywords' : locale === 'fr' ? 'Mots-clés' : 'Palavras-chave'}</Badge>
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
            <Text fw={600}>{vt.conversionOptimization}</Text>
          </Flex>

          <Text size="sm" c="gray.5" mb={10}>{locale === 'en' ? 'A/B testing and data-driven improvements to increase conversions' : locale === 'fr' ? 'Tests A/B et améliorations basées sur les données pour augmenter les conversions' : 'Testes A/B e melhorias baseadas em dados para aumentar as conversões'}</Text>

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

  // Obter o idioma atual
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'pt-BR';

  // Obter os textos traduzidos
  const t = workflowTexts[locale as keyof typeof workflowTexts] || workflowTexts['pt-BR'];
  const st = stepsTexts[locale as keyof typeof stepsTexts] || stepsTexts['pt-BR'];

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
            {t.sectionTitle}
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
            {t.sectionDescription}
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
            {st[workflowSteps[activeStep].id as keyof typeof st].title}
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
            marginBottom: '30px',
            padding: '10px 0',
          }}
          sx={{
            '&::-webkit-scrollbar': {
              display: 'none',
            }
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
                    {st[step.id as keyof typeof st]?.title || step.title}
                  </Text>
                  {/* Removido timeframe */}
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
                    {st[workflowSteps[activeStep].id as keyof typeof st].title}
                  </MotionTitle>
                  {/* Removido timeframe */}
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
                {st[workflowSteps[activeStep].id as keyof typeof st].description}
              </MotionText>

              <MotionDivider
                color="dark.5"
                mb={20}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.2 }}
              />

              <Text fw={600} c="white" mb={15}>
                {visualTexts[locale as keyof typeof visualTexts]?.processDetails || t.processDetails}
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
                        {(() => {
                          const vt = visualTexts[locale as keyof typeof visualTexts] || visualTexts['pt-BR'];
                          return vt[detail.id as keyof typeof vt] || detail.id;
                        })()}
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
                {t.toolsTech}
              </Text>

              <ToolsDisplay tools={workflowSteps[activeStep].tools} />

              <Box mt={30}>
                <Text fw={600} c="white" mb={15}>
                  {t.successMetrics}
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
