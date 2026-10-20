import { cn } from "@heroui/react";
import type { ReactNode } from "react";

const gradients = {
  /** Logo / info tiles. */
  brand: "linear-gradient(140deg,#3ED0F5,#009ADA)",
  /** Bridge AI tiles. */
  ai: "linear-gradient(140deg,#7BE3F5,#009ADA)",
};

type GradientTileProps = {
  children?: ReactNode;
  variant?: keyof typeof gradients;
  /** Size + radius, e.g. "size-9 rounded-[11px]". */
  className?: string;
};

/** Square tile with the SATbridge blue gradient and a centred icon. */
export function GradientTile({ children, variant = "brand", className }: GradientTileProps) {
  return (
    <div className={cn("grid flex-none place-items-center text-white", className)} style={{ background: gradients[variant] }}>
      {children}
    </div>
  );
}
