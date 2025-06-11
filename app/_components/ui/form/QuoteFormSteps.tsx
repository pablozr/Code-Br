'use client';

import { Transition, Stack, Title, Text, TextInput, SimpleGrid, Checkbox, Select, Textarea, Card, Group, Box, Divider } from '@mantine/core';
import { IconUser, IconMail, IconPhone, IconBuildingStore, IconDeviceDesktop, IconPencil, IconCalendar, IconCoin, IconBrandWhatsapp, IconInfoCircle, IconCalculator } from '@tabler/icons-react';
import { formFieldStyles } from '@/app/_styles/components/form-styles';
import { QuoteFormValues } from '@/app/_lib/validation/forms/quote-form-schema';
import { UseFormReturnType } from '@mantine/form';
import { usePriceContext } from './PriceContext';
import { usePathname } from 'next/navigation';

interface StepProps {
  form: UseFormReturnType<QuoteFormValues>;
  animateIn: boolean;
}

export function PersonalInfoStep({ form, animateIn }: StepProps) {
  return (
    <Transition mounted={animateIn} transition="fade" duration={200}>
      {(styles) => (
        <div style={styles}>
          <Stack gap="md">
            <Title order={4} c="white" mb="xs">
              Informações de Contato
            </Title>
            <Text size="sm" c="gray.4" mb="md">
              Preencha seus dados para que possamos entrar em contato com você.
            </Text>

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              <Box style={{ minHeight: '90px' }}>
                <TextInput
                  label="Nome"
                  placeholder="Seu nome completo"
                  withAsterisk
                  leftSection={<IconUser size={16} />}
                  {...form.getInputProps('nome')}
                  styles={{
                    ...formFieldStyles,
                    error: {
                      ...formFieldStyles.error,
                      display: 'block',
                    },
                    input: {
                      ...formFieldStyles.input,
                      borderColor: form.errors.nome ? '#ff6b6b !important' : formFieldStyles.input.borderColor,
                    }
                  }}
                  error={form.errors.nome}
                />
                {!form.errors.nome && form.values.nome && (
                  <Text size="xs" c="teal.4" mt={5} style={{ fontSize: '0.7rem' }}>
                    ✓ Nome válido
                  </Text>
                )}
              </Box>

              <Box style={{ minHeight: '90px' }}>
                <TextInput
                  label="Email"
                  placeholder="seu.email@exemplo.com"
                  withAsterisk
                  leftSection={<IconMail size={16} />}
                  {...form.getInputProps('email')}
                  styles={{
                    ...formFieldStyles,
                    error: {
                      ...formFieldStyles.error,
                      display: 'block',
                    },
                    input: {
                      ...formFieldStyles.input,
                      borderColor: form.errors.email ? '#ff6b6b !important' : formFieldStyles.input.borderColor,
                    }
                  }}
                  error={form.errors.email}
                />
                {!form.errors.email && form.values.email && (
                  <Text size="xs" c="teal.4" mt={5} style={{ fontSize: '0.7rem' }}>
                    ✓ Email válido
                  </Text>
                )}
              </Box>
            </SimpleGrid>

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              <Box style={{ minHeight: '90px' }}>
                <TextInput
                  label="Telefone"
                  placeholder="+55 (00) 00000-0000"
                  description="Formato internacional: +DD (XX) XXXXX-XXXX"
                  withAsterisk
                  leftSection={<IconPhone size={16} />}
                  {...form.getInputProps('telefone')}
                  styles={{
                    ...formFieldStyles,
                    error: {
                      ...formFieldStyles.error,
                      display: 'block',
                    },
                    input: {
                      ...formFieldStyles.input,
                      borderColor: form.errors.telefone ? '#ff6b6b !important' : formFieldStyles.input.borderColor,
                    },
                    description: {
                      ...formFieldStyles.description,
                      fontSize: '0.75rem',
                    }
                  }}
                  error={form.errors.telefone}
                />
                {!form.errors.telefone && form.values.telefone && (
                  <Text size="xs" c="teal.4" mt={5} style={{ fontSize: '0.7rem' }}>
                    ✓ Formato válido
                  </Text>
                )}
                {!form.errors.telefone && !form.values.telefone && (
                  <Text size="xs" c="dimmed" mt={5} style={{ fontSize: '0.7rem' }}>
                    Exemplo: +55 (11) 98765-4321 (Brasil)
                  </Text>
                )}
              </Box>

              <Box style={{ minHeight: '90px' }}>
                <TextInput
                  label="Empresa"
                  placeholder="Nome da sua empresa (opcional)"
                  leftSection={<IconBuildingStore size={16} />}
                  {...form.getInputProps('empresa')}
                  styles={formFieldStyles}
                />
              </Box>
            </SimpleGrid>

            <Checkbox
              label="Aceito receber contato por WhatsApp"
              icon={IconBrandWhatsapp}
              {...form.getInputProps('whatsapp', { type: 'checkbox' })}
              styles={{
                label: {
                  color: 'white',
                },
                input: {
                  backgroundColor: 'rgba(25, 25, 25, 0.6)',
                  borderColor: 'rgba(118, 65, 192, 0.3)',
                  '&:checked': {
                    backgroundColor: 'rgba(118, 65, 192, 0.8)',
                    borderColor: 'rgba(118, 65, 192, 0.8)',
                  },
                },
              }}
            />
          </Stack>
        </div>
      )}
    </Transition>
  );
}

