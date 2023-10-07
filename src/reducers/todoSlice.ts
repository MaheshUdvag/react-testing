// src/features/todo/todoSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITodo } from '../interface/ITodo';

const initialState: ITodo[] = [];

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodo>) => {
      state.push(action.payload);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      const index = state.findIndex((t) => t.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    setTodos: (state, action: PayloadAction<ITodo[]>) => {
        state.push(...action.payload);
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, setTodos } = todoSlice.actions;
export default todoSlice.reducer;
