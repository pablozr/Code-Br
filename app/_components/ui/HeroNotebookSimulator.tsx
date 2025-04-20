'use client';

import { useState, useEffect } from 'react';
import { Box, Text, Group, Badge, Divider } from '@mantine/core';
import { keyframes } from '@emotion/react';
import {
  IconBrandVscode,
  IconCode,
  IconBrandHtml5,
  IconBrandCss3,
  IconBrandJavascript,
  IconBrandReact,
  IconBrandNextjs,
  IconSettings,
  IconLayoutDashboard,
  IconPlus,
  IconTerminal,
  IconDeviceLaptop,
  IconBrandGithub,
  IconRocket
} from '@tabler/icons-react';

// Animações
const blink = keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0 },
});

// Animação de typing removida pois não está sendo utilizada

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const slideInFromBottom = keyframes({
  from: { transform: 'translateY(20px)', opacity: 0 },
  to: { transform: 'translateY(0)', opacity: 1 },
});

const glitch = keyframes({
  '0%': { transform: 'translate(0)' },
  '20%': { transform: 'translate(-2px, 2px)' },
  '40%': { transform: 'translate(-2px, -2px)' },
  '60%': { transform: 'translate(2px, 2px)' },
  '80%': { transform: 'translate(2px, -2px)' },
  '100%': { transform: 'translate(0)' },
});

const pulse = keyframes({
  '0%': { boxShadow: '0 0 0 0 rgba(118, 65, 217, 0.5)' },
  '70%': { boxShadow: '0 0 0 10px rgba(118, 65, 217, 0)' },
  '100%': { boxShadow: '0 0 0 0 rgba(118, 65, 217, 0)' },
});

// Cores para o editor de código
const codeColors = {
  tag: '#E06C75',
  attr: '#D19A66',
  string: '#98C379',
  component: '#61AFEF',
  comment: '#7F848E',
  text: '#ABB2BF',
  keyword: '#C678DD',
  function: '#61AFEF',
  variable: '#E06C75',
  property: '#D19A66',
  selector: '#98C379',
};

