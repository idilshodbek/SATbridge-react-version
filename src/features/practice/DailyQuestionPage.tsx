import { cn } from "@heroui/react";
import { type ReactNode, useState } from "react";

import { paths } from "@/app/paths";
import { useProgress } from "@/app/progress-context";
import { BoltIcon, ChatBubbleIcon } from "@/components/icons";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon3D } from "@/components/ui/Icon3D";
import { PageTitle } from "@/components/ui/PageTitle";
import { Panel } from "@/components/ui/Panel";
import {
  dailyHistory,
  dailyQuestion,
  type DailyResult,
  dailyStats,
  NEXT_DAILY_QUESTION_SECONDS,
  yesterdaysQuestion,
} from "@/data/practice";
import { useCountdown } from "@/hooks/useCountdown";
import { formatHms } from "@/lib/format";

import { AnswerChoices } from "./AnswerChoices";

const resultStyles: Record<DailyResult, { dot: string; mark: string }> = {
  correct: { dot: "bg-success text-white", mark: "✓" },
  wrong: { dot: "bg-danger text-white", mark: "✕" },
  missed: { dot: "bg-surface-3 text-muted-2", mark: "–" },
  today: { dot: "border-2 border-dashed border-accent text-accent", mark: "?" },
};

/** One free question a day: answer it to keep the daily streak and earn XP. */
export function DailyQuestionPage() {
  const { addAnswered, awardXp } = useProgress();
  const [selected, setSelected] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const { question } = dailyQuestion;
  const isCorrect = selected === question.answerIndex;

  const check = () => {
    if (selected === null) return;
    setIsChecked(true);
    addAnswered(1);
    if (isCorrect) awardXp(dailyQuestion.xp, `Daily question #${dailyQuestion.number}`);
  };

  // Today's dot fills in once the question is answered.
  const history = dailyHistory.map((day) =>
    day.result === "today" && isChecked
      ? {
          ...day,
          result: isCorrect ? ("correct" as const) : ("wrong" as const),
        }
      : day,
  );
  const streak = isChecked && isCorrect ? dailyStats.streak + 1 : dailyStats.streak;

  return (
    <div className="max-w-[1180px] md:px-9 md:pt-7.5 md:pb-17.5">
      <div className="mb-5.5 hidden md:block">
        <PageTitle icon={<Icon3D icon="daily-question" size={38} />}>Daily question</PageTitle>
        <div className="mt-1 text-[15px] font-semibold text-muted">
          #{dailyQuestion.number} · {dailyQuestion.dateLabel} · one question a day keeps the streak alive
        </div>
      </div>

      <div className="flex flex-wrap items-start gap-5">
        <Panel className="min-w-[min(100%,420px)] flex-[1_1_560px] rounded-[20px] p-5 md:p-6.5">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Chip className="bg-tint-blue text-on-blue">{dailyQuestion.subject}</Chip>
            <Chip className="bg-tint-red text-on-red">{dailyQuestion.difficulty}</Chip>
            <Chip className="bg-tint-amber text-on-amber">+{dailyQuestion.xp} XP</Chip>
            <span className="text-[12.5px] font-semibold text-muted-2">
              {dailyQuestion.percentCorrect}% of {dailyQuestion.answeredBy} students got it right
            </span>
          </div>

          <p className="mb-4.5 font-serif text-[16.5px] leading-[1.65] text-ink md:text-[18px]">{question.passage}</p>
          <div className="mb-4 text-[16px] leading-[1.45] font-bold">{question.prompt}</div>

          <AnswerChoices question={question} selected={selected} onSelect={setSelected} isChecked={isChecked} size="lg" />

          {isChecked ? (
            <div
              className={cn(
                "mt-5 animate-slide-in rounded-2xl border p-4.5",
                isCorrect ? "border-tint-green-bd bg-tint-green" : "border-tint-red-bd bg-tint-red",
              )}
            >
              <div className="mb-2 flex items-center gap-2.5">
                <Icon3D icon={isCorrect ? "success" : "idea"} size={30} />
                <div className={cn("text-[17px] font-extrabold", isCorrect ? "text-on-green" : "text-on-red")}>
                  {isCorrect ? `Correct · +${dailyQuestion.xp} XP` : "Not quite. Here's the idea"}
                </div>
              </div>
              <div className="text-[14.5px] leading-[1.6] font-medium text-ink-2">{question.why}</div>
              <div className="mt-4 flex flex-wrap gap-2.5">
                <ButtonLink href={paths.rushSession} tone="brand" className="gap-2 rounded-xl px-4.5 py-2.75 text-[13.5px]">
                  <BoltIcon size={16} />
                  Practice similar questions
                </ButtonLink>
                <ButtonLink href={paths.chats} tone="outline" className="gap-2 rounded-xl px-4.5 py-2.75 text-[13.5px]">
                  <ChatBubbleIcon size={16} />
                  Discuss with friends
                </ButtonLink>
              </div>
            </div>
          ) : (
            <Button
              tone="brand"
              isDisabled={selected === null}
              onPress={check}
              className="mt-5 w-full rounded-2xl p-4 text-[15.5px] font-extrabold data-[disabled=true]:bg-border-3 data-[disabled=true]:opacity-100"
            >
              {selected === null ? "Pick an answer" : "Check answer"}
            </Button>
          )}
        </Panel>

        <div className="flex w-85 max-w-full flex-[1_1_300px] flex-col gap-4 md:max-w-95">
          <Panel className="rounded-[18px] p-5.5">
            <div className="mb-4 flex items-center gap-3">
              <Icon3D icon="streak" size={44} />
              <div>
                <div className="text-[24px] font-extrabold tracking-[-0.6px]">{streak}-day streak</div>
                <div className="text-[13px] font-semibold text-muted-2">Daily questions in a row</div>
              </div>
            </div>
            <div className="flex justify-between">
              {history.map((day) => (
                <div key={day.weekday} className="flex flex-col items-center gap-1.5">
                  <span
                    className={cn(
                      "grid size-8 place-items-center rounded-full text-[13px] font-extrabold",
                      resultStyles[day.result].dot,
                    )}
                  >
                    {resultStyles[day.result].mark}
                  </span>
                  <span className="text-[11px] font-bold text-muted-2">{day.weekday}</span>
                </div>
              ))}
            </div>
          </Panel>

          <NextQuestionCard />

          <Panel className="grid grid-cols-2 gap-3 rounded-[18px] p-5.5">
            <div>
              <div className="text-[24px] font-extrabold tracking-[-0.6px]">{dailyStats.answered + (isChecked ? 1 : 0)}</div>
              <div className="text-[12.5px] font-semibold text-muted-2">answered all time</div>
            </div>
            <div>
              <div className="text-[24px] font-extrabold tracking-[-0.6px] text-success">{dailyStats.accuracy}%</div>
              <div className="text-[12.5px] font-semibold text-muted-2">accuracy</div>
            </div>
          </Panel>

          <Panel className="rounded-[18px] p-5.5">
            <Eyebrow className="mb-2.5">YESTERDAY</Eyebrow>
            <div className="mb-2 text-[14px] leading-[1.5] font-semibold text-ink-2">{yesterdaysQuestion.prompt}</div>
            <div className="text-[12.5px] font-bold text-muted-2">
              {yesterdaysQuestion.skill} · you answered {yesterdaysQuestion.yourAnswer}{" "}
              <span className={yesterdaysQuestion.isCorrect ? "text-success-ink" : "text-danger-ink"}>
                {yesterdaysQuestion.isCorrect ? "✓ correct" : "✕ wrong"}
              </span>{" "}
              · {yesterdaysQuestion.percentCorrect}% got it
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function NextQuestionCard() {
  const secondsLeft = useCountdown(NEXT_DAILY_QUESTION_SECONDS);

  return (
    <div className="flex items-center gap-3.5 rounded-[18px] border border-tint-blue-bd bg-tint-blue p-5">
      <Icon3D icon="timer" size={38} />
      <div>
        <div className="text-[13px] font-bold text-on-blue">Next question in</div>
        <div className="text-[22px] font-extrabold tracking-[-0.5px] text-on-blue tabular-nums">{formatHms(secondsLeft)}</div>
      </div>
    </div>
  );
}

function Chip({ children, className }: { children: ReactNode; className: string }) {
  return <span className={cn("rounded-full px-2.75 py-1 text-[12px] font-extrabold", className)}>{children}</span>;
}
