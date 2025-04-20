'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { Footer } from '@/app/_components/layout/Footer';
import {
  AppShell,
  Container,
  Flex,
  Box,
  Group,
  Title,
  Text,
  Button
} from '@mantine/core';


function UserMenu() {
  return (
    <Group gap="md">
      <Button
        component={Link}
        href="/orcamento"
        variant="gradient"
        gradient={{ from: 'rgba(118,65,192,0.9)', to: 'rgba(153,105,229,0.9)', deg: 135 }}
        radius="md"
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
        <Text style={{ position: 'relative', zIndex: 1 }}>Solicitar Orçamento</Text>
      </Button>
    </Group>
  );
}

function Header() {

  return (
    <Box
      component="header"
      style={{
        borderBottom: `1px solid rgba(255,255,255,0.03)`,
        background: 'rgba(10,10,10,0.8)',
        backdropFilter: 'blur(12px)',
        position: 'relative',
        zIndex: 100,
      }}
    >
      {/* Linha de destaque superior */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(153, 105, 229, 0.2), transparent)',
          zIndex: 1,
        }}
      />

      <Container size="xl" py="sm">
        <Group justify="space-between" align="center">
          <Group>
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
              }}
              component={Link}
              href="/"
            >
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(20, 20, 20, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                  padding: '8px 10px',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1), inset 0 0 20px rgba(153, 105, 229, 0.05)',
                }}
              >
                <Text
                  fw={700}
                  size="lg"
                  style={{
                    color: 'white',
                    fontFamily: 'monospace',
                    letterSpacing: '-0.5px',
                    textShadow: '0 0 10px rgba(153, 105, 229, 0.3)',
                  }}
                >
                  &lt;/&gt;
                </Text>

                {/* Efeito de brilho */}
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

                {/* Efeito de borda brilhante */}
                <Box
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '10px',
                    padding: '1px',
                    background: 'linear-gradient(135deg, rgba(153, 105, 229, 0.1), transparent, rgba(153, 105, 229, 0.1))',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    zIndex: 0,
                  }}
                />
              </Box>

              <Title
                order={3}
                fw={700}
                style={{
                  letterSpacing: '-0.5px',
                  background: 'linear-gradient(90deg, #fff, #9969E5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: '1.5rem',
                }}
              >
                CodeBR
              </Title>
            </Box>
          </Group>

          <Group gap="md">
            {/* Links de navegação */}
            <Group gap="xl" ml={30}>
              <Text
                component={Link}
                href="/pricing"
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: '#9969E5',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                Preços
              </Text>

              <Text
                component={Link}
                href="/about"
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: '#9969E5',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                Sobre nós
              </Text>
            </Group>

            <Suspense fallback={<Box h={36} />}>
              <UserMenu />
            </Suspense>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      header={{ height: 70 }}
      padding="md"
      styles={{
        main: {
          background: 'linear-gradient(135deg, rgba(10,10,10,1) 0%, rgba(15,15,15,1) 100%)',
        },
      }}
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main pt={90}>

          <Flex direction="column" gap="xl">
            <Box>
              {children}
            </Box>
          </Flex>

      </AppShell.Main>

      <Footer />
    </AppShell>
  );
}
