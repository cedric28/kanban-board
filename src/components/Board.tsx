import React, { useRef, useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { useTasks } from '../context/TaskContext';
import { columnOrder, getStatusLabel } from '../utils/status';
import { Task } from '../types/task';
import Column from './Column';

const Board: React.FC = () => {
  const { tasks, updateTask } = useTasks();
  const columnRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [draggingTask, setDraggingTask] = useState<Task | null>(null);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  const handleDragEnd = (event: MouseEvent) => {
    if (!draggingTask) return;

    const droppedX = event.clientX;
    const droppedY = event.clientY;

    let bestMatch: { status: Task['status'], overlapArea: number } | null = null;

    for (const status of columnOrder) {
      const ref = columnRefs.current[status];
      if (ref) {
        const rect = ref.getBoundingClientRect();
        const withinX = droppedX >= rect.left && droppedX <= rect.right;
        const withinY = droppedY >= rect.top && droppedY <= rect.bottom;

        if (withinX && withinY) {
          bestMatch = { status, overlapArea: 1 };
          break;
        }
      }
    }

    if (bestMatch && bestMatch.status !== draggingTask.status) {
      updateTask({ ...draggingTask, status: bestMatch.status });
    }

    setDraggingTask(null);
  };


  useEffect(() => {
    const heights = Object.values(columnRefs.current).map(ref => ref?.offsetHeight || 0);
    const maxHeight = Math.max(...heights, 0);
    setContainerHeight(maxHeight + 32);
  }, [tasks]);

  return (
    <Box
      sx={{
        bgcolor: '#dcdcdc',
        minHeight: containerHeight,
        p: 2,
        borderRadius: 2,
        transition: 'min-height 0.3s ease',
      }}
    >
      <Grid container spacing={2}>
        {columnOrder.map((status: Task['status']) => (
          <Grid item xs={12} md={3} key={status}>
            <Column
              title={getStatusLabel(status)}
              tasks={tasks.filter(task => task.status === status)}
              status={status}
              columnRef={(el) => (columnRefs.current[status] = el)}
              onDragStart={setDraggingTask}
              onDragEnd={handleDragEnd}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Board;
