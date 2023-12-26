import React from "react";
import { Input, Select, Button } from "antd";

function SearchForm() {
  return (
    <div className="flex items-center justify-start gap-3">
      <Input placeholder="任务名" className=" w-[10rem]" />
      <Select
        defaultValue="经办人"
        style={{
          width: 120,
        }}
        options={[
          {
            value: "经办人",
            label: "经办人",
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
      <Select
        defaultValue="类型"
        style={{
          width: 120,
        }}
        options={[
          {
            value: "类型",
            label: "类型",
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
      <Button>清除筛选器</Button>
    </div>
  );
}

export default SearchForm;
