'use client';

import { Box, Title, Text, Badge, Button, Group, Image, Overlay } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconEye, IconExternalLink } from '@tabler/icons-react';
import { ParticlesEffect } from './ParticlesEffect';

// Componentes com motion
const MotionBox = motion.create('div');

// Tipos
interface Technology {
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface ProjectImage {
  src: string;
  alt: string;
  type: 'desktop' | 'mobile' | 'tablet';
}

interface Project {
  id: string;
  title: string;
  description: string;
  category: 'landing' | 'ecommerce' | 'corporate' | 'custom';
  images: ProjectImage[];
  technologies: Technology[];
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
}

interface FeaturedProjectCardProps {
  project: Project;
  onClick: () => void;
  t: any;
  index: number;
}

export function FeaturedProjectCard({ project, onClick, t, index }: FeaturedProjectCardProps) {
  // Determinar se o projeto deve ser exibido com layout invertido (alternando)
  const isReversed = index % 2 !== 0;

  return (
    <MotionBox
      style={{ marginBottom: '60px' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <Group justify="space-between" align="stretch" wrap="nowrap" gap={40} style={{ flexDirection: isReversed ? 'row-reverse' : 'row' }}>
        {/* Imagem do Projeto */}
        <Box style={{ flex: '1.2', position: 'relative', overflow: 'hidden', borderRadius: '12px' }} className="featured-project">
          <MotionBox
            style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: '12px' }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="glow-effect"
          >
            {/* Efeito de partículas */}
            <ParticlesEffect />

            <Image
              src={project.images[0].src}
              alt={project.images[0].alt}
              height={400}
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                border: '1px solid rgba(153,105,229,0.2)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 15px rgba(118,65,192,0.1)',
              }}
            />

            <Overlay
              gradient="linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 90%)"
              opacity={0.7}
              zIndex={1}
            />

            {/* Badge de destaque */}
            <Badge
              variant="filled"
              size="lg"
              radius="sm"
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                background: 'linear-gradient(135deg, rgba(255,215,0,0.8), rgba(255,165,0,0.8))',
                border: '1px solid rgba(255,215,0,0.3)',
                zIndex: 2,
              }}
              component={motion.div}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {t.featuredProject}
            </Badge>

            {/* Tecnologias */}
            <Group
              style={{
                position: 'absolute',
                bottom: 20,
                left: 20,
                zIndex: 2,
              }}
              gap="xs"
            >
              {project.technologies.map((tech, idx) => (
                <Badge
                  key={idx}
                  size="md"
                  radius="sm"
                  leftSection={tech.icon}
                  style={{
                    background: tech.color,
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  component={motion.div}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + (idx * 0.1) }}
                  viewport={{ once: true }}
                >
                  {tech.name}
                </Badge>
              ))}
            </Group>
          </MotionBox>
        </Box>

        {/* Detalhes do Projeto */}
        <Box style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <MotionBox
            initial={{ opacity: 0, x: isReversed ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Badge
              variant="filled"
              radius="sm"
              style={{
                background: 'linear-gradient(135deg, rgba(118,65,192,0.8), rgba(153,105,229,0.8))',
                border: '1px solid rgba(153,105,229,0.3)',
                marginBottom: '1rem',
              }}
            >
              {project.category}
            </Badge>

            <Title order={2} fw={700} size="2rem" c="white" mb="md">
              {project.title}
            </Title>

            <Text size="lg" c="gray.3" lh={1.7} mb="xl">
              {project.description}
            </Text>

            <Group>
              <Button
                variant="gradient"
                gradient={{ from: 'rgba(118,65,192,0.9)', to: 'rgba(153,105,229,0.9)', deg: 135 }}
                radius="md"
                size="md"
                rightSection={<IconEye size={18} />}
                onClick={onClick}
                style={{
                  boxShadow: '0 10px 20px -10px rgba(118,65,192,0.5)',
                }}
              >
                {t.viewDetails}
              </Button>

              {project.liveUrl && (
                <Button
                  component="a"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  color="gray.0"
                  radius="md"
                  size="md"
                  rightSection={<IconExternalLink size={18} />}
                  style={{
                    borderColor: 'rgba(153,105,229,0.3)',
                  }}
                >
                  {t.visitSite}
                </Button>
              )}
            </Group>
          </MotionBox>
        </Box>
      </Group>
    </MotionBox>
  );
}
