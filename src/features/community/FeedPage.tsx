import { Input, Link } from "@heroui/react";
import { type FormEvent, useState } from "react";

import { useCommunity } from "@/app/community-context";
import { useProgress } from "@/app/progress-context";
import { paths } from "@/app/paths";
import { FlameIcon, XpIcon } from "@/components/icons";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon3D } from "@/components/ui/Icon3D";
import { InitialsAvatar } from "@/components/ui/InitialsAvatar";
import { LeaderboardRow } from "@/components/ui/Leaderboard";
import { Panel } from "@/components/ui/Panel";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { cohort, communityHighlights } from "@/data/community";
import { currentUser, formatXp } from "@/data/user";

type FeedFilter = "all" | "friends";

/** Community feed: what students (and your friends) just did, plus your card, the leaderboard and live events. */
export function FeedPage() {
  const { posts, addPost, isFriend, friends } = useCommunity();
  const { xp } = useProgress();
  const [filter, setFilter] = useState<FeedFilter>("all");
  const [draft, setDraft] = useState("");

  const visiblePosts = posts
    .filter((post) => filter === "all" || post.authorId === "me" || isFriend(post.authorId))
    .slice()
    .reverse();
  const onlineFriends = friends.filter((friend) => friend.isOnline);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    addPost(text);
    setDraft("");
  };

  return (
    <div className="flex animate-fade flex-wrap items-start gap-5">
      <Panel className="min-w-[min(100%,420px)] flex-[1_1_520px] overflow-hidden rounded-[18px]">
        <form className="flex items-center gap-3 border-b border-border px-4 py-3.5 md:px-5" onSubmit={submit}>
          <InitialsAvatar
            initials={currentUser.initials}
            background="linear-gradient(140deg,#7BE3A6,#009ADA)"
            className="size-9"
            fallbackClassName="text-[12.5px] text-[#04303F]"
          />
          <Input
            aria-label="Share an update"
            placeholder="Share a win or ask for help…"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            className="h-auto min-w-0 flex-1 rounded-xl border border-border bg-surface-2 px-3.5 py-2.75 text-[14.5px] font-medium shadow-none placeholder:text-muted-2"
          />
          <Button type="submit" tone="ink" isDisabled={!draft.trim()} className="rounded-xl px-4.5 py-2.75 text-[14px]">
            Post
          </Button>
        </form>

        <div className="flex flex-wrap items-center gap-3 border-b border-border px-4 py-3 md:px-5">
          <SegmentedControl
            aria-label="Feed filter"
            options={[
              { id: "all", label: "Everyone" },
              { id: "friends", label: "Friends" },
            ]}
            value={filter}
            onChange={setFilter}
            className="gap-2"
            itemClassName="bg-surface-3 px-3.5 py-1.75 text-[12.5px] text-muted hover:bg-surface-3 data-[selected=true]:bg-success data-[selected=true]:text-[#052E14] data-[selected=true]:hover:bg-success"
          />
          <div className="ml-auto flex items-center gap-2 text-[12.5px] font-bold text-muted-2">
            <span className="size-2 rounded-full bg-success" />
            {onlineFriends.length} friends online
          </div>
        </div>

        {visiblePosts.map((post) => (
          <Link
            key={post.id}
            href={post.authorId === "me" ? paths.myProfile : paths.profile}
            className="flex w-full animate-fade items-start gap-3.5 rounded-none border-b border-border px-4 py-3.75 font-normal no-underline last:border-b-0 hover:bg-surface-2 md:px-5"
          >
            <InitialsAvatar
              initials={post.initials}
              background={post.color}
              className="size-9.5"
              fallbackClassName="text-[12.5px]"
            />
            <div className="min-w-0 flex-1">
              <div className="text-[14.5px] leading-[1.5] font-semibold text-ink md:text-[15.5px]">{post.text}</div>
              <div className="mt-1 text-[12px] font-semibold text-muted-2 md:text-[13px]">
                {post.name} · {post.when}
              </div>
            </div>
          </Link>
        ))}
      </Panel>

      <div className="flex w-85 max-w-full flex-[1_1_300px] flex-col gap-4 md:max-w-95">
        <Panel className="rounded-[18px] p-5.5">
          <Eyebrow className="mb-3.5">YOUR CARD</Eyebrow>
          <div className="mb-4 flex items-center gap-3.5">
            <InitialsAvatar
              initials={currentUser.initials}
              background="linear-gradient(140deg,#7BE3A6,#009ADA)"
              className="size-13"
              fallbackClassName="text-[16px] text-[#04303F]"
            />
            <div className="min-w-0 flex-1">
              <div className="text-[18px] font-extrabold tracking-[-0.4px]">{currentUser.shortName}</div>
              <div className="flex items-center gap-3 text-[13px] font-bold text-muted-2">
                <span className="flex items-center gap-1">
                  <FlameIcon size={15} />
                  {currentUser.studyStreak} days
                </span>
                <span className="flex items-center gap-1">
                  <XpIcon size={15} />
                  {formatXp(xp)}
                </span>
              </div>
            </div>
          </div>
          <ButtonLink href={paths.myProfile} tone="outline" className="w-full rounded-xl p-3 text-[13.5px]">
            View public profile
          </ButtonLink>
        </Panel>

        <Panel className="rounded-[18px] p-5.5">
          <div className="mb-3.5 flex items-center gap-2">
            <Icon3D icon="trophy" size={26} />
            <Eyebrow>TOP THIS WEEK · XP</Eyebrow>
          </div>
          <div className="flex flex-col gap-2.75">
            {cohort.map((member) => (
              <Link
                key={member.rank}
                href={member.isYou ? paths.myProfile : paths.profile}
                className="block w-full font-normal text-ink no-underline"
              >
                <LeaderboardRow member={member} />
              </Link>
            ))}
          </div>
        </Panel>

        <Panel className="rounded-[18px] p-5.5">
          <Eyebrow className="mb-3">HAPPENING NOW</Eyebrow>
          <div className="flex flex-col gap-1">
            {communityHighlights.map((item) => (
              <Link
                key={item.title}
                href={item.to}
                className="flex w-full items-center gap-3 rounded-xl px-2 py-2.5 font-normal text-ink no-underline hover:bg-surface-2"
              >
                <Icon3D icon={item.icon} size={32} />
                <span className="min-w-0 flex-1">
                  <span className="block text-[14.5px] font-bold">{item.title}</span>
                  <span className="block text-[12.5px] font-semibold text-muted-2">{item.meta}</span>
                </span>
              </Link>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
