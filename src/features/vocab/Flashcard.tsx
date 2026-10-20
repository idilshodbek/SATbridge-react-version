import { cn } from "@heroui/react";

import { Button } from "@/components/ui/Button";

import type { VocabDeck } from "./useVocabDeck";

/**
 * Tap-to-flip card plus "Repeat later" / "I know it" buttons.
 * `compact` is the mobile sizing.
 */
export function Flashcard({ deck, compact = false }: { deck: VocabDeck; compact?: boolean }) {
  const { card, isFlipped } = deck;

  return (
    <>
      <Button
        aria-label={isFlipped ? `Definition of ${card.word}` : `Flip ${card.word}`}
        onPress={deck.flip}
        className={cn(
          "grid w-full place-items-center border border-border text-center font-normal whitespace-normal data-[pressed=true]:scale-100",
          compact
            ? "min-h-47.5 rounded-[20px] bg-surface px-5 py-7.5 hover:bg-surface"
            : "min-h-46.5 rounded-[14px] bg-surface-2 px-6 py-8.5 hover:bg-surface-2",
        )}
      >
        {isFlipped ? (
          <span className="block animate-fade">
            <span
              className={cn(
                "block font-extrabold tracking-[1.2px] text-muted-2",
                compact ? "mb-2.75 text-[10.5px]" : "mb-3 text-[11px]",
              )}
            >
              DEFINITION
            </span>
            <span className={cn("block leading-[1.5] font-medium text-ink", compact ? "text-[17px]" : "max-w-130 text-[20px]")}>
              {card.definition}
            </span>
            <span className={cn("block font-extrabold text-accent", compact ? "mt-3 text-[15px]" : "mt-3.5 text-[16px]")}>
              {card.word}
            </span>
          </span>
        ) : (
          <span className="block">
            <span
              className={cn(
                "block font-extrabold text-ink",
                compact ? "mb-2.25 text-[34px] tracking-[-1.2px]" : "mb-2.5 text-[42px] tracking-[-1.4px]",
              )}
            >
              {card.word}
            </span>
            <span className={cn("block font-bold tracking-[.8px] text-muted-2", compact ? "text-[11.5px]" : "text-[12px]")}>
              TAP TO FLIP · {deck.cardLabel}
            </span>
          </span>
        )}
      </Button>

      <div className={cn("flex", compact ? "gap-2.5" : "mt-4 gap-3")}>
        <Button
          onPress={() => deck.rate("repeat")}
          className={cn(
            "flex-1 rounded-[14px] bg-tint-red p-3.75 text-on-red hover:bg-tint-red-bd",
            compact ? "text-[14px]" : "text-[14.5px]",
          )}
        >
          Repeat later
        </Button>
        <Button
          onPress={() => deck.rate("learned")}
          className={cn(
            "flex-1 rounded-[14px] bg-tint-green p-3.75 text-on-green hover:bg-tint-green-bd",
            compact ? "text-[14px]" : "text-[14.5px]",
          )}
        >
          I know it
        </Button>
      </div>
    </>
  );
}
