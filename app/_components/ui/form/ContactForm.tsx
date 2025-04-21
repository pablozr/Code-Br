'use client';

import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import { TextInput, Textarea, Button, Box, Group, Text, Paper } from '@mantine/core';
import { IconSend, IconCheck, IconAlertCircle } from '@tabler/icons-react';
import { contactFormSchema, ContactFormValues } from '@/app/_lib/validation/forms/contact-form-schema';
import { formFieldStyles } from '@/app/_styles/components/form-styles';

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ContactFormValues>({
    initialValues: {
      nome: '',
      email: '',
      mensagem: '',
      telefone: '',
      assunto: '',
    },
    validate: zodResolver(contactFormSchema),
    validateInputOnBlur: true,
  });

  const handleSubmit = async (values: ContactFormValues) => {
    setLoading(true);
    setError(null);
    
    try {
      // Enviar dados para a API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar o formulário');
      }

      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.');
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
          <Text size="xl" fw={700} mt="md">Mensagem Enviada!</Text>
          <Text c="dimmed" mt="sm" mb="xl">
            Agradecemos seu contato. Retornaremos em breve.
          </Text>
          <Button 
            onClick={() => setSubmitted(false)}
            variant="gradient"
            gradient={{ from: 'rgba(118,65,192,0.9)', to: 'rgba(153,105,229,0.9)', deg: 135 }}
          >
            Enviar nova mensagem
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
        <TextInput
          label="Nome"
          placeholder="Seu nome"
          required
          {...form.getInputProps('nome')}
          styles={formFieldStyles}
        />
        
        <TextInput
          mt="md"
          label="Email"
          placeholder="seu@email.com"
          required
          {...form.getInputProps('email')}
          styles={formFieldStyles}
        />

        <TextInput
          mt="md"
          label="Telefone (opcional)"
          placeholder="+55 (00) 00000-0000"
          {...form.getInputProps('telefone')}
          styles={formFieldStyles}
        />

        <TextInput
          mt="md"
          label="Assunto (opcional)"
          placeholder="Assunto da mensagem"
          {...form.getInputProps('assunto')}
          styles={formFieldStyles}
        />
        
        <Textarea
          mt="md"
          label="Mensagem"
          placeholder="Como podemos ajudar?"
          minRows={4}
          required
          {...form.getInputProps('mensagem')}
          styles={formFieldStyles}
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
          >
            Enviar mensagem
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
