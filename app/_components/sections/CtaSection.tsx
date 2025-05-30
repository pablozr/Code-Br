'use client';

import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Box,
  Stack
} from '@mantine/core';
import { usePathname } from 'next/navigation';
import { IconArrowRight, IconBrandWhatsapp } from '@tabler/icons-react';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);
const MotionTitle = motion.create(Title);
const MotionText = motion.create(Text);
const MotionGroup = motion.create(Group);

// Traduções para a seção CTA
const ctaTexts = {
  'pt-BR': {
    badge: 'Vamos Trabalhar Juntos',
    title: 'Pronto para',
    titleHighlight: 'Transformar',
    titleEnd: 'sua Presença Online?',
    description: 'Dê o próximo passo para revolucionar sua presença digital. Nosso time de especialistas está pronto para criar soluções que geram resultados reais e mensuráveis para o seu negócio. Vamos construir algo extraordinário juntos.',
    ctaButton: 'Solicitar Orçamento Gratuito',
    whatsappButton: 'Fale pelo WhatsApp'
  },
  'en': {
    badge: 'Let\'s Work Together',
    title: 'Ready to',
    titleHighlight: 'Transform',
    titleEnd: 'your Online Presence?',
    description: 'Take the next step to revolutionize your digital presence. Our team of experts is ready to create solutions that generate real and measurable results for your business. Let\'s build something extraordinary together.',
    ctaButton: 'Request Free Quote',
    whatsappButton: 'Chat on WhatsApp'
  },
  'fr': {
    badge: 'Travaillons Ensemble',
    title: 'Prêt à',
    titleHighlight: 'Transformer',
    titleEnd: 'votre Présence en Ligne?',
    description: 'Franchissez la prochaine étape pour révolutionner votre présence numérique. Notre équipe d\'experts est prête à créer des solutions qui génèrent des résultats réels et mesurables pour votre entreprise. Construisons ensemble quelque chose d\'extraordinaire.',
    ctaButton: 'Demander un Devis Gratuit',
    whatsappButton: 'Discuter sur WhatsApp'
  }
};

export function CtaSection() {
  // Obter o idioma atual
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'pt-BR';

  // Obter os textos traduzidos
  const t = ctaTexts[locale as keyof typeof ctaTexts] || ctaTexts['pt-BR'];

  return (
    <Box
      py={120}
      style={{
        background: 'linear-gradient(135deg, rgba(15,15,15,1) 0%, rgba(25,25,25,1) 100%)',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(153,105,229,0.1)',
      }}
    >
      {/* Background elements */}
      <MotionBox
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(118,65,192,0.15) 0%, rgba(118,65,192,0) 70%)',
          zIndex: 0,
        }}
        animate={{
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Animated circuit board effect */}
      <MotionBox
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.1,
          backgroundImage: `
            linear-gradient(rgba(153,105,229,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(153,105,229,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
          zIndex: 0,
        }}
      />

      {/* Animated particles */}
      {Array.from({ length: 20 }).map((_, i) => {
        const size = (i % 3) + 1;
        const left = (i * 5) % 100;
        const top = (i * 4) % 100;
        const delay = i * 0.2;

        return (
          <MotionBox
            key={i}
            style={{
              position: 'absolute',
              width: size,
              height: size,
              borderRadius: '50%',
              background: 'rgba(153,105,229,0.6)',
              boxShadow: '0 0 5px rgba(153,105,229,0.3)',
              left: `${left}%`,
              top: `${top}%`,
              zIndex: 0,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      })}

      <Container size="lg" style={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing="xl" align="center">
          <Box
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, rgba(118,65,192,0.15), rgba(153,105,229,0.1))',
              border: '1px solid rgba(153,105,229,0.2)',
              backdropFilter: 'blur(10px)',
              padding: '8px 16px',
              borderRadius: '4px',
              marginBottom: '1.5rem',
            }}
          >
            <MotionText
              size="sm"
              fw={600}
              c="white"
              style={{ letterSpacing: '1px', textTransform: 'uppercase' }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {t.badge}
            </MotionText>
          </Box>

          <MotionTitle
            order={2}
            ta="center"
            size="3.5rem"
            fw={800}
            mb="md"
            style={{
              letterSpacing: '-0.5px',
              lineHeight: 1.2,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {t.title} <Text span style={{
              background: 'linear-gradient(135deg, #9969E5, #7641C0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }} inherit>{t.titleHighlight}</Text> {t.titleEnd}
          </MotionTitle>

          <MotionText
            size="xl"
            c="gray.3"
            maw={700}
            ta="center"
            lh={1.7}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {t.description}
          </MotionText>

          <MotionGroup
            mt={40}
            gap="xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Button
              component="a"
              href="/contact"
              size="xl"
              radius="md"
              variant="gradient"
              gradient={{ from: 'rgba(118,65,192,0.9)', to: 'rgba(153,105,229,0.9)', deg: 135 }}
              rightSection={<IconArrowRight size={20} />}
              style={{
                boxShadow: '0 10px 20px -10px rgba(118,65,192,0.5)',
                transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                padding: '0 2rem',
                height: '3.5rem',
              }}
              sx={{
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 15px 25px -10px rgba(118,65,192,0.6)',
                }
              }}
            >
              {t.ctaButton}
            </Button>

            <Button
              component="a"
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              size="xl"
              radius="md"
              variant="outline"
              color="gray.0"
              leftSection={<IconBrandWhatsapp size={20} />}
              style={{
                transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                padding: '0 2rem',
                height: '3.5rem',
                borderColor: 'rgba(153,105,229,0.3)',
              }}
              sx={{
                '&:hover': {
                  transform: 'translateY(-3px)',
                  backgroundColor: 'rgba(153,105,229,0.1)',
                  borderColor: 'rgba(153,105,229,0.5)',
                }
              }}
            >
              {t.whatsappButton}
            </Button>
          </MotionGroup>
        </Stack>
      </Container>
    </Box>
  );
}
