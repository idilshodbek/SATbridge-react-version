import { useEffect, useRef, useState } from "react";

import { TUTOR_REPLY_DELAY, tutorDemoReply } from "@/data/tutor";

export type ChatMessage = { id: number; text: string; fromUser: boolean };

type DemoTutorOptions = {
  /** Messages already in the conversation (e.g. a greeting from Bridge AI). */
  greeting?: string;
  /** Picks the demo answer for a question. */
  replyTo?: (question: string) => string;
};

/**
 * Demo chat state for Bridge AI. Sends the user's message, shows a "thinking"
 * indicator, then answers with a canned reply. Replace `ask` with a real API call.
 */
export function useDemoTutor({ greeting, replyTo = () => tutorDemoReply }: DemoTutorOptions = {}) {
  const initialMessages: ChatMessage[] = greeting ? [{ id: 0, text: greeting, fromUser: false }] : [];
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isThinking, setIsThinking] = useState(false);
  const replyTimer = useRef<number | undefined>(undefined);
  const nextId = useRef(initialMessages.length);

  useEffect(() => () => window.clearTimeout(replyTimer.current), []);

  const ask = (text: string) => {
    const question = text.trim();
    if (!question) return;

    setMessages((current) => [...current, { id: nextId.current++, text: question, fromUser: true }]);
    setIsThinking(true);

    window.clearTimeout(replyTimer.current);
    replyTimer.current = window.setTimeout(() => {
      setIsThinking(false);
      setMessages((current) => [...current, { id: nextId.current++, text: replyTo(question), fromUser: false }]);
    }, TUTOR_REPLY_DELAY);
  };

  const reset = () => {
    window.clearTimeout(replyTimer.current);
    setMessages(initialMessages);
    setIsThinking(false);
  };

  return { messages, isThinking, ask, reset };
}
