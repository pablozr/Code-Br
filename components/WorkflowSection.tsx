'use client';

import {
  Box,
  Title,
  Text,
  Container,
  Timeline,
  ThemeIcon,
  rem,
  Flex,
  Card,
  Group,
  Badge,
} from '@mantine/core';
import { motion } from 'framer-motion';
import {
  IconBulb,
  IconCode,
  IconDeviceDesktop,
  IconRocket,
  IconHeartHandshake,
  IconChartLine,
} from '@tabler/icons-react';

// Componentes com motion
const MotionBox = motion.div;

// Componentes personalizados com motion
function MotionTitle(props: any) {
  const { initial, animate, transition, whileInView, viewport, ...rest } = props;
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      whileInView={whileInView}
      viewport={viewport}
    >
      <Title {...rest} />
    </motion.div>
  );
}

function MotionText(props: any) {
  const { initial, animate, transition, whileInView, viewport, ...rest } = props;
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      whileInView={whileInView}
      viewport={viewport}
    >
      <Text {...rest} />
    </motion.div>
  );
}

function MotionCard(props: any) {
  const { initial, animate, transition, whileInView, viewport, whileHover, ...rest } = props;
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      whileInView={whileInView}
      viewport={viewport}
      whileHover={whileHover}
    >
      <Card {...rest} />
    </motion.div>
  );
}

function MotionTimeline(props: any) {
  const { initial, animate, transition, whileInView, viewport, ...rest } = props;
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      whileInView={whileInView}
      viewport={viewport}
    >
      <Timeline {...rest} />
    </motion.div>
  );
}

function MotionBadge(props: any) {
  const { initial, animate, transition, whileInView, viewport, whileHover, ...rest } = props;
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      whileInView={whileInView}
      viewport={viewport}
      whileHover={whileHover}
      style={props.style}
    >
      <Badge {...rest} />
    </motion.div>
  );
}

function MotionGroup(props: any) {
  const { initial, animate, transition, whileInView, viewport, ...rest } = props;
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      whileInView={whileInView}
      viewport={viewport}
    >
      <Group {...rest} />
    </motion.div>
  );
}

// Efeito de circuito para o fundo
function CircuitBackground() {
  return (
    <Box
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: 0,
        opacity: 0.07,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 1000"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        {/* Linhas horizontais */}
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={i * 100}
            x2="1000"
            y2={i * 100}
            stroke="rgba(153, 105, 229, 0.3)"
            strokeWidth="1"
          />
        ))}

        {/* Linhas verticais */}
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 100}
            y1="0"
            x2={i * 100}
            y2="1000"
            stroke="rgba(153, 105, 229, 0.3)"
            strokeWidth="1"
          />
        ))}

        {/* Pontos de conexão */}
        {Array.from({ length: 10 }).map((_, i) => (
          Array.from({ length: 10 }).map((_, j) => (
            <circle
              key={`c-${i}-${j}`}
              cx={i * 100}
              cy={j * 100}
              r="3"
              fill="rgba(153, 105, 229, 0.5)"
            />
          ))
        ))}

        {/* Linhas diagonais */}
        <path d="M0,0 L1000,1000" stroke="rgba(153, 105, 229, 0.2)" strokeWidth="1" />
        <path d="M1000,0 L0,1000" stroke="rgba(153, 105, 229, 0.2)" strokeWidth="1" />
      </svg>

      {/* Partículas flutuantes */}
      {Array.from({ length: 15 }).map((_, index) => (
        <MotionBox
          key={index}
          style={{
            position: 'absolute',
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            borderRadius: '50%',
            background: 'rgba(153, 105, 229, 0.8)',
            boxShadow: '0 0 10px rgba(153, 105, 229, 0.5)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * -100 - 50],
            x: [0, (Math.random() - 0.5) * 30],
            opacity: [0.8, 0],
          }}
          transition={{
            duration: Math.random() * 15 + 15,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeInOut',
          }}
        />
      ))}
    </Box>
  );
}

// Componente para o ícone animado com efeito de brilho
function AnimatedIcon({ icon, delay = 0 }: { icon: React.ReactNode, delay?: number }) {
  return (
    <MotionBox
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Efeito de brilho pulsante */}
      <MotionBox
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(153,105,229,0.3) 0%, rgba(153,105,229,0) 70%)',
          filter: 'blur(2px)',
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay,
        }}
      />

      {/* Ícone com animação sutil */}
      <MotionBox
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 3, 0, -3, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay + 0.5,
        }}
      >
        {icon}
      </MotionBox>
    </MotionBox>
  );
}

