import './TodoItem.css';

import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { TodosContext } from '../TodosContext';
import { filterTodos, Todos } from '../store';

export const TodoItem: React.FC = () => {
  const { todos, setTodos, filter, activeProjectId } = useContext(TodosContext);

  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const filterCurrentTodos = (allTodos: Todos[]) => {
    return allTodos.filter(at => at.projId === activeProjectId);
  };

  const handleDoubleClick = (todoId: number, todoTitle: string) => {
    setEditingTodoId(todoId);
    setNewTodoTitle(todoTitle);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
  };

  const handleRemoveTodo = (todoId: number) => {
    const updatedTodos = todos.filter(todo => todo.id !== todoId);

    setTodos(updatedTodos);
  };

  const handleSaveChanges = (todoId: number) => {
    if (!newTodoTitle.trim()) {
      handleRemoveTodo(todoId);
      setNewTodoTitle('');

      return;
    }

    const updatedTodos = todos.map(todo =>
      todo.id === todoId ? { ...todo, title: newTodoTitle } : todo,
    );

    setTodos(updatedTodos);
    setEditingTodoId(null);
  };

  const handleCancelEditing = () => {
    setEditingTodoId(null);
    setNewTodoTitle('');
  };

  const handleKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement>,
    todoId: number,
  ) => {
    if (event.key === 'Enter') {
      handleSaveChanges(todoId);
    } else if (event.key === 'Escape') {
      handleCancelEditing();
    }
  };

  const handleComplitedTodo = (todoId: number) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === todoId) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  return (
    <>
      <ul className="todo-item-list">
        {filterTodos(filterCurrentTodos(todos), filter).map(todo => (
          <li
            key={todo.id}
            className={classNames('panel-block for-test', {
              'has-background-success-light completed-todo': todo.completed,
              editing: editingTodoId === todo.id,
            })}
          >
            <a
              className={classNames('panel-icon', {
                'has-text-success': todo.completed,
              })}
            >
              <i
                className={classNames('fas', {
                  'fa-check-square': todo.completed,
                  'fa-pen-to-square': !todo.completed,
                })}
                onClick={() => handleComplitedTodo(todo.id)}
              ></i>
            </a>

            {editingTodoId === todo.id ? (
              <input
                className="input1 todo-input"
                type="text"
                value={newTodoTitle}
                onChange={handleInputChange}
                onKeyUp={event => handleKeyUp(event, todo.id)}
                autoFocus
                onBlur={() => handleSaveChanges(todo.id)}
              />
            ) : (
              <>
                <span
                  onDoubleClick={() => handleDoubleClick(todo.id, todo.title)}
                >
                  {todo.title}
                </span>
                <a className="remove-icon is-small is-right">
                  <i
                    className="fas fa-remove has-text-danger"
                    onClick={() => handleRemoveTodo(todo.id)}
                  ></i>
                </a>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};
