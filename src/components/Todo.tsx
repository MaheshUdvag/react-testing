import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../reducers/todoSlice';

const Todo: React.FC = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (text.trim() !== '') {
        fetch('http://localhost:5000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text , completed: false }),
      })
        .then((response) => response.json())
        .then((newTodo) => {
          dispatch(addTodo(newTodo));
          setText('');
        });
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a todo..."
      />
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
};

export default Todo;
