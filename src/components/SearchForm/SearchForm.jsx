import React, { useEffect } from "react";
import { Input, Select, Button, Form } from "antd";
import { useSelectTaskTypes, useSelectUsers } from "state/project/hooks";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "utils/http";
import { useDispatch } from "react-redux";
import { set_kanban_data } from "state/drop/reducer";
import { useGetEpicList } from "state/kanban/hooks";

function SearchForm() {
  const dispath = useDispatch();
  const [searchParams] = useSearchParams();
  const { id: currentProjectId } = useParams();
  const user = useSelectUsers();
  const type = useSelectTaskTypes();
  const epicInit = useGetEpicList();
  const epic = epicInit?.map(item => {
    return {
      name: item,
      type: item,
    };
  });
  const [form] = Form.useForm();

  const search = async form_params => {
    const { data } = await axios.get(`/api/project/${currentProjectId}`);
    let drop_data = data.kanban;
    let filter_drop_data = drop_data.map(item => {
      let task_list = item.task;
      task_list = task_list.filter(task => {
        let isName = true;
        let isType = true;
        let isOwner = true;
        let isEpic = true;
        if (form_params.name) {
          if (task.name.indexOf(form_params.name) < 0) {
            isName = false;
          }
        }
        if (form_params.owner) {
          if (task.owner !== form_params.owner) {
            isOwner = false;
          }
        }
        if (form_params.type) {
          if (task.type !== form_params.type) {
            isType = false;
          }
        }

        if (form_params.epic) {
          if (task.epic !== form_params.epic) {
            isEpic = false;
          }
        }

        return isName && isType && isOwner && isEpic;
      });
      return {
        ...item,
        task: task_list,
      };
    });
    dispath(set_kanban_data(filter_drop_data));
  };

  const search_click = async () => {
    const form_params = await form.validateFields();
    Object.keys(form_params).forEach(key => {
      if (form_params[key] === undefined) {
        delete form_params[key];
      }
    });
    if (form_params) await search(form_params);
  };

  const reset = () => {
    form.resetFields();
  };

  useEffect(() => {
    if (searchParams.get("epic")) {
      form.setFieldsValue({
        epic: searchParams.get("epic"),
      });
      search_click();
    }
  }, []);

  return (
    <Form form={form} layout="inline">
      <Form.Item name="name">
        <Input placeholder={"任务名"} className="w-[10rem]" />
      </Form.Item>
      <Form.Item label="负责人" name="owner" style={{ width: 200 }}>
        <Select
          placeholder="负责人"
          options={user}
          fieldNames={{ label: "username", value: "username" }}
        />
      </Form.Item>
      <Form.Item label="任务类型" name="type" style={{ width: 200 }}>
        <Select
          placeholder="任务类型"
          options={type}
          fieldNames={{ label: "name", value: "name" }}
        />
      </Form.Item>
      <Form.Item label="epic" name="epic" style={{ width: 200 }}>
        <Select
          placeholder="epic"
          options={epic}
          fieldNames={{ label: "name", value: "type" }}
        />
      </Form.Item>
      <Button onClick={reset} className=" mr-2">
        清除
      </Button>
      <Button onClick={search_click}>搜索</Button>
    </Form>
  );
}

export default SearchForm;
