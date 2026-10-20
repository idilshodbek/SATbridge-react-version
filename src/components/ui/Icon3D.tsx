import { cn } from "@heroui/react";
import type { ComponentType, CSSProperties } from "react";

import {
  BellIcon,
  BoltIcon,
  BookmarkIcon,
  BotIcon,
  BulbIcon,
  CalculatorIcon,
  CalendarCheckIcon,
  CalendarIcon,
  CardsIcon,
  ChartIcon,
  ChatBubbleIcon,
  ChatIcon,
  CheckIcon,
  ClockIcon,
  CreditCardIcon,
  CrownIcon,
  DocumentIcon,
  DotsIcon,
  FlagIcon,
  FlameSolidIcon,
  FriendsIcon,
  GearIcon,
  GraduationCapIcon,
  GraphIcon,
  type IconProps,
  InfoIcon,
  KeyboardIcon,
  LayersIcon,
  LockIcon,
  MailIcon,
  MathIcon,
  MegaphoneIcon,
  MoonIcon,
  OpenBookIcon,
  ParentIcon,
  PlusIcon,
  QuestionBankIcon,
  SearchIcon,
  ShieldIcon,
  StarIcon,
  StopwatchIcon,
  SummitIcon,
  SunIcon,
  TargetIcon,
  TimerIcon,
  TrendIcon,
  TrophyIcon,
  UserIcon,
  UsersIcon,
} from "@/components/icons";

/*
 * 3D icons in the SATbridge palette: a glossy gradient tile (like the logo tile) with a white glyph,
 * a top highlight and a soft shadow in the tile's own colour.
 * Each section of the app has one colour, so the sidebar reads as colour-coded groups.
 */

/** Tile colours, taken from the design (brand blue, pink, green, violet, amber, streak orange, slate). */
const tones = {
  blue: { from: "#3ED0F5", to: "#009ADA", glow: "rgba(0,154,218,.4)" },
  violet: { from: "#A78BFA", to: "#7C3AED", glow: "rgba(124,58,237,.36)" },
  pink: { from: "#F273BE", to: "#E5308F", glow: "rgba(229,48,143,.36)" },
  green: { from: "#7BE3A6", to: "#22C55E", glow: "rgba(34,197,94,.36)" },
  amber: { from: "#FFD66B", to: "#F59E0B", glow: "rgba(245,158,11,.38)" },
  orange: { from: "#FDBA74", to: "#F97316", glow: "rgba(249,115,22,.36)" },
  slate: { from: "#8FB3C4", to: "#41586A", glow: "rgba(15,36,48,.3)" },
};

export type Icon3DTone = keyof typeof tones;

type IconEntry = { glyph: ComponentType<IconProps>; tone: Icon3DTone };

const entry = (glyph: ComponentType<IconProps>, tone: Icon3DTone): IconEntry => ({ glyph, tone });

