import { useState } from "react";
import { useSearchParams } from "react-router";

import { paths } from "@/app/paths";
import { useProgress } from "@/app/progress-context";
import { BotIcon, ListIcon, PlayIcon } from "@/components/icons";
import { Button, ButtonLink } from "@/components/ui/Button";
import { QuestionNavigator, type QuestionStatus } from "@/components/ui/QuestionNavigator";
import { RUNNER_START, RUSH_SET_SIZE, RUSH_TIME_SECONDS, rushQuestions } from "@/data/rush";
import { useCountdown } from "@/hooks/useCountdown";
import { useKeyDown } from "@/hooks/useKeyDown";

import { BreakDialog } from "./BreakDialog";
import { RushQuestion } from "./RushQuestion";
import { type PanelTab, RushSidePanel } from "./RushSidePanel";
import { type RushMode, RushTopBar } from "./RushTopBar";

/** Section markers on the progress bar (end of easy / medium blocks). */
const PROGRESS_MARKERS = [48, 72];

export function RushSessionPage() {
  const [searchParams] = useSearchParams();
  const { addAnswered, awardXp } = useProgress();
  const [mode, setMode] = useState<RushMode>(searchParams.get("mode") === "focused" ? "focused" : "rush");

  // `step` is the 0-based position in the 15-question set; demo questions repeat to fill it.
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  /** Checked choice per step, so jumping back shows what you picked. */
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [results, setResults] = useState<Record<number, "correct" | "wrong">>({});
  const [freeAnswer, setFreeAnswer] = useState<string | null>(null);
  const [isFreeChecked, setIsFreeChecked] = useState(false);
  const [marked, setMarked] = useState<Record<number, boolean>>({});
  const [score, setScore] = useState({ correct: 0, streak: 0 });
  const [isHighlighting, setIsHighlighting] = useState(false);

  const [panel, setPanel] = useState<PanelTab | null>(null);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [showPeerPrompt, setShowPeerPrompt] = useState(true);
  const secondsLeft = useCountdown(RUSH_TIME_SECONDS, { paused: isOnBreak });

  const question = rushQuestions[step % rushQuestions.length];
  const questionNumber = step + 1;
  const isChecked = answers[step] !== undefined;

  const recordResult = (isCorrect: boolean) => {
    setResults((current) => ({
      ...current,
      [step]: isCorrect ? "correct" : "wrong",
    }));
    setScore((s) => ({
      correct: s.correct + (isCorrect ? 1 : 0),
      streak: isCorrect ? s.streak + 1 : 0,
    }));
    addAnswered(1);
    if (isCorrect) awardXp(RUNNER_START.xpPerCorrect, "Correct answer");
  };

  const checkChoice = () => {
    if (question.kind !== "dual" || selected === null) return;
    setAnswers((current) => ({ ...current, [step]: selected }));
    recordResult(selected === question.answerIndex);
  };

  const checkFreeResponse = () => {
    if (question.kind !== "math" || isFreeChecked) return;
    setIsFreeChecked(true);
    setPanel("explanation");
    if (results[step]) return;
    recordResult(Number(freeAnswer ?? question.studentAnswer) === question.answer);
  };

  const jumpTo = (index: number) => {
    setStep(index);
    setSelected(answers[index] ?? null);
    setFreeAnswer(null);
    setIsFreeChecked(false);
  };
  const goToNextQuestion = () => jumpTo((step + 1) % RUSH_SET_SIZE);

  const statusFor = (index: number): QuestionStatus =>
    index === step ? "current" : (results[index] ?? (marked[index] ? "marked" : "unanswered"));

  const handleChoiceAction = () => (isChecked ? goToNextQuestion() : checkChoice());

  useKeyDown((event) => {
    if (question.kind !== "dual" || isOnBreak) return;
    const index = Number(event.key) - 1;
    if (!isChecked && index >= 0 && index < question.choices.length) setSelected(index);
    if (event.key === "Enter" && selected !== null) handleChoiceAction();
  });

  return (
    <div className="relative flex h-screen flex-col bg-surface">
      <h1 className="sr-only">Question Rush session</h1>
      <RushTopBar
        streak={score.streak}
        correct={score.correct}
        secondsLeft={secondsLeft}
        mode={mode}
        onModeChange={setMode}
        onPause={() => setIsOnBreak(true)}
        onSkip={goToNextQuestion}
        isHighlighting={isHighlighting}
        onHighlightChange={setIsHighlighting}
      />

      <div className="relative h-1.25 flex-none bg-border" aria-hidden="true">
        <div
          className="h-full bg-success transition-[width] duration-300"
          style={{
            width: `${Math.round((questionNumber / RUSH_SET_SIZE) * 100)}%`,
          }}
        />
        {PROGRESS_MARKERS.map((left) => (
          <div key={left} className="absolute inset-y-0 w-0.5 bg-btn" style={{ left: `${left}%` }} />
        ))}
      </div>

      <div className="flex min-h-0 flex-1">
        <div className="min-w-0 flex-1 overflow-auto px-10 pt-7.5 pb-5">
          <RushQuestion
            question={question}
            questionNumber={questionNumber}
            isMarked={!!marked[step]}
            onMarkChange={(isMarked) => setMarked((current) => ({ ...current, [step]: isMarked }))}
            isHighlighting={isHighlighting}
            choice={{
              selected,
              isChecked,
              onSelect: setSelected,
              onAction: handleChoiceAction,
            }}
            freeResponse={{
              value: freeAnswer ?? (question.kind === "math" ? question.studentAnswer : ""),
              onChange: setFreeAnswer,
              isChecked: isFreeChecked,
              onCheck: checkFreeResponse,
              onExplain: () => setPanel("explanation"),
            }}
          />
        </div>

        {panel && (
          <RushSidePanel
            key={step}
            question={question}
            reportSubject={`Rush question ${questionNumber}`}
            tab={panel}
            onTabChange={setPanel}
            onClose={() => setPanel(null)}
          />
        )}
      </div>

      <footer className="flex flex-none flex-wrap items-center gap-3.5 border-t border-border px-5 py-3.5">
        <QuestionNavigator
          total={RUSH_SET_SIZE}
          current={step}
          statusFor={statusFor}
          onJump={jumpTo}
          legend={["correct", "wrong", "marked"]}
        />
        <div className="mx-auto flex flex-wrap gap-2.5">
          <Button tone="violet" onPress={() => setPanel("ai")} className="gap-2.25 px-5 py-3 text-[14.5px]">
            <BotIcon size={17} strokeWidth={2.2} />
            Ask Bridge AI
          </Button>
          <Button tone="outline" onPress={() => setPanel("explanation")} className="gap-2.25 px-5 py-3 text-[14.5px]">
            <ListIcon size={17} />
            Explanation
          </Button>
          <ButtonLink href={paths.course("rw")} tone="violet-soft" className="gap-2.25 px-5 py-3 text-[14.5px]">
            <PlayIcon size={17} />
            Masterclass
          </ButtonLink>
          <ButtonLink href={paths.reports} tone="danger" className="px-5.5 py-3 text-[14.5px]">
            End Session
          </ButtonLink>
        </div>
      </footer>

      {showPeerPrompt && !panel && <PeerAnswersPrompt onDismiss={() => setShowPeerPrompt(false)} />}

      <BreakDialog isOpen={isOnBreak} onResume={() => setIsOnBreak(false)} />
    </div>
  );
}

