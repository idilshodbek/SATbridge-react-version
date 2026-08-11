import { useCallback, useEffect, useState } from 'react'
import {
  BRAND, BRAND_D, GREEN, GREEN_D, GOLD, GOLD_D, ORANGE, INK, INK_D,
  UNITS, QS, TESTS, RADAR, CHAT0, LB, DRILLS, VOCAB_UNITS, WORDS, LESSON_META,
  QBANK, PLAN, TODAY, ANA_SKILLS, ANA_WEEKS, ANA_MOCKS, REVIEW, ONB, RUN,
  NOTES, ACHV, THEMES,
} from './data.js'

/** Everything the screens read comes from here — one derived view-model per render. */
const INITIAL_STATE = {
  screen: 'main', radar: 'rw', unit: 1, open: null, progress: { 0: 6, 1: 4, 2: 0 },
  tab: 'full', qi: 0, answers: {}, marks: {}, checked: {}, navOpen: false, hintOpen: false,
  cd: { d: 45, h: 20, m: 33, s: 57 }, sec: 2085, goalXp: 40,
  chat: CHAT0, draft: '', thinking: false, lbTab: 'week',
  drillTab: 'all', vocabQ: '', vocabOpen: 0, vocabTab: 'my', lesson: null,
  theme: null, themeOpen: false, dark: null, anaDomain: 'all',
  resTab: 'score', resFilter: 'all', onbStep: 0, onbAns: {},
  runI: 0, runSel: null, runChecked: false, runXp: 0, runStreak: 0, celebrate: null,
  cardI: 0, cardFlip: false, cardKnown: {}, notesTab: 'all', hintStep: 0,
  goalTarget: 60, qbDomain: 'all', qbSearch: '', qbSel: {}, planDone: { 0: true },
  toggles: { notif: true, sound: true, weekly: false },
}

const pad = n => String(n).padStart(2, '0')

export function useModel(settings) {
  const [st, setRaw] = useState(INITIAL_STATE)

  /** Class-component `setState` semantics: shallow merge, object or updater. */
  const setState = useCallback(patch => {
    setRaw(s => ({ ...s, ...(typeof patch === 'function' ? patch(s) : patch) }))
  }, [])

  // Exam-day countdown, and the exam clock while a module is running.
  useEffect(() => {
    const id = setInterval(() => setState(s => {
      const cd = { ...s.cd }
      cd.s--; if (cd.s < 0) { cd.s = 59; cd.m-- }
      if (cd.m < 0) { cd.m = 59; cd.h-- }
      if (cd.h < 0) { cd.h = 23; cd.d-- }
      return { cd, sec: s.screen === 'exam' ? Math.max(0, s.sec - 1) : s.sec }
    }), 1000)
    return () => clearInterval(id)
  }, [setState])

  const isDark = st.dark === null ? !!settings.darkMode : !!st.dark

  return buildModel(st, setState, settings, isDark)
}

