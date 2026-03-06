import './NavBar.css';

import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../TodosContext';
import { Status } from '../store';

export const NavBar: React.FC = () => {
  const {
    todos,
    setTodos,
    incompleteCount,
    setFilter,
    sortTodosAlphabetically,
  } = useContext(TodosContext);

  const [navClicked, setNavClicked] = useState({
    all: true,
    priority: false,
    sorted: false,
  });

  const handleVisible = (status: Status) => {
    switch (status) {
      case Status.All:
        setFilter(Status.All);
        setNavClicked({
          all: true,
          priority: false,
          sorted: false,
        });
        break;

      case Status.Priority:
        setFilter(Status.Priority);
        setNavClicked({
          all: false,
          priority: true,
          sorted: false,
        });
        break;

      default:
        setTodos(todos);
    }
  };

  const handleSort = () => {
    sortTodosAlphabetically();

    setNavClicked({
      all: false,
      priority: false,
      sorted: true,
    });
  };

  return (
    <>
      {todos.length > 0 && (
        <nav className="tabs is-fullwidth" aria-label="breadcrumbs1">
          <ul>
            <li>
              <span className="icon is-small">
                <i className="fas fa-check-double"></i>
              </span>
              <strong className="has-text-success1">{`${incompleteCount} left`}</strong>
            </li>
            <li>
              <a onClick={() => handleVisible(Status.All)}>
                <span className="icon is-small">
                  <i
                    className={classNames('fas fa-book', {
                      'has-text-success': navClicked.all,
                    })}
                  ></i>
                </span>
                <span
                  className={classNames({
                    'has-text-success': navClicked.all,
                  })}
                >
                  All
                </span>
              </a>
            </li>

            <li>
              <a onClick={() => handleVisible(Status.Priority)}>
                <span className="icon is-small">
                  <i
                    className={classNames('fas fa-puzzle-piece', {
                      'has-text-success': navClicked.priority,
                    })}
                  ></i>
                </span>
                <span
                  className={classNames({
                    'has-text-success': navClicked.priority,
                  })}
                >
                  Priority
                </span>
              </a>
            </li>

            <li>
              <a onClick={handleSort}>
                <span className="icon is-small">
                  <i
                    className={classNames('fa-solid fa-up-down', {
                      'has-text-success': navClicked.sorted,
                    })}
                  ></i>
                </span>

                <span
                  className={classNames({
                    'has-text-success': navClicked.sorted,
                  })}
                >
                  Sort
                </span>
              </a>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};
