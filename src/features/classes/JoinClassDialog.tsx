import { toast } from "@heroui/react";
import { type FormEvent, useState } from "react";

import { AppDialog } from "@/components/ui/AppDialog";
import { Button } from "@/components/ui/Button";
import { TextInputField } from "@/components/ui/FormFields";

const CODE_LENGTH = 6;

type JoinClassDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

/** Enter the 6-character code a teacher shares to join their class. */
export function JoinClassDialog({ isOpen, onOpenChange }: JoinClassDialogProps) {
  const [code, setCode] = useState("");
  const cleaned = code.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const isValid = cleaned.length === CODE_LENGTH;

  const join = (event?: FormEvent) => {
    event?.preventDefault();
    if (!isValid) return;
    toast.success(`Request sent for class ${cleaned}`, {
      description: "The teacher will approve you shortly.",
    });
    onOpenChange(false);
    setCode("");
  };

  return (
    <AppDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      icon="classes"
      title="Join a class"
      description="Ask your teacher or tutoring centre for their class code."
      footer={
        <>
          <Button slot="close" tone="outline" className="rounded-xl px-4.5 py-2.75 text-[14px]">
            Cancel
          </Button>
          <Button tone="brand" isDisabled={!isValid} onPress={() => join()} className="rounded-xl px-5 py-2.75 text-[14px]">
            Join class
          </Button>
        </>
      }
    >
      <form onSubmit={join}>
        <TextInputField
          label="Class code"
          value={code}
          onChange={(value) => setCode(value.toUpperCase().slice(0, CODE_LENGTH))}
          placeholder="e.g. T15CLB"
          description={`${CODE_LENGTH} letters or numbers · ${cleaned.length}/${CODE_LENGTH}`}
        />
      </form>
    </AppDialog>
  );
}