export function ProjectDetailsStep({ form, animateIn }: StepProps) {
  return (
    <Transition mounted={animateIn} transition="fade" duration={200}>
      {(styles) => (
        <div style={styles}>
          <Stack gap="md">
            <Title order={4} c="white" mb="xs">
              Detalhes do Projeto
            </Title>
            <Text size="sm" c="gray.4" mb="md">
              Conte-nos mais sobre o site que você precisa.
            </Text>

            <Box style={{ position: 'relative' }}>
              <Select
                label="Tipo de Site"
                placeholder="Selecione o tipo de site"
                withAsterisk
                leftSection={<IconDeviceDesktop size={16} />}
                data={[
                  { value: 'landing', label: 'Landing Page' },
                  { value: 'institucional', label: 'Site Institucional' },
                  { value: 'ecommerce', label: 'E-commerce' },
                  { value: 'blog', label: 'Blog' },
                  { value: 'personalizado', label: 'Personalizado' },
                ]}
                {...form.getInputProps('tipoSite')}
                styles={{
                  ...formFieldStyles,
                  error: {
                    ...formFieldStyles.error,
                    display: 'block',
                  },
                  input: {
                    ...formFieldStyles.input,
                    borderColor: form.errors.tipoSite ? '#ff6b6b !important' : formFieldStyles.input.borderColor,
                  }
                }}
              />
              {!form.errors.tipoSite && form.values.tipoSite && (
                <Text size="xs" c="teal.4" mt={5} style={{ fontSize: '0.7rem' }}>
                  ✓ Tipo de site selecionado
                </Text>
              )}
            </Box>

            <Box style={{ position: 'relative' }}>
              <Textarea
                label="Descrição do Projeto"
                placeholder="Descreva o que você precisa para o seu site..."
                withAsterisk
                minRows={4}
                leftSection={<IconPencil size={16} />}
                {...form.getInputProps('descricao')}
                styles={{
                  ...formFieldStyles,
                  error: {
                    ...formFieldStyles.error,
                    display: 'block',
                  },
                  input: {
                    ...formFieldStyles.input,
                    borderColor: form.errors.descricao ? '#ff6b6b !important' : formFieldStyles.input.borderColor,
                  }
                }}
              />
              {!form.errors.descricao && form.values.descricao && form.values.descricao.length >= 10 && (
                <Text size="xs" c="teal.4" mt={5} style={{ fontSize: '0.7rem' }}>
                  ✓ Descrição válida
                </Text>
              )}
            </Box>
          </Stack>
        </div>
      )}
    </Transition>
  );
}

