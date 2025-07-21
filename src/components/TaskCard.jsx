import React from 'react';
import './TaskCard.css';

const priorityColors = { High: '#f8d7da', Medium: '#fff3cd', Low: '#d4edda' };

export default function TaskCard({ task, onEdit }) {
  const overdue = !task.completed && new Date(task.dueDate) < Date.now();
  return (
    <div
      className="task-card"
      style={{
        backgroundColor: priorityColors[task.priority],
        border: overdue ? '2px solid red' : '1px solid #ccc'
      }}
      onClick={() => onEdit(task)}
      draggable
      onDragStart={e => e.dataTransfer.setData('text/plain', task.id)}
    >
      <h3>{task.title}</h3>
      <p>Due: {new Date(task.dueDate).toLocaleString()}</p>
      <p>Status: {task.status}</p>
    </div>
  );
}
