import { useState, useEffect } from 'react';
import { Box, Container, Group, Text, ThemeIcon, SimpleGrid, Title, Flex, Badge, Button, Switch, Card, List } from '@mantine/core';
import { motion } from 'framer-motion';
import {
  IconCheck,
  IconX,
  IconCode,
  IconRocket,
  IconShieldCheck,
  IconClockHour4,
  IconCertificate,
  IconArrowRight,
  IconCrown,
  IconStar,
  IconStarFilled,
  IconDeviceDesktop,
  IconBrandSpotify,
  IconBrandReact,
  IconBrandNextjs,
  IconBrandTypescript,
  IconServer,
  IconHeadset,
  IconBolt,
  IconTrophy,
  IconPremium
} from '@tabler/icons-react';

// Componentes com motion
const MotionBox = motion.div;
const MotionFlex = motion.div;
const MotionBadge = motion.div;
const MotionButton = motion.button;
const MotionCard = motion.div;

// Componente Sparkle para o efeito de brilho
function Sparkle({ size, color, style }: { size: number, color: string, style?: React.CSSProperties }) {
  return (
    <Box
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, rgba(255,255,255,0) 70%)`,
        borderRadius: '50%',
        position: 'absolute',
        boxShadow: `0 0 ${size*2}px ${color}, 0 0 ${size}px ${color}`,
        opacity: 1,
        ...style,
      }}
    />
  );
}

// Componente Particle para as partículas que sobem
function Particle({ delay = 0, size = 3 }: { delay?: number, size?: number }) {
  // Gerar uma cor aleatória entre diferentes tons de roxo
  const colors = [
    '#9969E5', // Roxo mais brilhante
    '#7641C0', // Roxo principal
    '#B285FF', // Lilás claro
    '#A570FF', // Roxo médio
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];

  // Gerar um tamanho aleatório baseado no tamanho passado (mantendo as partículas pequenas)
  const particleSize = size * (0.7 + Math.random() * 0.5); // Entre 70% e 120% do tamanho original

  // Posição X inicial aleatória, concentrada mais no centro
  const startX = Math.random() * 140 - 70; // Entre -70 e 70px

  // Movimento X aleatório para dar um efeito de dispersão (mais sutil)
  const moveX = (Math.random() * 20 - 10) + (Math.random() > 0.5 ? 5 : -5);

  return (
    <MotionBox
      style={{
        position: 'absolute',
        width: `${particleSize}px`,
        height: `${particleSize}px`,
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 ${particleSize*1.2}px ${color}`,
        zIndex: 10,
      }}
      initial={{
        opacity: 0,
        y: 5, // Começa um pouco abaixo para parecer que está saindo do card
        x: startX,
        scale: 0.3,
      }}
      animate={{
        opacity: [0, 0.8, 0],
        y: [5, -60 - Math.random() * 40], // Sobe até uma altura menor e aleatória
        x: [startX, startX + moveX],
        scale: [0.3, 0.7, 0.2],
      }}
      transition={{
        duration: 2 + Math.random() * 2, // Duração mais longa: entre 2 e 4 segundos
        repeat: Infinity,
        delay: delay,
        ease: 'easeOut',
      }}
    />
  );
}

// Componente ParticleGroup para animar múltiplas partículas
function ParticleGroup() {
  // Gerar partículas muito pequenas (mais numerosas)
  const tinyParticles = Array.from({ length: 20 }).map((_, index) => (
    <Particle key={`tiny-${index}`} delay={index * 0.15} size={2} />
  ));

  // Gerar partículas pequenas
  const smallParticles = Array.from({ length: 15 }).map((_, index) => (
    <Particle key={`small-${index}`} delay={index * 0.2 + 0.1} size={3} />
  ));

  // Gerar partículas médias (menos numerosas)
  const mediumParticles = Array.from({ length: 8 }).map((_, index) => (
    <Particle key={`medium-${index}`} delay={index * 0.25 + 0.15} size={4} />
  ));

  // Gerar poucas partículas grandes
  const largeParticles = Array.from({ length: 5 }).map((_, index) => (
    <Particle key={`large-${index}`} delay={index * 0.3 + 0.2} size={5} />
  ));

  return (
    <Box
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '1px', // Altura mínima para não ocupar espaço
        overflow: 'visible',
        zIndex: 20,
        pointerEvents: 'none', // Para não interferir com cliques
      }}
    >
      <Box
        style={{
          position: 'relative',
          width: '100%',
          height: '1px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {tinyParticles}
        {smallParticles}
        {mediumParticles}
        {largeParticles}
      </Box>
    </Box>
  );
}

