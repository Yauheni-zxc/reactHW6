import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tasks as data } from '../../data/tasks';

export const loadTasksAsync = createAsyncThunk(
  'tasks/load',
  async () => {
    return new Promise(resolve => {
      setTimeout(() => resolve(data), 1000);
    });
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: data,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    removeTask: (state, action) => {
      return state.filter(task => task.id !== action.payload);
    },
    toggleTask: (state, action) => {
      const task = state.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadTasksAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { addTask, removeTask, toggleTask } = tasksSlice.actions;

export default tasksSlice.reducer;