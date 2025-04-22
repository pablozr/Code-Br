'use client';

import React from 'react';
import { motion } from 'framer-motion';

const MotionDiv = motion.create('div');

interface GradientTextProps {
  text: string;
  fontSize?: string | number;
  fontWeight?: number;
  className?: string;
  gradientColors?: string[];
  gradientDirection?: string;
  textShadowColor?: string;
  textShadowBlur?: string;
  animationDelay?: number;
  glowEffect?: boolean;
  glowColor?: string;
  textStroke?: boolean;
  textStrokeColor?: string;
  textStrokeWidth?: string;
}

export default function GradientText({
  text,
  fontSize = '3rem',
  fontWeight = 700,
  className = '',
  gradientColors = ['#B28DFF', '#9969E5', '#7641C0', '#5D00FF'],
  gradientDirection = '90deg',
  textShadowColor = 'rgba(118,65,192,0.3)',
  textShadowBlur = '20px',
  animationDelay = 0.4,
  glowEffect = false,
  glowColor = 'rgba(255,255,255,0.8)',
  textStroke = false,
  textStrokeColor = 'rgba(118,65,192,0.5)',
  textStrokeWidth = '1px'
}: GradientTextProps) {
  // Cria um gradiente linear com as cores e direção fornecidas
  const gradientStyle = {
    background: `linear-gradient(${gradientDirection}, ${gradientColors.join(', ')})`,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    display: 'inline-block',
    fontSize,
    fontWeight,
    textShadow: `0 0 ${textShadowBlur} ${textShadowColor}`,
    letterSpacing: '-0.01em',
    textAlign: 'center' as const,
    width: '100%',
    lineHeight: 1.2,
    WebkitTextStroke: textStroke ? `${textStrokeWidth} ${textStrokeColor}` : 'none',
    textStroke: textStroke ? `${textStrokeWidth} ${textStrokeColor}` : 'none',
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
      {glowEffect && (
        <MotionDiv
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(ellipse, ${glowColor} 0%, rgba(255,255,255,0) 70%)`,
            filter: 'blur(15px)',
            opacity: 0.8,
            zIndex: -1,
            transform: 'translateY(-5%)',
            pointerEvents: 'none',
            width: '120%',
            height: '150%',
            left: '-10%',
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [0.98, 1.02, 0.98],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
      <MotionDiv
        className={className}
        style={gradientStyle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: animationDelay }}
      >
        {text}
      </MotionDiv>
    </div>
  );
}
