import { cn } from "@heroui/react";

function Fraction({ top, bottom, large }: { top: string; bottom: string; large: boolean }) {
  return (
    <span className="flex flex-col items-center">
      <span className={large ? "px-2 pb-1.25" : "px-2 pb-1"}>{top}</span>
      <span className={cn("border-t border-ink px-2", large ? "border-t-[1.6px] pt-1.25" : "border-t-[1.4px] pt-1")}>
        {bottom}
      </span>
    </span>
  );
}

/** (36x + 90)/6 − c/12 = d(x − 3), typeset like the SAT question. */
export function LinearEquation({ size = "md" }: { size?: "md" | "lg" }) {
  const large = size === "lg";
  return (
    <div className={cn("flex items-center font-serif text-ink italic", large ? "gap-3.5 text-[26px]" : "gap-3 text-[21px]")}>
      <Fraction top="36x + 90" bottom="6" large={large} />
      <span>−</span>
      <Fraction top="c" bottom="12" large={large} />
      <span>= d(x − 3)</span>
    </div>
  );
}
