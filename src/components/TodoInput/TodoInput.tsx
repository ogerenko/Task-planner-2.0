import React, { useContext, useEffect, useRef, useState } from 'react';
import { TodosContext } from '../TodosContext';
import './TodoInput.css';

export const TodoInput: React.FC = () => {
  const {
    todos,
    setTodos,
    activeProjectId,
    projects,
    setProjects,
    setActiveProjectId,
  } = useContext(TodosContext);

  const [todoTitle, setTodoTitle] = useState('');

  // ===================

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = '1.5em'; // сброс
      textarea.style.height = `${textarea.scrollHeight}px`; // новая высота
    }
  }, [todoTitle]);

  // ===================

  const biggestId = () => {
    if (todos.length === 0) {
      return 1;
    }

    const justId = todos.map(todo => todo.id);

    return Math.max(...justId) + 1;
  };

  const AddNewTodo = () => {
    if (!todoTitle.trim()) {
      return;
    }

    return setTodos([
      {
        id: biggestId(),
        projId: activeProjectId,
        title: todoTitle.trim(),
        completed: false,
      },
      ...todos,
    ]);
  };

  const handleRemoveProject = () => {
    const updatedProjects = projects.filter(
      proj => proj.id !== activeProjectId,
    );

    const updatedTodos = todos.filter(t => t.projId !== activeProjectId);

    setTodos(updatedTodos);

    const nextActiveProjectId =
      updatedProjects.length > 0
        ? Math.max(...updatedProjects.map(p => p.id))
        : null;

    const finalProjects = updatedProjects.map(p => ({
      ...p,
      active: p.id === nextActiveProjectId,
    }));

    if (nextActiveProjectId !== null) {
      setActiveProjectId(nextActiveProjectId);
    }

    setProjects(finalProjects);
  };

  // const handleSubmit = (event: React.FocusEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   AddNewTodo();

  //   setTodoTitle('');
  // };
  const submitTodo = () => {
    AddNewTodo();
    setTodoTitle('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitTodo();
  };

  return (
    <>
      <p className="control has-icons-right">
        <p className="panel-heading panel-heading__project">
          {projects.find(p => p.id === activeProjectId)?.title ||
            'Project name'}
          <a className="remove-icon is-small is-right">
            <i
              className="fas fa-remove has-text-danger"
              onClick={handleRemoveProject}
            ></i>
          </a>
        </p>
      </p>

      <div className="task-input__container">
        <p className="control has-icons-left">
          <form onSubmit={handleSubmit}>
            <textarea
              ref={textareaRef}
              value={todoTitle}
              className="input task-input is-primary textarea auto-resize"
              placeholder="What needs to be done?"
              onChange={event => setTodoTitle(event.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  submitTodo();
                }
              }}
              rows={1}
            />
          </form>
          <a className="icon is-left has-text-warning">
            <i className="fas fa-pen-clip"></i>
          </a>
        </p>
      </div>
    </>
  );
};
