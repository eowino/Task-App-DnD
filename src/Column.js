import React from 'react';
import Task from './Task';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
  margin: 8px;
  border: 1px solid #ccc;
  border-radius: 2px;
  width: 33.3333%;

  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  padding: 8px;
  transition: background 0.2s ease;
  background: ${props => (props.isDraggingOver ? 'skyblue' : '#fff')}
  flex-grow: 1;
  min-height: 100px;
`;

const Column = props => {
  return (
    <Container>
      <Title>{props.column.title}</Title>
      <Droppable droppableId={props.column.id}>
        {(provided, snapshot) => (
            <TaskList
                innerRef={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver }>
                    {props.tasks.map((task, i) => <Task key={task.id} task={task} index={i} />)}
                    {provided.placeholder}
            </TaskList>
        )}
      </Droppable>
    </Container>
  );
};

export default Column;
