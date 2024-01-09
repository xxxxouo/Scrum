import { Button, Tag } from "antd";
import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { set_task_modal } from "state/kanban/reducer";
import { useDispatch } from "react-redux";

const Drop_Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const Drag_Box = styled.div`
  width: 100%;
  background-color: #fff !important;
  padding: 12px 16px;
`;

function TaskDrop({ task }) {
  const dispatch = useDispatch();
  const list = task.task;

  const handleCreate = kanban_key => {
    dispatch(
      set_task_modal({
        show: true,
        kanban_key,
        type: "create",
      }),
    );
  };

  const edit_task = (kanban_key, task_id) => {
    dispatch(
      set_task_modal({
        show: true,
        kanban_key,
        task_id,
        type: "edit",
      }),
    );
  };

  return (
    <Droppable droppableId={task.kanban_key} type="task">
      {(provided, snapshot) => (
        <Drop_Box ref={provided.innerRef} {...provided.droppableProps}>
          {list.map((item, index) => (
            <Draggable
              draggableId={`${task.kanban_key}_${item.name}`}
              index={index}
              key={`${task.kanban_key}_${item.name}`}
            >
              {(provided, snapshot) => (
                <Drag_Box
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  onClick={() => edit_task(task.kanban_key, item.task_id)}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <img
                        className=" rounded-full w-10 h-10"
                        src="/images/avatar.png"
                        alt=""
                      />
                      <h3>{item.name}</h3>
                    </div>
                    <div className="flex justify-between items-center">
                      <h3 className=" text-ellipsis overflow-hidden whitespace-nowrap w-28">
                        {item.owner}
                      </h3>
                      <Tag color={item.type === "bug" ? "red" : "geekblue"}>
                        {item.type}
                      </Tag>
                    </div>
                  </div>
                </Drag_Box>
              )}
            </Draggable>
          ))}
          <Button
            className=" absolute bottom-[10px]"
            onClick={() => handleCreate(task.kanban_key)}
          >
            添加任务
          </Button>
          {provided.placeholder}
        </Drop_Box>
      )}
    </Droppable>
  );
}

export default TaskDrop;
