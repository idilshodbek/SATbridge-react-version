import { Chip, cn, Link } from "@heroui/react";
import { type ReactNode, useState } from "react";

import { featureFlags } from "@/app/config";
import { paths } from "@/app/paths";
import { BotIcon, ChevronDownIcon, PlayIcon, XCircleIcon } from "@/components/icons";
import { ProBadge } from "@/components/ui/Badges";
import { Button, ButtonLink } from "@/components/ui/Button";
import { LinearEquation } from "@/components/ui/Equation";
import { GradientTile } from "@/components/ui/GradientTile";
import { Icon3D } from "@/components/ui/Icon3D";
import { LineTabs } from "@/components/ui/LineTabs";
import { Panel } from "@/components/ui/Panel";
import { difficultyClasses } from "@/components/ui/tones";
import {
  attemptsLabel,
  mistakePatternInsight,
  type MistakeEntry,
  mistakes,
  savedFilters,
  type SavedTabId,
  savedTabs,
} from "@/data/saved";

/** Moves to the next option, wrapping around. */
const cycle = <T,>(options: readonly T[], current: T) => options[(options.indexOf(current) + 1) % options.length];

export function SavedPage() {
  const [tab, setTab] = useState<SavedTabId>("mistakes");
  const [filters, setFilters] = useState({
    corrected: savedFilters.corrected[0] as string,
    section: savedFilters.section[0] as string,
    time: savedFilters.time[0] as string,
  });

  const activeTab = savedTabs.find((t) => t.id === tab) ?? savedTabs[1];
  const rows = mistakes.filter((entry) => {
    if (filters.section === "Math only") return entry.subject === "Math";
    if (filters.section === "R&W only") return entry.subject !== "Math";
    return true;
  });

  const filterChips = (Object.keys(savedFilters) as (keyof typeof savedFilters)[]).map((key) => ({
    key,
    value: filters[key],
    next: () =>
      setFilters((current) => ({
        ...current,
        [key]: cycle(savedFilters[key], current[key]),
      })),
  }));

  return (
    <div className="max-w-[1180px] px-9 pt-7.5 pb-17.5">
      <div className="mb-5 flex items-center gap-3.25">
        <Icon3D icon="mistakes" size={38} />
        <h1 className="text-[32px] font-extrabold tracking-[-0.9px]">
          {activeTab.title} <span className="text-muted-2">({activeTab.total})</span>
        </h1>
      </div>

      <LineTabs
        aria-label="Saved sections"
        selectedKey={tab}
        onSelectionChange={setTab}
        className="mb-5"
        items={savedTabs.map((t) => ({
          id: t.id,
          label: t.label,
          suffix: t.badge > 0 && t.id === tab && (
            <Chip className="rounded-full bg-surface-3 px-2.25 py-0.5 text-[12.5px] font-bold text-muted">{t.badge}</Chip>
          ),
        }))}
      />

      <div className="mb-5.5 flex flex-wrap items-center gap-3">
        {filterChips.map((chip) => (
          <Button
            key={chip.key}
            onPress={chip.next}
            className="gap-3 rounded-xl bg-surface-3 px-4.5 py-3.25 text-[14.5px] text-ink hover:bg-border"
          >
            {chip.value}
            <ChevronDownIcon size={14} className="text-muted-2" />
          </Button>
        ))}
        <ButtonLink href={paths.rushSession} tone="ink" className="ml-auto gap-2.5 rounded-xl px-5.5 py-3.5 text-[14.5px]">
          <PlayIcon size={15} />
          Practice all mistakes ({activeTab.total})
        </ButtonLink>
      </div>

      {featureFlags.showProBanners && <MistakePatternTeaser />}

      <Panel className="overflow-hidden">
        {rows.map((entry) => (
          <MistakeRow key={entry.question} entry={entry} />
        ))}
      </Panel>
    </div>
  );
}

/** Blurred Bridge AI insight with an upgrade prompt on top. */
function MistakePatternTeaser() {
  return (
    <div className="relative mb-6.5 overflow-hidden rounded-2xl border-[1.5px] border-[#FCA5A5] bg-surface p-6">
      <div className="mb-3.5 flex items-center gap-3.25">
        <GradientTile variant="ai" className="size-8 rounded-[10px]">
          <BotIcon size={18} strokeWidth={2.3} />
        </GradientTile>
        <div className="text-[21px] font-bold tracking-[-0.4px]">Bridge AI found a pattern in your mistakes</div>
      </div>
      <div aria-hidden="true" className="max-w-225 text-[15.5px] leading-[1.7] font-medium text-ink-2 opacity-50 blur-[4.5px]">
        {mistakePatternInsight}
      </div>
      <div className="absolute top-[58%] left-1/2 flex -translate-1/2 flex-col items-center gap-3 rounded-[14px] bg-surface px-5.5 py-4.5 shadow-[0_14px_34px_rgba(15,36,48,.18)]">
        <div className="flex items-center gap-2.5 text-[15.5px] font-bold">
          Unlock advanced analytics with
          <ProBadge />
        </div>
        <ButtonLink href={paths.billing} tone="ink" className="w-full rounded-xl px-8.5 py-3.25 text-[14.5px]">
          Upgrade
        </ButtonLink>
      </div>
    </div>
  );
}

function MistakeRow({ entry }: { entry: MistakeEntry }) {
  return (
    <Link
      href={paths.rushSession}
      className="block w-full rounded-none border-b border-border px-6 py-5 font-normal text-ink no-underline hover:bg-surface-2"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2.75">
        <span className="grid size-5.5 flex-none place-items-center rounded-full border-2 border-danger text-[11px] font-extrabold text-danger">
          ✕
        </span>
        <Pill className="bg-surface-3 text-ink-2">{entry.subject}</Pill>
        <Pill className={difficultyClasses[entry.difficulty]}>{entry.difficulty}</Pill>
        <Pill className="gap-1.5 bg-tint-red text-on-red">
          <XCircleIcon size={12} />
          {attemptsLabel(entry.attempts)}
        </Pill>
        <span className="text-[13.5px] font-semibold text-muted-2">{entry.when}</span>
      </div>
      {entry.hasEquation && (
        <div className="flex justify-center pt-2 pb-3.5">
          <LinearEquation />
        </div>
      )}
      <div className="font-serif text-[17px] leading-[1.55] text-ink">{entry.question}</div>
    </Link>
  );
}

function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return <Chip className={cn("rounded-full px-3 py-1.25 text-[13px] font-bold", className)}>{children}</Chip>;
}
