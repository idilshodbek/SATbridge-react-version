import { paths } from "@/app/paths";
import { BulbIcon, ChevronRightIcon } from "@/components/icons";
import { ProBadge } from "@/components/ui/Badges";
import { ButtonLink } from "@/components/ui/Button";
import { HelpHint } from "@/components/ui/HelpHint";
import { Icon3D } from "@/components/ui/Icon3D";
import { InfoBanner } from "@/components/ui/InfoBanner";
import { PageTitle } from "@/components/ui/PageTitle";
import { Panel } from "@/components/ui/Panel";
import { type SectionTest, sectionTests } from "@/data/tests";

/** Section tests: one full section (both modules) or a single module, timed like the real test. */
export function SectionTestsPage() {
  const sections = sectionTests.filter((test) => test.kind === "Full section");
  const modules = sectionTests.filter((test) => test.kind === "Single module");

  return (
    <div className="max-w-[1420px] md:px-9 md:pt-7.5 md:pb-17.5">
      <PageTitle icon={<Icon3D icon="section" size={38} />} className="mb-5.5 max-md:hidden">
        Section tests
      </PageTitle>

      <InfoBanner icon={<BulbIcon size={19} />} title="Short on time?" className="mb-6">
        A section takes about an hour, a module about 30 minutes. Timing, tools and adaptivity match the real test, and every
        result feeds your predicted score.
      </InfoBanner>

      <h2 className="mb-3 flex items-center gap-2 text-[19px] font-extrabold tracking-[-0.4px]">
        Full sections
        <HelpHint title="Adaptive sections">
          Like the real Digital SAT: how you do in Module 1 decides whether Module 2 is the harder or easier version. Only the
          harder Module 2 can reach the top scores.
        </HelpHint>
      </h2>
      <div className="mb-7 grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-4">
        {sections.map((test) => (
          <SectionCard key={test.id} test={test} />
        ))}
      </div>

      <h2 className="mb-3 text-[19px] font-extrabold tracking-[-0.4px]">Single modules</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-4">
        {modules.map((test) => (
          <SectionCard key={test.id} test={test} />
        ))}
      </div>
    </div>
  );
}

function SectionCard({ test }: { test: SectionTest }) {
  const isMath = test.subject === "Math";

  return (
    <Panel className="flex flex-col gap-4 rounded-[18px] p-5">
      <div className="flex items-start gap-3.5">
        <Icon3D icon={isMath ? "math" : "reading"} size={46} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[17px] font-extrabold tracking-[-0.3px]">{test.title}</span>
            {test.isPro && <ProBadge>Pro</ProBadge>}
          </div>
          <div className="mt-0.5 text-[13px] font-semibold text-muted-2">
            {test.questions} questions · {test.minutes} min · {test.detail}
          </div>
        </div>
      </div>
      <div className="mt-auto flex items-center gap-3">
        {test.lastScore ? (
          <div className="text-[13px] font-semibold text-muted">
            Last score <span className="text-[16px] font-extrabold text-ink">{test.lastScore}</span>
          </div>
        ) : (
          <div className="text-[13px] font-semibold text-muted-2">Not taken yet</div>
        )}
        <ButtonLink href={paths.exam} tone="ink" className="ml-auto gap-2 rounded-xl px-5 py-2.75 text-[13.5px]">
          Start
          <ChevronRightIcon size={13} strokeWidth={2.8} />
        </ButtonLink>
      </div>
    </Panel>
  );
}
