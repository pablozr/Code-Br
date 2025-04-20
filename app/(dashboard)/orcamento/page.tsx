'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Text,
  TextInput,
  Textarea,
  Button,
  Select,
  Paper,
  Group,
  Box,
  Checkbox,
  Stack,
  Divider,
  Stepper,
  Progress,
  Tooltip,
  ActionIcon,
  rem,
  Transition,
  Loader,
  ThemeIcon,
  Card,
  SimpleGrid,
  Center,
  RingProgress
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { AuroraBackground } from '@/app/_components/ui/aurora-background';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconInfoCircle, IconArrowRight, IconArrowLeft, IconSend, IconBuildingStore, IconDeviceDesktop, IconShoppingCart, IconArticle, IconPencil, IconCalendar, IconCoin, IconUser, IconMail, IconPhone, IconBrandWhatsapp, IconArrowDown } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { z } from 'zod';
import { formFieldStyles } from '@/styles/form-styles';
// import { IMaskInput } from 'react-imask';

// Esquema de validação com Zod
const formSchema = z.object({
  nome: z.string()
    .min(3, { message: 'Nome deve ter pelo menos 3 caracteres' })
    .refine(val => val.trim().length > 0, { message: 'Nome é obrigatório' }),

  email: z.string()
    .email({ message: 'Email inválido' })
    .refine(val => val.trim().length > 0, { message: 'Email é obrigatório' }),

  telefone: z.string()
    .min(8, { message: 'Telefone inválido' })
    .max(20, { message: 'Telefone muito longo' })
    .refine(val => val.trim().length > 0, { message: 'Telefone é obrigatório' })
    .refine(val => /^\+?[0-9\s\(\)\-]+$/.test(val), {
      message: 'Formato inválido. Use apenas números, espaços, parênteses e hífens'
    }),

  empresa: z.string().optional(),

  tipoSite: z.string()
    .min(1, { message: 'Selecione o tipo de site' })
    .refine(val => ['landing', 'institucional', 'ecommerce', 'blog', 'personalizado'].includes(val), {
      message: 'Tipo de site inválido'
    }),

  descricao: z.string()
    .min(10, { message: 'Descrição deve ter pelo menos 10 caracteres' })
    .refine(val => val.trim().length > 0, { message: 'Descrição é obrigatória' }),

  prazo: z.string().optional(),

  orcamento: z.string().optional(),

  newsletter: z.boolean().default(true),

  whatsapp: z.boolean().default(false),
});

// Tipo inferido do esquema Zod
type FormValues = z.infer<typeof formSchema>;

