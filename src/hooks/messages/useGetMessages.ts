import { usePaginatedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

const BATCH_SIZE = 20;

interface UserGetMessagesProps {
  channelId?: Id<"channels">;
  conversationId?: Id<"conversations">;
  parentMessageId?: Id<"messages">;
}

export type GetMessagesReturnType =
  (typeof api.messages.get._returnType)["page"];

export const useGetMessages = ({
  channelId,
  conversationId,
  parentMessageId,
}: UserGetMessagesProps) => {
  const { results, isLoading, loadMore, status } = usePaginatedQuery(
    api.messages.get,
    {
      channelId,
      conversationId,
      parentMessageId,
    },
    { initialNumItems: BATCH_SIZE }
  );

  return {
    results,
    isLoading,
    loadMore: () => loadMore(BATCH_SIZE),
    status,
  };
};
