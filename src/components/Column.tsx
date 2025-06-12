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
import { getStatusColor, getCountBadgeColor } from '../utils/status';
import TaskModal from './modal/TaskModal';

interface ColumnProps {
  title: string;
  tasks: Task[];
  status: Task['status'];
  columnRef: (el: HTMLDivElement | null) => void;
  onDragStart: (task: Task) => void;
  onDragEnd: (event: MouseEvent) => void;
}


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
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography variant="subtitle2" fontWeight="bold">
            {title}
          </Typography>

          <Box
            sx={{
              bgcolor: getCountBadgeColor(status),
              color: '#fff',
              px: 1,
              borderRadius: '50%',
              fontSize: '0.75rem',
              minWidth: 20,
              height: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {tasks.length}
          </Box>
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
