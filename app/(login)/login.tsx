'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button, TextInput, PasswordInput, Box, Title, Text, Group, ThemeIcon, Divider, Container, Paper, Stack } from '@mantine/core';
import { IconCode, IconLoader2, IconBrandGoogle, IconBrandGithub, IconArrowRight } from '@tabler/icons-react';
import { signIn, signUp } from './actions';
import { ActionState } from '@/lib/auth/middleware';
import { motion } from 'framer-motion';

// Componentes com animação
const MotionBox = motion(Box);
const MotionPaper = motion(Paper);
const MotionText = motion(Text);
const MotionTitle = motion(Title);
const MotionGroup = motion(Group);

export function Login({ mode = 'signin' }: { mode?: 'signin' | 'signup' }) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const priceId = searchParams.get('priceId');
  const inviteId = searchParams.get('inviteId');
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    mode === 'signin' ? signIn : signUp,
    { error: '' }
  );

  return (
    <Box
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, rgba(10,10,10,1) 0%, rgba(20,20,20,1) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid effect */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.05,
          backgroundImage: `
            linear-gradient(rgba(153,105,229,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(153,105,229,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
          zIndex: 0,
        }}
      />

      {/* Background gradient */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(118,65,192,0.1) 0%, rgba(118,65,192,0) 70%)',
          zIndex: 0,
        }}
      />

      {/* Animated particles */}
      {Array.from({ length: 10 }).map((_, i) => {
        const size = (i % 3) + 1;
        const left = (i * 10) % 100;
        const top = (i * 8) % 100;
        const delay = i * 0.2;

        return (
          <MotionBox
            key={i}
            style={{
              position: 'absolute',
              width: size,
              height: size,
              borderRadius: '50%',
              background: 'rgba(153,105,229,0.6)',
              boxShadow: '0 0 5px rgba(153,105,229,0.3)',
              left: `${left}%`,
              top: `${top}%`,
              zIndex: 0,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      })}

      <Container size="xs" style={{ position: 'relative', zIndex: 1 }}>
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '2rem' }}
        >
          <MotionGroup
            justify="center"
            mb="md"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
          >
            <Box
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 70,
                height: 70,
              }}
            >
              <Box
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(118,65,192,0.2), rgba(153,105,229,0.2))',
                  filter: 'blur(8px)',
                  animation: 'pulse 3s infinite',
                }}
              />
              <ThemeIcon
                size={60}
                radius="xl"
                variant="gradient"
                gradient={{ from: 'rgba(118,65,192,0.9)', to: 'rgba(153,105,229,0.9)', deg: 135 }}
                style={{
                  boxShadow: '0 5px 15px rgba(0,0,0,0.2), 0 0 20px rgba(153,105,229,0.3)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <IconCode size={30} stroke={1.5} />
              </ThemeIcon>
            </Box>
          </MotionGroup>

          <MotionTitle
            order={2}
            fw={800}
            style={{
              background: 'linear-gradient(90deg, #fff, #9969E5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '0.5rem',
              fontSize: '2.2rem',
              letterSpacing: '-0.5px',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {mode === 'signin' ? 'Bem-vindo de volta' : 'Crie sua conta'}
          </MotionTitle>

          <MotionText
            c="gray.5"
            size="lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {mode === 'signin'
              ? 'Entre com suas credenciais para acessar o painel'
              : 'Preencha os dados abaixo para criar sua conta'}
          </MotionText>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <MotionPaper
            p="xl"
            radius="lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{
              backgroundColor: 'rgba(25, 25, 25, 0.5)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(153, 105, 229, 0.2)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
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
              }}
            />

            {/* Efeito de brilho */}
            <Box
              style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'linear-gradient(45deg, transparent, rgba(153, 105, 229, 0.03), transparent)',
                transform: 'rotate(45deg)',
                animation: 'shine 6s infinite',
                zIndex: 0,
              }}
            />
            <form action={formAction}>
              <input type="hidden" name="redirect" value={redirect || ''} />
              <input type="hidden" name="priceId" value={priceId || ''} />
              <input type="hidden" name="inviteId" value={inviteId || ''} />

              <Stack spacing="md" style={{ position: 'relative', zIndex: 1 }}>
                <Box style={{ position: 'relative' }}>
                  <TextInput
                    name="email"
                    type="email"
                    label="E-mail"
                    placeholder="seu@email.com"
                    required
                    defaultValue={state.email || ''}
                    maxLength={50}
                    icon={<IconBrandGoogle size={16} stroke={1.5} />}
                    styles={{
                      root: {
                        transition: 'transform 0.2s ease',
                        '&:focus-within': {
                          transform: 'translateY(-2px)',
                        },
                      },
                      input: {
                        backgroundColor: 'rgba(20, 20, 20, 0.6)',
                        borderColor: 'rgba(153, 105, 229, 0.2)',
                        color: 'white',
                        height: '45px',
                        '&:focus': {
                          borderColor: 'rgba(153, 105, 229, 0.5)',
                          boxShadow: '0 0 0 1px rgba(153, 105, 229, 0.3)',
                        },
                      },
                      label: {
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontWeight: 500,
                        marginBottom: '6px',
                        fontSize: '0.9rem',
                      },
                    }}
                  />
                </Box>

                <Box style={{ position: 'relative' }}>
                  <PasswordInput
                    name="password"
                    label="Senha"
                    placeholder="Sua senha"
                    required
                    defaultValue={state.password || ''}
                    minLength={8}
                    maxLength={100}
                    styles={{
                      root: {
                        transition: 'transform 0.2s ease',
                        '&:focus-within': {
                          transform: 'translateY(-2px)',
                        },
                      },
                      input: {
                        backgroundColor: 'rgba(20, 20, 20, 0.6)',
                        borderColor: 'rgba(153, 105, 229, 0.2)',
                        color: 'white',
                        height: '45px',
                        '&:focus': {
                          borderColor: 'rgba(153, 105, 229, 0.5)',
                          boxShadow: '0 0 0 1px rgba(153, 105, 229, 0.3)',
                        },
                      },
                      label: {
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontWeight: 500,
                        marginBottom: '6px',
                        fontSize: '0.9rem',
                      },
                      innerInput: {
                        color: 'white',
                      },
                      visibilityToggle: {
                        color: 'rgba(153, 105, 229, 0.7)',
                        '&:hover': {
                          color: 'rgba(153, 105, 229, 1)',
                        },
                      },
                    }}
                  />
                </Box>

                {mode === 'signin' && (
                  <Box ta="right">
                    <Text
                      component="a"
                      href="#"
                      size="sm"
                      c="purple.4"
                      style={{
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      Esqueceu sua senha?
                    </Text>
                  </Box>
                )}

                {state?.error && (
                  <MotionBox
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      backgroundColor: 'rgba(255, 59, 48, 0.1)',
                      border: '1px solid rgba(255, 59, 48, 0.2)',
                      borderRadius: '8px',
                      padding: '10px 12px',
                    }}
                  >
                    <Text c="red.5" size="sm">
                      {state.error}
                    </Text>
                  </MotionBox>
                )}

                <Button
                  type="submit"
                  variant="gradient"
                  gradient={{ from: 'rgba(118,65,192,0.9)', to: 'rgba(153,105,229,0.9)', deg: 135 }}
                  size="md"
                  radius="xl"
                  fullWidth
                  disabled={pending}
                  rightSection={pending ? <IconLoader2 size={18} className="animate-spin" /> : <IconArrowRight size={18} />}
                  style={{
                    marginTop: '1.5rem',
                    height: '48px',
                    boxShadow: '0 4px 15px -3px rgba(118,65,192,0.3)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 20px -4px rgba(118,65,192,0.4)',
                    },
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
                  <Text style={{ position: 'relative', zIndex: 1, fontWeight: 600 }}>
                    {pending ? 'Processando...' : mode === 'signin' ? 'Entrar' : 'Criar conta'}
                  </Text>
                </Button>

                <Divider
                  my="xl"
                  label="ou continue com"
                  labelPosition="center"
                  styles={{
                    label: {
                      color: 'rgba(255, 255, 255, 0.5)',
                      fontSize: '0.8rem',
                      padding: '0 15px',
                      backgroundColor: 'rgba(25, 25, 25, 0.5)',
                    },
                    root: {
                      borderTopColor: 'rgba(153, 105, 229, 0.1)',
                      marginTop: '30px',
                      marginBottom: '25px',
                    },
                  }}
                />

                <MotionGroup
                  grow
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Button
                    variant="outline"
                    leftSection={<IconBrandGoogle size={18} stroke={1.5} />}
                    radius="xl"
                    styles={{
                      root: {
                        borderColor: 'rgba(153, 105, 229, 0.2)',
                        color: 'white',
                        height: '45px',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(153, 105, 229, 0.1)',
                          borderColor: 'rgba(153, 105, 229, 0.3)',
                          transform: 'translateY(-2px)',
                        },
                      },
                    }}
                  >
                    Google
                  </Button>

                  <Button
                    variant="outline"
                    leftSection={<IconBrandGithub size={18} stroke={1.5} />}
                    radius="xl"
                    styles={{
                      root: {
                        borderColor: 'rgba(153, 105, 229, 0.2)',
                        color: 'white',
                        height: '45px',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(153, 105, 229, 0.1)',
                          borderColor: 'rgba(153, 105, 229, 0.3)',
                          transform: 'translateY(-2px)',
                        },
                      },
                    }}
                  >
                    GitHub
                  </Button>
                </MotionGroup>
              </Stack>
            </form>
          </MotionPaper>

          <MotionBox
            mt="xl"
            ta="center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Text c="gray.5" size="sm">
              {mode === 'signin' ? 'Não tem uma conta?' : 'Já possui uma conta?'}{' '}
              <Link
                href={`${mode === 'signin' ? '/sign-up' : '/sign-in'}${
                  redirect ? `?redirect=${redirect}` : ''
                }${priceId ? `&priceId=${priceId}` : ''}`}
                style={{
                  color: '#9969E5',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: '#7641C0',
                    textDecoration: 'underline',
                  },
                }}
              >
                {mode === 'signin' ? 'Registre-se agora' : 'Faça login'}
              </Link>
            </Text>

            <Text c="gray.6" size="xs" mt="md">
              Ao continuar, você concorda com nossos{' '}
              <Text component="a" href="#" c="purple.4" span style={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Termos de Serviço
              </Text>{' '}
              e{' '}
              <Text component="a" href="#" c="purple.4" span style={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Política de Privacidade
              </Text>
            </Text>
          </MotionBox>
        </MotionBox>
      </Container>
    </Box>
  );
}
