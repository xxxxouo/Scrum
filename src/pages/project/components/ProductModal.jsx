import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { useDispatch } from "react-redux";
import {
  useSelectCreateProjectModel,
  useSelectOrg,
  useSelectProjectModelData,
  useSelectUsers,
} from "state/project/hooks";
import {
  getProjectListAsync,
  set_create_project_model_show,
} from "state/project/reducer";
import axios from "utils/http";

function ProductModal() {
  const dispath = useDispatch();
  const users = useSelectUsers();
  const model_data = useSelectProjectModelData();
  const orgs = useSelectOrg();
  const [loading, setLoading] = useState(false);
  const show = useSelectCreateProjectModel();
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      setLoading(true);
      const form_data = await form.validateFields();
      if (model_data.type == "create") {
        await axios.post("/api/projects", form_data);
      } else {
        await axios.put(`/api/projects/${model_data.data.id}`, form_data);
      }
      dispath(getProjectListAsync());
      handleCancel();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    dispath(set_create_project_model_show(false));
  };

  useEffect(() => {
    if (model_data.type == "edit" && model_data.show) {
      form.setFieldsValue(model_data.data);
    }
  }, [show]);

  return (
    <Modal
      title="创建项目"
      okText="创建项目"
      open={show}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          取消
        </Button>,
        <Button
          key="submit"
          className=" bg-blue-500"
          type="primary"
          loading={loading}
          onClick={handleOk}
        >
          确认创建
        </Button>,
      ]}
    >
      <Form name="basic" form={form}>
        <Form.Item
          label="名称"
          name="name"
          rules={[{ required: true, message: "请输入项目名称" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="部门"
          name="organization"
          rules={[{ required: true, message: "请输入部门名称" }]}
        >
          <Select
            options={orgs}
            fieldNames={{ label: "name", value: "name" }}
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
      </Form>
    </Modal>
  );
}

export default ProductModal;
