import { Task } from '../types/task';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'kanban-tasks';

const sampleTasks: Task[] = [
  {
    id: uuidv4(),
    title: 'Design Landing Page',
    status: 'not_started',
    dueDate: '2025-06-20',
    subtasks: [
      { title: 'Wireframe', completed: false },
      { title: 'Mockup', completed: false }
    ]
  },
  {
    id: uuidv4(),
    title: 'API Integration',
    status: 'in_progress',
    dueDate: '2025-06-18',
    subtasks: [
      { title: 'Set up backend', completed: true },
      { title: 'Connect to frontend', completed: false }
    ]
  },
  {
    id: uuidv4(),
    title: 'Testing User Flow',
    status: 'blocked',
    dueDate: '2025-06-22',
    subtasks: [
      { title: 'Unit Tests', completed: false },
      { title: 'Integration Tests', completed: false }
    ]
  },
  {
    id: uuidv4(),
    title: 'Project Deployment',
    status: 'done',
    dueDate: '2025-06-15',
    subtasks: [
      { title: 'Configure server', completed: true },
      { title: 'Run CI/CD', completed: true }
    ]
  }
];

export const loadTasks = (): Task[] => {
  const data = localStorage.getItem(STORAGE_KEY);

  try {
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleTasks));
      return sampleTasks;
    }

    const parsed: Task[] = JSON.parse(data);

    // Check for duplicate IDs before merging
    const existingIds = new Set(parsed.map(task => task.id));
    const newTasks = sampleTasks.filter(task => !existingIds.has(task.id));

    const merged = [...parsed, ...newTasks];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    return merged;

  } catch (err) {
    console.error('Failed to parse tasks from localStorage', err);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleTasks));
    return sampleTasks;
  }
};



export const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};
