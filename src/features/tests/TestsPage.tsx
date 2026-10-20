import { paths } from "@/app/paths";
import { ChevronRightIcon, InfoIcon } from "@/components/icons";
import { HardBadge, ProBadge } from "@/components/ui/Badges";
import { ButtonLink } from "@/components/ui/Button";
import { Icon3D } from "@/components/ui/Icon3D";
import { InfoBanner } from "@/components/ui/InfoBanner";
import { PageTitle } from "@/components/ui/PageTitle";
import { Panel } from "@/components/ui/Panel";
import { type PredictedTest, predictedTests } from "@/data/tests";

export function TestsPage() {
  return (
    <div className="max-w-[1420px] md:px-9 md:pt-7.5 md:pb-17.5">
      <PageTitle icon={<Icon3D icon="full-length" size={38} />} className="mb-5.5">
        Full-length predicted tests
      </PageTitle>

      <InfoBanner icon={<InfoIcon size={19} />} title="SATbridge predicted papers" className="mb-7.5">
        These papers use <Emphasis>unseen questions</Emphasis> from the SATbridge bank and are calibrated to the difficulty of
        recent digital SAT exams, which tend to run <Emphasis>harder</Emphasis> than official practice material. Scores slightly
        below your other practice tests are normal.
      </InfoBanner>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,330px),1fr))] gap-5.5">
        {predictedTests.map((test) => (
          <TestCard key={test.id} test={test} />
        ))}
      </div>
    </div>
  );
}

function Emphasis({ children }: { children: string }) {
  return <span className="border-b-[1.5px] border-tint-red-bd text-danger-ink">{children}</span>;
}

function TestCard({ test }: { test: PredictedTest }) {
  return (
    <Panel className="overflow-hidden hover:border-border-3">
      <div className="px-5.5 py-5" style={{ background: test.tint }}>
        <PaperPreview />
      </div>
      <div className="px-5.5 py-5">
        <div className="mb-4 flex flex-wrap items-center gap-2.5">
          <h2 className="text-[24px] font-extrabold tracking-[-0.6px]">{test.name}</h2>
          <HardBadge />
          {test.isPro && <ProBadge>Pro</ProBadge>}
        </div>
        <div className="flex items-center gap-2.5">
          <ButtonLink href={paths.exam} tone="ink" className="gap-2 px-5.5 py-3 text-[14.5px]">
            Start
            <ChevronRightIcon size={14} strokeWidth={2.8} />
          </ButtonLink>
          <ButtonLink
            href={paths.reports}
            aria-label={`${test.name} reports`}
            tone="outline"
            className="size-10 p-0 text-[15px] font-extrabold text-muted"
          >
            ···
          </ButtonLink>
        </div>
      </div>
    </Panel>
  );
}

/** Skeleton lines that sketch a two-column test page. */
function PaperPreview() {
  const line = "h-1.75 rounded-sm bg-border";
  return (
    <div aria-hidden="true" className="flex gap-3 rounded-[10px] bg-surface p-3.5 shadow-[0_6px_18px_rgba(15,36,48,.06)]">
      <div className="flex min-w-0 flex-1 flex-col gap-1.75">
        <div className={`${line} w-[34%]`} />
        <div className={line} />
        <div className={line} />
        <div className={`${line} w-[72%]`} />
        <div className={`${line} w-[58%]`} />
      </div>
      <div className="flex w-[40%] flex-none flex-col gap-1.75">
        <div className="flex items-center gap-1.75">
          <div className="size-3.75 rounded-sm bg-btn" />
          <div className={`${line} flex-1`} />
        </div>
        <div className={line} />
        <div className={`${line} w-[80%]`} />
        <div className={`${line} w-[64%]`} />
      </div>
    </div>
  );
}
