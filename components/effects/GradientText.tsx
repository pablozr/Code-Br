'use client';

import { ReactNode, useRef, useEffect } from 'react';
import { Text, TextProps } from '@mantine/core';

interface GradientTextProps extends Omit<TextProps, 'gradient'> {
  children: ReactNode;
  gradient?: string[];
  animate?: boolean;
  duration?: number;
  className?: string;
  interactive?: boolean;
}

export function GradientText({
  children,
  gradient = ['#7641C0', '#9969E5', '#7641C0'],
  animate = true,
  duration = 3,
  interactive = false,
  className,
  ...props
}: GradientTextProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const gradientString = `linear-gradient(90deg, ${gradient.join(', ')})`;

  useEffect(() => {
    if (!animate && !interactive) return;
    
    const textElement = textRef.current;
    if (!textElement) return;

    let animationFrame: number;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      
      const rect = textElement.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 100;
      mouseY = ((e.clientY - rect.top) / rect.height) * 100;
      
      textElement.style.backgroundPosition = `${mouseX}% ${mouseY}%`;
    };

    const updateGradient = () => {
      if (!animate) return;
      
      const now = Date.now() / 1000;
      const position = ((now % duration) / duration) * 100;
      
      if (!interactive) {
        textElement.style.backgroundPosition = `${position}% 50%`;
      }
      
      animationFrame = requestAnimationFrame(updateGradient);
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    if (animate) {
      updateGradient();
    }

    return () => {
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      
      if (animate) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [animate, duration, interactive]);

  return (
    <Text
      ref={textRef}
      component="span"
      className={className}
      style={{
        background: gradientString,
        backgroundSize: '200% 100%',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        display: 'inline-block',
        cursor: interactive ? 'default' : undefined,
        ...props.style,
      }}
      {...props}
    >
      {children}
    </Text>
  );
}
