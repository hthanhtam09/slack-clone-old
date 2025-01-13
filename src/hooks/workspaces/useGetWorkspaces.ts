import { useQuery } from "convex/react";
import { Id } from "../../../convex/_generated/dataModel";
import { api } from "../../../convex/_generated/api";

interface UseGetWorkspaceByIdProps {
  id: Id<"workspaces">;
}

export const useGetWorkspaces = () => {
  const data = useQuery(api.workspaces.get);
  const isLoading = data === undefined;

  return { data, isLoading };
};

export const useGetWorkspaceById = ({ id }: UseGetWorkspaceByIdProps) => {
  const data = useQuery(api.workspaces.getById, { id });
  const isLoading = data === undefined;

  return { data, isLoading };
};

export const useGetWorkspaceInfo = ({ id }: UseGetWorkspaceByIdProps) => {
  const data = useQuery(api.workspaces.getInfoById, { id });
  const isLoading = data === undefined;

  return { data, isLoading };
};
