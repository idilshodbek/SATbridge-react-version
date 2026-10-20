/**
 * Strips HeroUI Input's field chrome (background, border, ring) so the input
 * blends into a custom container, as in the design's search bars and composers.
 */
export const bareInputClass = [
  "h-auto w-full min-w-0 rounded-none border-0 bg-transparent p-0 font-medium text-ink shadow-none outline-none",
  "placeholder:text-muted-2",
  "hover:bg-transparent focus:bg-transparent focus:ring-0",
  "data-[hovered=true]:bg-transparent data-[focused=true]:bg-transparent data-[focused=true]:ring-0",
].join(" ");
