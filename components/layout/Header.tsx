'use client';

import { useState } from 'react';
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
  useMantineTheme
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconGlobe, IconChevronDown } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';

const mainLinks = [
  { label: 'Início', href: '/' },
  { label: 'Serviços', href: '/pricing' },
  { label: 'Sobre', href: '/about' },
  { label: 'Contato', href: '/contact' },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const [servicesOpened, setServicesOpened] = useState(false);
  const pathname = usePathname();
  const theme = useMantineTheme();

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <AppShell.Header 
        withBorder={false} 
        bg="rgba(13, 13, 13, 0.9)" 
        style={{ 
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${theme.colors.dark[6]}`
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
                      transition: 'color 0.2s ease',
                      position: 'relative',
                      '&:hover': { color: theme.colors.purple[4] },
                      '&::after': isActive(link.href) ? {
                        content: '""',
                        position: 'absolute',
                        bottom: -8,
                        left: 0,
                        width: '100%',
                        height: 2,
                        backgroundColor: theme.colors.purple[5],
                        borderRadius: theme.radius.xl
                      } : {}
                    }}
                  >
                    {link.label}
                  </Text>
                </Link>
              ))}
            </Group>

            <Group gap="md" visibleFrom="md">
              <Button 
                component={Link} 
                href="/sign-up" 
                variant="outline" 
                color="gray.0" 
                radius="xl"
              >
                Cadastrar
              </Button>
              <Button 
                component={Link} 
                href="/login" 
                variant="gradient" 
                gradient={{ from: 'purple.7', to: 'purple.5', deg: 45 }}
                radius="xl"
              >
                Entrar
              </Button>
            </Group>

            {/* Mobile burger */}
            <Burger opened={opened} onClick={toggle} hiddenFrom="md" />
          </Group>
        </Container>
      </AppShell.Header>

      {/* Mobile drawer */}
      <Drawer
        opened={opened}
        onClose={toggle}
        size="100%"
        padding="md"
        title={
          <Group>
            <ThemeIcon 
              size="lg" 
              radius="xl" 
              variant="gradient" 
              gradient={{ from: 'purple.7', to: 'purple.5', deg: 45 }}
            >
              <IconGlobe size={rem(20)} />
            </ThemeIcon>
            <Title order={3} fw={600} c="white">Websites Suíços</Title>
          </Group>
        }
        styles={{
          body: {
            background: 'linear-gradient(180deg, rgba(13,13,13,1) 0%, rgba(26,26,26,1) 100%)'
          },
          header: {
            background: 'linear-gradient(180deg, rgba(13,13,13,1) 0%, rgba(26,26,26,1) 100%)'
          }
        }}
      >
        <Divider my="sm" />
        <Stack spacing="md">
          {mainLinks.map((link) => (
            <Button
              key={link.href}
              component={Link}
              href={link.href}
              variant={isActive(link.href) ? "light" : "subtle"}
              color={isActive(link.href) ? "purple" : "gray"}
              fullWidth
              leftSection={isActive(link.href) && <Box w={4} h={4} bg="purple" style={{ borderRadius: '50%' }} />}
              onClick={toggle}
            >
              {link.label}
            </Button>
          ))}
          <Divider my="sm" />
          <Button 
            component={Link} 
            href="/login" 
            variant="gradient" 
            gradient={{ from: 'purple.7', to: 'purple.5', deg: 45 }}
            fullWidth
            onClick={toggle}
          >
            Entrar
          </Button>
          <Button 
            component={Link} 
            href="/sign-up" 
            variant="outline" 
            color="gray.0" 
            fullWidth
            onClick={toggle}
          >
            Cadastrar
          </Button>
        </Stack>
      </Drawer>
    </>
  );
}
