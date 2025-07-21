import React, { useState, useContext, useCallback } from 'react';
import { TaskProvider, TaskContext } from './context/TaskContext';
import { useReminders } from './hooks/useReminders';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';

function InnerApp() {
  const { state, dispatch } = useContext(TaskContext);
  const [filters, setFilters] = useState({});
  const [editing, setEditing] = useState(null);

  const onReminder = task => alert(`🛎️ Reminder: "${task.title}" is due!`);

  useReminders(state.tasks, onReminder);

  const saveTask = task => {
    if (task.id) dispatch({ type: 'UPDATE_TASK', task });
    else {
      task.id = Date.now().toString();
      dispatch({ type: 'ADD_TASK', task });
    }
    setEditing(null);
  };

  const reorder = newTasks => dispatch({ type: 'REORDER_TASKS', tasks: newTasks });

  return (
    <div>
      <header>
        <button onClick={() => setEditing({})}>+ New</button>
        <select onChange={e => setFilters({ ...filters, status: e.target.value })}>
          <option value="">All</option><option value="todo">To‑do</option><option value="in-progress">In‑Progress</option><option value="completed">Done</option>
        </select>
      </header>
      <TaskList filters={filters} onEdit={setEditing} onReorder={reorder} />
      {editing && <TaskModal task={editing.id ? editing : null} onSave={saveTask} onClose={() => setEditing(null)} />}
    </div>
  );
}

export default function App() {
  return (
    <TaskProvider>
      <InnerApp />
    </TaskProvider>
  );
}
