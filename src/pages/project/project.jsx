import React from "react";
import ProjectTable from "components/ProjectTable";
import CreateProductModal from "components/CreateProductModal";
import { Typography, Button, Input, Select } from "antd";
function project() {
  const handleChange = (value) => console.log(`selected ${value}`);

  const handleCreate = () => {
    console.log("create");
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <Typography.Title>项目列表</Typography.Title>
        <Button type="link" onClick={handleCreate}>
          创建项目
        </Button>
      </div>
      <div className="flex gap-2">
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
      </div>
      <ProjectTable />
      <CreateProductModal />
    </>
  );
}
export default project;
