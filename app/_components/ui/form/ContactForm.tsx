'use client';

import { useState, useEffect } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import { TextInput, Textarea, Button, Box, Group, Text, Paper, Tooltip } from '@mantine/core';
import { IconSend, IconCheck, IconAlertCircle, IconInfoCircle } from '@tabler/icons-react';
import { contactFormSchema, ContactFormValues } from '@/app/_lib/validation/forms/contact-form-schema';
import { formFieldStyles } from '@/app/_styles/components/form-styles';
import InputMask from 'react-input-mask';
import { CsrfToken } from './CsrfToken';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ContactFormValues | null>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Autosave do formulário
  useEffect(() => {
    const savedData = localStorage.getItem('contactFormData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      form.setValues(parsedData);
      setFormData(parsedData);
    }
  }, []);

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
    validateInputOnChange: true,
  });

  // Salvar dados do formulário no localStorage
  useEffect(() => {
    if (form.isDirty()) {
      localStorage.setItem('contactFormData', JSON.stringify(form.values));
      setFormData(form.values);
    }
  }, [form.values]);

  // Forçar validação em tempo real para campos específicos
  useEffect(() => {
    if (form.values.email) {
      form.validateField('email');
    }
    if (form.values.telefone) {
      form.validateField('telefone');
    }
  }, [form.values.email, form.values.telefone]);

  const handleSubmit = async (values: ContactFormValues) => {
    setLoading(true);
    setError(null);

    try {
      // Verificar reCAPTCHA
      if (!executeRecaptcha) {
        throw new Error('reCAPTCHA não está disponível');
      }

      const token = await executeRecaptcha('contact_form_submit');

      // Enviar dados para a API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          recaptchaToken: token,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar o formulário');
      }

      // Limpar dados salvos após envio bem-sucedido
      localStorage.removeItem('contactFormData');
      setFormData(null);

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
        <CsrfToken />
        <TextInput
          label="Nome"
          placeholder="Seu nome"
          required
          {...form.getInputProps('nome')}
          styles={formFieldStyles}
          error={form.errors.nome}
          rightSection={
            <Tooltip label="Digite seu nome completo">
              <IconInfoCircle size={16} style={{ cursor: 'help' }} />
            </Tooltip>
          }
        />

        <TextInput
          mt="md"
          label="Email"
          placeholder="seu@email.com"
          required
          {...form.getInputProps('email')}
          styles={formFieldStyles}
          error={form.errors.email}
          rightSection={
            <Tooltip label="Digite um email válido">
              <IconInfoCircle size={16} style={{ cursor: 'help' }} />
            </Tooltip>
          }
        />

        <InputMask
          mask="+55 (99) 99999-9999"
          value={form.values.telefone}
          onChange={(e) => form.setFieldValue('telefone', e.target.value)}
        >
          {(inputProps: any) => (
            <TextInput
              mt="md"
              label="Telefone (opcional)"
              placeholder="+55 (00) 00000-0000"
              {...inputProps}
              styles={formFieldStyles}
              error={form.errors.telefone}
              rightSection={
                <Tooltip label="Formato: +55 (00) 00000-0000">
                  <IconInfoCircle size={16} style={{ cursor: 'help' }} />
                </Tooltip>
              }
            />
          )}
        </InputMask>

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
          error={form.errors.mensagem}
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
            disabled={!executeRecaptcha}
          >
            Enviar mensagem
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
