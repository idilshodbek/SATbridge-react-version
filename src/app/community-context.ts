import { createContext, useContext } from "react";

import type { FeedPost } from "@/data/community";
import type { Chat, ChatMessage, Person, StudyRoom } from "@/data/social";

export type NewRoom = Pick<StudyRoom, "name" | "subject" | "focusMinutes" | "isSilent" | "topic">;

export type CommunityContextValue = {
  /* Feed */
  posts: FeedPost[];
  addPost: (text: string) => void;

  /* Friends */
  friends: Person[];
  requests: Person[];
  /** People who are not friends yet (for "Find people"). */
  others: Person[];
  requestedIds: ReadonlySet<string>;
  isFriend: (personId: string) => boolean;
  acceptRequest: (personId: string) => void;
  declineRequest: (personId: string) => void;
  sendRequest: (personId: string) => void;
  removeFriend: (personId: string) => void;

  /* Chats */
  chats: Chat[];
  unreadCount: number;
  /** Chat id whose (demo) reply is being "typed". */
  typingChatId: string | null;
  sendMessage: (chatId: string, text: string) => void;
  markRead: (chatId: string) => void;
  /** Returns the direct chat with a person, creating it if needed. */
  openDirectChat: (personId: string) => string;

  /* Study rooms */
  rooms: StudyRoom[];
  joinedRoomId: string | null;
  roomMessages: Record<string, ChatMessage[]>;
  joinRoom: (roomId: string) => void;
  leaveRoom: () => void;
  createRoom: (room: NewRoom) => string;
  sendRoomMessage: (roomId: string, text: string) => void;
};

export const CommunityContext = createContext<CommunityContextValue | null>(null);

/** Feed, friends, chats and study rooms. Must be used inside <CommunityProvider>. */
export function useCommunity() {
  const context = useContext(CommunityContext);
  if (!context) throw new Error("useCommunity must be used inside <CommunityProvider>");
  return context;
}
