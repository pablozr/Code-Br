'use client';

import { usePathname } from 'next/navigation';
import { Menu, UnstyledButton, Group, Text, rem } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';
import Link from 'next/link';
import { locales } from '@/middleware';

const languages = [
  { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
];

// Helper function to get the path with a new locale
function getPathWithLocale(path: string, locale: string) {
  // If the path already has a locale, replace it
  const pathWithoutLocale = path.replace(/^\/[^\/]+/, '');
  return `/${locale}${pathWithoutLocale || '/'}`;
}

export function LanguageSwitcher() {
  const pathname = usePathname();

  const [opened, setOpened] = useState(false);

  // Determinar o idioma atual a partir do pathname
  const currentLocale = pathname.split('/')[1] || 'pt-BR';
  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];

  return (
    <Menu
      width={200}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      onClose={() => setOpened(false)}
      onOpen={() => setOpened(true)}
      opened={opened}
    >
      <Menu.Target>
        <UnstyledButton
          style={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: '8px',
            padding: '4px 8px',
            color: 'white',
            transition: 'background-color 200ms ease',
            fontSize: '14px',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          <Group gap={3} style={{ minWidth: 0 }}>
            <Text size="xs">{currentLanguage.flag}</Text>
            <Text size="xs" fw={500}>
              {currentLanguage.name}
            </Text>
          </Group>
          <IconChevronDown size={rem(16)} style={{ marginLeft: '2px', minWidth: 16, minHeight: 16, maxWidth: 16, maxHeight: 16 }} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Idioma</Menu.Label>
        {languages.map((language) => (
          <Menu.Item
            key={language.code}
            component={Link}
            href={getPathWithLocale(pathname, language.code)}
            style={{
              backgroundColor: currentLanguage.code === language.code ? 'rgba(153, 105, 229, 0.1)' : undefined,
              fontWeight: currentLanguage.code === language.code ? 600 : 400,
            }}
          >
            <Group gap={6}>
              <Text>{language.flag}</Text>
              <Text>{language.name}</Text>
            </Group>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
