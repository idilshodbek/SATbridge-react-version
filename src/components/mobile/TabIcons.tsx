/**
 * Filled tab-bar glyphs from the mobile design (24×24, white).
 * The second path of a two-tone icon is drawn at reduced opacity.
 * `tests` and `progress` are drawn in the same style for the new tabs.
 */
const tabIconPaths = {
  home: [
    "M11 3.6a1.6 1.6 0 0 1 2 0l7 5.6c.5.4.8 1 .8 1.7v7.6c0 1.4-1.1 2.5-2.5 2.5h-3.1v-4.6c0-1.2-1-2.2-2.2-2.2h-.6c-1.2 0-2.2 1-2.2 2.2V21H6.7c-1.4 0-2.5-1.1-2.5-2.5V11c0-.7.3-1.3.8-1.7l6-4.8Z",
  ],
  practice: [
    "M13.9 2.4c.8-.9 2.3-.2 2.1 1l-.9 5.2h2.7c1.1 0 1.7 1.3 1 2.1l-8.7 10c-.8.9-2.3.2-2.1-1l.9-5.2H6.2c-1.1 0-1.7-1.3-1-2.1l8.7-9.9Z",
  ],
  tests: [
    // Stopwatch body with the hand cut out, plus the top button.
    "M12 5.5a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm-.8 4a.8.8 0 0 0-.8.8v4.2c0 .3.1.5.4.7l2.8 1.8a.8.8 0 1 0 .8-1.4L12 14V10.3a.8.8 0 0 0-.8-.8Z",
    "M9.5 2h5a1 1 0 1 1 0 2h-5a1 1 0 1 1 0-2Z",
  ],
  progress: [
    "M9.75 6.5A1.5 1.5 0 0 1 11.25 5h1.5a1.5 1.5 0 0 1 1.5 1.5V20h-4.5Z",
    "M4 13.5A1.5 1.5 0 0 1 5.5 12H7a1.5 1.5 0 0 1 1.5 1.5V20H4Zm11.5-3A1.5 1.5 0 0 1 17 9h1.5a1.5 1.5 0 0 1 1.5 1.5V20h-4.5Z",
  ],
  more: [
    "M12 4a2.2 2.2 0 1 1 0 4.4A2.2 2.2 0 0 1 12 4Zm0 5.8a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4Zm0 5.8a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4Z",
  ],
};

export type TabIconName = keyof typeof tabIconPaths;

export function TabIcon({ name }: { name: TabIconName }) {
  return (
    <svg
      width={23}
      height={23}
      viewBox="0 0 24 24"
      fill="#ffffff"
      aria-hidden="true"
      data-icon=""
      // A soft shadow lifts the white glyph off the glass bar.
      style={{ filter: "drop-shadow(0 1px 1.5px rgba(4,32,45,.35))" }}
    >
      {tabIconPaths[name].map((d, index) => (
        <path key={d} d={d} fillRule="evenodd" opacity={index === 1 ? 0.78 : 1} />
      ))}
    </svg>
  );
}
