import React, { createContext, useContext, useEffect, useState } from 'react';
import { Task } from '../types/task';
import { loadTasks, saveTasks } from '../utils/storage';
import { v4 as uuidv4 } from 'uuid';

interface TaskContextProps {
  tasks: Task[];
  addTask: (task: Partial<Task>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks once on mount
  useEffect(() => {
    const loaded = loadTasks();
    if (loaded.length > 0) {
      setTasks(loaded);
    }
  }, []);

  // Debounced save to localStorage
  useEffect(() => {
    const timeout = setTimeout(() => {
      saveTasks(tasks);
    }, 300);
    return () => clearTimeout(timeout);
  }, [tasks]);

  const addTask = (task: Partial<Task>) => {
    if (!task.title) {
      throw new Error('Task title is required');
    }

    const newTask: Task = {
      id: uuidv4(),
      title: task.title,
      subtasks: task.subtasks || [],
      status: task.status || 'not_started',
      dueDate: task.dueDate || '',
      priority: task.priority || 'medium',
    };

    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (updated: Task) => {
    setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within TaskProvider');
  return context;
};
