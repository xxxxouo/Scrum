import { Space, Table, Button, Popconfirm } from "antd";
import React from "react";
import { useProject_List } from "state/project/hooks";
import { Link } from "react-router-dom";
import { Star } from "react-feather";
import dayjs from "dayjs";
import eventBus from "utils/event";
import axios from "utils/http";
import { useDispatch } from "react-redux";
import {
  getProjectListAsync,
  set_create_project_model_show,
} from "state/project/reducer";

function ProjectTable() {
  const data = useProject_List();
  const dispath = useDispatch();

  const columns = [
    // {
    //   title: "收藏",
    //   dataIndex: "collect",
    //   key: "collect",
    //   align: "center",
    //   render: (text, record) => {
    //     return (
    //       <div
    //         onClick={() => {
    //           // hand_collect_click(record)
    //         }}
    //         className="flex justify-center"
    //       >
    //         <Star color={text ? "#dfd50c" : "#999999"} />
    //       </div>
    //     );
    //   },
    //   width: 100,
    // },
    {
      title: "序号",
      key: "index",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "项目名称",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (text, record) => (
        <Link to={`/project/${record._id}/kanban`} style={{ color: "#0052cc" }}>
          {text}
        </Link>
      ),
      sorter: (a, b) => a.title - b.title,
      width: 300,
    },
    {
      title: "部门",
      key: "organization",
      align: "center",
      dataIndex: "organization",
      width: 150,
    },
    {
      title: "负责人",
      dataIndex: "owner",
      key: "owner",
      align: "center",
      render: text => <div>{text}</div>,
      width: 150,
    },
    {
      title: "创建时间",
      dataIndex: "created",
      key: "created",
      align: "center",
      render: (text, record) => (
        <Space>{dayjs(record.created).format("YYYY-MM-DD HH:mm:ss")}</Space>
      ),
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      fixed: "right",
      with: 100,
      render: (text, record) => (
        <Space size="middle">
          <Button size="small" onClick={() => editModel(record)}>
            编辑
          </Button>
          <Popconfirm
            title="警告"
            description="是否要删除该项目?"
            onConfirm={() => confirm(record._id)}
            okText="确定"
            cancelText="取消"
            okButtonProps={{ danger: true }}
          >
            <Button danger size="small">
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const confirm = async id => {
    try {
      await axios.delete("/api/projects/" + id);
      eventBus.emit("global_message", "success", "删除成功");
      dispath(getProjectListAsync());
    } catch (err) {
      eventBus.emit("global_message", "error", "删除失败");
    }
  };
  const editModel = item => {
    dispath(
      set_create_project_model_show({
        show: true,
        type: "edit",
        data: item,
      }),
    );
  };
  return (
    <Table
      dataSource={data}
      columns={columns}
      rowKey={record => record.created}
    />
  );
}

export default ProjectTable;
