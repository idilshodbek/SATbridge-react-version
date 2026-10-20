import { cn, Description, Input, Label, ListBox, Select, TextField } from "@heroui/react";

const labelClass = "mb-1.5 text-[13.5px] font-bold text-muted";
const controlClass =
  "h-auto w-full rounded-xl border border-border bg-surface px-3.5 py-2.75 text-[15px] font-medium text-ink shadow-none placeholder:text-muted-2";

type TextInputFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email";
  description?: string;
  isRequired?: boolean;
  className?: string;
};

/** Labelled text input (HeroUI TextField) in the SATbridge style. */
export function TextInputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  description,
  isRequired,
  className,
}: TextInputFieldProps) {
  return (
    <TextField value={value} onChange={onChange} type={type} isRequired={isRequired} className={cn("flex flex-col", className)}>
      <Label className={labelClass}>{label}</Label>
      <Input placeholder={placeholder} className={controlClass} />
      {description && <Description className="mt-1.5 text-[12.5px] font-medium text-muted-2">{description}</Description>}
    </TextField>
  );
}

type SelectFieldProps<T extends string> = {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
  className?: string;
};

/** Labelled single-choice select (HeroUI Select + ListBox) in the SATbridge style. */
export function SelectField<T extends string>({ label, value, options, onChange, className }: SelectFieldProps<T>) {
  return (
    <Select value={value} onChange={(key) => key !== null && onChange(key as T)} className={cn("flex flex-col", className)}>
      <Label className={labelClass}>{label}</Label>
      <Select.Trigger className={cn(controlClass, "flex items-center justify-between gap-2")}>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {options.map((option) => (
            <ListBox.Item key={option} id={option} textValue={option} className="text-[14.5px] font-medium">
              {option}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}
