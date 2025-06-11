'use client';

import React, { memo } from 'react';
import { Text, Paper, Group } from '@mantine/core';
import { usePriceContext } from './PriceContext';
import { usePathname } from 'next/navigation';

interface PriceDisplayProps {
  label: string;
}

// Componente que exibe apenas o preço - memoizado para evitar re-renderizações desnecessárias
const PriceDisplay: React.FC<PriceDisplayProps> = memo(({ label }) => {
  const { totalPrice, formatPrice } = usePriceContext();
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'pt-BR';
  
  return (
    <Paper
      p="md"
      radius="md"
      style={{
        background: 'linear-gradient(135deg, rgba(118,65,192,0.2), rgba(153,105,229,0.1))',
        border: '1px solid rgba(153,105,229,0.3)',
      }}
    >
      <Group justify="space-between">
        <Text fw={600} size="md" c="white">
          {label}
        </Text>
        <Text
          fw={800}
          size="xl"
          style={{
            background: 'linear-gradient(135deg, #9969E5, #7641C0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {formatPrice(totalPrice, locale)}
        </Text>
      </Group>
    </Paper>
  );
});

// Definir displayName para o componente memoizado
PriceDisplay.displayName = 'PriceDisplay';

export default PriceDisplay;
