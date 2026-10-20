import { cn, Link } from "@heroui/react";

import { Icon3D, type Icon3DName } from "@/components/ui/Icon3D";
import { interactiveCard } from "@/components/ui/interactive";

type ShortcutTileProps = {
  name: string;
  meta: string;
  icon: Icon3DName;
  to: string;
  /** `md` is the slightly larger tile on the Practice tab. */
  size?: "sm" | "md";
};

/** Link tile with a 3D icon, used in the phone shortcut grids. */
export function ShortcutTile({ name, meta, icon, to, size = "sm" }: ShortcutTileProps) {
  const isMedium = size === "md";

  return (
    <Link
      href={to}
      className={cn(
        interactiveCard,
        "block w-full rounded-2xl border border-border bg-surface p-3.75 text-left font-normal no-underline",
      )}
    >
      <Icon3D icon={icon} size={isMedium ? 36 : 34} className={isMedium ? "mb-2.75" : "mb-2.5"} />
      <span className={cn("block font-bold text-ink", isMedium ? "text-[14.5px] leading-[1.25]" : "text-[14px]")}>{name}</span>
      <span className={cn("block font-semibold text-muted-2", isMedium ? "mt-0.75 text-[11.5px]" : "mt-0.5 text-[11px]")}>
        {meta}
      </span>
    </Link>
  );
}
