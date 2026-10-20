import { heatScale, type KpiTile } from "@/data/analytics";

/** Colours for each KPI tile variant (desktop and mobile). */
export const kpiStyles: Record<KpiTile["variant"], { card: string; label: string; value: string; sub: string }> = {
  brand: {
    card: "border-accent bg-accent",
    label: "text-white/80",
    value: "text-white",
    sub: "text-white/85",
  },
  success: {
    card: "border-border bg-surface",
    label: "text-muted-2",
    value: "text-success",
    sub: "text-muted",
  },
  plain: {
    card: "border-border bg-surface",
    label: "text-muted-2",
    value: "text-ink",
    sub: "text-muted",
  },
  danger: {
    card: "border-tint-red-bd bg-tint-red",
    label: "text-on-red",
    value: "text-danger",
    sub: "text-on-red",
  },
  warm: {
    card: "border-tint-amber-bd bg-tint-amber",
    label: "text-on-amber",
    value: "text-ink",
    sub: "text-on-amber",
  },
};

/** Heatmap tile colour for an accuracy (%). `dark` = use dark text (light yellow/green tiles). */
export function heatStyle(accuracy: number) {
  if (accuracy >= 90) return { background: heatScale[4], dark: false };
  if (accuracy >= 78) return { background: heatScale[3], dark: true };
  if (accuracy >= 55) return { background: heatScale[2], dark: true };
  if (accuracy >= 40) return { background: heatScale[1], dark: false };
  return { background: heatScale[0], dark: false };
}
