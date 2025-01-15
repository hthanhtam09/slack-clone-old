import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { useState } from "react";

type ResponseType = string | null;

type Options = {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

type IStatus = "pending" | "success" | "error" | "settled";

export const useGenerateUploadUrl = () => {
  const mutation = useMutation(api.upload.generateUploadUrl);
  const [data, setData] = useState<ResponseType>(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState<IStatus | null>(null);

  const isPending = status === "pending";
  const isSuccess = status === "success";
  const isError = status === "error";
  const isSettled = status === "settled";

  const mutate = async (_values: {}, options?: Options) => {
    try {
      setData(null);
      setError(null);
      setStatus("pending");
      const response = await mutation();
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
