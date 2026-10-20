import { cn, Modal, toast } from "@heroui/react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon3D } from "@/components/ui/Icon3D";
import { PageTitle } from "@/components/ui/PageTitle";
import { Panel } from "@/components/ui/Panel";
import { ProgressTrack } from "@/components/ui/ProgressTrack";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { billingFaq, type BillingPeriod, billingPeriods, CURRENT_PLAN_ID, type Plan, planUsage, plans } from "@/data/account";
import { useIsMobile } from "@/hooks/useIsMobile";

import { AccountSection } from "./AccountSection";

/** "3 months · Save 20%" on wide screens, "3 mo -20%" on phones. */
function periodLabel(period: (typeof billingPeriods)[number], isCompact: boolean) {
  if (!period.note) return isCompact ? period.shortLabel : period.label;
  return isCompact ? `${period.shortLabel} ${period.note.replace("Save ", "-")}` : `${period.label} · ${period.note}`;
}

/** Plan & billing: current plan and usage, plan picker, payment method and invoices. */
export function BillingPage() {
  const [period, setPeriod] = useState<BillingPeriod>("quarterly");
  const [checkoutPlan, setCheckoutPlan] = useState<Plan | null>(null);
  const currentPlan = plans.find((plan) => plan.id === CURRENT_PLAN_ID) ?? plans[0];
  const isMobile = useIsMobile();

  return (
    <div className="max-w-[1180px] md:px-9 md:pt-7.5 md:pb-17.5">
      <PageTitle icon={<Icon3D icon="billing" size={38} />} className="mb-5.5 max-md:hidden">
        Plan & billing
      </PageTitle>

      <Panel className="mb-6 flex flex-wrap items-center gap-5 rounded-[20px] p-5 md:p-6">
        <Icon3D icon={currentPlan.icon} size={56} />
        <div className="min-w-[min(100%,220px)] flex-1">
          <div className="text-[13px] font-bold text-muted-2">CURRENT PLAN</div>
          <div className="text-[24px] font-extrabold tracking-[-0.6px]">{currentPlan.name}</div>
          <div className="text-[13.5px] font-semibold text-muted">{currentPlan.tagline}</div>
        </div>
        <div className="flex min-w-[min(100%,300px)] flex-1 flex-col gap-3">
          {planUsage.map((usage) => {
            const percent = Math.round((usage.used / usage.limit) * 100);
            return (
              <div key={usage.label}>
                <div className="mb-1 flex justify-between gap-2 text-[12.5px] font-bold">
                  <span>{usage.label}</span>
                  <span className={percent >= 100 ? "text-danger-ink" : "text-muted-2"}>
                    {usage.used}/{usage.limit} · {usage.resets}
                  </span>
                </div>
                <ProgressTrack
                  aria-label={usage.label}
                  value={percent}
                  color={percent >= 100 ? "#EF4444" : "#009ADA"}
                  className="h-1.75 rounded-[5px] bg-surface-3"
                />
              </div>
            );
          })}
        </div>
      </Panel>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[21px] font-extrabold tracking-[-0.5px]">Choose a plan</h2>
        <SegmentedControl
          aria-label="Billing period"
          options={billingPeriods.map((p) => ({
            id: p.id,
            label: periodLabel(p, isMobile),
          }))}
          value={period}
          onChange={setPeriod}
          className="gap-1 rounded-[13px] border border-border bg-surface p-1 max-md:w-full"
          itemClassName="rounded-[9px] px-3.5 py-2 text-[12.5px] max-md:flex-1 max-md:px-1"
        />
      </div>

      <div className="mb-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,290px),1fr))] gap-4">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            period={period}
            isCurrent={plan.id === currentPlan.id}
            onChoose={() => setCheckoutPlan(plan)}
          />
        ))}
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-5">
        <AccountSection icon="billing" title="Payment method" description="Used for renewals">
          <div className="mb-4 rounded-xl border border-dashed border-border-2 px-4 py-5 text-center text-[13.5px] font-semibold text-muted-2">
            No card on file. You'll add one at checkout.
          </div>
          <div className="text-[12.5px] font-medium text-muted-2">
            Parents can pay for you: turn on "Billing & payments" in Parent access.
          </div>
        </AccountSection>

        <AccountSection icon="invoices" title="Invoices">
          <EmptyState
            icon="invoices"
            title="No invoices yet"
            text="Receipts for every payment will appear here."
            className="py-8"
          />
        </AccountSection>
      </div>

      <h2 className="mt-8 mb-3 text-[19px] font-extrabold tracking-[-0.4px]">Questions</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
        {billingFaq.map((item) => (
          <Panel key={item.question} className="rounded-2xl p-5">
            <div className="mb-1.5 text-[15px] font-bold">{item.question}</div>
            <div className="text-[13.5px] leading-[1.55] font-medium text-muted">{item.answer}</div>
          </Panel>
        ))}
      </div>

      <CheckoutModal plan={checkoutPlan} period={period} onClose={() => setCheckoutPlan(null)} />
    </div>
  );
}

