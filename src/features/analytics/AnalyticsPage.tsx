import { cn, Link, Tooltip } from "@heroui/react";
import { useState } from "react";

import { paths } from "@/app/paths";
import { DonutRing } from "@/components/ui/DonutRing";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon3D } from "@/components/ui/Icon3D";
import { PageTitle } from "@/components/ui/PageTitle";
import { Panel } from "@/components/ui/Panel";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import {
  type AnalyticsScope,
  analyticsSummary,
  heatmap,
  heatScale,
  type HeatTile,
  kpiTiles,
  type QuadrantDot,
  quadrants,
  scopeHeadlines,
  TIME_SHARE_SEGMENTS,
  timeShare,
} from "@/data/analytics";
import { conicSegments } from "@/lib/charts";

import { heatStyle, kpiStyles } from "./analyticsStyles";

type HeatFilter = "rw" | "math" | "all";

export function AnalyticsPage() {
  const [scope, setScope] = useState<AnalyticsScope>("all");

  return (
    <div className="max-w-[1420px] px-9 pt-7.5 pb-20">
      <PageTitle icon={<Icon3D icon="analytics" size={38} />} className="mb-6">
        Analytics
      </PageTitle>

      <div className="mb-4.5 flex flex-wrap items-start justify-between gap-4.5">
        <div>
          <h2 className="text-[30px] leading-[1.15] font-extrabold tracking-[-1px]">{scopeHeadlines[scope]}</h2>
          <div className="mt-1 text-[15px] font-semibold text-muted">{analyticsSummary}</div>
        </div>
        <SegmentedControl
          aria-label="Subject scope"
          options={[
            { id: "all", label: "ALL" },
            { id: "rw", label: "READING & WRITING" },
            { id: "math", label: "MATH" },
          ]}
          value={scope}
          onChange={setScope}
          className="flex-wrap rounded-[14px] border border-border bg-surface p-1.25"
          itemClassName="rounded-[10px] px-4 py-2.5 text-[11.5px] tracking-[.7px]"
        />
      </div>

      <div className="mb-7.5 grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-3.5">
        {kpiTiles.map((tile) => {
          const style = kpiStyles[tile.variant];
          return (
            <div key={tile.label} className={cn("rounded-2xl border px-5 py-4.5", style.card)}>
              <div className={cn("mb-1.5 text-[11px] font-extrabold tracking-[1px]", style.label)}>{tile.label}</div>
              <div className={cn("text-[32px] leading-[1.05] font-extrabold tracking-[-1px]", style.value)}>{tile.value}</div>
              <div className={cn("mt-1.5 text-[13px] font-semibold", style.sub)}>{tile.sub}</div>
            </div>
          );
        })}
      </div>

      <SkillHeatmap />
      <ConfidenceQuadrants />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-5">
        {timeShare.map((subject) => (
          <Panel key={subject.subject} className="p-6.5">
            <h3 className="text-[23px] font-extrabold tracking-[-0.5px]">{subject.subject}</h3>
            <div className="mt-0.5 mb-5.5 text-[14.5px] font-medium text-muted">
              Time share by difficulty · grey averages are platform-wide.
            </div>
            <div className="flex flex-wrap items-center gap-6.5">
              <DonutRing
                size={150}
                holeSize={104}
                gradient={conicSegments(
                  subject.rows.map((row, i) => ({
                    color: row.color,
                    percent: TIME_SHARE_SEGMENTS[i],
                  })),
                )}
              >
                <div className="text-[21px] font-extrabold tracking-[-0.5px]">{subject.total}</div>
                <div className="text-[11px] font-semibold text-muted-2">total</div>
              </DonutRing>
              <div className="flex min-w-42.5 flex-1 flex-col gap-3.5">
                {subject.rows.map((row) => (
                  <div key={row.label} className="flex items-center gap-2.75">
                    <span className="size-2.75 flex-none rounded-full" style={{ background: row.color }} />
                    <span className="flex-1 text-[15px] font-bold">{row.label}</span>
                    <span className="text-right">
                      <span className="block text-[17px] font-extrabold tracking-[-0.3px]">{row.you}</span>
                      <span className="block text-[12px] font-semibold text-muted-2">avg {row.average}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/** Tile colour bands, weak → strong. Middle bands use dark text for contrast. */

function SkillHeatmap() {
  const [filter, setFilter] = useState<HeatFilter>("rw");
  const tiles = heatmap.filter(
    (tile) => filter === "all" || (filter === "rw" ? tile.subject === "R&W" : tile.subject === "Math"),
  );

  return (
    <Panel className="mb-6.5 rounded-[18px] p-6.5">
      <div className="mb-1.5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <Eyebrow className="text-[13px]">SKILL HEATMAP</Eyebrow>
          <div className="mt-1.5 text-[15px] font-semibold text-muted">
            Accuracy and average time per question — tap a tile to drill it
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="text-[11px] font-extrabold tracking-[1px] text-muted-2">WEAK</span>
            {heatScale.map((color) => (
              <span key={color} className="h-3 w-5 rounded" style={{ background: color }} />
            ))}
            <span className="text-[11px] font-extrabold tracking-[1px] text-muted-2">STRONG</span>
          </div>
          <SegmentedControl
            aria-label="Heatmap subject"
            options={[
              { id: "rw", label: "Reading & Writing" },
              { id: "math", label: "Math" },
              { id: "all", label: "Both" },
            ]}
            value={filter}
            onChange={setFilter}
            className="rounded-xl bg-surface-3 p-1"
            itemClassName="px-3.5 py-2.25 text-[11.5px] tracking-[.5px]"
          />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-4">
        {tiles.map((tile) => (
          <HeatmapTile key={tile.skill} tile={tile} />
        ))}
      </div>
    </Panel>
  );
}

function HeatmapTile({ tile }: { tile: HeatTile }) {
  const { background, dark } = heatStyle(tile.accuracy);
  const text = dark ? "text-[#2A3300]" : "text-white";
  const subText = dark ? "text-[rgba(20,30,0,.6)]" : "text-white/75";

  return (
    <Link
      href={paths.rushSession}
      className="flex min-h-37.5 w-auto flex-col items-stretch rounded-2xl p-4.5 no-underline transition-transform hover:-translate-y-0.5"
      style={{ background }}
    >
      <div className={cn("mb-2 text-[11px] font-extrabold tracking-[1.1px]", subText)}>{tile.subject}</div>
      <div className={cn("text-[19px] leading-[1.25] font-extrabold tracking-[-0.3px]", text)}>{tile.skill}</div>
      <div className="mt-auto flex items-baseline justify-between gap-2.5 pt-4">
        <span className={cn("text-[32px] font-extrabold tracking-[-1px]", text)}>{tile.accuracy}%</span>
        <span className={cn("text-[14px] font-bold", subText)}>{tile.avgTime}</span>
      </div>
    </Link>
  );
}

function ConfidenceQuadrants() {
  return (
    <Panel className="mb-6.5 p-6.5">
      <h3 className="mb-1.5 text-[24px] font-extrabold tracking-[-0.6px]">Confidence quadrant</h3>
      <div className="mb-6 text-[14.5px] font-medium text-muted">
        Time percentile against SATbridge users on the x-axis; correct answers on top. One chart per subject — hover a dot to see
        the topic.
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-7.5">
        {quadrants.map((quadrant) => (
          <div key={quadrant.subject}>
            <div className="mb-3.5 text-center text-[17px] font-bold">{quadrant.subject}</div>
            <div className="relative">
              <svg
                viewBox="0 0 300 300"
                className="h-auto w-full"
                role="img"
                aria-label={`${quadrant.subject} confidence quadrant`}
              >
                <rect x="20" y="10" width="130" height="140" fill="var(--tint-green)" />
                <rect x="150" y="10" width="130" height="140" fill="var(--tint-amber)" />
                <rect x="20" y="150" width="130" height="140" fill="var(--tint-red)" />
                <rect x="150" y="150" width="130" height="140" fill="var(--tint-violet)" />
                <QuadrantLabel x={30} y={30} color="#16A34A">
                  Proficient
                </QuadrantLabel>
                <QuadrantLabel x={160} y={30} color="var(--on-amber)">
                  Inefficient
                </QuadrantLabel>
                <QuadrantLabel x={30} y={283} color="#DC2626">
                  Careless
                </QuadrantLabel>
                <QuadrantLabel x={160} y={283} color="#7C3AED">
                  Struggling
                </QuadrantLabel>
                <line x1="150" y1="10" x2="150" y2="290" stroke="var(--border-3)" strokeWidth="1.5" strokeDasharray="5 5" />
                <line x1="20" y1="150" x2="280" y2="150" stroke="var(--border-3)" strokeWidth="1.5" strokeDasharray="5 5" />
                {quadrant.dots.map((dot) => (
                  <circle key={dot.topic} cx={dot.x} cy={dot.y} r="8" fill={dot.color} opacity=".85" />
                ))}
              </svg>
              {quadrant.dots.map((dot) => (
                <DotTooltip key={dot.topic} dot={dot} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function QuadrantLabel({ x, y, color, children }: { x: number; y: number; color: string; children: string }) {
  return (
    <text x={x} y={y} className="font-sans" fontSize="13" fontWeight="700" fill={color}>
      {children}
    </text>
  );
}

/** Invisible hover target over each dot that shows its topic (HeroUI Tooltip). */
function DotTooltip({ dot }: { dot: QuadrantDot }) {
  return (
    <Tooltip delay={0} closeDelay={0}>
      <Tooltip.Trigger
        aria-label={dot.topic}
        className="absolute size-[5.4%] -translate-1/2 cursor-default rounded-full"
        style={{
          left: `${(dot.x / 300) * 100}%`,
          top: `${(dot.y / 300) * 100}%`,
        }}
      />
      <Tooltip.Content className="rounded-lg bg-ink px-2.5 py-1.5 text-[12.5px] font-bold text-surface">
        {dot.topic}
      </Tooltip.Content>
    </Tooltip>
  );
}
