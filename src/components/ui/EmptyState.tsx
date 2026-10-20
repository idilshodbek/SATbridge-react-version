import { cn } from "@heroui/react";
import type { ReactNode } from "react";

import { Icon3D, type Icon3DName } from "./Icon3D";

type EmptyStateProps = {
  icon: Icon3DName;
  title: string;
  text: string;
  action?: ReactNode;
  className?: string;
};

/** Dashed placeholder for empty lists: 3D icon, title, one line of help and an optional action. */
export function EmptyState({ icon, title, text, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 rounded-[18px] border border-dashed border-border-2 px-6 py-12 text-center",
        className,
      )}
    >
      <Icon3D icon={icon} size={52} />
      <div className="text-[16px] font-extrabold">{title}</div>
      <div className="max-w-80 text-[13.5px] font-semibold text-muted-2">{text}</div>
      {action}
    </div>
  );
}
