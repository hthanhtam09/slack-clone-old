"use client";

import { useGetWorkspaceById } from "@/hooks/useGetWorkspaces";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";

const WorkspaceIdPage = () => {
  const workspaceId = useWorkspaceId();
  const { data } = useGetWorkspaceById({ id: workspaceId });

  return <div></div>;
};

export default WorkspaceIdPage;
