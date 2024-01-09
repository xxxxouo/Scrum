import { Space, Table } from "antd";
import React from "react";
import { useProject_List } from "state/project/hooks";
import { Link } from "react-router-dom";
import { Star } from "react-feather";

const columns = [
  {
    title: "收藏",
    dataIndex: "collect",
    key: "collect",
    align: "center",
    render: (text, record) => {
      return (
        <div
          onClick={() => {
            // hand_collect_click(record)
          }}
          className="flex justify-center"
        >
          <Star color={text ? "#dfd50c" : "#999999"} />
        </div>
      );
    },
    width: 100,
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
    fixed: "right",
    render: (text, record) => <Space>{record.created}</Space>,
  },
];

function ProjectTable() {
  const data = useProject_List();
  return (
    <Table
      dataSource={data}
      columns={columns}
      rowKey={record => record.created}
    />
  );
}

export default ProjectTable;
