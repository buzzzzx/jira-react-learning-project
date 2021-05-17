import { Drawer } from "antd";
import { useProjectModal } from "../screens/project-list/util";

export const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModal();
  return (
    <Drawer width={"100%"} visible={projectModalOpen} onClose={close}>
      <h1>创建项目</h1>
      <button onClick={close}>关闭</button>
    </Drawer>
  );
};
