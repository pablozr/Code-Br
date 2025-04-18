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
  color: string;
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
  style?: React.CSSProperties;
  trailEffect?: boolean;
  trailDirection?: 'up' | 'diagonal';
}

export function Sparkles({ 
  density = 12,
  speed = 2,
  size = 1.5,
  style,
  trailEffect = false,
  trailDirection = 'diagonal'
}: SparklesProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  // Array de cores roxas para o gradiente
  const purpleGradient = [
    '#7641C0', // purple.6
    '#9969E5', // purple.5
    '#6A5ACD', // purple.7
    '#8A63E8', // purple.4
    '#6741D9'  // purple.8
  ];

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles: Sparkle[] = [];
      for (let i = 0; i < density; i++) {
        const leftPosition = trailEffect
          ? `${Math.random() * 50}%`
          : `${Math.random() * 100}%`;

        // Seleciona uma cor aleatória do gradiente
        const randomColor = purpleGradient[Math.floor(Math.random() * purpleGradient.length)];

        newSparkles.push({
          id: Math.random(),
          size: Math.random() * size + size/2,
          color: randomColor,
          style: {
            left: leftPosition,
            bottom: `${Math.random() * 20}%`,
            animationDelay: `${Math.random() * speed * 0.8}s`
          }
        });
      }
      setSparkles(newSparkles);
    };

    generateSparkles();
    const interval = setInterval(generateSparkles, speed * 800);
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
      {/* Aura glow com gradiente roxo */}
      <Box
        style={{
          position: 'absolute',
          bottom: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100px',
          height: '100px',
          background: `radial-gradient(ellipse at center, 
            rgba(118, 65, 192, 0.2) 0%, 
            rgba(106, 90, 205, 0.1) 50%, 
            transparent 70%)`,
          filter: 'blur(20px)',
          opacity: 0.4,
        }}
      />
      
      {sparkles.map((sparkle) => (
        <Box
          key={sparkle.id}
          style={{
            position: 'absolute',
            width: sparkle.size,
            height: sparkle.size,
            background: sparkle.color,
            borderRadius: '50%',
            boxShadow: `0 0 ${sparkle.size}px ${sparkle.color}`,
            animation: `${sparkleKeyframes} ${speed}s ease-out infinite`,
            ...sparkle.style
          }}
        />
      ))}
    </Box>
  );
}


