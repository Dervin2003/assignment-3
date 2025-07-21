import { useEffect, useRef } from 'react';

export function useReminders(tasks, onReminder) {
  const timers = useRef({});

  useEffect(() => {
    Object.values(timers.current).forEach(clearTimeout);
    timers.current = {};

    tasks.forEach(task => {
      const due = new Date(task.dueDate).getTime();
      const now = Date.now();
      if (!task.completed && due > now) {
        timers.current[task.id] = setTimeout(() => {
          onReminder(task);
        }, due - now);
      }
    });

    return () => Object.values(timers.current).forEach(clearTimeout);
  }, [tasks, onReminder]);
}
