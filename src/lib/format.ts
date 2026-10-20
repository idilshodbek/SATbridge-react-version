const pad = (value: number) => String(value).padStart(2, "0");

/** 129 → "2:09" */
export function formatClock(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  return `${minutes}:${pad(totalSeconds % 60)}`;
}

/** 81895 → "22h 44m 55s" */
export function formatHms(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours}h ${pad(minutes)}m ${pad(totalSeconds % 60)}s`;
}

/** 0 → "A" */
export const choiceLetter = (index: number) => "ABCD"[index];
