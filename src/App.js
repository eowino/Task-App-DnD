import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Column from './Column';

import initData from './initial-data';

const Container = styled.div`
  display: flex;
`;

class InnerList extends React.PureComponent {
  render() {
    const { column, taskMap, index } = this.props;
    const tasks = column.taskIds.map(taskId => taskMap[taskId]);
    return <Column column={column} tasks={tasks} index={index} />;
  }
}

class App extends Component {
  state = initData;

  renderColumns() {
    return this.state.columnOrder.map((columnId, index) => {
      const column = this.state.columns[columnId];

      return (
        <InnerList key={columnId} column={column} taskMap={this.state.tasks} index={index} />
      );
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
    const { destination, source, draggableId, type } = result;

    if (!destination || this.destinationNotChanged(destination, source)) return;

    if (type === 'column') {
      
      const newColumnOrder = [...this.state.columnOrder];
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...this.state,
        columnOrder: newColumnOrder,
      };

      this.setState(() => newState);
      return;
    }

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
        taskIds: startTaskIds
      };

      const finishTaskIds = [...finish.taskIds];
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish
        }
      };

      this.setState(() => newState);
    }
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {provided => (
            <Container
              {...provided.droppableProps}
              innerRef={provided.innerRef}
            >
              {this.renderColumns()}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default App;
