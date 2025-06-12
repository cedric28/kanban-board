import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Typography } from '@mui/material';
import Board from './components/Board';
import theme from './theme';
import { TaskProvider } from './context/TaskContext';

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <TaskProvider>
      <Container>
        <Typography variant="h4" fontWeight="bold" mt={4}>
          Personal
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={4}>
          A board to keep track of personal tasks.
        </Typography>
        <Board />
      </Container>
    </TaskProvider>
  </ThemeProvider>
);

export default App;
