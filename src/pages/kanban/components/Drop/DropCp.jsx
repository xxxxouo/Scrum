import React from "react";
import { Divider, Input, Popconfirm } from "antd";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskDrop from "./TaskDrop";
import { useKanban_dataState } from "state/drop/hooks";
import {
  kanban_order,
  task_same_order,
  task_diff_order,
  drop_update_async,
  add_kanban,
  delete_kanban,
} from "state/drop/reducer";
import { useDispatch } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";
import "../style/index.css";

const Drop_Box = styled.div`
  display: flex;
  gap: 20px;
  min-width: 100%;
  min-height: 100vh;
  background-color: rgba(76, 154, 255, 0.5);
  padding: 12px;
`;
const Drag_Box = styled.div`
  width: 200px;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 2px;
  background-color: rgb(235, 236, 240);
  transition: background-color 0.2s ease 0s;
  height: fit-content;
  padding: 12px;
  padding-bottom: 50px;
  position: relative;
  background-image: url(/images/task_bg.gif);
`;

export function Drag_Wrap({ children }) {
  return (
    <div>
      <Divider />
      {children}
    </div>
  );
}

function DropCp() {
  const dispath = useDispatch();
  const drag_data = useKanban_dataState();
  const onDragEnd = result => {
    if (!result.destination) return; // 拖到屏幕外
    if (result.type === "kanban") {
      dispath(
        kanban_order({
          source: result.source.index,
          destination: result.destination.index,
        }),
      );
    }

    if (result.type === "task") {
      if (result.source.droppableId === result.destination.droppableId) {
        // 同一个列表
        dispath(
          task_same_order({
            source: result.source.index,
            destination: result.destination.index,
            kanban_key: result.source.droppableId,
          }),
        );
      } else {
        // 不同列表
        dispath(
          task_diff_order({
            source: result.source.index,
            destination: result.destination.index,
            source_kanban_key: result.source.droppableId,
            destination_kanban_key: result.destination.droppableId,
          }),
        );
      }
    }
    dispath(drop_update_async());
  };

  const handlePressEnter = e => {
    let value = e.target.value.trim();
    if (value) {
      dispath(add_kanban({ kanban_key: value }));
      dispath(drop_update_async());
    }
  };

  const deleteKanban = kanban_key => {
    dispath(delete_kanban({ kanban_key }));
    dispath(drop_update_async());
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-1" type="kanban" direction="horizontal">
        {(provided, snapshot) => (
          <Drop_Box ref={provided.innerRef} {...provided.droppableProps}>
            {drag_data.map((item, index) => {
              return (
                <Draggable
                  draggableId={item.kanban_key}
                  index={index}
                  key={item.kanban_key}
                >
                  {(provided, snapshot) => (
                    <Drag_Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Popconfirm
                        title="确定删除该看板吗？"
                        onConfirm={() => deleteKanban(item.kanban_key)}
                        okText="确定"
                        cancelText="取消"
                      >
                        <CloseOutlined className=" absolute right-2 top-2" />
                      </Popconfirm>
                      <h1 className="text-2xl">{item.kanban_key}</h1>
                      <TaskDrop task={item} />
                    </Drag_Box>
                  )}
                </Draggable>
              );
            })}
            <Drag_Box>
              <Input
                onPressEnter={handlePressEnter}
                placeholder="请输入看板名称"
                maxLength={10}
              />
            </Drag_Box>
            {provided.placeholder}
          </Drop_Box>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DropCp;
