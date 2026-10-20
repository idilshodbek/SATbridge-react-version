/**
 * Icons used across SATbridge, drawn exactly as in the design (24×24 grid).
 *
 * Every icon takes `size` (px) and `strokeWidth`, and inherits `currentColor`,
 * so colour is controlled with Tailwind text classes: `<SearchIcon className="text-muted-2" />`.
 */
import type { CSSProperties, ReactNode, SVGProps } from "react";

export type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  size?: number;
  strokeWidth?: number;
};

type BaseProps = IconProps & { children: ReactNode; filled?: boolean };

function Svg({ size = 20, strokeWidth = 2, filled = false, style, children, ...rest }: BaseProps) {
  const sizeStyle: CSSProperties = {
    width: size,
    height: size,
    flexShrink: 0,
    ...style,
  };
  return (
    <svg
      data-icon=""
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      style={sizeStyle}
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {children}
    </svg>
  );
}

/* ---------- Brand ---------- */

export const BridgeLogoIcon = (p: IconProps) => (
  <Svg strokeWidth={2.4} {...p}>
    <path d="M4 16c4.5 0 3.5-8 8-8s3.6 4.4 8 4.4" />
    <circle cx="4" cy="16" r="1.6" fill="currentColor" stroke="none" />
  </Svg>
);

/** The logo wave without the anchor dot (mobile header and sheets). */
export const BridgeWaveIcon = (p: IconProps) => (
  <Svg strokeWidth={2.4} {...p}>
    <path d="M4 16c4.5 0 3.5-8 8-8s3.6 4.4 8 4.4" />
  </Svg>
);

/* ---------- Navigation ---------- */

export const HomeIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.5 10.5 12 3.5l8.5 7" />
    <path d="M5.6 9.7V20h12.8V9.7" />
    <path d="M9.8 20v-4.6h4.4V20" />
  </Svg>
);

export const CalendarIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="5" width="17" height="15" rx="3.5" />
    <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" />
  </Svg>
);

export const OpenBookIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 6.5c-2-1.6-4.4-2-7-1.8v12.6c2.6-.2 5 .2 7 1.7 2-1.5 4.4-1.9 7-1.7V4.7c-2.6-.2-5 .2-7 1.8Z" />
    <path d="M12 6.5v12.5" />
  </Svg>
);

export const MathIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4.5 7h6M7.5 4v6M4.5 17h6M13.5 7h6M13.5 15h6M13.5 19h6" />
  </Svg>
);

export const QuestionBankIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="4.5" width="17" height="15" rx="3.5" />
    <circle cx="12" cy="12" r="3" />
  </Svg>
);

export const StopwatchIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="13" cy="13" r="7.5" />
    <path d="M13 9.5V13l2.5 1.5M3.5 6 6 3.5" />
  </Svg>
);

export const CardsIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 4.5h6.5v15H5zM12.5 4.5H19v15h-6.5z" />
    <path d="M7.5 8.5h1.5M15 8.5h1.5" />
  </Svg>
);

export const ChartIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4.5 20V4.5M4.5 20H20" />
    <path d="M8.5 16.5v-4M12.5 16.5V8M16.5 16.5v-6" />
  </Svg>
);

export const ChatIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20 12.5c0 3.9-3.6 7-8 7-1 0-2-.2-2.9-.5L4.5 20.5l1.2-3.4A6.6 6.6 0 0 1 4 12.5c0-3.9 3.6-7 8-7s8 3.1 8 7Z" />
    <path d="M9 12h.01M12 12h.01M15 12h.01" />
  </Svg>
);

export const ChatBubbleIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20 12.5c0 3.9-3.6 7-8 7-1 0-2-.2-2.9-.5L4.5 20.5l1.2-3.4A6.6 6.6 0 0 1 4 12.5c0-3.9 3.6-7 8-7s8 3.1 8 7Z" />
  </Svg>
);

export const UsersIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="9" cy="9" r="3" />
    <path d="M3.5 19c0-3 2.5-4.6 5.5-4.6s5.5 1.6 5.5 4.6" />
    <path d="M16 6.6a3 3 0 0 1 0 5.8M17.5 14.8c1.9.5 3 1.9 3 4.2" />
  </Svg>
);

export const UpgradeIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 15.5V8.5M8.8 11.7 12 8.5l3.2 3.2" />
  </Svg>
);

export const MoonIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
  </Svg>
);

