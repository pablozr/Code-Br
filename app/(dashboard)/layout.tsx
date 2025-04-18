'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { Footer } from '@/components/layout/Footer';
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
import { IconLogin } from '@tabler/icons-react';

function UserMenu() {
  return (
    <Group gap="md">
      <SignedOut>
        <Button
          component={Link}
          href="/sign-in"
          radius="md"
          leftSection={<IconLogin size={16} />}
          style={{
            background: 'rgba(30, 30, 30, 0.4)',
            border: '1px solid rgba(153, 105, 229, 0.3)',
            color: 'white',
            fontWeight: 500,
            transition: 'all 0.2s ease',
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
              background: 'rgba(40, 40, 40, 0.6)',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
            }
          }}
        >
          <Text>Entrar</Text>
        </Button>

        <Button
          component={Link}
          href="/sign-up"
          radius="md"
          style={{
            background: 'linear-gradient(135deg, rgba(153, 105, 229, 0.1), rgba(153, 105, 229, 0.2))',
            border: '1px solid rgba(153, 105, 229, 0.3)',
            color: 'white',
            fontWeight: 500,
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.2s ease',
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
              background: 'linear-gradient(135deg, rgba(153, 105, 229, 0.15), rgba(153, 105, 229, 0.25))',
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
            }
          }}
        >
          {/* Efeito de brilho */}
          <Box
            style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
              transform: 'rotate(45deg)',
              animation: 'shine 3s infinite',
              zIndex: 0,
            }}
          />
          <Text style={{ position: 'relative', zIndex: 1 }}>Cadastrar</Text>
        </Button>
      </SignedOut>

      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              avatarBox: {
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                border: '1px solid rgba(153, 105, 229, 0.3)',
                background: 'linear-gradient(135deg, #7641C0, #9969E5)',
                boxShadow: '0 0 10px rgba(118,65,192,0.3)',
              },
              userButtonPopoverCard: {
                background: 'rgba(20, 20, 20, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
              },
              userButtonPopoverActionButton: {
                '&:hover': {
                  background: 'rgba(153, 105, 229, 0.1)',
                },
              },
              userButtonPopoverActionButtonText: {
                color: 'white',
              },
              userButtonPopoverActionButtonIcon: {
                color: '#9969E5',
              },
              userButtonPopoverFooter: {
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              },
            },
          }}
        />
      </SignedIn>
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
