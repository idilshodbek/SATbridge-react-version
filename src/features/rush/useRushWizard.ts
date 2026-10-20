import { useState } from "react";

import {
  difficultyOptions,
  paceOptions,
  questionCountOptions,
  type RushPace,
  type WizardDomain,
  type WizardSubject,
  wizardDomains,
  wizardSteps,
} from "@/data/rush";

export const TOTAL_WIZARD_STEPS = wizardSteps.length;

export const skillKey = (domain: WizardDomain, skillName: string) => `${domain.name}/${skillName}`;

export type WizardOption = {
  label: string;
  choices: readonly string[];
  value: string;
  onChange: (value: string) => void;
};

/**
 * State and actions for the five-step Question Rush set-up
 * (topics → difficulty → question count → pace → review).
 * Shared by the desktop modal and the mobile bottom sheet.
 */
export function useRushWizard(
  subject: WizardSubject,
  { onClose, onStart }: { onClose: () => void; onStart: (pace: RushPace) => void },
) {
  const domains = wizardDomains[subject];
  const [step, setStep] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState<ReadonlySet<string>>(new Set());
  const [openDomains, setOpenDomains] = useState<ReadonlySet<string>>(new Set([domains[0].name]));
  const [difficulty, setDifficulty] = useState<string>("Mixed");
  const [questionCount, setQuestionCount] = useState<string>("15");
  const [pace, setPace] = useState<RushPace>("Rush");

  const isLastStep = step === TOTAL_WIZARD_STEPS;

  const selectSkills = (keys: string[], isSelected: boolean) =>
    setSelectedSkills((selected) => {
      const next = new Set(selected);
      keys.forEach((key) => (isSelected ? next.add(key) : next.delete(key)));
      return next;
    });

  const toggleDomain = (name: string) =>
    setOpenDomains((open) => {
      const next = new Set(open);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });

  const selectAll = () =>
    selectSkills(
      domains.flatMap((domain) => domain.skills.map((skill) => skillKey(domain, skill.name))),
      true,
    );

  const goBack = () => (step === 1 ? onClose() : setStep(step - 1));
  const goNext = () => (isLastStep ? onStart(pace) : setStep(step + 1));

  /** Option groups for the current step (all three on the review step). */
  const options: WizardOption[] = [
    {
      step: 2,
      label: "Difficulty range",
      choices: difficultyOptions,
      value: difficulty,
      onChange: setDifficulty,
    },
    {
      step: 3,
      label: "Questions in this set",
      choices: questionCountOptions,
      value: questionCount,
      onChange: setQuestionCount,
    },
    {
      step: 4,
      label: "Pace",
      choices: paceOptions,
      value: pace,
      onChange: (value: string) => setPace(value as RushPace),
    },
  ].filter((option) => isLastStep || option.step === step);

  return {
    step,
    stepInfo: wizardSteps[step - 1],
    isTopicsStep: step === 1,
    isLastStep,
    domains,
    selectedSkills,
    selectSkills,
    openDomains,
    toggleDomain,
    selectAll,
    options,
    summary: `${selectedSkills.size} skills · ${questionCount} questions · ${difficulty} · ${pace}`,
    ctaLabel: isLastStep ? "Start rush" : "Continue",
    goBack,
    goNext,
  };
}

export type RushWizardState = ReturnType<typeof useRushWizard>;