export const DotsIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="5.5" cy="12" r="1.6" fill="currentColor" />
    <circle cx="12" cy="12" r="1.6" fill="currentColor" />
    <circle cx="18.5" cy="12" r="1.6" fill="currentColor" />
  </Svg>
);

export const GearIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3.5v2M12 18.5v2M4.5 12h2M17.5 12h2M6.7 6.7l1.4 1.4M15.9 15.9l1.4 1.4M17.3 6.7l-1.4 1.4M8.1 15.9l-1.4 1.4" />
  </Svg>
);

export const BotIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="7" width="17" height="12.5" rx="4.5" />
    <path d="M9 12v2M15 12v2M12 7V3.5" />
  </Svg>
);

export const BoltIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M13 2.5 4.5 14H10l-1 7.5L19.5 10H14l-1-7.5Z" />
  </Svg>
);

export const BoltFilledIcon = (p: IconProps) => (
  <Svg filled {...p}>
    <path d="M13 2.5 4.5 14H10l-1 7.5L19.5 10H14l-1-7.5Z" />
  </Svg>
);

export const BookmarkIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6.5 3.5h11v17l-5.5-4.3-5.5 4.3Z" />
  </Svg>
);

export const FriendsIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="9" cy="9" r="3" />
    <path d="M3.5 19c0-3 2.5-4.6 5.5-4.6s5.5 1.6 5.5 4.6" />
    <path d="M16 6.6a3 3 0 0 1 0 5.8" />
  </Svg>
);

export const DotsVerticalIcon = (p: IconProps) => (
  <Svg filled {...p}>
    <circle cx="12" cy="5" r="1.7" />
    <circle cx="12" cy="12" r="1.7" />
    <circle cx="12" cy="19" r="1.7" />
  </Svg>
);

/* ---------- Actions & arrows ---------- */

export const SearchIcon = (p: IconProps) => (
  <Svg strokeWidth={2.2} {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </Svg>
);

export const ChevronRightIcon = (p: IconProps) => (
  <Svg strokeWidth={2.6} {...p}>
    <path d="m9 5 7 7-7 7" />
  </Svg>
);

export const ChevronLeftIcon = (p: IconProps) => (
  <Svg strokeWidth={2.6} {...p}>
    <path d="m14 6-6 6 6 6" />
  </Svg>
);

export const ChevronDownIcon = (p: IconProps) => (
  <Svg strokeWidth={2.4} {...p}>
    <path d="m6 10 6 6 6-6" />
  </Svg>
);

export const ChevronUpIcon = (p: IconProps) => (
  <Svg strokeWidth={2.6} {...p}>
    <path d="m6 14 6-6 6 6" />
  </Svg>
);

export const ArrowUpRightIcon = (p: IconProps) => (
  <Svg strokeWidth={2.4} {...p}>
    <path d="M7 17 17 7M9 7h8v8" />
  </Svg>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Svg strokeWidth={2.4} {...p}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </Svg>
);

export const ArrowUpIcon = (p: IconProps) => (
  <Svg strokeWidth={2.6} {...p}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </Svg>
);

export const PlayIcon = (p: IconProps) => (
  <Svg filled {...p}>
    <path d="M8 5v14l11-7-11-7Z" />
  </Svg>
);

export const PauseIcon = (p: IconProps) => (
  <Svg filled {...p}>
    <rect x="6" y="4" width="4" height="16" rx="1.4" />
    <rect x="14" y="4" width="4" height="16" rx="1.4" />
  </Svg>
);

export const FastForwardIcon = (p: IconProps) => (
  <Svg filled {...p}>
    <path d="M4 6v12l8-6-8-6ZM13 6v12l8-6-8-6Z" />
  </Svg>
);

export const PlusIcon = (p: IconProps) => (
  <Svg strokeWidth={2.2} {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);

export const MicIcon = (p: IconProps) => (
  <Svg strokeWidth={2.2} {...p}>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M6 11a6 6 0 0 0 12 0M12 17v4" />
  </Svg>
);

export const CheckIcon = (p: IconProps) => (
  <Svg strokeWidth={3} {...p}>
    <path d="m5 13 4.5 4.5L19 7" />
  </Svg>
);

export const DownloadIcon = (p: IconProps) => (
  <Svg strokeWidth={2.4} {...p}>
    <path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19.5h14" />
  </Svg>
);

export const FlagIcon = (p: IconProps) => (
  <Svg strokeWidth={2.2} {...p}>
    <path d="M5 3.5v17M5 5h11l-1.6 3.5L16 12H5" />
  </Svg>
);

export const HighlighterIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 19h16M6 15.5 16.5 5a2.1 2.1 0 0 1 3 3L9 18.5" />
  </Svg>
);

export const SidebarIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4" y="5" width="16" height="14" rx="3" />
    <path d="M9 5v14" />
  </Svg>
);

