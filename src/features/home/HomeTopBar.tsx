import { Kbd } from "@heroui/react";

import { paths } from "@/app/paths";
import { FlameIcon, FriendsIcon, SearchIcon, TimerIcon, XpIcon } from "@/components/icons";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { WithTooltip } from "@/components/ui/WithTooltip";
import { Button, ButtonLink } from "@/components/ui/Button";
import { useProgress } from "@/app/progress-context";
import { useSearchPalette } from "@/app/search-context";
import { currentUser, formatXp } from "@/data/user";
import { modifierKeyLabel } from "@/lib/platform";

const squareButton = "size-10 rounded-xl border border-border bg-surface p-0 text-muted hover:bg-hover";

/** Search, friends, study rooms and the streak / XP counter. */
export function HomeTopBar() {
  const { xp } = useProgress();
  const { open: openSearch } = useSearchPalette();

  return (
    <div className="mb-5.5 flex items-center justify-end gap-3.5">
      <Button
        onPress={openSearch}
        className="w-70 justify-start gap-2.5 rounded-xl border border-border bg-surface px-4 py-2.5 text-[14.5px] font-medium text-muted-2 hover:bg-hover"
      >
        <SearchIcon size={17} />
        <span className="flex-1 text-left">Search or jump to…</span>
        <Kbd className="h-auto rounded-md border border-border bg-surface-2 px-1.5 py-0.5 text-[11px] font-bold text-muted">
          <Kbd.Content>{modifierKeyLabel}K</Kbd.Content>
        </Kbd>
      </Button>

      <ButtonLink href={paths.friends} aria-label="Friends" className={squareButton}>
        <FriendsIcon size={19} />
      </ButtonLink>
      <ButtonLink href={paths.studyRooms} aria-label="Study rooms" className={squareButton}>
        <TimerIcon size={19} />
      </ButtonLink>

      <div className="flex items-center gap-0.5 rounded-xl border border-border bg-surface p-1.25">
        <div className="flex items-center gap-1.5 rounded-[9px] px-2.75 py-1.25 text-[15px] font-extrabold text-orange">
          <FlameIcon size={17} />
          {currentUser.studyStreak}
        </div>
        <div className="h-5 w-px bg-border" />
        <WithTooltip label="XP · earned from questions, lessons and daily tasks">
          <ButtonLink
            href={paths.myProfile}
            aria-label={`${xp} XP · open profile`}
            className="h-auto gap-1.5 rounded-[9px] px-2.75 py-1.25 text-[15px] font-extrabold text-accent hover:bg-hover"
          >
            <XpIcon size={17} highlight />
            <AnimatedNumber value={xp} format={formatXp} />
          </ButtonLink>
        </WithTooltip>
      </div>
    </div>
  );
}
