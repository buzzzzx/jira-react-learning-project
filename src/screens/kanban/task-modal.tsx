import { useTaskModal, useTasksQueryKey } from "./util";
import { useForm } from "antd/es/form/Form";
import { Button, Form, Input, Modal, Spin } from "antd";
import { UserSelect } from "../../components/user-select";
import { TaskTypesSelect } from "../../components/task-types-select";
import { useDeleteTask, useEditTask } from "../../utils/task";
import { useEffect } from "react";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const TaskModal = () => {
  const {
    taskModalOpen,
    editingTaskId,
    editingTask,
    isLoading,
    close,
  } = useTaskModal();
  const { mutateAsync: editTask, isLoading: editingLoading } = useEditTask(
    useTasksQueryKey()
  );
  const [form] = useForm();
  const { mutateAsync: deleteTask } = useDeleteTask(useTasksQueryKey());
  const starDelete = () => {
    Modal.confirm({
      title: `确定删除"${editingTask?.name}"吗`,
      okText: "确定",
      cancelText: "取消",
      onOk() {
        deleteTask({ id: +editingTaskId });
        close();
      },
    });
  };

  const onCancel = () => {
    close();
    form.resetFields();
  };

  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);

  return (
    <Modal
      forceRender={true}
      visible={taskModalOpen}
      confirmLoading={editingLoading}
      onCancel={onCancel}
      onOk={onOk}
      cancelText={"取消"}
      okText={"确认"}
      title={"编辑任务"}
    >
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <Form form={form} initialValues={editingTask} {...layout}>
          <Form.Item
            label={"任务名称"}
            name={"name"}
            rules={[{ required: true, message: "请输入任务名称" }]}
          >
            <Input placeholder={"任务名称"} value={editingTask?.name} />
          </Form.Item>
          <Form.Item label={"经办人"} name={"processorId"}>
            <UserSelect
              value={editingTask?.processorId}
              defaultOptionName={"经办人"}
            />
          </Form.Item>
          <Form.Item label={"类型"} name={"typeId"}>
            <TaskTypesSelect
              value={editingTask?.typeId}
              defaultOptionName={"类型"}
            />
          </Form.Item>
          <div style={{ textAlign: "right" }}>
            <Button
              onClick={starDelete}
              style={{ fontSize: "14px" }}
              size={"small"}
            >
              删除
            </Button>
          </div>
        </Form>
      )}
    </Modal>
  );
};