// Tipos para os serviços
interface ServiceFeature {
  title: string;
  included: boolean;
  highlight?: boolean;
}

interface Service {
  title: string;
  description: string;
  badge?: string;
  features: ServiceFeature[];
  cta: string;
  popular?: boolean;
  icon: React.ReactNode;
  color: string;
}

// Estilos CSS para os efeitos de hover
const hoverStyles = `
  .card-hover:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.2);
    border: 1px solid rgba(153,105,229,0.2);
  }

  .button-hover:hover {
    transform: scale(1.02);
    box-shadow: 0 5px 20px rgba(118,65,192,0.4);
  }

  .button-hover:active {
    transform: scale(0.98);
  }
`;

export function PricingSection() {
  // Dados dos serviços
  const services = [
    {
      title: 'Landing Page',
      description: 'Página única de alta conversão para apresentar seu produto ou serviço',
      features: [
        { title: 'Design responsivo e moderno', included: true, highlight: true },
        { title: 'Otimização para SEO', included: true, highlight: true },
        { title: 'Formulário de contato', included: true, highlight: true },
        { title: 'Integração com Analytics', included: true, highlight: true },
        { title: 'Entrega em até 7 dias', included: true, highlight: true },
      ],
      cta: 'Solicitar Orçamento',
      icon: <IconDeviceDesktop size={24} />,
      color: 'rgba(118, 65, 192, 0.7)'
    },
    {
      title: 'Site Institucional',
      description: 'Site completo para empresas que desejam uma presença online profissional',
      badge: 'Mais Popular',
      popular: true,
      features: [
        { title: 'Até 5 páginas personalizadas', included: true, highlight: true },
        { title: 'Design exclusivo para sua marca', included: true, highlight: true },
        { title: 'Otimização para SEO', included: true, highlight: true },
        { title: 'Blog integrado (opcional)', included: true, highlight: true },
        { title: 'Painel administrativo', included: true, highlight: true },
      ],
      cta: 'Solicitar Orçamento',
      icon: <IconRocket size={24} />,
      color: 'rgba(153, 105, 229, 0.8)'
    },
    {
      title: 'E-commerce',
      description: 'Loja online completa para vender seus produtos ou serviços',
      features: [
        { title: 'Catálogo de produtos ilimitado', included: true, highlight: true },
        { title: 'Integração com meios de pagamento', included: true, highlight: true },
        { title: 'Gestão de estoque e pedidos', included: true, highlight: true },
        { title: 'Design personalizado', included: true, highlight: true },
        { title: 'Painel administrativo completo', included: true, highlight: true },
      ],
      cta: 'Solicitar Orçamento',
      icon: <IconCrown size={24} />,
      color: 'rgba(118, 65, 192, 0.9)'
    }
  ];

  return (
    <Box
      py={80}
      style={{
        background: 'linear-gradient(to bottom, rgba(15,15,15,0.9) 0%, rgba(10,10,10,0.9) 100%)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Adiciona os estilos CSS para hover */}
      <style dangerouslySetInnerHTML={{ __html: hoverStyles }} />
      {/* Background effect */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(118,65,192,0.05) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(118,65,192,0.05) 0%, transparent 50%)',
          zIndex: 0,
        }}
      />

      <Container size="xl" style={{ position: 'relative', zIndex: 1 }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            marginBottom: '60px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, rgba(118,65,192,0.1), rgba(153,105,229,0.2))',
              border: '1px solid rgba(153,105,229,0.3)',
              backdropFilter: 'blur(10px)',
              padding: '0.5rem 0.9rem',
              borderRadius: '0.25rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'white',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Nossos Serviços
          </div>

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
            Soluções <Text span c="purple.4" inherit>personalizadas</Text> para seu projeto
          </Title>

          <Text
            size="lg"
            c="gray.4"
            maw={700}
            mx="auto"
            lh={1.6}
            mb={60}
          >
            Desenvolvemos websites e aplicações web de alta qualidade, utilizando as tecnologias mais modernas do mercado.
          </Text>

          {/* Cards de serviços */}
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
            {services.map((service, index) => (
              <MotionCard
                key={index}
                style={{
                  background: 'transparent',
                  overflow: 'visible',
                  height: '100%',
                  position: 'relative',
                  padding: 0,
                  borderRadius: '0.5rem',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Partículas e efeito de calor para o card popular */}
                {service.popular && (
                  <>
                    {/* Efeito de ondas de calor (mais sutil) */}
                    <MotionBox
                      style={{
                        position: 'absolute',
                        top: -15,
                        left: '15%',
                        width: '70%',
                        height: '30px',
                        background: 'transparent',
                        backdropFilter: 'blur(0.5px)',
                        opacity: 0.2,
                        zIndex: 90,
                        pointerEvents: 'none',
                      }}
                      animate={{
                        backdropFilter: ['blur(0.3px)', 'blur(0.8px)', 'blur(0.3px)'],
                        y: [-1, 1, -1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />

                    {/* Segunda camada de ondas de calor (ainda mais sutil) */}
                    <MotionBox
                      style={{
                        position: 'absolute',
                        top: -10,
                        left: '25%',
                        width: '50%',
                        height: '25px',
                        background: 'transparent',
                        backdropFilter: 'blur(0.3px)',
                        opacity: 0.15,
                        zIndex: 89,
                        pointerEvents: 'none',
                      }}
                      animate={{
                        backdropFilter: ['blur(0.2px)', 'blur(0.6px)', 'blur(0.2px)'],
                        y: [0, 2, 0],
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 0.5,
                      }}
                    />

                    {/* Efeito de emanação de calor */}
                    <MotionBox
                      style={{
                        position: 'absolute',
                        top: -2,
                        left: '10%',
                        width: '80%',
                        height: '15px',
                        background: 'linear-gradient(to top, rgba(153, 105, 229, 0.05), transparent)',
                        borderRadius: '50% 50% 0 0',
                        zIndex: 88,
                        pointerEvents: 'none',
                      }}
                      animate={{
                        opacity: [0.1, 0.2, 0.1],
                        height: ['15px', '18px', '15px'],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />

                    {/* Efeito de emanação de calor adicional */}
                    <MotionBox
                      style={{
                        position: 'absolute',
                        top: -1,
                        left: '20%',
                        width: '60%',
                        height: '8px',
                        background: 'linear-gradient(to top, rgba(118, 65, 192, 0.03), transparent)',
                        borderRadius: '50% 50% 0 0',
                        zIndex: 87,
                        pointerEvents: 'none',
                      }}
                      animate={{
                        opacity: [0.05, 0.15, 0.05],
                        height: ['8px', '12px', '8px'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 0.7,
                      }}
                    />

                    {/* Partículas */}
                    <Box
                      style={{
                        position: 'absolute',
                        top: 0, // Alinhado com o topo do card
                        left: 0,
                        right: 0,
                        width: '100%',
                        height: '1px',
                        zIndex: 100, // Valor alto para ficar acima de tudo
                        pointerEvents: 'none',
                      }}
                    >
                      <ParticleGroup />
                    </Box>
                  </>
                )}
                <MotionBox
                  style={{
                    background: service.popular
                      ? 'linear-gradient(135deg, rgba(30,30,30,0.6), rgba(40,40,40,0.6))'
                      : 'linear-gradient(135deg, rgba(20,20,20,0.6), rgba(30,30,30,0.6))',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    border: service.popular
                      ? '1px solid rgba(153,105,229,0.3)'
                      : '1px solid rgba(255,255,255,0.05)',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    boxShadow: service.popular
                      ? '0 10px 40px rgba(118,65,192,0.2), 0 0 15px rgba(153,105,229,0.1)'
                      : 'none',
                  }}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="card-hover"
                >
                  {/* Subtle gradient overlay */}
                  <Box
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(135deg, ${service.color} 0%, transparent 70%)`,
                      opacity: 0.1,
                      zIndex: 0,
                    }}
                  />

                  {/* Popular badge */}
                  {service.popular && (
                    <Box
                      style={{
                        position: 'absolute',
                        top: -40,
                        right: 20,
                        zIndex: 5,
                      }}
                    >
                      <Badge
                        variant="filled"
                        color="purple.5"
                        size="lg"
                        radius="sm"
                        style={{
                          background: 'linear-gradient(135deg, rgba(118,65,192,0.9), rgba(153,105,229,0.9))',
                          boxShadow: '0 5px 15px rgba(118,65,192,0.3)',
                          textTransform: 'none',
                          padding: '6px 12px',
                        }}
                      >
                        <Flex align="center" gap={6}>
                          <IconStarFilled size={14} />
                          {service.badge}
                        </Flex>
                      </Badge>
                    </Box>
                  )}

                  <Box p="xl" pt={service.popular ? 50 : 'xl'} style={{ position: 'relative', zIndex: 1 }}>
                    {/* Header */}
                    <Flex align="center" gap="md" mb="md">
                      <ThemeIcon
                        size={50}
                        radius="md"
                        variant="light"
                        color="purple.5"
                        style={{
                          background: `linear-gradient(135deg, ${service.color}, rgba(30,30,30,0.5))`,
                          border: '1px solid rgba(153,105,229,0.2)',
                          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                        }}
                      >
                        {service.icon}
                      </ThemeIcon>
                      <Box>
                        <Text fw={700} size="xl" c="white">{service.title}</Text>
                        <Text size="sm" c="gray.5">{service.description}</Text>
                      </Box>
                    </Flex>

                    {/* Preço e mensagem de orçamento */}
                    <Box mb="xl">
                      <Box
                        mb="md"
                        style={{
                          background: 'linear-gradient(135deg, rgba(153,105,229,0.15), rgba(118,65,192,0.05))',
                          border: '1px solid rgba(153,105,229,0.2)',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          textAlign: 'center',
                          boxShadow: '0 5px 15px rgba(153,105,229,0.1)',
                        }}
                      >
                        <Text size="sm" c="gray.4" mb={4} fw={500}>
                          A partir de
                        </Text>
                        <Text fw={800} size="2rem" mb={0} style={{
                          background: 'linear-gradient(135deg, #9969E5, #7641C0)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          lineHeight: 1.2,
                        }}>
                          {service.title === 'Landing Page' && '800 CHF'}
                          {service.title === 'Site Institucional' && '1500 CHF'}
                          {service.title === 'E-commerce' && '3000 CHF'}
                        </Text>
                      </Box>
                      <Text size="sm" c="gray.4" lh={1.6}>
                        Preço personalizado de acordo com as necessidades específicas do seu projeto.
                      </Text>
                    </Box>

                    {/* Features */}
                    <Box mb="xl">
                      <Text fw={600} size="sm" c="white" mb="sm">Inclui:</Text>
                      <List
                        spacing="sm"
                        size="sm"
                        center
                        styles={{
                          itemWrapper: {
                            display: 'flex',
                            alignItems: 'flex-start',
                          }
                        }}
                      >
                        {service.features.map((feature, featureIndex) => (
                          <List.Item
                            key={featureIndex}
                            icon={
                              <ThemeIcon
                                color={feature.highlight ? 'purple.5' : 'gray.7'}
                                size={22}
                                radius="xl"
                                style={{
                                  background: feature.highlight
                                    ? 'linear-gradient(135deg, rgba(118,65,192,0.2), rgba(153,105,229,0.1))'
                                    : 'rgba(60, 60, 60, 0.3)',
                                  border: feature.highlight
                                    ? '1px solid rgba(153,105,229,0.3)'
                                    : 'none',
                                }}
                              >
                                <IconCheck size={14} stroke={2.5} color={feature.highlight ? '#9969E5' : '#909296'} />
                              </ThemeIcon>
                            }
                          >
                            <Text
                              c={feature.highlight ? 'white' : 'gray.5'}
                              fw={feature.highlight ? 600 : 400}
                              style={{
                                textShadow: feature.highlight ? '0 0 10px rgba(153,105,229,0.3)' : 'none',
                              }}
                            >
                              {feature.title}
                            </Text>
                          </List.Item>
                        ))}
                      </List>
                    </Box>

                    {/* CTA Button */}
                    <MotionButton
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        fontSize: '1rem',
                        fontWeight: 500,
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        background: service.popular
                          ? 'linear-gradient(135deg, rgba(118,65,192,0.9), rgba(153,105,229,0.9))'
                          : 'transparent',
                        color: service.popular ? 'white' : '#9969E5',
                        border: service.popular
                          ? 'none'
                          : '1px solid rgba(153,105,229,0.5)',
                        boxShadow: service.popular
                          ? '0 5px 15px rgba(118,65,192,0.3)'
                          : 'none',
                      }}
                      initial={{ scale: 1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="button-hover"
                    >
                      {service.cta}
                      <IconArrowRight size={18} />
                    </MotionButton>
                  </Box>
                </MotionBox>
              </MotionCard>
            ))}
          </SimpleGrid>
        </MotionBox>

        {/* Tech stack section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            marginTop: '80px',
            textAlign: 'center',
          }}
        >
          <Text fw={600} size="lg" c="white" mb="md">
            Todos os projetos são desenvolvidos com tecnologias modernas
          </Text>

          <Flex
            justify="center"
            align="center"
            gap="xl"
            wrap="wrap"
            style={{
              background: 'linear-gradient(135deg, rgba(20,20,20,0.5), rgba(30,30,30,0.5))',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.05)',
              padding: '20px',
            }}
          >
            <Flex direction="column" align="center" gap="xs">
              <ThemeIcon
                size={50}
                radius="md"
                variant="light"
                color="blue.5"
                style={{
                  background: 'linear-gradient(135deg, rgba(49, 120, 198, 0.2), rgba(30,30,30,0.5))',
                  border: '1px solid rgba(49, 120, 198, 0.2)',
                }}
              >
                <IconBrandTypescript size={24} />
              </ThemeIcon>
              <Text size="sm" c="gray.5">TypeScript</Text>
            </Flex>

            <Flex direction="column" align="center" gap="xs">
              <ThemeIcon
                size={50}
                radius="md"
                variant="light"
                color="blue.5"
                style={{
                  background: 'linear-gradient(135deg, rgba(97, 218, 251, 0.2), rgba(30,30,30,0.5))',
                  border: '1px solid rgba(97, 218, 251, 0.2)',
                }}
              >
                <IconBrandReact size={24} />
              </ThemeIcon>
              <Text size="sm" c="gray.5">React</Text>
            </Flex>

            <Flex direction="column" align="center" gap="xs">
              <ThemeIcon
                size={50}
                radius="md"
                variant="light"
                color="gray.9"
                style={{
                  background: 'linear-gradient(135deg, rgba(80, 80, 80, 0.2), rgba(30,30,30,0.5))',
                  border: '1px solid rgba(80, 80, 80, 0.2)',
                }}
              >
                <IconBrandNextjs size={24} />
              </ThemeIcon>
              <Text size="sm" c="gray.5">Next.js</Text>
            </Flex>
          </Flex>
        </MotionBox>

        {/* Disclaimer e Informações Adicionais */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            marginTop: '60px',
            background: 'linear-gradient(135deg, rgba(30,30,30,0.6), rgba(20,20,20,0.6))',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.05)',
            padding: '20px',
          }}
        >
          <Flex direction="column" gap="md">
            {/* Disclaimer */}
            <Box>
              <Text fw={600} size="sm" c="white" mb="xs">
                <IconBolt size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                Importante
              </Text>
              <Text size="sm" c="gray.4" lh={1.6}>
                Os valores não incluem custos de domínio, hospedagem, banco de dados e assinaturas de serviços de terceiros (como Shopify).
                Estes custos serão de responsabilidade do cliente. Nosso serviço é focado em criar o site com a melhor qualidade e infraestrutura possível.
              </Text>
            </Box>

            {/* Serviço de Manutenção */}
            <Box>
              <Text fw={600} size="sm" c="white" mb="xs">
                <IconHeadset size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                Serviço de Manutenção
              </Text>
              <Text size="sm" c="gray.4" lh={1.6}>
                Oferecemos serviços de manutenção mensal a partir de 200 CHF, incluindo atualizações de segurança, backup, monitoramento e pequenas alterações.
                Pergunte-nos sobre nossos planos de manutenção para manter seu site sempre atualizado e seguro.
              </Text>
            </Box>
          </Flex>
        </MotionBox>

        {/* Call to action */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{
            marginTop: '40px',
            textAlign: 'center',
          }}
        >
          <Text c="gray.5" size="sm">
            Tem um projeto em mente? <Text component="span" c="purple.4" fw={600} style={{ cursor: 'pointer' }}>Entre em contato</Text> para uma consulta gratuita.
          </Text>
        </MotionBox>
      </Container>
    </Box>
  );
}
