import React from "react";
import styled from "styled-components";
import { menu } from "config";
import { NavLink } from "react-router-dom";
import ProjectPopover from "./ProjectPopover";
import UserPopover from "./UserPopover";

const NavHover = styled.div`
  &:hover {
    border-radius: 16px;
    background: #eff4f5;
  }
`;
function Menu() {
  const classN = ({ isActive }) => {
    return isActive
      ? `text-sky-400 font-bold leading-3rem px-6`
      : "leading-3rem px-6 ";
  };

  const renderComponent = route => {
    const commonNav = (
      <NavLink className={classN} to={route.href}>
        {route.label}
      </NavLink>
    );
    const Component =
      route.label == "项目" ? (
        <ProjectPopover>{commonNav}</ProjectPopover>
      ) : (
        <UserPopover>{commonNav}</UserPopover>
      );
    return Component;
  };

  return (
    <div className="flex items-center">
      {menu.map(route => (
        <NavHover key={route.href} className=" text-lg py-2">
          {renderComponent(route)}
        </NavHover>
      ))}
    </div>
  );
}

export default Menu;