export function PreferencesStep({ form, animateIn }: StepProps) {
  return (
    <Transition mounted={animateIn} transition="fade" duration={200}>
      {(styles) => (
        <div style={styles}>
          <Stack gap="md">
            <Title order={4} c="white" mb="xs">
              Preferências
            </Title>
            <Text size="sm" c="gray.4" mb="md">
              Informações adicionais para ajudar a personalizar nossa proposta.
            </Text>

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              <Select
                label="Prazo Desejado"
                placeholder="Selecione o prazo"
                leftSection={<IconCalendar size={16} />}
                data={[
                  { value: 'urgente', label: 'Urgente (até 15 dias)' },
                  { value: 'normal', label: 'Normal (15-30 dias)' },
                  { value: 'flexivel', label: 'Flexível (mais de 30 dias)' },
                ]}
                {...form.getInputProps('prazo')}
                styles={formFieldStyles}
              />

              <Select
                label="Orçamento Estimado"
                placeholder="Selecione o orçamento"
                leftSection={<IconCoin size={16} />}
                data={[
                  { value: 'ate2k', label: 'Até R$ 2.000' },
                  { value: '2k-5k', label: 'R$ 2.000 - R$ 5.000' },
                  { value: '5k-10k', label: 'R$ 5.000 - R$ 10.000' },
                  { value: '10k-20k', label: 'R$ 10.000 - R$ 20.000' },
                  { value: 'acima20k', label: 'Acima de R$ 20.000' },
                  { value: 'flexivel', label: 'Flexível / A definir' },
                ]}
                {...form.getInputProps('orcamento')}
                styles={formFieldStyles}
              />
            </SimpleGrid>

            <Checkbox
              label="Desejo receber novidades e atualizações por email"
              {...form.getInputProps('newsletter', { type: 'checkbox' })}
              styles={{
                label: {
                  color: 'white',
                },
                input: {
                  backgroundColor: 'rgba(25, 25, 25, 0.6)',
                  borderColor: 'rgba(118, 65, 192, 0.3)',
                  '&:checked': {
                    backgroundColor: 'rgba(118, 65, 192, 0.8)',
                    borderColor: 'rgba(118, 65, 192, 0.8)',
                  },
                },
              }}
            />
          </Stack>
        </div>
      )}
    </Transition>
  );
}

