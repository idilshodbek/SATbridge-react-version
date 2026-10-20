import { cn, Link } from "@heroui/react";
import { useState } from "react";
import { useNavigate } from "react-router";

import { paths } from "@/app/paths";
import { ChevronRightIcon } from "@/components/icons";
import { ShortcutTile } from "@/components/mobile/ShortcutTile";
import { Button } from "@/components/ui/Button";
import { interactiveCard } from "@/components/ui/interactive";

import { DonutRing } from "@/components/ui/DonutRing";
import { practiceShortcuts, practiceSubjects, type RushPace, weakestSkills, type WizardSubject } from "@/data/rush";

import { RushWizardSheet } from "./RushWizardSheet";

const subjectCardStyles = {
  pink: {
    background: "linear-gradient(115deg,#E5308F,#F273BE 70%,#F9B6DA)",
    button: "text-pink-ink",
  },
  blue: {
    background: "linear-gradient(115deg,#0091D6,#2BB8F0 60%,#7BE3A6)",
    button: "text-[#0072AA]",
  },
};

/** Practice tab on phones: subject cards (open the rush wizard), shortcuts and weakest skills. */
export function PracticeMobile() {
  const navigate = useNavigate();
  const [wizardSubject, setWizardSubject] = useState<WizardSubject>("Reading & Writing");
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const openWizard = (subject: WizardSubject) => {
    setWizardSubject(subject);
    setIsWizardOpen(true);
  };

  const startSession = (pace: RushPace) => {
    setIsWizardOpen(false);
    navigate(`${paths.rushSession}?mode=${pace.toLowerCase()}`);
  };

  return (
    <div className="flex animate-fade flex-col gap-3">
      {practiceSubjects.map((card) => (
        <div key={card.subject} className="rounded-[20px] p-5" style={{ background: subjectCardStyles[card.tone].background }}>
          <h2 className="text-[19px] font-extrabold tracking-[-0.4px] text-white">{card.title}</h2>
          <div className="mt-0.75 mb-3.75 text-[12.5px] font-semibold text-white/88">{card.meta}</div>
          <Button
            tone="white"
            onPress={() => openWizard(card.subject)}
            className={`px-4.5 py-2.5 text-[13.5px] ${subjectCardStyles[card.tone].button}`}
          >
            Continue →
          </Button>
        </div>
      ))}

      <div className="mt-1 grid grid-cols-2 gap-2.5">
        {practiceShortcuts.map((shortcut) => (
          <ShortcutTile key={shortcut.name} {...shortcut} size="md" />
        ))}
      </div>

      <h2 className="mt-2 text-[16.5px] font-extrabold tracking-[-0.4px]">Weakest skills</h2>
      <div className="flex flex-col gap-2.25">
        {weakestSkills.map((skill) => (
          <Link
            key={skill.name}
            href={paths.rushSession}
            className={cn(
              interactiveCard,
              "flex w-full items-center gap-3.25 rounded-2xl border border-border bg-surface px-3.75 py-3.5 font-normal text-ink no-underline",
            )}
          >
            <DonutRing size={44} holeSize={33} value={skill.accuracy} color={skill.color}>
              <span className="text-[11px] font-extrabold" style={{ color: skill.color }}>
                {skill.accuracy}%
              </span>
            </DonutRing>
            <div className="min-w-0 flex-1">
              <div className="text-[14.5px] font-bold">{skill.name}</div>
              <div className="mt-0.5 text-[11.5px] font-semibold text-muted-2">{skill.meta}</div>
            </div>
            <ChevronRightIcon size={15} strokeWidth={2.6} className="text-muted-3" />
          </Link>
        ))}
      </div>

      <RushWizardSheet
        subject={wizardSubject}
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onStart={startSession}
      />
    </div>
  );
}
