import { Kanban } from "../../type/kanban";
import { useTasks } from "../../utils/task";
import { useTasksSearchParams } from "./util";
import { useTaskTypes } from "../../utils/task-type";
import bugIcon from "../../assets/bug.svg";
import taskIcon from "../../assets/task.svg";
import styled from "@emotion/styled";
import { Card } from "antd";

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);

  return (
    <Container>
      <h3>{kanban.name}</h3>
      <TasksContainer>
        {tasks?.map((task) => (
          <Card style={{ marginBottom: "0.5rem" }} key={task.id}>
            <div>{task.name}</div>
            <TaskTypeIcon id={task.typeId} />
          </Card>
        ))}
      </TasksContainer>
    </Container>
  );
};

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (name == null) {
    return null;
  }
  return <img src={name === "bug" ? bugIcon : taskIcon} alt={"icon"} />;
};

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;
