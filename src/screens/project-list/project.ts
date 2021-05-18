import { useHttp } from "../../utils/http";
import { cleanObject } from "../../utils";
import { Project } from "./list";
import { QueryKey, useMutation, useQuery } from "react-query";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "../../utils/use-optimistic-udpate";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  // 当 param 变化的时候 useQuery 会重新触发
  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: cleanObject(param || {}) })
  );
};

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (param: Partial<Project>) =>
      client(`projects/${param.id}`, {
        data: param,
        method: "PATCH",
      }),
    useEditConfig(queryKey)
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (param: Partial<Project>) =>
      client("projects", {
        data: param,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
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
