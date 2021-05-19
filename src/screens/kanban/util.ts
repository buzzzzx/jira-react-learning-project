import { useLocation } from "react-router";
import { useProject } from "../../utils/project";
import { useUrlQueryParam } from "../../utils/url";
import { useMemo } from "react";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const projectId = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(projectId);
};

export const useProjectInUrl = () => {
  const projectId = useProjectIdInUrl();
  return useProject(projectId);
};

export const useKanbansSearchParams = () => ({
  projectId: useProjectIdInUrl(),
});

export const useKanbansQueryKey = () => ["kanbans", useKanbansSearchParams()];

export const useTasksSearchParams = () => {
  const [params] = useUrlQueryParam(["name", "typeId", "processorId", "tagId"]);
  const projectId = useProjectIdInUrl();

  return useMemo(
    () => ({
      projectId,
      name: params.name,
      typeId: Number(params.typeId) || undefined,
      processorId: Number(params.processorId) || undefined,
      tagId: Number(params.tagId) || undefined,
    }),
    [params, projectId]
  );
};

export const useTasksQueryKey = () => ["tasks", useKanbansSearchParams()];
