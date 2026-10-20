import { cn } from "@heroui/react";

import { paths } from "@/app/paths";
import { ChevronLeftIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import {
  ACTIVITY_COLORS,
  activityByMonth,
  dailyStudyBars,
  domainMastery,
  profile,
  profileScores,
  scoreAxisLabels,
  scoreHistoryPoints,
  studyTotals,
} from "@/data/community";

const MASTERY_PIPS = 8;

export function ProfilePage() {
  return (
    <div className="max-w-[1180px] md:px-9 md:pt-6.5 md:pb-20">
      {/* Phones use the header's back button instead. */}
      <ButtonLink href={paths.community} className="mb-4.5 gap-2.25 p-0 text-[15px] text-muted hover:text-accent max-md:hidden">
        <ChevronLeftIcon size={17} />
        Back to community
      </ButtonLink>

      <ProfileHero />
      <ScoreSummary />
      <ScoreHistory />
      <ActivityHeatmap />
      <StudyTime />
      <DomainMastery />
    </div>
  );
}

function ProfileHero() {
  return (
    <Panel className="relative mb-5.5 overflow-hidden rounded-[22px] px-5 py-8.5 md:px-7.5">
      <div className="absolute top-6.5 left-6.5 text-[13px] font-extrabold text-muted-2">{profile.summary}</div>
      <div className="absolute top-6.5 right-6.5 text-right">
        <div className="text-[26px] font-extrabold tracking-[-0.8px] text-success">{profile.scoreLift}</div>
        <div className="text-[12px] font-bold text-muted-2">score lift</div>
      </div>
      <div className="flex flex-col items-center gap-3 pt-8.5 pb-1.5 text-center">
        <div
          className="grid size-33 place-items-center rounded-full text-[38px] font-extrabold text-white"
          style={{
            background: "linear-gradient(140deg,#7BE3F5,#009ADA 55%,#E5308F)",
          }}
        >
          {profile.initials}
        </div>
        <h1 className="text-[30px] font-extrabold tracking-[-1px]">{profile.name}</h1>
        <div className="text-[15px] font-semibold text-muted">{profile.tagline}</div>
      </div>
    </Panel>
  );
}

function ScoreSummary() {
  return (
    <Panel className="mb-5.5 overflow-hidden rounded-[18px]">
      {/*
        Divider that works whether the two halves sit side by side or stack: every cell draws a
        top + left border and the grid is pulled 1px up/left, so only the borders *between* cells show.
      */}
      <div className="-mt-px -ml-px grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] *:border-t *:border-l *:border-border">
        <div className="px-6 py-5.5">
          <div className="mb-1.5 text-[14px] font-semibold text-muted">Total score</div>
          <div className="flex items-center gap-3">
            <div className="text-[48px] leading-none font-extrabold tracking-[-1.8px]">{profile.totalScore.value}</div>
            <span className="rounded-[7px] bg-[#FFF06A] px-2.5 py-1.25 text-[13px] font-extrabold text-[#3D3800]">
              {profile.totalScore.delta}
            </span>
          </div>
          <div className="mt-1 text-[13.5px] font-semibold text-muted-2">{profile.totalScore.range}</div>
          <div className="mt-5 flex gap-6.5">
            {profile.sectionScores.map((section) => (
              <div key={section.label}>
                <div className="text-[13.5px] font-semibold text-muted">{section.label}</div>
                <div className="flex items-baseline gap-1.75">
                  <span className="text-[26px] font-extrabold tracking-[-0.8px]">{section.value}</span>
                  <span className="text-[12px] font-extrabold text-success">{section.delta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-5.5">
          <StatGroup title="Last 24 hours" stats={profile.last24h} className="mb-5.5" />
          <StatGroup title="All time" stats={profile.allTime} />
        </div>
      </div>
    </Panel>
  );
}

type Stat = { value: string; label: string; highlight?: boolean };

function StatGroup({ title, stats, className }: { title: string; stats: Stat[]; className?: string }) {
  return (
    <>
      <div className="mb-3.5 text-[14px] font-semibold text-muted">{title}</div>
      <div className={cn("flex flex-wrap gap-6", className)}>
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className={cn("text-[26px] font-extrabold tracking-[-0.8px]", stat.highlight && "text-success")}>
              {stat.value}
            </div>
            <div className="text-[12.5px] font-semibold text-muted-2">{stat.label}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function ScoreHistory() {
  return (
    <Panel className="mb-5.5 rounded-[18px] p-6">
      <h2 className="mb-4.5 text-[20px] font-extrabold tracking-[-0.4px]">SAT scores</h2>
      <svg viewBox="0 0 700 200" className="h-auto w-full overflow-visible" role="img" aria-label="Estimated SAT score over time">
        {scoreAxisLabels.map((axis) => (
          <g key={axis.label}>
            <line x1="40" y1={axis.y} x2="690" y2={axis.y} stroke="var(--border)" strokeWidth="1" />
            <text
              x="34"
              y={axis.y + 4}
              textAnchor="end"
              className="font-sans"
              fontSize="11"
              fontWeight="700"
              fill="var(--muted-3)"
            >
              {axis.label}
            </text>
          </g>
        ))}
        <polyline points={scoreHistoryPoints} fill="none" stroke="var(--text)" strokeWidth="2.5" strokeLinejoin="round" />
        <text x="196" y="30" className="font-sans" fontSize="13" fontWeight="800" fill="#FFC93C">
          ✕
        </text>
        <text x="120" y="176" className="font-sans" fontSize="13" fontWeight="800" fill="#E5308F">
          ✕
        </text>
      </svg>
      <div className="mt-2 flex flex-wrap gap-5 text-[13px] font-bold text-muted">
        <span className="text-[#FFC93C]">✕ official practice</span>
        <span className="text-pink">✕ official SAT</span>
        <span>— SATbridge estimate</span>
      </div>
      <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3.5">
        {profileScores.map((score) => (
          <div key={score.name} className="rounded-[14px] border border-border bg-surface-2 p-4.5">
            <div className="text-[13.5px] font-semibold text-muted">{score.name}</div>
            <div className="mt-1 mb-0.5 flex items-baseline gap-2.5">
              <span className="text-[26px] font-extrabold tracking-[-0.8px]">{score.score}</span>
              <span className="text-[13.5px] font-semibold text-muted-2">{score.split}</span>
            </div>
            <div className="text-[12.5px] font-semibold text-muted-2">{score.date}</div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function ActivityHeatmap() {
  return (
    <Panel className="mb-5.5 rounded-[18px] p-6">
      <h2 className="mb-1.5 text-[20px] font-extrabold tracking-[-0.4px]">Activity</h2>
      <div className="mb-5 text-[14px] font-medium text-muted">Questions answered per day.</div>
      <div className="flex flex-wrap gap-4.5">
        {activityByMonth.map(({ month, levels }) => (
          <div key={month}>
            <div className="mb-2 text-[12.5px] font-semibold text-muted-2">{month}</div>
            <div className="grid grid-cols-[repeat(5,10px)] gap-1">
              {levels.map((level, day) => (
                <div key={day} className="size-2.5 rounded-[3px]" style={{ background: ACTIVITY_COLORS[level] }} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-end gap-2 text-[12px] font-semibold text-muted-2">
        Less
        {ACTIVITY_COLORS.map((color) => (
          <span key={color} className="size-2.5 rounded-[3px]" style={{ background: color }} />
        ))}
        More
      </div>
    </Panel>
  );
}

function StudyTime() {
  return (
    <Panel className="mb-5.5 rounded-[18px] p-6">
      <div className="mb-5.5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-4.5">
        {studyTotals.map((total) => (
          <div key={total.label}>
            <div className="text-[14px] font-semibold text-muted">{total.label}</div>
            <div className="text-[28px] font-extrabold tracking-[-1px]">{total.value}</div>
          </div>
        ))}
      </div>
      <div className="flex h-32.5 items-end gap-1.25">
        {dailyStudyBars.map((height, index) => (
          <div key={index} className="flex-1 rounded-[4px_4px_2px_2px] bg-ink opacity-85" style={{ height: `${height}%` }} />
        ))}
      </div>
      <div className="mt-2.5 text-[13px] font-medium text-muted-2">Minutes studied per day, last 34 days.</div>
    </Panel>
  );
}

function DomainMastery() {
  return (
    <Panel className="rounded-[18px] p-6">
      <h2 className="mb-5 text-[20px] font-extrabold tracking-[-0.4px]">Mastery by domain</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-6.5">
        {domainMastery.map((domain) => {
          const filledPips = Math.round((domain.mastery / 100) * MASTERY_PIPS);
          return (
            <div key={domain.name}>
              <div className="mb-1.5 text-[16.5px] font-bold">{domain.name}</div>
              <div className="mb-2.5 flex gap-4.5 text-[13.5px] font-semibold text-muted">
                <span>Questions: {domain.questions}</span>
                <span>Avg time: {domain.avgTime}</span>
              </div>
              <div className="mb-2.5 flex gap-1.5">
                {Array.from({ length: MASTERY_PIPS }, (_, pip) => (
                  <div key={pip} className={cn("h-2.25 flex-1 rounded-[5px]", pip < filledPips ? "bg-ink" : "bg-border")} />
                ))}
              </div>
              <div className="flex gap-4.5 text-[13px] font-semibold text-muted-2">
                <span>Performance: {domain.performance}</span>
                <span>Mastery: {domain.mastery}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}
