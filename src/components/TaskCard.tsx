import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Task } from '../types/task';
import { motion } from 'framer-motion';
import { useTasks } from '../context/TaskContext';
import { getDueDateColor } from '../utils/date';
import TaskModal from './modal/TaskModal';
import DropIndicator from './DropIndicator';

interface TaskCardProps {
  task: Task;
  onDragStart: () => void;
  onDragEnd: (event: MouseEvent) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDragStart, onDragEnd }) => {
  const { updateTask, deleteTask } = useTasks();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const toggleSubtask = (index: number) => {
    const updatedSubtasks = [...(task.subtasks || [])];
    updatedSubtasks[index].completed = !updatedSubtasks[index].completed;
    updateTask({ ...task, subtasks: updatedSubtasks });
  };

  const handleDelete = () => {
    deleteTask(task.id);
    setConfirmOpen(false);
  };

  const handleEditSubmit = (updatedTask: Omit<Task, 'id'>, id?: string) => {
    if (id) {
      updateTask({ ...updatedTask, id });
    }
    setEditOpen(false);
  };

  return (
    <>
      <DropIndicator beforeId={task.id} column={task.status} />
      <motion.div
        layout
        layoutId={task.id}
        draggable={true}
        drag
        dragMomentum={false}
        whileDrag={{ scale: 1.05 }}
        onDragStart={onDragStart}
        onDragEnd={(event, info) => {
          if ('clientX' in event && 'clientY' in event) {
            onDragEnd(event as MouseEvent);
          }
        }}
        style={{ marginBottom: 8, zIndex: 2, cursor: 'grab' }}
      >
        <Card>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="start">
              <Typography variant="body1" gutterBottom>{task.title}</Typography>
              <Stack direction="row">
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => setEditOpen(true)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => setConfirmOpen(true)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
            {task.dueDate && (
                <Typography
                  variant="caption"
                  sx={{
                    backgroundColor: getDueDateColor(task.dueDate),
                    color: '#fff',
                    borderRadius: 1,
                    px: 1,
                    py: 0.5,
                    width: 'fit-content'
                  }}
                >
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                </Typography>
              )}
            {task.subtasks && task.subtasks.length > 0 && (
              <List dense>
                {task.subtasks.map((subtask, index) => (
                  <ListItem key={index} disableGutters>
                    <Checkbox
                      checked={subtask.completed}
                      onChange={() => toggleSubtask(index)}
                    />
                    <ListItemText
                      primary={subtask.title}
                      primaryTypographyProps={{
                        style: {
                          textDecoration: subtask.completed ? 'line-through' : 'none',
                          color: subtask.completed ? '#888' : 'inherit'
                        }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          Are you sure you want to delete "{task.title}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <TaskModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        task={task}
        initialStatus={task.status}
        onSubmit={handleEditSubmit}
      />
    </>
  );
};

export default TaskCard;
