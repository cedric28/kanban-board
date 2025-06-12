import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Stack,
  IconButton,
  Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TaskCard from './TaskCard';
import { Task } from '../types/task';
import { useTasks } from '../context/TaskContext';
import type { TaskStatus } from '../utils/status';
import TaskModal from './modal/TaskModal';

interface ColumnProps {
  title: string;
  tasks: Task[];
  status: Task['status'];
  columnRef: (el: HTMLDivElement | null) => void;
  onDragStart: (task: Task) => void;
  onDragEnd: (event: MouseEvent) => void;
}

const getStatusColor = (status: TaskStatus): string => {
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


const Column: React.FC<ColumnProps> = ({
  title,
  tasks,
  status,
  columnRef,
  onDragStart,
  onDragEnd
}) => {
  const { addTask } = useTasks();
  const [open, setOpen] = useState(false);

  const handleCreate = (taskData: Omit<Task, 'id'>) => {
    addTask(taskData);
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
        <Box
          sx={{
            bgcolor: getStatusColor(status),
            px: 2,
            py: 0.5,
            borderRadius: 9999,
          }}
        >
          <Typography variant="subtitle2" fontWeight="bold">
            {title}
          </Typography>
        </Box>

        <IconButton size="small" color="primary" onClick={() => setOpen(true)}>
          <AddIcon fontSize="small" />
        </IconButton>
      </Stack>
      <Paper
        elevation={3}
        sx={{ p: 2, minHeight: '400px', bgcolor: '#f4f6f8' }}
        ref={columnRef}
      >
        <div style={{ minHeight: '100px', marginTop: 8 }}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDragStart={() => onDragStart(task)}
              onDragEnd={onDragEnd}
            />
          ))}
        </div>

        <TaskModal
          open={open}
          onClose={() => setOpen(false)}
          initialStatus={status}
          onSubmit={handleCreate}
        />
      </Paper>
    </Box>
  );
};

export default Column;
