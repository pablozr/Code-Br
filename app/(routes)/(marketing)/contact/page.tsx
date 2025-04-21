'use client';

import { Container, Title, Text, SimpleGrid, Box } from '@mantine/core';
import { ContactForm } from '@/app/_components/ui/form/ContactForm';
import { IconMail, IconPhone, IconMapPin } from '@tabler/icons-react';

export default function ContactPage() {
  return (
    <Container size="lg" py={80}>
      <Box mb={50} style={{ textAlign: 'center' }}>
        <Title
          order={1}
          style={{
            fontSize: '3rem',
            fontWeight: 800,
            letterSpacing: '-1px',
            marginBottom: '1rem',
            background: 'linear-gradient(90deg, #fff, #9969E5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Entre em Contato
        </Title>
        <Text
          c="dimmed"
          size="lg"
          style={{
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          Estamos prontos para transformar sua visão em realidade. Preencha o formulário abaixo e nossa equipe entrará em contato em breve.
        </Text>
      </Box>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing={50}>
        <div>
          <Box mb={30}>
            <Title order={2} size="h3" mb="md">Informações de Contato</Title>
            <Text c="dimmed">
              Estamos disponíveis para atender suas necessidades e responder a quaisquer perguntas que você possa ter sobre nossos serviços.
            </Text>
          </Box>

          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1.5rem',
            }}
          >
            <Box
              style={{
                backgroundColor: 'rgba(118, 65, 192, 0.1)',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem',
              }}
            >
              <IconMail size={24} color="#9969E5" />
            </Box>
            <div>
              <Text size="sm" c="dimmed">Email</Text>
              <Text>contato@codebr.com</Text>
            </div>
          </Box>

          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1.5rem',
            }}
          >
            <Box
              style={{
                backgroundColor: 'rgba(118, 65, 192, 0.1)',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem',
              }}
            >
              <IconPhone size={24} color="#9969E5" />
            </Box>
            <div>
              <Text size="sm" c="dimmed">Telefone</Text>
              <Text>+41 123 456 789</Text>
            </div>
          </Box>

          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box
              style={{
                backgroundColor: 'rgba(118, 65, 192, 0.1)',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem',
              }}
            >
              <IconMapPin size={24} color="#9969E5" />
            </Box>
            <div>
              <Text size="sm" c="dimmed">Endereço</Text>
              <Text>Zurich, Suíça</Text>
            </div>
          </Box>
        </div>

        <ContactForm />
      </SimpleGrid>
    </Container>
  );
}
