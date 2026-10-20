import { tv } from "@heroui/react";

/** One row in the dark sidebar (nav links, Upgrade, dark-mode toggle, More). */
export const sidebarItemClass = tv({
  base: [
    "flex h-auto items-center rounded-[11px] text-left text-[15px] font-semibold no-underline",
    "transition-colors duration-150",
  ],
  variants: {
    active: {
      true: "bg-side-active text-white hover:bg-side-active",
      false: "bg-transparent text-[#B4CBD7] hover:bg-side-active/60 hover:text-white",
    },
    /** Icon-only rail: a centred square instead of a full-width row. */
    collapsed: {
      true: "relative mx-auto size-11 justify-center px-0",
      false: "w-full justify-start gap-3 px-3 py-2",
    },
  },
  defaultVariants: { active: false, collapsed: false },
});
