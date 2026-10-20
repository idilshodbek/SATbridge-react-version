import { cn, Spinner, toast } from "@heroui/react";
import { type ReactNode, useState } from "react";
import { Navigate, useParams } from "react-router";

import { paths } from "@/app/paths";
import { ChevronLeftIcon, ChevronRightIcon, DownloadIcon } from "@/components/icons";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Icon3D } from "@/components/ui/Icon3D";
import { Panel } from "@/components/ui/Panel";
import { ProgressTrack } from "@/components/ui/ProgressTrack";
import { type StatItem, StatStrip } from "@/components/ui/StatStrip";
import { accuracyComparison, type ModuleResult, moduleResults, reportById, type TestReport } from "@/data/tests";

/** Question totals across the report's modules. */
function moduleTotals(modules: ModuleResult[]) {
  const sum = (key: "questionCount" | "correct" | "wrong" | "omitted") => modules.reduce((total, m) => total + m[key], 0);
  const questions = sum("questionCount");
  const correct = sum("correct");
  return {
    questions,
    correct,
    wrong: sum("wrong"),
    omitted: sum("omitted"),
    accuracy: Math.round((correct / questions) * 100),
  };
}

function reportStats(totals: ReturnType<typeof moduleTotals>): StatItem[] {
  return [
    {
      label: "Correct",
      value: `${totals.correct}/${totals.questions}`,
      valueTone: "ink",
      ghost: "✓",
    },
    {
      label: "Wrong",
      value: `${totals.wrong}`,
      valueTone: "danger",
      ghost: "✕",
    },
    {
      label: "Accuracy",
      value: `${totals.accuracy}%`,
      valueTone: "success",
      ghost: "%",
    },
    {
      label: "Unattempted",
      value: `${totals.omitted}`,
      valueTone: "muted",
      ghost: "/",
    },
  ];
}

export function ReportPage() {
  const report = reportById(useParams().reportId);
  if (!report) return <Navigate to={paths.reports} replace />;
  return <Report report={report} />;
}

