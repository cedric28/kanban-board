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


export const getStatusColor = (status: TaskStatus): string => {
 switch (status) {
   case 'not_started':
     return '#d3d3d3'; // Light gray
   case 'in_progress':
     return '#e0bbff'; // Light purple
   case 'blocked':
     return '#ffcccc'; // Light red
   case 'done':
     return '#b2fab4'; // Light green
   default:
     return '#e0e0e0';
 }
};

export const getCountBadgeColor = (status: TaskStatus): string => {
  switch (status) {
    case 'not_started':
      return '#555';
    case 'in_progress':
      return '#8e24aa';
    case 'blocked':
      return '#c62828';
    case 'done':
      return '#2e7d32';
    default:
      return '#424242';
  }
};