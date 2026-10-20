import { cn, Link } from "@heroui/react";
import { useState } from "react";

import { paths } from "@/app/paths";
import { MobileEyebrow } from "@/components/mobile/MobileEyebrow";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { analyticsSummaryShort, heatmap, type HeatTile, kpiTiles, scopeHeadlines } from "@/data/analytics";

import { heatStyle, kpiStyles } from "../analyticsStyles";

type HeatSubject = HeatTile["subject"];

/** Tiles shown on phones (the fifth, "projected", is desktop only). */
const MOBILE_KPI_COUNT = 4;

/** Analytics on phones: headline, KPI tiles and the skill heatmap. */
export function AnalyticsMobile() {
  const [subject, setSubject] = useState<HeatSubject>("R&W");

  return (
    <div className="flex animate-fade flex-col gap-3.5">
      <h2 className="text-[24px] leading-[1.2] font-extrabold tracking-[-0.8px]">{scopeHeadlines.all}</h2>
      <div className="text-[13px] font-semibold text-muted">{analyticsSummaryShort}</div>

      <div className="grid grid-cols-2 gap-2.5">
        {kpiTiles.slice(0, MOBILE_KPI_COUNT).map((tile) => {
          const style = kpiStyles[tile.variant];
          return (
            <div key={tile.label} className={cn("rounded-2xl border p-3.75", style.card)}>
              <div className={cn("mb-1.25 text-[10px] font-extrabold tracking-[0.9px]", style.label)}>
                {tile.shortLabel ?? tile.label}
              </div>
              <div className={cn("text-[25px] font-extrabold tracking-[-0.8px]", style.value)}>{tile.value}</div>
              <div className={cn("mt-0.75 text-[11px] font-semibold", style.sub)}>{tile.shortSub ?? tile.sub}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-1 flex items-center justify-between gap-2.5">
        <MobileEyebrow>SKILL HEATMAP</MobileEyebrow>
        <SegmentedControl
          aria-label="Heatmap subject"
          options={[
            { id: "R&W", label: "R&W" },
            { id: "Math", label: "Math" },
          ]}
          value={subject}
          onChange={setSubject}
          className="gap-0.75 rounded-[10px] bg-surface-3 p-0.75"
          itemClassName="rounded-lg px-3 py-1.75 text-[11px]"
        />
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {heatmap
          .filter((tile) => tile.subject === subject)
          .map((tile) => {
            const { background, dark } = heatStyle(tile.accuracy);
            return (
              <Link
                key={tile.skill}
                href={paths.rushSession}
                className="flex min-h-29.5 w-full flex-col items-stretch rounded-[15px] p-3.75 font-normal no-underline"
                style={{ background }}
              >
                <div className={cn("text-[14.5px] leading-[1.25] font-extrabold", dark ? "text-[#2A3300]" : "text-white")}>
                  {tile.short ?? tile.skill}
                </div>
                <div className="mt-auto flex items-baseline justify-between gap-2 pt-3">
                  <span className={cn("text-[24px] font-extrabold tracking-[-0.8px]", dark ? "text-[#2A3300]" : "text-white")}>
                    {tile.accuracy}%
                  </span>
                  <span className={cn("text-[12px] font-bold", dark ? "text-[rgba(20,30,0,.62)]" : "text-white/78")}>
                    {tile.avgTime}
                  </span>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
