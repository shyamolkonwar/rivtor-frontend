"use client";

import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

export function AnimatedGradientText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex bg-gradient-to-r from-white/50 via-white to-white/50 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient",
        className
      )}
    >
      {children}
    </span>
  );
}
