import { cn, Link } from "@heroui/react";

import { paths } from "@/app/paths";
import { ChevronRightIcon } from "@/components/icons";
import { Icon3D } from "@/components/ui/Icon3D";
import { interactiveCard } from "@/components/ui/interactive";

import { PageTitle } from "@/components/ui/PageTitle";
import { Panel } from "@/components/ui/Panel";
import { testReports } from "@/data/tests";

/** Every completed test, newest first, each opening its score report. */
export function ReportsPage() {
  const fullTests = testReports.filter((report) => report.kind === "Full-length");
  const best = Math.max(...fullTests.map((report) => report.total));
  const summary = [
    { label: "Tests taken", value: `${testReports.length}` },
    { label: "Best full test", value: `${best}` },
    { label: "Latest full test", value: `${fullTests[0].total}` },
  ];

  return (
    <div className="max-w-[1180px] md:px-9 md:pt-7.5 md:pb-17.5">
      <PageTitle icon={<Icon3D icon="reports" size={38} />} className="mb-5.5 max-md:hidden">
        Reports
      </PageTitle>

      <div className="mb-5 grid grid-cols-3 gap-2.5 md:gap-4">
        {summary.map((item) => (
          <Panel key={item.label} className="p-3.5 md:p-5">
            <div className="text-[22px] font-extrabold tracking-[-0.6px] md:text-[28px]">{item.value}</div>
            <div className="text-[11.5px] font-semibold text-muted-2 md:text-[13px]">{item.label}</div>
          </Panel>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {testReports.map((report) => (
          <Link
            key={report.id}
            href={paths.report(report.id)}
            className={cn(
              interactiveCard,
              "flex w-full flex-wrap items-center gap-4 rounded-[18px] border border-border bg-surface p-4 font-normal text-ink no-underline md:px-5.5",
            )}
          >
            <Icon3D icon={report.kind === "Full-length" ? "full-length" : "section"} size={40} />
            <div className="min-w-[min(100%,180px)] flex-1">
              <div className="text-[16.5px] font-extrabold tracking-[-0.3px]">{report.name}</div>
              <div className="text-[13px] font-semibold text-muted-2">
                {report.kind} · {report.date}
              </div>
            </div>
            <div className="flex items-center gap-5">
              {report.sections.length > 1 &&
                report.sections.map((section) => (
                  <div key={section.label} className="text-center max-md:hidden">
                    <div className="text-[16px] font-extrabold">{section.score}</div>
                    <div className="text-[11.5px] font-semibold text-muted-2">{section.subject}</div>
                  </div>
                ))}
              <div className="text-right">
                <div className="text-[26px] leading-none font-extrabold tracking-[-0.8px]">{report.total}</div>
                <div className="text-[11.5px] font-semibold text-muted-2">of {report.maxScore}</div>
              </div>
              <span
                className={cn(
                  "w-13 rounded-lg py-1 text-center text-[12px] font-extrabold",
                  report.delta ? "bg-tint-green text-on-green" : "bg-surface-3 text-muted-2",
                )}
              >
                {report.delta ?? "—"}
              </span>
              <ChevronRightIcon size={16} className="text-muted-3" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
