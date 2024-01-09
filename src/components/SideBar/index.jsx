import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "antd";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const menuConfig = [
  getItem("看板", "kanban", null, "", "item"),
  {
    type: "divider",
  },
  getItem("任务组", "epic", null, "", "item"),
];
function index() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = e => {
    const { key } = e;
    navigate(`/project/1/${key}`);
  };
  const defaultSelectedKeys = useMemo(() => {
    const pathArr = location.pathname.split("/");
    return [pathArr[pathArr.length - 1]];
  }, []);
  return (
    <Menu
      style={{
        width: 200,
        height: "100vh",
      }}
      mode="inline"
      onClick={handleClick}
      defaultSelectedKeys={defaultSelectedKeys}
      items={menuConfig}
    />
  );
}

export default index;
