/* ------------------------------------------------------------------ */
/* Community: people, friends, chats and study rooms (seed data)       */
/* ------------------------------------------------------------------ */

export type Person = {
  id: string;
  name: string;
  initials: string;
  color: string;
  school: string;
  streak: number;
  weeklyXp: number;
  predictedScore: number;
  isOnline: boolean;
  /** "Studying vocab" when online, "2h ago" when not. */
  activity: string;
};

const person = (
  id: string,
  name: string,
  initials: string,
  color: string,
  school: string,
  streak: number,
  weeklyXp: number,
  predictedScore: number,
  isOnline: boolean,
  activity: string,
): Person => ({
  id,
  name,
  initials,
  color,
  school,
  streak,
  weeklyXp,
  predictedScore,
  isOnline,
  activity,
});

export const people: Person[] = [
  person("malika", "Malika Karimova", "MK", "#F59E0B", "Tashkent 1500 Club", 41, 2840, 1480, true, "In Sapphire study room"),
  person("daniyar", "Daniyar Abdullaev", "DA", "#009ADA", "Tashkent 1500 Club", 18, 2610, 1420, true, "Doing a Math rush"),
  person("lin", "Lin Tran", "LT", "#22C55E", "Presidential School", 33, 2480, 1390, false, "1h ago"),
  person("sardor", "Sardor Bekmurodov", "SB", "#0C3A4E", "Tashkent 1500 Club", 9, 2090, 1250, false, "3h ago"),
  person("shiny", "ShinyAV", "SH", "#FFC93C", "Westminster Tashkent", 27, 1980, 1450, true, "Reviewing vocab"),
  person("alif", "Alif Rahimov", "AL", "#E5308F", "Lyceum #1", 12, 1720, 1310, false, "Yesterday"),
  person("neverbored", "NeverBored", "NB", "#0C3A4E", "Al-Khorezmi School", 16, 3120, 1510, false, "20m ago"),
  person("ghostie", "Ghostie", "GH", "#22C55E", "Presidential School", 7, 1440, 1330, false, "2d ago"),
  person("timur", "Timur Nazarov", "TN", "#7C3AED", "Tashkent 1500 Club", 5, 980, 1220, true, "Taking a mock"),
  person("aziza", "Aziza Yusupova", "AY", "#E5308F", "Lyceum #1", 21, 1650, 1360, false, "5h ago"),
  person("grinder", "Grinder", "GR", "#009ADA", "Al-Khorezmi School", 52, 3360, 1540, true, "In 1500+ math sprint"),
  person("jao", "JAO29", "JA", "#7C3AED", "Westminster Tashkent", 3, 760, 1180, false, "4d ago"),
  person("kamola", "Kamola Saidova", "KS", "#F59E0B", "Presidential School", 14, 1210, 1300, false, "8h ago"),
  person("bekzod", "Bekzod Tursunov", "BT", "#22C55E", "Tashkent 1500 Club", 8, 1100, 1270, true, "Studying geometry"),
];

export const personById = (id: string) => people.find((p) => p.id === id);

export const initialFriendIds = ["malika", "daniyar", "lin", "sardor", "shiny", "alif", "neverbored", "ghostie"];

/** People who asked to be your friend. */
export const initialRequestIds = ["timur", "aziza"];

/** "People you may know", with the reason shown under the name. */
export const suggestions: { personId: string; reason: string }[] = [
  { personId: "grinder", reason: "Also aiming for 1550+" },
  { personId: "bekzod", reason: "Tashkent 1500 Club" },
  { personId: "kamola", reason: "3 mutual friends" },
  { personId: "jao", reason: "Same test date · Oct 3" },
];

export const inviteLink = "https://satbridge.app/invite/dilshodbek";

/* ---------- Chats ---------- */

export type ChatMessage = {
  id: string;
  /** A person id, or "me" for the signed-in student. */
  authorId: string;
  text: string;
  time: string;
};

export type Chat = {
  id: string;
  kind: "group" | "direct";
  /** Groups have their own name; direct chats use the other person's name. */
  name: string;
  color: string;
  memberIds: string[];
  unread: number;
  messages: ChatMessage[];
};

let messageId = 0;
const message = (authorId: string, text: string, time: string): ChatMessage => ({ id: `m${messageId++}`, authorId, text, time });