// Dados do processo de trabalho
const workflowSteps = [
  {
    title: 'Descoberta e Planejamento',
    description: 'Entendemos suas necessidades, objetivos e público-alvo para criar um plano estratégico personalizado.',
    icon: <IconBulb size={rem(20)} stroke={1.5} />,
    details: [
      'Análise de requisitos',
      'Definição de objetivos',
      'Pesquisa de mercado',
      'Planejamento estratégico'
    ],
    color: 'rgba(153, 105, 229, 1)',
    badge: 'Fase 1'
  },
  {
    title: 'Design e Prototipagem',
    description: 'Criamos wireframes e protótipos interativos para visualizar a estrutura e o fluxo do seu projeto.',
    icon: <IconDeviceDesktop size={rem(20)} stroke={1.5} />,
    details: [
      'Wireframes e mockups',
      'Design de interface',
      'Experiência do usuário',
      'Protótipos interativos'
    ],
    color: 'rgba(153, 105, 229, 0.9)',
    badge: 'Fase 2'
  },
  {
    title: 'Desenvolvimento',
    description: 'Transformamos os designs em código, utilizando as tecnologias mais modernas e eficientes do mercado.',
    icon: <IconCode size={rem(20)} stroke={1.5} />,
    details: [
      'Codificação front-end',
      'Desenvolvimento back-end',
      'Integração de APIs',
      'Testes de qualidade'
    ],
    color: 'rgba(153, 105, 229, 0.8)',
    badge: 'Fase 3'
  },
  {
    title: 'Lançamento',
    description: 'Realizamos testes rigorosos e preparamos tudo para o lançamento do seu projeto com segurança.',
    icon: <IconRocket size={rem(20)} stroke={1.5} />,
    details: [
      'Testes finais',
      'Otimização de performance',
      'Configuração de servidores',
      'Lançamento controlado'
    ],
    color: 'rgba(153, 105, 229, 0.7)',
    badge: 'Fase 4'
  },
  {
    title: 'Suporte Contínuo',
    description: 'Oferecemos suporte técnico, manutenção e atualizações para garantir o sucesso contínuo do seu projeto.',
    icon: <IconHeartHandshake size={rem(20)} stroke={1.5} />,
    details: [
      'Suporte técnico',
      'Manutenção preventiva',
      'Atualizações de segurança',
      'Melhorias contínuas'
    ],
    color: 'rgba(153, 105, 229, 0.6)',
    badge: 'Fase 5'
  },
  {
    title: 'Crescimento e Evolução',
    description: 'Analisamos métricas e feedback para implementar melhorias e novas funcionalidades que impulsionam seu negócio.',
    icon: <IconChartLine size={rem(20)} stroke={1.5} />,
    details: [
      'Análise de métricas',
      'Otimização de conversão',
      'Novas funcionalidades',
      'Escalabilidade'
    ],
    color: 'rgba(153, 105, 229, 0.5)',
    badge: 'Fase 6'
  }
];

