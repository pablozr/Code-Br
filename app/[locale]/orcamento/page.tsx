'use client';

import { usePathname } from 'next/navigation';
import { Box, Container, Title, Text, Paper } from '@mantine/core';
import { motion } from 'framer-motion';
import { PriceProvider } from '@/app/_components/ui/form/PriceContext';
import { CompleteQuoteFormLazy } from '@/app/_components/ui/LazyComponents';

export default function OrcamentoPage() {
  // Obter o idioma atual
  const pathname = usePathname();
  const locale = pathname ? pathname.split('/')[1] || 'pt-BR' : 'pt-BR';

  // Textos de orçamento
  const quoteTexts = {
    'pt-BR': {
      title: 'Solicite um Orçamento',
      subtitle: 'Preencha o formulário abaixo e entraremos em contato em até 24 horas.',
    },
    'en': {
      title: 'Request a Quote',
      subtitle: 'Fill out the form below and we\'ll get back to you within 24 hours.',
    },
    'fr': {
      title: 'Demandez un Devis',
      subtitle: 'Remplissez le formulaire ci-dessous et nous vous répondrons dans les 24 heures.',
    }
  };

  const t = quoteTexts[locale as keyof typeof quoteTexts] || quoteTexts['pt-BR'];

  // Componentes com motion
  const MotionBox = motion.div;
  // Corrigindo o tipo para o componente Paper
  const MotionPaper = motion.div;

  return (
    <Box
      py={80}
      style={{
        background: 'linear-gradient(to bottom, rgba(15,15,15,0.9) 0%, rgba(10,10,10,0.9) 100%)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background effect */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(118,65,192,0.05) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(118,65,192,0.05) 0%, transparent 50%)',
          zIndex: 0,
        }}
      />

      {/* Subtle grid pattern */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'linear-gradient(to right, rgba(118,65,192,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(118,65,192,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.2,
          zIndex: 0,
        }}
      />

      <Container size="xl" style={{ position: 'relative', zIndex: 1 }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            marginBottom: '60px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, rgba(118,65,192,0.1), rgba(153,105,229,0.2))',
              border: '1px solid rgba(153,105,229,0.3)',
              backdropFilter: 'blur(10px)',
              padding: '0.5rem 0.9rem',
              borderRadius: '0.25rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'white',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            {t.title}
          </div>

          <Title
            order={2}
            fw={700}
            size="2.5rem"
            c="white"
            mb="sm"
            style={{
              lineHeight: 1.2,
              letterSpacing: '-0.5px',
            }}
          >
            {t.subtitle.split(' em ').length > 1 ? (
              <>
                {t.subtitle.split(' em ')[0]}{' '}
                <Text span c="purple.4" inherit>em</Text>
                {' '}{t.subtitle.split(' em ')[1]}
              </>
            ) : t.subtitle}
          </Title>
        </MotionBox>

        <MotionPaper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Paper
            shadow="md"
            radius="lg"
            p="xl"
            mx="auto"
            maw={800}
            style={{
              background: 'linear-gradient(135deg, rgba(30,30,30,0.6), rgba(20,20,20,0.8))',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(153,105,229,0.2)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.2), 0 0 15px rgba(118,65,192,0.1)',
            }}
        >
          {/* Subtle gradient overlay */}
          <Box
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, rgba(118,65,192,0.1) 0%, transparent 70%)',
              opacity: 0.1,
              zIndex: 0,
            }}
          />

          {/* Usar o PriceProvider para isolar as atualizações de preço */}
          <PriceProvider>
            <CompleteQuoteFormLazy />
          </PriceProvider>
          </Paper>
        </MotionPaper>
      </Container>
    </Box>
  );
}
