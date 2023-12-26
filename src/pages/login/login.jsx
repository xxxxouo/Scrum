import React, { useEffect, useRef } from "react";
import { Button, Checkbox, Form, Input, Divider } from "antd";
import { Link } from "react-router-dom";
import Login_wrap from "components/Layout/Login_wrap";

export default function login() {
  const [form] = Form.useForm();

  const handleClick = async () => {
    const then = await form.validateFields();
    if (then) {
      console.log(then);
    }
  };
  return (
    <Login_wrap>
      <Form form={form} className="flex justify-center items-center flex-col">
        <h2 className=" text-xl mb-4 ">请登录</h2>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "请输入用户名!" }]}
        >
          <Input
            id="username"
            placeholder="请输入用户名"
            allowClear
            className=" w-[20rem]"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "请输入密码!" }]}
        >
          <Input.Password
            id="password"
            placeholder="请输入密码"
            allowClear
            autoComplete="on"
            className=" w-[20rem]"
          />
        </Form.Item>
        <Button onClick={handleClick} type="primary" className=" bg-blue-400">
          登陆
        </Button>
        <Divider />
        <Link className="text-blue-600" to={"/register"}>
          没有账号?注册新账号
        </Link>
      </Form>
    </Login_wrap>
  );
}
