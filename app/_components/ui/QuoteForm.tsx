'use client';

import { useState } from 'react';
import { useForm } from '@mantine/form';
import { 
  TextInput, 
  Textarea, 
  Button, 
  Box, 
  Group, 
  Text, 
  Paper, 
  Select,
  MultiSelect,
  Divider
} from '@mantine/core';
import { IconSend, IconCheck, IconAlertCircle } from '@tabler/icons-react';
import { submitQuoteRequest, QuoteFormValues } from '@/app/_actions/quote';

export function QuoteForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<QuoteFormValues>({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      websiteType: '',
      features: [],
      budget: '',
      timeline: '',
      message: '',
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Nome deve ter pelo menos 2 caracteres' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email inválido'),
      message: (value) => (value.length < 10 ? 'Mensagem deve ter pelo menos 10 caracteres' : null),
    },
  });

  const handleSubmit = async (values: QuoteFormValues) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await submitQuoteRequest(values);
      
      if (result.success) {
        setSubmitted(true);
        form.reset();
      } else {
        setError(result.error as string);
      }
    } catch (err) {
      setError('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Paper p="xl" radius="md" withBorder shadow="md" 
        style={{ 
          backgroundColor: 'rgba(20, 20, 20, 0.7)',
          borderColor: 'rgba(118, 65, 192, 0.3)',
        }}
      >
        <Box 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            textAlign: 'center',
            padding: '2rem 1rem'
          }}
        >
          <IconCheck size={50} color="#7641C0" stroke={1.5} />
          <Text size="xl" fw={700} mt="md">Solicitação Enviada!</Text>
          <Text c="dimmed" mt="sm" mb="xl">
            Agradecemos seu interesse. Analisaremos sua solicitação e entraremos em contato em breve com um orçamento personalizado.
          </Text>
          <Button 
            onClick={() => setSubmitted(false)}
            variant="gradient"
            gradient={{ from: 'rgba(118,65,192,0.9)', to: 'rgba(153,105,229,0.9)', deg: 135 }}
          >
            Enviar nova solicitação
          </Button>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper p="xl" radius="md" withBorder shadow="md" 
      style={{ 
        backgroundColor: 'rgba(20, 20, 20, 0.7)',
        borderColor: 'rgba(118, 65, 192, 0.3)',
      }}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Text size="xl" fw={700} mb="md">Solicite um Orçamento</Text>
        
        <Text size="sm" c="dimmed" mb="lg">
          Preencha o formulário abaixo com detalhes sobre o seu projeto para recebermos sua solicitação de orçamento.
        </Text>
        
        <Divider 
          label="Informações de Contato" 
          labelPosition="center"
          mb="md"
          styles={{
            label: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: 600,
            }
          }}
        />
        
        <TextInput
          label="Nome"
          placeholder="Seu nome completo"
          required
          {...form.getInputProps('name')}
          styles={{
            input: {
              backgroundColor: 'rgba(30, 30, 30, 0.6)',
              borderColor: 'rgba(118, 65, 192, 0.2)',
              '&:focus': {
                borderColor: 'rgba(118, 65, 192, 0.5)',
              },
            },
            label: {
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '6px',
            },
          }}
        />
        
        <Group grow mt="md">
          <TextInput
            label="Email"
            placeholder="seu@email.com"
            required
            {...form.getInputProps('email')}
            styles={{
              input: {
                backgroundColor: 'rgba(30, 30, 30, 0.6)',
                borderColor: 'rgba(118, 65, 192, 0.2)',
                '&:focus': {
                  borderColor: 'rgba(118, 65, 192, 0.5)',
                },
              },
              label: {
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '6px',
              },
            }}
          />
          
          <TextInput
            label="Telefone"
            placeholder="(00) 00000-0000"
            {...form.getInputProps('phone')}
            styles={{
              input: {
                backgroundColor: 'rgba(30, 30, 30, 0.6)',
                borderColor: 'rgba(118, 65, 192, 0.2)',
                '&:focus': {
                  borderColor: 'rgba(118, 65, 192, 0.5)',
                },
              },
              label: {
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '6px',
              },
            }}
          />
        </Group>
        
        <Divider 
          label="Detalhes do Projeto" 
          labelPosition="center"
          mt="xl"
          mb="md"
          styles={{
            label: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: 600,
            }
          }}
        />
        
        <Select
          label="Tipo de Website"
          placeholder="Selecione o tipo de site que você precisa"
          data={[
            { value: 'landing', label: 'Landing Page' },
            { value: 'ecommerce', label: 'E-commerce' },
            { value: 'institutional', label: 'Site Institucional' },
            { value: 'blog', label: 'Blog' },
            { value: 'custom', label: 'Personalizado' },
          ]}
          {...form.getInputProps('websiteType')}
          styles={{
            input: {
              backgroundColor: 'rgba(30, 30, 30, 0.6)',
              borderColor: 'rgba(118, 65, 192, 0.2)',
              '&:focus': {
                borderColor: 'rgba(118, 65, 192, 0.5)',
              },
            },
            label: {
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '6px',
            },
            dropdown: {
              backgroundColor: 'rgba(30, 30, 30, 0.95)',
              borderColor: 'rgba(118, 65, 192, 0.3)',
            },
            item: {
              '&[data-selected]': {
                backgroundColor: 'rgba(118, 65, 192, 0.2)',
              },
              '&[data-hovered]': {
                backgroundColor: 'rgba(118, 65, 192, 0.1)',
              },
            },
          }}
        />
        
        <MultiSelect
          label="Funcionalidades Desejadas"
          placeholder="Selecione as funcionalidades que você precisa"
          data={[
            { value: 'contact', label: 'Formulário de Contato' },
            { value: 'blog', label: 'Blog' },
            { value: 'gallery', label: 'Galeria de Imagens' },
            { value: 'payment', label: 'Sistema de Pagamento' },
            { value: 'login', label: 'Área de Login' },
            { value: 'seo', label: 'Otimização SEO' },
            { value: 'responsive', label: 'Design Responsivo' },
            { value: 'multilanguage', label: 'Múltiplos Idiomas' },
            { value: 'analytics', label: 'Integração com Analytics' },
          ]}
          mt="md"
          {...form.getInputProps('features')}
          styles={{
            input: {
              backgroundColor: 'rgba(30, 30, 30, 0.6)',
              borderColor: 'rgba(118, 65, 192, 0.2)',
              '&:focus': {
                borderColor: 'rgba(118, 65, 192, 0.5)',
              },
            },
            label: {
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '6px',
            },
            dropdown: {
              backgroundColor: 'rgba(30, 30, 30, 0.95)',
              borderColor: 'rgba(118, 65, 192, 0.3)',
            },
            item: {
              '&[data-selected]': {
                backgroundColor: 'rgba(118, 65, 192, 0.2)',
              },
              '&[data-hovered]': {
                backgroundColor: 'rgba(118, 65, 192, 0.1)',
              },
            },
          }}
        />
        
        <Group grow mt="md">
          <Select
            label="Orçamento Estimado"
            placeholder="Qual seu orçamento para este projeto?"
            data={[
              { value: 'low', label: 'Até R$ 3.000' },
              { value: 'medium', label: 'R$ 3.000 a R$ 8.000' },
              { value: 'high', label: 'R$ 8.000 a R$ 15.000' },
              { value: 'enterprise', label: 'Acima de R$ 15.000' },
            ]}
            {...form.getInputProps('budget')}
            styles={{
              input: {
                backgroundColor: 'rgba(30, 30, 30, 0.6)',
                borderColor: 'rgba(118, 65, 192, 0.2)',
                '&:focus': {
                  borderColor: 'rgba(118, 65, 192, 0.5)',
                },
              },
              label: {
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '6px',
              },
              dropdown: {
                backgroundColor: 'rgba(30, 30, 30, 0.95)',
                borderColor: 'rgba(118, 65, 192, 0.3)',
              },
              item: {
                '&[data-selected]': {
                  backgroundColor: 'rgba(118, 65, 192, 0.2)',
                },
                '&[data-hovered]': {
                  backgroundColor: 'rgba(118, 65, 192, 0.1)',
                },
              },
            }}
          />
          
          <Select
            label="Prazo Desejado"
            placeholder="Qual o prazo para conclusão?"
            data={[
              { value: 'urgent', label: 'Urgente (até 2 semanas)' },
              { value: 'short', label: 'Curto (2-4 semanas)' },
              { value: 'medium', label: 'Médio (1-2 meses)' },
              { value: 'long', label: 'Longo (3+ meses)' },
              { value: 'flexible', label: 'Flexível' },
            ]}
            {...form.getInputProps('timeline')}
            styles={{
              input: {
                backgroundColor: 'rgba(30, 30, 30, 0.6)',
                borderColor: 'rgba(118, 65, 192, 0.2)',
                '&:focus': {
                  borderColor: 'rgba(118, 65, 192, 0.5)',
                },
              },
              label: {
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '6px',
              },
              dropdown: {
                backgroundColor: 'rgba(30, 30, 30, 0.95)',
                borderColor: 'rgba(118, 65, 192, 0.3)',
              },
              item: {
                '&[data-selected]': {
                  backgroundColor: 'rgba(118, 65, 192, 0.2)',
                },
                '&[data-hovered]': {
                  backgroundColor: 'rgba(118, 65, 192, 0.1)',
                },
              },
            }}
          />
        </Group>
        
        <Textarea
          mt="md"
          label="Detalhes do Projeto"
          placeholder="Descreva seu projeto, objetivos, referências e qualquer outra informação relevante..."
          minRows={4}
          required
          {...form.getInputProps('message')}
          styles={{
            input: {
              backgroundColor: 'rgba(30, 30, 30, 0.6)',
              borderColor: 'rgba(118, 65, 192, 0.2)',
              '&:focus': {
                borderColor: 'rgba(118, 65, 192, 0.5)',
              },
            },
            label: {
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '6px',
            },
          }}
        />
        
        {error && (
          <Box mt="md" p="sm" style={{ backgroundColor: 'rgba(255, 0, 0, 0.1)', borderRadius: '4px' }}>
            <Group>
              <IconAlertCircle size={16} color="red" />
              <Text size="sm" c="red">{error}</Text>
            </Group>
          </Box>
        )}
        
        <Group justify="flex-end" mt="xl">
          <Button
            type="submit"
            loading={loading}
            leftSection={<IconSend size={16} />}
            variant="gradient"
            gradient={{ from: 'rgba(118,65,192,0.9)', to: 'rgba(153,105,229,0.9)', deg: 135 }}
            size="md"
          >
            Solicitar Orçamento
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
