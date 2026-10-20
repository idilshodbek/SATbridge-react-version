import { Chip } from "@heroui/react";
import { useState } from "react";
import { useNavigate } from "react-router";

import { paths } from "@/app/paths";
import { BoltIcon, ChevronRightIcon, ClockIcon, FlameSolidIcon } from "@/components/icons";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Icon3D } from "@/components/ui/Icon3D";
import { InfoBanner } from "@/components/ui/InfoBanner";
import { PageTitle } from "@/components/ui/PageTitle";
import { SubjectBanner, type SubjectTone } from "@/components/ui/SubjectBanner";
import { subjectButtonClass } from "@/components/ui/tones";
import { type RushPace, rushSessionsInProgress, type WizardSubject } from "@/data/rush";

import { RushWizard } from "./RushWizard";

const subjects: {
  subject: WizardSubject;
  questions: string;
  tone: SubjectTone;
}[] = [
  { subject: "Reading & Writing", questions: "1,492 questions", tone: "pink" },
  { subject: "Math", questions: "2,390 questions", tone: "blue" },
];

export function RushHomePage() {
  const navigate = useNavigate();
  const [wizardSubject, setWizardSubject] = useState<WizardSubject | null>(null);

  const startSession = (pace: RushPace) => {
    setWizardSubject(null);
    navigate(`${paths.rushSession}?mode=${pace.toLowerCase()}`);
  };

  return (
    <div className="mx-auto max-w-270 px-9 pt-7.5 pb-17.5">
      <PageTitle icon={<Icon3D icon="rush" size={38} />} className="mb-5">
        Question Rush
      </PageTitle>

      <InfoBanner icon={<BoltIcon size={19} strokeWidth={2.4} />} title="What is Question Rush?" className="mb-6.5">
        A fast practice mode for digital SAT skills. Pick a subject, topics, difficulty, question count and pace, then answer one
        question at a time against the clock. Quick, accurate answers earn more stars, and your results show what to drill next.
      </InfoBanner>

      <div className="mb-8.5 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5">
        {subjects.map((item) => (
          <SubjectBanner key={item.subject} tone={item.tone} title={item.subject} size="md">
            <div className="mt-0.75 mb-5 text-[14.5px] font-semibold text-white/85">{item.questions}</div>
            <Button tone="white" onPress={() => setWizardSubject(item.subject)} className={subjectButtonClass[item.tone]}>
              Continue
              <ChevronRightIcon size={14} strokeWidth={2.8} />
            </Button>
          </SubjectBanner>
        ))}
      </div>

      <div className="mb-3.5 flex items-center gap-2.75">
        <ClockIcon size={21} strokeWidth={2} className="text-muted" />
        <h2 className="text-[19px] font-bold text-muted">In progress</h2>
      </div>
      <div className="flex flex-col gap-3">
        {rushSessionsInProgress.map((session) => (
          <div
            key={session.name}
            className="flex flex-wrap items-center gap-4 rounded-[14px] border border-border bg-surface px-5 py-4.5 hover:border-border-3"
          >
            <div className="min-w-50 flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-2.5">
                <div className="text-[16.5px] font-bold">{session.name}</div>
                <Chip className="rounded-[7px] bg-surface-3 px-2.5 py-1 text-[11.5px] font-bold text-muted">In progress</Chip>
                <span className="text-[13px] font-semibold text-muted-2">{session.startedAgo}</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-[13.5px] font-semibold text-muted">
                <span className="flex items-center gap-1.5">
                  <ClockIcon size={14} strokeWidth={2.4} className="text-accent" />
                  {session.answered} answered
                </span>
                <span className="flex items-center gap-1.5">
                  <FlameSolidIcon size={14} className="text-orange" />
                  {session.skills}
                </span>
              </div>
            </div>
            <ButtonLink href={paths.rushSession} tone="soft" className="px-4.5 py-2.75 text-[13.5px]">
              Resume
              <ChevronRightIcon size={14} strokeWidth={2.8} />
            </ButtonLink>
          </div>
        ))}
      </div>

      <RushWizard
        subject={wizardSubject ?? "Math"}
        isOpen={wizardSubject !== null}
        onClose={() => setWizardSubject(null)}
        onStart={startSession}
      />
    </div>
  );
}
