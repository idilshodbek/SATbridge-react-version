import { cn, SearchField, toast } from "@heroui/react";
import { useState } from "react";
import { useNavigate } from "react-router";

import { useCommunity } from "@/app/community-context";
import { paths } from "@/app/paths";
import { ChatBubbleIcon, FlameIcon, SearchIcon, TargetIcon, XpIcon } from "@/components/icons";
import { Button, ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { bareInputClass } from "@/components/ui/fields";
import { Icon3D } from "@/components/ui/Icon3D";
import { Panel } from "@/components/ui/Panel";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { inviteLink, type Person, personById, suggestions } from "@/data/social";

import { PersonAvatar } from "./PersonAvatar";

type FriendsView = "friends" | "requests" | "find";

/** Friends: your friends list, incoming requests, and finding or inviting people. */
export function FriendsPage() {
  const { friends, requests } = useCommunity();
  const [view, setView] = useState<FriendsView>(requests.length > 0 ? "requests" : "friends");

  return (
    <div className="flex animate-fade flex-col gap-4.5">
      <SegmentedControl
        aria-label="Friends view"
        tone="ink"
        options={[
          { id: "friends", label: `Friends ${friends.length}` },
          { id: "requests", label: `Requests ${requests.length}` },
          { id: "find", label: "Find people" },
        ]}
        value={view}
        onChange={setView}
        className="w-full justify-start gap-2 md:w-fit"
        itemClassName="flex-1 rounded-[11px] border border-border bg-surface px-2 py-2.5 text-[13px] font-bold text-ink md:flex-none md:px-4 md:text-[13.5px] data-[selected=true]:border-btn"
      />

      {view === "friends" && <FriendList />}
      {view === "requests" && <RequestList />}
      {view === "find" && <FindPeople />}
    </div>
  );
}

function FriendList() {
  const { friends, openDirectChat } = useCommunity();
  const navigate = useNavigate();
  const sorted = [...friends].sort((a, b) => Number(b.isOnline) - Number(a.isOnline) || b.weeklyXp - a.weeklyXp);

  if (sorted.length === 0) {
    return <EmptyState icon="friends" title="No friends yet" text="Find classmates or share your invite link." />;
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-3.5">
      {sorted.map((friend) => (
        <Panel key={friend.id} className="flex flex-col gap-3.5 rounded-[18px] p-4.5">
          <div className="flex items-center gap-3">
            <PersonAvatar person={friend} className="size-12 text-[15px]" />
            <div className="min-w-0 flex-1">
              <div className="truncate text-[16px] font-extrabold">{friend.name}</div>
              <div className={cn("truncate text-[12.5px] font-semibold", friend.isOnline ? "text-success-ink" : "text-muted-2")}>
                {friend.isOnline ? friend.activity : `Active ${friend.activity}`}
              </div>
            </div>
          </div>
          <PersonStats person={friend} />
          <div className="flex gap-2">
            <Button
              tone="brand"
              onPress={() => navigate(paths.chat(openDirectChat(friend.id)))}
              className="flex-1 gap-2 rounded-xl py-2.5 text-[13.5px]"
            >
              <ChatBubbleIcon size={16} />
              Message
            </Button>
            <ButtonLink href={paths.profile} tone="outline" className="flex-1 rounded-xl py-2.5 text-[13.5px]">
              Profile
            </ButtonLink>
          </div>
        </Panel>
      ))}
    </div>
  );
}

/** Streak, weekly XP and predicted score in one row. */
function PersonStats({ person }: { person: Person }) {
  const stats = [
    {
      icon: <FlameIcon size={15} />,
      value: `${person.streak}`,
      label: "day streak",
    },
    {
      icon: <XpIcon size={15} />,
      value: person.weeklyXp.toLocaleString("en-US"),
      label: "XP this week",
    },
    {
      icon: <TargetIcon size={15} className="text-on-amber" />,
      value: `${person.predictedScore}`,
      label: "predicted",
    },
  ];
  return (
    <div className="grid grid-cols-3 gap-2 rounded-xl bg-surface-2 p-2.5">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="flex items-center justify-center gap-1 text-[14.5px] font-extrabold">
            {stat.icon}
            {stat.value}
          </div>
          <div className="text-[10.5px] font-semibold text-muted-2">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

function RequestList() {
  const { requests, acceptRequest, declineRequest } = useCommunity();

  if (requests.length === 0) {
    return <EmptyState icon="friends" title="No pending requests" text="When someone adds you, they'll show up here." />;
  }

  return (
    <div className="flex max-w-190 flex-col gap-3">
      {requests.map((person) => (
        <Panel key={person.id} className="flex flex-wrap items-center gap-3.5 rounded-[18px] p-4">
          <PersonAvatar person={person} className="size-12 text-[15px]" />
          <div className="min-w-40 flex-1">
            <div className="text-[16px] font-extrabold">{person.name}</div>
            <div className="text-[12.5px] font-semibold text-muted-2">
              {person.school} · predicted {person.predictedScore}
            </div>
          </div>
          <div className="flex gap-2 max-md:w-full">
            <Button
              tone="brand"
              onPress={() => {
                acceptRequest(person.id);
                toast.success(`You and ${person.name.split(" ")[0]} are now friends`);
              }}
              className="rounded-xl px-5 py-2.5 text-[13.5px] max-md:flex-1"
            >
              Accept
            </Button>
            <Button
              tone="outline"
              onPress={() => declineRequest(person.id)}
              className="rounded-xl px-5 py-2.5 text-[13.5px] max-md:flex-1"
            >
              Decline
            </Button>
          </div>
        </Panel>
      ))}
    </div>
  );
}

function FindPeople() {
  const { others, requestedIds, sendRequest } = useCommunity();
  const [query, setQuery] = useState("");
  const search = query.trim().toLowerCase();

  const reasonFor = (personId: string) => suggestions.find((s) => s.personId === personId)?.reason;
  const results = search
    ? others.filter((p) => p.name.toLowerCase().includes(search) || p.school.toLowerCase().includes(search))
    : suggestions.map((s) => personById(s.personId)).filter((p): p is Person => p !== undefined && others.includes(p));

  const copyInvite = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      toast.success("Invite link copied");
    } catch {
      toast.warning("Couldn't copy. Select the link and copy it manually.");
    }
  };

  return (
    <div className="flex flex-wrap items-start gap-5">
      <div className="flex min-w-[min(100%,420px)] flex-[1_1_520px] flex-col gap-3">
        <SearchField aria-label="Search people" value={query} onChange={setQuery}>
          <SearchField.Group className="h-auto gap-2.75 rounded-2xl border border-border bg-surface px-4 py-3.25 shadow-none">
            <SearchIcon size={18} className="text-muted-2" />
            <SearchField.Input placeholder="Search by name or school" className={cn(bareInputClass, "text-[15px]")} />
          </SearchField.Group>
        </SearchField>

        <div className="px-1 text-[12px] font-extrabold tracking-[1px] text-muted-2">
          {search ? `${results.length} RESULTS` : "PEOPLE YOU MAY KNOW"}
        </div>

        {results.map((person) => {
          const isRequested = requestedIds.has(person.id);
          return (
            <Panel key={person.id} className="flex items-center gap-3.5 rounded-2xl p-3.75">
              <PersonAvatar person={person} className="size-11 text-[14px]" />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[15px] font-bold">{person.name}</div>
                <div className="truncate text-[12.5px] font-semibold text-muted-2">{reasonFor(person.id) ?? person.school}</div>
              </div>
              <Button
                tone={isRequested ? "soft" : "ink"}
                isDisabled={isRequested}
                onPress={() => sendRequest(person.id)}
                className="rounded-xl px-4 py-2.25 text-[13px] data-[disabled=true]:opacity-100"
              >
                {isRequested ? "Requested" : "Add friend"}
              </Button>
            </Panel>
          );
        })}
        {search && results.length === 0 && (
          <EmptyState icon="not-found" title="No one found" text="Try another name, or invite them with your link." />
        )}
      </div>

      <Panel className="flex w-85 max-w-full flex-[1_1_300px] flex-col items-start gap-3 rounded-[18px] p-5.5">
        <Icon3D icon="mail" size={44} />
        <div className="text-[18px] font-extrabold tracking-[-0.3px]">Invite a friend</div>
        <div className="text-[13.5px] leading-[1.55] font-medium text-muted">
          Studying with friends keeps streaks alive. You both get 100 XP when they finish their first session.
        </div>
        <div className="w-full truncate rounded-xl border border-border bg-surface-2 px-3.5 py-2.75 text-[13px] font-semibold text-ink-2">
          {inviteLink}
        </div>
        <Button tone="brand" onPress={copyInvite} className="w-full rounded-xl py-3 text-[13.5px]">
          Copy invite link
        </Button>
      </Panel>
    </div>
  );
}
