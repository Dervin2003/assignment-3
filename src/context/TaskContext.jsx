import React, { createContext, useReducer } from 'react';

export const TaskContext = createContext();

const initialState = { tasks: [] };

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.task] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t => t.id === action.task.id ? action.task : t),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== action.id),
      };
    case 'REORDER_TASKS':
      return { ...state, tasks: action.tasks };
    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const deleteTask = id => dispatch({ type: 'DELETE_TASK', id });

  return (
    <TaskContext.Provider value={{ state, dispatch, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}
