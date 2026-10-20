import { cn, Modal } from "@heroui/react";
import type { ReactNode } from "react";

import { Icon3D, type Icon3DName } from "./Icon3D";

type AppDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  icon: Icon3DName;
  title: string;
  description?: string;
  children: ReactNode;
  /** Buttons row; use `slot="close"` on a Button to make it dismiss the dialog. */
  footer?: ReactNode;
  size?: "sm" | "md";
};

/** The app's standard centred dialog: 3D icon, heading, body and a button row. */
export function AppDialog({ isOpen, onOpenChange, icon, title, description, children, footer, size = "sm" }: AppDialogProps) {
  return (
    <Modal.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Container placement="center" className="p-4">
        <Modal.Dialog
          aria-label={title}
          className={cn("max-w-full animate-pop rounded-[20px] bg-surface p-6", size === "sm" ? "w-110" : "w-140")}
        >
          <div className="mb-5 flex items-start gap-3.5">
            <Icon3D icon={icon} size={42} />
            <div className="min-w-0 flex-1">
              <Modal.Heading className="text-[20px] leading-[1.25] font-extrabold tracking-[-0.5px] text-ink">
                {title}
              </Modal.Heading>
              {description && <div className="mt-1 text-[13.5px] leading-[1.5] font-semibold text-muted-2">{description}</div>}
            </div>
          </div>
          {children}
          {footer && <div className="mt-6 flex flex-wrap justify-end gap-2.5">{footer}</div>}
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}
