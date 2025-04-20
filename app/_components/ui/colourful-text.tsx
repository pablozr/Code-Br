"use client";
import React from "react";
import { motion } from "framer-motion";

export default function ColourfulText({
  text,
  fontSize = "3rem",
  fontWeight = 700,
  className = ""
}: {
  text: string;
  fontSize?: string | number;
  fontWeight?: number;
  className?: string;
}) {
  const colors = [
    "rgb(93, 0, 255)",    // #5D00FF - Roxo escuro
    "rgb(118, 65, 192)",  // #7641C0 - Roxo médio
    "rgb(153, 105, 229)", // #9969E5 - Roxo claro
    "rgb(178, 141, 255)", // #B28DFF - Roxo muito claro
    "rgb(106, 90, 205)",  // #6A5ACD - Roxo azulado
    "rgb(138, 99, 232)",  // #8A63E8 - Roxo médio-claro
    "rgb(103, 65, 217)",  // #6741D9 - Roxo médio-escuro
    "rgb(255, 255, 255)", // #FFFFFF - Branco (para destaque)
  ];

  const [currentColors, setCurrentColors] = React.useState(colors);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...colors].sort(() => Math.random() - 0.5);
      setCurrentColors(shuffled);
      setCount((prev) => prev + 1);
    }, 8000); // Aumentado para 8 segundos para um efeito mais sutil

    return () => clearInterval(interval);
  }, []);

  return text.split("").map((char, index) => (
    <motion.span
      key={`${char}-${count}-${index}`}
      initial={{
        y: 0,
      }}
      animate={{
        color: currentColors[index % currentColors.length],
        y: [0, -2, 0],
        scale: [1, 1.005, 1],
        filter: ["blur(0px)", `blur(2px)`, "blur(0px)"],
        opacity: [1, 0.9, 1],
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
      }}
      className={`inline-block whitespace-pre font-sans tracking-tight ${className}`}
      style={{
        fontSize,
        fontWeight,
        textShadow: '0 0 10px rgba(118,65,192,0.3)',
      }}
    >
      {char}
    </motion.span>
  ));
}
