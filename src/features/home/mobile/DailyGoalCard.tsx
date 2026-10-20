import { useProgress } from "@/app/progress-context";
import { Button } from "@/components/ui/Button";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { DonutRing } from "@/components/ui/DonutRing";
import { HelpHint } from "@/components/ui/HelpHint";
import { Panel } from "@/components/ui/Panel";
import { DAILY_GOAL } from "@/data/home";

/** Questions answered today vs. the daily goal, with quick ± adjust buttons. */
export function DailyGoalCard() {
  const { dailyGoal, addAnswered } = useProgress();
  const { answered, target } = dailyGoal;
  const left = target - answered;

  return (
    <Panel className="rounded-[20px] p-4.5">
      <div className="flex items-center gap-4">
        <DonutRing size={88} holeSize={66} value={(answered / target) * 100} color="#22C55E">
          <AnimatedNumber value={answered} className="block text-[19px] font-extrabold tracking-[-0.6px]" />
          <div className="text-[9px] font-bold tracking-[0.8px] text-muted-2">OF {target}</div>
        </DonutRing>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-[17px] font-extrabold tracking-[-0.4px]">
            Daily goal
            <HelpHint title="Daily goal">
              Questions answered today, from any practice mode. Hitting it keeps your streak alive; the ± buttons adjust the
              target for days you have more or less time.
            </HelpHint>
          </div>
          <div className="mt-0.75 mb-2.5 text-[13px] font-semibold text-muted">
            {left > 0 ? `${left} questions left today` : "Goal hit — nice work"}
          </div>
          <div className="flex gap-1.75">
            <Button
              aria-label={`Remove ${DAILY_GOAL.step} questions`}
              onPress={() => addAnswered(-DAILY_GOAL.step)}
              tone="outline"
              className="h-8.5 w-9.5 rounded-[10px] p-0 text-[16px] font-extrabold text-muted hover:bg-surface"
            >
              −
            </Button>
            <Button
              onPress={() => addAnswered(DAILY_GOAL.step)}
              className="h-8.5 flex-1 rounded-[10px] bg-tint-green text-[13px] font-extrabold text-on-green hover:bg-tint-green"
            >
              +{DAILY_GOAL.step} questions
            </Button>
          </div>
        </div>
      </div>
    </Panel>
  );
}
