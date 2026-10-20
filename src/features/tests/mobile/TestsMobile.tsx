import { cn } from "@heroui/react";
import { useState } from "react";

import { paths } from "@/app/paths";
import { ShortcutTile } from "@/components/mobile/ShortcutTile";
import { ButtonLink } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { type CatalogTest, testCatalog, testReports, type TestStatus } from "@/data/tests";

type TestFilter = "all" | "predicted" | "official";

const filters: { id: TestFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "predicted", label: "Predicted" },
  { id: "official", label: "Official" },
];

const matchesFilter = (test: CatalogTest, filter: TestFilter) =>
  filter === "all" || (filter === "official") === (test.status === "OFFICIAL");

const statusClasses: Record<TestStatus, string> = {
  COMPLETED: "bg-tint-green text-on-green",
  "NEXT UP": "bg-tint-blue text-on-blue",
  MODULE: "bg-surface-3 text-muted",
  OFFICIAL: "bg-surface-3 text-muted",
};

/** Full-length tests on phones: filter + one card per paper. */
export function TestsMobile() {
  const [filter, setFilter] = useState<TestFilter>("all");

  return (
    <div className="flex animate-fade flex-col gap-3">
      <SegmentedControl
        aria-label="Test type"
        options={filters}
        value={filter}
        onChange={setFilter}
        className="w-full gap-1 rounded-[13px] border border-border bg-surface p-1"
        itemClassName="flex-1 rounded-[9px] px-1 py-2.5 text-[12px]"
      />

      <div className="grid grid-cols-2 gap-2.5">
        <ShortcutTile name="Section tests" meta="One section or module" icon="section" to={paths.sectionTests} />
        <ShortcutTile name="Reports" meta={`${testReports.length} completed`} icon="reports" to={paths.reports} />
      </div>

      {testCatalog
        .filter((test) => matchesFilter(test, filter))
        .map((test) => (
          <TestCard key={test.name} test={test} />
        ))}
    </div>
  );
}

function TestCard({ test }: { test: CatalogTest }) {
  const isCompleted = test.status === "COMPLETED";

  return (
    <Panel className="rounded-[18px] p-4.5">
      <div className="mb-2.25 flex flex-wrap items-center gap-2">
        <span
          className={cn("rounded-[7px] px-2.5 py-1 text-[10.5px] font-extrabold tracking-[0.5px]", statusClasses[test.status])}
        >
          {test.status}
        </span>
        <span className="text-[12px] font-semibold text-muted-2">{test.meta}</span>
      </div>
      <h2 className="mb-3 text-[18px] font-extrabold tracking-[-0.5px]">{test.name}</h2>

      {test.result && (
        <div className="mb-3 flex items-center gap-3.5 rounded-[14px] border border-border bg-surface-2 p-3.25">
          <div className="text-[28px] font-extrabold tracking-[-1px]">{test.result.score}</div>
          <div className="min-w-0 flex-1 text-[12.5px] leading-[1.4] font-semibold text-muted">{test.result.split}</div>
          <span className="rounded-[7px] bg-tint-green px-2.25 py-1 text-[11.5px] font-extrabold text-on-green">
            {test.result.delta}
          </span>
        </div>
      )}

      <ButtonLink
        href={isCompleted ? paths.report(testReports[0].id) : paths.exam}
        tone={isCompleted ? "soft" : "brand"}
        className="w-full rounded-[14px] p-3.5 text-[14px] font-extrabold"
      >
        {test.cta}
      </ButtonLink>
    </Panel>
  );
}
