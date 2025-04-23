'use client';

import { useCallback, useState } from 'react';
import { Box, SimpleGrid, TextInput, Textarea, Button, Group, Select, Divider, Tabs, Text } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { IconSend, IconUser, IconMail, IconPhone, IconBuildingStore, IconDeviceDesktop, IconCoin, IconClock, IconMessage, IconCalculator, IconListDetails } from '@tabler/icons-react';
import { formFieldStyles } from '@/app/_styles/components/form-styles';
import { PriceCalculator } from '@/app/_components/ui/form/PriceCalculator';
import { usePriceContext } from '@/app/_components/ui/form/PriceContext';

// Schema de validação para o formulário de orçamento
const quoteFormSchema = z.object({
  name: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  phone: z.string().optional(),
  company: z.string().optional(),
  websiteType: z.string().optional(),
  website: z.string().optional(),
  features: z.array(z.string()).optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, { message: 'Mensagem deve ter pelo menos 10 caracteres' }),
  estimatedPrice: z.number().optional(),
  complexity: z.string().optional(),
});

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
      submit: 'Enviar Solicitação',
      projectDetails: 'Detalhes do Projeto'
    },
    services: {
      landing: { title: 'Landing Page' },
      ecommerce: { title: 'E-commerce' },
      corporate: { title: 'Site Corporativo' },
      custom: { title: 'Projeto Personalizado' }
    },
    calculator: {
      tab: 'Calculadora de Preço',
      details: 'Detalhes do Formulário'
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
      submit: 'Submit Request',
      projectDetails: 'Project Details'
    },
    services: {
      landing: { title: 'Landing Page' },
      ecommerce: { title: 'E-commerce' },
      corporate: { title: 'Corporate Website' },
      custom: { title: 'Custom Project' }
    },
    calculator: {
      tab: 'Price Calculator',
      details: 'Form Details'
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
      submit: 'Envoyer la Demande',
      projectDetails: 'Détails du Projet'
    },
    services: {
      landing: { title: 'Page d\'Atterrissage' },
      ecommerce: { title: 'E-commerce' },
      corporate: { title: 'Site Web d\'Entreprise' },
      custom: { title: 'Projet Personnalisé' }
    },
    calculator: {
      tab: 'Calculateur de Prix',
      details: 'Détails du Formulaire'
    }
  }
};

