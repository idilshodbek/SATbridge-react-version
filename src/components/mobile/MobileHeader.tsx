import { useLocation, useNavigate } from "react-router";

import { paths } from "@/app/paths";
import { BridgeWaveIcon, ChevronLeftIcon, FlameSolidIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { GradientTile } from "@/components/ui/GradientTile";
import { useProgress } from "@/app/progress-context";
import { currentUser, formatXp } from "@/data/user";

import type { ResolvedMobileScreen } from "./mobileScreens";

type MobileHeaderProps = {
  screen: ResolvedMobileScreen;
  onOpenMore: () => void;
};

const squareButton = "size-8.5 flex-none rounded-[11px] border border-border bg-surface p-0 hover:bg-surface";

/** Sticky top bar: back button or logo, screen title, streak and the "All of SATbridge" button. */
export function MobileHeader({ screen, onOpenMore }: MobileHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = screen.pattern === paths.home;
  const { xp } = useProgress();
  // The Today header shows live XP; other screens use their static subtitle.
  const subtitle = isHome ? `${formatXp(xp)} · ${currentUser.questionsAnswered} questions` : screen.subtitle;

  // Step back through in-app history; a deep link (no history yet) falls back to Home.
  const goBack = () => (location.key === "default" ? navigate(paths.home) : navigate(-1));

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background px-4 pt-3.5 pb-3">
      <div className="flex items-center gap-2.75">
        {!screen.isTabRoot && (
          <Button aria-label="Back" onPress={goBack} className={`${squareButton} text-ink`}>
            <ChevronLeftIcon size={17} />
          </Button>
        )}
        {isHome && (
          <GradientTile className="size-8 rounded-[10px]">
            <BridgeWaveIcon size={19} />
          </GradientTile>
        )}
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-[17px] font-extrabold tracking-[-0.4px]">{screen.title}</h1>
          <div className="truncate text-[11.5px] font-semibold text-muted-2">{subtitle}</div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1.5 text-[13px] font-extrabold text-orange">
          <FlameSolidIcon size={13} />
          {currentUser.studyStreak}
        </div>
        <Button aria-label="All of SATbridge" onPress={onOpenMore} className={`${squareButton} text-muted`}>
          <svg width={17} height={17} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-icon="">
            <circle cx="5" cy="12" r="1.9" />
            <circle cx="12" cy="12" r="1.9" />
            <circle cx="19" cy="12" r="1.9" />
          </svg>
        </Button>
      </div>
    </header>
  );
}
