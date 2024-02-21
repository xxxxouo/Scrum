import { List } from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetEpicList } from "state/kanban/hooks";
import { createSearchParams } from "react-router-dom";
import DeleteAlert from "./DeleteAlert";

function EpicList() {
  const epic_list = useGetEpicList();
  const navigate = useNavigate();
  const { id } = useParams();

  const handle_click = epic => {
    navigate({
      pathname: `/project/${id}/kanban`,
      search: createSearchParams({ epic }).toString(),
    });
  };

  return (
    <List
      itemLayout="horizontal"
      dataSource={epic_list}
      renderItem={item => (
        <List.Item style={{ height: "135px" }}>
          <List.Item.Meta
            title={
              <div className=" text-lg flex justify-between text-black cursor-pointer hover:text-blue-400">
                <div
                  onClick={() => {
                    handle_click(item);
                  }}
                >
                  {item}
                </div>
                <DeleteAlert item={item} />
              </div>
            }
            description={
              <div style={{ fontSize: "16px" }}>
                <div>开始时间：暂无</div>
                <div>结束时间: 暂无</div>
              </div>
            }
          />
        </List.Item>
      )}
    />
  );
}

export default EpicList;