/** Floating card offering to show how other students answered. */
function PeerAnswersPrompt({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div
      role="dialog"
      aria-label="See how other students answered"
      className="absolute right-5 bottom-20.5 flex w-100 animate-slide-in gap-3.5 rounded-2xl border border-border bg-surface p-4.5 shadow-[0_18px_40px_rgba(15,36,48,.14)]"
    >
      <div className="min-w-0 flex-1">
        <div className="mb-1.5 text-[17px] leading-[1.3] font-extrabold tracking-[-0.3px]">See how other students answered?</div>
        <div className="mb-3.5 text-[14px] leading-[1.5] font-medium text-muted">
          Show what percent of students picked each option on their first try.
        </div>
        <div className="flex gap-2.25">
          <Button tone="outline" onPress={onDismiss} className="px-4 py-2.5 text-[13.5px] text-ink-2">
            No thanks
          </Button>
          <Button tone="ink" onPress={onDismiss} className="px-4.5 py-2.5 text-[13.5px] hover:bg-btn">
            Show
          </Button>
        </div>
      </div>
      <Button
        aria-label="Dismiss"
        onPress={onDismiss}
        className="size-6.5 flex-none rounded-lg p-0 text-[14px] font-normal text-muted-3"
      >
        ✕
      </Button>
    </div>
  );
}
