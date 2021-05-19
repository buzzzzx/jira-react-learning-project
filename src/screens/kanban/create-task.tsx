import { useEffect, useState } from "react";
import { useProjectIdInUrl, useTasksQueryKey } from "./util";
import { useAddTask } from "../../utils/task";
import { Card, Input } from "antd";

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState("");
  const [inputMode, setInputMode] = useState(false);
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());

  const submit = async () => {
    await addTask({ name, projectId, kanbanId });
    setInputMode(false);
    setName("");
  };

  const toggle = () => setInputMode(!inputMode);

  useEffect(() => {
    if (!inputMode) {
      setName("");
    }
  }, [inputMode]);

  if (!inputMode) {
    return <div onClick={toggle}>+创建任务</div>;
  }

  return (
    <Card>
      <Input
        value={name}
        placeholder={"请输入任务名称"}
        autoFocus={true}
        onBlur={toggle}
        onPressEnter={submit}
        onChange={(event) => setName(event.target.value)}
      />
    </Card>
  );
};