type PlanCardProps = {
  plan: Plan;
  period: BillingPeriod;
  isCurrent: boolean;
  onChoose: () => void;
};

function PlanCard({ plan, period, isCurrent, onChoose }: PlanCardProps) {
  const price = plan.monthlyPrice[period];

  return (
    <Panel
      className={cn(
        "relative flex flex-col rounded-[20px] p-5.5",
        plan.isPopular && "border-2 border-accent shadow-[0_14px_34px_rgba(0,154,218,.16)]",
      )}
    >
      {plan.isPopular && (
        <span className="absolute -top-3 left-5.5 rounded-full bg-accent px-3 py-1 text-[11px] font-extrabold tracking-[.4px] text-white">
          MOST POPULAR
        </span>
      )}
      <div className="mb-3 flex items-center gap-3">
        <Icon3D icon={plan.icon} size={42} />
        <div>
          <div className="text-[19px] font-extrabold tracking-[-0.4px]">{plan.name}</div>
          <div className="text-[12.5px] font-semibold text-muted-2">{plan.tagline}</div>
        </div>
      </div>
      <div className="mb-0.5 flex items-baseline gap-1">
        <span className="text-[38px] font-extrabold tracking-[-1.4px]">${price}</span>
        {price > 0 && <span className="text-[14px] font-bold text-muted-2">/month</span>}
      </div>
      <div className="mb-4 text-[12.5px] font-semibold text-muted-2">{plan.billedAs[period]}</div>

      <ul className="mb-5 flex flex-1 flex-col gap-2.25">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-2.5 text-[14px] leading-[1.45] font-medium text-ink-2">
            <span className="mt-0.5 grid size-4.5 flex-none place-items-center rounded-full bg-tint-green text-[10px] font-extrabold text-on-green">
              ✓
            </span>
            {feature}
          </li>
        ))}
      </ul>

      {isCurrent ? (
        <Button tone="soft" isDisabled className="w-full rounded-xl py-3 text-[14px] data-[disabled=true]:opacity-100">
          Current plan
        </Button>
      ) : (
        <Button tone={plan.isPopular ? "brand" : "ink"} onPress={onChoose} className="w-full rounded-xl py-3 text-[14px]">
          Upgrade to {plan.name}
        </Button>
      )}
    </Panel>
  );
}

type CheckoutModalProps = {
  plan: Plan | null;
  period: BillingPeriod;
  onClose: () => void;
};

/** Order summary before checkout. Payments aren't connected in this demo. */
function CheckoutModal({ plan, period, onClose }: CheckoutModalProps) {
  const continueToCheckout = () => {
    toast.info("Checkout isn't connected in this demo yet");
    onClose();
  };

  return (
    <Modal.Backdrop isOpen={plan !== null} onOpenChange={(open) => !open && onClose()}>
      <Modal.Container placement="center" className="p-4">
        <Modal.Dialog aria-label="Checkout" className="w-105 max-w-full rounded-[20px] bg-surface p-6">
          {plan && (
            <>
              <div className="mb-4 flex items-center gap-3">
                <Icon3D icon={plan.icon} size={44} />
                <div>
                  <Modal.Heading className="text-[20px] font-extrabold tracking-[-0.5px] text-ink">
                    Upgrade to {plan.name}
                  </Modal.Heading>
                  <div className="text-[13px] font-semibold text-muted-2">{plan.billedAs[period]}</div>
                </div>
              </div>
              <div className="mb-5 flex flex-col gap-2 rounded-xl bg-surface-2 p-4 text-[14px] font-semibold">
                <div className="flex justify-between">
                  <span className="text-muted">Price</span>
                  <span>${plan.monthlyPrice[period]}/month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Cancel</span>
                  <span>Anytime</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Refund</span>
                  <span>Within 7 days</span>
                </div>
              </div>
              <div className="flex gap-2.5">
                <Button slot="close" tone="outline" className="flex-1 rounded-xl py-3 text-[14px]">
                  Not now
                </Button>
                <Button tone="brand" onPress={continueToCheckout} className="flex-1 rounded-xl py-3 text-[14px]">
                  Continue to checkout
                </Button>
              </div>
            </>
          )}
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}
