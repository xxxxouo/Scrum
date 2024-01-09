import React, { useEffect, useRef } from "react";
import { Button, Checkbox, Form, Input, Divider } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Login_wrap from "components/Layout/Login_wrap";
import request from "utils/http";
import { message } from "antd";

export default function register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleClick = async () => {
    const then = await form.validateFields();
    if (then) {
      const { code, msg } = await request.post("/api/register", then);
      if (code == 0) {
        message.success("注册成功,2秒后为您跳转到登陆界面");
        setTimeout(() => {
          navigate("/login", {
            replace: true,
            state: { username: then.username, password: then.password },
          });
        }, 2000);
      }
    }
  };

  return (
    <Login_wrap>
      <Form form={form} className="flex justify-center items-center flex-col">
        <h2 className=" text-xl mb-4 ">请注册</h2>
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
          注册
        </Button>
        <Divider />
        <Link className="text-blue-600" to={"/login"}>
          已有账号?请登录
        </Link>
      </Form>
    </Login_wrap>
  );
}
