"use client";

import { Plus } from "lucide-react";
import { ActionTooltip } from "@/components/action-tooltip";

export const NavigationAction = () => {
  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add your workspace">
        <button className="group flex items-center">
          <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-[#444560] group-hover:bg-[#3B3C51]">
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
