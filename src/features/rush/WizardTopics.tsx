import { Checkbox, cn } from "@heroui/react";

import { Button } from "@/components/ui/Button";
import type { WizardDomain } from "@/data/rush";

import { type RushWizardState, skillKey } from "./useRushWizard";

/** Topic picker (step 1). `compact` is the mobile sheet sizing. */
export function WizardTopics({ wizard, compact = false }: { wizard: RushWizardState; compact?: boolean }) {
  return (
    <div className={cn("flex flex-col", compact ? "gap-0" : "gap-1.5")}>
      {wizard.domains.map((domain) => (
        <DomainGroup
          key={domain.name}
          domain={domain}
          wizard={wizard}
          compact={compact}
          isOpen={wizard.openDomains.has(domain.name)}
        />
      ))}
    </div>
  );
}

type DomainGroupProps = {
  domain: WizardDomain;
  wizard: RushWizardState;
  compact: boolean;
  isOpen: boolean;
};

function DomainGroup({ domain, wizard, compact, isOpen }: DomainGroupProps) {
  const keys = domain.skills.map((skill) => skillKey(domain, skill.name));
  const selectedCount = keys.filter((key) => wizard.selectedSkills.has(key)).length;
  const allSelected = selectedCount === keys.length;
  const totalQuestions = domain.skills.reduce((sum, skill) => sum + skill.questionCount, 0);

  return (
    <div className={compact ? "mb-1.5" : undefined}>
      <div className={cn("flex items-center", compact ? "gap-3 px-1 py-2.75" : "gap-3.5 px-1.5 py-3")}>
        <Checkbox
          aria-label={`Select all ${domain.name} skills`}
          isSelected={allSelected}
          isIndeterminate={selectedCount > 0 && !allSelected}
          onChange={() => wizard.selectSkills(keys, !allSelected)}
          className="group"
        >
          <Checkbox.Content>
            <RoundCheck className="size-6" />
          </Checkbox.Content>
        </Checkbox>
        <Button
          aria-expanded={isOpen}
          onPress={() => wizard.toggleDomain(domain.name)}
          className="min-w-0 flex-1 justify-between rounded-none p-0 text-left font-normal whitespace-normal"
        >
          <span className="min-w-0">
            <span className={cn("block font-bold text-ink", compact ? "text-[15px] leading-[1.3]" : "text-[16.5px]")}>
              {domain.name}
            </span>
            <span className={cn("block font-semibold text-muted-2", compact ? "mt-0.5 text-[11.5px]" : "text-[13px]")}>
              {domain.skills.length} skills · {totalQuestions} questions
            </span>
          </span>
          <span className={cn("text-muted-2", compact ? "text-[14px]" : "text-[15px]")}>{isOpen ? "⌃" : "⌄"}</span>
        </Button>
      </div>

      {isOpen &&
        domain.skills.map((skill) => {
          const key = skillKey(domain, skill.name);
          const isSelected = wizard.selectedSkills.has(key);
          return (
            <Checkbox
              key={key}
              isSelected={isSelected}
              onChange={(selected) => wizard.selectSkills([key], selected)}
              className={cn("group", compact ? "ml-3.5" : "ml-4")}
            >
              <Checkbox.Content
                className={cn(
                  "flex w-full items-center rounded-[11px] hover:bg-hover",
                  compact ? "gap-3 px-3 py-2.5" : "gap-3.5 px-3.5 py-2.75",
                  isSelected && "bg-surface-2",
                )}
              >
                <RoundCheck className={compact ? "size-5.25" : "size-5.5"} />
                <span
                  className={cn("min-w-0 flex-1 font-semibold text-ink", compact ? "text-[13.5px] leading-[1.3]" : "text-[15px]")}
                >
                  {skill.name}
                </span>
                <span className={cn("font-semibold text-muted-2", compact ? "text-[11.5px]" : "text-[13px]")}>
                  {compact ? skill.questionCount : `${skill.questionCount} questions`}
                </span>
              </Checkbox.Content>
            </Checkbox>
          );
        })}
    </div>
  );
}

/** Round checkbox (dark fill when selected) used in the wizard. */
function RoundCheck({ className }: { className: string }) {
  return (
    <Checkbox.Control
      className={cn(
        "rounded-full border-2 border-border-3 bg-surface shadow-none before:rounded-full before:bg-btn",
        "group-data-[selected=true]:border-btn group-data-[indeterminate=true]:border-btn group-data-[indeterminate=true]:bg-btn",
        className,
      )}
    >
      <Checkbox.Indicator className="size-3 text-white [&_svg]:stroke-3" />
    </Checkbox.Control>
  );
}
