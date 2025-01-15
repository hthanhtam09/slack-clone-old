import { useChannelId } from "@/hooks/channels/useChannelId";
import { useCreateMessage } from "@/hooks/messages/useCreateMessage";
import { useWorkspaceId } from "@/hooks/workspaces/useWorkspaceId";
import { EditorValue } from "@/types";
import dynamic from "next/dynamic";
import Quill from "quill";
import { useRef, useState } from "react";
import { toast } from "sonner";

const Editor = dynamic(
  () => import("@/components/Editor").then((mod) => mod.Editor),
  { ssr: false }
);

interface ChatInputProps {
  placeholder: string;
}

export const ChatInput = ({ placeholder }: ChatInputProps) => {
  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();

  const editorRef = useRef<Quill | null>(null);

  const [editorKey, setEditorKey] = useState(0);
  const [isPending, setIsPending] = useState(false);

  const { mutate: createMessage } = useCreateMessage();

  const handleSubmit = async ({ body, image }: EditorValue) => {
    try {
      setIsPending(true);
      createMessage(
        {
          body,
          workspaceId,
          channelId,
        },
        {
          throwError: true,
        }
      );

      setEditorKey((prevKey) => prevKey + 1);
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="px-5 w-full">
      <Editor
        key={editorKey}
        placeholder={placeholder}
        onSubmit={handleSubmit}
        disabled={isPending}
        innerRef={editorRef}
      />
    </div>
  );
};
