import { useState } from "react";

import { paths } from "@/app/paths";
import { MobileEyebrow } from "@/components/mobile/MobileEyebrow";
import { ButtonLink } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { radarAxes } from "@/data/home";
import type { Subject } from "@/data/types";

/* Geometry of the 300×250 radar (same numbers as the design). */
const CENTER = { x: 150, y: 143 };
const RADIUS = 100;
const LABEL_RADIUS = 130;
const OUTER_PENTAGON = "150,42 260,122 217,244 83,244 40,122";
const INNER_PENTAGON = "150,90 210,134 186,200 114,200 90,134";

const subjectColors: Record<Subject, { stroke: string; fill: string }> = {
  rw: { stroke: "#009ADA", fill: "rgba(0,154,218,.2)" },
  math: { stroke: "#22C55E", fill: "rgba(34,197,94,.2)" },
};

/** Point on axis `index` (of 5, clockwise from the top) at `distance` from the centre. */
function axisPoint(index: number, distance: number) {
  const angle = ((-90 + index * 72) * Math.PI) / 180;
  return {
    x: CENTER.x + Math.cos(angle) * distance,
    y: CENTER.y + Math.sin(angle) * distance,
  };
}

/** Five-skill radar with an R&W / Math switch. */
export function MobileRadarCard() {
  const [subject, setSubject] = useState<Subject>("rw");
  const axes = radarAxes[subject];
  const colors = subjectColors[subject];
  const points = axes.map((axis, index) => axisPoint(index, (RADIUS * axis.percent) / 100));

  return (
    <Panel className="rounded-[20px] p-4.5">
      <div className="mb-1.5 flex items-center justify-between gap-2.5">
        <MobileEyebrow className="text-[11.5px]">PROGRESS RADAR</MobileEyebrow>
        <SegmentedControl
          aria-label="Radar subject"
          tone="soft"
          options={[
            { id: "rw", label: "R&W" },
            { id: "math", label: "MATH" },
          ]}
          value={subject}
          onChange={setSubject}
          className="gap-0 rounded-full bg-surface-3 p-0.75"
          itemClassName="rounded-full px-3 py-1.25 text-[11px]"
        />
      </div>

      <div className="relative pt-6.5 pb-5.5">
        <svg viewBox="0 0 300 250" className="block h-auto w-full" aria-hidden="true">
          <polygon points={OUTER_PENTAGON} fill="var(--surface-3)" opacity=".55" />
          <polygon points={INNER_PENTAGON} fill="none" stroke="var(--border-2)" strokeWidth="1.4" />
          <polygon
            points={points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")}
            fill={colors.fill}
            stroke={colors.stroke}
            strokeWidth="3.4"
            strokeLinejoin="round"
          />
          {points.map((p, index) => (
            <circle key={index} cx={p.x.toFixed(1)} cy={p.y.toFixed(1)} r="5" fill={colors.stroke} />
          ))}
        </svg>
        {axes.map((axis, index) => {
          const label = axisPoint(index, LABEL_RADIUS);
          // Keep labels inside the card: clamp horizontally, squeeze vertically into the padded box.
          const left = Math.max(17, Math.min(83, (label.x / 300) * 100));
          const top = 10 + (Math.max(0, Math.min(250, label.y)) / 250) * 78;
          return (
            <div
              key={axis.skill}
              className="pointer-events-none absolute w-22.5 -translate-1/2 text-center"
              style={{ left: `${left.toFixed(1)}%`, top: `${top.toFixed(1)}%` }}
            >
              <div className="text-[10.5px] leading-[1.25] font-bold text-muted">{axis.short ?? axis.skill}</div>
              <div className="text-[11.5px] font-extrabold" style={{ color: colors.stroke }}>
                {axis.percent}%
              </div>
            </div>
          );
        })}
      </div>

      <ButtonLink
        href={paths.rush}
        tone="outline"
        className="w-full rounded-xl p-3 text-[11.5px] font-extrabold tracking-[0.7px] hover:bg-surface"
      >
        PRACTICE WEAKEST SKILL
      </ButtonLink>
    </Panel>
  );
}
