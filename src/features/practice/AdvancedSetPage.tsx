import { cn } from "@heroui/react";
import { useState } from "react";

import { paths } from "@/app/paths";
import { BoltIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon3D } from "@/components/ui/Icon3D";
import { PageTitle } from "@/components/ui/PageTitle";
import { Panel } from "@/components/ui/Panel";
import { ProgressTrack } from "@/components/ui/ProgressTrack";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { type AdvancedSkill, advancedSet, advancedSkills, advancedTips } from "@/data/practice";

type SubjectFilter = "all" | AdvancedSkill["subject"];

/** Accuracy colour: red when weak, amber when getting there, green when solid. */
const accuracyColor = (accuracy: number) => (accuracy >= 55 ? "#22C55E" : accuracy >= 35 ? "#FF9500" : "#EF4444");

/** The 1500+ set: the hardest questions on the test, grouped by skill. */
export function AdvancedSetPage() {
  const [filter, setFilter] = useState<SubjectFilter>("all");
  const skills = advancedSkills.filter((skill) => filter === "all" || skill.subject === filter);
  const percentSolved = Math.round((advancedSet.solved / advancedSet.total) * 100);

  const stats = [
    { label: "solved", value: `${advancedSet.solved}/${advancedSet.total}` },
    { label: "accuracy", value: `${advancedSet.accuracy}%` },
    {
      label: `avg time · target ${advancedSet.targetTime}`,
      value: advancedSet.avgTime,
    },
  ];

  return (
    <div className="max-w-[1180px] md:px-9 md:pt-7.5 md:pb-17.5">
      <div className="mb-5.5 hidden md:block">
        <PageTitle icon={<Icon3D icon="advanced-set" size={38} />}>1500+ set</PageTitle>
      </div>

      <div className="relative mb-5 overflow-hidden rounded-[22px] bg-ink-surface p-5.5 md:p-7">
        <div
          aria-hidden="true"
          className="absolute -top-12 -right-10 size-56 rounded-full bg-[radial-gradient(circle,rgba(239,68,68,.45),transparent_68%)]"
        />
        <div className="relative flex flex-wrap items-center gap-5">
          <Icon3D icon="advanced-set" size={64} />
          <div className="min-w-[min(100%,260px)] flex-1">
            <div className="text-[22px] leading-[1.2] font-extrabold tracking-[-0.6px] text-white md:text-[28px]">
              The hardest questions on the digital SAT
            </div>
            <div className="mt-1.5 text-[14px] font-semibold text-[#93B4C4]">
              {advancedSet.total} questions at the difficulty of the last items in the harder Module 2. If you can handle these,
              1500+ is in reach.
            </div>
          </div>
          <ButtonLink href={paths.rushSession} tone="brand" className="gap-2 px-5.5 py-3.25 text-[14.5px] max-md:w-full">
            <BoltIcon size={16} />
            Start 10 hardest
          </ButtonLink>
        </div>
        <div className="relative mt-5 grid grid-cols-3 gap-2.5">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl bg-white/8 p-3">
              <div className="text-[20px] font-extrabold tracking-[-0.5px] text-white md:text-[24px]">{stat.value}</div>
              <div className="text-[11.5px] font-semibold text-[#93B4C4]">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="relative mt-4">
          <ProgressTrack aria-label="Set progress" value={percentSolved} color="#EF4444" className="h-2 rounded-md bg-white/15" />
        </div>
      </div>

      <div className="flex flex-wrap items-start gap-5">
        <div className="flex min-w-[min(100%,420px)] flex-[1_1_560px] flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <Eyebrow>BY SKILL</Eyebrow>
            <SegmentedControl
              aria-label="Subject"
              options={[
                { id: "all", label: "All" },
                { id: "Math", label: "Math" },
                { id: "R&W", label: "R&W" },
              ]}
              value={filter}
              onChange={setFilter}
              className="gap-1 rounded-[11px] bg-surface-3 p-0.75"
              itemClassName="rounded-lg px-3.25 py-1.75 text-[12px]"
            />
          </div>

          {skills.map((skill) => (
            <Panel key={skill.name} className="flex flex-wrap items-center gap-3.5 rounded-2xl p-4">
              <div className="min-w-[min(100%,200px)] flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[15.5px] font-bold">{skill.name}</span>
                  <span
                    className={cn(
                      "rounded-md px-1.75 py-0.5 text-[10.5px] font-extrabold",
                      skill.subject === "Math" ? "bg-tint-blue text-on-blue" : "bg-tint-pink text-on-pink",
                    )}
                  >
                    {skill.subject}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2.5">
                  <ProgressTrack
                    aria-label={`${skill.name} solved`}
                    value={(skill.solved / skill.questions) * 100}
                    color={skill.accuracy === null ? "var(--border-3)" : accuracyColor(skill.accuracy)}
                    className="h-1.75 rounded-[5px] bg-surface-3"
                  />
                  <span className="flex-none text-[12px] font-bold text-muted-2">
                    {skill.solved}/{skill.questions}
                  </span>
                </div>
              </div>
              <div className="w-20 text-right">
                {skill.accuracy === null ? (
                  <span className="text-[12.5px] font-bold text-muted-2">Not started</span>
                ) : (
                  <>
                    <div className="text-[18px] font-extrabold" style={{ color: accuracyColor(skill.accuracy) }}>
                      {skill.accuracy}%
                    </div>
                    <div className="text-[11px] font-semibold text-muted-2">accuracy</div>
                  </>
                )}
              </div>
              <ButtonLink href={paths.rushSession} tone="outline" className="rounded-xl px-4 py-2.25 text-[13px]">
                Practice
              </ButtonLink>
            </Panel>
          ))}
        </div>

        <div className="flex w-85 max-w-full flex-[1_1_300px] flex-col gap-4 md:max-w-95">
          <Panel className="rounded-[18px] p-5.5">
            <div className="mb-3.5 flex items-center gap-2.5">
              <Icon3D icon="info" size={28} />
              <Eyebrow>HOW TO USE THIS SET</Eyebrow>
            </div>
            <ul className="flex flex-col gap-3">
              {advancedTips.map((tip) => (
                <li key={tip} className="flex gap-2.5 text-[14px] leading-[1.55] font-medium text-ink-2">
                  <span className="mt-0.5 grid size-5 flex-none place-items-center rounded-full bg-tint-green text-[11px] font-extrabold text-on-green">
                    ✓
                  </span>
                  {tip}
                </li>
              ))}
            </ul>
          </Panel>
          <div className="flex items-start gap-3 rounded-[18px] border border-tint-amber-bd bg-tint-amber p-5">
            <Icon3D icon="trophy" size={36} />
            <div>
              <div className="text-[15px] font-extrabold text-on-amber">Weekly challenge</div>
              <div className="mt-0.5 text-[13px] leading-[1.5] font-semibold text-on-amber">
                Top 50 accuracy on this set by Sunday wins a month of Pro.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
