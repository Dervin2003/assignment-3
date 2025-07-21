import React, { useState, useEffect } from 'react';
import './TaskModal.css'

export default function TaskModal({ task, onSave, onClose }) {
  const [form, setForm] = useState(task || { title: '', priority: 'Medium', dueDate: '', status: 'todo' });

  useEffect(() => setForm(task || form), [task]);

  const submit = e => { e.preventDefault(); onSave(form); };

  return (
    <div className="modal-overlay">
      <form className="modal" onSubmit={submit}>
        <h2>{task ? 'Edit' : 'New'} Task</h2>
        <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Title" required />
        <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
          {['High','Medium','Low'].map(p => <option key={p}>{p}</option>)}
        </select>
        <input type="datetime-local" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} required />
        <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
          {['todo','in-progress','completed'].map(s => <option key={s}>{s}</option>)}
        </select>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}
