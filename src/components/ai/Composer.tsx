import { cn, Input } from "@heroui/react";
import type { FormEvent } from "react";

import { ArrowUpIcon, MicIcon, PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { bareInputClass } from "@/components/ui/fields";

type ComposerProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  /** Slightly tighter version used inside side panels. */
  compact?: boolean;
  className?: string;
};

/** Bridge AI message box: text input, attachment/voice/canvas controls and a send button. */
export function Composer({ value, onChange, onSubmit, placeholder = "Ask a question…", compact, className }: ComposerProps) {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className={cn("rounded-2xl bg-surface-2 px-4 py-3.5", className)}>
      <Input
        aria-label="Message Bridge AI"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={cn(bareInputClass, compact ? "mb-3.5 text-[15px]" : "mb-3 text-[16px]")}
      />
      <div className={cn("flex items-center text-muted", compact ? "gap-3" : "gap-3.5")}>
        <PlusIcon size={18} />
        <MicIcon size={18} />
        <span className="text-[14px] font-semibold">Canvas</span>
        <span className="ml-auto text-[14px] font-semibold">Auto ⌄</span>
        <Button type="submit" aria-label="Send" isIconOnly tone="ink" className={cn("p-0", compact ? "size-8.5" : "size-9")}>
          <ArrowUpIcon size={compact ? 16 : 17} className="text-white" />
        </Button>
      </div>
    </form>
  );
}
