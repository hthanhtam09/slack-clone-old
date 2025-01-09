"use client";

import { useGetWorkspaceById } from "@/hooks/workspace/useGetWorkspaces";
import { useWorkspaceId } from "@/hooks/workspace/useWorkspaceId";

const WorkspaceIdPage = () => {
  const workspaceId = useWorkspaceId();
  const { data } = useGetWorkspaceById({ id: workspaceId });

  return <div>WorkspaceIdPage</div>;
};

export default WorkspaceIdPage;
