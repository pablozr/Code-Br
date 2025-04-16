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

const pulse = keyframes({
  '0%': { opacity: 0.5, boxShadow: '0 0 5px rgba(153,105,229,0.5)' },
  '50%': { opacity: 0.9, boxShadow: '0 0 10px rgba(153,105,229,0.8)' },
  '100%': { opacity: 0.5, boxShadow: '0 0 5px rgba(153,105,229,0.5)' },
});

const codeLines = [
  '// Website Builder SaaS - Plataforma Suíça de Criação de Sites',
  'export function WebsiteBuilder() {',
  '  const [template, setTemplate] = useState("landing-page");',
  '  const [theme, setTheme] = useState({',
  '    colors: { primary: "#7641C0", secondary: "#9969E5", accent: "#6A5ACD" },',
  '    fonts: { heading: "Manrope", body: "Inter", mono: "JetBrains Mono" },',
  '    spacing: "comfortable",',
  '    radius: "medium",',
  '    mode: "dark"',
  '  });',
  '',
  '  const [components, setComponents] = useState([',
  '    { id: "hero-1", type: "Hero", content: { title: "Websites Suíços", subtitle: "Qualidade e Precisão" } },',
  '    { id: "features-1", type: "Features", content: { items: ["Design Personalizado", "SEO Avançado", "Hospedagem Segura"] } },',
  '    { id: "pricing-1", type: "Pricing", content: { plans: ["Básico", "Profissional", "Enterprise"] } }',
  '  ]);',
  '',
  '  // Configurações de hospedagem na Suíça',
  '  const hostingConfig = {',
  '    region: "switzerland",',
  '    dataProtection: "GDPR compliant",',
  '    backups: "daily",',
  '    ssl: "managed",',
  '    cdn: true',
  '  };',
  '',
  '  return (',
  '    <EditorLayout>',
  '      <Sidebar>',
  '        <ComponentLibrary onDragStart={handleDragStart} />',
  '        <ThemeSettings theme={theme} onChange={setTheme} />',
  '        <HostingPanel config={hostingConfig} />',
  '      </Sidebar>',
  '      <Canvas>',
  '        <DragDropContext onDragEnd={handleDragEnd}>',
  '          <WebsitePreview',
  '            template={template}',
  '            theme={theme}',
  '            components={components}',
  '            onEdit={handleComponentEdit}',
  '          />',
  '        </DragDropContext>',
  '      </Canvas>',
  '      <PublishPanel hostingRegion={hostingConfig.region} />',
  '    </EditorLayout>',
  '  );',
  '}'
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
        maxWidth: 1000, // Aumentado para 1000px para um MacBook maior
        position: 'relative',
        perspective: '1500px', // Aumentado para melhor efeito 3D
        transformStyle: 'preserve-3d',
        margin: '0 auto',
        filter: 'drop-shadow(0 50px 50px rgba(0,0,0,0.5))',
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
          paddingBottom: '65%', // Aumentado para proporcionar mais espaço para o conteúdo
          backgroundColor: '#1e1e1e',
          borderRadius: '20px 20px 0 0', // Bordas mais arredondadas
          position: 'relative',
          overflow: 'hidden',
          border: '2px solid #333',
          transform: isHovered ? 'rotateX(12deg)' : 'rotateX(5deg)',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Animação mais suave
          boxShadow: isHovered
            ? '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(118,65,192,0.4), inset 0 0 3px rgba(255,255,255,0.05)'
            : '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(118,65,192,0.3), inset 0 0 2px rgba(255,255,255,0.03)',
        }}
      >
        {/* Screen bezel */}
        <Box
          style={{
            position: 'absolute',
            top: '1.5%',
            left: '1.5%',
            width: '97%',
            height: '97%',
            background: 'linear-gradient(145deg, #0f0f0f, #121212)',
            borderRadius: '12px', // Bordas mais arredondadas
            padding: '20px',
            boxSizing: 'border-box',
            boxShadow: 'inset 0 0 15px rgba(0,0,0,0.9), inset 0 0 1px rgba(255,255,255,0.1)',
            border: '1px solid #222',
            overflow: 'hidden', // Garante que o conteúdo não ultrapasse as bordas
          }}
        >
          {/* Menu bar */}
          <Box
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '30px', // Altura aumentada
              background: 'linear-gradient(to bottom, #1a1a1a, #161616)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between', // Distribui os elementos
              padding: '0 12px',
              borderBottom: '1px solid #333',
              boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
              zIndex: 10, // Garante que fique acima do conteúdo
            }}
          >
            {/* Traffic lights */}
            <Box style={{ display: 'flex', gap: '8px' }}>
              <Box
                style={{
                  width: '14px', // Tamanho aumentado
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: '#ff5f57',
                  boxShadow: 'inset 0 0 3px rgba(0,0,0,0.2), 0 0 2px rgba(255,95,87,0.4)',
                  border: '0.5px solid rgba(0,0,0,0.1)',
                  transition: 'all 0.2s ease',
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)', // Efeito sutil de escala
                }}
              />
              <Box
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: '#febc2e',
                  boxShadow: 'inset 0 0 3px rgba(0,0,0,0.2), 0 0 2px rgba(254,188,46,0.4)',
                  border: '0.5px solid rgba(0,0,0,0.1)',
                  transition: 'all 0.2s ease',
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                }}
              />
              <Box
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: '#28c840',
                  boxShadow: 'inset 0 0 3px rgba(0,0,0,0.2), 0 0 2px rgba(40,200,64,0.4)',
                  border: '0.5px solid rgba(0,0,0,0.1)',
                  transition: 'all 0.2s ease',
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                }}
              />
            </Box>

            {/* VS Code icon and title */}
            <Box style={{ display: 'flex', alignItems: 'center', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
              <IconBrandVscode size={16} color="#0098ff" style={{ filter: 'drop-shadow(0 0 2px rgba(0,150,255,0.4))' }} />
              <Text size="xs" fw={500} c="gray.4" ml={6} style={{ textShadow: '0 0 1px rgba(0,0,0,0.5)' }}>
                website-builder.tsx - Websites Suíços
              </Text>
            </Box>

            {/* Menu items */}
            <Box style={{ display: 'flex', gap: '15px' }}>
              <Text size="xs" c="gray.5">File</Text>
              <Text size="xs" c="gray.5">Edit</Text>
              <Text size="xs" c="gray.5">View</Text>
              <Text size="xs" c="gray.5" style={{ color: '#9969E5' }}>Preview</Text>
            </Box>
          </Box>

          {/* Code editor */}
          <Box
            style={{
              marginTop: '30px', // Ajustado para a nova altura da barra de menu
              height: 'calc(100% - 30px)',
              background: 'linear-gradient(to bottom, #1e1e1e, #1a1a1a)',
              color: '#ABB2BF',
              fontFamily: '"JetBrains Mono", monospace', // Fonte de código mais moderna
              fontSize: '16px',
              padding: '15px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)',
              borderRadius: '0 0 8px 8px', // Bordas mais arredondadas
              backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(118,65,192,0.03) 0%, transparent 25%)', // Efeito sutil de gradiente
            }}
          >
            {/* Line numbers */}
            <Box
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '40px', // Mais espaço para números de linha
                height: '100%',
                background: 'linear-gradient(to right, #1a1a1a, #252525)',
                paddingTop: '15px',
                textAlign: 'right',
                borderRight: '1px solid #333',
                boxShadow: '1px 0 2px rgba(0,0,0,0.2)',
                zIndex: 5,
              }}
            >
              {codeLines.map((_, i) => (
                <Text
                  key={i}
                  size="xs"
                  c="dimmed"
                  style={{
                    lineHeight: '1.6', // Mais espaço entre linhas
                    paddingRight: '8px',
                    opacity: i < visibleLines ? 1 : 0,
                    fontFamily: '"JetBrains Mono", monospace',
                    color: i === cursorPosition.line ? '#9969E5' : '#636363', // Destaque para a linha atual
                    transition: 'color 0.3s ease',
                  }}
                >
                  {i + 1}
                </Text>
              ))}
            </Box>

            {/* Code content */}
            <Box style={{ marginLeft: '50px', paddingTop: '15px' }}>
              {codeLines.map((line, i) => (
                <Box
                  key={i}
                  style={{
                    lineHeight: '1.6',
                    opacity: i < visibleLines ? 1 : 0,
                    transition: 'opacity 0.3s, background-color 0.3s',
                    position: 'relative',
                    whiteSpace: 'pre',
                    overflow: 'hidden',
                    animation: i < visibleLines ? `${typing} 0.6s ease-out` : 'none',
                    backgroundColor: i === cursorPosition.line ? 'rgba(118,65,192,0.07)' : 'transparent', // Destaque sutil para a linha atual
                    borderRadius: '3px',
                    padding: '0 5px',
                    marginRight: '10px',
                  }}
                >
                  <Text
                    component="span"
                    style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      color: codeColors.text,
                      letterSpacing: '-0.025em', // Melhor espaçamento entre caracteres
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
                        width: '2.5px',
                        height: '1.2em',
                        background: 'linear-gradient(to bottom, rgba(153,105,229,1), rgba(118,65,192,0.8))',
                        position: 'absolute',
                        left: `${cursorPosition.char * 9.5}px`, // Ajustado para o novo tamanho da fonte
                        top: '2px',
                        animation: `${blink} 1s infinite`,
                        boxShadow: '0 0 8px rgba(153,105,229,0.8)',
                        borderRadius: '1px',
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
          height: '20px', // Aumentado para proporcionalidade
          background: 'linear-gradient(to bottom, #1a1a1a, #0f0f0f)',
          borderRadius: '0 0 20px 20px', // Bordas mais arredondadas
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(118,65,192,0.3)',
          position: 'relative',
          transform: isHovered ? 'rotateX(15deg) translateZ(-8px)' : 'rotateX(6deg) translateZ(-5px)',
          transformOrigin: 'top',
          borderLeft: '2px solid #333',
          borderRight: '2px solid #333',
          borderBottom: '2px solid #333',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
      >
        {/* Touchpad */}
        <Box
          style={{
            width: '45%',
            height: '6px',
            background: 'linear-gradient(to right, #333, #444, #333)',
            position: 'absolute',
            top: '7px',
            left: '27.5%',
            borderRadius: '4px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.4) inset, 0 0 2px rgba(118,65,192,0.2)',
            opacity: isHovered ? 0.9 : 0.7,
            transition: 'opacity 0.3s ease',
          }}
        />

        {/* Indicador LED */}
        <Box
          style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: '#9969E5',
            position: 'absolute',
            right: '15px',
            top: '8px',
            boxShadow: '0 0 5px rgba(153,105,229,0.8)',
            animation: `${pulse} 2s infinite`,
            opacity: isHovered ? 0.8 : 0.5,
            transition: 'opacity 0.3s ease',
          }}
        />

        {/* Logo personalizado */}
        <Box
          style={{
            width: '20px',
            height: '20px',
            position: 'absolute',
            bottom: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: 0.15,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239969E5'%3E%3Cpath d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'/%3E%3C/svg%3E")`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            filter: 'drop-shadow(0 0 2px rgba(153,105,229,0.5))',
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
          background: 'linear-gradient(135deg, rgba(118,65,192,0.3) 0%, rgba(118,65,192,0) 60%)',
          pointerEvents: 'none',
          borderRadius: '20px',
          zIndex: 10,
          opacity: isHovered ? 0.9 : 0.7,
          transition: 'opacity 0.3s ease',
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
          background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
          pointerEvents: 'none',
          borderRadius: '15px',
          zIndex: 11,
          opacity: isHovered ? 0.8 : 0.6,
          transition: 'opacity 0.3s ease',
          backdropFilter: 'blur(2px)',
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
          background: 'radial-gradient(ellipse at center, rgba(118,65,192,0.05) 0%, rgba(118,65,192,0) 70%)',
          pointerEvents: 'none',
          borderRadius: '50%',
          zIndex: 11,
          opacity: isHovered ? 0.7 : 0.5,
          filter: 'blur(15px)',
          transition: 'opacity 0.3s ease, filter 0.3s ease',
        }}
      />

      {/* Bottom edge highlight */}
      <Box
        style={{
          position: 'absolute',
          bottom: 0,
          left: '10%',
          width: '80%',
          height: '2px',
          background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(118,65,192,0.4) 50%, rgba(0,0,0,0) 100%)',
          pointerEvents: 'none',
          zIndex: 12,
          boxShadow: '0 0 10px rgba(118,65,192,0.3)',
          opacity: isHovered ? 1 : 0.7,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Efeito de brilho ao redor */}
      <Box
        style={{
          position: 'absolute',
          width: '120%',
          height: '120%',
          top: '-10%',
          left: '-10%',
          background: 'radial-gradient(ellipse at center, rgba(118,65,192,0.15) 0%, rgba(118,65,192,0) 70%)',
          pointerEvents: 'none',
          opacity: isHovered ? 0.6 : 0,
          transition: 'opacity 0.5s ease',
          zIndex: -1,
          transform: 'translateZ(-50px)',
          filter: 'blur(20px)',
        }}
      />
    </Box>
  );
}











