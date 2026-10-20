import { Tooltip } from "@heroui/react";
import type { ReactNode } from "react";

type WithTooltipProps = {
  label: ReactNode;
  /** A focusable element such as `<Button>` or `<ButtonLink>`. */
  children: ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
};

/** Shows a short label on hover or keyboard focus. Use it on icon-only buttons so they explain themselves. */
export function WithTooltip({ label, children, placement = "bottom" }: WithTooltipProps) {
  return (
    <Tooltip delay={350} closeDelay={0}>
      {children}
      <Tooltip.Content placement={placement} className="rounded-lg bg-btn px-2.5 py-1.5 text-[12.5px] font-bold text-white">
        {label}
      </Tooltip.Content>
    </Tooltip>
  );
}
