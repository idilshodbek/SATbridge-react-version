import { cn } from "@heroui/react";

import { MobileEyebrow } from "@/components/mobile/MobileEyebrow";
import { FlameIcon, TrendIcon } from "@/components/icons";
import { InitialsAvatar } from "@/components/ui/InitialsAvatar";
import { Panel } from "@/components/ui/Panel";
import { ProgressTrack } from "@/components/ui/ProgressTrack";
import { ACTIVITY_COLORS, myProfile, recentActivity } from "@/data/community";
import { useProgress } from "@/app/progress-context";
import { currentUser, formatXp } from "@/data/user";

/** Mastery bar colour: green when strong, blue when solid, yellow when it needs work. */
const masteryColor = (percent: number) => (percent >= 80 ? "#22C55E" : percent >= 60 ? "#009ADA" : "#FFC93C");

/** The signed-in student's public card. One narrow column on every screen size. */
export function MyProfilePage() {
  const { xp } = useProgress();

  return (
    <div className="mx-auto flex max-w-140 animate-fade flex-col gap-3.5 md:px-9 md:pt-10 md:pb-20">
      <div className="flex flex-col items-center px-0 pt-1.5 pb-1 text-center">
        <InitialsAvatar
          initials={currentUser.initials}
          background="linear-gradient(140deg,#7BE3F5,#009ADA 55%,#E5308F)"
          className="mb-3 size-24"
          fallbackClassName="text-[28px]"
        />
        <h2 className="text-[23px] font-extrabold tracking-[-0.7px]">{currentUser.shortName}</h2>
        <div className="mt-0.75 text-[13px] font-semibold text-muted">
          {formatXp(xp)} · {currentUser.questionsAnswered} questions · joined {currentUser.joined}
        </div>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          <span className="flex items-center gap-1.5 rounded-lg bg-[#FFF06A] px-3 py-1.5 text-[12px] font-extrabold text-[#3D3800]">
            <FlameIcon size={15} />
            {currentUser.studyStreak} day streak
          </span>
          <span className="flex items-center gap-1.5 rounded-lg bg-[#7BE3A6] px-3 py-1.5 text-[12px] font-extrabold text-[#04321B]">
            <TrendIcon size={15} />
            {myProfile.scoreLift}
          </span>
        </div>
      </div>

      <Panel className="rounded-[18px] p-4.5">
        <div className="mb-1 text-[12.5px] font-semibold text-muted">{myProfile.latestTest.label}</div>
        <div className="flex items-baseline gap-2.5">
          <span className="text-[36px] font-extrabold tracking-[-1.3px]">{myProfile.latestTest.score}</span>
          <span className="rounded-[7px] bg-tint-green px-2.25 py-1 text-[11.5px] font-extrabold text-on-green">
            {myProfile.latestTest.delta}
          </span>
        </div>
        <div className="mt-3.5 flex gap-5">
          {myProfile.latestSplit.map((item) => (
            <div key={item.label}>
              <div className="text-[12px] font-semibold text-muted">{item.label}</div>
              <div className={cn("text-[18px] font-extrabold tracking-[-0.5px]", item.highlight && "text-success")}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="rounded-[18px] p-4.5">
        <MobileEyebrow className="mb-3.25">ACTIVITY</MobileEyebrow>
        <div className="grid grid-cols-14 gap-1" aria-label="Study activity, last 8 weeks">
          {recentActivity.map((level, day) => (
            <div key={day} className="aspect-square rounded-[3px]" style={{ background: ACTIVITY_COLORS[level] }} />
          ))}
        </div>
      </Panel>

      <Panel className="rounded-[18px] p-4.5">
        <MobileEyebrow className="mb-3.75">MASTERY BY DOMAIN</MobileEyebrow>
        <div className="flex flex-col gap-3.75">
          {myProfile.domains.map((domain) => {
            const color = masteryColor(domain.percent);
            return (
              <div key={domain.name}>
                <div className="mb-1.5 flex items-baseline justify-between gap-2">
                  <span className="text-[14px] font-bold">{domain.name}</span>
                  <span className="text-[13px] font-extrabold" style={{ color }}>
                    {domain.percent}%
                  </span>
                </div>
                <ProgressTrack
                  aria-label={`${domain.name} mastery`}
                  value={domain.percent}
                  color={color}
                  className="h-2 rounded-[5px] bg-surface-3"
                />
              </div>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}