export default function OrcamentoPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [formValid, setFormValid] = useState(false);
  const [animateIn, setAnimateIn] = useState(true);
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Definição das etapas do formulário
  const steps = [
    { title: 'Informações Pessoais', description: 'Seus dados de contato' },
    { title: 'Detalhes do Projeto', description: 'Tipo e descrição do site' },
    { title: 'Preferências', description: 'Prazo e orçamento' },
    { title: 'Revisão', description: 'Confirme seus dados' },
  ];

  const form = useForm<FormValues>({
    initialValues: {
      nome: '',
      email: '',
      telefone: '',
      empresa: '',
      tipoSite: '',
      descricao: '',
      prazo: '',
      orcamento: '',
      newsletter: true,
      whatsapp: false,
    },
    validate: zodResolver(formSchema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  // Função para verificar se a etapa atual é válida
  const isStepValid = (step: number) => {
    switch (step) {
      case 0: // Informações Pessoais
        return (
          !form.errors.nome &&
          form.values.nome.trim() !== '' &&
          !form.errors.email &&
          form.values.email.trim() !== '' &&
          !form.errors.telefone &&
          form.values.telefone.trim() !== ''
        );
      case 1: // Detalhes do Projeto
        return (
          !form.errors.tipoSite &&
          form.values.tipoSite !== '' &&
          !form.errors.descricao &&
          form.values.descricao.trim() !== ''
        );
      case 2: // Preferências
        return true; // Campos opcionais
      case 3: // Revisão
        return true; // Apenas confirmação
      default:
        return false;
    }
  };

  // Atualizar o progresso do formulário
  useEffect(() => {
    // Calcular progresso com base nas etapas concluídas
    if (activeStep === 0) {
      // Na primeira etapa, o progresso é 0 até que os campos sejam preenchidos
      setProgress(isStepValid(0) ? 25 : 0);
    } else {
      // Nas etapas seguintes, o progresso é baseado nas etapas concluídas
      const stepsCompleted = activeStep;
      const progressPerStep = 25; // 25% por etapa (4 etapas = 100%)
      const currentProgress = stepsCompleted * progressPerStep;

      // Adicionar progresso adicional se a etapa atual estiver válida
      const additionalProgress = isStepValid(activeStep) ? progressPerStep : 0;

      setProgress(currentProgress + (activeStep < steps.length - 1 ? additionalProgress : 0));
    }

    // Atualizar validação da etapa atual
    setFormValid(isStepValid(activeStep));
  }, [form.values, activeStep]);

  // Funções para navegar entre as etapas
  const nextStep = () => {
    if (activeStep < steps.length - 1) {
      setAnimateIn(false);
      setTimeout(() => {
        setActiveStep((current) => current + 1);
        setAnimateIn(true);
        // Rolar suavemente para o topo do formulário
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 200);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setAnimateIn(false);
      setTimeout(() => {
        setActiveStep((current) => current - 1);
        setAnimateIn(true);
        // Rolar suavemente para o topo do formulário
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 200);
    }
  };

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);

    try {
      // Enviar dados para a API
      const response = await fetch('/api/orcamento', {
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

      console.log('Formulário enviado com sucesso:', values);

      // Mostrar notificação de sucesso
      notifications.show({
        title: 'Orçamento enviado com sucesso!',
        message: 'Entraremos em contato em breve.',
        color: 'green',
        icon: <IconCheck size="1.1rem" />,
        autoClose: 5000,
      });

      setSubmitted(true);
      form.reset();
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);

      // Mostrar notificação de erro
      notifications.show({
        title: 'Erro ao enviar orçamento',
        message: error instanceof Error ? error.message : 'Ocorreu um erro ao processar sua solicitação.',
        color: 'red',
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Renderiza o conteúdo de cada etapa do formulário
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
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
                    <TextInput
                      label="Nome"
                      placeholder="Seu nome completo"
                      withAsterisk
                      leftSection={<IconUser size={16} />}
                      {...form.getInputProps('nome')}
                      styles={formFieldStyles}
                    />

                    <TextInput
                      label="Email"
                      placeholder="seu.email@exemplo.com"
                      withAsterisk
                      leftSection={<IconMail size={16} />}
                      {...form.getInputProps('email')}
                      styles={formFieldStyles}
                    />
                  </SimpleGrid>

                  <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                    <TextInput
                      label="Telefone"
                      placeholder="+55 (00) 00000-0000"
                      description="Inclua o código do país (ex: +55 para Brasil)"
                      withAsterisk
                      leftSection={<IconPhone size={16} />}
                      {...form.getInputProps('telefone')}
                      styles={formFieldStyles}
                      // Removendo a máscara para permitir formatos internacionais variados
                      // component={IMaskInput}
                      // mask="+00 (00) 00000-0000"
                      // unmask={false}
                      // lazy={false}
                    />

                    <TextInput
                      label="Empresa"
                      placeholder="Nome da sua empresa (opcional)"
                      leftSection={<IconBuildingStore size={16} />}
                      {...form.getInputProps('empresa')}
                      styles={formFieldStyles}
                    />
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

      case 1:
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
                    styles={formFieldStyles}
                  />

                  <Textarea
                    label="Descrição do Projeto"
                    placeholder="Descreva o que você precisa para o seu site..."
                    withAsterisk
                    minRows={4}
                    leftSection={<IconPencil size={16} />}
                    {...form.getInputProps('descricao')}
                    styles={formFieldStyles}
                  />
                </Stack>
              </div>
            )}
          </Transition>
        );

      case 2:
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

      case 3:
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

      default:
        return null;
    }
  };

  return (
    <AuroraBackground>
      <Container size="md" py={60}>
        <Paper
          p="xl"
          radius="lg"
          style={{
            backgroundColor: 'rgba(15, 15, 15, 0.8)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(153, 105, 229, 0.2)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Efeito de borda brilhante */}
          <Box
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '0.5rem',
              padding: '1px',
              background: 'linear-gradient(135deg, rgba(153, 105, 229, 0.3), transparent, rgba(153, 105, 229, 0.3))',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              opacity: 0.5,
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />

          {submitted ? (
            <Stack gap="xl" align="center" py={30} style={{ position: 'relative', zIndex: 1 }}>
              <Center>
                <RingProgress
                  size={120}
                  thickness={10}
                  roundCaps
                  sections={[{ value: 100, color: 'rgba(153, 105, 229, 0.8)' }]}
                  label={
                    <Center>
                      <ThemeIcon color="rgba(153, 105, 229, 0.8)" variant="light" radius="xl" size="xl">
                        <IconCheck style={{ width: rem(30), height: rem(30) }} />
                      </ThemeIcon>
                    </Center>
                  }
                />
              </Center>

              <Title
                order={2}
                style={{
                  color: 'white',
                  fontSize: '2rem',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #fff, #9969E5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textAlign: 'center',
                }}
              >
                Orçamento Enviado com Sucesso!
              </Title>

              <Text size="lg" c="gray.3" ta="center" maw={600} mx="auto" mt="md">
                Agradecemos pelo seu interesse! Nossa equipe analisará sua solicitação e entrará em contato em breve.
              </Text>

              <Divider my="xl" w="100%" color="dark.6" />

              <Button
                variant="gradient"
                gradient={{ from: 'rgba(118,65,192,0.9)', to: 'rgba(153,105,229,0.9)', deg: 135 }}
                size="lg"
                onClick={() => {
                  setSubmitted(false);
                  setActiveStep(0);
                  form.reset();
                }}
                style={{
                  marginTop: 20,
                  boxShadow: '0 4px 15px -3px rgba(118,65,192,0.3)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                leftSection={<IconArrowLeft size={16} />}
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
                <Text style={{ position: 'relative', zIndex: 1 }}>Solicitar Novo Orçamento</Text>
              </Button>
            </Stack>
          ) : (
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="xl" style={{ position: 'relative', zIndex: 1 }}>
                <Title
                  order={2}
                  style={{
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #fff, #9969E5)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Solicite um Orçamento
                </Title>

                <Text size="md" c="gray.3">
                  Preencha o formulário abaixo para receber um orçamento personalizado para o seu projeto.
                </Text>

                {/* Barra de progresso */}
                <Box mt="xs">
                  <Group justify="apart" mb={5}>
                    <Text size="sm" c="gray.5">Progresso</Text>
                    <Text size="sm" c="gray.5">{progress}%</Text>
                  </Group>
                  <Progress
                    value={progress}
                    size="sm"
                    radius="xl"
                    color="rgba(153, 105, 229, 0.8)"
                    styles={{
                      root: { backgroundColor: 'rgba(25, 25, 25, 0.6)' },
                      // bar: { transition: 'width 0.5s ease-in-out' },
                    }}
                    striped
                    animated={progress > 0}
                  />
                </Box>

                {/* Stepper */}
                <Stepper
                  active={activeStep}
                  onStepClick={setActiveStep}
                  // breakpoint="sm"
                  allowNextStepsSelect={false}
                  styles={{
                    root: { padding: '10px 0' },
                    separator: { backgroundColor: 'rgba(118, 65, 192, 0.3)' },
                    // separatorActive: { backgroundColor: 'rgba(153, 105, 229, 0.8)' },
                    step: { padding: 0 },
                    stepIcon: {
                      backgroundColor: 'rgba(25, 25, 25, 0.6)',
                      borderColor: 'rgba(118, 65, 192, 0.3)',
                      color: 'white',
                    },
                    // stepIconActive: {
                    //   backgroundColor: 'rgba(153, 105, 229, 0.8)',
                    //   borderColor: 'rgba(153, 105, 229, 0.8)',
                    // },
                    stepLabel: { color: 'white' },
                    stepDescription: { color: 'gray.5' },
                  }}
                >
                  {steps.map((step, index) => (
                    <Stepper.Step
                      key={index}
                      label={!isMobile ? step.title : null}
                      description={!isMobile ? step.description : null}
                      completedIcon={<IconCheck size={18} />}
                    />
                  ))}
                </Stepper>

                <Divider my="xs" color="dark.6" />

                {/* Conteúdo do formulário baseado na etapa atual */}
                <Box py="md">
                  {renderStepContent()}
                </Box>

                {/* Espaçamento negativo para subir os botões */}
                {activeStep === 3 && <Box mt="-60px" />}

                {/* Botões de navegação */}
                {activeStep === steps.length - 1 ? (
                  <Group justify="apart" mt="-20px">
                    <Button
                      variant="default"
                      onClick={prevStep}
                      leftSection={<IconArrowLeft size={16} />}
                      style={{
                        backgroundColor: 'rgba(25, 25, 25, 0.6)',
                        borderColor: 'rgba(118, 65, 192, 0.3)',
                        color: 'white',
                      }}
                    >
                      Voltar
                    </Button>

                    {/* Botão de enviar destacado */}
                    <Button
                      type="submit"
                      variant="gradient"
                      gradient={{ from: 'rgba(118,65,192,0.9)', to: 'rgba(153,105,229,0.9)', deg: 135 }}
                      loading={loading}
                      rightSection={loading ? null : <IconSend size={16} />}
                      style={{
                        boxShadow: '0 4px 15px -3px rgba(118,65,192,0.3)',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {!loading && (
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
                      )}
                      <Text style={{ position: 'relative', zIndex: 1 }}>Enviar Solicitação</Text>
                    </Button>
                  </Group>
                ) : (
                  <Group justify="apart" mt="xl">
                    <Button
                      variant="default"
                      onClick={prevStep}
                      disabled={activeStep === 0}
                      leftSection={<IconArrowLeft size={16} />}
                      style={{
                        backgroundColor: 'rgba(25, 25, 25, 0.6)',
                        borderColor: 'rgba(118, 65, 192, 0.3)',
                        color: 'white',
                      }}
                    >
                      Voltar
                    </Button>
                    <Button
                      onClick={nextStep}
                      disabled={!formValid}
                      rightSection={<IconArrowRight size={16} />}
                      variant="gradient"
                      gradient={{ from: 'rgba(118,65,192,0.9)', to: 'rgba(153,105,229,0.9)', deg: 135 }}
                      style={{
                        boxShadow: '0 4px 15px -3px rgba(118,65,192,0.3)',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
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
                      <Text style={{ position: 'relative', zIndex: 1 }}>Próximo</Text>
                    </Button>
                  </Group>
                )}

                {/* Dicas de ajuda */}
                <Box mt="xs">
                  <Group gap={5} style={{ color: 'rgba(153, 105, 229, 0.8)' }}>
                    <IconInfoCircle size={16} />
                    <Text size="xs" c="gray.5">
                      {activeStep === 0 && 'Preencha seus dados de contato para que possamos entrar em contato com você.'}
                      {activeStep === 1 && 'Descreva o tipo de site que você precisa e seus requisitos principais.'}
                      {activeStep === 2 && 'Informações adicionais nos ajudam a personalizar nossa proposta.'}
                      {activeStep === 3 && 'Verifique se todas as informações estão corretas antes de enviar.'}
                    </Text>
                  </Group>
                </Box>
              </Stack>
            </form>
          )}
        </Paper>
      </Container>
    </AuroraBackground>
  );
}
