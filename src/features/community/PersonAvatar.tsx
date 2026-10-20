import { cn } from "@heroui/react";

import { InitialsAvatar } from "@/components/ui/InitialsAvatar";
import type { Person } from "@/data/social";

type PersonAvatarProps = {
  person: Pick<Person, "initials" | "color" | "isOnline">;
  /** Size + font, e.g. "size-11 text-[14px]". */
  className?: string;
  showOnline?: boolean;
};

/** Initials avatar with an optional green "online" dot. */
export function PersonAvatar({ person, className = "size-10 text-[13px]", showOnline = true }: PersonAvatarProps) {
  return (
    <span className="relative flex-none">
      <InitialsAvatar
        initials={person.initials}
        background={person.color}
        className={className}
        fallbackClassName="text-[inherit]"
      />
      {showOnline && person.isOnline && (
        <span
          aria-label="Online"
          className={cn("absolute right-0 bottom-0 size-3 rounded-full border-2 border-surface bg-success")}
        />
      )}
    </span>
  );
}