export default function OrcamentoForm() {
  // Obter o idioma atual
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'pt-BR';

  const t = quoteTexts[locale as keyof typeof quoteTexts] || quoteTexts['pt-BR'];

  // Estado para controlar a aba ativa
  const [activeTab, setActiveTab] = useState('calculator');

  // Manipulador de mudança de aba
  const handleTabChange = useCallback((value: string) => setActiveTab(value), []);

  // Contexto de preço
  const { formatPrice } = usePriceContext();

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      websiteType: '',
      website: '',
      features: [] as string[],
      budget: '',
      timeline: '',
      message: '',
      estimatedPrice: 0,
      complexity: 'medium',
    },
    validate: zodResolver(quoteFormSchema),
  });

  // Usar useCallback para evitar recriação de funções em cada renderização
  const handlePriceChange = useCallback((price: number) => {
    if (price !== form.values.estimatedPrice) {
      form.setFieldValue('estimatedPrice', price);
    }
  }, [form]);

  const handleFeaturesChange = useCallback((features: string[]) => {
    // Verificar se os arrays são realmente diferentes
    const currentFeatures = form.values.features || [];
    if (features.length !== currentFeatures.length ||
        features.some(f => !currentFeatures.includes(f))) {
      form.setFieldValue('features', features);
    }
  }, [form]);

  const handleWebsiteTypeChange = useCallback((type: string) => {
    if (type !== form.values.websiteType) {
      form.setFieldValue('websiteType', type);
    }
  }, [form]);

  const handleComplexityChange = useCallback((complexity: string) => {
    if (complexity !== form.values.complexity) {
      form.setFieldValue('complexity', complexity);
    }
  }, [form]);

  const handleTimelineChange = useCallback((timeline: string) => {
    if (timeline !== form.values.timeline) {
      form.setFieldValue('timeline', timeline);
    }
  }, [form]);

  const handleSubmit = useCallback(async (values: typeof form.values) => {
    try {
      // Adiciona informações do calculador ao formulário
      const formData = {
        ...values,
        // Formata o preço estimado para exibição
        estimatedPriceFormatted: formatPrice(values.estimatedPrice, locale),
      };

      const response = await fetch('/api/orcamento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        form.reset();
        setActiveTab('calculator');
        alert('Solicitação de orçamento enviada com sucesso!');
      } else {
        alert('Erro ao enviar solicitação. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      alert('Erro ao enviar solicitação. Por favor, tente novamente.');
    }
  }, [form, setActiveTab, formatPrice, locale]);

  // Componentes com motion
  const MotionBox = motion.div;

  return (
    <Tabs
      value={activeTab}
      onChange={handleTabChange}
      variant="pills"
      radius="md"
      mb="xl"
      styles={{
        root: {
          backgroundColor: 'rgba(25, 25, 25, 0.5)',
          borderRadius: '8px',
          padding: '5px',
        },
        tab: {
          color: 'white',
          fontWeight: 500,
        },
        tabsList: {
          gap: '10px',
          borderBottom: 'none',
        },
        panel: {
          padding: '0',
        },
      }}
      classNames={{
        tab: 'custom-tab',
      }}
    >
      <Tabs.List grow>
        <Tabs.Tab value="calculator" leftSection={<IconCalculator size={16} />}>
          {t.calculator.tab}
        </Tabs.Tab>
        <Tabs.Tab value="details" leftSection={<IconListDetails size={16} />}>
          {t.calculator.details}
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="calculator" pt="md">
        <PriceCalculator
          onPriceChange={handlePriceChange}
          onFeaturesChange={handleFeaturesChange}
          onWebsiteTypeChange={handleWebsiteTypeChange}
          onComplexityChange={handleComplexityChange}
          onTimelineChange={handleTimelineChange}
          initialWebsiteType={form.values.websiteType}
          initialFeatures={form.values.features}
          initialComplexity={form.values.complexity || 'medium'}
          initialTimeline={form.values.timeline || 'normal'}
        />
      </Tabs.Panel>

      <Tabs.Panel value="details" pt="md">
        <form onSubmit={form.onSubmit(handleSubmit)} style={{ position: 'relative', zIndex: 1 }}>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={20} mb={30}>
            <TextInput
              label={t.form.name}
              placeholder={t.form.name}
              required
              leftSection={<IconUser size={16} />}
              styles={formFieldStyles}
              {...form.getInputProps('name')}
            />

            <TextInput
              label={t.form.email}
              placeholder={t.form.email}
              required
              leftSection={<IconMail size={16} />}
              styles={formFieldStyles}
              {...form.getInputProps('email')}
            />
          </SimpleGrid>

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={20} mb={30}>
            <TextInput
              label={t.form.phone}
              placeholder={t.form.phone}
              leftSection={<IconPhone size={16} />}
              styles={formFieldStyles}
              {...form.getInputProps('phone')}
            />

            <TextInput
              label={t.form.company}
              placeholder={t.form.company}
              leftSection={<IconBuildingStore size={16} />}
              styles={formFieldStyles}
              {...form.getInputProps('company')}
            />
          </SimpleGrid>

          <Divider
            my="xl"
            label={t.form.projectDetails}
            labelPosition="center"
            color="rgba(153,105,229,0.3)"
            styles={{
              label: {
                color: 'white',
                fontSize: '1rem',
                fontWeight: 500,
                padding: '0 15px',
                backgroundColor: 'transparent',
              }
            }}
          />

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={20} mb={30}>
            <Select
              label={t.form.projectType}
              placeholder={t.form.projectType}
              leftSection={<IconDeviceDesktop size={16} />}
              data={[
                { value: 'landing', label: t.services.landing.title },
                { value: 'ecommerce', label: t.services.ecommerce.title },
                { value: 'corporate', label: t.services.corporate.title },
                { value: 'custom', label: t.services.custom.title },
              ]}
              styles={formFieldStyles}
              {...form.getInputProps('websiteType')}
            />

            <TextInput
              label={t.form.website}
              placeholder={t.form.website}
              styles={formFieldStyles}
              {...form.getInputProps('website')}
            />
          </SimpleGrid>

          <Textarea
            label={t.form.description}
            placeholder={t.form.description}
            minRows={5}
            mb={30}
            required
            leftSection={<IconMessage size={16} style={{ marginTop: '5px' }} />}
            styles={formFieldStyles}
            {...form.getInputProps('message')}
          />

          <Group justify="center">
            <Button
              type="submit"
              size="lg"
              variant="gradient"
              gradient={{ from: 'rgba(118,65,192,0.9)', to: 'rgba(153,105,229,0.9)', deg: 135 }}
              style={{
                boxShadow: '0 10px 20px rgba(118,65,192,0.3)',
                position: 'relative',
                overflow: 'hidden',
                padding: '0 30px',
              }}
              leftSection={<IconSend size={18} />}
            >
              <Box
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
                  animation: 'shine 3s infinite',
                  zIndex: 0,
                }}
              />
              <Text style={{ position: 'relative', zIndex: 1 }}>{t.form.submit}</Text>
            </Button>
          </Group>
        </form>
      </Tabs.Panel>
    </Tabs>
  );
}
