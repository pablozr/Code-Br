'use client';

import { Container, Title, Text, Box, SimpleGrid, TextInput, Textarea, Button, Group, Select, Checkbox, Stack } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { usePathname } from 'next/navigation';

// Schema de validação para o formulário de orçamento
const quoteFormSchema = z.object({
  name: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  phone: z.string().optional(),
  websiteType: z.string().optional(),
  features: z.array(z.string()).optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, { message: 'Mensagem deve ter pelo menos 10 caracteres' }),
});

export function OrcamentoPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'pt-BR';

  // Textos de orçamento
  const quoteTexts = {
    'pt-BR': {
      title: 'Solicite um Orçamento',
      subtitle: 'Preencha o formulário abaixo e entraremos em contato em até 24 horas.',
      form: {
        name: 'Nome',
        email: 'E-mail',
        phone: 'Telefone',
        company: 'Empresa',
        website: 'Website atual (se houver)',
        projectType: 'Tipo de Projeto',
        budget: 'Orçamento',
        deadline: 'Prazo',
        description: 'Descreva seu projeto',
        features: 'Funcionalidades desejadas',
        submit: 'Enviar Solicitação'
      },
      services: {
        landing: { title: 'Landing Page' },
        ecommerce: { title: 'E-commerce' },
        corporate: { title: 'Site Corporativo' },
        custom: { title: 'Projeto Personalizado' }
      }
    },
    'en': {
      title: 'Request a Quote',
      subtitle: 'Fill out the form below and we\'ll get back to you within 24 hours.',
      form: {
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        company: 'Company',
        website: 'Current website (if any)',
        projectType: 'Project Type',
        budget: 'Budget',
        deadline: 'Deadline',
        description: 'Describe your project',
        features: 'Desired features',
        submit: 'Submit Request'
      },
      services: {
        landing: { title: 'Landing Page' },
        ecommerce: { title: 'E-commerce' },
        corporate: { title: 'Corporate Website' },
        custom: { title: 'Custom Project' }
      }
    },
    'fr': {
      title: 'Demandez un Devis',
      subtitle: 'Remplissez le formulaire ci-dessous et nous vous répondrons dans les 24 heures.',
      form: {
        name: 'Nom',
        email: 'Email',
        phone: 'Téléphone',
        company: 'Entreprise',
        website: 'Site web actuel (si existant)',
        projectType: 'Type de Projet',
        budget: 'Budget',
        deadline: 'Délai',
        description: 'Décrivez votre projet',
        features: 'Fonctionnalités souhaitées',
        submit: 'Envoyer la Demande'
      },
      services: {
        landing: { title: 'Page d\'Atterrissage' },
        ecommerce: { title: 'E-commerce' },
        corporate: { title: 'Site Web d\'Entreprise' },
        custom: { title: 'Projet Personnalisé' }
      }
    }
  };

  const t = quoteTexts[locale as keyof typeof quoteTexts] || quoteTexts['pt-BR'];

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      websiteType: '',
      features: [] as string[],
      budget: '',
      timeline: '',
      message: '',
    },
    validate: zodResolver(quoteFormSchema),
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const response = await fetch('/api/orcamento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        form.reset();
        alert('Solicitação de orçamento enviada com sucesso!');
      } else {
        alert('Erro ao enviar solicitação. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      alert('Erro ao enviar solicitação. Por favor, tente novamente.');
    }
  };

  return (
    <Container size="lg" py={80}>
      <Title order={1} ta="center" mb={20}>
        {t.title}
      </Title>

      <Text ta="center" mb={50} size="lg">
        {t.subtitle}
      </Text>

      <Box mx="auto" maw={800}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={20} mb={20}>
            <TextInput
              label={t.form.name}
              placeholder={t.form.name}
              required
              {...form.getInputProps('name')}
            />

            <TextInput
              label={t.form.email}
              placeholder={t.form.email}
              required
              {...form.getInputProps('email')}
            />
          </SimpleGrid>

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={20} mb={20}>
            <TextInput
              label={t.form.phone}
              placeholder={t.form.phone}
              {...form.getInputProps('phone')}
            />

            <Select
              label={t.form.projectType}
              placeholder={t.form.projectType}
              data={[
                { value: 'landing', label: t.services.landing.title },
                { value: 'ecommerce', label: t.services.ecommerce.title },
                { value: 'corporate', label: t.services.corporate.title },
                { value: 'custom', label: t.services.custom.title },
              ]}
              {...form.getInputProps('websiteType')}
            />
          </SimpleGrid>

          <Box mb={20}>
            <Text fw={500} mb={10}>
              {t.form.features}
            </Text>
            <Stack>
              <Checkbox
                label="SEO Otimizado"
                value="seo"
                checked={form.values.features.includes('seo')}
                onChange={(event) => {
                  const checked = event.currentTarget.checked;
                  form.setFieldValue('features', checked
                    ? [...form.values.features, 'seo']
                    : form.values.features.filter(item => item !== 'seo')
                  );
                }}
              />
              <Checkbox
                label="Design Responsivo"
                value="responsive"
                checked={form.values.features.includes('responsive')}
                onChange={(event) => {
                  const checked = event.currentTarget.checked;
                  form.setFieldValue('features', checked
                    ? [...form.values.features, 'responsive']
                    : form.values.features.filter(item => item !== 'responsive')
                  );
                }}
              />
              <Checkbox
                label="Formulários de Contato"
                value="forms"
                checked={form.values.features.includes('forms')}
                onChange={(event) => {
                  const checked = event.currentTarget.checked;
                  form.setFieldValue('features', checked
                    ? [...form.values.features, 'forms']
                    : form.values.features.filter(item => item !== 'forms')
                  );
                }}
              />
              <Checkbox
                label="Blog/Notícias"
                value="blog"
                checked={form.values.features.includes('blog')}
                onChange={(event) => {
                  const checked = event.currentTarget.checked;
                  form.setFieldValue('features', checked
                    ? [...form.values.features, 'blog']
                    : form.values.features.filter(item => item !== 'blog')
                  );
                }}
              />
            </Stack>
          </Box>

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={20} mb={20}>
            <Select
              label={t.form.budget}
              placeholder={t.form.budget}
              data={[
                { value: 'low', label: 'R$ 1.000 - R$ 3.000' },
                { value: 'medium', label: 'R$ 3.000 - R$ 7.000' },
                { value: 'high', label: 'R$ 7.000 - R$ 15.000' },
                { value: 'enterprise', label: 'R$ 15.000+' },
              ]}
              {...form.getInputProps('budget')}
            />

            <Select
              label={t.form.deadline}
              placeholder={t.form.deadline}
              data={[
                { value: 'urgent', label: '1-2 semanas' },
                { value: 'normal', label: '3-4 semanas' },
                { value: 'relaxed', label: '1-2 meses' },
                { value: 'flexible', label: 'Flexível' },
              ]}
              {...form.getInputProps('timeline')}
            />
          </SimpleGrid>

          <Textarea
            label={t.form.description}
            placeholder={t.form.description}
            minRows={5}
            mb={30}
            required
            {...form.getInputProps('message')}
          />

          <Group justify="center">
            <Button
              type="submit"
              size="lg"
              variant="gradient"
              gradient={{ from: '#6030A0', to: '#B490FF' }}
            >
              {t.form.submit}
            </Button>
          </Group>
        </form>
      </Box>
    </Container>
  );
}
