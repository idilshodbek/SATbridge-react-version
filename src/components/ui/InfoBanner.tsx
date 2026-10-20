import { Alert, cn } from "@heroui/react";
import type { ReactNode } from "react";

import { GradientTile } from "./GradientTile";

type InfoBannerProps = {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  className?: string;
};

/** Light-blue explainer box with a gradient icon tile (HeroUI Alert). */
export function InfoBanner({ icon, title, children, className }: InfoBannerProps) {
  return (
    <Alert className={cn("gap-4 rounded-2xl border-[1.5px] border-tint-blue-bd bg-tint-blue px-6 py-5.5 shadow-none", className)}>
      <Alert.Indicator className="p-0">
        <GradientTile className="size-8.5 rounded-[11px]">{icon}</GradientTile>
      </Alert.Indicator>
      <Alert.Content className="min-w-0">
        <Alert.Title className="mb-1.75 text-[20px] font-extrabold tracking-[-0.4px] text-ink">{title}</Alert.Title>
        <Alert.Description className="text-[15.5px] leading-[1.65] font-medium text-ink-2">{children}</Alert.Description>
      </Alert.Content>
    </Alert>
  );
}
