/**
 * Hover / press feedback for cards and tiles that navigate somewhere:
 * a slight lift with a soft shadow on hover, back down while pressed.
 * Add to any card-like Link or Panel (`className={cn(interactiveCard, …)}`).
 */
export const interactiveCard = [
  "cursor-pointer transition-[transform,box-shadow,border-color] duration-200 ease-out",
  "hover:-translate-y-0.5 hover:border-border-3 hover:shadow-[0_10px_24px_rgba(15,36,48,.08)]",
  "data-[pressed=true]:translate-y-0 data-[pressed=true]:shadow-none active:translate-y-0",
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
].join(" ");
