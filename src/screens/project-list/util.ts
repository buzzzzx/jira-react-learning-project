import { useUrlQueryParam } from "../../utils/url";
import { useMemo } from "react";
import { useProject } from "./project";
import { useSearchParams } from "react-router-dom";

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectModalOpen] = useUrlQueryParam([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);
  const [_, setUrlParams] = useSearchParams();

  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );

  const open = () => setProjectModalOpen({ projectCreate: true });
  const close = () => {
    setUrlParams({ projectCreate: "", editingProjectId: "" });
  };
  const startEditing = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProject),
    open,
    close,
    startEditing,
    editingProject,
    isLoading,
  };
};

export const useProjectsQueryKey = () => {
  const [searchParam] = useProjectsSearchParams();
  return ["projects", searchParam];
};
