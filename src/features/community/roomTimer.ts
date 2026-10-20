import type { StudyRoom } from "@/data/social";

export type RoomPhase = {
  phase: "focus" | "break";
  secondsLeft: number;
  phaseSeconds: number;
};

/**
 * Where a room's shared focus/break timer is `elapsed` seconds after the app opened.
 * Rooms start in a focus block with `secondsLeft` remaining, then alternate break → focus.
 */
export function roomPhase(room: StudyRoom, elapsed: number): RoomPhase {
  const lengths = {
    focus: room.focusMinutes * 60,
    break: room.breakMinutes * 60,
  };
  let phase: RoomPhase["phase"] = "focus";
  let secondsLeft = room.secondsLeft - elapsed;

  while (secondsLeft <= 0) {
    phase = phase === "focus" ? "break" : "focus";
    secondsLeft += lengths[phase];
  }
  return { phase, secondsLeft, phaseSeconds: lengths[phase] };
}
