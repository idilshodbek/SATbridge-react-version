import { cn, Switch } from "@heroui/react";

type SwitchRowProps = {
  label: string;
  description?: string;
  isSelected: boolean;
  onChange: (isSelected: boolean) => void;
  className?: string;
};

/** A settings row: label and help text on the left, a HeroUI Switch on the right. */
export function SwitchRow({ label, description, isSelected, onChange, className }: SwitchRowProps) {
  return (
    <Switch isSelected={isSelected} onChange={onChange} className={cn("group w-full", className)}>
      <Switch.Content className="flex w-full cursor-pointer items-center justify-between gap-4 py-1">
        <span className="min-w-0">
          <span className="block text-[15px] font-bold text-ink">{label}</span>
          {description && <span className="block text-[13px] font-medium text-muted-2">{description}</span>}
        </span>
        <Switch.Control className="h-6 w-10.5 flex-none rounded-full bg-border-2 group-data-[selected=true]:bg-accent">
          <Switch.Thumb className="ms-0.75 size-4.5 rounded-full bg-white shadow-none group-data-[selected=true]:ms-5.25 group-data-[selected=true]:bg-white" />
        </Switch.Control>
      </Switch.Content>
    </Switch>
  );
}
