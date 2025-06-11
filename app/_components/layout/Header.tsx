'use client';

import { useState, useEffect } from 'react';
import {
  Burger,
  Group,
  Button,
  Container,
  Drawer,
  Stack,
  Text,
  Box,
  Divider,
  Paper,
  ThemeIcon,
  Anchor
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { LanguageSwitcher } from '../LanguageSwitcher';
import { useSafePathname, getLocaleFromPathname } from '@/app/_lib/utils/pathname';
import Link from 'next/link';
import { IconCode, IconArrowRight } from '@tabler/icons-react';

// Os links serão gerados dinamicamente com base nas traduções

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useSafePathname();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Textos do header
  const headerTexts = {
    'pt-BR': {
      home: 'Início',
      services: 'Serviços',
      about: 'Sobre',
      contact: 'Contato',
      quote: 'Solicitar Orçamento'
    },
    'en': {
      home: 'Home',
      services: 'Services',
      about: 'About',
      contact: 'Contact',
      quote: 'Request Quote'
    },
    'fr': {
      home: 'Accueil',
      services: 'Services',
      about: 'À Propos',
      contact: 'Contact',
      quote: 'Demander un Devis'
    }
  };
  const locale = getLocaleFromPathname(pathname);

  // Obter os textos para o idioma atual
  const t = headerTexts[locale as keyof typeof headerTexts] || headerTexts['pt-BR'];

  // Helper function to get the path with a locale
  function getPathWithLocale(path: string) {
    return `/${locale}${path}`;
  }

  // Gerar links com base nas traduções
  const mainLinks = [
    { label: t.home, href: getPathWithLocale('/') },
    { label: t.services, href: getPathWithLocale('/#services') },
    { label: t.about, href: getPathWithLocale('/#about') },
    { label: t.contact, href: getPathWithLocale('/contact') },
  ];

  // Detectar rolagem para mudar o estilo do header ja está no useEffect acima

  // Verificar se o caminho atual corresponde ao link (ignorando o parâmetro de idioma)
  const isActive = (path: string) => {
    // Remover o idioma do pathname atual para comparação
    const currentPath = pathname.replace(new RegExp(`^\/${locale}`), '');
    // Remover o idioma do path do link para comparação
    const linkPath = path.replace(new RegExp(`^\/${locale}`), '');

    return currentPath === linkPath || pathname === path;
  };

  const headerContent = (
    <>
      <Group gap="md" visibleFrom="sm">
        {mainLinks.map((item) => (
          <Anchor
            key={item.href}
            component={Link}
            href={item.href}
            size="sm"
            fw={isActive(item.href) ? 600 : 400}
            c={isActive(item.href) ? 'purple.5' : 'gray.6'}
            td="none"
            style={{
              transition: 'color 200ms ease',
              '&:hover': {
                color: 'var(--mantine-color-purple-5)',
              },
            }}
          >
            {item.label}
          </Anchor>
        ))}
      </Group>

      <Group gap="md">
        <LanguageSwitcher />
        
        <Button
          component={Link}
          href={getPathWithLocale('/orcamento')}
          variant="gradient"
          gradient={{ from: 'purple.7', to: 'purple.5', deg: 45 }}
          radius="xl"
          size="sm"
          rightSection={<IconArrowRight size={16} />}
          visibleFrom="sm"
        >
          {locale === 'en' ? 'Get Quote' : locale === 'fr' ? 'Devis' : 'Orçamento'}
        </Button>

        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
          color="white"
        />
      </Group>
    </>
  );

  return (
    <>
      <Paper
        component="header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: scrolled 
            ? 'rgba(10, 10, 10, 0.95)' 
            : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: scrolled 
            ? '1px solid rgba(255, 255, 255, 0.1)' 
            : 'none',
          transition: 'all 300ms ease',
        }}
        p="md"
      >
        <Container size="lg">
          <Group justify="space-between" align="center">
            <Group gap="xs">
              <ThemeIcon
                variant="gradient"
                gradient={{ from: 'purple.7', to: 'purple.5', deg: 45 }}
                size="lg"
                radius="md"
              >
                <IconCode size={20} />
              </ThemeIcon>
              <Box>
                <Text 
                  component={Link}
                  href={getPathWithLocale('/')}
                  fw={700} 
                  size="xl" 
                  c="white"
                  td="none"
                  style={{ cursor: 'pointer' }}
                >
                  CodeBR
                </Text>
              </Box>
            </Group>

            {headerContent}
          </Group>
        </Container>
      </Paper>

      <Drawer
        opened={opened}
        onClose={close}
        title="Menu"
        padding="md"
        size="sm"
        position="right"
        styles={{
          body: { padding: 0 },
          header: { 
            backgroundColor: 'var(--mantine-color-dark-8)',
            color: 'white'
          },
          content: { 
            backgroundColor: 'var(--mantine-color-dark-8)' 
          }
        }}
      >
        <Stack gap="lg" p="md">
          {mainLinks.map((item) => (
            <Anchor
              key={item.href}
              component={Link}
              href={item.href}
              size="lg"
              fw={isActive(item.href) ? 600 : 400}
              c={isActive(item.href) ? 'purple.5' : 'gray.4'}
              td="none"
              onClick={close}
            >
              {item.label}
            </Anchor>
          ))}
          
          <Button
            component={Link}
            href={getPathWithLocale('/orcamento')}
            variant="gradient"
            gradient={{ from: 'purple.7', to: 'purple.5', deg: 45 }}
            radius="xl"
            size="md"
            rightSection={<IconArrowRight size={16} />}
            fullWidth
            onClick={close}
          >
            {locale === 'en' ? 'Get Quote' : locale === 'fr' ? 'Devis' : 'Orçamento'}
          </Button>
        </Stack>
      </Drawer>
    </>
  );
}
