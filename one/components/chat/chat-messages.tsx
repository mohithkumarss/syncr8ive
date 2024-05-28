"use client";

import { Member, Message, Profile } from "@prisma/client";
import { ChatWelcome } from "./chat-welcome";
import { useChatQuery } from "@/hooks/use-chat-query";
import { Loader2, ServerCrash } from "lucide-react";
import { format } from "date-fns";
import { Fragment } from "react";
import { ChatItem } from "./chat-item";

const DATE_FORMAT = "d MMM yyyy, HH:mm";

type MessageWithMemeberWithProfile = Message & {
  member: Member & { profile: Profile };
};

interface ChatMessagesProps {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}

export const ChatMessages = ({
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}: ChatMessagesProps) => {
  const queryKey = `chat:${chatId}`;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      queryKey,
      apiUrl,
      paramKey,
      paramValue,
    });

  if (status === "pending") {
    return (
      <div className="flex flex-col h-full justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading Messages...
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col h-full justify-center items-center">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something Went Wrong...
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col py-4 overflow-y-auto">
      <div className="absolute bottom-28 left-[21rem]">
        <ChatWelcome type={type} name={name} />
        <div className="flex flex-col-reverse mt-auto">
          {data?.pages?.map((group, i) => (
            <Fragment key={i}>
              {group.items.map((messages: MessageWithMemeberWithProfile) => (
                <ChatItem
                  key={messages.id}
                  id={messages.id}
                  currentMember={member}
                  content={messages.content}
                  member={messages.member}
                  timestamp={format(new Date(messages.createdAt), DATE_FORMAT)}
                  fileUrl={messages.fileUrl}
                  deleted={messages.deleted}
                  isUpdated={messages.updatedAt !== messages.createdAt}
                  socketUrl={socketUrl}
                  socketQuery={socketQuery}
                />
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
