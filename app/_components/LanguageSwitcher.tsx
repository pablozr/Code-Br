'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Menu, UnstyledButton, Group, Text, rem } from '@mantine/core';
import { IconLanguage, IconChevronDown } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

const languages = [
  { code: 'pt-BR', name: 'Português' },
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' }
];

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { i18n, t } = useTranslation('common');
  const [opened, setOpened] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);

  // Atualizar o idioma atual com base no i18n
  useEffect(() => {
    const lang = languages.find(lang => lang.code === i18n.language) || languages[0];
    setCurrentLanguage(lang);
  }, [i18n.language]);

  const changeLanguage = (langCode: string) => {
    const lang = languages.find(lang => lang.code === langCode) || languages[0];
    setCurrentLanguage(lang);

    // Mudar o idioma no i18n
    i18n.changeLanguage(langCode);

    // Redirecionar para a mesma página no novo idioma
    // Construir a nova URL com o idioma atualizado
    const segments = pathname.split('/');

    // Se o primeiro segmento após a barra for um código de idioma, substituí-lo
    if (segments[1] && languages.some(lang => lang.code === segments[1].split('?')[0])) {
      segments[1] = langCode;
    } else {
      // Caso contrário, adicionar o código de idioma no início
      segments.splice(1, 0, langCode);
    }

    // Adicionar um parâmetro para evitar loops de redirecionamento
    const newPathname = segments.join('/');
    const newUrl = new URL(newPathname, window.location.origin);
    newUrl.searchParams.set('__isMiddlewareReload', '1');

    // Usar router.replace em vez de push para evitar adicionar à história de navegação
    router.replace(newUrl.toString());

    setOpened(false);
  };

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
          sx={(theme) => ({
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
          })}
        >
          <Group gap={3}>
            <IconLanguage size={12} stroke={1.5} />
            <Text size="xs" fw={500}>
              {currentLanguage.name}
            </Text>
          </Group>
          <IconChevronDown size={rem(12)} style={{ marginLeft: '2px' }} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{t('header.language') || 'Idioma'}</Menu.Label>
        {languages.map((language) => (
          <Menu.Item
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            style={{
              backgroundColor: currentLanguage.code === language.code ? 'rgba(153, 105, 229, 0.1)' : undefined,
              fontWeight: currentLanguage.code === language.code ? 600 : 400,
            }}
          >
            {language.name}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
