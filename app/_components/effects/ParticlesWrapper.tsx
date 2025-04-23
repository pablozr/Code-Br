'use client';

import { useEffect, useState } from 'react';
import { Box } from '@mantine/core';
import { ClientParticleGroup } from './ClientParticles';

export function ParticlesWrapper() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Retorna um placeholder vazio durante a renderização do servidor
    return (
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: '1px',
          zIndex: 100,
          pointerEvents: 'none',
        }}
      />
    );
  }

  // Renderiza as partículas apenas no cliente
  return (
    <Box
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '1px',
        zIndex: 100,
        pointerEvents: 'none',
      }}
    >
      <ClientParticleGroup />
    </Box>
  );
}
