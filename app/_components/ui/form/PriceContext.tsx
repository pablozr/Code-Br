'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

// Definir o tipo do contexto
interface PriceContextType {
  totalPrice: number;
  updatePrice: (price: number) => void;
  formatPrice: (price: number, locale: string) => string;
}

// Criar o contexto com um valor padrão
const PriceContext = createContext<PriceContextType>({
  totalPrice: 0,
  updatePrice: () => {},
  formatPrice: () => '0',
});

// Hook personalizado para usar o contexto
export const usePriceContext = () => useContext(PriceContext);

// Componente Provider
export const PriceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Função para atualizar o preço
  const updatePrice = useCallback((price: number) => {
    setTotalPrice(price);
  }, []);

  // Função para formatar o preço de acordo com a moeda
  const formatPrice = useCallback((price: number, locale: string): string => {
    if (!price) return '0';
    
    // Obter o símbolo da moeda e o multiplicador com base no idioma
    const currencyInfo = {
      'pt-BR': { symbol: 'R$', multiplier: 1 },
      'en': { symbol: '$', multiplier: 1/5 }, // Convertendo de BRL para USD (aproximado)
      'fr': { symbol: 'CHF', multiplier: 1/5 }, // Convertendo de BRL para CHF (aproximado)
    }[locale as 'pt-BR' | 'en' | 'fr'] || { symbol: 'R$', multiplier: 1 };
    
    const convertedPrice = price * currencyInfo.multiplier;
    
    if (locale === 'pt-BR') {
      return `${currencyInfo.symbol} ${convertedPrice.toLocaleString('pt-BR')}`;
    } else if (locale === 'fr') {
      return `${currencyInfo.symbol} ${convertedPrice.toLocaleString('fr-CH')}`;
    } else {
      return `${currencyInfo.symbol}${convertedPrice.toLocaleString('en-US')}`;
    }
  }, []);

  // Valor do contexto
  const contextValue = {
    totalPrice,
    updatePrice,
    formatPrice,
  };

  return (
    <PriceContext.Provider value={contextValue}>
      {children}
    </PriceContext.Provider>
  );
};
