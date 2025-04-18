'use client';

import { Box, Container, Group, Text, ThemeIcon, SimpleGrid, Title, Flex, Badge } from '@mantine/core';
import {
  IconShieldCheck,
  IconRocket,
  IconCertificate,
  IconClockHour4,
  IconBrandGithub,
  IconBrandAws,
  IconBrandCloudflare,
  IconBrandStripe,
  IconBrandGoogle,
  IconLock,
  IconShieldLock,
  IconAlertCircle,
  IconCheck,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconWorld,
  IconCertificate2,
  IconAward,
  IconStars,
  IconDatabase,
  IconHeadset,
  IconMessages,
  IconTicket,
  IconPalette,
  IconCode,
  IconBrush,
  IconLayoutGrid,
  IconPhoto,
  IconSettings,
  IconArrowRight,
  IconDeviceAnalytics
} from '@tabler/icons-react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box as any);
const MotionThemeIcon = motion(ThemeIcon as any);
const MotionGroup = motion(Group as any);
const MotionFlex = motion(Flex as any);
const MotionBadge = motion(Badge as any);

// Componente de mockup para smartphone com recursos de segurança
function SecurityDashboardMockup() {
  return (
    <Box style={{ height: '100%' }}>
      <Flex direction="column" gap="md" style={{ height: '100%' }}>
        {/* Smartphone frame */}
        <Box
          style={{
            width: '100%',
            maxWidth: '220px',
            margin: '0 auto',
            borderRadius: '24px',
            background: 'rgba(30, 30, 30, 0.8)',
            border: '3px solid rgba(60, 60, 60, 0.8)',
            padding: '8px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Notch */}
          <Box
            style={{
              width: '50px',
              height: '12px',
              borderRadius: '0 0 10px 10px',
              background: 'rgba(20, 20, 20, 0.9)',
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 2,
            }}
          />

          {/* Screen */}
          <Box
            style={{
              borderRadius: '18px',
              background: 'linear-gradient(145deg, rgba(118,65,192,0.1), rgba(30,30,30,0.9))',
              overflow: 'hidden',
              padding: '20px 12px 12px',
              minHeight: '240px',
            }}
          >
            {/* App header */}
            <Flex justify="space-between" align="center" mb="xs">
              <Text size="xs" fw={700} c="white">Segurança</Text>
              <IconSettings size={14} style={{ color: '#9969E5' }} />
            </Flex>

            {/* Security status */}
            <Box
              style={{
                textAlign: 'center',
                padding: '15px 0',
                background: 'rgba(20, 20, 20, 0.4)',
                borderRadius: '12px',
                marginBottom: '10px',
              }}
            >
              <IconShieldCheck size={32} style={{ color: '#9969E5', marginBottom: '5px' }} />
              <Text size="xs" fw={700} c="white">Proteção Ativa</Text>
              <Text size="xs" c="dimmed">Seu site está protegido</Text>
            </Box>

            {/* Features */}
            <Flex direction="column" gap="xs">
              <Flex
                style={{
                  padding: '8px 10px',
                  borderRadius: '8px',
                  background: 'rgba(118, 65, 192, 0.1)',
                }}
                align="center"
                justify="space-between"
              >
                <Flex align="center" gap="xs">
                  <IconLock size={14} style={{ color: '#9969E5' }} />
                  <Text size="xs">SSL Ativado</Text>
                </Flex>
                <IconCheck size={12} style={{ color: '#9969E5' }} />
              </Flex>

              <Flex
                style={{
                  padding: '8px 10px',
                  borderRadius: '8px',
                  background: 'rgba(118, 65, 192, 0.1)',
                }}
                align="center"
                justify="space-between"
              >
                <Flex align="center" gap="xs">
                  <IconDatabase size={14} style={{ color: '#9969E5' }} />
                  <Text size="xs">Backups Diários</Text>
                </Flex>
                <IconCheck size={12} style={{ color: '#9969E5' }} />
              </Flex>

              <Flex
                style={{
                  padding: '8px 10px',
                  borderRadius: '8px',
                  background: 'rgba(118, 65, 192, 0.1)',
                }}
                align="center"
                justify="space-between"
              >
                <Flex align="center" gap="xs">
                  <IconShieldLock size={14} style={{ color: '#9969E5' }} />
                  <Text size="xs">Firewall</Text>
                </Flex>
                <IconCheck size={12} style={{ color: '#9969E5' }} />
              </Flex>
            </Flex>
          </Box>
        </Box>

        {/* Features list */}
        <Box style={{ flex: 1 }}>
          <Text size="xs" fw={500} c="white" mb="xs" ta="center">Recursos de Segurança</Text>
          <Flex direction="column" gap="xs">
            <Flex align="center" gap="xs">
              <IconCheck size={12} style={{ color: '#9969E5' }} />
              <Text size="xs">Proteção contra ataques DDoS</Text>
            </Flex>
            <Flex align="center" gap="xs">
              <IconCheck size={12} style={{ color: '#9969E5' }} />
              <Text size="xs">Certificados SSL gratuitos</Text>
            </Flex>
            <Flex align="center" gap="xs">
              <IconCheck size={12} style={{ color: '#9969E5' }} />
              <Text size="xs">Monitoramento 24/7</Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

// Componente de mockup para smartphone com design responsivo
function PerformanceMetricsMockup() {
  return (
    <Box style={{ height: '100%' }}>
      <Flex direction="column" gap="md" style={{ height: '100%' }}>
        {/* Dispositivos responsivos */}
        <Flex justify="center" gap="md" wrap="wrap">
          {/* Smartphone */}
          <Box
            style={{
              width: '80px',
              borderRadius: '12px',
              background: 'rgba(30, 30, 30, 0.8)',
              border: '2px solid rgba(60, 60, 60, 0.8)',
              padding: '4px',
              position: 'relative',
            }}
          >
            <Box
              style={{
                borderRadius: '8px',
                background: 'linear-gradient(145deg, rgba(118,65,192,0.1), rgba(30,30,30,0.9))',
                overflow: 'hidden',
                padding: '8px 4px',
                height: '120px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box
                style={{
                  width: '100%',
                  height: '6px',
                  background: 'rgba(118, 65, 192, 0.2)',
                  borderRadius: '3px',
                  marginBottom: '4px',
                }}
              />
              <Box
                style={{
                  width: '70%',
                  height: '40px',
                  background: 'rgba(118, 65, 192, 0.15)',
                  borderRadius: '4px',
                  marginBottom: '4px',
                }}
              />
              <Box
                style={{
                  width: '100%',
                  height: '20px',
                  background: 'rgba(118, 65, 192, 0.1)',
                  borderRadius: '4px',
                  marginBottom: '4px',
                }}
              />
              <Box
                style={{
                  width: '90%',
                  height: '10px',
                  background: 'rgba(118, 65, 192, 0.1)',
                  borderRadius: '3px',
                }}
              />
            </Box>
            <Text size="xs" c="dimmed" ta="center" mt="xs">Mobile</Text>
          </Box>

          {/* Tablet */}
          <Box
            style={{
              width: '100px',
              borderRadius: '12px',
              background: 'rgba(30, 30, 30, 0.8)',
              border: '2px solid rgba(60, 60, 60, 0.8)',
              padding: '4px',
              position: 'relative',
            }}
          >
            <Box
              style={{
                borderRadius: '8px',
                background: 'linear-gradient(145deg, rgba(118,65,192,0.1), rgba(30,30,30,0.9))',
                overflow: 'hidden',
                padding: '8px 4px',
                height: '120px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box
                style={{
                  width: '100%',
                  height: '8px',
                  background: 'rgba(118, 65, 192, 0.2)',
                  borderRadius: '3px',
                  marginBottom: '4px',
                }}
              />
              <Flex gap="4px">
                <Box
                  style={{
                    width: '30%',
                    height: '60px',
                    background: 'rgba(118, 65, 192, 0.15)',
                    borderRadius: '4px',
                  }}
                />
                <Box
                  style={{
                    width: '65%',
                    height: '60px',
                    background: 'rgba(118, 65, 192, 0.1)',
                    borderRadius: '4px',
                  }}
                />
              </Flex>
              <Box
                style={{
                  width: '100%',
                  height: '20px',
                  background: 'rgba(118, 65, 192, 0.1)',
                  borderRadius: '4px',
                  marginTop: '4px',
                }}
              />
            </Box>
            <Text size="xs" c="dimmed" ta="center" mt="xs">Tablet</Text>
          </Box>
        </Flex>

        {/* Texto de otimização */}
        <Box
          style={{
            background: 'rgba(118, 65, 192, 0.1)',
            borderRadius: '8px',
            padding: '10px',
            border: '1px solid rgba(118, 65, 192, 0.2)',
          }}
        >
          <Flex align="center" gap="xs" mb="xs">
            <IconDeviceAnalytics size={16} style={{ color: '#9969E5' }} />
            <Text size="xs" fw={700} c="white">Design Responsivo</Text>
          </Flex>
          <Text size="xs" c="dimmed">Seu site se adapta perfeitamente a qualquer dispositivo, garantindo uma experiência ideal para todos os visitantes.</Text>
        </Box>

        {/* Features list */}
        <Box style={{ flex: 1 }}>
          <Text size="xs" fw={500} c="white" mb="xs" ta="center">Benefícios</Text>
          <Flex direction="column" gap="xs">
            <Flex align="center" gap="xs">
              <IconCheck size={12} style={{ color: '#9969E5' }} />
              <Text size="xs">Carregamento rápido em todos os dispositivos</Text>
            </Flex>
            <Flex align="center" gap="xs">
              <IconCheck size={12} style={{ color: '#9969E5' }} />
              <Text size="xs">Otimização para SEO</Text>
            </Flex>
            <Flex align="center" gap="xs">
              <IconCheck size={12} style={{ color: '#9969E5' }} />
              <Text size="xs">Melhor experiência do usuário</Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

// Componente de mockup para interface de design
function QualityCertificateMockup() {
  return (
    <Box style={{ height: '100%' }}>
      <Flex direction="column" gap="md" style={{ height: '100%' }}>
        {/* Design interface mockup */}
        <Box
          style={{
            background: 'rgba(30, 30, 30, 0.7)',
            borderRadius: '12px',
            padding: '12px',
            border: '1px solid rgba(60, 60, 60, 0.8)',
          }}
        >
          {/* Toolbar */}
          <Flex justify="space-between" align="center" mb="xs">
            <Flex gap="6px">
              <Box style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF5F57' }} />
              <Box style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FEBC2E' }} />
              <Box style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28C840' }} />
            </Flex>
            <Text size="xs" c="dimmed">Design Studio</Text>
            <Box style={{ width: '24px' }} />
          </Flex>

          {/* Design canvas */}
          <Box
            style={{
              background: 'rgba(20, 20, 20, 0.6)',
              borderRadius: '8px',
              padding: '10px',
              marginBottom: '8px',
            }}
          >
            <Flex gap="8px">
              {/* Tools panel */}
              <Box
                style={{
                  width: '24px',
                  background: 'rgba(40, 40, 40, 0.8)',
                  borderRadius: '4px',
                  padding: '4px 0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <IconBrush size={14} style={{ color: '#9969E5' }} />
                <IconPalette size={14} style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
                <IconLayoutGrid size={14} style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
                <IconPhoto size={14} style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
              </Box>

              {/* Canvas */}
              <Box
                style={{
                  flex: 1,
                  background: 'linear-gradient(145deg, rgba(118,65,192,0.05), rgba(20,20,20,0.8))',
                  borderRadius: '4px',
                  padding: '6px',
                  minHeight: '100px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                {/* Design elements */}
                <Box
                  style={{
                    width: '70%',
                    height: '10px',
                    background: 'rgba(118, 65, 192, 0.3)',
                    borderRadius: '2px',
                  }}
                />
                <Box
                  style={{
                    width: '90%',
                    height: '30px',
                    background: 'rgba(118, 65, 192, 0.2)',
                    borderRadius: '4px',
                  }}
                />
                <Flex gap="4px">
                  <Box
                    style={{
                      width: '30px',
                      height: '30px',
                      background: 'rgba(118, 65, 192, 0.4)',
                      borderRadius: '4px',
                    }}
                  />
                  <Box
                    style={{
                      flex: 1,
                      height: '30px',
                      background: 'rgba(118, 65, 192, 0.15)',
                      borderRadius: '4px',
                    }}
                  />
                </Flex>
              </Box>
            </Flex>
          </Box>

          {/* Color palette */}
          <Flex gap="4px" justify="center">
            <Box style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#7641C0' }} />
            <Box style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#9969E5' }} />
            <Box style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#FFFFFF' }} />
            <Box style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#333333' }} />
            <Box style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#111111' }} />
          </Flex>
        </Box>

        {/* Design principles */}
        <Box
          style={{
            background: 'rgba(118, 65, 192, 0.1)',
            borderRadius: '8px',
            padding: '10px',
            border: '1px solid rgba(118, 65, 192, 0.2)',
          }}
        >
          <Flex align="center" gap="xs" mb="xs">
            <IconPalette size={16} style={{ color: '#9969E5' }} />
            <Text size="xs" fw={700} c="white">Design Moderno</Text>
          </Flex>
          <Text size="xs" c="dimmed">Criamos designs elegantes e contemporâneos que valorizam sua marca e encantam seus visitantes.</Text>
        </Box>

        {/* Features list */}
        <Box style={{ flex: 1 }}>
          <Text size="xs" fw={500} c="white" mb="xs" ta="center">Nosso Processo</Text>
          <Flex direction="column" gap="xs">
            <Flex align="center" gap="xs">
              <IconCheck size={12} style={{ color: '#9969E5' }} />
              <Text size="xs">Estudo da identidade visual</Text>
            </Flex>
            <Flex align="center" gap="xs">
              <IconCheck size={12} style={{ color: '#9969E5' }} />
              <Text size="xs">Wireframes e protótipos</Text>
            </Flex>
            <Flex align="center" gap="xs">
              <IconCheck size={12} style={{ color: '#9969E5' }} />
              <Text size="xs">Design responsivo e acessível</Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

// Componente de mockup para desenvolvimento web
// Componente de mockup para status do servidor
function ServerStatusMockup() {
  return (
    <Box style={{ height: '100%' }}>
      <Flex direction="column" gap="md" style={{ height: '100%' }}>
        <DevelopmentFeaturesMockup />
      </Flex>
    </Box>
  );
}

function DevelopmentFeaturesMockup() {
  return (
    <Box style={{ height: '100%' }}>
      <Flex direction="column" gap="md" style={{ height: '100%' }}>
        {/* Code editor mockup */}
        <Box
          style={{
            background: 'rgba(30, 30, 30, 0.7)',
            borderRadius: '12px',
            padding: '12px',
            border: '1px solid rgba(60, 60, 60, 0.8)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Editor tabs */}
          <Flex gap="2px" mb="xs">
            <Box
              style={{
                padding: '4px 10px',
                borderRadius: '4px 4px 0 0',
                background: 'rgba(118, 65, 192, 0.2)',
                fontSize: '10px',
                color: 'white',
              }}
            >
              product.tsx
            </Box>
            <Box
              style={{
                padding: '4px 10px',
                borderRadius: '4px 4px 0 0',
                background: 'rgba(40, 40, 40, 0.5)',
                fontSize: '10px',
                color: 'rgba(255, 255, 255, 0.6)',
              }}
            >
              shopify.ts
            </Box>
            <Box
              style={{
                padding: '4px 10px',
                borderRadius: '4px 4px 0 0',
                background: 'rgba(40, 40, 40, 0.5)',
                fontSize: '10px',
                color: 'rgba(255, 255, 255, 0.6)',
              }}
            >
              api.ts
            </Box>
          </Flex>

          {/* Code editor */}
          <Box
            style={{
              background: 'rgba(20, 20, 20, 0.8)',
              borderRadius: '4px',
              padding: '10px',
              fontFamily: 'monospace',
              fontSize: '10px',
              height: '120px',
              overflow: 'hidden',
            }}
          >
            <Text size="xs" c="#6272A4" mb={4}>{'// Next.js App com TypeScript e Shopify'}</Text>
            <Text size="xs" c="#6272A4">{'// TypeScript & React'}</Text>
            <Text size="xs" c="#FF79C6">{'import '}<Text span c="#F8F8F2">{'React'}</Text><Text span c="#FF79C6">{' from '}</Text><Text span c="#F1FA8C">{'"react"'}</Text><Text span c="#F8F8F2">{';'}</Text></Text>
            <Text size="xs" c="#FF79C6">{'import '}<Text span c="#F8F8F2">{'type '}</Text><Text span c="#FFB86C">{'Product'}</Text><Text span c="#FF79C6">{' from '}</Text><Text span c="#F1FA8C">{'"../types"'}</Text><Text span c="#F8F8F2">{';'}</Text></Text>

            <Text size="xs" c="#6272A4">{'// Next.js'}</Text>
            <Text size="xs" c="#FF79C6">{'import '}<Text span c="#F8F8F2">{'{ '}</Text><Text span c="#50FA7B">{'GetStaticProps'}</Text><Text span c="#F8F8F2">{' }'}</Text><Text span c="#FF79C6">{' from '}</Text><Text span c="#F1FA8C">{'"next"'}</Text><Text span c="#F8F8F2">{';'}</Text></Text>

            <Text size="xs" c="#6272A4">{'// Shopify'}</Text>
            <Text size="xs" c="#FF79C6">{'import '}<Text span c="#F8F8F2">{'{ '}</Text><Text span c="#50FA7B">{'getProduct'}</Text><Text span c="#F8F8F2">{' }'}</Text><Text span c="#FF79C6">{' from '}</Text><Text span c="#F1FA8C">{'"@shopify/hydrogen"'}</Text><Text span c="#F8F8F2">{';'}</Text></Text>
          </Box>

          {/* Tech logos */}
          <Flex justify="space-between" align="center" mt="xs" style={{ fontSize: '10px' }}>
            <Flex align="center" gap="xs">
              <Box style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#3178C6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold', color: 'white' }}>TS</Box>
              <Box style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#61DAFB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold', color: '#282c34' }}>R</Box>
              <Box style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold', color: 'white' }}>N</Box>
              <Box style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#95BF47', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold', color: 'white' }}>S</Box>
            </Flex>
            <Text size="xs" c="dimmed">Full Stack</Text>
          </Flex>
        </Box>

        {/* Stack features */}
        <Box
          style={{
            background: 'rgba(118, 65, 192, 0.1)',
            borderRadius: '8px',
            padding: '10px',
            border: '1px solid rgba(118, 65, 192, 0.2)',
          }}
        >
          <Flex align="center" gap="xs" mb="xs">
            <IconCode size={16} style={{ color: '#9969E5' }} />
            <Text size="xs" fw={700} c="white">Stack Moderna</Text>
          </Flex>
          <Text size="xs" c="dimmed">Desenvolvimento com TypeScript, React, Next.js e integração com Shopify para soluções de e-commerce de alta performance.</Text>
        </Box>

        {/* Features list */}
        <Box style={{ flex: 1 }}>
          <Text size="xs" fw={500} c="white" mb="xs" ta="center">Tecnologias Utilizadas</Text>
          <Flex direction="column" gap="xs">
            <Flex align="center" gap="xs">
              <IconCheck size={12} style={{ color: '#9969E5' }} />
              <Text size="xs">TypeScript & React</Text>
            </Flex>
            <Flex align="center" gap="xs">
              <IconCheck size={12} style={{ color: '#9969E5' }} />
              <Text size="xs">Next.js & Server Components</Text>
            </Flex>
            <Flex align="center" gap="xs">
              <IconCheck size={12} style={{ color: '#9969E5' }} />
              <Text size="xs">Shopify & Headless Commerce</Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

// Componente de mockup para chat de suporte
function SupportPanelMockup() {
  return (
    <Box style={{ height: '100%' }}>
      <Flex direction="column" gap="md" style={{ height: '100%' }}>
        {/* Chat interface mockup */}
        <Box
          style={{
            background: 'rgba(30, 30, 30, 0.7)',
            borderRadius: '12px',
            padding: '12px',
            border: '1px solid rgba(60, 60, 60, 0.8)',
            position: 'relative',
            overflow: 'hidden',
            flex: 1,
          }}
        >
          {/* Chat header */}
          <Flex justify="space-between" align="center" mb="xs">
            <Flex align="center" gap="xs">
              <Box
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#28C840',
                }}
              />
              <Text size="sm" fw={500} c="white">Suporte Online</Text>
            </Flex>
            <IconHeadset size={14} style={{ color: '#9969E5' }} />
          </Flex>

          {/* Chat messages */}
          <Box
            style={{
              background: 'rgba(20, 20, 20, 0.6)',
              borderRadius: '8px',
              padding: '10px',
              marginBottom: '8px',
              height: '140px',
              overflow: 'hidden',
            }}
          >
            {/* Support message */}
            <Flex mb="xs">
              <Box
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'rgba(118, 65, 192, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '8px',
                }}
              >
                <IconHeadset size={14} style={{ color: '#9969E5' }} />
              </Box>
              <Box
                style={{
                  background: 'rgba(118, 65, 192, 0.1)',
                  borderRadius: '0 8px 8px 8px',
                  padding: '8px',
                  maxWidth: '80%',
                }}
              >
                <Text size="xs" c="white">Olá! Como posso ajudar você hoje?</Text>
              </Box>
            </Flex>

            {/* User message */}
            <Flex justify="flex-end" mb="xs">
              <Box
                style={{
                  background: 'rgba(40, 40, 40, 0.6)',
                  borderRadius: '8px 0 8px 8px',
                  padding: '8px',
                  maxWidth: '80%',
                }}
              >
                <Text size="xs" c="white">Preciso de ajuda com meu site.</Text>
              </Box>
            </Flex>

            {/* Support message */}
            <Flex>
              <Box
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'rgba(118, 65, 192, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '8px',
                }}
              >
                <IconHeadset size={14} style={{ color: '#9969E5' }} />
              </Box>
              <Box
                style={{
                  background: 'rgba(118, 65, 192, 0.1)',
                  borderRadius: '0 8px 8px 8px',
                  padding: '8px',
                  maxWidth: '80%',
                }}
              >
                <Text size="xs" c="white">Claro! Estou aqui para ajudar. Qual é o problema específico que você está enfrentando?</Text>
              </Box>
            </Flex>
          </Box>

          {/* Chat input */}
          <Flex
            style={{
              background: 'rgba(40, 40, 40, 0.6)',
              borderRadius: '8px',
              padding: '8px',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Box
              style={{
                flex: 1,
                height: '8px',
                background: 'rgba(60, 60, 60, 0.6)',
                borderRadius: '4px',
              }}
            />
            <Box
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'rgba(118, 65, 192, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconArrowRight size={14} style={{ color: '#9969E5' }} />
            </Box>
          </Flex>
        </Box>

        {/* Support features */}
        <Box
          style={{
            background: 'rgba(118, 65, 192, 0.1)',
            borderRadius: '8px',
            padding: '10px',
            border: '1px solid rgba(118, 65, 192, 0.2)',
          }}
        >
          <Flex align="center" gap="xs" mb="xs">
            <IconHeadset size={16} style={{ color: '#9969E5' }} />
            <Text size="xs" fw={700} c="white">Suporte 24/7</Text>
          </Flex>
          <Text size="xs" c="dimmed">Nossa equipe está sempre disponível para ajudar você com qualquer dúvida ou problema.</Text>
        </Box>

        {/* Support channels */}
        <Box>
          <Text size="xs" fw={500} c="white" mb="xs" ta="center">Canais de Atendimento</Text>
          <Flex direction="column" gap="xs">
            <Flex align="center" gap="xs">
              <IconCheck size={12} style={{ color: '#9969E5' }} />
              <Text size="xs">Chat ao vivo</Text>
            </Flex>
            <Flex align="center" gap="xs">
              <IconCheck size={12} style={{ color: '#9969E5' }} />
              <Text size="xs">E-mail prioritário</Text>
            </Flex>
            <Flex align="center" gap="xs">
              <IconCheck size={12} style={{ color: '#9969E5' }} />
              <Text size="xs">Suporte telefônico</Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

// Função para renderizar o mockup correto com base no tipo
function renderMockup(item: any) {
  switch (item.mockupType) {
    case 'security-dashboard':
      return <SecurityDashboardMockup />;
    case 'performance-metrics':
      return <PerformanceMetricsMockup />;
    case 'quality-certificate':
      return <QualityCertificateMockup />;
    case 'server-status':
      return <ServerStatusMockup />;
    case 'support-panel':
      return <SupportPanelMockup />;
    default:
      return null;
  }
}

export function TrustSignals() {
  const trustItems = [
    {
      icon: <IconShieldCheck size={24} stroke={1.5} />,
      title: 'Segurança Garantida',
      description: 'Proteção de dados de nível bancário com servidores na Suíça',
      badge: 'ISO 27001',
      mockupType: 'security-dashboard',
      mockupData: {
        securityScore: 98,
        threatsPrevented: 1243,
        lastScan: '2 horas atrás',
        securityItems: [
          { name: 'Firewall', status: 'Ativo', icon: <IconShieldLock size={16} /> },
          { name: 'SSL/TLS', status: 'Seguro', icon: <IconLock size={16} /> },
          { name: 'Backups', status: 'Atualizados', icon: <IconDatabase size={16} /> },
          { name: 'Monitoramento', status: 'Online', icon: <IconAlertCircle size={16} /> }
        ]
      }
    },
    {
      icon: <IconRocket size={24} stroke={1.5} />,
      title: 'Performance Superior',
      description: 'Sites otimizados para velocidade e experiência do usuário',
      badge: '99.9% Uptime',
      mockupType: 'performance-metrics',
      mockupData: {
        pageSpeed: 96,
        uptime: 99.98,
        loadTime: '0.8s',
        devices: [
          { name: 'Desktop', score: 98, icon: <IconDeviceDesktop size={16} /> },
          { name: 'Mobile', score: 94, icon: <IconDeviceMobile size={16} /> },
          { name: 'Global', score: 96, icon: <IconWorld size={16} /> }
        ]
      }
    },
    {
      icon: <IconCertificate size={24} stroke={1.5} />,
      title: 'Qualidade Certificada',
      description: 'Padrões suíços de excelência em cada projeto',
      badge: 'Certificado',
      mockupType: 'quality-certificate',
      mockupData: {
        certificationLevel: 'Premium',
        issuedDate: '15/04/2023',
        validUntil: '15/04/2024',
        standards: [
          { name: 'ISO 9001', verified: true, icon: <IconCertificate2 size={16} /> },
          { name: 'Web Standards', verified: true, icon: <IconAward size={16} /> },
          { name: 'Best Practices', verified: true, icon: <IconStars size={16} /> }
        ]
      }
    },
    {
      icon: <IconCode size={24} stroke={1.5} />,
      title: 'Stack Moderna',
      description: 'TypeScript, React, Next.js e integração com Shopify',
      badge: 'TypeScript',
      mockupType: 'server-status',
      mockupData: {}
    },
    {
      icon: <IconClockHour4 size={24} stroke={1.5} />,
      title: 'Suporte 24/7',
      description: 'Assistência técnica disponível a qualquer momento',
      badge: 'SLA Garantido',
      mockupType: 'support-panel',
      mockupData: {
        responseTime: '15 min',
        satisfaction: 98,
        supportChannels: [
          { name: 'Chat', status: 'Online', icon: <IconMessages size={16} /> },
          { name: 'Tickets', status: 'Rápido', icon: <IconTicket size={16} /> },
          { name: 'Telefone', status: '24/7', icon: <IconHeadset size={16} /> }
        ],
        nextAvailable: 'Imediatamente'
      }
    }
  ];

  const partners = [
    { icon: <IconBrandAws size={28} />, name: 'AWS' },
    { icon: <IconBrandCloudflare size={28} />, name: 'Cloudflare' },
    { icon: <IconBrandStripe size={28} />, name: 'Stripe' },
    { icon: <IconBrandGithub size={28} />, name: 'GitHub' },
    { icon: <IconBrandGoogle size={28} />, name: 'Google Cloud' }
  ];

  return (
    <Box
      py={80}
      style={{
        background: 'linear-gradient(to bottom, rgba(10,10,10,0.9) 0%, rgba(15,15,15,0.9) 100%)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background circuit effect */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(118,65,192,0.05) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(118,65,192,0.05) 0%, transparent 50%)',
          zIndex: 0,
        }}
      />

      <Container size="xl" style={{ position: 'relative', zIndex: 1 }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          mb={60}
          ta="center"
        >
          <MotionBadge
            variant="light"
            color="purple.5"
            size="lg"
            radius="sm"
            mb="md"
            style={{
              background: 'linear-gradient(135deg, rgba(118,65,192,0.1), rgba(153,105,229,0.2))',
              border: '1px solid rgba(153,105,229,0.3)',
              backdropFilter: 'blur(10px)',
            }}
          >
            Por que nos escolher
          </MotionBadge>

          <Title
            order={2}
            fw={700}
            size="2.5rem"
            c="white"
            mb="sm"
            style={{
              lineHeight: 1.2,
              letterSpacing: '-0.5px',
            }}
          >
            Qualidade e precisão <Text span c="purple.4" inherit>suíça</Text> em cada detalhe
          </Title>

          <Text
            size="lg"
            c="gray.4"
            maw={700}
            mx="auto"
            lh={1.6}
          >
            Combinamos tecnologia de ponta com a tradicional precisão suíça para entregar
            soluções web excepcionais para o seu negócio.
          </Text>
        </MotionBox>

        {/* Bento Grid Layout */}
        <Box
          mb={80}
          className="bento-grid"
        >
          {/* Segurança - Card grande (span 6 colunas) */}
          <MotionBox
            key={0}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bento-item-large"
            style={{ zIndex: 1 }}
          >
            <MotionBox
              p="md"
              style={{
                background: 'linear-gradient(135deg, rgba(20,20,20,0.5), rgba(30,30,30,0.5))',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.05)',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
              whileHover={{
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                border: '1px solid rgba(153,105,229,0.2)',
              }}
            >
              <Box
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(153,105,229,0.05) 0%, transparent 50%)',
                  zIndex: 0,
                }}
              />

              <Flex direction="column" style={{ height: '100%', position: 'relative', zIndex: 1 }}>
                <Flex justify="space-between" align="center" mb="md">
                  <Flex align="center" gap="xs">
                    <MotionThemeIcon
                      size={36}
                      radius="md"
                      variant="light"
                      color="purple.5"
                      style={{
                        background: 'linear-gradient(135deg, rgba(118,65,192,0.2), rgba(153,105,229,0.1))',
                        border: '1px solid rgba(153,105,229,0.2)',
                        boxShadow: '0 5px 15px rgba(118,65,192,0.1)',
                      }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: '0 5px 20px rgba(118,65,192,0.2)',
                      }}
                    >
                      {trustItems[0].icon}
                    </MotionThemeIcon>
                    <Text fw={700} size="lg" c="white">{trustItems[0].title}</Text>
                  </Flex>

                  <Badge
                    variant="light"
                    color="purple.5"
                    size="sm"
                    radius="sm"
                    style={{
                      background: 'rgba(118,65,192,0.1)',
                      border: '1px solid rgba(153,105,229,0.2)',
                    }}
                  >
                    {trustItems[0].badge}
                  </Badge>
                </Flex>

                <Box style={{ flex: 1, marginBottom: '12px' }}>
                  <SecurityDashboardMockup />
                </Box>

                <Text size="sm" c="gray.5" lh={1.6} ta="center" style={{ opacity: 0.8 }}>
                  {trustItems[0].description}
                </Text>
              </Flex>
            </MotionBox>
          </MotionBox>

          {/* Performance - Card médio (span 6 colunas) */}
          <MotionBox
            key={1}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bento-item-large"
            style={{ zIndex: 1 }}
          >
            <MotionBox
              p="md"
              style={{
                background: 'linear-gradient(135deg, rgba(20,20,20,0.5), rgba(30,30,30,0.5))',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.05)',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
              whileHover={{
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                border: '1px solid rgba(153,105,229,0.2)',
              }}
            >
              <Box
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(153,105,229,0.05) 0%, transparent 50%)',
                  zIndex: 0,
                }}
              />

              <Flex direction="column" style={{ height: '100%', position: 'relative', zIndex: 1 }}>
                <Flex justify="space-between" align="center" mb="md">
                  <Flex align="center" gap="xs">
                    <MotionThemeIcon
                      size={36}
                      radius="md"
                      variant="light"
                      color="purple.5"
                      style={{
                        background: 'linear-gradient(135deg, rgba(118,65,192,0.2), rgba(153,105,229,0.1))',
                        border: '1px solid rgba(153,105,229,0.2)',
                        boxShadow: '0 5px 15px rgba(118,65,192,0.1)',
                      }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: '0 5px 20px rgba(118,65,192,0.2)',
                      }}
                    >
                      {trustItems[1].icon}
                    </MotionThemeIcon>
                    <Text fw={700} size="lg" c="white">{trustItems[1].title}</Text>
                  </Flex>

                  <Badge
                    variant="light"
                    color="purple.5"
                    size="sm"
                    radius="sm"
                    style={{
                      background: 'rgba(118,65,192,0.1)',
                      border: '1px solid rgba(153,105,229,0.2)',
                    }}
                  >
                    {trustItems[1].badge}
                  </Badge>
                </Flex>

                <Box style={{ flex: 1, marginBottom: '12px' }}>
                  <PerformanceMetricsMockup />
                </Box>

                <Text size="sm" c="gray.5" lh={1.6} ta="center" style={{ opacity: 0.8 }}>
                  {trustItems[1].description}
                </Text>
              </Flex>
            </MotionBox>
          </MotionBox>

          {/* Qualidade - Card médio (span 4 colunas) */}
          <MotionBox
            key={2}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bento-item-medium"
            style={{ zIndex: 1 }}
          >
            <MotionBox
              p="md"
              style={{
                background: 'linear-gradient(135deg, rgba(20,20,20,0.5), rgba(30,30,30,0.5))',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.05)',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
              whileHover={{
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                border: '1px solid rgba(153,105,229,0.2)',
              }}
            >
              <Box
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(153,105,229,0.05) 0%, transparent 50%)',
                  zIndex: 0,
                }}
              />

              <Flex direction="column" style={{ height: '100%', position: 'relative', zIndex: 1 }}>
                <Flex justify="space-between" align="center" mb="md">
                  <Flex align="center" gap="xs">
                    <MotionThemeIcon
                      size={36}
                      radius="md"
                      variant="light"
                      color="purple.5"
                      style={{
                        background: 'linear-gradient(135deg, rgba(118,65,192,0.2), rgba(153,105,229,0.1))',
                        border: '1px solid rgba(153,105,229,0.2)',
                        boxShadow: '0 5px 15px rgba(118,65,192,0.1)',
                      }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: '0 5px 20px rgba(118,65,192,0.2)',
                      }}
                    >
                      {trustItems[2].icon}
                    </MotionThemeIcon>
                    <Text fw={700} size="lg" c="white">{trustItems[2].title}</Text>
                  </Flex>

                  <Badge
                    variant="light"
                    color="purple.5"
                    size="sm"
                    radius="sm"
                    style={{
                      background: 'rgba(118,65,192,0.1)',
                      border: '1px solid rgba(153,105,229,0.2)',
                    }}
                  >
                    {trustItems[2].badge}
                  </Badge>
                </Flex>

                <Box style={{ flex: 1, marginBottom: '12px' }}>
                  <QualityCertificateMockup />
                </Box>

                <Text size="sm" c="gray.5" lh={1.6} ta="center" style={{ opacity: 0.8 }}>
                  {trustItems[2].description}
                </Text>
              </Flex>
            </MotionBox>
          </MotionBox>

          {/* Código Premium - Card médio (span 4 colunas) */}
          <MotionBox
            key={3}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bento-item-medium"
            style={{ zIndex: 1 }}
          >
            <MotionBox
              p="md"
              style={{
                background: 'linear-gradient(135deg, rgba(20,20,20,0.5), rgba(30,30,30,0.5))',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.05)',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
              whileHover={{
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                border: '1px solid rgba(153,105,229,0.2)',
              }}
            >
              <Box
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(153,105,229,0.05) 0%, transparent 50%)',
                  zIndex: 0,
                }}
              />

              <Flex direction="column" style={{ height: '100%', position: 'relative', zIndex: 1 }}>
                <Flex justify="space-between" align="center" mb="md">
                  <Flex align="center" gap="xs">
                    <MotionThemeIcon
                      size={36}
                      radius="md"
                      variant="light"
                      color="purple.5"
                      style={{
                        background: 'linear-gradient(135deg, rgba(118,65,192,0.2), rgba(153,105,229,0.1))',
                        border: '1px solid rgba(153,105,229,0.2)',
                        boxShadow: '0 5px 15px rgba(118,65,192,0.1)',
                      }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: '0 5px 20px rgba(118,65,192,0.2)',
                      }}
                    >
                      {trustItems[3].icon}
                    </MotionThemeIcon>
                    <Text fw={700} size="lg" c="white">{trustItems[3].title}</Text>
                  </Flex>

                  <Badge
                    variant="light"
                    color="purple.5"
                    size="sm"
                    radius="sm"
                    style={{
                      background: 'rgba(118,65,192,0.1)',
                      border: '1px solid rgba(153,105,229,0.2)',
                    }}
                  >
                    {trustItems[3].badge}
                  </Badge>
                </Flex>

                <Box style={{ flex: 1, marginBottom: '12px' }}>
                  <ServerStatusMockup />
                </Box>

                <Text size="sm" c="gray.5" lh={1.6} ta="center" style={{ opacity: 0.8 }}>
                  {trustItems[3].description}
                </Text>
              </Flex>
            </MotionBox>
          </MotionBox>

          {/* Suporte - Card médio (span 4 colunas) */}
          <MotionBox
            key={4}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bento-item-medium"
            style={{ zIndex: 1 }}
          >
            <MotionBox
              p="md"
              style={{
                background: 'linear-gradient(135deg, rgba(20,20,20,0.5), rgba(30,30,30,0.5))',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.05)',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
              whileHover={{
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                border: '1px solid rgba(153,105,229,0.2)',
              }}
            >
              <Box
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(153,105,229,0.05) 0%, transparent 50%)',
                  zIndex: 0,
                }}
              />

              <Flex direction="column" style={{ height: '100%', position: 'relative', zIndex: 1 }}>
                <Flex justify="space-between" align="center" mb="md">
                  <Flex align="center" gap="xs">
                    <MotionThemeIcon
                      size={36}
                      radius="md"
                      variant="light"
                      color="purple.5"
                      style={{
                        background: 'linear-gradient(135deg, rgba(118,65,192,0.2), rgba(153,105,229,0.1))',
                        border: '1px solid rgba(153,105,229,0.2)',
                        boxShadow: '0 5px 15px rgba(118,65,192,0.1)',
                      }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: '0 5px 20px rgba(118,65,192,0.2)',
                      }}
                    >
                      {trustItems[4].icon}
                    </MotionThemeIcon>
                    <Text fw={700} size="lg" c="white">{trustItems[4].title}</Text>
                  </Flex>

                  <Badge
                    variant="light"
                    color="purple.5"
                    size="sm"
                    radius="sm"
                    style={{
                      background: 'rgba(118,65,192,0.1)',
                      border: '1px solid rgba(153,105,229,0.2)',
                    }}
                  >
                    {trustItems[4].badge}
                  </Badge>
                </Flex>

                <Box style={{ flex: 1, marginBottom: '12px' }}>
                  <SupportPanelMockup />
                </Box>

                <Text size="sm" c="gray.5" lh={1.6} ta="center" style={{ opacity: 0.8 }}>
                  {trustItems[4].description}
                </Text>
              </Flex>
            </MotionBox>
          </MotionBox>
        </Box>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          mb={60}
        >
          <Box
            p="xl"
            style={{
              background: 'linear-gradient(135deg, rgba(20,20,20,0.5), rgba(30,30,30,0.5))',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.05)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Subtle gradient overlay */}
            <Box
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, rgba(153,105,229,0.03) 0%, transparent 70%)',
                zIndex: 0,
              }}
            />

            <Flex direction="column" align="center" style={{ position: 'relative', zIndex: 1 }}>
              <Title order={3} fw={600} size="h3" mb="lg" c="white" ta="center">
                Tecnologias e Parceiros de Confiança
              </Title>

              <MotionGroup
                style={{ gap: '50px', justifyContent: 'center', flexWrap: 'wrap' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, staggerChildren: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                {partners.map((partner, index) => (
                  <MotionFlex
                    key={index}
                    direction="column"
                    align="center"
                    gap="xs"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    style={{ cursor: 'pointer' }}
                  >
                    <ThemeIcon
                      size={60}
                      radius="md"
                      variant="light"
                      color="gray.7"
                      style={{
                        background: 'rgba(40, 40, 40, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      {partner.icon}
                    </ThemeIcon>
                    <Text size="sm" c="gray.5">{partner.name}</Text>
                  </MotionFlex>
                ))}
              </MotionGroup>

              <Text size="sm" c="gray.6" mt="xl" ta="center">
                Trabalhamos com as melhores tecnologias do mercado para garantir segurança, performance e confiabilidade.
              </Text>
            </Flex>
          </Box>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          ta="center"
          maw={800}
          mx="auto"
          p="xl"
          style={{
            background: 'linear-gradient(135deg, rgba(118,65,192,0.05), rgba(30,30,30,0))',
            borderRadius: '16px',
            position: 'relative',
          }}
        >
          <Box
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '3px',
              background: 'linear-gradient(90deg, transparent, rgba(153,105,229,0.5), transparent)',
              borderRadius: '3px',
            }}
          />

          <Text
            size="xl"
            c="white"
            fw={500}
            lh={1.6}
            style={{
              fontStyle: 'italic',
              position: 'relative',
            }}
          >
            "Nosso compromisso é oferecer soluções web de alta qualidade, combinando design moderno com tecnologia avançada e a tradicional precisão suíça."
          </Text>

          <Text size="sm" c="purple.4" fw={600} mt="md">
            — Equipe CodeBR
          </Text>
        </MotionBox>
      </Container>
    </Box>
  );
}

