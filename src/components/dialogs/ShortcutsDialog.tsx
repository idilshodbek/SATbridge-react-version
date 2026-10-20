import { Kbd } from "@heroui/react";

import { AppDialog } from "@/components/ui/AppDialog";
import { Button } from "@/components/ui/Button";
import { modifierKeyLabel } from "@/lib/platform";

const groups: {
  title: string;
  shortcuts: { keys: string[]; does: string }[];
}[] = [
  {
    title: "Everywhere",
    shortcuts: [
      { keys: [modifierKeyLabel, "K"], does: "Search pages and actions" },
      { keys: [modifierKeyLabel, "B"], does: "Collapse or expand the sidebar" },
      { keys: ["Esc"], does: "Close a dialog or sheet" },
    ],
  },
  {
    title: "Question Rush and tests",
    shortcuts: [
      { keys: ["1", "2", "3", "4"], does: "Pick answer A–D" },
      {
        keys: ["Enter"],
        does: "Check the answer, then go to the next question",
      },
    ],
  },
];

const keyClass = "h-auto rounded-[7px] border border-border bg-hover px-2.25 py-0.75 text-[12.5px] font-bold text-ink-2";

type ShortcutsDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function ShortcutsDialog({ isOpen, onOpenChange }: ShortcutsDialogProps) {
  return (
    <AppDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      icon="shortcuts"
      title="Keyboard shortcuts"
      footer={
        <Button slot="close" tone="ink" className="rounded-xl px-5 py-2.75 text-[14px]">
          Got it
        </Button>
      }
    >
      <div className="flex flex-col gap-5">
        {groups.map((group) => (
          <div key={group.title}>
            <div className="mb-2 text-[11px] font-extrabold tracking-[1px] text-muted-2">{group.title.toUpperCase()}</div>
            <div className="flex flex-col divide-y divide-border">
              {group.shortcuts.map((shortcut) => (
                <div key={shortcut.does} className="flex items-center justify-between gap-4 py-2.5">
                  <span className="text-[14px] font-semibold text-ink-2">{shortcut.does}</span>
                  <span className="flex flex-none gap-1">
                    {shortcut.keys.map((key) => (
                      <Kbd key={key} className={keyClass}>
                        <Kbd.Content>{key}</Kbd.Content>
                      </Kbd>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppDialog>
  );
}
