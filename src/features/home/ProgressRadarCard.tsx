import { useState } from "react";

import { paths } from "@/app/paths";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Panel } from "@/components/ui/Panel";
import { ProgressTrack } from "@/components/ui/ProgressTrack";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { radarAxes, radarBars, type SkillScore } from "@/data/home";
import type { Subject } from "@/data/types";

/* Radar geometry, in the SVG's 300×250 viewBox. */
const VIEW_WIDTH = 300;
const VIEW_HEIGHT = 250;
const CENTER = { x: 150, y: 143 };
const RADIUS = 100;
const LABEL_OFFSET = 30;

const subjectColor: Record<Subject, { stroke: string; fill: string }> = {
  rw: { stroke: "#009ADA", fill: "rgba(0,154,218,.2)" },
  math: { stroke: "#22C55E", fill: "rgba(34,197,94,.2)" },
};

/** Point on axis `index` (5 axes, starting at the top) at `distance` from the centre. */
function radarPoint(index: number, distance: number) {
  const angle = ((-90 + index * 72) * Math.PI) / 180;
  return {
    x: CENTER.x + Math.cos(angle) * distance,
    y: CENTER.y + Math.sin(angle) * distance,
  };
}

/** Bar colour by score band. */
function scoreColor(percent: number) {
  if (percent >= 80) return "#22C55E";
  if (percent >= 60) return "#009ADA";
  if (percent >= 40) return "#F59E0B";
  return "#EF4444";
}

export function ProgressRadarCard() {
  const [subject, setSubject] = useState<Subject>("rw");
  const axes = radarAxes[subject];
  const color = subjectColor[subject];

  const points = axes.map((axis, i) => radarPoint(i, (RADIUS * axis.percent) / 100));
  const polygon = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

  return (
    <Panel className="p-5.5">
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <Eyebrow className="text-[11.5px] font-bold tracking-[1.1px]">PROGRESS RADAR</Eyebrow>
        <SegmentedControl
          aria-label="Radar subject"
          tone="raised"
          options={[
            { id: "rw", label: "R&W" },
            { id: "math", label: "MATH" },
          ]}
          value={subject}
          onChange={setSubject}
          className="gap-0 rounded-full bg-surface-3 p-1"
          itemClassName="rounded-full px-3.5 py-1.5 text-[11.5px] tracking-[.5px] text-muted-2 data-[selected=true]:text-accent data-[selected=true]:shadow-[0_1px_3px_rgba(15,36,48,.16)]"
        />
      </div>

      <div className="relative w-full pt-8.5 pb-7.5">
        <svg viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} className="block h-auto w-full" role="img" aria-label="Skill radar">
          <polygon points="150,42 260,122 217,244 83,244 40,122" fill="var(--surface-3)" opacity=".55" />
          <polygon points="150,74 227,130 197,215 103,215 73,130" fill="none" stroke="var(--border-2)" strokeWidth="1.5" />
          <polygon points="150,106 194,138 177,186 123,186 106,138" fill="none" stroke="var(--border-2)" strokeWidth="1.5" />
          <polygon points={polygon} fill={color.fill} stroke={color.stroke} strokeWidth="3.5" strokeLinejoin="round" />
          {points.map((p, i) => (
            <circle key={i} cx={p.x.toFixed(1)} cy={p.y.toFixed(1)} r="5" fill={color.stroke} />
          ))}
        </svg>
        {axes.map((axis, i) => (
          <RadarLabel key={axis.skill} axis={axis} index={i} color={color.stroke} />
        ))}
      </div>

      <div className="mt-3.5 mb-4 h-px bg-border" />

      <div className="flex flex-col gap-3">
        {radarBars[subject].map((bar) => {
          const barColor = scoreColor(bar.percent);
          return (
            <div key={bar.skill}>
              <div className="mb-1.5 flex items-baseline justify-between gap-2">
                <span className="text-[14.5px] font-bold">{bar.skill}</span>
                <span className="text-[14px] font-extrabold" style={{ color: barColor }}>
                  {bar.percent}%
                </span>
              </div>
              <ProgressTrack
                aria-label={bar.skill}
                value={bar.percent}
                color={barColor}
                className="h-2.25 rounded-md bg-surface-3"
                fillClassName="duration-350"
              />
            </div>
          );
        })}
      </div>

      <ButtonLink
        href={paths.rush}
        tone="outline"
        className="mt-4.5 w-full rounded-xl p-3.25 text-[12px] font-extrabold tracking-[.8px]"
      >
        PRACTICE WEAKEST SKILL
      </ButtonLink>
    </Panel>
  );
}

/** Axis label placed over the SVG in % so it scales with the card. */
function RadarLabel({ axis, index, color }: { axis: SkillScore; index: number; color: string }) {
  const { x, y } = radarPoint(index, RADIUS + LABEL_OFFSET);
  const left = Math.max(19, Math.min(81, (x / VIEW_WIDTH) * 100));
  const top = 12 + (Math.max(0, Math.min(VIEW_HEIGHT, y)) / VIEW_HEIGHT) * 76;

  return (
    <div
      className="pointer-events-none absolute w-26 -translate-x-1/2 -translate-y-1/2 text-center"
      style={{ left: `${left.toFixed(1)}%`, top: `${top.toFixed(1)}%` }}
    >
      <div className="text-[12px] leading-[1.25] font-bold text-muted">{axis.skill}</div>
      <div className="text-[13px] font-extrabold" style={{ color }}>
        {axis.percent}%
      </div>
    </div>
  );
}
