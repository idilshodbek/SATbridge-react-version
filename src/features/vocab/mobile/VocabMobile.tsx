import { cn, SearchField } from "@heroui/react";

import { SearchIcon } from "@/components/icons";
import { MobileEyebrow } from "@/components/mobile/MobileEyebrow";
import { bareInputClass } from "@/components/ui/fields";
import type { WordStatus } from "@/data/vocab";

import { Flashcard } from "../Flashcard";
import { useVocabDeck } from "../useVocabDeck";

const statusStyles: Record<WordStatus, { label: string; row: string; tag: string }> = {
  learned: {
    label: "KNOWN",
    row: "border-tint-green-bd bg-tint-green",
    tag: "text-on-green",
  },
  repeat: {
    label: "REPEAT",
    row: "border-tint-red-bd bg-tint-red",
    tag: "text-on-red",
  },
  new: { label: "NEW", row: "border-border bg-surface", tag: "text-muted-2" },
};

/** Vocabulary on phones: search, counters, flashcard and the word list. */
export function VocabMobile() {
  const deck = useVocabDeck();

  return (
    <div className="flex animate-fade flex-col gap-3.5">
      <SearchField aria-label="Search word" value={deck.query} onChange={deck.setQuery}>
        <SearchField.Group className="h-auto gap-2.75 rounded-[15px] border border-border bg-surface px-4 py-3.5 shadow-none">
          <SearchIcon size={18} strokeWidth={2.4} className="text-muted-2" />
          <SearchField.Input placeholder="Search word" className={cn(bareInputClass, "text-[15.5px]")} />
        </SearchField.Group>
      </SearchField>

      <div className="flex gap-2.5">
        <CountCard label="My vocabulary" value={deck.counts.learned} className="border-success-ink bg-success" />
        <CountCard label="Repeat" value={deck.counts.repeat} className="border-danger-ink bg-danger" />
      </div>

      <Flashcard deck={deck} compact />

      <MobileEyebrow className="mt-1">WORDS</MobileEyebrow>
      <div className="flex flex-col gap-2.25">
        {deck.words.map((word) => {
          const style = statusStyles[word.status];
          return (
            <div key={word.word} className={cn("rounded-[14px] border px-3.75 py-3.5", style.row)}>
              <div className="flex items-center justify-between gap-2.5">
                <div className="text-[15.5px] font-extrabold">{word.word}</div>
                <div className={cn("text-[10px] font-extrabold tracking-[0.8px]", style.tag)}>{style.label}</div>
              </div>
              <div className="mt-1 text-[13.5px] leading-[1.5] font-medium text-muted">{word.definition}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CountCard({ label, value, className }: { label: string; value: number; className: string }) {
  return (
    <div className={cn("flex-1 rounded-[18px] border-b-4 p-4 text-white", className)}>
      <div className="text-[13px] font-bold opacity-95">{label}</div>
      <div className="mt-0.5 text-[28px] font-extrabold tracking-[-1px]">{value}</div>
    </div>
  );
}
