"use client";

import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedGradientText } from "./AnimatedGradientText";

export function AnnouncementBadge({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative inline-flex items-center gap-2 rounded-full px-4 py-1.5",
        "border border-white/[0.08] bg-white/[0.02]",
        "transition-all duration-300 ease-out",
        "hover:border-white/[0.15] hover:bg-white/[0.04]",
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
      </span>

      <span className="h-3.5 w-px bg-white/20" />

      <AnimatedGradientText className="text-xs font-medium tracking-wide">
        <span className="hidden sm:inline">Meet 01 — The First of Its Kind</span>
        <span className="sm:hidden">01 — The First of Its Kind</span>
      </AnimatedGradientText>

      <ChevronRight className="h-3.5 w-3.5 text-white/40 transition-all duration-300 ease-in-out group-hover:translate-x-0.5 group-hover:text-white/70" />
    </div>
  );
}
