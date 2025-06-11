'use client';

import { Container, Title, Text, Box, SimpleGrid, TextInput, Textarea, Button, Group } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useSafePathname, getLocaleFromPathname } from '@/app/_lib/utils/pathname';
import { contactFormSchema, normalizeContactFormData } from '@/app/_lib/validation/forms/contact-form-schema';

export default function ContactPage() {
  const pathname = useSafePathname();
  const locale = getLocaleFromPathname(pathname);

  // Textos de contato
  const contactTexts = {
    'pt-BR': {
      title: 'Entre em Contato',
      info: {
        title: 'Informações de Contato',
        description: 'Estamos prontos para ajudar com seu projeto. Entre em contato conosco através dos canais abaixo ou preencha o formulário.',
        email: 'E-mail',
        phone: 'Telefone',
        address: 'Endereço'
      },
      form: {
        name: 'Nome',
        email: 'E-mail',
        message: 'Mensagem',
        namePlaceholder: 'Seu nome completo',
        emailPlaceholder: 'seu.email@exemplo.com',
        messagePlaceholder: 'Descreva como podemos ajudar...',
        submit: 'Enviar Mensagem'
      }
    },
    'en': {
      title: 'Contact Us',
      info: {
        title: 'Contact Information',
        description: 'We\'re ready to help with your project. Contact us through the channels below or fill out the form.',
        email: 'Email',
        phone: 'Phone',
        address: 'Address'
      },
      form: {
        name: 'Name',
        email: 'Email',
        message: 'Message',
        namePlaceholder: 'Your full name',
        emailPlaceholder: 'your.email@example.com',
        messagePlaceholder: 'Describe how we can help...',
        submit: 'Send Message'
      }
    },
    'fr': {
      title: 'Contactez-Nous',
      info: {
        title: 'Informations de Contact',
        description: 'Nous sommes prêts à vous aider avec votre projet. Contactez-nous via les canaux ci-dessous ou remplissez le formulaire.',
        email: 'Email',
        phone: 'Téléphone',
        address: 'Adresse'
      },
      form: {
        name: 'Nom',
        email: 'Email',
        message: 'Message',
        namePlaceholder: 'Votre nom complet',
        emailPlaceholder: 'votre.email@exemple.com',
        messagePlaceholder: 'Décrivez comment nous pouvons vous aider...',
        submit: 'Envoyer le Message'
      }
    }
  };

  const t = contactTexts[locale as keyof typeof contactTexts] || contactTexts['pt-BR'];

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validate: zodResolver(contactFormSchema),
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      // Normalizar os dados do formulário para o formato esperado pela API
      const normalizedData = normalizeContactFormData({
        name: values.name,
        email: values.email,
        message: values.message
      });

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(normalizedData),
      });

      if (response.ok) {
        form.reset();
        alert('Mensagem enviada com sucesso!');
      } else {
        const errorData = await response.json();
        alert(`Erro ao enviar mensagem: ${errorData.error || 'Por favor, tente novamente.'}`);
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      alert('Erro ao enviar mensagem. Por favor, tente novamente.');
    }
  };

  return (
    <Container size="lg" py={80}>
      <Title order={1} ta="center" mb={50}>
        {t.title}
      </Title>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing={50}>
        <Box>
          <Title order={3} mb={20}>
            {t.info.title}
          </Title>
          <Text mb={30}>
            {t.info.description}
          </Text>

          <Box mb={20}>
            <Title order={4} mb={10}>
              {t.info.email}
            </Title>
            <Text>contato@codebr.com</Text>
          </Box>

          <Box mb={20}>
            <Title order={4} mb={10}>
              {t.info.phone}
            </Title>
            <Text>+55 (11) 99999-9999</Text>
          </Box>

          <Box>
            <Title order={4} mb={10}>
              {t.info.address}
            </Title>
            <Text>São Paulo, SP - Brasil</Text>
          </Box>
        </Box>

        <Box>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label={t.form.name}
              placeholder={t.form.namePlaceholder}
              mb={20}
              {...form.getInputProps('name')}
            />

            <TextInput
              label={t.form.email}
              placeholder={t.form.emailPlaceholder}
              mb={20}
              {...form.getInputProps('email')}
            />

            <Textarea
              label={t.form.message}
              placeholder={t.form.messagePlaceholder}
              minRows={5}
              mb={30}
              {...form.getInputProps('message')}
            />

            <Group justify="flex-end">
              <Button type="submit" variant="gradient" gradient={{ from: '#6030A0', to: '#B490FF' }}>
                {t.form.submit}
              </Button>
            </Group>
          </form>
        </Box>
      </SimpleGrid>
    </Container>
  );
}