export const initialChats: Chat[] = [
  {
    id: "sapphire",
    kind: "group",
    name: "Sapphire study room",
    color: "#009ADA",
    memberIds: ["malika", "daniyar", "lin", "shiny", "sardor"],
    unread: 3,
    messages: [
      message("daniyar", "Who's doing the Friday mock?", "16:02"),
      message("lin", "Me. Starting 09:00 sharp, want to race?", "16:05"),
      message("me", "In. Module 2 math is where I lose time though", "16:07"),
      message("shiny", "Graph every quadratic in Desmos, saves ~30s each", "16:11"),
      message("malika", "anyone else stuck on circles?", "16:24"),
    ],
  },
  {
    id: "club",
    kind: "group",
    name: "Tashkent 1500 Club",
    color: "#E5308F",
    memberIds: ["malika", "daniyar", "sardor", "timur", "bekzod"],
    unread: 0,
    messages: [
      message("sardor", "Coach Amara: mock 4 debrief on Tuesday, 18:00", "Mon"),
      message("bekzod", "Can we do transitions again? Half of us missed them", "Mon"),
      message("me", "+1 for transitions", "Mon"),
    ],
  },
  {
    id: "vocab",
    kind: "group",
    name: "Vocab grind",
    color: "#FFC93C",
    memberIds: ["shiny", "alif", "aziza"],
    unread: 1,
    messages: [message("alif", "Word of the day: 'tenuous'", "11:40"), message("shiny", "unit 2 done, 50/50 🎯", "13:15")],
  },
  {
    id: "malika",
    kind: "direct",
    name: "Malika Karimova",
    color: "#F59E0B",
    memberIds: ["malika"],
    unread: 0,
    messages: [
      message("malika", "Did you finish the 1500+ set yet?", "Sun"),
      message("me", "3 skills left. Trig is brutal", "Sun"),
      message("malika", "Use the unit circle in Desmos, I'll send the trick", "Sun"),
    ],
  },
  {
    id: "lin",
    kind: "direct",
    name: "Lin Tran",
    color: "#22C55E",
    memberIds: ["lin"],
    unread: 0,
    messages: [message("lin", "Thanks for the vocab list!", "Sat")],
  },
];

/** Canned replies for the demo, picked by the chat's first member. */
export const demoReplies = [
  "Nice, let's keep the streak going 🔥",
  "Same here. Want to open a study room tonight?",
  "Haha true. Sending you my notes in a sec",
  "Good call, I'll try that on the next rush",
];

/* ---------- Study rooms ---------- */

export type StudyRoom = {
  id: string;
  name: string;
  subject: "R&W" | "Math" | "Mixed";
  /** Silent rooms have no chat, only the shared timer. */
  isSilent: boolean;
  hostId: string;
  memberIds: string[];
  capacity: number;
  focusMinutes: number;
  breakMinutes: number;
  /** Seconds left in the current focus block when you open the page. */
  secondsLeft: number;
  topic: string;
};

export const initialRooms: StudyRoom[] = [
  {
    id: "sapphire-room",
    name: "Sapphire study room",
    subject: "Math",
    isSilent: false,
    hostId: "malika",
    memberIds: ["malika", "daniyar", "shiny", "bekzod", "grinder"],
    capacity: 8,
    focusMinutes: 25,
    breakMinutes: 5,
    secondsLeft: 18 * 60 + 42,
    topic: "Circles & trig drill",
  },
  {
    id: "silent-vocab",
    name: "Silent vocab grind",
    subject: "R&W",
    isSilent: true,
    hostId: "shiny",
    memberIds: ["shiny", "aziza", "kamola"],
    capacity: 8,
    focusMinutes: 25,
    breakMinutes: 5,
    secondsLeft: 9 * 60 + 5,
    topic: "Vocab sets 12–14",
  },
  {
    id: "math-sprint",
    name: "1500+ math sprint",
    subject: "Math",
    isSilent: false,
    hostId: "grinder",
    memberIds: ["grinder", "timur"],
    capacity: 6,
    focusMinutes: 50,
    breakMinutes: 10,
    secondsLeft: 37 * 60 + 12,
    topic: "Hardest Module 2 questions",
  },
  {
    id: "night-owls",
    name: "Night owls · mixed",
    subject: "Mixed",
    isSilent: false,
    hostId: "lin",
    memberIds: ["lin", "alif", "ghostie", "jao"],
    capacity: 10,
    focusMinutes: 45,
    breakMinutes: 15,
    secondsLeft: 2 * 60 + 30,
    topic: "Whatever's in your plan",
  },
];

export const roomSeedMessages: ChatMessage[] = [
  message("malika", "Starting circles now, 25 min, no phones 📵", "16:30"),
  message("daniyar", "Doing the trig drill from the planner", "16:31"),
  message("shiny", "gl everyone", "16:31"),
];
