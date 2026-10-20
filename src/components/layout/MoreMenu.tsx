import { Dropdown, Header, toast } from "@heroui/react";
import { useState } from "react";

import { ScoreCalculatorDialog } from "@/components/dialogs/ScoreCalculatorDialog";
import { ShortcutsDialog } from "@/components/dialogs/ShortcutsDialog";
import { SupportDialog, type SupportKind } from "@/components/dialogs/SupportDialog";
import { NewBadge } from "@/components/ui/Badges";
import { Button } from "@/components/ui/Button";
import { Icon3D } from "@/components/ui/Icon3D";
import { WithTooltip } from "@/components/ui/WithTooltip";

import { type MoreDialog, moreMenuGroups } from "./navigation";
import { sidebarItemClass } from "./sidebarStyles";

/** "More" entry at the bottom of the sidebar: shortcuts, support and resources. */
export function MoreMenu({ isCollapsed = false }: { isCollapsed?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dialog, setDialog] = useState<MoreDialog | null>(null);

  const openItem = (key: React.Key) => {
    const item = moreMenuGroups.flatMap((group) => group.items).find((candidate) => candidate.label === key);
    if (!item?.dialog) return;
    if (item.dialog === "blog") toast.info("The blog opens in the full release");
    else setDialog(item.dialog);
  };
  const supportKind: SupportKind | null =
    dialog === "help" || dialog === "support" || dialog === "bug" || dialog === "feedback" ? dialog : null;

  const trigger = (
    <Button aria-label="More" className={sidebarItemClass({ active: isOpen, collapsed: isCollapsed })}>
      <Icon3D icon="more" size={24} />
      {!isCollapsed && (
        <>
          <span className="flex-1 text-left">More</span>
          <span className="text-[15px]">{isOpen ? "‹" : "›"}</span>
        </>
      )}
    </Button>
  );

  return (
    <>
      <Dropdown isOpen={isOpen} onOpenChange={setIsOpen}>
        {isCollapsed ? (
          <WithTooltip label="More" placement="right">
            {trigger}
          </WithTooltip>
        ) : (
          trigger
        )}

        <Dropdown.Popover
          placement="right bottom"
          offset={isCollapsed ? 16 : 32}
          containerPadding={22}
          className="w-72 max-w-none animate-slide-in rounded-2xl bg-side p-3.5 shadow-[0_24px_60px_rgba(4,32,44,.4)]"
        >
          <Dropdown.Menu aria-label="More" onAction={openItem} className="gap-0 p-0">
            {moreMenuGroups.map((group) => (
              <Dropdown.Section key={group.title} className="mb-3">
                <Header className="px-2.5 pt-1 pb-1.5 text-[10.5px] font-bold tracking-[1.1px] text-[#5C8296]">
                  {group.title}
                </Header>
                {group.items.map((item) => (
                  <Dropdown.Item
                    key={item.label}
                    id={item.label}
                    href={item.href}
                    textValue={item.label}
                    className="min-h-0 gap-2.75 rounded-[10px] px-2.5 py-2.25 text-[14px] font-semibold text-[#EAF1F5] hover:bg-side-active data-[focus-visible=true]:bg-side-active"
                  >
                    <Icon3D icon={item.icon} size={22} />
                    <span className="flex-1">{item.label}</span>
                    {item.isNew && <NewBadge className="text-[10px]" />}
                  </Dropdown.Item>
                ))}
              </Dropdown.Section>
            ))}
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
      <SupportDialog kind={supportKind} onClose={() => setDialog(null)} />
      <ScoreCalculatorDialog isOpen={dialog === "calculator"} onOpenChange={(open) => !open && setDialog(null)} />
      <ShortcutsDialog isOpen={dialog === "shortcuts"} onOpenChange={(open) => !open && setDialog(null)} />
    </>
  );
}
