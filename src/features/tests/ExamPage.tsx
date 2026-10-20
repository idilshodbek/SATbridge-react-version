import { cn, Dropdown, Radio, RadioGroup, toast, ToggleButton } from "@heroui/react";
import { type ReactNode, useState } from "react";

import { featureFlags } from "@/app/config";
import { paths } from "@/app/paths";
import { ReportProblemDialog } from "@/components/dialogs/ReportProblemDialog";
import {
  BookmarkIcon,
  CalculatorIcon,
  ChevronDownIcon,
  DocumentIcon,
  DotsVerticalIcon,
  FlagIcon,
  HighlighterIcon,
} from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { KeyboardTip } from "@/components/ui/KeyboardTip";
import { HighlightablePassage } from "@/components/ui/HighlightablePassage";
import { QuestionNavigator, type QuestionStatus } from "@/components/ui/QuestionNavigator";
import { EXAM_MODULE_SIZE, EXAM_TIME_SECONDS, examDirections, examQuestions } from "@/data/tests";
import { currentUser } from "@/data/user";
import { useCountdown } from "@/hooks/useCountdown";
import { useKeyDown } from "@/hooks/useKeyDown";
import { choiceLetter, formatClock } from "@/lib/format";

/** Bluebook-style exam player: passage on the left, question and choices on the right. */
export function ExamPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [crossedOut, setCrossedOut] = useState<Record<number, number[]>>({});
  const [marked, setMarked] = useState<Record<number, boolean>>({});
  const [isCrossOutMode, setIsCrossOutMode] = useState(false);
  const [showDirections, setShowDirections] = useState(false);
  const [showTimer, setShowTimer] = useState(true);
  const [isHighlighting, setIsHighlighting] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const secondsLeft = useCountdown(EXAM_TIME_SECONDS);

  // `step` runs 0–26 through the module; the demo questions repeat to fill it.
  const question = examQuestions[step % examQuestions.length];
  const questionNumber = step + 1;
  const selected = answers[step];
  const crossed = crossedOut[step] ?? [];

  const choose = (index: number) => setAnswers((current) => ({ ...current, [step]: index }));
  const toggleCrossOut = (index: number) =>
    setCrossedOut((current) => {
      const list = current[step] ?? [];
      return {
        ...current,
        [step]: list.includes(index) ? list.filter((i) => i !== index) : [...list, index],
      };
    });
  const goNext = () => setStep((s) => Math.min(EXAM_MODULE_SIZE - 1, s + 1));
  const goPrevious = () => setStep((s) => Math.max(0, s - 1));
  const statusFor = (index: number): QuestionStatus =>
    index === step ? "current" : marked[index] ? "marked" : answers[index] !== undefined ? "answered" : "unanswered";

  const runTool = (key: React.Key) => {
    if (key === "desmos") window.open(paths.desmos, "_blank", "noopener");
    if (key === "reference") toast.info("The reference sheet is only on Math modules");
    if (key === "report") setIsReporting(true);
  };

  useKeyDown((event) => {
    const index = Number(event.key) - 1;
    if (index >= 0 && index < question.choices.length) choose(index);
    if (event.key === "Enter") goNext();
  });

  return (
    <div className="flex h-screen flex-col bg-surface">
      <h1 className="sr-only">Predicted test — Reading and Writing, Module 1</h1>
      <header className="flex flex-none items-start justify-between gap-4 border-b border-border px-6 pt-3 pb-2.5">
        <Button
          aria-expanded={showDirections}
          onPress={() => setShowDirections((open) => !open)}
          className="gap-2 rounded-none p-0 pt-1.5 text-[15.5px] font-semibold text-ink-2 hover:text-ink"
        >
          Directions
          <ChevronDownIcon size={15} />
        </Button>

        <div className="text-center">
          {showTimer && (
            <div className="text-[24px] font-extrabold tracking-[-0.4px] tabular-nums" role="timer">
              {formatClock(secondsLeft)}
            </div>
          )}
          <Button
            tone="outline"
            onPress={() => setShowTimer((shown) => !shown)}
            className="mt-1 px-4 py-1.5 text-[13px] text-ink-2"
          >
            {showTimer ? "Hide" : "Show"}
          </Button>
        </div>

        <div className="flex gap-5 pt-0.5">
          <ToolButton
            icon={<HighlighterIcon size={20} />}
            label="Highlight"
            isSelected={isHighlighting}
            onChange={setIsHighlighting}
          />
          <Dropdown>
            <ToolButton icon={<DotsVerticalIcon size={20} />} label="More" />
            <Dropdown.Popover
              placement="bottom end"
              className="w-60 rounded-2xl border border-border bg-surface p-2 shadow-[0_18px_40px_rgba(15,36,48,.16)]"
            >
              <Dropdown.Menu aria-label="More tools" onAction={runTool} className="gap-0.5 p-0">
                <Dropdown.Item id="desmos" textValue="Open Desmos" className={toolItemClass}>
                  <CalculatorIcon size={16} />
                  Open Desmos calculator
                </Dropdown.Item>
                <Dropdown.Item id="reference" textValue="Reference sheet" className={toolItemClass}>
                  <DocumentIcon size={16} />
                  Reference sheet
                </Dropdown.Item>
                <Dropdown.Item id="report" textValue="Report a problem" className={toolItemClass}>
                  <FlagIcon size={16} />
                  Report a problem
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </div>
      </header>

      {showDirections && (
        <div className="flex-none animate-fade border-b border-tint-blue-bd bg-tint-blue px-6 py-4 text-[15px] leading-[1.6] font-medium text-ink-2">
          {examDirections}
        </div>
      )}

      <div className="relative flex min-h-0 flex-1">
        <div className="min-w-0 flex-1 overflow-auto px-10 py-7">
          {isHighlighting && (
            <div className="mb-3 inline-flex animate-fade items-center gap-2 rounded-lg bg-tint-amber px-3 py-1.5 text-[12.5px] font-bold text-on-amber">
              <HighlighterIcon size={14} />
              Select text to highlight it · click a highlight to remove it
            </div>
          )}
          <HighlightablePassage
            key={step}
            text={question.passage}
            isActive={isHighlighting}
            className="max-w-160 font-serif text-[19px] leading-[1.68] text-ink"
          />
        </div>

        <div className="relative w-0.5 flex-none bg-border" aria-hidden="true">
          <div className="absolute top-1/2 -left-1.25 grid h-6.5 w-3 place-items-center rounded bg-border text-[10px] text-muted-2">
            ⋮⋮
          </div>
        </div>

        <div className="min-w-0 flex-1 overflow-auto px-10 pt-5.5 pb-7.5">
          <div className="max-w-180">
            <div className="mb-5 flex items-center gap-3.5 rounded-[10px] bg-surface-2 px-3 py-2.5">
              <div className="grid size-8 flex-none place-items-center rounded-lg bg-btn text-[15px] font-extrabold text-white">
                {questionNumber}
              </div>
              <ToggleButton
                isSelected={!!marked[step]}
                onChange={(isMarked) => setMarked((current) => ({ ...current, [step]: isMarked }))}
                className={cn(
                  "h-auto gap-2 rounded-none bg-transparent p-0 text-[14.5px] font-semibold hover:bg-transparent",
                  "text-ink-2 data-[selected=true]:bg-transparent data-[selected=true]:text-on-amber",
                )}
              >
                <BookmarkIcon size={15} strokeWidth={2.2} fill={marked[step] ? "#FBBF24" : "none"} />
                Mark for Review
              </ToggleButton>
              <div className="ml-auto flex items-center gap-3">
                <Button
                  onPress={() => setIsReporting(true)}
                  className="gap-1.75 rounded-none p-0 text-[13.5px] font-semibold text-muted hover:text-ink"
                >
                  <FlagIcon size={14} />
                  Report
                </Button>
                <ToggleButton
                  aria-label="Cross out answer choices"
                  isSelected={isCrossOutMode}
                  onChange={setIsCrossOutMode}
                  className={cn(
                    "size-7.5 rounded-full border-[1.6px] border-border-3 bg-surface p-0 text-[13px] font-bold text-muted line-through hover:bg-surface",
                    "data-[selected=true]:border-ink data-[selected=true]:bg-ink data-[selected=true]:text-surface data-[selected=true]:hover:bg-ink",
                  )}
                >
                  S
                </ToggleButton>
              </div>
            </div>

            <div className="mb-5 font-serif text-[19px] leading-[1.55] text-ink">{question.prompt}</div>

            <RadioGroup
              aria-label="Answer choices"
              value={selected === undefined ? null : String(selected)}
              onChange={(value) => choose(Number(value))}
              className="gap-3 **:data-[slot=radio]:mt-0"
            >
              {question.choices.map((choice, index) => {
                const isCrossed = crossed.includes(index);
                return (
                  <div key={choice} className="flex items-center gap-3.5">
                    <Radio value={String(index)} className={cn("min-w-0 flex-1", isCrossed && "opacity-45")}>
                      <Radio.Content
                        className={cn(
                          "group flex w-full items-center gap-3.75 rounded-[11px] border-[1.8px] border-border-2 bg-surface px-4.5 py-3.5",
                          "hover:border-border-3 data-[selected=true]:border-accent data-[selected=true]:hover:border-accent",
                        )}
                      >
                        <span
                          className={cn(
                            "grid size-7.25 flex-none place-items-center rounded-full border-[1.6px] border-border-3 bg-surface text-[14.5px] font-bold text-ink",
                            "group-data-[selected=true]:border-accent group-data-[selected=true]:bg-accent group-data-[selected=true]:text-white",
                          )}
                        >
                          {choiceLetter(index)}
                        </span>
                        <span className={cn("flex-1 font-serif text-[18px] font-normal text-ink", isCrossed && "line-through")}>
                          {choice}
                        </span>
                      </Radio.Content>
                    </Radio>
                    {isCrossOutMode && (
                      <Button
                        aria-label={`Cross out ${choiceLetter(index)}`}
                        onPress={() => toggleCrossOut(index)}
                        className="size-7.5 flex-none rounded-full border-[1.6px] border-ink bg-surface p-0 text-[13px] font-bold text-ink line-through hover:bg-surface"
                      >
                        {choiceLetter(index)}
                      </Button>
                    )}
                  </div>
                );
              })}
            </RadioGroup>

            {featureFlags.showKeyboardTips && <KeyboardTip action="to go to the next question" />}
          </div>
        </div>
      </div>

      <footer className="flex flex-none items-center justify-between gap-3.5 border-t border-border px-6 py-3.5">
        <div className="text-[14.5px] font-bold text-ink-2">{currentUser.shortName}</div>
        <QuestionNavigator
          total={EXAM_MODULE_SIZE}
          current={step}
          statusFor={statusFor}
          onJump={setStep}
          legend={["answered", "marked"]}
          className="rounded-[10px] border-ink bg-ink text-white hover:bg-ink hover:text-white"
        />
        <div className="flex gap-2.5">
          <Button onPress={goPrevious} isDisabled={step === 0} className="px-5 py-2.75 text-[14.5px] text-muted-3">
            Previous
          </Button>
          <Button
            tone="outline"
            onPress={goNext}
            isDisabled={step === EXAM_MODULE_SIZE - 1}
            className="px-5.5 py-2.75 text-[14.5px]"
          >
            Next
          </Button>
        </div>
      </footer>

      <ReportProblemDialog isOpen={isReporting} onOpenChange={setIsReporting} subject={`Question ${questionNumber}`} />
    </div>
  );
}

const toolItemClass = "min-h-0 gap-2.5 rounded-[10px] px-2.5 py-2 text-[13.5px] font-semibold text-ink-2 hover:bg-hover";

type ToolButtonProps = {
  icon: ReactNode;
  label: string;
  /** With `isSelected` the button becomes a toggle and shows its on state. */
  isSelected?: boolean;
  onChange?: (isSelected: boolean) => void;
};

const toolButtonClass =
  "h-auto flex-col gap-0.75 rounded-lg bg-transparent px-2 py-1 text-[12.5px] font-semibold text-ink-2 hover:bg-hover";

function ToolButton({ icon, label, isSelected, onChange }: ToolButtonProps) {
  if (isSelected === undefined) {
    return (
      <Button className={toolButtonClass}>
        {icon}
        {label}
      </Button>
    );
  }
  return (
    <ToggleButton
      isSelected={isSelected}
      onChange={onChange}
      className={cn(
        toolButtonClass,
        "data-[selected=true]:bg-tint-amber data-[selected=true]:text-on-amber data-[selected=true]:hover:bg-tint-amber",
      )}
    >
      {icon}
      {label}
    </ToggleButton>
  );
}
