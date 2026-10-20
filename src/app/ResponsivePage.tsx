import type { ComponentType } from "react";

import { useIsMobile } from "@/hooks/useIsMobile";

type ResponsivePageProps = { desktop: ComponentType; mobile: ComponentType };

/** Renders the phone design below the mobile breakpoint and the desktop page above it. */
export function ResponsivePage({ desktop: Desktop, mobile: Mobile }: ResponsivePageProps) {
  return useIsMobile() ? <Mobile /> : <Desktop />;
}
