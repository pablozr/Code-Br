'use client';

import { useState, useEffect } from 'react';
import { Box, Text } from '@mantine/core';
import { keyframes } from '@emotion/react';
import { IconBrandVscode } from '@tabler/icons-react';
import { JSX } from 'react';

const blink = keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0 },
});

const typing = keyframes({
  from: { width: '0%' },
  to: { width: '100%' },
});

const codeLines = [
  '<div className="hero">',
  '  <h1>Websites Suíços</h1>',
  '  <p>Qualidade e Precisão em cada detalhe</p>',
  '  <Button>',
  '    Ver nossos serviços',
  '  </Button>',
  '</div>'
];

const codeColors = {
  tag: '#E06C75',
  attr: '#D19A66',
  string: '#98C379',
  component: '#61AFEF',
  comment: '#7F848E',
  text: '#ABB2BF',
};

export function MacbookSimulator() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ line: 0, char: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (visibleLines < codeLines.length) {
      const timer = setTimeout(() => {
        setVisibleLines(prev => prev + 1);
        setCursorPosition({ line: visibleLines, char: 0 });
      }, 400);
      return () => clearTimeout(timer);
    } else {
      // Move cursor around after all lines are visible
      const timer = setInterval(() => {
        setCursorPosition(_prev => {
          const randomLine = Math.floor(Math.random() * codeLines.length);
          const randomChar = Math.floor(Math.random() * codeLines[randomLine].length);
          return { line: randomLine, char: randomChar };
        });
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [visibleLines]);

  const formatCode = (line: string, lineIndex: number) => {
    // Simple syntax highlighting
    let formattedLine = line;

    // Split the line into parts to preserve JSX structure
    const parts: JSX.Element[] = [];
    let currentIndex = 0;
    const tagMatches = Array.from(formattedLine.matchAll(/(&lt;|<)(\/?)([\w-]+)(&gt;|>)/g));

    tagMatches.forEach((match, i) => {
      const [fullMatch, open, slash, tag, close] = match;
      const matchIndex = match.index!;

      // Add text before the tag if there is any
      if (matchIndex > currentIndex) {
        parts.push(
          <span key={`text-${lineIndex}-${i}`}>
            {formattedLine.substring(currentIndex, matchIndex)}
          </span>
        );
      }

      // Add the tag
      parts.push(
        <span key={`tag-${lineIndex}-${i}`}>
          <span style={{ color: codeColors.tag }}>{open}{slash}{tag}</span>
          <span style={{ color: codeColors.tag }}>{close}</span>
        </span>
      );

      currentIndex = matchIndex + fullMatch.length;
    });

    // Add any remaining text
    if (currentIndex < formattedLine.length) {
      parts.push(
        <span key={`text-${lineIndex}-final`}>
          {formattedLine.substring(currentIndex)}
        </span>
      );
    }

    // Create JSX element with parts

    // Convert the JSX element back to an array of parts for manipulation
    let currentParts: (string | JSX.Element)[] = parts;

    // Process attributes
    currentParts = currentParts.map(part => {
      if (typeof part === 'object' && part !== null && 'props' in part && typeof part.props?.children === 'string') {
        const text = part.props.children;
        const attrRegex = /([\w-]+)=/g;
        let lastIndex = 0;
        const newParts = [];
        let match;

        while ((match = attrRegex.exec(text)) !== null) {
          const [fullMatch, attr] = match;
          newParts.push(text.slice(lastIndex, match.index));
          newParts.push(
            <span key={`attr-${lineIndex}-${match.index}`} style={{ color: codeColors.attr }}>
              {attr}=
            </span>
          );
          lastIndex = match.index + fullMatch.length;
        }
        newParts.push(text.slice(lastIndex));
        return newParts;
      }
      return part;
    }).flat();

    // Process strings
    currentParts = (currentParts as (string | JSX.Element)[]).map(part => {
      if (typeof part === 'string') {
        const stringRegex = /"([^"]*)"/g;
        let lastIndex = 0;
        const newParts = [];
        let match;

        while ((match = stringRegex.exec(part)) !== null) {
          const [fullMatch, string] = match;
          newParts.push((part as string).slice(lastIndex, match.index));
          newParts.push(
            <span key={`string-${lineIndex}-${match.index}`} style={{ color: codeColors.string }}>
              "{string}"
            </span>
          );
          lastIndex = match.index + fullMatch.length;
        }
        newParts.push((part as string).slice(lastIndex));
        return newParts;
      }
      return part;
    }).flat();

    // Process component names
    currentParts = (currentParts as (string | JSX.Element)[]).map(part => {
      if (typeof part === 'string') {
        const componentRegex = /<(Button|Container|Box|Card)/g;
        let lastIndex = 0;
        const newParts = [];
        let match;

        while ((match = componentRegex.exec(part)) !== null) {
          const [fullMatch, component] = match;
          newParts.push(part.slice(lastIndex, match.index));
          newParts.push(
            <span key={`component-${lineIndex}-${match.index}`}>
              &lt;<span style={{ color: codeColors.component }}>{component}</span>
            </span>
          );
          lastIndex = match.index + fullMatch.length;
        }
        newParts.push(part.slice(lastIndex));
        return newParts;
      }
      return part;
    }).flat();

    return <>{currentParts}</>;
  };

  return (
    <Box
      style={{
        width: '100%',
        maxWidth: 600,
        position: 'relative',
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        margin: '0 auto',
        filter: 'drop-shadow(0 30px 30px rgba(0,0,0,0.3))',
        transition: 'all 0.5s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* MacBook body */}
      <Box
        style={{
          width: '100%',
          height: 0,
          paddingBottom: '62%',
          backgroundColor: '#1e1e1e',
          borderRadius: '15px 15px 0 0',
          position: 'relative',
          overflow: 'hidden',
          border: '2px solid #333',
          transform: isHovered ? 'rotateX(10deg)' : 'rotateX(5deg)',
          transition: 'all 0.3s ease',
          boxShadow: isHovered
            ? '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(118,65,192,0.3)'
            : '0 15px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(118,65,192,0.2)',
        }}
      >
        {/* Screen bezel */}
        <Box
          style={{
            position: 'absolute',
            top: '2%',
            left: '2%',
            width: '96%',
            height: '96%',
            background: 'linear-gradient(145deg, #0f0f0f, #121212)',
            borderRadius: '8px',
            padding: '20px',
            boxSizing: 'border-box',
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8)',
            border: '1px solid #222',
          }}
        >
          {/* Menu bar */}
          <Box
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '25px',
              background: 'linear-gradient(to bottom, #1a1a1a, #161616)',
              display: 'flex',
              alignItems: 'center',
              padding: '0 10px',
              borderBottom: '1px solid #333',
              boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
            }}
          >
            {/* Traffic lights */}
            <Box style={{ display: 'flex', gap: '6px' }}>
              <Box
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#ff5f57',
                  boxShadow: 'inset 0 0 2px rgba(0,0,0,0.2)',
                  border: '0.5px solid rgba(0,0,0,0.1)',
                }}
              />
              <Box
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#febc2e',
                  boxShadow: 'inset 0 0 2px rgba(0,0,0,0.2)',
                  border: '0.5px solid rgba(0,0,0,0.1)',
                }}
              />
              <Box
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#28c840',
                  boxShadow: 'inset 0 0 2px rgba(0,0,0,0.2)',
                  border: '0.5px solid rgba(0,0,0,0.1)',
                }}
              />
            </Box>

            {/* VS Code icon and title */}
            <Box style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
              <IconBrandVscode size={14} color="#0098ff" style={{ filter: 'drop-shadow(0 0 1px rgba(0,150,255,0.3))' }} />
              <Text size="xs" c="dimmed" ml={5} style={{ textShadow: '0 0 1px rgba(0,0,0,0.5)' }}>
                index.tsx - Websites Suíços
              </Text>
            </Box>
          </Box>

          {/* Code editor */}
          <Box
            style={{
              marginTop: '25px',
              height: 'calc(100% - 25px)',
              background: 'linear-gradient(to bottom, #1e1e1e, #1a1a1a)',
              color: '#ABB2BF',
              fontFamily: 'monospace',
              fontSize: '14px',
              padding: '10px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)',
              borderRadius: '0 0 4px 4px',
            }}
          >
            {/* Line numbers */}
            <Box
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '30px',
                height: '100%',
                background: 'linear-gradient(to right, #1a1a1a, #252525)',
                paddingTop: '10px',
                textAlign: 'right',
                borderRight: '1px solid #333',
                boxShadow: '1px 0 2px rgba(0,0,0,0.2)',
              }}
            >
              {codeLines.map((_, i) => (
                <Text
                  key={i}
                  size="xs"
                  c="dimmed"
                  style={{
                    lineHeight: '1.5',
                    paddingRight: '5px',
                    opacity: i < visibleLines ? 1 : 0,
                  }}
                >
                  {i + 1}
                </Text>
              ))}
            </Box>

            {/* Code content */}
            <Box style={{ marginLeft: '35px', paddingTop: '10px' }}>
              {codeLines.map((line, i) => (
                <Box
                  key={i}
                  style={{
                    lineHeight: '1.5',
                    opacity: i < visibleLines ? 1 : 0,
                    transition: 'opacity 0.2s',
                    position: 'relative',
                    whiteSpace: 'pre',
                    overflow: 'hidden',
                    animation: i < visibleLines ? `${typing} 0.5s ease-out` : 'none',
                  }}
                >
                  <Text
                    component="span"
                    style={{
                      fontFamily: 'monospace',
                      color: codeColors.text,
                    }}
                  >
                    {formatCode(line, i)}
                  </Text>

                  {/* Cursor */}
                  {cursorPosition.line === i && (
                    <Box
                      component="span"
                      style={{
                        display: 'inline-block',
                        width: '2px',
                        height: '1.2em',
                        background: 'linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
                        position: 'absolute',
                        left: `${cursorPosition.char * 8}px`,
                        top: '0',
                        animation: `${blink} 1s infinite`,
                        boxShadow: '0 0 3px rgba(255,255,255,0.5)',
                      }}
                    />
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* MacBook base */}
      <Box
        style={{
          width: '100%',
          height: '12px',
          background: 'linear-gradient(to bottom, #1a1a1a, #0f0f0f)',
          borderRadius: '0 0 15px 15px',
          boxShadow: '0 5px 20px rgba(0, 0, 0, 0.7), 0 0 10px rgba(118,65,192,0.15)',
          position: 'relative',
          transform: isHovered ? 'rotateX(10deg) translateZ(-5px)' : 'rotateX(5deg) translateZ(-5px)',
          transformOrigin: 'top',
          borderLeft: '2px solid #333',
          borderRight: '2px solid #333',
          borderBottom: '2px solid #333',
        }}
      >
        {/* Touchpad */}
        <Box
          style={{
            width: '40%',
            height: '4px',
            background: 'linear-gradient(to right, #333, #444, #333)',
            position: 'absolute',
            top: '4px',
            left: '30%',
            borderRadius: '2px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.3) inset',
          }}
        />

        {/* Apple logo (subtle) */}
        <Box
          style={{
            width: '15px',
            height: '15px',
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: 0.1,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'%3E%3Cpath fill='white' d='M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z'/%3E%3C/svg%3E")`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        />
      </Box>

      {/* Reflection/glow effect */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(118,65,192,0.15) 0%, rgba(118,65,192,0) 60%)',
          pointerEvents: 'none',
          borderRadius: '15px',
          zIndex: 10,
        }}
      />

      {/* Screen glare effect */}
      <Box
        style={{
          position: 'absolute',
          top: '2%',
          left: '5%',
          width: '90%',
          height: '60%',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)',
          pointerEvents: 'none',
          borderRadius: '10px',
          zIndex: 11,
          opacity: 0.7,
        }}
      />

      {/* Subtle screen reflection */}
      <Box
        style={{
          position: 'absolute',
          top: '5%',
          left: '10%',
          width: '80%',
          height: '50%',
          background: 'radial-gradient(ellipse at center, rgba(118,65,192,0.03) 0%, rgba(118,65,192,0) 70%)',
          pointerEvents: 'none',
          borderRadius: '50%',
          zIndex: 11,
          opacity: 0.5,
          filter: 'blur(10px)',
        }}
      />

      {/* Bottom edge highlight */}
      <Box
        style={{
          position: 'absolute',
          bottom: 0,
          left: '10%',
          width: '80%',
          height: '1px',
          background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(118,65,192,0.3) 50%, rgba(0,0,0,0) 100%)',
          pointerEvents: 'none',
          zIndex: 12,
        }}
      />
    </Box>
  );
}











