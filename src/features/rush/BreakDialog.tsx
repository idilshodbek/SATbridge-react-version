import { Modal } from "@heroui/react";

import { PauseIcon, PlayIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";

/** "Take a break" overlay; the session timer is paused while it is open. */
export function BreakDialog({ isOpen, onResume }: { isOpen: boolean; onResume: () => void }) {
  return (
    <Modal.Backdrop
      isOpen={isOpen}
      onOpenChange={(open) => !open && onResume()}
      className="bg-white/72 backdrop-blur-[3px] dark:bg-black/60"
    >
      <Modal.Container placement="center" className="w-full sm:w-full">
        <Modal.Dialog
          aria-label="Take a break"
          className="mx-auto w-105 max-w-[92vw] animate-pop rounded-[20px] bg-surface px-7.5 py-8.5 text-center shadow-[0_26px_60px_rgba(15,36,48,.2)]"
        >
          <div className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-tint-blue">
            <PauseIcon size={26} className="text-sky" />
          </div>
          <Modal.Heading className="mb-2 text-[27px] font-extrabold tracking-[-0.6px] text-ink">Take a break</Modal.Heading>
          <div className="mb-5.5 text-[15.5px] leading-[1.6] font-medium text-muted">
            Your timer is paused while this is open. Continue whenever you&apos;re ready.
          </div>
          <Button tone="ink" onPress={onResume} className="mx-auto gap-2.25 px-6.5 py-3.25 text-[15px]">
            <PlayIcon size={16} />
            Continue
          </Button>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}
