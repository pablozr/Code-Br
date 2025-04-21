'use client';

import { useState, useEffect } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import {
  Stack,
  Title,
  Text,
  Button,
  Box,
  Group,
  Progress,
  Stepper,
  Divider,
  Center,
  RingProgress,
  ThemeIcon,
  rem,
} from '@mantine/core';
import { IconCheck, IconInfoCircle, IconArrowRight, IconArrowLeft, IconSend } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { quoteFormSchema, QuoteFormValues } from '@/app/_lib/validation/forms/quote-form-schema';
import { PersonalInfoStep, ProjectDetailsStep, PreferencesStep, ReviewStep } from './QuoteFormSteps';

export function QuoteForm() {
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

  const form = useForm<QuoteFormValues>({
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
    validate: zodResolver(quoteFormSchema),
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

  const handleSubmit = async (values: QuoteFormValues) => {
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
        return <PersonalInfoStep form={form} animateIn={animateIn} />;
      case 1:
        return <ProjectDetailsStep form={form} animateIn={animateIn} />;
      case 2:
        return <PreferencesStep form={form} animateIn={animateIn} />;
      case 3:
        return <ReviewStep form={form} animateIn={animateIn} />;
      default:
        return null;
    }
  };

  if (submitted) {
    return (
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
    );
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="xl" style={{ position: 'relative', zIndex: 1 }}>
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
            }}
            striped
            animated={progress > 0}
          />
        </Box>

        {/* Stepper */}
        <Stepper
          active={activeStep}
          onStepClick={setActiveStep}
          allowNextStepsSelect={false}
          styles={{
            root: { padding: '10px 0' },
            separator: { backgroundColor: 'rgba(118, 65, 192, 0.3)' },
            step: { padding: 0 },
            stepIcon: {
              backgroundColor: 'rgba(25, 25, 25, 0.6)',
              borderColor: 'rgba(118, 65, 192, 0.3)',
              color: 'white',
            },
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
  );
}
