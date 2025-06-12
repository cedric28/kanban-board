export const priorityLabels = {
 high: 'High',
 medium: 'Medium',
 low: 'Low',
} as const;

export type TaskPriority = keyof typeof priorityLabels;

export const priorityOptions = Object.keys(priorityLabels) as TaskPriority[];
