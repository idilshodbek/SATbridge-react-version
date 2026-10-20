import { useState } from "react";

import { featureFlags } from "@/app/config";
import { paths } from "@/app/paths";
import { ArrowUpRightIcon, BotIcon, ChevronRightIcon, PlayIcon } from "@/components/icons";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Icon3D } from "@/components/ui/Icon3D";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatStrip } from "@/components/ui/StatStrip";
import { homeStats } from "@/data/home";
import { currentUser } from "@/data/user";

import { DailyQuestionCard } from "./DailyQuestionCard";
import { HomeTopBar } from "./HomeTopBar";
import { TestimonialDialog } from "./TestimonialDialog";
import { OfferBanner } from "./OfferBanner";
import { ProgressRadarCard } from "./ProgressRadarCard";
import { ScoreGoalCard } from "./ScoreGoalCard";
import { TodayPlan } from "./TodayPlan";

function greetingFor(hour: number) {
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 17) return "Good afternoon";
  if (hour >= 17 && hour < 22) return "Good evening";
  return "Good late night";
}

export function HomePage() {
  const greeting = greetingFor(new Date().getHours());
  const [isTestimonialOpen, setIsTestimonialOpen] = useState(false);

  return (
    <div>
      {featureFlags.showProBanners && <OfferBanner />}

      <div className="max-w-[1420px] px-9 pt-6 pb-16">
        <HomeTopBar />

        <h1 className="mb-4.5 text-[38px] font-extrabold tracking-[-0.8px]">
          {greeting}, <span className="text-muted-2">{currentUser.firstName}</span>
        </h1>

        <div className="mb-5 flex flex-wrap items-center gap-5">
          <ButtonLink
            href={paths.rush}
            tone="brand"
            className="gap-2.5 px-6 py-3.5 text-[16px] shadow-[0_6px_18px_rgba(0,154,218,.28)]"
          >
            <PlayIcon size={18} />
            Start today&apos;s session
          </ButtonLink>
          <ButtonLink href={paths.planner} className="gap-2 px-1 py-3 text-[16px] text-ink hover:text-accent">
            View weekly plan
            <ArrowUpRightIcon size={16} />
          </ButtonLink>
          <ButtonLink href={paths.tutor} className="gap-2 px-1 py-3 text-[16px] text-ink hover:text-accent">
            <BotIcon size={19} />
            Ask Bridge AI
          </ButtonLink>
        </div>

        <div className="mb-7.5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-tint-blue-bd bg-tint-blue px-5.5 py-4">
          <div className="text-[16.5px] font-bold">Submit a testimonial, get 1 month of free Pro</div>
          <Button tone="brand" onPress={() => setIsTestimonialOpen(true)} className="gap-1.75 px-4.5 py-2.5 text-[13.5px]">
            Submit
            <ChevronRightIcon size={14} strokeWidth={3} />
          </Button>
        </div>
        <TestimonialDialog isOpen={isTestimonialOpen} onOpenChange={setIsTestimonialOpen} />

        <SectionHeader
          title="Analytics"
          icon={<Icon3D icon="analytics" size={30} />}
          action={{ label: "View all analytics", href: paths.analytics }}
        />
        <StatStrip items={homeStats} className="mb-8.5" />

        <SectionHeader
          title="Today's Study Plan"
          icon={<Icon3D icon="plan" size={30} />}
          action={{ label: "View the week", href: paths.planner }}
        />

        <div className="flex flex-wrap items-start gap-5">
          <TodayPlan />

          <div className="flex w-85 max-w-95 flex-[1_1_300px] flex-col gap-4">
            <DailyQuestionCard />
            <ScoreGoalCard />
            <ProgressRadarCard />
            {featureFlags.showProBanners && <ProUpsellCard />}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProUpsellCard() {
  return (
    <div className="rounded-2xl border border-tint-pink-bd bg-tint-pink p-5.5">
      <div className="mb-2 text-[23px] leading-[1.25] font-extrabold tracking-[-0.4px] text-ink">
        Reach your score goal 4× faster with Pro
      </div>
      <div className="mb-4 text-[14px] leading-[1.55] font-semibold text-[#7A5468]">
        Unlimited Bridge AI, all 8 predicted papers, every analytics chart.
      </div>
      <ButtonLink href={paths.billing} tone="pro" className="w-full p-3.25 text-[14px]">
        Upgrade to Pro
      </ButtonLink>
    </div>
  );
}
