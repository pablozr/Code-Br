"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({ children, ...props }: AuroraBackgroundProps) => {
  return (
    <main
      className={cn(
        "relative h-[100vh] w-full overflow-hidden bg-black",
        "[&_.aurora]:animate-aurora",
        props.className
      )}
      {...props}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          "--aurora":
            "repeating-linear-gradient(100deg,#7641C0_10%,#9969E5_15%,#6A5ACD_20%,#8A63E8_25%,#6741D9_30%)",
          "--dark-gradient":
            "repeating-linear-gradient(100deg,#0d0d0d_0%,#1a1a1a_7%,transparent_10%,transparent_12%,#0d0d0d_16%)",
          "--white-gradient":
            "repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)",
          "--purple-700": "#7641C0",
          "--purple-600": "#9969E5",
          "--purple-500": "#6A5ACD",
          "--purple-400": "#8A63E8",
          "--purple-300": "#6741D9",
          "--black": "#0d0d0d",
          "--dark-gray": "#1a1a1a",
          "--transparent": "transparent",
        } as React.CSSProperties}
      >
        {/* Fundo principal com gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,10,1)] via-[rgba(15,15,15,0.98)] to-[rgba(10,10,10,0.95)]"></div>

        {/* Efeito de círculos/partículas */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(153, 105, 229, 0.15) 0%, transparent 8%)',
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0, 15px 15px',
          }}
        ></div>

        {/* Efeito de linhas de grade */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(153, 105, 229, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(153, 105, 229, 0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        ></div>

        {/* Efeito de brilho superior */}
        <div
          className="absolute top-0 left-0 right-0 h-[300px] opacity-20"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(153, 105, 229, 0.3) 0%, transparent 70%)',
          }}
        ></div>

        {/* Efeito de brilho lateral */}
        <div
          className="absolute top-[20%] -right-[10%] w-[500px] h-[500px] opacity-20 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle at center, rgba(153, 105, 229, 0.4) 0%, transparent 70%)',
          }}
        ></div>
      </div>
      {children}
    </main>
  );
};

