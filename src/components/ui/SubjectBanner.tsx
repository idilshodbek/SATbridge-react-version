import { cn } from "@heroui/react";
import type { ReactNode } from "react";

export type SubjectTone = "pink" | "blue";

const gradients: Record<SubjectTone, string> = {
  pink: "linear-gradient(115deg,#E5308F,#F273BE 65%,#F9B6DA)",
  blue: "linear-gradient(115deg,#0091D6,#2BB8F0 60%,#7BE3A6)",
};

/** Decorative pencil + open book (Reading & Writing). */
function PencilArt({ size }: { size: "md" | "lg" }) {
  if (size === "lg") {
    return (
      <svg
        width="220"
        height="190"
        viewBox="0 0 220 190"
        className="absolute -right-2.5 -bottom-3.5 opacity-95"
        aria-hidden="true"
      >
        <path d="M30 130c40-22 80-22 120 0v34c-40-20-80-20-120 0Z" fill="var(--surface)" opacity=".55" />
        <path d="M40 120c36-20 72-20 108 0" stroke="var(--surface)" strokeWidth="3" fill="none" opacity=".7" />
        <g transform="rotate(38 170 70)">
          <rect x="150" y="10" width="34" height="120" rx="16" fill="#FFD98A" />
          <path d="M150 130c6 20 28 20 34 0Z" fill="#2C2136" />
        </g>
      </svg>
    );
  }
  return (
    <svg width="200" height="170" viewBox="0 0 200 170" className="absolute -right-2 -bottom-3.5 opacity-90" aria-hidden="true">
      <path d="M24 118c36-20 72-20 108 0v30c-36-18-72-18-108 0Z" fill="#fff" opacity=".5" />
      <g transform="rotate(38 150 62)">
        <rect x="132" y="8" width="30" height="108" rx="14" fill="#FFD98A" />
        <path d="M132 116c5 18 25 18 30 0Z" fill="#2C2136" />
      </g>
    </svg>
  );
}

/** Decorative set square (Math). */
function TriangleArt({ size }: { size: "md" | "lg" }) {
  if (size === "lg") {
    return (
      <svg width="220" height="190" viewBox="0 0 220 190" className="absolute -right-1.5 -bottom-4 opacity-95" aria-hidden="true">
        <path d="M60 150 175 20l18 130Z" fill="var(--surface)" opacity=".45" />
        <path d="M60 150 175 20l18 130Z" stroke="var(--surface)" strokeWidth="3" fill="none" opacity=".8" />
        <path d="M96 150c0-14 8-24 20-30" stroke="var(--surface)" strokeWidth="3" fill="none" opacity=".8" />
      </svg>
    );
  }
  return (
    <svg width="200" height="170" viewBox="0 0 200 170" className="absolute -right-1 -bottom-3.5 opacity-90" aria-hidden="true">
      <path d="M52 138 158 18l16 120Z" fill="#fff" opacity=".42" />
      <path d="M52 138 158 18l16 120Z" stroke="#fff" strokeWidth="3" fill="none" opacity=".8" />
    </svg>
  );
}

type SubjectBannerProps = {
  tone: SubjectTone;
  title: string;
  /** `lg` = question bank card, `md` = question rush card. */
  size: "md" | "lg";
  /** Content under the title (progress, counts, action button). */
  children: ReactNode;
};

/** Gradient subject card with a decorative illustration. */
export function SubjectBanner({ tone, title, size, children }: SubjectBannerProps) {
  const isLarge = size === "lg";
  const Art = tone === "pink" ? PencilArt : TriangleArt;

  return (
    <div
      className={cn("relative overflow-hidden", isLarge ? "rounded-[18px] p-6" : "rounded-2xl p-5.5")}
      style={{ background: gradients[tone] }}
    >
      <Art size={size} />
      <div className="relative">
        <h2 className={cn("font-extrabold tracking-[-0.5px] text-white", isLarge ? "mb-3.5 text-[26px]" : "text-[23px]")}>
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
