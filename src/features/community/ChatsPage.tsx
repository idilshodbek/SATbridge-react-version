import { cn, Input, Link, SearchField } from "@heroui/react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { Navigate, useParams } from "react-router";

import { useCommunity } from "@/app/community-context";
import { paths } from "@/app/paths";
import { ArrowRightIcon, ChatBubbleIcon, PlusIcon, SearchIcon } from "@/components/icons";
import { Button, ButtonLink } from "@/components/ui/Button";
import { bareInputClass } from "@/components/ui/fields";
import { Icon3D } from "@/components/ui/Icon3D";
import { InitialsAvatar } from "@/components/ui/InitialsAvatar";
import { Panel } from "@/components/ui/Panel";
import { type Chat, type ChatMessage, personById } from "@/data/social";
import { useIsMobile } from "@/hooks/useIsMobile";

/** Chats: the list on the left, the open conversation on the right (one at a time on phones). */
export function ChatsPage() {
  const { chatId } = useParams();
  const { chats } = useCommunity();
  const isMobile = useIsMobile();
  const chat = chats.find((c) => c.id === chatId);

  if (chatId && !chat) return <Navigate to={paths.chats} replace />;

  if (isMobile) return chat ? <ChatThread chat={chat} /> : <ChatList activeId={undefined} />;

  return (
    <Panel className="grid h-[calc(100dvh-230px)] min-h-120 animate-fade grid-cols-[320px_minmax(0,1fr)] overflow-hidden rounded-[18px]">
      <div className="min-h-0 overflow-y-auto border-r border-border p-3">
        <ChatList activeId={chat?.id} />
      </div>
      {chat ? <ChatThread chat={chat} /> : <EmptyThread />}
    </Panel>
  );
}

