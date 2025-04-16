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
  IconGlobe,
  IconChevronDown,
  IconChevronUp,
  IconBrandGithub
} from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const mainLinks = [
  { label: 'Início', href: '/' },
  { label: 'Serviços', href: '/pricing' },
  { label: 'Sobre', href: '/about' },
  { label: 'Contato', href: '/contact' },
];

const MotionBox = motion(Box);

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
              <ThemeIcon
                size="lg"
                radius="xl"
                variant="gradient"
                gradient={{ from: 'purple.7', to: 'purple.5', deg: 45 }}
                style={{
                  boxShadow: '0 0 20px rgba(118,65,192,0.3)',
                }}
              >
                <IconGlobe size={rem(20)} />
              </ThemeIcon>
              <Title order={3} fw={600} c="white">Websites Suíços</Title>
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
                      '&:hover': { color: '#9969E5' },
                    }}
                  >
                    <Box
                      style={{
                        position: 'relative',
                        paddingBottom: '4px',
                      }}
                    >
                      {link.label}
                      {isActive(link.href) && (
                        <Box
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            height: '2px',
                            background: 'linear-gradient(90deg, #7641C0, #9969E5)',
                            borderRadius: '2px',
                          }}
                        />
                      )}
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
              >
                <IconBrandGithub size={rem(18)} />
              </ActionIcon>

              <Button
                component={Link}
                href="/sign-up"
                variant="outline"
                color="gray.0"
                radius="xl"
                style={{
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                Cadastrar
              </Button>
              <Button
                component={Link}
                href="/login"
                variant="gradient"
                gradient={{ from: 'purple.7', to: 'purple.5', deg: 45 }}
                radius="xl"
                style={{
                  boxShadow: '0 4px 15px -3px rgba(118,65,192,0.3)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px -4px rgba(118,65,192,0.4)',
                  }
                }}
              >
                Entrar
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
            <ThemeIcon
              size="lg"
              radius="xl"
              variant="gradient"
              gradient={{ from: 'purple.7', to: 'purple.5', deg: 45 }}
              style={{
                boxShadow: '0 0 20px rgba(118,65,192,0.3)',
              }}
            >
              <IconGlobe size={rem(20)} />
            </ThemeIcon>
            <Title order={3} fw={600} c="white">Websites Suíços</Title>
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
        <Stack spacing="lg">
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
            }}
          >
            Entrar
          </Button>
          <Button
            component={Link}
            href="/sign-up"
            variant="outline"
            color="gray.0"
            fullWidth
            size="lg"
            onClick={close}
            style={{
              borderColor: 'rgba(255, 255, 255, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
            }}
          >
            Cadastrar
          </Button>
        </Stack>
      </Drawer>
    </>
  );
}
