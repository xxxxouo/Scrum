import React from "react";
import { Divider } from "antd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { drag_data } from "./Mock";

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
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {drag_data.map((item, index) => {
              return (
                <Draggable
                  draggableId={item.kanban_key}
                  index={index}
                  key={item.kanban_key}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <h1>{item.kanban_key}</h1>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DropCp;
