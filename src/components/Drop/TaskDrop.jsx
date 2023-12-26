import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Drop_Box = styled.div``;

function TaskDrop({ task }) {
  const list = task.task;
  return (
    <Droppable droppableId={task.kanban_key} type="task">
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {list.map((item, index) => (
            <Draggable
              draggableId={`${task.kanban_key}_${item.name}`}
              index={index}
              key={`${task.kanban_key}_${item.name}`}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <h3>{item.name}</h3>
                  <h3>{item.type}</h3>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default TaskDrop;
