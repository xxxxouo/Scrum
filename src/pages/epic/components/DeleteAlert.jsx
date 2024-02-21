import React from "react";
import { Button, Modal, Space, Popconfirm } from "antd";
import axios from "utils/http";
import { useDispatch } from "react-redux";
import { getSingle_Project_Async } from "state/project/reducer";
import { useParams } from "react-router-dom";
// 任务删除
export default function DeleteAlert({ item }) {
  const dispath = useDispatch();
  const { id } = useParams();

  const confirm = async () => {
    await axios.delete(`/api/epic/${id}`, {
      epic_name: item,
    });

    dispath(getSingle_Project_Async(id));
  };

  const cancel = () => {
    // console.log('cancel')
  };

  return (
    <Space>
      <Popconfirm
        title="删除epic"
        description="您确定删除该项吗？"
        onConfirm={confirm}
        onCancel={cancel}
        okText="确定"
        cancelText="取消"
      >
        <Button danger>删除</Button>
      </Popconfirm>
    </Space>
  );
}
