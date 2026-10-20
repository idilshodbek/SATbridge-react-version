import { cn } from "@heroui/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { paths } from "@/app/paths";
import { useProgress } from "@/app/progress-context";
import { FlameSolidIcon } from "@/components/icons";
import { Button, ButtonLink } from "@/components/ui/Button";
import { ProgressTrack } from "@/components/ui/ProgressTrack";
import { RUNNER_START, RUSH_SET_SIZE, runnerQuestions, type RunnerQuestion } from "@/data/rush";
import { EXAM_MODULE_SIZE, examQuestions } from "@/data/tests";
import { AnswerChoices } from "@/features/practice/AnswerChoices";

/** Question Rush on phones (/rush/session). */
export function RushRunnerMobile() {
  return <QuestionRunner questions={runnerQuestions} setSize={RUSH_SET_SIZE} exitTo={paths.rush} />;
}

/** Full-length test module on phones (/tests/exam). */
export function ExamRunnerMobile() {
  return <QuestionRunner questions={examQuestions} setSize={EXAM_MODULE_SIZE} exitTo={paths.tests} />;
}

type QuestionRunnerProps = {
  questions: RunnerQuestion[];
  /** Questions in the set (the demo cycles through `questions`). */
  setSize: number;
  /** Where ✕ goes when there is no in-app history to return to. */
  exitTo: string;
};

/** Full-screen, one-question-at-a-time player: pick → Check → feedback → Continue. */
function QuestionRunner({ questions, setSize, exitTo }: QuestionRunnerProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { addAnswered, awardXp } = useProgress();

  const [position, setPosition] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [xp, setXp] = useState(RUNNER_START.xp);
  const [streak, setStreak] = useState(RUNNER_START.streak);

  const question = questions[position % questions.length];
  const questionNumber = (position % setSize) + 1;
  const isCorrect = selected === question.answerIndex;

  const close = () => (location.key === "default" ? navigate(exitTo) : navigate(-1));

  const checkOrContinue = () => {
    if (isChecked) {
      setPosition((p) => p + 1);
      setSelected(null);
      setIsChecked(false);
      return;
    }
    if (selected === null) return;
    setIsChecked(true);
    setStreak((value) => (isCorrect ? value + 1 : 0));
    addAnswered(1);
    if (isCorrect) {
      setXp((value) => value + RUNNER_START.xpPerCorrect);
      awardXp(RUNNER_START.xpPerCorrect, `Correct · ${question.skill}`);
    }
  };

  return (
    <div className="mx-auto flex h-full max-w-110 animate-fade flex-col">
      <div className="flex-none border-b border-border px-4 pt-4 pb-3">
        <div className="mb-2.5 flex items-center gap-2.75">
          <Button
            aria-label="Close"
            tone="outline"
            onPress={close}
            className="size-8 flex-none rounded-[10px] p-0 text-[14px] font-normal text-muted hover:bg-surface"
          >
            ✕
          </Button>
          <div className="flex-1">
            <ProgressTrack
              aria-label="Set progress"
              value={(questionNumber / setSize) * 100}
              color="#22C55E"
              className="h-2.25 rounded-md bg-surface-3"
            />
          </div>
          <div className="flex items-center gap-1.25 text-[13.5px] font-extrabold text-orange">
            <FlameSolidIcon size={13} />
            {streak}
          </div>
        </div>
        <div className="flex items-center justify-between gap-2.5">
          <span className="text-[12px] font-semibold text-muted-2">
            Question {questionNumber} of {setSize} · {question.skill}
          </span>
          <span className="text-[12.5px] font-extrabold text-accent">{xp} XP</span>
        </div>
      </div>

      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto p-4">
        <p className="mb-4.5 font-serif text-[16px] leading-[1.65] text-ink">{question.passage}</p>
        <div className="mb-3.5 text-[15.5px] leading-[1.45] font-bold">{question.prompt}</div>

        <AnswerChoices question={question} selected={selected} onSelect={setSelected} isChecked={isChecked} />

        {isChecked && (
          <div
            className={cn(
              "mt-4 animate-slide-in rounded-2xl border px-4 py-3.75",
              isCorrect ? "border-tint-green-bd bg-tint-green" : "border-tint-red-bd bg-tint-red",
            )}
          >
            <div className={cn("mb-1.25 text-[15.5px] font-extrabold", isCorrect ? "text-on-green" : "text-on-red")}>
              {isCorrect ? `Correct · +${RUNNER_START.xpPerCorrect} XP` : "Not quite"}
            </div>
            <div className="text-[13.5px] leading-[1.6] font-medium text-ink-2">{question.why}</div>
          </div>
        )}
      </div>

      <div className="flex flex-none gap-2.25 border-t border-border px-4 pt-3.25 pb-6.5">
        <ButtonLink
          href={paths.tutor}
          className="rounded-2xl border border-tint-violet-bd bg-tint-violet p-4 text-[13px] font-extrabold text-on-violet hover:bg-tint-violet"
        >
          Ask AI
        </ButtonLink>
        <Button
          onPress={checkOrContinue}
          isDisabled={selected === null}
          className={cn(
            "flex-1 rounded-2xl p-4 text-[15.5px] font-extrabold text-white data-[disabled=true]:opacity-100",
            selected === null && "bg-border-3 hover:bg-border-3",
            selected !== null && isChecked && "bg-success hover:bg-success",
            selected !== null && !isChecked && "bg-accent hover:bg-accent",
          )}
        >
          {isChecked ? "Continue" : selected === null ? "Pick an answer" : "Check"}
        </Button>
      </div>
    </div>
  );
}