function ChatList({ activeId }: { activeId: string | undefined }) {
  const { chats, markRead } = useCommunity();
  const [query, setQuery] = useState("");
  const visible = chats.filter((chat) => chat.name.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <SearchField aria-label="Search chats" value={query} onChange={setQuery} className="min-w-0 flex-1">
          <SearchField.Group className="h-auto gap-2.5 rounded-xl border border-border bg-surface px-3.5 py-2.5 shadow-none">
            <SearchIcon size={16} className="text-muted-2" />
            <SearchField.Input placeholder="Search chats" className={cn(bareInputClass, "text-[14.5px]")} />
          </SearchField.Group>
        </SearchField>
        <ButtonLink
          href={paths.friends}
          tone="outline"
          aria-label="New chat"
          className="size-10.5 flex-none rounded-xl p-0 text-muted"
        >
          <PlusIcon size={18} />
        </ButtonLink>
      </div>

      {visible.map((chat) => {
        const last = chat.messages.at(-1);
        const isActive = chat.id === activeId;
        return (
          <Link
            key={chat.id}
            href={paths.chat(chat.id)}
            onPress={() => markRead(chat.id)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex w-full items-center gap-3 rounded-2xl border px-3 py-3 font-normal text-ink no-underline",
              isActive ? "border-tint-blue-bd bg-tint-blue" : "border-border bg-surface hover:bg-surface-2",
            )}
          >
            <ChatAvatar chat={chat} />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <span className="min-w-0 flex-1 truncate text-[15px] font-bold">{chat.name}</span>
                <span className="flex-none text-[11.5px] font-semibold text-muted-2">{last?.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-muted">
                  {last ? `${authorName(last, chat)}${last.text}` : "Say hi 👋"}
                </span>
                {chat.unread > 0 && !isActive && (
                  <span className="grid h-5 min-w-5 flex-none place-items-center rounded-full bg-success px-1.5 text-[11px] font-extrabold text-[#052E14]">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </Link>
        );
      })}
      {visible.length === 0 && (
        <div className="px-2 py-6 text-center text-[14px] font-semibold text-muted-2">No chats match "{query}"</div>
      )}
    </div>
  );
}

/** "You: " / "Malika: " prefix for the last message preview in group chats. */
function authorName(message: ChatMessage, chat: Chat) {
  if (message.authorId === "me") return "You: ";
  if (chat.kind === "direct") return "";
  return `${personById(message.authorId)?.name.split(" ")[0] ?? ""}: `;
}

function ChatAvatar({ chat, size = "md" }: { chat: Chat; size?: "sm" | "md" }) {
  const dimension = size === "md" ? "size-11" : "size-9.5";
  if (chat.kind === "direct") {
    const person = personById(chat.memberIds[0]);
    return (
      <InitialsAvatar
        initials={person?.initials ?? "?"}
        background={chat.color}
        className={dimension}
        fallbackClassName="text-[13px]"
      />
    );
  }
  return (
    <span className={cn("grid flex-none place-items-center rounded-[14px]", dimension)} style={{ background: chat.color }}>
      <ChatBubbleIcon size={size === "md" ? 22 : 18} strokeWidth={2.2} className="text-white" />
    </span>
  );
}

function ChatThread({ chat }: { chat: Chat }) {
  const { sendMessage, typingChatId } = useCommunity();
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const isTyping = typingChatId === chat.id;

  // Keep the newest message in view.
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [chat.messages.length, isTyping]);

  const members = chat.memberIds.map(personById).filter((p) => p !== undefined);
  const onlineCount = members.filter((m) => m.isOnline).length;
  const subtitle =
    chat.kind === "group"
      ? `${members.length + 1} members · ${onlineCount} online`
      : members[0]?.isOnline
        ? `Online · ${members[0].activity}`
        : `Last seen ${members[0]?.activity ?? "recently"}`;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    sendMessage(chat.id, text);
    setDraft("");
  };

  return (
    <div className="flex min-h-0 animate-fade flex-col max-md:min-h-[calc(100dvh-190px)]">
      <div className="flex flex-none items-center gap-3 border-b border-border px-5 py-3.5 max-md:hidden">
        <ChatAvatar chat={chat} size="sm" />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[16px] font-extrabold">{chat.name}</div>
          <div className="text-[12.5px] font-semibold text-muted-2">{subtitle}</div>
        </div>
        {chat.kind === "direct" && (
          <ButtonLink href={paths.profile} tone="outline" className="px-4 py-2 text-[13px]">
            View profile
          </ButtonLink>
        )}
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto px-1 py-2 md:px-5 md:py-4">
        {chat.messages.length === 0 && (
          <div className="m-auto flex flex-col items-center gap-2 py-10 text-center">
            <Icon3D icon="chats" size={52} />
            <div className="text-[15px] font-bold">Start the conversation</div>
            <div className="text-[13px] font-semibold text-muted-2">Share a tip, a question or a study plan.</div>
          </div>
        )}
        {chat.messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            message={message}
            showAuthor={chat.kind === "group" && message.authorId !== chat.messages[index - 1]?.authorId}
          />
        ))}
        {isTyping && (
          <div className="self-start rounded-[18px_18px_18px_6px] border border-border bg-surface px-4 py-2.5 text-[13px] font-semibold text-muted-2">
            typing…
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={submit}
        className="sticky bottom-0 flex flex-none items-center gap-2.25 border-t border-border bg-surface p-3 max-md:-mx-4 max-md:px-4 md:static"
      >
        <Input
          aria-label={`Message ${chat.name}`}
          placeholder="Write a message…"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          className="h-auto min-w-0 flex-1 rounded-xl border border-border bg-surface-2 px-3.5 py-2.75 text-[15px] font-medium shadow-none placeholder:text-muted-2"
        />
        <Button
          type="submit"
          aria-label="Send"
          tone="brand"
          isDisabled={!draft.trim()}
          className="size-10.5 flex-none rounded-xl p-0"
        >
          <ArrowRightIcon size={18} />
        </Button>
      </form>
    </div>
  );
}

function MessageBubble({ message, showAuthor }: { message: ChatMessage; showAuthor: boolean }) {
  const isMine = message.authorId === "me";
  const author = isMine ? undefined : personById(message.authorId);

  return (
    <div className={cn("flex max-w-[82%] animate-fade flex-col gap-1", isMine ? "items-end self-end" : "items-start self-start")}>
      {showAuthor && author && <div className="px-1 text-[12px] font-bold text-muted">{author.name}</div>}
      <div
        className={cn(
          "border px-3.75 py-2.5 text-[14.5px] leading-[1.5] font-medium",
          isMine
            ? "rounded-[18px_18px_6px_18px] border-accent bg-accent text-white"
            : "rounded-[18px_18px_18px_6px] border-border bg-surface text-ink",
        )}
      >
        {message.text}
      </div>
      <div className="px-1 text-[11px] font-semibold text-muted-3">{message.time}</div>
    </div>
  );
}

function EmptyThread() {
  return (
    <div className="grid place-items-center p-10 text-center">
      <div className="flex flex-col items-center gap-2.5">
        <Icon3D icon="chats" size={64} />
        <div className="text-[18px] font-extrabold">Pick a chat</div>
        <div className="max-w-70 text-[14px] font-semibold text-muted-2">
          Group chats for your study rooms and classes, and direct messages with friends.
        </div>
      </div>
    </div>
  );
}
