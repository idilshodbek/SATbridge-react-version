import { cn } from "@heroui/react";
import { useState } from "react";

import { paths } from "@/app/paths";
import { ArrowUpRightIcon, BoltIcon, CalculatorIcon } from "@/components/icons";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Icon3D } from "@/components/ui/Icon3D";
import { PageTitle } from "@/components/ui/PageTitle";
import { Panel } from "@/components/ui/Panel";
import { DESMOS_CALCULATOR_URL, type DesmosTechnique, desmosTechniques } from "@/data/desmos";

/** Desmos: the techniques that save the most time on SAT math, next to the real calculator. */
export function DesmosPage() {
  const [openId, setOpenId] = useState(desmosTechniques[0].id);
  const [showCalculator, setShowCalculator] = useState(false);

  return (
    <div className="max-w-[1420px] md:px-9 md:pt-7.5 md:pb-17.5">
      <div className="mb-5.5 flex flex-wrap items-end justify-between gap-4">
        <div className="max-md:hidden">
          <PageTitle icon={<Icon3D icon="desmos" size={38} />}>Desmos</PageTitle>
          <div className="mt-1 text-[15px] font-semibold text-muted">
            The graphing calculator built into every SAT math question. Six techniques cover most of the test.
          </div>
        </div>
        <div className="flex flex-wrap gap-2.5 max-md:w-full">
          <Button
            tone={showCalculator ? "soft" : "ink"}
            onPress={() => setShowCalculator((show) => !show)}
            className="gap-2 rounded-xl px-4.5 py-2.75 text-[13.5px] max-md:flex-1"
          >
            <CalculatorIcon size={16} />
            {showCalculator ? "Hide calculator" : "Open calculator"}
          </Button>
          <ButtonLink
            href={paths.rushSession}
            tone="brand"
            className="gap-2 rounded-xl px-4.5 py-2.75 text-[13.5px] max-md:flex-1"
          >
            <BoltIcon size={16} />
            Practice with Desmos
          </ButtonLink>
        </div>
      </div>

      <div className="flex flex-wrap items-start gap-5">
        <div className="flex min-w-[min(100%,420px)] flex-[1_1_520px] flex-col gap-3">
          {desmosTechniques.map((technique, index) => (
            <TechniqueCard
              key={technique.id}
              number={index + 1}
              technique={technique}
              isOpen={technique.id === openId}
              onToggle={() => setOpenId(technique.id === openId ? "" : technique.id)}
            />
          ))}
        </div>

        {showCalculator && (
          <Panel className="sticky top-4 w-full flex-[1_1_480px] overflow-hidden rounded-[18px] max-md:order-first">
            <div className="flex items-center gap-2.5 border-b border-border px-4.5 py-3">
              <Icon3D icon="calculator" size={26} />
              <span className="flex-1 text-[14.5px] font-bold">Desmos graphing calculator</span>
              <a
                href={DESMOS_CALCULATOR_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-[13px] font-bold text-accent"
              >
                Open in new tab
                <ArrowUpRightIcon size={13} />
              </a>
            </div>
            <iframe
              title="Desmos graphing calculator"
              src={DESMOS_CALCULATOR_URL}
              loading="lazy"
              className="block h-[min(70vh,560px)] w-full border-0 bg-white"
            />
          </Panel>
        )}
      </div>
    </div>
  );
}

type TechniqueCardProps = {
  number: number;
  technique: DesmosTechnique;
  isOpen: boolean;
  onToggle: () => void;
};

function TechniqueCard({ number, technique, isOpen, onToggle }: TechniqueCardProps) {
  return (
    <Panel className={cn("overflow-hidden rounded-[18px]", isOpen && "border-tint-blue-bd")}>
      <Button
        onPress={onToggle}
        aria-expanded={isOpen}
        className="h-auto w-full justify-start gap-3.5 rounded-none p-4.5 text-left font-normal hover:bg-surface-2"
      >
        <span className="grid size-9 flex-none place-items-center rounded-xl bg-tint-green text-[15px] font-extrabold text-on-green">
          {number}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[16px] leading-[1.3] font-extrabold text-ink">{technique.title}</span>
          <span className="block text-[13px] font-semibold text-muted-2">{technique.useWhen}</span>
        </span>
        <span className="flex-none rounded-full bg-tint-amber px-2.5 py-1 text-[11.5px] font-extrabold text-on-amber">
          saves {technique.saves}
        </span>
      </Button>

      {isOpen && (
        <div className="animate-fade border-t border-border px-4.5 pt-4 pb-5">
          <ol className="mb-4 flex flex-col gap-2.5">
            {technique.steps.map((step, index) => (
              <li key={step} className="flex gap-3 text-[14.5px] leading-[1.5] font-medium text-ink-2">
                <span className="grid size-6 flex-none place-items-center rounded-full bg-accent text-[12px] font-extrabold text-white">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <div className="rounded-xl border border-border bg-surface-2 px-4 py-3">
            <div className="mb-1 text-[11px] font-extrabold tracking-[1px] text-muted-2">EXAMPLE</div>
            <div className="font-serif text-[15.5px] text-ink">{technique.example}</div>
          </div>
        </div>
      )}
    </Panel>
  );
}
