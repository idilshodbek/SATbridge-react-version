import { useMediaQuery } from "@heroui/react";

/** Below this width the app switches to the mobile layout (tab bar, sheets, mobile screens). */
export const MOBILE_QUERY = "(max-width: 767px)";

export function useIsMobile() {
  return useMediaQuery(MOBILE_QUERY);
}
