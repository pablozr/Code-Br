'use client';

import { useRef, useEffect } from 'react';
import { Box, Text, TextProps } from '@mantine/core';

interface VideoMaskTextProps extends Omit<TextProps, 'children'> {
  text: string;
  videoSrc: string;
  fontSize?: string | number;
  fontWeight?: number;
  lineHeight?: number;
}

export function VideoMaskText({
  text,
  videoSrc,
  fontSize = '5rem',
  fontWeight = 800,
  lineHeight = 1.1,
  ...props
}: VideoMaskTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(error => {
      console.error('Video autoplay failed:', error);
    });

    return () => {
      video.pause();
    };
  }, []);

  return (
    <Box
      ref={containerRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: 'fit-content',
        margin: '0 auto',
      }}
    >
      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Text that masks the video */}
      <Text
        style={{
          fontSize,
          fontWeight,
          lineHeight,
          WebkitTextFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          position: 'relative',
          mixBlendMode: 'screen',
          ...props.style,
        }}
        {...props}
      >
        {text}
      </Text>
    </Box>
  );
}
