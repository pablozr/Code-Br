'use client';

import { useState } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Textarea, Button, Box, Group, Text, Paper } from '@mantine/core';
import { IconSend, IconCheck, IconAlertCircle } from '@tabler/icons-react';
import { saveContactRequest, ContactFormValues } from '@/app/_actions/contact';

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ContactFormValues>({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Nome deve ter pelo menos 2 caracteres' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email inválido'),
      message: (value) => (value.length < 10 ? 'Mensagem deve ter pelo menos 10 caracteres' : null),
    },
  });

  const handleSubmit = async (values: ContactFormValues) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await saveContactRequest(values);
      
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
        
        <TextInput
          mt="md"
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
        
        <Textarea
          mt="md"
          label="Mensagem"
          placeholder="Como podemos ajudar?"
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
          >
            Enviar mensagem
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
