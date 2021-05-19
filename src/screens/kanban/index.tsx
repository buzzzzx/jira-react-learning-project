import { useDocumentTitle } from "../../utils";
import { useKanbansSearchParams, useProjectInUrl } from "./util";
import { useKanbans } from "../../utils/kanban";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: project } = useProjectInUrl();
  const { data: kanbans = [] } = useKanbans(useKanbansSearchParams());
  return (
    <div>
      <h1>{project?.name}Kanban</h1>
      <KanbanColumnContainer>
        {kanbans.map((kanban) => (
          <KanbanColumn key={kanban.id} kanban={kanban} />
        ))}
      </KanbanColumnContainer>
    </div>
  );
};

const KanbanColumnContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`;
