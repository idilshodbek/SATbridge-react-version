import { cn } from "@heroui/react";
import type { ReactNode } from "react";

import { paths } from "@/app/paths";
import { ButtonLink } from "@/components/ui/Button";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { DonutRing } from "@/components/ui/DonutRing";
import { scoreGoal } from "@/data/user";

const MAX_SAT_SCORE = 1600;

/** Dark navy card: current score ring, target, countdown and target university. */
export function ScoreGoalCard() {
  const { current, target, readingWriting, math, monthlyGain, university, examCountdown } = scoreGoal;

  return (
    <div className="relative overflow-hidden rounded-[18px] bg-navy p-6">
      <div
        aria-hidden="true"
        className="absolute -top-10 -right-10 size-47.5 rounded-full bg-[radial-gradient(circle,rgba(0,154,218,.55),transparent_68%)]"
      />
      <div className="relative">
        <DonutRing
          size={150}
          holeSize={112}
          value={(current / MAX_SAT_SCORE) * 100}
          color="#009ADA"
          trackColor="rgba(255,255,255,.14)"
          holeClassName="bg-navy"
          className="mb-5"
        >
          <AnimatedNumber value={current} className="block text-[32px] font-extrabold tracking-[-1px] text-white" />
          <div className="text-[10.5px] font-bold tracking-[1.2px] text-[#7FA0B1]">CURRENT</div>
        </DonutRing>

        <div className="text-[28px] font-extrabold tracking-[-0.9px] text-white">Target {target}</div>
        <div className="mt-1 mb-4 text-[14.5px] font-semibold text-[#93B4C4]">
          {target - current} points to go · exam in {examCountdown.days}d {examCountdown.hours}h {examCountdown.minutes}m
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          <ScorePill>R&amp;W {readingWriting}</ScorePill>
          <ScorePill>Math {math}</ScorePill>
          <ScorePill className="bg-[rgba(34,197,94,.22)] text-[#7BE3A6]">+{monthlyGain} / mo</ScorePill>
        </div>

        <div className="flex items-center gap-3.25 rounded-[14px] border border-white/12 bg-white/7 p-3.5">
          <div className="grid size-11 flex-none place-items-center rounded-[11px] bg-[#C0202F] text-[19px] font-extrabold text-white">
            {university.initial}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10.5px] font-bold tracking-[1.1px] text-[#93B4C4]">TARGET UNIVERSITY</div>
            <div className="text-[17px] leading-[1.25] font-extrabold text-white">{university.name}</div>
          </div>
          <div className="text-right text-[12px] leading-[1.4] font-bold text-[#93B4C4]">
            Median
            <br />
            SAT
            <br />
            <span className="text-[16px] font-extrabold text-white">{university.medianSat}</span>
          </div>
        </div>

        <ButtonLink
          href={`${paths.settings}#goals`}
          className="mt-3.5 w-full rounded-xl border border-white/20 p-2.75 text-[13px] text-[#93B4C4] hover:bg-white/8 hover:text-white"
        >
          Change target &amp; test date
        </ButtonLink>
      </div>
    </div>
  );
}

function ScorePill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("rounded-[10px] bg-white/10 px-3.5 py-2 text-[13.5px] font-bold text-white", className)}>{children}</span>
  );
}
