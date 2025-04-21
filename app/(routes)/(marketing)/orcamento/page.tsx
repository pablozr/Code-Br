'use client';

import { Container, Title, Text, Paper, Box } from '@mantine/core';
import { QuoteForm } from '@/app/_components/ui/form/QuoteForm';
import { AuroraBackground } from '@/app/_components/ui/aurora-background';

export default function OrcamentoPage() {
  return (
    <AuroraBackground>
      <Container size="md" py={60}>
        <Paper
          p="xl"
          radius="lg"
          style={{
            backgroundColor: 'rgba(15, 15, 15, 0.8)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(153, 105, 229, 0.2)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Efeito de borda brilhante */}
          <Box
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '0.5rem',
              padding: '1px',
              background: 'linear-gradient(135deg, rgba(153, 105, 229, 0.3), transparent, rgba(153, 105, 229, 0.3))',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              opacity: 0.5,
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />
          
          <Box style={{ position: 'relative', zIndex: 1 }}>
            <Title
              order={2}
              style={{
                color: 'white',
                fontSize: '2rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #fff, #9969E5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Solicite um Orçamento
            </Title>

            <Text size="md" c="gray.3" mb="xl">
              Preencha o formulário abaixo para receber um orçamento personalizado para o seu projeto.
            </Text>
            
            <QuoteForm />
          </Box>
        </Paper>
      </Container>
    </AuroraBackground>
  );
}
