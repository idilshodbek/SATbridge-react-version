import { cn, Disclosure, DisclosureGroup, DisclosureStateContext, SearchField } from "@heroui/react";
import { type ReactNode, use, useState } from "react";

import { BookPairIcon, ChevronRightIcon, DocumentIcon, HistoryIcon, SearchIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { DonutRing } from "@/components/ui/DonutRing";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { bareInputClass } from "@/components/ui/fields";
import { Icon3D } from "@/components/ui/Icon3D";
import { Panel } from "@/components/ui/Panel";
import { ProgressTrack } from "@/components/ui/ProgressTrack";
import { studyModes, type VocabUnit, vocabUnits, type WordStatus } from "@/data/vocab";
import { conicSegments } from "@/lib/charts";

import { Flashcard } from "./Flashcard";
import { useVocabDeck } from "./useVocabDeck";

const wordStatusStyles: Record<WordStatus, { card: string; label: string; text: string }> = {
  learned: {
    card: "border-tint-green-bd bg-tint-green",
    label: "text-on-green",
    text: "LEARNED",
  },
  repeat: {
    card: "border-tint-red-bd bg-tint-red",
    label: "text-on-red",
    text: "REPEAT",
  },
  new: {
    card: "border-border bg-surface-2",
    label: "text-muted-2",
    text: "NEW",
  },
};

export function VocabPage() {
  const deck = useVocabDeck();
  const [isStudying, setIsStudying] = useState(false);
  const { learned, repeat, notStarted, total } = deck.counts;

  return (
    <div className="max-w-[1420px] px-9 pt-7.5 pb-17.5">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4.5">
        <div className="flex items-center gap-3.5">
          <Icon3D icon="vocab" size={48} />
          <div>
            <Eyebrow className="text-[13px]">VOCABULARY</Eyebrow>
            <h1 className="mt-1 text-[34px] font-extrabold tracking-[-1px]">150 SAT words, 10 a day</h1>
          </div>
        </div>
        <Button
          onPress={() => setIsStudying(true)}
          className="rounded-[14px] border-b-4 border-success-ink bg-success px-6.5 py-3.75 text-[13px] font-extrabold tracking-[.9px] text-white hover:bg-success data-[pressed=true]:translate-y-0.5 data-[pressed=true]:scale-100 data-[pressed=true]:border-b-2"
        >
          START FLASHCARDS
        </Button>
      </div>

      <SearchField aria-label="Search word" value={deck.query} onChange={deck.setQuery} className="mb-5">
        <SearchField.Group className="h-auto gap-3.25 rounded-2xl border border-border bg-surface px-5 py-4 shadow-none">
          <SearchIcon size={20} strokeWidth={2.4} className="text-muted-2" />
          <SearchField.Input placeholder="Search word" className={cn(bareInputClass, "text-[16.5px]")} />
        </SearchField.Group>
      </SearchField>

      <div className="mb-5.5 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
        {studyModes.map((mode) => (
          <div key={mode.name} className="relative overflow-hidden rounded-2xl border border-border bg-surface-2 p-5.5">
            <div aria-hidden="true" className="absolute right-3 -bottom-4.5 text-[78px] font-extrabold text-border opacity-55">
              {mode.glyph}
            </div>
            <div className="relative">
              <div className="mb-2 text-[21px] font-extrabold tracking-[-0.5px]">{mode.name}</div>
              <div className="mb-4.5 min-h-16.5 text-[14.5px] leading-[1.55] font-medium text-muted">{mode.blurb}</div>
              <Button tone="ink" onPress={() => setIsStudying(true)} className="px-5 py-2.75 text-[14px]">
                Start
                <ChevronRightIcon size={14} strokeWidth={2.8} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-start gap-5">
        <div className="flex min-w-[min(100%,420px)] flex-[1_1_480px] flex-col gap-5">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(215px,1fr))] gap-4">
            <CountCard
              label="My vocabulary"
              count={learned}
              icon={<DocumentIcon size={22} />}
              className="border-success-ink bg-success"
            />
            <CountCard label="Repeat" count={repeat} icon={<HistoryIcon size={22} />} className="border-danger-ink bg-danger" />
          </div>

          <Panel className="flex flex-wrap items-center gap-7.5 rounded-[18px] p-6">
            <DonutRing
              size={168}
              holeSize={122}
              gradient={conicSegments(
                [
                  { color: "#22C55E", percent: (learned / total) * 100 },
                  { color: "#EF4444", percent: (repeat / total) * 100 },
                ],
                "var(--border)",
              )}
            >
              <div className="text-[32px] font-extrabold tracking-[-1px]">{total}</div>
              <div className="mt-0.5 text-[10px] font-bold tracking-[1.2px] text-muted-2">TOTAL WORDS</div>
            </DonutRing>
            <div className="flex min-w-47.5 flex-1 flex-col gap-3.75">
              <LegendRow color="#22C55E" label="My vocabulary" value={learned} valueClassName="text-success-ink" />
              <LegendRow color="#EF4444" label="Repeat" value={repeat} valueClassName="text-danger-ink" />
              <LegendRow
                color="var(--border-2)"
                label="Not started"
                value={notStarted}
                labelClassName="text-muted"
                valueClassName="text-muted-2"
              />
            </div>
          </Panel>

          {isStudying && (
            <Panel className="rounded-[18px] p-6.5">
              <Flashcard deck={deck} />
            </Panel>
          )}

          <DisclosureGroup defaultExpandedKeys={[vocabUnits[0].name]} className="flex flex-col gap-2.75">
            {vocabUnits.map((unit) => (
              <UnitRow key={unit.name} unit={unit} />
            ))}
          </DisclosureGroup>
        </div>

        <Panel className="w-90 max-w-100 min-w-[min(100%,300px)] flex-[1_1_300px] rounded-[18px] p-5.5">
          <Eyebrow className="mb-3.5">WORDS</Eyebrow>
          <div className="flex flex-col gap-2.75">
            {deck.words.map((word) => {
              const style = wordStatusStyles[word.status];
              return (
                <div key={word.word} className={cn("rounded-[14px] border px-4 py-3.75", style.card)}>
                  <div className="flex items-center justify-between gap-2.5">
                    <div className="text-[16.5px] font-extrabold">{word.word}</div>
                    <div className={cn("text-[10.5px] font-extrabold tracking-[.8px]", style.label)}>{style.text}</div>
                  </div>
                  <div className="mt-1.25 text-[14px] leading-[1.5] font-medium text-muted">{word.definition}</div>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function CountCard({ label, count, icon, className }: { label: string; count: number; icon: ReactNode; className: string }) {
  return (
    <div className={cn("rounded-[18px] border-b-5 p-5.5 text-white", className)}>
      <div className="mb-6 grid size-11 place-items-center rounded-[13px] bg-white/22">{icon}</div>
      <div className="text-[15px] font-bold opacity-95">{label}</div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-[34px] font-extrabold tracking-[-1px]">{count}</span>
        <span className="text-[15px] font-bold opacity-90">words</span>
      </div>
    </div>
  );
}

type LegendRowProps = {
  color: string;
  label: string;
  value: number;
  labelClassName?: string;
  valueClassName?: string;
};

function LegendRow({ color, label, value, labelClassName, valueClassName }: LegendRowProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-2.75 w-5.5 rounded-md" style={{ background: color }} />
      <span className={cn("flex-1 text-[16.5px] font-bold", labelClassName)}>{label}</span>
      <span className={cn("text-[16px] font-extrabold", valueClassName)}>{value}</span>
    </div>
  );
}

/** Expandable unit (HeroUI Disclosure inside a single-open DisclosureGroup). */
function UnitRow({ unit }: { unit: VocabUnit }) {
  const percent = Math.round((unit.learned / unit.total) * 100);

  return (
    <Disclosure id={unit.name} className="rounded-2xl border border-border bg-surface px-5 py-4.5">
      <Disclosure.Heading>
        <Button slot="trigger" className="h-auto w-full justify-start gap-4 rounded-none p-0 text-left font-normal">
          <div className="grid size-11 flex-none place-items-center rounded-[13px] bg-surface-3">
            <BookPairIcon size={22} className="text-muted-2" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-2.25 text-[17.5px] font-bold text-ink">{unit.name}</div>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <YellowTrack label={unit.name} percent={percent} />
              </div>
              <div className="text-[13px] font-bold text-muted-2">
                {unit.learned}/{unit.total}
              </div>
            </div>
          </div>
          <ExpandCaret />
        </Button>
      </Disclosure.Heading>
      <Disclosure.Content>
        <Disclosure.Body className="p-0">
          {unit.parts.map((part) => (
            <div key={part.name} className="mt-3 animate-fade rounded-xl border border-border bg-surface-2 px-4 py-3.5">
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="text-[15px] font-bold">{part.name}</div>
                <div className="text-[13px] font-bold text-muted-2">
                  {part.learned}/{part.total}
                </div>
              </div>
              <YellowTrack label={part.name} percent={Math.round((part.learned / part.total) * 100)} />
            </div>
          ))}
        </Disclosure.Body>
      </Disclosure.Content>
    </Disclosure>
  );
}

function ExpandCaret() {
  const state = use(DisclosureStateContext);
  return <div className="text-[15px] text-muted-2">{state?.isExpanded ? "⌃" : "⌄"}</div>;
}

function YellowTrack({ label, percent }: { label: string; percent: number }) {
  return (
    <ProgressTrack
      aria-label={label}
      value={percent}
      color="#FFC93C"
      className="h-2 rounded-[5px] bg-border"
      fillClassName="rounded-[5px]"
    />
  );
}
