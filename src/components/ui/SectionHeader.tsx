import { cn } from "@heroui/react";
import type { ReactNode } from "react";

import { ChevronRightIcon } from "@/components/icons";

import { ButtonLink } from "./Button";

type SectionHeaderProps = {
  title: string;
  icon: ReactNode;
  /** Optional "View all" style link on the right. */
  action?: { label: string; href: string };
  className?: string;
  titleClassName?: string;
};

/** Section heading with an icon and an optional outline link, e.g. "Analytics · View all analytics". */
export function SectionHeader({ title, icon, action, className, titleClassName }: SectionHeaderProps) {
  return (
    <div className={cn("mb-3.5 flex items-center justify-between gap-3.5", className)}>
      <div className="flex items-center gap-2.75">
        {icon}
        <h2 className={cn("text-[25px] font-extrabold tracking-[-0.4px]", titleClassName)}>{title}</h2>
      </div>
      {action && (
        <ButtonLink href={action.href} tone="outline" className="gap-1.75 px-4 py-2.5 text-[13px]">
          {action.label}
          <ChevronRightIcon size={14} />
        </ButtonLink>
      )}
    </div>
  );
}
