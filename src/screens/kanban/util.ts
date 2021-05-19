import { useLocation } from "react-router";
import { useProject } from "../../utils/project";

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

export const useTasksSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useTasksQueryKey = () => ["tasks", useKanbansSearchParams()];
