import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma';
import { TodosProvider } from './components/TodosContext';
import { SideBar } from './components/SideBar/SideBar';
import { ProjectTasksList } from './components/ProjectTasksList';

export const App: React.FC = () => {
  return (
    <div className="panel is-primary">
      <TodosProvider>
        <SideBar />

        <ProjectTasksList />
      </TodosProvider>
    </div>
  );
};
