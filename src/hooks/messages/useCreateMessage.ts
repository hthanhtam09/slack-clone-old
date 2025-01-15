import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { useState } from "react";

type RequestType = {
  body: string;
  workspaceId: Id<"workspaces">;
  image?: Id<"_storage">;
  channelId?: Id<"channels">;
  parrentMessageId?: Id<"messages">;
  conversationId?: Id<"conversations">;
};

type ResponseType = Id<"messages"> | null;

type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

type IStatus = "pending" | "success" | "error" | "settled";

export const useCreateMessage = () => {
  const mutation = useMutation(api.messages.create);
  const [data, setData] = useState<ResponseType>(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState<IStatus | null>(null);

  const isPending = status === "pending";
  const isSuccess = status === "success";
  const isError = status === "error";
  const isSettled = status === "settled";

  const mutate = async (values: RequestType, options?: Options) => {
    try {
      setData(null);
      setError(null);
      setStatus("pending");
      const response = await mutation(values);
      options?.onSuccess?.(response);
      return response;
    } catch (error) {
      setStatus("error");
      options?.onError?.(error as Error);
      if (options?.throwError) {
        throw error;
      }
    } finally {
      setStatus("settled");
      options?.onSettled?.();
    }
  };

  return {
    mutate,
    data,
    error,
    isPending,
    isSuccess,
    isError,
    isSettled,
  };
};
