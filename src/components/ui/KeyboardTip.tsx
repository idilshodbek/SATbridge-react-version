import { Kbd } from "@heroui/react";

const keyClass =
  "h-auto rounded-[7px] border border-border bg-hover px-2.25 py-0.75 text-[12.5px] font-bold text-ink-2 [word-spacing:normal]";

/** "Tip: press 1 2 3 4 to pick an answer, then Enter to …" */
export function KeyboardTip({ action }: { action: string }) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-2 text-[13.5px] font-semibold text-muted-2">
      <span>Tip: press</span>
      {["1", "2", "3", "4"].map((key) => (
        <Kbd key={key} className={keyClass}>
          <Kbd.Content>{key}</Kbd.Content>
        </Kbd>
      ))}
      <span>to pick an answer, then</span>
      <Kbd className={`${keyClass} px-2.75`}>
        <Kbd.Content>Enter</Kbd.Content>
      </Kbd>
      <span>{action}</span>
    </div>
  );
}
