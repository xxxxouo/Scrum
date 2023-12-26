import React from "react";
import { Divider } from "antd";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskDrop from "./TaskDrop";
import { drag_data } from "./Mock";

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
  const onDragEnd = (result) => {
    console.log("drag@@@", result);
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
                      <h1 className=" text-2xl">{item.kanban_key}</h1>
                      <TaskDrop task={item} />
                    </Drag_Box>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </Drop_Box>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DropCp;
