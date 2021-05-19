import { useDocumentTitle } from "../../utils";
import { useKanbansSearchParams, useProjectInUrl } from "./util";
import { useKanbans } from "../../utils/kanban";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "../../components/lib";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: project } = useProjectInUrl();
  const { data: kanbans = [] } = useKanbans(useKanbansSearchParams());
  return (
    <ScreenContainer>
      <h1>{project?.name}看板</h1>
      <SearchPanel />
      <KanbanColumnContainer>
        {kanbans.map((kanban) => (
          <KanbanColumn key={kanban.id} kanban={kanban} />
        ))}
      </KanbanColumnContainer>
    </ScreenContainer>
  );
};

const KanbanColumnContainer = styled.div`
  display: flex;
  flex: 1;
  overflow-x: scroll;
`;
