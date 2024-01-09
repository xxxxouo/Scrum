import React, { useEffect } from "react";
import SearchForm from "components/SearchForm/SearchForm";
import DropCp, { Drag_Wrap } from "./components/Drop/DropCp";
import { useParams } from "react-router-dom";
import { getSingle_Project_Async } from "state/project/reducer";
import { set_project_id } from "state/drop/reducer";
import { useDispatch } from "react-redux";
import TaskModal from "./components/TaskModal";

function kanban() {
  const { id } = useParams();
  const dispath = useDispatch();

  useEffect(() => {
    dispath(getSingle_Project_Async(id));
    dispath(set_project_id(id));
  }, [id]);
  return (
    <div className="flex-1 flex flex-col h-full">
      <h1 className=" text-3xl font-bold">scrum项目管理研发看板</h1>
      <SearchForm />

      <Drag_Wrap>
        <DropCp />
      </Drag_Wrap>
      <TaskModal />
    </div>
  );
}

export default kanban;
