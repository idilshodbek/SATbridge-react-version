import { paths } from "@/app/paths";
import { ChevronRightIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Icon3D } from "@/components/ui/Icon3D";
import { PageTitle } from "@/components/ui/PageTitle";
import { Panel } from "@/components/ui/Panel";
import { ProgressTrack } from "@/components/ui/ProgressTrack";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatStrip } from "@/components/ui/StatStrip";
import { SubjectBanner } from "@/components/ui/SubjectBanner";
import { subjectButtonClass } from "@/components/ui/tones";
import { activityTrend, bankStats, bankSubjects, topicAccuracy, TREND_MAX } from "@/data/bank";

const TREND_AXIS = [16, 12, 8, 4, 0];

function accuracyColor(accuracy: number) {
  if (accuracy >= 85) return "#22C55E";
  if (accuracy >= 60) return "#F59E0B";
  return "#EF4444";
}

export function QuestionBankPage() {
  return (
    <div className="max-w-[1420px] md:px-9 md:pt-7.5 md:pb-17.5">
      <PageTitle icon={<Icon3D icon="question-bank" size={38} />} className="mb-5 max-md:hidden">
        Question Bank
      </PageTitle>

      <div className="mb-9.5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,330px),1fr))] gap-5">
        {bankSubjects.map((subject) => (
          <SubjectBanner key={subject.subject} tone={subject.tone} title={subject.subject} size="lg">
            <div className="mb-2 flex items-center justify-between gap-3 text-[14.5px] font-bold text-white">
              <span>{subject.solved}</span>
              <span>{subject.percent}%</span>
            </div>
            <div className="mb-5 max-w-85">
              <ProgressTrack
                aria-label={`${subject.subject} solved`}
                value={subject.percent}
                color="var(--surface)"
                className="h-1.75 rounded-[5px] bg-white/35"
                fillClassName="rounded-[5px]"
              />
            </div>
            <ButtonLink href={paths.rush} tone="white" className={subjectButtonClass[subject.tone]}>
              Open
              <ChevronRightIcon size={14} strokeWidth={2.8} />
            </ButtonLink>
          </SubjectBanner>
        ))}
      </div>

      <SectionHeader
        title="Question Analytics"
        icon={<Icon3D icon="analytics" size={32} />}
        action={{ label: "View all analytics", href: paths.analytics }}
        className="mb-4 gap-3.5"
        titleClassName="text-[24px] tracking-[-0.7px] md:text-[30px]"
      />

      <StatStrip items={bankStats} minColumnWidth={210} className="mb-6" cellClassName="min-h-32" ghostClassName="text-[70px]" />

      <Panel className="mb-6 p-6">
        <h3 className="mb-1.5 text-[23px] font-extrabold tracking-[-0.5px]">Activity trend</h3>
        <div className="mb-5.5 text-[14.5px] font-medium text-muted">
          Wrong in red, correct in green. Harder questions look darker and sit below easier ones in each colour. Each bar is one
          week.
        </div>
        <div className="relative flex h-57.5 items-end gap-3.5 pl-8.5">
          <div className="absolute top-0 bottom-5.5 left-0 flex w-7.5 flex-col justify-between text-right text-[11.5px] font-semibold text-muted-3">
            {TREND_AXIS.map((tick) => (
              <span key={tick}>{tick}</span>
            ))}
          </div>
          {activityTrend.map((week, index) => (
            <div key={index} className="flex h-full flex-1 flex-col items-center justify-end gap-1.75">
              <div className="flex h-full w-full max-w-15.5 flex-col justify-end">
                <TrendSegment count={week.correct} className="rounded-t-md bg-success" />
                <TrendSegment count={week.correctHard} className="bg-on-green" />
                <TrendSegment count={week.wrong} className="bg-[#F87171]" />
                <TrendSegment count={week.wrongHard} className="rounded-b-md bg-danger-ink" />
              </div>
              <div className="text-[11.5px] font-semibold text-muted-2">W{index + 1}</div>
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-5">
        {topicAccuracy.map((card) => (
          <Panel key={card.subject} className="p-6">
            <h3 className="text-[23px] font-extrabold tracking-[-0.5px]">{card.subject}</h3>
            <div className="mt-0.5 mb-4 text-[14.5px] font-medium text-muted">Accuracy by topic</div>
            <div className="mb-3.5 flex justify-end gap-3.5 text-[12px] font-semibold text-muted-2">
              <span>● ≥ 85 %</span>
              <span>● 60 – 84 %</span>
              <span>● &lt; 60 %</span>
            </div>
            <div className="flex flex-col gap-4">
              {card.topics.map((topic) => {
                const color = accuracyColor(topic.accuracy);
                return (
                  <div key={topic.name} className="flex items-center gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="mb-0.5 text-[15.5px] font-bold">{topic.name}</div>
                      <div className="text-[13px] font-medium text-muted-2">{topic.attempts} attempts</div>
                    </div>
                    <div className="relative h-1.75 w-37.5 flex-none rounded-[5px] bg-border">
                      <div
                        className="absolute inset-y-0 left-0 rounded-[5px]"
                        style={{
                          width: `${topic.accuracy}%`,
                          background: color,
                        }}
                      />
                      <div
                        className="absolute -top-[3.5px] size-3.5 -translate-x-1.75 rounded-full"
                        style={{
                          left: `${topic.accuracy}%`,
                          background: color,
                        }}
                      />
                    </div>
                    <div className="w-13 text-right text-[19px] font-extrabold tracking-[-0.4px]">
                      {topic.accuracy}
                      <span className="text-[13px] text-muted-2"> %</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

function TrendSegment({ count, className }: { count: number; className: string }) {
  return <div className={className} style={{ height: `${Math.round((count / TREND_MAX) * 100)}%` }} />;
}
