'use client';

import { useState, useEffect, useRef } from 'react';
import { Text, TextProps } from '@mantine/core';
import { motion, useInView, Variants } from 'framer-motion';

interface AnimatedTextProps extends TextProps {
  text: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  type?: 'words' | 'chars' | 'lines';
}

const MotionText = motion(Text);

export function AnimatedText({
  text,
  delay = 0,
  duration = 0.05,
  once = true,
  type = 'words',
  ...props
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once });
  const [splitted, setSplitted] = useState<string[]>([]);
  
  useEffect(() => {
    if (type === 'words') {
      setSplitted(text.split(' '));
    } else if (type === 'chars') {
      setSplitted(text.split(''));
    } else if (type === 'lines') {
      setSplitted(text.split('\n'));
    }
  }, [text, type]);
  
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: duration, delayChildren: delay * i },
    }),
  };
  
  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };
  
  return (
    <div ref={ref}>
      <MotionText
        {...props}
        style={{ 
          overflow: 'hidden',
          display: 'inline-block',
          ...props.style 
        }}
        variants={container}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <span style={{ display: type === 'chars' ? 'inline-block' : 'inline' }}>
          {splitted.map((item, index) => (
            <motion.span
              key={index}
              variants={child}
              style={{ 
                display: type === 'chars' ? 'inline-block' : 'inline',
                whiteSpace: type === 'chars' ? 'pre' : 'normal',
                marginRight: type === 'chars' ? '' : '0.25em'
              }}
            >
              {item}
              {type === 'chars' && index !== splitted.length - 1 ? '' : ' '}
            </motion.span>
          ))}
        </span>
      </MotionText>
    </div>
  );
}
