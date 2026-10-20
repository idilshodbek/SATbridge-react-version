import { cn, Link, Tooltip } from "@heroui/react";

import { paths } from "@/app/paths";
import { ArrowUpRightIcon, ChartIcon, ChevronRightIcon, TargetIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HelpHint } from "@/components/ui/HelpHint";
import { Icon3D } from "@/components/ui/Icon3D";
import { interactiveCard } from "@/components/ui/interactive";

import { PageTitle } from "@/components/ui/PageTitle";
import { Panel } from "@/components/ui/Panel";
import { ProgressTrack } from "@/components/ui/ProgressTrack";
import { pointGains, prediction, predictionHistory, predictionMethod } from "@/data/progress";
import { testReports } from "@/data/tests";

const MIN_SCORE = 400;

/** Predicted score: today's estimate with its range, how it moved, and what would raise it most. */
export function PredictedScorePage() {
  const gap = prediction.target - prediction.total;
  const toGoal = ((prediction.total - MIN_SCORE) / (prediction.target - MIN_SCORE)) * 100;

  return (
    <div className="max-w-[1420px] md:px-9 md:pt-7.5 md:pb-17.5">
      <div className="mb-5.5 flex flex-wrap items-center justify-between gap-4 max-md:hidden">
        <PageTitle icon={<Icon3D icon="predicted-score" size={38} />}>Predicted score</PageTitle>
        <ButtonLink href={paths.analytics} tone="outline" className="gap-2 px-5 py-3 text-[14px]">
          <ChartIcon size={17} />
          Full analytics
        </ButtonLink>
      </div>

      <div className="mb-5 flex flex-wrap items-stretch gap-5">
        <div className="relative min-w-[min(100%,420px)] flex-[1_1_520px] overflow-hidden rounded-[22px] bg-ink-surface p-6 md:p-7">
          <div
            aria-hidden="true"
            className="absolute -top-14 -right-12 size-64 rounded-full bg-[radial-gradient(circle,rgba(0,154,218,.5),transparent_68%)]"
          />
          <div className="relative">
            <div className="flex items-center gap-2 text-[12px] font-extrabold tracking-[1.2px] text-[#7FA0B1]">
              <TargetIcon size={15} />
              IF YOU TOOK THE SAT TODAY
            </div>
            <div className="mt-2 flex flex-wrap items-end gap-x-4 gap-y-1">
              <span className="text-[64px] leading-none font-extrabold tracking-[-2.5px] text-white md:text-[76px]">
                {prediction.total}
              </span>
              <span className="mb-2 rounded-lg bg-[rgba(34,197,94,.22)] px-2.5 py-1 text-[13px] font-extrabold text-[#7BE3A6]">
                {prediction.weeklyChange} this week
              </span>
            </div>
            <div className="mt-1 flex items-center gap-2 text-[14.5px] font-semibold text-[#93B4C4]">
              Likely range {prediction.low}–{prediction.high} · {prediction.confidence} confidence
              <HelpHint title="Likely range" className="bg-white/15 text-white hover:bg-white/25 hover:text-white">
                On test day you would most likely land inside this range. It narrows as you complete more timed sections, because
                the prediction has more of your real pacing to go on.
              </HelpHint>
            </div>
            <div className="mt-1 text-[12.5px] font-semibold text-[#7FA0B1]">Based on {prediction.basis}</div>

            <div className="mt-6">
              <div className="mb-2 flex justify-between text-[12.5px] font-bold text-[#93B4C4]">
                <span>
                  {gap} points to your {prediction.target} goal
                </span>
                <span>{Math.round(toGoal)}%</span>
              </div>
              <ProgressTrack aria-label="Progress to goal" value={toGoal} className="h-2.5 rounded-md bg-white/14" />
            </div>
          </div>
        </div>

        <div className="flex min-w-[min(100%,300px)] flex-[1_1_340px] flex-col gap-4">
          {prediction.sections.map((section) => (
            <Panel key={section.label} className="flex flex-1 items-center gap-4 rounded-[18px] p-5">
              <Icon3D icon={section.label === "Math" ? "math" : "reading"} size={44} />
              <div className="min-w-0 flex-1">
                <div className="text-[13.5px] font-semibold text-muted">{section.label}</div>
                <div className="text-[30px] leading-none font-extrabold tracking-[-1px]">{section.score}</div>
                <div className="mt-1 text-[12.5px] font-semibold text-muted-2">
                  range {section.low}–{section.high}
                </div>
              </div>
              <span className="rounded-lg bg-tint-green px-2.5 py-1 text-[12.5px] font-extrabold text-on-green">
                {section.change}
              </span>
            </Panel>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-start gap-5">
        <div className="flex min-w-[min(100%,420px)] flex-[1_1_520px] flex-col gap-5">
          <Panel className="rounded-[18px] p-5 md:p-6">
            <Eyebrow className="mb-4">PREDICTED SCORE BY WEEK</Eyebrow>
            <ScoreTrend />
          </Panel>

          <Panel className="rounded-[18px] p-5 md:p-6">
            <div className="mb-1 flex items-center gap-2.5">
              <Icon3D icon="gains" size={30} />
              <h2 className="text-[19px] font-extrabold tracking-[-0.4px]">Where your next points are</h2>
            </div>
            <div className="mb-4 text-[13.5px] font-medium text-muted">Points gained if each skill reached 80% accuracy.</div>
            <div className="flex flex-col gap-2">
              {pointGains.map((gain) => (
                <Link
                  key={gain.skill}
                  href={paths.rushSession}
                  className={cn(
                    interactiveCard,
                    "flex w-full items-center gap-3.5 rounded-xl border border-border bg-surface-2 px-3.5 py-3 font-normal text-ink no-underline",
                  )}
                >
                  <span className="w-14 flex-none text-[18px] font-extrabold text-success-ink">+{gain.points}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-bold">{gain.skill}</span>
                    <span className="block text-[12.5px] font-semibold text-muted-2">
                      {gain.subject} · {gain.accuracy}% accuracy now
                    </span>
                  </span>
                  <span className="flex items-center gap-1 text-[13px] font-bold text-accent">
                    Practice
                    <ChevronRightIcon size={13} />
                  </span>
                </Link>
              ))}
            </div>
          </Panel>
        </div>

        <div className="flex w-85 max-w-full flex-[1_1_300px] flex-col gap-4 md:max-w-95">
          <Panel className="rounded-[18px] p-5.5">
            <Eyebrow className="mb-3">BUILT FROM</Eyebrow>
            <div className="flex flex-col gap-1">
              {testReports.map((report) => (
                <Link
                  key={report.id}
                  href={paths.report(report.id)}
                  className="flex w-full items-center gap-3 rounded-xl px-2 py-2.5 font-normal text-ink no-underline hover:bg-surface-2"
                >
                  <Icon3D icon={report.kind === "Full-length" ? "full-length" : "section"} size={30} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-bold">{report.name}</span>
                    <span className="block text-[12px] font-semibold text-muted-2">{report.date}</span>
                  </span>
                  <span className="text-[15px] font-extrabold">{report.total}</span>
                </Link>
              ))}
            </div>
            <ButtonLink href={paths.analytics} className="mt-2 gap-1.5 px-2 py-1 text-[13.5px] text-accent md:hidden">
              Full analytics
              <ArrowUpRightIcon size={14} />
            </ButtonLink>
          </Panel>

          <Panel className="rounded-[18px] p-5.5">
            <div className="mb-3 flex items-center gap-2.5">
              <Icon3D icon="info" size={28} />
              <Eyebrow>HOW WE PREDICT</Eyebrow>
            </div>
            <ul className="flex flex-col gap-2.5">
              {predictionMethod.map((line) => (
                <li key={line} className="text-[13.5px] leading-[1.55] font-medium text-ink-2">
                  {line}
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}

/** Line chart of the weekly predicted total (SVG, scales with its container). */
function ScoreTrend() {
  const width = 600;
  const height = 200;
  const pad = { left: 44, right: 16, top: 16, bottom: 28 };
  const low = 1000;
  const high = 1400;
  const x = (i: number) => pad.left + (i / (predictionHistory.length - 1)) * (width - pad.left - pad.right);
  const y = (score: number) => pad.top + (1 - (score - low) / (high - low)) * (height - pad.top - pad.bottom);
  const points = predictionHistory.map((p, i) => `${x(i)},${y(p.score)}`).join(" ");
  const area = `${pad.left},${height - pad.bottom} ${points} ${x(predictionHistory.length - 1)},${height - pad.bottom}`;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="Predicted score by week">
        <defs>
          <linearGradient id="trend-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#009ADA" stopOpacity=".25" />
            <stop offset="100%" stopColor="#009ADA" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[1000, 1100, 1200, 1300, 1400].map((score) => (
          <g key={score}>
            <line x1={pad.left} x2={width - pad.right} y1={y(score)} y2={y(score)} stroke="var(--border)" />
            <text
              x={pad.left - 8}
              y={y(score) + 4}
              textAnchor="end"
              fontSize="11"
              fontWeight="700"
              fill="var(--muted-3)"
              className="font-sans"
            >
              {score}
            </text>
          </g>
        ))}
        <polygon points={area} fill="url(#trend-fill)" />
        <polyline points={points} fill="none" stroke="#009ADA" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        {predictionHistory.map((p, i) => (
          <g key={p.week}>
            <circle cx={x(i)} cy={y(p.score)} r="4.5" fill="var(--surface)" stroke="#009ADA" strokeWidth="2.5" />
            <text
              x={x(i)}
              y={height - 8}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="var(--muted-2)"
              className="font-sans"
            >
              {p.week}
            </text>
          </g>
        ))}
      </svg>
      {/* Hover / focus targets over each point: the score for that week. */}
      {predictionHistory.map((p, i) => (
        <Tooltip key={p.week} delay={0} closeDelay={0}>
          <Tooltip.Trigger
            aria-label={`${p.week}: ${p.score}`}
            className="absolute size-[4.5%] -translate-1/2 cursor-default rounded-full"
            style={{
              left: `${(x(i) / width) * 100}%`,
              top: `${(y(p.score) / height) * 100}%`,
            }}
          />
          <Tooltip.Content placement="top" className="rounded-lg bg-ink px-2.5 py-1.5 text-[12.5px] font-bold text-surface">
            {p.week} · {p.score}
          </Tooltip.Content>
        </Tooltip>
      ))}
    </div>
  );
}