function buildModel(st, setState, settings, isDark) {
  const set = o => setState(o);
  const tab = on => on ? { bg: "#fff", fg: BRAND, sh: "0 2px 0 #DCE4EA" } : { bg: "transparent", fg: "#93A3AE", sh: "none" };
  const navPill = on => on ? { bg: "#E9F7FD", bd: "#C2E7F7", fg: BRAND } : { bg: "transparent", bd: "transparent", fg: "#54646F" };

  /* radar */
  const key = st.radar === "rw" ? "rw" : "math";
  const rColor = st.radar === "rw" ? BRAND : GREEN;
  const cx = 165, cy = 148, R = 118;
  const pt = (i, r) => { const a = (-90 + i * 72) * Math.PI / 180; return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]; };
  const rAxes = RADAR[key].axes;
  const radarPts = rAxes.map(([, v], i) => pt(i, R * v / 100).map(n => n.toFixed(1)).join(",")).join(" ");
  const LABEL_POS = [
    { x: 165, y: 44, tf: "translate(-50%,-100%)", w: 150, align: "center" },
    { x: 259, y: 112, tf: "translate(0,-50%)", w: 71, align: "left" },
    { x: 224, y: 238, tf: "translate(-50%,0)", w: 108, align: "center" },
    { x: 106, y: 238, tf: "translate(-50%,0)", w: 108, align: "center" },
    { x: 71, y: 112, tf: "translate(-100%,-50%)", w: 71, align: "right" }
  ];
  const radarAxes = rAxes.map(([name, v], i) => {
    const [px, py] = pt(i, R * v / 100), L = LABEL_POS[i];
    return {
      name, pctLabel: v + "%", color: rColor,
      cx: px.toFixed(1), cy: py.toFixed(1),
      lxPct: (L.x / 330 * 100).toFixed(2) + "%", lyPct: (L.y / 292 * 100).toFixed(2) + "%",
      tf: L.tf, w: L.w + "px", align: L.align
    };
  });
  const radarBars = RADAR[key].bars.map(([name, pct]) => ({
    name, pct, color: pct >= 80 ? GREEN : pct >= 50 ? BRAND : ORANGE,
    pctColor: pct >= 80 ? "#3F8C06" : pct >= 50 ? BRAND_D : "#CC7800"
  }));

  /* score trend */
  const scores = [[950, "Feb"], [980, "Mar"], [1040, "Apr"], [1020, "May"], [1120, "Jun"], [1180, "Jul"]];
  const tx = i => 14 + i * 58, ty = v => 112 - (v - 900) / 320 * 96;
  const trendPts = scores.map((s, i) => ({ x: tx(i).toFixed(0), y: ty(s[0]).toFixed(1), label: s[1] }));
  const trendLine = trendPts.map(p => p.x + "," + p.y).join(" ");
  const trendArea = "14,118 " + trendLine + " " + tx(scores.length - 1) + ",118";

  /* learning path */
  const unit = UNITS[st.unit], prog = st.progress[st.unit] || 0;
  const dxPattern = [0, 66, 100, 66, 0, -66, -100, -66, 0];
  const nodes = unit.lessons.map((l, i) => {
    const done = i < prog, cur = i === prog, locked = i > prog;
    const pal = locked ? { bg: "#DFE8EE", dark: "#C4D2DA", iconColor: "#9EB0BB" }
      : l.k === "chest" ? { bg: GOLD, dark: GOLD_D, iconColor: "#fff" }
      : l.k === "trophy" ? { bg: ORANGE, dark: "#CC7800", iconColor: "#fff" }
      : l.k === "mock" ? { bg: INK, dark: INK_D, iconColor: "#fff" }
      : done ? { bg: GREEN, dark: GREEN_D, iconColor: "#fff" }
      : { bg: BRAND, dark: BRAND_D, iconColor: "#fff" };
    const glyph = locked ? "🔒" : done ? "✓" : l.k === "chest" ? "🎁" : l.k === "trophy" ? "🏆" : l.k === "mock" ? "📝" : "★";
    const ringDeg = done ? 360 : cur ? 140 : 0;
    const isBoss = l.k === "trophy";
    return {
      title: l.t, sub: locked ? "Finish the step above to unlock this one." : l.s, tags: locked ? ["Locked"] : l.tags,
      dx: dxPattern[i % dxPattern.length], spine: done ? GREEN : cur ? BRAND : "#DCE7EE", spineOp: i === 0 ? 0 : 1,
      bg: pal.bg, dark: pal.dark, iconColor: pal.iconColor, glyph,
      ring: done ? GREEN : BRAND, ringTrack: "#E4EEF4", ringDeg,
      labelColor: locked ? "#9EB0BB" : "#1B2B36",
      meta: locked ? "Locked" : done ? "Complete" : cur ? "In progress · 2 of 8" : l.k === "chest" ? "Bonus" : "Ready",
      isCurrent: cur, open: st.open === i, anim: cur ? "glow 2.2s ease-in-out infinite" : "none",
      cta: locked ? "Locked" : done ? "Practice again · +10 XP" : l.k === "mock" ? "Start timed module" : l.k === "chest" ? "Open chest" : "Start lesson",
      checkpoint: isBoss, checkpointTitle: "Checkpoint · " + unit.name,
      checkpointSub: prog > i ? "Passed with 88% · unlocked the next unit" : "Pass the boss check to unlock Unit " + (unit.n + 1),
      tap: () => set({ open: st.open === i ? null : i }),
      watch: () => { if (!locked) set({ lesson: i, open: null }); },
      canWatch: !locked && l.k !== "chest",
      start: () => {
        if (locked) return;
        if (l.k === "mock") return set({ screen: "exam", open: null });
        set({ open: null, progress: { ...st.progress, [st.unit]: Math.max(prog, i + 1) }, goalXp: Math.min(60, st.goalXp + 20) });
      }
    };
  });
  const unitChips = UNITS.map((u, i) => {
    const p = Math.round((st.progress[i] || 0) / u.lessons.length * 100), on = i === st.unit;
    return {
      n: u.n, short: u.short, pct: p,
      bg: on ? u.color : "#fff", bd: on ? u.dark : "#E6EEF3", fg: on ? "#fff" : "#54646F",
      dotBg: on ? "rgba(255,255,255,.25)" : "#F1F6FA", dotFg: on ? "#fff" : "#93A3AE",
      tap: () => set({ unit: i, open: null })
    };
  });
  const nextLesson = unit.lessons[Math.min(prog, unit.lessons.length - 1)];

  /* mock lobby */
  const tabDefs = [["full", "Full exams"], ["math", "Math only"], ["eng", "English only"], ["quick", "Quick drills"]];
  const modeTabs = tabDefs.map(([id, label]) => {
    const on = st.tab === id, count = TESTS.filter(t => t.mode === id).length;
    return { label, count, bg: on ? BRAND : "transparent", fg: on ? "#fff" : "#93A3AE", sh: on ? "0 3px 0 " + BRAND_D : "none", tap: () => set({ tab: id }) };
  });
  const secChip = ([label, state]) => state === "done"
    ? { label: "✓ " + label, bg: "#F1FAE6", bd: "#CFEBA8", fg: "#3F8C06" }
    : state === "now" ? { label: "● " + label, bg: "#E9F7FD", bd: "#B8E4F7", fg: BRAND_D }
    : { label, bg: "#F4F8FB", bd: "#E6EEF3", fg: "#93A3AE" };
  const tests = TESTS.filter(t => t.mode === st.tab).map(t => ({
    name: t.name, tag: t.tag, meta: t.meta, thumb: t.thumb,
    thumbRadius: t.state === "done" ? "22px" : "50%",
    ringBg: t.state === "paused" ? "conic-gradient(" + GOLD + " " + Math.round(t.ring * 3.6) + "deg,#EEF3F7 0)"
      : t.state === "done" ? "#F1FAE6" : "#E9F7FD",
    ringFg: t.state === "paused" ? GOLD_D : t.state === "done" ? "#3F8C06" : BRAND,
    bd: t.state === "paused" ? "#FFE3A3" : "#E6EEF3",
    tagBg: t.mode === "math" ? "#E9F7FD" : t.mode === "eng" ? "#F1FAE6" : t.state === "done" ? "#F4F8FB" : "#FFF7E3",
    tagFg: t.mode === "math" ? BRAND_D : t.mode === "eng" ? "#3F8C06" : t.state === "done" ? "#7B8B96" : "#B07A16",
    sections: t.sections.map(secChip),
    cta: t.state === "paused" ? "Resume" : t.state === "done" ? "Review" : "Start",
    ctaBg: t.state === "paused" ? GREEN : t.state === "done" ? "#fff" : BRAND,
    ctaDark: t.state === "paused" ? GREEN_D : t.state === "done" ? "#DDE6EC" : BRAND_D,
    ctaFg: t.state === "done" ? "#54646F" : "#fff",
    go: () => set({ screen: "exam", qi: 0, navOpen: false })
  }));
  const sectionTiles = [
    { name: "Reading & Writing", icon: "✎", score: "510", meta: "54 Q · 64 min", bg: BRAND, dark: BRAND_D, fg: "#fff", pillBg: "rgba(255,255,255,.22)", pillFg: "#fff" },
    { name: "Math", icon: "∑", score: "570", meta: "44 Q · 70 min", bg: GREEN, dark: GREEN_D, fg: "#fff", pillBg: "rgba(255,255,255,.22)", pillFg: "#fff" },
    { name: "Vocabulary", icon: "AB", score: "27%", meta: "30 words · 10 min", bg: "#FFF7E3", dark: "#FFE3A3", fg: "#5A4300", pillBg: "#FFC800", pillFg: "#5A4300" },
    { name: "Geometry", icon: "△", score: "61%", meta: "18 Q · 25 min", bg: "#fff", dark: "#E6EEF3", fg: "#1B2B36", pillBg: "#F4F8FB", pillFg: "#7B8B96" }
  ].map(s => ({ ...s, go: () => set({ screen: "exam", qi: 0 }) }));

  /* exam */
  const q = QS[st.qi % QS.length], qNum = st.qi + 1, sel = st.answers[st.qi];
  const isChecked = !!st.checked[st.qi], correct = sel === q.answer;
  const choices = q.choices.map((text, i) => {
    let bg = "#fff", bd = "#E4EBF0", fg = "#22313B", badge = "";
    if (isChecked && i === q.answer) { bg = "#F1FAE6"; bd = "#8FE04A"; fg = "#3F8C06"; badge = "✓"; }
    else if (isChecked && i === sel) { bg = "#FFF0F0"; bd = "#FFAFAF"; fg = "#D93A3A"; badge = "✕"; }
    else if (!isChecked && i === sel) { bg = "#E9F7FD"; bd = BRAND; fg = BRAND_D; }
    return { letter: "ABCD"[i], text, bg, bd, fg, badge, pick: () => { if (!isChecked) set({ answers: { ...st.answers, [st.qi]: i } }); } };
  });
  const dots = Array.from({ length: 20 }, (_, i) => ({
    title: "Question " + (i + 1),
    bg: i === st.qi ? BRAND : st.marks[i] ? GOLD : st.answers[i] !== undefined ? "#8FE04A" : "#E4EEF4",
    tap: () => set({ qi: i % QS.length, navOpen: false, hintOpen: false })
  }));
  const grid = Array.from({ length: 20 }, (_, i) => {
    const on = i === st.qi, ans = st.answers[i] !== undefined, mk = st.marks[i];
    return {
      n: i + 1, bg: on ? INK : mk ? "#FFF7E3" : ans ? "#F1FAE6" : "#fff",
      bd: on ? INK_D : mk ? GOLD : ans ? "#8FE04A" : "#E4EBF0", fg: on ? "#fff" : "#1B2B36",
      tap: () => set({ qi: i % QS.length, navOpen: false, hintOpen: false })
    };
  });
  const marked = !!st.marks[st.qi], lowTime = st.sec < 300;

  /* AI tutor */
  const send = () => {
    const text = (st.draft || "").trim();
    if (!text) return;
    set({ chat: [...st.chat, { who: "me", text }], draft: "", thinking: true });
    setTimeout(() => setState(s => ({
      thinking: false,
      chat: [...s.chat, {
        who: "ai",
        text: "Here's how I'd attack that: name what the question is really asking, eliminate the two choices that answer a different question, then check the remaining pair against one specific line of evidence. Want a 5-question drill on this exact skill?"
      }]
    })), 900);
  };
  const chat = st.chat.map((m, i) => m.who === "me"
    ? { text: m.text, bg: BRAND, fg: "#fff", align: "flex-end", radius: "20px 20px 6px 20px", who: "You", nameColor: "#93A3AE" }
    : { text: m.text, bg: "#fff", fg: "#22313B", align: "flex-start", radius: "20px 20px 20px 6px", who: "Bridge AI", nameColor: BRAND });

  /* leaderboard */
  const lbRows = (LB[st.lbTab] || LB.week).map((r, i) => {
    const me = r[0] === "You";
    const zone = i < 3 ? "promote" : i > 7 ? "demote" : "hold";
    return {
      rank: i + 1, name: r[0], country: r[1], xp: r[2].toLocaleString(), delta: r[3], ini: r[4],
      bg: me ? "#E9F7FD" : "#fff", bd: me ? "#B8E4F7" : "#EEF3F7",
      av: i === 0 ? GOLD : i === 1 ? "#B9C4CD" : i === 2 ? "#E08A3C" : me ? BRAND : "#CBD6DE",
      rankColor: i < 3 ? GOLD_D : me ? BRAND : "#93A3AE",
      deltaColor: r[3].indexOf("+") === 0 ? GREEN : r[3] === "=" ? "#93A3AE" : "#FF4B4B",
      zoneLabel: zone === "promote" ? "Promotion" : zone === "demote" ? "Demotion" : "",
      zoneBg: zone === "promote" ? "#F1FAE6" : zone === "demote" ? "#FFF0F0" : "transparent",
      zoneFg: zone === "promote" ? "#3F8C06" : "#D93A3A"
    };
  });
  const lbTabs = [["week", "This week"], ["all", "All time"], ["friends", "Friends"]].map(([id, label]) => {
    const on = st.lbTab === id;
    return { label, bg: on ? BRAND : "transparent", fg: on ? "#fff" : "#93A3AE", sh: on ? "0 3px 0 " + BRAND_D : "none", tap: () => set({ lbTab: id }) };
  });
  const top3 = lbRows.slice(0, 3);
  const podium = [top3[1], top3[0], top3[2]].filter(Boolean).map((r, i) => ({
    ...r, h: i === 1 ? 132 : i === 0 ? 100 : 84,
    medal: r.rank === 1 ? "🥇" : r.rank === 2 ? "🥈" : "🥉",
    bg: r.rank === 1 ? "#FFF7E3" : "#fff", bd: r.rank === 1 ? "#FFE3A3" : "#E6EEF3"
  }));

  /* drills */
  const drillTabs = [["all", "All skills"], ["rw", "Reading & Writing"], ["math", "Math"], ["weak", "Weakest first"]].map(([id, label]) => {
    const on = st.drillTab === id;
    return { label, bg: on ? BRAND : "transparent", fg: on ? "#fff" : "#93A3AE", sh: on ? "0 3px 0 " + BRAND_D : "none", tap: () => set({ drillTab: id }) };
  });
  const drillList = (st.drillTab === "all" ? DRILLS
    : st.drillTab === "weak" ? [...DRILLS].sort((a, b) => a.acc - b.acc)
    : DRILLS.filter(d => d.domain === st.drillTab)).map(d => ({
      name: d.name, q: d.q + " questions", min: d.min + " min", acc: d.acc, diff: d.diff, color: d.color,
      ring: "conic-gradient(" + d.color + " " + Math.round(d.acc * 3.6) + "deg,#EFF4F7 0)",
      domainLabel: d.domain === "rw" ? "R&W" : "Math",
      domainBg: d.domain === "rw" ? "#E9F7FD" : "#F1FAE6",
      domainFg: d.domain === "rw" ? BRAND_D : "#3F8C06",
      go: () => set({ screen: "exam", qi: 0, navOpen: false })
    }));

  /* vocabulary */
  const learnedTotal = 5, repeatTotal = 3, vocabTotal = 150;
  const vq = (st.vocabQ || "").toLowerCase();
  const words = WORDS.filter(w => !vq || w[0].indexOf(vq) === 0 || w[1].indexOf(vq) > -1).map(([word, def, status]) => ({
    word, def,
    label: status === "learned" ? "Learned" : status === "repeat" ? "Repeat" : "New",
    bg: status === "learned" ? "#F1FAE6" : status === "repeat" ? "#FFF0F0" : "#F4F8FB",
    bd: status === "learned" ? "#CFEBA8" : status === "repeat" ? "#FFCFCF" : "#E6EEF3",
    fg: status === "learned" ? "#3F8C06" : status === "repeat" ? "#D93A3A" : "#7B8B96"
  }));
  const vocabUnits = VOCAB_UNITS.map((u, i) => ({
    name: u.name, label: u.learned + "/" + u.total, pct: Math.round(u.learned / u.total * 100),
    open: st.vocabOpen === i, caret: st.vocabOpen === i ? "⌃" : "⌄",
    subs: st.vocabOpen === i ? u.subs.map(([n, total, learned]) => ({
      name: n, meta: total + " words", pct: Math.round(learned / total * 100), label: learned + "/" + total
    })) : [],
    tap: () => set({ vocabOpen: st.vocabOpen === i ? -1 : i })
  }));

  /* lesson detail */
  const lessonIdx = st.lesson, lessonSrc = lessonIdx === null ? null : unit.lessons[lessonIdx];

  /* daily goal */
  const gTarget = st.goalTarget, gXp = Math.min(st.goalXp, gTarget), gDone = gXp >= gTarget;
  const goalModes = [[30, "Casual"], [60, "Regular"], [90, "Intense"]].map(([v, label]) => {
    const on = gTarget === v;
    return { label, v, bg: on ? "#009ADA" : "#fff", fg: on ? "#fff" : "#5C7080", bd: on ? "#007AB0" : "#C2E7F7", tap: () => set({ goalTarget: v }) };
  });
  const goalPips = Array.from({ length: 6 }, (_, i) => {
    const step = gTarget / 6, filled = gXp >= step * (i + 1);
    return { bg: filled ? "#009ADA" : "#D2ECF8", tap: () => set({ goalXp: Math.round(step * (i + 1)) }) };
  });

  /* question bank */
  const qs = st.qbSearch.toLowerCase();
  const qbDomains = [["all", "All"], ["rw", "R&W"], ["math", "Math"], ["wrong", "Missed"], ["unseen", "New"]].map(([id, label]) => {
    const on = st.qbDomain === id;
    return { label, bg: on ? BRAND : "transparent", fg: on ? "#fff" : "#93A3AE", sh: on ? "0 3px 0 " + BRAND_D : "none", tap: () => set({ qbDomain: id }) };
  });
  const qbRows = QBANK.map((q0, i) => ({ ...q0, i }))
    .filter(r => st.qbDomain === "all" || r.domain === st.qbDomain || r.status === st.qbDomain)
    .filter(r => !qs || r.p.toLowerCase().indexOf(qs) > -1 || r.topic.toLowerCase().indexOf(qs) > -1)
    .map(r => {
      const on = !!st.qbSel[r.i];
      return {
        p: r.p, topic: r.topic, diff: r.diff, src: r.src,
        domainLabel: r.domain === "rw" ? "R&W" : "Math",
        domainBg: r.domain === "rw" ? "#E9F7FD" : "#F1FAE6",
        domainFg: r.domain === "rw" ? BRAND_D : "#3F8C06",
        statusLabel: r.status === "correct" ? "Correct" : r.status === "wrong" ? "Missed" : "New",
        statusFg: r.status === "correct" ? "#3F8C06" : r.status === "wrong" ? "#D93A3A" : "#93A3AE",
        diffFg: r.diff === "Hard" ? "#D93A3A" : r.diff === "Medium" ? "#B07A16" : "#3F8C06",
        boxBg: on ? BRAND : "#fff", boxBd: on ? BRAND_D : "#D7E3EB", check: on ? "✓" : "",
        rowBg: on ? "#E9F7FD" : "#fff", rowBd: on ? "#B8E4F7" : "#EEF3F7",
        tap: () => set({ qbSel: { ...st.qbSel, [r.i]: !on } })
      };
    });
  const qbCount = Object.keys(st.qbSel).filter(k => st.qbSel[k]).length;

  /* study plan */
  const typeColor = t => t === "lesson" ? BRAND : t === "vocab" ? GOLD : t === "drill" ? ORANGE : t === "mock" ? INK : GREEN;
  const planWeek = PLAN.map((d, i) => ({
    d: d.d, isToday: i === 2,
    headBg: i === 2 ? "#E9F7FD" : "#F8FBFD", headFg: i === 2 ? BRAND_D : "#93A3AE",
    items: d.items.map(([t, type]) => ({
      t, color: typeColor(type),
      bg: type === "mock" ? "#0E2430" : "#fff",
      fg: type === "mock" ? "#fff" : "#22313B"
    }))
  }));
  const planToday = TODAY.map(([t, min, type], i) => {
    const done = !!st.planDone[i];
    return {
      t, min, done, color: typeColor(type),
      boxBg: done ? GREEN : "#fff", boxBd: done ? GREEN_D : "#D7E3EB", check: done ? "✓" : "",
      titleColor: done ? "#93A3AE" : "#1B2B36", deco: done ? "line-through" : "none",
      tap: () => set({ planDone: { ...st.planDone, [i]: !done }, goalXp: done ? st.goalXp : Math.min(st.goalTarget, st.goalXp + 10) })
    };
  });
  const planDoneCount = planToday.filter(t => t.done).length;

  /* profile */
  const toggleRows = [["notif", "Study reminders", "Daily nudge at 7:00 pm"], ["sound", "Sound effects", "Answer feedback and streak sounds"], ["weekly", "Weekly digest email", "Score trend and skill changes"]]
    .map(([id, name, sub]) => {
      const on = !!st.toggles[id];
      return {
        name, sub, trackBg: on ? BRAND : "#DDE6EC", knobLeft: on ? "22px" : "3px",
        tap: () => set({ toggles: { ...st.toggles, [id]: !on } })
      };
    });

  /* analytics */
  const anaDomain = st.anaDomain || "all";
  const anaTabs = [["all", "All"], ["rw", "Reading & Writing"], ["math", "Math"]].map(([id, label]) => {
    const on = anaDomain === id;
    return { label, bg: on ? BRAND : "transparent", fg: on ? "#fff" : "#93A3AE", sh: on ? "0 3px 0 " + BRAND_D : "none", tap: () => set({ anaDomain: id }) };
  });
  const anaCells = ANA_SKILLS.filter(s => anaDomain === "all" || s[3] === anaDomain).map(([name, acc, sec, dom]) => ({
    name, acc, sec: sec + "s",
    bg: acc >= 85 ? "#58CC02" : acc >= 70 ? "#9BE85B" : acc >= 55 ? "#FFC800" : acc >= 40 ? "#FF9600" : "#FF4B4B",
    fg: acc >= 70 && acc < 85 ? "#2F6B04" : acc >= 55 && acc < 70 ? "#5A4300" : "#fff",
    domainLabel: dom === "rw" ? "R&W" : "Math",
    go: () => set({ screen: "drills", drillTab: dom })
  }));
  const anaMaxHrs = Math.max(...ANA_WEEKS.map(w => w[1]));
  const anaWeeks = ANA_WEEKS.map(([w, h], i) => ({
    w, h: h.toFixed(1) + "h", pct: Math.round(h / anaMaxHrs * 100),
    bg: i === ANA_WEEKS.length - 1 ? BRAND : "#C2E7F7", fg: i === ANA_WEEKS.length - 1 ? BRAND_D : "#7B8B96"
  }));
  const anaMocks = ANA_MOCKS.map(([name, total, rw, math, when, delta], i) => ({
    name, total, rw, math, when,
    delta: (delta > 0 ? "+" : "") + delta + " skipped",
    deltaFg: delta > 9 ? "#D93A3A" : "#B07A16",
    rwPct: Math.round(rw / 800 * 100), mathPct: Math.round(math / 800 * 100),
    bg: i === 0 ? "#E9F7FD" : "#fff", bd: i === 0 ? "#B8E4F7" : "#EEF3F7",
    totalFg: i === 0 ? BRAND_D : "#1B2B36"
  }));
  const anaPace = [
    ["Reading & Writing", "1:12", "1:04", 88, BRAND],
    ["Math no-calc", "1:38", "1:25", 74, GREEN],
    ["Math calc", "1:26", "1:35", 96, ORANGE]
  ].map(([name, yours, target, pct, color]) => ({ name, yours, target, pct, color }));

  /* mock results */
  const resTabs = [["score", "Score report"], ["review", "Question review"]].map(([id, label]) => {
    const on = st.resTab === id;
    return { label, bg: on ? BRAND : "transparent", fg: on ? "#fff" : "#93A3AE", sh: on ? "0 3px 0 " + BRAND_D : "none", tap: () => set({ resTab: id }) };
  });
  const resFilters = [["all", "All 8"], ["wrong", "Wrong 2"], ["careless", "Careless 2"], ["skipped", "Skipped 1"]].map(([id, label]) => {
    const on = st.resFilter === id;
    return { label, bg: on ? INK : "#fff", fg: on ? "#fff" : "#54646F", bd: on ? INK_D : "#E6EEF3", tap: () => set({ resFilter: id }) };
  });
  const statusMap = {
    correct: { label: "Correct", color: GREEN, tint: "#F1FAE6", bd: "#CFEBA8", fg: "#3F8C06", glyph: "✓" },
    wrong: { label: "Wrong", color: "#FF4B4B", tint: "#FFF0F0", bd: "#FFCFCF", fg: "#D93A3A", glyph: "✕" },
    careless: { label: "Careless", color: ORANGE, tint: "#FFF6E9", bd: "#FFE1B3", fg: "#CC7800", glyph: "!" },
    skipped: { label: "Skipped", color: "#93A3AE", tint: "#F8FBFD", bd: "#EEF3F7", fg: "#7B8B96", glyph: "–" }
  };
  const resRows = REVIEW.filter(r => st.resFilter === "all" || r[3] === st.resFilter).map(([n, topic, dom, status, time, why]) => {
    const s = statusMap[status];
    return {
      n, topic, time, why, hasWhy: !!why,
      domainLabel: dom === "rw" ? "R&W" : "Math",
      label: s.label, color: s.color, tint: s.tint, bd: s.bd, fg: s.fg, glyph: s.glyph
    };
  });

  /* onboarding */
  const onbStep = st.onbStep, onbTotal = ONB.length, onbCur = ONB[Math.min(onbStep, onbTotal - 1)];
  const onbOpts = onbCur.opts.map(o => {
    const on = st.onbAns[onbStep] === o;
    return {
      label: o, bg: on ? "#E9F7FD" : "#fff", bd: on ? BRAND : "#E6EEF3", fg: on ? BRAND_D : "#22313B",
      boxBg: on ? BRAND : "#fff", boxBd: on ? BRAND_D : "#D7E3EB", check: on ? "✓" : "",
      tap: () => set({ onbAns: { ...st.onbAns, [onbStep]: o } })
    };
  });
  const onbPicked = !!st.onbAns[onbStep];
  const onbDone = onbStep >= onbTotal;

  /* lesson runner */
  const rq = RUN[st.runI % RUN.length];
  const rCorrect = st.runSel === rq.a;
  const runChoices = rq.c.map((text, i) => {
    let bg = "#fff", bd = "#E6EEF3", fg = "#22313B";
    if (st.runChecked && i === rq.a) { bg = "#F1FAE6"; bd = GREEN; fg = "#3F8C06"; }
    else if (st.runChecked && i === st.runSel) { bg = "#FFF0F0"; bd = "#FF4B4B"; fg = "#D93A3A"; }
    else if (!st.runChecked && i === st.runSel) { bg = "#E9F7FD"; bd = BRAND; fg = BRAND_D; }
    return { text, letter: "ABCD"[i], bg, bd, fg, tap: () => { if (!st.runChecked) set({ runSel: i }); } };
  });
  const runLast = st.runI >= RUN.length - 1;

  /* flashcards */
  const cw = WORDS[st.cardI % WORDS.length];
  const cardKnownCount = Object.keys(st.cardKnown).filter(k => st.cardKnown[k] === "known").length;

  /* notes */
  const noteTabs = [["all", "All"], ["note", "My notes"], ["flag", "Flagged"], ["tutor", "Tutor"]].map(([id, label]) => {
    const on = st.notesTab === id;
    return { label, bg: on ? BRAND : "transparent", fg: on ? "#fff" : "#93A3AE", sh: on ? "0 3px 0 " + BRAND_D : "none", tap: () => set({ notesTab: id }) };
  });
  const noteRows = NOTES.filter(n => st.notesTab === "all" || n[2] === st.notesTab).map(([t, meta, kind, when]) => ({
    t, meta, when,
    color: kind === "flag" ? ORANGE : kind === "tutor" ? BRAND : GOLD,
    icon: kind === "flag" ? "⚑" : kind === "tutor" ? "AI" : "✎",
    iconBg: kind === "flag" ? "#FFF6E9" : kind === "tutor" ? "#E9F7FD" : "#FFF7E3",
    iconFg: kind === "flag" ? "#CC7800" : kind === "tutor" ? BRAND_D : "#B07A16"
  }));

  /* achievements */
  const achv = ACHV.map(([name, sub, p, glyph]) => ({
    name, sub, glyph, pct: Math.round(p * 100), done: p >= 1,
    bg: p >= 1 ? "#FFF7E3" : "#fff", bd: p >= 1 ? "#FFE3A3" : "#EEF3F7",
    badgeBg: p >= 1 ? GOLD : "#EFF4F7", badgeFg: p >= 1 ? "#5A4300" : "#B9C6CE",
    barColor: p >= 1 ? GOLD : p > 0 ? BRAND : "#DDE6EC",
    label: p >= 1 ? "Unlocked" : p > 0 ? Math.round(p * 100) + "%" : "Locked",
    labelFg: p >= 1 ? "#B07A16" : p > 0 ? BRAND_D : "#93A3AE"
  }));

  /* celebration */
  const celeMap = {
    goal: { title: "Daily goal smashed!", body: "60 XP today. Your 24-day streak is safe.", stat: "+60 XP", color: BRAND, dark: BRAND_D, glyph: "🎯" },
    unit: { title: "Unit 3 complete!", body: "Heart of Algebra cleared. Unit 4 is now open.", stat: "+120 XP", color: GREEN, dark: GREEN_D, glyph: "🏆" },
    league: { title: "Promoted to Ruby league!", body: "You finished rank 2 in Sapphire this week.", stat: "Rank 2", color: "#FF4B4B", dark: "#D93A3A", glyph: "👑" },
    lesson: { title: "Lesson complete!", body: "4 of 4 correct. That is your best streak this week.", stat: "+" + Math.max(st.runXp, 20) + " XP", color: GREEN, dark: GREEN_D, glyph: "⭐" }
  };
  const cele = celeMap[st.celebrate] || celeMap.goal;

  /* tutor hint ladder */
  const hintLadder = [
    "Start with what the question is actually asking — the final value, not the change.",
    "Write the equation for the standard form of a circle: (x−h)² + (y−k)² = r².",
    "You were given the diameter, 10. The radius is half that, so r² = 25.",
    "Full answer: (x−2)² + (y+3)² = 25. Choice B."
  ].slice(0, st.hintStep).map((text, i) => ({ text, n: i + 1 }));

  /* theme picker */
  const activeTheme = st.theme || settings.primary || "#009ADA";
  const themeSwatches = THEMES.map(([hex, name]) => ({
    hex, name, on: activeTheme.toLowerCase() === hex.toLowerCase(),
    ring: activeTheme.toLowerCase() === hex.toLowerCase() ? "0 0 0 3px #fff,0 0 0 5px " + hex : "none",
    tap: () => { set({ theme: hex }); }
  }));

  return {
    showThemePicker: settings.showThemePicker ?? true,
    themeSwatches, themeOpen: !!st.themeOpen, activeTheme,
    isDarkMode: isDark,
    darkLabel: isDark ? "Dark" : "Light",
    toggleDark: () => { set({ dark: !isDark }); },
    toggleTheme: () => set({ themeOpen: !st.themeOpen }),
    isRes: st.screen === "res", isOnb: st.screen === "onb", isRun: st.screen === "run",
    isCards: st.screen === "cards", isNotes: st.screen === "notes", isAchv: st.screen === "achv", isReport: st.screen === "report",
    navNotes: navPill(st.screen === "notes"),
    goRes: () => set({ screen: "res", resTab: "score" }),
    goOnb: () => set({ screen: "onb", onbStep: 0, onbAns: {} }),
    goNotes: () => set({ screen: "notes", navOpen: false }),
    goAchv: () => set({ screen: "achv" }),
    goReport: () => set({ screen: "report" }),
    goCards: () => set({ screen: "cards", cardI: 0, cardFlip: false }),
    goRun: () => set({ screen: "run", runI: 0, runSel: null, runChecked: false, runXp: 0, runStreak: 0 }),

    resTabs, resFilters, resRows, resIsScore: st.resTab === "score", resIsReview: st.resTab === "review",
    onbNotDone: onbStep < onbTotal, cardNotFlipped: !st.cardFlip,

    onbCur, onbOpts, onbPicked, onbDone,
    onbStepLabel: "Step " + Math.min(onbStep + 1, onbTotal) + " of " + onbTotal,
    onbPct: Math.round(Math.min(onbStep, onbTotal) / onbTotal * 100),
    onbNext: () => { if (onbPicked) set({ onbStep: onbStep + 1 }); },
    onbBack: () => set({ onbStep: Math.max(0, onbStep - 1) }),
    onbFinish: () => set({ screen: "plan" }),
    onbDiagnostic: () => set({ screen: "run", runI: 0, runSel: null, runChecked: false, runXp: 0 }),

    runQ: rq, runChoices, runXpNow: st.runXp, runStreakNow: st.runStreak,
    runPct: Math.round(st.runI / RUN.length * 100),
    runCounter: (st.runI + 1) + " / " + RUN.length,
    runChecked: st.runChecked, runCorrect: rCorrect, runPicked: st.runSel !== null,
    runFeedback: {
      title: rCorrect ? "Correct! +10 XP" : "Not quite",
      body: rq.why,
      bg: rCorrect ? "#F1FAE6" : "#FFF0F0", bd: rCorrect ? GREEN : "#FF4B4B",
      fg: rCorrect ? "#3F8C06" : "#D93A3A"
    },
    runBtnLabel: st.runChecked ? (runLast ? "Finish lesson" : "Continue") : (st.runSel === null ? "Pick an answer" : "Check"),
    runBtnBg: st.runSel === null ? "#B9C6CE" : st.runChecked ? GREEN : BRAND,
    runBtnDark: st.runSel === null ? "#9CACB6" : st.runChecked ? GREEN_D : BRAND_D,
    runNext: () => {
      if (!st.runChecked) { if (st.runSel !== null) set({ runChecked: true, runXp: st.runXp + (rCorrect ? 10 : 0), runStreak: rCorrect ? st.runStreak + 1 : 0 }); return; }
      if (runLast) return set({ celebrate: "lesson" });
      set({ runI: st.runI + 1, runSel: null, runChecked: false });
    },
    runQuit: () => set({ screen: "path" }),

    card: { word: cw[0], def: cw[1] }, cardFlipped: st.cardFlip,
    cardCounter: (st.cardI % WORDS.length + 1) + " / " + WORDS.length,
    cardKnownCount, cardPct: Math.round((st.cardI % WORDS.length) / WORDS.length * 100),
    flipCard: () => set({ cardFlip: !st.cardFlip }),
    cardKnow: () => set({ cardKnown: { ...st.cardKnown, [st.cardI]: "known" }, cardI: st.cardI + 1, cardFlip: false }),
    cardRepeat: () => set({ cardKnown: { ...st.cardKnown, [st.cardI]: "repeat" }, cardI: st.cardI + 1, cardFlip: false }),

    noteTabs, noteRows, achv,
    achvDone: ACHV.filter(a => a[3] && a[2] >= 1).length,

    celeOpen: !!st.celebrate, cele,
    showCele: k => set({ celebrate: k }),
    celeGoal: () => set({ celebrate: "goal" }),
    celeUnit: () => set({ celebrate: "unit" }),
    celeLeague: () => set({ celebrate: "league" }),
    closeCele: () => set({ celebrate: null }),
    celeContinue: () => set({ celebrate: null, screen: st.celebrate === "lesson" ? "path" : st.screen }),

    hintLadder, hintStep: st.hintStep,
    moreHint: () => set({ hintStep: Math.min(4, st.hintStep + 1) }),
    resetHint: () => set({ hintStep: 0 }),
    hintBtnLabel: st.hintStep === 0 ? "Give me a nudge" : st.hintStep >= 4 ? "That's the full answer" : "Next hint",

    isAna: st.screen === "ana",
    navAna: navPill(st.screen === "ana"),
    goAna: () => set({ screen: "ana", navOpen: false }),
    anaTabs, anaCells, anaWeeks, anaMocks, anaPace,
    anaHoursTotal: ANA_WEEKS.reduce((a, w) => a + w[1], 0).toFixed(1) + "h",
    isQb: st.screen === "qb", isPlan: st.screen === "plan", isProfile: st.screen === "profile",
    navQb: navPill(st.screen === "qb"), navPlan: navPill(st.screen === "plan"), navProfile: navPill(st.screen === "profile"),
    goQb: () => set({ screen: "qb", navOpen: false }),
    goPlan: () => set({ screen: "plan", navOpen: false }),
    goProfile: () => set({ screen: "profile", navOpen: false }),
    goalTarget: gTarget, goalModes, goalPips, goalDone: gDone,
    goalRingDeg: Math.round(gXp / gTarget * 360),
    goalLeftLabel: gDone ? "Goal complete!" : (gTarget - gXp) + " XP to go",
    goalBtnLabel: gDone ? "Bonus +10 XP" : "Log 10 XP",
    resetGoal: () => set({ goalXp: 0 }),
    qbDomains, qbRows, qbCount,
    qbSearch: st.qbSearch, onQbSearch: e => set({ qbSearch: e.target.value }),
    qbPractice: () => set({ screen: "exam", qi: 0 }),
    qbClear: () => set({ qbSel: {} }),
    planWeek, planToday, planDoneCount, planPct: Math.round(planDoneCount / TODAY.length * 100),
    toggleRows,
    isDrills: st.screen === "drills", isVocab: st.screen === "vocab",
    navDrills: navPill(st.screen === "drills"), navVocab: navPill(st.screen === "vocab"),
    goDrills: () => set({ screen: "drills", navOpen: false }),
    goVocab: () => set({ screen: "vocab", navOpen: false }),
    drillTabs, drills: drillList,
    drillHistory: [
      { name: "Vocabulary in context", when: "Yesterday · 10 Q", score: "4/10", color: "#FF4B4B" },
      { name: "Systems of equations", when: "2 days ago · 12 Q", score: "11/12", color: GREEN },
      { name: "Transitions", when: "3 days ago · 12 Q", score: "8/12", color: ORANGE }
    ],
    vocabQ: st.vocabQ, onVocabSearch: e => set({ vocabQ: e.target.value }),
    words, vocabUnits,
    vocabLearned: learnedTotal, vocabRepeat: repeatTotal, vocabTotal,
    vocabDeg: Math.round(learnedTotal / vocabTotal * 360),
    vocabRepeatDeg: Math.round((learnedTotal + repeatTotal) / vocabTotal * 360),

    lessonOpen: lessonIdx !== null,
    lesson: lessonSrc ? {
      title: lessonSrc.t, meta: lessonSrc.s, unit: "Unit " + unit.n + " · " + unit.name,
      desc: LESSON_META.desc, bullets: LESSON_META.bullets, color: unit.color, dark: unit.dark
    } : { title: "", meta: "", unit: "", desc: "", bullets: [], color: BRAND, dark: BRAND_D },
    closeLesson: () => set({ lesson: null }),
    doExercises: () => set({ screen: "run", lesson: null, runI: 0, runSel: null, runChecked: false, runXp: 0, runStreak: 0 }),
    completeLesson: () => set({
      lesson: null, open: null,
      progress: { ...st.progress, [st.unit]: Math.max(prog, (lessonIdx || 0) + 1) },
      goalXp: Math.min(60, st.goalXp + 20)
    }),

    showSidebar: ["exam", "run", "cards", "onb"].indexOf(st.screen) < 0,
    sidebarDisplay: ["exam", "run", "cards", "onb"].indexOf(st.screen) < 0 ? "flex" : "none",
    isMain: st.screen === "main", isPath: st.screen === "path", isMock: st.screen === "mock", isExam: st.screen === "exam",
    isTutor: st.screen === "tutor", isLb: st.screen === "lb",
    navTutor: navPill(st.screen === "tutor"), navLb: navPill(st.screen === "lb"),
    goTutor: () => set({ screen: "tutor", navOpen: false }),
    goLb: () => set({ screen: "lb", navOpen: false }),
    radarBars, chat, chatDraft: st.draft, thinking: st.thinking, send,
    onDraft: e => set({ draft: e.target.value }),
    onKey: e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } },
    chips: [
      "Explain my last wrong answer", "Drill vocab in context", "How do I pace Module 2?", "Make a 7-day plan"
    ].map(text => ({ text, tap: () => { set({ draft: text }); } })),
    lbRows, lbTabs, podium,
    addXp: () => set({ goalXp: Math.min(st.goalTarget, st.goalXp + 10) }),
    showRightRail: settings.showRightRail ?? true,
    showTimer: settings.showTimer ?? true,
    goMain: () => set({ screen: "main", navOpen: false }),
    goPath: () => set({ screen: "path", navOpen: false }),
    goMock: () => set({ screen: "mock", navOpen: false }),
    startExam: () => set({ screen: "exam", navOpen: false }),
    navMain: navPill(st.screen === "main"), navPath: navPill(st.screen === "path"),
    navMock: navPill(st.screen === "mock" || st.screen === "exam"),
    goalXp: st.goalXp, goalPct: Math.round(st.goalXp / 60 * 100), scoreDeg: Math.round(1080 / 1600 * 360),

    tabRw: tab(st.radar === "rw"), tabMath: tab(st.radar === "math"),
    showRw: () => set({ radar: "rw" }), showMath: () => set({ radar: "math" }),
    radarPts, radarAxes, radarStroke: rColor,
    radarFill: st.radar === "rw" ? "rgba(0,154,218,.22)" : "rgba(88,204,2,.22)",
    trendPts, trendLine, trendArea,

    countdown: [
      { v: pad(st.cd.d), l: "DAYS" }, { v: pad(st.cd.h), l: "HOURS" },
      { v: pad(st.cd.m), l: "MINS" }, { v: pad(st.cd.s), l: "SECS" }
    ],
    week: ["MO", "TU", "WE", "TH", "FR", "SA", "SU"].map((l, i) => i < 2
      ? { l, mark: "🔥", bg: "#FFF3E0", bd: "#FFD79A", fg: ORANGE }
      : i === 2 ? { l, mark: "•", bg: "#E9F7FD", bd: BRAND, fg: BRAND }
      : { l, mark: "", bg: "#F4F8FB", bd: "#E6EEF3", fg: "#C3CDD5" }),
    quests: [
      { title: "Finish 2 algebra lessons", pct: 50, icon: "★", color: GREEN, dark: GREEN_D, tint: "#F4FBEC", bd: "#DCEFC4", cta: "Go", go: () => set({ screen: "path" }) },
      { title: "Score 80% on a vocab drill", pct: 25, icon: "AB", color: ORANGE, dark: "#CC7800", tint: "#FFF6E9", bd: "#FFE1B3", cta: "Drill", go: () => set({ screen: "mock", tab: "quick" }) },
      { title: "Complete one timed module", pct: 0, icon: "⏱", color: BRAND, dark: BRAND_D, tint: "#E9F7FD", bd: "#C2E7F7", cta: "Start", go: () => set({ screen: "mock", tab: "full" }) }
    ],
    skills: [
      { name: "Inferences", pct: 99, color: GREEN }, { name: "Student notes", pct: 97, color: GREEN },
      { name: "Form & structure", pct: 80, color: BRAND }, { name: "Boundaries", pct: 59, color: ORANGE },
      { name: "Vocab in context", pct: 27, color: "#FF4B4B" }
    ],
    league: [
      { rank: 1, ini: "MK", name: "Malika K.", country: "Uzbekistan", xp: 1820, av: GOLD, bg: "#FFFBEF", bd: "#FFE9A8", rankColor: GOLD_D },
      { rank: 2, ini: "DA", name: "Daniel A.", country: "Spain", xp: 1610, av: BRAND, bg: "#fff", bd: "#EEF3F7", rankColor: "#93A3AE" },
      { rank: 3, ini: "SJ", name: "You", country: "Tashkent", xp: 1240, av: BRAND, bg: "#E9F7FD", bd: "#C2E7F7", rankColor: BRAND },
      { rank: 4, ini: "LT", name: "Lin T.", country: "Vietnam", xp: 1105, av: GREEN, bg: "#fff", bd: "#EEF3F7", rankColor: "#93A3AE" }
    ],
    badges: [
      { glyph: "★", title: "First 1000", bg: "#E9F7FD", bd: "#C2E7F7", fg: BRAND },
      { glyph: "🔥", title: "21-day streak", bg: "#FFF3E0", bd: "#FFD79A", fg: ORANGE },
      { glyph: "✓", title: "Unit 1 cleared", bg: "#F1FAE6", bd: "#CFEBA8", fg: "#3F8C06" },
      { glyph: "⚑", title: "First mock", bg: "#FFF7E3", bd: "#FFE3A3", fg: GOLD_D },
      { glyph: "∑", title: "Math 600+", bg: "#E9F7FD", bd: "#C2E7F7", fg: BRAND },
      { glyph: "?", title: "Locked", bg: "#F4F8FB", bd: "#E6EEF3", fg: "#C3CDD5" },
      { glyph: "?", title: "Locked", bg: "#F4F8FB", bd: "#E6EEF3", fg: "#C3CDD5" },
      { glyph: "?", title: "Locked", bg: "#F4F8FB", bd: "#E6EEF3", fg: "#C3CDD5" }
    ],

    unit: { n: unit.n, name: unit.name, section: unit.section, blurb: unit.blurb, color: unit.color, dark: unit.dark },
    unitChips, nodes,
    unitSkills: unit.skills.map(([name, pct]) => ({ name, pct, color: pct >= 80 ? GREEN : pct >= 50 ? BRAND : ORANGE })),
    unitPct: Math.round(prog / unit.lessons.length * 100),
    doneCount: prog, lockCount: Math.max(0, unit.lessons.length - prog - 1), xpEarned: prog * 20 + 380,
    nextUnitLabel: st.unit < UNITS.length - 1 ? "Next · " + UNITS[st.unit + 1].name : "Path complete · full mock next",
    nextTitle: nextLesson.t,
    jumpCurrent: () => set({ open: prog }),
    startNext: () => set({ open: prog }),
    friends: [
      { ini: "MK", name: "Malika K.", at: "Unit 3 · lesson 2", delta: "+3", color: GREEN, av: GOLD },
      { ini: "DA", name: "Daniel A.", at: "Unit 2 · boss check", delta: "+1", color: BRAND, av: BRAND },
      { ini: "LT", name: "Lin T.", at: "Unit 2 · lesson 3", delta: "-1", color: "#93A3AE", av: GREEN }
    ],

    modeTabs, tests, sectionTiles,
    listTitle: st.tab === "full" ? "Full-length exams" : st.tab === "math" ? "Math-only mocks" : st.tab === "eng" ? "Reading & Writing mocks" : "Short drills",
    heroChips: [
      { label: "R&W 510", bg: "rgba(255,255,255,.12)", fg: "#fff" },
      { label: "Math 570", bg: "rgba(255,255,255,.12)", fg: "#fff" },
      { label: "Best 1180", bg: "rgba(0,154,218,.3)", fg: "#9FE0FF" },
      { label: "+130 / mo", bg: "rgba(88,204,2,.22)", fg: "#9BE85B" }
    ],
    results: [
      { name: "Full Test 03", score: 1180, pct: 74, color: GREEN, delta: "+60", deltaColor: GREEN },
      { name: "Math Mock 03", score: 610, pct: 78, color: BRAND, delta: "+40", deltaColor: GREEN },
      { name: "R&W Mock 03", score: 540, pct: 69, color: ORANGE, delta: "-10", deltaColor: "#FF4B4B" },
      { name: "Full Test 02", score: 1120, pct: 70, color: GREEN, delta: "+100", deltaColor: GREEN }
    ],
    pace: [
      { label: "ALG", h: 55, color: GREEN, title: "Algebra 1m 05s" },
      { label: "ADV", h: 72, color: GREEN, title: "Advanced math 1m 22s" },
      { label: "DATA", h: 64, color: BRAND, title: "Data 1m 12s" },
      { label: "GEO", h: 100, color: "#FF4B4B", title: "Geometry 2m 10s" },
      { label: "CRAFT", h: 60, color: BRAND, title: "Craft & structure 1m 08s" },
      { label: "VOCAB", h: 88, color: ORANGE, title: "Vocab 1m 45s" }
    ],

    q, qNum, choices, dots, grid,
    clock: Math.floor(st.sec / 60) + ":" + pad(st.sec % 60),
    timerBg: lowTime ? "#FFF0F0" : "#E9F7FD", timerBd: lowTime ? "#FFAFAF" : "#B8E4F7", timerFg: lowTime ? "#D93A3A" : BRAND_D,
    navOpen: st.navOpen, hintOpen: st.hintOpen, navLabel: "Question " + qNum + " of 20",
    toggleNav: () => set({ navOpen: !st.navOpen }),
    toggleHint: () => set({ hintOpen: !st.hintOpen }),
    toggleMark: () => set({ marks: { ...st.marks, [st.qi]: !marked } }),
    mark: marked
      ? { bg: "#FFF7E3", bd: GOLD, fg: "#B07A16", fill: GOLD, label: "Marked" }
      : { bg: "#fff", bd: "#E4EBF0", fg: "#93A3AE", fill: "none", label: "Mark for review" },
    feedback: {
      show: isChecked, bg: correct ? "#F1FAE6" : "#FFF0F0", bd: correct ? "#8FE04A" : "#FFAFAF",
      fg: correct ? "#3F8C06" : "#D93A3A", title: correct ? "Nice! +15 XP" : "Not quite",
      body: correct ? "Three correct in a row — pace is 1m 08s per question, ahead of target."
        : "Correct answer: " + "ABCD"[q.answer] + " · " + q.choices[q.answer] + ". Tap AI tutor for a walkthrough."
    },
    nextBtn: isChecked ? { label: "Next question", bg: GREEN, dark: GREEN_D }
      : sel !== undefined ? { label: "Check answer", bg: BRAND, dark: BRAND_D }
      : { label: "Skip", bg: "#B9C4CD", dark: "#96A2AB" },
    prevQ: () => set({ qi: (st.qi + QS.length - 1) % QS.length, hintOpen: false }),
    nextQ: () => {
      if (sel !== undefined && !isChecked) return set({ checked: { ...st.checked, [st.qi]: true } });
      set({ qi: (st.qi + 1) % QS.length, hintOpen: false });
    }
  };
}
