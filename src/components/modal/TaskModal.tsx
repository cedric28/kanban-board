import React, { useState, useEffect } from 'react';
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem
} from '@mui/material';
import { Task } from '../../types/task';
import { getStatusLabel, taskStatusOptions } from '../../utils/status';
import { priorityOptions } from '../../utils/priorities';

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  task?: Task;
  initialStatus: Task['status'];
  onSubmit: (task: Omit<Task, 'id'>, id?: string) => void; // handle both create and update
}

const TaskModal: React.FC<TaskModalProps> = ({
  open,
  onClose,
  task,
  initialStatus,
  onSubmit
}) => {
  const isEditing = !!task;

  const [title, setTitle] = useState(task?.title || '');
  const [subtaskInput, setSubtaskInput] = useState('');
  const [subtasks, setSubtasks] = useState(task?.subtasks || []);
  const [dueDate, setDueDate] = useState(task?.dueDate || '');
  const [priority, setPriority] = useState<Task['priority']>(task?.priority || 'medium');
  const [status, setStatus] = useState<Task['status']>(task?.status || initialStatus);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setSubtasks(task.subtasks ?? []);
      setDueDate(task.dueDate ?? '');
      setPriority(task.priority);
      setStatus(task.status);
    }
  }, [task]);

  const handleAddSubtask = () => {
    if (subtaskInput.trim()) {
      setSubtasks(prev => [...prev, { title: subtaskInput.trim(), completed: false }]);
      setSubtaskInput('');
    }
  };

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit({ title, status, dueDate, priority, subtasks }, task?.id);
      onClose();

      // Reset form (only for create mode)
      if (!isEditing) {
        setTitle('');
        setSubtasks([]);
        setSubtaskInput('');
        setDueDate('');
        setPriority('medium');
        setStatus(initialStatus);
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400, bgcolor: 'background.paper',
        boxShadow: 24, p: 4, borderRadius: 2
      }}>
        <Typography variant="h6" gutterBottom>
          {isEditing ? 'Update Task' : 'Create Task'}
        </Typography>

        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <TextField
            label="Subtask"
            value={subtaskInput}
            onChange={(e) => setSubtaskInput(e.target.value)}
            fullWidth
          />
          <Button onClick={handleAddSubtask} variant="outlined">Add</Button>
        </Stack>

        {subtasks.map((s, i) => (
          <Typography key={i} variant="body2" sx={{ pl: 1 }}>
            • {s.title}
          </Typography>
        ))}

        <TextField
          label="Due Date"
          type="date"
          fullWidth
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          sx={{ mt: 2, mb: 2 }}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          select
          label="Priority"
          fullWidth
          value={priority}
          onChange={(e) => setPriority(e.target.value as Task['priority'])}
          sx={{ mb: 2 }}
        >
          {priorityOptions.map(p => (
            <MenuItem key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Status"
          fullWidth
          value={status}
          onChange={(e) => setStatus(e.target.value as Task['status'])}
          sx={{ mb: 3 }}
        >
          {taskStatusOptions.map(opt => (
            <MenuItem key={opt} value={opt}>{getStatusLabel(opt)}</MenuItem>
          ))}
        </TextField>

        <Button variant="contained" onClick={handleSubmit} fullWidth>
          {isEditing ? 'Update Task' : 'Create Task'}
        </Button>
      </Box>
    </Modal>
  );
};

export default TaskModal;


