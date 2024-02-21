import { Button } from "antd";
import React, { useEffect } from "react";
import EpicList from "./components/EpicList";
import CreateEpicModal from "./components/CreateEpicModal";
import { useDispatch } from "react-redux";
import { set_epic_createmodal_show } from "state/epic/reducer";
import { useParams } from "react-router-dom";
import { getSingle_Project_Async } from "state/project/reducer";
import { set_project_id } from "state/drop/reducer";
function Epic() {
  const dispath = useDispatch();
  const { id } = useParams();
  const handleCreateEpic = () => {
    dispath(set_epic_createmodal_show(true));
  };

  useEffect(() => {
    dispath(getSingle_Project_Async(id));
    dispath(set_project_id(id));
  }, [id]);

  return (
    <div>
      <Button type="link" onClick={handleCreateEpic}>
        创建任务组
      </Button>
      <EpicList />
      <CreateEpicModal />
    </div>
  );
}

export default Epic;
