import './ProjectTasksList.css';

import { TodoInput } from '../TodoInput';
import { NavBar } from '../NavBar';
import { TodoItem } from '../TodoItem';

export const ProjectTasksList: React.FC = () => {
  return (
    <div className="project-task-list">
      <TodoInput />

      <NavBar />

      <TodoItem />
    </div>
  );
};
