'use client';

import { useUser } from '@clerk/nextjs';
import { Container, Title, Text, Button, Group, Box, Paper, Stack } from '@mantine/core';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <Container size="md" py="xl">
        <Text>Carregando...</Text>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Paper
        p="xl"
        radius="lg"
        style={{
          backgroundColor: 'rgba(15, 15, 15, 0.8)',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(153, 105, 229, 0.2)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Efeito de borda brilhante */}
        <Box
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '0.5rem',
            padding: '1px',
            background: 'linear-gradient(135deg, rgba(153, 105, 229, 0.3), transparent, rgba(153, 105, 229, 0.3))',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            opacity: 0.5,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        {/* Efeito de brilho no topo */}
        <Box
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '150px',
            background: 'radial-gradient(ellipse at 50% 0%, rgba(153, 105, 229, 0.15), transparent 70%)',
            opacity: 0.8,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
        <Stack spacing="lg">
          <Title order={2} style={{
            color: 'white',
            fontSize: '2rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #fff, #9969E5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1rem',
            position: 'relative',
            zIndex: 1,
          }}>
            Bem-vindo ao Dashboard, {user?.firstName || user?.emailAddresses[0]?.emailAddress.split('@')[0]}!
          </Title>

          <Text
            c="gray.3"
            style={{
              fontSize: '1.1rem',
              lineHeight: 1.6,
              position: 'relative',
              zIndex: 1,
            }}
          >
            Você está logado com sucesso usando o Clerk. Este é o seu dashboard onde você pode gerenciar seus projetos e configurações.
          </Text>

          <Box
            mt="xl"
            p="lg"
            style={{
              backgroundColor: 'rgba(25, 25, 25, 0.5)',
              borderRadius: '12px',
              border: '1px solid rgba(153, 105, 229, 0.15)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Title
              order={4}
              style={{
                color: 'white',
                marginBottom: '1rem',
                fontSize: '1.25rem',
                background: 'linear-gradient(135deg, #fff, #9969E5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Suas informações:
            </Title>

            <Stack spacing="md">
              <Text style={{ fontSize: '1.05rem' }}>
                <strong style={{ color: '#9969E5' }}>Email:</strong>{' '}
                <span style={{ color: 'white' }}>{user?.primaryEmailAddress?.emailAddress}</span>
              </Text>

              {user?.firstName && (
                <Text style={{ fontSize: '1.05rem' }}>
                  <strong style={{ color: '#9969E5' }}>Nome:</strong>{' '}
                  <span style={{ color: 'white' }}>{user?.firstName} {user?.lastName}</span>
                </Text>
              )}

              <Text style={{ fontSize: '1.05rem' }}>
                <strong style={{ color: '#9969E5' }}>ID:</strong>{' '}
                <span style={{ color: 'white', opacity: 0.8, fontSize: '0.95rem' }}>{user?.id}</span>
              </Text>
            </Stack>
          </Box>

          <Group mt="xl" position="apart">
            <Button
              component={Link}
              href="/"
              variant="outline"
              color="gray.0"
              size="md"
              style={{
                borderColor: 'rgba(153, 105, 229, 0.3)',
                backgroundColor: 'rgba(153, 105, 229, 0.05)',
                color: 'white',
                fontWeight: 500,
                padding: '10px 20px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                zIndex: 1,
                '&:hover': {
                  backgroundColor: 'rgba(153, 105, 229, 0.1)',
                  borderColor: 'rgba(153, 105, 229, 0.5)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(153, 105, 229, 0.2)',
                },
              }}
            >
              <Box
                style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'linear-gradient(45deg, transparent, rgba(153, 105, 229, 0.1), transparent)',
                  transform: 'rotate(45deg)',
                  animation: 'shine 3s infinite',
                  zIndex: 0,
                }}
              />
              <Text style={{ position: 'relative', zIndex: 1 }}>Voltar para a página inicial</Text>
            </Button>

            <Button
              variant="gradient"
              gradient={{ from: 'rgba(118,65,192,0.9)', to: 'rgba(153,105,229,0.9)', deg: 135 }}
              size="md"
              style={{
                boxShadow: '0 4px 15px -3px rgba(118,65,192,0.3)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 20px -4px rgba(118,65,192,0.4)',
                }
              }}
            >
              <Box
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
                  animation: 'shine 3s infinite',
                  zIndex: 0,
                }}
              />
              <Text style={{ position: 'relative', zIndex: 1 }}>Gerenciar Projetos</Text>
            </Button>
          </Group>
        </Stack>
      </Paper>
    </Container>
  );
}