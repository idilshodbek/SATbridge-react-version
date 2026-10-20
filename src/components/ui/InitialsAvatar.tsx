import { Avatar, cn } from "@heroui/react";

type InitialsAvatarProps = {
  initials: string;
  /** Background: any CSS colour or gradient. */
  background: string;
  /** Size + font, e.g. "size-10 text-[13.5px]". */
  className?: string;
  fallbackClassName?: string;
};

/** Round avatar with coloured initials (HeroUI Avatar, fallback only). */
export function InitialsAvatar({ initials, background, className, fallbackClassName }: InitialsAvatarProps) {
  return (
    <Avatar className={cn("size-10 flex-none rounded-full", className)}>
      <Avatar.Fallback className={cn("font-extrabold text-white", fallbackClassName)} style={{ background }}>
        {initials}
      </Avatar.Fallback>
    </Avatar>
  );
}
