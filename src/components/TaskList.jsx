import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskCard from './TaskCard';
import './TaskList.css'

export default function TaskList({ filters, onEdit, onReorder }) {
  const { state } = useContext(TaskContext);
  let tasks = [...state.tasks];

  if (filters.status) tasks = tasks.filter(t => t.status === filters.status);
  if (filters.priority) tasks = tasks.filter(t => t.priority === filters.priority);

  tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  const onDrop = e => {
    const movedId = e.dataTransfer.getData('text');
    const overTasks = tasks.filter(t => t.id !== movedId);
    const moved = state.tasks.find(t => t.id === movedId);
    const index = overTasks.findIndex(t => t.id === e.target.getAttribute('data-id'));
    overTasks.splice(index, 0, moved);
    onReorder(overTasks);
  };

  return (
    <div className="task-list" onDragOver={e => e.preventDefault()} onDrop={onDrop}>
      {tasks.map(t => (
        <div key={t.id} data-id={t.id}>
          <TaskCard task={t} onEdit={onEdit} />
        </div>
      ))}
    </div>
  );
}
