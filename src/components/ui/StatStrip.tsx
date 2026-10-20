import { cn } from "@heroui/react";

import type { ValueTone } from "@/data/types";

import { ButtonLink } from "./Button";
import { Panel } from "./Panel";
import { valueToneClasses } from "./tones";

export type StatItem = {
  label: string;
  value: string;
  valueTone: ValueTone;
  /** Large faded glyph in the bottom-right corner. */
  ghost: string;
  action?: { label: string; to: string };
};

type StatStripProps = {
  items: StatItem[];
  /** Minimum column width before the grid wraps (px). */
  minColumnWidth?: number;
  className?: string;
  cellClassName?: string;
  ghostClassName?: string;
};

/** A row of stat cells separated by vertical rules (home, question bank, report). */
export function StatStrip({ items, minColumnWidth = 220, className, cellClassName, ghostClassName }: StatStripProps) {
  return (
    <Panel
      className={cn("grid overflow-hidden", className)}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${minColumnWidth}px), 1fr))`,
      }}
    >
      {items.map((stat) => (
        <div
          key={stat.label}
          className={cn("relative min-h-33 overflow-hidden border-r border-border px-5.5 pt-5 pb-5.5", cellClassName)}
        >
          <div className="mb-2 text-[14.5px] font-semibold text-muted">{stat.label}</div>
          <div className={cn("text-[34px] font-extrabold tracking-[-0.8px]", valueToneClasses[stat.valueTone])}>{stat.value}</div>
          {stat.action && (
            <ButtonLink href={stat.action.to} tone="outline" className="mt-3 px-3.75 py-2 text-[12.5px]">
              {stat.action.label}
            </ButtonLink>
          )}
          <div
            aria-hidden="true"
            className={cn("absolute right-3.5 bottom-1.5 text-[74px] leading-none font-extrabold opacity-[.06]", ghostClassName)}
          >
            {stat.ghost}
          </div>
        </div>
      ))}
    </Panel>
  );
}
