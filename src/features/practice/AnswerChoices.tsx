import { cn, Radio, RadioGroup } from "@heroui/react";

import type { RunnerQuestion } from "@/data/rush";
import { choiceLetter } from "@/lib/format";

type AnswerChoicesProps = {
  question: RunnerQuestion;
  selected: number | null;
  onSelect: (index: number) => void;
  /** After checking, the correct answer turns green and a wrong pick red. */
  isChecked: boolean;
  size?: "md" | "lg";
};

type ChoiceResult = "correct" | "wrong" | null;

/** A–D answer choices (HeroUI RadioGroup) with checked-state colouring. */
export function AnswerChoices({ question, selected, onSelect, isChecked, size = "md" }: AnswerChoicesProps) {
  const resultFor = (index: number): ChoiceResult => {
    if (!isChecked) return null;
    if (index === question.answerIndex) return "correct";
    return index === selected ? "wrong" : null;
  };

  return (
    <RadioGroup
      aria-label="Answer choices"
      value={selected === null ? null : String(selected)}
      onChange={(value) => onSelect(Number(value))}
      isReadOnly={isChecked}
      className="gap-2.5 **:data-[slot=radio]:mt-0"
    >
      {question.choices.map((text, index) => {
        const result = resultFor(index);
        const isPicked = selected === index;
        return (
          <Radio
            key={text}
            value={String(index)}
            className={cn(
              "w-full rounded-[15px] border-[1.8px] px-3.75 py-3.5",
              result === "correct" && "border-success bg-tint-green",
              result === "wrong" && "border-danger bg-tint-red",
              !result && isPicked && "border-accent bg-surface",
              !result && !isPicked && "border-border-2 bg-surface hover:border-border-3",
            )}
          >
            <Radio.Content className="flex w-full items-center gap-3">
              <span
                className={cn(
                  "grid size-7 flex-none place-items-center rounded-full border-[1.6px] text-[12.5px] font-extrabold",
                  result === "correct" && "border-success-ink bg-success-ink text-white",
                  result === "wrong" && "border-danger-ink bg-danger-ink text-white",
                  !result && isPicked && "border-accent bg-accent text-white",
                  !result && !isPicked && "border-border-3 bg-surface text-ink",
                )}
              >
                {result === "correct" ? "✓" : result === "wrong" ? "✕" : choiceLetter(index)}
              </span>
              <span
                className={cn(
                  "min-w-0 flex-1 font-serif leading-[1.45] font-normal text-ink",
                  size === "lg" ? "text-[17px]" : "text-[15.5px]",
                )}
              >
                {text}
              </span>
            </Radio.Content>
          </Radio>
        );
      })}
    </RadioGroup>
  );
}
