import { Space, Table } from "antd";
import React from "react";
const columns = [
  {
    title: "收藏",
    dataIndex: "collect",
    key: "collect",
    align: "center",
    render: (text, record) => <div></div>,
    width: 100,
  },
  {
    title: "项目名称",
    dataIndex: "name",
    key: "name",
    align: "center",
    render: (text) => (
      <a href="#" style={{ color: "#0052cc" }}>
        {text}
      </a>
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
    render: (text) => <div>{text}</div>,
    width: 150,
  },
  {
    title: "创建时间",
    dataIndex: "created",
    key: "created",
    align: "center",
    fixed: "right",
    render: (text, record) => <Space>{record.created}</Space>,
  },
];

const data = [
  {
    collect: false,
    name: "洁神的第三个项目",
    organization: "研发组",
    owner: "洁神",
    created: "2023-10-30",
  },
];

function index() {
  return (
    <Table
      dataSource={data}
      columns={columns}
      rowKey={(record) => record.created}
    />
  );
}

export default index;
