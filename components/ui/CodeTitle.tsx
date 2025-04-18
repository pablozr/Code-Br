'use client';

import React, { useEffect, useState } from 'react';
import { Box, Text } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';

interface CodeTitleProps {
  text: string;
  fontSize?: string;
  fontWeight?: number;
}

export default function CodeTitle({
  text = 'CodeBR',
  fontSize = '6.5rem',
  fontWeight = 900
}: CodeTitleProps) {
  const [isTyping, setIsTyping] = useState(true);
  const [displayText, setDisplayText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [glitchActive, setGlitchActive] = useState(false);
  const [bracketsOffset, setBracketsOffset] = useState({ left: 0, right: 0 });

  // Efeito de digitação (1)
  useEffect(() => {
    if (isTyping) {
      const fullText = text;
      let currentIndex = 0;

      // Pequena pausa antes de iniciar a digitação
      const initialDelay = setTimeout(() => {
        const typingInterval = setInterval(() => {
          if (currentIndex <= fullText.length) {
            setDisplayText(fullText.substring(0, currentIndex));
            currentIndex++;
          } else {
            setIsTyping(false);
            clearInterval(typingInterval);
          }
        }, 200); // Aumentado de 100ms para 200ms para digitação mais lenta

        return () => clearInterval(typingInterval);
      }, 800); // Pausa de 800ms antes de iniciar a digitação

      return () => clearTimeout(initialDelay);
    }
  }, [isTyping, text]);

  // Cursor piscando (1)
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 600); // Cursor piscando mais lento para combinar com a digitação mais lenta

    return () => clearInterval(cursorInterval);
  }, []);

  // Efeito de glitch ocasional (3)
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (!isTyping && Math.random() > 0.7) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 150);
      }
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, [isTyping]);

  // Movimento sutil dos elementos de código (4)
  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (!isTyping) {
        setBracketsOffset({
          left: Math.random() * 3 - 1.5,
          right: Math.random() * 3 - 1.5
        });
      }
    }, 2000);

    return () => clearInterval(moveInterval);
  }, [isTyping]);

  // Variantes para animação de entrada (7)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate="visible"
      variants={containerVariants}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        fontFamily: 'monospace, "Courier New", Courier',
      }}
    >
      {/* Tag de abertura com movimento sutil */}
      <motion.span
        style={{
          fontSize,
          fontWeight,
          color: '#9969E5',
          marginRight: '0.2em',
          display: 'inline-block',
          y: bracketsOffset.left,
        }}
        animate={{ y: bracketsOffset.left }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      >
        &lt;
      </motion.span>

      {/* Texto principal com gradiente e efeito de glitch */}
      <Box
        style={{
          position: 'relative',
          display: 'inline-block',
        }}
      >
        <motion.div
          style={{
            fontSize,
            fontWeight,
            color: 'white', // Alterado para branco sólido em vez de gradiente
            display: 'inline-block',
            filter: glitchActive ? 'blur(2px)' : 'none',
            transform: glitchActive ? 'translateX(3px)' : 'none',
          }}
          variants={letterVariants}
        >
          {displayText}
        </motion.div>

        {/* Cursor piscando */}
        {isTyping && (
          <motion.span
            style={{
              fontSize,
              fontWeight,
              color: 'white', // Alterado para branco para combinar com o texto principal
              opacity: cursorVisible ? 1 : 0,
              display: 'inline-block',
              marginLeft: '2px',
            }}
          >
            |
          </motion.span>
        )}

        {/* Efeito de glitch */}
        <AnimatePresence>
          {glitchActive && (
            <>
              <motion.div
                initial={{ opacity: 0, x: -3 }}
                animate={{ opacity: 0.5, x: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  fontSize,
                  fontWeight,
                  color: '#FF00FF',
                  clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
                  transform: 'translateX(-2px)',
                }}
              >
                {displayText}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 3 }}
                animate={{ opacity: 0.5, x: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  fontSize,
                  fontWeight,
                  color: '#00FFFF',
                  clipPath: 'polygon(0 45%, 100% 45%, 100% 100%, 0 100%)',
                  transform: 'translateX(2px)',
                }}
              >
                {displayText}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Box>

      {/* Tag de fechamento com movimento sutil */}
      <motion.span
        style={{
          fontSize,
          fontWeight,
          color: '#9969E5',
          marginLeft: '0.2em',
          display: 'inline-block',
          y: bracketsOffset.right,
        }}
        animate={{ y: bracketsOffset.right }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      >
        /&gt;
      </motion.span>
    </motion.div>
  );
}
