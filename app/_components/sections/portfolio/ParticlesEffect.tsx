'use client';

import { useEffect, useRef } from 'react';
import { Box } from '@mantine/core';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

export function ParticlesEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Ajustar o tamanho do canvas para preencher o container
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Criar partículas iniciais
    const createParticles = () => {
      const particles: Particle[] = [];
      const particleCount = 30;
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: canvas.height + Math.random() * 20,
          size: Math.random() * 3 + 1,
          speedX: Math.random() * 2 - 1,
          speedY: -(Math.random() * 2 + 1),
          opacity: Math.random() * 0.5 + 0.1,
          color: getRandomColor(),
        });
      }
      
      return particles;
    };
    
    // Gerar cores aleatórias com tema roxo
    const getRandomColor = () => {
      const colors = [
        'rgba(118, 65, 192, 0.7)',
        'rgba(153, 105, 229, 0.7)',
        'rgba(180, 144, 255, 0.7)',
        'rgba(200, 170, 255, 0.7)',
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };
    
    // Inicializar partículas
    particlesRef.current = createParticles();
    
    // Função de animação
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach((particle, index) => {
        // Atualizar posição
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Desenhar partícula
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        
        // Resetar partícula quando sair da tela
        if (particle.y < -10) {
          particlesRef.current[index] = {
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 20,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 2 - 1,
            speedY: -(Math.random() * 2 + 1),
            opacity: Math.random() * 0.5 + 0.1,
            color: getRandomColor(),
          };
        }
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Iniciar animação
    animate();
    
    // Limpar ao desmontar
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);
  
  return (
    <Box
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  );
}
