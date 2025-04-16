'use client';

import { useState } from 'react';
import { Box, Text, Group, Badge } from '@mantine/core';
import { keyframes } from '@emotion/react';
import {
  IconBrandVscode,
  IconCode,
  IconBrandHtml5,
  IconBrandCss3,
  IconBrandJavascript,
  IconBrandReact,
  IconSettings,
  IconLayoutDashboard,
  IconPlus,
  IconSearch
} from '@tabler/icons-react';

// Animações
const blink = keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0 },
});

const typing = keyframes({
  from: { width: '0%' },
  to: { width: '100%' },
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
  const [activeTab, setActiveTab] = useState('editor');

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
                  }}
                >
                  <Text style={{ color: codeColors.comment, marginBottom: '10px' }}>{'//'} Website Builder Component</Text>
                  <Text style={{ color: codeColors.keyword, marginBottom: '5px' }}>import</Text>
                  <Text style={{ color: codeColors.text, marginLeft: '20px', marginBottom: '5px' }}>{'{'} Box, Text, Button, Group, Container {'}'}</Text>
                  <Text style={{ color: codeColors.keyword, marginLeft: '0px', marginBottom: '5px' }}>from</Text>
                  <Text style={{ color: codeColors.string, marginLeft: '5px', marginBottom: '10px' }}>'@mantine/core';</Text>

                  <Text style={{ color: codeColors.keyword, marginBottom: '5px' }}>import</Text>
                  <Text style={{ color: codeColors.text, marginLeft: '20px', marginBottom: '5px' }}>{'{'} DragDropContext, Droppable, Draggable {'}'}</Text>
                  <Text style={{ color: codeColors.keyword, marginLeft: '0px', marginBottom: '5px' }}>from</Text>
                  <Text style={{ color: codeColors.string, marginLeft: '5px', marginBottom: '10px' }}>'react-beautiful-dnd';</Text>

                  <Text style={{ color: codeColors.keyword, marginBottom: '5px' }}>export</Text>
                  <Text style={{ color: codeColors.keyword, marginBottom: '5px' }}>function</Text>
                  <Text style={{ color: codeColors.function, marginBottom: '5px', display: 'inline' }}>WebsiteBuilder</Text>
                  <Text style={{ color: codeColors.text, marginBottom: '5px', display: 'inline' }}>() {'{'}</Text>

                  <Box style={{ marginLeft: '20px', marginTop: '10px' }}>
                    <Text style={{ color: codeColors.keyword, marginBottom: '5px' }}>const</Text>
                    <Text style={{ color: codeColors.variable, display: 'inline' }}>[components, setComponents]</Text>
                    <Text style={{ color: codeColors.text, display: 'inline' }}> = </Text>
                    <Text style={{ color: codeColors.function, display: 'inline' }}>useState</Text>
                    <Text style={{ color: codeColors.text, display: 'inline' }}>(initialComponents);</Text>

                    <Box style={{ marginTop: '15px' }}>
                      <Text style={{ color: codeColors.keyword, marginBottom: '5px' }}>const</Text>
                      <Text style={{ color: codeColors.variable, display: 'inline' }}>handleDragEnd</Text>
                      <Text style={{ color: codeColors.text, display: 'inline' }}> = </Text>
                      <Text style={{ color: codeColors.text, display: 'inline' }}>(result) = > {'{'}</Text>
                      <Text style={{ color: codeColors.comment, marginLeft: '20px', marginTop: '5px' }}>{'//'} Reordering logic</Text>
                      <Text style={{ color: codeColors.text, marginLeft: '20px', marginTop: '5px' }}>{'// ...'}</Text>
                      <Text style={{ color: codeColors.text, marginTop: '5px' }}>{'}'}</Text>
                    </Box>

                    <Box style={{ marginTop: '15px' }}>
                      <Text style={{ color: codeColors.keyword }}>return</Text>
                      <Text style={{ color: codeColors.text }}> (</Text>
                      <Box style={{ marginLeft: '20px', marginTop: '5px' }}>
                        <Text style={{ color: codeColors.component }}>{`<DragDropContext onDragEnd={handleDragEnd}>`}</Text>
                        <Text style={{ color: codeColors.component, marginLeft: '20px' }}>{`<Box className="website-builder">`}</Text>
                        <Text style={{ color: codeColors.component, marginLeft: '40px' }}>{`<Box className="toolbar">`}</Text>
                        <Text style={{ color: codeColors.component, marginLeft: '60px' }}>{`<Text>Drag components to build your website</Text>`}</Text>
                        <Text style={{ color: codeColors.component, marginLeft: '40px' }}>{`</Box>`}</Text>
                        <Text style={{ color: codeColors.component, marginLeft: '40px' }}>{`<Box className="canvas">`}</Text>
                        <Text style={{ color: codeColors.component, marginLeft: '60px' }}>{`<Droppable droppableId="canvas">`}</Text>
                        <Text style={{ color: codeColors.text, marginLeft: '80px' }}>{`{(provided) => (`}</Text>
                        <Text style={{ color: codeColors.component, marginLeft: '100px' }}>{`<Box ref={provided.innerRef} {...provided.droppableProps}>`}</Text>
                        <Text style={{ color: codeColors.text, marginLeft: '120px' }}>{`{components.map((item, index) => (`}</Text>
                        <Text style={{ color: codeColors.component, marginLeft: '140px' }}>{`<Draggable key={item.id} draggableId={item.id} index={index}>`}</Text>
                        <Text style={{ color: codeColors.text, marginLeft: '160px' }}>{`{(provided) => (`}</Text>
                        <Text style={{ color: codeColors.component, marginLeft: '180px' }}>{`<Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>`}</Text>
                        <Text style={{ color: codeColors.text, marginLeft: '200px' }}>{`{renderComponent(item)}`}</Text>
                        <Text style={{ color: codeColors.component, marginLeft: '180px' }}>{`</Box>`}</Text>
                        <Text style={{ color: codeColors.text, marginLeft: '160px' }}>{`)}`}</Text>
                        <Text style={{ color: codeColors.component, marginLeft: '140px' }}>{`</Draggable>`}</Text>
                        <Text style={{ color: codeColors.text, marginLeft: '120px' }}>{`))}`}</Text>
                        <Text style={{ color: codeColors.text, marginLeft: '120px' }}>{`{provided.placeholder}`}</Text>
                        <Text style={{ color: codeColors.component, marginLeft: '100px' }}>{`</Box>`}</Text>
                        <Text style={{ color: codeColors.text, marginLeft: '80px' }}>{`)}`}</Text>
                        <Text style={{ color: codeColors.component, marginLeft: '60px' }}>{`</Droppable>`}</Text>
                        <Text style={{ color: codeColors.component, marginLeft: '40px' }}>{`</Box>`}</Text>
                        <Text style={{ color: codeColors.component, marginLeft: '20px' }}>{`</Box>`}</Text>
                        <Text style={{ color: codeColors.component }}>{`</DragDropContext>`}</Text>
                      </Box>
                      <Text style={{ color: codeColors.text }}>);</Text>
                    </Box>
                  </Box>
                  <Text style={{ color: codeColors.text, marginTop: '10px' }}>{'}'}</Text>

                  <Box style={{ marginTop: '20px', position: 'relative' }}>
                    <Text style={{ color: codeColors.text, display: 'inline' }}>// Cursor blinking effect</Text>
                    <Box
                      style={{
                        position: 'absolute',
                        width: '8px',
                        height: '16px',
                        backgroundColor: '#fff',
                        bottom: '0',
                        left: '220px',
                        animation: `${blink} 1s infinite`,
                      }}
                    />
                  </Box>
                </Box>
              )}

              {activeTab === 'preview' && (
                <Box
                  style={{
                    height: '100%',
                    background: '#fff',
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
                    }}
                  >
                    {/* Header */}
                    <Box
                      style={{
                        height: '60px',
                        width: '100%',
                        background: '#6741D9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 20px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                      }}
                    >
                      <Box style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Box
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #8A63E8, #6741D9)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                          }}
                        >
                          <Text fw={700} size="sm" c="white">S</Text>
                        </Box>
                        <Text fw={700} size="sm" c="white">Websites Suíços</Text>
                      </Box>

                      <Box style={{ display: 'flex', gap: '20px' }}>
                        <Text size="xs" c="white">Home</Text>
                        <Text size="xs" c="white">Services</Text>
                        <Text size="xs" c="white">About</Text>
                        <Text size="xs" c="white">Contact</Text>
                      </Box>
                    </Box>

                    {/* Hero Section */}
                    <Box
                      style={{
                        height: '400px',
                        width: '100%',
                        background: 'linear-gradient(135deg, #6741D9, #8A63E8)',
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
                          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                          backgroundSize: '20px 20px',
                        }}
                      />

                      <Text fw={800} size="xl" c="white" mb={10}>Create Beautiful Websites</Text>
                      <Text size="sm" c="white" mb={20} style={{ maxWidth: '600px' }}>
                        Our drag-and-drop website builder makes it easy to create professional websites without coding.
                      </Text>
                      <Box
                        style={{
                          padding: '10px 20px',
                          background: 'white',
                          color: '#6741D9',
                          borderRadius: '5px',
                          fontWeight: 600,
                          fontSize: '14px',
                          cursor: 'pointer',
                          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                        }}
                      >
                        Get Started
                      </Box>
                    </Box>

                    {/* Features Section */}
                    <Box
                      style={{
                        padding: '40px 20px',
                        background: 'white',
                      }}
                    >
                      <Text fw={700} size="md" c="#333" mb={20} style={{ textAlign: 'center' }}>Features</Text>

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
                            background: '#f9f9f9',
                            borderRadius: '8px',
                            textAlign: 'center',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                          }}
                        >
                          <Box
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              background: 'rgba(103, 65, 217, 0.1)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              margin: '0 auto 10px',
                            }}
                          >
                            <IconLayoutDashboard size={20} color="#6741D9" />
                          </Box>
                          <Text fw={600} size="xs" c="#333" mb={5}>Drag & Drop</Text>
                          <Text size="xs" c="#666">Easy-to-use interface</Text>
                        </Box>

                        {/* Feature 2 */}
                        <Box
                          style={{
                            width: '180px',
                            padding: '20px',
                            background: '#f9f9f9',
                            borderRadius: '8px',
                            textAlign: 'center',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                          }}
                        >
                          <Box
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              background: 'rgba(103, 65, 217, 0.1)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              margin: '0 auto 10px',
                            }}
                          >
                            <IconBrandReact size={20} color="#6741D9" />
                          </Box>
                          <Text fw={600} size="xs" c="#333" mb={5}>Modern Tech</Text>
                          <Text size="xs" c="#666">Built with React</Text>
                        </Box>

                        {/* Feature 3 */}
                        <Box
                          style={{
                            width: '180px',
                            padding: '20px',
                            background: '#f9f9f9',
                            borderRadius: '8px',
                            textAlign: 'center',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                          }}
                        >
                          <Box
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              background: 'rgba(103, 65, 217, 0.1)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              margin: '0 auto 10px',
                            }}
                          >
                            <IconSettings size={20} color="#6741D9" />
                          </Box>
                          <Text fw={600} size="xs" c="#333" mb={5}>Customizable</Text>
                          <Text size="xs" c="#666">Endless options</Text>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}

              {activeTab === 'settings' && (
                <Box
                  style={{
                    padding: '20px',
                    height: '100%',
                    overflow: 'auto',
                  }}
                >
                  <Text size="sm" fw={700} c="gray.2" mb={15}>Website Builder Settings</Text>

                  <Box style={{ marginBottom: '20px' }}>
                    <Text size="xs" fw={600} c="gray.4" mb={10}>Components</Text>
                    <Group gap="xs" mb={10}>
                      <Badge color="indigo">Header</Badge>
                      <Badge color="blue">Hero Section</Badge>
                      <Badge color="teal">Features</Badge>
                      <Badge color="green">Gallery</Badge>
                      <Badge color="yellow">Testimonials</Badge>
                      <Badge color="orange">Contact Form</Badge>
                      <Badge color="red">Footer</Badge>
                    </Group>
                  </Box>

                  <Box style={{ marginBottom: '20px' }}>
                    <Text size="xs" fw={600} c="gray.4" mb={10}>Theme</Text>
                    <Group gap="xs">
                      <Box style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#6741D9', border: '2px solid #fff' }} />
                      <Box style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#1098AD' }} />
                      <Box style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#FF6B6B' }} />
                      <Box style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#20C997' }} />
                      <Box style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#FD7E14' }} />
                    </Group>
                  </Box>

                  <Box style={{ marginBottom: '20px' }}>
                    <Text size="xs" fw={600} c="gray.4" mb={10}>Export Options</Text>
                    <Group gap="xs">
                      <Badge color="gray">HTML/CSS</Badge>
                      <Badge color="gray">React</Badge>
                      <Badge color="gray">Next.js</Badge>
                      <Badge color="gray">WordPress</Badge>
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
