'use client';

import { useEffect, useState } from 'react';
import { Box } from '@mantine/core';
import { keyframes } from '@emotion/react';

const sparkleKeyframes = keyframes({
  '0%': { transform: 'scale(0) translate(0, 0)', opacity: 0 },
  '50%': { transform: 'scale(1) translate(-20px, -20px)', opacity: 0.4 },
  '100%': { transform: 'scale(0) translate(-40px, -40px)', opacity: 0 }
});

interface Sparkle {
  id: number;
  size: number;
  style: {
    left: string;
    bottom: string;
    animationDelay: string;
  };
}

interface SparklesProps {
  density?: number;
  speed?: number;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
  trailEffect?: boolean;
  trailDirection?: 'up' | 'diagonal';
}

export function Sparkles({ 
  density = 12,
  speed = 2,
  size = 1.5,
  color = '#fff',
  style,
  trailEffect = false,
  trailDirection = 'diagonal'
}: SparklesProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles: Sparkle[] = [];
      for (let i = 0; i < density; i++) {
        const leftPosition = trailEffect
          ? `${Math.random() * 50}%`  // Mais disperso
          : `${Math.random() * 100}%`;

        newSparkles.push({
          id: Math.random(),
          size: Math.random() * size + size/2,
          style: {
            left: leftPosition,
            bottom: `${Math.random() * 20}%`, // Distribuição vertical
            animationDelay: `${Math.random() * speed * 0.8}s`
          }
        });
      }
      setSparkles(newSparkles);
    };

    generateSparkles();
    const interval = setInterval(generateSparkles, speed * 800); // Mais frequente
    return () => clearInterval(interval);
  }, [density, speed, size, trailEffect]);

  return (
    <Box
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
        ...style
      }}
    >
      {/* Aura glow mais sutil */}
      <Box
        style={{
          position: 'absolute',
          bottom: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100px',
          height: '100px',
          background: `radial-gradient(ellipse at center, ${color}10 0%, transparent 70%)`,
          filter: 'blur(20px)',
          opacity: 0.3,
        }}
      />
      
      {sparkles.map((sparkle) => (
        <Box
          key={sparkle.id}
          style={{
            position: 'absolute',
            width: sparkle.size,
            height: sparkle.size,
            background: color,
            borderRadius: '50%',
            boxShadow: `0 0 ${sparkle.size}px ${color}`,
            animation: `${sparkleKeyframes} ${speed}s ease-out infinite`,
            ...sparkle.style
          }}
        />
      ))}
    </Box>
  );
}

