import type { CSSProperties } from "react";

/*
 * "Liquid glass" surfaces from the mobile design: a translucent teal gradient that
 * blurs and brightens whatever is behind it. Pair with <GlassHighlights />.
 */

export const glassBarStyle: CSSProperties = {
  background: "linear-gradient(180deg,rgba(20,80,106,.55),rgba(12,58,78,.7))",
  backdropFilter: "blur(40px) saturate(220%) brightness(1.12)",
  WebkitBackdropFilter: "blur(40px) saturate(220%) brightness(1.12)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,.24), inset 0 -20px 34px rgba(6,32,45,.32)",
};

export const glassSheetStyle: CSSProperties = {
  background: "linear-gradient(180deg,rgba(22,84,112,.62),rgba(10,50,68,.78))",
  backdropFilter: "blur(42px) saturate(220%) brightness(1.1)",
  WebkitBackdropFilter: "blur(42px) saturate(220%) brightness(1.1)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,.26), 0 -14px 40px rgba(4,22,32,.35)",
};
