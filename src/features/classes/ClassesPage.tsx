import { Chip, cn } from "@heroui/react";
import { useState } from "react";

import { paths } from "@/app/paths";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Icon3D } from "@/components/ui/Icon3D";
import { LeaderboardRow } from "@/components/ui/Leaderboard";
import { PageTitle } from "@/components/ui/PageTitle";
import { Panel } from "@/components/ui/Panel";
import { toneClasses } from "@/components/ui/tones";
import { type Assignment, assignments, classCohort } from "@/data/classes";
import { cohort } from "@/data/community";
import { testReports } from "@/data/tests";

import { JoinClassDialog } from "./JoinClassDialog";

const ctaDestination: Record<Assignment["cta"], string> = {
  Start: paths.tests,
  Open: paths.tests,
  Resume: paths.rushSession,
  Review: paths.report(testReports[0].id),
};

export function ClassesPage() {
  const [isJoinOpen, setIsJoinOpen] = useState(false);

  return (
    <div className="max-w-[1420px] md:px-9 md:pt-7.5 md:pb-17.5">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4.5 max-md:mb-4">
        {/* On phones the header already shows the page title. */}
        <div className="max-md:hidden">
          <PageTitle icon={<Icon3D icon="classes" size={38} />}>My Classes</PageTitle>
          <div className="mt-0.75 text-[15.5px] font-semibold text-muted">
            Assignments your tutor set, and how your cohort is doing
          </div>
        </div>
        <Button tone="outline" onPress={() => setIsJoinOpen(true)} className="px-5 py-3 text-[14px] max-md:w-full">
          Join a class
        </Button>
      </div>
      <JoinClassDialog isOpen={isJoinOpen} onOpenChange={setIsJoinOpen} />

      <div className="flex flex-wrap items-start gap-5">
        <div className="flex min-w-[min(100%,340px)] flex-[1_1_520px] flex-col gap-5">
          <CohortBanner />

          <Panel className="overflow-hidden">
            <h2 className="px-4 py-5 text-[20px] font-extrabold tracking-[-0.4px] md:px-5.5">Assignments</h2>
            {assignments.map((assignment) => (
              // One row on wide screens; on phones the status chip drops under the title.
              <div
                key={assignment.name}
                className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3.5 gap-y-2 border-t border-border px-4 py-4 md:grid-cols-[auto_minmax(0,1fr)_auto_auto] md:px-5.5"
              >
                <div
                  className="row-span-2 h-9.5 w-2.25 self-stretch rounded-[5px] md:row-span-1 md:self-auto"
                  style={{ background: assignment.color }}
                />
                <div>
                  <div className="text-[16px] font-bold">{assignment.name}</div>
                  <div className="text-[13px] font-semibold text-muted-2">{assignment.meta}</div>
                </div>
                <Chip
                  className={cn(
                    "col-start-2 row-start-2 justify-self-start rounded-full px-3 py-1.25 text-[12px] font-bold md:col-start-auto md:row-start-auto",
                    toneClasses[assignment.tone],
                  )}
                >
                  {assignment.status}
                </Chip>
                <ButtonLink
                  href={ctaDestination[assignment.cta]}
                  tone="outline"
                  className="col-start-3 row-span-2 row-start-1 px-4 py-2.5 text-[13px] md:col-start-auto md:row-span-1 md:row-start-auto"
                >
                  {assignment.cta}
                </ButtonLink>
              </div>
            ))}
          </Panel>
        </div>

        <Panel className="w-85 min-w-[min(100%,300px)] flex-[1_1_300px] p-5.5 md:max-w-95">
          <h2 className="mb-4 text-[20px] font-extrabold tracking-[-0.4px]">Cohort leaderboard</h2>
          <div className="flex flex-col gap-2.5">
            {cohort.map((member) => (
              <LeaderboardRow key={member.rank} member={member} showScore />
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function CohortBanner() {
  return (
    <div className="rounded-[18px] bg-[#0C3A4E] p-6 text-white">
      <div className="mb-4.5 flex flex-wrap items-center justify-between gap-3.5">
        <div>
          <div className="text-[12.5px] font-bold tracking-[1.1px] text-[#7FC7E4]">{classCohort.label}</div>
          <div className="mt-0.75 text-[25px] font-extrabold tracking-[-0.6px]">{classCohort.name}</div>
        </div>
        <div className="text-right">
          <div className="text-[25px] font-extrabold">{classCohort.yourRank}</div>
          <div className="text-[12.5px] font-semibold text-[#7FC7E4]">your rank</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {classCohort.highlights.map((item) => (
          <div key={item.label} className="min-w-30 flex-1 rounded-xl bg-white/10 p-3.5">
            <div className="text-[22px] font-extrabold">{item.value}</div>
            <div className="text-[12px] font-semibold text-[#9FD3EA]">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
