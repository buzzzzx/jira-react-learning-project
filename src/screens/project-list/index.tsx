import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "../../utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "./project";
import { useUsers } from "../../utils/user";
import { useProjectModal, useProjectsSearchParams } from "./util";
import { ButtonNoPadding, Row } from "../../components/lib";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  const { open } = useProjectModal();

  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list, retry } = useProjects(
    useDebounce(param, 200)
  );

  const { data: users } = useUsers();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding type={"link"} onClick={() => open()}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
