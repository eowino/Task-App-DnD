import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border-radius: 2px;
  margin-bottom: 12px;
  padding: 12px;
  background: ${props => (props.isDragging ? 'lightgreen': '#fff')};
  box-shadow: ${props => (props.isDragging ? 'none': '2px 2px 2px 2px #f2f2f2')};
`;

const Task = ({ index, task }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          innerRef={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {task.content}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
