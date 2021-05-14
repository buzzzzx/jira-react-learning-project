import { useHttp } from "../../utils/http";
import { useCallback, useEffect } from "react";
import { cleanObject } from "../../utils";
import { useAsync } from "../../utils/use-async";
import { Project } from "./list";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  const fetchProjects = useCallback(
    () => client("projects", { data: cleanObject(param || {}) }),
    [client, param]
  );

  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects });
  }, [param, run, fetchProjects]);

  return result;
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync<Project[]>();
  const client = useHttp();

  const mutate = (param: Partial<Project>) =>
    run(
      client(`projects/${param.id}`, {
        data: param,
        method: "PATCH",
      })
    );

  return {
    mutate,
    ...asyncResult,
  };
};
