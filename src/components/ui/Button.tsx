import {
  Button as HeroButton,
  type ButtonProps as HeroButtonProps,
  Link as HeroLink,
  type LinkProps as HeroLinkProps,
  tv,
  type VariantProps,
} from "@heroui/react";

/**
 * SATbridge buttons = HeroUI Button / Link + the design's colour tones.
 *
 * Tone sets colour + hover only. Size (padding, font size, radius) is set per
 * use with `className`, because the design sizes almost every button individually.
 *
 *   <Button tone="brand" className="px-6 py-3.5 text-[16px]">Start</Button>
 *   <ButtonLink href={paths.analytics} tone="outline">View all analytics</ButtonLink>
 */
const buttonStyles = tv({
  base: "h-auto min-w-0 gap-2 rounded-full font-bold",
  variants: {
    tone: {
      brand: "bg-accent text-white hover:bg-accent-hover",
      ink: "bg-btn text-white hover:bg-btn-hover",
      outline: "border border-border bg-surface text-ink hover:bg-hover",
      soft: "bg-surface-3 text-ink hover:bg-border",
      pro: "bg-pink text-white hover:bg-pink-hover",
      danger: "bg-danger text-white hover:bg-danger-ink",
      violet: "bg-violet text-white hover:bg-on-violet",
      "violet-soft": "bg-tint-violet text-on-violet hover:bg-tint-violet-bd",
      gold: "bg-gold text-gold-ink hover:bg-gold",
      /** White pill on top of coloured gradients. */
      white: "bg-white hover:bg-white",
      ghost: "bg-transparent hover:bg-transparent",
    },
  },
  defaultVariants: { tone: "ghost" },
});

type Tone = VariantProps<typeof buttonStyles>["tone"];

export type ButtonProps = Omit<HeroButtonProps, "className" | "variant"> & {
  tone?: Tone;
  className?: string;
};

export function Button({ tone, className, ...props }: ButtonProps) {
  return <HeroButton variant="ghost" className={buttonStyles({ tone, className })} {...props} />;
}

export type ButtonLinkProps = Omit<HeroLinkProps, "className"> & {
  tone?: Tone;
  className?: string;
};

/** Looks like a button, behaves like a link (client-side navigation via `href`). */
export function ButtonLink({ tone, className, ...props }: ButtonLinkProps) {
  return (
    <HeroLink
      className={buttonStyles({
        tone,
        className: ["button no-underline", className],
      })}
      {...props}
    />
  );
}
