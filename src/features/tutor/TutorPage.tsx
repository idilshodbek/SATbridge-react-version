import { cn } from "@heroui/react";
import { useState } from "react";

import { Composer } from "@/components/ai/Composer";
import { Button } from "@/components/ui/Button";
import { Icon3D } from "@/components/ui/Icon3D";
import { toneClasses } from "@/components/ui/tones";
import { AI_QUESTIONS_LEFT, tutorSuggestions } from "@/data/tutor";
import { currentUser } from "@/data/user";

import { type ChatMessage, useDemoTutor } from "./useDemoTutor";

export function TutorPage() {
  const { messages, isThinking, ask, reset } = useDemoTutor();
  const [draft, setDraft] = useState("");

  const send = (text: string) => {
    ask(text);
    setDraft("");
  };

  const startNewChat = () => {
    reset();
    setDraft("");
  };

  return (
    <div className="flex h-screen flex-col">
      <header className="flex flex-none flex-wrap items-center justify-between gap-4 border-b border-border bg-surface px-8 py-4.5">
        <div className="flex items-center gap-3.25">
          <Icon3D icon="tutor" size={40} />
          <div>
            <h1 className="text-[22px] font-extrabold tracking-[-0.5px]">Bridge AI</h1>
            <div className="text-[13.5px] font-semibold text-muted-2">
              Knows your last {currentUser.questionsAnswered} answers
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="rounded-full border border-border px-3.75 py-2.25 text-[14px] font-extrabold text-accent">
            {AI_QUESTIONS_LEFT} questions left today
          </div>
          <Button tone="outline" onPress={startNewChat} className="px-4.5 py-2.5 text-[13.5px]">
            + New chat
          </Button>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-auto px-8 py-6.5">
        <div className="mx-auto max-w-205">
          {messages.length === 0 && <EmptyState onPick={send} />}

          <div className="flex flex-col gap-4">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isThinking && <ThinkingDots />}
          </div>
        </div>
      </div>

      <div className="flex-none border-t border-border bg-surface px-8 pt-4 pb-5.5">
        <Composer value={draft} onChange={setDraft} onSubmit={() => send(draft)} className="mx-auto max-w-205" />
        <div className="mt-2.5 text-center text-[12.5px] font-medium text-muted-3">
          Bridge AI can make mistakes. Check important details.
        </div>
      </div>
    </div>
  );
}

function EmptyState({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="pt-11.5 pb-7.5 text-center">
      <div className="mb-2 text-[30px] font-extrabold tracking-[-0.8px]">How can I help?</div>
      <div className="mb-6.5 text-[16px] font-medium text-muted-2">Ask about a question you missed, a concept, or your plan.</div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3 text-left">
        {tutorSuggestions.map((suggestion) => (
          <Button
            key={suggestion.text}
            onPress={() => onPick(suggestion.text)}
            className="h-auto w-full items-start justify-start gap-3 rounded-[14px] border border-border bg-surface px-4.5 py-4 text-left whitespace-normal hover:border-border-3 hover:bg-hover"
          >
            <span
              className={cn("grid size-7 flex-none place-items-center rounded-[9px] text-[13px]", toneClasses[suggestion.tone])}
            >
              {suggestion.glyph}
            </span>
            <span className="flex-1 text-[15px] leading-[1.45] font-semibold text-ink-2">{suggestion.text}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  return (
    <div className={cn("flex", message.fromUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[78%] animate-slide-in border px-4.5 py-3.75 text-[15.5px] leading-[1.65] font-medium",
          message.fromUser
            ? "rounded-[16px_16px_4px_16px] border-tint-blue-bd bg-tint-blue text-ink"
            : "rounded-[16px_16px_16px_4px] border-border bg-surface text-ink-2",
        )}
      >
        {message.text}
      </div>
    </div>
  );
}

function ThinkingDots() {
  return (
    <div className="flex gap-1.75 px-1 py-1.5" aria-label="Bridge AI is thinking" role="status">
      {[0, 1, 2].map((dot) => (
        <span key={dot} className="size-2 rounded-full bg-border-3" />
      ))}
    </div>
  );
}