export function ReviewStep({ form, animateIn }: StepProps) {
  const { totalPrice, formatPrice } = usePriceContext();
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'pt-BR';

  return (
    <Transition mounted={animateIn} transition="fade" duration={200}>
      {(styles) => (
        <div style={styles}>
          <Stack gap="md">
            <Title order={4} c="white" mb="xs">
              Revisão
            </Title>
            <Text size="sm" c="gray.4" mb="xs">
              Verifique se todas as informações estão corretas antes de enviar.
            </Text>

            {/* Exibir preço calculado se disponível */}
            {totalPrice > 0 && (
              <Card
                withBorder
                p="md"
                radius="md"
                style={{
                  backgroundColor: 'rgba(118, 65, 192, 0.1)',
                  borderColor: 'rgba(153, 105, 229, 0.3)',
                  marginBottom: '1rem',
                }}
              >
                <Group gap="md" align="center">
                  <IconCalculator size={24} color="rgba(153, 105, 229, 0.8)" />
                  <Box>
                    <Text fw={600} c="white" size="sm">
                      Preço Estimado pela Calculadora
                    </Text>
                    <Text fw={700} c="purple.4" size="lg">
                      {formatPrice(totalPrice, locale)}
                    </Text>
                  </Box>
                </Group>
              </Card>
            )}

            <Group gap={5} mb="xs" style={{ color: 'rgba(153, 105, 229, 0.8)' }}>
              <IconInfoCircle size={14} />
              <Text size="xs" c="gray.5">Role para ver todos os dados</Text>
            </Group>

            <Card
              withBorder
              p="md"
              radius="md"
              style={{
                backgroundColor: 'rgba(25, 25, 25, 0.6)',
                borderColor: 'rgba(118, 65, 192, 0.2)',
                maxHeight: '200px',
                overflowY: 'auto',
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(153, 105, 229, 0.5) rgba(25, 25, 25, 0.3)',
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgba(25, 25, 25, 0.3)',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgba(153, 105, 229, 0.5)',
                  borderRadius: '4px',
                },
              }}
            >
              <Stack gap="xs">
                <Group justify="apart">
                  <Text fw={500} c="white">Nome:</Text>
                  <Text c="gray.3">{form.values.nome}</Text>
                </Group>

                <Group justify="apart">
                  <Text fw={500} c="white">Email:</Text>
                  <Text c="gray.3">{form.values.email}</Text>
                </Group>

                <Group justify="apart">
                  <Text fw={500} c="white">Telefone:</Text>
                  <Text c="gray.3">{form.values.telefone}</Text>
                </Group>

                {form.values.empresa && (
                  <Group justify="apart">
                    <Text fw={500} c="white">Empresa:</Text>
                    <Text c="gray.3">{form.values.empresa}</Text>
                  </Group>
                )}

                <Group justify="apart">
                  <Text fw={500} c="white">Tipo de Site:</Text>
                  <Text c="gray.3">
                    {form.values.tipoSite === 'landing' && 'Landing Page'}
                    {form.values.tipoSite === 'institucional' && 'Site Institucional'}
                    {form.values.tipoSite === 'ecommerce' && 'E-commerce'}
                    {form.values.tipoSite === 'blog' && 'Blog'}
                    {form.values.tipoSite === 'personalizado' && 'Personalizado'}
                  </Text>
                </Group>

                <Text fw={500} c="white">Descrição:</Text>
                <Text c="gray.3" size="sm" style={{ whiteSpace: 'pre-wrap' }}>{form.values.descricao}</Text>

                {form.values.prazo && (
                  <Group justify="apart">
                    <Text fw={500} c="white">Prazo:</Text>
                    <Text c="gray.3">
                      {form.values.prazo === 'urgente' && 'Urgente (até 15 dias)'}
                      {form.values.prazo === 'normal' && 'Normal (15-30 dias)'}
                      {form.values.prazo === 'flexivel' && 'Flexível (mais de 30 dias)'}
                    </Text>
                  </Group>
                )}

                {form.values.orcamento && (
                  <Group justify="apart">
                    <Text fw={500} c="white">Orçamento:</Text>
                    <Text c="gray.3">
                      {form.values.orcamento === 'ate2k' && 'Até R$ 2.000'}
                      {form.values.orcamento === '2k-5k' && 'R$ 2.000 - R$ 5.000'}
                      {form.values.orcamento === '5k-10k' && 'R$ 5.000 - R$ 10.000'}
                      {form.values.orcamento === '10k-20k' && 'R$ 10.000 - R$ 20.000'}
                      {form.values.orcamento === 'acima20k' && 'Acima de R$ 20.000'}
                      {form.values.orcamento === 'flexivel' && 'Flexível / A definir'}
                    </Text>
                  </Group>
                )}

                <Group justify="apart">
                  <Text fw={500} c="white">Newsletter:</Text>
                  <Text c="gray.3">{form.values.newsletter ? 'Sim' : 'Não'}</Text>
                </Group>

                <Group justify="apart">
                  <Text fw={500} c="white">Contato por WhatsApp:</Text>
                  <Text c="gray.3">{form.values.whatsapp ? 'Sim' : 'Não'}</Text>
                </Group>

                <Divider my="xs" color="dark.6" />

                <Box p="xs" style={{ backgroundColor: 'rgba(255, 50, 50, 0.1)', borderRadius: '4px', border: '1px solid rgba(255, 50, 50, 0.3)' }}>
                  <Group gap={5} align="center">
                    <IconInfoCircle size={16} color="#ff5555" />
                    <Text size="xs" fw={500} c="red.4" ta="center">
                      Os custos de hospedagem, domínio, ferramentas de terceiros e serviços adicionais NÃO estão inclusos no orçamento do site.
                    </Text>
                  </Group>
                </Box>
              </Stack>
            </Card>
          </Stack>
        </div>
      )}
    </Transition>
  );
}
