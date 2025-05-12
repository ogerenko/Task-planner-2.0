import './SideBar.css';

import { ProjectInput } from '../ProjectInput/ProjectInput';
import { ProjectItem } from '../ProjectItem/ProjectItem';

export const SideBar: React.FC = () => {
  return (
    <div className="side-bar">
      <ProjectInput />

      <ProjectItem />
    </div>
  );
};
