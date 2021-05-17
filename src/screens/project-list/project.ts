import { useHttp } from "../../utils/http";
import { cleanObject } from "../../utils";
import { Project } from "./list";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  // 当 param 变化的时候 useQuery 会重新触发
  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: cleanObject(param || {}) })
  );
};

export const useEditProject = () => {
  const queryClient = useQueryClient();
  const client = useHttp();

  return useMutation(
    (param: Partial<Project>) =>
      client(`projects/${param.id}`, {
        data: param,
        method: "PATCH",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useAddProject = () => {
  const queryClient = useQueryClient();
  const client = useHttp();

  return useMutation(
    (param: Partial<Project>) =>
      client("projects", {
        data: param,
        method: "POST",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useProject = (projectId?: number) => {
  const client = useHttp();

  return useQuery<Project>(
    ["project", { projectId }],
    () =>
      client(`projects/${projectId}`, {
        method: "GET",
      }),
    {
      enabled: !!projectId,
    }
  );
};
