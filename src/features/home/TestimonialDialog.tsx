import { cn, Label, TextArea, TextField, toast } from "@heroui/react";
import { useState } from "react";

import { StarIcon } from "@/components/icons";
import { AppDialog } from "@/components/ui/AppDialog";
import { Button } from "@/components/ui/Button";

const MIN_LENGTH = 40;

type TestimonialDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

/** "Submit a testimonial, get a month of Pro": a star rating and a few sentences. */
export function TestimonialDialog({ isOpen, onOpenChange }: TestimonialDialogProps) {
  const [rating, setRating] = useState(5);
  const [story, setStory] = useState("");
  const remaining = Math.max(0, MIN_LENGTH - story.trim().length);

  const submit = () => {
    toast.success("Thanks! Your free month of Pro unlocks once we've read it", {
      description: `${rating}-star review received`,
    });
    onOpenChange(false);
    setStory("");
  };

  return (
    <AppDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      icon="feedback"
      title="Share your story"
      description="A few honest sentences about how SATbridge has helped. We may quote you on the site."
      footer={
        <>
          <Button slot="close" tone="outline" className="rounded-xl px-4.5 py-2.75 text-[14px]">
            Not now
          </Button>
          <Button tone="brand" isDisabled={remaining > 0} onPress={submit} className="rounded-xl px-5 py-2.75 text-[14px]">
            Submit · get 1 month of Pro
          </Button>
        </>
      }
    >
      <div className="mb-4">
        <div className="mb-1.5 text-[13.5px] font-bold text-muted">Your rating</div>
        <div className="flex gap-1" role="group" aria-label="Rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <Button
              key={star}
              aria-pressed={rating === star}
              aria-label={`${star} star${star > 1 ? "s" : ""}`}
              onPress={() => setRating(star)}
              className={cn(
                "size-9 rounded-lg p-0 transition-colors",
                star <= rating ? "text-[#FBBF24]" : "text-border-3 hover:text-muted-3",
              )}
            >
              <StarIcon size={24} />
            </Button>
          ))}
        </div>
      </div>
      <TextField value={story} onChange={setStory} className="flex flex-col">
        <Label className="mb-1.5 text-[13.5px] font-bold text-muted">What changed for you?</Label>
        <TextArea
          rows={4}
          placeholder="Before SATbridge I… now I…"
          className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.75 text-[15px] font-medium text-ink shadow-none placeholder:text-muted-2"
        />
      </TextField>
      <div className="mt-1.5 text-[12.5px] font-semibold text-muted-2">
        {remaining > 0 ? `${remaining} more characters to go` : "Looks good"}
      </div>
    </AppDialog>
  );
}
