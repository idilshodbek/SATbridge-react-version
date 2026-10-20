import { cn, Input } from "@heroui/react";
import { type FormEvent, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";

import { useCommunity } from "@/app/community-context";
import { paths } from "@/app/paths";
import { ArrowRightIcon, BoltIcon, CardsIcon } from "@/components/icons";
import { Button, ButtonLink } from "@/components/ui/Button";
import { DonutRing } from "@/components/ui/DonutRing";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon3D } from "@/components/ui/Icon3D";
import { InitialsAvatar } from "@/components/ui/InitialsAvatar";
import { Panel } from "@/components/ui/Panel";
import { personById, type StudyRoom } from "@/data/social";
import { currentUser } from "@/data/user";
import { useAppClock } from "@/hooks/useAppClock";
import { formatClock } from "@/lib/format";

import { PersonAvatar } from "./PersonAvatar";
import { roomPhase } from "./roomTimer";

/** One study room: the shared focus timer, who's in, your goal and the room chat. */
export function StudyRoomPage() {
  const { roomId } = useParams();
  const { rooms } = useCommunity();
  const room = rooms.find((r) => r.id === roomId);

  if (!room) return <Navigate to={paths.studyRooms} replace />;
  return <Room room={room} />;
}

function Room({ room }: { room: StudyRoom }) {
  const { joinedRoomId, joinRoom, leaveRoom } = useCommunity();
  const navigate = useNavigate();
  const elapsed = useAppClock();
  const [goal, setGoal] = useState("");
  const [savedGoal, setSavedGoal] = useState("");

  const isJoined = joinedRoomId === room.id;
  const { phase, secondsLeft, phaseSeconds } = roomPhase(room, elapsed);
  const phaseProgress = ((phaseSeconds - secondsLeft) / phaseSeconds) * 100;
  const phaseColor = phase === "focus" ? "#009ADA" : "#22C55E";
  const members = room.memberIds.map(personById).filter((p) => p !== undefined);

  const leave = () => {
    leaveRoom();
    navigate(paths.studyRooms);
  };

  const saveGoal = (event: FormEvent) => {
    event.preventDefault();
    setSavedGoal(goal.trim());
  };

  return (
    <div className="flex animate-fade flex-wrap items-start gap-5">
      <div className="flex min-w-[min(100%,420px)] flex-[1_1_560px] flex-col gap-4">
        <Panel className="flex flex-col items-center gap-4 rounded-[20px] p-6 text-center">
          <div className="flex w-full flex-wrap items-center gap-2 text-left">
            <div className="min-w-0 flex-1">
              <h2 className="text-[20px] font-extrabold tracking-[-0.5px] max-md:hidden">{room.name}</h2>
              <div className="text-[13px] font-semibold text-muted-2">
                {room.topic} · {room.subject}
                {room.isSilent && " · silent"}
              </div>
            </div>
            {isJoined ? (
              <Button tone="outline" onPress={leave} className="rounded-xl px-4 py-2.25 text-[13px] text-danger-ink">
                Leave room
              </Button>
            ) : (
              <Button tone="brand" onPress={() => joinRoom(room.id)} className="rounded-xl px-4.5 py-2.25 text-[13px]">
                Join room
              </Button>
            )}
          </div>

          <DonutRing size={220} holeSize={188} value={phaseProgress} color={phaseColor}>
            <div className="text-[12px] font-extrabold tracking-[1.2px]" style={{ color: phaseColor }}>
              {phase === "focus" ? "FOCUS" : "BREAK"}
            </div>
            <div className="text-[52px] leading-none font-extrabold tracking-[-2px] tabular-nums" role="timer">
              {formatClock(secondsLeft)}
            </div>
            <div className="mt-1.5 text-[12.5px] font-semibold text-muted-2">
              {room.focusMinutes} min focus · {room.breakMinutes} min break
            </div>
          </DonutRing>

          <form onSubmit={saveGoal} className="flex w-full max-w-110 items-center gap-2">
            <Input
              aria-label="Your goal for this block"
              placeholder="Your goal for this block, e.g. 15 trig questions"
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
              className="h-auto min-w-0 flex-1 rounded-xl border border-border bg-surface-2 px-3.5 py-2.75 text-[14.5px] font-medium shadow-none placeholder:text-muted-2"
            />
            <Button type="submit" tone="ink" isDisabled={!goal.trim()} className="rounded-xl px-4 py-2.75 text-[13.5px]">
              Set
            </Button>
          </form>

          <div className="flex flex-wrap justify-center gap-2.5">
            <ButtonLink href={paths.rush} tone="violet-soft" className="gap-2 rounded-xl px-4.5 py-2.5 text-[13.5px]">
              <BoltIcon size={16} />
              Start a Rush
            </ButtonLink>
            <ButtonLink href={paths.vocab} tone="soft" className="gap-2 rounded-xl px-4.5 py-2.5 text-[13.5px]">
              <CardsIcon size={16} />
              Review vocab
            </ButtonLink>
          </div>
        </Panel>

        <Panel className="rounded-[18px] p-5">
          <Eyebrow className="mb-3.5">IN THE ROOM · {members.length + (isJoined ? 1 : 0)}</Eyebrow>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,200px),1fr))] gap-2.5">
            {isJoined && (
              <div className="flex items-center gap-3 rounded-xl border border-tint-violet-bd bg-tint-violet p-2.75">
                <InitialsAvatar
                  initials={currentUser.initials}
                  background="linear-gradient(140deg,#7BE3A6,#009ADA)"
                  className="size-9.5"
                  fallbackClassName="text-[12.5px] text-[#04303F]"
                />
                <div className="min-w-0">
                  <div className="text-[14px] font-bold">You</div>
                  <div className="truncate text-[12px] font-semibold text-muted">{savedGoal || "Focusing"}</div>
                </div>
              </div>
            )}
            {members.map((member) => (
              <div key={member.id} className="flex items-center gap-3 rounded-xl border border-border bg-surface-2 p-2.75">
                <PersonAvatar person={member} className="size-9.5 text-[12.5px]" />
                <div className="min-w-0">
                  <div className="truncate text-[14px] font-bold">
                    {member.name.split(" ")[0]}
                    {member.id === room.hostId && <span className="ml-1.5 text-[11px] font-extrabold text-on-amber">HOST</span>}
                  </div>
                  <div className="truncate text-[12px] font-semibold text-muted">
                    {phase === "focus" ? "Focusing" : "On a break"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <RoomChat room={room} />
    </div>
  );
}

function RoomChat({ room }: { room: StudyRoom }) {
  const { roomMessages, sendRoomMessage } = useCommunity();
  const [draft, setDraft] = useState("");
  const messages = roomMessages[room.id] ?? [];

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    sendRoomMessage(room.id, text);
    setDraft("");
  };

  if (room.isSilent) {
    return (
      <Panel className="flex w-85 max-w-full flex-[1_1_300px] flex-col items-center gap-2 rounded-[18px] p-6 text-center">
        <Icon3D icon="lock" size={44} />
        <div className="text-[16px] font-extrabold">Silent room</div>
        <div className="text-[13.5px] font-semibold text-muted-2">
          Chat is off so everyone can focus. Say hi during the break.
        </div>
      </Panel>
    );
  }

  return (
    <Panel className="flex max-h-140 w-85 max-w-full flex-[1_1_300px] flex-col overflow-hidden rounded-[18px]">
      <div className="flex items-center gap-2 border-b border-border px-4.5 py-3.5">
        <Icon3D icon="chats" size={24} />
        <Eyebrow>ROOM CHAT</Eyebrow>
      </div>
      <div className="flex min-h-40 flex-1 flex-col gap-2.5 overflow-y-auto p-4">
        {messages.length === 0 && <div className="m-auto text-[13px] font-semibold text-muted-2">No messages yet</div>}
        {messages.map((message) => {
          const isMine = message.authorId === "me";
          const author = personById(message.authorId);
          return (
            <div
              key={message.id}
              className={cn("flex max-w-[88%] flex-col", isMine ? "items-end self-end" : "items-start self-start")}
            >
              {!isMine && <div className="px-1 text-[11.5px] font-bold text-muted">{author?.name.split(" ")[0]}</div>}
              <div
                className={cn(
                  "rounded-2xl px-3.25 py-2 text-[14px] leading-[1.45] font-medium",
                  isMine ? "bg-accent text-white" : "bg-surface-3 text-ink",
                )}
              >
                {message.text}
              </div>
            </div>
          );
        })}
      </div>
      <form onSubmit={submit} className="flex items-center gap-2 border-t border-border p-3">
        <Input
          aria-label="Message the room"
          placeholder="Message the room…"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          className="h-auto min-w-0 flex-1 rounded-xl border border-border bg-surface-2 px-3.25 py-2.5 text-[14px] font-medium shadow-none placeholder:text-muted-2"
        />
        <Button
          type="submit"
          aria-label="Send"
          tone="brand"
          isDisabled={!draft.trim()}
          className="size-10 flex-none rounded-xl p-0"
        >
          <ArrowRightIcon size={17} />
        </Button>
      </form>
    </Panel>
  );
}
