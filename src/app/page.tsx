"use client";

import { UserButton } from "./auth/components/UserButton";
import { useEffect } from "react";
import { useCreateWorkspaceModal } from "@/hooks/workspace/useCreateWorkspaceModal";
import { useRouter } from "next/navigation";
import { useGetWorkspaces } from "@/hooks/workspace/useGetWorkspaces";

export default function Home() {
  const { data, isLoading } = useGetWorkspaces();
  const [open, setOpen] = useCreateWorkspaceModal();
  const router = useRouter();

  const workSpaceId = data?.[0]?._id;

  useEffect(() => {
    if (isLoading) return;

    if (workSpaceId) {
      router.replace(`/workspace/${workSpaceId}`);
    } else if (!open) {
      setOpen(true);
    }
  }, [workSpaceId, isLoading, open, setOpen, router]);

  return (
    <div>
      <UserButton />
    </div>
  );
}
