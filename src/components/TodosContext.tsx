import React, { useEffect, useMemo, useState } from 'react';
import { Status, Todos, Projects, useLocalStorage } from './store';

type PropsContext = {
  activeProjectId: number;
  setActiveProjectId: (projId: number) => void;
  projects: Projects[];
  setProjects: (projects: Projects[]) => void;
  todos: Todos[];
  setTodos: (todos: Todos[]) => void;
  filter: Status;
  setFilter: (filter: Status) => void;
  incompleteCount: number;
};

export const TodosContext = React.createContext<PropsContext>({
  activeProjectId: 0,
  setActiveProjectId: () => {},
  projects: [],
  setProjects: () => {},
  todos: [],
  setTodos: () => {},
  filter: Status.All,
  setFilter: () => {},
  incompleteCount: 0,
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todos[]>('todos', []);
  const [projects, setProjects] = useLocalStorage<Projects[]>('projects', []);
  const [filter, setFilter] = useState(Status.All);
  const [activeProjectId, setActiveProjectId] = useLocalStorage<number>(
    'activeProjectId',
    1,
  );

  let incompleteCount = todos.filter(
    todo => !todo.completed && todo.projId === activeProjectId,
  ).length;

  useEffect(() => {
    incompleteCount = todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const valueTodos = useMemo(
    () => ({
      setActiveProjectId,
      activeProjectId,
      projects,
      setProjects,
      todos,
      setTodos,
      incompleteCount,
      filter,
      setFilter,
    }),
    [todos, incompleteCount, filter, projects, activeProjectId],
  );

  return (
    <TodosContext.Provider value={valueTodos}>{children}</TodosContext.Provider>
  );
};
