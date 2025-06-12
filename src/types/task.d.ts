import type { TaskStatus } from '../utils/status';
import type { TaskPriority } from '../utils/priorities';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  dueDate?: string;
  subtasks?: { title: string; completed: boolean }[];
  priority?: TaskPriority
}