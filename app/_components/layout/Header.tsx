'use client';

import { useState } from 'react';
import {
  Burger,
  Group,
  Button,
  Container,
  Drawer,
  Stack,
  Text,
  Box,
  Divider
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { usePathname } from 'next/navigation';
import Link from 'next/link';




// Os links serão gerados dinamicamente com base nas traduções


export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
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
  const locale = pathname.split('/')[1] || 'pt-BR';

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

  // Detectar rolagem para mudar o estilo do header
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  // Verificar se o caminho atual corresponde ao link (ignorando o parâmetro de idioma)
  const isActive = (path: string) => {
    // Remover o idioma do pathname atual para comparação
    const currentPath = pathname.replace(new RegExp(`^\/${locale}`), '');
    // Remover o idioma do path do link para comparação
    const linkPath = path.replace(new RegExp(`^\/${locale}`), '');

    return currentPath === linkPath || pathname === path;
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '70px', // Aumentando a altura
          zIndex: 100,
          background: "rgba(10, 10, 10, 0.95)",
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid rgba(255, 255, 255, 0.08)`,
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container size="xl" style={{ width: '100%', height: '100%', padding: '0 16px', display: 'flex', alignItems: 'center' }}>
          <Group style={{ width: '100%', height: '100%' }} justify="space-between" align="center">
            <Group style={{ flexShrink: 0 }}>
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                }}
                component={Link}
                href={getPathWithLocale('/')}
              >
                <Box
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'linear-gradient(90deg, #7641C0, #9969E5)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      filter: 'brightness(1.2)',
                    }
                  }}
                >
                  <Text
                    fw={700}
                    size="xl" // Aumentando ainda mais o tamanho
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '1.5rem',
                      background: 'linear-gradient(90deg, #7641C0, #9969E5)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    &lt;/&gt;
                  </Text>

                  <Text
                    fw={700}
                    size="xl" // Aumentando ainda mais o tamanho
                    style={{
                      letterSpacing: '-0.5px',
                      marginLeft: '10px', // Aumentando ainda mais o espaçamento
                      fontSize: '1.5rem',
                      background: 'linear-gradient(90deg, #6030A0, #9461FF, #B490FF)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    CodeBR
                  </Text>


                </Box>
              </Box>
            </Group>

            {/* Desktop navigation */}
            <Group gap="md" visibleFrom="md" style={{ flexGrow: 1, justifyContent: 'center' }}>
              {mainLinks.map((link) => (
                <Box key={link.href} style={{ position: 'relative' }}>
                  <Link href={link.href} style={{ textDecoration: 'none' }}>
                    <Text
                      c={isActive(link.href) ? 'white' : 'gray.3'}
                      fw={500}
                      size="sm"
                      styles={{
                        root: {
                          textDecoration: 'none',
                          transition: 'all 0.2s ease',
                          position: 'relative',
                          padding: '4px 0',
                          whiteSpace: 'nowrap',
                          fontSize: '15px',
                          '&:hover': {
                            color: 'white',
                          },
                        }
                      }}
                    >
                      {link.label}
                    </Text>
                  </Link>

                  {/* Linha inferior simples */}
                  <Box
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      width: isActive(link.href) ? '100%' : '0',
                      height: '2px',
                      background: 'white',
                      transition: 'all 0.2s ease',
                      opacity: isActive(link.href) ? 1 : 0,
                    }}
                  />
                </Box>
              ))}
            </Group>

            <Group gap="md" visibleFrom="md" style={{ flexShrink: 0 }}>
              <LanguageSwitcher />

              <Button
                component={Link}
                href={getPathWithLocale('/orcamento')}
                variant="gradient"
                gradient={{ from: '#6030A0', to: '#B490FF', deg: 45 }}
                radius="md"
                size="sm"
                style={{
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(118, 65, 192, 0.3)',
                  border: '1px solid rgba(153, 105, 229, 0.3)',
                  position: 'relative',
                  overflow: 'hidden',
                  padding: '0 16px',
                  height: '38px',
                  fontWeight: 600,
                  fontSize: '14px',
                  whiteSpace: 'nowrap',
                }}
              >
                {t.quote}
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
      </header>

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
                gap: '10px',
              }}
            >
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'linear-gradient(90deg, #7641C0, #9969E5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  position: 'relative',
                }}
              >
                <Text
                  fw={700}
                  size="xl"
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '2rem',
                    background: 'linear-gradient(90deg, #7641C0, #9969E5)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 15px rgba(118,65,192,0.5)',
                  }}
                >
                  &lt;/&gt;
                </Text>

                <Text
                  fw={700}
                  size="xl"
                  style={{
                    letterSpacing: '-0.5px',
                    marginLeft: '12px',
                    fontSize: '2rem',
                    background: 'linear-gradient(90deg, #7641C0, #9969E5)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 15px rgba(118,65,192,0.3)',
                  }}
                >
                  CodeBR
                </Text>
              </Box>
            </Box>
          </Group>
        }
        styles={{
          body: {
            background: '#0A0A0A',
          },
          header: {
            background: '#0A0A0A',
          },
          close: {
            color: 'white',
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
              variant="subtle"
              color="gray"
              fullWidth
              size="lg"
              onClick={close}
              style={{
                color: isActive(link.href) ? 'white' : undefined,
                borderLeft: isActive(link.href) ? '2px solid white' : 'none',
                borderRadius: 0,
              }}
            >
              {link.label}
            </Button>
          ))}
          <Divider my="xl" color="dark.7" />
          <Button
            component={Link}
            href={getPathWithLocale('/orcamento')}
            variant="outline"
            color="gray"
            fullWidth
            size="lg"
            radius="sm"
            onClick={close}
            style={{
              transition: 'all 0.2s ease',
              borderColor: 'rgba(255,255,255,0.2)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderColor: 'rgba(255,255,255,0.3)',
              },
            }}
          >
            {t.quote}
          </Button>

          <Box mt="md">
            <Text fw={500} size="sm" mb="xs" c="gray.5">
              Idioma:
            </Text>
            <LanguageSwitcher />
          </Box>
        </Stack>
      </Drawer>
    </>
  );
}
