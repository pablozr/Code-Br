'use client';

import { useRef, useState, useEffect, ReactNode } from 'react';
import { Box, BoxProps } from '@mantine/core';

interface GlowEffectProps extends BoxProps {
  children: ReactNode;
  color?: string;
  size?: number;
  intensity?: number;
  interactive?: boolean;
}

export function GlowEffect({
  children,
  color = 'rgba(118,65,192,0.5)',
  size = 200,
  intensity = 0.5,
  interactive = true,
  ...props
}: GlowEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!interactive) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !isHovered) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setPosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive, isHovered]);

  return (
    <Box
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        position: 'relative',
        overflow: 'hidden',
        ...props.style 
      }}
      {...props}
    >
      {/* Glow effect */}
      <Box
        style={{
          position: 'absolute',
          top: interactive && isHovered ? position.y - size / 2 : '50%',
          left: interactive && isHovered ? position.x - size / 2 : '50%',
          width: size,
          height: size,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color} 0%, rgba(0,0,0,0) 70%)`,
          opacity: isHovered ? intensity : intensity * 0.5,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          transition: interactive ? 'opacity 0.3s ease' : 'all 2s ease-in-out',
          animation: !interactive ? 'glow-pulse 4s infinite alternate' : undefined,
          zIndex: 0,
        }}
      />
      
      {/* Content */}
      <Box style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </Box>
      
      <style jsx global>{`
        @keyframes glow-pulse {
          0% {
            opacity: ${intensity * 0.3};
            transform: translate(-50%, -50%) scale(0.8);
          }
          100% {
            opacity: ${intensity * 0.7};
            transform: translate(-50%, -50%) scale(1.2);
          }
        }
      `}</style>
    </Box>
  );
}
