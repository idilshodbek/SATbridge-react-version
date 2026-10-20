import { cn, ToggleButton, ToggleButtonGroup, tv, type VariantProps } from "@heroui/react";
import type { Key } from "react";

/**
 * Single-choice segmented control (HeroUI ToggleButtonGroup).
 *
 * `tone` picks how the selected option looks:
 *   - brand   → solid SATbridge blue with white text
 *   - raised  → white "card" with a soft shadow
 *   - sidebar → the dark exam switcher in the sidebar
 *   - ink     → solid dark pill with white text (mobile subject switcher, filters)
 *   - soft    → white pill with blue text on a grey track (mobile radar switcher)
 * Container and option sizing is passed per use via `className` / `itemClassName`.
 */
const segmented = tv({
  slots: {
    group: "flex w-fit gap-1",
    item: "h-auto min-w-0 rounded-[9px] bg-transparent font-extrabold hover:bg-transparent data-[pressed=true]:bg-transparent",
  },
  variants: {
    tone: {
      brand: {
        item: "text-muted-2 data-[selected=true]:bg-accent data-[selected=true]:text-white data-[selected=true]:hover:bg-accent",
      },
      raised: {
        item: "text-muted data-[selected=true]:bg-surface data-[selected=true]:text-ink data-[selected=true]:shadow-[0_1px_3px_rgba(15,36,48,.14)] data-[selected=true]:hover:bg-surface",
      },
      sidebar: {
        item: "text-[#7FA0B1] data-[selected=true]:bg-side-active data-[selected=true]:text-white data-[selected=true]:hover:bg-side-active",
      },
      ink: {
        item: "text-muted data-[selected=true]:bg-btn data-[selected=true]:text-white data-[selected=true]:hover:bg-btn",
      },
      soft: {
        item: "text-muted-2 data-[selected=true]:bg-surface data-[selected=true]:text-accent data-[selected=true]:hover:bg-surface",
      },
    },
  },
  defaultVariants: { tone: "brand" },
});

export type SegmentedOption<T extends string> = { id: T; label: string };

type SegmentedControlProps<T extends string> = VariantProps<typeof segmented> & {
  "aria-label": string;
  options: readonly SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  itemClassName?: string;
};

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  tone,
  className,
  itemClassName,
  ...aria
}: SegmentedControlProps<T>) {
  const styles = segmented({ tone });

  const handleChange = (keys: Set<Key>) => {
    const [next] = keys;
    if (next !== undefined) onChange(next as T);
  };

  return (
    <ToggleButtonGroup
      {...aria}
      isDetached
      disallowEmptySelection
      selectionMode="single"
      selectedKeys={[value]}
      onSelectionChange={handleChange}
      className={styles.group({ className })}
    >
      {options.map((option) => (
        <ToggleButton key={option.id} id={option.id} className={cn(styles.item(), itemClassName)}>
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
