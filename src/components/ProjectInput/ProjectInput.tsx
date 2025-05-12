import './ProjectInput.css';

import React, { useContext, useState } from 'react';
import { TodosContext } from '../TodosContext';

export const ProjectInput: React.FC = () => {
  const { projects, setProjects, setActiveProjectId } =
    useContext(TodosContext);

  const [projectTitle, setProjectTitle] = useState('');

  const biggestId = () => {
    if (projects.length === 0) {
      return 1;
    }

    const justId = projects.map(todo => todo.id);

    return Math.max(...justId) + 1;
  };

  const AddNewProject = () => {
    if (!projectTitle.trim()) {
      return;
    }

    const newProjectId = biggestId();

    setActiveProjectId(newProjectId);

    return setProjects([
      {
        id: biggestId(),
        title: projectTitle,
        active: true,
      },
      ...projects.map(p => ({ ...p, active: false })),
    ]);
  };

  const handleSubmit = (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();

    AddNewProject();

    setProjectTitle('');
  };

  return (
    <>
      <p className="panel-heading panel-heading__app-name">
        Task planner 2.0 <sub>beta</sub>
      </p>

      <div className="project-input__container">
        <p className="control has-icons-left">
          <form onSubmit={handleSubmit}>
            <input
              value={projectTitle}
              className="input is-primary project-input"
              type="text"
              placeholder="Add a new project"
              onChange={event => setProjectTitle(event.target.value)}
            />
          </form>
          <a className="icon is-left has-text-success">
            <i className="fa-solid fa-plus"></i>
          </a>
        </p>
      </div>
    </>
  );
};
