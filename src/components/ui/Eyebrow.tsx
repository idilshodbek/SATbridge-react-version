import { cn } from "@heroui/react";
import type { ReactNode } from "react";

/** Small upper-case label above a card's content, e.g. "PROGRESS RADAR". */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("text-[12px] font-extrabold tracking-[1.2px] text-muted-2", className)}>{children}</div>;
}
