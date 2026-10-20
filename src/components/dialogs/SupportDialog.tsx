import { Label, Link, TextArea, TextField, toast } from "@heroui/react";
import { useState } from "react";

import { paths } from "@/app/paths";
import { AppDialog } from "@/components/ui/AppDialog";
import { Button } from "@/components/ui/Button";
import { Icon3D, type Icon3DName } from "@/components/ui/Icon3D";

export type SupportKind = "help" | "support" | "bug" | "feedback";

const copy: Record<
  SupportKind,
  {
    icon: Icon3DName;
    title: string;
    description: string;
    placeholder: string;
    cta: string;
    done: string;
  }
> = {
  help: {
    icon: "help",
    title: "Help Center",
    description: "Short answers to the questions students ask most.",
    placeholder: "",
    cta: "",
    done: "",
  },
  support: {
    icon: "support",
    title: "Chat with support",
    description: "A real person replies within a day, usually much sooner.",
    placeholder: "How can we help?",
    cta: "Send message",
    done: "Message sent. We'll reply by email.",
  },
  bug: {
    icon: "bug-report",
    title: "Report a bug",
    description: "Tell us what happened and what you expected instead.",
    placeholder: "What went wrong? Which page were you on?",
    cta: "Send bug report",
    done: "Bug report sent. Thank you!",
  },
  feedback: {
    icon: "feedback",
    title: "Give feedback",
    description: "Ideas, complaints and praise all welcome.",
    placeholder: "What would make SATbridge better for you?",
    cta: "Send feedback",
    done: "Feedback sent. Thanks for helping us improve.",
  },
};

/** Help Center quick answers: each opens the page that explains it. */
const helpTopics: {
  icon: Icon3DName;
  title: string;
  text: string;
  to: string;
}[] = [
  {
    icon: "plan",
    title: "How the study plan works",
    text: "Your week is built from your test date and goal, and rebalanced every Sunday.",
    to: paths.planner,
  },
  {
    icon: "streak",
    title: "Streaks and XP",
    text: "Study on any day to keep the streak. XP comes from sessions, correct answers and learned words.",
    to: paths.myProfile,
  },
  {
    icon: "predicted-score",
    title: "How the predicted score is made",
    text: "Every answer updates your skill accuracy; we simulate the test hundreds of times.",
    to: paths.predictedScore,
  },
  {
    icon: "billing",
    title: "Plans, billing and refunds",
    text: "What Free includes, what Pro adds, and how to cancel.",
    to: paths.billing,
  },
];

type SupportDialogProps = { kind: SupportKind | null; onClose: () => void };

/** Help Center (quick answers) or a message form for support, bug reports and feedback. */
export function SupportDialog({ kind, onClose }: SupportDialogProps) {
  const [activeKind, setActiveKind] = useState<SupportKind>("help");
  const [message, setMessage] = useState("");
  // The dialog stays mounted while closing, so remember the last kind for the exit animation.
  const shown = kind ?? activeKind;
  const text = copy[shown];

  const send = () => {
    toast.success(text.done);
    setMessage("");
    onClose();
  };

  return (
    <AppDialog
      isOpen={kind !== null}
      onOpenChange={(open) => !open && onClose()}
      icon={text.icon}
      title={text.title}
      description={text.description}
      footer={
        shown === "help" ? (
          <Button slot="close" tone="outline" className="rounded-xl px-4.5 py-2.75 text-[14px]">
            Close
          </Button>
        ) : (
          <>
            <Button slot="close" tone="outline" className="rounded-xl px-4.5 py-2.75 text-[14px]">
              Cancel
            </Button>
            <Button tone="brand" isDisabled={!message.trim()} onPress={send} className="rounded-xl px-5 py-2.75 text-[14px]">
              {text.cta}
            </Button>
          </>
        )
      }
    >
      {shown === "help" ? (
        <div className="flex flex-col gap-1.5">
          {helpTopics.map((topic) => (
            <Link
              key={topic.title}
              href={topic.to}
              onPress={onClose}
              className="flex w-full items-start gap-3 rounded-xl border border-border px-3.5 py-3 font-normal text-ink no-underline hover:bg-surface-2"
            >
              <Icon3D icon={topic.icon} size={30} />
              <span className="min-w-0 flex-1">
                <span className="block text-[14.5px] font-bold">{topic.title}</span>
                <span className="block text-[12.5px] leading-[1.45] font-medium text-muted">{topic.text}</span>
              </span>
            </Link>
          ))}
          <Button
            onPress={() => setActiveKind("support")}
            className="mt-1 justify-start px-2 py-2 text-[13.5px] font-bold text-accent hover:bg-surface-2"
          >
            Still stuck? Chat with support →
          </Button>
        </div>
      ) : (
        <TextField value={message} onChange={setMessage} className="flex flex-col">
          <Label className="mb-1.5 text-[13.5px] font-bold text-muted">Your message</Label>
          <TextArea
            rows={4}
            placeholder={text.placeholder}
            className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.75 text-[15px] font-medium text-ink shadow-none placeholder:text-muted-2"
          />
        </TextField>
      )}
    </AppDialog>
  );
}
