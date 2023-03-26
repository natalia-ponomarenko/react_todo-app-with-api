import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  getTodos,
  addTodo,
  deleteTodo,
} from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Filter } from './components/Filter';
import { Header } from './components/Header/Header';
import { Notification } from './components/Notification';
import { Filter as FilterType } from './types/Filter';
import { UserWarning } from './UserWarning';
import { Error as ErrorType } from './types/Error';
import { USER_ID } from './variables/variables';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState(FilterType.ALL);
  const [errorType, setErrorType] = useState(ErrorType.NONE);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [isHidden, setHidden] = useState(false);
  const [isInputActive, setInputActive] = useState(false);
  const [inputTitle, setInputTitle] = useState('');
  const [idsToDelete, setIdsToDelete] = useState<number[]>([]);

  useEffect(() => {
    setErrorType(ErrorType.NONE);

    getTodos(USER_ID)
      .then(data => {
        setTodos(data);
      })
      .catch(() => {
        setErrorType(ErrorType.LOAD);
        setHidden(false);
      });
  }, []);

  const activeTodos = useMemo(() => {
    return todos.filter((todo) => !todo.completed).length;
  }, [todos]);
  const completedTodos = useMemo(() => {
    return todos.filter((todo) => todo.completed);
  }, [todos]);

  const changeFilter = useCallback(
    (filter: FilterType) => {
      setFilterType(filter);
    },
    [filterType],
  );

  const filterTodos = useCallback(
    (todosList: Todo[], filter: FilterType) => {
      switch (filter) {
        case FilterType.ALL:
          return todosList;
        case FilterType.ACTIVE:
          return todosList.filter((todo) => !todo.completed);
        case FilterType.COMPLETED:
          return todosList.filter((todo) => todo.completed);
        default:
          return todosList;
      }
    },
    [todos],
  );

  const visibleTodos = useMemo(
    () => filterTodos(todos, filterType),
    [filterTodos, filterType],
  );

  const addTodoItem = (newTodo: Todo) => {
    const { title } = newTodo;

    if (title.trim() === '') {
      setErrorType(ErrorType.TITLE);
      setHidden(false);

      return;
    }

    setTempTodo({ ...newTodo, id: 0 });
    setInputActive(true);

    addTodo(USER_ID, newTodo)
      .then(result => {
        setTodos(prevTodos => [...prevTodos, result]);
      })
      .catch(() => {
        setErrorType(ErrorType.ADD);
        setHidden(false);
      })
      .finally(() => {
        setInputActive(false);
        setTempTodo(null);
      });
  };

  const deleteTodoItem = async (todoId: number) => {
    setIdsToDelete(prevState => [...prevState, todoId]);

    deleteTodo(todoId).then(() => {
      setTodos(prevTodos => prevTodos.filter(
        (todo) => todo.id !== todoId,
      ));
    })
      .catch(() => {
        setErrorType(ErrorType.DELETE);
        setHidden(false);
      })
      .finally(() => {
        setIdsToDelete([]);
      });
  };

  const clearCompleted = () => {
    const completedIds = completedTodos.map(todo => todo.id);

    setIdsToDelete(completedIds);
    completedTodos.forEach((todo) => {
      deleteTodoItem(todo.id);
    });
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          activeTodos={activeTodos}
          onAdd={addTodoItem}
          isInputActive={isInputActive}
          inputTitle={inputTitle}
          setInputTitle={setInputTitle}
        />
        {!!todos.length && (
          <>
            <TodoList
              todos={visibleTodos}
              tempTodo={tempTodo}
              onDelete={deleteTodoItem}
              idsToDelete={idsToDelete}
            />
            <Filter
              notCompleted={activeTodos}
              completed={completedTodos.length}
              changeFilter={changeFilter}
              clearCompleted={clearCompleted}
            />
          </>
        )}
      </div>
      {errorType && (
        <Notification
          errorType={errorType}
          closeNotification={() => setHidden(true)}
          isHidden={isHidden}
        />
      )}
    </div>
  );
};
