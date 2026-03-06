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
  sortTodosAlphabetically: () => void;
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
  sortTodosAlphabetically: () => {},
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

  const sortTodosAlphabetically = () => {
    const sortedTodos = [...todos].sort((a, b) => {
      if (a.projId !== activeProjectId || b.projId !== activeProjectId) {
        return 0;
      }

      return a.title.localeCompare(b.title);
    });

    setTodos(sortedTodos);
  };

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
      sortTodosAlphabetically,
    }),
    [todos, incompleteCount, filter, projects, activeProjectId],
  );

  return (
    <TodosContext.Provider value={valueTodos}>{children}</TodosContext.Provider>
  );
};
