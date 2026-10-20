import { cn, toast } from "@heroui/react";
import { type FormEvent, useState } from "react";

import { ShieldIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { SelectField, TextInputField } from "@/components/ui/FormFields";
import { Icon3D } from "@/components/ui/Icon3D";
import { InitialsAvatar } from "@/components/ui/InitialsAvatar";
import { InfoBanner } from "@/components/ui/InfoBanner";
import { PageTitle } from "@/components/ui/PageTitle";
import { SwitchRow } from "@/components/ui/SwitchRow";
import {
  initialParents,
  type LinkedParent,
  parentPermissions,
  parentRelations,
  parentWeeklySummary,
  weekdays,
} from "@/data/account";

import { AccountSection } from "./AccountSection";

const initialsOf = (parent: LinkedParent) =>
  (parent.name || parent.email)
    .split(/[\s.@]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

/** Parent access: invite parents, choose what they see, and preview their weekly email. */
export function ParentAccessPage() {
  const [parents, setParents] = useState<LinkedParent[]>(initialParents);
  const [permissions, setPermissions] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(parentPermissions.map((p) => [p.id, p.defaultOn])),
  );
  const [weeklyEmail, setWeeklyEmail] = useState(true);
  const [emailDay, setEmailDay] = useState("Sunday");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [relation, setRelation] = useState(parentRelations[0]);
  const isValidEmail = /^\S+@\S+\.\S+$/.test(email.trim());

  const invite = (event: FormEvent) => {
    event.preventDefault();
    if (!isValidEmail) return;
    setParents((current) => [
      ...current,
      {
        id: `p-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        relation,
        status: "invited",
        note: "Invite sent just now",
      },
    ]);
    toast.success(`Invite sent to ${email.trim()}`);
    setName("");
    setEmail("");
  };

  const remove = (parent: LinkedParent) => {
    setParents((current) => current.filter((p) => p.id !== parent.id));
    toast(parent.status === "invited" ? "Invite cancelled" : `${parent.name || parent.email} no longer has access`);
  };

  return (
    <div className="max-w-[1180px] md:px-9 md:pt-7.5 md:pb-17.5">
      <PageTitle icon={<Icon3D icon="parents" size={38} />} className="mb-5.5 max-md:hidden">
        Parent access
      </PageTitle>

      <InfoBanner icon={<ShieldIcon size={19} />} title="You stay in control" className="mb-6">
        Parents get a read-only view of what you allow below. They can't see your chats, and you can remove access anytime.
      </InfoBanner>

      <div className="flex flex-wrap items-start gap-5">
        <div className="flex min-w-[min(100%,420px)] flex-[1_1_560px] flex-col gap-5">
          <AccountSection icon="parents" title="Linked parents" description={`${parents.length} of 3 seats used`}>
            <div className="flex flex-col gap-2.5">
              {parents.map((parent) => (
                <div
                  key={parent.id}
                  className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-surface-2 p-3.5"
                >
                  <InitialsAvatar
                    initials={initialsOf(parent)}
                    background={parent.status === "active" ? "#E5308F" : "var(--border-3)"}
                    className="size-10.5"
                    fallbackClassName="text-[13px]"
                  />
                  <div className="min-w-[min(100%,180px)] flex-1">
                    <div className="text-[15px] font-bold">
                      {parent.name || parent.email}{" "}
                      <span className="text-[12.5px] font-semibold text-muted-2">· {parent.relation}</span>
                    </div>
                    <div className="text-[12.5px] font-semibold text-muted-2">
                      {parent.name && `${parent.email} · `}
                      {parent.note}
                    </div>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[11.5px] font-extrabold",
                      parent.status === "active" ? "bg-tint-green text-on-green" : "bg-tint-amber text-on-amber",
                    )}
                  >
                    {parent.status === "active" ? "Active" : "Invited"}
                  </span>
                  <Button tone="outline" onPress={() => remove(parent)} className="rounded-xl px-3.5 py-2 text-[12.5px]">
                    {parent.status === "active" ? "Remove" : "Cancel invite"}
                  </Button>
                </div>
              ))}
            </div>
          </AccountSection>

          <AccountSection icon="mail" title="Invite a parent" description="They'll get an email with a link to join">
            <form onSubmit={invite} className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3.5">
              <TextInputField label="Name (optional)" value={name} onChange={setName} placeholder="Nodira Ismoilova" />
              <TextInputField
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="parent@example.com"
                isRequired
              />
              <SelectField label="Relationship" value={relation} options={parentRelations} onChange={setRelation} />
              <div className="flex items-end">
                <Button
                  type="submit"
                  tone="brand"
                  isDisabled={!isValidEmail || parents.length >= 3}
                  className="w-full rounded-xl py-3 text-[14px]"
                >
                  Send invite
                </Button>
              </div>
            </form>
          </AccountSection>

          <AccountSection icon="privacy" title="What parents can see">
            <div className="flex flex-col divide-y divide-border">
              {parentPermissions.map((permission) => (
                <SwitchRow
                  key={permission.id}
                  label={permission.label}
                  description={permission.description}
                  isSelected={permissions[permission.id]}
                  onChange={(isOn) =>
                    setPermissions((current) => ({
                      ...current,
                      [permission.id]: isOn,
                    }))
                  }
                  className="py-2.5"
                />
              ))}
            </div>
          </AccountSection>
        </div>

        <div className="flex w-85 max-w-full flex-[1_1_300px] flex-col gap-4 md:max-w-95">
          <AccountSection icon="notifications" title="Weekly email">
            <SwitchRow
              label="Send a weekly summary"
              description="A short report of your week"
              isSelected={weeklyEmail}
              onChange={setWeeklyEmail}
            />
            {weeklyEmail && (
              <SelectField label="Send on" value={emailDay} options={weekdays} onChange={setEmailDay} className="mt-3.5" />
            )}
          </AccountSection>

          <div className="rounded-[18px] border border-tint-blue-bd bg-tint-blue p-5">
            <div className="mb-3 text-[12px] font-extrabold tracking-[1px] text-on-blue">PREVIEW · WHAT THEY SEE</div>
            <div className="mb-3 text-[15px] font-bold text-ink">Dilshodbek's week at a glance</div>
            <div className="grid grid-cols-2 gap-2.5">
              {parentWeeklySummary
                .filter((item) => permissions[item.permission])
                .map((item) => (
                  <div key={item.label} className="rounded-xl bg-surface p-3">
                    <div className="text-[19px] font-extrabold tracking-[-0.5px]">{item.value}</div>
                    <div className="text-[12px] font-semibold text-muted-2">{item.label}</div>
                  </div>
                ))}
            </div>
            {parentWeeklySummary.every((item) => !permissions[item.permission]) && (
              <div className="text-[13px] font-semibold text-on-blue">Nothing is shared right now.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
