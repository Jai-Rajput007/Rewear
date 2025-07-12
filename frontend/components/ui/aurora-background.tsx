"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "min-h-screen w-full flex items-center justify-center p-4 md:p-8",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 opacity-90 dark:opacity-70"
          style={{
            backgroundSize: "200% 200%",
            animation: "aurora 20s linear infinite",
            filter: "blur(100px)",
          }}
        />
      </div>
      <div className="relative z-10 w-full max-w-[480px]">
        {children}
      </div>
    </div>
  );
};
