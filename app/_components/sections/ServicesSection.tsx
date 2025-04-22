'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  ThemeIcon,
  Box,
  Group,
  Badge,
  Flex,
  Button,
  Tabs
} from '@mantine/core';
import {
  IconGlobe,
  IconShoppingCart,
  IconCode,
  IconArrowUpRight,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconBrandReact,
  IconBrandNextjs,
  IconBrandTypescript,
  IconSeo,
  IconPalette,
  IconRocket,
  IconChartBar,
  IconBuildingStore,
  IconShoppingBag,
  IconCreditCard,
  IconTruck,
  IconFileDescription,
  IconForms,
  IconMail,
  IconMessageChatbot,
  IconSettings,
  IconDatabase,
  IconCloudComputing,
  IconDeviceAnalytics,
  IconCircuitDiode,
  IconCircuitCapacitor,
  IconCircuitResistor,
  IconCircuitCell,
  IconCircuitBattery,
  IconCircuitBulb,
  IconCircuitSwitchOpen,
  IconCircuitSwitchClosed,
  IconCircuitGround,
  IconCircuitPushbutton,
  IconBulb,
  IconSparkles,
  IconStars,
  IconBolt,
  IconBrandGithub,
  IconBrandVercel,
  IconBrandAws,
  IconServer,
  IconDevicesPc,
  IconDeviceLaptop,
  IconDeviceTablet,
  IconDeviceMobileMessage,
  IconBrandGoogle,
  IconBrandFigma,
  IconBrandSketch,
  IconBrandAdobe,
  IconBrandStripe,
  IconBrandPaypal
} from '@tabler/icons-react';
import { motion } from 'framer-motion';

// Componentes com motion
const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);
const MotionTitle = motion.create(Title);
const MotionThemeIcon = motion.create(ThemeIcon);
const MotionFlex = motion.create(Flex);
const MotionGroup = motion.create(Group);
const MotionBadge = motion.create(Badge);
const MotionButton = motion.create(Button);

// Componente para o efeito de circuit board
function CircuitBackground({ color = 'rgba(153, 105, 229, 0.15)' }: { color?: string }) {
  return (
    <Box
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.1,
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        {/* Linhas horizontais */}
        <line x1="0" y1="20" x2="100" y2="20" stroke={color} strokeWidth="0.2" />
        <line x1="0" y1="40" x2="100" y2="40" stroke={color} strokeWidth="0.2" />
        <line x1="0" y1="60" x2="100" y2="60" stroke={color} strokeWidth="0.2" />
        <line x1="0" y1="80" x2="100" y2="80" stroke={color} strokeWidth="0.2" />

        {/* Linhas verticais */}
        <line x1="20" y1="0" x2="20" y2="100" stroke={color} strokeWidth="0.2" />
        <line x1="40" y1="0" x2="40" y2="100" stroke={color} strokeWidth="0.2" />
        <line x1="60" y1="0" x2="60" y2="100" stroke={color} strokeWidth="0.2" />
        <line x1="80" y1="0" x2="80" y2="100" stroke={color} strokeWidth="0.2" />

        {/* Pontos de conexão */}
        <circle cx="20" cy="20" r="0.8" fill={color} />
        <circle cx="40" cy="20" r="0.8" fill={color} />
        <circle cx="60" cy="20" r="0.8" fill={color} />
        <circle cx="80" cy="20" r="0.8" fill={color} />

        <circle cx="20" cy="40" r="0.8" fill={color} />
        <circle cx="40" cy="40" r="0.8" fill={color} />
        <circle cx="60" cy="40" r="0.8" fill={color} />
        <circle cx="80" cy="40" r="0.8" fill={color} />

        <circle cx="20" cy="60" r="0.8" fill={color} />
        <circle cx="40" cy="60" r="0.8" fill={color} />
        <circle cx="60" cy="60" r="0.8" fill={color} />
        <circle cx="80" cy="60" r="0.8" fill={color} />

        <circle cx="20" cy="80" r="0.8" fill={color} />
        <circle cx="40" cy="80" r="0.8" fill={color} />
        <circle cx="60" cy="80" r="0.8" fill={color} />
        <circle cx="80" cy="80" r="0.8" fill={color} />

        {/* Linhas diagonais */}
        <line x1="20" y1="20" x2="40" y2="40" stroke={color} strokeWidth="0.2" />
        <line x1="60" y1="20" x2="80" y2="40" stroke={color} strokeWidth="0.2" />
        <line x1="20" y1="60" x2="40" y2="80" stroke={color} strokeWidth="0.2" />
        <line x1="60" y1="60" x2="80" y2="80" stroke={color} strokeWidth="0.2" />
      </svg>
    </Box>
  );
}

