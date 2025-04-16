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
  Badge,
  rem,
  useMantineTheme
} from '@mantine/core';
import { IconCheck, IconArrowRight } from '@tabler/icons-react';

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
  const theme = useMantineTheme();
  
  return (
    <Box 
      py={80} 
      style={{
        background: 'linear-gradient(135deg, rgba(13,13,13,1) 0%, rgba(26,26,26,1) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Efeito de gradiente no fundo */}
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
      
      <Container size="xl">
        <Stack spacing={50} align="center" mb={50}>
          <div>
            <Badge 
              variant="gradient" 
              gradient={{ from: 'purple.7', to: 'purple.5' }}
              size="lg"
              mb="md"
            >
              Escolha o Plano Ideal
            </Badge>
            <Title 
              order={1} 
              ta="center"
              size="2.5rem" 
              fw={700} 
              mb="md"
              style={{ 
                background: 'linear-gradient(90deg, #fff 0%, #a9a9a9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Nossos Serviços
            </Title>
            <Text size="lg" c="gray.3" maw={700} ta="center">
              Escolha o serviço que melhor atende às necessidades do seu negócio. 
              Todos incluem hospedagem segura na Suíça.
            </Text>
          </div>
        </Stack>
        
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xl">
          {pricingData.map((item, index) => (
            <PricingCard 
              key={index}
              name={item.name}
              price={item.price}
              interval={item.interval}
              features={item.features}
              priceId={item.priceId}
              isCustom={item.isCustom}
            />
          ))}
        </SimpleGrid>
      </Container>
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
      <Stack spacing="md" style={{ flex: 1 }}>
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
              Orçamento Personalizado
            </Text>
          ) : (
            <Group spacing={5} align="baseline">
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
            radius="xl"
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
