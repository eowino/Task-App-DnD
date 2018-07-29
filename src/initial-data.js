export default {
  tasks: {
    'task-1': {
      id: 'task-1',
      content: 'Complete the course'
    },
    'task-2': {
      id: 'task-2',
      content: 'Wash the car'
    },
    'task-3': {
      id: 'task-3',
      content: 'Add more to todo list'
    },
    'task-4': {
      id: 'task-4',
      content: 'That one todo list item'
    }
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: []
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: []
    },
  },
  coloumnOrder: ['column-1', 'column-2', 'column-3']
};
