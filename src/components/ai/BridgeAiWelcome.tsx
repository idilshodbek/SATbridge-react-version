import { cn } from "@heroui/react";

import { ChevronRightIcon } from "@/components/icons";
import { NewBadge } from "@/components/ui/Badges";
import { Button } from "@/components/ui/Button";
import { Icon3D } from "@/components/ui/Icon3D";

type Prompt = { text: string; isNew?: boolean; highlighted?: boolean };

type BridgeAiWelcomeProps = {
  subtitle: string;
  prompts: Prompt[];
  /** Bridge AI questions left today (Free plan). */
  questionsLeft: number;
  onPrompt?: (text: string) => void;
  /** `lg` is the lesson rail version, `md` the question side panel. */
  size?: "md" | "lg";
  className?: string;
};

/** Empty state for Bridge AI side panels: robot, suggested prompts and today's question allowance. */
export function BridgeAiWelcome({ subtitle, prompts, questionsLeft, onPrompt, size = "md", className }: BridgeAiWelcomeProps) {
  const large = size === "lg";

  return (
    <div className={cn("flex flex-col items-center justify-center text-center", className)}>
      <Icon3D icon="tutor" size={large ? 74 : 70} className="mb-4" />
      <div className={cn("mb-1.5 font-extrabold tracking-[-0.5px]", large ? "text-[26px]" : "text-[25px]")}>How can I help?</div>
      <div className={cn("font-medium text-muted-2", large ? "mb-5.5 text-[15.5px]" : "mb-5 text-[15px]")}>{subtitle}</div>

      <div className={cn("flex w-full flex-col", large ? "max-w-95 gap-2.5" : "max-w-85 gap-2.25")}>
        {prompts.map((prompt) => (
          <Button
            key={prompt.text}
            onPress={() => onPrompt?.(prompt.text)}
            className={cn(
              "justify-between gap-2.5 text-[14.5px] font-semibold text-ink-2 hover:bg-border",
              large ? "px-4.5 py-3" : "px-4.25 py-2.75",
              prompt.highlighted ? "bg-border" : "bg-hover",
            )}
          >
            <span className="flex items-center gap-2">
              {prompt.text}
              {prompt.isNew && <NewBadge className="text-[10px] font-extrabold">NEW</NewBadge>}
            </span>
            <ChevronRightIcon size={14} />
          </Button>
        ))}
      </div>

      <div className={cn("text-[14px] font-semibold text-muted-2", large ? "mt-6" : "mt-5.5")}>
        <span className="font-extrabold text-accent">{questionsLeft} questions</span> left today · unlimited with Pro
      </div>
    </div>
  );
}
