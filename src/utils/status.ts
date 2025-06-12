export const statusLabels = {
 not_started: 'Not Started',
 in_progress: 'In Progress',
 blocked: 'Blocked',
 done: 'Done',
} as const;

export type TaskStatus = keyof typeof statusLabels;

export const getStatusLabel = (status: TaskStatus): string => statusLabels[status];

export const taskStatusOptions = Object.keys(statusLabels) as TaskStatus[];

export const columnOrder = taskStatusOptions;