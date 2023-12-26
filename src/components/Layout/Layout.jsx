import React, { Fragment } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header";
import SideBar from "../SideBar";

function Layout({ children }) {
  const location = useLocation();
  return (
    <div className="layout_wrap">
      <Header />
      <main className="flex bg-slate-50 h-screen">
        {location.pathname !== "/project" && <SideBar />}
        <div className=" w-full p-4 ">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
