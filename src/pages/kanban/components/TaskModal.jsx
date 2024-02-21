import { Modal, Form, Button, Input, Select, Popconfirm } from "antd";
import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useKanban_dataState } from "state/drop/hooks";
import {
  add_task,
  delete_task,
  update_task,
  drop_update_async,
} from "state/drop/reducer";
import { useGetEpicList, useGetTaskModalStatus } from "state/kanban/hooks";
import { set_task_modal } from "state/kanban/reducer";
import { useSelectUsers, useSelectTaskTypes } from "state/project/hooks";
import "./style/index.css";
export default function TaskModal() {
  const users = useSelectUsers();
  const taskType = useSelectTaskTypes();
  const epicInit = useGetEpicList();
  const epic = epicInit?.map(item => {
    return {
      type: item,
      name: item,
    };
  });
  const dispatch = useDispatch();
  const kanban_data = useKanban_dataState();
  const { show, kanban_key, task_id, type, comfirm_loading } =
    useGetTaskModalStatus();
  const [form] = Form.useForm();
  const handleOk = async () => {
    try {
      const form_data = await form.validateFields();
      if (type == "create") {
        form_data.task_id = Math.random().toString(36).substring(2);
        dispatch(
          add_task({
            kanban_key,
            task: form_data,
          }),
        );
      }

      if (type == "edit") {
        dispatch(
          update_task({
            kanban_key,
            task_id,
            task: form_data,
          }),
        );
      }
      dispatch(drop_update_async());
      handleCancel();
    } catch (error) {
      // console.log("error", error);
    }
  };

  const handleCancel = () => {
    dispatch(
      set_task_modal({
        show: false,
        kanban_key: "",
        task_id: "",
      }),
    );
  };

  const deleteTask = () => {
    dispatch(
      delete_task({
        kanban_key,
        task_id,
      }),
    );
    dispatch(drop_update_async());
    handleCancel();
  };

  const renderFooter = () => {
    const footerEl = [
      <Popconfirm
        title="确定删除该任务吗？"
        onConfirm={deleteTask}
        okText="确定"
        cancelText="取消"
        key="delete"
      >
        <Button danger>删除</Button>
      </Popconfirm>,
      <Button key="back" onClick={handleCancel}>
        取消
      </Button>,
      <Button
        key="submit"
        type="dashed"
        loading={comfirm_loading}
        onClick={handleOk}
      >
        确定
      </Button>,
    ];
    if (type === "create") {
      footerEl.splice(0, 1);
    }
    return footerEl;
  };

  useEffect(() => {
    if (show && type == "edit") {
      kanban_data
        .find(item => item.kanban_key == kanban_key)
        .task.forEach(item => {
          if (item.task_id == task_id) {
            form.setFieldsValue(item);
          }
        });
    }
  }, [show]);

  return (
    <Modal
      destroyOnClose={true}
      title={type == "create" ? "创建任务" : "编辑任务"}
      open={show}
      onCancel={handleCancel}
      footer={renderFooter}
    >
      <Form form={form} layout="horizontal" name="basic" preserve={false}>
        <Form.Item
          label="任务名称"
          name="name"
          rules={[{ required: true, message: "请输入任务名称" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="任务类型"
          name="type"
          rules={[{ required: true, message: "请输入任务类型" }]}
        >
          <Select
            options={taskType}
            fieldNames={{ label: "name", value: "type" }}
          />
        </Form.Item>
        <Form.Item
          label="负责人"
          name="owner"
          rules={[{ required: true, message: "请输入负责人" }]}
        >
          <Select
            options={users}
            fieldNames={{ label: "username", value: "username" }}
          />
        </Form.Item>
        <Form.Item label="任务组" name="epic">
          <Select
            options={epic}
            fieldNames={{ label: "type", value: "name" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
