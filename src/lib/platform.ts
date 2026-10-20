/** True on macOS / iOS, where shortcuts use ⌘ instead of Ctrl. */
export const isApplePlatform = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

/** "⌘" on Apple devices, "Ctrl" elsewhere, for shortcut hints. */
export const modifierKeyLabel = isApplePlatform ? "⌘" : "Ctrl";
