import { Chip, cn, Link } from "@heroui/react";
import { type ReactNode, useState } from "react";

import { paths } from "@/app/paths";
import { PlayIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { interactiveCard } from "@/components/ui/interactive";

import { LinearEquation } from "@/components/ui/Equation";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { difficultyClasses } from "@/components/ui/tones";
import { type MistakeEntry, mistakes, type SavedTabId, savedTabs } from "@/data/saved";

/** Filter pills shown on phones, in this order. */
const MOBILE_TABS: SavedTabId[] = ["mistakes", "saved", "notes"];

/** Saved & mistakes on phones: filter pills, a practice button and the mistakes list. */
export function SavedMobile() {
  const [tabId, setTabId] = useState<SavedTabId>("mistakes");
  const tabs = MOBILE_TABS.flatMap((id) => savedTabs.filter((tab) => tab.id === id));
  const activeTab = tabs.find((tab) => tab.id === tabId) ?? tabs[0];

  return (
    <div className="flex animate-fade flex-col gap-3">
      <SegmentedControl
        aria-label="Saved items"
        tone="ink"
        options={tabs.map((tab) => ({
          id: tab.id,
          label: `${tab.shortLabel} ${tab.total}`,
        }))}
        value={tabId}
        onChange={setTabId}
        className="no-scrollbar w-full justify-start gap-2 overflow-x-auto pb-0.5"
        itemClassName="flex-none rounded-[11px] border border-border bg-surface px-3.75 py-2.5 text-[13px] font-bold text-ink data-[selected=true]:border-btn"
      />

      <ButtonLink
        href={paths.rushSession}
        tone="ink"
        className="w-full gap-2.25 rounded-[15px] p-3.75 text-[14px] font-extrabold"
      >
        <PlayIcon size={14} />
        Practice all {activeTab.total} mistakes
      </ButtonLink>

      {mistakes.map((entry) => (
        <MistakeCard key={entry.question} entry={entry} />
      ))}
    </div>
  );
}

function MistakeCard({ entry }: { entry: MistakeEntry }) {
  return (
    <Link
      href={paths.rushSession}
      className={cn(
        interactiveCard,
        "block w-full rounded-2xl border border-border bg-surface p-4 font-normal text-ink no-underline",
      )}
    >
      <div className="mb-2.5 flex flex-wrap items-center gap-1.75">
        <Tag className="bg-surface-3 text-ink-2">{entry.subject}</Tag>
        <Tag className={difficultyClasses[entry.difficulty]}>{entry.difficulty}</Tag>
        <Tag className="bg-tint-red text-on-red">✕ {entry.attempts}</Tag>
        <span className="text-[11.5px] font-semibold text-muted-2">{entry.when}</span>
      </div>
      {entry.hasEquation && (
        <div className="no-scrollbar flex justify-center overflow-x-auto pt-1 pb-3">
          <LinearEquation />
        </div>
      )}
      <div className="font-serif text-[15px] leading-[1.55] text-ink">{entry.question}</div>
    </Link>
  );
}

function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return <Chip className={cn("rounded-full px-2.25 py-1 text-[11px] font-bold", className)}>{children}</Chip>;
}
