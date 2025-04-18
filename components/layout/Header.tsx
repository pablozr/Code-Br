'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  AppShell,
  Burger,
  Group,
  Button,
  Title,
  Container,
  Drawer,
  Stack,
  Text,
  ThemeIcon,
  rem,
  Box,
  Divider,
  useMantineTheme,
  Transition,
  ActionIcon
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconChevronDown,
  IconChevronUp,
  IconBrandGithub,
  IconCode
} from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const mainLinks = [
  { label: 'Início', href: '/' },
  { label: 'Serviços', href: '/pricing' },
  { label: 'Sobre', href: '/about' },
  { label: 'Contato', href: '/contact' },
];


export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [servicesOpened, setServicesOpened] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const theme = useMantineTheme();
  const { scrollY } = useScroll();

  // Detectar rolagem para mudar o estilo do header
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <AppShell.Header
        withBorder={false}
        bg={scrolled ? "rgba(10, 10, 10, 0.95)" : "transparent"}
        style={{
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: scrolled ? `1px solid rgba(255, 255, 255, 0.05)` : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <Container size="xl" h="100%">
          <Group h="100%" justify="space-between">
            <Group>
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
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
                    background: 'linear-gradient(135deg, #7641C0, #9969E5)',
                    borderRadius: '12px',
                    padding: '8px',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 0 20px rgba(118,65,192,0.3)',
                  }}
                >
                  <Text
                    fw={700}
                    size="lg"
                    style={{
                      color: 'white',
                      fontFamily: 'monospace',
                      letterSpacing: '-0.5px',
                    }}
                  >
                    &lt; /&gt;
                  </Text>

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
                    }}
                  />
                </Box>

                <Title
                  order={3}
                  fw={700}
                  c="white"
                  style={{
                    letterSpacing: '-0.5px',
                    background: 'linear-gradient(90deg, #fff, #9969E5)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  CodeBR
                </Title>
              </Box>
            </Group>

            {/* Desktop navigation */}
            <Group gap="xl" visibleFrom="md">
              {mainLinks.map((link) => (
                <Link key={link.href} href={link.href} passHref>
                  <Text
                    component="a"
                    c={isActive(link.href) ? 'purple.4' : 'gray.3'}
                    fw={500}
                    style={{
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: isActive(link.href) ? 'rgba(118, 65, 192, 0.1)' : 'transparent',
                      '&:hover': {
                        color: '#9969E5',
                        background: 'rgba(118, 65, 192, 0.05)',
                        transform: 'translateY(-2px)'
                      },
                    }}
                  >
                    <Box
                      style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      {/* Indicador de ativo */}
                      {isActive(link.href) && (
                        <Box
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: 'linear-gradient(90deg, #7641C0, #9969E5)',
                            boxShadow: '0 0 10px rgba(118, 65, 192, 0.5)',
                          }}
                        />
                      )}

                      {link.label}

                      {/* Linha inferior animada no hover */}
                      <Box
                        style={{
                          position: 'absolute',
                          bottom: '-4px',
                          left: isActive(link.href) ? '0' : '50%',
                          width: isActive(link.href) ? '100%' : '0',
                          height: '2px',
                          background: 'linear-gradient(90deg, #7641C0, #9969E5)',
                          borderRadius: '2px',
                          transition: 'all 0.3s ease',
                          opacity: isActive(link.href) ? 1 : 0,
                          transform: isActive(link.href) ? 'none' : 'translateX(-50%)',
                          '&:hover': {
                            width: '100%',
                            left: '0',
                            opacity: 1,
                            transform: 'none',
                          },
                        }}
                      />
                    </Box>
                  </Text>
                </Link>
              ))}
            </Group>

            <Group gap="md" visibleFrom="md">
              <ActionIcon
                variant="subtle"
                color="gray"
                radius="xl"
                component="a"
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  border: '1px solid rgba(118, 65, 192, 0.2)',
                  backgroundColor: 'rgba(118, 65, 192, 0.05)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(118, 65, 192, 0.1)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 10px -2px rgba(118, 65, 192, 0.2)',
                  }
                }}
              >
                <IconBrandGithub size={rem(18)} color="#9969E5" />
              </ActionIcon>

              <Button
                component={Link}
                href="/sign-up"
                variant="outline"
                color="gray.0"
                radius="xl"
                leftSection={<IconCode size={rem(16)} />}
                style={{
                  borderColor: 'rgba(118, 65, 192, 0.3)',
                  backgroundColor: 'rgba(118, 65, 192, 0.05)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    borderColor: 'rgba(118, 65, 192, 0.5)',
                    backgroundColor: 'rgba(118, 65, 192, 0.1)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px -2px rgba(118, 65, 192, 0.3)',
                  }
                }}
              >
                <Box
                  style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'linear-gradient(45deg, transparent, rgba(118, 65, 192, 0.1), transparent)',
                    transform: 'rotate(45deg)',
                    animation: 'shine 4s infinite',
                    zIndex: 0,
                  }}
                />
                <Text style={{ position: 'relative', zIndex: 1 }}>Cadastrar</Text>
              </Button>

              <Button
                component={Link}
                href="/login"
                variant="gradient"
                gradient={{ from: 'purple.7', to: 'purple.5', deg: 45 }}
                radius="xl"
                style={{
                  boxShadow: '0 4px 15px -3px rgba(118,65,192,0.3)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-2px) scale(1.03)',
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
                <Text style={{ position: 'relative', zIndex: 1 }}>Entrar</Text>
              </Button>
            </Group>

            {/* Mobile burger */}
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="md"
              color="white"
              size="sm"
            />
          </Group>
        </Container>
      </AppShell.Header>

      {/* Mobile drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        position="right"
        title={
          <Group>
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #7641C0, #9969E5)',
                  borderRadius: '12px',
                  padding: '8px',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 0 20px rgba(118,65,192,0.3)',
                }}
              >
                <Text
                  fw={700}
                  size="lg"
                  style={{
                    color: 'white',
                    fontFamily: 'monospace',
                    letterSpacing: '-0.5px',
                  }}
                >
                  &lt; /&gt;
                </Text>

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
                  }}
                />
              </Box>

              <Title
                order={3}
                fw={700}
                c="white"
                style={{
                  letterSpacing: '-0.5px',
                  background: 'linear-gradient(90deg, #fff, #9969E5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                CodeBR
              </Title>
            </Box>
          </Group>
        }
        styles={{
          body: {
            background: 'linear-gradient(180deg, rgba(10,10,10,0.98) 0%, rgba(15,15,15,0.98) 100%)',
            backdropFilter: 'blur(10px)',
          },
          header: {
            background: 'linear-gradient(180deg, rgba(10,10,10,0.98) 0%, rgba(15,15,15,0.98) 100%)',
            backdropFilter: 'blur(10px)',
          },
          close: {
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            }
          }
        }}
      >
        <Divider my="xl" color="dark.7" />
        <Stack gap="lg">
          {mainLinks.map((link) => (
            <Button
              key={link.href}
              component={Link}
              href={link.href}
              variant={isActive(link.href) ? "light" : "subtle"}
              color={isActive(link.href) ? "purple" : "gray"}
              fullWidth
              size="lg"
              leftSection={isActive(link.href) && (
                <Box
                  w={4}
                  h={4}
                  style={{
                    borderRadius: '50%',
                    background: 'linear-gradient(90deg, #7641C0, #9969E5)',
                  }}
                />
              )}
              onClick={close}
            >
              {link.label}
            </Button>
          ))}
          <Divider my="xl" color="dark.7" />
          <Button
            component={Link}
            href="/login"
            variant="gradient"
            gradient={{ from: 'purple.7', to: 'purple.5', deg: 45 }}
            fullWidth
            size="lg"
            onClick={close}
            style={{
              boxShadow: '0 4px 15px -3px rgba(118,65,192,0.3)',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
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
            <Text style={{ position: 'relative', zIndex: 1 }}>Entrar</Text>
          </Button>
          <Button
            component={Link}
            href="/sign-up"
            variant="outline"
            color="gray.0"
            fullWidth
            size="lg"
            onClick={close}
            leftSection={<IconCode size={rem(16)} />}
            style={{
              borderColor: 'rgba(118, 65, 192, 0.3)',
              backgroundColor: 'rgba(118, 65, 192, 0.05)',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: 'rgba(118, 65, 192, 0.5)',
                backgroundColor: 'rgba(118, 65, 192, 0.1)',
                transform: 'translateY(-2px)',
              }
            }}
          >
            <Box
              style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'linear-gradient(45deg, transparent, rgba(118, 65, 192, 0.1), transparent)',
                transform: 'rotate(45deg)',
                animation: 'shine 4s infinite',
                zIndex: 0,
              }}
            />
            <Text style={{ position: 'relative', zIndex: 1 }}>Cadastrar</Text>
          </Button>
        </Stack>
      </Drawer>
    </>
  );
}
