import { Form, Modal, Input, Button } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEpic_modal_show } from "state/epic/hooks";
import { set_epic_createmodal_show } from "state/epic/reducer";
import { getSingle_Project_Async } from "state/project/reducer";
import axios from "utils/http";

function CreateEpicModal() {
  const show = useEpic_modal_show();
  const dispath = useDispatch();
  const { id } = useParams();
  const [form] = Form.useForm();

  const handleCancel = () => {
    dispath(set_epic_createmodal_show(false));
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const form_data = await form.validateFields();
      if (form_data) {
        const { epic_name } = form_data;
         await axios.post(`/api/epic/${id}`, {
          epic_name,
        });
        handleCancel();
        dispath(getSingle_Project_Async(id));
      }
    } catch (error) {}
  };

  return (
    <Modal
      destroyOnClose={true}
      title="创建EPIC"
      open={show}
      okText={"创建EPIC"}
      footer={[
        <Button key="back" onClick={handleCancel}>
          取消
        </Button>,
        <Button key="submit" type="default" onClick={handleOk}>
          创建
        </Button>,
      ]}
    >
      <Form form={form}>
        <Form.Item
          label="Epic名称"
          name="epic_name"
          rules={[{ required: true, message: "请输入Epic名称" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateEpicModal;