export const ListIcon = (p: IconProps) => (
  <Svg strokeWidth={2.2} {...p}>
    <path d="M4 7h1.5M4 12h1.5M4 17h1.5M9 7h11M9 12h11M9 17h7" />
  </Svg>
);

export const HistoryIcon = (p: IconProps) => (
  <Svg strokeWidth={2.3} {...p}>
    <path d="M4 11a8 8 0 1 1 2.6 5.9" />
    <path d="M4 5.5V11h5.5" />
    <path d="M12 8.5V12l2.5 1.5" />
  </Svg>
);

/* ---------- Status & content ---------- */

export const ClockIcon = (p: IconProps) => (
  <Svg strokeWidth={2.2} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 8v4l3 2" />
  </Svg>
);

export const TimerIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="13" r="7.5" />
    <path d="M12 9.5V13l2.5 1.5M9 2.5h6" />
  </Svg>
);

export const TagIcon = (p: IconProps) => (
  <Svg strokeWidth={2.2} {...p}>
    <path d="M20.5 13.5 13 21 3 11V3.5h7.5l10 10Z" />
    <circle cx="7.5" cy="7.5" r="1.4" fill="currentColor" />
  </Svg>
);

export const InfoIcon = (p: IconProps) => (
  <Svg strokeWidth={2.4} {...p}>
    <path d="M12 8v.01M12 11.5v5" />
    <circle cx="12" cy="12" r="9" />
  </Svg>
);

export const XCircleIcon = (p: IconProps) => (
  <Svg strokeWidth={2.6} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m9 9 6 6M15 9l-6 6" />
  </Svg>
);

export const CrownIcon = (p: IconProps) => (
  <Svg filled {...p}>
    <path d="M3 8l4.5 3L12 5l4.5 6L21 8v9H3V8Z" />
  </Svg>
);

/** The small triangle used on "Hard" badges. */
export const TrendIcon = (p: IconProps) => (
  <Svg filled {...p}>
    <path d="M4 20 20 4M14 4h6v6" />
  </Svg>
);

export const DocumentIcon = (p: IconProps) => (
  <Svg strokeWidth={2.3} {...p}>
    <path d="M7 3.5h7l4 4V20.5H7z" />
    <path d="M13.5 3.5V8H18" />
  </Svg>
);

export const BookPairIcon = (p: IconProps) => (
  <Svg strokeWidth={2.1} {...p}>
    <path d="M5 5.5h6v13H5zM13 5.5h6v13h-6z" />
  </Svg>
);

/** Keyhole glyph used on locked skill-path nodes. */
export const LockIcon = (p: IconProps) => (
  <Svg filled {...p}>
    <circle cx="12" cy="10" r="3.6" />
    <path d="M10.6 12.5h2.8l1 6.5h-4.8l1-6.5Z" />
  </Svg>
);

export const StarIcon = (p: IconProps) => (
  <Svg filled {...p}>
    <path d="m12 2.5 3 6.3 6.9.9-5 4.8 1.2 6.9L12 18.1l-6.1 3.3 1.2-6.9-5-4.8 6.9-.9 3-6.3Z" />
  </Svg>
);

export const LayersIcon = (p: IconProps) => (
  <Svg filled {...p}>
    <path d="M12 4 2 9l10 5 10-5-10-5Zm0 12.5L5 13v3l7 3.5 7-3.5v-3l-7 3.5Z" />
  </Svg>
);

/* ---------- Pages & features (added for the new menu, same stroke style) ---------- */

export const SunIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7" />
  </Svg>
);

export const CalendarCheckIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="5" width="17" height="15" rx="3.5" />
    <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3M9 14.5l2 2 4-4" />
  </Svg>
);

/** Mountain with a flag: the 1500+ set. */
export const SummitIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 19.5 9.5 9l3.5 5.5 2-3 6 8Z" />
    <path d="M9.5 9V4.5l3.5 1.5-3.5 1.5" />
  </Svg>
);

