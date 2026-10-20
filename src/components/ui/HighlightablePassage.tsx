import { cn } from "@heroui/react";
import { useRef, useState } from "react";

type Highlight = { start: number; end: number };

type HighlightablePassageProps = {
  text: string;
  /** While active, selecting text turns it into a highlight; clicking a highlight removes it. */
  isActive: boolean;
  className?: string;
};

/** Characters from the start of `root` up to (`node`, `offset`). */
function offsetWithin(root: Node, node: Node, offset: number) {
  const range = document.createRange();
  range.setStart(root, 0);
  range.setEnd(node, offset);
  return range.toString().length;
}

/** Sorts highlights and joins any that touch or overlap. */
function merge(highlights: Highlight[]) {
  const sorted = [...highlights].sort((a, b) => a.start - b.start);
  return sorted.reduce<Highlight[]>((merged, current) => {
    const last = merged.at(-1);
    if (last && current.start <= last.end) last.end = Math.max(last.end, current.end);
    else merged.push({ ...current });
    return merged;
  }, []);
}

/**
 * Passage text you can highlight like in Bluebook: drag to select, release to keep it yellow.
 * Highlights are stored as character ranges, so React can re-render the text freely.
 */
export function HighlightablePassage({ text, isActive, className }: HighlightablePassageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [highlights, setHighlights] = useState<Highlight[]>([]);

  const captureSelection = () => {
    const root = ref.current;
    const selection = window.getSelection();
    if (!isActive || !root || !selection || selection.isCollapsed || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (!root.contains(range.startContainer) || !root.contains(range.endContainer)) return;
    const start = offsetWithin(root, range.startContainer, range.startOffset);
    const end = offsetWithin(root, range.endContainer, range.endOffset);
    if (end <= start) return;

    setHighlights((current) => merge([...current, { start, end }]));
    selection.removeAllRanges();
  };

  const remove = (highlight: Highlight) => setHighlights((current) => current.filter((h) => h !== highlight));

  // Split the text into plain runs and highlighted runs.
  const segments: { text: string; highlight?: Highlight }[] = [];
  let cursor = 0;
  for (const highlight of highlights) {
    if (highlight.start > cursor) segments.push({ text: text.slice(cursor, highlight.start) });
    segments.push({
      text: text.slice(highlight.start, highlight.end),
      highlight,
    });
    cursor = highlight.end;
  }
  if (cursor < text.length) segments.push({ text: text.slice(cursor) });

  return (
    <div
      ref={ref}
      onPointerUp={captureSelection}
      className={cn(isActive && "cursor-text selection:bg-[#FEF08A] selection:text-ink", className)}
    >
      {segments.map((segment, index) =>
        segment.highlight ? (
          <mark
            key={index}
            title="Click to remove highlight"
            onClick={() => remove(segment.highlight!)}
            className="cursor-pointer rounded-[3px] bg-[#FEF08A] px-0.5 text-inherit transition-colors hover:bg-[#FDE047] dark:bg-[#7A6A12] dark:hover:bg-[#8F7C14]"
          >
            {segment.text}
          </mark>
        ) : (
          <span key={index}>{segment.text}</span>
        ),
      )}
    </div>
  );
}
