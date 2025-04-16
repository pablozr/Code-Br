'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Box } from '@mantine/core';

export function GradientNebulaBackground() { // Aurora Neon with Code Simulation
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const codeCanvasRef = useRef<HTMLCanvasElement>(null);
  const [codeLines, setCodeLines] = useState<string[]>([]);

  // Sample code snippets for the simulation
  const codeSamples = [
    'function createWebsite(config) {',
    '  const { layout, theme, components } = config;',
    '  return new Website(layout, theme, components);',
    '}',
    '',
    'class Website extends SiteBuilder {',
    '  constructor(layout, theme, components) {',
    '    super();',
    '    this.layout = layout;',
    '    this.theme = theme;',
    '    this.components = components;',
    '  }',
    '',
    '  render() {',
    '    return this.components.map(c => c.render());',
    '  }',
    '',
    '  deploy() {',
    '    const site = this.compile();',
    '    return SwissHosting.deploy(site);',
    '  }',
    '}',
  ];

  // Code typing animation effect
  useEffect(() => {
    let currentLines: string[] = [];
    let currentLineIndex = 0;
    let currentCharIndex = 0;
    let typingInterval: NodeJS.Timeout;

    const typeNextChar = () => {
      if (currentLineIndex >= codeSamples.length) {
        // Reset to start typing again
        currentLines = [];
        currentLineIndex = 0;
        currentCharIndex = 0;
        setCodeLines([]);
        return;
      }

      const currentSample = codeSamples[currentLineIndex];

      if (currentCharIndex === 0) {
        currentLines.push('');
      }

      if (currentCharIndex < currentSample.length) {
        // Type next character
        const updatedLine = currentSample.substring(0, currentCharIndex + 1);
        currentLines[currentLines.length - 1] = updatedLine;
        setCodeLines([...currentLines]);
        currentCharIndex++;
      } else {
        // Move to next line
        currentLineIndex++;
        currentCharIndex = 0;

        // If we have too many lines, remove the first one
        if (currentLines.length > 15) {
          currentLines.shift();
        }
      }
    };

    // Start typing animation
    typingInterval = setInterval(typeNextChar, 50);

    return () => {
      clearInterval(typingInterval);
    };
  }, []);

  // Mouse movement effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to be between -1 and 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <Box
      className="aurora-background"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        overflow: 'hidden',
        background: 'linear-gradient(to bottom, #0A0A0A, #0F0F1A)',
      }}
    >
      {/* Base dark layer */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(ellipse at center, rgba(15, 10, 30, 0.2) 0%, rgba(10, 10, 10, 0.9) 100%)',
        }}
      />

      {/* Aurora waves */}
      <Box
        className="aurora-wave aurora-wave-1"
        style={{
          position: 'absolute',
          top: `${30 + mousePosition.y * 5}%`,
          left: `${20 + mousePosition.x * 10}%`,
          width: '80%',
          height: '40%',
          background: 'linear-gradient(90deg, rgba(120, 0, 255, 0.0) 0%, rgba(120, 0, 255, 0.1) 20%, rgba(72, 0, 255, 0.08) 40%, rgba(0, 183, 255, 0.1) 60%, rgba(0, 255, 255, 0.08) 80%, rgba(120, 0, 255, 0.0) 100%)',
          borderRadius: '50% 50% 50% 50% / 100% 100% 100% 100%',
          filter: 'blur(60px)',
          opacity: 0.5,
          transform: 'skewY(-5deg)',
          animation: 'aurora-wave-1 15s ease-in-out infinite alternate',
        }}
      />

      <Box
        className="aurora-wave aurora-wave-2"
        style={{
          position: 'absolute',
          top: `${50 - mousePosition.y * 5}%`,
          left: `${10 - mousePosition.x * 5}%`,
          width: '90%',
          height: '30%',
          background: 'linear-gradient(90deg, rgba(120, 0, 255, 0.0) 0%, rgba(0, 153, 255, 0.08) 20%, rgba(170, 0, 255, 0.1) 40%, rgba(230, 0, 255, 0.08) 60%, rgba(0, 200, 255, 0.1) 80%, rgba(120, 0, 255, 0.0) 100%)',
          borderRadius: '50% 50% 50% 50% / 100% 100% 100% 100%',
          filter: 'blur(70px)',
          opacity: 0.4,
          transform: 'skewY(3deg)',
          animation: 'aurora-wave-2 18s ease-in-out infinite alternate',
        }}
      />

      <Box
        className="aurora-wave aurora-wave-3"
        style={{
          position: 'absolute',
          top: `${70 + mousePosition.y * 3}%`,
          left: `${-10 + mousePosition.x * 8}%`,
          width: '100%',
          height: '25%',
          background: 'linear-gradient(90deg, rgba(120, 0, 255, 0.0) 0%, rgba(0, 255, 200, 0.08) 20%, rgba(0, 150, 255, 0.1) 40%, rgba(150, 0, 255, 0.08) 60%, rgba(255, 0, 200, 0.1) 80%, rgba(120, 0, 255, 0.0) 100%)',
          borderRadius: '50% 50% 50% 50% / 100% 100% 100% 100%',
          filter: 'blur(65px)',
          opacity: 0.45,
          transform: 'skewY(-2deg)',
          animation: 'aurora-wave-3 20s ease-in-out infinite alternate',
        }}
      />

      {/* Code simulation overlay */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '50%', // Only cover the top portion
          overflow: 'hidden',
          opacity: 0.15,
          zIndex: 1,
          fontFamily: 'monospace',
          color: '#a0f0ff',
          fontSize: '14px',
          padding: '20px',
          pointerEvents: 'none',
        }}
      >
        {codeLines.map((line, index) => (
          <Box
            key={index}
            style={{
              marginBottom: '4px',
              textShadow: '0 0 5px rgba(160, 240, 255, 0.8)',
              opacity: 1 - (index * 0.05), // Fade out older lines
            }}
          >
            {line}
          </Box>
        ))}
      </Box>

      {/* Subtle stars */}
      <Box
        className="stars"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(1px 1px at 50px 160px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 90px 40px, #ffffff, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 130px 80px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 160px 120px, #ffffff, rgba(0,0,0,0))',
          backgroundSize: '550px 550px',
          backgroundRepeat: 'repeat',
          opacity: 0.08,
        }}
      />

      {/* Subtle glow in the center */}
      <Box
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60%',
          height: '60%',
          background: 'radial-gradient(circle, rgba(120, 0, 255, 0.03) 0%, transparent 70%)',
          filter: 'blur(80px)',
          opacity: 0.4,
          animation: 'pulse-glow 8s ease-in-out infinite alternate',
        }}
      />

      <style jsx global>{`
        @keyframes aurora-wave-1 {
          0% { transform: translateX(-3%) skewY(-3deg); }
          100% { transform: translateX(3%) skewY(-1deg); }
        }

        @keyframes aurora-wave-2 {
          0% { transform: translateX(2%) skewY(2deg); }
          100% { transform: translateX(-2%) skewY(3deg); }
        }

        @keyframes aurora-wave-3 {
          0% { transform: translateX(-2%) skewY(-1deg); }
          100% { transform: translateX(2%) skewY(-2deg); }
        }

        @keyframes pulse-glow {
          0% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.05); }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </Box>
  );
}
