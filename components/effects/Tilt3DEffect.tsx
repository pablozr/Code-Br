'use client';

import { useRef, useState, ReactNode } from 'react';
import { Box, BoxProps } from '@mantine/core';

interface Tilt3DEffectProps extends BoxProps {
  children: ReactNode;
  perspective?: number;
  tiltMaxAngle?: number;
  scale?: number;
  transitionSpeed?: number;
  glareEnabled?: boolean;
  glareColor?: string;
  glarePosition?: 'all' | 'top' | 'bottom' | 'left' | 'right';
  glareMaxOpacity?: number;
}

export function Tilt3DEffect({
  children,
  perspective = 1000,
  tiltMaxAngle = 10,
  scale = 1.05,
  transitionSpeed = 400,
  glareEnabled = true,
  glareColor = 'rgba(255, 255, 255, 0.4)',
  glarePosition = 'all',
  glareMaxOpacity = 0.5,
  ...props
}: Tilt3DEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({
    transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
    transition: `${transitionSpeed}ms transform ease-out`,
  });
  const [glareStyle, setGlareStyle] = useState({
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    borderRadius: 'inherit',
    opacity: 0,
    background: `linear-gradient(0deg, rgba(255,255,255,0) 0%, ${glareColor} 100%)`,
    transform: 'rotate(180deg)',
    transition: `${transitionSpeed}ms opacity ease-out`,
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xRatio = (mouseX - width / 2) / (width / 2);
    const yRatio = (mouseY - height / 2) / (height / 2);
    
    const xAngle = tiltMaxAngle * yRatio * -1;
    const yAngle = tiltMaxAngle * xRatio;
    
    setTiltStyle({
      transform: `perspective(${perspective}px) rotateX(${xAngle}deg) rotateY(${yAngle}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: isHovered ? '0ms transform' : `${transitionSpeed}ms transform ease-out`,
    });
    
    if (glareEnabled) {
      let glareAngle = Math.atan2(mouseY, mouseX) * (180 / Math.PI) - 90;
      if (glareAngle < 0) glareAngle += 360;
      
      // Adjust glare based on position setting
      let glareOpacity = glareMaxOpacity;
      if (glarePosition === 'top' && yRatio > 0) glareOpacity = 0;
      if (glarePosition === 'bottom' && yRatio < 0) glareOpacity = 0;
      if (glarePosition === 'left' && xRatio > 0) glareOpacity = 0;
      if (glarePosition === 'right' && xRatio < 0) glareOpacity = 0;
      
      setGlareStyle({
        ...glareStyle,
        opacity: glareOpacity,
        transform: `rotate(${glareAngle}deg)`,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: `${transitionSpeed}ms transform ease-out`,
    });
    
    if (glareEnabled) {
      setGlareStyle({
        ...glareStyle,
        opacity: 0,
      });
    }
  };

  return (
    <Box
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        ...tiltStyle,
        ...props.style,
      }}
      {...props}
    >
      {glareEnabled && <div style={glareStyle as any} />}
      <div style={{ transform: 'translateZ(50px)' }}>
        {children}
      </div>
    </Box>
  );
}
