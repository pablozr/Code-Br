'use client';

import { useRef, useEffect, useState } from 'react';
import { Box, Text, Title, Button, Group, Badge, Image } from '@mantine/core';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { IconEye, IconArrowRight } from '@tabler/icons-react';
import { useViewportSize } from '@mantine/hooks';

// Motion components
const MotionBox = motion(Box as any);

// Template interface (matching the one from PortfolioSection)
interface Template {
  id: string;
  title: {
    'pt-BR': string;
    'en': string;
    'fr': string;
  };
  description: {
    'pt-BR': string;
    'en': string;
    'fr': string;
  };
  category: 'landing' | 'ecommerce' | 'corporate' | 'custom';
  image: string;
}

interface ParallaxTemplateShowcaseProps {
  templates: Template[];
  locale: string;
  t: any;
}

export function ParallaxTemplateShowcase({ templates, locale, t }: ParallaxTemplateShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { height: viewportHeight } = useViewportSize();
  const [currentTemplate, setCurrentTemplate] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Altura fixa para a viewport
  const totalHeight = viewportHeight;

  // Scroll progress apenas para esta seção
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Suavização do scroll com valores mais baixos para movimento mais lento
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 20,
    damping: 10,
    restDelta: 0.001
  });

  // Efeito para controlar o scroll
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();

      if (isTransitioning) return;

      if (e.deltaY > 0 && currentTemplate < templates.length - 1) {
        setIsTransitioning(true);
        setCurrentTemplate(prev => prev + 1);
        setShowScrollHint(false);

        setTimeout(() => {
          setIsTransitioning(false);
        }, 1000);
      } else if (e.deltaY < 0 && currentTemplate > 0) {
        setIsTransitioning(true);
        setCurrentTemplate(prev => prev - 1);
        setShowScrollHint(false);

        setTimeout(() => {
          setIsTransitioning(false);
        }, 1000);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleScroll, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleScroll);
      }
    };
  }, [currentTemplate, templates.length, isTransitioning]);

  return (
    <Box
      ref={containerRef}
      style={{
        height: `${totalHeight}px`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Viewport fixo para a cena 3D */}
      <Box
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          perspective: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Contenedor do espaço 3D */}
        <Box
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Renderizar cada template com seu próprio efeito de parallax */}
          {templates.map((template, index) => (
            <TemplateItem
              key={template.id}
              template={template}
              index={index}
              currentTemplate={currentTemplate}
              totalTemplates={templates.length}
              scrollYProgress={smoothScrollYProgress}
              locale={locale}
              t={t}
            />
          ))}
        </Box>
      </Box>

      {/* Indicador de progresso */}
      <Box
        style={{
          position: 'absolute',
          bottom: '30px',
          right: '30px',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        <Text size="sm" c="dimmed" mb={5}>
          {currentTemplate + 1} / {templates.length}
        </Text>
        <Box
          style={{
            width: '3px',
            height: '60px',
            background: 'rgba(118, 65, 192, 0.3)',
            borderRadius: '3px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Box
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${((currentTemplate + 1) / templates.length) * 100}%`,
              background: 'linear-gradient(to bottom, rgba(118, 65, 192, 0.8), rgba(153, 105, 229, 0.8))',
              transition: 'height 0.5s ease',
            }}
          />
        </Box>
      </Box>

      {/* Indicador de scroll mais visível */}
      {showScrollHint && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          style={{
            position: 'absolute',
            bottom: '120px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(0, 0, 0, 0.7)',
            padding: '15px 25px',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(153, 105, 229, 0.3)',
          }}
        >
          <Text size="lg" fw={600} c="white" ta="center">
            Role para navegar
          </Text>
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </motion.div>
      )}
    </Box>
  );
}

interface TemplateItemProps {
  template: Template;
  index: number;
  currentTemplate: number;
  totalTemplates: number;
  scrollYProgress: MotionValue<number>;
  locale: string;
  t: any;
}

function TemplateItem({ template, index, currentTemplate, totalTemplates, scrollYProgress, locale, t }: TemplateItemProps) {
  // Calcular a posição do template baseado no template atual
  const isActive = index === currentTemplate;
  const isNext = index === currentTemplate + 1;
  const isPrevious = index === currentTemplate - 1;

  // Valores de transformação baseados na posição do template
  const transform = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isActive
      ? ['translateZ(0px) scale(1) rotateY(0deg)', 'translateZ(0px) scale(1) rotateY(0deg)', 'translateZ(0px) scale(1) rotateY(0deg)']
      : isNext
      ? ['translateZ(-2000px) scale(0.2) rotateY(-15deg)', 'translateZ(-2000px) scale(0.2) rotateY(-15deg)', 'translateZ(-2000px) scale(0.2) rotateY(-15deg)']
      : isPrevious
      ? ['translateZ(2000px) scale(0.2) rotateY(15deg)', 'translateZ(2000px) scale(0.2) rotateY(15deg)', 'translateZ(2000px) scale(0.2) rotateY(15deg)']
      : ['translateZ(3000px) scale(0.1) rotateY(15deg)', 'translateZ(3000px) scale(0.1) rotateY(15deg)', 'translateZ(3000px) scale(0.1) rotateY(15deg)']
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isActive
      ? [1, 1, 1]
      : isNext || isPrevious
      ? [0, 0, 0]
      : [0, 0, 0]
  );

  const boxShadow = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isActive
      ? ['0 0 30px rgba(118, 65, 192, 0.5)', '0 0 30px rgba(118, 65, 192, 0.5)', '0 0 30px rgba(118, 65, 192, 0.5)']
      : ['0 0 0px rgba(118, 65, 192, 0)', '0 0 0px rgba(118, 65, 192, 0)', '0 0 0px rgba(118, 65, 192, 0)']
  );

  return (
    <MotionBox
      style={{
        position: 'absolute',
        width: '90%',
        maxWidth: '1400px',
        height: '80vh',
        transform,
        opacity,
        boxShadow,
        willChange: 'transform, opacity, box-shadow',
        transition: 'all 1s ease',
        pointerEvents: isActive ? 'auto' : 'none',
      }}
    >
      <Box
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '24px',
          border: '1px solid rgba(153, 105, 229, 0.2)',
          background: '#0a0a0a',
          transformStyle: 'preserve-3d',
          height: '100%',
          width: '100%',
          opacity: isActive ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        {/* Template image */}
        <Image
          src={template.image}
          alt={template.title[locale as keyof typeof template.title] || template.title['pt-BR']}
          loading="lazy"
          decoding="async"
          style={{
            objectFit: 'contain',
            width: '100%',
            height: '100%',
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: '#0a0a0a',
          }}
        />

        {/* Template info overlay */}
        <Box
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            padding: '40px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 70%, transparent 100%)',
            backdropFilter: 'blur(10px)',
            zIndex: 10,
          }}
        >
          <Badge
            variant="filled"
            radius="sm"
            mb="md"
            style={{
              background: 'linear-gradient(135deg, rgba(118,65,192,0.8), rgba(153,105,229,0.8))',
              border: '1px solid rgba(153,105,229,0.3)',
              fontSize: '14px',
              padding: '8px 16px',
            }}
          >
            {template.category}
          </Badge>

          <Title order={3} fw={700} c="white" mb="md" style={{
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            fontSize: '32px',
            letterSpacing: '-0.5px',
            lineHeight: 1.2,
          }}>
            {template.title[locale as keyof typeof template.title] || template.title['pt-BR']}
          </Title>

          <Text size="md" c="gray.0" lineClamp={2} mb="xl" style={{
            textShadow: '0 1px 3px rgba(0,0,0,0.5)',
            fontSize: '18px',
            lineHeight: 1.6,
            maxWidth: '95%',
            opacity: 0.9,
          }}>
            {template.description[locale as keyof typeof template.description] || template.description['pt-BR']}
          </Text>
        </Box>
      </Box>
    </MotionBox>
  );
}

// Reuse the existing ParticlesEffect component
function ParticlesEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Adjust canvas size to fill container
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create initial particles
    const createParticles = () => {
      const particles: any[] = [];
      const particleCount = 30;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: canvas.height + Math.random() * 20,
          size: Math.random() * 3 + 1,
          speedX: Math.random() * 2 - 1,
          speedY: -(Math.random() * 2 + 1),
          opacity: Math.random() * 0.5 + 0.1,
          color: getRandomColor(),
        });
      }

      return particles;
    };

    // Generate random purple-themed colors
    const getRandomColor = () => {
      const colors = [
        'rgba(118, 65, 192, 0.7)',
        'rgba(153, 105, 229, 0.7)',
        'rgba(180, 144, 255, 0.7)',
        'rgba(200, 170, 255, 0.7)',
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    particlesRef.current = createParticles();

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        // Reset particle when it goes off screen
        if (particle.y < -10) {
          particlesRef.current[index] = {
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 20,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 2 - 1,
            speedY: -(Math.random() * 2 + 1),
            opacity: Math.random() * 0.5 + 0.1,
            color: getRandomColor(),
          };
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <Box
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  );
}
