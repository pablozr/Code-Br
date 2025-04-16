'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { Box, BoxProps } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

interface ParallaxProps extends BoxProps {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  children: ReactNode;
}

export function ParallaxEffect({
  speed = 0.1,
  direction = 'up',
  children,
  ...props
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { height } = useViewportSize();

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const scrollY = window.scrollY;
      const elementTop = ref.current.getBoundingClientRect().top + scrollY;
      const elementHeight = ref.current.offsetHeight;
      const viewportBottom = scrollY + height;
      
      // Check if element is in viewport
      if (viewportBottom > elementTop && scrollY < elementTop + elementHeight) {
        const distance = viewportBottom - elementTop;
        const percentage = Math.min(distance / (height + elementHeight), 1);
        
        let transform = '';
        
        switch (direction) {
          case 'up':
            transform = `translateY(${percentage * speed * 100}px)`;
            break;
          case 'down':
            transform = `translateY(-${percentage * speed * 100}px)`;
            break;
          case 'left':
            transform = `translateX(${percentage * speed * 100}px)`;
            break;
          case 'right':
            transform = `translateX(-${percentage * speed * 100}px)`;
            break;
        }
        
        ref.current.style.transform = transform;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction, height]);
  
  return (
    <Box ref={ref} {...props} style={{ transition: 'transform 0.1s ease-out', ...props.style }}>
      {children}
    </Box>
  );
}
