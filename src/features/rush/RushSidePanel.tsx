import { cn } from "@heroui/react";
import { useState } from "react";

import { BridgeAiWelcome } from "@/components/ai/BridgeAiWelcome";
import { Composer } from "@/components/ai/Composer";
import { ReportProblemDialog } from "@/components/dialogs/ReportProblemDialog";
import { ClockIcon, FlagIcon, SidebarIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { LinePanel, LineTabs } from "@/components/ui/LineTabs";
import { rushAiPrompts, type RushQuestion } from "@/data/rush";
import { AI_QUESTIONS_LEFT } from "@/data/tutor";

export type PanelTab = "ai" | "explanation";

const tabs = [
  { id: "ai", label: "Ask Bridge AI", glyph: "◕" },
  { id: "explanation", label: "Explanation", glyph: "☰" },
] as const;

type RushSidePanelProps = {
  question: RushQuestion;
  /** Shown in the "Report a problem" dialog, e.g. "Rush question 4". */
  reportSubject: string;
  tab: PanelTab;
  onTabChange: (tab: PanelTab) => void;
  onClose: () => void;
};

/** Right-hand panel with the step-by-step explanation and Bridge AI. */
export function RushSidePanel({ question, reportSubject, tab, onTabChange, onClose }: RushSidePanelProps) {
  return (
    <aside className="flex w-140 flex-none animate-fade flex-col border-l border-border bg-surface">
      <div className="flex flex-none items-center gap-2.5 px-4 pt-3">
        <Button onPress={onClose} className="gap-2 rounded-none p-0 text-[14.5px] font-semibold text-ink-2 hover:text-ink">
          <SidebarIcon size={16} />
          Unpin
        </Button>
        <Button
          aria-label="Close panel"
          onPress={onClose}
          className="ml-auto size-8 rounded-[10px] p-0 text-[17px] font-normal text-muted-2 hover:bg-hover"
        >
          ✕
        </Button>
      </div>

      <LineTabs
        aria-label="Help"
        items={tabs}
        selectedKey={tab}
        onSelectionChange={onTabChange}
        className="min-h-0 flex-1"
        listContainerClassName="flex-none px-4 py-1"
        listClassName="gap-1.5"
        tabClassName="px-3 pt-2.75 pb-[13.5px] text-[15px] font-bold text-muted-2"
      >
        <LinePanel id="explanation" className="min-h-0 flex-1 overflow-auto px-5 pt-4.5 pb-6">
          <Explanation question={question} reportSubject={reportSubject} />
        </LinePanel>
        <LinePanel id="ai" className="flex min-h-0 flex-1 flex-col overflow-auto px-5 pt-4.5 pb-6">
          <AskBridgeAi />
        </LinePanel>
      </LineTabs>
    </aside>
  );
}

function Explanation({ question, reportSubject }: { question: RushQuestion; reportSubject: string }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const answer = question.kind === "math" ? question.answerLabel : question.choices[question.answerIndex];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-[21px] font-extrabold tracking-[-0.4px]">Step-by-step explanation</h3>
        <Button
          onPress={() => setIsReporting(true)}
          className="gap-1.75 rounded-none p-0 text-[13.5px] font-semibold text-muted-2 hover:text-ink"
        >
          <FlagIcon size={14} />
          Report
        </Button>
        <ReportProblemDialog isOpen={isReporting} onOpenChange={setIsReporting} subject={reportSubject} />
      </div>

      <div className="mb-5.5 rounded-[14px] border border-border p-4">
        <div className="mb-2.5 text-[13.5px] font-semibold text-muted">Correct Answer</div>
        <div className="flex gap-3.25 rounded-[11px] bg-tint-green p-3.5">
          <div className="grid size-7 flex-none place-items-center rounded-full bg-success-ink text-[13.5px] font-extrabold text-white">
            {question.answerLetter}
          </div>
          <div className="flex-1 text-[15.5px] leading-[1.5] font-semibold text-on-green">{answer}</div>
        </div>
      </div>

      <ol className="flex flex-col">
        {question.steps.map((step, index) => {
          const isLocked = index > 0 && !isUnlocked;
          return (
            <li key={step.title} className="flex gap-3.5">
              <div className="flex w-4.5 flex-none flex-col items-center">
                <div className={cn("mt-1 size-3.75 rounded-full", isLocked ? "bg-border-3" : "bg-accent")} />
                <div className="w-0.5 flex-1 bg-border" />
              </div>
              <div className="min-w-0 flex-1 pb-5.5">
                <div className={cn("mb-2 text-[17px] font-extrabold tracking-[-0.2px]", isLocked ? "text-muted-2" : "text-ink")}>
                  {step.title}
                </div>
                {isLocked ? (
                  <div className="relative">
                    <div aria-hidden="true" className="text-[15px] leading-[1.6] font-medium text-ink-2 opacity-55 blur-[5px]">
                      {step.body}
                    </div>
                    <Button
                      tone="brand"
                      onPress={() => setIsUnlocked(true)}
                      className="absolute top-1/2 left-1/2 -translate-1/2 px-4.5 py-2.75 text-[14px]"
                    >
                      Show the full explanation
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="text-[15.5px] leading-[1.65] font-medium text-ink-2">{step.body}</div>
                    {step.quote && (
                      <div className="mt-3 font-serif text-[16px] leading-[1.6] text-ink">
                        {step.quote.before}
                        <span className="border-b-[1.5px] border-[#E5B93C] bg-tint-amber">{step.quote.highlight}</span>
                        {step.quote.after}
                      </div>
                    )}
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function AskBridgeAi() {
  const [draft, setDraft] = useState("");

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3 border-b border-border pb-3.5">
        <div className="flex items-center gap-2 text-[14.5px] font-semibold text-ink-2">
          <ClockIcon size={16} />
          History
        </div>
        <Button className="gap-1.5 rounded-none p-0 text-[14px] text-ink-2">+ New</Button>
      </div>
      <BridgeAiWelcome
        subtitle="Ask Bridge AI about this question."
        prompts={rushAiPrompts.map((prompt) => ({
          text: prompt.text,
          isNew: prompt.isNew,
        }))}
        questionsLeft={AI_QUESTIONS_LEFT}
        className="flex-1 px-5 py-8.5"
      />
      <Composer compact value={draft} onChange={setDraft} onSubmit={() => setDraft("")} />
    </div>
  );
}
