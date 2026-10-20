import { Label, TextArea, TextField, toast } from "@heroui/react";
import { useState } from "react";

import { AppDialog } from "@/components/ui/AppDialog";
import { Button } from "@/components/ui/Button";
import { SelectField } from "@/components/ui/FormFields";

const reasons = [
  "The answer key looks wrong",
  "Typo or formatting problem",
  "The explanation is unclear",
  "Something else",
] as const;

type ReportProblemDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  /** What is being reported, e.g. "Question 4". */
  subject: string;
};

/** "Report a problem" with a question: pick a reason, add details, send. */
export function ReportProblemDialog({ isOpen, onOpenChange, subject }: ReportProblemDialogProps) {
  const [reason, setReason] = useState<(typeof reasons)[number]>(reasons[0]);
  const [details, setDetails] = useState("");

  const send = () => {
    toast.success("Thanks, we'll check it", {
      description: `${subject} · ${reason}`,
    });
    onOpenChange(false);
    setDetails("");
  };

  return (
    <AppDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      icon="bug-report"
      title="Report a problem"
      description={`${subject}. Our content team reads every report.`}
      footer={
        <>
          <Button slot="close" tone="outline" className="rounded-xl px-4.5 py-2.75 text-[14px]">
            Cancel
          </Button>
          <Button tone="brand" onPress={send} className="rounded-xl px-5 py-2.75 text-[14px]">
            Send report
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <SelectField label="What's wrong?" value={reason} options={reasons} onChange={setReason} />
        <TextField value={details} onChange={setDetails} className="flex flex-col">
          <Label className="mb-1.5 text-[13.5px] font-bold text-muted">Details (optional)</Label>
          <TextArea
            rows={3}
            placeholder="Tell us what you expected instead…"
            className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.75 text-[15px] font-medium text-ink shadow-none placeholder:text-muted-2"
          />
        </TextField>
      </div>
    </AppDialog>
  );
}
