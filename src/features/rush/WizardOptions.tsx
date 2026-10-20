import { cn } from "@heroui/react";

import { SegmentedControl } from "@/components/ui/SegmentedControl";

import type { RushWizardState } from "./useRushWizard";

/** Difficulty / count / pace choices (steps 2–5). `compact` is the mobile sheet sizing. */
export function WizardOptions({ wizard, compact = false }: { wizard: RushWizardState; compact?: boolean }) {
  return (
    <div className={cn("flex flex-col", compact ? "gap-5" : "gap-5.5")}>
      {wizard.options.map((option) => (
        <div key={option.label}>
          <div className={cn("font-bold text-muted", compact ? "mb-2.25 text-[13px]" : "mb-2.5 text-[14px]")}>{option.label}</div>
          <SegmentedControl
            aria-label={option.label}
            options={option.choices.map((choice) => ({
              id: choice,
              label: choice,
            }))}
            value={option.value}
            onChange={option.onChange}
            className={cn("flex-wrap", compact ? "gap-2" : "gap-2.25")}
            itemClassName={cn(
              "rounded-xl border-[1.6px] border-border bg-surface py-3 font-bold text-ink hover:bg-surface",
              compact ? "px-4.5 text-[14px]" : "px-5 text-[14.5px]",
              "data-[selected=true]:border-accent data-[selected=true]:bg-tint-blue data-[selected=true]:text-on-blue data-[selected=true]:hover:bg-tint-blue",
            )}
          />
        </div>
      ))}
    </div>
  );
}
