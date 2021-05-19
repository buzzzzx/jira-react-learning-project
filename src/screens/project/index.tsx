import { Link, Navigate, Routes } from "react-router-dom";
import { EpicScreen } from "../epic";
import { KanbanScreen } from "../kanban";
import { Route } from "react-router";

export const ProjectScreen = () => {
  return (
    <div>
      <h1>Page Screen</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        <Route path={"/kanban"} element={<KanbanScreen />} />
        <Route path={"/epic"} element={<EpicScreen />} />
        <Navigate to={window.location.pathname + "/kanban"} replace={true} />
      </Routes>
    </div>
  );
};
