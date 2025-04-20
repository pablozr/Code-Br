'use client';

import { ReactNode, useState } from 'react';
import { Button, ButtonProps, Box } from '@mantine/core';

interface TechButtonProps extends Omit<ButtonProps, 'variant'> {
  component?: any;
  href?: string;
  children: ReactNode;
  variant?: 'filled' | 'outline' | 'gradient' | 'glass';
  glowColor?: string;
  glowIntensity?: number;
  hoverScale?: number;
  gradientColors?: string[];
  borderWidth?: number;
  pulseEffect?: boolean;
}

export function TechButton({
  children,
  variant = 'filled',
  glowColor = 'rgba(118, 65, 192, 0.6)',
  glowIntensity = 0.8,
  hoverScale = 1.03,
  gradientColors = ['#7641C0', '#9969E5'],
  borderWidth = 1,
  pulseEffect = false,
  style,
  ...props
}: TechButtonProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'filled':
        return {
          background: gradientColors.length > 1
            ? `linear-gradient(90deg, ${gradientColors[0]}, ${gradientColors[1]})`
            : gradientColors[0],
          color: 'white',
          border: 'none',
          boxShadow: isHovering
            ? `0 0 20px ${glowColor}`
            : `0 0 10px rgba(118, 65, 192, 0.3)`,
        };
      case 'outline':
        return {
          background: 'transparent',
          color: gradientColors[0],
          border: `${borderWidth}px solid ${gradientColors[0]}`,
          boxShadow: isHovering
            ? `0 0 15px ${glowColor}`
            : 'none',
        };
      case 'gradient':
        return {
          background: `linear-gradient(90deg, ${gradientColors.join(', ')})`,
          backgroundSize: '200% 100%',
          backgroundPosition: isHovering ? 'right center' : 'left center',
          color: 'white',
          border: 'none',
          boxShadow: isHovering
            ? `0 0 20px ${glowColor}`
            : `0 0 10px rgba(118, 65, 192, 0.3)`,
        };
      case 'glass':
        return {
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          color: 'white',
          border: `${borderWidth}px solid rgba(255, 255, 255, 0.1)`,
          boxShadow: isHovering
            ? `0 0 15px ${glowColor}`
            : 'none',
        };
      default:
        return {};
    }
  };

  return (
    <Box
      style={{
        position: 'relative',
        display: 'inline-block',
      }}
    >
      {/* Glow effect */}
      {isHovering && (
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
            borderRadius: props.radius || 'md',
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${glowColor} 0%, rgba(118, 65, 192, 0) 70%)`,
            opacity: glowIntensity,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}

      {/* Pulse effect */}
      {pulseEffect && (
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
            borderRadius: props.radius || 'md',
            border: `1px solid ${gradientColors[0]}`,
            opacity: 0.6,
            pointerEvents: 'none',
            zIndex: 0,
            animation: 'pulse 2s infinite',
          }}
        />
      )}

      <Button
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
        style={{
          position: 'relative',
          zIndex: 1,
          transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
          transform: isHovering ? `scale(${hoverScale})` : 'scale(1)',
          ...getVariantStyles(),
          ...style,
        }}
        {...props}
      >
        {children}
      </Button>
    </Box>
  );
}
