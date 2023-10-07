// src/components/TodoList.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ITodo } from '../interface/ITodo';
import { toggleTodo, deleteTodo, setTodos } from '../reducers/todoSlice';
import { RootState } from '../store';

const TodoList: React.FC = () => {
    const todos = useSelector((state: RootState) => state.todos);
    const dispatch = useDispatch();

    let todoFetched = false;

    useEffect(() => {

        if (!todoFetched) {
            fetch('http://localhost:5000/todos')
                .then((response) => response.json())
                .then((data) => dispatch(setTodos(data)));
        }

        return () => {
            todoFetched = true;
        }
    }, []);

    const removeTodo = (id: number) => {
        fetch(`http://localhost:5000/todos/${id}`, {
        method: 'DELETE',
      })
        .then(() => {
            dispatch(deleteTodo(id));
        });
    }

    const updateTodoToggle = (todo: ITodo) => {

        fetch(`http://localhost:5000/todos/${todo.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ completed: !todo.completed }),
        })
          .then(() => dispatch(toggleTodo(todo.id)));
    }

    return (
        <ul>
            {todos.map((todo: ITodo) => (
                <li key={todo.id}>
                    <span
                        onClick={() => updateTodoToggle(todo)}
                        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                    >
                        {todo.text}
                    </span>
                    <button onClick={() => removeTodo(todo.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
