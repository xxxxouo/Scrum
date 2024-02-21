import React, { useEffect, useRef } from "react";
import { Button, Checkbox, Form, Input, Divider } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login_wrap from "components/Layout/Login_wrap";
import request from "utils/http";
import { message } from "antd";
import _ from "lodash";
import { set_login_state } from "state/login/reducer";
import { useDispatch } from "react-redux";
export default function login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispath = useDispatch();
  const location = useLocation();
  _.isEmpty(location.state) ? null : form.setFieldsValue(location.state);

  const handleClick = async () => {
    const then = await form.validateFields();
    if (then) {
      const { code, msg } = await request.post("/api/login", then);
      if (code == 0) {
        dispath(set_login_state(true));
        message.success("登陆成功");
        navigate("/project", {
          replace: true,
        });
      }
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
        <Link className="text-blue-600 mt-3" to={"/vip"}>
          进入vip 页面
        </Link>
      </Form>
    </Login_wrap>
  );
}
