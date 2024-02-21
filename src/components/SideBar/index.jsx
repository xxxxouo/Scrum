import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
function Index() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState("kanban");

  const handleClick = e => {
    const { key } = e;
    setCurrent(key);
    navigate(`/project/${id}/${key}`);
  };

  const defaultSelectedKeys = useMemo(() => {
    const pathArr = location.pathname.split("/");
    return [pathArr[pathArr.length - 1]];
  }, []);

  useEffect(() => {
    const pathArr = location.pathname.split("/");
    setCurrent(pathArr[pathArr.length - 1]);
  }, [location.pathname]);

  return (
    <Menu
      style={{
        width: 200,
        height: "100vh",
      }}
      mode="inline"
      onClick={handleClick}
      selectedKeys={[current]}
      defaultSelectedKeys={defaultSelectedKeys}
      items={menuConfig}
    />
  );
}

export default Index;
