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
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

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
        background: 'linear-gradient(135deg, rgba(13,13,13,0.97) 0%, rgba(26,26,26,0.97) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Effects */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Box
            style={{
              position: 'absolute',
              top: '-30%',
              right: '-10%',
              width: '60%',
              height: '180%',
              background: 'radial-gradient(circle, rgba(118,65,192,0.1) 0%, rgba(118,65,192,0) 70%)',
              transform: 'rotate(15deg)',
              zIndex: 0,
            }}
          />
          <Box
            style={{
              position: 'absolute',
              bottom: '-20%',
              left: '-10%',
              width: '50%',
              height: '150%',
              background: 'radial-gradient(circle, rgba(118,65,192,0.08) 0%, rgba(118,65,192,0) 70%)',
              transform: 'rotate(-15deg)',
              zIndex: 0,
            }}
          />
        </motion.div>
      </AnimatePresence>

      <MotionContainer
        size="xl"
        style={{ position: 'relative', zIndex: 1 }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <MotionStack
          gap={40}
          align="center"
          mb={40}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <Title 
              order={1} 
              ta="center"
              size="2.2rem" 
              fw={700} 
              mb="sm"
              style={{ 
                background: 'linear-gradient(90deg, #fff 0%, #a9a9a9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 30px rgba(255,255,255,0.1)',
                letterSpacing: '-1px',
              }}
            >
              Nossos Serviços
            </Title>
            <Text 
              size="lg" 
              c="gray.3" 
              maw={600} 
              ta="center"
              style={{
                lineHeight: 1.6,
                letterSpacing: '0.3px',
                fontWeight: 400,
              }}
            >
              Escolha o serviço que melhor atenda às necessidades do seu negócio.
              Todos os planos incluem hospedagem segura na Suíça.
            </Text>
          </div>
        </MotionStack>

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
              }}
              style={{ borderRadius: theme.radius.md }}
              padding="xl"
              withBorder
              style={{
                borderColor: hoveredCard === index ? 'rgba(118,65,192,0.3)' : 'rgba(118,65,192,0.2)',
                background: 'linear-gradient(145deg, rgba(26,26,26,0.8) 0%, rgba(13,13,13,0.8) 100%)',
                backdropFilter: 'blur(10px)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
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
