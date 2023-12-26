import React from "react";
import SearchForm from "components/SearchForm/SearchForm";
import DropCp, { Drag_Wrap } from "components/Drop/DropCp";

function kanban() {
  return (
    <div className="flex-1 flex flex-col">
      <h1 className=" text-3xl font-bold">scrum项目管理研发看板</h1>
      <SearchForm />

      <Drag_Wrap>
        <DropCp />
      </Drag_Wrap>
    </div>
  );
}

export default kanban;
