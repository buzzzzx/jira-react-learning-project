import { useHttp } from "../../utils/http";
import { useEffect } from "react";
import { cleanObject } from "../../utils";
import { useAsync } from "../../utils/use-async";
import { Project } from "./list";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  const fetchProjects = () =>
    client("projects", { data: cleanObject(param || {}) });

  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

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
