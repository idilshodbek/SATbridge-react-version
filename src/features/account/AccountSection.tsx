import { cn } from "@heroui/react";
import type { ReactNode } from "react";

import { Icon3D, type Icon3DName } from "@/components/ui/Icon3D";
import { Panel } from "@/components/ui/Panel";

type AccountSectionProps = {
  /** Anchor, so links like `/account/settings#goals` can scroll here. */
  id?: string;
  icon: Icon3DName;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

/** A titled card on the account pages (3D icon + heading + content). */
export function AccountSection({ id, icon, title, description, children, className }: AccountSectionProps) {
  return (
    <Panel id={id} className={cn("scroll-mt-4 rounded-[18px] p-5 md:p-6", className)}>
      <div className="mb-4.5 flex items-center gap-3">
        <Icon3D icon={icon} size={36} />
        <div>
          <h2 className="text-[18px] font-extrabold tracking-[-0.4px]">{title}</h2>
          {description && <div className="text-[13px] font-semibold text-muted-2">{description}</div>}
        </div>
      </div>
      {children}
    </Panel>
  );
}
