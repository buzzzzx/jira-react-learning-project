import { useMount } from "./index";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { User } from "../type/user";

export const useUsers = () => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();

  useMount(() => {
    run(client("users"));
  });

  return result;
};
