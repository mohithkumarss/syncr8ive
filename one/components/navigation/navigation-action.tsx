"use client";

import { Plus } from "lucide-react";
import { ActionTooltip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

export const NavigationAction = () => {
  const { onOpen } = useModal();

  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add your workspace">
        <button
          onClick={() => onOpen("createServer")}
          className="group flex items-center"
        >
          <div className="flex m-3 h-[48px] w-[48px] rounded-[8px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-[#444560] group-hover:bg-[#3B3C51]">
            <Plus
              className="group-hover:text-white trasition text-blue"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};