export const GraduationCapIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M2.5 9.5 12 5l9.5 4.5L12 14Z" />
    <path d="M6.5 11.5V16c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3v-4.5M21.5 9.5v5" />
  </Svg>
);

/** Axes and a curve: Desmos / graphing. */
export const GraphIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 4v16h16" />
    <path d="M7 16c2.2 0 2.8-8 5.5-8s3 5 6.5 5" />
  </Svg>
);

export const TargetIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </Svg>
);

export const MegaphoneIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 10v4a1 1 0 0 0 1 1h2l7 4V5L7 9H5a1 1 0 0 0-1 1Z" />
    <path d="M17.5 9.5a3.5 3.5 0 0 1 0 5M7.5 15l1 4.5" />
  </Svg>
);

export const UserIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c0-3.9 3.1-6 7-6s7 2.1 7 6" />
  </Svg>
);

/** Adult and child: parent access. */
export const ParentIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="8.5" cy="7.5" r="3" />
    <path d="M3.5 19.5c0-3.3 2.2-5.5 5-5.5s5 2.2 5 5.5" />
    <circle cx="17" cy="11" r="2.2" />
    <path d="M14.8 19.5c.2-2.3 1-3.8 2.2-3.8s2.3 1.5 2.5 3.8" />
  </Svg>
);

export const CreditCardIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="3" />
    <path d="M3 10h18M7 14.5h3" />
  </Svg>
);

export const CalculatorIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="5" y="3" width="14" height="18" rx="3" />
    <path d="M8.5 7.5h7M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01" />
  </Svg>
);

export const KeyboardIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="2.5" y="6" width="19" height="12" rx="3" />
    <path d="M6 10h.01M9.5 10h.01M13 10h.01M16.5 10h.01M8 14h8" />
  </Svg>
);

export const TrophyIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M8 4.5h8v5a4 4 0 0 1-8 0v-5Z" />
    <path d="M8 6.5H5a3 3 0 0 0 3 3.5M16 6.5h3a3 3 0 0 1-3 3.5M12 13.5v3M8.5 19.5h7M10 16.5h4" />
  </Svg>
);

export const BulbIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.5a6 6 0 0 0-3.5 10.9c.3.3.5.7.5 1.1v.5h6v-.5c0-.4.2-.8.5-1.1A6 6 0 0 0 12 3.5Z" />
    <path d="M9.5 19h5M10.5 21.5h3" />
  </Svg>
);

export const ShieldIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.5 5 6.5v5c0 4.2 3 7.6 7 9 4-1.4 7-4.8 7-9v-5l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </Svg>
);

export const BellIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15L6 16.5Z" />
    <path d="M10 20.5a2.2 2.2 0 0 0 4 0" />
  </Svg>
);

export const MailIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="3" />
    <path d="m4 7.5 8 6 8-6" />
  </Svg>
);

/* ---------- Multi-colour glyphs ---------- */

export const FlameIcon = ({ size = 17, ...p }: IconProps) => (
  <Svg size={size} {...p}>
    <path
      d="M12 2.5c2.8 3.9 5.7 5.4 5.7 9.2A5.7 5.7 0 0 1 6.3 11.7c0-3 2.3-4.8 5.7-9.2Z"
      fill="var(--color-orange)"
      stroke="none"
    />
    <path d="M12 10c1.5 1.9 2.6 2.6 2.6 4.4a2.6 2.6 0 0 1-5.2 0c0-1.6 1.1-2.5 2.6-4.4Z" fill="var(--color-gold)" stroke="none" />
  </Svg>
);

export const FlameSolidIcon = (p: IconProps) => (
  <Svg filled {...p}>
    <path d="M12 2.5c2.8 3.9 5.7 5.4 5.7 9.2A5.7 5.7 0 0 1 6.3 11.7c0-3 2.3-4.8 5.7-9.2Z" />
  </Svg>
);

/** XP glyph: the design's blue spark. `highlight` adds the small shine used in top bars. */
export const XpIcon = ({ highlight = false, ...p }: IconProps & { highlight?: boolean }) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" fill="var(--accent)" opacity=".18" stroke="none" />
    <circle cx="12" cy="12" r="5" fill="var(--accent)" stroke="none" />
    {highlight && <circle cx="10.2" cy="10.2" r="1.6" fill="var(--surface)" stroke="none" />}
  </Svg>
);
