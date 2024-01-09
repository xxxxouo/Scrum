import React from "react";
import { Link } from "react-router-dom";
import { Header } from "./style/style";
import Menu from "./Menu";
function index() {
  return (
    <Header>
      <nav className="flex gap-4 items-center">
        <Link className=" w-8 h-8" to="/project" replace>
          <img src="/images/logo.jpg" alt="logo" />
        </Link>
        <Menu />
      </nav>
    </Header>
  );
}

export default index;
