import { Drawer } from "antd";

export const ProjectModal = (props: {
  projectModalOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer
      width={"100%"}
      visible={props.projectModalOpen}
      onClose={props.onClose}
    >
      <h1>创建项目</h1>
      <button onClick={props.onClose}>关闭</button>
    </Drawer>
  );
};
