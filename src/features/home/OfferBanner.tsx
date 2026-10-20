import { paths } from "@/app/paths";
import { TagIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { WELCOME_OFFER_SECONDS } from "@/data/user";
import { useCountdown } from "@/hooks/useCountdown";
import { formatHms } from "@/lib/format";

/** Pink welcome-offer strip at the top of the home page. */
export function OfferBanner() {
  const secondsLeft = useCountdown(WELCOME_OFFER_SECONDS, { loop: true });

  return (
    <div className="flex flex-wrap items-center justify-center gap-3.5 bg-pink px-6 py-3.5 text-white">
      <div className="flex items-center gap-2.25 text-[15px] font-bold">
        <TagIcon size={17} />
        Welcome offer 40% off
      </div>
      <div className="text-[15px] font-semibold tabular-nums opacity-90">{formatHms(secondsLeft)}</div>
      <ButtonLink href={paths.billing} tone="gold" className="px-4 py-2 text-[13.5px]">
        Get 40% off →
      </ButtonLink>
    </div>
  );
}
