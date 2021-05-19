import { IdSelect } from "./id-select";
import React from "react";
import { useTaskTypes } from "../utils/task-type";

export const TaskTypesSelect = (
  props: React.ComponentProps<typeof IdSelect>
) => {
  const { data: taskTypes } = useTaskTypes();
  return <IdSelect options={taskTypes || []} {...props} />;
};
