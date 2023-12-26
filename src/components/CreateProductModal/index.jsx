import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";

function CreateProductModal() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="创建项目"
      okText="创建项目"
      open={isModalOpen}
      footer={[
        <Button key="back" onClick={handleCancel}>
          取消
        </Button>,
        <Button
          key="submit"
          className=" bg-blue-500"
          type="primary"
          loading={true}
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
          <Input />
        </Form.Item>
        <Form.Item
          label="负责人"
          name="owner"
          rules={[{ required: true, message: "请输入负责人" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateProductModal;
