'use client';

import { useState, useEffect } from 'react';
import { Box, Group, ActionIcon, Text, Stack, useMantineTheme } from '@mantine/core';
import { IconCopy, IconCheck } from '@tabler/icons-react';

export function Terminal() {
  const [terminalStep, setTerminalStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const theme = useMantineTheme();

  const terminalSteps = [
    'npm create websites-suicos',
    'cd meu-site',
    'npm install',
    'npm run setup',
    'npm run dev 🎉',
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setTerminalStep((prev) =>
        prev < terminalSteps.length - 1 ? prev + 1 : prev
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [terminalStep]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(terminalSteps.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box
      w="100%"
      style={{
        borderRadius: theme.radius.md,
        overflow: 'hidden',
        backgroundColor: '#1a1b26',
        color: 'white',
        fontFamily: 'monospace',
        fontSize: '0.9rem',
        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <Box p="md">
        <Group justify="space-between" mb="md">
          <Group gap={8}>
            <Box w={12} h={12} style={{ borderRadius: '50%', backgroundColor: '#ff5f57' }} />
            <Box w={12} h={12} style={{ borderRadius: '50%', backgroundColor: '#febc2e' }} />
            <Box w={12} h={12} style={{ borderRadius: '50%', backgroundColor: '#28c840' }} />
          </Group>
          <ActionIcon
            onClick={copyToClipboard}
            variant="subtle"
            color="gray.5"
            aria-label="Copy to clipboard"
          >
            {copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
          </ActionIcon>
        </Group>
        <Stack gap="xs">
          {terminalSteps.map((step, index) => (
            <Text
              key={index}
              style={{
                opacity: index > terminalStep ? 0 : 1,
                transition: 'opacity 300ms ease',
              }}
              fz="sm"
            >
              <Text component="span" c="teal.4">$</Text> {step}
            </Text>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
