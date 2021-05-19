import { useTasksSearchParams } from "./util";
import { useSetUrlQueryParam } from "../../utils/url";
import { Row } from "../../components/lib";
import { Button, Input } from "antd";
import { UserSelect } from "../../components/user-select";
import { TaskTypesSelect } from "../../components/task-types-select";

export const SearchPanel = () => {
  const searchParams = useTasksSearchParams();
  const setSearchParams = useSetUrlQueryParam();
  const reset = () => {
    setSearchParams({
      name: undefined,
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
    });
  };

  return (
    <Row gap={true} marginBottom={4}>
      <Input
        style={{ width: "20rem" }}
        placeholder={"任务名"}
        value={searchParams.name}
        onChange={(evt) =>
          setSearchParams({
            name: evt.target.value,
          })
        }
      />
      <UserSelect
        value={searchParams.processorId}
        defaultOptionName={"经办人"}
        onChange={(value) => setSearchParams({ processorId: value })}
      />
      <TaskTypesSelect
        value={searchParams.typeId}
        defaultOptionName={"类型"}
        onChange={(value) =>
          setSearchParams({
            typeId: value,
          })
        }
      />
      <Button onClick={reset}>清除筛选器</Button>
    </Row>
  );
};
