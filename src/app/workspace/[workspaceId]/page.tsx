"use client";

import { useGetWorkspaceById } from "@/hooks/workspaces/useGetWorkspaces";
import { useWorkspaceId } from "@/hooks/workspaces/useWorkspaceId";

const WorkspaceIdPage = () => {
  const workspaceId = useWorkspaceId();
  const { data } = useGetWorkspaceById({ id: workspaceId });

  return <div>WorkspaceIdPage</div>;
};

export default WorkspaceIdPage;
