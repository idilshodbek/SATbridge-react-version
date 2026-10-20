import { cn, Kbd, Modal, SearchField, useFilter } from "@heroui/react";
import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import { type Command, commands } from "@/app/commands";
import { useAppTheme } from "@/app/theme-context";
import { SearchIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { bareInputClass } from "@/components/ui/fields";
import { Icon3D } from "@/components/ui/Icon3D";

type SearchPaletteProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const kbdClass = "h-auto rounded-md border border-border bg-surface-2 px-1.5 py-0.5 text-[11px] font-bold text-muted";

/**
 * ⌘K palette: type to jump to any page or run an action.
 * Arrow keys move, Enter runs, Esc closes; on phones it's a tap list.
 */
export function SearchPalette({ isOpen, onOpenChange }: SearchPaletteProps) {
  return (
    <Modal.Backdrop isOpen={isOpen} onOpenChange={onOpenChange} className="bg-[rgba(12,26,34,.45)]">
      <Modal.Container placement="top" className="px-4 pt-[8vh]">
        <Modal.Dialog
          aria-label="Search SATbridge"
          className="w-150 max-w-full overflow-hidden rounded-[20px] border border-border bg-surface p-0 shadow-[0_30px_70px_rgba(9,26,36,.3)]"
        >
          {/* Mounted per opening so the query and highlight start fresh. */}
          {isOpen && <PaletteBody onClose={() => onOpenChange(false)} />}
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}

/** Title matches first (prefix before substring), then matches on section or keywords; ties keep list order. */
function rank(list: Command[], search: string, contains: (text: string, query: string) => boolean) {
  const score = (command: Command) => {
    if (contains(command.label.slice(0, search.length), search)) return 0;
    if (contains(command.label, search)) return 1;
    if (contains(`${command.section} ${command.keywords ?? ""}`, search)) return 2;
    return null;
  };
  return list
    .map((command, index) => ({ command, index, score: score(command) }))
    .filter((entry): entry is { command: Command; index: number; score: number } => entry.score !== null)
    .sort((a, b) => a.score - b.score || a.index - b.index)
    .map((entry) => entry.command);
}

function PaletteBody({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const { toggleTheme } = useAppTheme();
  const { contains } = useFilter({ sensitivity: "base" });
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const search = query.trim();
  const results = search ? rank(commands, search, contains) : commands;
  const active = results[Math.min(activeIndex, results.length - 1)];

  // Keep the highlighted row in view while arrowing through a long list.
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>("[data-active='true']")?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, search]);

  const run = (command: Command) => {
    onClose();
    command.run({ navigate, toggleTheme });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(results.length - 1, index + 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(0, index - 1));
    }
  };

  return (
    <>
      <SearchField
        aria-label="Search pages and actions"
        value={query}
        onChange={(value) => {
          setQuery(value);
          setActiveIndex(0);
        }}
        // Enter belongs to the search field (React Aria), so "open" is its submit action.
        onSubmit={() => active && run(active)}
        autoFocus
        className="border-b border-border"
      >
        <SearchField.Group className="h-auto gap-3 rounded-none border-0 bg-transparent px-5 py-4 shadow-none">
          <SearchIcon size={19} className="text-muted-2" />
          <SearchField.Input
            placeholder="Search pages, or type an action…"
            className={cn(bareInputClass, "text-[16px]")}
            onKeyDown={onKeyDown}
          />
          <Kbd className={kbdClass}>
            <Kbd.Content>esc</Kbd.Content>
          </Kbd>
        </SearchField.Group>
      </SearchField>

      <div ref={listRef} className="no-scrollbar max-h-[min(60vh,440px)] overflow-y-auto p-2">
        {results.length === 0 && (
          <div className="px-4 py-10 text-center text-[14px] font-semibold text-muted-2">Nothing matches "{search}"</div>
        )}
        {results.map((command, index) => {
          const showHeading = index === 0 || results[index - 1].section !== command.section;
          const isActive = command === active;
          return (
            <div key={command.id}>
              {showHeading && (
                <div className="px-3 pt-3 pb-1.5 text-[11px] font-extrabold tracking-[1px] text-muted-2">
                  {command.section.toUpperCase()}
                </div>
              )}
              <Button
                data-active={isActive}
                onPress={() => run(command)}
                onHoverStart={() => setActiveIndex(index)}
                className={cn(
                  "h-auto w-full justify-start gap-3 rounded-xl px-3 py-2.25 text-left text-[14.5px] font-semibold text-ink",
                  isActive ? "bg-tint-blue hover:bg-tint-blue" : "hover:bg-surface-2",
                )}
              >
                <Icon3D icon={command.icon} size={26} />
                <span className="flex-1">{command.label}</span>
                {isActive && (
                  <Kbd className={kbdClass}>
                    <Kbd.Content>↵</Kbd.Content>
                  </Kbd>
                )}
              </Button>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-4 border-t border-border px-5 py-2.5 text-[12px] font-semibold text-muted-2">
        <span className="flex items-center gap-1.5">
          <Kbd className={kbdClass}>
            <Kbd.Content>↑↓</Kbd.Content>
          </Kbd>
          move
        </span>
        <span className="flex items-center gap-1.5">
          <Kbd className={kbdClass}>
            <Kbd.Content>↵</Kbd.Content>
          </Kbd>
          open
        </span>
        <span className="ml-auto">{results.length} results</span>
      </div>
    </>
  );
}
