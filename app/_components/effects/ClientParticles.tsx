'use client';

import { Box } from '@mantine/core';
import { motion } from 'framer-motion';

const MotionBox = motion.div;

// Componente Particle para as partículas que sobem
function Particle({ delay = 0, size = 3 }: { delay?: number, size?: number }) {
  // Gerar uma cor aleatória entre diferentes tons de roxo
  const colors = [
    '#9969E5', // Roxo mais brilhante
    '#7641C0', // Roxo principal
    '#B285FF', // Lilás claro
    '#A570FF', // Roxo médio
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];

  // Gerar um tamanho aleatório baseado no tamanho passado (mantendo as partículas pequenas)
  const particleSize = size * (0.7 + Math.random() * 0.5); // Entre 70% e 120% do tamanho original

  // Posição X inicial aleatória, concentrada mais no centro
  const startX = Math.random() * 140 - 70; // Entre -70 e 70px

  // Movimento X aleatório para dar um efeito de dispersão (mais sutil)
  const moveX = (Math.random() * 20 - 10) + (Math.random() > 0.5 ? 5 : -5);

  return (
    <MotionBox
      style={{
        position: 'absolute',
        width: `${particleSize}px`,
        height: `${particleSize}px`,
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 ${particleSize*1.2}px ${color}`,
        zIndex: 10,
      }}
      initial={{
        opacity: 0,
        y: 5, // Começa um pouco abaixo para parecer que está saindo do card
        x: startX,
        scale: 0.3,
      }}
      animate={{
        opacity: [0, 0.8, 0],
        y: [5, -60 - Math.random() * 40], // Sobe até uma altura menor e aleatória
        x: [startX, startX + moveX],
        scale: [0.3, 0.7, 0.2],
      }}
      transition={{
        duration: 2 + Math.random() * 2, // Duração mais longa: entre 2 e 4 segundos
        repeat: Infinity,
        delay: delay,
        ease: 'easeOut',
      }}
    />
  );
}

// Componente ParticleGroup para animar múltiplas partículas
export function ClientParticleGroup() {
  // Gerar partículas muito pequenas (mais numerosas)
  const tinyParticles = Array.from({ length: 20 }).map((_, index) => (
    <Particle key={`tiny-${index}`} delay={index * 0.15} size={2} />
  ));

  // Gerar partículas pequenas
  const smallParticles = Array.from({ length: 15 }).map((_, index) => (
    <Particle key={`small-${index}`} delay={index * 0.2 + 0.1} size={3} />
  ));

  // Gerar partículas médias (menos numerosas)
  const mediumParticles = Array.from({ length: 8 }).map((_, index) => (
    <Particle key={`medium-${index}`} delay={index * 0.25 + 0.15} size={4} />
  ));

  // Gerar poucas partículas grandes
  const largeParticles = Array.from({ length: 5 }).map((_, index) => (
    <Particle key={`large-${index}`} delay={index * 0.3 + 0.2} size={5} />
  ));

  return (
    <Box
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '1px', // Altura mínima para não ocupar espaço
        overflow: 'visible',
        zIndex: 20,
        pointerEvents: 'none', // Para não interferir com cliques
      }}
    >
      <Box
        style={{
          position: 'relative',
          width: '100%',
          height: '1px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {tinyParticles}
        {smallParticles}
        {mediumParticles}
        {largeParticles}
      </Box>
    </Box>
  );
}
