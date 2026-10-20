import { cn, Modal, Switch } from "@heroui/react";
import { useState } from "react";
import { useNavigate } from "react-router";

import { useCommunity } from "@/app/community-context";
import { paths } from "@/app/paths";
import { PlusIcon } from "@/components/icons";
import { Button, ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { HelpHint } from "@/components/ui/HelpHint";
import { TextInputField } from "@/components/ui/FormFields";
import { Icon3D } from "@/components/ui/Icon3D";
import { Panel } from "@/components/ui/Panel";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { personById, type StudyRoom } from "@/data/social";
import { useAppClock } from "@/hooks/useAppClock";
import { formatClock } from "@/lib/format";

import { PersonAvatar } from "./PersonAvatar";
import { roomPhase } from "./roomTimer";

type RoomFilter = "all" | "Math" | "R&W" | "silent";

const subjectChip: Record<StudyRoom["subject"], string> = {
  Math: "bg-tint-blue text-on-blue",
  "R&W": "bg-tint-pink text-on-pink",
  Mixed: "bg-tint-violet text-on-violet",
};

/** Study rooms: live focus rooms with a shared timer. Join one or start your own. */
export function StudyRoomsPage() {
  const { rooms, joinedRoomId, joinRoom } = useCommunity();
  const navigate = useNavigate();
  const elapsed = useAppClock();
  const [filter, setFilter] = useState<RoomFilter>("all");
  const [isCreating, setIsCreating] = useState(false);

  const joinedRoom = rooms.find((room) => room.id === joinedRoomId);
  const visible = rooms.filter((room) =>
    filter === "all" ? true : filter === "silent" ? room.isSilent : room.subject === filter || room.subject === "Mixed",
  );

  const join = (roomId: string) => {
    joinRoom(roomId);
    navigate(paths.studyRoom(roomId));
  };

  return (
    <div className="flex animate-fade flex-col gap-4">
      {joinedRoom && (
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-tint-green-bd bg-tint-green px-4.5 py-3.5">
          <Icon3D icon="rooms" size={32} tone="green" />
          <div className="min-w-0 flex-1 text-[14.5px] font-bold text-on-green">You're in {joinedRoom.name}</div>
          <ButtonLink
            href={paths.studyRoom(joinedRoom.id)}
            tone="brand"
            className="bg-success px-4.5 py-2.25 text-[13.5px] hover:bg-success"
          >
            Back to room
          </ButtonLink>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <SegmentedControl
            aria-label="Filter rooms"
            options={[
              { id: "all", label: "All" },
              { id: "Math", label: "Math" },
              { id: "R&W", label: "R&W" },
              { id: "silent", label: "Silent" },
            ]}
            value={filter}
            onChange={setFilter}
            className="gap-1 rounded-[13px] border border-border bg-surface p-1"
            itemClassName="rounded-[9px] px-3.5 py-2 text-[12.5px]"
          />
          <HelpHint title="Silent rooms">
            No chat, just the shared focus timer and who else is studying. Good for when you want company without the distraction.
          </HelpHint>
        </div>
        <Button tone="ink" onPress={() => setIsCreating(true)} className="gap-2 rounded-xl px-4.5 py-2.75 text-[13.5px]">
          <PlusIcon size={16} />
          Create room
        </Button>
      </div>

      {visible.length === 0 ? (
        <EmptyState icon="rooms" title="No rooms like that right now" text="Start one and your friends will see it here." />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-3.5">
          {visible.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              elapsed={elapsed}
              isJoined={room.id === joinedRoomId}
              onJoin={() => join(room.id)}
            />
          ))}
        </div>
      )}

      <CreateRoomModal isOpen={isCreating} onOpenChange={setIsCreating} />
    </div>
  );
}

type RoomCardProps = {
  room: StudyRoom;
  elapsed: number;
  isJoined: boolean;
  onJoin: () => void;
};

function RoomCard({ room, elapsed, isJoined, onJoin }: RoomCardProps) {
  const { phase, secondsLeft } = roomPhase(room, elapsed);
  const members = room.memberIds.map(personById).filter((p) => p !== undefined);
  const host = room.hostId === "me" ? "You" : personById(room.hostId)?.name.split(" ")[0];
  const isFull = members.length >= room.capacity;

  return (
    <Panel className="flex flex-col gap-3.5 rounded-[18px] p-4.5">
      <div className="flex flex-wrap items-center gap-2">
        <span className={cn("rounded-full px-2.5 py-1 text-[11.5px] font-extrabold", subjectChip[room.subject])}>
          {room.subject}
        </span>
        {room.isSilent && (
          <span className="rounded-full bg-surface-3 px-2.5 py-1 text-[11.5px] font-extrabold text-muted">Silent</span>
        )}
        <span
          className={cn(
            "ml-auto flex items-center gap-1.5 text-[13px] font-extrabold tabular-nums",
            phase === "focus" ? "text-accent" : "text-success-ink",
          )}
        >
          <span className={cn("size-2 animate-pulse rounded-full", phase === "focus" ? "bg-accent" : "bg-success")} />
          {phase === "focus" ? "Focus" : "Break"} · {formatClock(secondsLeft)}
        </span>
      </div>

      <div>
        <div className="text-[18px] font-extrabold tracking-[-0.4px]">{room.name}</div>
        <div className="mt-0.5 text-[13px] font-semibold text-muted-2">
          {room.topic} · {room.focusMinutes}/{room.breakMinutes} min · hosted by {host}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex pl-2">
          {members.slice(0, 5).map((member) => (
            <span key={member.id} className="-ml-2 rounded-full border-2 border-surface">
              <PersonAvatar person={member} showOnline={false} className="size-8 text-[11px]" />
            </span>
          ))}
          {members.length === 0 && <span className="text-[13px] font-semibold text-muted-2">Be the first one in</span>}
        </div>
        <span className="text-[12.5px] font-bold text-muted-2">
          {members.length}/{room.capacity}
        </span>
        <Button
          tone={isJoined ? "soft" : "brand"}
          isDisabled={isFull && !isJoined}
          onPress={onJoin}
          className="ml-auto rounded-xl px-4.5 py-2.25 text-[13.5px]"
        >
          {isJoined ? "Open" : isFull ? "Full" : "Join"}
        </Button>
      </div>
    </Panel>
  );
}

const focusLengths = ["25", "45", "50"] as const;
const subjects: StudyRoom["subject"][] = ["Mixed", "Math", "R&W"];

function CreateRoomModal({ isOpen, onOpenChange }: { isOpen: boolean; onOpenChange: (isOpen: boolean) => void }) {
  const { createRoom } = useCommunity();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState<StudyRoom["subject"]>("Mixed");
  const [focus, setFocus] = useState<(typeof focusLengths)[number]>("25");
  const [isSilent, setIsSilent] = useState(false);

  const create = () => {
    const roomId = createRoom({
      name: name.trim() || "My study room",
      topic: topic.trim() || "Whatever's in my plan",
      subject,
      focusMinutes: Number(focus),
      isSilent,
    });
    onOpenChange(false);
    setName("");
    setTopic("");
    navigate(paths.studyRoom(roomId));
  };

  return (
    <Modal.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Container placement="center" className="p-4">
        <Modal.Dialog aria-label="Create a study room" className="w-110 max-w-full rounded-[20px] bg-surface p-6">
          <div className="mb-5 flex items-center gap-3">
            <Icon3D icon="rooms" size={42} />
            <div>
              <Modal.Heading className="text-[21px] font-extrabold tracking-[-0.5px] text-ink">Create a study room</Modal.Heading>
              <div className="text-[13px] font-semibold text-muted-2">Friends can join and share your timer.</div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <TextInputField label="Room name" value={name} onChange={setName} placeholder="My study room" />
            <TextInputField label="What are you working on?" value={topic} onChange={setTopic} placeholder="Vocab sets 12–14" />
            <div>
              <div className="mb-1.5 text-[13.5px] font-bold text-muted">Subject</div>
              <SegmentedControl
                aria-label="Subject"
                options={subjects.map((s) => ({ id: s, label: s }))}
                value={subject}
                onChange={setSubject}
                className="w-full gap-1 rounded-xl border border-border bg-surface-2 p-1"
                itemClassName="flex-1 rounded-lg py-2 text-[13px]"
              />
            </div>
            <div>
              <div className="mb-1.5 text-[13.5px] font-bold text-muted">Focus block</div>
              <SegmentedControl
                aria-label="Focus block length"
                options={focusLengths.map((m) => ({
                  id: m,
                  label: `${m} min`,
                }))}
                value={focus}
                onChange={setFocus}
                className="w-full gap-1 rounded-xl border border-border bg-surface-2 p-1"
                itemClassName="flex-1 rounded-lg py-2 text-[13px]"
              />
            </div>
            <Switch isSelected={isSilent} onChange={setIsSilent} className="group w-full">
              <Switch.Content className="flex w-full items-center justify-between gap-3">
                <span>
                  <span className="block text-[14.5px] font-bold">Silent room</span>
                  <span className="block text-[12.5px] font-semibold text-muted-2">No chat, just the shared timer</span>
                </span>
                <Switch.Control className="h-5.5 w-10 rounded-full bg-border-2 group-data-[selected=true]:bg-accent">
                  <Switch.Thumb className="ms-0.75 size-4 rounded-full bg-white shadow-none group-data-[selected=true]:ms-5.25 group-data-[selected=true]:bg-white" />
                </Switch.Control>
              </Switch.Content>
            </Switch>
          </div>

          <div className="mt-6 flex gap-2.5">
            <Button slot="close" tone="outline" className="flex-1 rounded-xl py-3 text-[14px]">
              Cancel
            </Button>
            <Button tone="brand" onPress={create} className="flex-1 rounded-xl py-3 text-[14px]">
              Create & join
            </Button>
          </div>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}
