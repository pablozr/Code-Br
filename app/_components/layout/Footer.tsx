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

// Traduções para o Footer
const footerTexts = {
  'pt-BR': {
    companyDescription: 'Criamos websites profissionais com tecnologia de ponta. Design moderno e performance excepcional para o seu negócio.',
    companyLabel: 'Criação de Websites',
    services: 'Serviços',
    company: 'Empresa',
    legal: 'Legal',
    landingPages: 'Landing Pages',
    ecommerce: 'E-commerce',
    customProjects: 'Projetos Personalizados',
    requestQuote: 'Solicitar Orçamento',
    about: 'Sobre',
    contact: 'Contato',
    blog: 'Blog',
    careers: 'Carreiras',
    terms: 'Termos de Uso',
    privacy: 'Política de Privacidade',
    cookies: 'Cookies',
    copyright: '© 2025 CodeBR. Todos os direitos reservados.',
    techNote: 'Feito com tecnologia de ponta 🚀'
  },
  'en': {
    companyDescription: 'We create professional websites with cutting-edge technology. Modern design and exceptional performance for your business.',
    companyLabel: 'Website Creation',
    services: 'Services',
    company: 'Company',
    legal: 'Legal',
    landingPages: 'Landing Pages',
    ecommerce: 'E-commerce',
    customProjects: 'Custom Projects',
    requestQuote: 'Request Quote',
    about: 'About',
    contact: 'Contact',
    blog: 'Blog',
    careers: 'Careers',
    terms: 'Terms of Use',
    privacy: 'Privacy Policy',
    cookies: 'Cookies',
    copyright: '© 2025 CodeBR. All rights reserved.',
    techNote: 'Made with cutting-edge technology 🚀'
  },
  'fr': {
    companyDescription: 'Nous créons des sites web professionnels avec une technologie de pointe. Design moderne et performance exceptionnelle pour votre entreprise.',
    companyLabel: 'Création de Sites Web',
    services: 'Services',
    company: 'Entreprise',
    legal: 'Légal',
    landingPages: 'Pages d\'Atterrissage',
    ecommerce: 'E-commerce',
    customProjects: 'Projets Personnalisés',
    requestQuote: 'Demander un Devis',
    about: 'À Propos',
    contact: 'Contact',
    blog: 'Blog',
    careers: 'Carrières',
    terms: 'Conditions d\'Utilisation',
    privacy: 'Politique de Confidentialité',
    cookies: 'Cookies',
    copyright: '© 2025 CodeBR. Tous droits réservés.',
    techNote: 'Fait avec une technologie de pointe 🚀'
  }
};

export function Footer() {
  const pathname = usePathname();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const locale = pathname.split('/')[1] || 'pt-BR';

  // Obter os textos traduzidos
  const t = footerTexts[locale as keyof typeof footerTexts] || footerTexts['pt-BR'];

  // Gerar links do footer com base nas traduções
  const footerLinks = [
    {
      title: t.services,
      links: [
        { label: t.landingPages, href: `/${locale}/#services` },
        { label: t.ecommerce, href: `/${locale}/#services` },
        { label: t.customProjects, href: `/${locale}/#services` },
        { label: t.requestQuote, href: `/${locale}/orcamento` },
      ],
    },
    {
      title: t.company,
      links: [
        { label: t.about, href: `/${locale}/#about` },
        { label: t.contact, href: `/${locale}/contact` },
        { label: t.blog, href: `/${locale}/blog` },
        { label: t.careers, href: `/${locale}/careers` },
      ],
    },
    {
      title: t.legal,
      links: [
        { label: t.terms, href: `/${locale}/terms` },
        { label: t.privacy, href: `/${locale}/privacy` },
        { label: t.cookies, href: `/${locale}/cookies` },
      ],
    },
  ];

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
                <Text size="xs" c="gray.5">{t.companyLabel}</Text>
              </Box>
            </Group>

            <Text size="sm" c="gray.5" mt="xs" lh={1.7}>
              {t.companyDescription}
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

              {group.links.map((link, index) => (
                <Box key={`${group.title}-${index}-${link.label}`}>
                  <Link href={link.href} style={{ textDecoration: 'none' }}>
                    <Text
                      c="gray.5"
                      size="sm"
                      styles={{
                        root: {
                          textDecoration: 'none',
                          display: 'block',
                          padding: '6px 0',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            color: '#9969E5',
                            transform: 'translateX(3px)',
                          },
                        }
                      }}
                    >
                      {link.label}
                    </Text>
                  </Link>
                </Box>
              ))}
            </Stack>
          ))}
        </SimpleGrid>

        <Divider my={50} color="rgba(153,105,229,0.1)" />

        <Group justify="space-between" align="center">
          <Text size="sm" c="gray.6">
            {t.copyright.replace('2025', new Date().getFullYear().toString())}
          </Text>

          <Text size="sm" c="gray.6">
            {t.techNote}
          </Text>
        </Group>
      </Container>
    </Box>
  );
}
