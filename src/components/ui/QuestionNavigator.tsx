import { cn, Popover } from "@heroui/react";
import { useState } from "react";

import { ChevronUpIcon } from "@/components/icons";

import { Button } from "./Button";

export type QuestionStatus = "current" | "correct" | "wrong" | "answered" | "marked" | "unanswered";

type QuestionNavigatorProps = {
  total: number;
  /** 0-based index of the question on screen. */
  current: number;
  statusFor: (index: number) => QuestionStatus;
  onJump: (index: number) => void;
  /** Which statuses this session produces, for the legend. */
  legend: Exclude<QuestionStatus, "current" | "unanswered">[];
  className?: string;
};

const cellStyles: Record<QuestionStatus, string> = {
  current: "border-accent bg-accent text-white",
  correct: "border-success bg-tint-green text-on-green",
  wrong: "border-danger bg-tint-red text-on-red",
  answered: "border-btn bg-btn text-white",
  marked: "border-on-amber bg-tint-amber text-on-amber",
  unanswered: "border-border-2 bg-surface text-ink hover:border-border-3",
};

const legendLabels: Record<QuestionStatus, string> = {
  current: "Current",
  correct: "Correct",
  wrong: "Wrong",
  answered: "Answered",
  marked: "Marked for review",
  unanswered: "Not yet",
};

/** "Question 4 / 15" button that opens a grid of every question in the set. Click a number to jump to it. */
export function QuestionNavigator({ total, current, statusFor, onJump, legend, className }: QuestionNavigatorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const answered = Array.from({ length: total }, (_, i) => statusFor(i)).filter(
    (s) => s !== "unanswered" && s !== "current",
  ).length;

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button tone="outline" aria-label="Jump to a question" className={cn("gap-2.25 px-4.5 py-2.75 text-[14px]", className)}>
        Question {current + 1} / {total}
        <ChevronUpIcon size={14} className={cn("transition-transform", isOpen && "rotate-180")} />
      </Button>
      <Popover.Content
        placement="top"
        className="w-90 max-w-[calc(100vw-2rem)] rounded-2xl border border-border bg-surface p-0 shadow-[0_18px_44px_rgba(15,36,48,.18)]"
      >
        <Popover.Dialog className="p-4">
          <div className="mb-3 flex items-baseline justify-between gap-3">
            <Popover.Heading className="text-[15px] font-extrabold text-ink">Jump to a question</Popover.Heading>
            <span className="text-[12.5px] font-semibold text-muted-2">
              {answered} of {total} done
            </span>
          </div>
          <div className="grid grid-cols-8 gap-1.5">
            {Array.from({ length: total }, (_, index) => {
              const status = statusFor(index);
              return (
                <Button
                  key={index}
                  aria-label={`Question ${index + 1} · ${legendLabels[status]}`}
                  aria-current={status === "current" ? "step" : undefined}
                  onPress={() => {
                    onJump(index);
                    setIsOpen(false);
                  }}
                  className={cn("size-9 rounded-lg border-[1.5px] p-0 text-[13px] font-extrabold", cellStyles[status])}
                >
                  {index + 1}
                </Button>
              );
            })}
          </div>
          <div className="mt-3.5 flex flex-wrap gap-x-3.5 gap-y-1.5 text-[11.5px] font-bold text-muted">
            {["current", ...legend].map((status) => (
              <span key={status} className="flex items-center gap-1.5">
                <span className={cn("size-2.5 rounded-[3px] border", cellStyles[status as QuestionStatus])} />
                {legendLabels[status as QuestionStatus]}
              </span>
            ))}
          </div>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}
