'use client';

import { useState } from 'react';
import { Menu, Button, Group, Text } from '@mantine/core';
import { IconChevronDown, IconGlobe } from '@tabler/icons-react';
import { useSafePathname, getLocaleFromPathname } from '@/app/_lib/utils/pathname';

const languages = [
  { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
];

function getPathWithLocale(pathname: string, locale: string): string {
  // Remove o locale atual da URL se existir
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, '');
  
  // Adiciona o novo locale
  return `/${locale}${pathWithoutLocale}`;
}

export function LanguageSwitcher() {
  const [opened, setOpened] = useState(false);
  const pathname = useSafePathname();
  
  // Extrair o idioma atual da URL
  const currentLocale = getLocaleFromPathname(pathname);
  
  // Encontrar o idioma atual
  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];

  return (
    <Menu 
      opened={opened} 
      onChange={setOpened}
      position="bottom-end"
      shadow="md"
      width={200}
    >
      <Menu.Target>
        <Button
          variant="subtle"
          size="sm"
          leftSection={<IconGlobe size={18} />}
          rightSection={<IconChevronDown size={14} />}
          style={{
            color: 'var(--mantine-color-gray-6)',
            fontWeight: 400,
          }}
        >
          <Group gap="xs">
            <span>{currentLanguage.flag}</span>
            <Text size="sm">{currentLanguage.name}</Text>
          </Group>
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Escolher idioma</Menu.Label>
        {languages.map((language) => (
          <Menu.Item
            key={language.code}
            leftSection={<span style={{ fontSize: '16px' }}>{language.flag}</span>}
            component="a"
            href={getPathWithLocale(pathname, language.code)}
            style={{
              backgroundColor: language.code === currentLocale ? 'var(--mantine-color-purple-1)' : 'transparent',
              color: language.code === currentLocale ? 'var(--mantine-color-purple-7)' : 'inherit',
            }}
            onClick={() => setOpened(false)}
          >
            {language.name}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
