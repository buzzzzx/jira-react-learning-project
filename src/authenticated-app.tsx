import { useAuth } from "./context/auth-context";
import { ProjectListScreen } from "./screens/project-list";
import styled from "@emotion/styled";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <h3>Logo</h3>
          <h3>用户</h3>
          <h3>项目</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>登出</button>
        </HeaderRight>
      </Header>
      <Nav>Nav</Nav>
      <Main>
        <ProjectListScreen />
      </Main>
      <Aside>Aside</Aside>
      <Footer>Footer</Footer>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 6rem 1fr 6rem;
  height: 100vh;
  grid-gap: 10rem;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;
const HeaderRight = styled.div``;

// grid-area 是给 grid 子元素命名的
const Header = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Nav = styled.nav`
  grid-area: nav;
`;
const Main = styled.main`
  grid-area: main;
`;
const Aside = styled.aside`
  grid-area: aside;
`;
const Footer = styled.footer`
  grid-area: footer;
`;
