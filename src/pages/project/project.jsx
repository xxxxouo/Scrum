import React from "react";
import ProjectTable from "./components/ProjectTable";
import ProductModal from "./components/ProductModal";
import { Typography, Button, Input, Select } from "antd";
import { useGetProject } from "./hooks/useInitData";
import { useDispatch } from "react-redux";
import { set_create_project_model_show } from "state/project/reducer";
function project() {
  useGetProject();
  const dispath = useDispatch();
  const handleChange = value => console.log(`selected ${value}`);

  const handleCreate = () => {
    dispath(set_create_project_model_show({ show: true, type: "create" }));
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <Typography.Title>项目列表</Typography.Title>
        <Button type="link" onClick={handleCreate}>
          创建项目
        </Button>
      </div>
      {/* <div className="flex gap-2">
        <Input
          placeholder="任务名"
          style={{
            width: 300,
          }}
        />
        <Select
          defaultValue="lucy"
          style={{
            width: 120,
          }}
          onChange={handleChange}
          options={[
            {
              value: "jack",
              label: "Jack",
            },
            {
              value: "lucy",
              label: "Lucy",
            },
            {
              value: "Yiminghe",
              label: "yiminghe",
            },
            {
              value: "disabled",
              label: "Disabled",
              disabled: true,
            },
          ]}
        />
      </div> */}
      <ProjectTable />
      <ProductModal />
    </>
  );
}
export default project;