export function HeroNotebookSimulator() {
  const [activeTab, setActiveTab] = useState('split-view');
  const [typedCode, setTypedCode] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [showGlitch, setShowGlitch] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [autoPlayProgress, setAutoPlayProgress] = useState(0);

  // Código a ser digitado linha por linha
  const codeLines = [
    "import React from 'react';",
    "import { motion } from 'framer-motion';",
    "",
    "export default function HeroSection() {",
    "  return (",
    "    <motion.div",
    "      initial={{ opacity: 0 }}",
    "      animate={{ opacity: 1 }}",
    "      className='hero-container'",
    "    >",
    "      <h1 className='title'>CodeBR</h1>",
    "      <p className='subtitle'>Desenvolvimento de sites profissionais</p>",
    "      <div className='cta-buttons'>",
    "        <motion.button",
    "          whileHover={{ scale: 1.05 }}",
    "          className='primary-button'",
    "        >",
    "          Ver serviços",
    "        </motion.button>",
    "      </div>",
    "    </motion.div>",
    "  );",
    "}"
  ];

  // Simulação de saída do terminal
  const terminalLines = [
    { text: '$ npm create next-app codebr-website', delay: 500 },
    { text: 'Creating a new Next.js app in codebr-website...', delay: 1000 },
    { text: 'Installing dependencies...', delay: 2000 },
    { text: '> Installing react, next, framer-motion...', delay: 2500 },
    { text: '> Configuring project...', delay: 3500 },
    { text: 'Success! Created codebr-website', delay: 4500 },
    { text: '$ cd codebr-website', delay: 5000 },
    { text: '$ npm run dev', delay: 5500 },
    { text: '> codebr-website@0.1.0 dev', delay: 6000 },
    { text: '> next dev', delay: 6500 },
    { text: 'ready - started server on 0.0.0.0:3000', delay: 7000 },
    { text: 'event - compiled client and server successfully in 1.2s', delay: 7500 },
    { text: '✓ Ready in 1.2s', delay: 8000 },
  ];

  // Efeito para digitação do código
  useEffect(() => {
    if (activeTab === 'split-view' || activeTab === 'editor') {
      const interval = setInterval(() => {
        if (currentLineIndex < codeLines.length) {
          setTypedCode(prev => prev + codeLines[currentLineIndex] + '\n');
          setCurrentLineIndex(prev => prev + 1);
        } else {
          clearInterval(interval);
        }
      }, 300);

      return () => clearInterval(interval);
    }
  }, [currentLineIndex, activeTab]);

  // Efeito para piscar o cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  // Efeito para mostrar glitch ocasionalmente
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setShowGlitch(true);
        setTimeout(() => setShowGlitch(false), 200);
      }
    }, 5000);

    return () => clearInterval(glitchInterval);
  }, []);

  // Efeito para simular saída do terminal
  useEffect(() => {
    if (activeTab === 'terminal') {
      let timeouts: NodeJS.Timeout[] = [];

      terminalLines.forEach((line) => {
        const timeout = setTimeout(() => {
          setTerminalOutput(prev => [...prev, line.text]);
        }, line.delay);

        timeouts.push(timeout);
      });

      return () => timeouts.forEach(timeout => clearTimeout(timeout));
    } else {
      setTerminalOutput([]);
    }
  }, [activeTab]);

  // Efeito para alternar automaticamente entre as abas
  useEffect(() => {
    const tabSequence = ['split-view', 'editor', 'preview', 'terminal', 'settings'];
    let currentTabIndex = tabSequence.indexOf(activeTab);
    if (currentTabIndex === -1) currentTabIndex = 0;

    const tabDuration = 8000; // 8 segundos por aba
    const progressUpdateInterval = 100; // Atualizar a barra de progresso a cada 100ms

    // Intervalo para atualizar a barra de progresso
    const progressInterval = setInterval(() => {
      setAutoPlayProgress(prev => {
        if (prev >= 100) return 0;
        return prev + (100 * progressUpdateInterval / tabDuration);
      });
    }, progressUpdateInterval);

    // Intervalo para trocar as abas
    const autoTabInterval = setInterval(() => {
      // Avançar para a próxima aba na sequência
      currentTabIndex = (currentTabIndex + 1) % tabSequence.length;
      setActiveTab(tabSequence[currentTabIndex]);

      // Resetar a barra de progresso
      setAutoPlayProgress(0);

      // Resetar o estado de digitação quando voltar para abas de código
      if (tabSequence[currentTabIndex] === 'split-view' || tabSequence[currentTabIndex] === 'editor') {
        setTypedCode('');
        setCurrentLineIndex(0);
      }

      // Resetar o terminal quando voltar para a aba terminal
      if (tabSequence[currentTabIndex] === 'terminal') {
        setTerminalOutput([]);
      }
    }, tabDuration);

    return () => {
      clearInterval(autoTabInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <Box
      style={{
        width: '100%',
        maxWidth: 1000,
        position: 'relative',
        perspective: '1500px',
        transformStyle: 'preserve-3d',
        margin: '0 auto',
        filter: 'drop-shadow(0 50px 50px rgba(0,0,0,0.5))',
        transition: 'all 0.5s ease',
      }}
    >
      {/* MacBook body */}
      <Box
        style={{
          width: '1000px',
          height: 0,
          paddingBottom: '65%',
          backgroundColor: '#1e1e1e',
          borderRadius: '20px 20px 0 0',
          position: 'relative',
          overflow: 'hidden',
          border: '2px solid #333',
          transform: 'rotateX(12deg)',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(118,65,192,0.4), inset 0 0 3px rgba(255,255,255,0.05)',
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
            borderRadius: '12px',
            padding: '20px',
            boxSizing: 'border-box',
            boxShadow: 'inset 0 0 15px rgba(0,0,0,0.9), inset 0 0 1px rgba(255,255,255,0.1)',
            border: '1px solid #222',
            overflow: 'hidden',
          }}
        >
          {/* Menu bar */}
          <Box
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '30px',
              background: 'linear-gradient(to bottom, #1a1a1a, #161616)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 12px',
              borderBottom: '1px solid #333',
              boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
              zIndex: 10,
            }}
          >
            {/* Traffic lights */}
            <Box style={{ display: 'flex', gap: '8px' }}>
              <Box
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: '#ff5f57',
                  boxShadow: 'inset 0 0 3px rgba(0,0,0,0.2), 0 0 2px rgba(255,95,87,0.4)',
                  border: '0.5px solid rgba(0,0,0,0.1)',
                  transform: 'scale(1.05)',
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
                  transform: 'scale(1.05)',
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
                  transform: 'scale(1.05)',
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

            {/* Indicador de apresentação automática */}
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                position: 'absolute',
                right: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(20, 20, 20, 0.7)',
                backdropFilter: 'blur(5px)',
                padding: '4px 8px',
                borderRadius: '4px',
                border: '1px solid rgba(153, 105, 229, 0.2)',
              }}
            >
              <Text size="xs" c="gray.4" fw={500} style={{ fontSize: '10px' }}>
                Demonstração automática
              </Text>
              <Box
                style={{
                  width: '60px',
                  height: '4px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                }}
              >
                <Box
                  style={{
                    width: `${autoPlayProgress}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #7641C0, #9969E5)',
                    borderRadius: '2px',
                    transition: 'width 0.1s linear',
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Conteúdo principal */}
          <Box
            style={{
              position: 'absolute',
              top: '30px',
              left: 0,
              width: '100%',
              height: 'calc(100% - 30px)',
              display: 'flex',
              overflow: 'hidden',
            }}
          >
            {/* Sidebar */}
            <Box
              style={{
                width: '60px',
                height: '100%',
                background: '#1e1e1e',
                borderRight: '1px solid #333',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '15px 0',
                gap: '20px',
              }}
            >
              <IconBrandVscode size={24} color="#0098ff" style={{ filter: 'drop-shadow(0 0 2px rgba(0,150,255,0.4))' }} />

              <IconCode
                size={24}
                color={activeTab === 'editor' ? '#fff' : '#666'}
                style={{
                  filter: activeTab === 'editor' ? 'drop-shadow(0 0 2px rgba(255,255,255,0.4))' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onClick={() => setActiveTab('editor')}
              />

              <IconDeviceLaptop
                size={24}
                color={activeTab === 'split-view' ? '#fff' : '#666'}
                style={{
                  filter: activeTab === 'split-view' ? 'drop-shadow(0 0 2px rgba(255,255,255,0.4))' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onClick={() => setActiveTab('split-view')}
              />

              <IconLayoutDashboard
                size={24}
                color={activeTab === 'preview' ? '#fff' : '#666'}
                style={{
                  filter: activeTab === 'preview' ? 'drop-shadow(0 0 2px rgba(255,255,255,0.4))' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onClick={() => setActiveTab('preview')}
              />

              <IconTerminal
                size={24}
                color={activeTab === 'terminal' ? '#fff' : '#666'}
                style={{
                  filter: activeTab === 'terminal' ? 'drop-shadow(0 0 2px rgba(255,255,255,0.4))' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onClick={() => setActiveTab('terminal')}
              />

              <IconSettings
                size={24}
                color={activeTab === 'settings' ? '#fff' : '#666'}
                style={{
                  filter: activeTab === 'settings' ? 'drop-shadow(0 0 2px rgba(255,255,255,0.4))' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onClick={() => setActiveTab('settings')}
              />
            </Box>

            {/* Explorer sidebar */}
            <Box
              style={{
                width: '220px',
                height: '100%',
                background: '#252526',
                borderRight: '1px solid #333',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <Box
                style={{
                  padding: '10px',
                  borderBottom: '1px solid #333',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text size="xs" fw={600} c="gray.4">EXPLORER: WEBSITE BUILDER</Text>
                <IconPlus size={16} color="#888" style={{ cursor: 'pointer' }} />
              </Box>

              <Box style={{ padding: '10px 0', overflow: 'auto', flex: 1 }}>
                <Box
                  style={{
                    padding: '5px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    background: '#37373d',
                  }}
                >
                  <IconBrandReact size={16} color="#61DAFB" />
                  <Text size="xs" fw={500} c="gray.3">website-builder.tsx</Text>
                </Box>

                <Box
                  style={{
                    padding: '5px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                  }}
                >
                  <IconBrandCss3 size={16} color="#2965f1" />
                  <Text size="xs" fw={500} c="gray.5">styles.css</Text>
                </Box>

                <Box
                  style={{
                    padding: '5px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                  }}
                >
                  <IconBrandJavascript size={16} color="#f7df1e" />
                  <Text size="xs" fw={500} c="gray.5">animations.js</Text>
                </Box>

                <Box
                  style={{
                    padding: '5px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                  }}
                >
                  <IconBrandHtml5 size={16} color="#e34c26" />
                  <Text size="xs" fw={500} c="gray.5">index.html</Text>
                </Box>
              </Box>
            </Box>

            {/* Main content area */}
            <Box
              style={{
                flex: 1,
                height: '100%',
                background: '#1e1e1e',
                overflow: 'auto',
                position: 'relative',
              }}
            >
              {/* Editor view - código sendo digitado */}
              {activeTab === 'editor' && (
                <Box
                  style={{
                    padding: '15px',
                    fontFamily: 'monospace',
                    fontSize: '13px',
                    lineHeight: 1.5,
                    color: codeColors.text,
                    height: '100%',
                    overflow: 'auto',
                    position: 'relative',
                  }}
                >
                  <Box
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'rgba(118, 65, 217, 0.1)',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      animation: `${pulse} 2s infinite`,
                    }}
                  >
                    <IconRocket size={14} color="#9969E5" />
                    <Text size="xs" c="#9969E5" fw={500}>Live Coding</Text>
                  </Box>

                  <pre
                    style={{
                      margin: 0,
                      fontFamily: 'monospace',
                      fontSize: '13px',
                      lineHeight: 1.5,
                      color: codeColors.text,
                      position: 'relative',
                      animation: showGlitch ? `${glitch} 0.2s ease` : 'none',
                    }}
                  >
                    <code>
                      {typedCode.split('\n').map((line, index) => {
                        // Colorização de sintaxe básica
                        let colorizedLine: React.ReactNode = line;

                        // Imports e keywords
                        if (line.includes('import') || line.includes('export') || line.includes('return') || line.includes('function') || line.includes('const')) {
                          colorizedLine = (
                            <span key={`keyword-${index}`} style={{ color: codeColors.keyword }}>
                              {line}
                            </span>
                          );
                        }

                        // Componentes React
                        else if (line.includes('<') && line.includes('>')) {
                          colorizedLine = (
                            <span key={`component-${index}`} style={{ color: codeColors.component }}>
                              {line}
                            </span>
                          );
                        }

                        // Strings
                        else if (line.includes('\'') || line.includes('"')) {
                          colorizedLine = (
                            <span key={`string-${index}`} style={{ color: codeColors.string }}>
                              {line}
                            </span>
                          );
                        }

                        return (
                          <div key={`line-${index}`}>
                            {colorizedLine}
                          </div>
                        );
                      })}
                    </code>
                  </pre>

                  {/* Cursor piscando */}
                  {showCursor && (
                    <Box
                      style={{
                        position: 'absolute',
                        width: '8px',
                        height: '16px',
                        backgroundColor: '#fff',
                        left: typedCode.split('\n')[typedCode.split('\n').length - 1]?.length * 8 + 15 || 15,
                        top: (typedCode.split('\n').length - 1) * 19.5 + 15,
                        animation: `${blink} 1s infinite`,
                      }}
                    />
                  )}
                </Box>
              )}

              {/* Terminal view */}
              {activeTab === 'terminal' && (
                <Box
                  style={{
                    padding: '15px',
                    fontFamily: 'monospace',
                    fontSize: '13px',
                    lineHeight: 1.5,
                    color: '#ddd',
                    height: '100%',
                    overflow: 'auto',
                    background: '#121212',
                  }}
                >
                  {terminalOutput.map((line, index) => (
                    <Box
                      key={index}
                      style={{
                        marginBottom: '5px',
                        animation: `${fadeIn} 0.3s ease`,
                      }}
                    >
                      {line.includes('$') ? (
                        <Text style={{ color: '#9969E5' }}>{line}</Text>
                      ) : line.includes('Success') ? (
                        <Text style={{ color: '#4CAF50' }}>{line}</Text>
                      ) : line.includes('Installing') ? (
                        <Text style={{ color: '#2196F3' }}>{line}</Text>
                      ) : line.includes('ready') || line.includes('✓') ? (
                        <Text style={{ color: '#4CAF50' }}>{line}</Text>
                      ) : (
                        <Text>{line}</Text>
                      )}
                    </Box>
                  ))}

                  {/* Cursor piscando */}
                  {showCursor && terminalOutput.length > 0 && (
                    <Box
                      style={{
                        display: 'inline-block',
                        width: '8px',
                        height: '16px',
                        backgroundColor: '#ddd',
                        animation: `${blink} 1s infinite`,
                        verticalAlign: 'middle',
                      }}
                    />
                  )}
                </Box>
              )}

              {/* Split view - código e preview lado a lado */}
              {activeTab === 'split-view' && (
                <Box
                  style={{
                    display: 'flex',
                    height: '100%',
                  }}
                >
                  {/* Lado do código */}
                  <Box
                    style={{
                      width: '50%',
                      height: '100%',
                      padding: '15px',
                      fontFamily: 'monospace',
                      fontSize: '13px',
                      lineHeight: 1.5,
                      color: codeColors.text,
                      overflow: 'auto',
                      borderRight: '1px solid #333',
                      position: 'relative',
                    }}
                  >
                    <pre
                      style={{
                        margin: 0,
                        fontFamily: 'monospace',
                        fontSize: '13px',
                        lineHeight: 1.5,
                        color: codeColors.text,
                        position: 'relative',
                        animation: showGlitch ? `${glitch} 0.2s ease` : 'none',
                      }}
                    >
                      <code>
                        {typedCode.split('\n').map((line, index) => {
                          // Colorização de sintaxe básica
                          let colorizedLine: React.ReactNode = line;

                          // Imports e keywords
                          if (line.includes('import') || line.includes('export') || line.includes('return') || line.includes('function') || line.includes('const')) {
                            colorizedLine = (
                              <span key={`split-keyword-${index}`} style={{ color: codeColors.keyword }}>
                                {line}
                              </span>
                            );
                          }

                          // Componentes React
                          else if (line.includes('<') && line.includes('>')) {
                            colorizedLine = (
                              <span key={`split-component-${index}`} style={{ color: codeColors.component }}>
                                {line}
                              </span>
                            );
                          }

                          // Strings
                          else if (line.includes('\'') || line.includes('"')) {
                            colorizedLine = (
                              <span key={`split-string-${index}`} style={{ color: codeColors.string }}>
                                {line}
                              </span>
                            );
                          }

                          return (
                            <div key={`split-line-${index}`}>
                              {colorizedLine}
                            </div>
                          );
                        })}
                      </code>
                    </pre>

                    {/* Cursor piscando */}
                    {showCursor && (
                      <Box
                        style={{
                          position: 'absolute',
                          width: '8px',
                          height: '16px',
                          backgroundColor: '#fff',
                          left: typedCode.split('\n')[typedCode.split('\n').length - 1]?.length * 8 + 15 || 15,
                          top: (typedCode.split('\n').length - 1) * 19.5 + 15,
                          animation: `${blink} 1s infinite`,
                        }}
                      />
                    )}
                  </Box>

                  {/* Lado do preview */}
                  <Box
                    style={{
                      width: '50%',
                      height: '100%',
                      background: '#0f0f0f',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '20px',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Fundo com efeito de grade */}
                    <Box
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: 'linear-gradient(rgba(118, 65, 217, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(118, 65, 217, 0.05) 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                        zIndex: 0,
                      }}
                    />

                    {/* Preview do site */}
                    <Box
                      style={{
                        background: 'linear-gradient(135deg, #1a1a1a, #2a2a2a)',
                        borderRadius: '8px',
                        padding: '30px',
                        width: '90%',
                        maxWidth: '400px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 10px rgba(118, 65, 217, 0.3)',
                        border: '1px solid rgba(118, 65, 217, 0.2)',
                        zIndex: 1,
                        animation: `${slideInFromBottom} 0.5s ease`,
                      }}
                    >
                      <Text
                        fw={800}
                        size="xl"
                        c="white"
                        style={{
                          marginBottom: '10px',
                          textAlign: 'center',
                          background: 'linear-gradient(90deg, #fff, #9969E5)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        CodeBR
                      </Text>

                      <Text
                        size="sm"
                        c="gray.4"
                        style={{
                          marginBottom: '20px',
                          textAlign: 'center',
                        }}
                      >
                        Desenvolvimento de sites profissionais
                      </Text>

                      <Box
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          marginTop: '20px',
                        }}
                      >
                        <Box
                          component="a"
                          href="/pricing"
                          style={{
                            padding: '8px 16px',
                            background: 'linear-gradient(90deg, #7641C0, #9969E5)',
                            color: 'white',
                            borderRadius: '4px',
                            fontWeight: 600,
                            fontSize: '14px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                            textDecoration: 'none',
                            display: 'inline-block',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: '0 6px 15px rgba(0,0,0,0.4)',
                            }
                          }}
                        >
                          Ver serviços
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}

              {/* Preview view - site completo */}
              {activeTab === 'preview' && (
                <Box
                  style={{
                    height: '100%',
                    background: '#0f0f0f',
                    padding: '0',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Website preview */}
                  <Box
                    style={{
                      height: '100%',
                      width: '100%',
                      position: 'relative',
                      overflow: 'hidden',
                      animation: `${fadeIn} 0.5s ease`,
                    }}
                  >
                    {/* Header */}
                    <Box
                      style={{
                        height: '60px',
                        width: '100%',
                        background: 'linear-gradient(90deg, #1a1a1a, #2a2a2a)',
                        borderBottom: '1px solid rgba(118, 65, 217, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 20px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                      }}
                    >
                      <Box style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Box
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #9969E5, #7641C0)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                          }}
                        >
                          <Text fw={700} size="sm" c="white">C</Text>
                        </Box>
                        <Text fw={700} size="sm" c="white">CodeBR</Text>
                      </Box>

                      <Box style={{ display: 'flex', gap: '20px' }}>
                        <Text size="xs" c="white">Home</Text>
                        <Text size="xs" c="white">Serviços</Text>
                        <Text size="xs" c="white">Sobre</Text>
                        <Text size="xs" c="white">Contato</Text>
                      </Box>
                    </Box>

                    {/* Hero Section */}
                    <Box
                      style={{
                        height: '400px',
                        width: '100%',
                        background: 'linear-gradient(135deg, #1a1a1a, #2a2a2a)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 20px',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Background pattern */}
                      <Box
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          opacity: 0.1,
                          backgroundImage: 'linear-gradient(rgba(118, 65, 217, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(118, 65, 217, 0.1) 1px, transparent 1px)',
                          backgroundSize: '20px 20px',
                        }}
                      />

                      {/* Partículas animadas */}
                      <Box
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          opacity: 0.3,
                          background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'1\' fill=\'%239969E5\' /%3E%3C/svg%3E")',
                          backgroundSize: '100px 100px',
                          animation: `${fadeIn} 2s ease`,
                        }}
                      />

                      <Text
                        fw={800}
                        size="xl"
                        c="white"
                        mb={10}
                        style={{
                          background: 'linear-gradient(90deg, #fff, #9969E5)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        CodeBR
                      </Text>
                      <Text size="sm" c="gray.3" mb={20} style={{ maxWidth: '600px' }}>
                        Desenvolvimento de sites profissionais com tecnologias modernas
                      </Text>
                      <Box
                        component="a"
                        href="/pricing"
                        style={{
                          padding: '10px 20px',
                          background: 'linear-gradient(90deg, #7641C0, #9969E5)',
                          color: 'white',
                          borderRadius: '5px',
                          fontWeight: 600,
                          fontSize: '14px',
                          cursor: 'pointer',
                          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                          textDecoration: 'none',
                          display: 'inline-block',
                          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 15px rgba(0,0,0,0.4)',
                          }
                        }}
                      >
                        Ver serviços
                      </Box>
                    </Box>

                    {/* Features Section */}
                    <Box
                      style={{
                        padding: '40px 20px',
                        background: '#0f0f0f',
                      }}
                    >
                      <Text
                        fw={700}
                        size="md"
                        c="white"
                        mb={20}
                        style={{
                          textAlign: 'center',
                          textShadow: '0 0 10px rgba(118, 65, 217, 0.5)',
                        }}
                      >
                        Tecnologias
                      </Text>

                      <Box
                        style={{
                          display: 'flex',
                          justifyContent: 'space-around',
                          gap: '20px',
                          flexWrap: 'wrap',
                        }}
                      >
                        {/* Feature 1 */}
                        <Box
                          style={{
                            width: '180px',
                            padding: '20px',
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: '8px',
                            textAlign: 'center',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                            border: '1px solid rgba(118, 65, 217, 0.1)',
                          }}
                        >
                          <Box
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              background: 'rgba(118, 65, 217, 0.1)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              margin: '0 auto 10px',
                            }}
                          >
                            <IconBrandReact size={20} color="#61DAFB" />
                          </Box>
                          <Text fw={600} size="xs" c="white" mb={5}>React</Text>
                          <Text size="xs" c="gray.5">Interfaces modernas</Text>
                        </Box>

                        {/* Feature 2 */}
                        <Box
                          style={{
                            width: '180px',
                            padding: '20px',
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: '8px',
                            textAlign: 'center',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                            border: '1px solid rgba(118, 65, 217, 0.1)',
                          }}
                        >
                          <Box
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              background: 'rgba(118, 65, 217, 0.1)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              margin: '0 auto 10px',
                            }}
                          >
                            <IconBrandNextjs size={20} color="#fff" />
                          </Box>
                          <Text fw={600} size="xs" c="white" mb={5}>Next.js</Text>
                          <Text size="xs" c="gray.5">Performance otimizada</Text>
                        </Box>

                        {/* Feature 3 */}
                        <Box
                          style={{
                            width: '180px',
                            padding: '20px',
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: '8px',
                            textAlign: 'center',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                            border: '1px solid rgba(118, 65, 217, 0.1)',
                          }}
                        >
                          <Box
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              background: 'rgba(118, 65, 217, 0.1)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              margin: '0 auto 10px',
                            }}
                          >
                            <IconCode size={20} color="#9969E5" />
                          </Box>
                          <Text fw={600} size="xs" c="white" mb={5}>Código limpo</Text>
                          <Text size="xs" c="gray.5">Fácil manutenção</Text>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}

              {/* Settings view */}
              {activeTab === 'settings' && (
                <Box
                  style={{
                    padding: '20px',
                    height: '100%',
                    overflow: 'auto',
                    background: '#1a1a1a',
                  }}
                >
                  <Box
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '20px',
                    }}
                  >
                    <IconRocket size={18} color="#9969E5" />
                    <Text size="sm" fw={700} c="white">Configurações do Projeto</Text>
                  </Box>

                  <Divider color="dark.6" my="md" />

                  <Box style={{ marginBottom: '20px' }}>
                    <Text size="xs" fw={600} c="gray.4" mb={10}>Tecnologias</Text>
                    <Group gap="xs" mb={10}>
                      <Badge color="blue" variant="light">React</Badge>
                      <Badge color="gray" variant="light">Next.js</Badge>
                      <Badge color="purple" variant="light">TypeScript</Badge>
                      <Badge color="teal" variant="light">Tailwind CSS</Badge>
                      <Badge color="pink" variant="light">Framer Motion</Badge>
                    </Group>
                  </Box>

                  <Box style={{ marginBottom: '20px' }}>
                    <Text size="xs" fw={600} c="gray.4" mb={10}>Tema</Text>
                    <Group gap="xs">
                      <Box style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#7641C0', border: '2px solid #333' }} />
                      <Box style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#1a1a1a' }} />
                      <Box style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#9969E5' }} />
                      <Box style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#333' }} />
                      <Box style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#fff' }} />
                    </Group>
                  </Box>

                  <Box style={{ marginBottom: '20px' }}>
                    <Text size="xs" fw={600} c="gray.4" mb={10}>Componentes</Text>
                    <Box
                      style={{
                        background: '#222',
                        borderRadius: '4px',
                        padding: '10px',
                        border: '1px solid #333',
                      }}
                    >
                      <Box
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px',
                          borderBottom: '1px solid #333',
                        }}
                      >
                        <Text size="xs" c="gray.4">Header</Text>
                        <Badge color="green" size="xs" variant="light">Ativo</Badge>
                      </Box>
                      <Box
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px',
                          borderBottom: '1px solid #333',
                        }}
                      >
                        <Text size="xs" c="gray.4">Hero Section</Text>
                        <Badge color="green" size="xs" variant="light">Ativo</Badge>
                      </Box>
                      <Box
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px',
                          borderBottom: '1px solid #333',
                        }}
                      >
                        <Text size="xs" c="gray.4">Features</Text>
                        <Badge color="green" size="xs" variant="light">Ativo</Badge>
                      </Box>
                      <Box
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px',
                          borderBottom: '1px solid #333',
                        }}
                      >
                        <Text size="xs" c="gray.4">Testimonials</Text>
                        <Badge color="gray" size="xs" variant="light">Inativo</Badge>
                      </Box>
                      <Box
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px',
                        }}
                      >
                        <Text size="xs" c="gray.4">Footer</Text>
                        <Badge color="green" size="xs" variant="light">Ativo</Badge>
                      </Box>
                    </Box>
                  </Box>

                  <Box style={{ marginBottom: '20px' }}>
                    <Text size="xs" fw={600} c="gray.4" mb={10}>Ferramentas</Text>
                    <Group gap="xs">
                      <Badge leftSection={<IconBrandGithub size={12} />} color="gray" variant="light">GitHub</Badge>
                      <Badge leftSection={<IconTerminal size={12} />} color="gray" variant="light">CLI</Badge>
                      <Badge leftSection={<IconCode size={12} />} color="gray" variant="light">VS Code</Badge>
                    </Group>
                  </Box>
                </Box>
              )}
        </Box>
      </Box>

      {/* MacBook base */}
      <Box
        style={{
          width: '100%',
          height: '20px',
          background: 'linear-gradient(to bottom, #1a1a1a, #0f0f0f)',
          borderRadius: '0 0 20px 20px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(118,65,192,0.3)',
          position: 'relative',
          transform: 'rotateX(15deg) translateZ(-8px)',
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
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '3px',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.8)',
          }}
        />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
