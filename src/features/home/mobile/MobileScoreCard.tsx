import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { DonutRing } from "@/components/ui/DonutRing";
import { scoreGoal } from "@/data/user";

const MAX_SAT_SCORE = 1600;

/** Dark score card: current score ring, target, countdown and target university. */
export function MobileScoreCard() {
  const { current, target, readingWriting, monthlyGain, university, examCountdown } = scoreGoal;

  return (
    <div className="relative overflow-hidden rounded-[22px] bg-ink-surface p-5">
      <div
        aria-hidden="true"
        className="absolute -top-8.5 -right-8.5 size-40 rounded-full bg-[radial-gradient(circle,rgba(0,154,218,.5),transparent_68%)]"
      />
      <div className="relative flex items-center gap-4">
        <DonutRing
          size={104}
          holeSize={78}
          value={(current / MAX_SAT_SCORE) * 100}
          color="#009ADA"
          trackColor="rgba(255,255,255,.14)"
          holeClassName="bg-ink-surface"
        >
          <AnimatedNumber value={current} className="block text-[23px] font-extrabold tracking-[-0.8px] text-white" />
          <div className="text-[9px] font-bold tracking-[1.1px] text-[#7FA0B1]">CURRENT</div>
        </DonutRing>
        <div className="min-w-0 flex-1">
          <div className="text-[20px] font-extrabold tracking-[-0.6px] text-white">Target {target}</div>
          <div className="mt-0.75 mb-2.25 text-[12.5px] font-semibold text-[#93B4C4]">
            {target - current} points to go · {examCountdown.days}d {examCountdown.hours}h left
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="rounded-[9px] bg-white/10 px-2.5 py-1.5 text-[12px] font-bold text-white">
              R&amp;W {readingWriting}
            </span>
            <span className="rounded-[9px] bg-[rgba(34,197,94,.22)] px-2.5 py-1.5 text-[12px] font-bold text-[#7BE3A6]">
              +{monthlyGain}/mo
            </span>
          </div>
        </div>
      </div>

      <div className="relative mt-3.75 flex items-center gap-2.75 rounded-[14px] border border-white/12 bg-white/7 p-3">
        <div className="grid size-8.5 flex-none place-items-center rounded-[10px] bg-[#C0202F] text-[15px] font-extrabold text-white">
          {university.initial}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[9.5px] font-bold tracking-[1px] text-[#93B4C4]">TARGET UNIVERSITY</div>
          <div className="text-[14.5px] font-extrabold text-white">{university.name}</div>
        </div>
        <div className="text-[14px] font-extrabold text-white">{university.medianSat}</div>
      </div>
    </div>
  );
}
