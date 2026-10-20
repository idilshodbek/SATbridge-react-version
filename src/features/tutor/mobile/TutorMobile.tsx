import { cn, Input } from "@heroui/react";
import { type FormEvent, type ReactNode, useState } from "react";

import { ArrowRightIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { bareInputClass } from "@/components/ui/fields";
import { mobileTutorPrompts, mobileTutorReply, tutorGreeting } from "@/data/tutor";

import { useDemoTutor } from "../useDemoTutor";

/** Ask Bridge AI on phones: chat bubbles, quick prompts and a composer. */
export function TutorMobile() {
  const { messages, isThinking, ask } = useDemoTutor({
    greeting: tutorGreeting,
    replyTo: mobileTutorReply,
  });
  const [draft, setDraft] = useState("");

  const send = (event?: FormEvent) => {
    event?.preventDefault();
    ask(draft);
    setDraft("");
  };

  return (
    <div className="flex animate-fade flex-col gap-3">
      {messages.map((message) => (
        <Bubble key={message.id} fromUser={message.fromUser}>
          {message.text}
        </Bubble>
      ))}
      {isThinking && (
        <Bubble fromUser={false}>
          <span className="text-muted-2">Thinking…</span>
        </Bubble>
      )}

      <div className="mt-1 flex flex-wrap gap-2">
        {mobileTutorPrompts.map((prompt) => (
          <Button
            key={prompt}
            tone="outline"
            onPress={() => ask(prompt)}
            className="px-3.5 py-2.5 text-[12.5px] text-ink-2 hover:bg-surface"
          >
            {prompt}
          </Button>
        ))}
      </div>

      <form onSubmit={send} className="mt-1 flex items-center gap-2.25 rounded-2xl border border-border bg-surface p-2.5">
        <Input
          aria-label="Message Bridge AI"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ask about any question…"
          className={cn(bareInputClass, "p-1.5 text-[15px]")}
        />
        <Button type="submit" aria-label="Send" tone="brand" className="size-10 flex-none rounded-xl p-0 hover:bg-accent">
          <ArrowRightIcon size={18} />
        </Button>
      </form>
    </div>
  );
}

function Bubble({ fromUser, children }: { fromUser: boolean; children: ReactNode }) {
  return (
    <div className={cn("flex", fromUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[86%] border px-4 py-3.5 text-[14.5px] leading-[1.6] font-medium whitespace-pre-wrap",
          fromUser
            ? "rounded-[18px_18px_6px_18px] border-accent bg-accent text-white"
            : "rounded-[18px_18px_18px_6px] border-border bg-surface text-ink",
        )}
      >
        {children}
      </div>
    </div>
  );
}