/** Every 3D icon, named by what it stands for. Add a line here to add an icon. */
const icons = {
  /* Today */
  today: entry(SunIcon, "blue"),
  plan: entry(CalendarIcon, "blue"),
  tutor: entry(BotIcon, "blue"),

  /* Practice */
  "question-bank": entry(QuestionBankIcon, "violet"),
  rush: entry(BoltIcon, "violet"),
  "daily-question": entry(CalendarCheckIcon, "violet"),
  "advanced-set": entry(SummitIcon, "violet"),
  mistakes: entry(BookmarkIcon, "violet"),

  /* Tests */
  "full-length": entry(StopwatchIcon, "pink"),
  section: entry(LayersIcon, "pink"),
  reports: entry(DocumentIcon, "pink"),

  /* Learn */
  lessons: entry(GraduationCapIcon, "green"),
  desmos: entry(GraphIcon, "green"),
  vocab: entry(CardsIcon, "green"),
  reading: entry(OpenBookIcon, "pink"),
  math: entry(MathIcon, "blue"),

  /* Progress */
  "predicted-score": entry(TargetIcon, "amber"),
  analytics: entry(ChartIcon, "amber"),
  gains: entry(TrendIcon, "green"),

  /* Community */
  community: entry(ChatIcon, "blue"),
  feed: entry(MegaphoneIcon, "blue"),
  chats: entry(ChatBubbleIcon, "blue"),
  friends: entry(FriendsIcon, "blue"),
  rooms: entry(TimerIcon, "blue"),
  invite: entry(PlusIcon, "blue"),

  /* Account */
  profile: entry(UserIcon, "slate"),
  billing: entry(CreditCardIcon, "slate"),
  parents: entry(ParentIcon, "slate"),
  settings: entry(GearIcon, "slate"),
  classes: entry(UsersIcon, "slate"),
  upgrade: entry(CrownIcon, "amber"),
  "dark-mode": entry(MoonIcon, "violet"),
  more: entry(DotsIcon, "slate"),

  /* Support & resources */
  help: entry(InfoIcon, "slate"),
  support: entry(ChatBubbleIcon, "slate"),
  "bug-report": entry(FlagIcon, "slate"),
  feedback: entry(StarIcon, "slate"),
  calculator: entry(CalculatorIcon, "slate"),
  shortcuts: entry(KeyboardIcon, "slate"),
  blog: entry(DocumentIcon, "slate"),
  invoices: entry(DocumentIcon, "slate"),

  /* Feature cards and empty states */
  streak: entry(FlameSolidIcon, "orange"),
  trophy: entry(TrophyIcon, "amber"),
  idea: entry(BulbIcon, "amber"),
  info: entry(InfoIcon, "blue"),
  success: entry(CheckIcon, "green"),
  goal: entry(TargetIcon, "pink"),
  timer: entry(ClockIcon, "blue"),
  mail: entry(MailIcon, "blue"),
  notifications: entry(BellIcon, "amber"),
  privacy: entry(ShieldIcon, "green"),
  lock: entry(LockIcon, "slate"),
  "not-found": entry(SearchIcon, "slate"),
  "plan-free": entry(StarIcon, "blue"),
  "plan-pro": entry(CrownIcon, "pink"),
  "plan-tutoring": entry(GraduationCapIcon, "violet"),
} satisfies Record<string, IconEntry>;

export type Icon3DName = keyof typeof icons;

type Icon3DProps = {
  icon: Icon3DName;
  /** Tile size in px (square). */
  size?: number;
  /** Overrides the icon's section colour. */
  tone?: Icon3DTone;
  className?: string;
};

export function Icon3D({ icon, size = 24, tone, className }: Icon3DProps) {
  const { glyph: Glyph, tone: defaultTone } = icons[icon];
  const colors = tones[tone ?? defaultTone];
  const depth = Math.max(1, Math.round(size * 0.07));

  const tileStyle: CSSProperties = {
    width: size,
    height: size,
    borderRadius: Math.round(size * 0.3),
    background: `linear-gradient(145deg, ${colors.from}, ${colors.to})`,
    boxShadow: [
      "inset 0 1px 0 rgba(255,255,255,.5)", // top highlight
      `inset 0 -${depth}px 0 rgba(0,0,0,.12)`, // bottom bevel
      `0 ${depth + 1}px ${Math.round(size * 0.3)}px -${depth}px ${colors.glow}`, // soft shadow in the tile colour
    ].join(", "),
  };

  return (
    <span
      aria-hidden="true"
      data-icon=""
      className={cn("relative grid flex-none place-items-center overflow-hidden", className)}
      style={tileStyle}
    >
      {/* Glossy sheen across the top-left */}
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_25%_0%,rgba(255,255,255,.38),transparent_55%)]" />
      <Glyph
        // Small tiles get a relatively bigger glyph so it stays legible.
        size={Math.round(size * (size < 30 ? 0.62 : 0.56))}
        strokeWidth={2.3}
        className="relative text-white"
        style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,.2))" }}
      />
    </span>
  );
}
