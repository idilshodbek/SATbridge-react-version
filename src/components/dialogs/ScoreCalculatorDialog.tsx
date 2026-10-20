import { Label, Slider } from "@heroui/react";
import { useState } from "react";

import { AppDialog } from "@/components/ui/AppDialog";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Button } from "@/components/ui/Button";

const sections = [
  { id: "rw", label: "Reading & Writing", questions: 54, color: "#E5308F" },
  { id: "math", label: "Math", questions: 44, color: "#009ADA" },
] as const;

/** Rough raw → scaled conversion (200–800, rounded to 10). Real curves vary by test form. */
const scaled = (correct: number, total: number) => Math.round((200 + (correct / total) * 600) / 10) * 10;

type ScoreCalculatorDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

/** Move the sliders to see roughly what a raw score turns into on the 400–1600 scale. */
export function ScoreCalculatorDialog({ isOpen, onOpenChange }: ScoreCalculatorDialogProps) {
  const [correct, setCorrect] = useState<Record<string, number>>({
    rw: 40,
    math: 32,
  });
  const total = sections.reduce((sum, section) => sum + scaled(correct[section.id], section.questions), 0);

  return (
    <AppDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      icon="calculator"
      title="DSAT score calculator"
      description="An estimate: the College Board adjusts the curve for every test form."
      footer={
        <Button slot="close" tone="ink" className="rounded-xl px-5 py-2.75 text-[14px]">
          Done
        </Button>
      }
    >
      <div className="mb-5 rounded-2xl bg-ink-surface p-5 text-center">
        <div className="text-[12px] font-extrabold tracking-[1.2px] text-[#7FA0B1]">ESTIMATED TOTAL</div>
        <AnimatedNumber
          value={total}
          duration={400}
          className="block text-[46px] leading-none font-extrabold tracking-[-1.8px] text-white"
        />
        <div className="mt-1 text-[12.5px] font-semibold text-[#93B4C4]">out of 1600</div>
      </div>
      <div className="flex flex-col gap-5">
        {sections.map((section) => (
          <Slider
            key={section.id}
            aria-label={`${section.label} questions correct`}
            minValue={0}
            maxValue={section.questions}
            step={1}
            value={correct[section.id]}
            onChange={(value) =>
              setCorrect((current) => ({
                ...current,
                [section.id]: Array.isArray(value) ? value[0] : value,
              }))
            }
            className="flex flex-col"
          >
            <div className="mb-1 flex items-baseline justify-between gap-3">
              <Label className="text-[14px] font-bold text-ink">{section.label}</Label>
              <span className="text-[13px] font-semibold text-muted">
                {correct[section.id]} / {section.questions} correct ·{" "}
                <span className="text-[15px] font-extrabold" style={{ color: section.color }}>
                  {scaled(correct[section.id], section.questions)}
                </span>
              </span>
            </div>
            <Slider.Track className="mt-2 h-2 rounded-full bg-surface-3">
              <Slider.Fill className="rounded-full" style={{ background: section.color }} />
              <Slider.Thumb className="size-5 border-2 bg-white" style={{ borderColor: section.color }} />
            </Slider.Track>
          </Slider>
        ))}
      </div>
    </AppDialog>
  );
}
