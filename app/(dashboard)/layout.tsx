'use client';

import { use, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/lib/auth';
import { signOut } from '@/app/(login)/actions';
import {
  AppShell,
  Container,
  Flex,
  Box,
  Group,
  Title,
  ThemeIcon,
  Text,
  Button,
  Avatar,
  Menu,
  rem,
  Divider,
  useMantineTheme
} from '@mantine/core';
import { IconGlobe, IconHome, IconLogout } from '@tabler/icons-react';

function UserMenu() {
  const { userPromise } = useUser();
  const user = use(userPromise);
  const router = useRouter();
  const theme = useMantineTheme();

  async function handleSignOut() {
    await signOut();
    router.refresh();
    router.push('/');
  }

  if (!user) {
    return (
      <Group gap="md">
        <Button
          component={Link}
          href="/pricing"
          variant="subtle"
          color="gray.3"
        >
          Preços
        </Button>
        <Button
          component={Link}
          href="/sign-up"
          variant="gradient"
          gradient={{ from: 'purple.7', to: 'purple.5', deg: 45 }}
        >
          Cadastrar
        </Button>
      </Group>
    );
  }

  return (
    <Menu position="bottom-end" shadow="md">
      <Menu.Target>
        <Avatar
          src={null}
          color="purple"
          radius="xl"
          style={{ cursor: 'pointer' }}
        >
          {user.email
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </Avatar>
      </Menu.Target>
      <Menu.Dropdown bg="dark.8">
        <Menu.Item
          leftSection={<IconHome style={{ width: rem(14), height: rem(14) }} />}
          component={Link}
          href="/dashboard"
        >
          Painel
        </Menu.Item>
        <Divider />
        <form action={handleSignOut}>
          <Menu.Item
            leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
            type="submit"
            color="red"
          >
            Sair
          </Menu.Item>
        </form>
      </Menu.Dropdown>
    </Menu>
  );
}

function Header() {
  const theme = useMantineTheme();

  return (
    <Box
      component="header"
      style={{
        borderBottom: `1px solid ${theme.colors.dark[6]}`,
        background: 'linear-gradient(180deg, rgba(13,13,13,0.95) 0%, rgba(26,26,26,0.95) 100%)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Container size="xl" py="md">
        <Group justify="space-between" align="center">
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

          <Suspense fallback={<Box h={36} />}>
            <UserMenu />
          </Suspense>
        </Group>
      </Container>
    </Box>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      header={{ height: 70 }}
      padding={0} // Remover padding
      styles={{
        main: {
          background: 'linear-gradient(135deg, rgba(13,13,13,1) 0%, rgba(26,26,26,1) 100%)',
          padding: 0, // Remover padding
        },
      }}
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
