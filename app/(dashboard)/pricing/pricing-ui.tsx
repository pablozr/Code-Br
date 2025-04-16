'use client';

import { checkoutAction } from '@/lib/payments/actions';
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  Group,
  List,
  ThemeIcon,
  Button,
  Stack,
  Box,
  Tooltip,
  rem,
  useMantineTheme
} from '@mantine/core';
import { IconCheck, IconArrowRight, IconInfoCircle } from '@tabler/icons-react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

// Wrapper components with Framer Motion
const MotionCard = motion<any>(Card);
const MotionStack = motion(Stack);
const MotionContainer = motion(Container);

interface PricingItem {
  name: string;
  price: number;
  interval: string;
  features: string[];
  priceId?: string;
  isCustom?: boolean;
}

interface PricingUIProps {
  pricingData: PricingItem[];
}

export function PricingUI({ pricingData }: PricingUIProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const theme = useMantineTheme();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const titleRef = useRef<HTMLDivElement>(null);

  // Spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: {
      scale: 1.02,
      y: -5,
      boxShadow: '0 8px 30px rgba(118,65,192,0.2)',
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <Box 
      px={0}
      mx={0}
      pt={150}
      style={{ 
        minHeight: '100vh',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        background: 'radial-gradient(circle at 50% 50%, rgba(25,18,35,1) 0%, rgba(13,13,13,1) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated Wave Background */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {/* Primeira onda de partículas - Mais densa */}
          <Box
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                radial-gradient(2.5px 2.5px at 40px 60px, rgba(147,112,219,0.3) 50%, transparent),
                radial-gradient(2.5px 2.5px at 100px 120px, rgba(138,43,226,0.25) 50%, transparent),
                radial-gradient(2.5px 2.5px at 200px 150px, rgba(147,112,219,0.3) 50%, transparent),
                radial-gradient(2.5px 2.5px at 300px 200px, rgba(138,43,226,0.25) 50%, transparent),
                radial-gradient(2.5px 2.5px at 400px 250px, rgba(147,112,219,0.3) 50%, transparent),
                radial-gradient(2.5px 2.5px at 500px 300px, rgba(138,43,226,0.25) 50%, transparent)
              `,
              backgroundSize: '600px 600px',
              animation: 'moveWave 25s linear infinite',
              opacity: 0.8,
              zIndex: 0,
            }}
          />

          {/* Segunda onda de partículas - Movimento mais rápido */}
          <Box
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                radial-gradient(2px 2px at 20px 50px, rgba(147,112,219,0.25) 50%, transparent),
                radial-gradient(2px 2px at 150px 80px, rgba(138,43,226,0.3) 50%, transparent),
                radial-gradient(2px 2px at 250px 180px, rgba(147,112,219,0.25) 50%, transparent),
                radial-gradient(2px 2px at 330px 220px, rgba(138,43,226,0.3) 50%, transparent),
                radial-gradient(2px 2px at 410px 260px, rgba(147,112,219,0.25) 50%, transparent),
                radial-gradient(2px 2px at 480px 300px, rgba(138,43,226,0.3) 50%, transparent)
              `,
              backgroundSize: '500px 500px',
              animation: 'moveWave 20s linear infinite',
              opacity: 0.7,
              zIndex: 0,
            }}
          />

          {/* Terceira onda de partículas - Mais próxima */}
          <Box
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                radial-gradient(3px 3px at 50px 70px, rgba(147,112,219,0.35) 50%, transparent),
                radial-gradient(3px 3px at 160px 90px, rgba(138,43,226,0.4) 50%, transparent),
                radial-gradient(3px 3px at 260px 190px, rgba(147,112,219,0.35) 50%, transparent),
                radial-gradient(3px 3px at 340px 230px, rgba(138,43,226,0.4) 50%, transparent)
              `,
              backgroundSize: '400px 400px',
              animation: 'moveWave 15s linear infinite',
              opacity: 0.6,
              zIndex: 0,
            }}
          />

          {/* Efeito de brilho central intensificado */}
          <Box
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '180%',
              height: '180%',
              background: 'radial-gradient(circle at center, rgba(147,112,219,0.15) 0%, transparent 70%)',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />

          {/* Ondas fluidas mais intensas */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.6,
            }}
            animate={{
              background: [
                'linear-gradient(45deg, transparent 60%, rgba(147,112,219,0.2) 70%, transparent 80%)',
                'linear-gradient(45deg, transparent 50%, rgba(138,43,226,0.2) 60%, transparent 70%)',
                'linear-gradient(45deg, transparent 60%, rgba(147,112,219,0.2) 70%, transparent 80%)',
              ],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Keyframes atualizados */}
      <style jsx global>{`
        @keyframes moveWave {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 600px 600px;
          }
        }
      `}</style>

      <MotionContainer
        size="xl"
        style={{ position: 'relative', zIndex: 1 }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <MotionStack
          gap={40} // Reduzido de 60
          align="center"
          mb={60} // Reduzido de 80
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            ref={titleRef}
            style={{ 
              position: 'relative',
              isolation: 'isolate',
            }} // Removido padding: '2rem'
          >
            
            <Title 
              order={1} 
              ta="center"
              size="3.2rem"
              fw={800}
              mb="md" // Reduzido de xl
              style={{ 
                background: 'linear-gradient(135deg, #fff 0%, rgba(118,65,192,0.8) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 30px rgba(118,65,192,0.3)',
                letterSpacing: '0.5px',
                fontFamily: 'Manrope, sans-serif',
                position: 'relative',
              }}
            >
              Nossos Serviços
              {/* Decorative underline */}
              <Box
                style={{
                  position: 'absolute',
                  bottom: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80px',
                  height: '4px',
                  background: 'linear-gradient(90deg, rgba(118,65,192,0.8) 0%, rgba(142,98,204,0.4) 100%)',
                  borderRadius: '2px',
                }}
              />
            </Title>
            
            <Text 
              size="lg"
              c="gray.1"
              maw={700} 
              ta="center"
              style={{
                fontSize: '1.125rem',
                lineHeight: 1.7,
                letterSpacing: '0.2px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                color: '#f0f0f5',
                marginTop: '1rem', // Reduzido de 1.5rem
              }}
            >
              Escolha o serviço que melhor atenda às necessidades do seu negócio.{' '}
              <span style={{ 
                color: '#fff',
                fontWeight: 500 
              }}>
                Todos os planos incluem hospedagem segura na Suíça
              </span>.
            </Text>
          </div>
        </MotionStack>

        {/* Visual separator */}
        <Box
          mb={60}
          style={{
            width: '100%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(118,65,192,0.3) 50%, transparent 100%)',
          }}
        />

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
          {pricingData.map((item, index) => (
            <MotionCard
              key={index}
              variants={cardVariants}
              whileHover="hover"
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              style={{
                boxShadow: theme.shadows.md,
                borderRadius: theme.radius.md,
                borderColor: hoveredCard === index ? 'rgba(118,65,192,0.3)' : 'rgba(118,65,192,0.2)',
                background: 'linear-gradient(145deg, rgba(26,26,26,0.8) 0%, rgba(13,13,13,0.8) 100%)',
                backdropFilter: 'blur(10px)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                padding: '1.5rem'
              }}
              withBorder
            >
              <Stack gap="md" style={{ flex: 1 }}>
                <div>
                  <Title 
                    order={3} 
                    fw={600} 
                    size="h4" 
                    mb="xs" 
                    c="white"
                    style={{
                      letterSpacing: '-0.5px',
                    }}
                  >
                    {item.name}
                  </Title>
                  
                  {item.isCustom ? (
                    <Text 
                      size="xl" 
                      fw={600} 
                      style={{ 
                        background: 'linear-gradient(90deg, rgba(118,65,192,1) 0%, rgba(142,98,204,1) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-0.5px',
                      }}
                    >
                      Consulte-nos
                    </Text>
                  ) : (
                    <Group gap={5} align="baseline">
                      <Text 
                        size="1.8rem" 
                        fw={700} 
                        c="white"
                        style={{
                          letterSpacing: '-1px',
                        }}
                      >
                        R${(item.price / 100).toLocaleString('pt-BR')}
                      </Text>
                      <Text size="sm" c="gray.4">{item.interval}</Text>
                    </Group>
                  )}
                </div>

                <List 
                  spacing="sm" 
                  size="sm" 
                  center 
                  style={{ flex: 1 }}
                >
                  {item.features.map((feature, idx) => (
                    <List.Item
                      key={idx}
                      icon={
                        <ThemeIcon 
                          color="purple" 
                          size={22} 
                          radius="xl"
                          style={{
                            background: 'linear-gradient(45deg, rgba(118,65,192,1) 0%, rgba(142,98,204,1) 100%)',
                          }}
                        >
                          <IconCheck style={{ width: rem(14), height: rem(14) }} />
                        </ThemeIcon>
                      }
                      c="gray.3"
                    >
                      <Text size="sm" style={{ fontFamily: theme.fontFamilyMonospace }}>
                        {feature}
                      </Text>
                    </List.Item>
                  ))}
                </List>

                <form action={checkoutAction}>
                  <input type="hidden" name="priceId" value={item.priceId} />
                  <Button
                    type="submit"
                    fullWidth
                    radius="xl"
                    size="lg"
                    variant={item.isCustom ? "gradient" : "filled"}
                    gradient={
                      item.isCustom 
                        ? { from: 'rgba(118,65,192,0.9)', to: 'rgba(142,98,204,0.9)', deg: 45 }
                        : undefined
                    }
                    color={item.isCustom ? undefined : "dark"}
                    rightSection={
                      <IconArrowRight 
                        size={20}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    }
                    className={`
                      group
                      font-semibold
                      tracking-wide
                      text-[16px]
                      px-8
                      h-[52px]
                      whitespace-nowrap
                      overflow-visible
                      transition-all
                      duration-300
                      ${item.isCustom 
                        ? `
                          bg-gradient-to-r from-purple-700/90 to-purple-500/90
                          hover:from-purple-600/90 hover:to-purple-400/90
                          shadow-[0_8px_16px_-8px_rgba(118,65,192,0.5)]
                          hover:shadow-[0_12px_20px_-8px_rgba(118,65,192,0.6)]
                          border-purple-500/20
                          hover:border-purple-400/30
                        `
                        : `
                          bg-gradient-to-r from-gray-800/90 to-gray-700/90
                          hover:from-gray-700/90 hover:to-gray-600/90
                          shadow-[0_8px_16px_-8px_rgba(0,0,0,0.3)]
                          hover:shadow-[0_12px_20px_-8px_rgba(0,0,0,0.4)]
                          border-gray-600/20
                          hover:border-gray-500/30
                        `
                      }
                    `}
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      minWidth: 'fit-content',
                      width: '100%',
                      maxWidth: '240px'
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 w-full">
                      {item.isCustom ? 'Solicitar orçamento' : 'Adquirir agora'}
                    </span>
                  </Button>
                </form>
              </Stack>
            </MotionCard>
          ))}
        </SimpleGrid>
      </MotionContainer>
    </Box>
  );
}

function PricingCard({
  name,
  price,
  interval,
  features,
  priceId,
  isCustom,
}: {
  name: string;
  price: number;
  interval: string;
  features: string[];
  priceId?: string;
  isCustom?: boolean;
}) {
  const theme = useMantineTheme();
  
  return (
    <Card 
      shadow="md" 
      radius="md" 
      padding="xl" 
      withBorder
      style={{
        borderColor: theme.colors.dark[6],
        background: 'linear-gradient(145deg, rgba(26,26,26,0.8) 0%, rgba(13,13,13,0.8) 100%)',
        backdropFilter: 'blur(10px)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack gap="md" style={{ flex: 1 }}>
        <div>
          <Title order={3} fw={600} size="h3" mb="xs" c="white">{name}</Title>
          
          {isCustom ? (
            <Text 
              size="xl" 
              fw={600} 
              style={{ 
                background: 'linear-gradient(90deg, rgba(118,65,192,1) 0%, rgba(142,98,204,1) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Consulte-nos
            </Text>
          ) : (
            <Group gap={5} align="baseline">
              <Text size="2rem" fw={700} c="white">R${(price / 100).toLocaleString('pt-BR')}</Text>
              <Text size="md" c="gray.4">{interval}</Text>
            </Group>
          )}
        </div>
        
        <List 
          spacing="sm" 
          size="md" 
          center 
          style={{ flex: 1 }}
        >
          {features.map((feature, index) => (
            <List.Item
              key={index}
              icon={
                <ThemeIcon 
                  color="purple" 
                  size={22} 
                  radius="xl"
                >
                  <IconCheck style={{ width: rem(14), height: rem(14) }} />
                </ThemeIcon>
              }
              c="gray.3"
            >
              {feature}
            </List.Item>
          ))}
        </List>
        
        <form action={checkoutAction}>
          <input type="hidden" name="priceId" value={priceId} />
          <Button
            type="submit"
            fullWidth
            radius="md"
            size="md"
            variant={isCustom ? "gradient" : "outline"}
            gradient={isCustom ? { from: 'purple.7', to: 'purple.5', deg: 45 } : undefined}
            color={isCustom ? undefined : "gray.0"}
            rightSection={<IconArrowRight size={18} />}
          >
            {isCustom ? 'Solicitar orçamento' : 'Contratar serviço'}
          </Button>
        </form>
      </Stack>
    </Card>
  );
}
