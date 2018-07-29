import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';

import initData from './initial-data';

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

    const column = this.state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);

    // remove one item from index
    newTaskIds.splice(source.index, 1);

    // remove nothing at position destination.index and insert draggableId
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn
      }
    }

    this.setState(() => newState);
  };

  render() {
    return (
      <div className="App">
        <DragDropContext onDragEnd={this.onDragEnd}>
          {this.renderColumns()}
        </DragDropContext>
      </div>
    );
  }
}

export default App;
