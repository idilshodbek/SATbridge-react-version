import { paths } from "@/app/paths";
import { ButtonLink } from "@/components/ui/Button";
import { Icon3D } from "@/components/ui/Icon3D";
import { Panel } from "@/components/ui/Panel";
import { dailyQuestion } from "@/data/practice";

/** Teaser for today's daily question on the Today page. */
export function DailyQuestionCard() {
  return (
    <Panel className="flex items-center gap-4 rounded-[18px] p-5">
      <Icon3D icon="daily-question" size={48} />
      <div className="min-w-0 flex-1">
        <div className="text-[17px] font-extrabold tracking-[-0.3px]">Daily question #{dailyQuestion.number}</div>
        <div className="mt-0.5 text-[13px] font-semibold text-muted-2">
          {dailyQuestion.subject} · {dailyQuestion.difficulty} · {dailyQuestion.percentCorrect}% got it right
        </div>
      </div>
      <ButtonLink href={paths.dailyQuestion} tone="brand" className="px-4 py-2.5 text-[13.5px]">
        +{dailyQuestion.xp} XP
      </ButtonLink>
    </Panel>
  );
}