function Report({ report }: { report: TestReport }) {
  const [isExporting, setIsExporting] = useState(false);
  const download = () => {
    setIsExporting(true);
    window.setTimeout(() => {
      setIsExporting(false);
      toast.success("Report saved as PDF", {
        description: `${report.name} · ${report.date}`,
      });
    }, 1200);
  };
  const subjects = report.sections.map((section) => section.subject);
  const modules = moduleResults.filter((module) => subjects.includes(module.subject));
  const isFullTest = report.kind === "Full-length";
  const totals = moduleTotals(modules);

  return (
    <div className="max-w-[1420px] md:px-9 md:pt-6.5 md:pb-22.5">
      {/* Phones use the header's back button instead. */}
      <ButtonLink href={paths.reports} className="mb-5 gap-2.25 p-0 text-[15px] text-ink-2 hover:text-accent max-md:hidden">
        <ChevronLeftIcon size={17} />
        All reports
      </ButtonLink>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-5">
        <div className="flex gap-3.5">
          <Icon3D icon="reports" size={40} className="mt-0.5" />
          <div>
            <h1 className="text-[26px] leading-[1.15] font-extrabold tracking-[-1px] md:text-[34px]">{report.name}</h1>
            <div className="mt-0.5 text-[15px] font-semibold text-muted-2">{report.scope}</div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="text-[14.5px] font-semibold text-muted">Completed {report.date}</div>
          <Button tone="brand" isPending={isExporting} onPress={download} className="gap-2.25 px-5 py-2.75 text-[14px]">
            {isExporting ? <Spinner color="current" size="sm" /> : <DownloadIcon size={16} />}
            {isExporting ? "Preparing PDF…" : "Download report"}
          </Button>
        </div>
      </div>

      <SectionTitle icon={<Icon3D icon="analytics" size={30} />}>Overview</SectionTitle>

      <div className="mb-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,330px),1fr))] gap-5">
        <Panel className="p-6.5 text-center">
          <div className="mb-1 text-[15px] font-semibold text-muted">Total Score</div>
          <div className="text-[66px] leading-[1.05] font-extrabold tracking-[-2.5px]">{report.total}</div>
          <div className="mb-6.5 text-[14px] font-semibold text-muted-2">{isFullTest ? "400–1600" : "200–800"}</div>
          <div className="flex flex-wrap justify-center gap-6 text-left">
            {report.sections.map((section) => (
              <div key={section.label}>
                <div className="text-[14.5px] font-semibold text-muted">{section.label}</div>
                <div className="text-[34px] font-extrabold tracking-[-1px]">{section.score}</div>
                <div className="text-[13px] font-semibold text-muted-2">200–800</div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="px-6.5 pt-6.5 pb-4.5">
          <div className="mb-1.5 flex justify-center gap-11">
            <div className="text-[14.5px] font-bold text-accent">SATbridge avg</div>
            <div className="text-[14.5px] font-bold text-ink">You</div>
          </div>
          <ScoreDistribution report={report} />
          <div className="text-center text-[14.5px] font-semibold text-muted">
            You scored higher than <span className="font-extrabold text-ink">{report.percentile}%</span> of SATbridge students on
            this paper.
          </div>
        </Panel>
      </div>

      <StatStrip
        items={reportStats(totals)}
        minColumnWidth={200}
        className="mb-7.5"
        cellClassName="min-h-0 pb-6"
        ghostClassName="right-4 bottom-0.5 text-[66px]"
      />

      <div className="mb-9 grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-6.5">
        {modules.map((module) => (
          <ModuleGrid key={module.name} module={module} />
        ))}
      </div>

      <SectionTitle icon={<Icon3D icon="goal" size={30} />}>Accuracy</SectionTitle>
      <Panel className="mb-3.5 p-6.5">
        <h3 className="mb-1 text-[20px] font-extrabold tracking-[-0.4px]">Your score against the SATbridge average</h3>
        <div className="mb-5.5 text-[14.5px] font-medium text-muted">
          Percentage of questions answered correctly on this paper.
        </div>
        <div className="flex flex-col gap-4">
          <AccuracyBar label="Your score" percent={totals.accuracy} color="#009ADA" />
          <AccuracyBar label="SATbridge avg" percent={accuracyComparison.platform} color="var(--border-3)" muted />
        </div>
      </Panel>

      <ButtonLink
        href={paths.analytics}
        tone="outline"
        className="gap-2.25 px-5.5 py-3.25 text-[14.5px] max-md:w-full max-md:whitespace-normal"
      >
        See topic, pacing and confidence analysis
        <ChevronRightIcon size={15} />
      </ButtonLink>
    </div>
  );
}

function SectionTitle({ icon, children }: { icon: ReactNode; children: string }) {
  return (
    <div className="mb-3.5 flex items-center gap-2.75 text-ink">
      {icon}
      <h2 className="text-[25px] font-extrabold tracking-[-0.5px]">{children}</h2>
    </div>
  );
}

/** Bell curve comparing the platform average (blue) with the student (ink). */
function ScoreDistribution({ report }: { report: TestReport }) {
  return (
    <svg viewBox="0 0 360 190" className="h-auto w-full" role="img" aria-label="Score distribution">
      <path d="M10 170C70 170 80 40 180 40s110 130 170 130" fill="var(--tint-blue)" stroke="#66CFF5" strokeWidth="2.5" />
      <line x1="150" y1="24" x2="150" y2="170" stroke="#009ADA" strokeWidth="2" strokeDasharray="5 5" />
      <line x1="214" y1="24" x2="214" y2="170" stroke="var(--text)" strokeWidth="2" strokeDasharray="5 5" />
      <line x1="10" y1="170" x2="350" y2="170" stroke="var(--border)" strokeWidth="2" />
      <text x="214" y="188" textAnchor="middle" className="font-sans" fontSize="12" fontWeight="700" fill="var(--text)">
        {report.total}
      </text>
      <text x="150" y="188" textAnchor="middle" className="font-sans" fontSize="12" fontWeight="700" fill="#009ADA">
        {report.platformAverage}
      </text>
    </svg>
  );
}

/** Correct / wrong / omitted counts plus one square per question. */
function ModuleGrid({ module }: { module: ModuleResult }) {
  const cells = Array.from({ length: module.questionCount }, (_, i) => {
    if (i < module.correct) return "border-success-ink bg-tint-green";
    if (i < module.correct + module.wrong) return "border-danger-ink bg-tint-red";
    return "border-border bg-surface";
  });

  return (
    <div>
      <h3 className="mb-2.5 text-[19px] font-extrabold tracking-[-0.4px]">{module.name}</h3>
      <div className="mb-3.5 flex gap-5">
        <Count value={module.correct} label="correct" className="text-success-ink" />
        <Count value={module.wrong} label="incorrect" className="text-danger-ink" />
        <Count value={module.omitted} label="omitted" className="text-muted-2" />
      </div>
      <div className="grid max-w-62.5 grid-cols-7 gap-1.5">
        {cells.map((cellClass, i) => (
          <div key={i} className={cn("aspect-square rounded-[5px] border-[1.5px]", cellClass)} />
        ))}
      </div>
      <div className="mt-3 text-[13.5px] font-semibold text-muted-2">
        Avg <span className="font-bold text-success-ink">{module.avgTime}</span> / {module.targetTime}
      </div>
    </div>
  );
}

function Count({ value, label, className }: { value: number; label: string; className: string }) {
  return (
    <div className={className}>
      <div className="text-[17px] font-extrabold">{value}</div>
      <div className="text-[13px] font-semibold">{label}</div>
    </div>
  );
}

function AccuracyBar({ label, percent, color, muted }: { label: string; percent: number; color: string; muted?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <div className={cn("w-27.5 flex-none text-[14.5px] font-bold", muted ? "text-muted" : "text-ink")}>{label}</div>
      <div className="flex-1">
        <ProgressTrack
          aria-label={label}
          value={percent}
          color={color}
          className="h-6.5 rounded-lg bg-hover"
          fillClassName="rounded-lg"
        />
      </div>
      <div className="w-13.5 text-right text-[17px] font-extrabold">{percent}%</div>
    </div>
  );
}
