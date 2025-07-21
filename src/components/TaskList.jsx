import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskCard from './TaskCard';
import './TaskList.css';

export default function TaskList({ filters, onEdit, onReorder }) {
  const { state, deleteTask } = useContext(TaskContext);
  let tasks = [...state.tasks];

  if (filters.status) tasks = tasks.filter(t => t.status === filters.status);
  if (filters.priority) tasks = tasks.filter(t => t.priority === filters.priority);

  tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  const onDrop = e => {
    e.preventDefault();
    const movedId = e.dataTransfer.getData('text');
    const remaining = tasks.filter(t => t.id !== movedId);
    const moved = state.tasks.find(t => t.id === movedId);
    const dropIndex = remaining.findIndex(t => t.id === e.target.getAttribute('data-id'));
    if (dropIndex !== -1) remaining.splice(dropIndex, 0, moved);
    else remaining.push(moved);
    onReorder(remaining);
  };

  return (
    <div className="task-list" onDragOver={e => e.preventDefault()} onDrop={onDrop}>
      {tasks.map(t => (
        <div key={t.id} data-id={t.id} style={{ position: 'relative' }}>
          <TaskCard task={t} onEdit={onEdit} />

          <button
            onClick={() => deleteTask(t.id)}
            aria-label="Delete task"
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'transparent',
              border: 'none',
              color: 'red',
              cursor: 'pointer',
              fontSize: '1.2rem'
            }}
          >
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
}

