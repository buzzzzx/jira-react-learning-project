import { Button, Drawer, Form, Input, Spin } from "antd";
import {
  useProjectModal,
  useProjectsQueryKey,
} from "../screens/project-list/util";
import { UserSelect } from "./user-select";
import { useAddProject, useEditProject } from "../utils/project";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import styled from "@emotion/styled";
import { ErrorBox } from "./lib";

export const ProjectModal = () => {
  const {
    projectModalOpen,
    close,
    editingProject,
    isLoading,
  } = useProjectModal();

  const [form] = useForm();

  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject(
    useProjectsQueryKey()
  );

  const onFinish = (values: any) => {
    mutateAsync({
      ...editingProject,
      ...values,
    }).then(() => {
      form.resetFields();
      close();
    });
  };

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [form, editingProject]);

  const title = editingProject ? "编辑项目" : "创建项目";

  return (
    <Drawer
      forceRender={true}
      onClose={() => {
        form.resetFields();
        close();
      }}
      width={"100%"}
      visible={projectModalOpen}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{title}</h1>

            <ErrorBox error={error} />

            <Form
              form={form}
              onFinish={onFinish}
              layout={"vertical"}
              style={{ width: "40rem" }}
            >
              <Form.Item
                label={"项目名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入项目名称" }]}
              >
                <Input placeholder={"请输入项目名称"} />
              </Form.Item>

              <Form.Item
                label={"部门名称"}
                name={"organization"}
                rules={[{ required: true, message: "请输入部门名称" }]}
              >
                <Input placeholder={"请输入部门名称"} />
              </Form.Item>

              <Form.Item label={"负责人"} name={"personId"}>
                <UserSelect value={0} defaultOptionName={"负责人"} />
              </Form.Item>

              <Form.Item style={{ textAlign: "center" }}>
                <Button
                  type={"primary"}
                  htmlType={"submit"}
                  loading={mutateLoading}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
