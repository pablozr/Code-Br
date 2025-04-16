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
  IconArrowUp
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
        background: 'linear-gradient(to top, #0A0A0A, #111111)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
      }}
    >
      {/* Scroll to top button */}
      {showScrollTop && (
        <ActionIcon
          variant="filled"
          color="dark.7"
          size="lg"
          radius="xl"
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 10,
            border: '1px solid rgba(118,65,192,0.3)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
          onClick={scrollToTop}
        >
          <IconArrowUp size={rem(18)} color="#9969E5" />
        </ActionIcon>
      )}
      
      <Container size="xl" py={60}>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={50}>
          {/* Brand column */}
          <Stack spacing="md">
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
            
            <Text size="sm" c="gray.5" mt="xs">
              Criamos websites profissionais com a precisão suíça. Hospedagem segura e performance excepcional.
            </Text>
            
            <Group gap="md" mt="md">
              <ActionIcon variant="subtle" color="gray" radius="xl" size="lg">
                <IconBrandTwitter size={rem(18)} />
              </ActionIcon>
              <ActionIcon variant="subtle" color="gray" radius="xl" size="lg">
                <IconBrandInstagram size={rem(18)} />
              </ActionIcon>
              <ActionIcon variant="subtle" color="gray" radius="xl" size="lg">
                <IconBrandLinkedin size={rem(18)} />
              </ActionIcon>
              <ActionIcon variant="subtle" color="gray" radius="xl" size="lg">
                <IconBrandGithub size={rem(18)} />
              </ActionIcon>
            </Group>
          </Stack>
          
          {/* Links columns */}
          {footerLinks.map((group) => (
            <Stack key={group.title} spacing="xs">
              <Text fw={600} c="white" mb="xs">
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
                      transition: 'color 0.2s ease',
                      '&:hover': { color: '#9969E5' },
                    }}
                  >
                    {link.label}
                  </Text>
                </Link>
              ))}
            </Stack>
          ))}
        </SimpleGrid>
        
        <Divider my={40} color="dark.7" />
        
        <Group justify="space-between" align="center">
          <Text size="xs" c="gray.6">
            © {new Date().getFullYear()} Websites Suíços. Todos os direitos reservados.
          </Text>
          
          <Text size="xs" c="gray.6">
            Feito com precisão na Suíça 🇨🇭
          </Text>
        </Group>
      </Container>
    </Box>
  );
}
