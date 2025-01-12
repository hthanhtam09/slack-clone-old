import { useCurrentMember } from "@/hooks/members/useCurrentMember";
import {
  AlertTriangle,
  HashIcon,
  Loader,
  MessageSquareText,
  SendHorizonal,
} from "lucide-react";
import { WorkspaceHeader } from "./WorkspaceHeader";
import { ROLE } from "@/constants";
import { useGetWorkspaceById } from "@/hooks/workspaces/useGetWorkspaces";
import { useWorkspaceId } from "@/hooks/workspaces/useWorkspaceId";
import { SidebarItem } from "./SidebarItem";
import { useGetChannels } from "@/hooks/channels/useGetChannels";
import { WorkspaceSection } from "./WorkspaceSection";
import { useGetMembers } from "@/hooks/members/useGetMembers";
import { UserItem } from "./UserItem";

export const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();

  const { data: members, isLoading: membersLoading } = useGetMembers({
    workspaceId,
  });

  const { data: channels, isLoading: channelsLoading } = useGetChannels({
    workspaceId,
  });

  const { data: member, isLoading: memberLoading } = useCurrentMember({
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
      <div className="flex flex-col px-2 mt-3">
        <SidebarItem label="Threads" icon={MessageSquareText} id="threads" />
        <SidebarItem label="Drafts & Sent" icon={SendHorizonal} id="draft" />
      </div>

      <WorkspaceSection label="Channels" hint="New channel" onNew={() => {}}>
        {channels?.map((item) => (
          <SidebarItem
            label={item.name}
            icon={HashIcon}
            id={item._id}
            key={item._id}
          />
        ))}
      </WorkspaceSection>

      <WorkspaceSection
        label="Direct Messages"
        hint="New direct messages"
        onNew={() => {}}
      >
        {members?.map((member) => (
          <UserItem
            id={member._id}
            image={member.user.image}
            key={member._id}
            label={member.user.name}
          />
        ))}
      </WorkspaceSection>
    </div>
  );
};
