import { cn } from "@heroui/react";
import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/Eyebrow";

/** The phone-sized upper-case section label, e.g. "EVERYTHING ELSE". */
export function MobileEyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <Eyebrow className={cn("text-[11px] tracking-[1.1px]", className)}>{children}</Eyebrow>;
}
