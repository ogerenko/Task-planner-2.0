import './ProjectItem.css';

import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { TodosContext } from '../TodosContext';

export const ProjectItem: React.FC = () => {
  const { projects, setProjects, setActiveProjectId } =
    useContext(TodosContext);

  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [newProjectTitle, setNewProjectTitle] = useState('');

  const handleDoubleClick = (todoId: number, todoTitle: string) => {
    setEditingProjectId(todoId);
    setNewProjectTitle(todoTitle);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewProjectTitle(event.target.value);
  };

  const handleSaveChanges = (todoId: number) => {
    if (!newProjectTitle.trim()) {
      setNewProjectTitle('');

      return;
    }

    const updatedTodos = projects.map(todo =>
      todo.id === todoId ? { ...todo, title: newProjectTitle } : todo,
    );

    setProjects(updatedTodos);
    setEditingProjectId(null);
  };

  const handleCancelEditing = () => {
    setEditingProjectId(null);
    setNewProjectTitle('');
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

  const handleActiveProject = (projId: number) => {
    const updatedTodos = projects.map(todo => {
      if (todo.id === projId) {
        return { ...todo, active: true };
      }

      return { ...todo, active: false };
    });

    setActiveProjectId(projId);

    setProjects(updatedTodos);
  };

  return (
    <>
      <ul className="projects-list">
        {projects.map(project => (
          <li
            key={project.id}
            className={classNames('panel-block for-test', {
              'has-background-success-light project-active': project.active,
              editing: editingProjectId === project.id,
            })}
            onClick={() => handleActiveProject(project.id)}
          >
            <a
              className={classNames('panel-icon', {
                'has-text-success': project.active,
              })}
            >
              <i
                className={classNames('fa-regular', {
                  'fa-folder-open': project.active,
                  'fa-folder': !project.active,
                })}
                onClick={() => handleActiveProject(project.id)}
              ></i>
            </a>

            {editingProjectId === project.id ? (
              <input
                className="input1 todo-input"
                type="text"
                value={newProjectTitle}
                onChange={handleInputChange}
                onKeyUp={event => handleKeyUp(event, project.id)}
                autoFocus
                onBlur={() => handleSaveChanges(project.id)}
              />
            ) : (
              <>
                <span
                  onDoubleClick={() =>
                    handleDoubleClick(project.id, project.title)
                  }
                >
                  {project.title}
                </span>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};
