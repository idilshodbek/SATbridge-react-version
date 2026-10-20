import { AlertDialog, cn, Input, Label, Slider, toast, ToggleButton, ToggleButtonGroup } from "@heroui/react";
import { type FormEvent, type Key, useEffect, useState } from "react";
import { useLocation } from "react-router";

import { useAppTheme } from "@/app/theme-context";
import { Button } from "@/components/ui/Button";
import { SelectField, TextInputField } from "@/components/ui/FormFields";
import { Icon3D } from "@/components/ui/Icon3D";
import { PageTitle } from "@/components/ui/PageTitle";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { SwitchRow } from "@/components/ui/SwitchRow";
import { defaultSettings, type Settings, settingsOptions } from "@/data/account";

import { AccountSection } from "./AccountSection";

const STUDY_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const twoColumns = "grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-4";

/** Settings: profile, goals, study habits, notifications, appearance, accommodations and privacy. */
export function SettingsPage() {
  const { hash } = useLocation();
  // Links such as "Change target & test date" deep-link to a section. The shell resets its scroll position on
  // every route change, so wait a tick before scrolling to the section.
  useEffect(() => {
    if (!hash) return;
    const timer = window.setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [hash]);

  const [saved, setSaved] = useState<Settings>(defaultSettings);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const isDirty = JSON.stringify(saved) !== JSON.stringify(settings);

  const update = <K extends keyof Settings>(key: K, value: Settings[K]) =>
    setSettings((current) => ({ ...current, [key]: value }));
  const updateNotification = (key: keyof Settings["notifications"], value: boolean) =>
    setSettings((current) => ({
      ...current,
      notifications: { ...current.notifications, [key]: value },
    }));

  const save = () => {
    setSaved(settings);
    toast.success("Settings saved");
  };

  return (
    <div className="max-w-[980px] md:px-9 md:pt-7.5 md:pb-17.5">
      <PageTitle icon={<Icon3D icon="settings" size={38} />} className="mb-5.5 max-md:hidden">
        Settings
      </PageTitle>

      <div className="flex flex-col gap-5">
        <AccountSection icon="profile" title="Profile">
          <div className={twoColumns}>
            <TextInputField label="Full name" value={settings.fullName} onChange={(v) => update("fullName", v)} />
            <TextInputField
              label="Display name"
              value={settings.displayName}
              onChange={(v) => update("displayName", v)}
              description="Shown on leaderboards and in chats"
            />
            <TextInputField label="Email" type="email" value={settings.email} onChange={(v) => update("email", v)} />
            <TextInputField label="School or learning centre" value={settings.school} onChange={(v) => update("school", v)} />
            <SelectField
              label="Grade"
              value={settings.grade}
              options={settingsOptions.grades}
              onChange={(v) => update("grade", v)}
            />
          </div>
        </AccountSection>

        <AccountSection id="goals" icon="goal" title="Exam & goals" description="Your study plan is built from these">
          <div className={twoColumns}>
            <SelectField
              label="Test date"
              value={settings.testDate}
              options={settingsOptions.testDates}
              onChange={(v) => update("testDate", v)}
            />
            <Slider
              aria-label="Goal score"
              minValue={1200}
              maxValue={1600}
              step={10}
              value={settings.goalScore}
              onChange={(value) => update("goalScore", Array.isArray(value) ? value[0] : value)}
              className="flex flex-col"
            >
              <div className="mb-1.5 flex items-center justify-between">
                <Label className="text-[13.5px] font-bold text-muted">Goal score</Label>
                <Slider.Output className="text-[16px] font-extrabold text-accent" />
              </div>
              <Slider.Track className="mt-3 h-2 rounded-full bg-surface-3">
                <Slider.Fill className="rounded-full bg-accent" />
                <Slider.Thumb className="size-5 border-2 border-accent bg-white" />
              </Slider.Track>
            </Slider>
          </div>
          <CollegePicker colleges={settings.targetColleges} onChange={(v) => update("targetColleges", v)} />
        </AccountSection>

        <AccountSection id="study" icon="plan" title="Study habits">
          <div className={twoColumns}>
            <SelectField
              label="Daily goal"
              value={settings.dailyGoal}
              options={settingsOptions.dailyGoals}
              onChange={(v) => update("dailyGoal", v)}
            />
            <SelectField
              label="Reminder time"
              value={settings.reminderTime}
              options={settingsOptions.reminderTimes}
              onChange={(v) => update("reminderTime", v)}
            />
          </div>
          <div className="mt-4">
            <div className="mb-1.5 text-[13.5px] font-bold text-muted">Study days</div>
            <ToggleButtonGroup
              aria-label="Study days"
              selectionMode="multiple"
              isDetached
              selectedKeys={settings.studyDays}
              onSelectionChange={(keys: Set<Key>) =>
                update(
                  "studyDays",
                  STUDY_DAYS.filter((day) => keys.has(day)),
                )
              }
              className="flex flex-wrap gap-2"
            >
              {STUDY_DAYS.map((day) => (
                <ToggleButton
                  key={day}
                  id={day}
                  className="h-auto min-w-0 rounded-xl border border-border bg-surface px-3.5 py-2.25 text-[13.5px] font-bold text-muted hover:bg-surface data-[selected=true]:border-accent data-[selected=true]:bg-tint-blue data-[selected=true]:text-on-blue"
                >
                  {day}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </div>
        </AccountSection>

        <AccountSection icon="notifications" title="Notifications">
          <div className="flex flex-col divide-y divide-border">
            <SwitchRow
              label="Daily reminder"
              description={`At ${settings.reminderTime} on study days`}
              isSelected={settings.notifications.dailyReminder}
              onChange={(v) => updateNotification("dailyReminder", v)}
              className="py-2.5"
            />
            <SwitchRow
              label="Streak at risk"
              description="If you haven't studied by 20:00"
              isSelected={settings.notifications.streakAtRisk}
              onChange={(v) => updateNotification("streakAtRisk", v)}
              className="py-2.5"
            />
            <SwitchRow
              label="Weekly report"
              description="Your week in numbers, every Sunday"
              isSelected={settings.notifications.weeklyReport}
              onChange={(v) => updateNotification("weeklyReport", v)}
              className="py-2.5"
            />
            <SwitchRow
              label="Community replies"
              description="New messages, friend requests and room invites"
              isSelected={settings.notifications.communityReplies}
              onChange={(v) => updateNotification("communityReplies", v)}
              className="py-2.5"
            />
          </div>
        </AccountSection>

        <div className={twoColumns}>
          <AppearanceSection />
          <AccountSection icon="timer" title="Test accommodations" description="Applied to timed tests">
            <SelectField
              label="Extended time"
              value={settings.extendedTime}
              options={settingsOptions.extendedTime}
              onChange={(v) => update("extendedTime", v)}
            />
            <SwitchRow
              label="Extra breaks"
              isSelected={settings.extraBreaks}
              onChange={(v) => update("extraBreaks", v)}
              className="mt-3.5"
            />
          </AccountSection>
        </div>

        <AccountSection icon="privacy" title="Privacy">
          <div className="flex flex-col divide-y divide-border">
            <SwitchRow
              label="Public profile"
              description="Friends and classmates can see your card"
              isSelected={settings.publicProfile}
              onChange={(v) => update("publicProfile", v)}
              className="py-2.5"
            />
            <SwitchRow
              label="Show me on leaderboards"
              description="Weekly XP rankings in Community and classes"
              isSelected={settings.showOnLeaderboard}
              onChange={(v) => update("showOnLeaderboard", v)}
              className="py-2.5"
            />
          </div>
        </AccountSection>

        <AccountSection icon="lock" title="Account">
          <div className="flex flex-wrap gap-2.5">
            <Button tone="outline" onPress={() => toast("Signed out (demo)")} className="rounded-xl px-5 py-2.75 text-[14px]">
              Sign out
            </Button>
            <DeleteAccountButton />
          </div>
        </AccountSection>
      </div>

      {isDirty && (
        <div className="sticky bottom-3 z-10 mt-5 flex animate-slide-in flex-wrap items-center gap-3 rounded-2xl border border-border bg-surface p-3.5 shadow-[0_12px_32px_rgba(15,36,48,.16)]">
          <span className="min-w-0 flex-1 text-[14px] font-bold">You have unsaved changes</span>
          <Button tone="outline" onPress={() => setSettings(saved)} className="rounded-xl px-4.5 py-2.5 text-[13.5px]">
            Discard
          </Button>
          <Button tone="brand" onPress={save} className="rounded-xl px-5 py-2.5 text-[13.5px]">
            Save changes
          </Button>
        </div>
      )}
    </div>
  );
}

/** Target colleges as removable chips plus an "add" field. */
function CollegePicker({ colleges, onChange }: { colleges: string[]; onChange: (colleges: string[]) => void }) {
  const [draft, setDraft] = useState("");

  const add = (event: FormEvent) => {
    event.preventDefault();
    const name = draft.trim();
    if (!name || colleges.includes(name)) return;
    onChange([...colleges, name]);
    setDraft("");
  };

  return (
    <div className="mt-4">
      <div className="mb-1.5 text-[13.5px] font-bold text-muted">Target colleges</div>
      <div className="flex flex-wrap items-center gap-2">
        {colleges.map((college) => (
          <span
            key={college}
            className="flex items-center gap-1.5 rounded-full bg-tint-blue py-1.5 pr-1.5 pl-3 text-[13px] font-bold text-on-blue"
          >
            {college}
            <Button
              aria-label={`Remove ${college}`}
              onPress={() => onChange(colleges.filter((c) => c !== college))}
              className="size-5.5 rounded-full p-0 text-[11px] text-on-blue hover:bg-tint-blue-bd"
            >
              ✕
            </Button>
          </span>
        ))}
        <form onSubmit={add} className="flex items-center gap-1.5">
          <Input
            aria-label="Add a college"
            placeholder="Add a college"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            className="h-auto w-44 rounded-full border border-border bg-surface px-3.5 py-1.75 text-[13px] font-medium shadow-none placeholder:text-muted-2"
          />
          <Button type="submit" tone="soft" isDisabled={!draft.trim()} className="rounded-full px-3.5 py-1.75 text-[13px]">
            Add
          </Button>
        </form>
      </div>
    </div>
  );
}

function AppearanceSection() {
  const { isDark, toggleTheme } = useAppTheme();

  return (
    <AccountSection icon="dark-mode" title="Appearance">
      <SegmentedControl
        aria-label="Theme"
        options={[
          { id: "light", label: "Light" },
          { id: "dark", label: "Dark" },
        ]}
        value={isDark ? "dark" : "light"}
        onChange={(theme) => theme !== (isDark ? "dark" : "light") && toggleTheme()}
        className="w-full gap-1 rounded-xl border border-border bg-surface-2 p-1"
        itemClassName={cn("flex-1 rounded-lg py-2.5 text-[13.5px]")}
      />
    </AccountSection>
  );
}

function DeleteAccountButton() {
  return (
    <AlertDialog>
      <Button tone="outline" className="rounded-xl px-5 py-2.75 text-[14px] text-danger-ink">
        Delete account
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="rounded-[20px] sm:max-w-100">
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete your account?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p className="text-[14px] leading-[1.55] text-muted">
                Your progress, streak, XP and test reports will be removed after 30 days. You can cancel by signing back in before
                then.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" tone="outline" className="rounded-xl px-4.5 py-2.5 text-[13.5px]">
                Keep my account
              </Button>
              <Button
                slot="close"
                tone="danger"
                onPress={() => toast.danger("Account deletion requested (demo)")}
                className="rounded-xl px-4.5 py-2.5 text-[13.5px]"
              >
                Delete account
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