export function WorkflowSection() {
  return (
    <Box
      py={100}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, rgba(20,20,20,1) 0%, rgba(25,25,25,1) 100%)',
        borderTop: '1px solid rgba(153,105,229,0.1)',
        borderBottom: '1px solid rgba(153,105,229,0.1)',
      }}
    >
      {/* Background effect */}
      <CircuitBackground />

      {/* Efeito de gradiente sutil */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 50% 50%, rgba(153,105,229,0.03) 0%, rgba(20,20,20,0) 70%)',
          zIndex: 0,
        }}
      />

      <Container size="lg" style={{ position: 'relative', zIndex: 1 }}>
        <MotionBox
          mb={80}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <Flex direction="column" align="center" ta="center">
            <MotionBadge
              color="purple.5"
              variant="light"
              size="lg"
              radius="sm"
              mb="md"
              style={{
                background: 'linear-gradient(135deg, rgba(118,65,192,0.15), rgba(153,105,229,0.1))',
                border: '1px solid rgba(153,105,229,0.2)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: 600,
                padding: '8px 16px',
              }}
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Metodologia
            </MotionBadge>

            <MotionTitle
              order={2}
              size="3rem"
              fw={800}
              mb="md"
              c="white"
              style={{
                letterSpacing: '-0.5px',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Nosso <Text span style={{
                background: 'linear-gradient(135deg, #9969E5, #7641C0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }} inherit>Processo</Text> de Trabalho
            </MotionTitle>

            <MotionText
              size="xl"
              c="gray.3"
              maw={700}
              lh={1.7}
              ta="center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Desenvolvemos seu projeto com metodologia ágil e transparente, garantindo qualidade
              em cada etapa do processo. Conheça nosso fluxo de trabalho:
            </MotionText>

            {/* Linha decorativa */}
            <MotionBox
              mt="xl"
              style={{
                width: '80px',
                height: '4px',
                background: 'linear-gradient(90deg, rgba(118,65,192,0.8), rgba(153,105,229,0.8))',
                borderRadius: '2px',
              }}
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: 80 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
            />
          </Flex>
        </MotionBox>

        <MotionTimeline
          active={-1}
          bulletSize={48}
          lineWidth={3}
          color="purple.5"
          styles={{
            item: {
              paddingBottom: '40px',
            },
            itemBody: {
              marginLeft: '20px',
            },
            line: {
              borderLeft: '3px solid rgba(153,105,229,0.3)',
              borderImage: 'linear-gradient(to bottom, rgba(153,105,229,0.7), rgba(118,65,192,0.3)) 1 100%',
            }
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {workflowSteps.map((step, index) => (
            <Timeline.Item
              key={index}
              bullet={
                <ThemeIcon
                  size={48}
                  radius="xl"
                  color="purple.5"
                  style={{
                    background: `linear-gradient(135deg, ${step.color}, rgba(118,65,192,0.7))`,
                    border: '2px solid rgba(153,105,229,0.3)',
                    boxShadow: '0 0 20px rgba(153,105,229,0.2)',
                    zIndex: 10,
                  }}
                >
                  <AnimatedIcon icon={step.icon} delay={index * 0.5} />
                </ThemeIcon>
              }
              title={
                <Group gap="xs" mb="xs">
                  <MotionText
                    fw={700}
                    size="xl"
                    c="white"
                    style={{
                      letterSpacing: '-0.3px',
                    }}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    {step.title}
                  </MotionText>
                  <MotionBadge
                    color="purple.5"
                    variant="light"
                    size="sm"
                    radius="sm"
                    style={{
                      background: 'rgba(153,105,229,0.15)',
                      border: '1px solid rgba(153,105,229,0.2)',
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
                    viewport={{ once: true, margin: "-100px" }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {step.badge}
                  </MotionBadge>
                </Group>
              }
            >
              <MotionCard
                p="xl"
                radius="lg"
                style={{
                  background: 'linear-gradient(145deg, rgba(30,30,30,0.6), rgba(20,20,20,0.6))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(153,105,229,0.1)',
                  marginBottom: '20px',
                  marginTop: '15px',
                  maxWidth: '650px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  overflow: 'hidden',
                  position: 'relative',
                }}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20, y: 10 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{
                  boxShadow: '0 15px 40px rgba(0,0,0,0.2)',
                  border: '1px solid rgba(153,105,229,0.3)',
                  y: -5,
                }}
              >
                {/* Efeito de gradiente sutil no card */}
                <Box
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(135deg, ${step.color}10 0%, transparent 70%)`,
                    zIndex: 0,
                  }}
                />

                {/* Linha decorativa no topo do card */}
                <Box
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '3px',
                    background: `linear-gradient(90deg, ${step.color}, transparent)`,
                    zIndex: 1,
                  }}
                />

                <Box style={{ position: 'relative', zIndex: 1 }}>
                  <MotionText
                    c="gray.2"
                    size="lg"
                    mb="lg"
                    lh={1.6}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    {step.description}
                  </MotionText>

                  <Box
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '15px',
                      marginTop: '20px',
                    }}
                  >
                    {step.details.map((detail, detailIndex) => (
                      <MotionGroup
                        key={detailIndex}
                        gap="xs"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) + (detailIndex * 0.05) }}
                        viewport={{ once: true, margin: "-100px" }}
                      >
                        <Box
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: step.color,
                            boxShadow: `0 0 10px ${step.color}80`,
                            marginTop: '6px',
                          }}
                        />
                        <Text size="md" c="gray.4" fw={500}>{detail}</Text>
                      </MotionGroup>
                    ))}
                  </Box>
                </Box>
              </MotionCard>
            </Timeline.Item>
          ))}
        </MotionTimeline>
      </Container>
    </Box>
  );
}
