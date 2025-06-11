'use client';

import { memo, useState, useEffect } from 'react';

// Importações específicas dos ícones mais usados para reduzir bundle
import { 
  IconCheck,
  IconArrowRight,
  IconArrowLeft,
  IconMail,
  IconPhone,
  IconUser,
  IconSend,
  IconCalculator,
  IconInfoCircle,
  IconMenu2,
  IconX,
  IconWorld,
  IconCode,
  IconPalette,
  IconRocket,
  IconShield,
  IconStar,
  IconCoin,
  IconClock,
  IconBuilding,
  IconDeviceDesktop,
  IconBrandWhatsapp,
  IconExternalLink,
} from '@tabler/icons-react';

// Mapeamento de ícones otimizado
export const iconMap = {
  check: IconCheck,
  arrowRight: IconArrowRight,
  arrowLeft: IconArrowLeft,
  mail: IconMail,
  phone: IconPhone,
  user: IconUser,
  send: IconSend,
  calculator: IconCalculator,
  info: IconInfoCircle,
  menu: IconMenu2,
  close: IconX,
  world: IconWorld,
  code: IconCode,
  palette: IconPalette,
  rocket: IconRocket,
  shield: IconShield,
  star: IconStar,
  coin: IconCoin,
  clock: IconClock,
  building: IconBuilding,
  desktop: IconDeviceDesktop,
  whatsapp: IconBrandWhatsapp,
  external: IconExternalLink,
} as const;

export type IconName = keyof typeof iconMap;

// Componente de ícone otimizado
interface OptimizedIconProps {
  name: IconName;
  size?: number;
  color?: string;
  stroke?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const OptimizedIcon = memo<OptimizedIconProps>(({ 
  name, 
  size = 24, 
  color, 
  stroke = 1.5,
  className,
  style 
}) => {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return null;
  }

  return (
    <IconComponent
      size={size}
      color={color}
      stroke={stroke}
      className={className}
      style={style}
    />
  );
});

OptimizedIcon.displayName = 'OptimizedIcon';

// Hook para preload de ícones (simplificado)
export const useIconPreloader = () => {
  const preloadIcon = async (iconName: string) => {
    try {
      await import(`@tabler/icons-react`);
      console.log(`Icon ${iconName} preloaded`);
    } catch (error) {
      console.warn(`Failed to preload icon: ${iconName}`, error);
    }
  };

  return { preloadIcon };
};
