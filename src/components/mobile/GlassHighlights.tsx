/** Glow + diagonal sheen layered over a glass surface (see glass.ts). */
const highlights = {
  bar: {
    glow: {
      top: "-60%",
      height: "150%",
      background: "radial-gradient(60% 100% at 30% 100%,rgba(255,255,255,.22),transparent 70%)",
    },
    sheen: "linear-gradient(110deg,rgba(255,255,255,.14),rgba(255,255,255,.02) 46%,transparent 64%)",
  },
  sheet: {
    glow: {
      top: "-20%",
      height: "60%",
      background: "radial-gradient(60% 100% at 40% 0%,rgba(255,255,255,.2),transparent 70%)",
    },
    sheen: "linear-gradient(110deg,rgba(255,255,255,.12),rgba(255,255,255,.02) 44%,transparent 62%)",
  },
};

export function GlassHighlights({ surface }: { surface: keyof typeof highlights }) {
  const { glow, sheen } = highlights[surface];
  return (
    <>
      <div aria-hidden className="pointer-events-none absolute -inset-x-[10%]" style={glow} />
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: sheen }} />
    </>
  );
}
