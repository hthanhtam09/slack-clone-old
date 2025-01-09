import { UseCurrentMember } from "@/hooks/useCurrentMember";
import { AlertTriangle, Loader } from "lucide-react";
import { WorkspaceHeader } from "./WorkspaceHeader";
import { ROLE } from "@/constants";
import { useGetWorkspaceById } from "@/hooks/workspace/useGetWorkspaces";
import { useWorkspaceId } from "@/hooks/workspace/useWorkspaceId";

export const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();

  const { data: member, isLoading: memberLoading } = UseCurrentMember({
    workspaceId,
  });

  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspaceById({
    id: workspaceId,
  });

  if (memberLoading || workspaceLoading) {
    return (
      <div className="flex flex-col bg-[#5E2c5F] h-full items-center justify-center">
        <Loader className="size-5 animate-spin text-white" />
      </div>
    );
  }

  if (!member || !workspace) {
    return (
      <div className="flex flex-col bg-[#5E2c5F] h-full items-center justify-center">
        <AlertTriangle className="size-5 text-white" />
        <p className="text-white text-sm">Workspace not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#5E2c5F] h-full">
      <WorkspaceHeader
        workspace={workspace}
        isAdmin={member.role === ROLE.ADMIN}
      />
    </div>
  );
};
