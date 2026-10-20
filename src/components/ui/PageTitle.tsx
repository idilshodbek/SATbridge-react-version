import { cn } from "@heroui/react";
import type { ReactNode } from "react";

type PageTitleProps = {
  children: ReactNode;
  /** Optional icon shown before the title. */
  icon?: ReactNode;
  className?: string;
};

/** Page heading: optional icon + 32px extra-bold title. */
export function PageTitle({ children, icon, className }: PageTitleProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {icon}
      <h1 className="text-[32px] font-extrabold tracking-[-0.8px]">{children}</h1>
    </div>
  );
}
