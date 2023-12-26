import React from "react";
import { Header } from "./style/style";
import Menu from "./Menu";
function index() {
  return (
    <Header>
      <nav className="flex gap-4 items-center">
        <div className=" w-8 h-8">
          <img src="/images/logo.jpg" alt="logo" />
        </div>
        <Menu />
      </nav>
    </Header>
  );
}

export default index;
