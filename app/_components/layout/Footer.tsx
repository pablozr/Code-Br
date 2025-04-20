'use client';

import {
  Box,
  Container,
  Group,
  Text,
  Title,
  Stack,
  SimpleGrid,
  ThemeIcon,
  Divider,
  ActionIcon,
  rem
} from '@mantine/core';
import {
  IconBrandGithub,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconGlobe,
  IconArrowUp,
  IconCode
} from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const footerLinks = [
  {
    title: 'Serviços',
    links: [
      { label: 'Landing Pages', href: '/pricing#landing-pages' },
      { label: 'E-commerce', href: '/pricing#ecommerce' },
      { label: 'Projetos Personalizados', href: '/pricing#custom' },
      { label: 'Hospedagem Suíça', href: '/pricing#hosting' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Sobre Nós', href: '/about' },
      { label: 'Contato', href: '/contact' },
      { label: 'Blog', href: '/blog' },
      { label: 'Carreiras', href: '/careers' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Termos de Serviço', href: '/terms' },
      { label: 'Política de Privacidade', href: '/privacy' },
      { label: 'Cookies', href: '/cookies' },
    ],
  },
];

export function Footer() {
  const pathname = usePathname();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Detectar quando o usuário rolou para baixo o suficiente para mostrar o botão de voltar ao topo
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Função para rolar para o topo da página
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Não mostrar o footer em páginas de dashboard
  if (pathname?.includes('/dashboard')) {
    return null;
  }

  return (
    <Box
      component="footer"
      style={{
        background: 'linear-gradient(to top, rgba(10,10,10,1), rgba(20,20,20,1))',
        borderTop: '1px solid rgba(153,105,229,0.1)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid effect */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.05,
          backgroundImage: `
            linear-gradient(rgba(153,105,229,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(153,105,229,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
          zIndex: 0,
        }}
      />

      {/* Background gradient */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(118,65,192,0.08) 0%, rgba(118,65,192,0) 70%)',
          zIndex: 0,
        }}
      />
      {/* Scroll to top button */}
      {showScrollTop && (
        <ActionIcon
          variant="gradient"
          gradient={{ from: 'rgba(118,65,192,0.8)', to: 'rgba(153,105,229,0.8)', deg: 45 }}
          size="xl"
          radius="xl"
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 10,
            boxShadow: '0 5px 15px rgba(0,0,0,0.3), 0 0 10px rgba(153,105,229,0.3)',
            transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          sx={{
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.3), 0 0 15px rgba(153,105,229,0.4)',
            }
          }}
          onClick={scrollToTop}
        >
          <IconArrowUp size={rem(20)} stroke={1.5} />
        </ActionIcon>
      )}

      <Container size="xl" py={80} style={{ position: 'relative', zIndex: 1 }}>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={50}>
          {/* Brand column */}
          <Stack spacing="md">
            <Group>
              <ThemeIcon
                size="xl"
                radius="md"
                variant="gradient"
                gradient={{ from: 'rgba(118,65,192,0.9)', to: 'rgba(153,105,229,0.9)', deg: 135 }}
                style={{ boxShadow: '0 5px 15px rgba(0,0,0,0.2), 0 0 10px rgba(153,105,229,0.2)' }}
              >
                <IconCode size={rem(22)} />
              </ThemeIcon>
              <Box>
                <Title order={3} fw={700} c="white" style={{ letterSpacing: '-0.5px' }}>CodeBR</Title>
                <Text size="xs" c="gray.5">Websites Suíços</Text>
              </Box>
            </Group>

            <Text size="sm" c="gray.5" mt="xs" lh={1.7}>
              Criamos websites profissionais com a precisão suíça. Hospedagem segura e performance excepcional para o seu negócio.
            </Text>

            <Group gap="md" mt="md">
              <ActionIcon
                variant="subtle"
                color="gray"
                radius="xl"
                size="lg"
                sx={{
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(153,105,229,0.15)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                <IconBrandTwitter size={rem(18)} />
              </ActionIcon>
              <ActionIcon
                variant="subtle"
                color="gray"
                radius="xl"
                size="lg"
                sx={{
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(153,105,229,0.15)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                <IconBrandInstagram size={rem(18)} />
              </ActionIcon>
              <ActionIcon
                variant="subtle"
                color="gray"
                radius="xl"
                size="lg"
                sx={{
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(153,105,229,0.15)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                <IconBrandLinkedin size={rem(18)} />
              </ActionIcon>
              <ActionIcon
                variant="subtle"
                color="gray"
                radius="xl"
                size="lg"
                sx={{
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(153,105,229,0.15)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                <IconBrandGithub size={rem(18)} />
              </ActionIcon>
            </Group>
          </Stack>

          {/* Links columns */}
          {footerLinks.map((group) => (
            <Stack key={group.title} spacing="xs">
              <Text
                fw={700}
                c="white"
                mb="sm"
                style={{ fontSize: '1.1rem', letterSpacing: '-0.3px' }}
              >
                {group.title}
              </Text>

              {group.links.map((link) => (
                <Link key={link.href} href={link.href} passHref>
                  <Text
                    component="a"
                    c="gray.5"
                    size="sm"
                    style={{
                      textDecoration: 'none',
                      display: 'block',
                      padding: '6px 0',
                    }}
                    sx={{
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        color: '#9969E5',
                        transform: 'translateX(3px)',
                      },
                    }}
                  >
                    {link.label}
                  </Text>
                </Link>
              ))}
            </Stack>
          ))}
        </SimpleGrid>

        <Divider my={50} color="rgba(153,105,229,0.1)" />

        <Group justify="space-between" align="center">
          <Text size="sm" c="gray.6">
            © {new Date().getFullYear()} CodeBR. Todos os direitos reservados.
          </Text>

          <Text size="sm" c="gray.6">
            Feito com precisão na Suíça 🇨🇭
          </Text>
        </Group>
      </Container>
    </Box>
  );
}
