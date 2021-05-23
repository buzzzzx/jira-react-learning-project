import { useDocumentTitle } from "../../utils";
import {
  useKanbansSearchParams,
  useProjectInUrl,
  useTasksSearchParams,
} from "./util";
import { useKanbans } from "../../utils/kanban";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "../../components/lib";
import { useTasks } from "../../utils/task";
import { Spin } from "antd";
import { CreateKanban } from "./create-kanban";
import { TaskModal } from "./task-modal";
import { DragDropContext } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "../../components/drag-and-drop";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: project } = useProjectInUrl();
  const { data: kanbans = [], isLoading: kanbanIsLoading } = useKanbans(
    useKanbansSearchParams()
  );
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
  const isLoading = kanbanIsLoading || taskIsLoading;
  return (
    <DragDropContext onDragEnd={() => {}}>
      <ScreenContainer>
        <h1>{project?.name}看板</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <KanbanColumnContainer>
            <Drop
              type={"COLUMN"}
              droppableId={"kanban"}
              direction={"horizontal"}
            >
              <DropChild style={{ display: "flex" }}>
                {kanbans.map((kanban, index) => (
                  <Drag
                    key={kanban.id}
                    draggableId={"kanban" + kanban.id}
                    index={index}
                  >
                    <KanbanColumn kanban={kanban} />
                  </Drag>
                ))}
              </DropChild>
            </Drop>
            <CreateKanban />
          </KanbanColumnContainer>
        )}
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  );
};

const KanbanColumnContainer = styled.div`
  display: flex;
  flex: 1;
  overflow-x: scroll;
`;
