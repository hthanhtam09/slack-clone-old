"use client";

import { useChannelId } from "@/hooks/channels/useChannelId";
import { useGetChannelById } from "@/hooks/channels/useGetChannels";
import { Loader, TriangleAlert } from "lucide-react";
import React from "react";
import { Header } from "./components/Header";
import { ChatInput } from "./components/ChatInput";
import { useGetMessages } from "@/hooks/messages/useGetMessages";
import { MessageList } from "./components/MessageList";

const ChannelIdPage = () => {
  const channelId = useChannelId();

  const { isLoading, loadMore, results, status } = useGetMessages({
    channelId,
  });

  const { data: channel, isLoading: channelLoading } = useGetChannelById({
    id: channelId,
  });

  if (channelLoading || status === "LoadingFirstPage") {
    return (
      <div className="h-full flex-1 flex items-center justify-center">
        <Loader className="size-65 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="h-full flex-1 flex flex-col gap-y-2 items-center justify-center">
        <TriangleAlert className="size-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Channel not found</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <Header title={channel.name} />
      <MessageList
        channelName={channel.name}
        channelCreationTime={channel._creationTime}
        data={results}
        loadMore={loadMore}
        isLoadingMore={status === "LoadingMore"}
        canLoadMore={status === "CanLoadMore"}
      />
      <ChatInput placeholder={`Message # ${channel.name}`} />
    </div>
  );
};

export default ChannelIdPage;
