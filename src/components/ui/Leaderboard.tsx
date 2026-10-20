import { cn } from "@heroui/react";

import type { CohortMember } from "@/data/community";

import { InitialsAvatar } from "./InitialsAvatar";

type LeaderboardRowProps = {
  member: CohortMember;
  /** Show "best 1290" under the name (My Classes). */
  showScore?: boolean;
};

/** One leaderboard row; the signed-in student is tinted violet. */
export function LeaderboardRow({ member, showScore = false }: LeaderboardRowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border px-3",
        showScore ? "py-2.75" : "py-2.5",
        member.isYou ? "border-tint-violet-bd bg-tint-violet" : "border-border bg-surface",
      )}
    >
      <div
        className={cn(
          "text-center font-extrabold",
          showScore ? "w-6 text-[14px]" : "w-5.5 text-[13.5px]",
          member.rank === 1 ? "text-on-amber" : "text-muted-2",
        )}
      >
        {member.rank}
      </div>
      <InitialsAvatar
        initials={member.initials}
        background={member.color}
        className={showScore ? "size-8.5" : "size-8"}
        fallbackClassName={showScore ? "text-[12.5px]" : "text-[12px]"}
      />
      <div className="min-w-0 flex-1">
        <div className={cn("truncate font-bold", showScore ? "text-[15px]" : "text-[14.5px]")}>{member.name}</div>
        {showScore && <div className="text-[12px] font-semibold text-muted-2">best {member.bestScore}</div>}
      </div>
      <div className={cn("font-extrabold text-accent", showScore ? "text-[14px]" : "text-[13.5px]")}>{member.xp}</div>
    </div>
  );
}
