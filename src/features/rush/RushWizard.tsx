import { cn, Modal } from "@heroui/react";

import { ChevronRightIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import type { RushPace, WizardSubject } from "@/data/rush";

import { TOTAL_WIZARD_STEPS, useRushWizard } from "./useRushWizard";
import { WizardOptions } from "./WizardOptions";
import { WizardTopics } from "./WizardTopics";

type RushWizardProps = {
  subject: WizardSubject;
  isOpen: boolean;
  onClose: () => void;
  onStart: (pace: RushPace) => void;
};

/** Desktop set-up wizard: a centred two-pane modal. */
export function RushWizard({ subject, isOpen, onClose, onStart }: RushWizardProps) {
  return (
    <Modal.Backdrop isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Modal.Container placement="center" className="w-full p-6.5 sm:w-full sm:p-6.5">
        <Modal.Dialog
          aria-label="Set up Question Rush"
          className="flex max-h-[88vh] w-260 max-w-full animate-pop flex-col overflow-hidden rounded-[20px] bg-surface p-0 shadow-[0_30px_70px_rgba(9,26,36,.32)]"
        >
          {/* Remount per opening so every session starts fresh at step 1. */}
          {isOpen && <WizardSteps key={subject} subject={subject} onClose={onClose} onStart={onStart} />}
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}

function WizardSteps({ subject, onClose, onStart }: Omit<RushWizardProps, "isOpen">) {
  const wizard = useRushWizard(subject, { onClose, onStart });

  return (
    <>
      <div className="flex min-h-0 flex-1 flex-wrap overflow-auto">
        <div className="min-w-70 flex-[1_1_300px] px-7.5 py-8.5">
          <div className="mb-3.5 text-[14.5px] font-semibold text-muted-2">
            Step {wizard.step} of {TOTAL_WIZARD_STEPS} · {subject}
          </div>
          <Modal.Heading className="mb-3.5 text-[34px] leading-[1.15] font-extrabold tracking-[-1px] text-ink">
            {wizard.stepInfo.title}
          </Modal.Heading>
          <div className="text-[15.5px] leading-[1.65] font-medium text-muted">{wizard.stepInfo.blurb}</div>
          <StepDots step={wizard.step} className="mt-6.5 gap-1.5" />
        </div>

        <div className="min-w-80 flex-[1_1_420px] border-l border-border px-7.5 py-7">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="text-[19px] font-extrabold tracking-[-0.4px]">{wizard.stepInfo.pane}</div>
            <div className="flex gap-2">
              {wizard.isTopicsStep && (
                <Button tone="outline" onPress={wizard.selectAll} className="px-4 py-2.25 text-[13px]">
                  Select all
                </Button>
              )}
              <Button
                slot="close"
                aria-label="Close"
                className="size-8.5 rounded-[10px] p-0 text-[16px] font-normal text-muted-2 hover:bg-hover"
              >
                ✕
              </Button>
            </div>
          </div>

          {wizard.isTopicsStep ? <WizardTopics wizard={wizard} /> : <WizardOptions wizard={wizard} />}
        </div>
      </div>

      <div className="flex flex-none items-center justify-between gap-3 border-t border-border px-6 py-4">
        <Button onPress={wizard.goBack} className="px-5 py-3 text-[14px] text-muted hover:text-ink">
          Back
        </Button>
        <div className="text-[13.5px] font-semibold text-muted-2">{wizard.summary}</div>
        <Button tone="ink" onPress={wizard.goNext} className="gap-2.25 px-6 py-3.25 text-[14.5px]">
          {wizard.ctaLabel}
          <ChevronRightIcon size={15} strokeWidth={2.8} />
        </Button>
      </div>
    </>
  );
}

/** Five-segment progress indicator. */
export function StepDots({ step, className }: { step: number; className?: string }) {
  return (
    <div className={cn("flex", className)} aria-hidden="true">
      {Array.from({ length: TOTAL_WIZARD_STEPS }, (_, index) => (
        <div key={index} className={cn("h-1.25 flex-1 rounded", index < step ? "bg-accent" : "bg-border")} />
      ))}
    </div>
  );
}
