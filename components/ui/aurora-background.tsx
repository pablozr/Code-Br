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
        style={
          {
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
          } as React.CSSProperties
        }
      >
        <div
          className={cn(
            "aurora absolute -inset-[10px] opacity-30",
            "bg-[size:200%_200%]",
            "bg-[image:var(--aurora)]",
            "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]"
          )}
        ></div>
      </div>
      {children}
    </main>
  );
};

