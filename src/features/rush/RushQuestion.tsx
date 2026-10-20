import { cn, Input, Radio, RadioGroup, ToggleButton } from "@heroui/react";

import { featureFlags } from "@/app/config";
import { BookmarkIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { LinearEquation } from "@/components/ui/Equation";
import { HighlightablePassage } from "@/components/ui/HighlightablePassage";
import { KeyboardTip } from "@/components/ui/KeyboardTip";
import { type DualTextQuestion, type MathQuestion, RUSH_SET_SIZE, type RushQuestion as Question } from "@/data/rush";
import { choiceLetter } from "@/lib/format";

type RushQuestionProps = {
  question: Question;
  questionNumber: number;
  isMarked: boolean;
  onMarkChange: (isMarked: boolean) => void;
  choice: ChoiceState;
  freeResponse: FreeResponseState;
  /** Selecting passage text marks it; see `HighlightablePassage`. */
  isHighlighting?: boolean;
};

export type ChoiceState = {
  selected: number | null;
  isChecked: boolean;
  onSelect: (index: number) => void;
  /** Check the answer, or go to the next question once checked. */
  onAction: () => void;
};

export type FreeResponseState = {
  value: string;
  onChange: (value: string) => void;
  isChecked: boolean;
  onCheck: () => void;
  onExplain: () => void;
};

const serif = "font-serif text-[19px] text-ink";

export function RushQuestion({
  question,
  questionNumber,
  isMarked,
  onMarkChange,
  choice,
  freeResponse,
  isHighlighting = false,
}: RushQuestionProps) {
  return (
    <div className="mx-auto max-w-280">
      {question.kind === "dual" && (
        <div className={cn(serif, "mb-7.5 max-w-250 leading-[1.68]")}>
          <div className="mb-3.5">
            <div className="mb-1">Text 1</div>
            <HighlightablePassage key={questionNumber} text={question.text1} isActive={isHighlighting} />
          </div>
          <div>
            <div className="mb-1">Text 2</div>
            <HighlightablePassage key={questionNumber} text={question.text2} isActive={isHighlighting} />
          </div>
        </div>
      )}

      {question.kind === "math" && (
        <div className="flex justify-center pt-3 pb-6.5">
          <LinearEquation size="lg" />
        </div>
      )}

      <div className="mb-4 flex items-center justify-between gap-3.5">
        <div className="text-[14.5px] font-semibold text-muted-2">
          Question {questionNumber} of {RUSH_SET_SIZE}
        </div>
        <ToggleButton
          isSelected={isMarked}
          onChange={onMarkChange}
          className={cn(
            "h-auto gap-2 rounded-none bg-transparent p-0 text-[14.5px] font-bold text-muted-2 hover:bg-transparent",
            "data-[selected=true]:bg-transparent data-[selected=true]:text-on-amber",
          )}
        >
          <BookmarkIcon size={15} strokeWidth={2.2} fill={isMarked ? "#FBBF24" : "none"} />
          Mark for Review
        </ToggleButton>
      </div>

      <div className={cn(serif, "mb-5 max-w-250 leading-[1.62]")}>{question.prompt}</div>

      {question.kind === "math" ? (
        <FreeResponse question={question} state={freeResponse} />
      ) : (
        <Choices question={question} state={choice} />
      )}

      {featureFlags.showKeyboardTips && <KeyboardTip action="to check" />}
    </div>
  );
}

function Choices({ question, state }: { question: DualTextQuestion; state: ChoiceState }) {
  return (
    <RadioGroup
      aria-label="Answer choices"
      value={state.selected === null ? null : String(state.selected)}
      onChange={(value) => state.onSelect(Number(value))}
      isReadOnly={state.isChecked}
      className="max-w-250 gap-3 **:data-[slot=radio]:mt-0"
    >
      {question.choices.map((text, index) => {
        const isPicked = state.selected === index;
        const isCorrect = index === question.answerIndex;
        const result = state.isChecked && isPicked ? (isCorrect ? "correct" : "wrong") : null;

        return (
          <div
            key={text}
            className={cn(
              "flex items-center gap-3.75 rounded-xl border-[1.6px] px-4.5 py-3.75",
              result === "correct" && "border-success bg-tint-green",
              result === "wrong" && "border-danger bg-tint-red",
              !result && isPicked && "border-accent bg-surface",
              !result && !isPicked && "border-border-2 bg-surface hover:border-border-3",
            )}
          >
            <Radio value={String(index)} className="min-w-0 flex-1">
              <Radio.Content className="flex w-full items-center gap-3.75">
                <span
                  className={cn(
                    "grid size-7.5 flex-none place-items-center rounded-full border-[1.6px] text-[14.5px] font-bold",
                    result === "correct" && "border-success-ink bg-success-ink text-white",
                    result === "wrong" && "border-danger-ink bg-danger-ink text-white",
                    !result && isPicked && "border-accent bg-accent text-white",
                    !result && !isPicked && "border-border-3 bg-surface text-ink",
                  )}
                >
                  {result === "correct" ? "✓" : result === "wrong" ? "✕" : choiceLetter(index)}
                </span>
                <span className="min-w-0 flex-1 font-serif text-[18px] leading-[1.45] font-normal text-ink">{text}</span>
              </Radio.Content>
            </Radio>
            {isPicked && (
              <Button
                onPress={state.onAction}
                className={cn(
                  "flex-none rounded-lg px-4.5 py-2.25 text-[14px]",
                  state.isChecked ? "bg-ink text-surface hover:bg-ink" : "bg-accent text-white hover:bg-accent",
                )}
              >
                {state.isChecked ? "Next" : "Check"}
              </Button>
            )}
          </div>
        );
      })}
    </RadioGroup>
  );
}

function FreeResponse({ question, state }: { question: MathQuestion; state: FreeResponseState }) {
  const isCorrect = Number(state.value) === question.answer;
  const showResult = state.isChecked;

  return (
    <div className="max-w-117.5">
      <Input
        aria-label="Your answer"
        value={state.value}
        onChange={(event) => state.onChange(event.target.value)}
        readOnly={state.isChecked}
        className={cn(
          "h-auto w-full rounded-xl border-[1.6px] px-4.5 py-3.75 font-serif text-[19px] text-ink shadow-none",
          !showResult && "border-border-2 bg-surface",
          showResult && isCorrect && "border-success bg-tint-green",
          showResult && !isCorrect && "border-danger bg-tint-red",
        )}
      />
      {showResult && !isCorrect && (
        <div className="mt-3 text-[15.5px] font-bold text-danger-ink">Correct answer: {question.answer}</div>
      )}
      <div className="mt-4 flex gap-2.5">
        <Button tone="brand" onPress={state.onCheck} className="px-5.5 py-3 text-[14px]">
          Check
        </Button>
        <Button tone="outline" onPress={state.onExplain} className="px-5.5 py-3 text-[14px] text-ink-2">
          Explanation
        </Button>
      </div>
    </div>
  );
}