// Componente para ícone animado
function AnimatedIcon({ icon, color = 'rgba(153, 105, 229, 1)' }: { icon: React.ReactNode, color?: string }) {
  return (
    <MotionBox
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'inline-flex' }}
    >
      {icon}
    </MotionBox>
  );
}

// Componente para indicador de nível técnico
function TechLevelIndicator({ level = 3, maxLevel = 5 }: { level?: number, maxLevel?: number }) {
  return (
    <Flex gap={4} align="center">
      {Array.from({ length: maxLevel }).map((_, index) => (
        <Box
          key={index}
          style={{
            width: '6px',
            height: '12px',
            borderRadius: '2px',
            background: index < level
              ? `rgba(153, 105, 229, ${0.5 + (index / maxLevel) * 0.5})`
              : 'rgba(60, 60, 60, 0.3)',
            transition: 'all 0.3s ease',
          }}
        />
      ))}
    </Flex>
  );
}

// Interface para os tipos de serviços
interface ServiceFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  techLevel?: number;
}

interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  features: ServiceFeature[];
}

export function ServicesSection() {
  // Remover referência ao useMantineTheme que não é mais usado
  // Categorias de serviços
  const serviceCategories: ServiceCategory[] = [
    {
      id: 'landing-pages',
      title: 'Landing Pages',
      description: 'Páginas de destino atraentes e otimizadas para conversão, perfeitas para campanhas de marketing e apresentação de produtos ou serviços.',
      icon: <IconDeviceDesktop size={24} />,
      color: 'rgba(118, 65, 192, 0.8)',
      gradient: 'linear-gradient(135deg, rgba(118, 65, 192, 0.2), rgba(153, 105, 229, 0.1))',
      features: [
        {
          icon: <IconDevicesPc size={20} stroke={1.5} />,
          title: 'Design Responsivo',
          description: 'Layouts que se adaptam perfeitamente a qualquer dispositivo, garantindo uma experiência consistente em desktops, tablets e smartphones.',
          techLevel: 3
        },
        {
          icon: <IconBrandGoogle size={20} stroke={1.5} />,
          title: 'Otimização para SEO',
          description: 'Estrutura otimizada para mecanismos de busca, melhorando o posicionamento nos resultados de pesquisa e aumentando a visibilidade online.',
          techLevel: 4
        },
        {
          icon: <IconForms size={20} stroke={1.5} />,
          title: 'Formulários Inteligentes',
          description: 'Formulários de captura de leads otimizados para conversão, com validação em tempo real e integração com suas ferramentas de marketing.',
          techLevel: 3
        },
        {
          icon: <IconRocket size={20} stroke={1.5} />,
          title: 'Alta Performance',
          description: 'Carregamento rápido e otimizado, garantindo uma experiência fluida para seus visitantes e melhorando as taxas de conversão.',
          techLevel: 5
        },
        {
          icon: <IconChartBar size={20} stroke={1.5} />,
          title: 'Analytics Integrado',
          description: 'Acompanhe o desempenho da sua página com métricas detalhadas sobre visitantes, conversões e comportamento dos usuários.',
          techLevel: 4
        },
        {
          icon: <IconBrandFigma size={20} stroke={1.5} />,
          title: 'Design Personalizado',
          description: 'Design exclusivo alinhado com a identidade visual da sua marca, criando uma experiência única para seus visitantes.',
          techLevel: 4
        }
      ]
    },
    {
      id: 'e-commerce',
      title: 'E-commerce',
      description: 'Lojas online completas com gestão de produtos, carrinho de compras, pagamentos seguros e experiência de compra otimizada para seus clientes.',
      icon: <IconShoppingCart size={24} />,
      color: 'rgba(153, 105, 229, 0.8)',
      gradient: 'linear-gradient(135deg, rgba(153, 105, 229, 0.2), rgba(118, 65, 192, 0.1))',
      features: [
        {
          icon: <IconBuildingStore size={20} stroke={1.5} />,
          title: 'Catálogo de Produtos',
          description: 'Exiba seus produtos de forma atraente com categorias, filtros, variações e galerias de imagens de alta qualidade.',
          techLevel: 3
        },
        {
          icon: <IconShoppingBag size={20} stroke={1.5} />,
          title: 'Carrinho de Compras',
          description: 'Processo de compra simplificado e intuitivo, com carrinho persistente e recuperação de carrinhos abandonados.',
          techLevel: 4
        },
        {
          icon: <IconBrandStripe size={20} stroke={1.5} />,
          title: 'Pagamentos Seguros',
          description: 'Integração com as principais gateways de pagamento, oferecendo múltiplas opções de pagamento com total segurança.',
          techLevel: 5
        },
        {
          icon: <IconTruck size={20} stroke={1.5} />,
          title: 'Gestão de Entregas',
          description: 'Cálculo automático de frete, rastreamento de pedidos e integração com transportadoras e Correios.',
          techLevel: 4
        },
        {
          icon: <IconDatabase size={20} stroke={1.5} />,
          title: 'Gestão de Estoque',
          description: 'Controle de estoque em tempo real, alertas de baixo estoque e sincronização com sistemas de gestão.',
          techLevel: 4
        },
        {
          icon: <IconDeviceAnalytics size={20} stroke={1.5} />,
          title: 'Painel Administrativo',
          description: 'Interface intuitiva para gerenciar produtos, pedidos, clientes e relatórios de vendas.',
          techLevel: 5
        }
      ]
    },
    {
      id: 'custom-projects',
      title: 'Projetos Personalizados',
      description: 'Soluções web sob medida para necessidades específicas do seu negócio, com desenvolvimento personalizado e consultoria especializada.',
      icon: <IconCode size={24} />,
      color: 'rgba(212, 175, 55, 0.8)',
      gradient: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(153, 105, 229, 0.1))',
      features: [
        {
          icon: <IconCircuitDiode size={20} stroke={1.5} />,
          title: 'Consultoria Técnica',
          description: 'Análise detalhada das necessidades do seu negócio para desenvolver a solução ideal, com planejamento estratégico e roadmap de desenvolvimento.',
          techLevel: 5
        },
        {
          icon: <IconBrandReact size={20} stroke={1.5} />,
          title: 'Desenvolvimento Sob Medida',
          description: 'Criação de aplicações web personalizadas utilizando as tecnologias mais modernas como React, Next.js e TypeScript.',
          techLevel: 5
        },
        {
          icon: <IconMessageChatbot size={20} stroke={1.5} />,
          title: 'Suporte Premium',
          description: 'Atendimento prioritário e suporte técnico especializado para garantir o funcionamento contínuo da sua solução.',
          techLevel: 4
        },
        {
          icon: <IconBrandVercel size={20} stroke={1.5} />,
          title: 'Integração com APIs',
          description: 'Conexão com sistemas externos, serviços de terceiros e APIs para ampliar as funcionalidades da sua aplicação.',
          techLevel: 5
        },
        {
          icon: <IconCircuitSwitchClosed size={20} stroke={1.5} />,
          title: 'Manutenção Contínua',
          description: 'Atualizações regulares, monitoramento de performance e implementação de melhorias para manter sua aplicação sempre atualizada.',
          techLevel: 4
        },
        {
          icon: <IconBrandGithub size={20} stroke={1.5} />,
          title: 'Treinamento e Documentação',
          description: 'Capacitação da sua equipe para utilizar a solução desenvolvida e documentação completa para referência futura.',
          techLevel: 3
        }
      ]
    }
  ];

  // Estado para controlar a categoria selecionada
  const [activeCategory, setActiveCategory] = useState<string>(serviceCategories[0].id);

  // Obter a categoria ativa
  const activeService = serviceCategories.find(category => category.id === activeCategory) || serviceCategories[0];

  return (
    <Box
      py={80}
      style={{
        background: 'linear-gradient(to bottom, rgba(10,10,10,0.9) 0%, rgba(15,15,15,0.9) 100%)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background effect */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(118,65,192,0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(118,65,192,0.05) 0%, transparent 50%)',
          zIndex: 0,
        }}
      />

      <Container size="xl" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header Section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          mb={60}
          ta="center"
        >
          <MotionBadge
            variant="light"
            color="purple.5"
            size="lg"
            radius="sm"
            mb="md"
            style={{
              background: 'linear-gradient(135deg, rgba(118,65,192,0.1), rgba(153,105,229,0.2))',
              border: '1px solid rgba(153,105,229,0.3)',
              backdropFilter: 'blur(10px)',
            }}
          >
            Nossos Serviços
          </MotionBadge>

          <Title
            order={2}
            fw={700}
            size="2.5rem"
            c="white"
            mb="sm"
            style={{
              lineHeight: 1.2,
              letterSpacing: '-0.5px',
            }}
          >
            Soluções <Text span c="purple.4" inherit>completas</Text> para sua presença online
          </Title>

          <Text
            size="lg"
            c="gray.4"
            maw={700}
            mx="auto"
            lh={1.6}
            mb={40}
          >
            Criamos soluções digitais que geram resultados reais para o seu negócio.
            Nosso foco é desenvolver projetos que não apenas impressionam visualmente,
            mas também impulsionam seu crescimento e conversões.
          </Text>

          {/* Category Tabs */}
          <Tabs
            value={activeCategory}
            onChange={(value) => setActiveCategory(value || serviceCategories[0].id)}
            variant="pills"
            radius="xl"
            mb={40}
            styles={{
              root: {
                display: 'flex',
                justifyContent: 'center',
              },
              list: {
                gap: '10px',
                border: 'none',
                padding: '5px',
                background: 'rgba(30,30,30,0.5)',
                borderRadius: '30px',
                backdropFilter: 'blur(10px)',
                display: 'inline-flex',
              },
              tab: {
                color: 'white',
                fontWeight: 500,
                padding: '8px 20px',
                borderRadius: '30px',
                transition: 'all 0.3s ease',
                '&[data-active]': {
                  background: 'linear-gradient(135deg, rgba(118,65,192,0.8), rgba(153,105,229,0.8))',
                  color: 'white',
                },
              },
            }}
          >
            <Tabs.List>
              {serviceCategories.map((category) => (
                <Tabs.Tab
                  key={category.id}
                  value={category.id}
                  leftSection={category.icon}
                >
                  {category.title}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs>
        </MotionBox>

        {/* Service Details Section */}
        <MotionBox
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          mb={60}
        >
          <Flex gap="xl" direction={{ base: 'column', md: 'row' }}>
            {/* Service Overview */}
            <Box style={{ flex: '1' }}>
              <MotionFlex
                align="center"
                gap="md"
                mb="lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <ThemeIcon
                  size={60}
                  radius="md"
                  variant="light"
                  style={{
                    background: activeService.gradient,
                    border: '1px solid rgba(153,105,229,0.2)',
                    boxShadow: '0 5px 15px rgba(118,65,192,0.1)',
                  }}
                >
                  {activeService.icon}
                </ThemeIcon>
                <Box>
                  <Title order={3} fw={700} size="h3" c="white">{activeService.title}</Title>
                  <Text size="md" c="gray.4">{activeService.description}</Text>
                </Box>
              </MotionFlex>

              {/* Tech Stack */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                mb="xl"
              >
                <Text fw={600} size="sm" c="white" mb="sm">Desenvolvido com tecnologias modernas:</Text>
                <Flex gap="md" wrap="wrap">
                  <Badge
                    size="lg"
                    radius="md"
                    variant="light"
                    leftSection={<IconBrandTypescript size={14} />}
                    style={{
                      background: 'rgba(49, 120, 198, 0.1)',
                      border: '1px solid rgba(49, 120, 198, 0.2)',
                    }}
                  >
                    TypeScript
                  </Badge>
                  <Badge
                    size="lg"
                    radius="md"
                    variant="light"
                    leftSection={<IconBrandReact size={14} />}
                    style={{
                      background: 'rgba(97, 218, 251, 0.1)',
                      border: '1px solid rgba(97, 218, 251, 0.2)',
                    }}
                  >
                    React
                  </Badge>
                  <Badge
                    size="lg"
                    radius="md"
                    variant="light"
                    leftSection={<IconBrandNextjs size={14} />}
                    style={{
                      background: 'rgba(60, 60, 60, 0.1)',
                      border: '1px solid rgba(60, 60, 60, 0.2)',
                    }}
                  >
                    Next.js
                  </Badge>
                </Flex>
              </MotionBox>

              {/* CTA Button */}
              <MotionButton
                size="lg"
                radius="md"
                variant="gradient"
                gradient={{ from: 'rgba(118,65,192,0.9)', to: 'rgba(153,105,229,0.9)', deg: 135 }}
                rightSection={<IconArrowUpRight size={18} />}
                mt="xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 5px 15px rgba(118,65,192,0.3)',
                }}
                whileTap={{ scale: 0.98 }}
              >
                Solicitar Orçamento
              </MotionButton>
            </Box>

            {/* Features Grid */}
            <Box style={{ flex: '1.2' }}>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                {activeService.features.map((feature, index) => (
                  <MotionCard
                    key={index}
                    p="md"
                    radius="md"
                    style={{
                      background: 'linear-gradient(145deg, rgba(30,30,30,0.5), rgba(20,20,20,0.5))',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      height: '100%',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + (index * 0.05) }}
                    whileHover={{
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                      border: '1px solid rgba(153,105,229,0.2)',
                    }}
                  >
                    {/* Circuit board background */}
                    <CircuitBackground color={activeService.color} />

                    {/* Subtle gradient overlay */}
                    <Box
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, rgba(153,105,229,0.05) 0%, transparent 50%)',
                        zIndex: 0,
                      }}
                    />

                    <Flex gap="md" style={{ position: 'relative', zIndex: 1 }}>
                      <MotionThemeIcon
                        size={40}
                        radius="md"
                        variant="light"
                        color="purple.5"
                        style={{
                          background: 'linear-gradient(135deg, rgba(118,65,192,0.2), rgba(153,105,229,0.1))',
                          border: '1px solid rgba(153,105,229,0.2)',
                          boxShadow: '0 5px 15px rgba(118,65,192,0.1)',
                        }}
                        whileHover={{
                          scale: 1.1,
                          rotate: 5,
                          boxShadow: '0 5px 20px rgba(118,65,192,0.2)',
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {feature.icon}
                      </MotionThemeIcon>
                      <Box style={{ flex: 1 }}>
                        <Flex justify="space-between" align="center" mb="xs">
                          <Text fw={600} size="md" c="white">{feature.title}</Text>
                          <TechLevelIndicator level={feature.techLevel || 3} />
                        </Flex>
                        <Text size="sm" c="gray.5" lh={1.6}>{feature.description}</Text>
                      </Box>
                    </Flex>
                  </MotionCard>
                ))}
              </SimpleGrid>
            </Box>
          </Flex>
        </MotionBox>

        {/* Tech Stack Section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
          mt={40}
          ta="center"
        >
          <Text fw={600} size="sm" c="gray.5" mb="xs">
            Todos os nossos serviços são desenvolvidos com as tecnologias mais modernas do mercado
          </Text>
        </MotionBox>
      </Container>
    </Box>
  );
}
