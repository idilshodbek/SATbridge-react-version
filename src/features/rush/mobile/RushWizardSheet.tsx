import { Drawer } from "@heroui/react";

import { Button } from "@/components/ui/Button";
import type { RushPace, WizardSubject } from "@/data/rush";

import { StepDots } from "../RushWizard";
import { TOTAL_WIZARD_STEPS, useRushWizard } from "../useRushWizard";
import { WizardOptions } from "../WizardOptions";
import { WizardTopics } from "../WizardTopics";

type RushWizardSheetProps = {
  subject: WizardSubject;
  isOpen: boolean;
  onClose: () => void;
  onStart: (pace: RushPace) => void;
};

/** Phone version of the Question Rush set-up: the same five steps in a bottom sheet. */
export function RushWizardSheet({ subject, isOpen, onClose, onStart }: RushWizardSheetProps) {
  return (
    <Drawer.Backdrop isOpen={isOpen} onOpenChange={(open) => !open && onClose()} className="bg-[rgba(12,26,34,.55)]">
      <Drawer.Content placement="bottom">
        <Drawer.Dialog
          aria-label="Set up Question Rush"
          className="max-h-[88dvh] overflow-hidden rounded-t-3xl bg-surface p-0 shadow-none"
        >
          {/* The dialog content mounts on every opening, so each set-up starts at step 1. */}
          <WizardSheetSteps key={subject} subject={subject} onClose={onClose} onStart={onStart} />
        </Drawer.Dialog>
      </Drawer.Content>
    </Drawer.Backdrop>
  );
}

function WizardSheetSteps({ subject, onClose, onStart }: Omit<RushWizardSheetProps, "isOpen">) {
  const wizard = useRushWizard(subject, { onClose, onStart });

  return (
    <>
      <div className="flex-none border-b border-border px-4.5 pt-4.5 pb-3">
        <div className="mb-3 flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-[12px] font-semibold text-muted-2">
              Step {wizard.step} of {TOTAL_WIZARD_STEPS} · {subject}
            </div>
            <Drawer.Heading className="mt-0.5 text-[20px] font-extrabold tracking-[-0.5px] text-ink">
              {wizard.stepInfo.title}
            </Drawer.Heading>
          </div>
          <Button
            slot="close"
            aria-label="Close"
            className="size-8.5 flex-none rounded-[11px] bg-surface-3 p-0 text-[15px] font-normal text-muted hover:bg-surface-3"
          >
            ✕
          </Button>
        </div>
        <StepDots step={wizard.step} className="gap-1.25" />
      </div>

      <Drawer.Body className="no-scrollbar m-0 px-4.5 py-4 leading-[normal] text-ink">
        {wizard.isTopicsStep ? (
          <>
            <Button tone="outline" onPress={wizard.selectAll} className="mb-3 w-full rounded-xl p-3 text-[13px] hover:bg-surface">
              Select all topics
            </Button>
            <WizardTopics wizard={wizard} compact />
          </>
        ) : (
          <WizardOptions wizard={wizard} compact />
        )}
      </Drawer.Body>

      <div className="flex-none border-t border-border px-4.5 pt-3.5 pb-6.5">
        <div className="mb-2.5 text-center text-[12px] font-semibold text-muted-2">{wizard.summary}</div>
        <div className="flex gap-2.5">
          <Button
            tone="outline"
            onPress={wizard.goBack}
            className="rounded-[15px] px-4.5 py-3.75 text-[14px] text-muted hover:bg-surface"
          >
            Back
          </Button>
          <Button tone="ink" onPress={wizard.goNext} className="flex-1 rounded-[15px] p-3.75 text-[15px] font-extrabold">
            {wizard.ctaLabel}
          </Button>
        </div>
      </div>
    </>
  );
}
