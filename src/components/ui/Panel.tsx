import { Card, cn } from "@heroui/react";
import type { ComponentProps } from "react";

import { interactiveCard } from "./interactive";

type PanelProps = ComponentProps<typeof Card> & {
  /** Lifts on hover, for panels that open something when clicked. */
  interactive?: boolean;
};

/**
 * The design's standard white card: surface background, 1px border, 16px radius.
 * Built on HeroUI Card; padding is set per use (`className="p-5.5"`).
 */
export function Panel({ className, interactive = false, ...props }: PanelProps) {
  return (
    <Card
      className={cn(
        // `flex-row` resets HeroUI Card's column direction for Panels that opt into `flex`.
        "block flex-row gap-0 overflow-visible rounded-2xl border border-border bg-surface p-0 shadow-none",
        interactive && interactiveCard,
        className,
      )}
      {...props}
    />
  );
}
