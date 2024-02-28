import React, { useEffect, useState } from "react";
import SearchForm from "components/SearchForm/SearchForm";
import DropCp, { Drag_Wrap } from "./components/Drop/DropCp";
import { useParams } from "react-router-dom";
import { getSingle_Project_Async } from "state/project/reducer";
import { set_project_id } from "state/drop/reducer";
import { useDispatch } from "react-redux";
import TaskModal from "./components/TaskModal";
import { useGetCurrentProject } from "state/kanban/hooks";
function Kanban() {
  const { id } = useParams();
  const dispath = useDispatch();
  const project = useGetCurrentProject();
  const [count,setCount] = useState(0);

  useEffect(() => {
    dispath(getSingle_Project_Async(id))

    dispath(set_project_id(id));
  }, [id]);
  return (
    <div className="flex-1 flex flex-col h-full">
      <h1 className=" text-3xl font-bold">{project.name}看板</h1>
      <button onClick={()=>setCount(pre => pre +=1)}>{count}</button>
      <SearchForm />

      <Drag_Wrap>
        <DropCp />
      </Drag_Wrap>
      <TaskModal />
    </div>
  );
}

export default  Kanban;
