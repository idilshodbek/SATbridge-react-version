import { useState } from "react";

import { useProgress } from "@/app/progress-context";
import { baselineCounts, TOTAL_WORDS, vocabWords, type WordStatus } from "@/data/vocab";

/** XP for marking a flashcard as known. */
const XP_PER_LEARNED_WORD = 2;

export type Rating = "learned" | "repeat";

/**
 * Vocabulary session shared by the desktop and mobile Vocab screens:
 * word search, the flashcard deck and the student's ratings.
 */
export function useVocabDeck() {
  const { awardXp } = useProgress();
  const [query, setQuery] = useState("");
  const [cardNumber, setCardNumber] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  /** Ratings given in this session, keyed by word. */
  const [ratings, setRatings] = useState<Record<string, Rating>>({});

  const ratedAs = (rating: Rating) => Object.values(ratings).filter((r) => r === rating).length;
  const learned = baselineCounts.learned + ratedAs("learned");
  const repeat = baselineCounts.repeat + ratedAs("repeat");

  const search = query.trim().toLowerCase();
  const words = vocabWords
    .map((word) => ({
      ...word,
      status: (ratings[word.word] ?? word.status) as WordStatus,
    }))
    .filter(({ word, definition }) => !search || word.startsWith(search) || definition.includes(search));

  const position = cardNumber % vocabWords.length;
  const card = vocabWords[position];

  const rate = (rating: Rating) => {
    if (rating === "learned" && ratings[card.word] !== "learned") awardXp(XP_PER_LEARNED_WORD, `Learned "${card.word}"`);
    setRatings((current) => ({ ...current, [card.word]: rating }));
    setCardNumber((n) => n + 1);
    setIsFlipped(false);
  };

  return {
    query,
    setQuery,
    words,
    counts: {
      learned,
      repeat,
      notStarted: TOTAL_WORDS - learned - repeat,
      total: TOTAL_WORDS,
    },
    card,
    cardLabel: `${position + 1} / ${vocabWords.length}`,
    isFlipped,
    flip: () => setIsFlipped((flipped) => !flipped),
    rate,
  };
}

export type VocabDeck = ReturnType<typeof useVocabDeck>;
