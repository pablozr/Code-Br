'use client';

import { ReactNode, useState, useRef } from 'react';
import { Box, BoxProps } from '@mantine/core';

interface GlassCardProps extends BoxProps {
  children: ReactNode;
  glassOpacity?: number;
  borderOpacity?: number;
  maxTilt?: number;
  glareOpacity?: number;
  borderRadius?: number;
  borderWidth?: number;
  glassColor?: string;
  borderColor?: string;
  glareColor?: string;
  interactive?: boolean;
}

export function GlassCard({
  children,
  glassOpacity = 0.1,
  borderOpacity = 0.1,
  maxTilt = 5,
  glareOpacity = 0.1,
  borderRadius = 16,
  borderWidth = 1,
  glassColor = 'rgba(255, 255, 255, 0.05)',
  borderColor = 'rgba(255, 255, 255, 0.1)',
  glareColor = 'rgba(255, 255, 255, 0.5)',
  interactive = true,
  style,
  ...props
}: GlassCardProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate rotation based on mouse position
    const rotateY = (mouseX / (rect.width / 2)) * maxTilt;
    const rotateX = -((mouseY / (rect.height / 2)) * maxTilt);
    
    setRotation({ x: rotateX, y: rotateY });
    
    // Calculate glare position
    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;
    setGlarePosition({ x: glareX, y: glareY });
  };

  const handleMouseEnter = () => {
    if (!interactive) return;
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
    setGlarePosition({ x: 50, y: 50 });
  };

  return (
    <Box
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        borderRadius,
        border: `${borderWidth}px solid ${borderColor}`,
        background: glassColor,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.3)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        transform: interactive
          ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovering ? 1.02 : 1})`
          : undefined,
        overflow: 'hidden',
        ...style,
      }}
      {...props}
    >
      {/* Glare effect */}
      {interactive && (
        <Box
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: borderRadius - borderWidth,
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, ${glareColor} 0%, rgba(255, 255, 255, 0) 80%)`,
            opacity: isHovering ? glareOpacity : 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
      )}
      
      {/* Content */}
      <Box
        style={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
