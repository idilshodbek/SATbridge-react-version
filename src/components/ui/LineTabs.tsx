import { cn, Tabs } from "@heroui/react";
import type { Key, ReactNode } from "react";

export type LineTab<T extends string> = {
  id: T;
  label: ReactNode;
  /** Small glyph shown before the label (e.g. "☰"). */
  glyph?: string;
  /** Extra content after the label, e.g. a count badge. */
  suffix?: ReactNode;
};

type LineTabsProps<T extends string> = {
  "aria-label": string;
  items: readonly LineTab<T>[];
  selectedKey: T;
  onSelectionChange: (key: T) => void;
  /** `<Tabs.Panel>` elements. Omit when the tabs only filter content rendered elsewhere. */
  children?: ReactNode;
  /** Rendered next to the tab list (position it absolutely, e.g. a close button). */
  trailing?: ReactNode;
  className?: string;
  listContainerClassName?: string;
  listClassName?: string;
  tabClassName?: string;
  indicatorClassName?: string;
};

/**
 * Underlined tabs (HeroUI Tabs, secondary variant) with the design's typography:
 * muted semibold labels, the selected one bold with a 2.5px ink underline.
 */
export function LineTabs<T extends string>({
  items,
  selectedKey,
  onSelectionChange,
  children,
  trailing,
  className,
  listContainerClassName,
  listClassName,
  tabClassName,
  indicatorClassName,
  "aria-label": ariaLabel,
}: LineTabsProps<T>) {
  return (
    <Tabs
      variant="secondary"
      selectedKey={selectedKey}
      onSelectionChange={(key: Key) => onSelectionChange(key as T)}
      className={cn("gap-0", className)}
    >
      <Tabs.ListContainer className={listContainerClassName}>
        <Tabs.List aria-label={ariaLabel} className={cn("gap-6.5", listClassName)}>
          {items.map((item) => (
            <Tabs.Tab
              key={item.id}
              id={item.id}
              className={cn(
                // Bottom padding includes the design's 2.5px underline (drawn by Tabs.Indicator).
                "h-auto w-auto gap-2 px-0.5 pt-3 pb-[16.5px] text-[16.5px] font-semibold text-muted",
                "data-[selected=true]:font-bold data-[selected=true]:text-ink",
                tabClassName,
              )}
            >
              {item.glyph && <span className="text-[14px]">{item.glyph}</span>}
              {item.label}
              {item.suffix}
              <Tabs.Indicator className={cn("h-[2.5px] bg-ink", indicatorClassName)} />
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs.ListContainer>
      {trailing}
      {children}
    </Tabs>
  );
}

/** Tab panel without HeroUI's default spacing. */
export function LinePanel({ id, className, children }: { id: string; className?: string; children: ReactNode }) {
  return (
    <Tabs.Panel id={id} className={cn("mt-0 p-0", className)}>
      {children}
    </Tabs.Panel>
  );
}
