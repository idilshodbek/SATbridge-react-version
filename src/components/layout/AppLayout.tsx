import { RouterProvider as AriaRouterProvider, Toast } from "@heroui/react";
import { useHref, useNavigate } from "react-router";

import { CommunityProvider } from "@/app/community";
import { ProgressProvider } from "@/app/progress";
import { SearchPaletteProvider } from "@/app/search";
import { ThemeProvider } from "@/app/theme";
import { MobileShell } from "@/components/mobile/MobileShell";
import { useIsMobile } from "@/hooks/useIsMobile";

import { DesktopShell } from "./DesktopShell";
import { RouteProgressBar } from "./RouteProgressBar";

/**
 * Root layout: app-wide providers + the shell for the current screen size.
 * `AriaRouterProvider` lets every HeroUI `href` (Link, Tabs…) navigate with React Router.
 */
export function AppLayout() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <AriaRouterProvider navigate={navigate} useHref={useHref}>
      <ThemeProvider>
        <ProgressProvider>
          <CommunityProvider>
            <SearchPaletteProvider>
              <RouteProgressBar />
              {isMobile ? <MobileShell /> : <DesktopShell />}
            </SearchPaletteProvider>
          </CommunityProvider>
        </ProgressProvider>
        <Toast.Provider placement={isMobile ? "top" : "bottom end"} />
      </ThemeProvider>
    </AriaRouterProvider>
  );
}
