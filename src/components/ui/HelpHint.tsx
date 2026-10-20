import { cn, Popover } from "@heroui/react";
import type { ReactNode } from "react";

type HelpHintProps = {
  /** Heading inside the popover, e.g. "Predicted score". */
  title: string;
  children: ReactNode;
  className?: string;
};

/**
 * A small "?" next to a label that explains it on tap or click.
 * Uses a popover (not a tooltip) so it works the same with a mouse, a keyboard and a finger.
 */
export function HelpHint({ title, children, className }: HelpHintProps) {
  return (
    <Popover>
      <Popover.Trigger
        aria-label={`What is ${title}?`}
        className={cn(
          "grid size-4.5 flex-none cursor-pointer place-items-center rounded-full bg-surface-3 text-[10.5px] font-extrabold text-muted",
          "transition-colors hover:bg-border hover:text-ink data-[pressed=true]:scale-95",
          className,
        )}
      >
        ?
      </Popover.Trigger>
      <Popover.Content className="max-w-72 rounded-2xl border border-border bg-surface p-0 shadow-[0_18px_40px_rgba(15,36,48,.16)]">
        <Popover.Dialog className="p-4">
          <Popover.Heading className="mb-1.5 text-[14px] font-extrabold text-ink">{title}</Popover.Heading>
          <div className="text-[13px] leading-[1.55] font-medium text-muted">{children}</div>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}
