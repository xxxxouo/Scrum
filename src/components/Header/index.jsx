import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "./style/style";
import Menu from "./Menu";
import { Button } from "antd";
import axios from "utils/http";
import { set_login_state } from "state/login/reducer";
import { useDispatch } from "react-redux";

function index() {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const logout = async () => {
    await axios.post("/api/logout");
    dispath(set_login_state(false));
    navigate("/login");
  };
  return (
    <Header>
      <nav className="flex gap-4 items-center w-[100vw] ">
        <Link className=" w-8 h-8" to="/project" replace>
          <img src="/images/logo.jpg" alt="logo" />
        </Link>
        <div className="flex justify-between items-center w-full">
          <Menu />
          <Button
            type="default"
            onClick={logout}
            className=" bg-blue-400 text-white hover:bg-white"
          >
            退出登录
          </Button>
        </div>
      </nav>
    </Header>
  );
}

export default index;
