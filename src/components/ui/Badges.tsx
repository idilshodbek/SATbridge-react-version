import { Chip, cn } from "@heroui/react";

import { CrownIcon, TrendIcon } from "@/components/icons";

/** Small blue "New" label (sidebar, menus). */
export function NewBadge({ className, children = "New" }: { className?: string; children?: string }) {
  return (
    <Chip className={cn("rounded-md bg-accent px-1.75 py-0.5 text-[10.5px] font-bold text-white", className)}>{children}</Chip>
  );
}

/** Pink crown "PRO" / "Pro" pill. */
export function ProBadge({ className, children = "PRO" }: { className?: string; children?: string }) {
  return (
    <Chip className={cn("gap-1.25 rounded-full bg-pink px-2.75 py-1 text-[11.5px] font-extrabold text-white", className)}>
      <CrownIcon size={11} />
      {children}
    </Chip>
  );
}

/** Red "Hard" difficulty pill on predicted tests. */
export function HardBadge() {
  return (
    <Chip className="gap-1.25 rounded-full bg-tint-red px-2.75 py-1 text-[11.5px] font-extrabold text-danger-ink">
      <TrendIcon size={11} />
      Hard
    </Chip>
  );
}
