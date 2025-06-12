export const getDueDateColor = (dueDateStr: string | Date | undefined): string => {
 if (!dueDateStr) return 'grey.300';
 const dueDate = new Date(dueDateStr);
 const today = new Date();
 const diffInMs = dueDate.getTime() - today.setHours(0, 0, 0, 0);
 const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

 if (diffInDays < 0) return '#f44336';       // Red (overdue)
 if (diffInDays === 0) return '#e57373';     // Light red (due today)
 if (diffInDays <= 3) return '#ff9800';      // Orange (within 3 days)
 return '#81c784';                           // Green (more than 3 days away)
};
