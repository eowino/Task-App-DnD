import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border-top: 1px solid #f2f2f2;
  border-radius: 2px;
  margin-bottom: 12px;
  padding: 12px;
  background: #fff;
  box-shadow: 2px 2px 2px 2px #f2f2f2;
`;

const Task = ({ index, task }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {provided => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          innerRef={provided.innerRef}
        >
          {task.content}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
