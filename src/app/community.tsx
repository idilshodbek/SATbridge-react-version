import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { type FeedPost, feedPosts } from "@/data/community";
import {
  type Chat,
  type ChatMessage,
  demoReplies,
  initialChats,
  initialFriendIds,
  initialRequestIds,
  initialRooms,
  people,
  personById,
  roomSeedMessages,
  type StudyRoom,
} from "@/data/social";
import { currentUser } from "@/data/user";
import { secondsSinceAppStart } from "@/hooks/useAppClock";

import { CommunityContext, type NewRoom } from "./community-context";

/** Simulated delay before a friend "replies" in the demo (ms). */
const DEMO_REPLY_DELAY = 1600;

/** "16:42" */
const timeNow = () => new Date().toTimeString().slice(0, 5);

let localId = 0;
const newId = (prefix: string) => `${prefix}-${Date.now()}-${localId++}`;

/**
 * In-memory community state for the demo: feed posts, friends, chats and study rooms.
 * Swap the setters for API calls to go live; the context shape can stay the same.
 */
export function CommunityProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<FeedPost[]>(feedPosts);
  const [friendIds, setFriendIds] = useState<string[]>(initialFriendIds);
  const [requestIds, setRequestIds] = useState<string[]>(initialRequestIds);
  const [requestedIds, setRequestedIds] = useState<ReadonlySet<string>>(new Set());
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [typingChatId, setTypingChatId] = useState<string | null>(null);
  const [rooms, setRooms] = useState<StudyRoom[]>(initialRooms);
  const [joinedRoomId, setJoinedRoomId] = useState<string | null>(null);
  const [roomMessages, setRoomMessages] = useState<Record<string, ChatMessage[]>>({ "sapphire-room": roomSeedMessages });

  // Pending demo replies; cleared when the provider unmounts.
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), []);

  /* ---------- Feed ---------- */

  const addPost = useCallback((text: string) => {
    const post: FeedPost = {
      id: newId("post"),
      authorId: "me",
      initials: currentUser.initials,
      color: "#7C3AED",
      name: currentUser.firstName,
      text,
      when: "just now",
    };
    setPosts((current) => [...current, post]);
  }, []);

  /* ---------- Friends ---------- */

  const acceptRequest = useCallback((personId: string) => {
    setRequestIds((current) => current.filter((id) => id !== personId));
    setFriendIds((current) => [personId, ...current]);
  }, []);

  const declineRequest = useCallback((personId: string) => {
    setRequestIds((current) => current.filter((id) => id !== personId));
  }, []);

  const sendRequest = useCallback((personId: string) => {
    setRequestedIds((current) => new Set(current).add(personId));
  }, []);

  const removeFriend = useCallback((personId: string) => {
    setFriendIds((current) => current.filter((id) => id !== personId));
  }, []);

  /* ---------- Chats ---------- */

  const appendMessage = useCallback((chatId: string, message: ChatMessage) => {
    setChats((current) =>
      current.map((chat) => (chat.id === chatId ? { ...chat, messages: [...chat.messages, message] } : chat)),
    );
  }, []);

  const sendMessage = useCallback(
    (chatId: string, text: string) => {
      appendMessage(chatId, {
        id: newId("m"),
        authorId: "me",
        text,
        time: timeNow(),
      });

      // Demo: someone in the chat answers a moment later.
      const chat = chats.find((c) => c.id === chatId);
      const replier = chat?.memberIds[(chat.messages.length + 1) % chat.memberIds.length];
      if (!replier) return;
      setTypingChatId(chatId);
      const timer = window.setTimeout(() => {
        setTypingChatId(null);
        appendMessage(chatId, {
          id: newId("m"),
          authorId: replier,
          text: demoReplies[chat.messages.length % demoReplies.length],
          time: timeNow(),
        });
      }, DEMO_REPLY_DELAY);
      timers.current.push(timer);
    },
    [appendMessage, chats],
  );

  const markRead = useCallback((chatId: string) => {
    setChats((current) => current.map((chat) => (chat.id === chatId && chat.unread ? { ...chat, unread: 0 } : chat)));
  }, []);

  const openDirectChat = useCallback(
    (personId: string) => {
      const existing = chats.find((chat) => chat.kind === "direct" && chat.memberIds[0] === personId);
      if (existing) return existing.id;

      const person = personById(personId);
      const chat: Chat = {
        id: personId,
        kind: "direct",
        name: person?.name ?? "Chat",
        color: person?.color ?? "#009ADA",
        memberIds: [personId],
        unread: 0,
        messages: [],
      };
      setChats((current) => [chat, ...current]);
      return chat.id;
    },
    [chats],
  );

  /* ---------- Study rooms ---------- */

  const joinRoom = useCallback((roomId: string) => setJoinedRoomId(roomId), []);
  const leaveRoom = useCallback(() => setJoinedRoomId(null), []);

  const createRoom = useCallback((room: NewRoom) => {
    const id = newId("room");
    setRooms((current) => [
      // Room timers count from app start, so a new room's first block ends a full block from now.
      {
        ...room,
        id,
        hostId: "me",
        memberIds: [],
        capacity: 8,
        breakMinutes: 5,
        secondsLeft: room.focusMinutes * 60 + secondsSinceAppStart(),
      },
      ...current,
    ]);
    setJoinedRoomId(id);
    return id;
  }, []);

  const sendRoomMessage = useCallback((roomId: string, text: string) => {
    setRoomMessages((current) => ({
      ...current,
      [roomId]: [...(current[roomId] ?? []), { id: newId("m"), authorId: "me", text, time: timeNow() }],
    }));
  }, []);

  /* ---------- Derived ---------- */

  const value = useMemo(() => {
    const friends = friendIds.map(personById).filter((p) => p !== undefined);
    const requests = requestIds.map(personById).filter((p) => p !== undefined);
    const others = people.filter((p) => !friendIds.includes(p.id) && !requestIds.includes(p.id));

    return {
      posts,
      addPost,
      friends,
      requests,
      others,
      requestedIds,
      isFriend: (personId: string) => friendIds.includes(personId),
      acceptRequest,
      declineRequest,
      sendRequest,
      removeFriend,
      chats,
      unreadCount: chats.reduce((sum, chat) => sum + chat.unread, 0),
      typingChatId,
      sendMessage,
      markRead,
      openDirectChat,
      rooms,
      joinedRoomId,
      roomMessages,
      joinRoom,
      leaveRoom,
      createRoom,
      sendRoomMessage,
    };
  }, [
    posts,
    addPost,
    friendIds,
    requestIds,
    requestedIds,
    acceptRequest,
    declineRequest,
    sendRequest,
    removeFriend,
    chats,
    typingChatId,
    sendMessage,
    markRead,
    openDirectChat,
    rooms,
    joinedRoomId,
    roomMessages,
    joinRoom,
    leaveRoom,
    createRoom,
    sendRoomMessage,
  ]);

  return <CommunityContext value={value}>{children}</CommunityContext>;
}
