import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Column from './Column';

import initData from './initial-data';

const Container = styled.div`
  display: flex;
`;

class App extends Component {
  state = initData;

  renderColumns() {
    return this.state.coloumnOrder.map(columnId => {
      const column = this.state.columns[columnId];
      const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

      return <Column key={columnId} column={column} tasks={tasks} />;
    });
  }

  destinationNotChanged(destination, source) {
    // true if item dropped in same position it started
    return (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    );
  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination || this.destinationNotChanged(destination, source)) return;

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);

      // remove one item from index
      newTaskIds.splice(source.index, 1);

      // remove nothing at position destination.index and insert draggableId
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      };

      this.setState(() => newState);
    } else {
      // Moving from one list (column) to another
      const startTaskIds = [...start.taskIds];
      
      // remove dragged task id from array
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };

      const finishTaskIds = [...finish.taskIds];
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        }
      };

      this.setState(() => newState);
    }
  };

  render() {
    return (
      <Container>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {this.renderColumns()}
        </DragDropContext>
      </Container>
    );
  }
}

export default App;
