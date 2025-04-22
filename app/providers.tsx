'use client';

import { MantineProvider, createTheme, MantineColorsTuple } from '@mantine/core';
import '@mantine/core/styles.css';
import { I18nProvider } from './_components/I18nProvider';
import { useParams } from 'next/navigation';

// Definindo nossa paleta de cores personalizada
const purpleColors: MantineColorsTuple = [
  '#f5f0ff',
  '#e5dbf5',
  '#c7b1e5',
  '#a885d8',
  '#8e62cc',
  '#7e4cc5',
  '#7641c0',
  '#6534ab',
  '#592d9a',
  '#4c2289'
];

const blackColors: MantineColorsTuple = [
  '#f0f0f0',
  '#d9d9d9',
  '#bfbfbf',
  '#a6a6a6',
  '#8c8c8c',
  '#737373',
  '#595959',
  '#404040',
  '#262626',
  '#0d0d0d'
];

// Criando nosso tema personalizado
const theme = createTheme({
  colors: {
    purple: purpleColors,
    black: blackColors,
  },
  primaryColor: 'purple',
  primaryShade: 6,
  fontFamily: 'Manrope, sans-serif',
  headings: {
    fontFamily: 'Manrope, sans-serif',
    fontWeight: '600',
  },
  defaultRadius: 'md',
  // Configuração para tema escuro por padrão
  colorScheme: 'dark',
  black: '#0d0d0d',
  white: '#ffffff',
  defaultGradient: {
    from: 'purple.7',
    to: 'purple.5',
    deg: 45,
  },
  components: {
    Button: {
      defaultProps: {
        radius: 'xl',
      },
      styles: {
        root: {
          fontWeight: 500,
        },
      },
    },
    Card: {
      defaultProps: {
        radius: 'md',
        p: 'xl',
      },
    },
    Input: {
      defaultProps: {
        radius: 'md',
      },
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const locale = (params?.lang as string) || 'pt-BR';

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <I18nProvider locale={locale}>
        {children}
      </I18nProvider>
    </MantineProvider>
  );
}
